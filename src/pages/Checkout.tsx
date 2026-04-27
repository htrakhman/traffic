import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, CreditCard, Package, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useMembership } from '../context/MembershipContext'
import { useAuth } from '../context/AuthContext'
import { getDeliveryPickupFees } from '../constants/deliveryPickup'
import DeliveryPickupBreakdown from '../components/pricing/DeliveryPickupBreakdown'
import { getProductById } from '../data/products'
import {
  savePendingCheckoutAfterMembership,
  readPendingCheckoutAfterMembership,
  clearPendingCheckoutAfterMembership,
  setCheckoutSuccessContact,
  readCheckoutSuccessContact,
  clearCheckoutSuccessContact,
} from '../utils/pendingCheckoutAfterMembership'
import { SITE_CONTACT_PHONE_DISPLAY, SITE_CONTACT_PHONE_E164 } from '../config/site'
import { productSkuLabel } from '../utils/productSkuLabel'
import { getPurchaseLineSubtotal, getRetailUnitPriceForQty } from '../utils/pricing'

export default function Checkout() {
  const { lines, clearCart } = useCart()
  const { isMember } = useMembership()
  const { user, startStripeMembershipCheckout, completeStripeMembershipCheckout } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const sessionIdParam = searchParams.get('session_id')
  const membershipCancelled = searchParams.get('membership') === 'cancelled'

  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [addMembership] = useState(false)
  const [stripeResume, setStripeResume] = useState<'idle' | 'working' | 'error'>('idle')
  const [infoBanner, setInfoBanner] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobSite: '',
    notes: '',
    deliveryNeeded: true,
  })

  const set = <K extends keyof typeof form>(key: K, val: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: val }))

  const resolved = useMemo(
    () =>
      lines
        .map((line) => {
          const product = getProductById(line.productId)
          return product ? { line, product } : null
        })
        .filter(Boolean) as {
          line: (typeof lines)[0]
          product: NonNullable<ReturnType<typeof getProductById>>
        }[],
    [lines],
  )

  const merchandiseSubtotal = resolved.reduce(
    (s, { line, product }) => s + getPurchaseLineSubtotal(product, line.quantity),
    0,
  )
  const { combined: deliveryPickupCombined } = getDeliveryPickupFees(isMember)
  const grandTotal = merchandiseSubtotal + deliveryPickupCombined

  useLayoutEffect(() => {
    if (!done && stripeResume !== 'working') return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [done, stripeResume])

  useEffect(() => {
    if (!membershipCancelled) return
    clearPendingCheckoutAfterMembership()
    setInfoBanner('Membership payment was cancelled. You can check the box again when you are ready.')
    const next = new URLSearchParams(searchParams)
    next.delete('membership')
    setSearchParams(next, { replace: true })
  }, [membershipCancelled, searchParams, setSearchParams])

  useEffect(() => {
    if (!sessionIdParam || !user) return

    const resumeKey = `traffic-stripe-resume:${sessionIdParam}`
    let claimed = false
    try {
      const state = sessionStorage.getItem(resumeKey)
      if (state === 'done') return
      if (state === 'pending') return
      sessionStorage.setItem(resumeKey, 'pending')
      claimed = true
    } catch {
      return
    }

    let cancelled = false
    setStripeResume('working')
    setSubmitError(null)

    const releaseClaimIfPending = () => {
      try {
        if (sessionStorage.getItem(resumeKey) === 'pending') {
          sessionStorage.removeItem(resumeKey)
        }
      } catch {
        /* ignore */
      }
    }

    void (async () => {
      const membershipResult = await completeStripeMembershipCheckout(sessionIdParam)
      if (cancelled) return
      if (!membershipResult.ok) {
        setStripeResume('idle')
        setSubmitError(membershipResult.error || 'Could not confirm membership.')
        releaseClaimIfPending()
        const next = new URLSearchParams(searchParams)
        next.delete('session_id')
        setSearchParams(next, { replace: true })
        return
      }

      const pending = readPendingCheckoutAfterMembership()
      if (!pending) {
        setStripeResume('idle')
        setSubmitError(
          'We could not find your saved checkout. Please submit your order again (your membership is active).',
        )
        try {
          sessionStorage.setItem(resumeKey, 'done')
        } catch {
          /* ignore */
        }
        const next = new URLSearchParams(searchParams)
        next.delete('session_id')
        setSearchParams(next, { replace: true })
        return
      }

      const memberFees = getDeliveryPickupFees(true)
      const nextMerch = pending.lines.reduce((s, l) => s + l.lineTotal, 0)
      const body = {
        name: pending.name,
        email: pending.email,
        phone: pending.phone,
        company: pending.company,
        jobSite: pending.jobSite,
        notes: pending.notes,
        deliveryNeeded: pending.deliveryNeeded,
        lines: pending.lines,
        totals: {
          merchandiseSubtotal: nextMerch,
          deliveryPickupCombined: memberFees.combined,
          grandTotal: nextMerch + memberFees.combined,
        },
        membershipSubscribedAtCheckout: true,
      }

      const res = await fetch('/api/checkout-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (cancelled) return
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setStripeResume('idle')
        setSubmitError(
          data.error ||
            'Membership is active, but we could not email your checkout. Please call us or try submitting again.',
        )
        releaseClaimIfPending()
        return
      }

      try {
        sessionStorage.setItem(resumeKey, 'done')
      } catch {
        /* ignore */
      }
      clearPendingCheckoutAfterMembership()
      clearCart()
      setCheckoutSuccessContact(pending.name, pending.email)
      setDone(true)
      setStripeResume('idle')
      const next = new URLSearchParams(searchParams)
      next.delete('session_id')
      setSearchParams(next, { replace: true })
    })()

    return () => {
      cancelled = true
      if (claimed) {
        releaseClaimIfPending()
      }
    }
  }, [
    sessionIdParam,
    user,
    completeStripeMembershipCheckout,
    clearCart,
    searchParams,
    setSearchParams,
  ])

  const buildNotifyPayload = () => ({
    name: form.name,
    email: form.email,
    phone: form.phone,
    company: form.company,
    jobSite: form.jobSite,
    notes: form.notes,
    deliveryNeeded: form.deliveryNeeded,
    lines: resolved.map(({ line, product }) => ({
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      supplierSku: product.supplierSku,
      quantity: line.quantity,
      unitPrice: getRetailUnitPriceForQty(product, line.quantity),
      lineTotal: getPurchaseLineSubtotal(product, line.quantity),
    })),
    totals: {
      merchandiseSubtotal,
      deliveryPickupCombined,
      grandTotal,
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitting(true)
    try {
      if (addMembership && !isMember) {
        if (!user) {
          setSubmitError('Sign in or create an account on My Account to add membership at checkout.')
          return
        }
        const pendingPayload = {
          ...buildNotifyPayload(),
          membershipSubscribedAtCheckout: true,
        }
        savePendingCheckoutAfterMembership(pendingPayload)
        const stripeResult = await startStripeMembershipCheckout({ returnToCheckout: true })
        if (!stripeResult.ok) {
          clearPendingCheckoutAfterMembership()
          setSubmitError(stripeResult.error || 'Could not start Stripe checkout.')
        }
        return
      }

      const payload = buildNotifyPayload()
      const res = await fetch('/api/checkout-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        const msg =
          data.error ||
          (res.status === 0
            ? 'Could not reach the server. Use “vercel dev” locally or deploy with checkout email env vars set.'
            : 'Checkout could not be submitted. Please try again or call us.')
        setSubmitError(msg)
        return
      }
      clearCart()
      setCheckoutSuccessContact(form.name, form.email)
      setDone(true)
    } catch {
      setSubmitError('Network error. Check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const successContact = readCheckoutSuccessContact()

  if (done) {
    const displayName = successContact?.name?.trim() || 'there'
    const displayEmail = successContact?.email?.trim() || 'the address you provided'
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={28} className="text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Checkout submitted</h1>
          <p className="text-slate-400 mb-2">
            Thanks, <strong className="text-white">{displayName}</strong>. We received your purchase checkout.
          </p>
          <p className="text-slate-400 mb-8">
            {successContact?.email ? (
              <>
                Someone from our team will reach out soon at <strong className="text-white">{displayEmail}</strong> to
                confirm your order and delivery details.{' '}
              </>
            ) : (
              <>Someone from our team will reach out soon to confirm your order and delivery. </>
            )}
            Questions? Call{' '}
            <a href={`tel:${SITE_CONTACT_PHONE_E164}`} className="text-brand-400">
              {SITE_CONTACT_PHONE_DISPLAY}
            </a>
            .
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/browse"
              className="btn-primary"
              onClick={() => clearCheckoutSuccessContact()}
            >
              Browse equipment
            </Link>
            <Link to="/" className="btn-secondary" onClick={() => clearCheckoutSuccessContact()}>
              Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  if (stripeResume === 'working') {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center px-4">
        <p className="text-slate-400 text-center">Finishing your checkout after membership payment…</p>
      </main>
    )
  }

  const showEmptyCart = resolved.length === 0 && !sessionIdParam

  return (
    <main className="min-h-screen pt-20">
      <div className="border-b border-slate-800/60 bg-slate-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to cart
          </Link>
          <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
            <CreditCard className="text-brand-400" size={28} />
            Checkout
          </h1>
          <p className="text-slate-400">Review your cart, enter contact details, and submit your order.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {sessionIdParam && !user ? (
          <div className="card p-8 max-w-lg mx-auto text-center space-y-4">
            <p className="text-slate-300 text-sm">
              Sign in with the same account you used before paying for membership to finish sending your checkout.
            </p>
            <Link to="/account" className="btn-primary inline-flex justify-center">
              My Account
            </Link>
          </div>
        ) : showEmptyCart ? (
          <div className="card p-12 text-center">
            <Package size={40} className="text-slate-600 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-white mb-2">Your cart is empty</h2>
            <p className="text-slate-400 mb-6 text-sm max-w-md mx-auto">
              Add equipment to your cart before checking out.
            </p>
            <Link to="/browse" className="btn-primary inline-flex">
              Browse equipment
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              {infoBanner ? (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                  {infoBanner}
                </div>
              ) : null}

              <h2 className="font-semibold text-white">Order summary</h2>
              <div className="space-y-3">
                {resolved.map(({ line, product }) => (
                  <div key={line.productId} className="card p-4 flex gap-4">
                    <img
                      src={product.imageUrl}
                      alt=""
                      className="w-20 h-16 object-cover rounded-lg flex-shrink-0 bg-slate-800"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white text-sm leading-snug">{product.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 font-mono">{productSkuLabel(product)}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Qty {line.quantity} · ${getRetailUnitPriceForQty(product, line.quantity).toFixed(2)}/
                        {product.unit} (tier)
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-white tabular-nums">
                        ${getPurchaseLineSubtotal(product, line.quantity).toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-500">line total</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card p-4 space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Merchandise</span>
                  <span className="tabular-nums">${merchandiseSubtotal.toFixed(2)}</span>
                </div>
                <DeliveryPickupBreakdown className="pt-2 border-t border-slate-800" />
                <div className="flex justify-between font-semibold text-white text-base pt-2 border-t border-slate-800">
                  <span>Estimated total</span>
                  <span className="tabular-nums">${grandTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-500">
                  Standard shipping is free. We may follow up to confirm the ship-to address and any access constraints.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="card p-6 space-y-4 sticky top-24">
                <h2 className="font-semibold text-white">Billing and contact</h2>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="label">Name *</label>
                    <input
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      type="text"
                      placeholder="John Smith"
                      className="input text-sm"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="label">Company</label>
                    <input
                      value={form.company}
                      onChange={(e) => set('company', e.target.value)}
                      type="text"
                      placeholder="Smith Utilities"
                      className="input text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Email *</label>
                  <input
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    type="email"
                    placeholder="john@example.com"
                    className="input text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="label">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    type="tel"
                    placeholder="(555) 000-0000"
                    className="input text-sm"
                  />
                </div>

                <div>
                  <label className="label">Job site / delivery address</label>
                  <input
                    value={form.jobSite}
                    onChange={(e) => set('jobSite', e.target.value)}
                    type="text"
                    placeholder="Street or highway location"
                    className="input text-sm"
                  />
                </div>

                <div>
                  <label className="label">Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                    placeholder="Gate codes, contact on site, PO number…"
                    className="input text-sm resize-none h-20"
                  />
                </div>

                {/* Delivery toggle hidden — drop-ship only for now. */}

                {/* Membership upsell hidden — platform is focused on drop-ship purchases for now. */}

                {submitError ? (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {submitError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary py-3 justify-center text-base gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <CreditCard size={18} />
                  {submitting ? 'Submitting…' : 'Submit checkout'}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  By submitting you agree we may contact you about this order. No card charge on this step — we confirm details by email or phone.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
