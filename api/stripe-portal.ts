// Vercel serverless — POST { customerId, returnUrl } → Stripe Customer Portal URL.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createBillingPortalSession, siteOrigin } from './lib/membershipStripe.js'

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
  if (body === null || typeof body !== 'object' || body === null) {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  const customerId =
    typeof (body as { customerId?: unknown }).customerId === 'string'
      ? (body as { customerId: string }).customerId.trim()
      : ''
  let returnUrl =
    typeof (body as { returnUrl?: unknown }).returnUrl === 'string'
      ? (body as { returnUrl: string }).returnUrl.trim()
      : ''

  if (!customerId.startsWith('cus_')) {
    return res.status(400).json({ error: 'customerId is required' })
  }
  if (!returnUrl) {
    returnUrl = `${siteOrigin()}/account`
  }

  try {
    const { url } = await createBillingPortalSession({ customerId, returnUrl })
    return res.status(200).json({ url })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[api/stripe-portal]', msg)
    return res.status(500).json({ error: 'Could not open billing portal', detail: msg })
  }
}
