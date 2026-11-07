import { useState } from 'react'
import BuyerLayout from '../../components/buyer/BuyerLayout'
import QuoteForm from '../../components/buyer/QuoteForm'
import SEO from '../../components/seo/SEO'
import JsonLd, { schema } from '../../components/seo/JsonLd'

const LENGTHS = [6.5, 7, 7.5, 8, 8.5]

const FAQS = [
  {
    q: 'How do I calculate how many crowd control barricades I need?',
    a: 'Divide the total length of line in feet by the panel length and round up. Each separate run needs its own end panel, so add one panel per run beyond the first, then add spares for gates.',
  },
  {
    q: 'How many barricades fit on a pallet or truck?',
    a: 'With feet removed, steel barricades usually stack 25 to 50 per cart or pallet depending on length and maker. A full truckload is often several hundred panels.',
  },
]

export default function BarricadeCalculator() {
  const [feet, setFeet] = useState(300)
  const [length, setLength] = useState(8)
  const [runs, setRuns] = useState(1)
  const [spares, setSpares] = useState(2)

  const base = Math.ceil(Math.max(0, feet) / length)
  const total = base + Math.max(0, runs - 1) + Math.max(0, spares)

  return (
    <BuyerLayout>
      <SEO
        title="Crowd Control Barricade Calculator | How Many Barricades Do I Need?"
        description="Enter your perimeter length and panel size to see how many steel crowd control barricades you need, including spares for gates and separate runs."
        canonicalPath="/tools/barricade-calculator"
      />
      <JsonLd data={schema.faqPage(FAQS)} />

      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">Calculator</p>
            <h1 className="mt-3 font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">
              How many barricades do I need?
            </h1>
            <p className="mt-5 text-lg text-muted">
              Enter the total length of line you need to cover. We'll count panels, add the extra end
              panel for each separate run, and include spares for gates.
            </p>

            <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
              <label className="block text-sm text-ink">
                Total line length (ft)
                <input
                  type="number"
                  min={0}
                  value={feet}
                  onChange={(e) => setFeet(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-2"
                />
              </label>
              <label className="block text-sm text-ink">
                Panel length
                <select
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-2"
                >
                  {LENGTHS.map((l) => (
                    <option key={l} value={l}>
                      {l} ft
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm text-ink">
                Separate runs
                <input
                  type="number"
                  min={1}
                  value={runs}
                  onChange={(e) => setRuns(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-2"
                />
              </label>
              <label className="block text-sm text-ink">
                Spares and gates
                <input
                  type="number"
                  min={0}
                  value={spares}
                  onChange={(e) => setSpares(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-2"
                />
              </label>
            </form>

            <div className="mt-8 rounded-lg border border-line bg-paper p-6" aria-live="polite">
              <p className="tcs-mono text-xs uppercase tracking-[0.1em] text-muted">You need</p>
              <p className="mt-1 font-tcsDisplay text-5xl font-bold text-ink">{total}</p>
              <p className="mt-1 text-muted">
                {length} ft barricades ({base} to cover {feet} ft
                {runs > 1 ? `, +${runs - 1} for extra runs` : ''}
                {spares > 0 ? `, +${spares} spare` : ''})
              </p>
            </div>

            <p className="mt-6 text-sm text-muted">
              Not sure which length? Read{' '}
              <a href="/compare/steel-vs-plastic-crowd-control-barricades" className="text-ink underline">
                steel vs plastic barricades
              </a>{' '}
              or <a href="/crowd-control-barricades" className="text-ink underline">browse sizes</a>.
            </p>
          </div>
          <QuoteForm productCategory="Barricade calculator" anchorId="quote" heading="Quote this many barricades" />
        </div>
      </section>
    </BuyerLayout>
  )
}
