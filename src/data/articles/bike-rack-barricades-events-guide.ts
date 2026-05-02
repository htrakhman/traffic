import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "bike rack barricade" + "bicycle rack barricades" (~500/mo, High comp, $30+ bid).
 * Very high commercial intent (event organizers, municipalities, parade coordinators).
 */
export const articleBikeRackBarricadesEventsGuide: Article = {
  slug: 'bike-rack-barricades-events-guide',
  title: 'Bike Rack Barricades: Sizes, Quantities, and What to Buy for Crowd Control',
  excerpt:
    'Bike rack barricades — also called interlocking bicycle rack barricades or French barriers — are the standard for event crowd control, parade routes, and pedestrian channelizing. Sizes, weights, connectors, and how many you need.',
  metaDescription:
    'Bike rack barricades for events and crowd control: sizes, weights, interlocking systems, French-barrier styles, and how many you need per linear foot of perimeter.',
  primaryKeyword: 'bike rack barricade',
  secondaryKeywords: [
    'bicycle rack barricades',
    'interlocking bike rack barricades',
    'French barrier',
    'event crowd control barricade',
    'pedestrian event barricade',
    'parade route barricade',
  ],
  targetVolume: 500,
  datePublished: '2026-05-02',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A bike rack barricade — also called an "interlocking bicycle rack barricade" or "French barrier" — is the steel-frame crowd-control unit you see at parades, races, festivals, and political events. ',
      h('strong', null, 'Standard size is 8 ft long × 42 in tall, weighing 35–45 lbs steel.'),
      ' They interlock end-to-end via hooks-and-loops; a 100 ft pedestrian perimeter takes 13 units. The "French barrier" version is a more rigid alternative used for tighter security perimeters. Below: sizes, what to buy, how many, and the differences between the styles.',
    ),

    h('h2', null, 'Why "bike rack"? (Origin of the name)'),
    h(
      'p',
      null,
      'The name is a quirk: the original units in the 1970s were sized to look like the bike-parking racks already common in cities. Crowd-control planners borrowed the form factor because they were cheap, stackable, and recognizable. The name stuck even though almost no one parks bikes in them anymore.',
    ),

    h('h2', null, 'Standard sizes'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Length'), h('th', { className: 'text-left p-2 border-b' }, 'Height'), h('th', { className: 'text-left p-2 border-b' }, 'Weight'), h('th', { className: 'text-left p-2 border-b' }, 'Best use')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '6.5 ft'), h('td', { className: 'p-2' }, '42 in'), h('td', { className: 'p-2' }, '32 lb'), h('td', { className: 'p-2' }, 'Tight venues, indoor')),
          h('tr', null, h('td', { className: 'p-2' }, '8 ft'), h('td', { className: 'p-2' }, '42 in'), h('td', { className: 'p-2' }, '40 lb'), h('td', { className: 'p-2' }, 'Standard event / parade')),
          h('tr', null, h('td', { className: 'p-2' }, '8 ft'), h('td', { className: 'p-2' }, '50 in'), h('td', { className: 'p-2' }, '50 lb'), h('td', { className: 'p-2' }, 'Higher-security crowd / overflow')),
          h('tr', null, h('td', { className: 'p-2' }, '10 ft'), h('td', { className: 'p-2' }, '42 in'), h('td', { className: 'p-2' }, '52 lb'), h('td', { className: 'p-2' }, 'Long straight runs (rare)')),
        ),
      ),
    ),
    h('p', null, 'The 8 ft × 42 in is the workhorse — it is what every event-rental company stocks and what most municipal ordinances reference for parade-route requirements.'),

    h('h2', null, 'Steel vs. plated steel vs. galvanized'),
    h(
      'p',
      null,
      'The frame is always tubular steel, usually 1" round. The finish determines lifespan and price:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Painted steel:'), ' Cheapest. Powder-coated white, blue, yellow, or orange. Rusts at any chip in the coating; outdoor lifespan in NJ winter is 3–5 years.'),
      h('li', null, h('strong', null, 'Pre-galvanized steel:'), ' Mid-tier. Steel is galvanized before fabrication; weld points still rust. Lifespan 5–8 years outdoors.'),
      h('li', null, h('strong', null, 'Hot-dip galvanized:'), ' Premium. Galvanized after fabrication; covers welds. Lifespan 12–15 years outdoors. Weighs slightly more.'),
    ),
    h(
      'p',
      null,
      'For event-rental companies and municipalities, hot-dip galvanized is the buy because the units survive winter storage and weather without showing rust at the next event.',
    ),

    h('h2', null, 'Connectors — the make-or-break detail'),
    h(
      'p',
      null,
      'Standard interlocking is a hook-and-loop system: each barricade has a hook on one end and a flat loop on the other. Drop the hook into the next unit\'s loop and the line is connected. Pros: instant deployment, no tools. Cons: a determined push can lift one barricade off the next.',
    ),
    h(
      'p',
      null,
      'For higher-security applications (VIP routes, controlled choke points), look for ',
      h('strong', null, 'pin-locked or French-barrier'),
      ' connectors — the units lock together with a steel pin or interlocking knuckle that requires deliberate disassembly. Costs 30–50% more per unit but resists crowd push without lifting.',
    ),

    h('h2', null, 'Bike rack barricade vs. French barrier'),
    h(
      'p',
      null,
      'Both look similar but are designed for different scenarios:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Bike rack barricade:'), ' Hook-and-loop, 8 ft, lightweight, fast-deploy. Best for parades, races, festivals, anything where the perimeter is largely advisory and crowds will respect it.'),
      h('li', null, h('strong', null, 'French barrier:'), ' Interlocking pin or knuckle, often heavier-gauge steel, sometimes shorter (7 ft) but taller (50 in). Best for VIP perimeters, security choke points, or any setting where crowd push could be a concern.'),
    ),
    h(
      'p',
      null,
      'A typical event-rental fleet has both: bike rack for the long perimeter runs, French barrier for the staging area, the press pool, and the VIP entrance.',
    ),

    h('h2', null, 'How many do you need?'),
    h(
      'p',
      null,
      'Calculate perimeter length, divide by barricade length, add 5–10% for splay/end caps:',
    ),
    h(
      'ul',
      null,
      h('li', null, '100 ft straight-run perimeter: 100 ÷ 8 = 13 units of the 8 ft model'),
      h('li', null, 'A typical 5K race route (5,280 m on closed roads, double-sided): roughly 1,300 units for full barrier coverage; most races stop at high-density spots and use 200–400 units total'),
      h('li', null, 'Parade route 1 mile, single-sided: 5,280 ÷ 8 ≈ 660 units; most parades use 200–400 at intersections, viewing areas, and start/finish only'),
      h('li', null, 'A small festival entry-line channelizing: 30–50 units to create entry queues and exit lanes'),
    ),
    h(
      'p',
      null,
      'For event organizers buying a working set: 50 units is the small-event threshold; 200 units handles a typical street fair; 500+ for parades and races.',
    ),

    h('h2', null, 'Where bike rack barricades fail (common mistakes)'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Cheap painted units bought once, used outdoors.'), ' Rust shows by year 2, units look unprofessional by year 3. Pay for galvanized.'),
      h('li', null, h('strong', null, 'No anchoring on long runs.'), ' Wind catches a long line and tips it. Stake at every 5th unit, or use weighted feet.'),
      h('li', null, h('strong', null, 'Hook-and-loop in high-push scenarios.'), ' If the crowd surges, hook-loop barricades lift apart. Use French-barrier connectors for any controlled-access scenario.'),
      h('li', null, h('strong', null, 'No traffic/closure plan paired with the barricades.'), ' Bike rack barricades are crowd-control, not traffic-control. For street closures, you also need Type III barricades, ROAD CLOSED signs, and detour markings — see our ',
        h('a', { href: '/blog/type-iii-barricade-vs-type-i-type-ii' }, 'Type III barricade guide'),
        '.'),
    ),

    h('h2', null, 'Storage and transport'),
    h(
      'p',
      null,
      'Bike rack barricades stack — typically 8–10 units to a stack, 30–40 to a single 53\' trailer load. They take real yard space, so an event-rental company outfitting a 200-unit fleet needs roughly a 20\' × 20\' covered storage footprint, or a 20\' container.',
    ),

    h('h2', null, 'What to buy first'),
    h(
      'p',
      null,
      'For a small NJ event company or municipality outfitting a starter set:',
    ),
    h(
      'ul',
      null,
      h('li', null, '40× 8 ft × 42 in hot-dip galvanized hook-and-loop barricades (covers most parade / festival jobs)'),
      h('li', null, '12× 8 ft × 42 in French-barrier units for VIP / controlled-access perimeters'),
      h('li', null, '20× weighted feet for high-wind anchoring'),
      h('li', null, 'Mesh or banner panels (optional, snap-on) to make the barricade line solid for branded events'),
    ),
    h(
      'p',
      null,
      'Total: roughly $4,000–$6,000 for a 50-unit working set, depending on grade and connector type.',
    ),

    h('h2', null, 'Where to buy bike rack barricades in NJ'),
    h(
      'p',
      null,
      'For Central NJ event organizers and municipalities, browse our ',
      h('a', { href: '/category/barricades-barriers' }, 'barricades and barriers category'),
      ' for bike rack, French barrier, and event-grade units. For volume orders or a custom event setup, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' — same-day delivery available for most quantities, and delivery + pickup logistics handled.',
    ),
  ),
  faqs: [
    {
      q: 'What is a bike rack barricade?',
      a: 'A steel-frame crowd-control barricade roughly 8 ft long and 42 in tall, weighing about 40 lbs. They interlock end-to-end via hooks-and-loops to form pedestrian perimeters at parades, races, festivals, and other events. The name comes from the 1970s when the original units resembled bike-parking racks; almost no one actually parks bikes in them.',
    },
    {
      q: 'How many bike rack barricades do I need for a 100 ft perimeter?',
      a: 'About 13 units of the standard 8 ft model. The math: 100 ÷ 8 = 12.5, round up to 13 to account for end caps and a slight overlap. Add 5–10% spares for events to cover damage or layout changes mid-event.',
    },
    {
      q: 'What is the difference between a bike rack barricade and a French barrier?',
      a: 'Both are crowd-control barricades. Bike rack barricades use a hook-and-loop interlock (fast deploy, light, can lift apart under push). French barriers use pin-locked or interlocking-knuckle connectors (heavier, more secure, harder to disassemble) and are used for VIP perimeters or any controlled-access scenario.',
    },
    {
      q: 'How heavy is a bike rack barricade?',
      a: 'Standard 8 ft × 42 in painted-steel units weigh about 32–40 lbs. Hot-dip galvanized units weigh 40–45 lbs. The 8 ft × 50 in security-height version weighs 50 lbs. Two people can carry one easily; a single worker can drag-place one.',
    },
    {
      q: 'Are bike rack barricades the same as Type III barricades?',
      a: 'No. Bike rack barricades are crowd-control / pedestrian channelizing — designed for events. Type III barricades are MUTCD-defined road-closure devices with three reflective rails and a 60 in minimum height, used to close lanes or detour traffic. Use both together when you have a road closure for an event: Type III at the closure, bike rack along the spectator perimeter.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'crowd-control-barriers-buying-guide',
    'type-iii-barricade-vs-type-i-type-ii',
    'water-filled-barriers-buying-guide',
  ],
}
