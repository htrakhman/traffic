import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "18 inch traffic cones" (500/mo, High comp, $10.02 bid) plus
 * "18 traffic cones" and related size-specific terms. Pillar guide for the
 * smallest MUTCD-allowed roadway cone size.
 */
export const article18InchTrafficConesGuide: Article = {
  slug: '18-inch-traffic-cones-guide',
  title: '18 Inch Traffic Cones: When They Are Legal, How to Use Them, and What to Pay',
  excerpt:
    '18-inch cones are the smallest MUTCD-allowed cone for any roadway use — and the rules on when you can deploy them are stricter than most contractors realize. Here is the size-by-speed chart, the pricing, and the buying guide.',
  metaDescription:
    '18 inch traffic cones are MUTCD-allowed only for low-speed daytime work (≤25 mph) or off-roadway. Full size-by-speed rules, pricing, and buying recommendations.',
  primaryKeyword: '18 inch traffic cones',
  secondaryKeywords: [
    '18 traffic cones',
    '18 in cones',
    'short traffic cones',
    'small traffic cones',
    'parking lot cones',
    'mutcd 18 inch cone',
  ],
  targetVolume: 500,
  datePublished: '2026-05-10',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      '18-inch traffic cones are the smallest MUTCD-allowed size for roadway use, but the rules are stricter than most buyers realize. ',
      h('strong', null, 'They are legal only for daytime work on roads posted at 25 mph or lower, or for any non-roadway use (parking lots, warehouses, sports, valet operations).'),
      ' Outside that window, an 18-inch cone is too short to meet MUTCD visibility requirements and will be cited on inspection. Below is the full size-by-speed rule, when 18-inch is the right call, when to size up, and how to buy a working set.',
    ),

    h('h2', null, 'The MUTCD rule for 18-inch cones'),
    h(
      'p',
      null,
      'Part 6 of the MUTCD sets minimum cone height by speed and time of day. The relevant lines for 18-inch:',
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
            h('th', { className: 'text-left p-2 border-b' }, 'Condition'),
            h('th', { className: 'text-left p-2 border-b' }, '18-inch allowed?'),
            h('th', { className: 'text-left p-2 border-b' }, 'Size you actually need'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Daytime, ≤ 25 mph posted'), h('td', { className: 'p-2' }, 'Yes'), h('td', { className: 'p-2' }, '18 in OK')),
          h('tr', null, h('td', { className: 'p-2' }, 'Daytime, 26–35 mph'), h('td', { className: 'p-2' }, 'No'), h('td', { className: 'p-2' }, '28 in')),
          h('tr', null, h('td', { className: 'p-2' }, 'Daytime, > 35 mph'), h('td', { className: 'p-2' }, 'No'), h('td', { className: 'p-2' }, '28 in (or 36 in preferred)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Nighttime any speed'), h('td', { className: 'p-2' }, 'No'), h('td', { className: 'p-2' }, '28 in or 36 in')),
          h('tr', null, h('td', { className: 'p-2' }, 'Off-roadway (parking lot, warehouse)'), h('td', { className: 'p-2' }, 'Yes'), h('td', { className: 'p-2' }, '18 in OK (no MUTCD jurisdiction)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Sports / coaching / training'), h('td', { className: 'p-2' }, 'Yes'), h('td', { className: 'p-2' }, '18 in OK')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'For the full size-by-speed reference, see our ',
      h('a', { href: '/blog/road-cones-vs-traffic-cones' }, 'road cones guide'),
      '.',
    ),

    h('h2', null, 'When 18-inch is the right cone'),
    h('h3', null, 'Parking lots and parking enforcement'),
    h(
      'p',
      null,
      '18-inch cones are the standard for parking lots, parking-space reservation, valet zones, and lot-closure work. The lower height means easier handling, faster deployment, more stack-density on a truck or cart, and less interference with sightlines for drivers. A typical parking attendant can carry six 18-inch cones in two hands and deploy them in under a minute.',
    ),
    h('h3', null, 'Indoor and warehouse routing'),
    h(
      'p',
      null,
      'Inside warehouses, distribution centers, manufacturing floors, and large retail back-of-house, 18-inch cones mark hazards (spills, equipment, blocked aisles) without obstructing forklifts or scissor lifts. The smaller footprint matters in tight spaces.',
    ),
    h('h3', null, 'Sports, athletics, and training'),
    h(
      'p',
      null,
      'Coaches, trainers, and PE teachers buy 18-inch cones in bulk for drills, agility ladders, and field marking. They show up clearly against grass and turf, stack neatly, and survive being run over by athletes (PVC bodies on rubber bases — the standard road cone construction works fine here).',
    ),
    h('h3', null, 'Driveways, residential streets, and HOA private roads'),
    h(
      'p',
      null,
      'On a private residential road or driveway, MUTCD does not apply. 18-inch cones work for property-management routing — closing a driveway during a delivery, marking a private parking spot, or routing around a contractor working the lot.',
    ),
    h('h3', null, 'Slow-speed urban segments — with caveats'),
    h(
      'p',
      null,
      'On posted 25 mph residential streets in NJ, daytime use of 18-inch cones is technically MUTCD-permissible but ',
      h('strong', null, 'check the local jurisdiction'),
      ' — some municipalities specify 28-inch as the local minimum regardless of MUTCD. NJDOT typically requires 28-inch or larger on any state road, even where the speed limit is 25 mph.',
    ),

    h('h2', null, 'When 18-inch is wrong (and what to use)'),
    h(
      'p',
      null,
      'If any of the following apply, do not deploy 18-inch cones:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Posted speed > 25 mph at any time'),
      h('li', null, 'Nighttime work, regardless of speed'),
      h('li', null, 'NJDOT or municipal road with a stated minimum cone size in the spec'),
      h('li', null, 'Long-duration closure on a public road (drums or 36-inch cones preferred)'),
      h('li', null, 'Any DOT-permitted TCP that lists 28-inch as the minimum'),
    ),
    h(
      'p',
      null,
      'The default upgrade is 28-inch with a 7-lb base — the contractor standard for most NJ road work. See our ',
      h('a', { href: '/blog/large-traffic-cones-buying-guide' }, 'large traffic cones buying guide'),
      ' for the next size up.',
    ),

    h('h2', null, 'Specs to look for in an 18-inch cone'),
    h('h3', null, 'PVC body'),
    h(
      'p',
      null,
      'Standard 18-inch cones use a one-piece PVC body in fluorescent orange. UV-stable PVC keeps color through 18–36 months of outdoor exposure; cheaper non-UV PVC fades in 6–12 months. For a working set you will keep through multiple seasons, pay the small premium for UV-stable.',
    ),
    h('h3', null, 'Base weight and material'),
    h(
      'p',
      null,
      'Most 18-inch cones ship with a 3-lb or 4-lb base. The base material is more important than the weight at this size — a recycled-rubber base survives multiple drive-overs; a soft PVC base cracks on the first impact. For warehouse and sports use, soft PVC is fine. For any outdoor use where wind matters, get rubber.',
    ),
    h('h3', null, 'Reflective collar (optional but worth it)'),
    h(
      'p',
      null,
      'An 18-inch cone is too small for the MUTCD double-collar requirement (which applies to 28-inch and above), but a single 4-inch high-intensity prismatic collar adds nighttime visibility for the off-roadway uses that creep into low-light situations (warehouse third-shift, valet at sundown, driveway use after dusk). Plain orange-painted cones with no reflective sheeting are fine for sports and indoor; reflective collars are worth the small premium for any mixed-light use.',
    ),
    h('h3', null, 'Stack-friendly geometry'),
    h(
      'p',
      null,
      'A good 18-inch cone stacks to 12–18 high without locking. Cheaper cones either lock together (annoying when you need them fast) or topple at low stack heights. Test before bulk-buying.',
    ),

    h('h2', null, 'Price ranges'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Spec'), h('th', { className: 'text-left p-2 border-b' }, 'Per-cone'), h('th', { className: 'text-left p-2 border-b' }, 'Bulk (24+)')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Sports / training (no reflectivity, soft PVC base)'), h('td', { className: 'p-2' }, '$8–$14'), h('td', { className: 'p-2' }, '$6–$10')),
          h('tr', null, h('td', { className: 'p-2' }, 'Standard parking lot (UV PVC, rubber base, no reflective)'), h('td', { className: 'p-2' }, '$14–$22'), h('td', { className: 'p-2' }, '$11–$18')),
          h('tr', null, h('td', { className: 'p-2' }, 'Outdoor work (UV PVC, rubber base, single 4 in collar)'), h('td', { className: 'p-2' }, '$20–$30'), h('td', { className: 'p-2' }, '$15–$24')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'A typical NJ contractor or property manager outfits a starter set of 18-inch cones for $300–$600.',
    ),

    h('h2', null, 'How many do I need?'),
    h(
      'p',
      null,
      'For parking-lot work, the rule of thumb is one cone every 8–10 ft of channelized path. A typical parking-lot lane closure (one row of spaces, ~80 ft long) needs 8–12 cones. A small event setup (entry queue + parking marshalling) needs 30–60. A valet operation typically deploys 12–24 cones at a time.',
    ),
    h(
      'p',
      null,
      'For sports and training, count by drill: a typical agility-ladder drill uses 8–12 cones, a multi-station practice uses 30–50.',
    ),

    h('h2', null, 'Care and lifespan'),
    h(
      'p',
      null,
      'Indoors, an 18-inch cone is essentially permanent — they last 5+ years with light handling. Outdoors, expect 18–36 months before UV fade reaches the "replace" threshold. Wash with mild soap and water once a quarter to keep them presentable; a faded cone or dust-grimy cone reads cheap and unprofessional.',
    ),

    h('h2', null, 'What to buy for a starter kit'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Property manager / parking lot: '), '24× standard 18-inch UV PVC with rubber base, no reflective.'),
      h('li', null, h('strong', null, 'Valet / hospitality: '), '24× standard 18-inch with single 4-in reflective collar (mixed-light use).'),
      h('li', null, h('strong', null, 'Sports / training: '), '50× sports-spec 18-inch (no reflective, soft PVC base — they will get kicked).'),
      h('li', null, h('strong', null, 'Roadway contractor (rare use case): '), 'Skip 18-inch entirely. Buy 28-inch as your minimum. 18-inch will cost you more in citations than you save in storage.'),
    ),
    h(
      'p',
      null,
      'For Central NJ orders, ',
      h('a', { href: '/category/cones-drums' }, 'browse our cones inventory'),
      ' — same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon. To match cones to a specific use case (parking lot vs. road work vs. event), ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' or ask the ',
      h('a', { href: '/assistant' }, 'Assistant'),
      ' which size and base spec fits your job.',
    ),
  ),
  faqs: [
    {
      q: 'Are 18-inch traffic cones MUTCD-legal for road work?',
      a: 'Only on roads posted at 25 mph or lower, and only during daytime. For any work zone above 25 mph or anytime at night, 18-inch cones are too short to meet MUTCD visibility requirements. NJDOT typically requires 28-inch or larger on state roads regardless of speed.',
    },
    {
      q: 'How much do 18-inch traffic cones cost?',
      a: 'Sports-spec cones run $8–$14 each. Standard parking-lot cones with UV PVC and rubber bases run $14–$22. Outdoor cones with reflective collars run $20–$30. Bulk pricing on orders of 24+ saves 20–30%.',
    },
    {
      q: 'What is the difference between an 18-inch and 28-inch cone?',
      a: 'Height (18 in vs. 28 in), base weight (3–4 lb vs. 7 lb), and reflective collar requirement. 28-inch cones must have a double reflective collar for nighttime road use; 18-inch cones cannot meet the double-collar rule because the cone is too short to fit two collars at the required spacing.',
    },
    {
      q: 'Can I use 18-inch cones at night?',
      a: 'Not on any roadway. For non-roadway use (warehouse, parking lot, indoor) you can use them at night, but the cone must have a reflective collar to be visible to a driver or forklift operator. For nighttime road work, sized up to 28 or 36-inch.',
    },
    {
      q: 'How many 18-inch cones do I need for a parking lot?',
      a: 'Roughly one cone every 8–10 ft of channelized path. A single-lane parking-lot closure needs 8–12 cones. A full event-parking marshalling setup needs 30–60. A valet zone typically deploys 12–24.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Custom Traffic Cones', path: '/category/custom-cones' },
    { label: 'Site Map Planner', path: '/planner' },
    { label: 'Get a Quote', path: '/quote' },
  ],
  relatedArticles: [
    'large-traffic-cones-buying-guide',
    'small-traffic-cones-buying-guide',
    'road-cones-vs-traffic-cones',
  ],
}
