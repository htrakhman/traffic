import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic controller sign" (50/mo, CI=10, score=5.00).
 * Tactical article — interpreting the search as the W21-7 "Flagger" /
 * "Traffic Controller" warning sign per MUTCD §6F.55, plus adjacent W-series
 * signs that warn motorists of an upcoming traffic-control person.
 */
export const articleTrafficControllerSignMutcd: Article = {
  slug: 'traffic-controller-sign-mutcd',
  title: 'Traffic Controller Sign (Flagger Ahead): MUTCD Specs and Placement',
  excerpt:
    'The "Traffic Controller" or "Flagger" sign — MUTCD W21-7 — warns motorists of an upcoming flagger station. Here are the specs, the placement distances, and the rules for using a roll-up version on a work zone.',
  metaDescription:
    'Traffic controller sign (W21-7) explained: MUTCD §6F.55 specs, placement distances by speed, rigid vs. roll-up versions, and when each one is required on a work zone.',
  primaryKeyword: 'traffic controller sign',
  secondaryKeywords: [
    'flagger ahead sign',
    'W21-7 sign',
    'MUTCD W21-7',
    'flagger symbol sign',
    'flagger sign placement',
    'traffic control person sign',
    'roll-up flagger sign',
  ],
  targetVolume: 50,
  datePublished: '2026-04-27',
  dateModified: '2026-04-28',
  readMinutes: 6,
  body: h(
    Fragment,
    null,

    h(
      'p',
      { className: 'lead' },
      'A "traffic controller" sign is the MUTCD W21-7 warning sign — a diamond-shaped orange sign showing a symbolic flagger holding a STOP/SLOW paddle, used in advance of any active flagger station in a work zone. The sign tells approaching motorists that a person on foot will be directing traffic ahead and to be ready to stop. MUTCD §6F.55 governs the symbol, the size, and the placement distance, which scales with the posted speed. The same sign is sometimes labeled "FLAGGER" in legend form (W20-7a in older editions and some state supplements), but the symbol version is the federal default in the current edition.',
    ),

    h('h2', null, 'What does the W21-7 traffic controller sign actually look like?'),
    h(
      'p',
      null,
      'The W21-7 is a 48" × 48" diamond on rigid signs (with a 36" × 36" minimum on local low-speed roads and a 60" × 60" highway version on Interstates), orange background with a black symbolic figure. The figure is a worker in profile, knees flexed, holding a STOP/SLOW paddle out at shoulder height. There is no text on the sign — the symbol is the message — which is why it works across language groups and at higher reading speeds than a legend sign. The retroreflectivity grade must meet MUTCD §6F.03 minimums, typically Type IV high-intensity prismatic or higher.',
    ),
    h(
      'p',
      null,
      'A roll-up version is acceptable for short-duration and short-term work and is what most contractors actually deploy. Roll-ups use a fluorescent orange vinyl substrate with the symbol screen-printed in black; the substrate flexes onto a spring-frame stand (X-stand or telescoping pole) and meets the same retroreflectivity requirement when ordered in the right grade. Confirm the sheeting class on the rental invoice — a Type I or II roll-up is not MUTCD-compliant on a state highway.',
    ),

    h('h2', null, 'Where exactly does the sign go on a work zone?'),
    h(
      'p',
      null,
      'The W21-7 sits in the advance warning area, upstream of the flagger station, at a distance set by MUTCD Table 6C-1 to the posted operating speed. On a 25–30 mph road, the sign goes 100–150 feet upstream of the flagger. On a 40–45 mph road, 250–500 feet. On a 55–65 mph road, 500–1,000 feet — and on a high-speed approach, the W21-7 is paired with a W20-1 ROAD WORK AHEAD sign farther upstream so the motorist sees a sequence of warnings. The taper into the closure begins after the W21-7, not before.',
    ),
    h(
      'p',
      null,
      'On long flagger control points (single-lane two-way operations more than 1,000 feet from end to end), W21-7 signs are placed at both approaches because a flagger is stationed at each end. Pair each W21-7 with the appropriate companion sign — W20-1 ROAD WORK AHEAD upstream of W21-7, and the regulatory R1-1 STOP if the flagger holds a STOP paddle for any extended interval (most don\'t, but some state specs require it).',
    ),

    h('h2', null, 'What MUTCD and OSHA standards govern the traffic controller sign?'),
    h(
      'p',
      null,
      'The W21-7 sign itself is defined in MUTCD §6F.55 (Flagger Symbol Sign), with size and placement rules in §6F.03 (Sign Sizes) and §6C.04 (Advance Warning Sign Placement). The flagger function the sign warns about is governed by MUTCD §6E (Flagger Control). OSHA 1926.201 is the federal occupational standard for flagger duties — high-visibility apparel, signaling devices, training, and protection. The federal sign and pavement-marking specs are published online by the FHWA Office of Operations through the ',
      h(
        'a',
        {
          href: 'https://mutcd.fhwa.dot.gov/',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        'MUTCD Knowledge Center',
      ),
      ', which also tracks Edition adoption status and official interpretations by state.',
    ),
    h(
      'p',
      null,
      'State MUTCD supplements (the California MUTCD, the New Jersey MUTCD, the Texas MUTCD, and others) sometimes adjust the placement table or add state-specific companion signs, but the W21-7 symbol and color are federally fixed.',
    ),

    h('h2', null, 'How many traffic controller signs do I need?'),
    h(
      'p',
      null,
      'For a single-direction flagger station, count two: one W21-7 in the advance warning area and one W20-1 ROAD WORK AHEAD farther upstream. For a two-direction single-lane closure with flaggers at each end, count four — two W21-7 and two W20-1, one pair per approach. Add an additional W20-1 if the upstream sight distance is short or the road has a high crash history. For night work on roads with operating speeds above 45 mph, double the W21-7 with a flashing warning light per MUTCD §6F.81 mounted to the sign stand or a nearby Type B warning light.',
    ),
    h(
      'p',
      null,
      'A small utility job on a residential street might use only one W21-7 in each direction. A multi-day paving operation on a state route will use the W21-7 in a sign sequence that includes ROAD WORK AHEAD, FLAGGER, and BE PREPARED TO STOP, with each spaced per the §6C.04 table.',
    ),

    h('h2', null, 'How do I rent a traffic controller sign?'),
    h(
      'p',
      null,
      'Most rental signs ship as roll-up panels with X-stand or telescoping bases, sized 48" × 48" by default. Specify the sheeting grade (Type IV or higher for state highway work), quantity, and rental duration. Lead time in major metros is 24–48 hours for standard signs. For long-duration deployments (more than 30 days), rigid signs on hardened stands often pencil out cheaper than roll-ups because the roll-up substrate degrades under continuous UV exposure.',
    ),

    h(
      'p',
      null,
      h('a', { href: '/quote', className: 'cta-inline' }, 'Quote a flagger / W21-7 sign package'),
      ' — share the road speed and approach configuration, and we will line up the right sign sequence and stands.',
    ),
  ),

  faqs: [
    {
      q: 'Is the "traffic controller" sign the same as the "flagger" sign?',
      a: 'In current MUTCD usage, yes — both refer to the W21-7 Flagger Symbol Sign, the diamond-shaped orange sign with the symbolic figure holding a STOP/SLOW paddle. Older editions and some state MUTCDs label the same function "Traffic Controller" or "Flagger Ahead," but the federal symbol is identical.',
    },
    {
      q: 'How far upstream of the flagger does the W21-7 go?',
      a: 'Distance scales with operating speed per MUTCD Table 6C-1. Roughly: 100–150 ft at 25–30 mph, 250–500 ft at 40–45 mph, 500–1,000 ft at 55–65 mph. On high-speed roads the W21-7 is part of a sequence with an upstream W20-1 ROAD WORK AHEAD; the spacing between signs in the sequence is set by §6C.04.',
    },
    {
      q: 'Can I use a roll-up traffic controller sign on a state highway?',
      a: 'Yes, provided the sheeting meets MUTCD §6F.03 retroreflectivity (typically Type IV or higher) and the support is rated for the design wind load. Many state DOTs accept roll-ups on roll-up-rated stands for short-duration and short-term operations. Check the state spec for any restriction on roll-up use during overnight or extended deployments.',
    },
    {
      q: 'Does the W21-7 need a flashing warning light?',
      a: 'Required only when nighttime visibility or sight distance demands it. MUTCD §6F.81 covers warning lights — Type A (low-intensity flashing), Type B (high-intensity flashing), Type C (steady-burn). Type B lights are commonly mounted on the W21-7 stand on roads above 45 mph at night or in poor weather; Type A on lower-speed work.',
    },
    {
      q: 'Can the flagger station be set up without the W21-7 sign?',
      a: 'No. The flagger station is part of a regulated MUTCD Part 6 device sequence. Skipping the W21-7 fails the temporary traffic control plan and exposes the contractor on inspection and on liability. The sign is what gives the motorist the cue to be ready to stop; without it the flagger is a surprise.',
    },
    {
      q: 'Is a W21-7 sign required during daylight on a low-speed residential road?',
      a: 'Yes, whenever a flagger is actively controlling traffic. Speed and time of day affect the placement distance and the need for accompanying lights, but the sign itself is required for any active flagger station, daylight or otherwise, on any road open to public travel.',
    },
    {
      q: 'How long does a roll-up flagger sign last in continuous use?',
      a: 'Most retroreflective vinyl substrates carry a 1–3 year warranty under continuous outdoor exposure, but typical work-zone roll-ups see noticeable retroreflectivity loss after 12–18 months of continuous deployment. For long-duration projects, rotate roll-ups every six months or specify rigid aluminum signs with prismatic sheeting.',
    },
  ],

  relatedProducts: [
    { label: 'Roll-Up "Flagger Ahead" Sign', path: '/product/roll-up-flagger-ahead' },
    { label: 'Roll-Up "Road Work Ahead" Sign', path: '/product/roll-up-road-work-ahead' },
    { label: 'Telescoping Sign Stand', path: '/product/telescoping-sign-stand' },
    { label: 'Type B Flashing Warning Light', path: '/product/type-b-flashing-warning-light' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
  ],

  relatedArticles: [
    'uniform-traffic-control-devices-mutcd-guide',
    'automated-flagger-assistance-device-afad-guide',
    'traffic-control-devices-guide',
  ],
}
