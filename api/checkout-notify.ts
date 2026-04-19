// Vercel serverless — POST JSON checkout payload → email via Resend (see api/lib/checkoutNotify.ts).

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sendCheckoutNotification } from './lib/checkoutNotify.js'

export const config = { runtime: 'nodejs' }

function parseJsonBody(req: VercelRequest): unknown {
  const b = req.body as unknown
  if (b == null) return {}
  if (Buffer.isBuffer(b)) {
    try {
      return JSON.parse(b.toString('utf8') || '{}')
    } catch {
      return null
    }
  }
  if (typeof b === 'string') {
    try {
      return JSON.parse(b || '{}')
    } catch {
      return null
    }
  }
  if (typeof b === 'object') return b
  return null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = parseJsonBody(req)
  if (body === null) {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  try {
    const result = await sendCheckoutNotification(body)
    if (!result.ok) {
      return res.status(result.status).json({
        error: result.message,
        code: result.code,
      })
    }
    return res.status(200).json({ ok: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[api/checkout-notify]', msg)
    return res.status(500).json({ error: 'checkout notify failed', detail: msg })
  }
}
