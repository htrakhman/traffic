import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useCatalogSync } from '../context/CatalogSyncContext'
import { categories } from '../data/categories'
import { getProductsByCategory } from '../data/products'
import ProductCard from '../components/marketplace/ProductCard'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
import { SITE_NAME } from '../config/site'

export default function Category() {
  const { slug } = useParams<{ slug: string }>()
  const { tick } = useCatalogSync()
  const category = categories.find((c) => c.slug === slug)
  const products = useMemo(
    () => (slug ? getProductsByCategory(slug) : []),
    [slug, tick],
  )
  const PAGE_SIZE = 48
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  useEffect(() => { setVisibleCount(PAGE_SIZE) }, [slug])
  const visibleProducts = useMemo(() => products.slice(0, visibleCount), [products, visibleCount])

  if (!category) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Category not found</h1>
          <Link to="/browse" className="btn-primary">Browse All Equipment</Link>
        </div>
      </main>
    )
  }

  const productCount = products.length
  const metaTitle = `${category.name} | ${SITE_NAME}`
  const metaDesc =
    category.seoDescription ||
    `Shop ${productCount > 0 ? productCount + ' ' : ''}${category.name.toLowerCase()} — ${category.description}. MUTCD-compliant traffic safety equipment with volume pricing and free shipping.`

  return (
    <main className="min-h-screen pt-20">
      <SEO
        title={metaTitle}
        description={metaDesc.slice(0, 160)}
        canonicalPath={`/category/${category.slug}`}
        ogType="website"
      />
      <JsonLd
        data={schema.breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Equipment', path: '/browse' },
          { name: category.name, path: `/category/${category.slug}` },
        ])}
      />
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <Link to="/browse" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={14} />
            All Equipment
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center text-3xl">
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{category.name}</h1>
              <p className="text-slate-400 mt-1">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400">No products in this category yet.</p>
            <Link to="/browse" className="btn-secondary mt-4">Browse All</Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-400 mb-6">
              <span className="text-white font-semibold">{products.length}</span> items available
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {visibleProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  suppressEntryAnimation={i >= 12}
                />
              ))}
            </div>
            {visibleCount < products.length && (
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                  className="btn-secondary"
                >
                  Load more ({products.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
