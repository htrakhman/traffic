import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic barriers" (~5K/mo, High comp 100).
 * Secondary cluster: road barriers, water filled barriers, concrete barriers,
 *   plastic jersey barriers, road traffic barrier, safe barriers.
 * Format: pillar comparison piece across the four major barrier classes
 * (jersey, water-filled, plastic, steel guardrail) with a decision tree.
 */
export const articleTrafficBarriersTypesComparison: Article = {
  slug: 'traffic-barriers-types-comparison',
  title: 'Traffic Barriers Compared: Concrete, Plastic, Water-Filled, and Steel — Which One Belongs on Your Job?',
  excerpt:
    'Traffic barriers split into four practical classes: concrete jersey, plastic jersey, water-filled, and steel guardrail. The choice is driven by speed, deflection allowance, install time, and budget. Here is the decision tree most contractors actually use.',
  metaDescription:
    'Concrete jersey, plastic jersey, water-filled, and steel guardrail barriers compared on speed rating, deflection, install time, and cost. Decision tree for NJ contractors.',
  primaryKeyword: 'traffic barriers',
  secondaryKeywords: [
    'road barriers',
    'water filled barriers',
    'plastic jersey barriers',
    'concrete barriers for sale',
    'road traffic barrier',
    'safe barriers',
  ],
  targetVolume: 5000,
  datePublished: '2026-04-30',
  readMinutes: 10,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'Traffic barriers'),
      ' are vehicle-rated devices that physically prevent or redirect a vehicle from leaving its travel lane. They split into four practical classes: ',
      h('strong', null, 'concrete jersey barriers'),
      ' (the gray F-shape segments you see on highway projects), ',
      h('strong', null, 'plastic jersey barriers'),
      ' (orange or white polyethylene shells, ballast-filled), ',
      h('strong', null, 'water-filled barriers'),
      ' (interlocking plastic units filled on-site), and ',
      h('strong', null, 'steel guardrail / W-beam'),
      ' (permanent install). Choice is driven by speed rating, allowable deflection, install time, and budget. The short answer most contractors land on for short-duration NJ work is ',
      h('strong', null, 'water-filled or plastic jersey'),
      ' for fast install/teardown, and concrete for anything 30+ days or near freeway speeds.',
    ),

    h('h2', null, 'Why "traffic barrier" is its own category (not the same as a barricade)'),
    h(
      'p',
      null,
      'In the MUTCD\'s vocabulary, a ',
      h('em', null, 'barricade'),
      ' is a channelizing device — Type I, II, or III — that gives drivers a visual cue but is not designed to stop a vehicle. A ',
      h('em', null, 'barrier'),
      ' is crash-tested under MASH (Manual for Assessing Safety Hardware) or its predecessor NCHRP 350. If a vehicle hits a Type III barricade at 35 mph, the barricade folds. If it hits a properly anchored concrete jersey barrier, the vehicle redirects. That distinction is the whole game.',
    ),
    h(
      'p',
      null,
      'For comparison on the channelizer side, see our ',
      h('a', { href: '/blog/type-iii-barricade-vs-type-i-type-ii' }, 'Type III barricade guide'),
      ' — channelizers are typically far cheaper and faster to deploy, but they are not barriers.',
    ),

    h('h2', null, 'The four classes at a glance'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Typical speed rating'),
            h('th', { className: 'text-left p-2 border-b' }, 'Weight per 10-ft section'),
            h('th', { className: 'text-left p-2 border-b' }, 'Install crew'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best for'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Concrete jersey'), h('td', { className: 'p-2' }, 'TL-3 / TL-4 (62 mph)'), h('td', { className: 'p-2' }, '~4,000 lb'), h('td', { className: 'p-2' }, 'Crane + 2 people'), h('td', { className: 'p-2' }, '30+ day projects, freeway-speed')),
          h('tr', null, h('td', { className: 'p-2' }, 'Plastic jersey (ballasted)'), h('td', { className: 'p-2' }, 'TL-1 / TL-2 (45 mph)'), h('td', { className: 'p-2' }, '50 lb empty / ~600 lb filled'), h('td', { className: 'p-2' }, '2 people, no crane'), h('td', { className: 'p-2' }, 'Short / medium duration up to 45 mph')),
          h('tr', null, h('td', { className: 'p-2' }, 'Water-filled'), h('td', { className: 'p-2' }, 'TL-1 / TL-2 (45 mph)'), h('td', { className: 'p-2' }, '60 lb empty / ~1,200 lb filled'), h('td', { className: 'p-2' }, '2 people, hose'), h('td', { className: 'p-2' }, 'Fast deploy, good visibility')),
          h('tr', null, h('td', { className: 'p-2' }, 'Steel W-beam guardrail'), h('td', { className: 'p-2' }, 'TL-3 (62 mph)'), h('td', { className: 'p-2' }, 'Permanent install'), h('td', { className: 'p-2' }, 'Posthole crew + auger'), h('td', { className: 'p-2' }, 'Permanent roadside install only')),
        ),
      ),
    ),

    h('h2', null, 'Concrete jersey barriers — the highway default'),
    h(
      'p',
      null,
      'The 32-inch-tall F-shape concrete segment, typically 10 ft long and weighing about 4,000 lbs. They link together with a steel pin at the top. Speed-rated TL-3 (62 mph impact, 4,400-lb passenger car) and TL-4 (62 mph, 22,000-lb single-unit truck) when installed per spec. You see them on every long-duration highway project in NJ — the I-95 and Turnpike work zones, NJDOT freeway resurfacing, and bridge approaches.',
    ),
    h(
      'p',
      null,
      'Trade-offs: heavy (need a crane or boom truck to set), expensive to move, and they take up real lane footprint. For projects under 30 days, the install + teardown cost is hard to justify. For 60-day or 6-month projects, they pay for themselves in protection and longevity. Buy used from municipal surplus auctions if budget is tight — they last 30+ years.',
    ),

    h('h2', null, 'Plastic jersey barriers — the contractor workhorse'),
    h(
      'p',
      null,
      'Polyethylene shells molded in the same F-shape profile as concrete, ballasted with sand or water. Empty weight is 50–80 lbs (one-person carry); filled, they hit 600–800 lbs. Typical color is high-vis orange or yellow with reflective stripes. Crash-rated TL-1 / TL-2 (30–45 mph) when properly anchored and ballasted. They link with internal pins or external lugs.',
    ),
    h(
      'p',
      null,
      'Where they win: install time. A two-person crew can set 200 ft of plastic jersey in under an hour with no crane. Teardown is fast too — drain or empty, then forklift them onto a flatbed. They are the right call for 1–14 day projects on roads up to 45 mph and for any work zone where you need barrier protection but cannot wait for a crane.',
    ),
    h(
      'p',
      null,
      'For more on plastic jersey use cases, see our ',
      h('a', { href: '/blog/jersey-barricades-guide' }, 'jersey barricade guide'),
      '.',
    ),

    h('h2', null, 'Water-filled barriers — fastest deploy'),
    h(
      'p',
      null,
      'Interlocking plastic units (Triton, Ironman, Yodock-style) you fill with water on-site. The water gives them mass; the interlocking creates a continuous beam that absorbs and redirects impact. Crash-rated TL-1 / TL-2. They are the standard for short-duration utility work, parade routes, and outdoor events that need a vehicle-rated perimeter (anti-vehicle protection at concerts, large public gatherings, etc.).',
    ),
    h(
      'p',
      null,
      'Trade-off: in freezing weather you cannot leave them filled with plain water — they crack. Use propylene glycol antifreeze mix or drain them before a freeze. Also, when you need to relocate them mid-job, you have to drain and re-fill, which takes time. For NJ winter work, this is a real consideration.',
    ),

    h('h2', null, 'Steel guardrail and W-beam — permanent only'),
    h(
      'p',
      null,
      'The corrugated W-shape steel beam mounted on wood or steel posts you see on the shoulder of every NJ highway. TL-3 rated. Install is a posthole/auger operation — these are not portable barriers and not what you want for a 2-week work zone. We mention them only because the keyword "road barriers" pulls them in, and contractors sometimes confuse permanent guardrail with portable barrier rental.',
    ),

    h('h2', null, 'Decision tree: what to buy or rent'),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'Project duration < 14 days, posted speed ≤ 45 mph?'), ' → Plastic jersey or water-filled. Fast install/teardown is the win.'),
      h('li', null, h('strong', null, 'Project duration 14–60 days, ≤ 45 mph?'), ' → Plastic jersey if you can ballast properly. Concrete if the budget supports the crane cost.'),
      h('li', null, h('strong', null, 'Project duration 60+ days, any speed?'), ' → Concrete jersey. The install cost amortizes; the protection level is best in class.'),
      h('li', null, h('strong', null, 'Posted speed > 45 mph regardless of duration?'), ' → Concrete jersey or steel guardrail (if permanent). Plastic and water-filled are not rated above 45 mph in most agency standards.'),
      h('li', null, h('strong', null, 'Need to redirect or move barriers mid-job?'), ' → Plastic jersey beats water-filled (faster, no draining).'),
      h('li', null, h('strong', null, 'Winter NJ work, sub-freezing temps?'), ' → Plastic jersey with sand ballast, or concrete. Avoid water-filled unless you commit to antifreeze.'),
    ),

    h('h2', null, 'Pricing — Apr 2026 ballpark'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Concrete jersey, 10 ft used:'), ' $250–$450 per section delivered. New: $700–$1,100 per section.'),
      h('li', null, h('strong', null, 'Plastic jersey, 6–10 ft new:'), ' $250–$650 per section depending on length and reflective sheeting.'),
      h('li', null, h('strong', null, 'Water-filled, 6 ft new:'), ' $200–$500 per section.'),
      h('li', null, h('strong', null, 'Steel guardrail W-beam:'), ' $35–$60 per linear foot for materials; install adds $20–$40/ft.'),
    ),
    h(
      'p',
      null,
      'For most NJ contractors getting started on portable barriers, the first inventory buy is a set of 8–12 plastic jersey sections (covers a typical 100-ft work zone) plus a flatbed-load of cones and Type III barricades for the channelizing work upstream and downstream of the barrier line.',
    ),

    h('h2', null, 'Where to buy traffic barriers in NJ'),
    h(
      'p',
      null,
      'For Central NJ contractors, ',
      h('a', { href: '/category/barricades-barriers' }, 'browse our barricades and barriers catalog'),
      ' — we stock plastic jersey and water-filled barriers with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon counties. Concrete jersey segments available on flatbed delivery with crane assist (lead time 1–2 days). Need help spec\'ing the right barrier class for a specific work zone? ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' — describe the duration, posted speed, and project geometry, and we will spec the barrier class plus the upstream taper that gets you MUTCD-compliant.',
    ),
  ),
  faqs: [
    {
      q: 'What is the difference between a traffic barrier and a barricade?',
      a: 'A traffic barrier is crash-tested (MASH or NCHRP 350) and designed to stop or redirect a vehicle. A barricade is a channelizing device (Type I, II, or III) that gives drivers a visual cue but is not designed to stop a vehicle. Concrete jersey, plastic jersey, water-filled, and steel guardrail are barriers. Type III barricades and traffic cones are not.',
    },
    {
      q: 'How fast can a vehicle hit a plastic jersey barrier?',
      a: 'Plastic jersey barriers are typically rated TL-1 (30 mph) or TL-2 (45 mph) under MASH. Above 45 mph, you need concrete jersey (TL-3 / TL-4) or steel guardrail. The rating depends on proper ballast (sand or water filling) and proper anchoring per the manufacturer\'s deployment guide.',
    },
    {
      q: 'Can water-filled barriers be left out in winter?',
      a: 'Not with plain water — they crack when the water freezes and expands. Either drain them before sub-freezing temps, fill them with a propylene glycol antifreeze mix, or switch to plastic jersey with sand ballast for winter NJ work.',
    },
    {
      q: 'How much does it cost to buy concrete jersey barriers?',
      a: 'New 10-ft concrete jersey segments run $700–$1,100 each delivered. Used segments from municipal surplus or auction can be found for $250–$450. Add crane time ($150–$250/hr in NJ) for any move beyond initial delivery. For projects under 30 days, the install/teardown cost usually outweighs the protection upgrade vs plastic jersey.',
    },
    {
      q: 'Do I need traffic barriers or are barricades enough?',
      a: 'If a vehicle leaving the lane could hit a worker, the public, or a hazard (drop-off, excavation, opposing traffic), you need barriers. If the work is short-duration, low-speed (≤ 35 mph), and the buffer space gives drivers time to recover, channelizers (Type III barricades + cones) are typically what the MUTCD requires. The decision is driven by speed, exposure time, and what is on the other side of the barrier line.',
    },
    {
      q: 'What does TL-3 mean for a barrier?',
      a: 'TL-3 is the MASH (Manual for Assessing Safety Hardware) Test Level 3 rating: the barrier passed crash tests at 62 mph with a 4,400-lb passenger car and a 5,000-lb pickup. TL-4 adds a 22,000-lb single-unit truck. TL-1 is 30 mph; TL-2 is 45 mph. NJDOT specs typically require TL-3 on freeways and TL-2 on most arterials.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Pedestrian & Crowd Control', path: '/category/pedestrian-control' },
  ],
  relatedArticles: [
    'jersey-barricades-guide',
    'type-iii-barricade-vs-type-i-type-ii',
    'barricades-types-uses-guide',
  ],
}
