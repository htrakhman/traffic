// Vercel serverless — POST { sessionId, email } → verify Stripe Checkout session, return membership fields.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { completeMembershipFromCheckoutSession } from './lib/membershipStripe.js'

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

  const sessionId =
    typeof (body as { sessionId?: unknown }).sessionId === 'string'
      ? (body as { sessionId: string }).sessionId.trim()
      : ''
  const email =
    typeof (body as { email?: unknown }).email === 'string' ? (body as { email: string }).email.trim() : ''

  if (!sessionId || !email.includes('@')) {
    return res.status(400).json({ error: 'sessionId and email are required' })
  }

  try {
    const result = await completeMembershipFromCheckoutSession(sessionId, email)
    if (!result.ok) {
      return res.status(400).json({ error: result.error })
    }
    return res.status(200).json({
      stripeCustomerId: result.stripeCustomerId,
      stripeSubscriptionId: result.stripeSubscriptionId,
      memberExpiry: result.memberExpiry,
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[api/membership-complete]', msg)
    return res.status(500).json({ error: 'Could not complete membership', detail: msg })
  }
}
