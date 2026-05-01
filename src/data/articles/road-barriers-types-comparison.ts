import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "road barriers" (~5K/mo, High comp) — pillar comparison article.
 * Differs from "traffic-barriers-types-comparison" by leading with the
 * road-context use cases (highway, secondary road, residential).
 */
export const articleRoadBarriersTypesComparison: Article = {
  slug: 'road-barriers-buying-guide',
  title: 'Road Barriers: Concrete, Plastic, Water-Filled, and Steel — Which One Do You Actually Need?',
  excerpt:
    'Road barriers fall into four practical buckets — concrete jersey, plastic jersey, water-filled, and steel guardrail. Each has a different speed-rating, deployment time, and cost. Here is the decision tree for picking the right one.',
  metaDescription:
    'Road barriers compared: concrete jersey, plastic, water-filled, and steel guardrail. NCHRP/MASH crash ratings, deployment speed, and pricing for NJ road and work zone projects.',
  primaryKeyword: 'road barriers',
  secondaryKeywords: [
    'road traffic barrier',
    'safe barriers',
    'road barriers for sale',
    'highway barriers',
    'concrete road barriers',
    'plastic road barriers',
    'water-filled road barriers',
    'jersey barriers',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-01',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Road barriers fall into four practical categories: ',
      h('strong', null, 'concrete jersey, plastic jersey, water-filled, and steel guardrail'),
      '. The right one depends on three variables — design speed, expected vehicle redirect angle, and how fast you need to install. ',
      'Concrete jersey is the strongest (MASH TL-3 / TL-4 rated) but takes a crane to place. ',
      'Plastic jersey is a visual delineator only — it stops nothing, but installs in minutes and works for low-speed channelization. ',
      'Water-filled barriers (Triton, Yodock, RhinoGuard) sit in between: rated TL-2 to TL-3 when filled, install by hand, but slow to set up because they need water on site. ',
      'Steel guardrail is permanent infrastructure. The decision tree below maps each barrier type to the right job.',
    ),

    h('h2', null, 'The four road barrier types at a glance'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Barrier type'),
            h('th', { className: 'text-left p-2 border-b' }, 'Crash rating (MASH)'),
            h('th', { className: 'text-left p-2 border-b' }, 'Install time'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best for'),
            h('th', { className: 'text-left p-2 border-b' }, 'Approx. cost (each, 10-ft section)'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Concrete jersey'), h('td', { className: 'p-2' }, 'TL-3 / TL-4'), h('td', { className: 'p-2' }, 'Crane + hours'), h('td', { className: 'p-2' }, 'Long-duration work zones, freeway closures'), h('td', { className: 'p-2' }, '$700–$1,800 buy / $25–$50/day rent')),
          h('tr', null, h('td', { className: 'p-2' }, 'Plastic jersey (delineator)'), h('td', { className: 'p-2' }, 'None (channelizer only)'), h('td', { className: 'p-2' }, 'Minutes by hand'), h('td', { className: 'p-2' }, 'Low-speed channelization, parking lots, events'), h('td', { className: 'p-2' }, '$120–$280 buy')),
          h('tr', null, h('td', { className: 'p-2' }, 'Water-filled (Triton-style)'), h('td', { className: 'p-2' }, 'TL-2 / TL-3 when filled'), h('td', { className: 'p-2' }, 'Hand-place + fill on site'), h('td', { className: 'p-2' }, 'Mid-speed redirect, fast deployment'), h('td', { className: 'p-2' }, '$280–$650 buy')),
          h('tr', null, h('td', { className: 'p-2' }, 'Steel guardrail (W-beam)'), h('td', { className: 'p-2' }, 'TL-3 / TL-4'), h('td', { className: 'p-2' }, 'Permanent — multi-day install'), h('td', { className: 'p-2' }, 'Permanent roadside protection'), h('td', { className: 'p-2' }, '$25–$45 per linear foot')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'MASH (Manual for Assessing Safety Hardware) test levels: ',
      h('strong', null, 'TL-2'),
      ' is rated for 45 mph; ',
      h('strong', null, 'TL-3'),
      ' is rated for 62 mph; ',
      h('strong', null, 'TL-4'),
      ' is rated for 56 mph with a single-unit truck (heavier vehicle). For freeway-speed work zones, you typically want TL-3 minimum, often TL-4 if heavy trucks are in the redirect path.',
    ),

    h('h2', null, 'Concrete jersey barriers — the gold standard'),
    h(
      'p',
      null,
      'Concrete jersey barriers (the F-shape and New Jersey shape, both called "jersey" colloquially) are the strongest road barrier most projects will use. A 10-foot section weighs 4,000–5,500 lb, which is what gives them their crash rating. The shape is engineered to redirect a vehicle without launching it: the lower face deflects the wheel, the middle face begins the redirect, and the upper face guides the body of the vehicle back into traffic.',
    ),
    h(
      'p',
      null,
      'Use concrete jersey when:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'The work zone runs ≥3 days or in active traffic above 45 mph'),
      h('li', null, 'There is a hazard (drop-off, exposed worker, equipment) within the redirect zone'),
      h('li', null, 'The DOT spec calls for "positive protection" — most NJDOT freeway projects do'),
    ),
    h(
      'p',
      null,
      'Drawbacks: a crane truck or boom truck to place each section, real foundation prep on uneven ground, and 4–8 hours of setup time even with an experienced crew. For shorter jobs, water-filled barriers are usually the better pick.',
    ),

    h('h2', null, 'Plastic jersey barriers — channelizer, not crash protection'),
    h(
      'p',
      null,
      'A plastic jersey is jersey-shaped molded polyethylene, weighs 50–120 lb empty, and is sometimes filled with sand or water for a little extra inertia. Plastic jersey is ',
      h('strong', null, 'not crash-rated'),
      ' — it will not stop or redirect a vehicle at any meaningful speed. Its job is purely visual: telling drivers where the lane is, where pedestrian channels run, and where parking is closed.',
    ),
    h(
      'p',
      null,
      'Use plastic jersey for:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Parking lot channelization at events'),
      h('li', null, 'Pedestrian / spectator separation at parades, races, fairs'),
      h('li', null, 'Construction-site internal channelization (separating walkways from equipment paths)'),
      h('li', null, 'Low-speed (≤25 mph) traffic shaping where MUTCD does not require positive protection'),
    ),
    h(
      'p',
      null,
      'Do not use plastic jersey on a roadway above 25 mph unless paired with concrete or water-filled barrier — DOTs will reject the TCP and inspectors will cite the work zone.',
    ),

    h('h2', null, 'Water-filled barriers — the practical middle ground'),
    h(
      'p',
      null,
      'Water-filled barriers (sold under brand names like Yodock, Triton, RhinoGuard, BarrierGuard) are roto-molded polyethylene shells that get filled with water on site. Empty, a 6-foot section weighs 90–160 lb and a two-person crew can carry it. Filled, it weighs 800–1,400 lb per section — enough mass to redirect a passenger vehicle at TL-2 / TL-3 speeds without the crane truck a concrete barrier needs.',
    ),
    h(
      'p',
      null,
      'When water-filled is the right answer:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Short-duration jobs (1–14 days) where the cost of crane placement is disproportionate'),
      h('li', null, 'Mid-speed roads (35–55 mph) where TL-2 / TL-3 protection is sufficient'),
      h('li', null, 'Sites with no crane access — rooftops, urban alleys, parking decks'),
      h('li', null, 'Curved or irregular alignments — water-filled barriers connect with pin-and-loop joints that flex into curves more easily than concrete jersey'),
    ),
    h(
      'p',
      null,
      'Caveat: ',
      h('strong', null, 'they only work when filled'),
      '. An empty water-filled barrier is functionally equivalent to plastic jersey — a delineator, not crash protection. Plan for water access on site, and if the project runs through freezing weather, mix in a non-toxic glycol additive to keep them from cracking.',
    ),

    h('h2', null, 'Steel guardrail — permanent roadside protection'),
    h(
      'p',
      null,
      'W-beam steel guardrail is the permanent road barrier you see on shoulders, curves, and bridge approaches. It is installed with treated 6×8 wood or galvanized steel posts driven or set in concrete, with the W-beam itself bolted to brackets. Modern W-beam systems are MASH TL-3 rated when installed per AASHTO RDG (Roadside Design Guide) standards.',
    ),
    h(
      'p',
      null,
      'For a contractor, steel guardrail is rarely a "buy and deploy" decision the way temporary barriers are — it is a permanent installation called for in the project plans. Where it does come up: ',
      h('strong', null, 'guardrail repair'),
      ' after a vehicle hits an existing run. NJDOT and county roads use replaceable W-beam panels, treated posts, and end-treatment systems (BCT, ET-Plus, MAX-Tension, etc.) that are spec\'d in the original install drawings. Match the existing system; do not mix end-treatment types.',
    ),

    h('h2', null, 'Decision tree: which road barrier do I buy?'),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'Is the road above 25 mph and is there a crash hazard (worker, equipment, drop-off) within 30 ft?'), ' → Yes: skip plastic jersey, you need crash-rated. → No: plastic jersey or even just cones may be sufficient.'),
      h('li', null, h('strong', null, 'Is the project longer than 14 days and is the speed above 45 mph?'), ' → Yes: concrete jersey is usually the answer. → No: water-filled is usually cheaper and faster.'),
      h('li', null, h('strong', null, 'Do you have crane / boom-truck access at the site?'), ' → No: water-filled (or hire a crane). → Yes: concrete is on the table.'),
      h('li', null, h('strong', null, 'Is this a permanent installation in the project plans?'), ' → Yes: steel guardrail per AASHTO RDG / MASH-rated, matched to the spec. → No: temporary barrier.'),
    ),

    h('h2', null, 'NJ-specific notes'),
    h(
      'p',
      null,
      'NJDOT generally requires positive protection (concrete jersey or equivalent crash-rated barrier) on freeway and limited-access work zones. On county and municipal roads, water-filled is often acceptable for short-duration work — verify against the current NJDOT Standard Construction Details and the project-specific Traffic Control Plan. Section numbers in older spec versions get reorganized on each edition revision; if you cite a section by number, ',
      h('strong', null, 'confirm it against the current edition before committing'),
      '.',
    ),
    h(
      'p',
      null,
      'For projects in Central NJ, ',
      h('a', { href: '/category/barricades-barriers' }, 'browse our barricades and barriers'),
      ' — concrete jersey, water-filled, and plastic jersey, all with same-day delivery in Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean counties. ',
      'For a project-specific spec, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with the road class, design speed, and project duration, and we will recommend the right barrier mix.',
    ),

    h('h2', null, 'Where road barriers fail'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Empty water-filled barrier on a 50 mph road.'), ' Empty = no rating. Always fill before traffic exposure.'),
      h('li', null, h('strong', null, 'Plastic jersey deployed where positive protection was specified.'), ' DOT inspectors catch this — fail the inspection, redo the closure.'),
      h('li', null, h('strong', null, 'Mismatched end-treatments on guardrail.'), ' Mixing a BCT terminal with an ET-Plus run violates the original crash test certification.'),
      h('li', null, h('strong', null, 'Concrete jersey placed without lateral pin connections.'), ' Connection pins between sections are part of the crash rating; missing pins = barrier units displace independently on impact.'),
    ),
  ),
  faqs: [
    {
      q: 'What is the difference between road barriers and traffic barriers?',
      a: 'They overlap heavily. "Road barriers" usually refers to barriers deployed on or alongside a road — concrete jersey, water-filled, plastic jersey, or steel guardrail. "Traffic barriers" is a slightly broader term that includes those plus crowd-control barriers and pedestrian channelizers. In practice on a contractor invoice or DOT spec the terms are interchangeable; what matters is the MASH crash rating and the application.',
    },
    {
      q: 'Are plastic road barriers crash-rated?',
      a: 'Plastic jersey barriers (empty plastic) are not crash-rated. They are channelizers — visual lane delineators only. Plastic jersey will not stop or redirect a vehicle at any meaningful speed. Water-filled plastic barriers, when properly filled with water (not empty), are MASH TL-2 or TL-3 rated depending on the specific model.',
    },
    {
      q: 'When do I use concrete jersey vs. water-filled road barriers?',
      a: 'Concrete jersey when the project runs longer than 14 days, the speed is 45+ mph, or DOT spec calls for TL-4 protection. Water-filled when the job is short-duration, you do not have crane access, or the alignment is curved/irregular. Water-filled is typically faster to deploy by 4–8 hours per 100-foot run.',
    },
    {
      q: 'How much do road barriers cost?',
      a: 'In purchase pricing, plastic jersey runs $120–$280 per 6-ft section, water-filled $280–$650 per 6-ft section, concrete jersey $700–$1,800 per 10-ft section. Steel guardrail is $25–$45 per linear foot installed. Rental pricing for concrete jersey runs $25–$50 per section per day in NJ.',
    },
    {
      q: 'How fast can I install temporary road barriers?',
      a: 'Plastic jersey: 5–10 minutes per section by hand. Water-filled: 10–15 minutes per section to place, plus 30–60 seconds to fill once water is on site. Concrete jersey: 10–15 minutes per section with a crane truck; an experienced crew sets ~20 sections per shift.',
    },
    {
      q: 'Can I rent road barriers with same-day delivery in NJ?',
      a: 'For purchase, we offer same-day delivery on plastic jersey and water-filled barriers in Central NJ. Concrete jersey involves a crane-truck schedule, so request a quote 24–48 hours ahead for those. Browse our barricades and barriers category or request a quote with the project details.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Pedestrian Control', path: '/category/pedestrian-control' },
  ],
  relatedArticles: [
    'traffic-barriers-types-comparison',
    'jersey-barricades-guide',
    'type-iii-barricade-vs-type-i-type-ii',
  ],
}
