import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "water filled barriers" (~500/mo, High comp, $14.22 bid).
 * Secondary: water filled jersey barriers, water filled barricades, water filled road barriers.
 * Pillar piece for the water-filled barrier category — a buying guide that doubles
 * as the AEO answer for "are water filled barriers crashworthy?" and similar.
 */
export const articleWaterFilledBarriersBuyingGuide: Article = {
  slug: 'water-filled-barriers-buying-guide',
  title: 'Water Filled Barriers: Sizes, Crashworthiness, and What to Buy (2026 Guide)',
  excerpt:
    'Water filled barriers — also called water-filled jersey barriers — are the lighter, modular alternative to concrete for closures, parking-lot perimeters, and event channelizing. Here is how to size, ballast, and pick the right model.',
  metaDescription:
    'Water filled barriers explained — sizes, crashworthiness ratings (MASH/NCHRP-350), connectors, and what to buy for closures, parking lots, and event perimeters.',
  primaryKeyword: 'water filled barriers',
  secondaryKeywords: [
    'water filled jersey barriers',
    'water filled barricades',
    'water filled road barriers',
    'water filled crash barriers',
    'plastic water filled barriers',
    'plastic water barrier',
  ],
  targetVolume: 500,
  datePublished: '2026-05-02',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Water filled barriers are hollow plastic units (HDPE or polyethylene) that ship empty and weigh ',
      h('strong', null, '60–120 lbs dry / 1,500–2,200 lbs filled'),
      ' depending on the model. They give you a temporary jersey-barrier-equivalent for road closures, work-zone perimeters, parking-lot channelizing, and crowd control — without renting a crane or a flatbed for concrete. Below: the sizes, the MASH/NCHRP-350 crashworthiness ratings, what fits which job, and what to buy first if you are stocking a yard.',
    ),

    h('h2', null, 'What a water filled barrier actually is'),
    h(
      'p',
      null,
      'A water filled barrier is a single-piece hollow plastic shell molded to roughly the silhouette of a concrete jersey barrier (sloped face, flat top, ~32" tall, ~6 ft long). It ships empty so two people can position it; once placed, you fill it through a top port using a hydrant cap, a hose from a fire hydrant, or a tank truck. Filled, it weighs about as much as a small car and behaves like a fixed barrier for most low-to-medium-energy impacts.',
    ),
    h(
      'p',
      null,
      'They are NOT a substitute for concrete in every scenario. For high-speed travel-lane separation on freeways, MASH-rated steel or concrete is required. For closures, perimeters, and channelizing where impacts are unlikely or low-speed, water filled is the right tool — cheaper to deploy, modular, and removable in an afternoon.',
    ),

    h('h2', null, 'The size and weight chart'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Length'), h('th', { className: 'text-left p-2 border-b' }, 'Height'), h('th', { className: 'text-left p-2 border-b' }, 'Empty weight'), h('th', { className: 'text-left p-2 border-b' }, 'Filled weight'), h('th', { className: 'text-left p-2 border-b' }, 'Best use')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '4 ft'), h('td', { className: 'p-2' }, '24 in'), h('td', { className: 'p-2' }, '40 lb'), h('td', { className: 'p-2' }, '~700 lb'), h('td', { className: 'p-2' }, 'Pedestrian/event channelizing')),
          h('tr', null, h('td', { className: 'p-2' }, '6 ft'), h('td', { className: 'p-2' }, '32 in'), h('td', { className: 'p-2' }, '85 lb'), h('td', { className: 'p-2' }, '~1,500 lb'), h('td', { className: 'p-2' }, 'Standard closure / parking lot')),
          h('tr', null, h('td', { className: 'p-2' }, '6 ft'), h('td', { className: 'p-2' }, '42 in'), h('td', { className: 'p-2' }, '120 lb'), h('td', { className: 'p-2' }, '~2,200 lb'), h('td', { className: 'p-2' }, 'Higher-impact / longer closures')),
          h('tr', null, h('td', { className: 'p-2' }, '12 ft'), h('td', { className: 'p-2' }, '32 in'), h('td', { className: 'p-2' }, '160 lb'), h('td', { className: 'p-2' }, '~3,200 lb'), h('td', { className: 'p-2' }, 'Long-run protection (rare)')),
        ),
      ),
    ),
    h('p', null, 'The 6 ft × 32 in model is the workhorse — it accounts for ~70% of orders and is what most jobs use.'),

    h('h2', null, 'Crashworthiness — MASH vs. NCHRP-350 vs. nothing'),
    h(
      'p',
      null,
      'Not all water filled barriers are crashworthy. Three categories:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'MASH TL-2 / TL-3 (crash-tested):'), ' Designed and tested to redirect a vehicle impact at specific speeds (45 mph for TL-2, 62 mph for TL-3). These cost more and are required by NJDOT for any travel-lane-separation deployment on state routes.'),
      h('li', null, h('strong', null, 'NCHRP-350 (older standard, still acceptable in most states):'), ' Predecessor to MASH. Many existing barrier inventories are NCHRP-350 rated. Acceptable for non-state-route work.'),
      h('li', null, h('strong', null, 'Non-crashworthy (channelizing only):'), ' Most light-duty water filled barriers fall here. They keep pedestrians and slow vehicles out of an area but will NOT stop or redirect a vehicle impact at posted-road speed. Fine for parking lots, sidewalks, and event perimeters.'),
    ),
    h(
      'p',
      null,
      'When you buy: ask the supplier for the test report. A barrier with no crashworthiness paperwork is a channelizing-only product, regardless of how heavy it looks.',
    ),

    h('h2', null, 'Connectors — the detail that separates working systems from junk'),
    h(
      'p',
      null,
      'Each barrier connects to the next via a male/female lug or a steel pin. Cheap units use plastic male tabs that crack on the third disconnect cycle. Quality units use steel pins through molded sockets, or interlocking T-shapes that survive years of redeployment.',
    ),
    h(
      'p',
      null,
      'When pricing: a 6 ft × 32 in barrier with steel-pin connectors runs $250–$400 retail. The same shape with plastic-tab connectors is $150–$200 — but you will replace it inside two seasons of regular use. Steel pins pay back fast.',
    ),

    h('h2', null, 'Where water filled wins vs. concrete'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Speed of deployment.'), ' Two people can place a 50-barrier run in under 2 hours. Concrete needs a flatbed and a forklift or crane.'),
      h('li', null, h('strong', null, 'Removability.'), ' Drain plug at the bottom; gravity-empty in 5–10 minutes per barrier. Concrete barriers stay where they are placed.'),
      h('li', null, h('strong', null, 'Color.'), ' Almost always orange/yellow, so they read as temporary at a glance. Concrete is gray/permanent-looking — sometimes the wrong message for a 2-week closure.'),
      h('li', null, h('strong', null, 'Cost.'), ' $250–$400 per unit retail vs. $400–$700 for a concrete equivalent (plus delivery costs that scale by weight).'),
    ),

    h('h2', null, 'Where concrete still wins'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'High-speed travel-lane separation.'), ' At 55+ mph, MASH TL-3 concrete is the standard.'),
      h('li', null, h('strong', null, 'Long-duration jobs (months / years).'), ' Concrete does not freeze in winter; water filled freezes solid in NJ between Dec–Mar (use antifreeze rated to -10°F or rubber inserts to prevent shell cracking).'),
      h('li', null, h('strong', null, 'Tampering risk.'), ' Open public sites where someone might drain the barrier. Concrete cannot be sabotaged with a screwdriver.'),
    ),

    h('h2', null, 'Filling and deployment — what crews actually mess up'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Forgetting the freeze precaution.'), ' In NJ, a water filled barrier deployed Nov–Mar without antifreeze additive will crack at the first hard freeze. Add 30% propylene glycol or use a rubber-foam liner.'),
      h('li', null, h('strong', null, 'Underfilling.'), ' A barrier filled to 50% has roughly 30% of its rated stability. Either fill to the line or do not deploy on a road.'),
      h('li', null, h('strong', null, 'Skipping the connectors.'), ' A line of barriers connected by gravity alone (no pins) can be pushed apart by a single vehicle impact. Always pin every joint.'),
      h('li', null, h('strong', null, 'Wrong surface.'), ' Water filled barriers are designed for hard surfaces (asphalt, concrete). On grass or gravel they tip easier and can sink. Use a Geotextile fabric base or relocate to hardstand.'),
    ),

    h('h2', null, 'How many do you need?'),
    h(
      'p',
      null,
      'Calculate length, divide by barrier length, add 10% for splay/end caps. Examples:',
    ),
    h(
      'ul',
      null,
      h('li', null, '100 ft pedestrian closure: 100 ÷ 6 = 17 units of the 6 ft model'),
      h('li', null, '40 ft work-zone perimeter on a parking lot: 7 units'),
      h('li', null, 'Event entry channelizing 200 ft: 34 units (consider 4 ft units for tighter turns)'),
    ),

    h('h2', null, 'What to buy first'),
    h(
      'p',
      null,
      'For a small NJ contractor outfitting a working barrier set:',
    ),
    h(
      'ul',
      null,
      h('li', null, '20× 6 ft × 32 in standard barriers with steel-pin connectors (covers most closure jobs)'),
      h('li', null, '8× 4 ft × 24 in pedestrian-channelizing barriers (event / sidewalk work)'),
      h('li', null, '4× MASH TL-2 rated barriers if you ever do state-route work'),
      h('li', null, 'A drain wand and a hose adapter for fast fill/empty cycles'),
      h('li', null, 'Sandbags for the freezing season (or antifreeze on hand)'),
    ),

    h('h2', null, 'Where to buy water filled barriers in NJ'),
    h(
      'p',
      null,
      'Browse our ',
      h('a', { href: '/category/barricades-barriers' }, 'barricades and barriers category'),
      ' for water filled, plastic, and steel options. For a custom set sized to your job, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' — same-day Central NJ delivery, MASH paperwork on request, and we deliver the empty units so you fill on site (no flatbed surcharge).',
    ),
  ),
  faqs: [
    {
      q: 'How heavy are water filled barriers when full?',
      a: 'A standard 6 ft × 32 in unit weighs about 85 lb empty and 1,500 lb filled. Larger 6 ft × 42 in units weigh up to 2,200 lb filled. Use the empty weight for placement (two people can carry one); use the filled weight for impact / stability calculations.',
    },
    {
      q: 'Are water filled barriers crashworthy?',
      a: 'Some are; most are not. MASH TL-2 (45 mph) and TL-3 (62 mph) rated barriers are tested to redirect vehicle impact and are required for state-route deployments. Most light-duty water filled barriers are channelizing-only — fine for parking lots, sidewalks, and event perimeters but not for travel-lane separation.',
    },
    {
      q: 'Do water filled barriers freeze in winter?',
      a: 'Yes. Plain water freezes between Nov–Mar in NJ and the expansion can crack the plastic shell. Use 30% propylene glycol antifreeze, a rubber-foam liner, or drain and store the barriers if not in active deployment. Plain salt water is NOT a freeze fix — it corrodes the connectors.',
    },
    {
      q: 'How much does a water filled barrier cost to buy?',
      a: 'Retail typically $250–$400 per unit for the standard 6 ft × 32 in barrier with steel-pin connectors. Cheap plastic-tab versions go for $150–$200 but fail within 1–2 seasons. MASH TL-3 rated barriers run $500–$900 each.',
    },
    {
      q: 'How long does it take to fill a water filled barrier?',
      a: 'About 5–10 minutes per barrier from a hydrant or 5/8" garden hose; faster from a tanker truck with a 1.5" line. A 50-unit run is a 4–6 hour fill operation for a 2-person crew with hose-only access; 1–2 hours with tanker support.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'jersey-barricades-guide',
    'type-iii-barricade-vs-type-i-type-ii',
    'crowd-control-barriers-buying-guide',
  ],
}
