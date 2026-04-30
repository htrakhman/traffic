import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "collapsible traffic cones" (~5K/mo, High comp 100).
 * Secondary cluster: foldable traffic cones, folding traffic cones,
 *   collapsible traffic safety cones, fleet vehicle cones, retractable cones.
 * Format: commercial-intent comparison + buying. The audience is fleet ops,
 * police, EMS, and contractors who need a small-truck-friendly cone — they
 * are weighing collapsible vs traditional, so the lead resolves that question.
 */
export const articleCollapsibleTrafficConesGuide: Article = {
  slug: 'collapsible-traffic-cones-guide',
  title: 'Collapsible Traffic Cones: When to Use Them, When to Avoid Them, and What to Buy',
  excerpt:
    'Collapsible traffic cones fold flat to 1–2 inches, pop up to 18–28 inches, and let a single fleet vehicle carry 30+ cones in a back-seat duffle. They work great for emergency response and fleet jobs — and they fail hard for full-day work zones. Here is when to use them and what to buy.',
  metaDescription:
    'Collapsible traffic cones explained: spring-coil vs accordion designs, weight and stability tradeoffs vs traditional cones, when to use them for fleet/EMS/parking, and what to buy.',
  primaryKeyword: 'collapsible traffic cones',
  secondaryKeywords: [
    'foldable traffic cones',
    'folding traffic cones',
    'collapsible traffic safety cones',
    'pop up traffic cones',
    'fleet vehicle cones',
    'retractable traffic cones',
  ],
  targetVolume: 5000,
  datePublished: '2026-04-30',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'Collapsible traffic cones'),
      ' are spring-coil or accordion-style cones that fold flat to 1–2 inches and pop up to 18, 24, or 28 inches when deployed. They let a single fleet vehicle, patrol car, or service truck carry 30+ cones in the space a traditional 28-inch cone takes for ',
      h('em', null, 'one'),
      '. They are excellent for emergency response, parking enforcement, fleet service calls, valet operations, and roadside assistance. They are ',
      h('strong', null, 'not'),
      ' a substitute for full-spec MUTCD cones on a contractor work zone — collapsibles are too light, the bases are too small, and the reflectivity grade rarely matches a true ASTM Type IV/V sheeting. Below: how the two designs work, when collapsibles win, when they fail, and what to buy.',
    ),

    h('h2', null, 'How collapsible cones work'),
    h('h3', null, 'Spring-coil (the most common design)'),
    h(
      'p',
      null,
      'A coiled spring runs through the body of the cone, surrounded by orange reflective fabric or coated nylon. Compress the cone and the spring squashes into a flat disc; release and the spring pops the cone up to its full height. Setup takes about 1 second. Pros: fast deploy, zero learning curve, packs small. Cons: the spring can lose tension after a few hundred cycles, the fabric snags on chain-link fences, and the base is just whatever weight is built into the bottom disc.',
    ),
    h('h3', null, 'Accordion / telescoping (less common)'),
    h(
      'p',
      null,
      'Hard plastic rings or a corrugated plastic shell that compress like a slinky. More durable than spring-coil for repeat cycles, more rigid in wind, but slower to deploy and bulkier when collapsed (4–6 inches of stack height instead of 1–2). Used by some police and emergency-response fleets that prioritize stability over compactness.',
    ),

    h('h2', null, 'Where collapsible cones outperform traditional'),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'Patrol cars / EMS / fire response.'), ' A trooper\'s trunk fits 12 collapsibles where it could fit 2 traditional 28-inch cones. For 5-minute incident scene control, collapsibles are correct.'),
      h('li', null, h('strong', null, 'Fleet service vehicles.'), ' Tow trucks, utility vans, locksmiths, mobile mechanics, valet operators — anyone who deploys cones for 10–60 minutes around a parked vehicle and then leaves.'),
      h('li', null, h('strong', null, 'Parking enforcement.'), ' Reserving a loading zone, blocking a fire lane during a fire-alarm test, marking a flooded space.'),
      h('li', null, h('strong', null, 'Indoor warehouse and event setup.'), ' Routing forklifts around a spill, marking a temporary aisle change, marking a slip hazard until the wet floor sign arrives.'),
      h('li', null, h('strong', null, 'Personal vehicles / weekend events.'), ' A 5-pack in the trunk for a flat tire on a busy road, kids\' soccer practice cone drills, garage-sale traffic routing.'),
    ),

    h('h2', null, 'Where they fail (do not buy collapsibles for these)'),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'Full-day road work zones.'), ' MUTCD compliance requires specific heights, reflective sheeting grades, and base weights. Most collapsibles fail one or all three. An NJDOT inspector will tag a work zone running on collapsible cones.'),
      h('li', null, h('strong', null, 'Anything above 35 mph.'), ' Collapsible cones get sucked into the slipstream of a passing tractor-trailer. Traditional 7-lb-base cones stay put.'),
      h('li', null, h('strong', null, 'Nighttime work above 25 mph.'), ' Reflective fabric on collapsibles is typically polyester with reflective tape, not Type IV/V prismatic sheeting. Visibility at 100+ ft is roughly half what a proper traffic cone delivers.'),
      h('li', null, h('strong', null, 'Wind-exposed locations.'), ' Bridge decks, beach parking, anywhere there is a steady 15+ mph crosswind. The spring base does not have the mass to stay put.'),
      h('li', null, h('strong', null, 'Long-term deployment.'), ' Spring-coil cones left out for days lose tension where they\'re bent. Accordion cones do better but still fail faster than rigid PVC under continuous UV.'),
    ),

    h('h2', null, 'Collapsible vs traditional: side-by-side'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Attribute'),
            h('th', { className: 'text-left p-2 border-b' }, 'Collapsible'),
            h('th', { className: 'text-left p-2 border-b' }, 'Traditional 28-in PVC'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Stowed footprint'), h('td', { className: 'p-2' }, '1–2 in stack'), h('td', { className: 'p-2' }, '14–18 in stack')),
          h('tr', null, h('td', { className: 'p-2' }, 'Weight'), h('td', { className: 'p-2' }, '0.5–1.5 lb'), h('td', { className: 'p-2' }, '7 lb (base + body)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Deploy time'), h('td', { className: 'p-2' }, '1 sec / cone'), h('td', { className: 'p-2' }, '2–3 sec / cone')),
          h('tr', null, h('td', { className: 'p-2' }, 'Wind tolerance'), h('td', { className: 'p-2' }, 'Low (~10 mph)'), h('td', { className: 'p-2' }, 'High (~30 mph)')),
          h('tr', null, h('td', { className: 'p-2' }, 'MUTCD work zone OK?'), h('td', { className: 'p-2' }, 'No'), h('td', { className: 'p-2' }, 'Yes (sized correctly)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Reflective grade'), h('td', { className: 'p-2' }, 'Tape (varies)'), h('td', { className: 'p-2' }, 'ASTM Type IV/V')),
          h('tr', null, h('td', { className: 'p-2' }, 'Cost per cone (28-in)'), h('td', { className: 'p-2' }, '$15–$30'), h('td', { className: 'p-2' }, '$18–$35')),
          h('tr', null, h('td', { className: 'p-2' }, 'Cycles to failure'), h('td', { className: 'p-2' }, '300–800 deploys'), h('td', { className: 'p-2' }, '3–5 years outdoor')),
        ),
      ),
    ),

    h('h2', null, 'Sizes — what to buy for which job'),
    h('h3', null, '12-inch collapsible (mini)'),
    h(
      'p',
      null,
      'Indoor only. Warehouse aisle marking, retail spill containment, valet operations on small lots. Not visible from a driver\'s seat at any real distance.',
    ),
    h('h3', null, '18-inch collapsible'),
    h(
      'p',
      null,
      'Parking lots, valet, indoor garage, residential driveway. Acceptable for daytime work in zones below 25 mph. The most-bought size for fleet and personal-use 5-packs.',
    ),
    h('h3', null, '28-inch collapsible'),
    h(
      'p',
      null,
      'The size most patrol agencies and tow companies stock. Daytime visibility at highway speed is acceptable; nighttime / high-speed visibility is not.',
    ),
    h('h3', null, 'Reflective collar add-ons'),
    h(
      'p',
      null,
      'Some manufacturers sell separate ASTM Type IV reflective collars that strap onto a collapsible. This bumps nighttime visibility significantly — closer to a true traffic cone. Worth the $5–10 add-on if any of your work runs into low light.',
    ),

    h('h2', null, 'What to buy: by use case'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Patrol vehicle / EMS / fire (incident scene control):'), ' 6–12 × 28-inch spring-coil collapsibles in a duffle bag. Add reflective Type IV collars. Refresh annually.'),
      h('li', null, h('strong', null, 'Tow truck / fleet service:'), ' 8 × 28-inch collapsibles plus 2 × traditional 28-inch (for staging the tow). The traditionals stay put while the truck moves; collapsibles get re-stowed quickly.'),
      h('li', null, h('strong', null, 'Valet / parking enforcement / property mgmt:'), ' 20 × 18-inch collapsibles in a wheeled tote. Not for highway-adjacent jobs.'),
      h('li', null, h('strong', null, 'Personal / weekend driver:'), ' 5-pack of 18-inch collapsibles in the trunk. Cheap insurance for a flat tire on a busy road.'),
      h('li', null, h('strong', null, 'Contractor working on real road work zones:'), ' Skip collapsibles. Buy traditional MUTCD-spec cones — 28-inch with 7-lb base and double reflective collar. See our ',
        h('a', { href: '/blog/road-cones-vs-traffic-cones' }, 'road cones vs traffic cones guide'), ' for the size-by-application math.'),
    ),

    h('h2', null, 'Pricing (Apr 2026)'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '12-in spring-coil, single:'), ' $8–$15.'),
      h('li', null, h('strong', null, '18-in spring-coil, single:'), ' $15–$25.'),
      h('li', null, h('strong', null, '28-in spring-coil, single:'), ' $25–$40.'),
      h('li', null, h('strong', null, '28-in accordion / hard-shell:'), ' $35–$55. Heavier-duty, longer life, recommended for daily-deploy fleet vehicles.'),
      h('li', null, h('strong', null, 'Add-on Type IV reflective collar:'), ' $5–$10. Big nighttime-visibility upgrade.'),
      h('li', null, h('strong', null, 'Carry duffle (holds 12 × 28-in collapsed):'), ' $25–$50.'),
    ),

    h('h2', null, 'Common mistakes when buying collapsibles'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Buying for a job that needs a real cone.'), ' Contractors who buy collapsibles for road work get cited and have to replace the whole set. Match the cone to the application.'),
      h('li', null, h('strong', null, 'Skipping the reflective collar.'), ' Plain orange fabric is fine in daylight; in low light, the collar is what makes the cone show up.'),
      h('li', null, h('strong', null, 'Storing them compressed long-term.'), ' Spring-coil cones lose tension when stored compressed for months. Store them deployed (or at half-compress) if they\'ll sit for more than a few weeks.'),
      h('li', null, h('strong', null, 'Forgetting they need wind weight.'), ' On a windy day, even an 18-inch collapsible needs to be set on an asphalt patch, weighted with a small sandbag, or backed by a vehicle.'),
    ),

    h('h2', null, 'Where to buy collapsible traffic cones in NJ'),
    h(
      'p',
      null,
      'For NJ fleet ops, tow companies, property managers, and contractors stocking a service vehicle, ',
      h('a', { href: '/category/cones-drums' }, 'browse our cones and channelizers catalog'),
      ' — we stock 18-inch and 28-inch spring-coil and accordion-style collapsibles, plus matching duffles and Type IV reflective collar add-ons. Same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon counties. Need a mixed kit (collapsibles for the quick stuff, traditional MUTCD cones for the full work zone)? ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' — describe how you\'ll deploy them and we\'ll spec the mix.',
    ),
  ),
  faqs: [
    {
      q: 'Are collapsible traffic cones MUTCD compliant?',
      a: 'Most are not. The MUTCD specifies minimum heights (28 in for >35 mph daytime, 36 in for nighttime / high-speed) and ASTM Type IV/V reflective sheeting. Typical collapsible cones use polyester fabric with applied reflective tape, which does not meet the sheeting standard, and the base weight is far below the 7–12 lb required for stability. They are fine for parking lots, fleet ops, and short-duration low-speed deployments — not for contractor road work zones.',
    },
    {
      q: 'How long do collapsible cones last?',
      a: 'Spring-coil designs typically survive 300–800 deploy/collapse cycles before the spring weakens enough that the cone sags or won\'t fully extend. Accordion / hard-shell designs last longer (1,500+ cycles) but cost more upfront. UV exposure also fades the orange fabric within 18–24 months of regular outdoor use.',
    },
    {
      q: 'Can I use collapsible cones on a highway?',
      a: 'No. A collapsible cone gets sucked into the slipstream of a passing tractor-trailer at highway speed. Traditional 7-lb-base cones stay put. For any work above 35 mph, use full-spec MUTCD traffic cones (28-inch with 7-lb base minimum) or 36-inch channelizer drums for freeway-grade work.',
    },
    {
      q: 'How many collapsible cones can I fit in a patrol car trunk?',
      a: 'A typical sedan trunk fits 12–20 collapsed 28-inch cones in a duffle, vs about 2 traditional 28-inch cones standing in the same space. SUV / utility-vehicle trunks fit 30+ collapsibles. The compact form factor is the entire reason patrol agencies and EMS use them.',
    },
    {
      q: 'Can I add reflective collars to collapsible cones for nighttime visibility?',
      a: 'Yes — many manufacturers sell add-on Type IV reflective collars that strap or velcro onto a collapsible cone. Adds about 50–80% to the nighttime visibility distance. For any patrol or response use that runs into low light, the $5–10 collar add-on is the most cost-effective upgrade you can make.',
    },
    {
      q: 'What is the difference between collapsible and traditional traffic cones?',
      a: 'Collapsible cones fold flat for storage (1–2 in stack height) using a spring or accordion mechanism, weigh 0.5–1.5 lb, and use fabric with reflective tape. Traditional cones are rigid PVC over a 7–12 lb rubber base with ASTM Type IV/V reflective sheeting. Collapsibles win on portability and quick deploy; traditionals win on stability, MUTCD compliance, and longevity outdoors.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Flares, Markers, Wands & Flags', path: '/category/flares-markers-wands-flags' },
    { label: 'Safety Vests & Hi-Vis Apparel', path: '/category/safety-vests-hi-vis' },
  ],
  relatedArticles: [
    'road-cones-vs-traffic-cones',
    'parking-cones-buying-guide',
    'traffic-cones-buying-guide',
  ],
}
