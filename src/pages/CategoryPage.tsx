import BuyerLayout from '../components/buyer/BuyerLayout'
import QuoteForm from '../components/buyer/QuoteForm'
import BuyerFAQ from '../components/buyer/BuyerFAQ'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
import ProductGrid from '../components/catalog/ProductGrid'
import { getCategory, productPath, productsIn, type CategoryId } from '../data/catalog'

export default function CategoryPage({ id }: { id: CategoryId }) {
  const category = getCategory(id)
  const products = productsIn(id)

  return (
    <BuyerLayout>
      <SEO title={category.title} description={category.description} canonicalPath={category.path} />
      <JsonLd data={schema.itemList(products.map((p) => ({ name: p.name, path: productPath(p) })))} />
      <JsonLd
        data={schema.breadcrumb([
          { name: 'Home', path: '/' },
          { name: category.shortName, path: category.path },
        ])}
      />
      {category.faqs.length > 0 && <JsonLd data={schema.faqPage(category.faqs)} />}

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <h1 className="font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">
              {category.name}
            </h1>
            <div className="mt-5 max-w-2xl space-y-4 text-lg text-muted">
              {category.intro.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>
          <QuoteForm productCategory={category.name} anchorId="quote" />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Shop {category.shortName.toLowerCase()}</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Every order is quoted delivered to your site, with volume pricing for wholesale quantities.
          </p>
          <div className="mt-8">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>

      {category.faqs.length > 0 && (
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
            <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Buying questions</h2>
            <div className="mt-8">
              <BuyerFAQ items={category.faqs} />
            </div>
          </div>
        </section>
      )}
    </BuyerLayout>
  )
}
