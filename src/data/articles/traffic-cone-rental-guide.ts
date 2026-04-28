import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Article 9 — Targets "portable traffic cones" (500/mo, CI=18, score=27.8)
 * Secondary: "traffic cone rental", "traffic control cones", "28 inch traffic cones",
 *            "36 inch traffic cones", "cone spacing work zone", "MUTCD cone requirements",
 *            "cone rental near me"
 */
export const articleTrafficConeRentalGuide: Article = {
  slug: 'traffic-cone-rental-guide',
  title: 'Traffic Cone Rental: 28" vs. 36", Spacing Tables, and MUTCD Requirements',
  excerpt:
    'How to choose the right cone height, how many you need for a lane closure, and what MUTCD Part 6 requires for spacing by road speed.',
  metaDescription:
    'Rent portable traffic cones: 28" vs. 36" MUTCD requirements, cone spacing tables by speed limit, reflectivity rules, and daily rates. Get a quote in minutes.',
  primaryKeyword: 'portable traffic cones',
  secondaryKeywords: [
    'traffic cone rental',
    'traffic control cones',
    '28 inch traffic cones',
    '36 inch traffic cones',
    'cone spacing work zone',
    'MUTCD cone requirements',
    'cone rental near me',
  ],
  targetVolume: 500,
  datePublished: '2026-04-24',
  dateModified: '2026-04-28',
  readMinutes: 7,
  body: h(
    Fragment,
    null,

    h(
      'p',
      { className: 'lead' },
      'Portable traffic cones are the most-deployed channelizing device in MUTCD Part 6 work zones. They define tapers, buffer edges, and lane boundaries from small utility cuts to full interstate closures. Height selection and spacing are governed by road speed — get either wrong and your traffic control plan will fail a DOT review.',
    ),

    h('h2', null, 'When are portable traffic cones required?'),
    h(
      'p',
      null,
      'MUTCD Part 6 requires channelizing devices wherever work activity encroaches on a travel lane, shoulder, or pedestrian path. Cones are the standard choice for short-term and short-duration operations — typically closures lasting minutes to one shift. For multi-day operations above 45 mph, drums or vertical panels replace cones as the primary channelizer because of their greater height, weight, and retroreflective area.',
    ),
    h(
      'p',
      null,
      'The general channelizing device requirements, including minimum heights, retroreflectivity levels, and crashworthiness standards, are specified in ',
      h(
        'a',
        { href: 'https://mutcd.fhwa.dot.gov/', target: '_blank', rel: 'noopener noreferrer' },
        'MUTCD Chapter 6F',
      ),
      '. State DOT supplements may add requirements above the federal minimum — confirm your state\'s TCD list before finalizing a traffic control plan.',
    ),

    h('h2', null, 'What is the difference between 28-inch and 36-inch traffic cones?'),
    h(
      'p',
      null,
      'MUTCD Section 6F.64 sets two minimum cone heights based on posted speed limit. A 28-inch cone meets federal minimums for roads with speed limits at or below 45 mph. A 36-inch cone is required on roads with speed limits above 45 mph — including most arterials and highways. The taller cone provides a larger retroreflective target visible at highway approach speeds.',
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
            h('th', null, 'Cone Height'),
            h('th', null, 'Minimum Weight'),
            h('th', null, 'Speed Limit Range'),
            h('th', null, 'Retroreflective Collars'),
            h('th', null, 'Typical Use'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', null, '28"'),
            h('td', null, '7 lb'),
            h('td', null, '≤ 45 mph'),
            h('td', null, 'Optional (required at night)'),
            h('td', null, 'Urban streets, parking lots, low-speed tapers'),
          ),
          h(
            'tr',
            null,
            h('td', null, '36"'),
            h('td', null, '10 lb'),
            h('td', null, '> 45 mph'),
            h('td', null, 'Required (6" + 4" bands)'),
            h('td', null, 'Arterials, highways, high-speed lane closures'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Both sizes must meet NCHRP 350 or MASH crashworthiness standards for use on federally funded roads. If a cone is struck, it must fold or collapse rather than become a secondary projectile.',
    ),

    h('h2', null, 'How many traffic cones do I need for a lane closure?'),
    h(
      'p',
      null,
      'The count depends on closure length, taper length, and spacing interval. MUTCD Table 6C-2 sets the suggested maximum device spacing for channelizing zones. In the taper, spacing tightens to one device per 20 ft regardless of speed. In the tangent channelizing zone (the straight run alongside the work area), maximum spacing equals the posted speed in feet — 45 mph means no more than 45 ft between cones.',
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
            h('th', null, 'Posted Speed'),
            h('th', null, 'Taper Spacing (max)'),
            h('th', null, 'Tangent Zone Spacing (max)'),
            h('th', null, 'Cones for 500 ft Closure (est.)'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', null, '25 mph'),
            h('td', null, '20 ft'),
            h('td', null, '25 ft'),
            h('td', null, '25–30'),
          ),
          h(
            'tr',
            null,
            h('td', null, '35 mph'),
            h('td', null, '20 ft'),
            h('td', null, '35 ft'),
            h('td', null, '20–25'),
          ),
          h(
            'tr',
            null,
            h('td', null, '45 mph'),
            h('td', null, '20 ft'),
            h('td', null, '45 ft'),
            h('td', null, '18–22'),
          ),
          h(
            'tr',
            null,
            h('td', null, '55 mph'),
            h('td', null, '20 ft'),
            h('td', null, '55 ft'),
            h('td', null, '15–20'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'These estimates cover the channelizing zone only. Add cones for the advance warning taper, buffer space upstream of the work area, and any downstream taper where traffic re-enters the lane. A typical single-lane closure on a 45 mph urban arterial will need 30–50 cones total.',
    ),

    h('h2', null, 'Do traffic cones need to be reflective?'),
    h(
      'p',
      null,
      'Retroreflective collars are required on cones used in low-visibility conditions: night operations, dawn/dusk, fog, and rain. For 28-inch cones, the MUTCD requires at least one 6-inch retroreflective band near the top. For 36-inch cones, two bands — one 6-inch and one 4-inch — are required. Day-only, clear-weather operations on low-volume roads may use bare cones, but standard practice among contractors is to always rent cones with reflective collars to eliminate the question if conditions change mid-shift.',
    ),

    h('h2', null, 'How much does it cost to rent traffic cones?'),
    h(
      'p',
      null,
      'Rental rates for 28-inch cones typically fall in the $1.50–$3.00/day range per cone, or $8–$15/week. Rates for 36-inch reflective cones run $2.50–$4.00/day or $12–$20/week. Volume discounts are common: a 50-cone package will run less per unit than a 10-cone order. Most rental quotes include delivery, pickup, and loss/damage provisions — confirm what happens if a cone is damaged or stolen on site. For a standard 30-cone package on a one-week job, budget $300–$600 total.',
    ),

    h('h2', null, 'When should I use drums instead of cones?'),
    h(
      'p',
      null,
      'Channelizing drums (typically 36–45 inches tall, 20–40 lb) replace cones when the job runs longer than one shift, speed exceeds 55 mph, or wind is an ongoing factor. Drums are heavier, more visible, and harder to knock over. The tradeoff is storage and transport: a pallet of 100 cones takes up far less space than 100 drums. Use cones for short-term utility work, small utility cuts, and parking-area closures. Use drums for overnight multi-day highway work and wherever a rollover cone would create a secondary hazard.',
    ),

    h('h2', null, 'How do I rent portable traffic cones?'),
    h(
      'p',
      null,
      'Request a quote specifying cone height (28" or 36"), reflective collar requirement (yes/no), quantity, rental duration, and delivery address. Turnaround is typically same-day or next-day for standard orders. For large orders (100+ cones) or remote sites, plan 2–3 business days. Include your traffic control plan or job description so the rental company can confirm the package is sized correctly for your closure.',
    ),

    h(
      'p',
      null,
      h('a', { href: '/quote', className: 'cta-inline' }, 'Request a cone rental quote'),
      ' — specify height, quantity, and dates and we will confirm availability within the hour.',
    ),
  ),

  faqs: [
    {
      q: 'Can 28-inch traffic cones be used on a 55 mph highway?',
      a: 'No. MUTCD Section 6F.64 requires a minimum 36-inch cone on roads with speed limits above 45 mph. Using undersized cones on a highway will fail a DOT inspection and creates liability if a crash occurs.',
    },
    {
      q: 'Are rental traffic cones MASH or NCHRP 350 crash-tested?',
      a: 'Yes — all cones on federally funded roads must be NCHRP 350 or AASHTO MASH accepted. Our 28-inch and 36-inch cones are crash-tested and meet both standards. Check the FHWA roadside hardware acceptance list if you need to verify a specific model for a state DOT plan.',
    },
    {
      q: 'How far apart do I place cones in the taper?',
      a: 'MUTCD Table 6C-2 recommends a maximum of 20 feet between channelizing devices in the taper, regardless of speed. Closer spacing is always acceptable and improves driver compliance. In the straight channelizing zone after the taper, maximum spacing equals the posted speed in feet (e.g., 45 mph = 45 ft apart).',
    },
    {
      q: 'What cone spacing is required at night?',
      a: 'Night spacing follows the same MUTCD Table 6C-2 rules as daytime — the critical change at night is retroreflectivity, not spacing. All cones must have compliant reflective collars. Some state DOT supplements do require tighter spacing on nighttime high-speed closures; check your state standard.',
    },
    {
      q: 'Do I need a permit to set up traffic cones on a public road?',
      a: 'Typically yes. Most municipalities require a traffic control permit and an approved traffic control plan before you place any devices on a public road. The permit process varies by jurisdiction — from a simple online form to a full engineering review. Contact your local public works or transportation department before work begins.',
    },
    {
      q: 'Can wind blow over traffic cones? What should I use instead?',
      a: 'Standard 28-inch cones are light enough (7 lb) to tip in sustained winds above 25–30 mph. Options: switch to 36-inch 10 lb cones (more stable), use channelizing drums (heavier base), or anchor cones with weighted base rings. If wind is a consistent hazard, drums are the standard substitute.',
    },
    {
      q: 'How many cones come on a rental pallet?',
      a: 'Pallets typically stack 50–100 cones depending on height. A standard pallet of 28-inch cones holds 100 units; 36-inch cones stack fewer — usually 50–75 per pallet. Confirm pallet configuration when ordering if you are coordinating truck access on a constrained job site.',
    },
    {
      q: 'What is the difference between a traffic cone and a channelizing drum?',
      a: 'Cones are 28–36 inches tall, 7–12 lb, and appropriate for speeds up to 45 mph on short-term work. Drums are 36–45 inches tall, 20–40 lb, and preferred for multi-day work and speeds up to 65 mph. Drums have a larger retroreflective band area and are harder to knock over. Both are MUTCD channelizing devices; the job speed and duration drive which is appropriate.',
    },
  ],

  relatedProducts: [
    { label: '28" Traffic Cone Rental', path: '/product/28-inch-traffic-cone' },
    { label: '36" Reflective Traffic Cone Rental', path: '/product/36-inch-traffic-cone' },
    { label: 'Channelizing Drum Rental', path: '/product/channelizing-drum' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
  ],

  relatedArticles: [
    'traffic-control-equipment-rental',
    'traffic-control-rental-guide',
    'traffic-control-devices-guide',
  ],
}
