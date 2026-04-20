// Vercel serverless — POST { email, name? } → Stripe Checkout (subscription) URL.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createMembershipCheckoutSession } from './lib/membershipStripe.js'

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
  if (body === null || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  const email = typeof (body as { email?: unknown }).email === 'string' ? (body as { email: string }).email.trim() : ''
  const name = typeof (body as { name?: unknown }).name === 'string' ? (body as { name: string }).name.trim() : undefined
  const returnToCheckout = (body as { returnToCheckout?: unknown }).returnToCheckout === true

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' })
  }

  try {
    const { url } = await createMembershipCheckoutSession({ email, name, returnToCheckout })
    return res.status(200).json({ url })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[api/create-membership-checkout]', msg)
    return res.status(500).json({ error: 'Could not start checkout', detail: msg })
  }
}
