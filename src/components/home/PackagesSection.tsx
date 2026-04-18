import { Link } from 'react-router-dom'
import { Package, ArrowRight, Sparkles } from 'lucide-react'
import { packages } from '../../data/packages'

export default function PackagesSection() {
  const featured = packages.filter((p) => p.popular)

  return (
    <section className="py-20 px-4 sm:px-6 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-widest mb-2">
              <Package size={12} />
              Pre-built Bundles
            </div>
            <h2 className="section-title">Equipment Packages</h2>
            <p className="section-subtitle">Common work-zone setups, ready to rent as a bundle.</p>
          </div>
          <Link to="/packages" className="btn-ghost text-sm flex-shrink-0">
            All packages
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featured.map((pkg) => (
            <div key={pkg.id} className="card p-6 hover:border-slate-700 transition-all duration-200">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-bold text-white text-lg">{pkg.name}</h3>
                  <p className="text-sm text-slate-400 mt-1">{pkg.description}</p>
                </div>
                <div className="flex-shrink-0 px-2.5 py-1 bg-brand-500/10 border border-brand-500/20 rounded-lg">
                  <div className="text-xs text-brand-400 font-medium text-nowrap">Save {pkg.savingsPercent}%</div>
                </div>
              </div>

              <div className="text-xs text-slate-500 bg-slate-800/50 rounded-lg px-3 py-2 mb-4">
                <span className="text-slate-400 font-medium">Best for:</span> {pkg.useCase}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">${pkg.totalDailyRate}<span className="text-sm font-normal text-slate-400">/day</span></div>
                  <div className="text-xs text-slate-500">{pkg.items.length} items included</div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/quote?package=${pkg.id}`} className="btn-primary text-sm py-2 px-4">
                    Rent Package
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI upsell */}
        <div className="mt-6 card p-6 border-brand-500/20 bg-brand-500/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 bg-brand-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles size={18} className="text-brand-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">Not sure which package fits your job?</h3>
              <p className="text-sm text-slate-400 mt-0.5">
                Use the AI Job Planner to get a custom recommendation based on your specific job details.
              </p>
            </div>
            <Link to="/assistant" className="btn-primary flex-shrink-0 text-sm">
              <Sparkles size={14} />
              Plan my job
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
