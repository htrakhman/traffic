import { useState, useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
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
  Package,
  X,
  Maximize2,
} from 'lucide-react'
import type { AIRecommendation, RecommendationItem } from '../../types'
import { getProducts, getProductById } from '../../data/products'
import { clearQuoteAiDraft, writeQuoteAiDraft } from '../../utils/quoteAiDraftStorage'
import { useCatalogSync } from '../../context/CatalogSyncContext'
import { useCart } from '../../context/CartContext'
import { useMembership } from '../../context/MembershipContext'
import { getDeliveryPickupFees } from '../../constants/deliveryPickup'
import DeliveryPickupBreakdown from '../pricing/DeliveryPickupBreakdown'
import type { Product } from '../../types'

interface Props {
  recommendation: AIRecommendation
  /** `modal` (default) = full quote in the chat column, scrollable, with a full-screen control. `inline` = same shell, alternate max-height. */
  layout?: 'modal' | 'inline'
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

function itemKey(item: RecommendationItem) {
  return item.productId + item.productName
}

function productToLine(p: Product): RecommendationItem {
  return {
    productId: p.id,
    productName: p.name,
    category: p.categorySlug.replace(/-/g, ' '),
    quantity: 1,
    rationale: 'Added from catalog search',
    priority: 'optional',
    dailyRate: p.dailyRate,
  }
}

export default function CartWidget({ recommendation, layout = 'modal' }: Props) {
  const { tick } = useCatalogSync()
  const { addItem } = useCart()
  const { isMember } = useMembership()
  const [items, setItems] = useState<RecommendationItem[]>(recommendation.items)
  const [showNotes, setShowNotes] = useState(false)
  const [removed, setRemoved] = useState<Set<string>>(new Set())
  /** Full-screen overlay (same UI as embedded, larger canvas). */
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const searchSectionRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const activeItems = items.filter((item) => !removed.has(itemKey(item)))

  const recommendationItemsKey = useMemo(
    () =>
      recommendation.items
        .map((i) => `${i.productId}:${i.quantity}:${i.productName}`)
        .join('|'),
    [recommendation.items],
  )

  useEffect(() => {
    setItems(recommendation.items)
    setRemoved(new Set())
  }, [recommendationItemsKey, recommendation.items])

  const quoteDraftPersistKey = useMemo(
    () =>
      JSON.stringify({
        itemsKey: recommendationItemsKey,
        removed: [...removed].sort(),
        qty: items.map((i) => `${itemKey(i)}:${i.quantity}`),
        days: recommendation.estimatedDurationDays,
        sum: recommendation.summary,
      }),
    [
      recommendationItemsKey,
      removed,
      items,
      recommendation.estimatedDurationDays,
      recommendation.summary,
    ],
  )

  /** Same-tab + new-tab quote: Router `state` is lost on target=_blank, so we mirror the draft here. */
  useEffect(() => {
    const active = items.filter((item) => !removed.has(itemKey(item)))
    if (active.length === 0) {
      clearQuoteAiDraft()
      return
    }
    writeQuoteAiDraft({
      ...recommendation,
      items: active,
      totalDailyRate: active.reduce((sum, item) => sum + item.dailyRate * item.quantity, 0),
    })
  }, [quoteDraftPersistKey, recommendation, items, removed])

  const totalDailyRate = activeItems.reduce((sum, item) => sum + item.dailyRate * item.quantity, 0)
  const rentalPeriodTotal = totalDailyRate * recommendation.estimatedDurationDays
  const { combined: deliveryPickupCombined } = getDeliveryPickupFees(isMember)
  const estimatedGrandTotal = rentalPeriodTotal + deliveryPickupCombined

  const filteredProducts = useMemo(() => {
    const catalog = getProducts()
    const q = search.trim().toLowerCase()
    if (!q) return catalog.slice(0, 8)
    return catalog
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
      .slice(0, 12)
  }, [search, tick])

  useEffect(() => {
    if (!overlayOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOverlayOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [overlayOpen])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!searchRef.current?.contains(e.target as Node)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const updateQty = (key: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (itemKey(item) !== key) return item
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }),
    )
    setRemoved((prev) => {
      const next = new Set(prev)
      next.delete(key)
      return next
    })
  }

  const setQtyExact = (key: string, raw: number) => {
    const n = Math.floor(raw)
    const q = Number.isFinite(n) && n >= 1 ? n : 1
    setItems((prev) =>
      prev.map((item) => (itemKey(item) !== key ? item : { ...item, quantity: q })),
    )
    setRemoved((prev) => {
      const next = new Set(prev)
      next.delete(key)
      return next
    })
  }

  const handleAddToCart = () => {
    const days = Math.max(1, Math.floor(recommendation.estimatedDurationDays))
    for (const item of activeItems) {
      const p = getProductById(item.productId)
      if (p) addItem(p, item.quantity, days)
    }
  }

