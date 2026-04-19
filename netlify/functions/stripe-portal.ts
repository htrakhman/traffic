/**
 * Netlify Functions entry for POST /api/stripe-portal (see netlify.toml redirect).
 */
import { createBillingPortalSession, siteOrigin } from '../../api/lib/membershipStripe.js'

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
  let returnUrl =
    typeof (incoming as { returnUrl?: unknown }).returnUrl === 'string'
      ? (incoming as { returnUrl: string }).returnUrl.trim()
      : ''

  if (!customerId.startsWith('cus_')) {
    return { statusCode: 400, body: JSON.stringify({ error: 'customerId is required' }) }
  }
  if (!returnUrl) {
    returnUrl = `${siteOrigin()}/account`
  }

  try {
    const { url } = await createBillingPortalSession({ customerId, returnUrl })
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[stripe-portal]', msg)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Could not open billing portal', detail: msg }),
    }
  }
}
