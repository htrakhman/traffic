import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, CreditCard, Package, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useMembership } from '../context/MembershipContext'
import { getDeliveryPickupFees } from '../constants/deliveryPickup'
import DeliveryPickupBreakdown from '../components/pricing/DeliveryPickupBreakdown'
import { getProductById } from '../data/products'

export default function Checkout() {
  const { lines, clearCart } = useCart()
  const { isMember } = useMembership()
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobSite: '',
    notes: '',
    deliveryNeeded: true,
  })

  const set = <K extends keyof typeof form>(key: K, val: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: val }))

  const resolved = lines
    .map((line) => {
      const product = getProductById(line.productId)
      return product ? { line, product } : null
    })
    .filter(Boolean) as { line: (typeof lines)[0]; product: NonNullable<ReturnType<typeof getProductById>> }[]

  const totalDaily = resolved.reduce(
    (s, { line, product }) => s + product.dailyRate * line.quantity,
    0,
  )
  const rentalGrandTotal = resolved.reduce(
    (s, { line, product }) => s + product.dailyRate * line.quantity * line.rentalDays,
    0,
  )
  const { combined: deliveryPickupCombined } = getDeliveryPickupFees(isMember)
  const grandTotal = rentalGrandTotal + deliveryPickupCombined

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    clearCart()
    setDone(true)
  }

  if (done) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={28} className="text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Checkout submitted</h1>
          <p className="text-slate-400 mb-2">
            Thanks, <strong className="text-white">{form.name}</strong>. We received your rental checkout.
          </p>
          <p className="text-slate-400 mb-8">
            You will get a confirmation and payment link at{' '}
            <strong className="text-white">{form.email}</strong> shortly. Questions? Call{' '}
            <a href="tel:+18005551234" className="text-brand-400">
              1-800-555-1234
            </a>
            .
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/browse" className="btn-primary">
              Browse equipment
            </Link>
            <Link to="/" className="btn-secondary">
              Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-20">
      <div className="border-b border-slate-800/60 bg-slate-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to cart
          </Link>
          <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
            <CreditCard className="text-brand-400" size={28} />
            Checkout
          </h1>
          <p className="text-slate-400">Review your cart, enter contact details, and submit your rental checkout.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {resolved.length === 0 ? (
          <div className="card p-12 text-center">
            <Package size={40} className="text-slate-600 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-white mb-2">Your cart is empty</h2>
            <p className="text-slate-400 mb-6 text-sm max-w-md mx-auto">
              Add equipment to your cart before checking out.
            </p>
            <Link to="/browse" className="btn-primary inline-flex">
              Browse equipment
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-semibold text-white">Order summary</h2>
              <div className="space-y-3">
                {resolved.map(({ line, product }) => (
                  <div key={line.productId} className="card p-4 flex gap-4">
                    <img
                      src={product.imageUrl}
                      alt=""
                      className="w-20 h-16 object-cover rounded-lg flex-shrink-0 bg-slate-800"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white text-sm leading-snug">{product.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Qty {line.quantity} · {line.rentalDays} days · ${product.dailyRate.toFixed(2)}/{product.unit}/day
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-white tabular-nums">
                        ${(product.dailyRate * line.quantity * line.rentalDays).toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-500">rental</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card p-4 space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Daily rate (all items)</span>
                  <span className="tabular-nums">${totalDaily.toFixed(2)}/day</span>
                </div>
                <DeliveryPickupBreakdown isMember={isMember} className="pt-2 border-t border-slate-800" />
                <div className="flex justify-between font-semibold text-white text-base pt-2 border-t border-slate-800">
                  <span>Estimated total</span>
                  <span className="tabular-nums">${grandTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-500">
                  Final invoice may differ. Card payment is arranged after we confirm availability.
                  {isMember ? ' Member delivery and pickup pricing applied.' : ''}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="card p-6 space-y-4 sticky top-24">
                <h2 className="font-semibold text-white">Billing and contact</h2>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="label">Name *</label>
                    <input
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      type="text"
                      placeholder="John Smith"
                      className="input text-sm"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="label">Company</label>
                    <input
                      value={form.company}
                      onChange={(e) => set('company', e.target.value)}
                      type="text"
                      placeholder="Smith Utilities"
                      className="input text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Email *</label>
                  <input
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    type="email"
                    placeholder="john@example.com"
                    className="input text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="label">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    type="tel"
                    placeholder="(555) 000-0000"
                    className="input text-sm"
                  />
                </div>

                <div>
                  <label className="label">Job site / delivery address</label>
                  <input
                    value={form.jobSite}
                    onChange={(e) => set('jobSite', e.target.value)}
                    type="text"
                    placeholder="Street or highway location"
                    className="input text-sm"
                  />
                </div>

                <div>
                  <label className="label">Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                    placeholder="Gate codes, contact on site, PO number…"
                    className="input text-sm resize-none h-20"
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.deliveryNeeded}
                    onChange={(e) => set('deliveryNeeded', e.target.checked)}
                    className="w-4 h-4 accent-brand-500 rounded"
                  />
                  <span className="text-sm text-slate-300">I need delivery to the job site</span>
                </label>

                <button type="submit" className="w-full btn-primary py-3 justify-center text-base gap-2">
                  <CreditCard size={18} />
                  Submit checkout
                </button>

                <p className="text-xs text-slate-500 text-center">
                  By submitting you agree we may contact you about this order. No payment is charged on this step.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
