// Vercel serverless — POST JSON buyer quote request → Supabase insert + Resend
// notification. This is the actual product: every submission is a lead sold to
// a supplier. Mirrors api/supplier-signup.ts.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { insertBuyerLead } from './lib/buyerLeads.js'
import { isSupabaseConfigured } from './lib/supabaseServer.js'

export const config = { runtime: 'nodejs' }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body as Record<string, unknown>
  const name = String(body?.name || '').trim()
  const email = String(body?.email || '').trim()
  const productCategory = String(body?.productCategory || '').trim()
  const deliveryState = String(body?.deliveryState || '').trim()

  if (!name || !email || !productCategory || !deliveryState) {
    return res.status(400).json({ error: 'name, email, productCategory, and deliveryState are required' })
  }

  const phone = body?.phone ? String(body.phone) : undefined
  const organization = body?.organization ? String(body.organization) : undefined
  const quantity = body?.quantity ? String(body.quantity) : undefined
  const deliveryCity = body?.deliveryCity ? String(body.deliveryCity) : undefined
  const timeline = body?.timeline ? String(body.timeline) : undefined
  const notes = body?.notes ? String(body.notes) : undefined
  const landingPage = body?.landingPage ? String(body.landingPage) : undefined

  try {
    if (isSupabaseConfigured()) {
      await insertBuyerLead({
        name,
        email,
        phone,
        organization,
        productCategory,
        quantity,
        deliveryCity,
        deliveryState,
        timeline,
        notes,
        landingPage,
      })
    }

    const apiKey = process.env.RESEND_API_KEY
    const toRaw = process.env.CHECKOUT_NOTIFY_TO
    if (apiKey && toRaw?.trim()) {
      const from = process.env.CHECKOUT_EMAIL_FROM?.trim() || 'Traffic Control Supply <onboarding@resend.dev>'
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: toRaw.split(',').map((s) => s.trim()).filter(Boolean),
          reply_to: email,
          subject: `Buyer lead: ${productCategory}${deliveryCity ? ` — ${deliveryCity}, ${deliveryState}` : ` — ${deliveryState}`}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || '(not given)'}`,
            `Company: ${organization || '(not given)'}`,
            `Product category: ${productCategory}`,
            `Quantity: ${quantity || '(not given)'}`,
            `Delivery: ${deliveryCity ? `${deliveryCity}, ` : ''}${deliveryState}`,
            `Timeline: ${timeline || '(not given)'}`,
            `Notes: ${notes || '(none)'}`,
            `Landing page: ${landingPage || '(unknown)'}`,
          ].join('\n'),
        }),
      })
    }

    return res.status(200).json({ ok: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[api/buyer-lead-submit]', msg)
    return res.status(500).json({ error: 'submit failed', detail: msg })
  }
}
