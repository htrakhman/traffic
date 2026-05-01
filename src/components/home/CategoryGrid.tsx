import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useCatalogSync } from '../../context/CatalogSyncContext'
import { categories } from '../../data/categories'
import { getProducts, filterProductsBySearchQuery } from '../../data/products'
import ProductCard from '../marketplace/ProductCard'

type CategoryGridProps = {
  /**
   * Debounced search text used to compute matches (avoids repainting the grid every keystroke).
   * Pass `liveSearchDisplayQuery` so headings can show the latest typed text.
   */
  liveSearchQuery?: string
  /** Latest input value for UI copy (e.g. quoted search). Defaults to `liveSearchQuery`. */
  liveSearchDisplayQuery?: string
}

export default function CategoryGrid({
  liveSearchQuery = '',
  liveSearchDisplayQuery,
}: CategoryGridProps) {
  const { tick } = useCatalogSync()
  const displayQ = (liveSearchDisplayQuery ?? liveSearchQuery).trim()
  const liveQ = liveSearchQuery.trim()
  const countsBySlug = useMemo(() => {
    const m: Record<string, number> = {}
    for (const p of getProducts()) {
      m[p.categorySlug] = (m[p.categorySlug] ?? 0) + 1
    }
    return m
  }, [tick])

  const liveMatches = useMemo(() => {
    if (!liveQ) return []
    return filterProductsBySearchQuery(getProducts(), liveSearchQuery)
  }, [liveSearchQuery, liveQ, tick])

  return (
    <section id="categories" className="pt-12 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-2">Equipment Catalog</div>
          {displayQ ? (
            <>
              <h2 className="section-title">Matching equipment</h2>
              {!liveQ ? (
                <p className="section-subtitle">Finding matches for &ldquo;{displayQ}&rdquo;…</p>
              ) : (
                <p className="section-subtitle">
                  <span className="text-white font-semibold tabular-nums">{liveMatches.length}</span>{' '}
                  {liveMatches.length === 1 ? 'item' : 'items'} for &ldquo;{liveQ}&rdquo; — refine in the search box above or open the full catalog.
                </p>
              )}
            </>
          ) : (
            <>
              <h2 className="section-title">Browse by Category</h2>
              <p className="section-subtitle">Everything you need for safe, compliant work zones.</p>
            </>
          )}
        </div>
        <Link
          to={displayQ ? `/browse?q=${encodeURIComponent(displayQ)}` : '/browse'}
          className="btn-ghost text-sm flex-shrink-0"
        >
          {displayQ ? 'Open full results' : 'View all equipment'}
          <ArrowRight size={14} />
        </Link>
      </div>

      {displayQ ? (
        !liveQ ? (
          <div className="min-h-[280px] flex flex-col items-center justify-center rounded-xl border border-slate-800/80 bg-slate-900/30 text-slate-500 text-sm">
            Updating results…
          </div>
        ) : liveMatches.length === 0 ? (
          <div className="text-center py-14 rounded-xl border border-slate-800 bg-slate-900/40">
            <p className="text-slate-300 font-medium mb-1">No matches for &ldquo;{displayQ}&rdquo;</p>
            <p className="text-slate-500 text-sm mb-4">Try another term or browse by category after clearing the search.</p>
            <Link to={`/browse?q=${encodeURIComponent(displayQ)}`} className="btn-secondary text-sm inline-flex">
              Search on Browse page
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[240px]">
            {liveMatches.map((product) => (
              <ProductCard key={product.id} product={product} suppressEntryAnimation />
            ))}
          </div>
        )
      ) : (
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/35 p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group relative overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 animate-fade-in transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/10"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Photo */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-white text-sm sm:text-base leading-snug">
                      {cat.name}
                    </h3>
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-800 text-slate-300 border border-slate-700 transition-colors duration-200 group-hover:bg-brand-500 group-hover:border-brand-500 group-hover:text-white">
                      <ArrowRight size={12} />
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 min-h-[2.5rem]">
                    {cat.description}
                  </p>
                  <div className="mt-3 inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 text-[11px] font-medium text-brand-300">
                    {countsBySlug[cat.slug] ?? cat.productCount ?? 0} items
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
