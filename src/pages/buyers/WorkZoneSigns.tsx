import BuyerLayout from '../../components/buyer/BuyerLayout'
import QuoteForm from '../../components/buyer/QuoteForm'
import SpecsTable from '../../components/buyer/SpecsTable'
import BuyerFAQ from '../../components/buyer/BuyerFAQ'
import SEO from '../../components/seo/SEO'
import JsonLd, { schema } from '../../components/seo/JsonLd'

const FAQS = [
  {
    q: 'What is a roll-up sign?',
    a: "A work zone sign printed on flexible fabric or vinyl stretched over a folding frame, so it rolls up for transport and storage instead of needing a rigid panel and a truck bed to move it. 48\" is the standard size for most advance-warning messages (ROAD WORK AHEAD, FLAGGER AHEAD, and similar).",
  },
  {
    q: 'Do I need a custom message?',
    a: 'Standard MUTCD legends (ROAD WORK AHEAD, ONE LANE ROAD AHEAD, etc.) are usually in stock. Custom text is available but typically has to go back to the supplier as a special order, so it takes longer. Put the exact wording you need in the notes field.',
  },
  {
    q: 'What stand do I need for a roll-up sign?',
    a: 'A quick-latch stand sized for 48" signs, with a rubber or heavy base for stability. The stand and sign are usually sold separately since crews often already own stands and just need replacement signs.',
  },
  {
    q: 'Are roll-up signs required to be reflective?',
    a: 'For nighttime or low-visibility work, yes. Daytime-only signs can skip it, but most suppliers stock reflective as standard since jobs run long or start early.',
  },
]

export default function WorkZoneSigns() {
  return (
    <BuyerLayout>
      <SEO
        title="Work Zone Signs for Sale | Roll-Up Signs & Stands"
        description="48 inch roll-up work zone signs and quick-latch stands. MUTCD standard legends, custom text available. Get a quote, no price posted."
        canonicalPath="/work-zone-signs"
      />
      <JsonLd data={schema.faqPage(FAQS)} />
      <JsonLd
        data={schema.product({
          name: 'Work Zone Signs',
          description: '48 inch roll-up work zone signs and quick-latch stands, MUTCD standard legends.',
          slug: 'work-zone-signs',
          category: 'Signs and Stands',
        })}
      />

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <h1 className="font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Work zone signs
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              48" roll-up signs and quick-latch stands. Standard MUTCD legends in stock, custom
              text available.
            </p>
          </div>
          <QuoteForm productCategory="Work Zone Signs" anchorId="quote" />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/90">
            <p>
              A roll-up sign solves a packaging problem more than a signage problem. The message
              itself is the same MUTCD-standard legend you'd get on a rigid aluminum sign. The
              difference is the fabric face folds down small enough to fit in a truck bed or a
              trailer box instead of needing a flat panel and a rack.
            </p>
            <p>
              48" is the standard size for advance warning on most roads. The sign and the stand
              are two separate purchases: the stand is a quick-latch frame with a rubber or heavy
              base, built to hold the fabric taut in wind. Crews replacing a worn sign usually
              already own a stand and just need the fabric.
            </p>
            <p>
              Standard legends (ROAD WORK AHEAD, ONE LANE ROAD AHEAD, FLAGGER AHEAD, and similar)
              are typically in stock. Anything outside the standard set is a custom order, which
              takes longer to fill.
            </p>
          </div>

          <dl className="self-start space-y-5 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Sign size</dt>
              <dd className="mt-1 text-base text-ink">48" roll-up</dd>
            </div>
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Stand</dt>
              <dd className="mt-1 text-base text-ink">Quick-latch, rubber or heavy base</dd>
            </div>
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Legends</dt>
              <dd className="mt-1 text-base text-ink">Standard MUTCD in stock, custom by order</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Sign and stand specs</h2>
          <div className="mt-8">
            <SpecsTable
              title="Work zone sign specs"
              rows={[
                [
                  { label: 'Roll-up sign size', value: '48"' },
                  { label: 'Sign material', value: 'Flexible fabric/vinyl face' },
                ],
                [
                  { label: 'Stand type', value: 'Quick-latch, folding' },
                  { label: 'Stand base', value: 'Rubber or heavy base' },
                ],
              ]}
            />
          </div>
        </div>
      </section>

      <div className="tcs-stripe" />

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Sign questions</h2>
          <div className="mt-8">
            <BuyerFAQ items={FAQS} />
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
          <QuoteForm productCategory="Work Zone Signs" heading="Order signs — get a quote" />
        </div>
      </section>
    </BuyerLayout>
  )
}
