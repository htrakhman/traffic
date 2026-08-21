// Vercel serverless — POST JSON supplier signup → Supabase insert + Resend notification.
// Mirrors the existing api/quote-submit.ts pattern for the buyer-side quote form.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { insertSupplierSignup } from './lib/supplierSignups.js'
import { isSupabaseConfigured } from './lib/supabaseServer.js'

export const config = { runtime: 'nodejs' }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body as Record<string, unknown>
  const name = String(body?.name || '').trim()
  const company = String(body?.company || '').trim()
  const email = String(body?.email || '').trim()
  const territory = String(body?.territory || '').trim()

  if (!name || !company || !email || !territory) {
    return res.status(400).json({ error: 'name, company, email, and territory are required' })
  }

  const products = Array.isArray(body?.products) ? body.products.map(String) : []
  const phone = body?.phone ? String(body.phone) : undefined
  const website = body?.website ? String(body.website) : undefined
  const otherProducts = body?.otherProducts ? String(body.otherProducts).trim().slice(0, 200) : undefined
  const monthlyVolume = body?.monthlyVolume ? String(body.monthlyVolume) : undefined
  const source = body?.source ? String(body.source) : undefined

  // The Supabase write and the Resend notification are independent capture
  // paths. A signup that lands in only one of them is still a signup we can
  // act on, so neither failure is allowed to abort the other — we only fail
  // the request when both paths are gone and the lead would be lost.
  let dbError: string | null = null
  if (isSupabaseConfigured()) {
    try {
      await insertSupplierSignup({ name, company, email, phone, website, territory, products, otherProducts, monthlyVolume, source })
    } catch (e: unknown) {
      dbError = e instanceof Error ? e.message : String(e)
      console.error('[api/supplier-signup] supabase insert failed:', dbError)
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  const toRaw = process.env.CHECKOUT_NOTIFY_TO
  const notifyConfigured = Boolean(apiKey && toRaw?.trim())
  let notifyError: string | null = null
  if (notifyConfigured) {
    const from = process.env.CHECKOUT_EMAIL_FROM?.trim() || 'Traffic Control Supply <onboarding@resend.dev>'
    try {
      const resend = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: toRaw!.split(',').map((s) => s.trim()).filter(Boolean),
          reply_to: email,
          subject: dbError ? `Supplier signup (NOT SAVED): ${company}` : `Supplier signup: ${company}`,
          text: [
            `Name: ${name}`,
            `Company: ${company}`,
            `Email: ${email}`,
            `Phone: ${phone || '(not given)'}`,
            `Website: ${website || '(not given)'}`,
            `Territory: ${territory}`,
            `Products: ${products.length ? products.join(', ') : '(not given)'}`,
            ...(otherProducts ? [`Other products: ${otherProducts}`] : []),
            `Monthly volume: ${monthlyVolume || '(not given)'}`,
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
    if (notifyError) console.error('[api/supplier-signup] notification failed:', notifyError)
  }

  // Nothing captured the lead: the DB write failed (or was never configured)
  // and no notification went out. Tell the browser so the visitor retries.
  const savedToDb = isSupabaseConfigured() && !dbError
  const notified = notifyConfigured && !notifyError
  if (!savedToDb && !notified) {
    return res.status(500).json({ error: 'signup failed', detail: dbError || notifyError || 'no signup destination configured' })
  }

  return res.status(200).json({ ok: true })
}
