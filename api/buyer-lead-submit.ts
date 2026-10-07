// Vercel serverless — POST JSON buyer quote request → Supabase insert + Resend
// notification. Mirrors api/supplier-signup.ts.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { insertBuyerLead } from './lib/buyerLeads.js'
import { isSupabaseConfigured } from './lib/supabaseServer.js'

export const config = { runtime: 'nodejs' }

/** Where quote requests are emailed when CHECKOUT_NOTIFY_TO is not set. */
const DEFAULT_NOTIFY_TO = 'haroldtrakhman@gmail.com'

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

  // The Supabase write and the Resend notification are independent capture
  // paths (same as api/supplier-signup.ts). Neither failure aborts the other;
  // the request only fails when both are gone and the lead would be lost.
  let dbError: string | null = null
  if (isSupabaseConfigured()) {
    try {
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
    } catch (e: unknown) {
      dbError = e instanceof Error ? e.message : String(e)
      console.error('[api/buyer-lead-submit] supabase insert failed:', dbError)
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  const toRaw = process.env.CHECKOUT_NOTIFY_TO?.trim() || DEFAULT_NOTIFY_TO
  let notifyError: string | null = null
  if (apiKey) {
    const from = process.env.CHECKOUT_EMAIL_FROM?.trim() || 'Traffic Control Supply <onboarding@resend.dev>'
    try {
      const resend = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: toRaw.split(',').map((s) => s.trim()).filter(Boolean),
          reply_to: email,
          subject: `${dbError ? 'Quote request (NOT SAVED)' : 'Quote request'}: ${productCategory}${deliveryCity ? ` — ${deliveryCity}, ${deliveryState}` : ` — ${deliveryState}`}`,
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
            ...(dbError ? ['', `WARNING: the database write failed (${dbError}). This email is the only copy.`] : []),
          ].join('\n'),
        }),
      })
      if (!resend.ok) {
        notifyError = `resend responded ${resend.status}: ${(await resend.text().catch(() => '')).slice(0, 200)}`
      }
    } catch (e: unknown) {
      notifyError = e instanceof Error ? e.message : String(e)
    }
    if (notifyError) console.error('[api/buyer-lead-submit] notification failed:', notifyError)
  } else {
    notifyError = 'RESEND_API_KEY is not set'
    console.error('[api/buyer-lead-submit] RESEND_API_KEY is not set; no email sent')
  }

  const savedToDb = isSupabaseConfigured() && !dbError
  const notified = !notifyError
  if (!savedToDb && !notified) {
    return res.status(500).json({ error: 'submit failed', detail: dbError || notifyError })
  }

  return res.status(200).json({ ok: true })
}
