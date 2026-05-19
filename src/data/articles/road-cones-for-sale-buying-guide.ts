import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "road cones for sale" (~5K/mo, High comp, $6.48 bid).
 * Commercial-comparison piece: pits hardware-store cones against MUTCD-grade
 * contractor stock, with a per-quantity price-and-spec picker.
 */
export const articleRoadConesForSaleBuyingGuide: Article = {
  slug: 'road-cones-for-sale-buying-guide',
  title: 'Road Cones for Sale: What to Buy in 2026 (and What to Skip)',
  excerpt:
    'Not every "road cone for sale" is a real road cone. Below is the contractor buying playbook — sizes, reflectivity grades, weighted bases, and the per-quantity price ranges to expect before any sales rep tries to upsell you.',
  metaDescription:
    'Buying road cones in 2026? Here is the contractor-grade vs hardware-store comparison, MUTCD size rules, weighted-base pricing, and per-quantity ranges to expect.',
  primaryKeyword: 'road cones for sale',
  secondaryKeywords: [
    'buy road cones',
    'road cones',
    'orange road cones',
    'road safety cones',
    'road cones bulk',
    'road cone price',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-19',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Searching "road cones for sale" returns everything from $3 hardware-store toys to $42 MUTCD-grade 36-inch reflectives — and most of the cheap listings will fail a state inspection the first day on a real work zone. ',
      h('strong', null, 'The short answer:'),
      ' for any roadway above 35 mph you need 28-inch cones minimum (36-inch for night), double reflective collars, and a base weighing at least 7 lb. Below is the contractor buying playbook, with what each size actually costs and where to skip.',
    ),

    h('h2', null, 'The four things that change the price of a road cone'),
    h(
      'p',
      null,
      'A "road cone" sounds like a commodity. It is not. Four spec choices drive a 10x price spread across listings:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Height.'), ' 18-inch (parking-lot grade), 28-inch (most highway work), 36-inch (night work and ≥55 mph).'),
      h('li', null, h('strong', null, 'Reflective collar.'), ' Plain orange (illegal on roads), single 4-inch ASTM Type IV collar, or double collar (4-inch + 6-inch).'),
      h('li', null, h('strong', null, 'Base weight.'), ' 4 lb (event-only), 7 lb (typical 28-inch), 10–12 lb (windy / high-speed work).'),
      h('li', null, h('strong', null, 'Material grade.'), ' Recycled PVC (cheap, brittle in cold), virgin PVC (standard), TPE rubber (premium, survives being run over).'),
    ),
    h(
      'p',
      null,
      'A 28-inch cone with a single collar and a 7-lb base sells for about $14–18 per unit at contractor quantities. The same cone in a double-collar, 10-lb base configuration runs $22–28. If you see a listing under $10 for a "28-inch road cone," the base is probably 4 lb and the reflectivity is not Type IV. Skip it for road work.',
    ),

    h('h2', null, 'Hardware-store vs. contractor-grade: side by side'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Spec'),
            h('th', { className: 'text-left p-2 border-b' }, 'Hardware-store cone'),
            h('th', { className: 'text-left p-2 border-b' }, 'Contractor-grade road cone'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Height'), h('td', { className: 'p-2' }, '18 in (sometimes 12 in)'), h('td', { className: 'p-2' }, '28 in or 36 in')),
          h('tr', null, h('td', { className: 'p-2' }, 'Color'), h('td', { className: 'p-2' }, 'Faded orange'), h('td', { className: 'p-2' }, 'Fluorescent orange (MUTCD spec)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Reflective collar'), h('td', { className: 'p-2' }, 'None or stick-on'), h('td', { className: 'p-2' }, 'ASTM Type IV, heat-bonded')),
          h('tr', null, h('td', { className: 'p-2' }, 'Base weight'), h('td', { className: 'p-2' }, '3–4 lb'), h('td', { className: 'p-2' }, '7–12 lb')),
          h('tr', null, h('td', { className: 'p-2' }, 'Cold-weather behavior'), h('td', { className: 'p-2' }, 'Cracks below 20°F'), h('td', { className: 'p-2' }, 'Flexes to -20°F')),
          h('tr', null, h('td', { className: 'p-2' }, 'Survives being hit'), h('td', { className: 'p-2' }, 'Shatters'), h('td', { className: 'p-2' }, 'Pops back up')),
          h('tr', null, h('td', { className: 'p-2' }, 'Typical price'), h('td', { className: 'p-2' }, '$5–9'), h('td', { className: 'p-2' }, '$14–28')),
          h('tr', null, h('td', { className: 'p-2' }, 'Legal on roadway'), h('td', { className: 'p-2' }, 'No'), h('td', { className: 'p-2' }, 'Yes (when spec\'d correctly)')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Hardware-store cones have a real use case: private parking lots, valet lines, indoor warehouse markings. They are not road cones. Putting one on an active travel lane is a citation waiting to happen, and the cone itself will not survive a 50-mph wind blast from a passing truck.',
    ),

    h('h2', null, 'Per-quantity price guide (Central NJ, 2026)'),
    h(
      'p',
      null,
      'Below are realistic per-unit prices for contractor-grade road cones, based on the Central NJ market as of Q2 2026. Price drops noticeably above the 50-cone mark; above 250 cones you should expect bulk pricing approaching wholesale.',
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
            h('th', { className: 'text-left p-2 border-b' }, 'Size / spec'),
            h('th', { className: 'text-left p-2 border-b' }, '1–24 cones'),
            h('th', { className: 'text-left p-2 border-b' }, '25–99 cones'),
            h('th', { className: 'text-left p-2 border-b' }, '100–249 cones'),
            h('th', { className: 'text-left p-2 border-b' }, '250+ cones'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '28-in, single collar, 7-lb base'), h('td', { className: 'p-2' }, '$17–19'), h('td', { className: 'p-2' }, '$15–17'), h('td', { className: 'p-2' }, '$13–15'), h('td', { className: 'p-2' }, '$11–13')),
          h('tr', null, h('td', { className: 'p-2' }, '28-in, double collar, 10-lb base'), h('td', { className: 'p-2' }, '$23–26'), h('td', { className: 'p-2' }, '$20–23'), h('td', { className: 'p-2' }, '$18–20'), h('td', { className: 'p-2' }, '$16–18')),
          h('tr', null, h('td', { className: 'p-2' }, '36-in, double collar, 12-lb base'), h('td', { className: 'p-2' }, '$36–42'), h('td', { className: 'p-2' }, '$32–36'), h('td', { className: 'p-2' }, '$28–32'), h('td', { className: 'p-2' }, '$24–28')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Add 10–20% for premium TPE rubber construction (highly recommended if your crew works near active travel lanes — the cone bounces back instead of cracking when run over). Add roughly $0.50–$1 per cone for custom imprint (company name on the collar) at 100+ unit orders.',
    ),

    h('h2', null, 'How many cones do you actually need?'),
    h(
      'p',
      null,
      'A common mistake on the first order is under-buying. Most NJ contractors we work with end up needing twice their initial estimate by the end of the first season — cones get run over, stolen, or left at job sites. Plan for 15–20% annual replacement.',
    ),
    h(
      'p',
      null,
      'Quick sizing guide for a typical short-duration lane closure on a 2-lane road, 40 mph speed limit: roughly 25–35 cones (taper + tangent + downstream). For a longer-term ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'lane closure on a higher-speed roadway'),
      ' you need closer to 50, and you should be mixing in drums. Our ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' will generate the exact count for your speed/lane geometry.',
    ),

    h('h2', null, 'Where to actually buy them'),
    h(
      'p',
      null,
      'The contractor cone market has three lanes: national distributors (long lead time, lowest sticker price), regional traffic-control suppliers (1–3 day delivery, mid price), and same-day local suppliers (premium price, no waiting). Which one to pick depends on whether you can plan a week ahead or you got the call this morning.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Planned-ahead buyer (1+ week out):'), ' national distributor is fine. Watch for freight charges that eat the sticker savings.'),
      h('li', null, h('strong', null, 'Repeat buyer (every 2–4 weeks):'), ' regional supplier with a standing PO. You will get better pricing than the national house on small orders.'),
      h('li', null, h('strong', null, 'Same-week or same-day:'), ' local. We offer same-day Central NJ delivery on ',
        h('a', { href: '/category/traffic-cones' }, 'all standard MUTCD road cone sizes'),
        '; submit a ',
        h('a', { href: '/quote' }, 'quote request'),
        ' before noon and we can usually deliver that afternoon.',
      ),
    ),

    h('h2', null, 'Common upsells you should and should not pay for'),
    h(
      'p',
      null,
      'Worth paying for: heat-bonded reflective collars (vs adhesive), TPE rubber construction for any crew that does live-traffic work, weighted bases over 7 lb for highway use, and warning lights on the collar if you do overnight work — see our ',
      h('a', { href: '/blog/traffic-cone-lights-guide' }, 'cone-light buying guide'),
      ' for which models actually stay on.',
    ),
    h(
      'p',
      null,
      'Skip: "anti-theft" branded cones (a sharpie and your DOT number does the same job), color-matched custom plastic (huge upcharge for marginal value), and any "smart" cone with Bluetooth. The market for connected cones is real but the value for a small contractor is not there yet.',
    ),

    h('h2', null, 'The cheaper alternative: used road cones'),
    h(
      'p',
      null,
      'Used MUTCD cones from municipal surplus auctions (GovDeals, Municibid) can run 30–50% under new pricing if you are willing to inspect lots in person. The catch: most surplus cones come off the truck because they failed inspection — faded reflective collars, cracked bases, or sun-bleached orange. Inspect every cone before buying, and budget for a 25% rejection rate.',
    ),
    h(
      'p',
      null,
      'For comparison shoppers also considering used barriers, see our ',
      h('a', { href: '/blog/used-jersey-barriers-for-sale-guide' }, 'used Jersey barrier buying guide'),
      ' — the inspection rules are similar.',
    ),

    h('h2', null, 'Bottom line'),
    h(
      'p',
      null,
      'For a Central NJ contractor doing real road work, the right "road cone for sale" is a 28-inch double-collar TPE rubber cone with a 10-lb base, in lots of 50 or more from a regional supplier. That gets you legal on every NJDOT job up to 55 mph, survives being clipped, and stays under $20 per cone at contractor quantities. Anything cheaper is a parking-lot cone with marketing copy.',
    ),
  ),
  faqs: [
    {
      q: 'What is the cheapest road cone that is still legal on an NJDOT job?',
      a: 'A 28-inch cone with a single 6-inch ASTM Type IV reflective collar and a 7-lb base is the cheapest MUTCD-compliant configuration for daytime work on roads under 35 mph. Expect $13–17 per cone in 50+ quantities.',
    },
    {
      q: 'Can I use 18-inch road cones on a real road?',
      a: 'Only on roads with a posted speed limit at or below 25 mph, and only during daylight. For anything above 35 mph or any nighttime work, 18-inch cones do not meet MUTCD minimum height and will fail inspection.',
    },
    {
      q: 'Are orange road cones and orange construction cones the same product?',
      a: 'Yes — "road cones," "construction cones," "street cones," and "traffic cones" all describe the same MUTCD device. The differences are size, base weight, and reflective grade, not name.',
    },
    {
      q: 'How long do road cones last?',
      a: 'Quality contractor-grade cones (virgin PVC or TPE rubber, heat-bonded collars) last 3–5 years of regular use. The collars usually fail before the cone body — replace any cone whose reflective sheeting is visibly faded or peeling.',
    },
    {
      q: 'Do I need to buy cone bars or cone caps separately?',
      a: 'For most lane-closure work, plain cones are enough. Cone bars (which span between two cones to form a temporary barrier) and cone-mounted signs are separate accessories, typically $8–14 per bar. Add them only when you need to physically block a pedestrian path or post a sign without a stand.',
    },
    {
      q: 'Can I get same-day delivery on bulk road cone orders in NJ?',
      a: 'Yes — for Central NJ contractors we deliver same-day on standard 28-inch and 36-inch cone orders up to roughly 200 units, if the request comes in before noon. Larger orders or non-standard configurations typically ship next-day.',
    },
  ],
  relatedProducts: [
    { label: 'Traffic Cones (all sizes)', path: '/category/traffic-cones' },
    { label: 'Cone Lights & Warning Beacons', path: '/category/cone-lights' },
    { label: 'Drums & Channelizers', path: '/category/drums-channelizers' },
    { label: 'Request a Bulk Cone Quote', path: '/quote' },
  ],
  relatedArticles: [
    'road-cones-vs-traffic-cones',
    'traffic-cones-for-sale-buying-guide',
    'how-many-cones-for-lane-closure-nj',
  ],
}
