import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '../../data/categories'

export default function CategoryGrid() {
  return (
    <section id="categories" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-2">Equipment Catalog</div>
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">Everything you need for safe, compliant work zones.</p>
        </div>
        <Link to="/browse" className="btn-ghost text-sm flex-shrink-0">
          View all equipment
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Category grid — photo cards */}
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
                {cat.productCount} items available
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
