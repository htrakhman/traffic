import { Navigate, useParams } from 'react-router-dom'
import BuyerLayout from '../components/buyer/BuyerLayout'
import QuoteForm from '../components/buyer/QuoteForm'
import BuyerFAQ from '../components/buyer/BuyerFAQ'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
import { getProduct, productPath } from '../data/catalog'
import { getUseCase, USE_CASES } from '../data/useCases'

export default function UseCasePage() {
  const { slug = '' } = useParams()
  const u = getUseCase(slug)
  if (!u) return <Navigate to="/" replace />
  const path = `/uses/${u.slug}`
  const kit = u.kit.flatMap((k) => {
    const p = getProduct(k.slug)
    return p ? [{ p, why: k.why }] : []
  })

  return (
    <BuyerLayout>
      <SEO title={u.title} description={u.description} canonicalPath={path} />
      <JsonLd
        data={schema.breadcrumb([
          { name: 'Home', path: '/' },
          { name: u.h1, path },
        ])}
      />
      <JsonLd data={schema.itemList(kit.map(({ p }) => ({ name: p.name, path: productPath(p) })))} />
      <JsonLd data={schema.faqPage(u.faqs)} />

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">By job</p>
            <h1 className="mt-3 font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">{u.h1}</h1>
            <div className="mt-5 max-w-2xl space-y-4 text-lg text-muted">
              {u.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <QuoteForm productCategory={u.h1} anchorId="quote" />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink">What to order</h2>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {kit.map(({ p, why }) => (
              <li key={p.slug} className="grid gap-1 py-4 sm:grid-cols-[18rem_1fr] sm:gap-6">
                <a href={productPath(p)} className="font-semibold text-ink underline hover:text-zone">
                  {p.name}
                </a>
                <p className="text-muted">{why}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink">Planning tips</h2>
          {u.planning.map((s) => (
            <div key={s.heading} className="mt-8">
              <h3 className="font-tcsDisplay text-xl font-bold text-ink">{s.heading}</h3>
              <p className="mt-2 text-[17px] leading-relaxed text-ink/90">{s.body}</p>
            </div>
          ))}
          <ul className="mt-8 flex flex-wrap gap-3">
            {u.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-block rounded-md border border-line px-4 py-2 text-sm text-ink hover:border-zone">
                  {l.label} →
                </a>
              </li>
            ))}
          </ul>
          <h2 className="mt-14 font-tcsDisplay text-2xl font-bold text-ink">Questions</h2>
          <div className="mt-6">
            <BuyerFAQ items={u.faqs} />
          </div>
          <p className="mt-12 text-sm text-muted">
            Other jobs:{' '}
            {USE_CASES.filter((x) => x.slug !== u.slug).map((x, i) => (
              <span key={x.slug}>
                {i > 0 && ' · '}
                <a href={`/uses/${x.slug}`} className="text-ink underline hover:text-zone">
                  {x.h1}
                </a>
              </span>
            ))}
          </p>
        </div>
      </section>
    </BuyerLayout>
  )
}
