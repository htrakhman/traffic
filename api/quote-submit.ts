import type { VercelRequest, VercelResponse } from '@vercel/node'
import { insertQuoteRequest } from './lib/catalogDb.js'
import { isSupabaseConfigured } from './lib/supabaseServer.js'

export const config = { runtime: 'nodejs' }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const body = req.body as Record<string, unknown>
  if (!body?.email || !body?.name) {
    return res.status(400).json({ error: 'name and email required' })
  }
  try {
    if (isSupabaseConfigured()) {
      await insertQuoteRequest({
        customer_name: String(body.name),
        customer_email: String(body.email),
        customer_phone: body.phone ? String(body.phone) : null,
        company: body.company ? String(body.company) : null,
        job_site: body.jobSite ? String(body.jobSite) : null,
        notes: body.notes ? String(body.notes) : null,
        lines: body.lines ?? [],
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
          reply_to: String(body.email),
          subject: `Quote request: ${body.name}`,
          text: JSON.stringify(body, null, 2),
        }),
      })
    }
    return res.status(200).json({ ok: true })
  } catch (e: unknown) {
    return res.status(500).json({ error: e instanceof Error ? e.message : String(e) })
  }
}
