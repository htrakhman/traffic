import BuyerLayout from '../../components/buyer/BuyerLayout'
import QuoteForm from '../../components/buyer/QuoteForm'
import SpecsTable from '../../components/buyer/SpecsTable'
import BuyerFAQ from '../../components/buyer/BuyerFAQ'
import SEO from '../../components/seo/SEO'
import JsonLd, { schema } from '../../components/seo/JsonLd'

const FAQS = [
  {
    q: 'What is a channelizing drum used for?',
    a: 'Marking a taper or lane edge on higher-speed roads, where a cone is too light to read as a serious barrier and a barricade is more device than the job needs. Drums are heavier, more visible, and hold their position better in wind and truck wake than cones.',
  },
  {
    q: 'Cone vs drum — which one do I need?',
    a: "Cones for lower-speed, shorter-duration work: parking lots, short lane shifts, event control. Drums for longer-duration work on faster roads, where the extra height and weight matter. Many DOT specs require drums instead of cones above a certain posted speed or job duration.",
  },
  {
    q: 'Do drums need to be reflective?',
    a: 'For any low-light or nighttime work, yes. A 6" reflective collar is standard on most drums sold for road work.',
  },
]

export default function ChannelizingDrums() {
  return (
    <BuyerLayout>
      <SEO
        title="Channelizing Drums for Sale | Traffic Drums & Barrels"
        description="Reflective channelizing drums with weighted rubber bases for lane control and work zone tapers. Real specs, get a quote, no price posted."
        canonicalPath="/channelizing-drums"
      />
      <JsonLd data={schema.faqPage(FAQS)} />
      <JsonLd
        data={schema.product({
          name: 'Channelizing Drums',
          description: 'Reflective channelizing drums with weighted rubber bases for lane control and work zone tapers.',
          slug: 'channelizing-drums',
          category: 'Traffic Drums',
        })}
      />

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <h1 className="font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Channelizing drums
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              37" reflective drums with a weighted rubber tire-ring base, for lane control and
              tapers on higher-speed roads.
            </p>
          </div>
          <QuoteForm productCategory="Channelizing Drums" anchorId="quote" />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/90">
            <p>
              A drum does the same basic job as a cone, marking the edge of a lane or the line of
              a taper, but it's built for a rougher environment. At 37" tall on a 23" tire-ring
              base, it's harder to knock over, more visible in a driver's peripheral vision, and
              holds up better to the wind blast off passing trucks than a cone does.
            </p>
            <p>
              Most state DOT specs call for drums instead of cones once you're past a certain
              posted speed or the closure runs more than a day or two. If you're not sure which
              your job needs, tell us the road type and duration in the notes field.
            </p>
          </div>

          <dl className="self-start space-y-5 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Height</dt>
              <dd className="mt-1 text-base text-ink">37"</dd>
            </div>
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Base</dt>
              <dd className="mt-1 text-base text-ink">23" tire ring, weighted rubber</dd>
            </div>
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Compliance</dt>
              <dd className="mt-1 text-base text-ink">MUTCD</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Drum specs</h2>
          <div className="mt-8">
            <SpecsTable
              title="Channelizing drum specs"
              rows={[
                [
                  { label: 'Height', value: '37"' },
                  { label: 'Base', value: '23" tire ring' },
                ],
                [
                  { label: 'Reflective collar', value: '6", engineer grade or high intensity' },
                  { label: 'Compliance', value: 'MUTCD' },
                ],
              ]}
            />
          </div>
        </div>
      </section>

      <div className="tcs-stripe" />

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Drum questions</h2>
          <div className="mt-8">
            <BuyerFAQ items={FAQS} />
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
          <QuoteForm productCategory="Channelizing Drums" heading="Order drums — get a quote" />
        </div>
      </section>
    </BuyerLayout>
  )
}
