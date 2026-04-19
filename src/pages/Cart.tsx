import { Link } from 'react-router-dom'
import { ShoppingCart, Trash2, Plus, Minus, Package, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useMembership } from '../context/MembershipContext'
import { getDeliveryPickupFees } from '../constants/deliveryPickup'
import DeliveryPickupBreakdown from '../components/pricing/DeliveryPickupBreakdown'
import { getProductById } from '../data/products'

export default function Cart() {
  const { lines, setLineQuantity, setLineRentalDays, removeLine, clearCart } = useCart()
  const { isMember } = useMembership()

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

  return (
    <main className="min-h-screen pt-20">
      <div className="border-b border-slate-800/60 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
              <ShoppingCart className="text-brand-400" size={28} />
              Cart
            </h1>
            <p className="text-slate-400">
              Review equipment, then request a quote or keep browsing.
            </p>
          </div>
          {resolved.length > 0 && (
            <button
              type="button"
              onClick={() => clearCart()}
              className="text-sm text-slate-500 hover:text-red-400 transition-colors self-start sm:self-auto"
            >
              Clear cart
            </button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {resolved.length === 0 ? (
          <div className="card p-12 text-center">
            <Package size={40} className="text-slate-600 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-white mb-2">Your cart is empty</h2>
            <p className="text-slate-400 mb-6 text-sm max-w-md mx-auto">
              Add rentals from any product page. Your cart is saved on this device.
            </p>
            <Link to="/browse" className="btn-primary inline-flex">
              Browse equipment
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              {resolved.map(({ line, product }) => (
                <div key={line.productId} className="card p-4 flex flex-col sm:flex-row gap-4">
                  <Link
                    to={`/product/${product.slug}`}
                    className="flex gap-4 flex-1 min-w-0 group"
                  >
                    <img
                      src={product.imageUrl}
                      alt=""
                      className="w-24 h-20 object-cover rounded-lg bg-slate-800 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h2 className="font-medium text-white text-sm leading-snug group-hover:text-brand-300 transition-colors">
                        {product.name}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        ${product.dailyRate.toFixed(2)}/{product.unit}/day · SKU {product.sku}
                      </p>
                    </div>
                  </Link>

                  <div className="flex flex-wrap items-end gap-4 sm:flex-col sm:items-end sm:justify-between sm:min-w-[200px]">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div>
                        <span className="label text-xs block mb-1">Qty</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setLineQuantity(line.productId, line.quantity - 1)}
                            className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm flex items-center justify-center"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-9 text-center text-sm font-medium text-white">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setLineQuantity(line.productId, line.quantity + 1)}
                            className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm flex items-center justify-center"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <div>
                        <span className="label text-xs block mb-1">Rental days</span>
                        <input
                          type="number"
                          min={product.minimumRentalDays}
                          value={line.rentalDays}
                          onChange={(e) =>
                            setLineRentalDays(
                              line.productId,
                              Number(e.target.value),
                              product.minimumRentalDays,
                            )
                          }
                          className="input py-2 w-20 text-sm text-center"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                      <div className="text-right">
                        <div className="text-sm font-bold text-white">
                          ${(product.dailyRate * line.quantity * line.rentalDays).toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-500">est. total</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.productId)}
                        className="p-2 text-slate-600 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-5 space-y-4">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Daily rate (all items)</span>
                <span>${totalDaily.toFixed(2)}/day</span>
              </div>
              <DeliveryPickupBreakdown isMember={isMember} className="pt-2 border-t border-slate-800" />
              <div className="flex justify-between text-lg font-semibold text-white pt-2 border-t border-slate-800">
                <span>Estimated total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-slate-500">
                Final pricing confirmed on your formal quote. Estimated total includes delivery and pickup as shown
                {isMember ? ' (member benefit).' : '.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Link to="/quote" className="btn-primary flex-1 justify-center py-3">
                  Request quote for cart
                  <ArrowRight size={18} />
                </Link>
                <Link to="/browse" className="btn-secondary flex-1 justify-center py-3">
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
