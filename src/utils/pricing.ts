import type { AIRecommendation, RecommendationItem, MapArea, Product, VolumePriceTier } from '../types'
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
 * Catalog `supplierReferenceUnitPrice` values are pre-markup economics; retail shelf unit price
 * uses this multiplier (50% markup).
 */
export const RETAIL_MARKUP_MULTIPLIER = 1.5

export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100
}

/** Apply 50% markup to a supplier-reference unit price (use when building catalog tiers). */
export function applyRetailMarkup(supplierReferenceUnitPrice: number): number {
  return roundMoney(supplierReferenceUnitPrice * RETAIL_MARKUP_MULTIPLIER)
}

/** Sort tiers by minQty ascending (mutates copy). */
export function sortVolumePriceTiers(tiers: VolumePriceTier[]): VolumePriceTier[] {
  return [...tiers].sort((a, b) => a.minQty - b.minQty)
}

/**
 * Pick the volume tier that applies to `quantity` (integer units).
 * If quantity is below the first tier’s minQty, the first tier is still returned (MOQ enforcement is elsewhere).
 */
export function getVolumeTierForQty(tiers: VolumePriceTier[], quantity: number): VolumePriceTier | undefined {
  if (!tiers.length) return undefined
  const sorted = sortVolumePriceTiers(tiers)
  const q = Math.floor(quantity)
  if (q < sorted[0]!.minQty) return sorted[0]

  let best: VolumePriceTier | undefined
  for (const t of sorted) {
    if (q < t.minQty) break
    if (t.maxQty != null && q > t.maxQty) continue
    best = t
  }
  if (best) return best
  return sorted[sorted.length - 1]
}

export function getMinimumOrderQuantity(product: Pick<Product, 'volumePriceTiers'>): number {
  const sorted = sortVolumePriceTiers(product.volumePriceTiers)
  const first = sorted[0]
  return first ? Math.max(1, first.minQty) : 1
}

export function getRetailUnitPriceForQty(
  product: Pick<Product, 'volumePriceTiers'>,
  quantity: number,
): number {
  const tier = getVolumeTierForQty(product.volumePriceTiers, quantity)
  if (!tier) return 0
  return applyRetailMarkup(tier.supplierReferenceUnitPrice)
}

export function getPurchaseLineSubtotal(
  product: Pick<Product, 'volumePriceTiers'>,
  quantity: number,
): number {
  const q = Math.max(0, Math.floor(quantity))
  if (q === 0) return 0
  const unit = getRetailUnitPriceForQty(product, q)
  return roundMoney(unit * q)
}

/** Lowest retail unit price (first tier after markup). */
export function getLowestRetailUnitPrice(product: Pick<Product, 'volumePriceTiers'>): number {
  const sorted = sortVolumePriceTiers(product.volumePriceTiers)
  const first = sorted[0]
  if (!first) return 0
  return applyRetailMarkup(first.supplierReferenceUnitPrice)
}

/**
 * Forces AI / demo recommendations to use catalog purchase tier pricing.
 * Optionally caps cones/drums on modest drawn footprints when the model over-shoots vs. perimeter.
 */
type LegacyRecItem = RecommendationItem & { dailyRate?: number }

function coerceRecommendationItem(it: LegacyRecItem): RecommendationItem {
  const unitPrice =
    typeof it.unitPrice === 'number'
      ? it.unitPrice
      : typeof it.dailyRate === 'number'
        ? it.dailyRate
        : 0
  return {
    productId: it.productId,
    productName: it.productName,
    category: it.category,
    quantity: it.quantity,
    rationale: it.rationale,
    priority: it.priority,
    unitPrice,
  }
}

/** Accept legacy model JSON that used `dailyRate` / `totalDailyRate`. */
export function normalizeRecommendationPricing(
  rec: AIRecommendation & { totalDailyRate?: number; items?: LegacyRecItem[] },
  mapFootprint?: RecommendationFootprintGuard,
): AIRecommendation {
  const coercedItems = (rec.items ?? []).map(coerceRecommendationItem)
  const priced = applyModestFootprintChannelizingGuard(
    { ...rec, items: coercedItems } as AIRecommendation,
    mapFootprint,
  )
  const items: RecommendationItem[] = priced.items.map((item) => {
    const p = getProductById(item.productId)
    if (!p) return item
    return {
      ...item,
      unitPrice: getRetailUnitPriceForQty(p, item.quantity),
      productName: p.name,
      category: p.categorySlug.replace(/-/g, ' '),
    }
  })
  const estimatedMerchandiseSubtotal = roundMoney(
    items.reduce((sum, it) => {
      const p = getProductById(it.productId)
      return sum + (p ? getPurchaseLineSubtotal(p, it.quantity) : 0)
    }, 0),
  )
  return { ...priced, items, estimatedMerchandiseSubtotal }
}
