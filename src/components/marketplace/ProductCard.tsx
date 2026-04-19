import { Link } from 'react-router-dom'
import { Star, Package } from 'lucide-react'
import type { Product } from '../../types'

interface Props {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: Props) {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group card-hover flex flex-col animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-slate-800">
        <img
          key={`${product.id}:${product.imageUrl}`}
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading={index < 9 ? 'eager' : 'lazy'}
          decoding="async"
        />
        {product.popular && (
          <div className="absolute top-2 left-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-brand-500 text-white text-[10px] font-semibold rounded-full shadow-lg">
              <Star size={9} className="fill-current" />
              Popular
            </div>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center">
            <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-400 text-xs rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
            {product.categorySlug.replace(/-/g, ' ')}
          </div>
          <h3 className="font-semibold text-slate-200 group-hover:text-white text-sm leading-snug transition-colors line-clamp-2">
            {product.name}
          </h3>
          {(product.colorLabel || product.finishLabel) && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {product.colorLabel && (
                <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {product.colorLabel}
                </span>
              )}
              {product.finishLabel && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {product.finishLabel}
                </span>
              )}
            </div>
          )}
          {product.colorVariants && product.colorVariants.length > 1 && (
            <p className="text-[10px] text-brand-400 mt-1 font-medium">
              {product.colorVariants.length} color / SKU options
            </p>
          )}
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 bg-slate-800 text-slate-500 text-[10px] rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between mt-auto pt-2 border-t border-slate-800">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-white">${product.dailyRate.toFixed(2)}</span>
              <span className="text-xs text-slate-500">/day</span>
            </div>
            <div className="text-xs text-slate-600">
              ${product.weeklyRate}/wk · ${product.monthlyRate}/mo
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Package size={11} />
            {product.unit}
          </div>
        </div>
      </div>
    </Link>
  )
}
