import { useState, useMemo, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { getProducts, filterProductsBySearchQuery } from '../data/products'
import { getLowestRetailUnitPrice } from '../utils/pricing'
import { useCatalogSync } from '../context/CatalogSyncContext'
import ProductCard from '../components/marketplace/ProductCard'
import FilterSidebar from '../components/marketplace/FilterSidebar'

interface Filters {
  category: string
  maxRetailUnit: number
  inStockOnly: boolean
  popular: boolean
}

export default function Browse() {
  const { tick } = useCatalogSync()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')
  const [filters, setFilters] = useState<Filters>(() => ({
    category: searchParams.get('category') ?? '',
    maxRetailUnit: 200,
    inStockOnly: false,
    popular: false,
  }))
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '')
    setFilters((prev) => ({
      ...prev,
      category: searchParams.get('category') ?? '',
    }))
  }, [searchParams])

  const applyFilters = useCallback((next: Filters) => {
    setFilters(next)
    setSearchParams((prev) => {
      const n = new URLSearchParams(prev)
      if (next.category) n.set('category', next.category)
      else n.delete('category')
      return n
    })
  }, [setSearchParams])

  const filteredProducts = useMemo(() => {
    // Apply category and price filters first, then search text within that subset.
    // (Global search ∩ category is often empty, e.g. q="cone" + Pedestrian — users expect in-category search.)
    let list = [...getProducts()]
    if (filters.category) list = list.filter((p) => p.categorySlug === filters.category)
    if (filters.maxRetailUnit < 200) {
      list = list.filter((p) => getLowestRetailUnitPrice(p) <= filters.maxRetailUnit)
    }
    if (filters.inStockOnly) list = list.filter((p) => p.inStock)
    if (filters.popular) list = list.filter((p) => p.popular)
    list = filterProductsBySearchQuery(list, query)
    return list
  }, [query, filters, tick])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchParams((prev) => {
      const n = new URLSearchParams(prev)
      const t = query.trim()
      if (t) n.set('q', t)
      else n.delete('q')
      return n
    })
  }

  return (
    <main className="min-h-screen pt-20">
      {/* Page header */}
      <div className="bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-3xl font-bold text-white mb-2">Browse Equipment</h1>
          <p className="text-slate-400">Traffic safety equipment for professional work zones.</p>

          {/* Search */}
          <form onSubmit={handleSearch} className="mt-6 relative max-w-xl">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cones, signs, arrow boards..."
              className="w-full pl-10 pr-12 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500/50 transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setSearchParams((prev) => {
                    const n = new URLSearchParams(prev)
                    n.delete('q')
                    return n
                  })
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 rounded"
              >
                <X size={14} />
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0 self-start">
            <div className="sticky top-24 max-h-[calc(100dvh-6.5rem)] overflow-y-auto overscroll-y-contain bg-slate-900 border border-slate-800 rounded-xl p-5">
              <FilterSidebar filters={filters} onChange={applyFilters} />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Result bar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-400">
                <span className="text-white font-semibold">{filteredProducts.length}</span>{' '}
                {filteredProducts.length === 1 ? 'item' : 'items'}
                {query && <span> for "<span className="text-slate-300">{query}</span>"</span>}
              </p>
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden btn-secondary text-sm py-2"
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">🔶</div>
                <h3 className="text-lg font-semibold text-white mb-2">No results found</h3>
                <p className="text-slate-400 text-sm mb-6">Try a different search or adjust your filters.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setFilters({ category: '', maxRetailUnit: 200, inStockOnly: false, popular: false })
                    setSearchParams({})
                  }}
                  className="btn-secondary text-sm"
                >
                  Clear all
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-slate-900 border-l border-slate-800 overflow-y-auto p-6 animate-slide-up">
            <FilterSidebar
              filters={filters}
              onChange={(f) => {
                applyFilters(f)
                setShowMobileFilters(false)
              }}
              onClose={() => setShowMobileFilters(false)}
            />
          </div>
        </div>
      )}
    </main>
  )
}
