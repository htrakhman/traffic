import { SITE_CONTACT_EMAIL } from '../../config/site'

/** Visible on the page and mirrored into FAQPage JSON-LD (keep them identical). */
export const HOME_FAQ = [
  {
    q: 'Where can I buy crowd control barricades?',
    a: `Traffic Control Supply sells galvanized steel crowd control barricades (bike rack barricades) in 6.5, 7, 7.5, 8 and 8.5 ft lengths, wholesale and retail, delivered anywhere in the continental US. Send your quantity and delivery ZIP through the quote form or email ${SITE_CONTACT_EMAIL}.`,
  },
  {
    q: 'Where can I buy water-filled barriers?',
    a: 'Traffic Control Supply sells plastic water-filled barriers from low-profile 8 ft airport modules to 42 inch interlocking jersey-style units, with fence toppers available. Every order is quoted delivered to your site.',
  },
  {
    q: 'What are crowd control barricades used for?',
    a: 'Steel crowd control barricades hook together into a continuous line that guides or holds back pedestrians. They are used at concerts, festivals, parades, races, stadiums, police and government events, construction perimeters and store queues. They are not crash rated for vehicles.',
  },
  {
    q: 'How many crowd control barricades do I need?',
    a: 'Divide the length of line in feet by the panel length and round up, then add one panel per extra run and a couple of spares for gates. 300 ft of line takes 38 panels at 8 ft. Our free barricade calculator does the math.',
  },
  {
    q: 'How do water-filled barriers work?',
    a: 'They are hollow plastic sections that ship empty, connect end to end, and are filled with water on site for weight, roughly 8.3 lb per gallon. Drain them to move or store them. That makes them far easier to place than concrete, which needs a crane.',
  },
  {
    q: 'Water-filled barriers or concrete jersey barriers?',
    a: 'Water-filled plastic barriers channel traffic and people and set by hand. Concrete jersey barriers stop vehicles and are used where a traffic control plan calls for positive protection. Most city, event and private-site jobs use water-filled barriers.',
  },
  {
    q: 'What size traffic cones do I need for road work?',
    a: 'MUTCD requires cones at least 28 inches tall on higher-speed roads and at night, with 6 inch and 4 inch reflective collars for night use. 18 inch cones are only for low-speed daytime work. Many highway jobs specify 36 inch cones.',
  },
  {
    q: 'Do you sell wholesale and bulk orders?',
    a: 'Yes. We quote everything from a single piece to a full truckload. Rental companies, contractors, event producers, municipalities and resellers can request wholesale pricing; send a resale or tax-exempt certificate with your request.',
  },
  {
    q: 'Do you deliver nationwide?',
    a: 'Yes. We are based in New Jersey and deliver anywhere in the continental US by parcel, pallet freight or full truckload. Every quote includes delivery to your ZIP code and tells you whether you need people or a forklift to unload.',
  },
  {
    q: 'Why are prices not listed on the site?',
    a: 'Price depends on quantity, product and where the order ships, so we quote each order with delivery included. Send your list and we reply with one confirmed delivered price.',
  },
]

export default function HomeFaq() {
  return (
    <section aria-labelledby="faq-heading" className="bg-surface">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">FAQ</p>
        <h2 id="faq-heading" className="mt-3 font-tcsDisplay text-3xl font-bold leading-tight text-ink">
          Common questions about barricades, barriers and cones
        </h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {HOME_FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-ink">
                <h3 className="text-base">{f.q}</h3>
                <span className="mt-0.5 text-zone transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
