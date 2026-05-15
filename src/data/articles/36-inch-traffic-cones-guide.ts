import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "36 inch traffic cones" (500/mo, High comp, $14.35 bid) plus
 * "36 traffic cones", "36 safety cones", and "huge traffic cone" cluster.
 * Pillar buying guide for the largest standard MUTCD cone — the high-speed
 * and nighttime default.
 */
export const article36InchTrafficConesGuide: Article = {
  slug: '36-inch-traffic-cones-guide',
  title: '36 Inch Traffic Cones: When You Need Them, What They Cost, and How to Buy',
  excerpt:
    '36-inch cones are the MUTCD default for high-speed and nighttime work zones. Here is when the spec actually requires them, the price ranges to expect, and what to look for in a working set.',
  metaDescription:
    '36 inch traffic cones are MUTCD-required for freeways, expressways, and any nighttime work above 45 mph. Full sizing rules, prices ($30–$70 each), and buying guide.',
  primaryKeyword: '36 inch traffic cones',
  secondaryKeywords: [
    '36 traffic cones',
    '36 safety cones',
    '36 inch safety cones',
    'huge traffic cone',
    'tall cones',
    'big traffic cones',
    'heavy duty traffic cones',
  ],
  targetVolume: 500,
  datePublished: '2026-05-15',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      '36-inch traffic cones are the largest standard MUTCD cone size, and they are the ',
      h('strong', null, 'required minimum on freeways, expressways, and any work zone where posted speeds exceed 45 mph or work happens at night above 45 mph'),
      '. They are also the cone you reach for when wind, large vehicles, or low light would walk a 28-inch cone out of position. Below: the size-by-speed rule, real price ranges from a Central NJ supplier, and what specs actually matter when you are buying a working set.',
    ),

    h('h2', null, 'When MUTCD requires a 36-inch cone'),
    h(
      'p',
      null,
      'MUTCD Part 6 (Section 6F.64 in the 11th edition) sets minimum cone heights by speed and by time of day. The thresholds that push you up to 36-inch:',
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
            h('th', { className: 'text-left p-2 border-b' }, 'Condition'),
            h('th', { className: 'text-left p-2 border-b' }, 'Minimum cone height'),
            h('th', { className: 'text-left p-2 border-b' }, '36-inch needed?'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Daytime, ≤ 25 mph posted'), h('td', { className: 'p-2' }, '18 in'), h('td', { className: 'p-2' }, 'No')),
          h('tr', null, h('td', { className: 'p-2' }, 'Daytime, 26–45 mph'), h('td', { className: 'p-2' }, '28 in'), h('td', { className: 'p-2' }, 'Recommended, not required')),
          h('tr', null, h('td', { className: 'p-2' }, 'Daytime, > 45 mph'), h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, 'Yes')),
          h('tr', null, h('td', { className: 'p-2' }, 'Nighttime, ≤ 45 mph'), h('td', { className: 'p-2' }, '28 in'), h('td', { className: 'p-2' }, 'Recommended for visibility')),
          h('tr', null, h('td', { className: 'p-2' }, 'Nighttime, > 45 mph'), h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, 'Yes')),
          h('tr', null, h('td', { className: 'p-2' }, 'Freeway / Interstate (any time)'), h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, 'Yes')),
          h('tr', null, h('td', { className: 'p-2' }, 'Long-duration work zone, any speed'), h('td', { className: 'p-2' }, '36 in or drum (28-inch min)'), h('td', { className: 'p-2' }, 'Drums often substitute')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'NJDOT generally aligns with the federal MUTCD on cone height, with one practical addition: many NJDOT short-duration permits explicitly call for 36-inch cones on any state highway with a posted limit of 45 mph or higher, regardless of whether the work is day or night. If you are pulling an NJDOT permit, read the cone-size line in the permit before you load the truck. For the full sizing reference, see our ',
      h('a', { href: '/blog/road-cones-vs-traffic-cones' }, 'road cones vs. traffic cones guide'),
      ' or the ',
      h('a', { href: '/blog/mutcd-taper-length-formula-nj' }, 'MUTCD taper length formula'),
      ' for the matching layout math.',
    ),

    h('h2', null, 'Why 36-inch (and not just two stacked 18-inch)'),
    h(
      'p',
      null,
      'Three reasons MUTCD treats the 36-inch as a different device, not just a taller version of the 28-inch:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Driver perception distance. '), 'A 36-inch cone is recognized as a traffic-control device at roughly 800 ft in daylight by a driver doing 65 mph. A 28-inch cone is recognized at about 550 ft. That extra 250 ft is roughly 2.6 seconds of stopping/decision time at highway speed.'),
      h('li', null, h('strong', null, 'Reflective collar geometry. '), 'A 36-inch cone fits two 6-inch reflective collars with a 4-inch gap between them. A 28-inch cone fits a 6-inch collar plus a 4-inch collar. The double 6-inch arrangement returns substantially more retroreflected light at headlight distances of 300+ ft.'),
      h('li', null, h('strong', null, 'Wind and wake stability. '), 'A 36-inch cone with a 10–12 lb base resists the wake from a tractor-trailer in the adjacent lane. A 28-inch cone with a 7-lb base will skip 2–4 ft per pass on a busy interstate, which is how cones end up under traffic in the live lane.'),
    ),

    h('h2', null, 'Specs to look for in a 36-inch cone'),
    h('h3', null, 'PVC body and color'),
    h(
      'p',
      null,
      'Standard 36-inch cones use a one-piece UV-stable PVC body in fluorescent orange (sometimes called "OSHA orange" or "highway orange"). Pay the small premium for UV-stable PVC — non-UV PVC fades visibly within one summer of full-sun exposure, and a faded cone reads as discount equipment to inspectors. Fluorescent pink is available for incident response and emergency-management use; it is not a substitute for orange on a routine work zone.',
    ),
    h('h3', null, 'Base weight and material'),
    h(
      'p',
      null,
      'For 36-inch cones, base weight is the spec line that does the most work for you. Standard options:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '10 lb rubber base — '), 'minimum recommended for any roadway use. Holds against modest wind and the wake of normal traffic.'),
      h('li', null, h('strong', null, '12 lb rubber base — '), 'the contractor default for interstate and high-speed state-highway work. Holds against tractor-trailer wake at 65 mph.'),
      h('li', null, h('strong', null, '15–18 lb rubber base — '), 'specified for windy bridge decks, coastal corridors, and any spot where you have lost cones to wind on a previous job.'),
    ),
    h(
      'p',
      null,
      'A recycled-rubber base survives 5+ years of being driven over by passenger vehicles. Soft PVC bases crack on the first impact and have no place on a 36-inch cone — anyone selling you a 36-inch cone with a soft PVC base is selling you a parking-lot cone with a roadway price tag.',
    ),
    h('h3', null, 'Reflective collars'),
    h(
      'p',
      null,
      'MUTCD requires two reflective collars on any cone used at night on a roadway: a 6-inch collar near the top, then a 4-inch gap, then a 4-inch collar below it. For 36-inch cones, the standard is upgraded — both collars run 6 inches, separated by 4 inches of orange PVC. The sheeting must be high-intensity prismatic (HIP) or diamond-grade; engineering-grade does not meet the visibility threshold at 36-inch distances. If the price seems low for a 36-inch cone, the sheeting grade is usually where the supplier saved money. Ask explicitly.',
    ),
    h('h3', null, 'Stack-friendly geometry and storage'),
    h(
      'p',
      null,
      'A 36-inch cone with a 12-lb base stacks 6–8 high before the stack becomes unstable on a moving truck. Plan storage and transport around stacks of 6. A pallet of 36 cones (six stacks of six) takes a 48 x 40 standard pallet footprint and stands about 8 ft tall — measure your truck-bed clearance before ordering bulk.',
    ),

    h('h2', null, 'Price ranges for 36-inch cones'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Spec'), h('th', { className: 'text-left p-2 border-b' }, 'Per-cone'), h('th', { className: 'text-left p-2 border-b' }, 'Bulk (24+)')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Standard 36-inch, 10-lb rubber base, double HIP collar'), h('td', { className: 'p-2' }, '$32–$45'), h('td', { className: 'p-2' }, '$26–$36')),
          h('tr', null, h('td', { className: 'p-2' }, 'Heavy-duty 36-inch, 12-lb base, double HIP collar'), h('td', { className: 'p-2' }, '$42–$58'), h('td', { className: 'p-2' }, '$34–$48')),
          h('tr', null, h('td', { className: 'p-2' }, 'Premium 36-inch, 15–18-lb base, diamond-grade collars'), h('td', { className: 'p-2' }, '$55–$75'), h('td', { className: 'p-2' }, '$45–$62')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'A typical NJ road-construction contractor outfits a 36-inch working set of 24 cones for $800–$1,200. A larger operation running multiple crews on interstate work usually keeps 60–100 36-inch cones in rotation, which runs $2,500–$5,500 to set up.',
    ),

    h('h2', null, 'How many 36-inch cones do I need?'),
    h(
      'p',
      null,
      'For interstate and high-speed state-highway work, MUTCD spacing rules tie cone count to taper length and posted speed. Quick reference:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Single-lane closure on a 65 mph interstate: '), '~720 ft of taper at 12 ft offset = 60 cones in the taper at 12 ft spacing, plus 30–40 channelizing the activity area. Plan for ~100 cones minimum.'),
      h('li', null, h('strong', null, 'Single-lane closure on a 55 mph divided highway: '), '~600 ft taper = 50 cones in the taper, plus channelizing. Plan for ~80 cones.'),
      h('li', null, h('strong', null, 'Shoulder closure on a 65 mph interstate: '), 'Typical shoulder closure runs 40–60 cones depending on activity-area length.'),
      h('li', null, h('strong', null, 'Mobile operation (sweeping, striping): '), 'Smaller cone count — 20–40 — but you need full 36-inch spec because you are deploying in live high-speed traffic.'),
    ),
    h(
      'p',
      null,
      'For the exact taper math, our ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'lane closure cone calculator guide'),
      ' walks the formula by speed and offset. Or skip the math and let the ',
      h('a', { href: '/planner' }, 'Site Map Planner'),
      ' generate a layout from your job specs.',
    ),

    h('h2', null, 'Drums vs. 36-inch cones — when to substitute'),
    h(
      'p',
      null,
      'On long-duration closures (more than 3 days, or any closure left unattended overnight), MUTCD prefers traffic drums over 36-inch cones. Drums are better in three ways:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Wider visibility profile (36-inch cones are 14 inches wide at the base; drums are 18 inches).'),
      h('li', null, 'Higher base weight in standard configuration (drums weigh 35–40 lb empty, 60+ lb sand-loaded).'),
      h('li', null, 'Better resistance to displacement from wind and wake.'),
    ),
    h(
      'p',
      null,
      '36-inch cones are still the right call for short-duration work, mobile operations, and any setup that needs to be rapidly deployed and recovered. For long-duration setups, see our ',
      h('a', { href: '/blog/traffic-barrels-buying-guide' }, 'traffic barrels buying guide'),
      ' to compare drums against 36-inch cones for your job.',
    ),

    h('h2', null, 'Care, lifespan, and replacement triggers'),
    h(
      'p',
      null,
      'A 36-inch cone in regular interstate rotation lasts 2–4 years before retirement. Replace any cone that:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Has lost more than 25% of its reflective sheeting (failed an inspection waiting to happen).'),
      h('li', null, 'Shows a body crack that runs more than 4 inches.'),
      h('li', null, 'Has UV-faded to "salmon" or "brick" tones — orange must read as orange to a driver at 800 ft.'),
      h('li', null, 'Has a base separated or cracked at the cone-base joint.'),
    ),
    h(
      'p',
      null,
      'Wash 36-inch cones quarterly with mild detergent and a soft brush. Pressure-washing is fine on the body but will eventually peel the reflective collars — keep the wand 18 inches off the sheeting.',
    ),

    h('h2', null, 'What to buy for a starter set'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'NJDOT permit holder doing periodic interstate work: '), '24× heavy-duty 36-inch with 12-lb base and double HIP collars. Budget ~$1,000–$1,400.'),
      h('li', null, h('strong', null, 'Paving / striping contractor running multiple crews: '), '60× heavy-duty 36-inch, mixed across two trucks. Budget ~$2,500–$3,500.'),
      h('li', null, h('strong', null, 'Utility contractor with occasional high-speed work: '), '12–18× heavy-duty 36-inch as a "high-speed kit" supplementing the 28-inch standard set. Budget ~$500–$900.'),
      h('li', null, h('strong', null, 'Emergency-response / incident-management: '), '24× premium 36-inch with 15-lb bases and diamond-grade sheeting (these go out in the worst conditions). Budget ~$1,300–$1,800.'),
    ),
    h(
      'p',
      null,
      'For Central NJ orders, ',
      h('a', { href: '/category/cones-drums' }, 'browse our cones inventory'),
      ' — same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon. Need help matching cone size to a specific permit or job? ',
      h('a', { href: '/quote' }, 'Get a quote'),
      ' or ask the ',
      h('a', { href: '/assistant' }, 'Assistant'),
      ' which spec your job actually requires.',
    ),
  ),
  faqs: [
    {
      q: 'When are 36 inch traffic cones required by MUTCD?',
      a: 'MUTCD Part 6 requires 36-inch cones on any roadway where the posted speed is greater than 45 mph, on freeways and Interstates regardless of speed, and on any nighttime work above 45 mph. They are recommended (not required) on 26–45 mph daytime work and are commonly used for nighttime work on lower-speed roads for visibility.',
    },
    {
      q: 'How much does a 36 inch traffic cone cost?',
      a: 'Standard 36-inch cones with a 10-lb rubber base and double HIP reflective collars run $32–$45 each at single-cone pricing, dropping to $26–$36 at 24+ bulk. Heavy-duty 12-lb-base cones run $42–$58 each. Premium cones with 15-lb bases and diamond-grade sheeting run $55–$75 each.',
    },
    {
      q: 'How heavy should the base be on a 36 inch cone?',
      a: 'Minimum 10 lb for any roadway use. 12 lb is the contractor standard for interstate and high-speed state-highway work because it resists the wake from passing tractor-trailers. Step up to 15–18 lb for windy bridge decks, coastal corridors, or any spot where you have lost cones to wind in the past.',
    },
    {
      q: 'What is the difference between a 28 inch and 36 inch traffic cone?',
      a: 'Height (28 in vs. 36 in), base weight (typically 7 lb vs. 10–12 lb), and reflective collar configuration (one 6-inch + one 4-inch collar on a 28-inch; two 6-inch collars on a 36-inch). The 36-inch cone is recognized by drivers at roughly 800 ft in daylight versus 550 ft for a 28-inch — about 2.6 extra seconds of decision time at 65 mph.',
    },
    {
      q: 'Can I use 36 inch cones for a long-duration overnight closure?',
      a: 'You can, but MUTCD prefers traffic drums (barrels) for long-duration unattended closures. Drums are wider, heavier, and more resistant to wind displacement. Use 36-inch cones for short-duration, mobile, or rapidly deployed work; switch to drums for closures left in place more than ~3 days or unattended overnight.',
    },
    {
      q: 'Do 36 inch cones need diamond-grade sheeting?',
      a: 'High-intensity prismatic (HIP) sheeting meets MUTCD minimums for 36-inch cones and is the most common spec. Diamond-grade sheeting returns about 2x the retroreflected light at long distances and is worth the upgrade for incident-response use, mobile operations in live high-speed traffic, and any setup where the cone may need to be visible at 1,000+ ft.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Drums & Barrels', path: '/category/cones-drums' },
    { label: 'Site Map Planner', path: '/planner' },
    { label: 'Get a Quote', path: '/quote' },
  ],
  relatedArticles: [
    '28-inch-traffic-cones-guide',
    '18-inch-traffic-cones-guide',
    'how-many-cones-for-lane-closure-nj',
  ],
}
