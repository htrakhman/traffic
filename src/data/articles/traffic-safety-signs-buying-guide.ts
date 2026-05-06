import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic safety signs" (~500/mo, High comp, $25.88 bid).
 * Commercial buying guide angle - sheeting grades, sizes, sign-stand pairings.
 * Pairs with regulatory traffic-control-signs-mutcd-guide as the consumer-side
 * shopping piece, FAQ-heavy AEO format.
 */
export const articleTrafficSafetySignsBuyingGuide: Article = {
  slug: 'traffic-safety-signs-buying-guide',
  title: 'Traffic Safety Signs: A Contractor Buying Guide',
  excerpt:
    'Traffic safety signs are MUTCD-compliant warning, regulatory, and guide signs - usually orange (warning) or red (regulatory) for active work zones. Specs that matter: aluminum thickness, sheeting grade, and the stand they sit on.',
  metaDescription:
    'Traffic safety signs buying guide for NJ contractors. Sheeting grades (Type IV, VIII, XI), sizes, sign stand pairings, and the most-used signs in a typical work-zone kit.',
  primaryKeyword: 'traffic safety signs',
  secondaryKeywords: [
    'traffic safety signs for sale',
    'work zone signs',
    'construction safety signs',
    'roadway safety signs',
    'orange diamond signs',
    'reflective safety signs',
    'MUTCD safety signs',
  ],
  targetVolume: 500,
  datePublished: '2026-05-06',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Traffic safety signs are ',
      h('strong', null, 'MUTCD-compliant warning, regulatory, and temporary-traffic-control signs'),
      ' - the orange diamonds, red octagons, and white rectangles you see around active work zones. Buying them well comes down to four specs: aluminum thickness, reflective sheeting grade, sign size, and the stand or post they mount on. This is what to look for in 2026.',
    ),

    h('h2', null, 'The four sign categories you actually buy'),
    h('p', null, 'Suppliers stock dozens of variations, but most contractor purchases fall into four buckets:'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Warning (W-series): '), 'orange diamond, black legend. "Road Work Ahead" (W20-1), "Lane Closed Ahead" (W20-5), "Flagger Ahead" (W20-7), "Detour" (W20-2). Used to alert drivers to upcoming conditions.'),
      h('li', null, h('strong', null, 'Regulatory (R-series): '), 'usually white with red or black legend. "Stop" (R1-1), "Yield" (R1-2), "Do Not Enter" (R5-1), "Lane Use" (R3 series). Drivers must obey - violations are enforceable.'),
      h('li', null, h('strong', null, 'Guide (G-series and others): '), 'green or blue rectangles for directional / route information. Less common in TTC kits.'),
      h('li', null, h('strong', null, 'Project-specific custom signs: '), 'company-branded "Caution: Crew Working" boards, custom detour wording, project-name signs. Usually printed on aluminum or vinyl-overlay over a blank.'),
    ),

    h('h2', null, 'Aluminum thickness'),
    h('p', null, 'Sign blanks are sold in three thicknesses. Thicker = more rigid + longer life, but heavier and pricier.'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h('thead', null, h('tr', null,
          h('th', { className: 'text-left p-2 border-b' }, 'Thickness'),
          h('th', { className: 'text-left p-2 border-b' }, 'Use'),
          h('th', { className: 'text-left p-2 border-b' }, 'Life'),
          h('th', { className: 'text-left p-2 border-b' }, 'Cost adder'),
        )),
        h('tbody', null,
          h('tr', null, h('td', { className: 'p-2' }, '0.063" (light)'), h('td', { className: 'p-2' }, 'Indoor / temporary'), h('td', { className: 'p-2' }, '~2 yr'), h('td', { className: 'p-2' }, 'Base price')),
          h('tr', null, h('td', { className: 'p-2' }, '0.080" (standard)'), h('td', { className: 'p-2' }, 'Most TTC use'), h('td', { className: 'p-2' }, '~5-7 yr'), h('td', { className: 'p-2' }, '+15-25%')),
          h('tr', null, h('td', { className: 'p-2' }, '0.125" (heavy)'), h('td', { className: 'p-2' }, 'Permanent / high-wind'), h('td', { className: 'p-2' }, '~10 yr'), h('td', { className: 'p-2' }, '+40-60%')),
        ),
      ),
    ),
    h('p', null, 'For temporary work-zone use, 0.080" is the default - rigid enough to survive truck-bed transport, light enough to redeploy. Specify 0.125" only for permanent installations or sign assemblies that will sit unattended in high-wind locations.'),

    h('h2', null, 'Reflective sheeting grade matters more than the sign'),
    h(
      'p',
      null,
      'The sheeting on a sign is what makes it visible at night. ASTM D4956 grades the reflective material from Type I (lowest) to Type XI (highest). MUTCD requires ',
      h('strong', null, 'minimum Type IV ("high intensity prismatic") for any TTC sign'),
      ', and the FHWA strongly encourages Type VIII or XI (microprismatic) for any sign on a posted-speed roadway.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Type I / II (engineering grade): '), 'NOT acceptable for roadway TTC. You will see this on cheap home-center "construction" signs - those are not contractor grade.'),
      h('li', null, h('strong', null, 'Type IV (HIP - high intensity prismatic): '), 'the legal floor. Most contractor catalog signs default to this.'),
      h('li', null, h('strong', null, 'Type VIII / IX (DG3 / VIP): '), 'much brighter at night, 10-12 yr outdoor life. Worth the upcharge for any night-shift work.'),
      h('li', null, h('strong', null, 'Type XI: '), 'top-grade microprismatic, used by NJDOT and NJTA on permanent installations. Premium price.'),
    ),

    h('h2', null, 'Standard sizes'),
    h('p', null, 'MUTCD specifies sign sizes by road type. The two most common contractor sizes are 36" and 48":'),
    h('ul', null,
      h('li', null, h('strong', null, '30" diamond: '), 'minor / residential roads only. Avoid if you might land on a state route.'),
      h('li', null, h('strong', null, '36" diamond: '), 'standard for most TTC work in NJ. Fits state routes, county roads, and residential.'),
      h('li', null, h('strong', null, '48" diamond: '), 'expressway / freeway use. Required on NJ Turnpike, GSP, and Interstates.'),
    ),
    h('p', null, 'When in doubt, buy 36". A 30" sign cannot legally graduate to higher-speed work, but a 36" sign works on every road type that does not require 48".'),

    h('h2', null, 'Sign stands - the half of the purchase contractors forget'),
    h(
      'p',
      null,
      'A sign without a stand is just a piece of aluminum. Match the stand to the wind exposure and how often you will move the sign:',
    ),
    h('ul', null,
      h('li', null, h('strong', null, 'Spring-base / dual-spring: '), 'absorbs gusts and bounces back. The default stand for portable TTC. $70-$120.'),
      h('li', null, h('strong', null, 'X-base with sandbag: '), 'heavier, more stable in high wind, but slower to deploy. $50-$90 + sandbags.'),
      h('li', null, h('strong', null, 'Tripod (rollable): '), 'collapsible aluminum frame, fast deploy. $90-$150.'),
      h('li', null, h('strong', null, 'Driveable post: '), 'permanent ground-driven post for fixed signs. Not for daily redeploy.'),
    ),

    h('h2', null, "What to put in a starter sign kit"),
    h('p', null, 'A typical NJ contractor doing local-road and state-route work needs about 6-8 sign types on the truck. Below is the high-utility starter set, all 36" diamond, 0.080" aluminum, Type IV+ sheeting:'),
    h('ul', null,
      h('li', null, '2x W20-1 "Road Work Ahead"'),
      h('li', null, '2x W20-5 "Right/Left Lane Closed Ahead"'),
      h('li', null, '2x W20-7 "Flagger Ahead"'),
      h('li', null, '1x W20-2 "Detour"'),
      h('li', null, '1x R1-1 "Stop" (paddle, for flaggers)'),
      h('li', null, '1x R5-1 "Do Not Enter"'),
      h('li', null, '6x spring-base sign stands'),
    ),
    h('p', null, 'Total kit cost: roughly $750-$1,100 in 2026 pricing depending on sheeting grade and supplier.'),

    h('h2', null, 'Custom-printed signs'),
    h('p', null, 'For company-branded signs ("ABC Paving - Crew Working") or job-specific detour wording, suppliers print on a blank using vinyl overlay or direct UV print. Lead time: 1-3 days from a real supplier with an in-house printer; 2-3 weeks from a drop-shipper. If your project plan calls for project-specific signs, line that up before the job clock starts.'),

    h('h2', null, 'Where contractors buy in NJ'),
    h(
      'p',
      null,
      'Stock all of the above out of our Central NJ yard with same-day delivery in Middlesex / Monmouth / Mercer / Somerset / Union / Hunterdon / northern Ocean. Browse the full ',
      h('a', { href: '/category/signs' }, 'signs inventory'),
      ', see complementary ',
      h('a', { href: '/category/cones' }, 'cones'),
      ' and ',
      h('a', { href: '/category/barricades' }, 'barricades'),
      ', or use the ',
      h('a', { href: '/planner' }, 'AI Job Planner'),
      ' to spec a sign list against an MUTCD typical application.',
    ),
  ),
  faqs: [
    {
      q: 'What is the minimum reflective sheeting grade for traffic safety signs?',
      a: 'ASTM D4956 Type IV (high intensity prismatic) is the MUTCD minimum for temporary traffic control signs on any roadway. Type I or II "engineering grade" sheeting is not legal for TTC and will be rejected during inspection.',
    },
    {
      q: 'What size sign should I buy for state-route work in NJ?',
      a: '36" diamond is the standard for state routes, county roads, and most residential work. 48" is required on Interstates, the NJ Turnpike, and Garden State Parkway. Buying 36" by default keeps you compliant for the bulk of contractor work.',
    },
    {
      q: 'How long do traffic safety signs last?',
      a: 'On a 0.080" aluminum blank with Type IV sheeting, expect 5-7 years of outdoor life before sheeting fade or aluminum corrosion forces a replacement. Type VIII/XI sheeting extends that to 10-12 years.',
    },
    {
      q: 'Can I print my own custom traffic safety signs?',
      a: 'For company-branding or project-specific wording: yes, your supplier can print custom vinyl on a blank. For MUTCD-standard signs (W20-1, R1-1, etc.): buy the standard - the legend, dimensions, and color must match the MUTCD specification, and DIY prints almost always fail an inspection.',
    },
    {
      q: 'What is the difference between regulatory and warning signs?',
      a: 'Warning signs (orange diamonds, W-series) alert drivers to upcoming conditions but do not require compliance. Regulatory signs (R-series, usually rectangles) impose enforceable rules - stop, yield, lane use, speed limits. Both belong in a TTC kit; they serve different roles.',
    },
    {
      q: 'Do I need a sign stand or can I lean signs on a barricade?',
      a: 'You need a stand. MUTCD requires signs to be mounted at a specified height (5 ft to bottom of sign for ground-mounted) and oriented squarely toward oncoming traffic. Leaning signs against barricades is a common citation reason.',
    },
  ],
  relatedProducts: [
    { label: 'Traffic Signs', path: '/category/signs' },
    { label: 'Sign Stands', path: '/category/signs' },
    { label: 'Cones', path: '/category/cones' },
    { label: 'Get a Quote', path: '/quote' },
  ],
  relatedArticles: [
    'traffic-control-signs-mutcd-guide',
    'pedestrian-crossing-signs-mutcd-guide',
    'traffic-signs-for-sale-buying-guide',
  ],
}
