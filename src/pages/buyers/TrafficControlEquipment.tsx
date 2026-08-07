import BuyerLayout from '../../components/buyer/BuyerLayout'
import QuoteForm from '../../components/buyer/QuoteForm'
import SpecsTable from '../../components/buyer/SpecsTable'
import BuyerFAQ from '../../components/buyer/BuyerFAQ'
import SEO from '../../components/seo/SEO'
import JsonLd, { schema } from '../../components/seo/JsonLd'

const FAQS = [
  {
    q: 'What is temporary traffic control equipment?',
    a: "Everything used to set up and run a work zone: channelizing devices (cones, drums), barricades, advance warning signs, and in some setups arrow boards or automated flagger devices. MUTCD Part 6 is the federal reference most state DOTs build their own standards from.",
  },
  {
    q: 'What is the difference between Type I, II, and III barricades?',
    a: 'Type I and Type II barricades use one or two horizontal rails and are for partial closures or channelizing traffic around a smaller hazard. Type III adds a third rail and is wider, built for full road or lane closures where the barricade itself is the primary signal that the road is closed ahead.',
  },
  {
    q: 'Do I need a traffic control plan before I order equipment?',
    a: "For most public road work, yes, and it usually specifies exact devices, spacing, and taper lengths. If you already have an approved plan, put the device list and quantities in the notes field and we'll route it accordingly. If you don't have one yet, order what you know you need and add to it.",
  },
  {
    q: 'Can one supplier cover cones, barricades, and signs in the same order?',
    a: "Usually, yes, if they're in your delivery territory. Put everything in one request and we'll match it to a supplier who covers the full list rather than splitting it across two calls.",
  },
]

export default function TrafficControlEquipment() {
  return (
    <BuyerLayout>
      <SEO
        title="Traffic Control Equipment for Sale | Work Zone Devices"
        description="Traffic control equipment for work zones: barricades, cones, drums, and roll-up signs. MUTCD Part 6 reference, real specs, quote request form."
        canonicalPath="/traffic-control-equipment"
      />
      <JsonLd data={schema.faqPage(FAQS)} />
      <JsonLd
        data={schema.product({
          name: 'Traffic Control Equipment',
          description: 'Barricades, cones, channelizing drums, and roll-up signs for temporary traffic control on public roads.',
          slug: 'traffic-control-equipment',
          category: 'Traffic Control Equipment',
        })}
      />

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <h1 className="font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Traffic control equipment
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Barricades, cones, drums, and roll-up signs for work zones on public roads. Built to
              MUTCD Part 6 and crash-tested where it applies.
            </p>
          </div>
          <QuoteForm productCategory="Traffic Control Equipment" anchorId="quote" />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/90">
            <p>
              MUTCD Part 6 is the reference point for almost every temporary traffic control setup
              on a public road in the US. It covers device selection, spacing, taper lengths, and
              signage sequencing for lane closures, shoulder work, and full closures. Most state
              DOTs adopt it directly or publish their own supplement on top of it.
            </p>
            <p>
              The core device set is small: channelizing devices to mark the path (cones or drums),
              barricades to block or narrow access, and advance warning signs to tell drivers what's
              coming. A Type II barricade uses two 8" × 24" panels on 14 gauge galvanized legs.
              That's a light, single-lane-closure device. A Type III barricade adds a third panel
              and reads as a hard stop, used where the road is fully closed ahead.
            </p>
            <p>
              We route requests to suppliers, we don't ship anything ourselves. If your job needs
              an item outside this list, put it in the notes field and we'll try to match it.
            </p>
          </div>

          <dl className="self-start space-y-5 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Partial closure</dt>
              <dd className="mt-1 text-base text-ink">Type II barricades, cones or drums for the taper</dd>
            </div>
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Full closure</dt>
              <dd className="mt-1 text-base text-ink">Type III barricades, advance warning signs</dd>
            </div>
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Standard</dt>
              <dd className="mt-1 text-base text-ink">MUTCD Part 6, NCHRP-350 or MASH crash testing</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Core device specs</h2>
          <div className="mt-8">
            <SpecsTable
              title="Traffic control equipment specs"
              rows={[
                [
                  { label: 'Type II barricade panel', value: '8" × 24"' },
                  { label: 'Type II barricade legs', value: '14 gauge galvanized' },
                ],
                [
                  { label: 'Channelizing drum height', value: '37"' },
                  { label: 'Channelizing drum base', value: '23" tire ring' },
                ],
                [
                  { label: 'Roll-up sign', value: '48", quick-latch stand' },
                  { label: 'Compliance', value: 'MUTCD Part 6, NCHRP-350 / MASH' },
                ],
              ]}
            />
          </div>
        </div>
      </section>

      <div className="tcs-stripe" />

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Common questions</h2>
          <div className="mt-8">
            <BuyerFAQ items={FAQS} />
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
          <QuoteForm productCategory="Traffic Control Equipment" heading="Order equipment — get a quote" />
        </div>
      </section>
    </BuyerLayout>
  )
}
