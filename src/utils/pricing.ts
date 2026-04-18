import type { AIRecommendation, RecommendationItem } from '../types'
import { getProductById } from '../data/products'

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
 */
export function normalizeRecommendationPricing(rec: AIRecommendation): AIRecommendation {
  const items: RecommendationItem[] = rec.items.map((item) => {
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
  return { ...rec, items, totalDailyRate }
}
