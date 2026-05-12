import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "yellow traffic cones" (~500/mo, High comp, $9.82 bid).
 * Definitional / what-is article — explains when yellow cones are
 * appropriate vs. orange (the MUTCD default), what jobs use them,
 * and what to buy.
 */
export const articleYellowTrafficConesGuide: Article = {
  slug: 'yellow-traffic-cones-guide',
  title: 'Yellow Traffic Cones: When They Are Right (and When Orange Is the Only Legal Choice)',
  excerpt:
    'Yellow cones look like orange cones to most people, but they are not interchangeable on a public road. MUTCD reserves orange for traffic-control use; yellow is for caution-only or private-property settings. Here is the practical breakdown.',
  metaDescription:
    'Yellow traffic cones explained — when they are appropriate, when MUTCD requires orange, and what to buy for warehouses, parking lots, and event use.',
  primaryKeyword: 'yellow traffic cones',
  secondaryKeywords: [
    'yellow cones',
    'yellow safety cones',
    'yellow caution cones',
    'caution cones',
    'colored traffic cones',
    'yellow warehouse cones',
  ],
  targetVolume: 500,
  datePublished: '2026-05-12',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A yellow traffic cone is a cone with a yellow body — visually similar to a standard orange cone but ',
      h('strong', null, 'not legal as a channelizing device on any public road'),
      '. ',
      'MUTCD reserves fluorescent orange (and red-orange) for work-zone traffic control. Yellow is acceptable for caution / hazard marking on private property — warehouses, parking lots, retail floors, schools, event venues — and that is where you should buy them. ',
      'Below: what yellow cones are good for, what they are not, and what to buy.',
    ),

    h('h2', null, 'Why color matters on a cone'),
    h(
      'p',
      null,
      'Color codes traffic-control devices. From the MUTCD §6F.02 color spec for temporary traffic control:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Orange:'), ' work-zone channelizing, lane closures, taper devices, drums, panels — anything that redirects vehicles around a work area.'),
      h('li', null, h('strong', null, 'Yellow:'), ' caution / general warning. Used for hazards that exist regardless of work activity (a permanent column, a slick floor, a low overhead). NOT used for traffic redirection on a road.'),
      h('li', null, h('strong', null, 'Red:'), ' regulatory — stop, do not enter, prohibitions.'),
      h('li', null, h('strong', null, 'White / Blue / Green:'), ' specialty uses (parking, services, route guidance) — not common on cones.'),
    ),
    h(
      'p',
      null,
      'A yellow cone in the middle of an active lane closure is a citation waiting to happen, even if the cone is otherwise correctly sized and reflective. The color is the regulatory signal.',
    ),

    h('h2', null, 'Where yellow cones are the right choice'),
    h(
      'p',
      null,
      'Yellow really shines in spaces where the hazard is ambient rather than a moving traffic stream. Practical use cases:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Warehouse forklifts.'), ' Marking pedestrian-pinch points, blind corners, dock edges. Orange is reserved for active work zones; yellow signals general caution and reads correctly to OSHA inspections.'),
      h('li', null, h('strong', null, 'Wet floors / spills.'), ' Yellow A-frame "wet floor" cones are the building-services standard. A 12" or 18" yellow cone next to a slip hazard is industry vocabulary.'),
      h('li', null, h('strong', null, 'Schools and playgrounds.'), ' Marking permanent hazards (cracked pavement, drainage covers, vehicle drop-off zones) where orange would imply "construction" and confuse parents.'),
      h('li', null, h('strong', null, 'Retail / office.'), ' Spill response, IT cable runs across walkways, temporary HVAC equipment. Yellow reads as "watch your step," not "lane closed."'),
      h('li', null, h('strong', null, 'Event venues — backstage and catering only.'), ' Yellow is appropriate for guest-facing caution markers (cables, low ramps). Use orange for any cone that channelizes vehicle or pedestrian traffic flow.'),
      h('li', null, h('strong', null, 'Parking lots — private property, low risk.'), ' If you own the lot and the cone is for a temporary obstacle (a paint dry zone, a planter installation), yellow reads "be aware" without implying a regulated work zone.'),
    ),

    h('h2', null, 'Where yellow cones are NOT acceptable'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Public roads — any speed.'), ' Channelizing devices on roads must be orange (or white/orange-striped per §6F.65). Yellow fails MUTCD on a public right-of-way regardless of how the rest of the cone is specified.'),
      h('li', null, h('strong', null, 'Lane closures and tapers.'), ' Same as above — even on private streets that connect to public roads, contractors and inspectors expect orange.'),
      h('li', null, h('strong', null, 'Construction work zones.'), ' All MUTCD Part 6 traffic-control devices use orange or red-orange.'),
      h('li', null, h('strong', null, 'Nighttime deployment, period.'), ' Yellow has lower contrast against headlight glare than orange. Even in private settings, prefer orange for nighttime use.'),
    ),

    h('h2', null, 'Yellow cone sizes and what they cost'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Height'),
            h('th', { className: 'text-left p-2 border-b' }, 'Base weight'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best use'),
            h('th', { className: 'text-left p-2 border-b' }, 'Price each'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '12 in'), h('td', { className: 'p-2' }, '1–2 lb'), h('td', { className: 'p-2' }, 'Indoor wet floor / spill response'), h('td', { className: 'p-2' }, '$5–$12')),
          h('tr', null, h('td', { className: 'p-2' }, '18 in'), h('td', { className: 'p-2' }, '3–5 lb'), h('td', { className: 'p-2' }, 'Warehouse / parking-lot caution'), h('td', { className: 'p-2' }, '$9–$18')),
          h('tr', null, h('td', { className: 'p-2' }, '28 in'), h('td', { className: 'p-2' }, '5–7 lb'), h('td', { className: 'p-2' }, 'Outdoor private-property hazards'), h('td', { className: 'p-2' }, '$18–$30')),
          h('tr', null, h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, '7–10 lb'), h('td', { className: 'p-2' }, 'Large indoor venues, gymnasiums'), h('td', { className: 'p-2' }, '$30–$50')),
        ),
      ),
    ),

    h('h2', null, 'Reflective collars on yellow cones'),
    h(
      'p',
      null,
      'Yellow cones used outdoors should still have reflective collars — typically white or silver, not yellow-on-yellow which has poor contrast. A yellow cone in an outdoor private lot at night without reflective collars is essentially invisible to drivers. ',
      'For collar geometry and ASTM sheeting types, see ',
      h('a', { href: '/blog/reflective-traffic-cones-guide' }, 'Reflective Traffic Cones: ASTM Sheeting Grades'),
      '.',
    ),

    h('h2', null, 'Yellow vs. orange — quick decision tree'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Public road or right-of-way?'), ' Orange. Always.'),
      h('li', null, h('strong', null, 'Active work zone (even on private property)?'), ' Orange — the MUTCD vocabulary applies.'),
      h('li', null, h('strong', null, 'Permanent or semi-permanent caution marker (warehouse, retail, school)?'), ' Yellow.'),
      h('li', null, h('strong', null, 'Indoor spill or floor hazard?'), ' Yellow A-frame or yellow 12" cone.'),
      h('li', null, h('strong', null, 'Event channelizing?'), ' Orange (treat the event as a temporary work zone).'),
    ),

    h('h2', null, 'Stocking strategy'),
    h(
      'p',
      null,
      'Yellow cones complement an orange fleet; they should not replace it. For a small NJ contractor or building manager:',
    ),
    h(
      'ul',
      null,
      h('li', null, '12× 18" yellow cones with white reflective collar (warehouse / parking-lot caution)'),
      h('li', null, '6× 12" yellow A-frame "wet floor" cones (indoor spill response)'),
      h('li', null, '2× 28" yellow cones (large hazard markers — open trench on private property, equipment dropoff)'),
    ),
    h(
      'p',
      null,
      'For all road work, your fleet is orange. See ',
      h('a', { href: '/blog/traffic-cones-buying-guide' }, 'the full traffic cones buying guide'),
      ' for orange sizing.',
    ),

    h('h2', null, 'Where to buy yellow cones in NJ'),
    h(
      'p',
      null,
      'We stock yellow cones in 12", 18", and 28" sizes — most with white reflective collars for outdoor use. Browse our ',
      h('a', { href: '/category/cones-drums' }, 'cones, drums, and channelizers'),
      ' or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' for mixed-color fleet sizing. Same-day Central NJ delivery on standard sizes; custom-stenciled cones available with 5–7 day lead time.',
    ),
  ),
  faqs: [
    {
      q: 'Are yellow traffic cones legal on public roads?',
      a: 'No. MUTCD §6F.02 reserves fluorescent orange (and red-orange) for traffic-control devices on public rights-of-way. Yellow is for caution / hazard marking on private property — warehouses, parking lots, retail floors, schools. A yellow cone in a road work zone fails inspection regardless of size or reflectivity.',
    },
    {
      q: 'When should I use yellow cones instead of orange?',
      a: 'Use yellow when the hazard is ambient rather than a vehicle-traffic-control situation: warehouse pinch points, indoor spills, school drop-off zones, retail caution markers, backstage event use. Use orange whenever you are channelizing vehicles or pedestrians around a work area, including on private streets that connect to public roads.',
    },
    {
      q: 'Do yellow cones need reflective collars?',
      a: 'For outdoor use, yes — typically white or silver collars (yellow-on-yellow has poor contrast and is hard to see in headlights). Indoor-only cones (wet-floor markers, retail caution) often skip reflective sheeting and rely on the yellow body color and any printed text.',
    },
    {
      q: 'How tall should a warehouse yellow cone be?',
      a: '18 inches is the standard for warehouse caution use — visible to forklift operators and pedestrians from working distance, easy to step over. 12-inch cones are best for spill response on retail floors. 28-inch cones are for larger outdoor hazards on private property.',
    },
    {
      q: 'Can I mix yellow and orange cones in the same setup?',
      a: 'Yes, but for different purposes. Orange handles the channelizing (where vehicles or pedestrians should go); yellow handles ambient caution (a step-down, a column). Do not substitute yellow for orange in a taper or closure — the inspector will read it as a non-compliant work zone.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'orange-cones-explained',
    'reflective-traffic-cones-guide',
    'white-traffic-cones-guide',
  ],
}
