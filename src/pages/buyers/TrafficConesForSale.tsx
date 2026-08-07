import BuyerLayout from '../../components/buyer/BuyerLayout'
import QuoteForm from '../../components/buyer/QuoteForm'
import SpecsTable from '../../components/buyer/SpecsTable'
import BuyerFAQ from '../../components/buyer/BuyerFAQ'
import SEO from '../../components/seo/SEO'
import JsonLd, { schema } from '../../components/seo/JsonLd'

const FAQS = [
  {
    q: 'What size traffic cone do I need?',
    a: "28\" cones are the standard for parking lots, warehouses, and low-speed areas under about 35 mph. 36\" cones are for roads posted 35 mph or higher, since MUTCD ties minimum cone height to the speed of traffic going past it. If you're not sure what your road is posted at, go with 36\".",
  },
  {
    q: 'Why do cone weights vary?',
    a: 'A 28" cone typically runs 7 lb, a 36" cone 10 lb. The base has to be heavy enough that wind and passing traffic don\'t walk it out of position, but light enough that a crew can set 50 of them in a shift without wrecking their backs. Heavier weighted-base options exist for high-wind sites.',
  },
  {
    q: 'Do cones need to be reflective?',
    a: "For any nighttime or low-light work, yes. Reflective collars (usually 4\" and 6\" bands) are standard on 36\" cones and available on 28\" cones. For daytime-only lot work they're optional.",
  },
  {
    q: 'What does "MUTCD and NCHRP-350" mean on a cone listing?',
    a: 'MUTCD sets the color, height, and reflectivity rules. NCHRP-350 (and its successor MASH) are crash-test standards confirming the cone won\'t become a hazard if struck by a vehicle. Public road work generally requires both.',
  },
  {
    q: 'Can I order a mix of sizes?',
    a: 'Yes, put it in the notes field on the form below.',
  },
]

export default function TrafficConesForSale() {
  return (
    <BuyerLayout>
      <SEO
        title={'Traffic Cones for Sale | 28" & 36" MUTCD Cones'}
        description="28 inch and 36 inch orange traffic cones for sale. MUTCD and NCHRP-350 compliant, reflective collar options. Get a quote, no price posted on the site."
        canonicalPath="/traffic-cones-for-sale"
      />
      <JsonLd data={schema.faqPage(FAQS)} />
      <JsonLd
        data={schema.product({
          name: 'Traffic Cones',
          description: '28 inch and 36 inch orange traffic cones, MUTCD and NCHRP-350 compliant, with reflective collar options.',
          slug: 'traffic-cones-for-sale',
          category: 'Traffic Cones',
        })}
      />

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <h1 className="font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Traffic cones for sale
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              28 inch and 36 inch orange cones, MUTCD and NCHRP-350 compliant. Reflective collars
              available. Tell us the size, quantity, and delivery state below.
            </p>
          </div>
          <QuoteForm productCategory="Traffic Cones" anchorId="quote" />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/90">
            <p>
              The cone itself is simple. The decision that actually matters is height, and it's
              tied directly to how fast traffic is moving past your work. MUTCD's logic is that a
              driver needs to see and register the device with enough lead time to react, and a
              taller cone reads faster from a moving vehicle.
            </p>
            <p>
              28 inch cones cover parking lots, warehouse floors, event setups, and roads posted
              under about 35 mph. Once you're on a road posted 35 or higher, most state DOTs want
              36 inch. The base weight scales with height too: 7 lb on the 28", 10 lb on the 36",
              enough to resist wind and wake turbulence from passing trucks without needing sandbags.
            </p>
            <p>
              Reflective collars matter more than people expect. A cone with no reflective
              material is nearly invisible to headlights past about 100 feet at night. The 4" and
              6" collar combination is the common spec for nighttime and low-visibility work.
            </p>
          </div>

          <dl className="self-start space-y-5 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Under 35 mph</dt>
              <dd className="mt-1 text-base text-ink">28" cone, 7 lb base</dd>
            </div>
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">35 mph and up</dt>
              <dd className="mt-1 text-base text-ink">36" cone, 10 lb base, reflective collars</dd>
            </div>
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Compliance</dt>
              <dd className="mt-1 text-base text-ink">MUTCD color/height, NCHRP-350 crash tested</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Cone specs</h2>
          <div className="mt-8">
            <SpecsTable
              title="Traffic cone specs"
              rows={[
                [
                  { label: '28" cone height', value: '28"' },
                  { label: '28" cone base', value: '14" × 14", 7 lb' },
                ],
                [
                  { label: '36" cone height', value: '36"' },
                  { label: '36" cone base', value: '10 lb, 4"/6" reflective collars' },
                ],
                [
                  { label: 'Color', value: 'Orange (MUTCD standard)' },
                  { label: 'Compliance', value: 'MUTCD / NCHRP-350' },
                ],
              ]}
            />
          </div>
        </div>
      </section>

      <div className="tcs-stripe" />

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Cone questions</h2>
          <div className="mt-8">
            <BuyerFAQ items={FAQS} />
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
          <QuoteForm productCategory="Traffic Cones" heading="Order cones — get a quote" />
        </div>
      </section>
    </BuyerLayout>
  )
}
