import BuyerLayout from '../../components/buyer/BuyerLayout'
import QuoteForm from '../../components/buyer/QuoteForm'
import SpecsTable from '../../components/buyer/SpecsTable'
import BuyerFAQ from '../../components/buyer/BuyerFAQ'
import SEO from '../../components/seo/SEO'
import JsonLd, { schema } from '../../components/seo/JsonLd'

const FAQS = [
  {
    q: 'What is a Type III barricade?',
    a: "The largest of the three MUTCD barricade types, built with three horizontal rails instead of one or two. It reads from a distance as a hard stop and is the standard device for a full road or lane closure, as opposed to Type I and Type II, which channelize traffic around a smaller hazard rather than block the way entirely.",
  },
  {
    q: 'How many barricades do I need for a closure?',
    a: 'It depends on the length of the closure and your state DOT taper formula, which is usually tied to posted speed. Put your road type and speed in the notes field and we\'ll route the request to a supplier who can help size it.',
  },
  {
    q: 'What is a galvanized crowd control fence panel used for?',
    a: "Events, parades, and construction laydown yards, not moving traffic. It's a different device from a road barricade: interlocking steel panels that fence off an area rather than channelize a lane.",
  },
  {
    q: 'Plastic or steel barricade legs?',
    a: '14 gauge galvanized steel legs are the standard for durability on repeated use. Plastic-leg barricades exist and are lighter, but steel holds up better outdoors over a full season.',
  },
]

export default function Barricades() {
  return (
    <BuyerLayout>
      <SEO
        title="Barricades for Sale | Type II & Type III Traffic Barricades"
        description="Type II and Type III traffic barricades, NCHRP-350 crash tested, plus galvanized crowd control fence panels. Get a quote, no price posted."
        canonicalPath="/barricades"
      />
      <JsonLd data={schema.faqPage(FAQS)} />
      <JsonLd
        data={schema.product({
          name: 'Barricades',
          description: 'Type II and Type III traffic barricades and galvanized crowd control fence panels.',
          slug: 'barricades',
          category: 'Barricades',
        })}
      />

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <h1 className="font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Barricades
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Type II traffic barricades and galvanized crowd control fence panels. Tell us the
              quantity, type, and delivery state.
            </p>
          </div>
          <QuoteForm productCategory="Barricades" anchorId="quote" />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/90">
            <p>
              MUTCD splits barricades into three types by rail count. Type I uses one rail and is
              the lightest option, for short-duration daytime work. Type II uses two rails and
              covers most partial-closure and channelizing jobs. Type III uses three rails, is
              wider, and functions as a hard stop for a full road or lane closure.
            </p>
            <p>
              A Type II barricade in our catalog runs 8" × 24" panels on 14 gauge galvanized legs,
              folds flat for storage, and is NCHRP-350 crash tested. That's the workhorse spec
              most suppliers stock.
            </p>
            <p>
              Crowd control fence is a different animal entirely. It's not rated for vehicle
              impact and isn't a traffic device — it's for perimeter control at events, parades,
              and laydown yards. Panels interlock end to end and typically span 7 ft each, so a
              100 ft run takes about 15 panels plus extras for corners and gates.
            </p>
          </div>

          <dl className="self-start space-y-5 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Partial closure</dt>
              <dd className="mt-1 text-base text-ink">Type II barricade</dd>
            </div>
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Full closure</dt>
              <dd className="mt-1 text-base text-ink">Type III barricade</dd>
            </div>
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Event perimeter</dt>
              <dd className="mt-1 text-base text-ink">Galvanized crowd control fence, not vehicle-rated</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Specs</h2>
          <div className="mt-8">
            <SpecsTable
              title="Barricade specs"
              rows={[
                [
                  { label: 'Type II panel', value: '8" × 24"' },
                  { label: 'Type II legs', value: '14 gauge galvanized' },
                ],
                [
                  { label: 'Crowd control panel', value: '7 ft long × 42" tall' },
                  { label: 'Crowd control weight', value: '~35 lb with bridge feet' },
                ],
                [
                  { label: 'Compliance', value: 'NCHRP-350 (barricades only)' },
                  { label: 'Fence frame', value: 'Galvanized steel tube, welded wire mesh' },
                ],
              ]}
            />
          </div>
        </div>
      </section>

      <div className="tcs-stripe" />

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Barricade questions</h2>
          <div className="mt-8">
            <BuyerFAQ items={FAQS} />
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
          <QuoteForm productCategory="Barricades" heading="Order barricades — get a quote" />
        </div>
      </section>
    </BuyerLayout>
  )
}
