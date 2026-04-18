import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { products, searchProducts } from '../data/products'
import ProductCard from '../components/marketplace/ProductCard'
import FilterSidebar from '../components/marketplace/FilterSidebar'

interface Filters {
  category: string
  maxDailyRate: number
  inStockOnly: boolean
  popular: boolean
}

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [filters, setFilters] = useState<Filters>({
    category: '',
    maxDailyRate: 200,
    inStockOnly: false,
    popular: false,
  })
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    let list = query.trim() ? searchProducts(query) : [...products]

    if (filters.category) list = list.filter((p) => p.categorySlug === filters.category)
    if (filters.maxDailyRate < 200) list = list.filter((p) => p.dailyRate <= filters.maxDailyRate)
    if (filters.inStockOnly) list = list.filter((p) => p.inStock)
    if (filters.popular) list = list.filter((p) => p.popular)

    return list
  }, [query, filters])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchParams(query ? { q: query } : {})
  }

  return (
    <main className="min-h-screen pt-20">
      {/* Page header */}
      <div className="bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-3xl font-bold text-white mb-2">Browse Equipment</h1>
          <p className="text-slate-400">Rental equipment for professional work zones.</p>

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
                onClick={() => { setQuery(''); setSearchParams({}) }}
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
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 bg-slate-900 border border-slate-800 rounded-xl p-5">
              <FilterSidebar filters={filters} onChange={setFilters} />
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
                  onClick={() => { setQuery(''); setFilters({ category: '', maxDailyRate: 200, inStockOnly: false, popular: false }) }}
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
              onChange={(f) => { setFilters(f); setShowMobileFilters(false) }}
              onClose={() => setShowMobileFilters(false)}
            />
          </div>
        </div>
      )}
    </main>
  )
}
