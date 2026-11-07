import { useState } from 'react'
import BuyerLayout from '../../components/buyer/BuyerLayout'
import QuoteForm from '../../components/buyer/QuoteForm'
import SEO from '../../components/seo/SEO'
import JsonLd, { schema } from '../../components/seo/JsonLd'

const FAQS = [
  {
    q: 'What is the MUTCD taper length formula?',
    a: 'For speeds of 45 mph or more, L = W × S. For speeds under 45 mph, L = W × S² ÷ 60. L is the merging taper length in feet, W is the width of the offset in feet, and S is the speed in mph.',
  },
  {
    q: 'How far apart should cones be in a taper?',
    a: 'MUTCD guidance is a maximum spacing in feet roughly equal to the speed limit in mph. At 45 mph, about 45 ft apart.',
  },
]

/** MUTCD Table 6C-4 merging taper. */
function taperLength(width: number, speed: number) {
  return speed >= 45 ? width * speed : (width * speed * speed) / 60
}

export default function ConeTaperCalculator() {
  const [speed, setSpeed] = useState(45)
  const [width, setWidth] = useState(12)

  const L = Math.round(taperLength(Math.max(0, width), Math.max(0, speed)))
  const spacing = Math.max(1, speed)
  const cones = L > 0 ? Math.ceil(L / spacing) + 1 : 0

  return (
    <BuyerLayout>
      <SEO
        title="Cone Taper Calculator | MUTCD Taper Length & How Many Cones"
        description="Calculate MUTCD merging taper length and the number of traffic cones for a lane closure from speed and lane width."
        canonicalPath="/tools/cone-taper-calculator"
      />
      <JsonLd data={schema.faqPage(FAQS)} />

      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">Calculator</p>
            <h1 className="mt-3 font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Cone taper calculator
            </h1>
            <p className="mt-5 text-lg text-muted">
              Merging taper length and cone count for a lane closure, using the MUTCD formulas. Your
              traffic control plan and state supplement always take priority.
            </p>

            <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
              <label className="block text-sm text-ink">
                Speed limit (mph)
                <input
                  type="number"
                  min={0}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-2"
                />
              </label>
              <label className="block text-sm text-ink">
                Offset width (ft)
                <input
                  type="number"
                  min={0}
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-2"
                />
              </label>
            </form>

            <div className="mt-8 grid gap-4 sm:grid-cols-3" aria-live="polite">
              <div className="rounded-lg border border-line bg-paper p-5">
                <p className="tcs-mono text-xs uppercase tracking-[0.1em] text-muted">Taper length</p>
                <p className="mt-1 font-tcsDisplay text-3xl font-bold text-ink">{L} ft</p>
              </div>
              <div className="rounded-lg border border-line bg-paper p-5">
                <p className="tcs-mono text-xs uppercase tracking-[0.1em] text-muted">Max spacing</p>
                <p className="mt-1 font-tcsDisplay text-3xl font-bold text-ink">{spacing} ft</p>
              </div>
              <div className="rounded-lg border border-line bg-paper p-5">
                <p className="tcs-mono text-xs uppercase tracking-[0.1em] text-muted">Cones in taper</p>
                <p className="mt-1 font-tcsDisplay text-3xl font-bold text-ink">{cones}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted">
              Formula used: {speed >= 45 ? 'L = W × S' : 'L = W × S² ÷ 60'}. Count covers the taper only; add
              cones for the buffer and work area.
            </p>
            <p className="mt-6 text-sm text-muted">
              Which cone size? See <a href="/compare/28-vs-36-inch-traffic-cones" className="text-ink underline">28 vs 36 inch cones</a>{' '}
              or <a href="/traffic-cones-for-sale" className="text-ink underline">shop cones</a>.
            </p>
          </div>
          <QuoteForm productCategory="Cone taper calculator" anchorId="quote" heading="Quote cones for this closure" />
        </div>
      </section>
    </BuyerLayout>
  )
}
