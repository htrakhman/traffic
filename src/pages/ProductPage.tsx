import { Navigate, useParams } from 'react-router-dom'
import BuyerLayout from '../components/buyer/BuyerLayout'
import QuoteForm from '../components/buyer/QuoteForm'
import BuyerFAQ from '../components/buyer/BuyerFAQ'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
import ProductGrid from '../components/catalog/ProductGrid'
import AddToQuote from '../components/catalog/AddToQuote'
import { getCategory, getProduct, productPath, productsIn } from '../data/catalog'

export default function ProductPage() {
  const { slug = '' } = useParams()
  const product = getProduct(slug)
  if (!product) return <Navigate to="/traffic-safety-supplies" replace />

  const category = getCategory(product.category)
  const related = productsIn(product.category).filter((p) => p.slug !== product.slug).slice(0, 3)
  const path = productPath(product)

  return (
    <BuyerLayout>
      <SEO
        title={`${product.name} | ${category.shortName}`}
        description={product.summary}
        canonicalPath={path}
        ogType="product"
        ogImage={product.image}
      />
      <JsonLd
        data={schema.product({
          name: product.name,
          description: product.summary,
          slug: path.slice(1),
          image: product.image,
          category: category.name,
        })}
      />
      <JsonLd
        data={schema.breadcrumb([
          { name: 'Home', path: '/' },
          { name: category.shortName, path: category.path },
          { name: product.name, path },
        ])}
      />
      {product.faqs.length > 0 && <JsonLd data={schema.faqPage(product.faqs)} />}

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <nav aria-label="Breadcrumb" className="tcs-mono text-xs uppercase tracking-[0.1em] text-muted">
              <a href="/" className="hover:text-ink">Home</a>
              <span aria-hidden="true"> / </span>
              <a href={category.path} className="hover:text-ink">{category.shortName}</a>
            </nav>
            <h1 className="mt-4 font-tcsDisplay text-3xl font-bold leading-tight text-ink sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">{product.summary}</p>
            <p className="mt-4 max-w-xl text-sm text-muted">
              Wholesale or retail. Send the quantity and delivery ZIP and we'll quote the delivered total.
            </p>
            <AddToQuote item={product.name} />
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="mt-8 aspect-[4/3] w-full max-w-lg rounded-lg bg-paper object-contain"
              />
            )}
          </div>
          <QuoteForm productCategory={product.name} anchorId="quote" heading={`Quote: ${product.name}`} defaultItem={product.name} />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/90">
            {product.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
            <h2 className="pt-4 font-tcsDisplay text-2xl font-bold text-ink">Best for</h2>
            <ul className="list-disc space-y-1 pl-5">
              {product.bestFor.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-tcsDisplay text-2xl font-bold text-ink">Specs</h2>
            <dl className="mt-5 divide-y divide-line border-y border-line">
              {product.specs.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[9rem_1fr] gap-4 py-3 text-sm">
                  <dt className="tcs-mono text-xs uppercase tracking-[0.08em] text-muted">{label}</dt>
                  <dd className="text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {product.faqs.length > 0 && (
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
            <h2 className="font-tcsDisplay text-2xl font-bold text-ink sm:text-3xl">Questions</h2>
            <div className="mt-6">
              <BuyerFAQ items={product.faqs} />
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
            <h2 className="font-tcsDisplay text-2xl font-bold text-ink sm:text-3xl">
              More {category.shortName.toLowerCase()}
            </h2>
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      )}
    </BuyerLayout>
  )
}
