/**
 * Catalog `supplierReferenceUnitPrice` values are pre-markup economics; retail shelf unit price
 * uses this multiplier (50% markup). Kept in its own module to avoid a circular import between
 * `src/data/products.ts` and `src/utils/pricing.ts` (the cycle caused a TDZ crash in the bundle).
 */
export const RETAIL_MARKUP_MULTIPLIER = 1.5

export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100
}
