import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "water filled jersey barriers" (~500/mo, High comp, $31.13 bid).
 * Pillar guide: where they fit between concrete and plastic, ballast math,
 * impact rating, deployment, and what NJ contractors should buy.
 */
export const articleWaterFilledJerseyBarriersGuide: Article = {
  slug: 'water-filled-jersey-barriers-guide',
  title: 'Water-Filled Jersey Barriers: Ballast, Crash Rating, and When to Use Them',
  excerpt:
    'A water-filled jersey barrier is a hollow polyethylene unit shaped like a concrete jersey wall — empty it weighs 80–150 lb and one person can drag it; filled with water it pushes 1,500–2,000 lb and stops a passenger car at 45 mph. Here is when the trade-off makes sense.',
  metaDescription:
    'Water-filled jersey barriers explained — fill weight, MASH/TL ratings, deployment time, and how they compare to concrete and plastic alternatives for NJ work zones.',
  primaryKeyword: 'water filled jersey barriers',
  secondaryKeywords: [
    'water filled barricades',
    'water filled traffic barriers',
    'water filled road barriers',
    'plastic jersey barriers',
    'water ballast barriers',
    'temporary jersey barriers',
  ],
  targetVolume: 500,
  datePublished: '2026-05-17',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A water-filled jersey barrier is a hollow polyethylene unit molded in the classic jersey wall profile — sloped face, flat top, about 32 inches tall and 6 feet long. Empty it weighs 80–150 lb and one worker can move it; filled, each unit holds 50–65 gallons of water, putting working weight at 1,500–2,000 lb. ',
      h('strong', null, 'The reason crews choose them over concrete: deployment time. A 100-ft run goes up in 45 minutes with a single pickup truck and a hydrant tap; the same run in concrete needs a flatbed, a boom truck, and 4 hours.'),
      ' This guide covers ballast math, crash ratings, where they fit in the closure ladder, and what to buy.',
    ),

    h('h2', null, 'What a water-filled jersey barrier actually is'),
    h(
      'p',
      null,
      'The unit is rotationally molded high-density polyethylene (HDPE) with UV stabilizers, traffic-orange or white in color, with internal baffles that limit water sloshing on impact. Each end has a male/female coupling that mates with the next barrier — pin-locked, T-locked, or interlocking flange depending on the manufacturer. End caps and reflective sheeting sell as separate accessories.',
    ),
    h(
      'p',
      null,
      'The classic jersey shape is structural, not cosmetic. A vehicle striking the sloped lower face is redirected upward and back into its lane — the same vault-back mechanism that makes concrete jersey walls effective. With water inside, the polyethylene unit reproduces that geometry at roughly 25% of the cost per linear foot.',
    ),

    h('h2', null, 'Ballast and weight math'),
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
            { className: 'border-b' },
            h('th', { className: 'text-left p-2' }, 'Spec'),
            h('th', { className: 'text-left p-2' }, '4-ft unit'),
            h('th', { className: 'text-left p-2' }, '6-ft unit (standard)'),
            h('th', { className: 'text-left p-2' }, '6-ft heavy'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Empty weight'),
            h('td', { className: 'p-2' }, '55–75 lb'),
            h('td', { className: 'p-2' }, '85–120 lb'),
            h('td', { className: 'p-2' }, '130–160 lb'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Water capacity'),
            h('td', { className: 'p-2' }, '~32 gal'),
            h('td', { className: 'p-2' }, '50–65 gal'),
            h('td', { className: 'p-2' }, '75–100 gal'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Filled weight'),
            h('td', { className: 'p-2' }, '~330 lb'),
            h('td', { className: 'p-2' }, '500–660 lb'),
            h('td', { className: 'p-2' }, '760–1,000 lb'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Height'),
            h('td', { className: 'p-2' }, '28–32"'),
            h('td', { className: 'p-2' }, '32–36"'),
            h('td', { className: 'p-2' }, '36–42"'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Typical use'),
            h('td', { className: 'p-2' }, 'Pedestrian channelizing'),
            h('td', { className: 'p-2' }, 'Lane closure ≤ 45 mph'),
            h('td', { className: 'p-2' }, 'Median, ≤ 55 mph'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Water weighs 8.34 lb/gal. So a 60-gallon fill adds 500 lb to a 100 lb empty unit, putting working weight at 600 lb. A connected 100-ft run (16 standard units) lands at roughly 9,600 lb — heavy enough to deflect a passenger car at low speed but lighter than the 12,000+ lb per 100 ft of comparable concrete.',
    ),

    h('h2', null, 'Crash ratings — read the test level, not the marketing'),
    h(
      'p',
      null,
      'Crashworthy temporary barriers are rated under either the older NCHRP 350 or the current MASH (Manual for Assessing Safety Hardware) standard. Test levels are what matter for spec compliance:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'TL-1 '), '— 30 mph passenger car. Pedestrian work, parking lots, low-speed channelizing.'),
      h('li', null, h('strong', null, 'TL-2 '), '— 45 mph passenger car + pickup. Most contractor lane-closure work on collector/arterial streets.'),
      h('li', null, h('strong', null, 'TL-3 '), '— 62 mph passenger car + pickup. Highway and state-route work zones.'),
      h('li', null, h('strong', null, 'TL-4/5/6 '), '— Single-unit truck through tractor-tanker. Concrete barrier territory; water-filled units do NOT reach these levels.'),
    ),
    h(
      'p',
      null,
      'Most water-filled jersey barriers on the market are crash-rated TL-1 or TL-2. A few engineered designs (Yodock 2001MB, Triton CC, Barrier Systems Roadbloc) hit TL-3 when deployed in specific configurations (pinned, anchored, or in multi-row arrays). ',
      h('strong', null, 'If a job spec calls for TL-3, do not assume any water-filled unit qualifies — confirm the model, the connection method, and the orientation on the manufacturer\'s crash test report.'),
    ),

    h('h2', null, 'Where they fit in the closure ladder'),
    h(
      'p',
      null,
      'Pick by speed and duration. Roughly:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Cones / drums '), '— 25–55 mph, channelizing only, no positive protection. Cheapest and fastest.'),
      h('li', null, h('strong', null, 'Type II / Type III barricades '), '— 0–35 mph, road closures and pedestrian barriers, no impact rating.'),
      h('li', null, h('strong', null, 'Water-filled jersey '), '— 25–55 mph, lane closures with positive separation, fast to deploy, fast to remove. Sweet spot: 1-day to 30-day closures.'),
      h('li', null, h('strong', null, 'Concrete jersey '), '— 0–70+ mph, permanent or long-duration positive protection. Slow to deploy, requires equipment, but TL-3/TL-4 rated and outlasts the project.'),
      h('li', null, h('strong', null, 'Steel guardrail / TMA '), '— 55+ mph, point hazards, work-vehicle protection.'),
    ),

    h('h2', null, 'Deployment workflow'),
    h(
      'p',
      null,
      'A 4-person crew can deploy 100 ft of water-filled barrier in 45 minutes:',
    ),
    h(
      'ul',
      null,
      h('li', null, '5 min — drop empty units along the planned line (one person on the truck, three positioning).'),
      h('li', null, '15 min — connect each end coupling, drop the locking pin.'),
      h('li', null, '20 min — fill each unit with hydrant or 2-inch pump. Average fill time is 60–90 seconds per unit at 25 gpm.'),
      h('li', null, '5 min — install reflective sheeting / end treatments / signage.'),
    ),
    h(
      'p',
      null,
      'For removal, reverse the order — drain valves on the bottom of each unit empty in 60 seconds with no pump. Empty units stack 4–5 high on a standard 8-ft truck bed.',
    ),

    h('h2', null, 'Cost comparison vs the alternatives'),
    h(
      'p',
      null,
      'Rough math per 100 linear feet (Central NJ, 2026):',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Water-filled jersey: '), '~$2,800–$4,200 to buy (16 units × $175–$260). Reusable across hundreds of jobs.'),
      h('li', null, h('strong', null, 'Plastic jersey barriers (no water): '), '~$1,500–$2,500 to buy, but no positive impact protection — they are channelizers, not barriers.'),
      h('li', null, h('strong', null, 'Concrete jersey: '), '~$3,500–$5,500 for 10 ft sections + delivery/crane. Best for permanent or 6+ month installs.'),
      h('li', null, h('strong', null, 'Steel guardrail (rented): '), 'TMA-mounted, day-rate-based — only used for highest-speed point work.'),
    ),
    h(
      'p',
      null,
      'For a contractor doing 4+ medium-duration closures per year, owning a 100-ft water-filled set pays back in 12–18 months vs renting equivalent capacity each time.',
    ),

    h('h2', null, 'Common buying mistakes'),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Buying empty plastic jerseys and calling them barriers: '),
        'an unfilled jersey-shape unit is a channelizer, not a barrier. It will not stop a vehicle and will not pass any crash test. If the job spec says "barrier," it means filled and crash-rated.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Mixing manufacturers in one run: '),
        'couplings do not interchange between brands. A Yodock will not lock to a Triton. Buy a full run from one manufacturer or accept gaps in the line.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Underfilling for "easier handling": '),
        'a half-filled unit is more dangerous than empty — it sloshes and walks under impact. Either fill to the line or leave empty for transport.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Skipping the end treatment: '),
        'a blunt-end run is a point hazard. Use a fish-tail end unit or anchor the leading 20 ft per the manufacturer guide.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Storing filled units in freezing weather: '),
        'water expands when it freezes. Drain in advance of any sub-30°F overnight. Some operators run a 25% propylene glycol mix for winter work — check the manufacturer guide before using anything but water.',
      ),
    ),

    h('h2', null, 'Where to buy water-filled jersey barriers in NJ'),
    h(
      'p',
      null,
      'We stock 4-ft and 6-ft water-filled jersey barriers in standard and heavy configurations, with same-day Central NJ delivery. Browse the ',
      h('a', { href: '/category/barricades-barriers' }, 'barricades and barriers category'),
      ' for individual units, or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' for a full kit sized to your closure length and speed. Not sure if water-filled is the right tier? Our ',
      h('a', { href: '/assistant' }, 'Assistant'),
      ' walks through speed, duration, and traffic volume to recommend cones, plastic, water-filled, or concrete.',
    ),
    h(
      'p',
      null,
      'Related reading: ',
      h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'water-filled barriers buying guide'),
      ', ',
      h('a', { href: '/blog/plastic-jersey-barriers-vs-concrete' }, 'plastic vs concrete jersey barriers'),
      ', and ',
      h('a', { href: '/blog/jersey-barriers-for-sale-near-me' }, 'jersey barriers for sale near me'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'How much does a water-filled jersey barrier weigh when full?',
      a: 'A standard 6-ft unit holds 50–65 gallons of water and weighs 500–660 lb filled. Heavy 6-ft units hold 75–100 gal and reach 760–1,000 lb. Empty handling weight is 85–160 lb depending on size — one worker can drag any of them empty.',
    },
    {
      q: 'Are water-filled jersey barriers crashworthy?',
      a: 'Most are crash-tested to MASH Test Level 1 (30 mph) or TL-2 (45 mph). A few engineered models reach TL-3 (62 mph) when pinned, anchored, or installed in multi-row arrays. Always check the specific model on the manufacturer\'s crash test report before specifying for high-speed work.',
    },
    {
      q: 'What is the difference between water-filled jersey barriers and concrete jersey barriers?',
      a: 'Same profile, different material. Concrete reaches TL-3 and TL-4 out of the box and is permanent or long-duration. Water-filled is plastic with water ballast, tops out at TL-3 in special configurations, but deploys in 45 minutes vs 4 hours and costs ~25% less per linear foot.',
    },
    {
      q: 'How fast can a crew set up 100 feet of water-filled barrier?',
      a: 'About 45 minutes with a 4-person crew and a hydrant or 2-inch pump. Drop 5 min, connect 15 min, fill 20 min, signage 5 min. Removal is faster — drain valves empty each unit in 60 seconds and a pickup truck hauls 25–30 empty units.',
    },
    {
      q: 'Can I use a water-filled jersey barrier on a highway?',
      a: 'Only if the specific model is rated TL-3 under MASH and the job spec accepts it. Most state DOTs require concrete or steel for 55+ mph long-duration work. Water-filled units are common on shoulder closures, ramp work, and 35–45 mph arterial closures, less common on mainline interstate.',
    },
    {
      q: 'Do water-filled barriers freeze in winter?',
      a: 'Yes — water expands when it freezes and can crack the polyethylene shell or burst the drain valve. Drain units before any sub-30°F overnight. A few manufacturers approve a 25% propylene glycol mix for sustained winter work, but check the manual before adding anything to the water.',
    },
    {
      q: 'How many water-filled jersey barriers do I need for a typical lane closure?',
      a: 'Standard 6-ft units, 16 per 100 linear feet. A typical short-duration single-lane closure (taper plus buffer plus work zone) runs 300–500 ft, so 50–80 units. For longer closures, add 1 unit per 20 ft of length plus a fish-tail end on each end.',
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
    'plastic-jersey-barriers-vs-concrete',
    'jersey-barriers-for-sale-near-me',
  ],
}
