import { Navigate, useParams } from 'react-router-dom'
import BuyerLayout from '../components/buyer/BuyerLayout'
import QuoteForm from '../components/buyer/QuoteForm'
import BuyerFAQ from '../components/buyer/BuyerFAQ'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
import { COMPARISONS, getComparison } from '../data/comparisons'

export default function ComparisonPage() {
  const { slug = '' } = useParams()
  const c = getComparison(slug)
  if (!c) return <Navigate to="/blog" replace />
  const path = `/compare/${c.slug}`

  return (
    <BuyerLayout>
      <SEO title={c.title} description={c.description} canonicalPath={path} ogType="article" />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: c.h1,
          description: c.description,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `https://trafficcontrolsupply.com${path}` },
          author: { '@type': 'Organization', name: 'Traffic Control Supply' },
        }}
      />
      <JsonLd
        data={schema.breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Compare', path },
        ])}
      />
      <JsonLd data={schema.faqPage(c.faqs)} />

      <article className="bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">Buying guide</p>
          <h1 className="mt-3 font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">{c.h1}</h1>
          <p className="mt-5 text-lg text-muted">{c.intro}</p>

          <div className="mt-10 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead className="bg-paper">
                <tr>
                  <th className="px-4 py-3" />
                  <th className="px-4 py-3 font-tcsDisplay text-ink">{c.columns[0]}</th>
                  <th className="px-4 py-3 font-tcsDisplay text-ink">{c.columns[1]}</th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map(([label, a, b]) => (
                  <tr key={label} className="border-t border-line">
                    <th scope="row" className="tcs-mono px-4 py-3 text-xs uppercase tracking-[0.08em] text-muted">
                      {label}
                    </th>
                    <td className="px-4 py-3 text-ink">{a}</td>
                    <td className="px-4 py-3 text-ink">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {c.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="font-tcsDisplay text-2xl font-bold text-ink">{s.heading}</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-ink/90">{s.body}</p>
            </section>
          ))}

          <section className="mt-10 rounded-lg border-l-4 border-zone bg-paper p-5">
            <h2 className="font-tcsDisplay text-xl font-bold text-ink">Bottom line</h2>
            <p className="mt-2 text-[17px] leading-relaxed text-ink/90">{c.verdict}</p>
          </section>

          <ul className="mt-8 flex flex-wrap gap-3">
            {c.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-block rounded-md border border-line px-4 py-2 text-sm text-ink hover:border-zone">
                  {l.label} →
                </a>
              </li>
            ))}
          </ul>

          <section className="mt-14">
            <h2 className="font-tcsDisplay text-2xl font-bold text-ink">Questions</h2>
            <div className="mt-6">
              <BuyerFAQ items={c.faqs} />
            </div>
          </section>

          <p className="mt-12 text-sm text-muted">
            More comparisons:{' '}
            {COMPARISONS.filter((x) => x.slug !== c.slug).map((x, i) => (
              <span key={x.slug}>
                {i > 0 && ' · '}
                <a href={`/compare/${x.slug}`} className="text-ink underline hover:text-zone">
                  {x.h1}
                </a>
              </span>
            ))}
          </p>
        </div>
      </article>

      <section className="bg-paper">
        <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8 sm:py-16">
          <QuoteForm productCategory={c.h1} anchorId="quote" />
        </div>
      </section>
    </BuyerLayout>
  )
}
