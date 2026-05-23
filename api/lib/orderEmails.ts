import type { DbOrder, DbOrderLineItem } from './dropshipTypes.js'
import { SITE_NAME, SITE_CONTACT_EMAIL } from '../../src/config/site.js'

async function sendResend(to: string, subject: string, html: string, text: string): Promise<void> {
  const key = process.env.RESEND_API_KEY?.trim()
  if (!key) {
    console.warn('[orderEmails] RESEND_API_KEY not set — skipping email')
    return
  }
  const from = process.env.CHECKOUT_EMAIL_FROM?.trim() || `${SITE_NAME} <onboarding@resend.dev>`
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject, html, text }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend failed: ${res.status} ${body}`)
  }
}

export async function sendCustomerOrderConfirmation(
  order: DbOrder,
  lines: DbOrderLineItem[],
): Promise<void> {
  const lineRows = lines
    .map(
      (l) =>
        `<tr><td>${escapeHtml(l.product_purchased)}</td><td>${l.quantity_purchased}</td><td>$${l.customer_paid_total.toFixed(2)}</td></tr>`,
    )
    .join('')
  const textLines = lines
    .map((l) => `- ${l.product_purchased} × ${l.quantity_purchased} — $${l.customer_paid_total.toFixed(2)}`)
    .join('\n')

  const html = `<!DOCTYPE html><html><body style="font-family:sans-serif;line-height:1.5">
<h2>Thank you for your order — ${escapeHtml(SITE_NAME)}</h2>
<p>Hi ${escapeHtml(order.customer_name)},</p>
<p>We received your order <strong>${escapeHtml(order.order_number)}</strong>. Our team will confirm fulfillment shortly.</p>
<p>Most orders ship in 1 to 3 business days from our U.S. supplier network. Tracking will be sent once your order ships.</p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse"><thead><tr><th>Item</th><th>Qty</th><th>Line total</th></tr></thead><tbody>${lineRows}</tbody></table>
<p><strong>Estimated total:</strong> $${order.grand_total.toFixed(2)}</p>
<p>Questions? Reply to this email or contact us at ${escapeHtml(SITE_CONTACT_EMAIL)}.</p>
<p>— ${escapeHtml(SITE_NAME)}</p>
</body></html>`

  const text = [
    `Thank you for your order — ${SITE_NAME}`,
    '',
    `Order ${order.order_number}`,
    '',
    textLines,
    '',
    `Estimated total: $${order.grand_total.toFixed(2)}`,
    '',
    'Most orders ship in 1 to 3 business days. Tracking provided after fulfillment.',
  ].join('\n')

  await sendResend(order.customer_email, `Order confirmation — ${order.order_number}`, html, text)
}

export async function sendTrackingEmailToCustomer(
  order: DbOrder,
  lines: DbOrderLineItem[],
): Promise<void> {
  const trackingLines = lines.filter((l) => l.supplier_tracking_number)
  if (!trackingLines.length) return

  const rows = trackingLines
    .map(
      (l) =>
        `<tr><td>${escapeHtml(l.product_purchased)}</td><td>${escapeHtml(l.supplier_tracking_number!)}</td></tr>`,
    )
    .join('')

  const html = `<!DOCTYPE html><html><body style="font-family:sans-serif;line-height:1.5">
<h2>Your shipment is on the way — ${escapeHtml(SITE_NAME)}</h2>
<p>Hi ${escapeHtml(order.customer_name)},</p>
<p>Tracking is available for your order <strong>${escapeHtml(order.order_number)}</strong>:</p>
<table border="1" cellpadding="6" cellspacing="0"><thead><tr><th>Item</th><th>Tracking</th></tr></thead><tbody>${rows}</tbody></table>
<p>— ${escapeHtml(SITE_NAME)}</p>
</body></html>`

  const text = trackingLines
    .map((l) => `${l.product_purchased}: ${l.supplier_tracking_number}`)
    .join('\n')

  await sendResend(
    order.customer_email,
    `Tracking update — ${order.order_number}`,
    html,
    `Tracking for order ${order.order_number}:\n${text}`,
  )
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
