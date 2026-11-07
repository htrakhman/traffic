import { SITE_CONTACT_EMAIL } from '../../config/site'

/** Visible on the page and mirrored into FAQPage JSON-LD (keep them identical). */
export const HOME_FAQ = [
  {
    q: 'Where can I buy metal crowd control barricades?',
    a: `Traffic Control Supply sells galvanized steel crowd control barricades (bike rack barricades) wholesale and retail, shipped anywhere in the United States. Send your quantity and delivery location through the quote form or email ${SITE_CONTACT_EMAIL} for a price.`,
  },
  {
    q: 'Where can I buy water filled barriers?',
    a: `Traffic Control Supply sells plastic water filled barriers wholesale and retail, shipped nationwide. Tell us how many you need and where they are going and we will send back a delivered price.`,
  },
  {
    q: 'What are metal crowd control barricades used for?',
    a: 'Metal crowd control barricades hook together to form a continuous line that guides or holds back pedestrians. They are used at concerts, festivals, parades, races, sporting events, government events, construction perimeters and store queues.',
  },
  {
    q: 'How do water filled barriers work?',
    a: 'Water filled barriers are hollow plastic sections that ship empty, connect end to end, and are filled with water on site to add weight. They are drained to move or store them, which makes them easier to handle than concrete barriers. They are used for work zones, lane closures, vehicle access control and event perimeters.',
  },
  {
    q: 'Do you sell wholesale and bulk orders?',
    a: 'Yes. We quote everything from a single piece to a full truckload. Rental companies, contractors, event companies, municipalities and resellers can all request wholesale pricing.',
  },
  {
    q: 'Why are prices not listed on the site?',
    a: 'Pricing depends on quantity and where the order ships, so we quote each order with delivery included to your location. Send your list and we will reply with a price.',
  },
]

export default function HomeFaq() {
  return (
    <section aria-labelledby="faq-heading" className="bg-surface">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">FAQ</p>
        <h2 id="faq-heading" className="mt-3 font-tcsDisplay text-3xl font-bold leading-tight text-ink">
          Crowd control barricade and water barrier questions
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
