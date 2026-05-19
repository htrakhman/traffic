import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "barricade for traffic" + "barricade traffic" (~5K/mo, High comp,
 * $26.64 bid). FAQ-heavy AEO structure — answers the 12 questions a contractor
 * or facility manager actually types into Google when they need to barricade
 * a roadway, parking lot, or sidewalk.
 */
export const articleBarricadeForTrafficFaqGuide: Article = {
  slug: 'barricade-for-traffic-faq-guide',
  title: 'Barricade for Traffic: The 12 Questions People Actually Ask',
  excerpt:
    'When you need to barricade traffic — for a road closure, a parking lot, a construction zone, or an event — the choices are bigger than they look. Here are the 12 questions contractors and facility managers actually ask, answered straight.',
  metaDescription:
    'Need a barricade for traffic? FAQ-format guide answers what type to pick, what MUTCD requires, how many you need, and where to buy in Central NJ.',
  primaryKeyword: 'barricade for traffic',
  secondaryKeywords: [
    'barricade traffic',
    'traffic barricade',
    'road barricade',
    'traffic barricades',
    'types of traffic barricades',
    'barricade types',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-19',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A "barricade for traffic" can mean anything from a $40 plastic A-frame at a school crossing to a $1,200 concrete Jersey wall on a highway shoulder. ',
      h('strong', null, 'The right choice depends on three things: what speed traffic is moving, how long the closure lasts, and whether you need delineation or physical protection.'),
      ' Below are the twelve questions contractors and facility managers ask before placing the order — answered in the order they tend to come up.',
    ),

    h('h2', null, '1. What is the difference between a "barricade" and a "barrier"?'),
    h(
      'p',
      null,
      'In MUTCD terms, a ',
      h('strong', null, 'barricade'),
      ' is a sign-like channelizing device (Type I, II, or III) that warns drivers and guides them around a hazard. A ',
      h('strong', null, 'barrier'),
      ' is a physical wall designed to stop or redirect a vehicle (Jersey barriers, water-filled barriers, crash cushions). Barricades communicate; barriers protect. Most state inspectors will fail a job that uses one when the other was required.',
    ),

    h('h2', null, '2. What kind of barricade do I need for a road closure?'),
    h(
      'p',
      null,
      'It depends on closure duration and posted speed:',
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
          h('tr', null,
            h('th', { className: 'text-left p-2 border-b' }, 'Situation'),
            h('th', { className: 'text-left p-2 border-b' }, 'Recommended barricade'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Short-duration utility job, ≤35 mph'), h('td', { className: 'p-2' }, 'Type I or II plastic barricades + cones')),
          h('tr', null, h('td', { className: 'p-2' }, 'Long-term road closure, ≤45 mph'), h('td', { className: 'p-2' }, 'Type III plastic barricades, ROAD CLOSED legend')),
          h('tr', null, h('td', { className: 'p-2' }, 'Highway closure, >45 mph'), h('td', { className: 'p-2' }, 'Type III + water-filled or concrete barriers')),
          h('tr', null, h('td', { className: 'p-2' }, 'Pedestrian path / sidewalk'), h('td', { className: 'p-2' }, 'A-frame or pedestrian barricades')),
          h('tr', null, h('td', { className: 'p-2' }, 'Parking lot or event'), h('td', { className: 'p-2' }, 'Steel crowd-control / bike-rack barriers')),
        ),
      ),
    ),

    h('h2', null, '3. How many barricades do I need?'),
    h(
      'p',
      null,
      'For a Type III road-closed installation on a 2-lane road, plan on 2 barricades minimum (one each direction), plus advance warning signs at MUTCD-spec distances and 8–15 cones in the taper. For a sidewalk closure, 2–3 A-frames will usually suffice unless the closure runs more than 100 feet. Our ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' will generate the exact count if you tell it the road geometry.',
    ),

    h('h2', null, '4. Should I buy plastic or steel?'),
    h(
      'p',
      null,
      'Plastic (high-density polyethylene) is lighter, cheaper, will not rust, and is what nearly all MUTCD Type I/II/III barricades are made of today. Steel is for crowd-control / bike-rack barriers used at events and pedestrian queuing — heavier, more durable, and harder to move (good or bad depending on whether you want unauthorized people moving them).',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Road work / traffic channelization → plastic.'), ' Lightweight, MUTCD-compliant, cheaper.'),
      h('li', null, h('strong', null, 'Crowd control / events → steel.'), ' Heavier, locks together, harder to displace.'),
      h('li', null, h('strong', null, 'Long-term / heavy crash protection → concrete or water-filled.'), ' Real barrier protection.'),
    ),
    h(
      'p',
      null,
      'See our ',
      h('a', { href: '/blog/plastic-barricades-pillar-guide' }, 'plastic barricades pillar guide'),
      ' and ',
      h('a', { href: '/blog/metal-barricades-buying-guide' }, 'metal barricades buying guide'),
      ' for a deeper material comparison.',
    ),

    h('h2', null, '5. What does a Type I, II, or III barricade actually look like?'),
    h(
      'p',
      null,
      'The MUTCD defines three barricade types based on rail count and visibility distance:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Type I: '), 'one horizontal rail with diagonal orange/white stripes. ~24" tall. For low-speed, short-duration work.'),
      h('li', null, h('strong', null, 'Type II: '), 'two horizontal rails, same striping. Better visibility for longer roads.'),
      h('li', null, h('strong', null, 'Type III: '), 'three horizontal rails, much wider (~8 ft). Used for full road closures with ROAD CLOSED, DETOUR, or similar legend boards.'),
    ),
    h(
      'p',
      null,
      'For the practical differences, see ',
      h('a', { href: '/blog/type-iii-barricade-vs-type-i-type-ii' }, 'Type III barricade vs. Type I and II'),
      '.',
    ),

    h('h2', null, '6. How much does a traffic barricade cost in 2026?'),
    h(
      'p',
      null,
      'Per-unit pricing for new contractor-grade barricades, Central NJ market:',
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
          h('tr', null,
            h('th', { className: 'text-left p-2 border-b' }, 'Type'),
            h('th', { className: 'text-left p-2 border-b' }, '1–9 units'),
            h('th', { className: 'text-left p-2 border-b' }, '10+ units'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'A-frame plastic barricade'), h('td', { className: 'p-2' }, '$55–75'), h('td', { className: 'p-2' }, '$45–60')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type I plastic barricade'), h('td', { className: 'p-2' }, '$70–95'), h('td', { className: 'p-2' }, '$60–80')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type II plastic barricade'), h('td', { className: 'p-2' }, '$95–135'), h('td', { className: 'p-2' }, '$80–115')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type III plastic barricade'), h('td', { className: 'p-2' }, '$180–250'), h('td', { className: 'p-2' }, '$150–210')),
          h('tr', null, h('td', { className: 'p-2' }, 'Steel crowd-control barrier (8 ft)'), h('td', { className: 'p-2' }, '$110–145'), h('td', { className: 'p-2' }, '$90–125')),
          h('tr', null, h('td', { className: 'p-2' }, 'Water-filled traffic barrier'), h('td', { className: 'p-2' }, '$220–330'), h('td', { className: 'p-2' }, '$180–280')),
          h('tr', null, h('td', { className: 'p-2' }, 'Used concrete Jersey barrier (10 ft)'), h('td', { className: 'p-2' }, '$300–450'), h('td', { className: 'p-2' }, '$250–400')),
        ),
      ),
    ),

    h('h2', null, '7. Do barricades need reflective sheeting?'),
    h(
      'p',
      null,
      'Yes — on any roadway barricade. The MUTCD requires the diagonal stripes to be retroreflective sheeting (ASTM Type IV or higher) so the barricade is visible to oncoming drivers at night. Check that the stripes are heat-bonded or factory-applied, not stick-on tape. Stick-on tape peels within a season.',
    ),

    h('h2', null, '8. Do I need to weight the barricades?'),
    h(
      'p',
      null,
      'A-frame and Type I plastic barricades have hollow bases and need to be weighted to stay in place when wind or passing vehicles hit them. Standard weighting:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Sand-fill (most common) — fill the hollow base on site.'),
      h('li', null, 'Sandbag drape over the bottom rail.'),
      h('li', null, 'Steel feet (sold separately, $20–35 per pair).'),
    ),
    h(
      'p',
      null,
      'Type III barricades typically have wide-footprint bases and rarely need additional weight, except in very-high-wind locations like bridge decks.',
    ),

    h('h2', null, '9. Can I rent traffic barricades instead of buying?'),
    h(
      'p',
      null,
      'Some local suppliers rent them; we sell with same-day Central NJ delivery instead. The break-even is roughly 6 weeks of use — if your job runs longer than that, buying wins. For short one-off events, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' and we can recommend the smallest spec that meets your job requirements.',
    ),

    h('h2', null, '10. What barricade do I need for a pedestrian closure?'),
    h(
      'p',
      null,
      'For sidewalk or pedestrian path closures, use A-frame barricades or dedicated ',
      h('a', { href: '/blog/pedestrian-barriers-guide' }, 'pedestrian barriers'),
      ' rather than Type I/II road barricades. Reasons: pedestrian barriers are at a height that wheelchairs and walkers can see and bump into safely, and they typically include a continuous mesh or panel that prevents anyone (especially kids) from stepping under the rail into the work zone.',
    ),

    h('h2', null, '11. Where can I buy a barricade for traffic in NJ today?'),
    h(
      'p',
      null,
      'For Central NJ contractors, we deliver same-day on all standard barricade types when the order comes in before noon. Submit a ',
      h('a', { href: '/quote' }, 'quote request'),
      ' or call (732) 675-2499 with your job site address and we can recommend the right model. See our full ',
      h('a', { href: '/category/barricades' }, 'barricade catalog'),
      ' for all in-stock options.',
    ),

    h('h2', null, '12. What is the biggest mistake people make with traffic barricades?'),
    h(
      'p',
      null,
      'Three are tied for first place: (a) buying Type I barricades when the job requires Type III, (b) leaving the barricades unweighted so the first wind blast knocks them over, and (c) using channelizing barricades on a job that actually requires a physical barrier (water-filled or concrete). All three result in inspection failures and, in the worst case, vehicle intrusions into the work zone. If you are not sure which type fits your job, ',
      h('a', { href: '/assistant' }, 'ask our Assistant'),
      ' or call before ordering.',
    ),
  ),
  faqs: [
    {
      q: 'What is the cheapest traffic barricade that\'s still MUTCD-compliant?',
      a: 'A Type I plastic barricade with heat-bonded ASTM Type IV reflective sheeting, sand-weighted base. Around $60–80 per unit in 10+ quantities. Acceptable for short-duration work on low-speed roads.',
    },
    {
      q: 'Can I use crowd-control barriers on a road closure?',
      a: 'Steel crowd-control barriers (bike-rack style) are for pedestrian queuing, not vehicular traffic. They are not MUTCD-compliant channelizing devices for roadways. Use plastic Type I/II/III barricades instead.',
    },
    {
      q: 'How long do plastic traffic barricades last?',
      a: '5–8 years of outdoor use with quality HDPE construction. Reflective sheeting usually fails before the barricade body. Store under cover when possible.',
    },
    {
      q: 'Can traffic barricades stop a vehicle?',
      a: 'No. Plastic barricades are channelizing devices — they communicate and guide. They will not stop a moving vehicle. If you need crash protection, use water-filled barriers or concrete Jersey barriers.',
    },
    {
      q: 'Do traffic barricades come with the legend boards (ROAD CLOSED, DETOUR, etc.) included?',
      a: 'Some Type III barricades ship with a blank top rail; legend boards are typically a separate SKU at $20–60 depending on size and message. Confirm with the supplier before ordering.',
    },
    {
      q: 'Can I get same-day delivery on traffic barricades in NJ?',
      a: 'Yes for orders up to about 10 Type III barricades or 20 A-frame / Type I, when placed before noon. Larger orders typically ship next-day.',
    },
  ],
  relatedProducts: [
    { label: 'Traffic Barricades (Full Catalog)', path: '/category/barricades' },
    { label: 'Pedestrian Barriers', path: '/category/pedestrian-barriers' },
    { label: 'Water-Filled Barriers', path: '/category/water-filled-barriers' },
    { label: 'Request a Barricade Quote', path: '/quote' },
  ],
  relatedArticles: [
    'traffic-barricades-pillar-guide',
    'type-iii-barricade-vs-type-i-type-ii',
    'temporary-barricade-guide',
  ],
}
