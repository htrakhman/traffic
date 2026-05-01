import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { getFeaturedProducts } from '../../data/products'
import ProductCard from '../marketplace/ProductCard'

export default function FeaturedProducts() {
  const featured = getFeaturedProducts()

  return (
    <section
      className="relative border-t border-slate-800/90 py-14 sm:py-16"
      aria-labelledby="popular-equipment-heading"
    >
      {/* Subtle band — reads as a different rhythm than the category “card tray” */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(245,158,11,0.06),transparent_55%)]"
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              <Star size={12} className="fill-current text-amber-400" aria-hidden />
              Best sellers
            </div>
            <h2 id="popular-equipment-heading" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Popular Equipment
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Quick picks from the catalog — scroll sideways to compare, or open a card for full specs and pricing.
            </p>
          </div>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 self-start sm:self-auto text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            Browse all
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Horizontal rail — distinct from the category image grid */}
        <div className="relative -mx-4 sm:-mx-6">
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-8 w-10 sm:w-14 z-10 bg-gradient-to-r from-slate-950 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-8 w-10 sm:w-14 z-10 bg-gradient-to-l from-slate-950 to-transparent"
            aria-hidden
          />

          <div
            className="overflow-x-auto overflow-y-visible overscroll-x-contain px-4 sm:px-6 pb-2 [scrollbar-gutter:stable]"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <ul className="flex gap-4 w-max snap-x snap-mandatory list-none m-0 p-0 pt-1">
              {featured.map((product) => (
                <li key={product.id} className="snap-start w-[min(88vw,300px)] flex-shrink-0 first:pl-0">
                  <ProductCard product={product} suppressEntryAnimation />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
