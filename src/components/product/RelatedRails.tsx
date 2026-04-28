import { useMemo } from 'react'
import type { Product } from '../../types'
import { getProducts, getProductsByCategory } from '../../data/products'
import ProductCard from '../marketplace/ProductCard'

function dedupe(list: Product[], excludeId: string, max: number): Product[] {
  const seen = new Set<string>([excludeId])
  const out: Product[] = []
  for (const p of list) {
    if (seen.has(p.id)) continue
    seen.add(p.id)
    out.push(p)
    if (out.length >= max) break
  }
  return out
}

interface RailProps {
  title: string
  products: Product[]
}

function Rail({ title, products }: RailProps) {
  if (products.length === 0) return null
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  )
}

export default function RelatedRails({ product }: { product: Product }) {
  const sameCategory = useMemo(
    () => dedupe(getProductsByCategory(product.categorySlug), product.id, 5),
    [product.id, product.categorySlug],
  )

  const fromSupplier = useMemo(() => {
    if (!product.supplier) return []
    const all = getProducts().filter((p) => p.supplier === product.supplier)
    return dedupe(all, product.id, 5)
  }, [product.id, product.supplier])

  const alsoViewed = useMemo(() => {
    // Cross-category by tag overlap
    const productTags = new Set(product.tags.map((t) => t.toLowerCase()))
    if (productTags.size === 0) return sameCategory
    const all = getProducts()
    const scored: { p: Product; score: number }[] = []
    for (const p of all) {
      if (p.id === product.id) continue
      let score = 0
      for (const t of p.tags) if (productTags.has(t.toLowerCase())) score++
      if (score > 0 && p.categorySlug !== product.categorySlug) score += 1 // prefer cross-category
      if (score > 0) scored.push({ p, score })
    }
    scored.sort((a, b) => b.score - a.score)
    return dedupe(scored.map((s) => s.p), product.id, 5)
  }, [product.id, product.tags, product.categorySlug, sameCategory])

  return (
    <>
      <Rail title="Customers also viewed" products={alsoViewed} />
      <Rail title={`More from ${product.supplier}`} products={fromSupplier} />
      <Rail title="Frequently bought with this product" products={sameCategory} />
    </>
  )
}
