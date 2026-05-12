import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "event barricades" (~500/mo, High comp, $27.56 bid).
 * Commercial comparison — buyer is sourcing barricades for parades,
 * concerts, races, festivals. Compares bike-rack, plastic interlocking,
 * and steel options with footprint-and-cost math.
 */
export const articleEventBarricadesBuyingGuide: Article = {
  slug: 'event-barricades-buying-guide',
  title: 'Event Barricades: Bike Rack vs. Plastic vs. Steel for Parades, Concerts, and Races (2026)',
  excerpt:
    'Event barricades are the perimeter, the queue line, and the crowd-management spine of any outdoor event. Pick the wrong type and you spend the day re-stacking knocked-over plastic. Here is the buying comparison.',
  metaDescription:
    'Event barricades compared — bike rack (French), plastic interlocking, and steel crowd control. Sizing, weight, footprint, and cost for parades, concerts, races.',
  primaryKeyword: 'event barricades',
  secondaryKeywords: [
    'parade barricades',
    'concert barricade',
    'crowd barricade',
    'event barricades for sale',
    'barricades for events',
    'crowd control barricades',
  ],
  targetVolume: 500,
  datePublished: '2026-05-12',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'For most outdoor events, "bike rack" steel barricades (also called French barriers) are the right buy.'),
      ' They lock together end-to-end, weigh 35–45 lb each, and run $80–$140 per 8-ft section. Plastic interlocking barriers are cheaper and lighter but tip when crowds lean. Steel crowd-control gates and Mojo barriers are the high-end choice for stage fronts and main perimeters at concerts. ',
      'Below: which type fits which event, the footprint math, and what to expect to spend.',
    ),

    h('h2', null, 'The three event barricade types you actually choose between'),
    h(
      'p',
      null,
      'Three classes of event barricade cover almost every outdoor use case. They are not interchangeable — pick based on the crowd density and what is on the other side of the line.',
    ),

    h('h3', null, '1. Bike rack barricade (French barrier)'),
    h(
      'p',
      null,
      'A 7–8 ft long, 42–44" tall steel framework with vertical rails. Hooks on both ends interlock with the next unit; the assembled line stands free without ground anchors for routine crowd separation. Weight is 35–45 lb per unit. Color is usually painted gray or galvanized natural; printed scrim or sponsor banners velcro to the front.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Best for:'),
      ' parade routes, race courses, queue lines at festivals, perimeter for outdoor markets, fenced beer gardens. The default event barricade for 90% of public outdoor events.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Pricing:'),
      ' $80–$140 per section new; $40–$70 used or rental return. Custom branding adds $20–$40 per scrim panel.',
    ),

    h('h3', null, '2. Plastic interlocking barrier'),
    h(
      'p',
      null,
      'Hollow polyethylene units, often filled with sand or water for ballast. Brightly colored (orange, yellow, blue) and modular. Lighter to deploy than steel — a single person can carry one — but tips easier when a crowd leans on it.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Best for:'),
      ' lower-density events, sidewalk closures, kid-zones, family-friendly festivals where the visual softness matters, indoor convention queue lines.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Pricing:'),
      ' $90–$160 per 6-ft section; ballast (sand or water fill) extra logistics on site.',
    ),

    h('h3', null, '3. Steel crowd-control gate / Mojo barrier'),
    h(
      'p',
      null,
      'Heavy-duty front-of-stage barriers — 4 ft tall, weighted base, designed to take direct crowd surge force at concerts and rallies. Mojo is the brand-name version; "crowd-control gate" is the generic. Weight is 80–150 lb per unit, often deployed with floor footprint that locks against itself in a curved line.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Best for:'),
      ' main-stage barriers at concerts, VIP perimeters, anywhere crowd surge is a real risk. Overkill for parade routes; required for any event where bodies will press the line.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Pricing:'),
      ' $250–$500 per section new; rental dominates this category because storage is a hassle.',
    ),

    h('h2', null, 'Quick comparison table'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Type'),
            h('th', { className: 'text-left p-2 border-b' }, 'Length'),
            h('th', { className: 'text-left p-2 border-b' }, 'Weight'),
            h('th', { className: 'text-left p-2 border-b' }, 'Crowd density'),
            h('th', { className: 'text-left p-2 border-b' }, 'Cost / section'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Bike rack (steel)'), h('td', { className: 'p-2' }, '7–8 ft'), h('td', { className: 'p-2' }, '35–45 lb'), h('td', { className: 'p-2' }, 'Medium — leaning OK'), h('td', { className: 'p-2' }, '$80–$140')),
          h('tr', null, h('td', { className: 'p-2' }, 'Plastic interlocking'), h('td', { className: 'p-2' }, '6 ft'), h('td', { className: 'p-2' }, '20–35 lb'), h('td', { className: 'p-2' }, 'Light — kids, casual'), h('td', { className: 'p-2' }, '$90–$160')),
          h('tr', null, h('td', { className: 'p-2' }, 'Steel crowd gate'), h('td', { className: 'p-2' }, '3.5–4 ft'), h('td', { className: 'p-2' }, '80–150 lb'), h('td', { className: 'p-2' }, 'High — surge force'), h('td', { className: 'p-2' }, '$250–$500')),
        ),
      ),
    ),

    h('h2', null, 'Footprint math — how many sections you need'),
    h(
      'p',
      null,
      'Linear-feet conversion is straightforward: total perimeter ÷ section length, then add 10% for corners, end caps, and double-up at gate locations. Examples:',
    ),
    h(
      'ul',
      null,
      h('li', null, '500 ft parade route, both sides: 1,000 ft ÷ 8 ft = 125 bike-rack sections + 12 spare = 137 units'),
      h('li', null, '5K race course start/finish chute (200 ft × 2 sides): 400 ÷ 8 = 50 sections + 5 = 55 units'),
      h('li', null, '300-person concert front-of-stage: ~80 ft of Mojo barrier in a curve = 24 × 3.5 ft sections, plus 2 angled wings'),
      h('li', null, 'Sidewalk closure for a sponsor activation, 60 ft × 1 side: 8 sections + 1 spare'),
    ),

    h('h2', null, 'Bike rack — the workhorse'),
    h(
      'p',
      null,
      'Bike racks dominate event-barricade buying because they hit the right tradeoff: heavy enough that a crowd leaning on them does not push the line over; light enough that a 2-person crew can lay 200 ft in 30 minutes; cheap enough that you can buy a few hundred and store them on a single pallet. The hooks-and-loops connection means no tools, no zip ties, no fasteners.',
    ),
    h(
      'p',
      null,
      'For a deeper buying breakdown including frame gauges and storage formats, see ',
      h('a', { href: '/blog/bike-rack-barricades-events-guide' }, 'Bike Rack Barricades for Events: A Buying Guide'),
      '.',
    ),

    h('h2', null, 'When plastic wins'),
    h(
      'p',
      null,
      'Plastic interlocking barriers (Yodock-style for water-fill, or smaller modular units) are the right pick when:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'The visual needs to be soft — kid-zones, family festivals, school events. Steel reads as "police line."'),
      h('li', null, 'You need bright color coding (orange for closure, yellow for caution, blue for VIP). Steel only ships in gray.'),
      h('li', null, 'The barrier sees no crowd pressure — sidewalk redirects, equipment perimeters, paint-dry zones.'),
      h('li', null, 'The event is indoor, where steel barriers scuff floors and look industrial.'),
    ),
    h(
      'p',
      null,
      'For non-event barrier use (work zones, parking lots), see ',
      h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'Water Filled Barriers Buying Guide'),
      '.',
    ),

    h('h2', null, 'When you need real crowd-control gates'),
    h(
      'p',
      null,
      'Use a Mojo / crowd-control gate when bodies will push the line. Concerts, rallies, festival main stages, and VIP arrival pinch points all qualify. The differentiator is the weighted base footprint that resists tip-over under direct shove force — bike racks rated to ~30 lb of lateral force; crowd gates rated to 200+ lb. If the budget cannot support the upgrade for a high-density event, hire more security to maintain a buffer at the line.',
    ),

    h('h2', null, 'Stocking strategy for an event-rental contractor'),
    h(
      'p',
      null,
      'For a small NJ event-services contractor sizing a starter inventory:',
    ),
    h(
      'ul',
      null,
      h('li', null, '100–200× 8 ft bike-rack barricades on shipping pallets (handles most parades, races, festivals)'),
      h('li', null, '20× plastic interlocking barriers in orange (sidewalk closures, light-density use)'),
      h('li', null, 'Optional: 30 × Mojo-style crowd-control gates for concert work (or sub-rent)'),
      h('li', null, '10× scrim panels (custom-printed sponsor branding stock)'),
      h('li', null, 'Pallet jacks and a flatbed for transport'),
    ),

    h('h2', null, 'Where to buy event barricades in NJ'),
    h(
      'p',
      null,
      'We supply bike-rack and plastic event barricades for purchase with same-day Central NJ delivery. Browse our ',
      h('a', { href: '/category/barricades-barriers' }, 'barricades and barriers category'),
      ' for sizes and finishes, or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with your event date, perimeter length, and density expectation — we will return a sized barricade list and a delivery window.',
    ),
    h(
      'p',
      null,
      'For a layout sized to your specific venue, the ',
      h('a', { href: '/planner' }, 'site map planner'),
      ' will generate a barrier-by-barrier perimeter from a sketch.',
    ),
  ),
  faqs: [
    {
      q: 'What kind of barricade do you use for a parade?',
      a: 'Bike-rack steel barricades — also called French barriers — are the standard. They are 7–8 ft long, 42–44" tall, hook end-to-end without tools, and weigh 35–45 lb per section. They handle the leaning and lean-against pressure of a casual parade crowd; they do not handle direct surge force, so they are not the right choice for a stage-front concert.',
    },
    {
      q: 'How many barricades do I need for a 500 ft parade route?',
      a: 'Both sides of a 500 ft route is 1,000 linear feet. Divided by an 8 ft bike-rack section, you need 125 sections. Add 10% for corners, end caps, and double-up at intersection gates — call it 138 sections to be safe. Storage and transport: roughly 4 pallets, 1 small flatbed.',
    },
    {
      q: 'Can plastic event barricades hold back a crowd?',
      a: 'Lightly. A standard hollow polyethylene barrier weighs 20–35 lb empty and tips at roughly 50 lb of lateral force. Fine for kid-zones, casual perimeters, and visual-only redirects. Not appropriate for any event where bodies will lean or surge against the line — use steel bike-rack or crowd-control gates for those.',
    },
    {
      q: 'What is a Mojo barrier?',
      a: 'Mojo is a brand-name front-of-stage crowd-control barrier used at concerts. It is a 4 ft tall steel barrier with a weighted floor base that locks together in a curved line in front of a stage. Designed to take 200+ lb of lateral surge force without tipping. Generic equivalents are sold as "crowd-control gates" and are often rented rather than bought because storage is a hassle.',
    },
    {
      q: 'How much does an event barricade cost?',
      a: 'Bike-rack steel barricades run $80–$140 per 8 ft section new, $40–$70 used. Plastic interlocking barriers run $90–$160 per 6 ft section, plus on-site ballast (sand or water). Steel crowd-control gates / Mojo-style barriers are $250–$500 per section new and are commonly rented per event.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'bike-rack-barricades-events-guide',
    'crowd-control-barriers-buying-guide',
    'water-filled-barriers-buying-guide',
  ],
}
