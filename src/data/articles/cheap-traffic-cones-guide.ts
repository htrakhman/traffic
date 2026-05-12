import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "cheap traffic cones" (~500/mo, High comp, $5.49 bid).
 * FAQ-heavy AEO structure — short intro + lots of Q/A. Honest framing:
 * cheap is OK for some uses (parking lot, kid sports), wrong for road
 * work. Helps the buyer pick what to actually spend on.
 */
export const articleCheapTrafficConesGuide: Article = {
  slug: 'cheap-traffic-cones-guide',
  title: 'Cheap Traffic Cones: When Bargain Cones Are Fine — and When They Will Cost You Far More',
  excerpt:
    'A $4 cone has a place: kid sports, driveway markers, garage parking. But the same cone on a 35 mph road will fail an MUTCD inspection and put a contractor on the hook. Here is the honest breakdown.',
  metaDescription:
    'Cheap traffic cones: when budget cones are appropriate (parking, sports, driveway) and when they fail (road work, nighttime). Pricing tiers and what to actually buy.',
  primaryKeyword: 'cheap traffic cones',
  secondaryKeywords: [
    'cheap cones',
    'budget traffic cones',
    'discount traffic cones',
    'inexpensive traffic cones',
    'cheap orange cones',
    'cheap road cones',
  ],
  targetVolume: 500,
  datePublished: '2026-05-12',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'A "cheap" traffic cone — under $10 — is the right choice when nobody is going to inspect it and nothing is moving past it at speed.'),
      ' Driveway sports, garage corners, kid soccer practice, residential moving day, retail parking-lot temporary closures: a $4–$8 cone does the job. ',
      'For anything on a public road, anything at night, or anything where a DOT inspector might walk the site, the same $4 cone fails MUTCD §6F.65 the moment it hits the ground. The savings disappear the first time the crew has to redeploy or pay a fine. ',
      'Below is an FAQ-style guide to when budget cones make sense and where to spend the money.',
    ),

    h('h2', null, 'The pricing tiers — what each one buys'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Price each'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical spec'),
            h('th', { className: 'text-left p-2 border-b' }, 'Use it for'),
            h('th', { className: 'text-left p-2 border-b' }, 'Do not use it for'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '$3–$8'), h('td', { className: 'p-2' }, '12–18", thin PVC, no collar'), h('td', { className: 'p-2' }, 'Sports, driveways, garages'), h('td', { className: 'p-2' }, 'Any road, any night work')),
          h('tr', null, h('td', { className: 'p-2' }, '$9–$18'), h('td', { className: 'p-2' }, '18", molded base, single Engineer Grade collar'), h('td', { className: 'p-2' }, 'Parking lots, daytime private use'), h('td', { className: 'p-2' }, 'Public roads, night work')),
          h('tr', null, h('td', { className: 'p-2' }, '$20–$32'), h('td', { className: 'p-2' }, '28", 7 lb rubber base, double Type IV collars'), h('td', { className: 'p-2' }, 'Daytime road work to 45 mph'), h('td', { className: 'p-2' }, '55+ mph, gusty bridges')),
          h('tr', null, h('td', { className: 'p-2' }, '$35–$60'), h('td', { className: 'p-2' }, '36", 10–12 lb base, double 6" Type IV collars'), h('td', { className: 'p-2' }, 'Nighttime, high-speed roads'), h('td', { className: 'p-2' }, '(this is the spec, not "expensive")')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'The $20–$32 tier is what most contractors should buy by default. The "cheap" tier is for non-road use. The $35–$60 tier is for the conditions that actually require it — not a luxury.',
    ),

    h('h2', null, 'When cheap cones are exactly right'),
    h(
      'p',
      null,
      'Buying $4 cones for a soccer practice is not a compromise — it is the right call. The use case is light enough that a heavier cone is overkill. Three signals that "cheap" is the answer:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Nobody is going to inspect it (no DOT, no insurance audit, no inspector walking the site).'),
      h('li', null, 'No vehicle traffic over 25 mph passes near it.'),
      h('li', null, 'Daytime use only — nighttime requires reflective collars regardless of price.'),
    ),

    h('h2', null, 'When cheap cones cost you 10× their price'),
    h(
      'p',
      null,
      'A budget cone deployed in the wrong place becomes the most expensive thing in your inventory:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'NJDOT inspector citation:'), ' $250–$1,500 per occurrence for non-compliant TTC, plus the redeployment cost. Three cited setups in a year and a contractor faces prequalification status review.'),
      h('li', null, h('strong', null, 'Insurance subrogation after an incident:'), ' If a vehicle hits a worker in a zone with non-compliant cones, the carrier can disclaim coverage. Six-figure exposure on a $4 cone savings.'),
      h('li', null, h('strong', null, 'Repeat redeployment:'), ' Cheap cones with light bases blow off bridges, get dragged by passing trucks, fade in sunlight. The crew wastes 30 minutes per shift re-righting cones that a heavier cone would not need.'),
      h('li', null, h('strong', null, 'Rebid risk on municipal contracts:'), ' Many NJ municipalities require a TTC checklist as part of the bid; cones not meeting MUTCD spec disqualify the bid before pricing review.'),
    ),

    h('h2', null, 'Frequently asked'),

    h('h3', null, 'Are cheap traffic cones MUTCD-compliant?'),
    h(
      'p',
      null,
      'Almost never. MUTCD requires specific heights (28" or 36" for road use), base weights, and double Type IV reflective collars. Cones priced under $15 are typically 12"–18", lack collars, and have ballast bases too light for outdoor use. They are sold for non-road applications.',
    ),

    h('h3', null, 'How cheap is too cheap for a parking-lot cone?'),
    h(
      'p',
      null,
      'For a private parking lot, $9–$18 buys an 18" cone with a molded base and a single Engineer Grade collar — perfectly fine for daytime use. Below $9, you typically get a hollow PVC cone with no base, which tips in any wind. Save the cheapest tier for indoor or controlled environments.',
    ),

    h('h3', null, 'Can I buy used traffic cones to save money?'),
    h(
      'p',
      null,
      'Sometimes. Used MUTCD-compliant cones from auction or fleet liquidation can be a real bargain — $8–$15 for a cone that originally cost $25. Inspect for fade (the orange should be vivid, not pink), brittle bases (cracked rubber means UV failure), and collar bond (peeled collars cannot be re-bonded reliably). Reject anything with reduced retroreflectivity if you intend to use it after dark.',
    ),

    h('h3', null, 'Are import cones (overseas-manufactured) acceptable?'),
    h(
      'p',
      null,
      'Some are; many are not. The label of origin tells you nothing — what matters is the ASTM sheeting type on the collars, the cone height, and the base weight. Ask the supplier for a spec sheet that lists ASTM D4956 Type IV (or III) and references MUTCD §6F.65 dimensions. If they cannot produce one, the cone is not for road use.',
    ),

    h('h3', null, 'Do reflective stickers turn a cheap cone into a road cone?'),
    h(
      'p',
      null,
      'No. Aftermarket reflective tape applied to a PVC cone bonds for one or two cleaning cycles, then peels. MUTCD requires factory-molded collars or heat-applied sheeting. The retrofit also does not address height or base weight — a 12" cone is still a 12" cone with a sticker.',
    ),

    h('h3', null, 'What is the cheapest legal road cone?'),
    h(
      'p',
      null,
      'For NJ daytime road work up to 45 mph, the entry-level legal spec is a 28" cone with a 7 lb rubber base and a single Type III or IV reflective collar. That runs $18–$24 in case quantities. For nighttime work, you need the double-collar version at $20–$32. Below those prices you are not buying a road-legal device.',
    ),

    h('h3', null, 'How long do cheap cones last?'),
    h(
      'p',
      null,
      'Hollow-PVC budget cones last 1–2 years of intermittent indoor or driveway use. A year of outdoor sun fades the orange, embrittles the plastic, and cracks the base. Mid-tier cones ($20–$32) are good for 5–7 years of fleet use with reasonable handling. The math: cheap cones are 4–5× cheaper but last 1/4 as long. Total cost of ownership is similar; only the up-front capex is lower.',
    ),

    h('h3', null, 'Where can I buy cheap traffic cones near me?'),
    h(
      'p',
      null,
      'Hardware stores (Home Depot, Lowe\'s, Harbor Freight) carry the bargain tier — usually 12"–18" no-collar cones. Fleet suppliers and traffic-control distributors carry the road-legal tier with case pricing. We deliver both same-day in Central NJ; for the right tier on your specific job, the ',
      h('a', { href: '/assistant' }, 'site assistant'),
      ' will read your description and return the matching SKU.',
    ),

    h('h2', null, 'Practical buying recommendation'),
    h(
      'p',
      null,
      'A small contractor or facility manager should plan two SKUs:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'A cheap tier'),
        ' — 12 to 18 of the $9–$18 18" cones for parking-lot, indoor, and short-duration daytime use.'),
      h('li', null, h('strong', null, 'A road tier'),
        ' — 24 of the $20–$32 28" double-collar cones for any work-zone deployment, day or night, on any public road.'),
    ),
    h(
      'p',
      null,
      'Buying only the cheap tier is a false economy on road work; buying only the road tier is overkill for indoor caution. Two SKUs covers 95% of needs.',
    ),

    h('h2', null, 'Where to buy in Central NJ'),
    h(
      'p',
      null,
      'Browse our ',
      h('a', { href: '/category/cones-drums' }, 'cones, drums, and channelizers'),
      ' for both budget and road-legal tiers. Case pricing applies at 25-cone breaks. To match cones to a specific job, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' — same-day Central NJ delivery on standard sizes.',
    ),
  ),
  faqs: [
    {
      q: 'What is the cheapest traffic cone that is legal for road work?',
      a: 'For NJ daytime road work up to 45 mph, the entry-level legal spec is a 28" cone with a 7 lb rubber base and a single Type III or Type IV reflective collar. That runs about $18–$24 in case quantities. For nighttime work, double Type IV collars are required, pushing the floor to $20–$32. Anything below those prices is for non-road use.',
    },
    {
      q: 'Are cheap traffic cones MUTCD-compliant?',
      a: 'Almost never. MUTCD §6F.65 requires specific heights (28" or 36" for road use), base weights, and double Type IV reflective collars. Cones priced under $15 are typically 12"–18", lack collars, and have ballast bases too light for outdoor wind. They are appropriate for parking lots, sports, indoor caution use — not for any public-road deployment.',
    },
    {
      q: 'Can I add reflective tape to a cheap cone to make it road-legal?',
      a: 'No. Aftermarket adhesive tape bonds for one or two cleaning cycles, then peels. MUTCD compliance requires factory-molded collars or heat-applied sheeting. The retrofit also does not fix the underlying issues — a 12" cone is still a 12" cone with a sticker. Buy the right cone instead of upgrading the wrong one.',
    },
    {
      q: 'How long do cheap traffic cones last?',
      a: 'Hollow-PVC budget cones last 1–2 years of intermittent indoor or driveway use. Outdoor sun fades the orange, embrittles the plastic, and cracks the base. Mid-tier cones ($20–$32) are good for 5–7 years of fleet use with reasonable handling. Total cost of ownership ends up similar — cheap cones are 4–5× cheaper but last roughly a quarter as long.',
    },
    {
      q: 'Are used traffic cones a good way to save money?',
      a: 'Sometimes. Used MUTCD-compliant cones from fleet liquidation can be a real bargain — $8–$15 for a cone that originally cost $25. Inspect for fade (the orange should be vivid, not pink), brittle bases, and peeled collars. Reject any cone with reduced retroreflectivity if you plan to use it after dark.',
    },
    {
      q: 'Where do I buy cheap traffic cones near me in NJ?',
      a: 'Hardware stores (Home Depot, Lowe\'s, Harbor Freight) carry the bargain tier — usually 12"–18" no-collar cones. Traffic-control distributors carry the road-legal tier with case pricing. We deliver both same-day in Central NJ — request a quote with your job description and we will spec the right tier.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'traffic-cones-buying-guide',
    'reflective-traffic-cones-guide',
    'small-traffic-cones-buying-guide',
  ],
}
