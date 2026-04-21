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
    <section id="categories" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group relative overflow-hidden rounded-xl animate-fade-in"
              style={{ animationDelay: `${i * 60}ms`, aspectRatio: '4/3' }}
            >
              {/* Photo */}
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark gradient — bottom-heavy for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />

              {/* Top-right arrow badge */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-brand-500 transition-all duration-200">
                <ArrowRight size={12} className="text-white" />
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-bold text-white text-sm sm:text-base leading-snug">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-1 opacity-90">
                  {cat.description}
                </p>
                <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-400">
                  {countsBySlug[cat.slug] ?? cat.productCount ?? 0} items available
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
