import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "28 inch traffic cones" / "28 traffic cones" (~500/mo, High comp).
 * FAQ-heavy AEO structure. Answers every common 28-inch buying / spec
 * question directly so it can pull featured-snippet / AI-answer real estate.
 */
export const article28InchTrafficConesGuide: Article = {
  slug: '28-inch-traffic-cones-guide',
  title: '28-Inch Traffic Cones: Spec Sheet, MUTCD Use, and What to Buy',
  excerpt:
    'The 28-inch traffic cone is the default size on most U.S. road work. Here is the spec, the MUTCD use case, base-weight options, reflective-collar requirements, and a buying recipe for NJ contractors — answered as quick FAQ.',
  metaDescription:
    '28-inch traffic cones: MUTCD spec, base-weight options, reflective collar requirements, prices, and what to buy. Quick-answer FAQ for contractors.',
  primaryKeyword: '28 inch traffic cones',
  secondaryKeywords: [
    '28 traffic cones',
    '28 inch cones',
    '28 inch safety cones',
    '28 inch road cones',
    '28 inch orange cones',
  ],
  targetVolume: 500,
  datePublished: '2026-05-13',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A 28-inch traffic cone is a fluorescent-orange PVC cone, 28 inches tall, with a separate or molded-in rubber base — typically 7 lb — and one or two white reflective collars. ',
      h('strong', null, 'It is the MUTCD-compliant default for daytime work zones up to 45 mph and nighttime work up to 35 mph when fitted with a double reflective collar.'),
      ' Below: every common spec, use, and buying question, answered directly.',
    ),

    h('h2', null, 'What a 28-inch traffic cone is (the spec, fast)'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Height:'), ' 28 in (711 mm) tip to ground'),
      h('li', null, h('strong', null, 'Body:'), ' Fluorescent-orange PVC, single piece'),
      h('li', null, h('strong', null, 'Base:'), ' Separate or molded rubber, 7 lb standard (4 lb economy; 10 lb premium)'),
      h('li', null, h('strong', null, 'Reflective collars:'), ' One 4-in collar (daytime use); two collars 4 in + 6 in (night-rated)'),
      h('li', null, h('strong', null, 'Sheeting standard:'), ' ASTM D4956 Type IV high-intensity prismatic minimum for MUTCD compliance'),
      h('li', null, h('strong', null, 'Stackable:'), ' Yes, 25–30 cones per typical pickup-bed stack'),
    ),

    h('h2', null, 'When 28-inch cones are the right call'),
    h(
      'p',
      null,
      'Use 28-inch cones for:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Daytime road work on roads ≤ 45 mph'),
      h('li', null, 'Nighttime road work on roads ≤ 35 mph (must have double collar)'),
      h('li', null, 'Utility / underground / sidewalk excavation in NJ municipalities'),
      h('li', null, 'Most parking-lot striping where you want visibility from a passing road'),
      h('li', null, 'Event lane management on town streets'),
    ),
    h(
      'p',
      null,
      'When 28-inch is NOT enough: nighttime work above 35 mph, or any daytime work on 55+ mph routes. For those, step up to 36-inch cones or 42-inch drums. See our ',
      h('a', { href: '/blog/road-cones-vs-traffic-cones' }, 'cone height guide'),
      ' for the speed-by-height table.',
    ),

    h('h2', null, 'Quick-answer FAQ — 28-inch buying questions'),

    h('h3', null, 'How much does a 28-inch traffic cone cost?'),
    h(
      'p',
      null,
      'Retail per cone:',
    ),
    h(
      'ul',
      null,
      h('li', null, '28-inch, 4-lb base, single collar (parking-lot grade): $14–18 each'),
      h('li', null, '28-inch, 7-lb base, double collar, ASTM Type IV (contractor grade): $18–28 each'),
      h('li', null, '28-inch, 10-lb base, double collar, Type IX diamond grade (premium): $30–40 each'),
    ),
    h(
      'p',
      null,
      'Bulk discounts typically kick in at 25 cones of the same SKU. A typical 25-cone NJ contractor case price runs $475–600.',
    ),

    h('h3', null, 'What does a 28-inch traffic cone weigh?'),
    h(
      'p',
      null,
      'Total cone weight = base weight + body. PVC body is roughly 2 lb; total assembled weights:',
    ),
    h(
      'ul',
      null,
      h('li', null, '4-lb base + body = ~6 lb total (light-duty)'),
      h('li', null, '7-lb base + body = ~9 lb total (contractor standard)'),
      h('li', null, '10-lb base + body = ~12 lb total (high-wind / night)'),
    ),

    h('h3', null, 'Are 28-inch traffic cones MUTCD compliant?'),
    h(
      'p',
      null,
      'Yes, provided the cone meets the color and reflectivity requirements. The MUTCD specifies 28-inch as the minimum height for any roadway with a posted speed above 35 mph. For nighttime use on those same roads, a double reflective collar (4-in + 6-in, ASTM Type IV minimum) is required. A 28-inch cone with a single collar is daytime-only above 25 mph.',
    ),

    h('h3', null, 'What is the difference between 28-inch and 36-inch traffic cones?'),
    h(
      'p',
      null,
      '36-inch cones are taller (better visibility at distance), heavier-based (10–12 lb vs. 7 lb), and required for: nighttime work above 35 mph, daytime work above 55 mph, and most freeway tapers. 28-inch cones are lighter, easier to load and store, and acceptable for the bulk of NJ municipal and county road work. Most NJ contractors run a mixed kit — 80% 28-inch and 20% 36-inch — and pull the 36-inch when the job spec requires it.',
    ),

    h('h3', null, 'How many 28-inch cones do I need for a lane closure?'),
    h(
      'p',
      null,
      'For a single-lane closure on a 40 mph two-lane road: roughly 20–25 cones (taper of 15, buffer of 3, activity area of 4, plus 25% spares). Faster road or longer activity area pushes the count higher. The full math is in our ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'cone-count guide for lane closures'),
      ', and the ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' will compute it from a job description.',
    ),

    h('h3', null, 'Are 28-inch traffic cones legal in NJ?'),
    h(
      'p',
      null,
      'Yes — NJDOT and Central NJ municipalities accept 28-inch cones with double ASTM Type IV reflective collars for road work up to 45 mph daytime and 35 mph nighttime. Above those thresholds, the spec calls for 36-inch cones or 42-inch drums. NJDOT inspectors will measure cone height and check sheeting class on any TCP review.',
    ),

    h('h3', null, 'What base weight should a 28-inch cone have?'),
    h(
      'p',
      null,
      'Match the base weight to the work zone:',
    ),
    h(
      'ul',
      null,
      h('li', null, '4 lb — indoor / yard / parking-lot only'),
      h('li', null, '7 lb — daytime road work up to 45 mph (NJ contractor default)'),
      h('li', null, '10 lb — nighttime and 35–55 mph; high-wind days'),
      h('li', null, 'Add sandbag — any work at 55 mph or with sustained wind above 25 mph'),
    ),

    h('h3', null, 'Can I use 28-inch cones at night?'),
    h(
      'p',
      null,
      'Yes, but the cone must have a double reflective collar (4-in + 6-in white bands with ASTM Type IV high-intensity prismatic sheeting), and the posted speed must be 35 mph or below. Above 35 mph at night, you need 36-inch cones with the same double-collar spec.',
    ),

    h('h3', null, 'How long do 28-inch traffic cones last?'),
    h(
      'p',
      null,
      '3–5 years in regular outdoor service. The failure mode is almost always UV fade on the orange (visible as a pink or pale shift) rather than physical damage to the PVC body. Reflective collar sheeting usually outlasts the body color if the cone is not driven over repeatedly. Storing cones out of direct sun in the off-hours extends life noticeably.',
    ),

    h('h3', null, 'Are 28-inch cones the same as "28 traffic cones"?'),
    h(
      'p',
      null,
      'Yes — "28 traffic cones" and "28 inch traffic cones" describe the same product. The shorter phrasing is common in catalog listings and Google searches; the long form is what shows up on inspection paperwork.',
    ),

    h('h2', null, 'Buying recipe — a small NJ shop\'s 28-inch kit'),
    h(
      'p',
      null,
      'If a contractor were starting from zero and needed a 28-inch cone inventory that covers 90% of NJ short-duration jobs, the working recipe is:',
    ),
    h(
      'ul',
      null,
      h('li', null, '24× 28-inch, 7-lb base, double collar (Type IV) — the workhorse'),
      h('li', null, '6× 28-inch, 10-lb base, double collar (Type IX) — nighttime + high-wind'),
      h('li', null, 'A flat-stack truck rack — keeps the cones clean and prevents the body-to-base joint from fatiguing'),
      h('li', null, 'A small box of replacement reflective collars — the sheeting wears before the body does'),
    ),
    h(
      'p',
      null,
      'Roughly $700–900 retail for the cone set. Add a couple of 36-inch cones from our ',
      h('a', { href: '/blog/large-traffic-cones-buying-guide' }, 'large cones guide'),
      ' if any of your work is on 50+ mph routes.',
    ),

    h('h2', null, 'Where to buy 28-inch traffic cones in NJ'),
    h(
      'p',
      null,
      'For Central NJ contractors, ',
      h('a', { href: '/category/cones-drums' }, 'browse our cones and channelizers'),
      ' — 28-inch cones in stock with 7-lb and 10-lb bases, ASTM Type IV double collars, and same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean counties. Need a job-specific spec? ',
      h('a', { href: '/quote' }, 'Get a quote'),
      ' and we will size the cone count and base weight to the work zone.',
    ),
  ),
  faqs: [
    {
      q: 'What is a 28-inch traffic cone used for?',
      a: 'Daytime road work on roads up to 45 mph and nighttime road work up to 35 mph (with a double reflective collar). It is the most-used cone size on U.S. road construction.',
    },
    {
      q: 'Is a 28-inch traffic cone MUTCD-compliant?',
      a: 'Yes, when the cone has the required ASTM D4956 Type IV (or better) reflective collars and fluorescent orange color. The 28-inch height is the minimum allowed by MUTCD for any road above 35 mph.',
    },
    {
      q: 'How much does a 28-inch traffic cone cost?',
      a: '$14–18 for parking-lot grade, $18–28 for MUTCD-contractor grade with a 7-lb base and double collar, and $30–40 for premium 10-lb-base diamond-grade reflective cones. Bulk discounts apply at 25 cones and above.',
    },
    {
      q: 'How much does a 28-inch traffic cone weigh?',
      a: 'Total weight is base weight plus about 2 lb for the PVC body. A standard 7-lb-base contractor cone is roughly 9 lb assembled; a 10-lb-base premium cone is roughly 12 lb.',
    },
    {
      q: 'Are 28-inch cones legal at night?',
      a: 'Yes, on roads up to 35 mph with a double reflective collar. Above 35 mph at night, the MUTCD requires 36-inch cones.',
    },
    {
      q: 'What is the difference between 28-inch and 18-inch traffic cones?',
      a: '18-inch cones are parking-lot and indoor-rated only (≤ 25 mph). 28-inch cones are road-rated up to 45 mph daytime and meet MUTCD requirements for most municipal and county work. The two sizes are not interchangeable on a public roadway.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Flares, Markers & Flags', path: '/category/flares-markers-wands-flags' },
  ],
  relatedArticles: [
    'road-cones-vs-traffic-cones',
    'large-traffic-cones-buying-guide',
    'how-many-cones-for-lane-closure-nj',
  ],
}
