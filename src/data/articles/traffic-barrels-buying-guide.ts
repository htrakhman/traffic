import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic barrels" (~5K/mo, High comp 100).
 * Secondary cluster: traffic drums, channelizer drums, MUTCD drums, orange barrels,
 *   construction barrels, plastic drums.
 * Format: FAQ-heavy AEO. The audience searches "what are those orange barrels" so
 * the article opens with the direct definition then unpacks the MUTCD spec, why
 * they replace cones on freeway tapers, and what to buy.
 */
export const articleTrafficBarrelsBuyingGuide: Article = {
  slug: 'traffic-barrels-buying-guide',
  title: 'Traffic Barrels (Channelizer Drums): What They Are, Why DOTs Use Them, and What to Buy',
  excerpt:
    'Traffic barrels — officially "channelizer drums" in the MUTCD — are the 36-inch orange-and-white striped drums that replace cones on highway tapers. Here is the MUTCD spec, when DOTs require them over cones, and what to actually buy.',
  metaDescription:
    'Traffic barrels (MUTCD channelizer drums) explained: 36-inch height, 18-inch base, alternating orange/white reflective stripes, when DOTs require them, and what to buy for NJ highway work.',
  primaryKeyword: 'traffic barrels',
  secondaryKeywords: [
    'channelizer drums',
    'traffic drums',
    'orange construction barrels',
    'MUTCD drums',
    'plastic traffic drums',
    'highway barrels',
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
      h('strong', null, 'Traffic barrels'),
      ' — the 36-inch orange-and-white striped drums you see on highway work zones — are officially called ',
      h('strong', null, '"channelizer drums"'),
      ' in the MUTCD (Manual on Uniform Traffic Control Devices), Section 6F.65. They are larger and more visible than 36-inch traffic cones, and most state DOTs (NJDOT included) require them on freeway tapers and any roadway above 45 mph. The standard spec: 36 in tall, ~18 in diameter, four alternating orange and white reflective stripes (each 4–6 in), with a 30–50 lb sand-filled or recycled-rubber base. They cost roughly $50–$110 per drum new. Below: the MUTCD spec, where they actually outperform cones, and what to buy for NJ highway work.',
    ),

    h('h2', null, 'Quick definition: what is a traffic barrel?'),
    h(
      'p',
      null,
      'A traffic barrel is a vertical channelizing device — an orange plastic drum with reflective stripes — used to mark lane closures, tapers, shoulder closures, and detours. The MUTCD calls them ',
      h('em', null, 'channelizer drums'),
      '. They are not vehicle barriers (you cannot stop a car with one) and they are not the same as barricades (Type I/II/III). They are channelizers — they tell drivers where the lane goes, with maximum visibility from a long distance.',
    ),

    h('h2', null, 'The MUTCD spec for traffic barrels'),
    h('h3', null, 'Dimensions'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Height:'), ' 36 inches minimum (some states require 42 inches on freeways).'),
      h('li', null, h('strong', null, 'Diameter:'), ' 18 inches typical at the body.'),
      h('li', null, h('strong', null, 'Base:'), ' separate, weighted (sand-filled or recycled rubber). Common base weights: 30, 40, and 50 lbs.'),
    ),
    h('h3', null, 'Color and reflectivity'),
    h(
      'ul',
      null,
      h('li', null, 'Body color: bright fluorescent orange.'),
      h('li', null, 'Stripes: alternating orange and white horizontal bands, each 4–6 inches wide. Typical drum has four stripes (two orange, two white).'),
      h('li', null, 'Sheeting: ASTM Type IV high-intensity prismatic minimum. Type V or higher (diamond-grade) for any 55+ mph application.'),
    ),
    h('h3', null, 'Construction'),
    h(
      'ul',
      null,
      h('li', null, 'Body: blow-molded HDPE (high-density polyethylene). UV-stabilized so the orange holds up 3–5 years outdoors.'),
      h('li', null, 'Base: separate piece. Most are filled rubber (recycled tire) for impact tolerance; sand-filled bases are heavier but crack on the first hard hit.'),
      h('li', null, 'Top handle: integrated for one-person carry. Handle should NOT extend above the top of the drum (driver visibility).'),
    ),

    h('h2', null, 'Why DOTs require barrels over cones on highways'),
    h(
      'p',
      null,
      'Three reasons:',
    ),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'Visibility distance.'), ' A 36-inch traffic barrel is visible from roughly 1,500 ft in daylight (vs 800–1,000 ft for a 36-inch cone). At 65 mph that is 16 seconds of reaction time vs 9 seconds — the difference between a smooth merge and a swerve.'),
      h('li', null, h('strong', null, 'Wind resistance.'), ' A 50-lb-base barrel stays upright in 35+ mph crosswinds and the slipstream from a tractor-trailer. A 12-lb-base cone tips over.'),
      h('li', null, h('strong', null, 'Hit-and-recover behavior.'), ' Channelizer drums are designed to deform and pop back up after a glancing hit. Cones tend to stay folded once hit. On a 1-mile-long taper with 60 drums, you do not want to send a worker out after every glancing impact.'),
    ),
    h(
      'p',
      null,
      'NJDOT\'s standard practice (verify against current edition) is barrels for any taper on a 45+ mph roadway, all freeway work zones, and any nighttime work zone above 35 mph. State DOTs vary — Massachusetts (MassDOT) and New York (NYSDOT) have similar standards. See our ',
      h('a', { href: '/blog/mutcd-taper-length-formula-nj' }, 'MUTCD taper length guide'),
      ' for the spacing math.',
    ),

    h('h2', null, 'Barrels vs. cones vs. vertical panels — when to use each'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Height'),
            h('th', { className: 'text-left p-2 border-b' }, 'Visibility'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best for'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '28-in cone'), h('td', { className: 'p-2' }, '28 in'), h('td', { className: 'p-2' }, '~600 ft'), h('td', { className: 'p-2' }, 'Daytime, ≤ 45 mph')),
          h('tr', null, h('td', { className: 'p-2' }, '36-in cone'), h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, '~900 ft'), h('td', { className: 'p-2' }, 'Daytime, ≤ 55 mph')),
          h('tr', null, h('td', { className: 'p-2' }, 'Channelizer drum'), h('td', { className: 'p-2' }, '36–42 in'), h('td', { className: 'p-2' }, '~1,500 ft'), h('td', { className: 'p-2' }, 'Any speed, day/night, freeway tapers')),
          h('tr', null, h('td', { className: 'p-2' }, 'Vertical panel'), h('td', { className: 'p-2' }, '24–36 in'), h('td', { className: 'p-2' }, '~700 ft'), h('td', { className: 'p-2' }, 'Narrow areas, urban tapers')),
        ),
      ),
    ),

    h('h2', null, 'How many traffic barrels do you need for a typical NJ highway taper?'),
    h(
      'p',
      null,
      'The formula is the same as for cones — taper length × spacing. On a 65 mph freeway, MUTCD merging-taper length is ',
      h('em', null, 'L = W × S'),
      ' where W is lane width (typically 12 ft) and S is speed (mph). So a single-lane closure on I-95 (65 mph): L = 12 × 65 = 780 ft of taper. Drum spacing on the taper is typically 1 drum per 65 ft (S in feet), so 780 / 65 ≈ 12 drums on the taper itself. Add buffer + activity area (typically 2× spacing) and downstream taper, and a typical short freeway closure runs ',
      h('strong', null, '40–60 drums'),
      '. For the full math see our ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'cone-count guide'),
      ' — the calculation is identical for drums, just bigger spacing.',
    ),

    h('h2', null, 'Buying tips for NJ contractors'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Buy the 50-lb base, not 30-lb.'), ' For NJ highway work, the 30-lb base tips in any real wind. The price difference is $10–15; the time difference if drums tip mid-job is hours.'),
      h('li', null, h('strong', null, 'Recycled rubber base over sand-filled.'), ' Rubber survives being driven over once or twice; sand-filled cracks immediately and dumps sand on the highway.'),
      h('li', null, h('strong', null, 'ASTM Type V (diamond-grade) sheeting'), ' if any of your work runs at night above 45 mph. Type IV is OK for daytime; the upgrade to Type V is $5–10 per drum.'),
      h('li', null, h('strong', null, 'Stack-friendly design.'), ' Body and base separate so 25 drums fit on a half-pallet (vs barrel-shaped lawn drums that stack one per cubic foot).'),
      h('li', null, h('strong', null, 'Look for NCHRP 350 or MASH compliance label'), ' molded into the body — that is the crashworthiness certification. Drums without it may not be accepted on NJDOT projects.'),
    ),

    h('h2', null, 'Pricing (Apr 2026)'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Standard 36-in drum, 30-lb base, Type IV sheeting:'), ' $50–$70 each new in lots of 25.'),
      h('li', null, h('strong', null, '36-in drum, 50-lb rubber base, Type IV:'), ' $70–$95 each new.'),
      h('li', null, h('strong', null, '42-in drum, 50-lb rubber base, Type V (freeway-grade):'), ' $95–$130 each new.'),
      h('li', null, h('strong', null, 'Refurbished / used drums'), ' from municipal surplus auctions: $20–$35 each, condition variable.'),
    ),
    h(
      'p',
      null,
      'Practical first-buy for a Central NJ contractor doing a mix of arterial and freeway work: 30 standard drums (50-lb base, Type IV) and 15 freeway-grade drums (42-in, 50-lb, Type V). Total stocking cost: roughly $3,000–$4,000.',
    ),

    h('h2', null, 'Common failure modes'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Faded orange.'), ' UV exposure fades the body within 24–36 months. Faded drums look pink and fail visibility checks.'),
      h('li', null, h('strong', null, 'Peeling reflective stripe.'), ' Sheeting starts lifting at the seams after 18 months of weather. A drum with peeling stripes is invisible at night.'),
      h('li', null, h('strong', null, 'Cracked base.'), ' Sand-filled bases crack on the first impact. Rubber bases handle multiple hits but eventually loosen.'),
      h('li', null, h('strong', null, 'Body separation.'), ' If you store drums upright in a warm yard, the bodies can warp. Store nested or hung from a wall hook.'),
    ),

    h('h2', null, 'Where to buy traffic barrels in NJ'),
    h(
      'p',
      null,
      'For Central NJ contractors working DOT, county, or large private projects, ',
      h('a', { href: '/category/cones-drums' }, 'browse our cones and channelizer drums'),
      ' — we stock 36-in and 42-in drums with Type IV and Type V sheeting, in 30-lb and 50-lb base configurations, with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon counties. For a mixed pack sized to a specific job, ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' — describe the road, posted speed, and project duration, and we will spec the drum count, base weight, and sheeting grade that pass NJDOT inspection. You can also use our ',
      h('a', { href: '/assistant' }, 'AI gear assistant'),
      ' to talk through the spec interactively.',
    ),
  ),
  faqs: [
    {
      q: 'What are those orange and white striped barrels on the highway called?',
      a: 'Officially "channelizer drums" in the MUTCD; informally "traffic barrels," "construction barrels," or just "drums." They are 36-inch (sometimes 42-inch) plastic drums with alternating orange and white reflective stripes, used to mark lane closures, tapers, and detours on roads typically 45 mph or faster.',
    },
    {
      q: 'What is the difference between a traffic barrel and a traffic cone?',
      a: 'A barrel (channelizer drum) is bigger (36–42 in vs 28–36 in for cones), visible from much farther (1,500 ft vs 600–900 ft), and has a heavier base (30–50 lbs vs 7–12 lbs for cones). DOTs require barrels on freeway tapers and any roadway above 45 mph. Cones are fine for arterials and short-duration urban work.',
    },
    {
      q: 'How tall is a traffic barrel?',
      a: '36 inches is the MUTCD minimum. Some state DOTs require 42 inches on freeways and any nighttime work zone above 55 mph. The base adds another 2–3 inches but is not counted in the MUTCD height rule.',
    },
    {
      q: 'Why are traffic barrels orange?',
      a: 'Fluorescent orange has the highest contrast against typical roadway backgrounds (asphalt, concrete, grass) and stays visible in low light. The MUTCD specifies fluorescent orange for short-duration and mobile work zones. The alternating white stripes increase visibility at night when headlights catch the reflective sheeting.',
    },
    {
      q: 'How much do traffic barrels cost?',
      a: 'New 36-inch drums with a 30-lb base and Type IV reflective sheeting run $50–$70 each in lots of 25+. With a 50-lb rubber base and freeway-grade Type V sheeting, $95–$130 each. Used drums from municipal surplus auctions can be found for $20–$35 each, condition variable.',
    },
    {
      q: 'Are traffic barrels and channelizer drums the same thing?',
      a: 'Yes. "Channelizer drum" is the formal MUTCD name; "traffic barrel" is the term most people search for. Other synonyms: construction barrel, orange barrel, highway drum, plastic drum. They all refer to the same 36-inch orange-and-white striped channelizing device.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'mutcd-taper-length-formula-nj',
    'how-many-cones-for-lane-closure-nj',
    'road-cones-vs-traffic-cones',
  ],
}
