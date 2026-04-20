/**
 * Netlify Functions entry for POST /api/create-membership-checkout (see netlify.toml redirect).
 */
import { createMembershipCheckoutSession } from '../../api/lib/membershipStripe.js'

type NetlifyEvent = { httpMethod?: string; body?: string | null }

export const handler = async (event: NetlifyEvent) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { Allow: 'POST' }, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  let incoming: unknown
  try {
    incoming = JSON.parse(event.body || 'null')
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  if (incoming === null || typeof incoming !== 'object') {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid body' }) }
  }

  const email = typeof (incoming as { email?: unknown }).email === 'string' ? (incoming as { email: string }).email.trim() : ''
  const name =
    typeof (incoming as { name?: unknown }).name === 'string' ? (incoming as { name: string }).name.trim() : undefined
  const returnToCheckout = (incoming as { returnToCheckout?: unknown }).returnToCheckout === true

  if (!email.includes('@')) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Valid email is required' }) }
  }

  try {
    const { url } = await createMembershipCheckoutSession({ email, name, returnToCheckout })
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[create-membership-checkout]', msg)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Could not start checkout', detail: msg }),
    }
  }
}
