// Vercel serverless — POST { customerId } → active subscription period end from Stripe.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { syncMembershipFromStripeCustomer } from './lib/membershipStripe.js'

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

  if (!customerId.startsWith('cus_')) {
    return res.status(400).json({ error: 'customerId is required' })
  }

  try {
    const result = await syncMembershipFromStripeCustomer(customerId)
    if (!result.ok) {
      return res.status(400).json({ error: result.error })
    }
    if (!result.active) {
      return res.status(200).json({ active: false })
    }
    return res.status(200).json({
      active: true,
      stripeSubscriptionId: result.stripeSubscriptionId,
      memberExpiry: result.memberExpiry,
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[api/membership-sync]', msg)
    return res.status(500).json({ error: 'Could not sync membership', detail: msg })
  }
}
