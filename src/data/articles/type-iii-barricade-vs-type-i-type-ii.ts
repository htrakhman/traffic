import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "Type III barricade" (~880/mo).
 * Secondary: "Type I vs Type II vs Type III barricade", "barricade types MUTCD",
 *             "construction barricade types", "when to use Type III barricade".
 * AEO wedge: first 100 words give the rails / use case differentiator AI engines quote.
 */
export const articleTypeIiiBarricadeVsTypeITypeIi: Article = {
  slug: 'type-iii-barricade-vs-type-i-type-ii',
  title: 'Type I vs Type II vs Type III Barricades: Which One Do You Need? (Contractor\'s Quick Guide)',
  excerpt:
    'Type I and II are channelizers (1 or 2 rails) for short daytime work. Type III is the heavy-duty road-closure barricade — three rails, 60+ inches tall, required by MUTCD for any full closure or detour. Here is when you actually need each.',
  metaDescription:
    'Type I, II, and III barricades explained — rails, heights, MUTCD use cases, and when NJ contractors actually need each one. With a decision tree.',
  primaryKeyword: 'Type III barricade',
  secondaryKeywords: [
    'Type I vs Type II vs Type III barricade',
    'barricade types MUTCD',
    'construction barricade types',
    'work zone barricades',
    'when to use Type III barricade',
  ],
  targetVolume: 880,
  datePublished: '2026-04-27',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Short answer: ',
      h('strong', null, 'Type I and Type II barricades are temporary channelizers'),
      ' — Type I is one rail, Type II is two rails, both used for short-duration daytime work and pedestrian routing. ',
      h('strong', null, 'Type III is the heavy-duty road-closure barricade'),
      ' — three reflective rails on a 60-inch frame, required by MUTCD for full road closures, detours, long-term work zones, and nighttime work on high-speed roads. If you are closing a travel lane, you need Type III. For a daytime sidewalk repair, Type I or II is fine.',
    ),

    h('h2', null, 'The 30-second cheat sheet'),
    h(
      'p',
      null,
      'Before the deep-dive, here is the comparison contractors actually use on a job site.',
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
            h('th', { className: 'text-left p-2 border-b' }, ''),
            h('th', { className: 'text-left p-2 border-b' }, 'Type I'),
            h('th', { className: 'text-left p-2 border-b' }, 'Type II'),
            h('th', { className: 'text-left p-2 border-b' }, 'Type III'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2 font-semibold' }, 'Rails'), h('td', { className: 'p-2' }, '1'), h('td', { className: 'p-2' }, '2'), h('td', { className: 'p-2' }, '3')),
          h('tr', null, h('td', { className: 'p-2 font-semibold' }, 'Min height'), h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, '60 in')),
          h('tr', null, h('td', { className: 'p-2 font-semibold' }, 'Reflective rails'), h('td', { className: 'p-2' }, 'One side'), h('td', { className: 'p-2' }, 'Both sides'), h('td', { className: 'p-2' }, 'Both sides, all rails')),
          h('tr', null, h('td', { className: 'p-2 font-semibold' }, 'Use case'), h('td', { className: 'p-2' }, 'Pedestrian routing, short daytime'), h('td', { className: 'p-2' }, 'Short shoulder work, lane shifts'), h('td', { className: 'p-2' }, 'Road closures, detours, nighttime, ≥40 mph')),
          h('tr', null, h('td', { className: 'p-2 font-semibold' }, 'Typical NJ purchase price'), h('td', { className: 'p-2' }, '$40–80'), h('td', { className: 'p-2' }, '$60–120'), h('td', { className: 'p-2' }, '$400–800')),
        ),
      ),
    ),
    h('p', null, 'All three types are defined under MUTCD Part 6 (temporary traffic control). Pricing ranges are typical NJ contractor purchase prices; verify against a current quote.'),

    h('h2', null, 'Type I — the minimum acceptable barricade'),
    h(
      'p',
      null,
      'A Type I barricade is a single reflective rail, roughly 24 inches wide, mounted on a lightweight frame at least 36 inches tall. Most are plastic, some are metal. Their purpose is to outline a hazard, not to stop a vehicle.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Use Type I for:'),
      ' pedestrian path channelizing, short-duration utility holes set off the travel lane, parking-lot work, and event routing. They are the cheapest option and the easiest to deploy quickly.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Do not use Type I for:'),
      ' any closure of a travel lane on a road with a posted speed above 35 mph. The single rail simply does not give drivers enough visual closure cues at speed. Most NJ municipalities will reject a permit that proposes Type I on anything but a low-speed local street, daytime only.',
    ),

    h('h2', null, 'Type II — when one rail is not enough'),
    h(
      'p',
      null,
      'A Type II barricade has two horizontal rails (top and bottom) on the same frame footprint as a Type I. The added rail is the visibility upgrade — drivers and pedestrians approaching from a steeper angle see the closure earlier.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Use Type II for:'),
      ' short-duration shoulder work, lane shifts on roads under 40 mph, pedestrian channelizing around larger excavations, and any closure where Type I "feels too flimsy" but you do not need a full road-closure barricade. Type II is the default for most utility-cut and pothole repair work.',
    ),
    h(
      'p',
      null,
      'In NJ, Type II is almost always acceptable for daytime municipal road work below 40 mph as long as you have proper advance warning signs (W20-1, W21-5, etc.) ahead of the closure.',
    ),

    h('h2', null, 'Type III — the road-closure standard'),
    h(
      'p',
      null,
      'Type III is the barricade you see at every "ROAD CLOSED" or "DETOUR" sign. Three full-width reflective rails on a heavy frame, minimum 60 inches tall, almost always weighted with sandbags or water-filled bases.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'MUTCD requires Type III barricades for:'),
    ),
    h(
      'ul',
      null,
      h('li', null, 'Full road closures — the barricade is the closure, with a "ROAD CLOSED" sign mounted to it'),
      h('li', null, 'Detour routes, with mounted detour and arrow signs'),
      h('li', null, 'Long-term work zones (more than 3 days under most state standards)'),
      h('li', null, 'Nighttime work where a travel lane is taken on a road with a 40+ mph speed limit'),
      h('li', null, 'Any work zone where there is no advance taper protecting the barricade from direct vehicle impact'),
    ),
    h(
      'p',
      null,
      'High-intensity prismatic sheeting (Type IV or IX under ASTM D4956) makes a properly placed Type III visible from over 1,000 feet at night. They are commonly paired with Type 1 steady-burn warning lights at the corners — small details that inspectors check.',
    ),

    h('h2', null, 'How to pick — the on-site decision tree'),
    h(
      'p',
      null,
      'When you are in the truck on the way to a job and you are not sure which barricade type to load, run through this:',
    ),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'Are you closing a travel lane or a road?'), ' → Type III.'),
      h('li', null, h('strong', null, 'Is the work zone live overnight?'), ' → Type III.'),
      h('li', null, h('strong', null, 'Speed limit ≥ 40 mph at the work zone?'), ' → Type III if the barricade is the closure marker; Type II is OK if it is just a channelizer protected by a taper.'),
      h('li', null, h('strong', null, 'Pedestrian-only routing, daytime, under 35 mph street?'), ' → Type I or Type II is fine.'),
      h('li', null, h('strong', null, 'Confused?'), ' Default to Type II — you will almost never be cited for over-spec\'ing.'),
    ),

    h('h2', null, 'What NJ adds on top of MUTCD'),
    h(
      'p',
      null,
      'NJ\'s MUTCD adoption matches the federal MUTCD with a few state-specific overlays. The biggest ones contractors hit:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Many municipalities require Type III for any overnight road work'), ' regardless of speed limit. Always check the permit before you load up.'),
      h('li', null, h('strong', null, 'NJ Turnpike and Garden State Parkway closures'), ' require Type III plus an NJTA-approved arrow board, plus a shadow vehicle for any travel-lane closure. The Authority is unforgiving on this.'),
      h('li', null, h('strong', null, 'Pedestrian routing in NJ'), ' must be ADA-compliant — that means a cane-detectable bottom rail. A standard Type I is sometimes too high to satisfy this, which is one reason many NJ engineers default to Type II for pedestrian channelizing.'),
      h('li', null, h('strong', null, 'NJDOT Standard Specifications'), ' (verify the current section number against the latest edition before submitting your TCP) call out reflective sheeting and ballast requirements that exceed MUTCD minimums on state-maintained roads.'),
    ),

    h('h2', null, 'Common mistakes contractors make'),
    h(
      'p',
      null,
      'In rough order of "how often inspectors flag this":',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Using Type I to mark a road closure.'), ' Single rail, no visible "ROAD CLOSED" — guaranteed cite.'),
      h('li', null, h('strong', null, 'Skipping ballast on Type III.'), ' Wind alone takes a Type III out within an hour on a highway. Two 25-lb sandbags per leg minimum; double that on highway-speed work zones, or use water-filled bases.'),
      h('li', null, h('strong', null, 'Reflective sheeting facing the wrong way.'), ' Sheeting must face oncoming traffic. If the barricade sits between two flow directions (a closure island), both sides need sheeting.'),
      h('li', null, h('strong', null, 'Damaged barricades back in rotation.'), ' A bent rail fails the MUTCD reflectivity geometry test even when the sheeting itself looks intact. Inspectors notice.'),
      h('li', null, h('strong', null, 'No advance warning signs.'), ' A Type III without a W20-1 ("ROAD WORK AHEAD") and the proper sign series in front of it is functionally invisible. Inspectors will treat it as missing.'),
    ),

    h('h2', null, 'How many should you stock?'),
    h(
      'p',
      null,
      h('strong', null, 'Type I and Type II:'),
      ' cheap enough that every road-work crew should keep a working set on the truck. Most plastic Type I units retail for $40–80; Type II for $60–120. Storage is easy — they fold or stack. A typical small contractor wants 6–12 of each on hand.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Type III:'),
      ' a different inventory question. Retail is $400–800 each, and a real road closure typically needs four (two for the closure, two for the start of the detour) plus spares. That is $2,000–$4,000 to outfit a single closure crew. Most contractors who do at least one closure a month buy a working set of 6–8 Type IIIs, ballast, and replacement rails as an inventory line.',
    ),
    h(
      'p',
      null,
      'Need to stock up fast for an upcoming closure? Browse our ',
      h('a', { href: '/category/barricades-barriers' }, 'barricades and barriers'),
      ' for same-day delivery in Central NJ.',
    ),

    h('h2', null, 'Need help picking the right setup?'),
    h(
      'p',
      null,
      'If you are not sure how many barricades, what type, and where they go, describe the job to our ',
      h('a', { href: '/assistant' }, 'AI Assistant'),
      ' — it returns a MUTCD-aware gear list with quantities and placement notes. For a same-day quote on Type III barricades plus the rest of your work zone gear with delivery to Central NJ (Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon counties), ',
      h('a', { href: '/quote' }, 'request a quote here'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'What is the difference between Type I, Type II, and Type III barricades?',
      a: 'Number of rails (1 / 2 / 3), height (36 in / 36 in / 60 in), and use case. Type I is a single-rail channelizer for pedestrian routing or short daytime work. Type II adds a second rail for slightly higher visibility on shoulder work and lane shifts. Type III is the three-rail, heavy-duty barricade required by MUTCD for road closures, detours, and nighttime work on roads at 40+ mph.',
    },
    {
      q: 'Can I use a Type II barricade to close a road?',
      a: 'No. MUTCD requires Type III for any full road closure or detour route. Type II is acceptable for shoulder work and channelizing inside an active work zone, not as the closure marker itself.',
    },
    {
      q: 'Do I need a Type III barricade for nighttime utility work?',
      a: 'If you are taking a travel lane or working on a road with a posted speed of 40 mph or higher at night, yes — MUTCD requires Type III. For parking-lot, sidewalk, or fully off-roadway work, Type I or Type II is fine.',
    },
    {
      q: 'How much does a Type III barricade cost in NJ?',
      a: 'Retail is typically $400–800 per unit. High-intensity prismatic sheeting and weighted bases sit at the top of that range. Most NJ road closures need at least four units to outfit, so plan on $1,600–$3,200 to stock a working set, plus ballast (sandbags or water-filled bases).',
    },
    {
      q: 'What weight ballast should a Type III barricade have?',
      a: 'At minimum, two 25-lb sandbags on each leg. For highway-speed work zones (45+ mph) double that, or use water-filled bases. Skipping ballast is the single most common reason a Type III gets blown over and the closure fails inspection.',
    },
    {
      q: 'Are plastic Type III barricades MUTCD-compliant?',
      a: 'Yes, if they meet NCHRP-350 or MASH crashworthiness standards and the reflective sheeting meets ASTM Type IV or IX. Cheap unbranded plastic units from non-compliant suppliers will fail an inspection, even if they look correct.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'how-many-cones-for-lane-closure-nj',
    'uniform-traffic-control-devices-mutcd-guide',
    'barricade-rental-near-me-guide',
  ],
}
