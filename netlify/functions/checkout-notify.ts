/**
 * Netlify Functions entry for POST /api/checkout-notify (see netlify.toml redirect).
 */
import { sendCheckoutNotification } from '../../api/lib/checkoutNotify.js'

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

  try {
    const result = await sendCheckoutNotification(incoming)
    if (!result.ok) {
      return {
        statusCode: result.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: result.message, code: result.code }),
      }
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[checkout-notify]', msg)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'checkout notify failed', detail: msg }),
    }
  }
}
