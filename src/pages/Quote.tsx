import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { CheckCircle, Package, Trash2, Plus, Minus } from 'lucide-react'
import type { Product, AIRecommendation } from '../types'
import type { CartLine } from '../context/CartContext'
import { useCart } from '../context/CartContext'
import { getProductById } from '../data/products'

interface QuoteItem {
  product: Product
  quantity: number
  days: number
}

interface LocationState {
  product?: Product
  quantity?: number
  rentalDays?: number
  recommendation?: AIRecommendation
}

function buildInitialItems(state: LocationState, cartLines: CartLine[]): QuoteItem[] {
  if (state.recommendation) {
    return state.recommendation.items
      .map((item) => {
        const prod = getProductById(item.productId)
        if (!prod) return null
        return { product: prod, quantity: item.quantity, days: state.recommendation!.estimatedDurationDays }
      })
      .filter(Boolean) as QuoteItem[]
  }
  if (state.product) {
    return [{ product: state.product, quantity: state.quantity ?? 1, days: state.rentalDays ?? 1 }]
  }
  if (cartLines.length === 0) return []
  return cartLines
    .map((line) => {
      const prod = getProductById(line.productId)
      if (!prod) return null
      return { product: prod, quantity: line.quantity, days: line.rentalDays }
    })
    .filter(Boolean) as QuoteItem[]
}

export default function Quote() {
  const location = useLocation()
  const state = (location.state ?? {}) as LocationState
  const { lines: cartLines } = useCart()

  const [items, setItems] = useState<QuoteItem[]>(() => buildInitialItems(state, cartLines))
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobSite: '',
    startDate: '',
    notes: '',
    deliveryNeeded: true,
  })

  const set = <K extends keyof typeof form>(key: K, val: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: val }))

  const updateItem = (i: number, qty?: number, days?: number) => {
    setItems((prev) => {
      const updated = [...prev]
      if (qty !== undefined) updated[i] = { ...updated[i], quantity: Math.max(1, qty) }
      if (days !== undefined) updated[i] = { ...updated[i], days: Math.max(1, days) }
      return updated
    })
  }

  const removeItem = (i: number) => setItems((prev) => prev.filter((_, j) => j !== i))

  const totalDaily = items.reduce((s, item) => s + item.product.dailyRate * item.quantity, 0)
  const grandTotal = items.reduce((s, item) => s + item.product.dailyRate * item.quantity * item.days, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={28} className="text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Quote Request Sent!</h1>
          <p className="text-slate-400 mb-2">
            Thanks, <strong className="text-white">{form.name}</strong>. We've received your quote request.
          </p>
          <p className="text-slate-400 mb-8">
            You'll receive a formal quote at <strong className="text-white">{form.email}</strong> within a few hours. For urgent needs, call <a href="tel:+18005551234" className="text-brand-400">1-800-555-1234</a>.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="btn-secondary">Back to Home</Link>
            <Link to="/browse" className="btn-primary">Browse More</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-20">
      <div className="border-b border-slate-800/60 bg-slate-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-3xl font-bold text-white mb-1">Request a Quote</h1>
          <p className="text-slate-400">We'll confirm availability and send you a formal quote.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Equipment list */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-semibold text-white">Equipment Requested</h2>

            {items.length === 0 ? (
              <div className="card p-8 text-center">
                <Package size={32} className="text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 mb-4">No items added yet.</p>
                <Link to="/browse" className="btn-primary text-sm">Browse Equipment</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item, i) => (
                  <div key={i} className="card p-4 flex gap-4">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-20 h-16 object-cover rounded-lg flex-shrink-0 bg-slate-800"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white text-sm leading-snug">{item.product.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">${item.product.dailyRate.toFixed(2)}/{item.product.unit}/day</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">Qty:</span>
                          <div className="flex items-center gap-1">
                            <button type="button" onClick={() => updateItem(i, item.quantity - 1)} className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded text-white text-xs transition-colors flex items-center justify-center">
                              <Minus size={10} />
                            </button>
                            <span className="w-8 text-center text-sm text-white font-medium">{item.quantity}</span>
                            <button type="button" onClick={() => updateItem(i, item.quantity + 1)} className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded text-white text-xs transition-colors flex items-center justify-center">
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">Days:</span>
                          <input
                            type="number"
                            value={item.days}
                            onChange={(e) => updateItem(i, undefined, Number(e.target.value))}
                            min={1}
                            className="w-14 input py-1 text-xs text-center"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-white">${(item.product.dailyRate * item.quantity * item.days).toFixed(2)}</div>
                      <div className="text-xs text-slate-500">est. total</div>
                      <button
                        type="button"
                        onClick={() => removeItem(i)}
                        className="mt-2 p-1 text-slate-600 hover:text-red-400 transition-colors rounded"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add more */}
            <Link to="/browse" className="btn-secondary text-sm w-full justify-center">
              <Plus size={14} />
              Add More Equipment
            </Link>

            {/* Totals */}
            {items.length > 0 && (
              <div className="card p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Daily rate (all items)</span>
                    <span>${totalDaily.toFixed(2)}/day</span>
                  </div>
                  <div className="flex justify-between font-semibold text-white text-base pt-2 border-t border-slate-800">
                    <span>Estimated total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Final pricing will be confirmed in the formal quote. Delivery charges may apply.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-5">
            <div className="card p-6 space-y-4 sticky top-24">
              <h2 className="font-semibold text-white">Your Information</h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Name *</label>
                  <input value={form.name} onChange={(e) => set('name', e.target.value)} type="text" placeholder="John Smith" className="input text-sm" required />
                </div>
                <div>
                  <label className="label">Company</label>
                  <input value={form.company} onChange={(e) => set('company', e.target.value)} type="text" placeholder="Smith Utilities" className="input text-sm" />
                </div>
              </div>

              <div>
                <label className="label">Email *</label>
                <input value={form.email} onChange={(e) => set('email', e.target.value)} type="email" placeholder="john@example.com" className="input text-sm" required />
              </div>

              <div>
                <label className="label">Phone</label>
                <input value={form.phone} onChange={(e) => set('phone', e.target.value)} type="tel" placeholder="(555) 000-0000" className="input text-sm" />
              </div>

              <div>
                <label className="label">Job site address / location</label>
                <input value={form.jobSite} onChange={(e) => set('jobSite', e.target.value)} type="text" placeholder="123 Main St or Hwy 45 & Elm" className="input text-sm" />
              </div>

              <div>
                <label className="label">Start date</label>
                <input value={form.startDate} onChange={(e) => set('startDate', e.target.value)} type="date" className="input text-sm" />
              </div>

              <div>
                <label className="label">Notes / special requests</label>
                <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Any special delivery instructions, access info, or additional context..." className="input text-sm resize-none h-20" />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.deliveryNeeded}
                  onChange={(e) => set('deliveryNeeded', e.target.checked)}
                  className="w-4 h-4 accent-brand-500 rounded"
                />
                <span className="text-sm text-slate-300">I need delivery to job site</span>
              </label>

              <button
                type="submit"
                disabled={items.length === 0}
                className="w-full btn-primary py-3 justify-center text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
              >
                Submit Quote Request
              </button>

              <p className="text-xs text-slate-500 text-center">
                We typically respond within 2–4 hours during business hours.
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
