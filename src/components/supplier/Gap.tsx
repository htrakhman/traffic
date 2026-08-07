const SPECS = [
  { label: 'What', value: 'Purchase requests only, buyers ready to own the equipment' },
  { label: 'Where', value: 'Nationwide, routed by territory' },
  { label: 'Price', value: 'Set on a call, never published on the site' },
  { label: 'Source', value: 'Buyers who came to us, not a cold list' },
]

export default function Gap() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">The gap</h2>
          <div className="mt-6 max-w-xl space-y-4 text-[17px] leading-relaxed text-ink/90">
            <p>
              Most equipment suppliers are good at the part that matters: keeping stock, quoting
              fast, getting a pallet of 28 inch cones on a truck same week. That's the hard part
              and you've already solved it.
            </p>
            <p>
              Generating demand is a different job, and most fulfillment teams don't have anyone
              doing it full time. It takes a different set of hours than running a warehouse and a
              delivery schedule.
            </p>
            <p>We put in those hours and hand you the person who filled out the form at the bottom.</p>
          </div>
        </div>

        <dl className="self-start space-y-5 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
          {SPECS.map((spec) => (
            <div key={spec.label}>
              <dt className="tcs-mono text-xs uppercase tracking-[0.1em] text-zone">{spec.label}</dt>
              <dd className="mt-1 text-base text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
