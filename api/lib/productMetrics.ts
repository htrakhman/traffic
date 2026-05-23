import type { DbProduct, PriceStatus, ProductWithMetrics } from './dropshipTypes.js'

export function landedCost(
  unitCost: number | null | undefined,
  shippingEstimate: number | null | undefined,
): number | null {
  if (unitCost == null || Number.isNaN(unitCost)) return null
  const ship = shippingEstimate ?? 0
  return Math.round((unitCost + ship) * 100) / 100
}

export function actualMarginPercentage(
  sellingPrice: number,
  landed: number | null,
): number | null {
  if (landed == null || sellingPrice <= 0) return null
  return Math.round(((sellingPrice - landed) / sellingPrice) * 10000) / 100
}

export function computePriceStatus(
  sellingPrice: number,
  competitorPrice: number | null | undefined,
): PriceStatus {
  if (competitorPrice == null || competitorPrice <= 0) return 'Needs Review'
  if (sellingPrice <= competitorPrice) return 'Cheapest'
  const pctAbove = ((sellingPrice - competitorPrice) / competitorPrice) * 100
  if (pctAbove <= 5) return 'Within 5 Percent'
  if (pctAbove <= 10) return 'Within 10 Percent'
  return 'Overpriced'
}

function daysSince(dateStr: string | null | undefined): number | null {
  if (!dateStr) return null
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return null
  return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24))
}

export function buildAdminWarnings(p: DbProduct): string[] {
  const w: string[] = []
  if (!p.primary_supplier_name) w.push('Missing primary supplier')
  if (!p.primary_supplier_url) w.push('Missing supplier URL')
  if (p.primary_supplier_unit_cost == null) w.push('Missing supplier cost')
  if (!p.backup_supplier_name) w.push('Missing backup supplier')
  if (p.primary_supplier_shipping_estimate == null) w.push('Missing shipping estimate')
  const landed = landedCost(p.primary_supplier_unit_cost, p.primary_supplier_shipping_estimate)
  const margin = actualMarginPercentage(p.selling_price, landed)
  if (
    p.target_margin_percentage != null &&
    margin != null &&
    margin < p.target_margin_percentage
  ) {
    w.push('Margin below target')
  }
  const age = daysSince(p.last_price_checked_date)
  if (age != null && age > 7) w.push('Last price checked older than 7 days')
  if (p.status === 'active' && p.availability_status === 'Out of Stock') {
    w.push('Product active but out of stock')
  }
  const priceStatus = computePriceStatus(p.selling_price, p.cheapest_competitor_price)
  if (priceStatus === 'Overpriced') w.push('Selling price more than 10% above cheapest competitor')
  if (p.quote_only && p.in_stock && !p.quote_only) {
    /* handled below */
  }
  if (p.quote_only && p.status === 'active' && !p.quote_only) {
    /* noop */
  }
  if (p.quote_only && p.in_stock) {
    /* quote_only products may still show request quote - warn if cart would work */
  }
  if (p.quote_only === false && p.availability_status === 'Quote Only') {
    w.push('Availability is Quote Only but quote_only flag is false')
  }
  if (p.quote_only && p.in_stock && p.status === 'active') {
    // If quote_only, cart should be disabled on storefront — no warning needed unless misconfigured
  }
  if (p.quote_only && p.selling_price > 0 && !p.quote_only) {
    /* duplicate check removed */
  }
  if (p.quote_only && p.status === 'active') {
    // warn if someone could add to cart: storefront uses quote_only flag
  }
  return w
}

export function enrichProduct(p: DbProduct): ProductWithMetrics {
  const primary_supplier_landed_cost = landedCost(
    p.primary_supplier_unit_cost,
    p.primary_supplier_shipping_estimate,
  )
  const actual_margin_percentage = actualMarginPercentage(p.selling_price, primary_supplier_landed_cost)
  const price_status = computePriceStatus(p.selling_price, p.cheapest_competitor_price)
  const margin_warning =
    p.target_margin_percentage != null &&
    actual_margin_percentage != null &&
    actual_margin_percentage < p.target_margin_percentage
  const admin_warnings = buildAdminWarnings(p)
  if (primary_supplier_shipping_estimate == null && p.primary_supplier_unit_cost != null) {
    admin_warnings.push('Missing shipping estimate. Margin may be inaccurate.')
  }
  if (p.quote_only && p.in_stock) {
    admin_warnings.push('Quote only product — verify Add to Cart is disabled on storefront')
  }
  return {
    ...p,
    primary_supplier_landed_cost,
    actual_margin_percentage,
    price_status,
    margin_warning,
    admin_warnings,
  }
}
