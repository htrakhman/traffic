const WAYS = [
  {
    id: 'wholesale',
    tag: 'Wholesale',
    title: 'Stock your yard, your store or your fleet.',
    body: 'For rental companies, distributors, safety retailers and contractors who buy in volume. Tiered pricing by quantity, mixed-pallet orders, and one point of contact who knows your account.',
    points: ['Pallet and truckload quantities', 'Mixed orders across product lines', 'Recurring and seasonal orders', 'Freight quoted up front'],
    cta: 'Open a wholesale account',
  },
  {
    id: 'retail',
    tag: 'Retail',
    title: 'Get exactly what one job needs.',
    body: 'For crews, property managers, schools, churches, event organizers and anyone else who needs gear without buying a pallet of it. Order a single sign stand or a few dozen cones.',
    points: ['No minimum order', 'Help sizing a lane closure or detour', 'Quick answers by phone or email', 'Delivery or pickup'],
    cta: 'Request retail pricing',
  },
]

export default function TwoWays() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">Two ways to buy</p>
        <h2 className="mt-3 max-w-2xl font-tcsDisplay text-3xl font-bold leading-tight text-ink sm:text-4xl">
          Same equipment. Priced for how you buy it.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {WAYS.map((w) => (
            <article
              key={w.id}
              id={w.id}
              className="flex scroll-mt-24 flex-col rounded-xl border border-line bg-surface p-7 sm:p-9"
            >
              <span className="tcs-mono inline-block w-fit rounded bg-zone-soft px-2.5 py-1 text-xs font-medium uppercase tracking-[0.1em] text-zone">
                {w.tag}
              </span>
              <h3 className="mt-5 font-tcsDisplay text-2xl font-bold text-ink">{w.title}</h3>
              <p className="mt-3 text-muted">{w.body}</p>
              <ul className="mt-6 space-y-2.5">
                {w.points.map((p) => (
                  <li key={p} className="flex gap-3 text-ink">
                    <span className="mt-2 h-1.5 w-3 shrink-0 rounded-sm bg-zone" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="#quote"
                className="mt-8 w-fit rounded-md border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
              >
                {w.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
