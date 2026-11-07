export const TOP_SELLERS = [
  {
    id: 'metal-crowd-control-barricades',
    eyebrow: 'Our #1 seller',
    name: 'Metal crowd control barricades',
    aka: 'Also called bike rack barricades, steel barricades or pedestrian barricades',
    description:
      'Galvanized steel barricades that hook together into a continuous line. Built for concerts, festivals, parades, races, stadium and arena lines, municipal events, construction perimeters and storefront queues.',
    uses: ['Events and festivals', 'Parades and races', 'Crowd and queue lines', 'Site and building perimeters'],
  },
  {
    id: 'water-filled-barriers',
    eyebrow: 'Our #2 seller',
    name: 'Water filled barriers',
    aka: 'Also called water wall barriers, water filled jersey barriers or plastic barriers',
    description:
      'Plastic barriers that ship empty and light, then fill with water on site for weight. Drain them to move or store them. Used to channel traffic in work zones, close lanes, block vehicle access and mark event perimeters.',
    uses: ['Work zones and lane closures', 'Vehicle access control', 'Event perimeters', 'Parking lots and loading areas'],
  },
] as const

export default function TopSellers() {
  return (
    <section aria-labelledby="top-sellers-heading" className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">What we sell most</p>
        <h2 id="top-sellers-heading" className="mt-3 font-tcsDisplay text-3xl font-bold leading-tight text-ink sm:text-4xl">
          Crowd control barricades and water filled barriers, wholesale or by the piece
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {TOP_SELLERS.map((p) => (
            <article key={p.id} id={p.id} className="scroll-mt-20 rounded-lg border border-line bg-surface p-6 sm:p-8">
              <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-muted">{p.eyebrow}</p>
              <h3 className="mt-2 font-tcsDisplay text-2xl font-bold text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.aka}</p>
              <p className="mt-4 text-ink">{p.description}</p>
              <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-muted">
                {p.uses.map((u) => (
                  <li key={u} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zone" aria-hidden="true" />
                    {u}
                  </li>
                ))}
              </ul>
              <a href="#quote" className="mt-6 inline-block font-semibold text-zone hover:underline">
                Get a price on {p.name.toLowerCase()} →
              </a>
            </article>
          ))}
        </div>
        <p className="mt-8 text-muted">
          Also available: traffic cones, channelizer drums, Type II and Type III barricades, work zone
          signs and sign stands, and arrow boards.
        </p>
      </div>
    </section>
  )
}
