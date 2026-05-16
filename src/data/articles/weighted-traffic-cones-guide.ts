import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "weighted traffic cones" (~500/mo, High comp, $7.99 bid).
 * Secondary: heavy duty traffic cones, weighted base cones, wind-resistant cones.
 * Pillar buying guide: base weight matrix, when weight matters,
 * how to add weight to existing cones, what to buy.
 */
export const articleWeightedTrafficConesGuide: Article = {
  slug: 'weighted-traffic-cones-guide',
  title: 'Weighted Traffic Cones: Base Weight Chart, Wind Ratings, and What to Buy',
  excerpt:
    'Whether a traffic cone stays upright in a 30 mph crosswind depends entirely on the base weight. Standard 28-inch cones come in 7, 10, and 12 lb bases — and the right pick varies by where you deploy them.',
  metaDescription:
    'Weighted traffic cones explained — 7/10/12/15 lb base weights, wind resistance math, MUTCD compliance, and the best models for NJ contractors.',
  primaryKeyword: 'weighted traffic cones',
  secondaryKeywords: [
    'heavy duty traffic cones',
    'weighted base cones',
    'wind resistant cones',
    'heavy traffic cones',
    'weighted safety cones',
    'cone with weighted base',
  ],
  targetVolume: 500,
  datePublished: '2026-05-16',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A "weighted traffic cone" is a standard MUTCD cone with extra mass molded or bolted into the base — typically 7, 10, 12, or 15 lb total cone weight, vs the 3–5 lb of an unweighted cone. ',
      h('strong', null, 'Weight matters because every 1 lb of base resists about 8–10 mph of crosswind on a 28-inch cone.'),
      ' For roadside work above 35 mph, MUTCD §6F.65 effectively requires a heavy-base cone. This guide walks through the base-weight math, the buying tiers, and the cheapest way to add weight to cones you already own.',
    ),

    h('h2', null, 'The base-weight chart'),
    h(
      'p',
      null,
      'Cone base weights ladder predictably. Each step up costs $1.50–$3.50 more per cone but doubles the practical use case:',
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
            { className: 'border-b' },
            h('th', { className: 'text-left p-2' }, 'Total cone weight'),
            h('th', { className: 'text-left p-2' }, 'Base weight'),
            h('th', { className: 'text-left p-2' }, 'Wind rating*'),
            h('th', { className: 'text-left p-2' }, 'Use case'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, '3 lb (unweighted)'),
            h('td', { className: 'p-2' }, '~0 lb add'),
            h('td', { className: 'p-2' }, '< 15 mph'),
            h('td', { className: 'p-2' }, 'Indoor, parking lot, indoor warehouse'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, '7 lb'),
            h('td', { className: 'p-2' }, '~4 lb add'),
            h('td', { className: 'p-2' }, '25–35 mph'),
            h('td', { className: 'p-2' }, 'Low-speed streets, residential closure'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, '10 lb'),
            h('td', { className: 'p-2' }, '~7 lb add'),
            h('td', { className: 'p-2' }, '35–45 mph'),
            h('td', { className: 'p-2' }, 'Collector roads, paving, contractor default'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, '12 lb'),
            h('td', { className: 'p-2' }, '~9 lb add'),
            h('td', { className: 'p-2' }, '45–55 mph'),
            h('td', { className: 'p-2' }, 'Arterials, state routes, highway shoulders'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, '15 lb'),
            h('td', { className: 'p-2' }, '~12 lb add'),
            h('td', { className: 'p-2' }, '55+ mph'),
            h('td', { className: 'p-2' }, 'Interstate work zones, bridge decks'),
          ),
        ),
      ),
    ),
    h(
      'p',
      { className: 'text-xs' },
      '*Wind ratings are practical, not regulatory. A 28-inch cone stays upright in a steady crosswind that does not exceed roughly 8–10 mph per pound of total weight, depending on cone profile and wind angle. Truck-passing turbulence at 55 mph generates ~40 mph effective wind for ~1 second, which is why interstate work uses 15 lb cones.',
    ),

    h('h2', null, 'When weight matters more than you would think'),
    h(
      'p',
      null,
      'Two situations exceed the steady-state wind math and need an extra weight tier:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Truck-passing turbulence: '),
        'a Class 8 truck passing within 6 ft of a cone at 55 mph generates a ~40 mph pressure pulse for ~0.7 seconds. A 7 lb cone tips. A 10 lb cone wobbles. A 12 lb cone stays put. This is the single biggest reason contractors upgrade from 7 to 10 lb.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Storm work: '),
        'utility crews working in 35+ mph sustained wind (winter nor\'easters in NJ; coastal work in Monmouth/Ocean counties) need 12–15 lb cones or 28" cones strapped to drums with sandbags.',
      ),
    ),

    h('h2', null, 'How extra weight gets into the cone'),
    h(
      'p',
      null,
      'Four mechanisms, in order of cost:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Thicker PVC base molding '),
        '— the cone is molded with more PVC in the base ring. Adds 2–4 lb. Cheapest option, used for 7 lb cones. Visible as a "fat ring" at the bottom of the cone.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Inserted rubber base '),
        '— a separate rubber slab is bonded into the cone base during molding. Adds 5–8 lb. The standard for 10 lb cones. The cone and base are one inseparable unit.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Steel-plate ballast '),
        '— a steel disc bolted to the base interior. Adds 6–10 lb. Used for 12 and 15 lb cones. The cone can be replaced separately from the ballast, which is why fleet contractors prefer this design.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Detachable weighted ring '),
        '— a separate rubber or steel ring slides onto the cone base. Adds 3–8 lb. Lets you turn a 3 lb cone into a 10 lb cone with a $5 accessory. Best for crews that already own light cones.',
      ),
    ),

    h('h2', null, 'Adding weight to cones you already own'),
    h(
      'p',
      null,
      'If you have a stack of 3 lb or 5 lb cones and want to upgrade them rather than rebuy, three field-proven options:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Stack-on rubber rings ($3–$8 each): '),
        'add ~5 lb per ring. Slide onto the base from the bottom. Two rings stacks a 5 lb cone to 15 lb total. Pros: cheap, modular. Cons: ring can slide off in transport — secure with a 2-inch hose clamp or zip ties.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Sandbags ($0.50–$2 each, empty): '),
        'wrap one sandbag around the base of each cone. Standard fill weight is 25 lb per bag — overkill, but you can underfill. Cheapest option per pound of weight. Cons: ugly; tarp filled bags do not stack cleanly on a truck; sand creates a mess.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Cone weights (commercial): '),
        '$4–$12 per unit. Purpose-made steel or rubber discs with a center hole that slides over the cone tip and rests on the base. Cleaner than sandbags, more secure than slip-on rings.',
      ),
    ),
    h(
      'p',
      null,
      'Cost comparison: a stack-on ring approach costs ~$5/cone to add 5 lb. A 10 lb base-weighted replacement cone costs $18–$28 retail. If you have more than 50 cones to upgrade, stack-on is the right call. Under 50 cones, replacement is typically faster and cheaper than the labor of upgrading.',
    ),

    h('h2', null, 'MUTCD compliance — what the standard says'),
    h(
      'p',
      null,
      'MUTCD §6F.65 specifies cone size, retroreflective collar pattern, and color — but does not name a minimum base weight. The compliance signal is in §6F.65\'s requirement that "cones shall be designed so they will be stable when subjected to anticipated wind conditions." NJDOT and FHWA work-zone inspectors interpret this with a de-facto rule of thumb:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Under 35 mph posted speed: 7 lb cones acceptable'),
      h('li', null, '35–45 mph: 10 lb cones expected'),
      h('li', null, '45–55 mph: 12 lb cones or drums'),
      h('li', null, '55+ mph or interstate: drums or 15 lb cones'),
    ),
    h(
      'p',
      null,
      'A cone blowing into the travel lane is a top finding on NJDOT work-zone audits. Showing up with 5 lb cones on a 45 mph state route is a citable error even though no specific weight number appears in the MUTCD.',
    ),

    h('h2', null, 'What to buy — three contractor profiles'),
    h(
      'h3',
      null,
      'Profile A: residential / municipal work (≤ 35 mph)',
    ),
    h(
      'ul',
      null,
      h('li', null, '50× 28" cones, 7 lb base — ~$10–$14 each retail'),
      h('li', null, 'Total kit: ~$500–$700'),
      h('li', null, 'Optional: 8× 36" cones for use as taper-head devices on collector streets'),
    ),
    h(
      'h3',
      null,
      'Profile B: contractor general use (35–45 mph)',
    ),
    h(
      'ul',
      null,
      h('li', null, '60× 28" cones, 10 lb base — ~$18–$24 each retail'),
      h('li', null, '20× 36" cones, 12 lb base — ~$30–$40 each (taper-head, advance warning)'),
      h('li', null, 'Total kit: ~$1,800–$2,200'),
    ),
    h(
      'h3',
      null,
      'Profile C: state-route and arterial work (45–55 mph)',
    ),
    h(
      'ul',
      null,
      h('li', null, '80× 36" cones, 12 lb base — ~$32–$42 each retail'),
      h('li', null, '20× 36" cones, 15 lb base — ~$45–$55 each (highest-speed positions)'),
      h('li', null, 'Channelizing drums substitute for cones on closures > 1 day'),
      h('li', null, 'Total kit: ~$3,500–$4,500'),
    ),

    h('h2', null, 'Common buying mistakes'),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Buying 28" cones for 45 mph work: '),
        'cone size by speed is governed by MUTCD Table 6F-1 — 36" minimum above 40 mph. Heavier base on a 28" cone does not fix the size problem.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Assuming all 10 lb cones are equal: '),
        'a 10 lb cone with a low, wide rubber base has more wind resistance than a 10 lb cone with a small steel weight stuck under the tip. Center of mass matters; "10 lb" alone is not enough.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Skipping cones-on-drums upgrade: '),
        'channelizing drums (28" cone shape, 36" tall, larger base footprint, hollow body for sand ballast) outperform cones at 55+ mph and cost less per closure than upgrading the entire cone fleet to 15 lb.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Forgetting transport weight: '),
        'a stack of 30× 12 lb cones is 360 lb in the truck. Crews underestimate this; the weight savings matter when stacking 100+ cones for a big closure.',
      ),
    ),

    h('h2', null, 'Where to buy weighted traffic cones in NJ'),
    h(
      'p',
      null,
      'We stock 28" and 36" cones in 7, 10, 12, and 15 lb base weights for same-day Central NJ delivery. Browse the ',
      h('a', { href: '/category/cones-drums' }, 'cones and channelizers category'),
      ' for individual units, or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' for a profile-matched kit. Not sure which weight fits your typical job? Our ',
      h('a', { href: '/assistant' }, 'Assistant'),
      ' will walk through it from your speed, duration, and wind exposure.',
    ),
  ),
  faqs: [
    {
      q: 'How much should a traffic cone weigh?',
      a: 'Match the cone weight to the road speed: 7 lb for residential ≤ 35 mph, 10 lb for collector streets 35–45 mph, 12 lb for arterials 45–55 mph, and 15 lb (or switch to drums) for 55+ mph. MUTCD §6F.65 requires "stable in anticipated wind" rather than naming a specific number, but inspectors apply this ladder de facto.',
    },
    {
      q: 'Can I add weight to lightweight cones I already own?',
      a: 'Yes — three options. Stack-on rubber rings ($3–$8) add 5 lb each. Sandbags around the base are the cheapest at $0.50–$2 (empty). Commercial cone weights are purpose-made steel/rubber discs at $4–$12. For more than 50 cones, ring upgrades are cheaper than replacement; under 50, just buying weighted cones is usually faster.',
    },
    {
      q: 'Do heavier cones last longer?',
      a: 'Generally, yes — heavier cones have thicker PVC walls and reinforced bases that resist truck strikes, freeze cycles, and UV degradation. Expect 4–6 seasons from a 10 lb contractor cone vs 1–2 seasons from a 3 lb commodity cone. The cost-per-year math favors weighted cones even when wind is not a factor.',
    },
    {
      q: 'Are weighted traffic cones MUTCD-compliant?',
      a: 'Yes — weight is not the MUTCD compliance issue. Size, color (orange or specified alternates), retroreflective collar pattern, and stability are the MUTCD requirements per §6F.65. Adding base weight to a compliant cone keeps it compliant. Adding weight to a non-compliant cone (e.g., undersized or wrong color) does not fix the underlying issue.',
    },
    {
      q: 'How do channelizing drums compare to weighted cones?',
      a: 'Drums (28" diameter, 36"+ tall, hollow body) hold 25–40 lb of sand or water ballast and have a larger footprint than even a 15 lb cone. For 55+ mph or multi-day closures, drums outperform cones at lower per-device cost. Cones are faster to deploy and stack tighter for transport; drums win on stability and longevity.',
    },
    {
      q: 'Why do some 10 lb cones tip and others stay up in the same wind?',
      a: 'Center of mass. A 10 lb cone with a low, wide rubber base (most weight at floor level, weight spread over a 12-inch footprint) is far more stable than a 10 lb cone with a small steel slug bolted high inside the cone body. When comparing 10 lb cones, ask for the base diameter and the weight distribution — they matter more than the total.',
    },
    {
      q: 'What is the heaviest traffic cone I can buy?',
      a: '15 lb is the practical retail ceiling for 36" cones. Above that, the form factor switches to channelizing drums (28" cone-shape with hollow body, fillable to 40+ lb with sand) or to cone-mounted drum bases (an aftermarket steel ring that turns a cone into a quasi-drum at the cost of stack height).',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Accessories & Hardware', path: '/category/accessories-hardware' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
  ],
  relatedArticles: [
    '36-inch-traffic-cones-guide',
    '28-inch-traffic-cones-guide',
    'highway-cones-guide',
  ],
}
