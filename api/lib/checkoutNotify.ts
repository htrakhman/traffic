/**
 * Shared checkout notification — called from Vercel (`api/checkout-notify.ts`)
 * and Netlify (`netlify/functions/checkout-notify.ts`).
 *
 * Env (server-only):
 *   RESEND_API_KEY — https://resend.com/api-keys
 *   CHECKOUT_NOTIFY_TO — comma-separated inbox(es), e.g. haroldtrakhman@gmail.com
 *   CHECKOUT_EMAIL_FROM — optional; default Resend sandbox from (domain verify for production)
 */

export type CheckoutLinePayload = {
  productId: string
  productName: string
  quantity: number
  rentalDays: number
  dailyRate: number
  lineTotal: number
}

export type CheckoutNotifyPayload = {
  name: string
  email: string
  phone?: string
  company?: string
  jobSite?: string
  notes?: string
  deliveryNeeded: boolean
  lines: CheckoutLinePayload[]
  totals: {
    totalDaily: number
    rentalGrandTotal: number
    deliveryPickupCombined: number
    grandTotal: number
  }
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function validatePayload(data: unknown): CheckoutNotifyPayload | null {
  if (!data || typeof data !== 'object') return null
  const o = data as Record<string, unknown>
  if (!isNonEmptyString(o.name) || !isNonEmptyString(o.email)) return null
  if (typeof o.deliveryNeeded !== 'boolean') return null
  if (!Array.isArray(o.lines)) return null
  const lines: CheckoutLinePayload[] = []
  for (const row of o.lines) {
    if (!row || typeof row !== 'object') return null
    const r = row as Record<string, unknown>
    if (
      !isNonEmptyString(r.productId) ||
      !isNonEmptyString(r.productName) ||
      typeof r.quantity !== 'number' ||
      typeof r.rentalDays !== 'number' ||
      typeof r.dailyRate !== 'number' ||
      typeof r.lineTotal !== 'number'
    ) {
      return null
    }
    lines.push({
      productId: r.productId.trim(),
      productName: r.productName.trim(),
      quantity: Math.max(1, Math.floor(r.quantity)),
      rentalDays: Math.max(1, Math.floor(r.rentalDays)),
      dailyRate: r.dailyRate,
      lineTotal: r.lineTotal,
    })
  }
  const t = o.totals
  if (!t || typeof t !== 'object') return null
  const tr = t as Record<string, unknown>
  if (
    typeof tr.totalDaily !== 'number' ||
    typeof tr.rentalGrandTotal !== 'number' ||
    typeof tr.deliveryPickupCombined !== 'number' ||
    typeof tr.grandTotal !== 'number'
  ) {
    return null
  }
  return {
    name: o.name.trim(),
    email: o.email.trim(),
    phone: isNonEmptyString(o.phone) ? o.phone.trim() : undefined,
    company: isNonEmptyString(o.company) ? o.company.trim() : undefined,
    jobSite: isNonEmptyString(o.jobSite) ? o.jobSite.trim() : undefined,
    notes: isNonEmptyString(o.notes) ? o.notes.trim() : undefined,
    deliveryNeeded: o.deliveryNeeded,
    lines,
    totals: {
      totalDaily: tr.totalDaily,
      rentalGrandTotal: tr.rentalGrandTotal,
      deliveryPickupCombined: tr.deliveryPickupCombined,
      grandTotal: tr.grandTotal,
    },
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatPlainText(p: CheckoutNotifyPayload): string {
  const lines = p.lines
    .map(
      (l) =>
        `- ${l.productName} (id ${l.productId}) · qty ${l.quantity} · ${l.rentalDays}d · $${l.lineTotal.toFixed(2)} rental`,
    )
    .join('\n')
  return [
    'New rental checkout submission',
    '',
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    p.phone ? `Phone: ${p.phone}` : 'Phone: (not provided)',
    p.company ? `Company: ${p.company}` : 'Company: (not provided)',
    p.jobSite ? `Job site / delivery: ${p.jobSite}` : 'Job site: (not provided)',
    `Delivery to job site: ${p.deliveryNeeded ? 'Yes' : 'No'}`,
    p.notes ? `Notes:\n${p.notes}` : 'Notes: (none)',
    '',
    'Line items:',
    lines,
    '',
    `Daily rate (all items): $${p.totals.totalDaily.toFixed(2)}/day`,
    `Rental subtotal: $${p.totals.rentalGrandTotal.toFixed(2)}`,
    `Delivery + pickup (est.): $${p.totals.deliveryPickupCombined.toFixed(2)}`,
    `Estimated grand total: $${p.totals.grandTotal.toFixed(2)}`,
  ].join('\n')
}

function formatHtml(p: CheckoutNotifyPayload): string {
  const rows = p.lines
    .map(
      (l) =>
        `<tr><td>${escapeHtml(l.productName)}</td><td>${l.quantity}</td><td>${l.rentalDays}</td><td>$${l.lineTotal.toFixed(2)}</td></tr>`,
    )
    .join('')
  return `<!DOCTYPE html><html><body style="font-family:sans-serif;line-height:1.5">
<h2>New rental checkout</h2>
<p><strong>Name:</strong> ${escapeHtml(p.name)}<br/>
<strong>Email:</strong> ${escapeHtml(p.email)}<br/>
<strong>Phone:</strong> ${p.phone ? escapeHtml(p.phone) : '—'}<br/>
<strong>Company:</strong> ${p.company ? escapeHtml(p.company) : '—'}<br/>
<strong>Job site / delivery:</strong> ${p.jobSite ? escapeHtml(p.jobSite) : '—'}<br/>
<strong>Delivery needed:</strong> ${p.deliveryNeeded ? 'Yes' : 'No'}</p>
${p.notes ? `<p><strong>Notes</strong><br/>${escapeHtml(p.notes).replace(/\n/g, '<br/>')}</p>` : ''}
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse"><thead><tr><th>Item</th><th>Qty</th><th>Days</th><th>Rental</th></tr></thead><tbody>${rows}</tbody></table>
<p><strong>Totals</strong><br/>
Daily (all items): $${p.totals.totalDaily.toFixed(2)}/day<br/>
Rental: $${p.totals.rentalGrandTotal.toFixed(2)}<br/>
Delivery + pickup: $${p.totals.deliveryPickupCombined.toFixed(2)}<br/>
<strong>Estimated total: $${p.totals.grandTotal.toFixed(2)}</strong></p>
</body></html>`
}

export type NotifyResult =
  | { ok: true }
  | { ok: false; status: number; code: string; message: string }

export async function sendCheckoutNotification(data: unknown): Promise<NotifyResult> {
  const payload = validatePayload(data)
  if (!payload) {
    return { ok: false, status: 400, code: 'invalid_payload', message: 'Invalid checkout payload' }
  }

  const apiKey = process.env.RESEND_API_KEY
  const toRaw = process.env.CHECKOUT_NOTIFY_TO
  if (!apiKey || !toRaw?.trim()) {
    return {
      ok: false,
      status: 503,
      code: 'email_not_configured',
      message: 'Checkout email is not configured (RESEND_API_KEY and CHECKOUT_NOTIFY_TO).',
    }
  }

  const from =
    process.env.CHECKOUT_EMAIL_FROM?.trim() || 'Traffic Control Rental <onboarding@resend.dev>'
  const to = toRaw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const subject = `Rental checkout: ${payload.name}`
  const text = formatPlainText(payload)
  const html = formatHtml(payload)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject,
      text,
      html,
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => res.statusText)
    console.error('[checkout-notify] Resend error', res.status, detail)
    return {
      ok: false,
      status: 502,
      code: 'upstream_error',
      message: 'Failed to send notification email',
    }
  }

  return { ok: true }
}
