import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAdminAuth } from './AdminLayout'
import type { ProductWithMetrics } from '../../types/dropship'

export default function AdminProductEdit() {
  const { id } = useParams()
  const { headers } = useAdminAuth()
  const [product, setProduct] = useState<ProductWithMetrics | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/products', { headers: headers() })
      .then((r) => r.json())
      .then((d: { products?: ProductWithMetrics[] }) => {
        setProduct(d.products?.find((p) => p.id === id) ?? null)
      })
  }, [id, headers])

  const save = async () => {
    if (!product) return
    setSaving(true)
    setMsg(null)
    const res = await fetch('/api/admin/products', {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify(product),
    })
    const data = await res.json()
    setSaving(false)
    if (data.product) {
      setProduct(data.product)
      setMsg('Saved')
    } else setMsg(data.error ?? 'Save failed')
  }

  if (!product) return <p className="text-slate-400">Loading…</p>

  const set = (key: keyof ProductWithMetrics, val: unknown) =>
    setProduct((p) => (p ? { ...p, [key]: val } : p))

  return (
    <div className="max-w-3xl">
      <Link to="/admin/supplier-source-map" className="text-sm text-brand-400 mb-4 inline-block">
        ← Source map
      </Link>
      <h1 className="text-2xl font-bold text-white mb-6">{product.name}</h1>

      <div className="space-y-4 card p-6">
        <h2 className="font-semibold text-white">Public</h2>
        <label className="block text-sm text-slate-400">
          Selling price
          <input type="number" step="0.01" className="input-dark w-full mt-1" value={product.selling_price} onChange={(e) => set('selling_price', parseFloat(e.target.value))} />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-400">
          <input type="checkbox" checked={product.quote_only} onChange={(e) => set('quote_only', e.target.checked)} />
          Quote only
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-400">
          <input type="checkbox" checked={product.in_stock} onChange={(e) => set('in_stock', e.target.checked)} />
          In stock
        </label>

        <h2 className="font-semibold text-white pt-4">Primary supplier</h2>
        <input className="input-dark w-full" placeholder="Name" value={product.primary_supplier_name ?? ''} onChange={(e) => set('primary_supplier_name', e.target.value)} />
        <input className="input-dark w-full" placeholder="URL" value={product.primary_supplier_url ?? ''} onChange={(e) => set('primary_supplier_url', e.target.value)} />
        <input className="input-dark w-full" placeholder="SKU" value={product.primary_supplier_sku ?? ''} onChange={(e) => set('primary_supplier_sku', e.target.value)} />
        <input type="number" step="0.01" className="input-dark w-full" placeholder="Unit cost" value={product.primary_supplier_unit_cost ?? ''} onChange={(e) => set('primary_supplier_unit_cost', parseFloat(e.target.value) || null)} />
        <input type="number" step="0.01" className="input-dark w-full" placeholder="Shipping estimate" value={product.primary_supplier_shipping_estimate ?? ''} onChange={(e) => set('primary_supplier_shipping_estimate', parseFloat(e.target.value) || null)} />

        <h2 className="font-semibold text-white pt-4">Backup supplier</h2>
        <input className="input-dark w-full" value={product.backup_supplier_name ?? ''} onChange={(e) => set('backup_supplier_name', e.target.value)} />
        <input className="input-dark w-full" value={product.backup_supplier_url ?? ''} onChange={(e) => set('backup_supplier_url', e.target.value)} />

        <label className="block text-sm text-slate-400">
          Fulfillment notes
          <textarea className="input-dark w-full mt-1 min-h-[80px]" value={product.fulfillment_notes ?? ''} onChange={(e) => set('fulfillment_notes', e.target.value)} />
        </label>

        <p className="text-sm text-slate-500">
          Landed: {product.primary_supplier_landed_cost != null ? `$${product.primary_supplier_landed_cost}` : '—'} · Margin:{' '}
          {product.actual_margin_percentage != null ? `${product.actual_margin_percentage}%` : '—'} · {product.price_status}
        </p>

        <button type="button" className="btn-primary" disabled={saving} onClick={save}>
          {saving ? 'Saving…' : 'Save'}
        </button>
        {msg && <p className="text-sm text-emerald-400">{msg}</p>}
      </div>
    </div>
  )
}
