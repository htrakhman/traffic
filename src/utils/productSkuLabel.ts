/** Single-line SKU copy for cart / checkout / quotes (internal + supplier reorder code). */
export function productSkuLabel(p: { sku: string; supplierSku?: string }): string {
  const sup = (p.supplierSku ?? '').trim()
  if (!sup) return `SKU ${p.sku}`
  if (sup === p.sku.trim()) return `SKU ${p.sku}`
  return `SKU ${p.sku} · Reorder ${sup}`
}
