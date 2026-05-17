import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "parade barricades" (~500/mo, High comp, $17.86 bid).
 * Decision-tree structure: pick the right barricade type based on event size,
 * route length, crowd pressure, and budget.
 */
export const articleParadeBarricadesGuide: Article = {
  slug: 'parade-barricades-guide',
  title: 'Parade Barricades: Picking the Right Type for Your Event Route',
  excerpt:
    'Parade barricades separate spectators from the route — but the right type depends on whether you are running a 500-person small-town parade, a 50,000-person municipal event, or a multi-day festival with a procession. This decision tree walks through the choices.',
  metaDescription:
    'Parade barricades buyer guide — bike rack, steel French, Type 1/2, and water-filled barriers compared by event size, route length, crowd pressure, and budget.',
  primaryKeyword: 'parade barricades',
  secondaryKeywords: [
    'parade barriers',
    'event barricades for parades',
    'bike rack barricades for events',
    'crowd control for parades',
    'parade route barricades',
    'french barriers for parades',
  ],
  targetVolume: 500,
  datePublished: '2026-05-17',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Parade barricades are crowd-management devices placed along a procession route to separate spectators from marchers, floats, and vehicles. ',
      h('strong', null, 'The right type depends on four variables: expected crowd size per linear foot, route length, anticipated lean/push force, and whether you have storage and transport for the gear after the event.'),
      ' This article walks through a decision tree, the four barricade categories used for parades, and a worked example for a typical 2-mile small-town parade.',
    ),

    h('h2', null, 'The four barricade categories used for parades'),
    h(
      'p',
      null,
      'Practical parade work uses one of four product classes — they trade visibility, cost, weight, and crowd resistance:',
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
          h('tr', { className: 'border-b' },
            h('th', { className: 'text-left p-2' }, 'Type'),
            h('th', { className: 'text-left p-2' }, 'Per 8 ft section'),
            h('th', { className: 'text-left p-2' }, 'Crowd lean resistance'),
            h('th', { className: 'text-left p-2' }, 'Best for'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Bike rack (steel French)'),
            h('td', { className: 'p-2' }, '$110–$180'),
            h('td', { className: 'p-2' }, 'High — interlocks'),
            h('td', { className: 'p-2' }, 'Most parades'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Type 1 / Type 2 barricade'),
            h('td', { className: 'p-2' }, '$40–$140'),
            h('td', { className: 'p-2' }, 'Low — separate units'),
            h('td', { className: 'p-2' }, 'Small parades, low crowd density'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Water-filled jersey'),
            h('td', { className: 'p-2' }, '$220–$340'),
            h('td', { className: 'p-2' }, 'Very high — 600 lb each'),
            h('td', { className: 'p-2' }, 'Vehicle protection, hostile intent'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Plastic A-frame'),
            h('td', { className: 'p-2' }, '$30–$60'),
            h('td', { className: 'p-2' }, 'Minimal'),
            h('td', { className: 'p-2' }, 'Channelizing, not separation'),
          ),
        ),
      ),
    ),

    h('h2', null, 'Decision tree — pick your barricade'),
    h(
      'h3',
      null,
      'Step 1: What is the peak crowd density per foot?',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Under 1 person per foot of route '), '— small-town parade, county fair procession. Type 1 or Type 2 barricades are sufficient.'),
      h('li', null, h('strong', null, '1–3 people per foot '), '— mid-size municipal event, holiday parade. Bike rack (French) barricades are the industry standard.'),
      h('li', null, h('strong', null, '3+ people per foot '), '— major city parade (St. Patrick\'s, Thanksgiving, Pride). Bike rack with bracing and supplemental water-filled barriers at choke points.'),
    ),
    h(
      'h3',
      null,
      'Step 2: Will vehicles share the route?',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Pedestrian-only route '), '— bike rack alone is fine; no impact protection needed.'),
      h('li', null, h('strong', null, 'Floats and slow vehicles (<10 mph) '), '— bike rack is still adequate; floats are not impact threats at parade speeds.'),
      h('li', null, h('strong', null, 'Mixed-traffic route (cross-street openings, vehicle intrusion risk) '), '— add water-filled jerseys at cross-street openings; bike rack between.'),
      h('li', null, h('strong', null, 'Hostile-intent risk (large urban event, public soft target) '), '— water-filled or concrete at every vehicle approach; bike rack secondary line.'),
    ),
    h(
      'h3',
      null,
      'Step 3: How long is the route, and how often does barricade move?',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Short fixed route (<1 mile, set up morning, take down afternoon) '), '— rent bike rack; one truckload covers it.'),
      h('li', null, h('strong', null, 'Long route (1–3 miles) '), '— buy the core 200 ft of bike rack, rent supplemental for the rest. Reuse the bought stock across multiple events per year.'),
      h('li', null, h('strong', null, 'Multi-day or weekly event '), '— buy outright. Three events pays back rental cost.'),
    ),

    h('h2', null, 'Bike rack (French) barricades — the parade default'),
    h(
      'p',
      null,
      'A bike rack barricade is a steel frame, 42 inches tall and 8 feet wide, with vertical bars on a tubular frame. Each unit weighs 35–55 lb. ',
      h('strong', null, 'The defining feature is the hook on one end and the eye on the other — barricades interlock end-to-end into a continuous line that resists pushback far better than separate units.'),
    ),
    h(
      'p',
      null,
      'Why bike rack is the parade standard:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Interlocking design means crowd pressure is distributed across the full line, not concentrated on one unit.'),
      h('li', null, 'Vertical bars discourage climbing (vs the horizontal-bar Type 1/2 design).'),
      h('li', null, 'Lightweight enough that 2 workers carry 4 units; 4 workers set up 100 ft in 15 minutes.'),
      h('li', null, 'Stacks 30–40 deep on a 16-ft trailer; 200 linear feet fits in one trip.'),
    ),
    h(
      'p',
      null,
      'Galvanized steel is standard. Powder-coated finishes are available (black, blue, brand colors) at +$15–$25 per unit; lasts 5+ seasons before re-coating.',
    ),

    h('h2', null, 'When to add water-filled barriers'),
    h(
      'p',
      null,
      'Three scenarios push parade planners from bike-rack-only to bike-rack-plus-water-filled:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Cross-street openings '), '— a side street that intersects the parade route creates a vehicle approach. Two water-filled jerseys form a closure, the bike rack continues on either side.'),
      h('li', null, h('strong', null, 'Reviewing stand / VIP area '), '— grandstand seating is a soft target. A 50-ft water-filled line at the approach plus bike rack on the spectator side is now the standard recommendation from event-security consultants.'),
      h('li', null, h('strong', null, 'Large urban events '), '— major city parades use water-filled or concrete jerseys at every vehicle entry into the route corridor (this is the post-2017 hostile-vehicle-mitigation standard).'),
    ),

    h('h2', null, 'Worked example: 2-mile small-town Memorial Day parade'),
    h(
      'p',
      null,
      'Town of 8,000 residents, expected 4,000 spectators, 2-mile route through downtown, no major cross-street issues, parade lasts 90 minutes, takedown same evening:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Spectator separation '), ': bike rack on both sides through downtown core (0.5 mile each side = ~1 mile total = ~660 units of 8 ft barricade)'),
      h('li', null, h('strong', null, 'Outer route '), ': sawhorses + caution tape are acceptable where crowds thin (1.5 miles each side)'),
      h('li', null, h('strong', null, 'Cross-street closures '), ': 8 Type 3 barricades, one at each major intersection'),
      h('li', null, h('strong', null, 'Total gear '), ': 660 bike rack units (rent: ~$1.50/unit/day = $990; buy: ~$130/unit = $85,800)'),
      h('li', null, h('strong', null, 'Verdict '), ': rent. Buying only makes sense if the town runs 8+ parade-grade events per year.'),
    ),

    h('h2', null, 'Common parade-barricade mistakes'),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Wrong barricade for crowd density: '),
        'Type 1 barricades blow over and walk under crowd pressure. Bike rack interlocks. For any event with 1+ persons per foot of route, plan on bike rack.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Underestimating cross-street openings: '),
        'every cross street is a vehicle approach. Bike rack does not stop a car. Place water-filled or concrete at each cross-street into the parade corridor.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Skipping the takedown plan: '),
        'a 600-unit setup takes 90 minutes with a 6-person crew and 30 minutes more for loadout. Build the schedule backward from the moment the road needs to reopen.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Renting when buying is cheaper long-run: '),
        'a town that runs Memorial Day, July 4th, Veterans Day, and Holiday parades will spend $4,000+ per year renting. 200 owned bike rack units cost ~$26,000 and amortize in 6–7 years.',
      ),
    ),

    h('h2', null, 'Where to buy or rent parade barricades in NJ'),
    h(
      'p',
      null,
      'We stock bike rack (French) barricades, water-filled jersey barriers, and Type 1/2/3 barricades with same-day Central NJ delivery. Browse the ',
      h('a', { href: '/category/barricades-barriers' }, 'barricades and barriers category'),
      ', or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' for a route-sized package. For event layout — bike rack runs, cross-street closures, reviewing-stand protection — the ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' generates an MUTCD-aligned event plan from the route map.',
    ),
    h(
      'p',
      null,
      'Related reading: ',
      h('a', { href: '/blog/bike-rack-barricades-events-guide' }, 'bike rack barricades for events'),
      ', ',
      h('a', { href: '/blog/event-barricades-buying-guide' }, 'event barricades buying guide'),
      ', and ',
      h('a', { href: '/blog/crowd-control-barriers-buying-guide' }, 'crowd control barriers'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'What type of barricade is used for parades?',
      a: 'Bike rack barricades (also called French barriers) are the industry standard for parade spectator separation — 42" tall steel frames, 8 ft wide, that interlock end-to-end. They handle crowd lean far better than separate Type 1 or Type 2 units. Major urban parades supplement bike rack with water-filled or concrete jerseys at vehicle approaches.',
    },
    {
      q: 'How many parade barricades do I need per mile?',
      a: 'For full spectator separation on both sides of a 1-mile route, you need approximately 1,320 linear feet on each side, or roughly 165 units of 8-ft bike rack per side — 330 units total per mile. In practice most parades only barricade the downtown core (typically 0.5–1 mile of the full route).',
    },
    {
      q: 'Are bike rack barricades better than Type 1 barricades for parades?',
      a: 'Yes, in almost all cases. Bike rack barricades interlock end-to-end, distributing crowd pressure across the full line; Type 1/2 barricades sit as separate units and walk under pressure. Bike rack vertical bars also discourage climbing. For any parade with more than light spectator turnout, bike rack is the right call.',
    },
    {
      q: 'Should I rent or buy parade barricades?',
      a: 'Rent for one-off events under 500 units. Buy if you host 4+ parade-grade events per year, or if 200+ units gives you a permanent backbone you can rent supplemental for. A town running 4 annual parades pays roughly $4,000/year in rental; 200 owned bike rack units cost ~$26,000 and amortize in 6–7 years.',
    },
    {
      q: 'Do I need vehicle barriers at a small-town parade?',
      a: 'Probably not for the main route, but consider water-filled or concrete jerseys at cross-street openings where a vehicle could enter the corridor. For reviewing stands or VIP areas, event-security consultants now recommend 50+ ft of water-filled barrier at the approach. Bike rack does not stop a vehicle.',
    },
    {
      q: 'How fast can a crew set up parade barricades?',
      a: 'A 4-person crew sets up 100 ft of bike rack in about 15 minutes once the truck is positioned. A 1-mile run (~660 units) takes a 6-person crew approximately 90 minutes to deploy. Plan transport with a 16-ft enclosed trailer or 24-ft flatbed — both fit 200+ stacked bike rack units.',
    },
    {
      q: 'Can I use bike rack barricades for night events?',
      a: 'Yes, but add reflective sheeting or barricade lights for visibility. Standard galvanized bike rack reflects vehicle headlights weakly; add Type III prismatic sheeting strips or clip-on amber LED lights every 4–6 units. For a route that crosses lit streets, the existing street lighting plus sheeting is usually enough.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
    { label: 'Accessories & Hardware', path: '/category/accessories-hardware' },
  ],
  relatedArticles: [
    'bike-rack-barricades-events-guide',
    'event-barricades-buying-guide',
    'crowd-control-barriers-buying-guide',
  ],
}
