import type { Product } from '../types'
import { CATALOG_SEED_PRODUCTS } from './catalogSeed'
import { dbProductToStorefront } from '../../api/lib/storefrontMapper'

let catalogCache: Product[] = CATALOG_SEED_PRODUCTS.filter((p) => p.status === 'active').map(
  dbProductToStorefront,
)

export function setCatalogProducts(products: Product[]): void {
  catalogCache = products
}

export function getProducts(): Product[] {
  return catalogCache
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return catalogCache.filter((p) => p.categorySlug === categorySlug)
}

export function getProductBySlug(slug: string): Product | undefined {
  return catalogCache.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return catalogCache.find((p) => p.id === id)
}

export function getFeaturedProducts(): Product[] {
  return catalogCache.filter((p) => p.popular)
}

export function filterProductsBySearchQuery(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return [...products]
  const variants = [q]
  if (q.endsWith('s') && q.length > 2) variants.push(q.slice(0, -1))
  const matchesField = (field: string) => variants.some((v) => field.toLowerCase().includes(v))
  return products.filter(
    (p) =>
      matchesField(p.name) ||
      matchesField(p.description) ||
      matchesField(p.sku) ||
      p.tags.some((t) => variants.some((v) => t.toLowerCase().includes(v))),
  )
}

export function searchProducts(query: string): Product[] {
  return filterProductsBySearchQuery(getProducts(), query)
}

/** @deprecated Extended TSS catalog removed — no-op for compatibility */
export function registerExtendedCatalog(_raw: unknown[]): void {
  /* removed */
}
