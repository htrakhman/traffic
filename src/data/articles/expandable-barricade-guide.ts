import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "expandable barricade" (~500/mo, High comp, $19.72 bid).
 * FAQ-heavy AEO format. Definitional, with deep Q/A coverage on use cases,
 * sizes, and how expandables stack against fixed barricades.
 */
export const articleExpandableBarricadeGuide: Article = {
  slug: 'expandable-barricade-guide',
  title: 'Expandable Barricade: What It Is, When to Use One, and What to Pay',
  excerpt:
    'An expandable barricade is an accordion-style barrier that opens from 2–3 ft to 6–12 ft in seconds. Great for quick deployments, indoor crowd lines, and emergency-response setups. Here is when it beats a fixed barricade and when it does not.',
  metaDescription:
    'Expandable barricades explained — accordion barriers, sizes, use cases (events, emergency, indoor), price ranges, and where they beat traditional fixed barricades.',
  primaryKeyword: 'expandable barricade',
  secondaryKeywords: [
    'expandable barricades',
    'accordion barricade',
    'retractable barricade',
    'expanding barricade',
    'collapsible barricade',
    'portable barricade',
  ],
  targetVolume: 500,
  datePublished: '2026-05-11',
  readMinutes: 6,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'An expandable barricade is a hinged, accordion-style barrier that stores in a compact 2–3 ft package and stretches out to 6–12 ft when deployed. ',
      h('strong', null, 'They solve one specific problem: needing 100 ft of barrier on hand without burning 100 ft of truck space when you are not using them.'),
      ' Event teams, emergency responders, and indoor facilities lean on them; road contractors usually do not. Here is the full sort on when an expandable barricade is the right call.',
    ),

    h('h2', null, 'What an expandable barricade actually is'),
    h(
      'p',
      null,
      'Physically: a series of vertical panels (usually 4–8 of them) connected by accordion hinges, mounted on small caster wheels or rubber feet. Collapsed, the unit takes ~2–3 sq ft of floor space. Pulled open, the panels splay out into a fence-like line 6–12 ft long. Some industrial models reach 15+ ft. The panels are typically powder-coated steel, anodized aluminum, or a polymer composite, with reflective sheeting on the road-facing side.',
    ),
    h(
      'p',
      null,
      'You may also see them called accordion barricades, expanding barricades, X-fence, or scissor barricades. The product class is the same.',
    ),

    h('h2', null, 'Where an expandable barricade beats a fixed one'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Storage-limited fleets.'), ' 10 expandables that cover 100 ft store in the space of 1 fixed 8-ft barricade lying on its side.'),
      h('li', null, h('strong', null, 'Rapid deployment.'), ' One person can deploy a 10-ft expandable in 5–8 seconds. The same coverage in fixed Type I or II barricades is 30+ seconds and 4 lift motions.'),
      h('li', null, h('strong', null, 'Indoor / facility use.'), ' Hospitals, airports, schools, and manufacturing plants use them for spill containment, hallway closures, and emergency rerouting. Caster wheels glide on tile and concrete floors.'),
      h('li', null, h('strong', null, 'Event and venue work.'), ' Stadium overflow, convention-hall queues, parade staging. Bright color and quick setup beat fixed bike-rack barricades.'),
      h('li', null, h('strong', null, 'Emergency response.'), ' Fire, EMS, and police agencies carry them in command vehicles to set up perimeter on arrival.'),
    ),

    h('h2', null, 'Where a fixed barricade is still the right call'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Roadway work (MUTCD §6F.63).'), ' Type I, II, and III fixed barricades are the spec\'d device for any vehicle-speed work zone. Expandables are not crashworthy and not sized for road use above 25 mph.'),
      h('li', null, h('strong', null, 'Long-duration closures.'), ' Anything running more than a week or two — a fixed barricade or water-filled barrier holds up better against wind, weather, and vehicle slipstream.'),
      h('li', null, h('strong', null, 'High-wind exposure.'), ' Expandables stand on small feet or casters; sustained winds above 20 mph push them around. Fixed barricades with sandbags or ballast hold better.'),
      h('li', null, h('strong', null, 'Positive protection.'), ' Expandables are visual / channelizing devices. If the engineer wants a barrier that physically redirects vehicles, you need concrete, water-filled, or steel.'),
    ),

    h('h2', null, 'Sizes and configurations'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Collapsed'),
            h('th', { className: 'text-left p-2 border-b' }, 'Expanded'),
            h('th', { className: 'text-left p-2 border-b' }, 'Panel count'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best for'),
            h('th', { className: 'text-left p-2 border-b' }, 'Retail'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '2 ft'), h('td', { className: 'p-2' }, '6 ft'), h('td', { className: 'p-2' }, '4'), h('td', { className: 'p-2' }, 'Hallway / single-door'), h('td', { className: 'p-2' }, '$220–$380')),
          h('tr', null, h('td', { className: 'p-2' }, '3 ft'), h('td', { className: 'p-2' }, '10 ft'), h('td', { className: 'p-2' }, '6'), h('td', { className: 'p-2' }, 'Event entry, indoor closure'), h('td', { className: 'p-2' }, '$320–$540')),
          h('tr', null, h('td', { className: 'p-2' }, '3.5 ft'), h('td', { className: 'p-2' }, '12 ft'), h('td', { className: 'p-2' }, '8'), h('td', { className: 'p-2' }, 'Lane channelization (≤ 25 mph)'), h('td', { className: 'p-2' }, '$420–$680')),
          h('tr', null, h('td', { className: 'p-2' }, '4 ft'), h('td', { className: 'p-2' }, '15 ft'), h('td', { className: 'p-2' }, '10'), h('td', { className: 'p-2' }, 'Wide perimeter, command post'), h('td', { className: 'p-2' }, '$580–$880')),
        ),
      ),
    ),
    h('p', null, 'Most contractor and event uses sit in the 6-panel / 10-ft range. Anything longer than 12 ft per unit gets heavy enough to need two people to position.'),

    h('h2', null, 'Materials and durability'),
    h('h3', null, 'Steel (powder-coated)'),
    h(
      'p',
      null,
      'Most durable, heaviest (~40–80 lb per 10-ft unit). Powder coating holds up indoors for 8–10+ years; outdoors, expect rust at the hinges within 3–4 years on units left out year-round. Steel is the choice for facility / industrial buyers.',
    ),
    h('h3', null, 'Aluminum'),
    h(
      'p',
      null,
      'Lighter (~25–45 lb per 10-ft), more expensive, rust-proof. The right pick for event teams that load and unload constantly. Anodized finishes hold color longer than painted steel.',
    ),
    h('h3', null, 'Polymer / composite'),
    h(
      'p',
      null,
      'Lightest (~15–30 lb per 10-ft), least expensive, but accordion hinges wear faster — typical service life 3–5 years versus 8+ for metal. Good for budget-constrained or short-term-use buyers.',
    ),

    h('h2', null, 'Reflective sheeting and color'),
    h(
      'p',
      null,
      'For any outdoor or low-light use, look for an expandable barricade with reflective sheeting on the front-facing panels. ASTM Type IV high-intensity prismatic is standard; Type IX is overkill for non-roadway use. Color choice depends on use case: orange/white for construction-adjacent work, yellow/black for facility hazards, red for emergency response. Some manufacturers offer custom color and logo wraps.',
    ),

    h('h2', null, 'How an expandable barricade compares to other portable options'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Device'),
            h('th', { className: 'text-left p-2 border-b' }, 'Deploy time / 10 ft'),
            h('th', { className: 'text-left p-2 border-b' }, 'Storage / 10 ft'),
            h('th', { className: 'text-left p-2 border-b' }, 'Outdoor durability'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Expandable'), h('td', { className: 'p-2' }, '5–8 sec'), h('td', { className: 'p-2' }, '~3 sq ft'), h('td', { className: 'p-2' }, 'Moderate (hinges)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Bike-rack'), h('td', { className: 'p-2' }, '30–60 sec'), h('td', { className: 'p-2' }, '~15 sq ft stacked'), h('td', { className: 'p-2' }, 'Good (galvanized)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type I plastic'), h('td', { className: 'p-2' }, '20–40 sec'), h('td', { className: 'p-2' }, '~10 sq ft'), h('td', { className: 'p-2' }, 'Good')),
          h('tr', null, h('td', { className: 'p-2' }, 'Cones'), h('td', { className: 'p-2' }, '15–25 sec'), h('td', { className: 'p-2' }, '~2 sq ft stacked'), h('td', { className: 'p-2' }, 'Moderate (UV fade)')),
        ),
      ),
    ),

    h('h2', null, 'What it costs and where to buy'),
    h(
      'p',
      null,
      'A typical 10-ft, 6-panel steel expandable barricade runs $320–$540 at retail in NJ. Aluminum units run 25–40% higher. Bulk pricing on 10+ units cuts ~10–15%. ',
      h('a', { href: '/category/barricades-barriers' }, 'See our barricade catalog'),
      ' for current selection or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' if you have a specific deploy length or color spec in mind. For Central NJ contractors and venues, same-day delivery is available.',
    ),

    h('h2', null, 'Quick decision summary'),
    h(
      'p',
      null,
      'Pick an expandable barricade if you need fast indoor or low-speed-outdoor deployment, your storage is limited, and you do not need crashworthy protection. Pick a fixed barricade (Type I/II/III) for vehicle-speed roadwork, long-duration closures, or anything wind-exposed. For a complete primer on barricade types, see our ',
      h('a', { href: '/blog/barricades-types-uses-guide' }, 'barricades types and uses pillar guide'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'What is an expandable barricade?',
      a: 'An expandable barricade is a hinged, accordion-style barrier that stores compactly (2–3 ft) and stretches to 6–12 ft when deployed. It is used for indoor closures, event channelization, emergency-response perimeters, and any application where storage space and rapid setup matter more than crashworthiness.',
    },
    {
      q: 'Can I use an expandable barricade on a road?',
      a: 'Only on very low-speed (≤ 25 mph) work zones such as parking lots, driveways, or private property. For posted speeds above 25 mph, the MUTCD specifies Type I, II, or III fixed barricades with reflective sheeting and adequate ballast. Expandable barricades are not crashworthy.',
    },
    {
      q: 'How long does an expandable barricade last?',
      a: 'Powder-coated steel units last 8–10+ years indoors and 3–5 years outdoors year-round (hinges rust first). Anodized aluminum lasts 10+ years even outdoors. Polymer / composite units last 3–5 years before hinge wear becomes noticeable.',
    },
    {
      q: 'How much does an expandable barricade cost?',
      a: 'A 6-panel, 10-ft steel expandable barricade runs $320–$540 NJ retail. Aluminum runs 25–40% more. Polymer/composite is cheaper ($220–$380 for similar dimensions) but with shorter service life.',
    },
    {
      q: 'Are expandable barricades reflective?',
      a: 'Most outdoor-rated models come with ASTM Type IV reflective sheeting on the front-facing panels. Indoor models may skip reflective sheeting in favor of high-contrast paint. If you need MUTCD-compliant reflectivity for any outdoor work, confirm Type IV prismatic sheeting before purchase.',
    },
    {
      q: 'Can expandable barricades be locked in place?',
      a: 'Most models include a locking pin or latch that holds them at full extension. Some industrial / event-grade models add casters with brakes so the unit cannot roll. For positive crowd-control containment, look for locking models with caster brakes plus end-panel pins.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Crowd Control Barriers', path: '/category/barricades-barriers' },
    { label: 'Pedestrian Barriers', path: '/category/barricades-barriers' },
    { label: 'Request a quote', path: '/quote' },
  ],
  relatedArticles: [
    'crowd-control-barriers-buying-guide',
    'pedestrian-barriers-guide',
    'barricades-types-uses-guide',
  ],
}
