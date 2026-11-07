import { Navigate, useParams } from 'react-router-dom'
import BuyerLayout from '../components/buyer/BuyerLayout'
import QuoteForm from '../components/buyer/QuoteForm'
import BuyerFAQ from '../components/buyer/BuyerFAQ'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
import { SITE_NAME, SITE_ORIGIN } from '../config/site'
import { CATEGORIES } from '../data/catalog'
import { USE_CASES } from '../data/useCases'
import { CITIES, getCity, getState } from '../data/locations'

export default function CityPage() {
  const { state = '', city = '' } = useParams()
  const c = getCity(state, city)
  const st = getState(state)
  if (!c || !st) return <Navigate to="/shipping-and-delivery" replace />
  const path = `/delivery/${st.slug}/${c.slug}`

  return (
    <BuyerLayout>
      <SEO
        title={`Barricades, Water Barriers & Traffic Cones in ${c.city}, ${st.abbr} | Delivered`}
        description={`Steel crowd control barricades, water-filled barriers, cones, delineators and fence panels delivered in ${c.city}, ${st.abbr} and nearby ${c.nearby.slice(0, 3).join(', ')}. Wholesale and retail quotes.`}
        canonicalPath={path}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Traffic control and crowd control equipment sales and delivery',
          provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_ORIGIN },
          areaServed: { '@type': 'City', name: c.city, containedInPlace: { '@type': 'State', name: st.state } },
        }}
      />
      <JsonLd
        data={schema.breadcrumb([
          { name: 'Home', path: '/' },
          { name: st.state, path: `/delivery/${st.slug}` },
          { name: c.city, path },
        ])}
      />
      <JsonLd data={schema.faqPage(c.faqs)} />

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <nav aria-label="Breadcrumb" className="tcs-mono text-xs uppercase tracking-[0.1em] text-muted">
              <a href={`/delivery/${st.slug}`} className="hover:text-ink">{st.state}</a>
              <span aria-hidden="true"> / </span>
              {c.city}
            </nav>
            <h1 className="mt-3 font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Traffic and crowd control equipment in {c.city}, {st.abbr}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">{c.intro}</p>
            <p className="mt-6 text-sm text-muted">Also serving {c.nearby.join(', ')}.</p>
          </div>
          <QuoteForm productCategory={`${c.city}, ${st.abbr} delivery`} anchorId="quote" />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2">
          <div>
            <h2 className="font-tcsDisplay text-2xl font-bold text-ink sm:text-3xl">Ordering for a {c.city} job</h2>
            <ul className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink/90">
              {c.notes.map((n) => (
                <li key={n} className="border-l-2 border-zone pl-4">
                  {n}
                </li>
              ))}
            </ul>
            <h3 className="mt-10 font-tcsDisplay text-lg font-bold text-ink">Common jobs</h3>
            <ul className="mt-3 space-y-2">
              {USE_CASES.slice(0, 4).map((u) => (
                <li key={u.slug}>
                  <a href={`/uses/${u.slug}`} className="text-ink underline hover:text-zone">
                    {u.h1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-tcsDisplay text-2xl font-bold text-ink sm:text-3xl">What we deliver</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a href={cat.path} className="flex justify-between py-3 text-ink hover:text-zone">
                    {cat.name}
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
          <h2 className="font-tcsDisplay text-2xl font-bold text-ink sm:text-3xl">{c.city} delivery questions</h2>
          <div className="mt-6">
            <BuyerFAQ items={c.faqs} />
          </div>
          <p className="mt-10 text-sm text-muted">
            Other cities:{' '}
            {CITIES.filter((x) => x.slug !== c.slug).map((x, i) => (
              <span key={x.slug}>
                {i > 0 && ', '}
                <a href={`/delivery/${x.stateSlug}/${x.slug}`} className="text-ink underline hover:text-zone">
                  {x.city}
                </a>
              </span>
            ))}
          </p>
        </div>
      </section>
    </BuyerLayout>
  )
}
