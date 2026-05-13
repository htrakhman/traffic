import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "road traffic barrier" (~5K/mo, High comp) + "barricade traffic" /
 * "barricade for traffic". Decision-tree structure: walk the reader from
 * "what is the road, what is the duration, what is the impact risk" to a
 * specific barrier product choice. Distinct from existing "road barriers"
 * pillar and "traffic barriers types comparison" — this one is a
 * decision-flow, not a taxonomy.
 */
export const articleRoadTrafficBarrierGuide: Article = {
  slug: 'road-traffic-barrier-guide',
  title: 'Road Traffic Barriers: A Decision-Tree Guide to Picking the Right One',
  excerpt:
    'Concrete Jersey, water-filled, plastic Jersey, Type III barricade, steel guardrail — five common road traffic barriers, five different jobs. This guide walks the speed, duration, and impact questions to land on the right product the first time.',
  metaDescription:
    'Picking a road traffic barrier? Decision-tree by speed, duration, and impact risk: concrete vs. water-filled vs. plastic Jersey vs. Type III vs. steel.',
  primaryKeyword: 'road traffic barrier',
  secondaryKeywords: [
    'road traffic barriers',
    'traffic barrier',
    'barricade for traffic',
    'barricade traffic',
    'road barrier',
    'highway barrier',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-13',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      '"Road traffic barrier" covers everything from a 30 lb plastic Type III barricade to a 4,000 lb concrete Jersey wall — they are not interchangeable, and using the wrong one is either wasted money or a real safety problem. ',
      h('strong', null, 'The right barrier is a function of three things: the road speed, how long the barrier stays in place, and whether the protected zone needs impact protection or just channelization.'),
      ' This is a decision-tree to land on the right product in under five minutes.',
    ),

    h('h2', null, 'The five barrier types you will choose between'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Type III barricade'), ' — wooden or plastic A-frame with reflective panels. Channelization only.'),
      h('li', null, h('strong', null, 'Plastic Jersey barrier'), ' — hollow polyethylene shaped like a small concrete Jersey wall. Visual channelization, light impact.'),
      h('li', null, h('strong', null, 'Water-filled barrier'), ' — plastic shell that fills with 50–100 gallons of water on site. Moderate impact, easy to relocate.'),
      h('li', null, h('strong', null, 'Concrete Jersey barrier'), ' — full 10-ft precast concrete unit, ~4,000 lb each. Real impact protection.'),
      h('li', null, h('strong', null, 'Steel guardrail / temporary attenuator'), ' — engineered crash-rated barrier (TL-2, TL-3, TL-4). Required on freeway-speed protected work zones.'),
    ),

    h('h2', null, 'Decision 1: What is the posted speed on the road?'),
    h(
      'p',
      null,
      'Speed sets the lower bound on what barrier is acceptable. The MUTCD and AASHTO MASH (Manual for Assessing Safety Hardware) crash-test ratings map roughly like this:',
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
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Posted speed'), h('th', { className: 'text-left p-2 border-b' }, 'Minimum barrier class'), h('th', { className: 'text-left p-2 border-b' }, 'Acceptable barriers')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '≤ 25 mph'), h('td', { className: 'p-2' }, 'Channelization only'), h('td', { className: 'p-2' }, 'Type III, plastic Jersey, cones+drums')),
          h('tr', null, h('td', { className: 'p-2' }, '30–45 mph'), h('td', { className: 'p-2' }, 'MASH TL-2 if crash protection needed'), h('td', { className: 'p-2' }, 'Water-filled (TL-2 rated models), concrete Jersey')),
          h('tr', null, h('td', { className: 'p-2' }, '50–55 mph'), h('td', { className: 'p-2' }, 'MASH TL-3'), h('td', { className: 'p-2' }, 'Concrete Jersey, TL-3 water-filled')),
          h('tr', null, h('td', { className: 'p-2' }, '≥ 60 mph (freeway)'), h('td', { className: 'p-2' }, 'MASH TL-3 or TL-4 + attenuator'), h('td', { className: 'p-2' }, 'Concrete Jersey + crash cushion / steel guardrail')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'A plastic Jersey "barrier" at 55 mph protecting a worker is a liability lawsuit waiting to happen — they are channelizing devices, not crash barriers. If a vehicle could realistically hit the barrier at posted speed, it has to be rated for that speed.',
    ),

    h('h2', null, 'Decision 2: How long is the closure?'),
    h(
      'p',
      null,
      'Duration changes the math even more than speed for short-term jobs:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '< 1 day, daytime, ≤ 35 mph:'), ' Cones + Type III barricades. Saves the cost and time of staging a heavy barrier.'),
      h('li', null, h('strong', null, '1 day to 1 week:'), ' Water-filled barriers. They drop in empty (each ~150 lb empty) and fill on site; pickup truck and a hose, no crane.'),
      h('li', null, h('strong', null, '1 week to several months:'), ' Concrete Jersey barriers. Higher install cost (crane truck, ~$300–500 per delivery), but they pay back over a long deployment because you do not need to refill or replace.'),
      h('li', null, h('strong', null, '> 6 months:'), ' Concrete Jersey or engineered steel barrier. Plastic and water-filled units fade and crack in continuous outdoor exposure.'),
    ),

    h('h2', null, 'Decision 3: Is impact protection actually required?'),
    h(
      'p',
      null,
      'A lot of "barriers" you see on a job are doing channelization, not impact protection. The two roles are different:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Channelization'), ' = "tell the driver to go around this." Type III barricades, plastic Jersey, cones, drums.'),
      h('li', null, h('strong', null, 'Impact protection'), ' = "if the driver does not go around, this stops or redirects the vehicle." Concrete Jersey, MASH-rated water-filled, steel guardrail, crash cushions.'),
    ),
    h(
      'p',
      null,
      'A simple test: is there a worker or excavation directly behind the barrier where a vehicle strike would cause injury or fall? If yes, you need impact protection. If no — the "behind the barrier" is a closed shoulder or a paved staging area — channelization is enough.',
    ),

    h('h2', null, 'The decision tree, end to end'),
    h(
      'p',
      null,
      'Walk these questions in order:',
    ),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'Is the road open to traffic at the posted speed during the work?'), ' If no, cones + Type III are usually enough. If yes, continue.'),
      h('li', null, h('strong', null, 'Is anything behind the barrier that a strike could harm?'), ' If no, channelization product is the right call. If yes, continue.'),
      h('li', null, h('strong', null, 'How long does the closure run?'), ' Under a day → cones + Type III. 1 day to 1 week → water-filled. 1 week+ → concrete Jersey.'),
      h('li', null, h('strong', null, 'What is the posted speed?'), ' ≤ 35 mph → most products with right class work. 35–55 mph → MASH TL-2 minimum. 55+ mph → concrete or steel + crash attenuator.'),
      h('li', null, h('strong', null, 'Can a truck and forklift get to the site?'), ' If no, water-filled (light when empty) is the only viable option above cone-only. If yes, full concrete becomes an option.'),
    ),

    h('h2', null, 'Worked examples (the most-common NJ scenarios)'),
    h('h3', null, 'Scenario A: Half-day sidewalk excavation, 30 mph residential street'),
    h(
      'p',
      null,
      'Speed is moderate, duration is short, vehicles will not realistically reach the excavation if cones are correctly placed. Answer: 28-inch cones (taper + buffer) + Type III barricades on the closure end + a SIDEWALK CLOSED sign. No barrier wall needed. Total gear cost: $400–700.',
    ),

    h('h3', null, 'Scenario B: 5-day utility cut, 40 mph county road'),
    h(
      'p',
      null,
      'Workers in the excavation, road open at posted speed during work hours, week-long duration. Cones alone do not protect the excavation if a vehicle leaves the travel lane. Answer: ',
      h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'water-filled barriers'),
      ' (MASH TL-2 rated, 6 ft long, 10–12 units) along the excavation, cones for the taper, Type III for the closure end. Water-filled because the install/teardown labor for concrete on a 5-day job does not pay back.',
    ),

    h('h3', null, 'Scenario C: 6-month bridge deck replacement, 55 mph state highway'),
    h(
      'p',
      null,
      'Long duration, freeway speed, work crew adjacent to live traffic. Answer: ',
      h('a', { href: '/blog/concrete-barriers-for-sale-guide' }, 'concrete Jersey barriers'),
      ' on the full work-zone length, MASH TL-3 rated, with a crash cushion / attenuator on the upstream end. Plus arrow boards, message boards, and a flagger setup. This is the only configuration that meets NJDOT spec for this kind of job.',
    ),

    h('h3', null, 'Scenario D: Parking-lot event, 200-car capacity'),
    h(
      'p',
      null,
      'No live traffic, but vehicles will be moving slowly through the lot. Answer: ',
      h('a', { href: '/blog/plastic-jersey-barriers-vs-concrete' }, 'plastic Jersey barriers'),
      ' for visual channelization of lanes plus event entrance/exit, supplemented with cones. Hollow plastic Jerseys can be moved by 2–3 people and stack on a trailer for off-event storage.',
    ),

    h('h2', null, 'Cost and logistics summary'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Barrier'),
            h('th', { className: 'text-left p-2 border-b' }, 'Per-unit purchase'),
            h('th', { className: 'text-left p-2 border-b' }, 'Unit weight'),
            h('th', { className: 'text-left p-2 border-b' }, 'Install gear'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Type III barricade'), h('td', { className: 'p-2' }, '$80–180'), h('td', { className: 'p-2' }, '~30 lb'), h('td', { className: 'p-2' }, 'Two hands')),
          h('tr', null, h('td', { className: 'p-2' }, 'Plastic Jersey'), h('td', { className: 'p-2' }, '$150–300'), h('td', { className: 'p-2' }, '~60 lb empty'), h('td', { className: 'p-2' }, 'Two-person carry')),
          h('tr', null, h('td', { className: 'p-2' }, 'Water-filled (6 ft)'), h('td', { className: 'p-2' }, '$220–400'), h('td', { className: 'p-2' }, '~150 lb empty / 1,000 lb filled'), h('td', { className: 'p-2' }, 'Pickup + hose')),
          h('tr', null, h('td', { className: 'p-2' }, 'Concrete Jersey (10 ft)'), h('td', { className: 'p-2' }, '$450–700'), h('td', { className: 'p-2' }, '~4,000 lb'), h('td', { className: 'p-2' }, 'Crane / boom truck')),
          h('tr', null, h('td', { className: 'p-2' }, 'Steel guardrail / attenuator'), h('td', { className: 'p-2' }, '$2,500–8,000'), h('td', { className: 'p-2' }, 'Varies'), h('td', { className: 'p-2' }, 'Engineered install')),
        ),
      ),
    ),

    h('h2', null, 'What about Type II barricades?'),
    h(
      'p',
      null,
      'Type II is the smaller A-frame with one reflective panel rather than two. It is a sidewalk / pedestrian-channelization product, not really a road traffic barrier — the spec puts it in the same category as cones. For comparison details, see our ',
      h('a', { href: '/blog/type-iii-barricade-vs-type-i-type-ii' }, 'Type I vs. II vs. III barricade guide'),
      '.',
    ),

    h('h2', null, 'How to get the right barrier ordered'),
    h(
      'p',
      null,
      'Three useful tools on the site:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('a', { href: '/assistant' }, 'Assistant'),
        ' — describe the job (road speed, duration, what is behind the barrier), it spits out a barrier-and-quantity recommendation.',
      ),
      h(
        'li',
        null,
        h('a', { href: '/planner' }, 'SiteMapPlanner'),
        ' — generates a MUTCD-compliant layout that shows where each barrier goes and how many you need.',
      ),
      h(
        'li',
        null,
        h('a', { href: '/quote' }, 'Quote'),
        ' — send the job details and get a same-day delivery price for Central NJ.',
      ),
    ),

    h('h2', null, 'Where to buy road traffic barriers in NJ'),
    h(
      'p',
      null,
      'For Central NJ contractors, ',
      h('a', { href: '/category/barricades-barriers' }, 'browse our barricades and barriers'),
      ' — Type III barricades, plastic Jerseys, water-filled barriers, and concrete Jersey units, all with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean counties. Same crew handles spec questions, install logistics, and pickup at the end of the job.',
    ),
  ),
  faqs: [
    {
      q: 'What is the most common type of road traffic barrier?',
      a: 'On NJ municipal and county work, the most-used barrier is the Type III barricade (plastic A-frame) for closure-end channelization and the water-filled barrier for week-long closures protecting an excavation. Concrete Jersey is the standard on state-highway and freeway work where deployments run weeks or longer.',
    },
    {
      q: 'How do I choose between a water-filled and concrete Jersey barrier?',
      a: 'Duration and access. Water-filled wins on jobs under 2 weeks and on sites without crane access — they arrive empty, fill on-site from a hydrant or truck tank, and drain at the end. Concrete wins on jobs longer than 2 weeks (no refilling, more impact protection) and where crane install is already in the budget.',
    },
    {
      q: 'What MASH rating do I need for a 45 mph road work zone?',
      a: 'MASH TL-2 minimum for any barrier protecting workers on a 45 mph road. TL-3 is preferred on routes that see significant truck traffic. Verify the rating on the manufacturer spec sheet; not every water-filled product is crash-rated.',
    },
    {
      q: 'Are plastic Jersey barriers crash-rated?',
      a: 'Most plastic Jersey barriers are not crash-rated — they are channelization devices. A small number of plastic Jerseys have TL-2 ratings with specific anchoring requirements, but unanchored hollow plastic Jersey will not stop a vehicle at posted road speed. If you need crash protection, use water-filled (TL-2 rated) or concrete Jersey.',
    },
    {
      q: 'How long are road traffic barriers (concrete Jersey)?',
      a: 'Standard precast concrete Jersey barriers are 10 ft long, 32 in tall, and weigh roughly 4,000 lb. Some manufacturers also produce 20 ft units. Plastic and water-filled units are typically 4 ft or 6 ft long for easier handling.',
    },
    {
      q: 'Can I rent road traffic barriers or only buy?',
      a: 'Traffic Control Supply sells barriers for purchase with delivery. For contractors who do not want to own a barrier inventory, buying still tends to be cheaper than rental on any job longer than 3–4 weeks because rental rates compound and pickup logistics add up. For short jobs that genuinely need a one-time barrier, contact us for a quote and we will scope the right approach.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
  ],
  relatedArticles: [
    'water-filled-barriers-buying-guide',
    'concrete-barriers-for-sale-guide',
    'plastic-jersey-barriers-vs-concrete',
  ],
}
