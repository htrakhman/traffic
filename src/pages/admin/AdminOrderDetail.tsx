import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAdminAuth } from './AdminLayout'
import type { DbOrder, DbOrderLineItem, FulfillmentStatus } from '../../types/dropship'

const STATUSES: FulfillmentStatus[] = [
  'Needs Supplier Order',
  'Supplier Order Placed',
  'Waiting For Tracking',
  'Tracking Sent To Customer',
  'Delivered',
  'Issue / Backorder',
  'Refund Needed',
  'Canceled',
]

export default function AdminOrderDetail() {
  const { id } = useParams()
  const { headers } = useAdminAuth()
  const [order, setOrder] = useState<DbOrder | null>(null)
  const [lines, setLines] = useState<DbOrderLineItem[]>([])
  const [multiWarning, setMultiWarning] = useState(false)

  const load = () => {
    fetch(`/api/admin/orders?id=${id}`, { headers: headers() })
      .then((r) => r.json())
      .then((d) => {
        setOrder(d.order)
        setLines(d.lines ?? [])
        setMultiWarning(Boolean(d.multi_supplier_warning))
      })
  }

  useEffect(() => {
    load()
  }, [id, headers])

  const grouped = useMemo(() => {
    const map = new Map<string, DbOrderLineItem[]>()
    for (const line of lines) {
      const key = line.primary_supplier_name_at_order_time ?? 'Unknown supplier'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(line)
    }
    return map
  }, [lines])

  const saveLine = async (lineId: string, patch: Partial<DbOrderLineItem>, sendTracking?: boolean) => {
    await fetch(`/api/admin/orders?id=${id}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({ lineId, patch, sendTracking }),
    })
    load()
  }

  if (!order) return <p className="text-slate-400">Loading…</p>

  return (
    <div>
      <Link to="/admin/orders" className="text-sm text-brand-400 mb-4 inline-block">
        ← Orders
      </Link>
      <h1 className="text-2xl font-bold text-white mb-2">{order.order_number}</h1>
      <p className="text-slate-400 mb-6">
        {order.customer_name} · {order.customer_email} · ${order.grand_total.toFixed(2)}
      </p>

      {multiWarning && (
        <div className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm">
          This order requires multiple suppliers. Customer may receive multiple shipments.
        </div>
      )}

      <section className="mb-8 card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Supplier Fulfillment workflow</h2>
        <ol className="list-decimal list-inside text-sm text-slate-400 space-y-1">
          <li>Open primary supplier URL</li>
          <li>Order using customer shipping address</li>
          <li>Enter supplier order number</li>
          <li>Wait for tracking from supplier</li>
          <li>Enter supplier tracking number</li>
          <li>Send tracking update to customer under Traffic Control Supply brand</li>
        </ol>
      </section>

      {[...grouped.entries()].map(([supplier, supplierLines]) => (
        <div key={supplier} className="mb-8">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Supplier group: {supplier}
          </h3>
          <div className="space-y-4">
            {supplierLines.map((line) => (
              <div key={line.id} className="card p-5 space-y-3">
                <div className="flex flex-wrap justify-between gap-2">
                  <div>
                    <p className="font-medium text-white">{line.product_purchased}</p>
                    <p className="text-sm text-slate-400">
                      Qty {line.quantity_purchased} · Customer paid ${line.customer_paid_total.toFixed(2)}
                      {line.expected_gross_margin != null && ` · Expected margin ${line.expected_gross_margin}%`}
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-slate-500">Primary supplier</p>
                    <p className="text-slate-200">{line.primary_supplier_name_at_order_time}</p>
                    {line.primary_supplier_url_at_order_time && (
                      <a href={line.primary_supplier_url_at_order_time} target="_blank" rel="noreferrer" className="text-brand-400 text-xs break-all">
                        {line.primary_supplier_url_at_order_time}
                      </a>
                    )}
                    <p className="text-slate-500 mt-2">SKU: {line.primary_supplier_sku_at_order_time ?? '—'}</p>
                    <p className="text-slate-400">
                      Cost: ${line.primary_supplier_unit_cost_at_order_time?.toFixed(2) ?? '—'} + ship $
                      {line.primary_supplier_shipping_estimate_at_order_time?.toFixed(2) ?? '—'} = landed $
                      {line.primary_supplier_landed_cost_at_order_time?.toFixed(2) ?? '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500">Backup</p>
                    <p className="text-slate-200">{line.backup_supplier_name_at_order_time ?? '—'}</p>
                    {line.backup_supplier_url_at_order_time && (
                      <a href={line.backup_supplier_url_at_order_time} target="_blank" rel="noreferrer" className="text-brand-400 text-xs break-all">
                        Backup URL
                      </a>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    className="input-dark text-sm"
                    placeholder="Supplier order number"
                    defaultValue={line.supplier_order_number ?? ''}
                    onBlur={(e) => saveLine(line.id, { supplier_order_number: e.target.value })}
                  />
                  <input
                    className="input-dark text-sm"
                    placeholder="Supplier tracking number"
                    defaultValue={line.supplier_tracking_number ?? ''}
                    onBlur={(e) => saveLine(line.id, { supplier_tracking_number: e.target.value })}
                  />
                </div>
                <select
                  className="input-dark text-sm max-w-xs"
                  value={line.internal_fulfillment_status}
                  onChange={(e) => saveLine(line.id, { internal_fulfillment_status: e.target.value as FulfillmentStatus })}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <textarea
                  className="input-dark text-sm w-full min-h-[60px]"
                  placeholder="Internal fulfillment notes"
                  defaultValue={line.internal_fulfillment_notes ?? ''}
                  onBlur={(e) => saveLine(line.id, { internal_fulfillment_notes: e.target.value })}
                />
                <button
                  type="button"
                  className="btn-secondary text-sm"
                  onClick={() => saveLine(line.id, {}, true)}
                >
                  Send tracking to customer
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
