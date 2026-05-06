import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "plastic jersey barriers" (~500/mo, High comp, $21.42 bid).
 * Decision-tree / comparison angle - plastic vs concrete Jersey barriers,
 * crash ratings, weights, redeploy logistics. Distinct from
 * water-filled-barriers-buying-guide because this article focuses on
 * the Jersey-shape category specifically and the plastic vs concrete decision.
 */
export const articlePlasticJerseyBarriersVsConcrete: Article = {
  slug: 'plastic-jersey-barriers-vs-concrete',
  title: 'Plastic Jersey Barriers vs Concrete: Which One You Need',
  excerpt:
    'Plastic Jersey barriers (water-fillable) cost less, ship lighter, and redeploy in minutes. Concrete Jersey barriers crash-redirect at higher speeds and survive multiple impacts. Here is the decision tree.',
  metaDescription:
    'Plastic Jersey barriers vs concrete: weight, crash rating, price, redeploy time compared. NJ contractor guide for picking the right Jersey-shape barrier.',
  primaryKeyword: 'plastic jersey barriers',
  secondaryKeywords: [
    'plastic jersey barrier',
    'water filled jersey barriers',
    'concrete jersey barriers',
    'jersey barriers for sale',
    'plastic vs concrete barriers',
    'temporary concrete barriers',
    'portable jersey barriers',
  ],
  targetVolume: 500,
  datePublished: '2026-05-06',
  readMinutes: 6,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A plastic Jersey barrier is a hollow polyethylene shell shaped like the classic concrete Jersey wall, ',
      h('strong', null, 'filled on-site with water (700-1,200 lb per section) for ballast'),
      '. A concrete Jersey barrier is solid 4,000+ lb concrete, MASH-rated for vehicle crash redirection. They look similar from 50 ft away but they do very different jobs. Pick the right one and the project finishes; pick the wrong one and you either over-spend or under-protect.',
    ),

    h('h2', null, 'Quick decision: which one for which job'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h('thead', null, h('tr', null,
          h('th', { className: 'text-left p-2 border-b' }, 'Job'),
          h('th', { className: 'text-left p-2 border-b' }, 'Plastic'),
          h('th', { className: 'text-left p-2 border-b' }, 'Concrete'),
        )),
        h('tbody', null,
          h('tr', null, h('td', { className: 'p-2' }, 'Pedestrian channel along ≤25 mph road'), h('td', { className: 'p-2' }, 'Yes - faster, cheaper'), h('td', { className: 'p-2' }, 'Overkill')),
          h('tr', null, h('td', { className: 'p-2' }, 'Lane separation on 35-45 mph road'), h('td', { className: 'p-2' }, 'Acceptable with cap rail'), h('td', { className: 'p-2' }, 'Better')),
          h('tr', null, h('td', { className: 'p-2' }, 'Lane separation on 50+ mph (Interstate, NJTA, GSP)'), h('td', { className: 'p-2' }, 'NOT acceptable'), h('td', { className: 'p-2' }, 'Required (MASH TL-3+)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Construction site perimeter'), h('td', { className: 'p-2' }, 'Yes'), h('td', { className: 'p-2' }, 'Yes (overkill)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Event perimeter / VIP staging'), h('td', { className: 'p-2' }, 'Yes - graphics-friendly'), h('td', { className: 'p-2' }, 'Yes - imposing')),
          h('tr', null, h('td', { className: 'p-2' }, 'Long-term highway median (months/years)'), h('td', { className: 'p-2' }, 'Will degrade'), h('td', { className: 'p-2' }, 'Yes')),
        ),
      ),
    ),

    h('h2', null, 'Plastic Jersey barriers - the case for them'),
    h('p', null, 'A plastic Jersey barrier ships empty (about 80-150 lb per section), arrives on a flatbed pallet, and gets filled on-site from a water truck or hydrant. Once filled it weighs 700-1,200 lb depending on size, anchored by gravity. Empties drain in minutes for redeployment. Comes in highway-orange, white, yellow, and (less commonly) custom colors.'),
    h('ul', null,
      h('li', null, h('strong', null, 'Strengths: '), 'fast deploy, cheap to ship, redeployable, links end-to-end, easy to graphics-wrap for events.'),
      h('li', null, h('strong', null, 'Weaknesses: '), 'low MASH rating (most are TL-1 or TL-2 only - good for ≤45 mph). UV degradation over years. Will move on impact - not a permanent vehicle barrier.'),
      h('li', null, h('strong', null, 'Typical use: '), 'low-speed lane shifts, pedestrian channels, construction-site perimeters, event staging, parking-lot work.'),
    ),

    h('h2', null, 'Concrete Jersey barriers - the case for them'),
    h('p', null, 'Concrete Jersey barriers are precast 10-20 ft sections weighing 4,000-9,000 lb each. Crash-tested under MASH (Manual for Assessing Safety Hardware) at TL-3 or TL-4 - meaning they will redirect a 5,000 lb pickup at 60 mph. Required on Interstates, the NJ Turnpike, the Garden State Parkway, and any other 50+ mph roadway under FHWA jurisdiction.'),
    h('ul', null,
      h('li', null, h('strong', null, 'Strengths: '), 'crash-rated for high-speed traffic. Survives multiple impacts. 30+ year service life.'),
      h('li', null, h('strong', null, 'Weaknesses: '), 'expensive to transport (one section per truck). Requires a knuckle-boom or crane to set. Does not redeploy quickly.'),
      h('li', null, h('strong', null, 'Typical use: '), 'highway lane separations, freeway median work zones, long-term construction barriers, blast-protection setups.'),
    ),

    h('h2', null, 'Crash rating matters more than appearance'),
    h(
      'p',
      null,
      'A plastic Jersey barrier looks like a concrete Jersey barrier but does not perform like one in a crash. The MASH rating tells you the test condition the barrier survived:',
    ),
    h('ul', null,
      h('li', null, h('strong', null, 'TL-1: '), 'tested at 30 mph. Pedestrian protection only.'),
      h('li', null, h('strong', null, 'TL-2: '), 'tested at 45 mph. Suitable for arterial streets.'),
      h('li', null, h('strong', null, 'TL-3: '), 'tested at 62 mph. Standard for state routes and Interstates.'),
      h('li', null, h('strong', null, 'TL-4: '), 'tested at 56 mph with a single-unit truck. Used where heavy vehicles dominate.'),
    ),
    h('p', null, 'Most plastic Jersey barriers are rated TL-1 or TL-2. Some manufacturers offer TL-3 plastic barriers with steel reinforcement, but these cost more and weigh more than basic plastic. If your spec says TL-3, default to concrete unless you have specific TL-3 plastic that has been MASH-tested in your configuration.'),

    h('h2', null, 'Cost comparison'),
    h('p', null, 'Per linear foot, plastic Jersey is dramatically cheaper to acquire AND to deploy. Concrete is dramatically cheaper to operate over a multi-year horizon. The crossover point is usually 12-18 months of continuous use.'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h('thead', null, h('tr', null,
          h('th', { className: 'text-left p-2 border-b' }, 'Spec'),
          h('th', { className: 'text-left p-2 border-b' }, 'Plastic 6 ft'),
          h('th', { className: 'text-left p-2 border-b' }, 'Concrete 10 ft'),
        )),
        h('tbody', null,
          h('tr', null, h('td', { className: 'p-2' }, 'Buy price (each)'), h('td', { className: 'p-2' }, '$180-$320'), h('td', { className: 'p-2' }, '$650-$1,100')),
          h('tr', null, h('td', { className: 'p-2' }, 'Weight empty / set'), h('td', { className: 'p-2' }, '80-150 lb'), h('td', { className: 'p-2' }, '4,000-6,000 lb')),
          h('tr', null, h('td', { className: 'p-2' }, 'Deploy crew + equipment'), h('td', { className: 'p-2' }, '2 people + water source'), h('td', { className: 'p-2' }, 'Crane / boom truck')),
          h('tr', null, h('td', { className: 'p-2' }, 'Time per 100 ft'), h('td', { className: 'p-2' }, '~30 min'), h('td', { className: 'p-2' }, '~2 hr')),
          h('tr', null, h('td', { className: 'p-2' }, 'Service life'), h('td', { className: 'p-2' }, '5-8 yr'), h('td', { className: 'p-2' }, '30+ yr')),
          h('tr', null, h('td', { className: 'p-2' }, 'MASH rating (typical)'), h('td', { className: 'p-2' }, 'TL-1 / TL-2'), h('td', { className: 'p-2' }, 'TL-3 / TL-4')),
        ),
      ),
    ),

    h('h2', null, 'Linking sections together'),
    h('p', null, 'Both types interlock end-to-end. Plastic uses a pin-and-socket or J-hook connector; concrete uses a steel pin-and-loop or shear-key cast into the section. The connection matters because an unlinked barrier line is a series of independent obstacles, not a continuous redirective wall - a vehicle hitting an unlinked plastic Jersey can shove a single section sideways and break through.'),

    h('h2', null, 'Hybrid setups for ramps and tapers'),
    h(
      'p',
      null,
      'A common pattern on NJDOT projects: concrete Jersey on the high-speed mainline, plastic Jersey for the merge taper and ramp closures where the line will move every shift. Cones and Type III barricades transition between the two. See ',
      h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'our water-filled barriers buying guide'),
      ' for the plastic-side details.',
    ),

    h('h2', null, 'Where to source in NJ'),
    h(
      'p',
      null,
      'We stock plastic water-fillable Jersey barriers in 4 ft and 6 ft sizes out of our Central NJ yard with same-day delivery. Concrete Jersey barriers are project-rented through partner yards; ask for a quote and we will coordinate the trucking and the boom-truck setting. Browse the ',
      h('a', { href: '/category/barriers' }, 'barriers inventory'),
      ' or get a ',
      h('a', { href: '/quote' }, 'project quote'),
      ' if you want both types coordinated for a single job.',
    ),
  ),
  faqs: [
    {
      q: 'Are plastic Jersey barriers MASH-rated?',
      a: 'Most plastic Jersey barriers are rated TL-1 or TL-2 (suitable up to 45 mph). A few specific reinforced-plastic models carry TL-3 ratings, but they are heavier and pricier than baseline plastic and still less performant than concrete in repeated impact scenarios.',
    },
    {
      q: 'Can I use plastic Jersey barriers on the NJ Turnpike?',
      a: 'No. NJTA and Interstate work zones require MASH TL-3 minimum, which in practice means concrete Jersey or steel guardrail. Plastic is acceptable on access ramps, low-speed staging areas, and pedestrian channels adjacent to the work zone.',
    },
    {
      q: 'How fast can a two-person crew deploy plastic Jersey barriers?',
      a: 'About 100 ft of linked plastic Jersey per 30 minutes once the water source is connected. Filling the barriers (300-500 gallons per section) is the bottleneck, not the placement.',
    },
    {
      q: 'How heavy is a concrete Jersey barrier?',
      a: 'A standard 10 ft concrete Jersey barrier weighs about 4,000-5,000 lb. Heavier "F-shape" or 20 ft sections push 8,000-10,000 lb. Always confirm the weight before scheduling delivery - your boom truck has to pick the heaviest single section.',
    },
    {
      q: 'Do plastic Jersey barriers leak?',
      a: 'Quality barriers from a reputable manufacturer hold water for the duration of a typical project (months) without significant loss. UV-degraded older barriers can crack and seep. Inspect any used plastic Jersey before deploy - cracks are visible by eye.',
    },
    {
      q: 'Can I fill plastic Jersey barriers with sand instead of water?',
      a: 'Some manufacturers approve sand fill; others do not. Sand-filled barriers are heavier (about 1.5x water) but cannot be drained for redeployment - you have to dig them out. Water is the default for projects that move.',
    },
  ],
  relatedProducts: [
    { label: 'Jersey Barriers', path: '/category/barriers' },
    { label: 'Water-Filled Barriers', path: '/category/barriers' },
    { label: 'Barricades', path: '/category/barricades' },
    { label: 'Get a Quote', path: '/quote' },
  ],
  relatedArticles: [
    'water-filled-barriers-buying-guide',
    'jersey-barricades-guide',
    'road-barriers-types-comparison',
  ],
}
