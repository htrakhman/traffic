import { X } from 'lucide-react'
import { categories } from '../../data/categories'

interface Filters {
  category: string
  maxDailyRate: number
  inStockOnly: boolean
  popular: boolean
}

interface Props {
  filters: Filters
  onChange: (filters: Filters) => void
  onClose?: () => void
}

export default function FilterSidebar({ filters, onChange, onClose }: Props) {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value })

  const priceRanges = [50, 25, 10, 5]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Filters</h3>
        {onClose && (
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Category</h4>
        <div className="space-y-1">
          <button
            onClick={() => set('category', '')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !filters.category
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Equipment
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => set('category', cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                filters.category === cat.slug
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span className="truncate">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Max daily rate */}
      <div>
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Max Daily Rate
          {filters.maxDailyRate < 200 && (
            <span className="ml-2 text-brand-400 normal-case font-normal">≤ ${filters.maxDailyRate}/day</span>
          )}
        </h4>
        <input
          type="range"
          min={5}
          max={200}
          step={5}
          value={filters.maxDailyRate}
          onChange={(e) => set('maxDailyRate', Number(e.target.value))}
          className="w-full accent-brand-500 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-600 mt-1">
          <span>$5/day</span>
          <span>$200+/day</span>
        </div>
      </div>

      {/* Quick price filters */}
      <div>
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Price Filter</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => set('maxDailyRate', 200)}
            className={`px-2.5 py-1 rounded-lg text-xs border transition-colors ${
              filters.maxDailyRate >= 200
                ? 'bg-brand-500/20 border-brand-500/30 text-brand-300'
                : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
            }`}
          >
            Any price
          </button>
          {priceRanges.map((price) => (
            <button
              key={price}
              onClick={() => set('maxDailyRate', price)}
              className={`px-2.5 py-1 rounded-lg text-xs border transition-colors ${
                filters.maxDailyRate === price
                  ? 'bg-brand-500/20 border-brand-500/30 text-brand-300'
                  : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              ≤${price}/day
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className={`relative w-9 h-5 rounded-full transition-colors ${filters.inStockOnly ? 'bg-brand-500' : 'bg-slate-700'}`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${filters.inStockOnly ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </div>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => set('inStockOnly', e.target.checked)}
            className="hidden"
          />
          <span className="text-sm text-slate-300 group-hover:text-white transition-colors">In stock only</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <div className={`relative w-9 h-5 rounded-full transition-colors ${filters.popular ? 'bg-brand-500' : 'bg-slate-700'}`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${filters.popular ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </div>
          <input
            type="checkbox"
            checked={filters.popular}
            onChange={(e) => set('popular', e.target.checked)}
            className="hidden"
          />
          <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Popular items only</span>
        </label>
      </div>

      {/* Reset */}
      <button
        onClick={() => onChange({ category: '', maxDailyRate: 200, inStockOnly: false, popular: false })}
        className="w-full text-center text-xs text-slate-500 hover:text-slate-300 py-2 transition-colors"
      >
        Reset all filters
      </button>
    </div>
  )
}
