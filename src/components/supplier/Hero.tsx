/**
 * TODO(harold): replace the 3 placeholder cards below with real anonymized buyer
 * requests — city, product, quantity, timeframe. No names, no company names.
 * This is the strongest section on the page; it should not stay a placeholder long.
 */
const PLACEHOLDER_LEADS = [
  { city: 'TODO', product: 'TODO', quantity: 'TODO', timeframe: 'TODO' },
  { city: 'TODO', product: 'TODO', quantity: 'TODO', timeframe: 'TODO' },
  { city: 'TODO', product: 'TODO', quantity: 'TODO', timeframe: 'TODO' },
]

export default function Hero() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-24">
        <div>
          <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">
            For traffic control equipment suppliers
          </p>
          <h1 className="mt-4 font-tcsDisplay text-4xl font-bold leading-[1.08] text-ink sm:text-5xl">
            People already want to buy cones and barricades. We hand you the ones ready to buy.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            We generate purchase-intent demand for traffic control equipment nationwide. When a
            buyer fills out a request for cones, Type III barricades, arrow boards or signs, it
            comes to you. You sell what you already stock. We don't touch the equipment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#signup"
              className="rounded-md bg-zone px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c85009]"
            >
              Request lead access
            </a>
            <a
              href="#faq"
              className="rounded-md border border-line px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink"
            >
              Read the FAQ
            </a>
          </div>
        </div>

        <div>
          <p className="tcs-mono mb-3 text-xs uppercase tracking-[0.1em] text-muted">
            Examples of what a lead looks like
          </p>
          <div className="space-y-3">
            {PLACEHOLDER_LEADS.map((lead, i) => (
              <div
                key={i}
                className="rounded-lg border border-dashed border-line bg-paper p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="tcs-mono text-xs uppercase tracking-wide text-muted">
                    Lead #{1000 + i}
                  </span>
                  <span className="rounded bg-zone-soft px-2 py-0.5 text-[11px] font-medium text-zone">
                    Pending example
                  </span>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                  <dt className="text-muted">City</dt>
                  <dd className="text-ink">{lead.city}</dd>
                  <dt className="text-muted">Product</dt>
                  <dd className="text-ink">{lead.product}</dd>
                  <dt className="text-muted">Quantity</dt>
                  <dd className="text-ink">{lead.quantity}</dd>
                  <dt className="text-muted">Timeframe</dt>
                  <dd className="text-ink">{lead.timeframe}</dd>
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">
            These are illustrative samples of the fields a lead includes, not a live feed.
          </p>
        </div>
      </div>
    </section>
  )
}
