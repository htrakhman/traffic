/**
 * Netlify Functions entry for POST /api/membership-sync (see netlify.toml redirect).
 */
import { syncMembershipFromStripeCustomer } from '../../api/lib/membershipStripe.js'

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

  const customerId =
    typeof (incoming as { customerId?: unknown }).customerId === 'string'
      ? (incoming as { customerId: string }).customerId.trim()
      : ''

  if (!customerId.startsWith('cus_')) {
    return { statusCode: 400, body: JSON.stringify({ error: 'customerId is required' }) }
  }

  try {
    const result = await syncMembershipFromStripeCustomer(customerId)
    if (!result.ok) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: result.error }),
      }
    }
    if (!result.active) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: false }),
      }
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        active: true,
        stripeSubscriptionId: result.stripeSubscriptionId,
        memberExpiry: result.memberExpiry,
      }),
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[membership-sync]', msg)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Could not sync membership', detail: msg }),
    }
  }
}
