import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "construction cones for sale" (~5K/mo, High comp, $6.48 bid).
 * Pillar guide structure: covers every angle a buyer might want — sizes,
 * accessories, quantities, logistics, lifecycle — and links out to the
 * narrower commercial pieces.
 */
export const articleConstructionConesForSalePillarGuide: Article = {
  slug: 'construction-cones-for-sale-pillar-guide',
  title: 'Construction Cones for Sale: The 2026 Contractor Buying Pillar Guide',
  excerpt:
    'A complete guide to buying construction cones in 2026 — sizes, reflective grades, base weights, accessories, bulk pricing, storage, and the upsells contractors should and should not pay for.',
  metaDescription:
    'Buying construction cones in 2026? Pillar guide covers sizes, reflective grades, base weights, bulk pricing tiers, accessories, storage, and what to skip.',
  primaryKeyword: 'construction cones for sale',
  secondaryKeywords: [
    'construction cones',
    'buy construction cones',
    'orange construction cones for sale',
    'bulk construction cones',
    'construction cone accessories',
    'construction cone pricing',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-19',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Construction cones are the most-bought, most-replaced, and most-overlooked piece of traffic-control gear. ',
      h('strong', null, 'A small NJ subcontractor buys 100–200 cones in their first year and replaces 15–20% annually.'),
      ' Get the spec wrong and you fail your first state inspection; over-spec and you spend twice what you needed. Below is the complete buying playbook — every spec choice, every accessory, every quantity tier — written for contractors who do not have a procurement team.',
    ),

    h('h2', null, '1. Pick a size before anything else'),
    h(
      'p',
      null,
      'Cone height is set by the MUTCD based on road speed and time of day. Wrong height = inspection failure, full stop.',
    ),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null,
            h('th', { className: 'text-left p-2 border-b' }, 'Height'),
            h('th', { className: 'text-left p-2 border-b' }, 'Day use'),
            h('th', { className: 'text-left p-2 border-b' }, 'Night use'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best for'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '12 in'), h('td', { className: 'p-2' }, 'Indoor only'), h('td', { className: 'p-2' }, 'No'), h('td', { className: 'p-2' }, 'Warehouse hazard marking')),
          h('tr', null, h('td', { className: 'p-2' }, '18 in'), h('td', { className: 'p-2' }, '≤25 mph'), h('td', { className: 'p-2' }, 'No'), h('td', { className: 'p-2' }, 'Parking lots, valet, low-speed')),
          h('tr', null, h('td', { className: 'p-2' }, '28 in'), h('td', { className: 'p-2' }, '≤55 mph'), h('td', { className: 'p-2' }, '≤35 mph'), h('td', { className: 'p-2' }, 'General roadway work')),
          h('tr', null, h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, 'Any speed'), h('td', { className: 'p-2' }, 'Any speed'), h('td', { className: 'p-2' }, 'High-speed and night work')),
        ),
      ),
    ),

    h('h2', null, '2. Reflective collar grade'),
    h(
      'p',
      null,
      'Federal MUTCD specifies ASTM Type IV high-intensity prismatic sheeting as the minimum for collars on roadway cones. Avoid anything sold as "Engineer Grade" (Type I) or "Super Engineer Grade" (Type II) — those grades are intended for stationary signage, not channelizing devices.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Single 4-in collar:'), ' OK for roads ≤35 mph during day. Cheapest legal option.'),
      h('li', null, h('strong', null, 'Single 6-in collar:'), ' OK for roads ≤35 mph day or night. Pay the small upcharge.'),
      h('li', null, h('strong', null, 'Double collar (4 + 6 in):'), ' Required for roads >35 mph. The contractor default.'),
      h('li', null, h('strong', null, 'Diamond-grade fluorescent:'), ' Roughly 2x the brightness of Type IV at the same distance. Worth the $3–4/cone upcharge if your crew does a lot of overnight or low-visibility work.'),
    ),

    h('h2', null, '3. Base weight and shape'),
    h(
      'p',
      null,
      'Base weight is the spec that decides whether your cones stay upright when a tractor-trailer passes at 65 mph. Light bases save you on shipping but cost you cones every week.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '4 lb base:'), ' Indoor and event use only. Will blow over on a roadway.'),
      h('li', null, h('strong', null, '7 lb base:'), ' Practical minimum for any roadway. Works for ≤35 mph.'),
      h('li', null, h('strong', null, '10 lb base:'), ' Highway-rated. The most common contractor spec.'),
      h('li', null, h('strong', null, '12+ lb base:'), ' Bridge decks, exposed-corridor highway, very-high-speed work.'),
    ),
    h(
      'p',
      null,
      'Stackable bases save storage space — a stack of 50 stackable 28-inch cones takes about 3.5 feet of vertical truck space. Look for "stackable" or "nestable" in the spec sheet.',
    ),

    h('h2', null, '4. Material: PVC vs. TPE rubber'),
    h(
      'p',
      null,
      'Most cones sold in the US are PVC. The premium upgrade is TPE rubber (thermoplastic elastomer). Differences:',
    ),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null,
            h('th', { className: 'text-left p-2 border-b' }, 'Property'),
            h('th', { className: 'text-left p-2 border-b' }, 'Virgin PVC'),
            h('th', { className: 'text-left p-2 border-b' }, 'TPE rubber'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Cost per 28-in cone'), h('td', { className: 'p-2' }, '$14–18'), h('td', { className: 'p-2' }, '$22–28')),
          h('tr', null, h('td', { className: 'p-2' }, 'Cold tolerance'), h('td', { className: 'p-2' }, 'Cracks below 10°F'), h('td', { className: 'p-2' }, 'Flexes to -20°F')),
          h('tr', null, h('td', { className: 'p-2' }, 'Run-over behavior'), h('td', { className: 'p-2' }, 'Cracks or breaks'), h('td', { className: 'p-2' }, 'Pops back up')),
          h('tr', null, h('td', { className: 'p-2' }, 'Expected lifespan'), h('td', { className: 'p-2' }, '3–4 years'), h('td', { className: 'p-2' }, '5–7 years')),
          h('tr', null, h('td', { className: 'p-2' }, 'Color durability'), h('td', { className: 'p-2' }, 'Fades 2–4 yrs'), h('td', { className: 'p-2' }, 'Fades 4–6 yrs')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'For any crew working near live traffic, TPE pays for itself within 18 months on cones-not-replaced.',
    ),

    h('h2', null, '5. Accessories worth buying with the cones'),
    h(
      'p',
      null,
      'Order these in the same PO — shipping a single cone bar later costs more than the bar itself.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Cone bars (retro-reflective).'), ' 4-ft or 6-ft bars that snap between two cones. Useful for pedestrian channelization or marking a blocked sidewalk. $9–14 each.'),
      h('li', null, h('strong', null, 'Cone-mount lights.'), ' Battery LED flashers for nighttime. Pick steady-burn for tapers, flashing for hazard markers. $14–28 each. See our ',
        h('a', { href: '/blog/traffic-cone-lights-guide' }, 'cone lights guide'),
        ' for models that survive the abuse.',
      ),
      h('li', null, h('strong', null, 'Cone-mounted signs.'), ' "ROAD WORK AHEAD," "FLAGGER," "SIDEWALK CLOSED" plates that slot onto the cone tip. Lighter than full sign stands but only visible at short range. $18–30 each.'),
      h('li', null, h('strong', null, 'Storage rack.'), ' Wall or truck-bed mount that holds 20–50 cones vertical and dry. $80–200 depending on capacity.'),
      h('li', null, h('strong', null, 'Replacement bases.'), ' Don\'t throw out a cracked-base cone. Buy 10% spare bases per order. ~$5–8 each.'),
    ),

    h('h2', null, '6. Bulk pricing tiers (Central NJ, 2026)'),
    h(
      'p',
      null,
      'Per-cone price drops at 25, 100, and 250 unit thresholds. Order to the threshold if you are within 5 cones — the discount is bigger than the cost of the extra units.',
    ),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null,
            h('th', { className: 'text-left p-2 border-b' }, 'Quantity'),
            h('th', { className: 'text-left p-2 border-b' }, '28-in double-collar'),
            h('th', { className: 'text-left p-2 border-b' }, '36-in double-collar'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '1–24'), h('td', { className: 'p-2' }, '$23–26'), h('td', { className: 'p-2' }, '$36–42')),
          h('tr', null, h('td', { className: 'p-2' }, '25–99'), h('td', { className: 'p-2' }, '$20–23'), h('td', { className: 'p-2' }, '$32–36')),
          h('tr', null, h('td', { className: 'p-2' }, '100–249'), h('td', { className: 'p-2' }, '$18–20'), h('td', { className: 'p-2' }, '$28–32')),
          h('tr', null, h('td', { className: 'p-2' }, '250+'), h('td', { className: 'p-2' }, '$16–18'), h('td', { className: 'p-2' }, '$24–28')),
        ),
      ),
    ),

    h('h2', null, '7. Delivery and lead time'),
    h(
      'p',
      null,
      'Three lanes for getting cones on a job site:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'National distributor:'), ' lowest sticker, 5–10 business day lead time, freight surcharges. Use only when you have a long planning runway.'),
      h('li', null, h('strong', null, 'Regional supplier (mid-Atlantic):'), ' 1–3 day delivery, mid pricing, smaller minimum orders. The sweet spot for repeat buyers.'),
      h('li', null, h('strong', null, 'Local same-day:'), ' premium price, no lead time. Best for emergencies and small top-up orders.'),
    ),
    h(
      'p',
      null,
      'We deliver Central NJ same-day on all standard 28-in and 36-in cones. ',
      h('a', { href: '/quote' }, 'Submit a quote'),
      ' before noon, get it on site the same afternoon.',
    ),

    h('h2', null, '8. Storage and inventory management'),
    h(
      'p',
      null,
      'A cone left outdoors for two summers loses about 25% of its fluorescent intensity. Stack cones upright, indoors or under cover, base-down, in a cone rack. Don\'t stack horizontal — the cone walls flatten and the collars warp.',
    ),
    h(
      'p',
      null,
      'Inventory the cones at the start and end of every season. Retire any cone with: visibly faded orange, peeled or cracked reflective sheeting, cracked body, or a base that no longer sits flat. A retired cone can still serve in your yard for parking spots, just not on a roadway.',
    ),

    h('h2', null, '9. Bigger work zones need more than cones'),
    h(
      'p',
      null,
      'Cones channelize. They do not protect. If you need physical separation between traffic and a work crew on foot, scale up to:',
    ),
    h(
      'ul',
      null,
      h('li', null,
        h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'Water-filled barriers'),
        ' for medium-duration closures.',
      ),
      h('li', null,
        h('a', { href: '/blog/jersey-barriers-for-sale-near-me' }, 'Jersey barriers (concrete)'),
        ' for long-duration closures and crash protection.',
      ),
      h('li', null,
        h('a', { href: '/blog/traffic-barrels-buying-guide' }, 'Traffic drums (barrels)'),
        ' for higher visibility on taper sections.',
      ),
    ),

    h('h2', null, '10. What to skip'),
    h(
      'p',
      null,
      'Marketing the cone industry would like you to pay for and what is actually worth it:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Skip: '), '"smart" cones with Bluetooth telemetry. The use case for a small contractor does not exist yet.'),
      h('li', null, h('strong', null, 'Skip: '), 'color-matched custom plastic (non-orange). Custom imprint on the collar is fine; non-orange body is not MUTCD-compliant.'),
      h('li', null, h('strong', null, 'Skip: '), '"theft-resistant" cones. A sharpie and your DOT number does the same job.'),
      h('li', null, h('strong', null, 'Worth it: '), 'TPE rubber upgrade, double-collar spec, 10-lb bases, cone-mount lights for night work.'),
    ),

    h('h2', null, 'Where to start'),
    h(
      'p',
      null,
      'For most new Central NJ contractors, the right first order is 50 × 28-inch double-collar TPE cones with 10-lb bases, plus 12 × 36-inch for higher-speed jobs, plus 12 cone-mount lights and a truck-bed rack. That puts you legal on every standard NJDOT job and runs around $2,000–2,500 delivered. Browse the full ',
      h('a', { href: '/category/traffic-cones' }, 'cone catalog'),
      ' or talk to our ',
      h('a', { href: '/assistant' }, 'Assistant'),
      ' if you want a recommended SKU mix for your specific job profile.',
    ),
  ),
  faqs: [
    {
      q: 'What is the cheapest construction cone that is still legal for road work?',
      a: 'A 28-inch cone with a single 6-inch ASTM Type IV reflective collar and a 7-lb base, in lots of 50+. Expect $13–15 per cone. Acceptable for daytime work on roads up to 35 mph.',
    },
    {
      q: 'How many construction cones come in a bulk case?',
      a: 'Standard wholesale packaging is 25 cones per stack for 28-inch and 18 cones per stack for 36-inch. Most distributors will sell single stacks or full pallets (8–10 stacks).',
    },
    {
      q: 'Are there construction cones rated for highway speeds above 65 mph?',
      a: 'All MUTCD-compliant 36-inch cones with 12-lb bases can be used at highway speeds. For very-high-speed corridors or bridge decks, contractors often supplement cones with drums and water-filled barriers for physical separation.',
    },
    {
      q: 'Can I get custom-imprinted construction cones?',
      a: 'Yes — most suppliers will hot-stamp or screen-print your company name or logo on the cone collar at orders of 100+ units. Expect roughly $0.50–$1 per cone surcharge and a 1–2 week lead time.',
    },
    {
      q: 'Should I buy used construction cones at auction?',
      a: 'Surplus municipal auctions (GovDeals, Municibid) can save 30–50%, but plan to reject 25% of the lot on inspection — most surplus cones come off the truck because they failed the state\'s reflectivity audit.',
    },
    {
      q: 'What happens if I show up on a state DOT job with the wrong cones?',
      a: 'The inspector will issue a deficiency notice and you will be required to swap the cones before continuing. Repeated deficiencies can affect your pre-qualification standing with the agency.',
    },
  ],
  relatedProducts: [
    { label: 'Traffic Cones (Full Catalog)', path: '/category/traffic-cones' },
    { label: 'Cone Lights & Beacons', path: '/category/cone-lights' },
    { label: 'Drums & Channelizers', path: '/category/drums-channelizers' },
    { label: 'Request a Bulk Cone Quote', path: '/quote' },
  ],
  relatedArticles: [
    'road-cones-for-sale-buying-guide',
    'orange-construction-cones-guide',
    'traffic-cones-for-sale-buying-guide',
  ],
}
