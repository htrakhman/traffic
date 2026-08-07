const DEFINITIONS = [
  {
    term: 'Who',
    detail: 'A real person with a working phone number or email, not a bot fill or a duplicate.',
  },
  {
    term: 'What',
    detail: 'A specific product request. "28 inch traffic cones" counts. "Traffic stuff" does not.',
  },
  {
    term: 'Where',
    detail: 'A US delivery location. If it falls outside a territory you cover, you never see it.',
  },
  {
    term: 'When',
    detail: 'Submitted within the last few days, not a request sitting in a database from last year.',
  },
]

export default function LeadDefinition() {
  return (
    <section className="bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">
            What counts as a lead
          </h2>
          <div className="mt-6 max-w-md space-y-4 text-[17px] leading-relaxed text-ink/90">
            <p>
              This is the whole product, so we're specific about it instead of vague. A lead has
              to clear all four of these to count.
            </p>
            <p>
              {/* TODO(harold): confirm this matches your actual credit/refund policy before this ships publicly. */}
              If something you're charged for doesn't meet this definition, tell us which one it
              missed. We credit it. We're not going to argue about it on a call.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {DEFINITIONS.map((d) => (
            <div key={d.term} className="bg-surface p-5">
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">{d.term}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink">{d.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
