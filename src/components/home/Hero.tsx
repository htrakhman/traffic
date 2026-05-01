import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight } from 'lucide-react'
import { useCatalogSync } from '../../context/CatalogSyncContext'
import { getBrowseQuickChips } from '../../utils/browseQuickChips'

type HeroProps = {
  browseSearchQuery: string
  browseSearchQueryDebounced: string
  onBrowseSearchQueryChange: (q: string) => void
  onBrowseSearchClear: () => void
}

export default function Hero({
  browseSearchQuery,
  browseSearchQueryDebounced,
  onBrowseSearchQueryChange,
  onBrowseSearchClear,
}: HeroProps) {
  const { tick } = useCatalogSync()
  const navigate = useNavigate()

  const browseChips = useMemo(
    () => getBrowseQuickChips(browseSearchQueryDebounced),
    [browseSearchQueryDebounced, tick],
  )
  const browseQ = browseSearchQuery.trim()

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-28 pb-10">
      <div className="absolute inset-0 bg-grid-slate opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 to-slate-950" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Traffic Control Equipment.{' '}
          <span className="gradient-text">Free Delivery.</span>
        </h1>

        <p className="text-slate-400 max-w-xl mx-auto mb-8 text-base sm:text-lg leading-relaxed">
          Order what you actually need. Our AI job planner builds your equipment list before you spend a dollar — and every order ships free.
        </p>

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-4">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={browseSearchQuery}
              onChange={(e) => onBrowseSearchQueryChange(e.target.value)}
              placeholder="Search cones, signs, arrow boards, barricades..."
              className="w-full pl-11 pr-12 py-3.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500/50 transition-all shadow-lg"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const t = browseSearchQuery.trim()
                  navigate(t ? `/browse?q=${encodeURIComponent(t)}` : '/browse')
                }
              }}
              aria-label="Search equipment catalog"
            />
            {browseSearchQuery ? (
              <button
                type="button"
                onClick={onBrowseSearchClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 rounded"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            ) : null}
          </div>
        </div>

        {/* Category quick chips */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
          {browseChips.map(({ label, category }) => (
            <Link
              key={category}
              to={
                browseQ
                  ? `/browse?category=${encodeURIComponent(category)}&q=${encodeURIComponent(browseQ)}`
                  : `/browse?category=${encodeURIComponent(category)}`
              }
              className="px-3 py-1.5 bg-slate-800/70 hover:bg-slate-800 border border-slate-700 hover:border-brand-500/40 text-slate-400 hover:text-brand-300 text-xs rounded-full transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/browse" className="btn-secondary px-6 py-3 text-sm font-semibold">
            Browse All Equipment
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/assistant"
            className="btn-primary px-6 py-3 text-sm font-semibold"
          >
            Not sure what you need? Try the AI Planner →
          </Link>
        </div>
      </div>
    </section>
  )
}
