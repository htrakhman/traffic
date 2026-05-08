import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "concrete barriers for sale" (~500/mo, High comp).
 * Commercial-comparison structure: concrete vs. plastic vs. water-filled vs. used,
 * with cost math, freight reality, and a buy-recommendation matrix by use case.
 */
export const articleConcreteBarriersForSaleGuide: Article = {
  slug: 'concrete-barriers-for-sale-guide',
  title: 'Concrete Barriers for Sale: New, Used, and the Plastic Alternatives Worth Considering',
  excerpt:
    'New 10-ft Jersey-shape concrete barriers run $400–$700 each plus freight; used run $150–$350 if you can find them. Here is the side-by-side cost, freight, and use-case math against plastic and water-filled options.',
  metaDescription:
    'New concrete barriers for sale: $400–$700 each plus freight. Used: $150–$350. Side-by-side comparison vs. plastic and water-filled with cost, weight, and use-case math.',
  primaryKeyword: 'concrete barriers for sale',
  secondaryKeywords: [
    'concrete barriers',
    'used concrete barriers for sale',
    'jersey barriers for sale',
    'concrete jersey barriers for sale',
    'concrete barriers near me',
    'precast concrete barriers',
  ],
  targetVolume: 500,
  datePublished: '2026-05-08',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Concrete barriers for sale typically run ',
      h('strong', null, '$400–$700 per 10-ft Jersey-shape unit new, $150–$350 used'),
      ', plus freight that can equal or exceed the unit cost. The freight number is what trips up most first-time buyers — a single 10-ft barrier weighs roughly 4,000 lbs, so even a flatbed trip from a regional yard adds $4–$8/mile. Below is the side-by-side cost, weight, and use-case comparison against plastic and water-filled alternatives so you only buy concrete when concrete is actually the right answer.',
    ),

    h('h2', null, 'Quick decision: when concrete is worth the freight'),
    h(
      'p',
      null,
      'Concrete barriers are the right buy when you need (a) a permanent or semi-permanent perimeter, (b) MASH TL-3 or TL-4 crashworthiness on a high-speed roadway, or (c) anti-vehicle protection that does not move when struck. They are the wrong buy when the closure lasts under 30 days, when you need to reposition the line frequently, or when site access blocks heavy delivery equipment.',
    ),

    h('h2', null, 'Concrete barrier types and what each costs'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Length / Weight'),
            h('th', { className: 'text-left p-2 border-b' }, 'New price (each)'),
            h('th', { className: 'text-left p-2 border-b' }, 'Crash rating'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best for'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Jersey shape (32 in)'),
            h('td', { className: 'p-2' }, '10 ft / 4,000 lb'),
            h('td', { className: 'p-2' }, '$400–$650'),
            h('td', { className: 'p-2' }, 'MASH TL-3'),
            h('td', { className: 'p-2' }, 'Highway median, long-duration work zones'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'F-shape (32 in)'),
            h('td', { className: 'p-2' }, '10 ft / 4,200 lb'),
            h('td', { className: 'p-2' }, '$450–$700'),
            h('td', { className: 'p-2' }, 'MASH TL-3'),
            h('td', { className: 'p-2' }, 'Newer DOT specs, slightly safer for occupant impact'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Tall-wall (42–54 in)'),
            h('td', { className: 'p-2' }, '12 ft / 6,000+ lb'),
            h('td', { className: 'p-2' }, '$650–$1,200'),
            h('td', { className: 'p-2' }, 'MASH TL-4 / TL-5'),
            h('td', { className: 'p-2' }, 'Truck-traffic medians, work zones over 55 mph'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Short-section / 6-ft Jersey'),
            h('td', { className: 'p-2' }, '6 ft / 2,400 lb'),
            h('td', { className: 'p-2' }, '$300–$450'),
            h('td', { className: 'p-2' }, 'NCHRP 350 (legacy)'),
            h('td', { className: 'p-2' }, 'Tight radii, parking-deck perimeters'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Crash ratings come from FHWA and the AASHTO Manual for Assessing Safety Hardware (MASH). MASH replaced NCHRP 350 in 2019 — barriers cast before 2019 may carry the older NCHRP 350 stamp, which most state DOTs still accept on existing inventory but no longer accept on new purchases. If you are buying for a DOT job, confirm the spec letter on file before paying for inventory that cannot be deployed.',
    ),

    h('h2', null, 'Freight is half the bill — plan for it'),
    h(
      'p',
      null,
      'A standard 48-ft flatbed carries six to eight 10-ft Jersey barriers (load limit on the trailer, not the truck). At 4,000 lb each, a full load is 24,000–32,000 lb of barrier plus dunnage. Freight rates from a yard within the Mid-Atlantic typically run $4–$8 per mile loaded, so a 100-mile delivery of one trailer is $400–$800 spread across 6–8 barriers — roughly $60–$130 in freight per unit. A barrier that costs $500 at the yard often lands at $580–$650 delivered.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Loading equipment matters too.'),
      ' You need a forklift rated 8,000 lb minimum (most rental skid-steer forklifts are 6,000 lb and will not lift these), or a small crane / excavator with a barrier clamp. If your jobsite cannot accept a flatbed and forklift, factor in a transload yard — that is another $40–$80/barrier in handling.',
    ),

    h('h2', null, 'Used concrete barriers — where to find them, what to inspect'),
    h(
      'p',
      null,
      'Used concrete barriers are the contractor budget play. Sources:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'State DOT surplus auctions.'), ' GovDeals, Municibid, and direct DOT bid lists post barriers when DOT replaces aging stock. NJDOT, NYSDOT, and PennDOT all list periodically.'),
      h('li', null, h('strong', null, 'Construction company end-of-job sales.'), ' Large GCs sometimes sell down on-hand inventory between jobs. Watch construction equipment classifieds and IronPlanet.'),
      h('li', null, h('strong', null, 'Precast yards with seconds.'), ' Yards selling new barriers often have a small "B-grade" pile — units with cosmetic chips, hairline crack repairs, or off-spec finish. Functionally fine for non-DOT work; priced 30–50% below new.'),
      h('li', null, h('strong', null, 'Demolition contractors.'), ' Highway widening jobs generate hundreds of removed barriers. Demo crews often want them gone fast.'),
    ),
    h(
      'p',
      null,
      h('strong', null, 'What to inspect on a used barrier:'),
      ' (1) cracks longer than 6 in or wider than 1/16 in — load-path failures; (2) exposed rebar at the lifting points; (3) spalls deeper than 1 in around the connection slots; (4) connection-pin holes that have been drilled out or re-shimmed (the barrier will not lock to the next unit). Walk the line of barriers in the yard before paying — variance is high.',
    ),

    h('h2', null, 'When a plastic or water-filled barrier is the better buy'),
    h(
      'p',
      null,
      'For most non-highway, non-permanent applications, concrete is overkill. The plastic and water-filled families do the same channelization work at a fraction of the freight cost and can be repositioned without heavy equipment.',
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
          h(
            'tr',
            null,
            h('th', { className: 'text-left p-2 border-b' }, 'Class'),
            h('th', { className: 'text-left p-2 border-b' }, 'Cost / 10 ft'),
            h('th', { className: 'text-left p-2 border-b' }, 'Empty weight'),
            h('th', { className: 'text-left p-2 border-b' }, 'Filled weight'),
            h('th', { className: 'text-left p-2 border-b' }, 'Crash rating'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Concrete Jersey'), h('td', { className: 'p-2' }, '$400–$700'), h('td', { className: 'p-2' }, '4,000 lb'), h('td', { className: 'p-2' }, 'n/a'), h('td', { className: 'p-2' }, 'MASH TL-3')),
          h('tr', null, h('td', { className: 'p-2' }, 'Water-filled plastic'), h('td', { className: 'p-2' }, '$200–$450'), h('td', { className: 'p-2' }, '90–150 lb'), h('td', { className: 'p-2' }, '~1,400 lb'), h('td', { className: 'p-2' }, 'MASH TL-1 / TL-2 (model-dependent)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Plastic Jersey (sand-fill)'), h('td', { className: 'p-2' }, '$250–$500'), h('td', { className: 'p-2' }, '120–180 lb'), h('td', { className: 'p-2' }, '~1,800 lb'), h('td', { className: 'p-2' }, 'NCHRP 350 / MASH TL-1')),
          h('tr', null, h('td', { className: 'p-2' }, 'Steel longitudinal'), h('td', { className: 'p-2' }, '$600–$1,200'), h('td', { className: 'p-2' }, '500–800 lb'), h('td', { className: 'p-2' }, 'n/a'), h('td', { className: 'p-2' }, 'MASH TL-2 / TL-3 (with anchors)')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'For a one-week parking-lot perimeter or a sidewalk closure, water-filled barriers ship empty (so freight is 5% of concrete freight) and you fill on site from a hydrant or a tank truck. We cover the tradeoffs in detail in our ',
      h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'water-filled barriers buying guide'),
      ' and the head-to-head ',
      h('a', { href: '/blog/plastic-jersey-barriers-vs-concrete' }, 'plastic vs concrete jersey comparison'),
      '.',
    ),

    h('h2', null, 'End treatments — the cost everyone forgets'),
    h(
      'p',
      null,
      'A line of concrete barriers cannot just stop at an exposed end on any road over 25 mph. MUTCD §6F.85 and AASHTO Roadside Design Guide require an approved end treatment — typically a crash cushion or impact attenuator — on the upstream end of any barrier line in a high-speed work zone. Those add $3,000–$8,000 per end, and they are not optional on a DOT job. If you are buying barriers for a 1,000-ft median run, budget $6,000–$16,000 for end treatments on top of the barriers themselves.',
    ),

    h('h2', null, 'Buy-decision matrix by use case'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Permanent industrial perimeter (warehouse yard, fuel depot):'), ' buy used concrete. Crash rating matters less than mass and durability.'),
      h('li', null, h('strong', null, 'Multi-month highway work zone:'), ' buy new MASH TL-3 concrete. Match the spec letter your DOT requires.'),
      h('li', null, h('strong', null, 'Event / parade / festival:'), ' do NOT buy concrete. Use water-filled or steel pedestrian barricades. The freight alone exceeds the rental of plastics for the same length.'),
      h('li', null, h('strong', null, 'Construction site, 6 months or less:'), ' water-filled or plastic Jersey. Lower freight, repositionable.'),
      h('li', null, h('strong', null, 'Anti-vehicle / security perimeter at low speed:'), ' used concrete is fine; ASTM F2656 rated wedge / bollard is required for higher threat levels.'),
    ),

    h('h2', null, 'Where to buy concrete barriers in NJ / Mid-Atlantic'),
    h(
      'p',
      null,
      'For Central NJ contractors who have decided concrete is the right answer, the local options break into three buckets: (1) precast yards in NJ / PA / NY for new units, (2) DOT auction lots for used, (3) regional dealers who broker between yards. Most contractors do not need to buy a full trailer — partial-trailer pricing is available from most yards but freight per unit goes up sharply. Our ',
      h('a', { href: '/category/barricades-barriers' }, 'barricades and barriers catalog'),
      ' lists the plastic and water-filled alternatives we stock with same-day Central NJ delivery; for concrete, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with the run length, road speed, and DOT spec — we can quote the right concrete spec, broker the freight, or steer you to the cheaper plastic alternative if the job allows it.',
    ),
    h(
      'p',
      null,
      'Not sure which class of barrier the job needs? Our ',
      h('a', { href: '/assistant' }, 'work-zone assistant'),
      ' walks through speed, duration, and pedestrian exposure and points you to the right barrier class — including when the answer is "do not buy concrete."',
    ),
  ),
  faqs: [
    {
      q: 'How much do concrete barriers cost?',
      a: 'New 10-ft Jersey-shape concrete barriers run $400–$700 each at the yard, plus $60–$130 per unit in freight from a regional supplier. Tall-wall MASH TL-4 units run $650–$1,200. Used barriers in good condition run $150–$350 from DOT surplus auctions or precast-yard seconds piles.',
    },
    {
      q: 'How heavy is a 10-ft concrete Jersey barrier?',
      a: 'A standard 32-inch Jersey-shape 10-ft barrier weighs about 4,000 lb. F-shape units of the same length weigh ~4,200 lb. Tall-wall (42–54 in) 12-ft units weigh 6,000+ lb. Plan for a flatbed and a forklift rated for at least 8,000 lb.',
    },
    {
      q: 'What is the difference between Jersey and F-shape concrete barriers?',
      a: 'Both are MASH TL-3 rated. The F-shape has a slightly different lower-face slope that improves vehicle redirection at small impact angles, reducing rollover risk. F-shape is the newer DOT preference; Jersey is still in service nationwide and is fully accepted on most state specs. Functionally interchangeable for most contractor uses.',
    },
    {
      q: 'Can I use plastic barriers instead of concrete?',
      a: 'Yes for most short-duration and low-speed applications. Water-filled plastic barriers (filled to ~1,400 lb each) carry MASH TL-1 or TL-2 ratings depending on model and provide channelization at a fraction of the freight cost. They are not appropriate for highway median work over 45 mph or for permanent installations — concrete or steel are required there.',
    },
    {
      q: 'Where can I find used concrete barriers for sale?',
      a: 'GovDeals and Municibid for state DOT surplus, IronPlanet for highway-widening demolition stock, regional precast yards for B-grade seconds, and large GCs selling down between jobs. Inspect for cracks longer than 6 in, exposed rebar at lifting points, spalls deeper than 1 in around connection slots, and altered pin holes before paying.',
    },
    {
      q: 'Do concrete barriers need an end treatment?',
      a: 'On any roadway over 25 mph, MUTCD §6F.85 and AASHTO Roadside Design Guide require an approved crash cushion or impact attenuator at the exposed upstream end. Those run $3,000–$8,000 per end and are not optional on DOT work. Budget end treatments separately from barrier units.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Pedestrian & Crowd Control', path: '/category/pedestrian-control' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
  ],
  relatedArticles: [
    'plastic-jersey-barriers-vs-concrete',
    'water-filled-barriers-buying-guide',
    'jersey-barricades-guide',
  ],
}
