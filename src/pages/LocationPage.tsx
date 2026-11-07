import { Navigate, useParams } from 'react-router-dom'
import BuyerLayout from '../components/buyer/BuyerLayout'
import QuoteForm from '../components/buyer/QuoteForm'
import BuyerFAQ from '../components/buyer/BuyerFAQ'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
import { CATEGORIES } from '../data/catalog'
import { getState, STATES } from '../data/locations'
import { SITE_NAME, SITE_ORIGIN } from '../config/site'

export default function LocationPage() {
  const { state: slug = '' } = useParams()
  const st = getState(slug)
  if (!st) return <Navigate to="/shipping-and-delivery" replace />
  const path = `/delivery/${st.slug}`

  return (
    <BuyerLayout>
      <SEO
        title={`Traffic Control Equipment in ${st.state} | Barricades, Barriers & Cones Delivered`}
        description={`Crowd control barricades, water-filled barriers, cones and delineators delivered anywhere in ${st.state}. Wholesale and retail quotes for ${st.metros.slice(0, 3).join(', ')} and statewide.`}
        canonicalPath={path}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Traffic control and crowd control equipment sales and delivery',
          provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_ORIGIN },
          areaServed: { '@type': 'State', name: st.state },
        }}
      />
      <JsonLd
        data={schema.breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Shipping and delivery', path: '/shipping-and-delivery' },
          { name: st.state, path },
        ])}
      />
      <JsonLd data={schema.faqPage(st.faqs)} />

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">Delivered in {st.abbr}</p>
            <h1 className="mt-3 font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Traffic control equipment delivered in {st.state}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">{st.intro}</p>
            <p className="mt-6 text-sm text-muted">
              Serving {st.metros.join(', ')} and every other {st.state} ZIP code.
            </p>
          </div>
          <QuoteForm productCategory={`${st.state} delivery`} anchorId="quote" />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2">
          <div>
            <h2 className="font-tcsDisplay text-2xl font-bold text-ink sm:text-3xl">What to know in {st.state}</h2>
            <ul className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink/90">
              {st.localNotes.map((n) => (
                <li key={n} className="border-l-2 border-zone pl-4">
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">State DOT: {st.dot}.</p>
          </div>
          <div>
            <h2 className="font-tcsDisplay text-2xl font-bold text-ink sm:text-3xl">What we deliver</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <a href={c.path} className="flex justify-between py-3 text-ink hover:text-zone">
                    {c.name}
                    <span aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-2xl font-bold text-ink sm:text-3xl">{st.state} delivery questions</h2>
          <div className="mt-6">
            <BuyerFAQ items={st.faqs} />
          </div>
          <p className="mt-10 text-sm text-muted">
            Other states:{' '}
            {STATES.filter((s) => s.slug !== st.slug).map((s, i) => (
              <span key={s.slug}>
                {i > 0 && ', '}
                <a href={`/delivery/${s.slug}`} className="text-ink underline hover:text-zone">
                  {s.state}
                </a>
              </span>
            ))}
          </p>
        </div>
      </section>
    </BuyerLayout>
  )
}
