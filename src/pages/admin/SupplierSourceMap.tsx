import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdminAuth } from './AdminLayout'
import type { ProductWithMetrics } from '../../types/dropship'

type SortKey =
  | 'name'
  | 'margin'
  | 'margin_desc'
  | 'price'
  | 'price_desc'
  | 'price_check'
  | 'supplier'
  | 'category'

const FULFILLMENT_STATUSES = [
  'New Order',
  'Needs Supplier Order',
  'Supplier Order Placed',
  'Waiting For Tracking',
  'Tracking Sent To Customer',
  'Delivered',
  'Issue / Backorder',
  'Refund Needed',
  'Canceled',
] as const

export { FULFILLMENT_STATUSES }

export default function SupplierSourceMap() {
  const { headers } = useAdminAuth()
  const [products, setProducts] = useState<ProductWithMetrics[]>([])
  const [error, setError] = useState<string | null>(null)
  const [filterSupplier, setFilterSupplier] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filterAvailability, setFilterAvailability] = useState('')
  const [filterPriceStatus, setFilterPriceStatus] = useState('')
  const [needsPriceCheck, setNeedsPriceCheck] = useState(false)
  const [outOfStock, setOutOfStock] = useState(false)
  const [activeOnly, setActiveOnly] = useState(false)
  const [marginBelowTarget, setMarginBelowTarget] = useState(false)
  const [sort, setSort] = useState<SortKey>('name')

  useEffect(() => {
    fetch('/api/admin/products', { headers: headers() })
      .then((r) => r.json())
      .then((d: { products?: ProductWithMetrics[]; error?: string }) => {
        if (d.error) setError(d.error)
        else setProducts(d.products ?? [])
      })
      .catch(() => setError('Failed to load products'))
  }, [headers])

  const filtered = useMemo(() => {
    let list = [...products]
    if (filterSupplier) list = list.filter((p) => p.primary_supplier_name === filterSupplier)
    if (filterCategory) list = list.filter((p) => p.category_slug === filterCategory)
    if (filterRole) list = list.filter((p) => p.product_role === filterRole)
    if (filterAvailability) list = list.filter((p) => p.availability_status === filterAvailability)
    if (filterPriceStatus) list = list.filter((p) => p.price_status === filterPriceStatus)
    if (needsPriceCheck) list = list.filter((p) => p.availability_status === 'Needs Price Check')
    if (outOfStock) list = list.filter((p) => p.availability_status === 'Out of Stock')
    if (activeOnly) list = list.filter((p) => p.status === 'active')
    if (marginBelowTarget) list = list.filter((p) => p.margin_warning)

    list.sort((a, b) => {
      switch (sort) {
        case 'margin':
          return (a.actual_margin_percentage ?? 0) - (b.actual_margin_percentage ?? 0)
        case 'margin_desc':
          return (b.actual_margin_percentage ?? 0) - (a.actual_margin_percentage ?? 0)
        case 'price':
          return a.selling_price - b.selling_price
        case 'price_desc':
          return b.selling_price - a.selling_price
        case 'price_check':
          return (a.last_price_checked_date ?? '').localeCompare(b.last_price_checked_date ?? '')
        case 'supplier':
          return (a.primary_supplier_name ?? '').localeCompare(b.primary_supplier_name ?? '')
        case 'category':
          return a.category_slug.localeCompare(b.category_slug)
        default:
          return a.name.localeCompare(b.name)
      }
    })
    return list
  }, [
    products,
    filterSupplier,
    filterCategory,
    filterRole,
    filterAvailability,
    filterPriceStatus,
    needsPriceCheck,
    outOfStock,
    activeOnly,
    marginBelowTarget,
    sort,
  ])

  const suppliers = [...new Set(products.map((p) => p.primary_supplier_name).filter(Boolean))]

  const exportCsv = async () => {
    const res = await fetch('/api/admin/catalog-csv', { headers: headers() })
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'supplier-source-map.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importCsv = async (file: File) => {
    const csv = await file.text()
    await fetch('/api/admin/catalog-csv', { method: 'POST', headers: headers(), body: JSON.stringify({ csv }) })
    window.location.reload()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Supplier Source Map</h1>
        <div className="flex gap-2">
          <button type="button" className="btn-secondary text-sm" onClick={exportCsv}>
            Export CSV
          </button>
          <label className="btn-secondary text-sm cursor-pointer">
            Import CSV
            <input type="file" accept=".csv" className="hidden" onChange={(e) => e.target.files?.[0] && importCsv(e.target.files[0])} />
          </label>
        </div>
      </div>
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 text-sm">
        <select className="input-dark" value={filterSupplier} onChange={(e) => setFilterSupplier(e.target.value)}>
          <option value="">All suppliers</option>
          {suppliers.map((s) => (
            <option key={s} value={s!}>{s}</option>
          ))}
        </select>
        <select className="input-dark" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All categories</option>
          {[...new Set(products.map((p) => p.category_slug))].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select className="input-dark" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
          <option value="">All roles</option>
          <option value="Price Leader">Price Leader</option>
          <option value="Normal Margin">Normal Margin</option>
          <option value="Quote Only">Quote Only</option>
        </select>
        <select className="input-dark" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
          <option value="name">Sort: Name</option>
          <option value="margin">Lowest margin</option>
          <option value="margin_desc">Highest margin</option>
          <option value="price_check">Oldest price check</option>
          <option value="price_desc">Highest selling price</option>
          <option value="price">Lowest selling price</option>
          <option value="supplier">Supplier name</option>
          <option value="category">Category</option>
        </select>
        <select className="input-dark" value={filterAvailability} onChange={(e) => setFilterAvailability(e.target.value)}>
          <option value="">All availability</option>
          <option value="Active">Active</option>
          <option value="Needs Price Check">Needs Price Check</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Quote Only">Quote Only</option>
        </select>
        <select className="input-dark" value={filterPriceStatus} onChange={(e) => setFilterPriceStatus(e.target.value)}>
          <option value="">All price status</option>
          <option value="Cheapest">Cheapest</option>
          <option value="Within 5 Percent">Within 5 Percent</option>
          <option value="Overpriced">Overpriced</option>
          <option value="Needs Review">Needs Review</option>
        </select>
        <label className="flex items-center gap-2 text-slate-400">
          <input type="checkbox" checked={marginBelowTarget} onChange={(e) => setMarginBelowTarget(e.target.checked)} />
          Margin below target
        </label>
        <label className="flex items-center gap-2 text-slate-400">
          <input type="checkbox" checked={needsPriceCheck} onChange={(e) => setNeedsPriceCheck(e.target.checked)} />
          Needs price check
        </label>
        <label className="flex items-center gap-2 text-slate-400">
          <input type="checkbox" checked={outOfStock} onChange={(e) => setOutOfStock(e.target.checked)} />
          Out of stock
        </label>
        <label className="flex items-center gap-2 text-slate-400">
          <input type="checkbox" checked={activeOnly} onChange={(e) => setActiveOnly(e.target.checked)} />
          Active only
        </label>
      </div>

      <div className="overflow-x-auto card">
        <table className="w-full text-sm text-left">
          <thead className="text-slate-500 border-b border-slate-800">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Sell</th>
              <th className="p-3">Primary supplier</th>
              <th className="p-3">Unit cost</th>
              <th className="p-3">Landed</th>
              <th className="p-3">Margin</th>
              <th className="p-3">Role</th>
              <th className="p-3">Availability</th>
              <th className="p-3">Price status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-slate-800/80 hover:bg-slate-900/50">
                <td className="p-3">
                  <Link to={`/admin/products/${p.id}`} className="text-brand-400 hover:underline">
                    {p.name}
                  </Link>
                  {p.admin_warnings.length > 0 && (
                    <ul className="mt-1 text-xs text-amber-400">
                      {p.admin_warnings.map((w) => (
                        <li key={w}>⚠ {w}</li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="p-3 text-slate-400">{p.category_slug}</td>
                <td className="p-3">${p.selling_price.toFixed(2)}</td>
                <td className="p-3">
                  {p.primary_supplier_name}
                  {p.primary_supplier_url && (
                    <a href={p.primary_supplier_url} target="_blank" rel="noreferrer" className="block text-xs text-brand-400 truncate max-w-[180px]">
                      Open URL
                    </a>
                  )}
                </td>
                <td className="p-3">{p.primary_supplier_unit_cost != null ? `$${p.primary_supplier_unit_cost.toFixed(2)}` : '—'}</td>
                <td className="p-3">{p.primary_supplier_landed_cost != null ? `$${p.primary_supplier_landed_cost.toFixed(2)}` : '—'}</td>
                <td className="p-3">{p.actual_margin_percentage != null ? `${p.actual_margin_percentage}%` : '—'}</td>
                <td className="p-3 text-slate-400">{p.product_role ?? '—'}</td>
                <td className="p-3 text-slate-400">{p.availability_status}</td>
                <td className="p-3 text-slate-400">{p.price_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
