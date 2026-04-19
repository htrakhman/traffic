/**
 * Netlify Functions entry for POST /api/membership-complete (see netlify.toml redirect).
 */
import { completeMembershipFromCheckoutSession } from '../../api/lib/membershipStripe.js'

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

  const sessionId =
    typeof (incoming as { sessionId?: unknown }).sessionId === 'string'
      ? (incoming as { sessionId: string }).sessionId.trim()
      : ''
  const email =
    typeof (incoming as { email?: unknown }).email === 'string' ? (incoming as { email: string }).email.trim() : ''

  if (!sessionId || !email.includes('@')) {
    return { statusCode: 400, body: JSON.stringify({ error: 'sessionId and email are required' }) }
  }

  try {
    const result = await completeMembershipFromCheckoutSession(sessionId, email)
    if (!result.ok) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: result.error }),
      }
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stripeCustomerId: result.stripeCustomerId,
        stripeSubscriptionId: result.stripeSubscriptionId,
        memberExpiry: result.memberExpiry,
      }),
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[membership-complete]', msg)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Could not complete membership', detail: msg }),
    }
  }
}
