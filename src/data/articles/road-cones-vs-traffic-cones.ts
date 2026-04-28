import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "road cones" (~50K/mo, High comp) + "street cones" + "construction cones".
 * AEO wedge: defines the terminology overlap and explains MUTCD requirements
 * that distinguish a "road cone" from a generic traffic cone.
 */
export const articleRoadConesVsTrafficCones: Article = {
  slug: 'road-cones-vs-traffic-cones',
  title: 'Road Cones vs. Traffic Cones: Sizes, Colors, and What MUTCD Actually Requires',
  excerpt:
    '"Road cones," "traffic cones," and "street cones" all describe the same gear — but only some sizes and reflectivity grades actually pass MUTCD inspection. Here is the size-by-application guide and what to buy.',
  metaDescription:
    'Road cones, traffic cones, street cones — all the same thing, but only some sizes pass MUTCD inspection. Size guide by speed, reflectivity grades, and what to buy.',
  primaryKeyword: 'road cones',
  secondaryKeywords: [
    'street cones',
    'traffic cones',
    'construction cones',
    'road cone sizes',
    'orange cones',
    'safety cones',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-27',
  dateModified: '2026-04-28',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      '"Road cones," "traffic cones," and "street cones" all describe the same product — an orange or fluorescent-pink-orange channelizing device used to mark hazards, route traffic, and close lanes. ',
      h('strong', null, 'What separates a real MUTCD-compliant road cone from a hardware-store imitator is size and reflectivity:'),
      ' 28-inch cones with double reflective collars are the minimum for any roadway above 35 mph; 36-inch cones are required for nighttime work above 35 mph; 18-inch cones are NOT acceptable on any vehicle-speed work zone. Below is the size-by-application guide and what to actually buy.',
    ),

    h('h2', null, 'The MUTCD size requirements no one talks about until inspection day'),
    h(
      'p',
      null,
      'The MUTCD (Manual on Uniform Traffic Control Devices) sets minimum cone height by speed and time of day. Most failed inspections come from mis-spec\'d cones, not from missing them.',
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
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Speed limit'), h('th', { className: 'text-left p-2 border-b' }, 'Daytime minimum'), h('th', { className: 'text-left p-2 border-b' }, 'Nighttime minimum'), h('th', { className: 'text-left p-2 border-b' }, 'Reflective collar')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '≤ 35 mph'), h('td', { className: 'p-2' }, '18 in (low-speed only)'), h('td', { className: 'p-2' }, '28 in'), h('td', { className: 'p-2' }, 'Single 4-in collar OK')),
          h('tr', null, h('td', { className: 'p-2' }, '> 35 mph'), h('td', { className: 'p-2' }, '28 in'), h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, 'Double collar (4 + 6 in)')),
          h('tr', null, h('td', { className: 'p-2' }, '≥ 55 mph'), h('td', { className: 'p-2' }, '36 in (drums preferred)'), h('td', { className: 'p-2' }, '36 in + drums'), h('td', { className: 'p-2' }, 'Double collar required')),
        ),
      ),
    ),
    h('p', null, 'Reflective sheeting on the collars must meet ASTM Type IV (or better) high-intensity prismatic. Plain fluorescent paint does not pass.'),

    h('h2', null, 'Why orange? (And why some are pink-orange now)'),
    h(
      'p',
      null,
      'The federal MUTCD specifies "fluorescent orange" as the standard color for short-duration and mobile work zones. The orange/red wavelength has the highest contrast against most ambient backgrounds — concrete gray, asphalt black, and grass green — and stays visible in low-light conditions.',
    ),
    h(
      'p',
      null,
      'In 2023 the MUTCD updated to allow ',
      h('strong', null, 'fluorescent pink-orange'),
      ' for incident-response and emergency work zones, distinguishing planned construction (orange) from unplanned events (pink). Most contractors do not need pink cones; they are issued to fire / EMS / police agencies for crash scenes.',
    ),

    h('h2', null, 'Sizes — when to use each'),
    h('h3', null, '18-inch (low-speed, daytime, parking-lot only)'),
    h(
      'p',
      null,
      '18-inch cones are the right call for parking lots, driveways, valet operations, and indoor warehouse routing. Lightweight (typically 1–2 lbs), easy to stack 30+ on a truck. Do NOT use them on any roadway with a posted speed above 25 mph — they get blown over by truck wash and inspectors will flag them on a TCP review.',
    ),

    h('h3', null, '28-inch (the contractor default)'),
    h(
      'p',
      null,
      '28-inch cones with a 7-lb base are the most-used size on NJ road work. They handle 35–45 mph traffic, stack reasonably for transport, and meet MUTCD nighttime requirements when fitted with a double reflective collar. Most working sets contractors buy are 28-inch.',
    ),

    h('h3', null, '36-inch (highway, nighttime, freeway-speed)'),
    h(
      'p',
      null,
      '36-inch cones with 10-lb to 12-lb bases are required for any nighttime work on roads ≥ 35 mph and for daytime work on 55+ mph routes. They are heavier (harder to load), take more truck space, and cost roughly 2–3x what 28-inch cones cost. But on highway work, they are non-optional. Many state DOTs (NJDOT included) prefer 42-inch drums over 36-inch cones for tapers on freeways — see our taper-length guide for the spacing math.',
    ),

    h('h2', null, 'Base weight matters more than people think'),
    h(
      'p',
      null,
      'Cone bases come in 4-lb, 7-lb, 10-lb, and 12-lb. The base does two things: keeps the cone upright in wind, and prevents drift when a vehicle\'s slipstream passes. Rule of thumb:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '4-lb:'), ' indoor / parking-lot only. They blow over in any real wind.'),
      h('li', null, h('strong', null, '7-lb:'), ' daytime road work up to 45 mph. The standard NJ work-zone weight.'),
      h('li', null, h('strong', null, '10-lb:'), ' nighttime + 35–55 mph. Standard for any closure that runs past dusk.'),
      h('li', null, h('strong', null, '12-lb (or kettle-style with a recessed cavity for sandbag):'), ' freeway and high-wind. Always pair with a sandbag or extra ballast at 55+ mph.'),
    ),

    h('h2', null, 'PVC vs. rubber base — does it matter?'),
    h(
      'p',
      null,
      'PVC (the smooth orange plastic body) is the cone itself; the base is almost always rubber or recycled rubber compound. Rubber bases survive being driven over once or twice without permanent deformation; PVC bases crack on the first impact. Buy rubber-base cones if your jobs include any "the truck rolled over the cone" risk (most road work does).',
    ),

    h('h2', null, 'How many road cones do you actually need?'),
    h(
      'p',
      null,
      'Depends on the job. The fast answer for a typical NJ lane closure: ',
      h('strong', null, '20–30 cones'),
      ' for a single-lane closure on a 40 mph road. The full math (taper length × 10 spacing rule, buffer + activity area at 2× spacing, plus 25% spares) is in our ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'cone-count guide for lane closures'),
      '.',
    ),
    h(
      'p',
      null,
      'For a parking lot / event / private-property job: 1 cone every 8–10 ft of channelized path is the working standard. A typical event needs 50–150 cones; a single-lane parking-lot closure needs 8–12.',
    ),

    h('h2', null, 'What to buy for a small NJ road-work shop'),
    h(
      'p',
      null,
      'For a contractor outfitting a first cone set, the practical recipe is:',
    ),
    h(
      'ul',
      null,
      h('li', null, '20× 28-inch cones with 7-lb rubber base, double reflective collar (covers most NJ jobs up to 45 mph)'),
      h('li', null, '6× 36-inch cones with 10-lb base for any nighttime or 50+ mph work'),
      h('li', null, '6× 18-inch cones for parking-lot / yard / staging-area work where you do not want to deploy the larger gear'),
      h('li', null, 'A storage rack on the truck — flat-stack rack lasts longer than a "throw them in the bed" approach, and the cones stay clean'),
    ),
    h(
      'p',
      null,
      'Total stocking cost: roughly $1,200–$1,800 retail for the cone set, depending on brand and reflective grade.',
    ),

    h('h2', null, 'Where road cones actually fail'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Faded orange.'), ' UV exposure fades fluorescent orange within 18–36 months. Faded cones do not pass inspection — replace them.'),
      h('li', null, h('strong', null, 'Peeling reflective collar.'), ' If the sheeting is lifting at the edges, the cone fails the nighttime visibility check even if it looks fine in daylight.'),
      h('li', null, h('strong', null, 'Cracked PVC body.'), ' Cones that have been driven over enough times start cracking at the cone-to-base seam. Once they are cracked, water gets in, the cone gets heavy at the bottom, and balance shifts.'),
      h('li', null, h('strong', null, 'Wrong size for speed.'), ' The most common cite — 18-inch cones on a 35+ mph roadway.'),
    ),

    h('h2', null, 'Where to buy road cones in NJ'),
    h(
      'p',
      null,
      'For Central NJ contractors, ',
      h('a', { href: '/category/cones-drums' }, 'browse our cones and channelizers'),
      ' — we stock 28-inch and 36-inch cones with NJ-grade reflective sheeting and same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon counties. For a custom set sized to a specific job, ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' — describe the job and we will spec the size, count, and base weight that pass NJ inspection.',
    ),
  ),
  faqs: [
    {
      q: 'What is the difference between road cones and traffic cones?',
      a: 'They are the same product. "Road cones," "traffic cones," and "street cones" are interchangeable terms for orange channelizing devices used to mark hazards and route traffic. The MUTCD calls them "traffic cones." What matters is size and reflectivity — 28-inch cones with double reflective collars are the contractor default for road work.',
    },
    {
      q: 'Are 18-inch road cones legal for road work?',
      a: 'Only on roads with a posted speed of 25 mph or less, and only during daytime. For any work zone above 35 mph or anytime at night, 18-inch cones are too short to meet MUTCD visibility requirements. Inspectors will cite them on a TCP review.',
    },
    {
      q: 'Why are road cones orange?',
      a: 'Fluorescent orange has the highest contrast against typical ambient backgrounds (asphalt, concrete, grass) and stays visible in low light. The federal MUTCD specifies fluorescent orange as the standard color for short-duration and mobile work zones. As of the 2023 MUTCD, fluorescent pink-orange is also allowed for incident-response and emergency work zones.',
    },
    {
      q: 'How heavy should a road cone base be?',
      a: '7 lb for daytime work up to 45 mph (the NJ contractor standard). 10 lb for nighttime or 35–55 mph. 12 lb for freeway and high-wind. At 55+ mph, plan to add a sandbag or extra ballast on top of the base.',
    },
    {
      q: 'How long do road cones last?',
      a: 'A well-cared-for 28-inch cone lasts 3–5 years. UV exposure fades the orange within 18–36 months — once they look pale or pink, replace them. Reflective collars typically need replacement before the cone body wears out, so check sheeting condition each season.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'how-many-cones-for-lane-closure-nj',
    'mutcd-taper-length-formula-nj',
    'traffic-cone-rental-guide',
  ],
}
