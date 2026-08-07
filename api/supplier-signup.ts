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
  const monthlyVolume = body?.monthlyVolume ? String(body.monthlyVolume) : undefined
  const source = body?.source ? String(body.source) : undefined

  try {
    if (isSupabaseConfigured()) {
      await insertSupplierSignup({ name, company, email, phone, website, territory, products, monthlyVolume, source })
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
          subject: `Supplier signup: ${company}`,
          text: [
            `Name: ${name}`,
            `Company: ${company}`,
            `Email: ${email}`,
            `Phone: ${phone || '(not given)'}`,
            `Website: ${website || '(not given)'}`,
            `Territory: ${territory}`,
            `Products: ${products.length ? products.join(', ') : '(not given)'}`,
            `Monthly volume: ${monthlyVolume || '(not given)'}`,
          ].join('\n'),
        }),
      })
    }

    return res.status(200).json({ ok: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[api/supplier-signup]', msg)
    return res.status(500).json({ error: 'signup failed', detail: msg })
  }
}
