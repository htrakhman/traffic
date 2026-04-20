import Stripe from 'stripe'

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key)
}

/** Public site origin for Checkout return URLs. */
export function siteOrigin(): string {
  const explicit = process.env.SITE_URL?.replace(/\/$/, '')
  if (explicit) return explicit
  if (process.env.URL) return process.env.URL.replace(/\/$/, '')
  if (process.env.DEPLOY_PRIME_URL) return process.env.DEPLOY_PRIME_URL.replace(/\/$/, '')
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`
  return 'http://localhost:3000'
}

export function membershipPriceId(): string {
  const id = process.env.STRIPE_MEMBERSHIP_PRICE_ID
  if (!id) throw new Error('STRIPE_MEMBERSHIP_PRICE_ID is not set (create a $150/mo recurring Price in Stripe Dashboard)')
  return id
}

export async function createMembershipCheckoutSession(params: {
  email: string
  name?: string
  /** After payment, send the customer back to checkout to finish the rental submission. */
  returnToCheckout?: boolean
}): Promise<{ url: string }> {
  const stripe = getStripe()
  const origin = siteOrigin()
  const resumeCheckout = Boolean(params.returnToCheckout)
  const successPath = resumeCheckout
    ? '/checkout?session_id={CHECKOUT_SESSION_ID}'
    : '/account?session_id={CHECKOUT_SESSION_ID}'
  const cancelPath = resumeCheckout ? '/checkout?membership=cancelled' : '/account?membership=cancelled'
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: params.email,
    line_items: [{ price: membershipPriceId(), quantity: 1 }],
    success_url: `${origin}${successPath}`,
    cancel_url: `${origin}${cancelPath}`,
    allow_promotion_codes: true,
    metadata: { userEmail: params.email.toLowerCase() },
    subscription_data: {
      metadata: {
        userEmail: params.email.toLowerCase(),
        ...(params.name ? { displayName: params.name } : {}),
      },
    },
  })
  if (!session.url) throw new Error('Stripe Checkout session has no URL')
  return { url: session.url }
}

export async function completeMembershipFromCheckoutSession(
  sessionId: string,
  expectedEmail: string,
): Promise<
  | { ok: true; stripeCustomerId: string; stripeSubscriptionId: string; memberExpiry: string }
  | { ok: false; error: string }
> {
  const stripe = getStripe()
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['subscription'],
  })

  const email = (
    session.customer_details?.email ||
    session.customer_email ||
    ''
  ).toLowerCase()
  if (!email || email !== expectedEmail.toLowerCase()) {
    return { ok: false, error: 'This checkout session does not match your signed-in email.' }
  }
  if (session.mode !== 'subscription') {
    return { ok: false, error: 'Invalid checkout session.' }
  }
  const checkoutDone =
    session.status === 'complete' ||
    session.payment_status === 'paid' ||
    session.payment_status === 'no_payment_required'
  if (!checkoutDone) {
    return { ok: false, error: 'Payment is not complete yet. Refresh in a moment or check your email from Stripe.' }
  }

  const subRaw = session.subscription
  const sub =
    typeof subRaw === 'string'
      ? await stripe.subscriptions.retrieve(subRaw)
      : (subRaw as Stripe.Subscription | null)
  if (!sub) {
    return { ok: false, error: 'No subscription found for this session.' }
  }

  const customerId =
    typeof session.customer === 'string' ? session.customer : session.customer?.id
  if (!customerId) {
    return { ok: false, error: 'No Stripe customer on this session.' }
  }

  return {
    ok: true,
    stripeCustomerId: customerId,
    stripeSubscriptionId: sub.id,
    memberExpiry: new Date(sub.current_period_end * 1000).toISOString(),
  }
}

export async function syncMembershipFromStripeCustomer(customerId: string): Promise<
  | { ok: true; active: true; stripeSubscriptionId: string; memberExpiry: string }
  | { ok: true; active: false }
  | { ok: false; error: string }
> {
  const stripe = getStripe()
  const subs = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    limit: 20,
  })

  const activeLike = subs.data.filter(
    (s) => s.status === 'active' || s.status === 'trialing' || s.status === 'past_due',
  )
  if (activeLike.length === 0) {
    return { ok: true, active: false }
  }

  const best = activeLike.reduce((a, b) => (a.current_period_end > b.current_period_end ? a : b))
  return {
    ok: true,
    active: true,
    stripeSubscriptionId: best.id,
    memberExpiry: new Date(best.current_period_end * 1000).toISOString(),
  }
}

export async function createBillingPortalSession(params: {
  customerId: string
  returnUrl: string
}): Promise<{ url: string }> {
  const stripe = getStripe()
  const session = await stripe.billingPortal.sessions.create({
    customer: params.customerId,
    return_url: params.returnUrl,
  })
  return { url: session.url }
}
