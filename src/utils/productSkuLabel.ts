/** Store SKU only — supplier reorder codes are admin-only. */
export function productSkuLabel(p: { sku: string }): string {
  return `SKU ${p.sku}`
}
