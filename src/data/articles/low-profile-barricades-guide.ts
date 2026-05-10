import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "low profile barricades" (500/mo, High comp, $41.02 bid — highest in cluster).
 * Commercial comparison structure: when to choose low-profile over standard,
 * brand/spec comparison, and price ranges.
 */
export const articleLowProfileBarricadesGuide: Article = {
  slug: 'low-profile-barricades-guide',
  title: 'Low-Profile Barricades: When You Need Them, What They Cost, and What to Buy',
  excerpt:
    'Low-profile barricades sit under 12 inches tall, won\'t snag a snowplow or sweep, and pass MUTCD with the right reflective treatment. Here is when to choose them over standard Type II / III, and what the leading models actually cost.',
  metaDescription:
    'Low-profile barricades sit under 12 in, won\'t snag plows or sweepers, and meet MUTCD with proper reflectivity. Comparison of leading models, prices, and use cases.',
  primaryKeyword: 'low profile barricades',
  secondaryKeywords: [
    'low profile barricade',
    'low profile traffic barriers',
    'short barricades',
    'plowable barricades',
    'sweep-friendly barricades',
    'lcd barricades',
  ],
  targetVolume: 500,
  datePublished: '2026-05-10',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Low-profile barricades — also called LP barricades or "plowable" barricades — sit between 6 and 12 inches tall instead of the usual 24 to 48. ',
      h('strong', null, 'They exist for one main reason: a snowplow, street sweeper, or sidewalk machine can roll right over them without snagging.'),
      ' That makes them the right call for long-duration closures in winter climates, sidewalk and trail work where pedestrian-side equipment passes regularly, and any closure that needs to survive overnight without a crew on site. They cost more than a Type II barricade per unit but can save a contractor a full closure rebuild after the first snow event.',
    ),

    h('h2', null, 'What "low-profile" actually means'),
    h(
      'p',
      null,
      'There is no single MUTCD definition for "low-profile" — it is a market term. In practice, a low-profile barricade has three traits:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Total height under 12 inches'), ' (often 6–10 in for the lowest-profile models)'),
      h('li', null, h('strong', null, 'Wide, flat, plowable footprint'), ' — usually 36–48 inches long, sloped at the ends so a plow blade rides over rather than catching'),
      h('li', null, h('strong', null, 'High-intensity retroreflective top surface'), ' (because there is no vertical face to mount sheeting on)'),
    ),
    h(
      'p',
      null,
      'Most low-profile units are made from rotomolded polyethylene with a foam or water-fill ballast, so they survive being driven over without permanent deformation. Some models are designed to weigh 35–80 lb empty and 100–200 lb water-filled.',
    ),

    h('h2', null, 'When to use low-profile barricades'),
    h('h3', null, 'Winter / snow-belt long-duration closures'),
    h(
      'p',
      null,
      'This is the original use case. A standard Type II or Type III barricade gets ripped out by the first plow that runs the route. Replacing barricades after every snow event costs more than buying low-profile in the first place. Any NJ closure that runs from October through April is a candidate.',
    ),
    h('h3', null, 'Sidewalk and trail work where mechanical sweepers pass'),
    h(
      'p',
      null,
      'Cities with regular mechanical sidewalk sweepers (Hoboken, Jersey City, parts of Newark) need barriers that the sweeper can clear. A low-profile barricade lets the sweeper run its route without contractor coordination.',
    ),
    h('h3', null, 'Long-duration closures with no overnight crew'),
    h(
      'p',
      null,
      'If you cannot have a crew on site overnight to monitor a closure, low-profile barricades reduce the surface area that a vehicle can hook on. They are harder to drag, harder to pick up, and less attractive to vandalism.',
    ),
    h('h3', null, 'Channelization on highway shoulders during construction'),
    h(
      'p',
      null,
      'Some DOTs spec low-profile units along a long shoulder closure where a Type III barricade would be a sail in highway slipstream. The flat profile means trucks passing at 65+ mph do not generate enough lift to dislodge the barrier.',
    ),

    h('h2', null, 'When NOT to use low-profile'),
    h(
      'p',
      null,
      'Low-profile is the wrong choice for short-duration daytime work, for any closure where the warning function (visual height) matters more than survivability, and for emergency or incident-response setups where speed of deployment is the priority. A Type II or Type III barricade is faster to deploy, weighs less empty, and signals "do not enter" more clearly to pedestrians.',
    ),

    h('h2', null, 'The leading models — comparison'),
    h(
      'p',
      null,
      'Three product families dominate the low-profile market. They are not interchangeable — pick by use case, not by price alone.',
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
            h('th', { className: 'text-left p-2 border-b' }, 'Model family'),
            h('th', { className: 'text-left p-2 border-b' }, 'Height'),
            h('th', { className: 'text-left p-2 border-b' }, 'Footprint'),
            h('th', { className: 'text-left p-2 border-b' }, 'Empty / Filled wt'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical price'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Plowable LP (poly, water-fill)'), h('td', { className: 'p-2' }, '8–10 in'), h('td', { className: 'p-2' }, '40–48 in'), h('td', { className: 'p-2' }, '35 / 150 lb'), h('td', { className: 'p-2' }, '$220–$340')),
          h('tr', null, h('td', { className: 'p-2' }, 'Sidewalk LP (rubber, solid)'), h('td', { className: 'p-2' }, '6–8 in'), h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, '60 / N-A lb'), h('td', { className: 'p-2' }, '$180–$280')),
          h('tr', null, h('td', { className: 'p-2' }, 'Highway LP (poly, foam-fill)'), h('td', { className: 'p-2' }, '10–12 in'), h('td', { className: 'p-2' }, '48–60 in'), h('td', { className: 'p-2' }, '80 / 200 lb'), h('td', { className: 'p-2' }, '$340–$520')),
        ),
      ),
    ),

    h('h2', null, 'Reflectivity and visibility — the catch'),
    h(
      'p',
      null,
      'A barricade only 8 inches tall has very little vertical surface for reflective sheeting. Manufacturers compensate with high-intensity retroreflective top surfaces and side panels with diagonal stripes. Two practical points:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Headlight angle matters. '),
        'Low-profile units rely on driver headlights hitting the top reflective surface. From a low-slung sedan, the angle works fine; from a lifted truck, the headlights overshoot the barrier. Most LP installs benefit from a paired delineator post or warning sign at standard height.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Snow buries them. '),
        'Plowable barricades survive plows but plowed snow can pile high enough to bury them. Plan for a sweep-and-clear pass after major snow events, or stage taller delineators upstream to mark the closure during snow conditions.',
      ),
    ),

    h('h2', null, 'How many do I need?'),
    h(
      'p',
      null,
      'Spacing is the same as for any channelizing device on a long-duration closure: in feet, equal to the speed limit in mph for tapers; double that for tangent. So a 35 mph closure with a 200-ft work area needs roughly 6 LP units along the tangent at 70 ft spacing, plus the taper count from our ',
      h('a', { href: '/blog/mutcd-taper-length-formula-nj' }, 'taper length guide'),
      '.',
    ),
    h(
      'p',
      null,
      'A typical winter contractor in Central NJ buys 12–24 LP units for a single long-duration closure and reuses them for the season.',
    ),

    h('h2', null, 'Price math — when does low-profile pay off?'),
    h(
      'p',
      null,
      'A standard Type II barricade runs roughly $90–$140 retail. A plowable LP unit runs $220–$340. The break-even point is the cost of one closure rebuild after a snow event:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Crew time to redeploy 12 destroyed barricades after a plow: ~3 labor-hours at $80/hr = $240'),
      h('li', null, 'Replacement Type II barricades destroyed by plow: 12 × $110 = $1,320'),
      h('li', null, 'One-time cost premium for 12 LP units instead of Type II: 12 × $200 = $2,400'),
    ),
    h(
      'p',
      null,
      'After two snow events that would have wiped out the Type II barricades, the LP investment pays back. In a typical NJ winter, that is the first storm.',
    ),

    h('h2', null, 'What to buy for a NJ winter contractor'),
    h(
      'ul',
      null,
      h('li', null, '12× plowable poly LP units, water-fill, 8–10 in tall — for road closures that survive plowing'),
      h('li', null, '6× rubber sidewalk LP units, 6–8 in — for sidewalk closures that take mechanical sweepers'),
      h('li', null, '24× delineator posts at standard height, paired with the LP units to give headlights a target above plow snow line'),
    ),
    h(
      'p',
      null,
      'For Central NJ contractors, ',
      h('a', { href: '/category/barricades-barriers' }, 'browse our barricade and barrier inventory'),
      ' — we stock both standard and low-profile units with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon. For a snow-season closure plan and unit count, ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' or have the ',
      h('a', { href: '/planner' }, 'Site Map Planner'),
      ' generate the layout.',
    ),

    h('h2', null, 'Quick decision checklist'),
    h(
      'ul',
      null,
      h('li', null, 'Closure runs more than one shift overnight? → consider LP'),
      h('li', null, 'Snow / plow risk during the closure window? → LP, no question'),
      h('li', null, 'Sidewalk closure on a sweeper route? → sidewalk-spec LP'),
      h('li', null, 'Daytime, single-shift, contained crew? → standard Type II or Type III is cheaper and faster'),
      h('li', null, 'Need to read clearly to pedestrians on foot? → standard barricade (taller visual height)'),
    ),
  ),
  faqs: [
    {
      q: 'Are low-profile barricades MUTCD-compliant?',
      a: 'Yes, when fitted with the manufacturer-spec retroreflective top surface and side panels, low-profile barricades meet MUTCD requirements for channelizing and warning devices. They are not a single MUTCD category — most are spec\'d as channelizing devices (Part 6F) or as Type II equivalents depending on the model.',
    },
    {
      q: 'Can a snowplow really drive over a low-profile barricade?',
      a: 'Yes — the plowable models are designed exactly for that. The barricade is sloped at the ends, the body deforms slightly under the plow, and a water- or foam-filled core keeps it stable but compressible. After the plow passes, the unit returns to its standard shape.',
    },
    {
      q: 'How much does a low-profile barricade cost?',
      a: 'Plowable poly LP units run $220–$340 each. Sidewalk-spec rubber LP units run $180–$280. Highway LP units (foam-filled, longer footprint) run $340–$520. Bulk pricing typically saves 15–25% on orders of 10+ units.',
    },
    {
      q: 'Can I use low-profile barricades on a freeway?',
      a: 'Some DOTs permit specific highway-rated LP models on shoulder closures — check the project TCP. For full lane closures on a freeway, drums or Type III barricades are typically required because the visual height matters at freeway speeds. LP models are most common on long-duration shoulder work.',
    },
    {
      q: 'Do low-profile barricades replace cones?',
      a: 'No — they complement cones. A long-duration closure typically uses cones or drums on the active taper and LP barricades along the static perimeter or tangent where the gear has to survive overnight without a crew. Mixing channelizers by role is normal.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Site Map Planner', path: '/planner' },
    { label: 'Get a Quote', path: '/quote' },
  ],
  relatedArticles: [
    'barricades-types-uses-guide',
    'water-filled-barriers-buying-guide',
    'mutcd-taper-length-formula-nj',
  ],
}
