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
  /** Store catalog SKU; included on checkouts for fulfillment. */
  sku?: string
  /** OEM / supplier reorder SKU when present. */
  supplierSku?: string
  quantity: number
  unitPrice: number
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
    merchandiseSubtotal: number
    deliveryPickupCombined: number
    grandTotal: number
  }
  /** True when they paid for membership via Stripe during this checkout flow. */
  membershipSubscribedAtCheckout?: boolean
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

/** Accept legacy duration payloads (rentalDays + dailyRate) and map to purchase shape. */
function normalizeLineRow(r: Record<string, unknown>): CheckoutLinePayload | null {
  if (
    !isNonEmptyString(r.productId) ||
    !isNonEmptyString(r.productName) ||
    typeof r.quantity !== 'number' ||
    typeof r.lineTotal !== 'number'
  ) {
    return null
  }
  const sku = isNonEmptyString(r.sku) ? r.sku.trim() : undefined
  const supplierSku = isNonEmptyString(r.supplierSku) ? r.supplierSku.trim() : undefined
  const qty = Math.max(1, Math.floor(r.quantity))
  let unitPrice: number
  if (typeof r.unitPrice === 'number') {
    unitPrice = r.unitPrice
  } else if (typeof r.dailyRate === 'number' && typeof r.rentalDays === 'number') {
    unitPrice = r.dailyRate * Math.max(1, Math.floor(r.rentalDays))
  } else {
    return null
  }
  return {
    productId: r.productId.trim(),
    productName: r.productName.trim(),
    sku,
    supplierSku,
    quantity: qty,
    unitPrice,
    lineTotal: r.lineTotal,
  }
}

