import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ExternalLink, X, Layers } from 'lucide-react'
import SiteMapPlanner from '../../pages/SiteMapPlanner'
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
  const [activeTab, setActiveTab] = useState<'map' | 'browse'>('map')
  const navigate = useNavigate()

  const browseChips = useMemo(
    () => getBrowseQuickChips(browseSearchQueryDebounced),
    [browseSearchQueryDebounced, tick],
  )
  const browseQ = browseSearchQuery.trim()

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-20 pb-10">
      <div className="absolute inset-0 bg-grid-slate opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 to-slate-950" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Headline — single line */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
          Plan the job.{' '}
          <span className="gradient-text">Rent the gear.</span>
        </h1>

        <p className="text-slate-400 max-w-lg mx-auto mb-6 text-sm sm:text-base leading-relaxed">
          Traffic control and safety equipment rental for contractors — draw your work zone on the map, place gear, and book what you need.
        </p>

        {/* Tabs */}
        <div className="inline-flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 mb-4">
          <button
            onClick={() => {
              setActiveTab('map')
              onBrowseSearchClear()
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'map' ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={12} />
            Site Map
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'browse' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search size={12} />
            Browse
          </button>
        </div>

        {/* Site map — same card footprint as the former AI + map panel */}
        {activeTab === 'map' && (
          <div className="w-full max-w-4xl mx-auto animate-fade-in text-left">
            <div
              className="card flex flex-col overflow-hidden shadow-2xl shadow-black/40 min-h-[460px] h-[min(720px,calc(100dvh-11rem))]"
            >
              <SiteMapPlanner embedded />
            </div>
            <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
              <Link
                to="/planner"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
              >
                Open full site map
                <ExternalLink size={12} className="opacity-80" />
              </Link>
            </div>
          </div>
        )}

        {/* Browse panel */}
        {activeTab === 'browse' && (
          <div className="max-w-xl mx-auto animate-fade-in">
            <div className="relative mb-3">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={browseSearchQuery}
                onChange={(e) => onBrowseSearchQueryChange(e.target.value)}
                placeholder="Search cones, signs, arrow boards, barricades..."
                className="w-full pl-10 pr-11 py-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500/50 transition-all"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 rounded"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              ) : null}
            </div>
            <div className="flex flex-wrap justify-center gap-1.5 transition-opacity duration-150">
              {browseChips.map(({ label, category }) => (
                <Link
                  key={category}
                  to={
                    browseQ
                      ? `/browse?category=${encodeURIComponent(category)}&q=${encodeURIComponent(browseQ)}`
                      : `/browse?category=${encodeURIComponent(category)}`
                  }
                  className="px-2.5 py-1 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 hover:border-brand-500/30 text-slate-400 hover:text-brand-300 text-xs rounded-full transition-colors duration-150"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
