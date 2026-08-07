import BuyerLayout from '../../components/buyer/BuyerLayout'
import QuoteForm from '../../components/buyer/QuoteForm'
import SpecsTable from '../../components/buyer/SpecsTable'
import BuyerFAQ from '../../components/buyer/BuyerFAQ'
import SEO from '../../components/seo/SEO'
import JsonLd, { schema } from '../../components/seo/JsonLd'

const FAQS = [
  {
    q: 'What is the difference between this page and traffic control equipment?',
    a: "Traffic control equipment is road-work specific: barricades, closures, MUTCD Part 6. This page covers the broader safety kit for facilities, lots, and yards: hi-vis vests, wheel chocks, speed bumps, parking blocks, and general-purpose cones. There's overlap, but the buyer is usually a facility manager or safety coordinator rather than a road crew.",
  },
  {
    q: 'What class of safety vest do I need?',
    a: "ANSI/ISEA 107 Class 2 covers most warehouse, loading dock, and parking lot work. Class 3 (taller, more reflective material) is for higher-speed roadway work or low-light conditions. If your insurance or site policy specifies a class, order to that.",
  },
  {
    q: 'Do wheel chocks need to be a certain size?',
    a: "It depends on the tire size of the largest vehicle at the site. 24 inch heavy duty chocks cover most trucks and trailers at a loading dock. Smaller equipment can use a smaller chock, but oversizing is safer than undersizing.",
  },
  {
    q: 'Are speed bumps and parking blocks the same thing?',
    a: 'No. A speed bump runs across a driving lane to slow moving vehicles, typically sold in multi-foot sections you connect end to end. A parking block sits at the front of a parking stall to stop a parked car from rolling forward into a wall or walkway. They solve different problems.',
  },
  {
    q: 'Can I get one supplier for a multi-site rollout?',
    a: 'Tell us the states and rough quantities per site in the notes field. We route it to a supplier who can handle the volume.',
  },
]

export default function TrafficSafetyEquipment() {
  return (
    <BuyerLayout>
      <SEO
        title="Traffic Safety Equipment for Sale | Vests, Chocks, Speed Bumps"
        description="Traffic safety equipment for facilities and lots: hi-vis vests, wheel chocks, speed bumps, parking blocks, and cones. Real specs, no price posted, quote request form."
        canonicalPath="/traffic-safety-equipment"
      />
      <JsonLd data={schema.faqPage(FAQS)} />
      <JsonLd
        data={schema.product({
          name: 'Traffic Safety Equipment',
          description: 'Hi-vis vests, wheel chocks, speed bumps, parking blocks, and cones for facility and lot safety.',
          slug: 'traffic-safety-equipment',
          category: 'Traffic Safety Equipment',
        })}
      />

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <h1 className="font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Traffic safety equipment
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Hi-vis vests, wheel chocks, speed bumps, and parking blocks for facilities, lots, and
              loading docks. Tell us what you need and where.
            </p>
          </div>
          <QuoteForm productCategory="Traffic Safety Equipment" anchorId="quote" />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/90">
            <p>
              Most of what lands on this page isn't going on a public road. It's a warehouse
              installing wheel chocks at a new loading dock, a property manager adding speed bumps
              to a parking lot after a near miss, or a safety coordinator restocking vests for a
              crew that's been borrowing from other departments.
            </p>
            <p>
              The compliance bar is lower than road work but not zero. ANSI/ISEA 107 sets vest
              classes: Class 2 is the standard for most facility and lot work, Class 3 for higher
              visibility needs. Wheel chocks and speed bumps don't have the same federal
              compliance requirement as roadway devices, but sizing still matters. A chock rated
              for a passenger car won't hold a loaded semi.
            </p>
            <p>
              If your list crosses into road-adjacent work (cones for a lane closure, barricades
              for a street closure), our{' '}
              <a href="/traffic-control-equipment" className="text-zone underline underline-offset-2">
                traffic control equipment
              </a>{' '}
              page covers that side more specifically.
            </p>
          </div>

          <dl className="self-start space-y-5 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Crew visibility</dt>
              <dd className="mt-1 text-base text-ink">ANSI/ISEA 107 Class 2 or Class 3 vests</dd>
            </div>
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Loading docks</dt>
              <dd className="mt-1 text-base text-ink">24" heavy duty wheel chocks, sized to your largest vehicle</dd>
            </div>
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Parking lots</dt>
              <dd className="mt-1 text-base text-ink">Speed bumps and parking blocks, plus cones for temporary control</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Specs</h2>
          <div className="mt-8">
            <SpecsTable
              title="Traffic safety equipment specs"
              rows={[
                [
                  { label: 'Hi-vis vest', value: 'ANSI/ISEA 107 Class 2' },
                  { label: 'Wheel chocks', value: '24" heavy duty, sold in pairs' },
                ],
                [
                  { label: 'Speed bump', value: '9.5 ft rubber section' },
                  { label: 'Parking block', value: '3 ft rubber, standard length' },
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
          <QuoteForm productCategory="Traffic Safety Equipment" heading="Order safety equipment — get a quote" />
        </div>
      </section>
    </BuyerLayout>
  )
}
