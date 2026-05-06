/**
 * Catalog `supplierReferenceUnitPrice` values are pre-markup economics; retail shelf unit price
 * uses this multiplier. Kept in its own module to avoid a circular import between
 * `src/data/products.ts` and `src/utils/pricing.ts` (the cycle caused a TDZ crash in the bundle).
 *
 * Net retail vs. TSS = RETAIL_MARKUP_MULTIPLIER / RETAIL_REFERENCE_DIVISOR = 2.025 / 1.5 = 1.35 (35% markup).
 */
export const RETAIL_MARKUP_MULTIPLIER = 2.025
/** Divisor used when storing a supplier reference from an already-retail shelf price.
 * Kept at the legacy 1.5 so stored references don't shift when the apply-side markup moves;
 * the net retail change comes from the ratio RETAIL_MARKUP_MULTIPLIER / RETAIL_REFERENCE_DIVISOR. */
export const RETAIL_REFERENCE_DIVISOR = 1.5

export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100
}
