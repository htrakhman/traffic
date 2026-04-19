import type { AIRecommendation, RecommendationItem, MapArea } from '../types'
import { getProductById } from '../data/products'

/** When set, modest-footprint channelizing (cones/drums) totals may be capped vs. polygon perimeter. */
export type RecommendationFootprintGuard = Pick<MapArea, 'perimeterFt' | 'areaFt2'>

const MODEST_AREA_SQFT = 15_000
/** Generous multiple of ~one-edge channelizing count (ceil(perimeter/20)) for small sites. */
const PERIMETER_CHANNEL_CAP_FACTOR = 3

function applyModestFootprintChannelizingGuard(
  rec: AIRecommendation,
  guard: RecommendationFootprintGuard | undefined,
): AIRecommendation {
  if (!guard) return rec
  const { perimeterFt, areaFt2 } = guard
  if (
    perimeterFt == null ||
    areaFt2 == null ||
    perimeterFt <= 0 ||
    areaFt2 <= 0 ||
    areaFt2 >= MODEST_AREA_SQFT
  ) {
    return rec
  }

  const cap = Math.max(4, Math.ceil(perimeterFt / 20) * PERIMETER_CHANNEL_CAP_FACTOR)

  const channelIndices: number[] = []
  let total = 0
  rec.items.forEach((it, i) => {
    const p = getProductById(it.productId)
    if (p?.categorySlug === 'cones-drums' && it.quantity > 0) {
      channelIndices.push(i)
      total += it.quantity
    }
  })
  if (total <= cap) return rec

  const factor = cap / total
  const items = rec.items.map((it) => ({ ...it }))
  for (const i of channelIndices) {
    const q = items[i].quantity
    items[i] = {
      ...items[i],
      quantity: Math.max(1, Math.floor(q * factor)),
      rationale:
        items[i].rationale +
        (items[i].rationale.includes('Adjusted to better match drawn zone')
          ? ''
          : ' Adjusted to better match drawn zone size — confirm tapers with your TCP or state DOT.'),
      priority:
        items[i].priority === 'required' && Math.floor(q * factor) < q
          ? 'recommended'
          : items[i].priority,
    }
  }

  let sum = channelIndices.reduce((s, i) => s + items[i].quantity, 0)
  while (sum > cap) {
    let best = -1
    let bestQ = -1
    for (const i of channelIndices) {
      if (items[i].quantity > bestQ) {
        bestQ = items[i].quantity
        best = i
      }
    }
    if (best < 0 || bestQ <= 1) break
    items[best] = { ...items[best], quantity: bestQ - 1 }
    sum -= 1
  }

  const note =
    'Cone/drum quantities were auto-capped for the drawn work zone size; verify channelization and tapers against your TCP or DOT.'
  const priorNotes = rec.setupNotes ?? []
  const setupNotes = priorNotes.some((n) => n.includes('auto-capped')) ? priorNotes : [...priorNotes, note]

  return { ...rec, items, setupNotes }
}

/**
 * All catalog `dailyRate` / `weeklyRate` / `monthlyRate` values are **retail** rental rates.
 * They are computed as supplier-reference rental economics × this multiplier (50% markup).
 */
export const RETAIL_MARKUP_MULTIPLIER = 1.5

export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100
}

/** Apply 50% markup to a supplier-reference daily rate (use when setting or auditing catalog numbers). */
export function applyRetailMarkup(supplierReferenceDaily: number): number {
  return roundMoney(supplierReferenceDaily * RETAIL_MARKUP_MULTIPLIER)
}

/**
 * Forces AI / demo recommendations to use catalog retail rates so quotes never show pre-markup pricing.
 * Optionally caps cones/drums on modest drawn footprints when the model over-shoots vs. perimeter.
 */
export function normalizeRecommendationPricing(
  rec: AIRecommendation,
  mapFootprint?: RecommendationFootprintGuard,
): AIRecommendation {
  const priced = applyModestFootprintChannelizingGuard(rec, mapFootprint)
  const items: RecommendationItem[] = priced.items.map((item) => {
    const p = getProductById(item.productId)
    if (!p) return item
    return {
      ...item,
      dailyRate: p.dailyRate,
      productName: p.name,
      category: p.categorySlug.replace(/-/g, ' '),
    }
  })
  const totalDailyRate = roundMoney(
    items.reduce((sum, it) => sum + it.dailyRate * it.quantity, 0),
  )
  return { ...priced, items, totalDailyRate }
}
