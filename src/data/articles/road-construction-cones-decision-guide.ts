import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "road construction cones" (~5K/mo, High comp, $10.99 bid).
 * Decision-tree structure: walks the buyer through 5 questions and lands on
 * a specific SKU recommendation, with budget alternates at each branch.
 */
export const articleRoadConstructionConesDecisionGuide: Article = {
  slug: 'road-construction-cones-decision-guide',
  title: 'Road Construction Cones: A 5-Question Decision Tree (and Exact Specs to Order)',
  excerpt:
    'Stop scrolling cone catalogs. Answer five questions about your job and this guide tells you the exact size, base weight, reflective grade, and quantity to order — with a budget alternate at each branch.',
  metaDescription:
    'Road construction cones decision tree: answer 5 questions about your work zone, get exact size, base weight, and quantity to buy. Built for NJ contractors.',
  primaryKeyword: 'road construction cones',
  secondaryKeywords: [
    'road construction cones',
    'construction cones',
    'orange road cones',
    'construction cone size',
    'cones for road work',
    'cones for construction',
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
      'There are roughly 40 SKUs labeled "road construction cone" on most distributor sites. Picking the wrong one means buying twice. ',
      h('strong', null, 'This guide skips the marketing and walks you through five questions; at the end you have an exact spec to order.'),
      ' Each branch also includes a "budget alternate" if the recommended SKU is over your line-item limit.',
    ),

    h('h2', null, 'Q1. What is the posted speed limit on the road?'),
    h(
      'p',
      null,
      'This is the question that drives everything else. MUTCD minimum cone height is set by speed.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '≤ 25 mph: '), '18-inch cones are legal during daylight. 28-inch is the safer default.'),
      h('li', null, h('strong', null, '26–45 mph: '), '28-inch cones. This is most NJ surface streets.'),
      h('li', null, h('strong', null, '46–55 mph: '), '28-inch day, 36-inch night.'),
      h('li', null, h('strong', null, '> 55 mph: '), '36-inch cones, period. Day or night.'),
    ),
    h(
      'p',
      null,
      'If you own one fleet and work across speed bands, default to 28-inch with a smaller stock of 36-inch for highway work. The 18-inch cones are not worth stocking unless you have a specific recurring low-speed contract.',
    ),

    h('h2', null, 'Q2. Day work or night work?'),
    h(
      'p',
      null,
      'Night work pushes you one size up and forces double-collar reflectivity.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Daylight only:'), ' single 6-inch ASTM Type IV collar is fine.'),
      h('li', null, h('strong', null, 'Any nighttime work:'), ' double collar (4-inch + 6-inch) required, and bump the cone one size larger than the speed-band default.'),
      h('li', null, h('strong', null, 'Mixed:'), ' spec for the harder case (night). The daytime job will still be compliant.'),
    ),

    h('h2', null, 'Q3. What is the wind exposure?'),
    h(
      'p',
      null,
      'Wind is what knocks cones over and creates the most replacement cost. Three exposure tiers:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Sheltered (downtown, residential, parking-lot):'), ' 7-lb base is fine.'),
      h('li', null, h('strong', null, 'Open road (suburban, arterials):'), ' 10-lb base recommended.'),
      h('li', null, h('strong', null, 'Highway, bridge deck, exposed corridor:'), ' 12-lb base or use drums instead of cones on the windward side.'),
    ),
    h(
      'p',
      null,
      'A cone that blows over is worse than no cone — drivers see the missing channelization and may merge across what they think is empty space. Bias toward heavier bases for any work near live highway lanes.',
    ),

    h('h2', null, 'Q4. How long is the job?'),
    h(
      'p',
      null,
      'Job duration drives the material decision (PVC vs TPE rubber) and whether to even use cones for the whole zone:',
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
            h('th', { className: 'text-left p-2 border-b' }, 'Duration'),
            h('th', { className: 'text-left p-2 border-b' }, 'Recommendation'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Mobile / short-duration (<1 day)'), h('td', { className: 'p-2' }, 'PVC cones with crew on-site')),
          h('tr', null, h('td', { className: 'p-2' }, 'Short-term (1–3 days)'), h('td', { className: 'p-2' }, 'TPE rubber cones, 10-lb bases')),
          h('tr', null, h('td', { className: 'p-2' }, 'Intermediate (4–14 days)'), h('td', { className: 'p-2' }, 'TPE rubber cones + Type I/II barricades')),
          h('tr', null, h('td', { className: 'p-2' }, 'Long-term (>2 weeks)'), h('td', { className: 'p-2' }, 'Drums and barriers, cones only for taper')),
        ),
      ),
    ),

    h('h2', null, 'Q5. How many cones do you need?'),
    h(
      'p',
      null,
      'A rough sizing guide for the most common lane-closure scenarios on a 2-lane surface road:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '25 mph residential: '), '15–20 cones (short taper, short tangent).'),
      h('li', null, h('strong', null, '35 mph arterial: '), '25–35 cones.'),
      h('li', null, h('strong', null, '45 mph divided road: '), '40–55 cones plus 2 barricades.'),
      h('li', null, h('strong', null, '55+ mph highway: '), '60+ cones plus drums and a Type III barricade with legend board.'),
    ),
    h(
      'p',
      null,
      'For exact counts based on your specific lane geometry and posted speed, use our ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      '. It generates the MUTCD-spec taper length and cone interval for you.',
    ),

    h('h2', null, 'Putting it together: three example specs'),

    h('h3', null, 'Example A — Suburban NJ paving, 35 mph, day work'),
    h(
      'ul',
      null,
      h('li', null, 'Size: 28-inch'),
      h('li', null, 'Collar: single 6-inch Type IV'),
      h('li', null, 'Base: 7–10 lb'),
      h('li', null, 'Material: virgin PVC (job is short)'),
      h('li', null, 'Quantity: 30 cones + 2 cone bars'),
      h('li', null, 'Estimated cost: $450–550 delivered'),
    ),
    h('p', null, h('em', null, 'Budget alternate: '), 'recycled-PVC cones drop the per-unit price ~$3 but crack in winter; only use if the job is one-season.'),

    h('h3', null, 'Example B — Bridge deck repair, 55 mph, mixed day/night, 5 days'),
    h(
      'ul',
      null,
      h('li', null, 'Size: 36-inch'),
      h('li', null, 'Collar: double (4 + 6 in)'),
      h('li', null, 'Base: 12 lb'),
      h('li', null, 'Material: TPE rubber (will get clipped)'),
      h('li', null, 'Quantity: 60 cones, 8 cone-mount LEDs, 4 drums'),
      h('li', null, 'Estimated cost: $2,800–3,400 delivered'),
    ),
    h('p', null, h('em', null, 'Budget alternate: '), 'virgin PVC instead of TPE saves ~$10/cone but expect to replace 6–10 cones over the 5 days.'),

    h('h3', null, 'Example C — Residential utility cut, 25 mph, 4 hours'),
    h(
      'ul',
      null,
      h('li', null, 'Size: 18-inch (or 28-inch if you already own them)'),
      h('li', null, 'Collar: single 4-inch Type IV'),
      h('li', null, 'Base: 7 lb'),
      h('li', null, 'Material: PVC'),
      h('li', null, 'Quantity: 12 cones'),
      h('li', null, 'Estimated cost: $180–230 delivered'),
    ),
    h('p', null, h('em', null, 'Budget alternate: '), 'pull cones from your existing 28-inch stock; do not buy 18-inch as a one-off.'),

    h('h2', null, 'When cones alone are NOT enough'),
    h(
      'p',
      null,
      'Cones channelize but do not protect. If your job has any of the following, scale up to barriers:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Workers on foot within 10 ft of live traffic.'),
      h('li', null, 'Closure expected to last more than 2 weeks.'),
      h('li', null, 'High-speed corridor with a previous crash history.'),
      h('li', null, 'Crew handling utilities, excavation, or open trenches.'),
    ),
    h(
      'p',
      null,
      'Common scale-ups: ',
      h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'water-filled barriers'),
      ' for medium-duration, ',
      h('a', { href: '/blog/jersey-barriers-for-sale-near-me' }, 'concrete Jersey barriers'),
      ' for long-duration or crash-protected jobs.',
    ),

    h('h2', null, 'Where to order in NJ'),
    h(
      'p',
      null,
      'For Central NJ contractors we deliver all standard road construction cone configurations same-day for orders placed before noon. ',
      h('a', { href: '/quote' }, 'Submit a quote'),
      ' with your job address, posted speed, and duration and we will recommend the exact SKU mix. Or browse the ',
      h('a', { href: '/category/traffic-cones' }, 'full cone catalog'),
      ' if you already know what you want.',
    ),

    h('h2', null, 'Common mistakes to avoid'),
    h(
      'ol',
      null,
      h('li', null, 'Buying 18-inch cones because they are cheaper, then failing inspection on a 35-mph road.'),
      h('li', null, 'Skipping double-collar reflectivity, then getting written up the first night the job runs late.'),
      h('li', null, 'Going with 4-lb event bases on roadway work — cones blow over in the first wind gust.'),
      h('li', null, 'Buying just enough cones for one job. You will need 15–20% more by the end of season one.'),
      h('li', null, 'Using cones for physical protection. They are channelization devices, not barriers.'),
    ),
  ),
  faqs: [
    {
      q: 'What size road construction cones do most NJ contractors use?',
      a: '28-inch with a double reflective collar and a 10-lb base is the most-stocked SKU among small/mid Central NJ contractors. It covers most surface-street and arterial work up to 55 mph.',
    },
    {
      q: 'Are 18-inch road construction cones ever the right choice?',
      a: 'Only for sub-25-mph work and only during daylight. They have a legitimate use on residential utility cuts and parking-lot work, but they should not be the primary cone in your fleet.',
    },
    {
      q: 'What\'s the difference between road construction cones and regular orange cones?',
      a: 'Functionally none — the terms describe the same MUTCD device. "Road construction cones" emphasizes the roadway/work-zone application; "regular orange cones" is more colloquial. Same product, same specs.',
    },
    {
      q: 'How much should I budget for road construction cones for a new contracting business?',
      a: 'A practical starter inventory for a small NJ contractor runs $2,000–2,500 (50 × 28-in, 12 × 36-in, lights, bars, rack). Plan for 15–20% annual replacement on top.',
    },
    {
      q: 'Can I mix cone brands and still meet MUTCD?',
      a: 'Yes — the MUTCD specifies performance (height, color, reflectivity, base weight), not brand. As long as each individual cone meets spec, you can mix manufacturers. Just keep stripes and colors consistent within a single work zone for driver clarity.',
    },
    {
      q: 'Do I need a permit to set up road construction cones?',
      a: 'For municipal streets in NJ, yes — most towns require a road-occupancy or right-of-way permit before any travel-lane closure. Permit requirements are separate from the cone spec itself. Check with your local DPW or DOT regional office.',
    },
  ],
  relatedProducts: [
    { label: 'Road Construction Cones', path: '/category/traffic-cones' },
    { label: 'Traffic Drums & Channelizers', path: '/category/drums-channelizers' },
    { label: 'Cone Lights', path: '/category/cone-lights' },
    { label: 'Request a Job-Specific Quote', path: '/quote' },
  ],
  relatedArticles: [
    'road-cones-for-sale-buying-guide',
    'construction-cones-for-sale-pillar-guide',
    'how-many-cones-for-lane-closure-nj',
  ],
}
