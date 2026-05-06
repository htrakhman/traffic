import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "large traffic cones" (~5,000/mo, High comp, $6.74 bid).
 * Commercial size comparison angle - which "large" cone (28", 36", 42")
 * for which job, with prices and crew-loadout recommendations.
 */
export const articleLargeTrafficConesBuyingGuide: Article = {
  slug: 'large-traffic-cones-buying-guide',
  title: 'Large Traffic Cones: 28" vs 36" vs 42" - What to Buy in 2026',
  excerpt:
    'Large traffic cones means anything 28" or taller. Here is what 28", 36", and 42" cones actually cost, what they weigh, and which size is right for residential, state-route, and freeway work in NJ.',
  metaDescription:
    'Large traffic cones compared - 28" vs 36" vs 42" sizes, weights, prices, and use cases. NJ contractor buying guide for highway and freeway work zones.',
  primaryKeyword: 'large traffic cones',
  secondaryKeywords: [
    'big traffic cones',
    'tall traffic cones',
    'large orange cones',
    'big orange cones',
    '36 inch traffic cones',
    '42 inch traffic cones',
    'large safety cones',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-05',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Large traffic cones - the ones contractors actually buy for road work - are ',
      h('strong', null, '28", 36", or 42" tall and weigh 7 to 15 lb'),
      '. The size you need depends on the speed of the road, the wind exposure, and the kind of inspector you expect. This is a commercial buying guide: real prices, the trade-offs at each size, and what we recommend for a typical NJ contractor crew.',
    ),

    h('h2', null, 'The three sizes that matter'),
    h(
      'p',
      null,
      'When suppliers say "large traffic cone" they almost always mean one of three sizes:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '28-inch: '), 'the workhorse for local-road work, parking-lot striping, and any job posted under 45 mph. Lighter to handle, easier to stack, fits more on a truck.'),
      h('li', null, h('strong', null, '36-inch: '), 'the MUTCD minimum for any roadway posted 45 mph or higher. The default for state routes, NJDOT and NJ Turnpike work zones.'),
      h('li', null, h('strong', null, '42-inch: '), 'used when the cone needs to be visible above a passing tractor-trailer cab - usually freeway lane shifts, paving operations, and very high-speed work. Specialty item; most yards do not stock these.'),
    ),
    h('p', null, 'Anything under 28" is a parking cone, not a "large" cone in the contractor sense. We do not recommend smaller cones for any roadway use.'),

    h('h2', null, 'Side-by-side: size, weight, price, use'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Size'),
            h('th', { className: 'text-left p-2 border-b' }, 'Weight'),
            h('th', { className: 'text-left p-2 border-b' }, 'Reflective collars'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical buy price'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best for'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '28"'), h('td', { className: 'p-2' }, '7 lb'), h('td', { className: 'p-2' }, 'One 6"'), h('td', { className: 'p-2' }, '$22-$32'), h('td', { className: 'p-2' }, 'Local roads, residential, low-speed')),
          h('tr', null, h('td', { className: 'p-2' }, '28"'), h('td', { className: 'p-2' }, '10 lb'), h('td', { className: 'p-2' }, 'One 6"'), h('td', { className: 'p-2' }, '$28-$38'), h('td', { className: 'p-2' }, 'Local roads with truck wash')),
          h('tr', null, h('td', { className: 'p-2' }, '36"'), h('td', { className: 'p-2' }, '10 lb'), h('td', { className: 'p-2' }, 'One 6" + one 4"'), h('td', { className: 'p-2' }, '$32-$48'), h('td', { className: 'p-2' }, 'State routes, 45+ mph')),
          h('tr', null, h('td', { className: 'p-2' }, '36"'), h('td', { className: 'p-2' }, '12 lb'), h('td', { className: 'p-2' }, 'One 6" + one 4"'), h('td', { className: 'p-2' }, '$40-$58'), h('td', { className: 'p-2' }, 'Turnpike, Parkway, freeway')),
          h('tr', null, h('td', { className: 'p-2' }, '42"'), h('td', { className: 'p-2' }, '15 lb'), h('td', { className: 'p-2' }, 'One 6" + one 4"'), h('td', { className: 'p-2' }, '$55-$85'), h('td', { className: 'p-2' }, 'Above-cab visibility, paving')),
        ),
      ),
    ),
    h('p', null, 'Bulk pricing usually kicks in at 25-50 unit orders. Same-day delivery in Central NJ is built into our prices; freight on a long-haul order can add $1-$2 per cone.'),

    h('h2', null, 'How to pick a size'),
    h('h3', null, 'Pick 28" if'),
    h(
      'ul',
      null,
      h('li', null, 'The road is posted under 45 mph (cul-de-sac, residential street, parking lot, school zone).'),
      h('li', null, 'You need to fit a lot of cones on a small truck - 28" stacks tighter than 36".'),
      h('li', null, 'The cones will mostly live in a parking-lot striping/event-lay-out role.'),
    ),
    h('h3', null, 'Pick 36" if'),
    h(
      'ul',
      null,
      h('li', null, 'The road is posted 45 mph or higher (any state route in NJ).'),
      h('li', null, 'You may get inspected by NJDOT, NJTA, county, or municipal personnel.'),
      h('li', null, 'You want one cone size that covers 90% of jobs - the 36" is the right default.'),
    ),
    h('h3', null, 'Pick 42" if'),
    h(
      'ul',
      null,
      h('li', null, 'You do paving, milling, or freeway lane shifts where cones need to be seen over a Class 8 truck.'),
      h('li', null, 'You\'ve been spec\'d for 42" by an engineer - this happens occasionally on bridge or freeway work.'),
      h('li', null, 'You don\'t care about higher cost - 42" cones are 2x the price of 36" for the same coverage.'),
    ),

    h('h2', null, 'PVC body vs. all-rubber'),
    h(
      'p',
      null,
      'Most "large" cones are made one of two ways:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'PVC cone body + recycled-rubber base: '), 'the standard. Lower cost, brighter orange, lasts 3-5 years if stored indoors. PVC cracks below ~15 deg F if dropped.'),
      h('li', null, h('strong', null, 'All-rubber, one-piece: '), 'tougher in cold weather, takes more abuse before splitting. Heavier, slightly duller orange. Lasts 5-7 years even in outdoor yard storage.'),
    ),
    h(
      'p',
      null,
      'For NJ winter conditions, the all-rubber 36" cone is the right buy if you store outside. PVC is fine if cones live in a heated bay.',
    ),

    h('h2', null, 'Crew-loadout recommendation'),
    h(
      'p',
      null,
      'For a 2-truck crew doing typical NJ contractor work, we recommend:',
    ),
    h(
      'ul',
      null,
      h('li', null, '40 x 36" 10 lb cones with Type IV collars - the daily driver. Use these for any state-route job.'),
      h('li', null, '15 x 28" 7 lb cones for residential and parking-lot work. Lighter to handle, faster to set/strike.'),
      h('li', null, '5 x 36" 12 lb cones for windy days and Turnpike work.'),
      h('li', null, 'Skip 42" unless you have a specific job that requires them. They\'re a niche size.'),
    ),
    h('p', null, 'Total spend: roughly $1,800-$2,400 for a complete cone kit. Cones are an asset, not a consumable - amortize over 4-5 years and they cost about $1/day per cone.'),

    h('h2', null, 'What "large" actually means in product listings'),
    h(
      'p',
      null,
      'Marketing language varies. When you read "large traffic cone," "big orange cone," or "tall traffic cone" on a listing, decode it like this:',
    ),
    h(
      'ul',
      null,
      h('li', null, '"Large" or "big" or "tall" almost always means 28" or 36".'),
      h('li', null, '"Extra-large" or "extra-tall" usually means 42".'),
      h('li', null, '"Heavy duty" usually means 10-12 lb base, regardless of height.'),
      h('li', null, '"Highway" means 28" minimum with collars; 36" if posted speed is 45+.'),
    ),
    h(
      'p',
      null,
      'When in doubt, look at the spec sheet for the actual height in inches and the actual base weight in pounds. Marketing labels are not standardized.',
    ),

    h('h2', null, 'Where to buy in NJ'),
    h(
      'p',
      null,
      'Browse our ',
      h('a', { href: '/category/cones-drums' }, 'cones, drums and channelizers category'),
      ' for 28", 36", and 42" cones in 7-12 lb weights with Type III, IV, and V reflective collars. For a tailored recommendation that accounts for your specific job mix, run the spec through our ',
      h('a', { href: '/assistant' }, 'AI gear assistant'),
      ' or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' - same-day Central NJ delivery, NJDOT-compliant cones in stock.',
    ),
  ),
  faqs: [
    {
      q: 'What are large traffic cones?',
      a: 'In contractor usage, "large traffic cones" means cones 28 inches or taller. The standard sizes are 28", 36", and 42". Anything smaller is a parking cone and not suitable for roadway work.',
    },
    {
      q: 'How much does a 36-inch traffic cone cost?',
      a: 'A 36" cone with 10 lb base and one 6" + one 4" reflective collar costs $32-$48 retail in 2026. Bulk orders of 25+ run $28-$42. The 12 lb Turnpike-spec version is $40-$58.',
    },
    {
      q: 'How tall is the largest traffic cone?',
      a: 'Standard production sizes top out at 42 inches. A few specialty makers do 48" cones for very high-speed lane shifts, but they are rare and most NJ contractors will never need one. The 36" cone is the practical maximum for daily use.',
    },
    {
      q: 'How much do large traffic cones weigh?',
      a: 'A 28" weighs 7-10 lb. A 36" weighs 10-12 lb. A 42" weighs 12-15 lb. The weight is in the rubber base, not the cone body - the body is 1-2 lb of PVC across all sizes.',
    },
    {
      q: 'Do I need 36-inch cones or are 28-inch enough?',
      a: 'On any road posted 45 mph or higher, you need 36". The MUTCD requires it and NJDOT inspectors enforce it. On local roads under 45 mph, 28" is fine. If you only buy one size, buy 36" - it works on every job.',
    },
    {
      q: 'How many large traffic cones should I buy?',
      a: 'For a typical NJ contractor crew, plan on 50-60 cones total: 40x 36" for state-route work, 15x 28" for local-road work, and 5x extra for damage replacement. That covers about 90% of single-lane closure scenarios.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'highway-cones-guide',
    'traffic-cones-buying-guide',
    'traffic-safety-cones-pillar-guide',
  ],
}
