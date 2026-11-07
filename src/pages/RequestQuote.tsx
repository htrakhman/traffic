import BuyerLayout from '../components/buyer/BuyerLayout'
import QuoteForm from '../components/buyer/QuoteForm'
import SEO from '../components/seo/SEO'
import { CATEGORIES } from '../data/catalog'

export default function RequestQuote() {
  return (
    <BuyerLayout>
      <SEO
        title="Request a Quote | Barricades, Water Barriers, Cones & More"
        description="Build a quote for crowd control barricades, water-filled barriers, traffic cones, delineators and fence panels. Add every item and quantity, and we reply with one delivered price."
        canonicalPath="/request-quote"
      />
      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">Quote list</p>
            <h1 className="mt-3 font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Request a quote
            </h1>
            <p className="mt-5 text-lg text-muted">
              List every item and quantity for the job. Items you added with "Add to quote list" are already
              filled in. We compare suppliers and send back one delivered price.
            </p>
            <h2 className="mt-10 font-tcsDisplay text-lg font-bold text-ink">Need to add something?</h2>
            <ul className="mt-3 space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <a href={c.path} className="text-ink underline hover:text-zone">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <QuoteForm productCategory="Quote list" anchorId="quote" heading="Your items" orderTypes={['Retail', 'Wholesale']} />
        </div>
      </section>
    </BuyerLayout>
  )
}
