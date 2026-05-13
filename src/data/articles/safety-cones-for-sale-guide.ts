import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "safety cones for sale" (~5K/mo, High comp).
 * Commercial-comparison structure: price tiers, brand-class comparison,
 * what each tier is actually for, and where each fails.
 */
export const articleSafetyConesForSaleGuide: Article = {
  slug: 'safety-cones-for-sale-guide',
  title: 'Safety Cones for Sale: Price Tiers, What You Get, and Which to Skip',
  excerpt:
    'Safety cones run from $5 hardware-store units to $55 highway-grade gear. Here is a tier-by-tier comparison — what each price point actually buys, where each tier fails, and which one a Central NJ contractor should put on the truck.',
  metaDescription:
    'Buying safety cones? Price tier comparison from $5 budget cones to $55 highway-grade. What each tier actually buys, where they fail, and which to buy in NJ.',
  primaryKeyword: 'safety cones for sale',
  secondaryKeywords: [
    'safety cones',
    'orange safety cones',
    'safety cones price',
    'cheap safety cones',
    'buy safety cones',
    'safety cones near me',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-13',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Safety cones for sale range from $5 sport cones to $55 highway-grade units with diamond-grade reflective sheeting. ',
      h('strong', null, 'Most contractors overspend on the wrong tier — and the rest underspend and fail inspection.'),
      ' This is a price-tier comparison: what each level actually buys, where it fails, and which tier belongs on a Central NJ contractor truck.',
    ),

    h('h2', null, 'The four price tiers (and what separates them)'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Tier'),
            h('th', { className: 'text-left p-2 border-b' }, 'Per-cone price'),
            h('th', { className: 'text-left p-2 border-b' }, 'Reflective sheeting'),
            h('th', { className: 'text-left p-2 border-b' }, 'Road-legal?'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Budget / sport'), h('td', { className: 'p-2' }, '$3–8'), h('td', { className: 'p-2' }, 'None or painted'), h('td', { className: 'p-2' }, 'No')),
          h('tr', null, h('td', { className: 'p-2' }, 'Parking lot'), h('td', { className: 'p-2' }, '$10–18'), h('td', { className: 'p-2' }, 'Single 4-in collar, engineer-grade'), h('td', { className: 'p-2' }, '≤ 25 mph only')),
          h('tr', null, h('td', { className: 'p-2' }, 'Contractor / MUTCD'), h('td', { className: 'p-2' }, '$18–30'), h('td', { className: 'p-2' }, 'Double collar, ASTM Type IV'), h('td', { className: 'p-2' }, 'Yes — up to 45 mph')),
          h('tr', null, h('td', { className: 'p-2' }, 'Highway / freeway'), h('td', { className: 'p-2' }, '$32–55'), h('td', { className: 'p-2' }, 'Double collar, Type IX diamond grade'), h('td', { className: 'p-2' }, 'Yes — 55+ mph rated')),
        ),
      ),
    ),

    h('h2', null, 'Tier 1 — Budget / sport cones ($3–8 each)'),
    h(
      'p',
      null,
      'Small (9-inch or 12-inch), lightweight (1–2 lb), no reflective sheeting. The cones you see at sporting-goods stores in packs of 12. ',
      h('strong', null, 'Not road-legal under any circumstance.'),
      ' Use cases:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Sports training (agility drills, soccer, hockey)'),
      h('li', null, 'Kid-zone / playground hazard marking'),
      h('li', null, 'Indoor warehouse marking where lighting is high'),
    ),
    h(
      'p',
      null,
      'Failure mode: a 45-mph passing-truck slipstream blows them across the lane in seconds. Inspectors will flag them on any TCP review. If you find yourself "supplementing" your contractor cones with sport cones because the latter are cheap, you have the wrong gear ratio — buy more contractor cones instead.',
    ),

    h('h2', null, 'Tier 2 — Parking-lot cones ($10–18 each)'),
    h(
      'p',
      null,
      '18-inch cones with a 3-lb base and a single 4-inch reflective collar. Engineer-grade sheeting (not Type IV). Acceptable for daytime work in parking lots, valet operations, driveways, and ≤ 25 mph private property. ',
      h('strong', null, 'Not road-legal above 25 mph.'),
      ' This is the tier most homeowners and small property managers buy; most contractors should skip it.',
    ),
    h(
      'p',
      null,
      'Watch for: "18-inch road cone" listings on Amazon that are actually parking-lot grade. The reflective collar is a giveaway — single 4-inch engineer grade vs. the double-collar ASTM Type IV that real road cones use. If the listing does not name the ASTM sheeting class, assume it is engineer-grade.',
    ),

    h('h2', null, 'Tier 3 — Contractor / MUTCD cones ($18–30 each)'),
    h(
      'p',
      null,
      '28-inch fluorescent-orange PVC cone, 7-lb rubber base, double reflective collar (4 in + 6 in), ASTM Type IV high-intensity prismatic sheeting. ',
      h('strong', null, 'This is the tier that belongs on a contractor truck.'),
      ' Road-legal up to 45 mph daytime and nighttime. The NJ-grading-contractor default. Most NJ inspections pass with this tier; most fail because the buyer dropped to Tier 2 to save money.',
    ),
    h(
      'p',
      null,
      'Things to verify before buying at this tier:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Sheeting class spelled out (ASTM D4956 Type IV, not "high-vis")'),
      h('li', null, 'Base weight in pounds (7 lb is the contractor standard)'),
      h('li', null, 'Body-to-base attachment method (one-piece molded or bolted; not glued)'),
      h('li', null, 'Color rating — fluorescent, not flat painted orange'),
    ),

    h('h2', null, 'Tier 4 — Highway / freeway cones ($32–55 each)'),
    h(
      'p',
      null,
      '36-inch cones with 10–12 lb base, double collar, ASTM Type IX diamond-grade prismatic sheeting. Required for any nighttime work on 35+ mph roads and any daytime work on 55+ mph freeway. Most are kettle-base or sandbag-compatible for extra ballast. NJDOT, NJ Turnpike, and Garden State Parkway work-zone specs require this tier at the per-state-DOT inspection.',
    ),
    h(
      'p',
      null,
      'When to buy: if you have any active or pending freeway work. Even one job at 55 mph requires the upgrade for the cones used in that segment; you cannot substitute 28-inch contractor cones at freeway speed.',
    ),

    h('h2', null, 'How many of each tier should a small NJ shop stock?'),
    h(
      'p',
      null,
      'The contractor build that pays off across 90% of NJ road work:',
    ),
    h(
      'ul',
      null,
      h('li', null, '24× Tier 3 (28-inch, 7-lb, double collar) — the workhorse'),
      h('li', null, '8× Tier 4 (36-inch, 10-lb, Type IX) — for nighttime + 55+ mph'),
      h('li', null, '6× Tier 2 (18-inch parking lot) — for yard / staging / non-road use'),
      h('li', null, '4× kettle-base sandbag carriers — pair with Tier 4 on high-wind days'),
    ),
    h(
      'p',
      null,
      'Total: roughly $1,000–$1,500. Add a flat-stack rack for the truck ($120–250) so the cones do not roll around. That kit covers every short-duration NJ job a contractor would self-perform; longer closures get supplemented with drums and Type III barricades. See our ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'cone-count guide for lane closures'),
      ' for job-specific counts.',
    ),

    h('h2', null, 'Where to actually buy safety cones'),
    h('h3', null, 'Industrial supply (Grainger, Uline, ULINE)'),
    h(
      'p',
      null,
      'Reliable spec, MUTCD-compliant Tier 3 and Tier 4 cones in stock. Best when the customer needs to ship to a job site without a delivery option. Markup is 15–25% over wholesale.',
    ),
    h('h3', null, 'Big-box (Home Depot, Lowe\'s, Tractor Supply)'),
    h(
      'p',
      null,
      'Mostly Tier 2 (parking-lot grade). The 28-inch cones they carry are often single-collar — they look like contractor cones but fail the MUTCD nighttime check. OK in a pinch; not a long-term answer.',
    ),
    h('h3', null, 'Amazon / generic e-commerce'),
    h(
      'p',
      null,
      'Listings range from Tier 1 to Tier 3. Verify ASTM sheeting class in the listing text; if it is not named, the cones are probably engineer-grade. Returns are easy but freight on bulk cones is heavy.',
    ),
    h('h3', null, 'Local traffic-control supply (us, and similar)'),
    h(
      'p',
      null,
      'Same-day delivery in the service area, spec-named gear, and a person on the phone if you need a job-specific recommendation. Pricing is competitive with industrial supply once delivery is factored in. For Central NJ, ',
      h('a', { href: '/category/cones-drums' }, 'browse our cones and channelizers'),
      '.',
    ),

    h('h2', null, 'Common mistakes when buying safety cones'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Buying by quantity, not by spec.'), ' Twenty Tier-2 cones do not equal twenty Tier-3 cones; the latter is the only spec that passes 35+ mph inspection.'),
      h('li', null, h('strong', null, 'Trusting "MUTCD compliant" on a listing.'), ' Half the listings that claim it are wrong. Check the ASTM sheeting class.'),
      h('li', null, h('strong', null, 'Underspeccing the base.'), ' 4-lb bases blow over in a passing-truck slipstream. NJ contractors should not bother with anything under 7 lb for road use.'),
      h('li', null, h('strong', null, 'Skipping spares.'), ' Add 20–25% to the cone count for a typical job — vehicle strikes are routine and you cannot lose your taper.'),
    ),

    h('h2', null, 'Get a quote sized to your job'),
    h(
      'p',
      null,
      'If you would rather skip the tier-by-tier shopping and just tell us what the job is, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' — describe the work zone (road speed, day/night, length of closure) and we will spec the right tier, count, and base weight, then deliver same-day to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, or northern Ocean. The ',
      h('a', { href: '/assistant' }, 'Assistant tool'),
      ' on the site can also walk through the spec live.',
    ),
  ),
  faqs: [
    {
      q: 'How much do safety cones cost?',
      a: 'Per-cone retail: $3–8 for budget/sport cones (not road-legal), $10–18 for parking-lot cones, $18–30 for MUTCD-compliant contractor cones (28-inch, double collar), $32–55 for highway-grade 36-inch cones. Bulk pricing kicks in around 25 cones of the same SKU.',
    },
    {
      q: 'What is the best safety cone for road construction in NJ?',
      a: 'A 28-inch fluorescent-orange PVC cone with a 7-lb rubber base and double ASTM Type IV reflective collar. This is the tier that handles 35–45 mph day-or-night work and the most common NJ contractor truck inventory. For 55+ mph or freeway work, step up to 36-inch with Type IX diamond grade.',
    },
    {
      q: 'Are cheap safety cones from Amazon road-legal?',
      a: 'Usually not. Most Amazon listings under $15 are engineer-grade single-collar or unmarked sheeting. Road-legal MUTCD safety cones need ASTM Type IV (or better) double collars. If the listing does not name the sheeting class, assume it is not road-rated.',
    },
    {
      q: 'How many safety cones do I need for a typical job?',
      a: 'For a single-lane closure on a 40 mph NJ road, 20–30 cones (taper + buffer + activity area), plus 25% spares. For a parking-lot job, one cone every 8–10 ft of channelized path. Job-specific math is in our lane-closure cone-count guide.',
    },
    {
      q: 'Can I mix safety cone tiers on the same job?',
      a: 'Yes, and most contractors do. Use Tier 4 (36-inch highway) on the upstream taper where vehicles approach at speed, then transition to Tier 3 (28-inch contractor) inside the activity area. Tier 2 cones can mark the staging or yard area off the active roadway. Tier 1 (sport) should never appear on a road job.',
    },
    {
      q: 'Do safety cones need to be inspected or recertified?',
      a: 'No formal recertification, but each cone should be visually inspected before every deployment. Faded color, peeling reflective sheeting, cracked PVC, or wobble in the base are reasons to retire the cone. Industry rule-of-thumb is to retire a cone after 3–5 years of regular outdoor service.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Safety Vests & Hi-Vis', path: '/category/safety-vests-hi-vis' },
  ],
  relatedArticles: [
    'cheap-traffic-cones-guide',
    'traffic-cones-for-sale-buying-guide',
    'orange-traffic-cones-guide',
  ],
}
