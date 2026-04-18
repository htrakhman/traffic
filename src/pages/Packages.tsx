import { Link } from 'react-router-dom'
import { Package, Check } from 'lucide-react'
import { packages } from '../data/packages'
import { products } from '../data/products'
import { getPackageBundleDailyRate, getPackageListDailySubtotal } from '../utils/pricing'

export default function Packages() {
  return (
    <main className="min-h-screen pt-20">
      <div className="bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-brand-500/10 border border-brand-500/20 rounded-xl flex items-center justify-center">
              <Package size={18} className="text-brand-400" />
            </div>
            <div className="text-xs font-semibold text-brand-400 uppercase tracking-widest">Bundles</div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Equipment Packages</h1>
          <p className="text-slate-400 max-w-xl leading-relaxed">
            Pre-built work zone equipment bundles for common job types. Everything in a package is available together, delivered at once.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {packages.map((pkg) => {
          const pkgProducts = pkg.items.map((item) => ({
            ...item,
            product: products.find((p) => p.id === item.productId),
          })).filter((i) => i.product)
          const listDaily = getPackageListDailySubtotal(pkg)
          const bundleDaily = getPackageBundleDailyRate(pkg)

          return (
            <div key={pkg.id} className="card p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold text-white">{pkg.name}</h2>
                    {pkg.popular && (
                      <span className="badge bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs">
                        Popular
                      </span>
                    )}
                    <span className="badge bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                      Save {pkg.savingsPercent}%
                    </span>
                  </div>
                  <p className="text-slate-400 mb-3">{pkg.description}</p>
                  <div className="inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-800/50 px-3 py-1.5 rounded-lg">
                    <span className="text-slate-400 font-medium">Best for:</span>
                    {pkg.useCase}
                  </div>

                  {/* Items */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pkgProducts.map(({ product, quantity }) => (
                      product && (
                        <div key={product.id} className="flex items-center gap-2 text-sm">
                          <Check size={13} className="text-brand-400 flex-shrink-0" />
                          <span className="text-slate-300">
                            {quantity}× {product.name}
                          </span>
                          <span className="text-slate-600 text-xs ml-auto">
                            ${(product.dailyRate * quantity).toFixed(0)}/day
                          </span>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* Pricing + CTA */}
                <div className="md:w-56 flex-shrink-0">
                  <div className="card p-5 text-center">
                    <div className="text-xs text-slate-500 line-through mb-0.5">
                      List ${listDaily.toFixed(0)}/day
                    </div>
                    <div className="text-3xl font-black text-white mb-1">${bundleDaily.toFixed(0)}</div>
                    <div className="text-sm text-slate-400 mb-1">per day (bundle)</div>
                    <div className="text-xs text-slate-500 mb-5">
                      {pkg.items.length} items · ${(bundleDaily * 7).toFixed(0)}/week est.
                    </div>
                    <Link
                      to={`/quote?package=${pkg.id}`}
                      className="btn-primary w-full justify-center text-sm"
                    >
                      Rent This Package
                    </Link>
                    <Link
                      to="/assistant"
                      className="block mt-2 text-xs text-slate-500 hover:text-brand-400 transition-colors"
                    >
                      Customize with AI →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
