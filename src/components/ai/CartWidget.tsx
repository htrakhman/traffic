import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Info,
  Search,
  CheckCircle,
  Package,
} from 'lucide-react'
import type { AIRecommendation, RecommendationItem } from '../../types'
import { products } from '../../data/products'

interface Props {
  recommendation: AIRecommendation
}

const priorityConfig = {
  required: {
    color: 'text-brand-400',
    bg: 'bg-brand-500/10',
    border: 'border-brand-500/30',
    label: 'Required',
    dot: 'bg-brand-400',
  },
  recommended: {
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    label: 'Recommended',
    dot: 'bg-amber-400',
  },
  optional: {
    color: 'text-slate-400',
    bg: 'bg-slate-700/30',
    border: 'border-slate-600/40',
    label: 'Optional',
    dot: 'bg-slate-500',
  },
}

function getProductImage(productId: string): string | null {
  const product = products.find((p) => p.id === productId)
  return product?.imageUrl ?? null
}

export default function CartWidget({ recommendation }: Props) {
  const [items, setItems] = useState<RecommendationItem[]>(recommendation.items)
  const [showNotes, setShowNotes] = useState(false)
  const [removed, setRemoved] = useState<Set<string>>(new Set())

  const activeItems = items.filter((item) => !removed.has(item.productId + item.productName))

  const totalDailyRate = activeItems.reduce(
    (sum, item) => sum + item.dailyRate * item.quantity,
    0,
  )
  const estimatedTotal = totalDailyRate * recommendation.estimatedDurationDays

  const updateQty = (key: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.productId + item.productName === key) {
          const newQty = Math.max(1, item.quantity + delta)
          return { ...item, quantity: newQty }
        }
        return item
      }),
    )
  }

  const removeItem = (key: string) => {
    setRemoved((prev) => new Set(prev).add(key))
  }

  const restoreAll = () => setRemoved(new Set())

  const buildRecommendationState = (): AIRecommendation => ({
    ...recommendation,
    items: activeItems,
    totalDailyRate,
  })

  return (
    <div className="w-full rounded-2xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-sm overflow-hidden shadow-2xl animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-brand-500/10 to-slate-800/60 border-b border-slate-700/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-500/15 border border-brand-500/30 rounded-lg flex items-center justify-center">
            <ShoppingCart size={15} className="text-brand-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">Equipment Cart</span>
              <span className="inline-flex items-center px-1.5 py-0.5 bg-brand-500 text-white text-[10px] font-bold rounded-full">
                {activeItems.length}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-none">{recommendation.summary.slice(0, 72)}{recommendation.summary.length > 72 ? '…' : ''}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-white">${totalDailyRate.toFixed(0)}<span className="text-xs font-normal text-slate-400">/day</span></div>
          <div className="text-[10px] text-slate-500">~${estimatedTotal.toFixed(0)} est. total</div>
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-slate-800/60">
        {activeItems.map((item) => {
          const key = item.productId + item.productName
          const pc = priorityConfig[item.priority]
          const imgUrl = getProductImage(item.productId)
          return (
            <div key={key} className="flex items-center gap-3 p-3 group hover:bg-slate-800/30 transition-colors">
              {/* Product image */}
              <div className="w-12 h-12 rounded-lg border border-slate-700/60 bg-slate-800 flex-shrink-0 overflow-hidden">
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package size={16} className="text-slate-600" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-medium text-white leading-snug">{item.productName}</span>
                  <span className={`inline-flex items-center gap-1 px-1.5 py-px text-[9px] font-semibold rounded-full border ${pc.bg} ${pc.border} ${pc.color}`}>
                    <span className={`w-1 h-1 rounded-full ${pc.dot}`} />
                    {pc.label}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-snug line-clamp-1">{item.rationale}</p>
                <div className="text-[10px] text-slate-400 mt-0.5">${item.dailyRate.toFixed(2)}/ea/day</div>
              </div>

              {/* Qty controls */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQty(key, -1)}
                    className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    <Minus size={10} />
                  </button>
                  <span className="w-7 text-center text-xs font-bold text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQty(key, 1)}
                    className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    <Plus size={10} />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="w-14 text-right">
                  <div className="text-xs font-semibold text-white">${(item.dailyRate * item.quantity).toFixed(0)}</div>
                  <div className="text-[9px] text-slate-500">/day</div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(key)}
                  className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all rounded"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          )
        })}

        {/* Removed items notice */}
        {removed.size > 0 && (
          <div className="flex items-center justify-between px-4 py-2 bg-slate-800/40">
            <span className="text-[10px] text-slate-500">{removed.size} item{removed.size > 1 ? 's' : ''} removed</span>
            <button onClick={restoreAll} className="text-[10px] text-brand-400 hover:text-brand-300 font-medium transition-colors">
              Restore all
            </button>
          </div>
        )}
      </div>

      {/* Summary bar */}
      <div className="px-4 py-3 bg-slate-800/40 border-t border-slate-700/60">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">Daily Rate</div>
              <div className="text-sm font-bold text-white">${totalDailyRate.toFixed(2)}</div>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">Est. Duration</div>
              <div className="text-sm font-bold text-white">{recommendation.estimatedDurationDays} days</div>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">Est. Total</div>
              <div className="text-sm font-bold text-brand-400">~${estimatedTotal.toFixed(0)}</div>
            </div>
          </div>
        </div>

        {/* Setup notes toggle */}
        {recommendation.setupNotes.length > 0 && (
          <button
            onClick={() => setShowNotes((v) => !v)}
            className="flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-slate-200 transition-colors mb-2"
          >
            <Info size={10} />
            Setup notes
            {showNotes ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
          </button>
        )}
        {showNotes && (
          <ul className="space-y-1 mb-2">
            {recommendation.setupNotes.map((note, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[10px] text-slate-400">
                <span className="text-slate-600 mt-px">•</span>
                {note}
              </li>
            ))}
          </ul>
        )}

        {/* Disclaimer */}
        <div className="flex items-start gap-1.5 p-2 bg-amber-500/5 border border-amber-500/15 rounded-lg mb-3">
          <AlertCircle size={9} className="text-amber-400 flex-shrink-0 mt-px" />
          <p className="text-[9px] text-amber-200/50 leading-relaxed">{recommendation.disclaimer}</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          <Link
            to="/quote"
            state={{ recommendation: buildRecommendationState() }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-brand-500/20"
          >
            <CheckCircle size={13} />
            Get Quote
          </Link>
          <Link
            to="/browse"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-700/60 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-semibold rounded-xl transition-all"
          >
            <Search size={13} />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}
