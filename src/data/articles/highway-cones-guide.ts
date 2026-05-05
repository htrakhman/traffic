import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "highway cones" (~5,000/mo, High comp, $10.99 bid).
 * Definitional / "what is X" angle — answers what a highway cone actually is,
 * how it differs from a parking-lot cone, and what the MUTCD requires for
 * highway-speed deployments.
 */
export const articleHighwayConesGuide: Article = {
  slug: 'highway-cones-guide',
  title: 'Highway Cones: What They Are, MUTCD Sizing, and What to Buy (2026)',
  excerpt:
    'Highway cones are the 28" or 36" reflective traffic cones rated for travel-lane work at 45+ mph. Here is what separates a real highway cone from a parking cone, what MUTCD requires, and what to buy for NJ road work.',
  metaDescription:
    'Highway cones explained — MUTCD sizing rules, reflective collar requirements, weight by speed limit, and what NJ contractors should buy for travel-lane closures.',
  primaryKeyword: 'highway cones',
  secondaryKeywords: [
    'highway traffic cones',
    'highway safety cones',
    '36 inch highway cones',
    'reflective highway cones',
    'orange highway cones',
    'mutcd highway cones',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-05',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A highway cone is a ',
      h('strong', null, '28-inch or 36-inch fluorescent-orange traffic cone with two reflective collars'),
      ', weighted to 7-10+ lb, and rated for use on roadways with posted speeds of 45 mph or higher. The MUTCD calls them "channelizing devices," and what makes a cone "highway-grade" rather than a parking-lot cone is a specific combo of height, mass, and ASTM-rated reflective sheeting. Below: the rules, the sizes, and what NJ contractors should keep on the truck.',
    ),

    h('h2', null, 'What makes a cone a "highway" cone'),
    h(
      'p',
      null,
      'The MUTCD (Manual on Uniform Traffic Control Devices, 11th edition) sets minimums for cones used on roadways. The short version:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Height: '), 'minimum 28" for low-speed roadways, minimum 36" for "high-speed and/or freeways" (interpreted as 45 mph and up).'),
      h('li', null, h('strong', null, 'Color: '), 'fluorescent orange or fluorescent yellow-green for daytime visibility.'),
      h('li', null, h('strong', null, 'Reflectorization for nighttime use: '), 'one 6" white retroreflective collar on a 28" cone, or one 6" plus one 4" collar on a 36" cone.'),
      h('li', null, h('strong', null, 'Mass: '), 'enough that the cone resists being blown over by truck wash. Practically, 7 lb minimum for 28" and 10-12 lb for 36" highway use.'),
    ),
    h(
      'p',
      null,
      'A 28" cone with no collars is a parking-lot cone. A 28" cone with one 6" collar is a highway cone for low-speed work. A 36" cone with both collars is the standard for state-route and freeway work zones. If your cone does not have collars, it is not a highway cone - period.',
    ),

    h('h2', null, 'The size and weight matrix'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Cone'),
            h('th', { className: 'text-left p-2 border-b' }, 'Speed limit'),
            h('th', { className: 'text-left p-2 border-b' }, 'Reflective collars'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical weight'),
            h('th', { className: 'text-left p-2 border-b' }, 'Use case'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '18"'), h('td', { className: 'p-2' }, 'Off-road only'), h('td', { className: 'p-2' }, 'None required'), h('td', { className: 'p-2' }, '3 lb'), h('td', { className: 'p-2' }, 'Parking lots, indoor only - NOT highway')),
          h('tr', null, h('td', { className: 'p-2' }, '28"'), h('td', { className: 'p-2' }, 'Up to 40 mph'), h('td', { className: 'p-2' }, 'One 6" white collar'), h('td', { className: 'p-2' }, '7 lb'), h('td', { className: 'p-2' }, 'Local roads, residential closures, low-speed work zones')),
          h('tr', null, h('td', { className: 'p-2' }, '28"'), h('td', { className: 'p-2' }, 'Up to 40 mph'), h('td', { className: 'p-2' }, 'One 6" white collar'), h('td', { className: 'p-2' }, '10 lb'), h('td', { className: 'p-2' }, 'Same job, windier conditions / truck wash')),
          h('tr', null, h('td', { className: 'p-2' }, '36"'), h('td', { className: 'p-2' }, '45 mph and up'), h('td', { className: 'p-2' }, 'One 6" + one 4" collar'), h('td', { className: 'p-2' }, '10 lb'), h('td', { className: 'p-2' }, 'State routes, freeways, NJDOT travel-lane work')),
          h('tr', null, h('td', { className: 'p-2' }, '36"'), h('td', { className: 'p-2' }, '55+ mph / sustained wind'), h('td', { className: 'p-2' }, 'One 6" + one 4" collar'), h('td', { className: 'p-2' }, '12 lb'), h('td', { className: 'p-2' }, 'Turnpike, Parkway, I-95, GSP work zones')),
        ),
      ),
    ),
    h('p', null, 'For NJ contractors: the 36" / 10 lb cone is the practical default for any job on a state route or higher. The 28" / 7 lb is fine for cul-de-sac, parking-lot, or driveway work. We do not recommend 18" cones for any roadway use - they fly the moment a Class 8 truck passes.'),

    h('h2', null, 'Reflective sheeting types - Type III vs Type IV vs Type V'),
    h(
      'p',
      null,
      'The collar on a highway cone is reflective sheeting laminated onto a vinyl sleeve. ASTM D4956 grades the sheeting by retroreflectivity (how much light bounces back per square foot at a given angle). The three grades you will see:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Type III (high-intensity prismatic, "HIP"): '), 'OK for 28" cones on local roads. ~250 candela/lux.'),
      h('li', null, h('strong', null, 'Type IV (high-intensity prismatic, brighter): '), 'now standard on most 36" cones. ~500 candela/lux.'),
      h('li', null, h('strong', null, 'Type V or "diamond grade": '), 'highest retroreflectivity, often spec\'d for freeway work zones at NJDOT request. ~800+ candela/lux.'),
    ),
    h('p', null, 'NJDOT specs typically require Type IV minimum on any cone used on a state route. Always check the spec sheet on the cone - the sheeting grade is a printed line, not a marketing claim.'),

    h('h2', null, 'How highway cones differ from parking cones'),
    h(
      'p',
      null,
      'Three real differences:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Mass. '), 'A parking cone is 3-5 lb. A highway cone is 7-12 lb. The extra mass is in a thicker rubber base, not the cone body. This is what keeps the cone planted when a tractor-trailer passes at 70 mph.'),
      h('li', null, h('strong', null, 'PVC vs. rubber. '), 'Parking cones are usually PVC (lighter, cracks below freezing). Highway cones are PVC body with a recycled rubber base, or fully rubber/PE for cold-weather use. Rubber bases survive cold storage in a yard; PVC cracks.'),
      h('li', null, h('strong', null, 'Reflective collars. '), 'Parking cones rarely have collars. Highway cones always do. If you cannot see two reflective bands when the cone is in your hand, do not put it on a state road.'),
    ),

    h('h2', null, 'How many highway cones for a typical job'),
    h(
      'p',
      null,
      'MUTCD taper spacing depends on speed and lane width. The rough numbers for a single travel-lane closure on a 12-ft lane:',
    ),
    h(
      'ul',
      null,
      h('li', null, '35 mph road: 7 cones in the taper, then 1 cone every 35 ft through the work zone.'),
      h('li', null, '45 mph road: 9 cones in the taper, then 1 cone every 45 ft.'),
      h('li', null, '55 mph road: 11 cones in the taper, then 1 cone every 55 ft.'),
      h('li', null, '65 mph (Turnpike, GSP): 13 cones in the taper, then 1 cone every 65 ft.'),
    ),
    h(
      'p',
      null,
      'For a 1,000 ft work zone on a 55 mph state route, you need roughly 11 (taper) + 18 (length) + 6 (downstream taper) = ~35 cones. Round up to 50 to allow for damage replacement and lateral channelizing. For a step-by-step calculator, see our ',
      h('a', { href: '/article/how-many-cones-for-lane-closure-nj' }, 'lane-closure cone count guide'),
      ' or run the job through the ',
      h('a', { href: '/planner' }, 'work-zone planner'),
      '.',
    ),

    h('h2', null, 'NJDOT and Turnpike-specific rules'),
    h(
      'p',
      null,
      'NJDOT\'s standard work-zone spec (referenced in the NJDOT Standard Specifications for Road and Bridge Construction, Section 159) requires:',
    ),
    h(
      'ul',
      null,
      h('li', null, '36" cones on all state routes with posted speed 45+ mph.'),
      h('li', null, 'ASTM D4956 Type IV or higher reflective sheeting on the collars.'),
      h('li', null, 'Cones replaced when fluorescent orange has faded to a "weak orange" (subjective - but inspectors will flag bleached cones).'),
      h('li', null, 'No cones with cracked bases, missing collars, or oil/tar contamination.'),
    ),
    h(
      'p',
      null,
      'NJ Turnpike Authority (NJTA) work zones often require an additional spec on top of NJDOT - typically Type V sheeting and 12 lb minimum mass. Always check the contract documents before mobilizing on Turnpike or Parkway work; the rejection rate for non-compliant cones is high and costs you a day of crew time.',
    ),

    h('h2', null, 'What to keep on the truck'),
    h(
      'p',
      null,
      'A typical NJ road-work crew should carry:',
    ),
    h(
      'ul',
      null,
      h('li', null, '40x 36" / 10 lb cones with Type IV collars (the daily driver).'),
      h('li', null, '10x 28" / 7 lb cones for back-of-yard and lower-speed jobs.'),
      h('li', null, '6x cone bars or cone-mounted signs for the taper head.'),
      h('li', null, 'A cone caddy or rack on the truck (saves 15 min on every set/strike).'),
      h('li', null, 'Replacement collars in 6" and 4" lengths - they peel before the cone wears out.'),
    ),

    h('h2', null, 'Where to buy highway cones in NJ'),
    h(
      'p',
      null,
      'Browse our ',
      h('a', { href: '/category/cones-drums' }, 'cones and channelizers category'),
      ' for 28" and 36" highway-rated cones with Type III, IV, and V collars. For a per-job recommendation that accounts for taper length, speed limit, and shoulder geometry, run the spec through our ',
      h('a', { href: '/assistant' }, 'AI gear assistant'),
      ' or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' - same-day Central NJ delivery, NJDOT-compliant cones in stock.',
    ),
  ),
  faqs: [
    {
      q: 'What is a highway cone vs. a regular cone?',
      a: 'A highway cone is taller (28" or 36"), heavier (7-12 lb), and has one or two retroreflective collars. A regular parking cone is 18-28", 3-5 lb, and usually has no collars. The MUTCD requires reflective collars on any cone used on a public roadway after dark.',
    },
    {
      q: 'What size cone do I need for a 55 mph road?',
      a: 'A 36" cone with 10-12 lb base and Type IV (or higher) reflective collars. The MUTCD says 36" minimum for any roadway with posted speed of 45 mph or higher; NJDOT specs match. Anything smaller will get blown over by truck wash and may be rejected by an inspector.',
    },
    {
      q: 'How much do highway cones weigh?',
      a: 'A 28" highway cone weighs 7 lb (low-speed) or 10 lb (windy/highway). A 36" cone weighs 10 lb (standard) or 12 lb (Turnpike/Parkway). The weight is in the rubber base - the cone body itself is only 1-2 lb of PVC.',
    },
    {
      q: 'Are highway cones the same as construction cones?',
      a: 'They overlap, but not exactly. "Construction cone" is a colloquial label for any orange traffic cone on a job site. "Highway cone" specifically means one that meets the MUTCD spec for roadway use - height, mass, and reflective collars. A construction cone in a parking lot does not need to be a highway cone; on a state route, it does.',
    },
    {
      q: 'How long do highway cones last?',
      a: 'Three to five years of daily use before the orange fades to a weak orange that NJDOT inspectors will reject. The reflective collars typically peel before the cone body wears out - keep replacement collars in stock to extend the cones life by another 1-2 seasons.',
    },
    {
      q: 'Can I use 18" cones on a highway?',
      a: 'No. The MUTCD requires 28" minimum on any public roadway and 36" minimum on roads posted 45+ mph. 18" cones are for parking lots and indoor use only - they will fly the moment heavy traffic passes and inspectors will issue a stop-work for non-compliance.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'how-many-cones-for-lane-closure-nj',
    'traffic-safety-cones-pillar-guide',
    'orange-cones-explained',
  ],
}
