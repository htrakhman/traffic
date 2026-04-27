import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { getFeaturedProducts } from '../../data/products'
import ProductCard from '../marketplace/ProductCard'

export default function FeaturedProducts() {
  const featured = getFeaturedProducts()

  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
            <Star size={12} className="fill-current" />
            Best Sellers
          </div>
          <h2 className="section-title">Popular Equipment</h2>
          <p className="section-subtitle">The gear contractors reach for first.</p>
        </div>
        <Link to="/browse" className="btn-ghost text-sm flex-shrink-0">
          Browse all
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {featured.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  )
}
