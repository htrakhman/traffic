import BuyerLayout from '../../components/buyer/BuyerLayout'
import QuoteForm from '../../components/buyer/QuoteForm'
import SpecsTable from '../../components/buyer/SpecsTable'
import BuyerFAQ from '../../components/buyer/BuyerFAQ'
import SEO from '../../components/seo/SEO'
import JsonLd, { schema } from '../../components/seo/JsonLd'

const FAQS = [
  {
    q: 'What is a solar arrow board?',
    a: 'A trailer-mounted or truck-mounted panel of amber lamps that displays an arrow, flashing sequence, or four-corner warning pattern to direct traffic around a lane closure. Solar models charge off a roof panel instead of running off a generator or vehicle battery, which is the more common setup on longer jobs now.',
  },
  {
    q: 'What size arrow board do I need?',
    a: "MUTCD groups arrow boards into classes by minimum legibility distance and lamp count, with the required class tied to posted speed. Lower-speed shoulder work can use a smaller board; higher-speed highway closures need a class rated for longer sight distance. Tell us your road's posted speed in the notes field and we'll route it to a supplier who can confirm the right class.",
  },
  {
    q: 'Do I need a trailer-mounted or truck-mounted board?',
    a: "Trailer-mounted boards can be towed into position and left unattended for the duration of a closure. Truck-mounted boards (often on a shadow vehicle) move with traffic and are common on mobile or moving operations. Most one-off lane closures use a trailer-mounted board.",
  },
]

export default function ArrowBoards() {
  return (
    <BuyerLayout>
      <SEO
        title="Arrow Boards for Sale | Solar Arrow Boards"
        description="Solar arrow boards for lane closures and moving operations. MUTCD board classes explained, get a quote, no price posted."
        canonicalPath="/arrow-boards"
      />
      <JsonLd data={schema.faqPage(FAQS)} />
      <JsonLd
        data={schema.product({
          name: 'Arrow Boards',
          description: 'Solar and trailer-mounted arrow boards for lane closures and moving traffic operations.',
          slug: 'arrow-boards',
          category: 'Traffic Control Equipment',
        })}
      />

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <h1 className="font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Arrow boards
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Solar and trailer-mounted arrow boards for lane closures. Tell us the posted speed
              and mount type below.
            </p>
          </div>
          <QuoteForm productCategory="Arrow Boards" anchorId="quote" />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/90">
            <p>
              An arrow board's whole job is to be seen and understood from far enough away that a
              driver has time to merge before reaching the closure. MUTCD ties the required board
              class to posted speed: the faster the road, the longer the legibility distance has
              to be, which usually means a bigger board with more lamps.
            </p>
            <p>
              Solar has become the default power source for most boards sold today. It skips the
              generator noise and fuel runs, and a fully charged unit can usually hold a display
              through a multi-day closure without intervention, weather depending.
            </p>
            <p>
              Mount type is a separate decision from board class. A trailer-mounted board tows
              into place and sits for the duration of the job. A truck-mounted board rides on a
              shadow vehicle and moves with mobile or rolling operations, like striping or
              sweeping.
            </p>
          </div>

          <dl className="self-start space-y-5 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Board class</dt>
              <dd className="mt-1 text-base text-ink">Set by posted speed per MUTCD</dd>
            </div>
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Power</dt>
              <dd className="mt-1 text-base text-ink">Solar (standard), generator or vehicle battery available</dd>
            </div>
            <div>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">Mount</dt>
              <dd className="mt-1 text-base text-ink">Trailer for stationary closures, truck for mobile work</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">What to specify</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Arrow board pricing varies more by class and mount than any other product line here, so
            exact specs get confirmed on the call rather than listed as one-size numbers.
          </p>
          <div className="mt-8">
            <SpecsTable
              title="Arrow board specs"
              rows={[
                [
                  { label: 'Legibility distance', value: 'Set by MUTCD board class' },
                  { label: 'Display', value: 'Arrow, flashing sequence, or four-corner' },
                ],
                [
                  { label: 'Power', value: 'Solar standard' },
                  { label: 'Mount', value: 'Trailer or truck' },
                ],
              ]}
            />
          </div>
        </div>
      </section>

      <div className="tcs-stripe" />

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Arrow board questions</h2>
          <div className="mt-8">
            <BuyerFAQ items={FAQS} />
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
          <QuoteForm productCategory="Arrow Boards" heading="Order an arrow board — get a quote" />
        </div>
      </section>
    </BuyerLayout>
  )
}
