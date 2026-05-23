import type { VercelRequest, VercelResponse } from '@vercel/node'
import { requireAdmin } from './lib/adminAuth.js'
import { listOrdersAdmin, getOrderAdmin, updateOrderLineItem } from './lib/catalogDb.js'
import { sendTrackingEmailToCustomer } from './lib/orderEmails.js'

export const config = { runtime: 'nodejs' }

function parseJsonBody(req: VercelRequest): unknown {
  const b = req.body as unknown
  if (b == null) return {}
  if (typeof b === 'object') return b
  return null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return

  const orderId = typeof req.query.id === 'string' ? req.query.id : undefined

  if (req.method === 'GET' && !orderId) {
    try {
      const orders = await listOrdersAdmin()
      return res.status(200).json({ orders })
    } catch (e: unknown) {
      return res.status(500).json({ error: e instanceof Error ? e.message : String(e) })
    }
  }

  if (req.method === 'GET' && orderId) {
    try {
      const data = await getOrderAdmin(orderId)
      if (!data) return res.status(404).json({ error: 'Order not found' })
      const suppliers = new Set(
        data.lines.map((l) => l.primary_supplier_name_at_order_time).filter(Boolean),
      )
      return res.status(200).json({
        ...data,
        multi_supplier_warning: suppliers.size > 1,
      })
    } catch (e: unknown) {
      return res.status(500).json({ error: e instanceof Error ? e.message : String(e) })
    }
  }

  if (req.method === 'PATCH' && orderId) {
    const body = parseJsonBody(req)
    if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Invalid JSON' })
    const { lineId, patch, sendTracking } = body as {
      lineId?: string
      patch?: Record<string, unknown>
      sendTracking?: boolean
    }
    if (!lineId || !patch) return res.status(400).json({ error: 'lineId and patch required' })
    try {
      const updated = await updateOrderLineItem(lineId, patch)
      if (sendTracking && updated.supplier_tracking_number) {
        const orderData = await getOrderAdmin(orderId)
        if (orderData) {
          await sendTrackingEmailToCustomer(orderData.order, [updated])
          await updateOrderLineItem(lineId, {
            internal_fulfillment_status: 'Tracking Sent To Customer',
            tracking_sent_to_customer_date: new Date().toISOString().slice(0, 10),
          })
        }
      }
      return res.status(200).json({ line: updated })
    } catch (e: unknown) {
      return res.status(500).json({ error: e instanceof Error ? e.message : String(e) })
    }
  }

  res.setHeader('Allow', 'GET, PATCH')
  return res.status(405).json({ error: 'Method not allowed' })
}
