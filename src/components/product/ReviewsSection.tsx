import { useMemo, useState } from 'react'
import { ThumbsUp, BadgeCheck, MapPin } from 'lucide-react'
import type { Product } from '../../types'
import { getReviews, getAggregate } from '../../lib/reviews'
import StarRating from './StarRating'

type SortKey = 'recent' | 'highest' | 'lowest' | 'helpful'

export default function ReviewsSection({ product }: { product: Product }) {
  const reviews = useMemo(() => getReviews(product), [product.slug])
  const aggregate = useMemo(() => getAggregate(product), [product.slug])
  const [sort, setSort] = useState<SortKey>('recent')
  const [shown, setShown] = useState(6)

  const sorted = useMemo(() => {
    const list = [...reviews]
    if (sort === 'recent') list.sort((a, b) => (a.date < b.date ? 1 : -1))
    else if (sort === 'highest') list.sort((a, b) => b.rating - a.rating)
    else if (sort === 'lowest') list.sort((a, b) => a.rating - b.rating)
    else if (sort === 'helpful') list.sort((a, b) => b.helpful - a.helpful)
    return list
  }, [reviews, sort])

  const max = Math.max(
    aggregate.distribution[5],
    aggregate.distribution[4],
    aggregate.distribution[3],
    aggregate.distribution[2],
    aggregate.distribution[1],
    1,
  )

  return (
    <section aria-labelledby="reviews-heading" className="mt-12">
      <h2 id="reviews-heading" className="text-xl font-bold text-white mb-6">
        Customer Reviews
      </h2>

      <div className="card p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Average */}
          <div className="md:border-r md:border-slate-800 md:pr-6 text-center md:text-left">
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-5xl font-bold text-white tabular-nums">
                {aggregate.average.toFixed(1)}
              </span>
              <span className="text-slate-500 text-sm">out of 5</span>
            </div>
            <div className="mt-2 flex justify-center md:justify-start">
              <StarRating rating={aggregate.average} size={18} />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {aggregate.count} verified review{aggregate.count === 1 ? '' : 's'}
            </p>
          </div>

          {/* Distribution */}
          <div className="md:col-span-2">
            <div className="space-y-1.5">
              {([5, 4, 3, 2, 1] as const).map((star) => {
                const c = aggregate.distribution[star] ?? 0
                const pct = (c / max) * 100
                return (
                  <div key={star} className="flex items-center gap-3 text-xs">
                    <span className="w-8 text-slate-400 tabular-nums">{star}★</span>
                    <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-slate-500 tabular-nums">{c}</span>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-slate-500 mt-3">
              <span className="text-emerald-400 font-semibold">{aggregate.recommendPct}%</span> of
              reviewers recommend this product
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <p className="text-sm text-slate-400">
          Showing {Math.min(shown, sorted.length)} of {sorted.length}
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="review-sort" className="text-xs text-slate-500">
            Sort by
          </label>
          <select
            id="review-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="input text-xs py-1.5 pr-8"
          >
            <option value="recent">Most recent</option>
            <option value="helpful">Most helpful</option>
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
          </select>
        </div>
      </div>

      <ul className="space-y-3">
        {sorted.slice(0, shown).map((r) => (
          <li key={r.id} className="card p-5">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <div className="flex items-center gap-2">
                <StarRating rating={r.rating} size={14} />
                <span className="text-sm font-semibold text-white">{r.title}</span>
              </div>
              <span className="text-xs text-slate-500">
                {new Date(r.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
              <span className="font-medium text-slate-300">{r.author}</span>
              <span className="inline-flex items-center gap-1">
                <MapPin size={11} />
                {r.location}
              </span>
              {r.verified && (
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <BadgeCheck size={12} />
                  Verified Purchase
                </span>
              )}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{r.body}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <ThumbsUp size={12} />
              {r.helpful} found this helpful
            </div>
          </li>
        ))}
      </ul>

      {shown < sorted.length && (
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => setShown((s) => s + 8)}
            className="btn-secondary px-6 py-2 text-sm"
          >
            Show more reviews
          </button>
        </div>
      )}
    </section>
  )
}