function normalizeTotals(tr: Record<string, unknown>): CheckoutNotifyPayload['totals'] | null {
  if (
    typeof tr.merchandiseSubtotal === 'number' &&
    typeof tr.deliveryPickupCombined === 'number' &&
    typeof tr.grandTotal === 'number'
  ) {
    return {
      merchandiseSubtotal: tr.merchandiseSubtotal,
      deliveryPickupCombined: tr.deliveryPickupCombined,
      grandTotal: tr.grandTotal,
    }
  }
  if (
    typeof tr.totalDaily === 'number' &&
    typeof tr.rentalGrandTotal === 'number' &&
    typeof tr.deliveryPickupCombined === 'number' &&
    typeof tr.grandTotal === 'number'
  ) {
    return {
      merchandiseSubtotal: tr.rentalGrandTotal,
      deliveryPickupCombined: tr.deliveryPickupCombined,
      grandTotal: tr.grandTotal,
    }
  }
  return null
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
    const normalized = normalizeLineRow(row as Record<string, unknown>)
    if (!normalized) return null
    lines.push(normalized)
  }
  const t = o.totals
  if (!t || typeof t !== 'object') return null
  const totals = normalizeTotals(t as Record<string, unknown>)
  if (!totals) return null

  const membershipSubscribedAtCheckout =
    o.membershipSubscribedAtCheckout === true ? true : undefined

  return {
    name: o.name.trim(),
    email: o.email.trim(),
    phone: isNonEmptyString(o.phone) ? o.phone.trim() : undefined,
    company: isNonEmptyString(o.company) ? o.company.trim() : undefined,
    jobSite: isNonEmptyString(o.jobSite) ? o.jobSite.trim() : undefined,
    notes: isNonEmptyString(o.notes) ? o.notes.trim() : undefined,
    deliveryNeeded: o.deliveryNeeded,
    lines,
    totals,
    membershipSubscribedAtCheckout,
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function skuPlainSuffix(l: CheckoutLinePayload): string {
  const parts: string[] = []
  if (l.sku) parts.push(`SKU ${l.sku}`)
  if (l.supplierSku) parts.push(`supplier ${l.supplierSku}`)
  return parts.length ? ` · ${parts.join(' · ')}` : ''
}

function formatPlainText(p: CheckoutNotifyPayload): string {
  const lines = p.lines
    .map(
      (l) =>
        `- ${l.productName} (id ${l.productId})${skuPlainSuffix(l)} · qty ${l.quantity} · $${l.unitPrice.toFixed(2)}/unit (tier) · line $${l.lineTotal.toFixed(2)}`,
    )
    .join('\n')
  return [
    'New purchase checkout submission',
    '',
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    p.phone ? `Phone: ${p.phone}` : 'Phone: (not provided)',
    p.company ? `Company: ${p.company}` : 'Company: (not provided)',
    p.jobSite ? `Job site / delivery: ${p.jobSite}` : 'Job site: (not provided)',
    `Delivery to job site: ${p.deliveryNeeded ? 'Yes' : 'No'}`,
    ...(p.membershipSubscribedAtCheckout
      ? ['Membership: customer subscribed to $150/mo during checkout (Stripe).']
      : []),
    p.notes ? `Notes:\n${p.notes}` : 'Notes: (none)',
    '',
    'Line items:',
    lines,
    '',
    `Merchandise subtotal: $${p.totals.merchandiseSubtotal.toFixed(2)}`,
    `Shipping (shown at checkout): $${p.totals.deliveryPickupCombined.toFixed(2)}`,
    `Estimated grand total: $${p.totals.grandTotal.toFixed(2)}`,
  ].join('\n')
}

function formatHtml(p: CheckoutNotifyPayload): string {
  const rows = p.lines
    .map((l) => {
      let skuCell = '—'
      if (l.sku && l.supplierSku) {
        skuCell = `<span style="font-family:ui-monospace,monospace">${escapeHtml(l.sku)}</span><br/><span style="font-size:12px;color:#555">Supplier: ${escapeHtml(l.supplierSku)}</span>`
      } else if (l.sku) {
        skuCell = `<span style="font-family:ui-monospace,monospace">${escapeHtml(l.sku)}</span>`
      } else if (l.supplierSku) {
        skuCell = `<span style="font-size:12px;color:#555">Supplier: ${escapeHtml(l.supplierSku)}</span>`
      }
      return `<tr><td>${escapeHtml(l.productName)}</td><td>${skuCell}</td><td>${l.quantity}</td><td>$${l.unitPrice.toFixed(2)}</td><td>$${l.lineTotal.toFixed(2)}</td></tr>`
    })
    .join('')
  return `<!DOCTYPE html><html><body style="font-family:sans-serif;line-height:1.5">
<h2>New purchase checkout</h2>
<p><strong>Name:</strong> ${escapeHtml(p.name)}<br/>
<strong>Email:</strong> ${escapeHtml(p.email)}<br/>
<strong>Phone:</strong> ${p.phone ? escapeHtml(p.phone) : '—'}<br/>
<strong>Company:</strong> ${p.company ? escapeHtml(p.company) : '—'}<br/>
<strong>Job site / delivery:</strong> ${p.jobSite ? escapeHtml(p.jobSite) : '—'}<br/>
<strong>Delivery needed:</strong> ${p.deliveryNeeded ? 'Yes' : 'No'}</p>
${
    p.membershipSubscribedAtCheckout
      ? '<p><strong>Membership:</strong> Customer subscribed to $150/mo during checkout (Stripe).</p>'
      : ''
  }
${p.notes ? `<p><strong>Notes</strong><br/>${escapeHtml(p.notes).replace(/\n/g, '<br/>')}</p>` : ''}
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse"><thead><tr><th>Item</th><th>SKU</th><th>Qty</th><th>Unit</th><th>Line</th></tr></thead><tbody>${rows}</tbody></table>
<p><strong>Totals</strong><br/>
Merchandise: $${p.totals.merchandiseSubtotal.toFixed(2)}<br/>
Shipping line: $${p.totals.deliveryPickupCombined.toFixed(2)}<br/>
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
    process.env.CHECKOUT_EMAIL_FROM?.trim() || 'Traffic Control Supply <onboarding@resend.dev>'
  const to = toRaw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const subject = `Purchase checkout: ${payload.name}`
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
