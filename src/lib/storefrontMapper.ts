import type { Product } from '../types'
import type { DbProduct } from '../types/dropship'

const CATEGORY_ID: Record<string, string> = {
  'traffic-cones': 'cat-cones',
  barricades: 'cat-barricades',
  'traffic-drums': 'cat-drums',
  'signs-and-stands': 'cat-signs',
  'safety-vests': 'cat-vests',
  'wheel-chocks': 'cat-chocks',
  'speed-control': 'cat-speed',
  'parking-lot-safety': 'cat-parking',
}

/** Map DB row to storefront Product — no supplier fields exposed. */
export function dbProductToStorefront(p: DbProduct): Product {
  return {
    id: p.id,
    categoryId: CATEGORY_ID[p.category_slug] ?? p.category_slug,
    categorySlug: p.category_slug,
    name: p.name,
    slug: p.slug,
    description: p.description,
    longDescription: p.long_description,
    volumePriceTiers: p.volume_price_tiers?.length
      ? p.volume_price_tiers
      : [{ minQty: 1, maxQty: null, supplierReferenceUnitPrice: p.selling_price / 2.025 }],
    unit: p.unit,
    imageUrl: p.image_url,
    images: p.images ?? [],
    specs: p.specs ?? {},
    features: p.features ?? [],
    tags: p.tags ?? [],
    inStock: p.in_stock && p.availability_status !== 'Out of Stock' && p.availability_status !== 'Do Not Sell',
    popular: p.popular,
    sku: p.sku,
    supplierSku: '',
    supplierUrl: '',
    supplier: '',
    weight: p.weight ?? undefined,
    dimensions: p.dimensions ?? undefined,
    faqs: p.faqs ?? undefined,
    useCases: p.use_cases ?? undefined,
    compliance: p.compliance ?? [],
    metaTitle: p.meta_title ?? undefined,
    metaDescription: p.meta_description ?? undefined,
    quoteOnly: p.quote_only,
    sellingPrice: p.selling_price,
    salePrice: p.sale_price ?? undefined,
    availabilityStatus: p.availability_status,
  }
}
