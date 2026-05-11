import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "steel barricades" (~500/mo, High comp, $41.91 bid).
 * Decision-tree format: walks the buyer through steel vs. aluminum vs.
 * plastic depending on use, climate, and storage.
 */
export const articleSteelBarricadesGuide: Article = {
  slug: 'steel-barricades-guide',
  title: 'Steel Barricades: When the Heavier, Pricier Option Pays Back',
  excerpt:
    'Steel barricades cost 2–3x what plastic does and weigh five times as much. They also last 10–15 years instead of 5–7 and survive vehicle strikes that destroy plastic. Here is the decision tree on when steel is the right buy.',
  metaDescription:
    'Steel barricades vs aluminum and plastic — durability, crash performance, cost-per-year math, and the decision tree for when steel is the right purchase.',
  primaryKeyword: 'steel barricades',
  secondaryKeywords: [
    'steel barricade',
    'metal barricades',
    'galvanized barricades',
    'steel crowd control barriers',
    'steel pedestrian barricades',
    'bike rack barricades',
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
      'Steel barricades are the heavyweight choice in the barricade catalog — and they cost like it. ',
      h('strong', null, 'A 40-lb galvanized steel pedestrian barricade runs $90–$160 retail; a comparable plastic unit runs $25–$60.'),
      ' The premium is real, but so are the use cases where steel pays back: high-use municipal fleets, event-staging companies, military and federal installations, and any deployment where the barricade will be loaded, unloaded, and abused thousands of times over its life. Here is the decision tree.',
    ),

    h('h2', null, 'The decision tree, top to bottom'),
    h('h3', null, 'Step 1 — How many deploy-days per year?'),
    h(
      'p',
      null,
      'Under 20 deploy-days a year, plastic almost always wins on total cost. Over 60 deploy-days a year, steel\'s 10–15 year service life starts to dominate the math. In the 20–60 zone, it depends on what kind of abuse the barricade sees (next step).',
    ),
    h('h3', null, 'Step 2 — What kind of abuse?'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Crowd loading (people leaning, pushing):'), ' Steel handles it without bending. Plastic flexes and develops permanent set after enough cycles.'),
      h('li', null, h('strong', null, 'Vehicle strikes (rare but inevitable on event work):'), ' Galvanized steel barricades typically survive a low-speed nudge with minor cosmetic damage. Plastic units crack or shatter.'),
      h('li', null, h('strong', null, 'Stacking and transport drops:'), ' Steel takes drops; plastic chips at the corners.'),
      h('li', null, h('strong', null, 'Salt-air or chemical exposure:'), ' Galvanized steel resists salt; uncoated steel rusts fast. In coastal NJ, only buy hot-dipped galvanized or aluminum.'),
    ),
    h('h3', null, 'Step 3 — Where is it stored?'),
    h(
      'p',
      null,
      'Steel barricades stored outdoors year-round in NJ will develop surface rust on the welds within 4–6 years even when galvanized; uncoated steel rusts within 1–2 winters. If you cannot store under cover, you are looking at either hot-dipped galvanized steel or anodized aluminum — both add ~15–25% to the price but more than pay back over a decade.',
    ),
    h('h3', null, 'Step 4 — Indoor or outdoor color requirements?'),
    h(
      'p',
      null,
      'Most steel barricades come in galvanized (silver) or powder-coated finishes. Powder coat lets you specify color (orange, yellow, red, black) but adds $15–$30 per unit and chips over time. Galvanized is bulletproof for outdoor use but reads "construction" rather than "event-clean." For weddings, concerts, hospitality venues — powder-coated black or white is the standard.',
    ),

    h('h2', null, 'Steel barricade subtypes'),
    h('h3', null, 'Bike-rack / pedestrian barricades'),
    h(
      'p',
      null,
      'The most common steel barricade — flat-faced, horizontal-bar rectangles that interlock end-to-end. Typically 42 in tall × 6.5–8 ft long. Used for crowd control at events, queue management, and pedestrian-vehicle separation. Sometimes called "French barriers" or "police barricades." See our ',
      h('a', { href: '/blog/crowd-control-barriers-buying-guide' }, 'crowd-control barriers buying guide'),
      ' for the head-to-head against plastic and aluminum.',
    ),
    h('h3', null, 'A-frame Type I and Type II'),
    h(
      'p',
      null,
      'Steel versions of standard MUTCD Type I and Type II construction barricades. Heavier and more durable than plastic A-frames; same reflective sheeting requirements. The right pick for municipal fleets that redeploy daily. Our ',
      h('a', { href: '/blog/a-frame-barricades-guide' }, 'A-frame barricades guide'),
      ' has the spec details.',
    ),
    h('h3', null, 'Expandable / accordion'),
    h(
      'p',
      null,
      'Hinged steel barricades that fold compact for storage and stretch to 6–12 ft when deployed. Heavier than aluminum versions but more durable on the hinges. See our ',
      h('a', { href: '/blog/expandable-barricade-guide' }, 'expandable barricade guide'),
      '.',
    ),
    h('h3', null, 'Heavy industrial / blast'),
    h(
      'p',
      null,
      'Specialty steel barricades used at federal facilities, military bases, and high-security venues. Reinforced rails, deep base plates, sometimes anchored to the ground. Out of scope for most contractor and event buyers — typically procured directly from manufacturers.',
    ),

    h('h2', null, 'Cost-per-year math'),
    h(
      'p',
      null,
      'The argument for steel is service life. Here is the rough math for a single pedestrian / bike-rack barricade used 50 times a year:',
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
            h('th', { className: 'text-left p-2 border-b' }, 'Material'),
            h('th', { className: 'text-left p-2 border-b' }, 'Unit price'),
            h('th', { className: 'text-left p-2 border-b' }, 'Service life'),
            h('th', { className: 'text-left p-2 border-b' }, 'Cost/year'),
            h('th', { className: 'text-left p-2 border-b' }, 'Cost/deploy (50/yr)'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Plastic'), h('td', { className: 'p-2' }, '$45'), h('td', { className: 'p-2' }, '5 yr'), h('td', { className: 'p-2' }, '$9.00'), h('td', { className: 'p-2' }, '$0.18')),
          h('tr', null, h('td', { className: 'p-2' }, 'Aluminum'), h('td', { className: 'p-2' }, '$110'), h('td', { className: 'p-2' }, '12 yr'), h('td', { className: 'p-2' }, '$9.17'), h('td', { className: 'p-2' }, '$0.18')),
          h('tr', null, h('td', { className: 'p-2' }, 'Steel (galvanized)'), h('td', { className: 'p-2' }, '$120'), h('td', { className: 'p-2' }, '15 yr'), h('td', { className: 'p-2' }, '$8.00'), h('td', { className: 'p-2' }, '$0.16')),
          h('tr', null, h('td', { className: 'p-2' }, 'Steel (powder-coat)'), h('td', { className: 'p-2' }, '$145'), h('td', { className: 'p-2' }, '12 yr'), h('td', { className: 'p-2' }, '$12.08'), h('td', { className: 'p-2' }, '$0.24')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'On a cost-per-year basis, galvanized steel is the cheapest option for high-use buyers. The headline price is higher, but it stretches across more years. Plastic only wins for low-use buyers where the units rarely cycle and you would rather lock in low upfront cost.',
    ),

    h('h2', null, 'Galvanized vs. powder-coated — pick one'),
    h(
      'p',
      null,
      'Galvanized steel is dipped in molten zinc — the coating is bonded into the metal surface and lasts 25+ years against rust. Powder-coated steel has a baked-on plastic finish — pretty, color-customizable, but chips and exposes raw steel to weather over time. The rule of thumb: outdoor / heavy-use → galvanized. Indoor / hospitality / color-matched → powder coat. Many event-staging companies own both fleets for different jobs.',
    ),

    h('h2', null, 'Storage and handling — the part people forget'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Steel barricades stack on edge, not flat.'), ' Flat-stacking causes the bottom unit to deform under the load. Use upright racks or vertical hangers.'),
      h('li', null, h('strong', null, 'Trailer math.'), ' A 16-ft trailer holds roughly 50 steel bike-rack barricades stacked on edge. Same trailer holds 80–100 plastic units. Plan transport accordingly.'),
      h('li', null, h('strong', null, 'Repair vs. replace.'), ' Bent steel rails can be re-welded; cracked plastic cannot be fixed. Set up a quick re-weld station if you run a steel fleet — pays back in 6–12 months versus replacement.'),
    ),

    h('h2', null, 'What a steel-barricade kit costs'),
    h(
      'p',
      null,
      'For a small NJ event-staging or municipal contractor outfitting a working fleet:',
    ),
    h(
      'ul',
      null,
      h('li', null, '30× 8-ft galvanized steel bike-rack barricades: $3,200–$4,800'),
      h('li', null, '4× 8-ft steel A-frame Type II construction barricades: $400–$700'),
      h('li', null, '6× steel storage racks (10 units each): $600–$1,200'),
      h('li', null, 'Hot-dip touch-up paint and bolt-replacement kit: $100–$200'),
    ),
    h(
      'p',
      null,
      'Total: ~$4,300–$6,900 for a fleet that covers ~250 ft of perimeter with multi-decade durability. ',
      h('a', { href: '/category/barricades-barriers' }, 'See our barricades catalog'),
      ' or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' for bulk pricing. Same-day delivery available across Central NJ.',
    ),

    h('h2', null, 'When NOT to buy steel'),
    h(
      'p',
      null,
      'Skip steel if any of these are true: you redeploy fewer than 15 days a year, your storage is exposed coastal air without a galvanized option, your truck capacity is the constraint (steel cuts your per-load count in half), or you need crashworthy positive protection on a road work zone (use water-filled or concrete barriers, not steel barricades). For roadway use specifically, see our ',
      h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'water-filled barriers guide'),
      ' instead.',
    ),
  ),
  faqs: [
    {
      q: 'Are steel barricades worth the extra money?',
      a: 'For high-use buyers (50+ deploy-days a year) galvanized steel has the lowest cost-per-year of any barricade material because it lasts 12–15 years versus 5–7 for plastic. For low-use buyers, the upfront premium does not pay back and plastic is the better choice.',
    },
    {
      q: 'How heavy is a steel barricade?',
      a: 'A standard 8-ft galvanized steel pedestrian / bike-rack barricade weighs 35–55 lb. A steel A-frame Type II barricade weighs 60–90 lb. Heavy industrial steel barricades for security applications can weigh 200+ lb. Plan two-person handling for anything above ~40 lb.',
    },
    {
      q: 'Do steel barricades rust?',
      a: 'Uncoated steel rusts within 1–2 NJ winters left outdoors. Hot-dipped galvanized steel resists rust for 20–25 years even outdoors, with surface oxidation appearing at welds and chips after 4–6 years. Powder-coated steel rusts wherever the coating chips and exposes raw metal. For outdoor use, buy galvanized.',
    },
    {
      q: 'Steel vs. aluminum barricades — which is better?',
      a: 'Aluminum is lighter (30–40% lighter than steel) and rust-proof but costs ~20–30% more for equivalent strength. Steel is heavier, lower-cost per pound of structure, and (when galvanized) lasts longer. For event teams loading and unloading constantly, aluminum is easier on the back; for municipal fleets storing on racks, steel is cheaper per year.',
    },
    {
      q: 'Can I use steel barricades on a road work zone?',
      a: 'Steel A-frame Type I, II, and III barricades are MUTCD-compliant for road work as long as they carry the required reflective sheeting (ASTM Type IV minimum) and are anchored. Steel pedestrian / bike-rack barricades are not appropriate for vehicle-speed roadway work — they are sized and shaped for crowd control, not traffic channelization.',
    },
    {
      q: 'How long do steel barricades last?',
      a: 'Galvanized steel barricades stored properly last 15–20+ years. Powder-coated steel lasts 10–12 years before the coating wear becomes serviceable. Uncoated steel kept outdoors year-round in NJ typically reaches end-of-life within 5–7 years from rust at the welds.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Crowd Control Barriers', path: '/category/barricades-barriers' },
    { label: 'Pedestrian Barriers', path: '/category/barricades-barriers' },
    { label: 'Request a quote', path: '/quote' },
  ],
  relatedArticles: [
    'metal-barricades-buying-guide',
    'crowd-control-barriers-buying-guide',
    'a-frame-barricades-guide',
  ],
}
