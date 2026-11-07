import BuyerLayout from '../components/buyer/BuyerLayout'
import QuoteForm from '../components/buyer/QuoteForm'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
import { SITE_ORIGIN } from '../config/site'
import { GLOSSARY } from '../data/glossary'

export default function Glossary() {
  const terms = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term))
  return (
    <BuyerLayout>
      <SEO
        title="Traffic Control & Crowd Control Glossary | MUTCD Terms Explained"
        description="Plain-English definitions of traffic and crowd control terms: MUTCD, taper, Type III barricade, water-filled barrier, MASH, reflective collar and more."
        canonicalPath="/glossary"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          name: 'Traffic and crowd control glossary',
          url: `${SITE_ORIGIN}/glossary`,
          hasDefinedTerm: terms.map((t) => ({
            '@type': 'DefinedTerm',
            name: t.term,
            description: t.definition,
            url: `${SITE_ORIGIN}/glossary#${t.id}`,
          })),
        }}
      />
      <JsonLd
        data={schema.breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Glossary', path: '/glossary' },
        ])}
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">Glossary</p>
          <h1 className="mt-3 font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Traffic and crowd control terms
          </h1>
          <p className="mt-5 text-lg text-muted">
            Short definitions of the terms that come up when you plan a work zone, close a sidewalk or set up an
            event perimeter.
          </p>
          <nav aria-label="Terms" className="mt-8 flex flex-wrap gap-2">
            {terms.map((t) => (
              <a key={t.id} href={`#${t.id}`} className="rounded-md border border-line px-3 py-1 text-sm text-ink hover:border-zone">
                {t.term}
              </a>
            ))}
          </nav>
          <dl className="mt-12 divide-y divide-line border-y border-line">
            {terms.map((t) => (
              <div key={t.id} id={t.id} className="scroll-mt-24 py-6">
                <dt className="font-tcsDisplay text-xl font-bold text-ink">{t.term}</dt>
                <dd className="mt-2 text-[17px] leading-relaxed text-ink/90">
                  {t.definition}
                  {t.link && (
                    <>
                      {' '}
                      <a href={t.link.href} className="font-semibold text-zone hover:underline">
                        {t.link.label} →
                      </a>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="bg-paper">
        <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
          <QuoteForm productCategory="Glossary" anchorId="quote" />
        </div>
      </section>
    </BuyerLayout>
  )
}
