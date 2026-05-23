import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdminAuth } from './AdminLayout'
import type { DbOrder } from '../../types/dropship'

export default function AdminOrders() {
  const { headers } = useAdminAuth()
  const [orders, setOrders] = useState<(DbOrder & { line_count?: number })[]>([])

  useEffect(() => {
    fetch('/api/admin/orders', { headers: headers() })
      .then((r) => r.json())
      .then((d) => setOrders(d.orders ?? []))
  }, [headers])

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Orders</h1>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-slate-500 border-b border-slate-800">
            <tr>
              <th className="p-3 text-left">Order</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-slate-800">
                <td className="p-3">
                  <Link to={`/admin/orders/${o.id}`} className="text-brand-400">
                    {o.order_number}
                  </Link>
                </td>
                <td className="p-3 text-slate-300">{o.customer_name}</td>
                <td className="p-3">${o.grand_total.toFixed(2)}</td>
                <td className="p-3 text-slate-500">{new Date(o.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="p-6 text-slate-500">No orders yet (requires Supabase).</p>}
      </div>
    </div>
  )
}
