import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "plastic traffic barriers" (~500/mo, High comp, $13.26 bid).
 * Commercial comparison piece: stacks plastic against concrete, steel,
 * and water-filled options on price, deploy speed, and crash rating.
 */
export const articlePlasticTrafficBarriersGuide: Article = {
  slug: 'plastic-traffic-barriers-guide',
  title: 'Plastic Traffic Barriers: When They Beat Concrete (and When They Do Not)',
  excerpt:
    'Plastic traffic barriers cost a third of what concrete does and a single contractor can deploy 100 ft in an hour. But they fail in two specific scenarios that catch buyers off guard. Here is the side-by-side and the buy guide.',
  metaDescription:
    'Plastic traffic barriers compared head-to-head against concrete, steel, and water-filled barriers — cost, deploy speed, MASH/NCHRP crash rating, and the right pick by job type.',
  primaryKeyword: 'plastic traffic barriers',
  secondaryKeywords: [
    'plastic road barriers',
    'plastic crowd control barriers',
    'plastic jersey barriers',
    'plastic safety barriers',
    'plastic barrier vs concrete',
    'water filled plastic barriers',
  ],
  targetVolume: 500,
  datePublished: '2026-05-11',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Plastic traffic barriers are the fastest way to close a lane, route a detour, or protect a work zone without renting a crane. ',
      h('strong', null, 'A single contractor can deploy 100 linear feet of plastic barrier in 45–60 minutes; the same length in concrete needs a crane, a truck, and half a day.'),
      ' The trade-off: plastic does not stop a 60 mph passenger car. Whether it is the right pick comes down to two questions — what speed is the road, and does the engineer want positive protection. Here is the working comparison.',
    ),

    h('h2', null, 'Plastic vs. concrete vs. steel — the numbers'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Material'),
            h('th', { className: 'text-left p-2 border-b' }, 'Weight per 6 ft'),
            h('th', { className: 'text-left p-2 border-b' }, 'Cost / 6 ft section'),
            h('th', { className: 'text-left p-2 border-b' }, 'Crash rating'),
            h('th', { className: 'text-left p-2 border-b' }, 'Deploy method'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Plastic (empty)'), h('td', { className: 'p-2' }, '70–90 lb'), h('td', { className: 'p-2' }, '$140–$220'), h('td', { className: 'p-2' }, 'Channelizing only'), h('td', { className: 'p-2' }, 'One person, pickup')),
          h('tr', null, h('td', { className: 'p-2' }, 'Plastic (water-filled)'), h('td', { className: 'p-2' }, '500–700 lb'), h('td', { className: 'p-2' }, '$200–$320'), h('td', { className: 'p-2' }, 'MASH TL-2 (45 mph)'), h('td', { className: 'p-2' }, 'One person + hose')),
          h('tr', null, h('td', { className: 'p-2' }, 'Steel'), h('td', { className: 'p-2' }, '300–450 lb'), h('td', { className: 'p-2' }, '$450–$900'), h('td', { className: 'p-2' }, 'MASH TL-2/TL-3'), h('td', { className: 'p-2' }, 'Two-person lift / forklift')),
          h('tr', null, h('td', { className: 'p-2' }, 'Concrete (jersey)'), h('td', { className: 'p-2' }, '4,000–6,000 lb'), h('td', { className: 'p-2' }, '$300–$650'), h('td', { className: 'p-2' }, 'MASH TL-3/TL-4 (60+ mph)'), h('td', { className: 'p-2' }, 'Crane / boom truck')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Plastic empty is the cheapest and fastest. Plastic water-filled is the cheapest crashworthy option. Concrete is the only choice when you need TL-3 or TL-4 protection (interstate work, 60+ mph). Steel sits in the middle and is mostly chosen for permanent fixed installations.',
    ),

    h('h2', null, 'The two scenarios where plastic is the wrong call'),
    h('h3', null, '1. Posted speed above 45 mph'),
    h(
      'p',
      null,
      'Plastic water-filled barriers are crash-tested to MASH TL-2, which corresponds to a passenger car at 45 mph and a pickup at 45 mph. Above that speed the barrier may redirect a small car, but the standard NJDOT and FHWA spec on a 55+ mph roadway is TL-3 — and only concrete and certain steel barriers carry that rating. If your TCP says "positive protection on a 55 mph route," plastic will not pass review.',
    ),
    h('h3', null, '2. The engineer specified positive protection AND you skip filling'),
    h(
      'p',
      null,
      'An empty plastic barrier is a 70-lb channelizing device. Fill it with 50–60 gallons of water and it becomes a 500-lb crashworthy unit. The most common audit failure on plastic barriers is empty units left on site as "visual barricades" without water. Inspectors fail those setups on the first walk-through. Fill them or pull them.',
    ),

    h('h2', null, 'When plastic is the right pick'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Short-duration urban closures (1–7 days).'), ' Sewer-line work, gas-utility cuts, small paving jobs. The deploy and pickup speed dominates the cost equation.'),
      h('li', null, h('strong', null, 'Pedestrian channelization at events.'), ' Marathons, parades, festivals. Bright orange or white plastic interlocks into long runs and stores flat.'),
      h('li', null, h('strong', null, 'Construction site perimeters (no vehicle exposure).'), ' Where there is no errant-driver risk, plastic barriers do the same job as concrete at a quarter of the cost.'),
      h('li', null, h('strong', null, 'Median splits on slow access roads.'), ' Subdivision streets, parking-lot conversions, drive-through routing.'),
    ),

    h('h2', null, 'Plastic barrier subtypes — picking among them'),
    h('h3', null, 'Water-filled (Jersey-style)'),
    h(
      'p',
      null,
      'The most common plastic traffic barrier. HDPE shell, 6 ft long, ~32 in tall, with a fill cap on top and a drain on the bottom. Linkable end-to-end with a steel pin or molded interlock. This is the "plastic jersey barrier" most contractors mean when they ask about plastic barriers. See our ',
      h('a', { href: '/blog/plastic-jersey-barriers-vs-concrete' }, 'plastic jersey vs. concrete deep dive'),
      ' for the full comparison.',
    ),
    h('h3', null, 'Low-profile plowable'),
    h(
      'p',
      null,
      'Shorter (16–24 in) plastic barriers designed so a snowplow can blade past without catching. NJ contractors working through winter pick these up specifically to avoid mid-season barrier damage. Lower profile means lower crashworthiness — most are channelizing-only.',
    ),
    h('h3', null, 'Pedestrian / crowd-control'),
    h(
      'p',
      null,
      'Smaller plastic units (3–4 ft tall, 4 ft long) designed for foot traffic, not vehicles. Used in event work and store-front queue management. Do not confuse them with traffic barriers — they fail crash testing on any roadway and will not pass a TCP review.',
    ),
    h('h3', null, 'Heavy-duty industrial'),
    h(
      'p',
      null,
      'Some manufacturers (Yodock, Triton, Defender) make heavier plastic units (~100 lb empty, 800+ lb filled) that carry MASH TL-2 ratings with additional steel reinforcement options for TL-3 work. Cost is closer to steel but deploy speed stays plastic-fast.',
    ),

    h('h2', null, 'What a plastic-barrier kit actually costs to build'),
    h(
      'p',
      null,
      'For a small NJ contractor outfitting a 100 ft work-zone setup:',
    ),
    h(
      'ul',
      null,
      h('li', null, '17× 6-ft plastic water-filled barriers (~102 ft of coverage): $3,400–$5,400'),
      h('li', null, '20× linking pins or hardware: $80–$150'),
      h('li', null, '4× reflective end-treatment panels: $200–$400'),
      h('li', null, '1× transfer pump or hydrant fitting: $150–$350'),
    ),
    h(
      'p',
      null,
      'Working cost: ~$3,800–$6,300 for a full reusable kit. The same coverage in concrete jersey is ~$6,000–$11,000 PLUS the crane / boom-truck rental every time you move it. ',
      h('a', { href: '/category/barricades-barriers' }, 'Browse plastic barriers in our catalog'),
      ' or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with your job specs.',
    ),

    h('h2', null, 'Rental vs. purchase for plastic barriers'),
    h(
      'p',
      null,
      'For occasional use (under ~20 deploy-days a year), renting wins — daily rates run $8–$15 per 6-ft unit and you skip storage and transport. Above 20 days a year, buying pays back in roughly one season. Our ',
      h('a', { href: '/blog/rent-vs-buy-traffic-control-equipment' }, 'rent vs. buy guide'),
      ' has the breakeven math. For one-time jobs or peak-season overflow, ',
      h('a', { href: '/blog/portable-traffic-barrier-rental-guide' }, 'see our portable barrier rental guide'),
      '.',
    ),

    h('h2', null, 'AI-assisted spec — let the assistant size your kit'),
    h(
      'p',
      null,
      'For NJ contractors who want a quick sanity-check on barrier count and type, our ',
      h('a', { href: '/assistant' }, 'work-zone assistant'),
      ' will take a job description (road class, speed, duration) and return a recommended barrier mix with a rough cost. The ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' will lay it out to MUTCD spec on a satellite view of the site.',
    ),
  ),
  faqs: [
    {
      q: 'Are plastic traffic barriers MUTCD-compliant?',
      a: 'Yes. The MUTCD does not specify a material for traffic barriers — it specifies performance (reflectivity, shape, crashworthiness rating). Plastic water-filled barriers that carry MASH TL-2 certification meet MUTCD requirements for any roadway up to 45 mph posted speed.',
    },
    {
      q: 'Will a plastic barrier stop a car?',
      a: 'A filled plastic water barrier (MASH TL-2 rated) will redirect a passenger car at up to 45 mph. Above 45 mph, the standard spec is concrete or TL-3 steel. An empty plastic barrier will not redirect anything — it acts as a visual channelizer only.',
    },
    {
      q: 'How long does it take to deploy a plastic barrier wall?',
      a: 'A single contractor can deploy and link 100 ft (about 17 units) of plastic water-filled barrier in 45–60 minutes, plus fill time (15–20 minutes with a hydrant or transfer pump). Concrete jersey barriers of equivalent length take 3–5 hours plus crane setup.',
    },
    {
      q: 'How much does a plastic traffic barrier cost?',
      a: '6-ft water-filled plastic barriers run $140–$320 retail per section depending on weight, brand, and crash rating. Empty channelizing-only plastic barriers run $70–$150. Linking pins and end-treatment panels are $5–$25 each.',
    },
    {
      q: 'Can I leave plastic barriers empty if I just need a visual?',
      a: 'You can, but inspectors will flag them on any roadway that has a positive-protection requirement. An empty plastic barrier passes only when the TCP calls for channelization (not protection) — for example, a closed sidewalk next to a closed lane that is already barricaded by other means.',
    },
    {
      q: 'Do plastic barriers fade in the sun?',
      a: 'HDPE with UV stabilizer (standard for traffic-grade plastic barriers) holds color for 5–7 years before noticeable fade. Reflective sheeting on the end-treatment panels fades faster — plan to replace sheeting every 2–3 years for high-use units.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Plastic Water-Filled Barriers', path: '/category/barricades-barriers' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Get a job-sized barrier quote', path: '/quote' },
  ],
  relatedArticles: [
    'plastic-jersey-barriers-vs-concrete',
    'water-filled-barriers-buying-guide',
    'low-profile-barricades-guide',
  ],
}
