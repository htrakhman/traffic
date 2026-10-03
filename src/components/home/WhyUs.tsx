const REASONS = [
  {
    title: 'Built to spec',
    body: 'Equipment that meets MUTCD and state DOT requirements for reflectivity, size and placement, so it passes inspection the first time.',
  },
  {
    title: 'One supplier for the whole zone',
    body: 'Channelizers, signage, barricades, barriers and lighting on one order instead of three vendors and three deliveries.',
  },
  {
    title: 'People who know work zones',
    body: 'Tell us the road, the speed and the closure. We will tell you what the setup needs and what you can skip.',
  },
  {
    title: 'Straight quotes',
    body: 'A real price for your quantity and delivery address, including freight. No list price that changes once you call.',
  },
]

export default function WhyUs() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">Why buy from us</p>
            <h2 className="mt-3 font-tcsDisplay text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Everything that goes between the crew and the traffic.
            </h2>
            <p className="mt-5 text-muted">
              From a single cone to a full temporary traffic control package, we supply what keeps
              a work zone legal, visible and safe.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {REASONS.map((r, i) => (
              <div key={r.title} className="border-t-2 border-ink pt-5">
                <span className="tcs-mono text-xs text-muted">0{i + 1}</span>
                <h3 className="mt-2 font-tcsDisplay text-lg font-bold text-ink">{r.title}</h3>
                <p className="mt-2 text-muted">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
