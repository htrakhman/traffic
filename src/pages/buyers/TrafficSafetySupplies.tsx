import BuyerLayout from '../../components/buyer/BuyerLayout'
import QuoteForm from '../../components/buyer/QuoteForm'
import SpecsTable from '../../components/buyer/SpecsTable'
import BuyerFAQ from '../../components/buyer/BuyerFAQ'
import SEO from '../../components/seo/SEO'
import JsonLd, { schema } from '../../components/seo/JsonLd'

const FAQS = [
  {
    q: 'What counts as traffic safety supplies?',
    a: 'Anything used to channelize traffic, mark a work zone, or keep crews and pedestrians visible: cones, drums, barricades, roll-up signs and stands, hi-vis vests, wheel chocks, speed bumps, and parking lot safety gear. If a job needs it set up before anyone starts digging, it falls in this category.',
  },
  {
    q: 'Do I need MUTCD-compliant equipment?',
    a: "If the work is on a public road, yes. The Manual on Uniform Traffic Control Devices (MUTCD) Part 6 covers temporary traffic control, and most state DOTs require devices that meet it. Private lots and warehouses have more flexibility, but crash-tested equipment (NCHRP-350 or MASH) is worth it anywhere vehicles move fast.",
  },
  {
    q: 'Can I buy in bulk for a fleet or multiple job sites?',
    a: 'Yes. Fill out the form with your quantities and we route the request to a supplier who can cover the volume.',
  },
  {
    q: 'Do you sell direct?',
    a: "No. This page routes your request to a supplier who carries and ships the equipment. We don't hold inventory ourselves.",
  },
]

export default function TrafficSafetySupplies() {
  return (
    <BuyerLayout>
      <SEO
        title="Traffic Safety Supplies for Sale | Cones, Barricades, Signs & More"
        description="Traffic safety supplies for work zones and job sites: cones, barricades, drums, roll-up signs, hi-vis vests, wheel chocks, and speed bumps. Get a quote, no price posted."
        canonicalPath="/traffic-safety-supplies"
      />
      <JsonLd data={schema.faqPage(FAQS)} />
      <JsonLd
        data={schema.product({
          name: 'Traffic Safety Supplies',
          description: 'Cones, barricades, drums, roll-up signs, hi-vis vests, wheel chocks, and speed bumps for work zones and job sites.',
          slug: 'traffic-safety-supplies',
          category: 'Traffic Safety Equipment',
        })}
      />

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <h1 className="font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Traffic safety supplies
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Cones, barricades, drums, signs, vests, wheel chocks, and speed bumps. Whatever's on
              the list for the job site, tell us the quantity and where it's going and we'll route
              it to a supplier who covers your area.
            </p>
          </div>
          <QuoteForm productCategory="Traffic Safety Supplies" anchorId="quote" heading="Get a quote" />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/90">
            <p>
              "Traffic safety supplies" covers a wider range than most people expect on the first
              call. It's not just cones. A typical work zone order mixes channelizing devices
              (cones, drums), positive barriers (Type II barricades), advance warning (roll-up
              signs on stands), and PPE for the crew (Class 2 vests). A facility or parking lot
              order looks different: wheel chocks, speed bumps, parking blocks, maybe a handful of
              cones for temporary lane control.
            </p>
            <p>
              The two buckets need different compliance. Public road work almost always has to
              meet MUTCD Part 6 and be crash-tested to NCHRP-350 or the newer MASH standard.
              Private property work (warehouse yards, apartment complexes, retail lots) has more
              room, though anywhere vehicles move at speed it's still worth using tested equipment.
            </p>
            <p>
              We don't carry inventory ourselves. This page and the form below route your request
              to a supplier who stocks what you need and delivers to your state. No price is
              posted here because it depends on quantity and delivery distance, not because we're
              hiding it.
            </p>
          </div>

          <div className="space-y-5 self-start border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <div>
              <div className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Public road work</div>
              <p className="mt-1 text-sm text-ink">
                Cones, drums, Type I/II/III barricades, roll-up signs, arrow boards. MUTCD Part 6 and
                NCHRP-350 or MASH crash testing usually apply.
              </p>
            </div>
            <div>
              <div className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Private property</div>
              <p className="mt-1 text-sm text-ink">
                Wheel chocks, speed bumps, parking blocks, and cones for lot control. More flexible
                on compliance, still worth buying crash-tested gear.
              </p>
            </div>
            <div>
              <div className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Crew visibility</div>
              <p className="mt-1 text-sm text-ink">
                ANSI/ISEA 107 Class 2 hi-vis vests are the baseline for most road-adjacent work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">What's typically in stock</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Real sizes so you know what you're asking for before you get on the phone.
          </p>
          <div className="mt-8">
            <SpecsTable
              title="Traffic safety supplies specs"
              rows={[
                [
                  { label: 'Traffic cone', value: '28" or 36", 7–10 lb base' },
                  { label: 'Type II barricade', value: '8" × 24" panels, 14 ga galvanized legs' },
                ],
                [
                  { label: 'Channelizing drum', value: '37" tall, 23" tire ring base' },
                  { label: 'Roll-up sign', value: '48" roll-up, quick-latch stand' },
                ],
                [
                  { label: 'Hi-vis vest', value: 'ANSI/ISEA 107 Class 2' },
                  { label: 'Wheel chocks', value: '24" heavy duty, pair' },
                ],
                [
                  { label: 'Speed bump', value: '9.5 ft rubber section' },
                  { label: 'Parking block', value: '3 ft rubber, standard' },
                ],
              ]}
            />
          </div>
        </div>
      </section>

      <div className="tcs-stripe" />

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Questions we get</h2>
          <div className="mt-8">
            <BuyerFAQ items={FAQS} />
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
          <QuoteForm productCategory="Traffic Safety Supplies" heading="Ready to order? Get a quote" />
        </div>
      </section>
    </BuyerLayout>
  )
}
