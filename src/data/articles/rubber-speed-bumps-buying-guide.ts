import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "rubber speed bumps" (~5K/mo, High comp 100).
 * Secondary cluster: rubber speed humps, parking lot speed bumps, modular speed bumps,
 *   recycled rubber speed bumps, speed bump installation.
 * Format: commercial buying guide. The audience is property managers, HOAs, and
 * facility owners — not road contractors — so AEO lead leads with the buyer's
 * actual question (what to install in my parking lot) instead of MUTCD.
 */
export const articleRubberSpeedBumpsBuyingGuide: Article = {
  slug: 'rubber-speed-bumps-buying-guide',
  title: 'Rubber Speed Bumps: Sizes, Install, and What to Buy for a Parking Lot or Private Drive',
  excerpt:
    'Modular rubber speed bumps install in 30–60 minutes, cost a fraction of asphalt speed humps, and survive 5–10 years of plow trucks. Here are the sizes, what to buy for a parking lot vs a private drive, and where most installs go wrong.',
  metaDescription:
    'Rubber speed bumps explained: 2-ft modular sections, 6-ft to 12-ft installs, asphalt anchors vs concrete, parking lot vs private drive, install steps, and what to buy. NJ delivery available.',
  primaryKeyword: 'rubber speed bumps',
  secondaryKeywords: [
    'rubber speed humps',
    'parking lot speed bumps',
    'modular speed bumps',
    'recycled rubber speed bumps',
    'speed bump installation',
    'speed humps',
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
      h('strong', null, 'Rubber speed bumps'),
      ' are modular vulcanized-rubber sections — typically 2 feet long, 12 inches wide, and 2–3 inches tall — that bolt to asphalt or concrete to slow vehicles in parking lots, private drives, gated communities, and apartment complexes. They install in 30–60 minutes for a typical 12-ft drive, cost $80–$200 per 2-ft section, and survive 5–10 years of plow trucks if you spec them right. Below: bumps vs humps (different things), what to buy for parking lots vs private drives, the install steps, and where most projects go wrong.',
    ),

    h('h2', null, 'Speed bump or speed hump? They are not the same'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Length (travel direction)'),
            h('th', { className: 'text-left p-2 border-b' }, 'Height'),
            h('th', { className: 'text-left p-2 border-b' }, 'Target speed'),
            h('th', { className: 'text-left p-2 border-b' }, 'Where used'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Speed bump'), h('td', { className: 'p-2' }, '6–12 in'), h('td', { className: 'p-2' }, '2–4 in'), h('td', { className: 'p-2' }, '2–10 mph'), h('td', { className: 'p-2' }, 'Parking lots, private drives')),
          h('tr', null, h('td', { className: 'p-2' }, 'Speed hump'), h('td', { className: 'p-2' }, '10–14 ft'), h('td', { className: 'p-2' }, '3–4 in'), h('td', { className: 'p-2' }, '15–25 mph'), h('td', { className: 'p-2' }, 'Residential streets')),
          h('tr', null, h('td', { className: 'p-2' }, 'Speed table'), h('td', { className: 'p-2' }, '20–22 ft'), h('td', { className: 'p-2' }, '3–4 in'), h('td', { className: 'p-2' }, '25–30 mph'), h('td', { className: 'p-2' }, 'Crosswalks, schools')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Most "rubber speed bump" searches are looking for the parking-lot device — short, sharp, designed to slow vehicles to walking speed. Rubber speed humps exist (longer, lower profile) but are less common in the rubber-modular form because the engineering for the gentler 14-ft profile usually gets done in asphalt or concrete during initial paving.',
    ),

    h('h2', null, 'Why rubber instead of asphalt or concrete?'),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'Install time.'), ' A 12-ft rubber speed bump goes in in 30–60 minutes (drill, anchor, done). An asphalt bump requires a paver, hot mix, and a crew — half a day minimum. Concrete is even longer.'),
      h('li', null, h('strong', null, 'Cost.'), ' Rubber: roughly $400–$800 installed for a 12-ft bump. Asphalt: $1,500–$3,000. Concrete: $2,000–$4,000.'),
      h('li', null, h('strong', null, 'Removability.'), ' Unbolt and the bump is gone — useful if the lot is being repaved or if the bump turns out to be in the wrong spot.'),
      h('li', null, h('strong', null, 'Color and visibility.'), ' Rubber bumps come in black with reflective yellow or orange chevrons molded in. They are visible at dusk in a way that asphalt bumps painted yellow are not.'),
    ),
    h(
      'p',
      null,
      'Trade-off: rubber is louder than asphalt at speed (the rubber-tire contact noise is higher pitch). For a residential street where neighbors complain about noise, asphalt or a longer rubber speed hump is the better choice. For a commercial parking lot, the noise difference is irrelevant and the install-time savings are huge.',
    ),

    h('h2', null, 'What to buy: parking lot vs private drive'),
    h('h3', null, 'Parking lot (most common case)'),
    h(
      'p',
      null,
      'Standard buy: ',
      h('strong', null, 'six 2-ft sections'),
      ' to make a 12-ft bump that spans a typical 11–12-ft drive lane plus 6–12 inches of overhang each side. Choose 2-inch height for indoor garages and tight parking circulation; 3-inch height for outdoor lots where you want to enforce a hard 5-mph cap. Reflective yellow or orange chevrons molded in. Hardware: 3/8-inch concrete or asphalt anchors, 4 per 2-ft section (24 anchors for a 12-ft bump).',
    ),
    h('h3', null, 'Private drive / HOA'),
    h(
      'p',
      null,
      'Same modular bumps, but pay attention to width. Many private drives are 14–16 ft wide, so plan for 7–8 sections (14–16 ft of bump). For HOAs, check the bylaws — some require advance notice to residents and signage 50–100 ft upstream of the bump. Add a "BUMP" warning sign (W17-1) at the property line on each approach.',
    ),
    h('h3', null, 'Apartment complex / commercial campus'),
    h(
      'p',
      null,
      'Multiple bumps along a single drive aisle — typical spacing is 80–150 ft between bumps. Closer than 80 ft is annoying; wider than 150 ft lets vehicles re-accelerate. A 600-ft loop drive typically needs 4–5 bumps.',
    ),

    h('h2', null, 'Sizes and the height-vs-speed tradeoff'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '2-inch height:'), ' targets 8–12 mph. Comfortable for sedans and SUVs at the target speed. Indoor garages and tight commercial lots.'),
      h('li', null, h('strong', null, '2.5-inch height:'), ' targets 5–8 mph. Most parking lots default to this size.'),
      h('li', null, h('strong', null, '3-inch height:'), ' targets 2–5 mph. Use sparingly — a 3-inch bump at 15 mph can damage low-clearance sports cars and can scrape oil pans on lifted trucks. Best for entrances to schools, daycares, hospital pediatric drop-offs.'),
    ),
    h(
      'p',
      null,
      'A 3-inch bump installed in a lot where landscaping crews drive 4-wheel-drive trucks at 15 mph will get hit hard and loosen the anchors within a season. Match the height to the realistic vehicle population, not the wishful-thinking speed limit.',
    ),

    h('h2', null, 'Install: the 60-minute version'),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'Mark the position.'), ' Use chalk or marking paint. Bump should be perpendicular to traffic flow, ideally where the lane is straight and visible from 50+ ft away.'),
      h('li', null, h('strong', null, 'Lay sections end-to-end.'), ' Modular sections interlock at the ends. Make sure the chevron pattern alternates correctly across sections.'),
      h('li', null, h('strong', null, 'Mark anchor holes.'), ' Each section has 4 pre-drilled holes. Mark with a sharpie or punch.'),
      h('li', null, h('strong', null, 'Drill.'), ' Hammer drill with a 3/8-inch concrete or asphalt bit. Depth 2–3 inches into asphalt, 3–4 inches into concrete.'),
      h('li', null, h('strong', null, 'Vacuum dust out of holes.'), ' This step gets skipped and is the #1 reason anchors loosen later.'),
      h('li', null, h('strong', null, 'Drive anchors.'), ' Hammer-set sleeve anchors or epoxy-set anchors depending on the surface and load. For asphalt, use specifically asphalt-rated anchors — concrete anchors split asphalt over time.'),
      h('li', null, h('strong', null, 'Tighten and verify.'), ' Torque to spec (30–50 ft-lb typical). Bump should not lift at any corner when you push hard at the opposite corner.'),
      h('li', null, h('strong', null, 'Add upstream signage.'), ' "BUMP" warning sign (W17-1) 50–100 ft upstream on each approach. Without it, you have a liability problem.'),
    ),

    h('h2', null, 'Where most projects go wrong'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'No upstream warning sign.'), ' If a driver hits an unmarked bump and damages a vehicle, the property owner may be liable. The sign is cheap insurance.'),
      h('li', null, h('strong', null, 'Wrong anchor type.'), ' Concrete anchors in asphalt fail within 6 months. Asphalt-rated anchors hold for 5+ years.'),
      h('li', null, h('strong', null, 'Bump too tall for the vehicle population.'), ' 3-inch bumps in a delivery-truck lot get destroyed.'),
      h('li', null, h('strong', null, 'Snow plow damage.'), ' If your lot gets plowed, the plow operator needs to know the bumps are there. Mark with reflective stakes in fall, brief the plow crew, and inspect anchors in spring.'),
      h('li', null, h('strong', null, 'Improper drainage.'), ' Bumps installed across a low spot create a dam. Either install a gap section in the middle (some manufacturers sell drainage-channel sections) or move the bump uphill of the low spot.'),
    ),

    h('h2', null, 'Pricing (Apr 2026)'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '2-ft × 12-in × 2-in section, recycled rubber:'), ' $80–$130 per section.'),
      h('li', null, h('strong', null, '2-ft × 12-in × 2.5-in section, virgin or recycled rubber:'), ' $120–$170 per section.'),
      h('li', null, h('strong', null, '2-ft × 12-in × 3-in section, heavy-duty:'), ' $160–$220 per section.'),
      h('li', null, h('strong', null, 'Anchors:'), ' $0.75–$2 each. Budget $20–$30 in hardware per 12-ft bump.'),
      h('li', null, h('strong', null, 'Install (if hiring out):'), ' $200–$400 labor for a 12-ft bump on existing asphalt. DIY install is realistic for property managers with a hammer drill.'),
    ),

    h('h2', null, 'Where to buy rubber speed bumps in NJ'),
    h(
      'p',
      null,
      'For Central NJ property managers, HOAs, and facility owners, ',
      h('a', { href: '/category/speed-bumps-humps' }, 'browse our rubber speed bumps and humps catalog'),
      ' — we stock 2-ft modular sections in 2-in, 2.5-in, and 3-in heights with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon counties. Need help spec\'ing the height and section count for a specific drive width? ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' or talk it through with our ',
      h('a', { href: '/assistant' }, 'AI gear assistant'),
      ' — describe the lot, the typical vehicle population, and we will spec the right height, section count, and anchor type. For property-perimeter applications you may also want a parking block or a bollard line — see our ',
      h('a', { href: '/blog/parking-cones-buying-guide' }, 'parking cones buying guide'),
      ' for the lighter-duty options.',
    ),
  ),
  faqs: [
    {
      q: 'What is the difference between a rubber speed bump and a rubber speed hump?',
      a: 'Bumps are short (6–12 inches in travel direction) and sharp, targeting 2–10 mph in parking lots and private drives. Humps are long (10–14 ft) and gentler, targeting 15–25 mph on residential streets. The rubber modular form factor is much more common for bumps; humps are usually built in asphalt or concrete during initial paving.',
    },
    {
      q: 'How long do rubber speed bumps last?',
      a: '5–10 years in a typical parking lot if spec\'d and installed correctly. The rubber itself outlasts the install — most failures come from loose anchors (wrong anchor type, poor hole prep) or plow strikes. Inspect anchor torque every spring and re-tighten as needed.',
    },
    {
      q: 'Do I need a permit to install a rubber speed bump?',
      a: 'On private property (parking lot, private drive, HOA road), typically no permit is required as long as the property has the right-of-way. On a public street, yes — most NJ municipalities require a traffic engineering review and approval before installing any speed-control device on a public road.',
    },
    {
      q: 'What size speed bump should I buy for a parking lot?',
      a: '2-inch height is the parking-lot default — comfortable for cars at the target 8–10 mph cap and won\'t damage low-clearance vehicles. 2.5-inch is the next step up for lots where 5 mph is the goal. 3-inch should be reserved for school zones, daycare entrances, and similar high-pedestrian-risk areas, and only where the vehicle population is mostly cars (not delivery trucks).',
    },
    {
      q: 'How many anchors does each rubber speed bump section need?',
      a: 'Standard 2-ft sections have four pre-drilled holes — four 3/8-inch anchors per section. A 12-ft bump (six sections) uses 24 anchors. Use asphalt-rated anchors on asphalt and concrete-rated anchors on concrete; mismatched anchors loosen within a season.',
    },
    {
      q: 'Can rubber speed bumps survive snow plows?',
      a: 'Yes, if the plow operator knows they are there. Mark the bumps with tall reflective stakes before snow season, brief the plow crew, and inspect anchor torque in spring after the season. A direct hit from a plow blade at speed will deform the rubber and can shear anchors — that is operator error, not a bump failure.',
    },
  ],
  relatedProducts: [
    { label: 'Speed Bumps & Humps', path: '/category/speed-bumps-humps' },
    { label: 'Parking Blocks', path: '/category/parking-blocks' },
    { label: 'Bollards, Chocks & Corner Guards', path: '/category/bollards-chocks-corners' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
  ],
  relatedArticles: [
    'parking-cones-buying-guide',
    'orange-cones-explained',
    'pedestrian-crosswalk-signs-mutcd',
  ],
}
