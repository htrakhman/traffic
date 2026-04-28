import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * PILLAR — Targets "jersey barricades" (50K/mo, CI=96).
 * Specific subtype pillar: plastic-Jersey-shape barricades for events,
 * parking lots, low-speed channelization. Distinct from
 * portable-traffic-barrier-rental-guide (contractor barrier-vs-barricade taxonomy).
 */
export const articleJerseyBarricadesGuide: Article = {
  slug: 'jersey-barricades-guide',
  title: 'Jersey Barricades: Plastic vs. Concrete, Sizes, and When to Use Them',
  excerpt:
    'A "Jersey barricade" is the J-shape barrier born on New Jersey highways and now made in plastic for events and parking lots, concrete for highway work. Here is the working guide to choosing and renting them.',
  metaDescription:
    'Jersey barricades explained: plastic vs concrete, MASH ratings, sizes (4 ft, 6 ft, 10 ft), event and contractor uses, and how to size a Jersey barricade run.',
  primaryKeyword: 'jersey barricades',
  secondaryKeywords: [
    'plastic jersey barriers',
    'jersey barrier',
    'concrete jersey barriers',
    'plastic barricades',
    'jersey wall',
    'k-rail',
    'water filled jersey barrier',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-27',
  dateModified: '2026-04-28',
  readMinutes: 11,
  body: h(
    Fragment,
    null,

    h(
      'p',
      { className: 'lead' },
      'A "Jersey barricade" is the colloquial name for the J-shaped longitudinal barrier originally developed by the New Jersey State Highway Department in the 1950s and 1960s and now standardized across U.S. highways and event sites. The shape — a low concrete or plastic wall with a sloped-then-vertical profile — was engineered to redirect vehicles back into their lane on impact rather than launch them or stop them dead. Today the Jersey shape comes in two material families: precast concrete (the original highway-grade barrier, MASH TL-3 or TL-4) and plastic, usually water-fillable (event, parking-lot, and low-speed work-zone use, typically MASH TL-2 or unrated).',
    ),

    h('h2', null, 'What is a Jersey barricade and where did it come from?'),
    h(
      'p',
      null,
      'The Jersey profile was developed iteratively at the New Jersey State Highway Department through the 1950s and refined through full-scale crash testing in the 1960s. The geometry — 32 inches tall in the original profile, with a 13-inch vertical face at the bottom transitioning to a sloped face that rises to a vertical top section — was selected because it consistently redirected impacting vehicles back into the travel lane without rolling them over or vaulting them. The shape was adopted by other state DOTs and eventually became the federal default for permanent and temporary concrete median barrier under the AASHTO Roadside Design Guide.',
    ),
    h(
      'p',
      null,
      'The plastic Jersey-shape barricade is a much later product, designed to deliver the same visual cue and footprint at a fraction of the weight. Early plastic Jerseys were channelizers only — they signaled where the lane was without containing impact. Modern water-filled plastic Jerseys can carry MASH TL-2 acceptance letters at low speeds and are used widely for event perimeters, parking-lot lane control, and short-duration low-speed work zones.',
    ),

    h('h2', null, 'What is the difference between plastic and concrete Jersey barricades?'),
    h(
      'p',
      null,
      'Material drives every other tradeoff. Concrete Jersey barriers are heavy (2,800–5,800 lb per 10–20 foot segment), require a crane or boom truck to set, and have a redirective MASH rating at TL-3 or TL-4 (highway-speed and Interstate-speed impacts respectively). Plastic Jersey barricades are light (50–80 lb empty, 200–400 lb water-filled), set by hand or with a small forklift, and either carry a TL-2 letter for low-speed work or have no crashworthiness rating for purely visual channelization. The summary below maps the working tradeoffs.',
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
            h('th', null, 'Attribute'),
            h('th', null, 'Plastic Jersey (water-filled)'),
            h('th', null, 'Concrete Jersey'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', null, 'Weight per segment'), h('td', null, '50–80 lb empty / 200–400 lb filled'), h('td', null, '2,800–5,800 lb (10–20 ft segment)')),
          h('tr', null, h('td', null, 'Typical lengths'), h('td', null, '4 ft, 6 ft, 8 ft'), h('td', null, '10 ft, 12.5 ft, 20 ft')),
          h('tr', null, h('td', null, 'Height'), h('td', null, '32–42 in'), h('td', null, '32 in (NJ profile) / 42 in (F-shape / TL-4)')),
          h('tr', null, h('td', null, 'MASH rating'), h('td', null, 'Up to TL-2 (≤45 mph) when filled'), h('td', null, 'TL-3 (~62 mph) or TL-4 (truck impact)')),
          h('tr', null, h('td', null, 'Install method'), h('td', null, 'Hand-set, fill on site'), h('td', null, 'Crane / boom truck')),
          h('tr', null, h('td', null, 'Typical use'), h('td', null, 'Events, parking lots, low-speed work zones'), h('td', null, 'Highway work zones, permanent median barrier')),
          h('tr', null, h('td', null, 'Deflection on impact'), h('td', null, '4–8 ft'), h('td', null, '1–2 ft')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'The choice is not interchangeable. A plastic Jersey on a 65 mph highway shoulder is a failed inspection. A concrete Jersey for a parking-lot lane closure is wasted money — it costs more to mobilize than the rental of the alternative for the entire duration.',
    ),

    h('h2', null, 'When does a contractor or event planner actually use Jersey barricades?'),
    h(
      'p',
      null,
      'Five common use cases dominate Jersey barricade rentals. First, event perimeters — concerts, festivals, parades — where ',
      h('a', { href: '/product/urbanite-water-filled-pedestrian-barricade' }, 'water-filled pedestrian barricades'),
      ' provide visible perimeter control without crashworthy containment. Second, parking-lot lane control — drive-thru lanes, vaccine clinics, voting precincts — where plastic Jerseys delineate flow at sub-25 mph speeds. Third, short-duration low-speed work zones — utility patches, paving, water-line repairs — where TL-2 plastic Jerseys provide both delineation and modest containment. Fourth, full-time highway work zones — bridge replacements, lane reconstructions — where MASH TL-3 concrete Jerseys are the contract requirement. Fifth, security perimeters — event entrances, government buildings, anti-vehicle approaches — where concrete or specialized anti-ram Jerseys serve dual safety/security duty.',
    ),
    h(
      'p',
      null,
      'For mid-speed work (35–55 mph) the call is judgment. The state DOT temporary traffic control plan will specify positive protection (concrete or steel) when the speed and the worker exposure together require it. For everything else, plastic Jerseys earn their place by speed of installation and removal.',
    ),

    h('h2', null, 'What MUTCD and MASH standards apply to Jersey barricades?'),
    h(
      'p',
      null,
      'Concrete Jersey barriers as longitudinal barrier are governed by AASHTO\'s Manual for Assessing Safety Hardware (MASH). The federal eligibility list for barriers is maintained by the ',
      h(
        'a',
        {
          href: 'https://highways.dot.gov/safety/other/roadside-departure/roadside-hardware',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        'FHWA Office of Safety roadside hardware program',
      ),
      ', which tracks the federal handoff from NCHRP 350 to MASH. TL-3 (~62 mph) is the highway-class minimum; TL-4 adds a heavy-truck impact and is required by some state DOTs on Interstate work.',
    ),
    h(
      'p',
      null,
      'Plastic water-filled Jerseys are typically MASH TL-2 (~45 mph) when properly filled and connected, with some exceptions at TL-3 for specific reinforced models. Unfilled or non-crashworthy plastic Jerseys serve as longitudinal channelizing devices (LCDs) under MUTCD §6F.74 and are not approved for positive protection. MUTCD §6F.85 covers temporary traffic barriers as a device class, including delineation and end-treatment requirements — every barrier run needs an approved end treatment (anchored attenuator or tapered length-of-need), regardless of material.',
    ),

    h('h2', null, 'How do I size a Jersey barricade run?'),
    h(
      'p',
      null,
      'Three numbers drive the run length. First, the activity-area length — how far the work or event area actually extends. Second, the upstream taper, set by MUTCD Table 6C-3 to the operating speed (50:1 ratio at 45 mph and above; shorter at lower speeds). Third, the downstream end treatment, typically 50–100 feet for an attenuator on a work zone or a tapered termination on an event perimeter.',
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
            h('th', null, 'Jersey Type'),
            h('th', null, 'Total Length Per Side'),
            h('th', null, 'Segment Count'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', null, '500 ft event perimeter'),
            h('td', null, 'Plastic, 6 ft'),
            h('td', null, '500 ft'),
            h('td', null, '~84'),
          ),
          h(
            'tr',
            null,
            h('td', null, '1,000 ft parking lot lane'),
            h('td', null, 'Plastic, 6 ft'),
            h('td', null, '1,000 ft'),
            h('td', null, '~167'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Highway 1,500 ft activity area at 65 mph'),
            h('td', null, 'Concrete, 10 ft'),
            h('td', null, '~2,200 ft (with taper + end treatment)'),
            h('td', null, '~220 per side'),
          ),
        ),
      ),
    ),

    h('h2', null, 'How much does it cost to rent Jersey barricades?'),
    h(
      'p',
      null,
      'Rental rates in 2026 vary by material, run length, and delivery distance. Plastic water-filled Jerseys typically run $8–$15 per linear foot per week, with a one-time fill/empty fee of $200–$400 and a delivery charge. Concrete Jersey barrier runs $15–$30 per linear foot per week plus a per-segment crane and trucking charge of $50–$100 each way, often negotiated to a flat-rate transport on long runs. The per-pound trucking economics drive the total cost on big concrete runs more than the rental rate itself; concrete is cheap to rent and expensive to mobilize and demobilize.',
    ),
    h(
      'p',
      null,
      'Beyond the linear-foot rate, the cost drivers worth asking about up front are end treatments (an attenuator can add $1,500–$3,000 per end on a contractor job), trucking, and on-site crane time. For events, the line items are usually delivery, set, removal, and pickup — bundled into a flat per-foot or per-linear-foot rate. For contractor work, expect itemized quoting so the contract drawings can be matched line-by-line.',
    ),

    h('h2', null, 'How do I rent Jersey barricades?'),
    h(
      'p',
      null,
      'Send the quote with the Jersey type (plastic vs concrete), run length in linear feet, segment length preference, location speed (or "event, no traffic" if applicable), expected duration, delivery address, and any state DOT plan or event-permit reference. The rental coordinator can match material, MASH level, and end-treatment availability, and schedule trucking. Lead time on plastic water-filled Jerseys runs 24–72 hours in major metros. Concrete Jersey barrier runs 1–2 weeks because the trucking pool is smaller and 10-foot or 20-foot segments queue at the yard. Plan early on big runs.',
    ),

    h(
      'p',
      null,
      h('a', { href: '/quote', className: 'cta-inline' }, 'Quote Jersey barricades'),
      ' — share the linear feet, material preference, and dates, and we will confirm material, MASH level, and trucking within the hour.',
    ),
  ),

  faqs: [
    {
      q: 'Are Jersey barricades and Jersey barriers the same thing?',
      a: 'In casual use, yes — both refer to the J-shape longitudinal device that originated on New Jersey highways. In formal engineering language, "Jersey barrier" usually refers to the concrete profile, while "Jersey barricade" or "plastic Jersey" refers to the water-fillable plastic version. The shape is the same; the material and crashworthiness rating differ.',
    },
    {
      q: 'Are plastic Jersey barricades crashworthy at highway speeds?',
      a: 'Generally no. Plastic water-filled Jerseys are typically MASH TL-2 (≤45 mph) when properly filled and connected. Some specialized reinforced models carry TL-3 letters, but most plastic Jerseys on event and parking-lot rentals are not rated for highway-speed impact. For work zones above 45 mph, the contract spec will require concrete or steel.',
    },
    {
      q: 'Can I use Jersey barricades for an event without a road permit?',
      a: 'For events held entirely on private property — parking lots, festival grounds, stadium perimeters — no road permit is needed for the barricades themselves, though the event itself usually has a separate permit. For events that cross or use public roadway (parades, street festivals), the local public-works or DOT department issues a traffic control permit that specifies the device requirements.',
    },
    {
      q: 'What is the difference between a Jersey barrier and an F-shape barrier?',
      a: 'Both are 32-inch concrete longitudinal barriers, but the F-shape has a slightly different sloped profile that performs better in subsequent crash tests, particularly with smaller passenger vehicles. Most modern concrete barrier rentals are F-shape under the FHWA acceptance program, even when called "Jersey" colloquially. The 42-inch tall single-slope and TL-4 versions are separate categories built for truck impacts.',
    },
    {
      q: 'How do you connect Jersey barricade segments?',
      a: 'Concrete Jersey segments connect with steel pin-and-loop or pin-and-eye assemblies cast into the segment ends. Plastic Jerseys use molded interlocking lugs or steel pin connectors. Continuous connection across the full run is required for the MASH rating to apply — disconnected segments behave like discrete barricades, not a barrier system.',
    },
    {
      q: 'Are anti-vehicle Jersey barriers for security different from work-zone Jerseys?',
      a: 'Yes. Anti-vehicle (anti-ram) Jersey or wedge-shape barriers used at security perimeters are separately rated under ASTM F2656 vehicle-impact standards (M30, M40, M50), not MASH. The rating describes the speed and weight of the vehicle a barrier stops at the perimeter line. A standard concrete Jersey can be M30-rated with proper anchoring, but most rental Jerseys are MASH-rated work-zone barriers, not security barriers — confirm the rating standard before specifying for a security application.',
    },
    {
      q: 'How long does it take to install 1,000 feet of plastic Jersey barricade?',
      a: 'A two-person crew with a small forklift or hand truck can place and connect 1,000 feet of plastic Jerseys in 4–6 hours, then fill via a fire-hydrant or water-truck connection in another 2–4 hours. Concrete Jersey of the same length takes 6–10 hours with a two-truck two-crane crew. Removal runs about the same on both materials.',
    },
    {
      q: 'Do Jersey barricades need reflective markings?',
      a: 'Yes. MUTCD §6F.85 requires retroreflective delineation on barriers in or adjacent to travel lanes, visible from the approach direction. Most concrete Jerseys arrive with factory-applied yellow reflective tape on the top corners or with delineator-post mounts at intervals. Plastic Jerseys often integrate reflective panels into the cap. Confirm sheeting class meets MUTCD §6F.03 (typically Type IV high-intensity prismatic or higher) before deployment.',
    },
  ],

  relatedProducts: [
    { label: 'Water-Filled Barrier (6 ft)', path: '/product/water-filled-barrier-6ft' },
    { label: 'Urbanite Water-Filled Pedestrian Barricade', path: '/product/urbanite-water-filled-pedestrian-barricade' },
    { label: 'Type III Barricade', path: '/product/type-iii-barricade' },
    { label: 'Pedestrian Barricade (Orange EG)', path: '/product/economy-pedestrian-barricade-orange-eg' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
  ],

  relatedArticles: [
    'barricade-rental-near-me-guide',
    'type-iii-barricade-vs-type-i-type-ii',
    'traffic-control-rental-guide',
  ],
}