  const focusAddOptions = () => {
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    setSearchOpen(true)
    window.setTimeout(() => searchInputRef.current?.focus(), 180)
  }

  const removeItem = (key: string) => {
    setRemoved((prev) => new Set(prev).add(key))
  }

  const restoreAll = () => setRemoved(new Set())

  const addProduct = (p: Product) => {
    const key = p.id + p.name
    setRemoved((prev) => {
      const next = new Set(prev)
      next.delete(key)
      return next
    })
    setItems((prev) => {
      const existing = prev.find((it) => it.productId === p.id)
      if (existing) {
        return prev.map((it) =>
          it.productId === p.id ? { ...it, quantity: it.quantity + 1 } : it,
        )
      }
      return [...prev, productToLine(p)]
    })
    setSearch('')
    setSearchOpen(false)
  }

  function renderCartBody({ inOverlay }: { inOverlay: boolean }) {
    return (
    <div className="flex flex-col flex-1 min-h-0 max-h-full overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-brand-500/10 to-slate-800/60 border-b border-slate-700/60 flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 bg-brand-500/15 border border-brand-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <ShoppingCart size={15} className="text-brand-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-white">Equipment quote</span>
              <span className="inline-flex items-center px-1.5 py-0.5 bg-brand-500 text-white text-[10px] font-bold rounded-full">
                {activeItems.length}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-snug truncate">
              {recommendation.summary.slice(0, 96)}
              {recommendation.summary.length > 96 ? '…' : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <div className="text-right">
            <div className="text-xs sm:text-sm font-bold text-white tabular-nums">
              ${totalDailyRate.toFixed(0)}
              <span className="text-[10px] sm:text-xs font-normal text-slate-400">/day</span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-slate-500 tabular-nums">~${estimatedGrandTotal.toFixed(0)} total</div>
            <div className="text-[8px] sm:text-[9px] text-slate-600 tabular-nums max-w-[9rem] sm:max-w-none leading-tight text-right">
              {isMember ? 'Incl. delivery & pickup (member)' : 'Incl. $150 delivery + $150 pickup'}
            </div>
          </div>
          {inOverlay ? (
            <button
              type="button"
              onClick={() => setOverlayOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/80 transition-colors"
              aria-label="Close full screen quote"
            >
              <X size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setOverlayOpen(true)}
              title="Full screen"
              aria-label="Open equipment quote full screen"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/80 transition-colors border border-slate-700/80"
            >
              <Maximize2 size={16} />
            </button>
          )}
        </div>
      </div>

      <div
        className="px-3 py-2 border-b border-slate-800/80 bg-slate-900/50 flex-shrink-0"
        ref={searchSectionRef}
      >
        <div className="relative" ref={searchRef}>
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            ref={searchInputRef}
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setSearchOpen(true)
            }}
            onFocus={() => setSearchOpen(true)}
            placeholder="Search catalog to add…"
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-800/80 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 outline-none focus:border-brand-500/40"
          />
          {searchOpen && (
            <div className="absolute left-0 right-0 top-full mt-1 z-10 max-h-48 overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 shadow-xl">
              {filteredProducts.length === 0 ? (
                <p className="px-3 py-2 text-[11px] text-slate-500">No matches</p>
              ) : (
                filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => addProduct(p)}
                    className="w-full flex items-center gap-2 px-2 py-2 text-left hover:bg-slate-800/80 transition-colors border-b border-slate-800/60 last:border-0"
                  >
                    <div className="w-9 h-9 rounded-md overflow-hidden border border-slate-700 bg-slate-800 flex-shrink-0">
                      <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] text-slate-200 leading-snug line-clamp-2">{p.name}</span>
                    <Plus size={14} className="text-brand-400 flex-shrink-0 ml-auto" />
                  </button>
                ))
              )}
            </div>
          )}
        </div>
        <p className="text-[9px] text-slate-600 mt-1">Add lines from inventory; continue chatting below anytime.</p>
      </div>

      <div className="divide-y divide-slate-800/60 overflow-y-auto flex-1 min-h-0">
        {activeItems.map((item) => {
          const key = itemKey(item)
          const pc = priorityConfig[item.priority]
          const p = getProductById(item.productId)
          const imgUrl = p?.imageUrl ?? null
          return (
            <div
              key={key}
              className="flex items-center gap-3 p-3 group hover:bg-slate-800/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg border border-slate-700/60 bg-slate-800 flex-shrink-0 overflow-hidden">
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt=""
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

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-medium text-white leading-snug">{item.productName}</span>
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-px text-[9px] font-semibold rounded-full border ${pc.bg} ${pc.border} ${pc.color}`}
                  >
                    <span className={`w-1 h-1 rounded-full ${pc.dot}`} />
                    {pc.label}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-snug line-clamp-1">{item.rationale}</p>
                <div className="text-[10px] text-slate-400 mt-0.5">${item.dailyRate.toFixed(2)}/ea/day</div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => updateQty(key, -1)}
                    className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    <Minus size={10} />
                  </button>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={item.quantity}
                    onChange={(e) => setQtyExact(key, parseInt(e.target.value, 10))}
                    className="w-9 min-w-0 bg-slate-900 text-center text-xs font-bold text-white outline-none focus:ring-0 border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    aria-label={`Quantity for ${item.productName}`}
                  />
                  <button
                    type="button"
                    onClick={() => updateQty(key, 1)}
                    className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    <Plus size={10} />
                  </button>
                </div>

                <div className="w-14 text-right">
                  <div className="text-xs font-semibold text-white">${(item.dailyRate * item.quantity).toFixed(0)}</div>
                  <div className="text-[9px] text-slate-500">/day</div>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(key)}
                  className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-all rounded"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          )
        })}

        {removed.size > 0 && (
          <div className="flex items-center justify-between px-4 py-2 bg-slate-800/40">
            <span className="text-[10px] text-slate-500">
              {removed.size} item{removed.size > 1 ? 's' : ''} removed
            </span>
            <button
              type="button"
              onClick={restoreAll}
              className="text-[10px] text-brand-400 hover:text-brand-300 font-medium transition-colors"
            >
              Restore all
            </button>
          </div>
        )}
      </div>

      <div className="px-4 py-3 bg-slate-800/40 border-t border-slate-700/60 flex-shrink-0">
        <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">Daily rate</div>
              <div className="text-sm font-bold text-white">${totalDailyRate.toFixed(2)}</div>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">Duration</div>
              <div className="text-sm font-bold text-white">{recommendation.estimatedDurationDays} days</div>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">Est. total</div>
              <div className="text-sm font-bold text-brand-400">~${estimatedGrandTotal.toFixed(0)}</div>
            </div>
          </div>
        </div>

        <DeliveryPickupBreakdown isMember={isMember} variant="compact" className="mt-2 pt-2 border-t border-slate-700/50" />

        {recommendation.setupNotes.length > 0 && (
          <>
            <button
              type="button"
              onClick={() => setShowNotes((v) => !v)}
              className="flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-slate-200 transition-colors mb-2"
            >
              <Info size={10} />
              Setup notes
              {showNotes ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            </button>
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
          </>
        )}

        <div className="flex items-start gap-1.5 p-2 bg-amber-500/5 border border-amber-500/15 rounded-lg mb-3">
          <AlertCircle size={9} className="text-amber-400 flex-shrink-0 mt-px" />
          <p className="text-[9px] text-amber-200/50 leading-relaxed">{recommendation.disclaimer}</p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={activeItems.length === 0}
              className="flex-1 min-w-[9rem] flex items-center justify-center gap-1.5 py-2.5 px-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-brand-500/20"
            >
              <ShoppingCart size={13} />
              Add to cart
            </button>
            <Link
              to="/browse"
              className="flex-1 min-w-[9rem] flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-700/60 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-semibold rounded-xl transition-all text-center"
            >
              Continue shopping
            </Link>
          </div>
          <button
            type="button"
            onClick={focusAddOptions}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-brand-200 border border-brand-500/45 rounded-xl hover:bg-brand-500/12 transition-colors"
          >
            <Plus size={13} />
            Add more options
          </button>
        </div>
      </div>
    </div>
    )
  }

  const overlayPortal =
    overlayOpen &&
    createPortal(
      <div
        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-4"
        role="presentation"
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/80 backdrop-blur-md border-0 cursor-default w-full h-full"
          aria-label="Dismiss overlay"
          onClick={() => setOverlayOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-quote-title"
          className="relative z-[1] w-full sm:max-w-xl max-h-[92vh] sm:max-h-[min(90vh,760px)] flex flex-col rounded-t-[1.25rem] sm:rounded-2xl border border-slate-600/50 bg-slate-900/98 ring-1 ring-white/[0.06] shadow-2xl shadow-black/50 overflow-hidden animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          <span id="cart-quote-title" className="sr-only">
            Equipment quote cart
          </span>
          {renderCartBody({ inOverlay: true })}
        </div>
      </div>,
      document.body,
    )

  const embeddedMax =
    layout === 'inline' ? 'max-h-[min(520px,58svh)] min-h-[200px]' : 'max-h-[min(560px,56vh)] min-h-[220px]'

  return (
    <>
      <div
        className={`w-full rounded-2xl border border-slate-700/80 bg-slate-900/95 ring-1 ring-white/[0.04] shadow-xl shadow-black/30 overflow-hidden flex flex-col ${embeddedMax}`}
      >
        {renderCartBody({ inOverlay: false })}
      </div>
      {overlayPortal}
    </>
  )
}
