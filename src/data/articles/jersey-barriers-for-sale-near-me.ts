import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "jersey barriers for sale near me" (~500/mo, High comp, $11.84 bid).
 * Commercial / decision-tree structure: a near-me buying-intent searcher
 * needs to land on a clear "what should I buy and what does it cost
 * delivered to my zip" answer. We walk concrete vs water-filled vs
 * plastic vs steel, length / weight matrix, NJ delivery economics.
 */
export const articleJerseyBarriersForSaleNearMe: Article = {
  slug: 'jersey-barriers-for-sale-near-me',
  title: 'Jersey Barriers for Sale Near Me: Concrete vs. Water-Filled vs. Plastic vs. Steel',
  excerpt:
    '"Jersey barriers for sale near me" usually means one of four products with very different prices, weights, and use cases. This decision tree picks the right barrier for your job — and explains the delivered-price math for Central NJ.',
  metaDescription:
    'Jersey barriers for sale: 10-ft concrete ($800-$1,400), water-filled ($350-$800), plastic ($300-$700), steel ($1,200-$2,000). Decision tree, delivery cost math, NJ availability.',
  primaryKeyword: 'jersey barriers for sale near me',
  secondaryKeywords: [
    'jersey barriers for sale',
    'jersey barrier near me',
    'concrete jersey barriers for sale',
    'used jersey barriers',
    'highway barriers for sale',
    'temporary jersey barriers',
  ],
  targetVolume: 500,
  datePublished: '2026-05-09',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, '"Jersey barriers for sale near me" is four different products at four different price points.'),
      ' New 10-foot precast concrete: $800–$1,400 each delivered. Water-filled plastic: $350–$800 each. Empty plastic jersey-shape (cosmetic only): $300–$700. Steel barriers: $1,200–$2,000. Match the spec to the threat — putting a $400 plastic shape in front of 55 MPH traffic is the costliest mistake in this category. This guide walks the decision tree and the delivered-price math for Central NJ.',
    ),

    h('h2', null, 'Step 1 — what is the barrier protecting against?'),
    h(
      'p',
      null,
      'Before you compare prices, decide which of these matches your job. The wrong category bought at any price is a wasted purchase.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Stopping a vehicle at speed (≥45 MPH).'), ' You need precast concrete or MASH-tested water-filled — nothing else has the mass + impact rating.'),
      h('li', null, h('strong', null, 'Channelizing low-speed traffic (parking lot, ≤25 MPH).'), ' Empty plastic jersey-shape or water-filled barriers are sufficient if vehicle impact is unlikely.'),
      h('li', null, h('strong', null, 'Marking off a perimeter without an impact concern'), ' (events, construction staging, no-parking zone). Plastic jersey-shape is fine and 4x cheaper than concrete.'),
      h('li', null, h('strong', null, 'Anti-ram / vehicle-blocking at events.'), ' Stick with concrete or specialized event vehicle barriers — water-filled empty plastic is not anti-ram-rated.'),
      h('li', null, h('strong', null, 'Long-term deployment (months to years).'), ' Concrete wins on durability per dollar. Plastic and water-filled UV-degrade after 3–5 outdoor years.'),
    ),

    h('h2', null, 'The four products compared'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h(
            'tr',
            null,
            h('th', { className: 'text-left p-2 border-b' }, 'Type'),
            h('th', { className: 'text-left p-2 border-b' }, 'Weight per 10 ft'),
            h('th', { className: 'text-left p-2 border-b' }, 'Crash rating'),
            h('th', { className: 'text-left p-2 border-b' }, 'Price each'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best for'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Precast concrete'), h('td', { className: 'p-2' }, '4,000–5,000 lb'), h('td', { className: 'p-2' }, 'MASH TL-3 to TL-5'), h('td', { className: 'p-2' }, '$800–$1,400'), h('td', { className: 'p-2' }, 'Highway, long-term, anti-ram')),
          h('tr', null, h('td', { className: 'p-2' }, 'Water-filled plastic'), h('td', { className: 'p-2' }, '1,400–1,800 lb filled'), h('td', { className: 'p-2' }, 'MASH TL-2 / TL-3 (specific models)'), h('td', { className: 'p-2' }, '$350–$800'), h('td', { className: 'p-2' }, 'Mid-speed work zones, fast deploy')),
          h('tr', null, h('td', { className: 'p-2' }, 'Empty plastic jersey-shape'), h('td', { className: 'p-2' }, '60–110 lb'), h('td', { className: 'p-2' }, 'Cosmetic only'), h('td', { className: 'p-2' }, '$300–$700'), h('td', { className: 'p-2' }, 'Parking lots, perimeters, events')),
          h('tr', null, h('td', { className: 'p-2' }, 'Steel barriers'), h('td', { className: 'p-2' }, '600–900 lb'), h('td', { className: 'p-2' }, 'TL-2 / TL-3'), h('td', { className: 'p-2' }, '$1,200–$2,000'), h('td', { className: 'p-2' }, 'Reusable mid-speed, low-storage-footprint')),
        ),
      ),
    ),

    h('h2', null, 'New vs. used precast concrete'),
    h(
      'p',
      null,
      'Used concrete jersey barriers are common in the secondary market, often pulled off finished DOT projects. Pricing typically runs $400–$700 per 10-foot section delivered for used vs. $800–$1,400 for new. The tradeoffs:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Used is fine for cosmetic / channelizing / perimeter work'), ' on private property where impact rating doesn\'t matter.'),
      h('li', null, h('strong', null, 'Used is risky for crashworthy applications.'), ' MASH crash certification applies to the original tested configuration. A used barrier with chips, exposed rebar, or unknown lineage may not perform as tested.'),
      h('li', null, h('strong', null, 'Inspect before buying: '), 'corner spalling, exposed rebar (more than minor), broken pin pockets, hairline cracks longer than 12 inches, and the connection-pin geometry (some older units use J-pins, newer ones use straight pins — incompatible with each other).'),
    ),

    h('h2', null, 'The delivery economics — why "near me" matters so much'),
    h(
      'p',
      null,
      'Concrete jersey barriers are heavy enough that delivery often costs more than the barrier itself. A flatbed truck with crane (the standard delivery rig) carries roughly 10–14 standard 10-foot concrete barriers per trip. Per-section delivery cost from a Central NJ supplier to a Central NJ jobsite typically runs $80–$150. Per-section delivery from an out-of-state supplier can run $200–$400. The math:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Local NJ delivery (under 30 miles): '), '$80–$150 per barrier section.'),
      h('li', null, h('strong', null, 'NJ-to-NY / PA / DE: '), '$150–$280 per section.'),
      h('li', null, h('strong', null, 'Long-haul (>200 mi): '), '$300–$500 per section.'),
      h('li', null, h('strong', null, 'Crane / placement at site: '), '$300–$600 flat fee for the crane day, regardless of barrier count (use the crane efficiently — order full truckloads).'),
    ),
    h(
      'p',
      null,
      'For a 20-section installation: a local NJ supplier costs ~$1,200/section delivered ($800 barrier + $200 average delivery + $200 amortized crane). A long-haul supplier with a $600 cheaper barrier on paper costs $1,800/section delivered after freight. "Near me" is real money on this product.',
    ),

    h('h2', null, 'Water-filled — when it\'s the right choice'),
    h(
      'p',
      null,
      'Water-filled plastic barriers (Yodock, Triton, Armorzone, etc.) are the right product when:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'You need fast deployment and removal. Empty (60–110 lb) they ride on a pickup; concrete needs a flatbed and crane.'),
      h('li', null, 'The job is mid-speed (≤55 MPH) and the specific water-filled model is MASH-tested at the right Test Level.'),
      h('li', null, 'You don\'t want post-job freight. Drain to ~10% capacity, lift onto a pickup, gone.'),
      h('li', null, 'The weather window includes freezing — water expands ~9% at freeze, and partial-fill or anti-freeze additive is required for winter NJ deployment.'),
    ),
    h(
      'p',
      null,
      'See our ',
      h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'water-filled barriers buying guide'),
      ' for the full spec walk-through and the ',
      h('a', { href: '/blog/plastic-jersey-barriers-vs-concrete' }, 'plastic vs. concrete jersey barrier comparison'),
      ' for the long-form decision matrix.',
    ),

    h('h2', null, 'Empty plastic jersey-shape — when it\'s the right choice'),
    h(
      'p',
      null,
      'Empty plastic jersey-shape barriers (HDPE or LLDPE injection-molded) are visually identical to a concrete jersey from 30 feet away but weigh 60–110 lb empty and stop literally nothing. They\'re the right product for:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Parking-lot perimeter (visual deterrent, not impact rated).'),
      h('li', null, 'Construction staging fence (mark off the lay-down yard).'),
      h('li', null, 'Event boundary marking where vehicles aren\'t a threat.'),
      h('li', null, 'Movie/film production set dressing.'),
      h('li', null, 'Indoor warehouse aisle separation.'),
    ),
    h(
      'p',
      null,
      'Buyers sometimes call these "fake jersey barriers" — and that\'s accurate. The product is honest about being cosmetic. Don\'t put one in front of a vehicle threat.',
    ),

    h('h2', null, 'Buying jersey barriers in Central NJ'),
    h(
      'p',
      null,
      'Traffic Control Supply delivers concrete jersey barriers (new and used), water-filled plastic, empty plastic jersey-shape, and steel barriers across Central NJ — Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean — typically same-day or next-day. Browse our ',
      h('a', { href: '/category/barricades-barriers' }, 'barricades & barriers catalog'),
      ', or use our ',
      h('a', { href: '/assistant' }, 'AI assistant'),
      ' to match the right barrier type to your design speed, duration, and job-site geometry. For larger orders (20+ sections, multi-day delivery), ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with the job address, section count, and required date.',
    ),
  ),
  faqs: [
    {
      q: 'How much does a jersey barrier cost?',
      a: 'It depends on the type. New 10-foot precast concrete: $800–$1,400 each. Used concrete: $400–$700. Water-filled plastic: $350–$800. Empty plastic jersey-shape: $300–$700. Steel: $1,200–$2,000. Delivery in Central NJ adds roughly $80–$150 per section.',
    },
    {
      q: 'How heavy is a 10-foot concrete jersey barrier?',
      a: '4,000 to 5,000 lb depending on cross-section and aggregate mix. The standard "32-inch tall, F-shape" precast unit is approximately 4,200 lb at 10 feet length. This is why concrete delivery requires a flatbed truck and a crane (or sometimes a hi-rail forklift).',
    },
    {
      q: 'Are used jersey barriers safe?',
      a: 'Used precast concrete is fine for cosmetic, perimeter, or low-speed channelizing work. For crashworthy / MASH-rated applications, used barriers are risky — the original crash certification applies to the as-tested unit. Inspect for corner spalling, exposed rebar, hairline cracks longer than 12 inches, and verify the pin geometry matches your existing fleet.',
    },
    {
      q: 'What is the difference between water-filled and concrete jersey barriers?',
      a: 'Concrete is permanent, MASH TL-3 to TL-5 rated, weighs 4,200 lb per 10 ft, and requires crane delivery. Water-filled plastic is portable (60–110 lb empty), MASH TL-2 / TL-3 rated only on specific tested models, weighs 1,400–1,800 lb when filled, and rides on a pickup. Concrete wins on durability and crash rating; water-filled wins on speed of deployment and removal.',
    },
    {
      q: 'Can I buy jersey barriers in Central NJ for same-day delivery?',
      a: 'Yes for water-filled plastic and empty plastic jersey-shape — both ride on a pickup and don\'t require crane scheduling. Concrete typically runs next-day because it requires a flatbed and crane to be available. Traffic Control Supply delivers across Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean.',
    },
    {
      q: 'Do plastic jersey barriers count as crash protection?',
      a: 'Empty plastic jersey-shape barriers are NOT crash protection — they are cosmetic / perimeter products. Water-filled plastic barriers ARE crash protection if they are MASH-tested at the relevant Test Level (typically TL-2 or TL-3) and filled to the tested water level. Always check the manufacturer\'s FHWA eligibility letter before relying on a water-filled unit for impact protection.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Pedestrian & Crowd Control', path: '/category/pedestrian-control' },
    { label: 'Fencing & Site Safety', path: '/category/fencing-site-safety' },
  ],
  relatedArticles: [
    'concrete-barriers-for-sale-guide',
    'plastic-jersey-barriers-vs-concrete',
    'water-filled-barriers-buying-guide',
  ],
}
