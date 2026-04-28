import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * PILLAR — Targets "barricades" (50K/mo, CI=83).
 * Head-category pillar absorbing "traffic barricades" (5K), "construction barricades",
 * "street barricades", "road barricades". Distinct from barricade-rental-near-me-guide
 * (rental/local intent) and type-iii-barricade (type-comparison).
 */
export const articleBarricadesTypesUsesGuide: Article = {
  slug: 'barricades-types-uses-guide',
  title: 'Barricades: Types, Uses, and How to Pick the Right One',
  excerpt:
    'Barricades come in five families — Type I, Type II, Type III, water-filled, and pedestrian — each one solving a different MUTCD problem. Here is the working contractor reference.',
  metaDescription:
    'Barricades explained: five families (Type I, II, III, water-filled, pedestrian), MUTCD §6F.63 specs, when to use each, sizing rules, and how to rent the right barricade.',
  primaryKeyword: 'barricades',
  secondaryKeywords: [
    'traffic barricades',
    'construction barricades',
    'street barricades',
    'road barricades',
    'types of barricades',
    'barricade types',
    'work zone barricades',
    'barricade vs barrier',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-27',
  readMinutes: 11,
  body: h(
    Fragment,
    null,

    h(
      'p',
      { className: 'lead' },
      'Barricades are discrete, portable channelizing devices used to warn motorists, route pedestrians, and close roads to traffic. The federal MUTCD (§6F.63) recognizes three crashworthy types — Type I, Type II, and Type III — distinguished by the number of horizontal rails and the height. Two adjacent device classes — water-filled plastic barricades and pedestrian barricades — round out the working set most contractors actually use. Each barricade family solves a distinct problem: short-duration daytime channelization, long-duration high-visibility channelization, full road closure, positive separation, or pedestrian routing.',
    ),

    h('h2', null, 'What is a barricade, and how is it different from a barrier?'),
    h(
      'p',
      null,
      'A barricade is a discrete device — single-piece, freestanding, placed at intervals — that warns motorists and channelizes traffic by visual delineation. A barrier is a continuous longitudinal device (jersey-shape concrete, water-filled plastic in a connected run, or interlocking steel) that physically contains an errant vehicle. The wording matters: a state DOT plan that says "channelization with Type III barricades" is calling for discrete barricades; a plan that says "positive protection with longitudinal barrier" is calling for a continuous run. Substituting one for the other fails inspection.',
    ),
    h(
      'p',
      null,
      'The visual cue is also distinct. A Type III barricade has three orange-and-white horizontal rails on light frames at roughly 60 inches tall and is visually clearly an "obstruction in the road." A jersey barrier is a continuous gray or white concrete wall the same length as the closure. Drivers respond to them differently — the barricade tells the driver to slow and steer; the barrier tells the driver the lane is gone.',
    ),

    h('h2', null, 'What are the five main barricade families?'),
    h(
      'p',
      null,
      'Five barricade types cover almost every contractor use case. The differences are summarized below; the deeper rules are in MUTCD §6F.63 (Type I/II/III rail and height specs) and the FHWA roadside hardware acceptance letters for each manufacturer\'s specific model.',
    ),
    h(
      'div',
      { className: 'overflow-x-auto' },
      h(
        'table',
        null,
        h(
          'thead',
          null,
          h(
            'tr',
            null,
            h('th', null, 'Barricade Type'),
            h('th', null, 'Rails'),
            h('th', null, 'Height'),
            h('th', null, 'Typical Use'),
            h('th', null, 'MUTCD Reference'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', null, 'Type I'),
            h('td', null, '1'),
            h('td', null, '36 in'),
            h('td', null, 'Short-duration daytime channelization on low-speed roads'),
            h('td', null, '§6F.63'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Type II'),
            h('td', null, '2'),
            h('td', null, '36 in'),
            h('td', null, 'Channelization with extra visibility, low-to-mid speed'),
            h('td', null, '§6F.63'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Type III'),
            h('td', null, '3'),
            h('td', null, '60+ in'),
            h('td', null, 'Full road closures, detours, hazardous areas'),
            h('td', null, '§6F.63'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Water-Filled Plastic'),
            h('td', null, 'Continuous'),
            h('td', null, '32–42 in'),
            h('td', null, 'Short-term positive separation, pedestrian routing'),
            h('td', null, '§6F.74 (LCD)'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Pedestrian Barricade'),
            h('td', null, 'Mesh / panel'),
            h('td', null, '36–42 in'),
            h('td', null, 'Sidewalk diversions, event crowd routing'),
            h('td', null, '§6D.02'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Type I and Type II are visually similar — orange and white reflective rails on light folding A-frame supports — but the second rail on a Type II provides additional visibility at distance and is required on roads above 35 mph in many state supplements. Type III is a different category of device entirely; its three rails and 60-inch height make it the standard for full road closures and detours where motorists must register the closure from a quarter-mile back.',
    ),

    h('h2', null, 'When does each barricade type actually go in?'),
    h(
      'p',
      null,
      'A short-duration daytime utility patch on a 30 mph residential street usually uses Type I barricades to channelize, paired with a ',
      h('a', { href: '/product/roll-up-road-work-ahead' }, 'ROAD WORK AHEAD sign'),
      ' upstream. A multi-day water-line repair on a 40 mph collector steps up to ',
      h('a', { href: '/product/type-ii-barricade' }, 'Type II barricades'),
      ' for the longer visibility profile, with ',
      h('a', { href: '/product/type-b-flashing-warning-light' }, 'Type B flashing warning lights'),
      ' on the lead barricades for nighttime hours. A full road closure for a bridge inspection or a pavement panel replacement uses ',
      h('a', { href: '/product/type-iii-barricade' }, 'Type III barricades'),
      ' across the entire roadway with a DETOUR sign sequence. A pedestrian sidewalk diversion uses ',
      h('a', { href: '/product/economy-pedestrian-barricade-orange-eg' }, 'pedestrian barricades'),
      ' or interlocking water-filled pedestrian panels.',
    ),
    h(
      'p',
      null,
      'For positive separation between a work zone and active traffic — not just channelization but actual containment of an errant vehicle — the device class is barriers, not barricades. Water-filled plastic barricades occupy a middle ground: they channelize like a Type II but their continuous-run footprint also resists low-speed lateral encroachment. They are usually MASH TL-2 (≤45 mph) only.',
    ),

    h('h2', null, 'What MUTCD and crashworthiness standards apply?'),
    h(
      'p',
      null,
      'MUTCD §6F.63 covers Type I/II/III barricade construction — rail counts, rail dimensions (8–12 inches wide, 24+ inches long), retroreflective sheeting on both sides, alternating orange and white striping. §6F.74 covers longitudinal channelizing devices (LCDs), the category most water-filled plastic barricades fall into. §6D.02 covers pedestrian channelizing devices. The federal manual, edition status, and adopted state supplements are published online by the FHWA Office of Operations through the ',
      h(
        'a',
        {
          href: 'https://mutcd.fhwa.dot.gov/',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        'MUTCD Knowledge Center',
      ),
      '.',
    ),
    h(
      'p',
      null,
      'Crashworthiness for barricades is governed by AASHTO\'s Manual for Assessing Safety Hardware (MASH). Most modern Type III barricades carry MASH TL-3 acceptance letters; some lighter Type I and II models are TL-2 (≤45 mph) only. State DOT contracts typically require the FHWA acceptance letter to be on file for every barricade model in use, especially on federal-aid projects.',
    ),

    h('h2', null, 'How do I size a barricade run?'),
    h(
      'p',
      null,
      'Two numbers drive the count: the run length and the device spacing. Spacing for channelizing barricades follows the same MUTCD Table 6C-2 logic that governs cones — roughly equal to the speed in feet (45-foot spacing on a 45 mph road) for tangent placement, tighter (1× speed in feet) for tapers. For full road closures using Type III barricades, the closure is typically a continuous arc of three to five barricades placed shoulder-to-shoulder across the lane, with additional Type IIIs anchoring the detour route at each turn.',
    ),
    h(
      'div',
      { className: 'overflow-x-auto' },
      h(
        'table',
        null,
        h(
          'thead',
          null,
          h(
            'tr',
            null,
            h('th', null, 'Application'),
            h('th', null, 'Barricade Type'),
            h('th', null, 'Spacing / Quantity'),
            h('th', null, 'Lights Required?'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', null, 'Daytime channelization, 25–35 mph'),
            h('td', null, 'Type I'),
            h('td', null, '25–35 ft tangent'),
            h('td', null, 'No'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Daytime/nighttime, 35–45 mph'),
            h('td', null, 'Type II'),
            h('td', null, '35–45 ft tangent'),
            h('td', null, 'Type B at night'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Full road closure'),
            h('td', null, 'Type III'),
            h('td', null, '3–5 across lane width'),
            h('td', null, 'Type B (one per barricade)'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Pedestrian sidewalk diversion'),
            h('td', null, 'Pedestrian / water-filled'),
            h('td', null, 'Continuous run, no gap > 6 in'),
            h('td', null, 'Recommended at night'),
          ),
        ),
      ),
    ),

    h('h2', null, 'How long do barricades last in continuous use?'),
    h(
      'p',
      null,
      'Modern Type I and II barricades use HDPE or polyethylene panels with prismatic retroreflective sheeting — they survive 3–5 years of continuous outdoor exposure with retroreflectivity loss accelerating after year 2. Type III barricades on aluminum or galvanized steel frames last longer, 5–10 years, but the panels themselves degrade on the same timeline. Water-filled barricades have a similar 3–5 year service life; UV degradation of the plastic and silt buildup in the cavities are the typical end-of-life issues. For long-duration projects, plan to rotate stock or specify panels with a 7-year reflective-sheeting warranty.',
    ),

    h('h2', null, 'How do I rent the right barricades?'),
    h(
      'p',
      null,
      'Send the quote with the barricade type (I / II / III / pedestrian / water-filled), quantity, road speed, expected duration, delivery address, and any state DOT plan or specification reference. The rental coordinator can confirm MASH acceptance for the specific model and bundle warning lights or sign mounts as needed. Lead time runs 24–48 hours for Type I/II/III and pedestrian barricades in major metros; water-filled barricades for long runs (more than 100 units) need 2–5 business days because they ship empty and fill on site.',
    ),

    h(
      'p',
      null,
      h('a', { href: '/quote', className: 'cta-inline' }, 'Quote barricades for your work zone'),
      ' — share the type, count, road speed, and dates, and we will confirm availability, MASH letters, and delivery.',
    ),
  ),

  faqs: [
    {
      q: 'What is the difference between Type I, II, and III barricades?',
      a: 'Type I has one horizontal rail at 36 inches tall — used for low-speed daytime channelization. Type II has two rails at 36 inches — used when extra visibility is required at distance. Type III has three rails at 60+ inches and is the standard for full road closures and detours. The MUTCD §6F.63 spec sets the rail count, height, and reflective sheeting requirements for each.',
    },
    {
      q: 'When do barricades need warning lights?',
      a: 'MUTCD §6F.81 governs warning lights. Type B (high-intensity flashing) lights are required on Type III barricades used for road closures and on barricades along nighttime work zones above 45 mph. Type A (low-intensity flashing) lights are used on lower-speed nighttime work. Type C (steady-burn) lights are used to delineate the edge of detours and curves at night.',
    },
    {
      q: 'Can a barricade replace a barrier on a high-speed road?',
      a: 'No. Barricades channelize but do not contain — even Type III barricades displace 4–10 feet under impact. For high-speed work zones with workers in the active travel area or unprotected drop-offs, MUTCD and state DOT specs require positive protection from longitudinal barriers (water-filled, concrete, or steel) with MASH TL-3 or TL-4 acceptance.',
    },
    {
      q: 'Are crowd control barricades the same as traffic barricades?',
      a: 'No. Crowd control barricades (also called bike rack or French barriers) are interlocking metal panels designed for pedestrian channelization at events. They are not MUTCD-recognized for vehicle traffic control and not crashworthy. For pedestrian routing inside a work zone, MUTCD specifies pedestrian channelizing devices (§6D.02), which are similar in function but built to different specifications.',
    },
    {
      q: 'How do barricades and cones work together in a work zone?',
      a: 'Cones and drums channelize the taper and the activity area; barricades anchor the closure ends and any high-visibility points (a lane drop, a pedestrian diversion, a closed driveway). A typical layout uses cones for the channelization run and Type II or Type III barricades to mark the closure boundary and any approach to a hazard. The MUTCD typical applications drawings show the standard combinations.',
    },
    {
      q: 'Do barricades need to be retroreflective on both sides?',
      a: 'Yes. MUTCD §6F.63 requires retroreflective sheeting on both faces visible to traffic, with alternating orange and white stripes sloping downward toward the side traffic should pass. The sheeting class must meet §6F.03 minimums — typically Type IV or higher prismatic sheeting on rigid panels, equivalent grade on roll-up or fabric panels.',
    },
    {
      q: 'How heavy are typical rental barricades?',
      a: 'Type I and Type II A-frame barricades weigh 15–40 pounds each — light enough for a single worker to carry. Type III barricades range 30–80 pounds depending on the frame material. Water-filled plastic barricades weigh 50–80 pounds empty and 200–400 pounds filled. Concrete pedestrian barriers weigh 200+ pounds and require equipment to set.',
    },
    {
      q: 'Do I need a permit to set up barricades on a public street?',
      a: 'Yes, on any public road open to traffic. The permit comes from the local public-works department or the state DOT depending on the road jurisdiction. The permit usually requires a written traffic control plan referencing the relevant MUTCD typical application, the device list, and the duration. Setting up barricades without a permit invalidates the legal authority of the work zone.',
    },
  ],

  relatedProducts: [
    { label: 'Type III Barricade', path: '/product/type-iii-barricade' },
    { label: 'Type II Barricade', path: '/product/type-ii-barricade' },
    { label: 'Pedestrian Barricade (Orange EG)', path: '/product/economy-pedestrian-barricade-orange-eg' },
    { label: 'Urbanite Water-Filled Pedestrian Barricade', path: '/product/urbanite-water-filled-pedestrian-barricade' },
    { label: 'Type B Flashing Warning Light', path: '/product/type-b-flashing-warning-light' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
  ],

  relatedArticles: [
    'barricade-rental-near-me-guide',
    'type-iii-barricade-vs-type-i-type-ii',
    'uniform-traffic-control-devices-mutcd-guide',
  ],
}
