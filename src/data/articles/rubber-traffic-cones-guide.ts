import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "rubber traffic cones" (~500/mo, High comp, $10.99 bid).
 * Commercial comparison structure: rubber vs PVC vs hybrid, with a buyer's
 * table, durability notes, and use-case picker.
 */
export const articleRubberTrafficConesGuide: Article = {
  slug: 'rubber-traffic-cones-guide',
  title: 'Rubber Traffic Cones: When the Material Actually Matters',
  excerpt:
    'Rubber traffic cones are the heaviest, most impact-tolerant cone format on the market. They cost more than PVC and outlast PVC in heavy-impact use — but only some jobs need that durability.',
  metaDescription:
    'Rubber traffic cones vs PVC and hybrid cones — buyer guide covering weight, durability, MUTCD compliance, pricing, and when rubber is worth the upcharge.',
  primaryKeyword: 'rubber traffic cones',
  secondaryKeywords: [
    'rubber traffic cone',
    'rubber cones',
    'rubber vs pvc traffic cones',
    'recycled rubber cones',
    'heavy duty traffic cones',
    'rubber base traffic cones',
  ],
  targetVolume: 500,
  datePublished: '2026-05-18',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Rubber traffic cones — solid-rubber body or rubber-base with a PVC sleeve — are the heaviest, most impact-tolerant cone format on the market. ',
      h('strong', null, 'They cost roughly 1.5x to 2x what equivalent PVC cones cost and outlast PVC by 2–4x in heavy-impact use, but only some jobs justify the upcharge.'),
      ' This guide covers the three rubber cone formats, when each is the right buy, and how rubber stacks up against PVC and PVC-with-rubber-base hybrids.',
    ),

    h('h2', null, 'The three "rubber" cone formats — and what people actually mean'),
    h(
      'p',
      null,
      '"Rubber traffic cones" is used loosely. Three distinct products live under that label, and they perform very differently:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Solid rubber cones '), '— the body itself is molded from solid or recycled rubber. Heaviest format, most expensive, longest-lived under repeated impact. Common in 18" and 28" heights for high-traffic municipal use.'),
      h('li', null, h('strong', null, 'Rubber-base PVC cones '), '— a PVC cone body sitting on a separate, heavy rubber base. The cone body is the same PVC as a standard cone; the base is what is rubber. Common across 28" highway-grade cones. Many buyers think they are getting solid rubber and are not.'),
      h('li', null, h('strong', null, 'Recycled rubber cones '), "— a subset of solid rubber, manufactured from reclaimed tire rubber. Functionally identical to virgin solid rubber for traffic-control purposes but often discounted 10–15%. Look for the recycled-content callout if it's a procurement requirement."),
    ),

    h('h2', null, 'Where rubber actually pays off'),
    h(
      'p',
      null,
      'The case for rubber is durability under repeated impact. Specifically:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Cones placed at intersections, drive-thru entries, parking-lot turns — anywhere vehicles routinely brush them. Rubber rebounds; PVC cracks at the base after a dozen serious hits.'),
      h('li', null, 'High-heat asphalt zones. PVC softens above ~140°F surface temp and starts to bend at the cone shoulder. Solid rubber holds shape through summer pavement temps that flex PVC.'),
      h('li', null, 'Multi-year fixed installations — toll plazas, permanent lane markers, perpetual entry-exit channelizers. Solid rubber lasts 5–7 years; PVC starts UV-fading at year 2 and cracks at year 3–4.'),
      h('li', null, 'Locations where weighted bases are required by ordinance — many municipalities now require minimum cone base weight, and solid-rubber cones satisfy that without an external ballast ring.'),
    ),

    h('h2', null, 'Where PVC still wins'),
    h(
      'p',
      null,
      "Rubber isn't always the right call. PVC is the better buy when:",
    ),
    h(
      'ul',
      null,
      h('li', null, 'You move cones daily — PVC is half the weight, which matters on a 60-cone set-up and tear-down.'),
      h('li', null, "Visibility is the priority, not impact tolerance — the fluorescent orange on a fresh PVC cone reads brighter than rubber because rubber's pigment scatters less light."),
      h('li', null, 'Budget is constrained and the cone is replaceable — for short-duration utility work, 10 PVC cones cost about the same as 5 solid-rubber cones.'),
      h('li', null, "You need a foldable, collapsible, or stackable cone — rubber doesn't compress, and rubber-base PVC is awkward to stack high."),
    ),

    h('h2', null, 'Comparison table: solid rubber vs rubber-base vs PVC'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', { className: 'border-b' },
            h('th', { className: 'text-left p-2' }, 'Property'),
            h('th', { className: 'text-left p-2' }, 'Solid rubber'),
            h('th', { className: 'text-left p-2' }, 'Rubber-base PVC'),
            h('th', { className: 'text-left p-2' }, 'Standard PVC'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Weight (28")'),
            h('td', { className: 'p-2' }, '10–12 lbs'),
            h('td', { className: 'p-2' }, '7–10 lbs'),
            h('td', { className: 'p-2' }, '4–7 lbs'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Price each (28")'),
            h('td', { className: 'p-2' }, '$28–$45'),
            h('td', { className: 'p-2' }, '$18–$28'),
            h('td', { className: 'p-2' }, '$12–$20'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Impact tolerance'),
            h('td', { className: 'p-2' }, 'Excellent'),
            h('td', { className: 'p-2' }, 'Good'),
            h('td', { className: 'p-2' }, 'Fair'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'UV / heat resistance'),
            h('td', { className: 'p-2' }, 'Excellent'),
            h('td', { className: 'p-2' }, 'Good (body fades)'),
            h('td', { className: 'p-2' }, 'Fair'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Typical lifespan'),
            h('td', { className: 'p-2' }, '5–7 years'),
            h('td', { className: 'p-2' }, '3–5 years'),
            h('td', { className: 'p-2' }, '2–3 years'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'MUTCD compliant'),
            h('td', { className: 'p-2' }, 'Yes'),
            h('td', { className: 'p-2' }, 'Yes'),
            h('td', { className: 'p-2' }, 'Yes'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Stackable'),
            h('td', { className: 'p-2' }, 'Limited'),
            h('td', { className: 'p-2' }, 'Yes'),
            h('td', { className: 'p-2' }, 'Yes'),
          ),
        ),
      ),
    ),

    h('h2', null, 'MUTCD compliance and the reflective question'),
    h(
      'p',
      null,
      'All three formats meet MUTCD §6F.65 traffic cone requirements when specced correctly: 28" minimum height for freeway and posted-speed roads, two retroreflective bands (6" and 4") on the body, fluorescent orange color. Material is not a compliance criterion — body shape, height, and reflective banding are.',
    ),
    h(
      'p',
      null,
      'One thing to watch on solid rubber: the rubber body absorbs more light than PVC, so the same Type IV reflective sheeting reads about 10–15% dimmer at night than on a PVC body. Spec ASTM Type V or higher on rubber cones used on highway work — the upcharge is small and the visibility gain is worth it.',
    ),

    h('h2', null, 'Quick picker: which rubber cone for which job'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Toll plaza, perpetual lane channelizer '), '— solid rubber, 28" or 36", Type V reflective.'),
      h('li', null, h('strong', null, 'Parking-lot entry, drive-thru, fast-food channelizing '), '— rubber-base PVC, 18" or 28", whichever the sight-lines need.'),
      h('li', null, h('strong', null, 'Crash investigation, accident-scene marker '), '— solid rubber 28" — rebounds when grazed, will not roll into the road.'),
      h('li', null, h('strong', null, 'Daily contractor set-up/tear-down on residential streets '), '— standard PVC, 28", because weight per cone matters across a 30-cone set.'),
      h('li', null, h('strong', null, 'Hot-pavement summer paving job '), '— solid rubber, full stop. PVC will fold.'),
    ),
    h(
      'p',
      null,
      'For specs and current pricing across the rubber and PVC ranges, see our ',
      h('a', { href: '/category/cones' }, 'Cones, Drums & Channelizers'),
      ' page, or chat with our ',
      h('a', { href: '/assistant' }, 'Assistant'),
      ' for a count and material recommendation based on your job.',
    ),

    h('h2', null, 'Buying mistakes we see'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Paying solid-rubber prices for rubber-base PVC. '), 'Many listings say "rubber cone" when the body is PVC and only the base is rubber. Check the weight: a true solid-rubber 28" weighs 10+ lbs. A rubber-base PVC weighs 7–10 lbs.'),
      h('li', null, h('strong', null, 'Buying rubber for short-term jobs. '), "If the cone set will be in service less than 2 years, the durability advantage doesn't pay back. PVC is the right buy."),
      h('li', null, h('strong', null, 'Skipping reflective sheeting on rubber. '), "Rubber bodies dim sheeting visibility — don't try to save money by going Type III when the cone is rubber and the road is fast."),
      h('li', null, h('strong', null, 'Buying mixed lots. '), "If half your cones are rubber and half are PVC, set-up speed gets bottlenecked by the heaviest unit. Pick a format per job and stick with it."),
    ),

    h('h2', null, 'Bottom line'),
    h(
      'p',
      null,
      "Buy solid-rubber cones for fixed installations, high-impact zones, summer paving, and any cone you expect to redeploy for five-plus years. Buy rubber-base PVC for parking-lot channelizing where you want some weight but still need stackability. Buy standard PVC when daily set-up speed and per-cone cost matter more than impact tolerance — which is most contractor work.",
    ),
  ),
  faqs: [
    {
      q: 'Are rubber traffic cones MUTCD compliant?',
      a: 'Yes. MUTCD §6F.65 specifies height (28" minimum for high-speed roads), color (fluorescent orange), and retroreflective banding. Material is not a compliance criterion — solid rubber, rubber-base PVC, and standard PVC all qualify when specced correctly.',
    },
    {
      q: 'How heavy is a 28-inch rubber traffic cone?',
      a: 'Solid-rubber 28" cones weigh 10–12 lbs. Rubber-base PVC (PVC body with separate rubber base) weighs 7–10 lbs. Standard PVC weighs 4–7 lbs.',
    },
    {
      q: 'How long do rubber traffic cones last?',
      a: 'Solid-rubber cones typically last 5–7 years in heavy outdoor use, vs 2–3 years for standard PVC. Rubber-base PVC falls in between at 3–5 years — the rubber base outlasts the PVC body, which fades first.',
    },
    {
      q: 'Are rubber cones worth the extra cost?',
      a: "Yes for fixed installations, high-impact zones, hot-pavement work, and any cone you'll redeploy for 5+ years. No for short-term contractor jobs where daily set-up speed and per-cone cost matter more.",
    },
    {
      q: 'Do you sell rubber traffic cones with same-day delivery in NJ?',
      a: "Yes — we stock 28-inch solid-rubber and rubber-base PVC cones for same-day Central NJ delivery. Get a quote on /quote or chat with the Assistant for a count by job type.",
    },
    {
      q: "What's the difference between recycled rubber and virgin rubber cones?",
      a: "Functionally none for traffic control. Recycled rubber cones are manufactured from reclaimed tire rubber and typically run 10–15% cheaper, with the same weight, durability, and MUTCD compliance. Spec recycled if it's a procurement requirement; otherwise either works.",
    },
  ],
  relatedProducts: [
    { label: 'Browse cones, drums & channelizers', path: '/category/cones' },
    { label: 'Browse barricades', path: '/category/barricades' },
    { label: 'Get a delivery quote', path: '/quote' },
    { label: 'Chat with the Assistant', path: '/assistant' },
  ],
  relatedArticles: [
    'weighted-traffic-cones-guide',
    'traffic-cones-buying-guide',
    'reflective-traffic-cones-guide',
  ],
}
