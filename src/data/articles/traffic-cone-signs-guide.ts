import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic cone signs" / "cone signs" (~500/mo combined, High comp,
 * $18–$19 bid). Definitional pillar — what a cone-mounted sign is, the
 * three mounting formats (sleeve, top-mount, dome), and what to buy.
 */
export const articleTrafficConeSignsGuide: Article = {
  slug: 'traffic-cone-signs-guide',
  title: 'Traffic Cone Signs: Sleeve vs. Top-Mount vs. Dome — What to Buy and When',
  excerpt:
    'Traffic cone signs turn a 28-inch cone into a portable sign stand. Three mounting formats fit different jobs — here is the breakdown of sleeve, top-mount, and dome cone signs, and which to use.',
  metaDescription:
    'Traffic cone signs explained — sleeve, top-mount, and dome formats, MUTCD compliance, sign sizing, wind ratings, and what to buy for portable work-zone signage.',
  primaryKeyword: 'traffic cone signs',
  secondaryKeywords: [
    'cone signs',
    'cone sign topper',
    'cone mounted signs',
    'cone sleeve signs',
    'cone top sign',
    'portable cone signs',
  ],
  targetVolume: 500,
  datePublished: '2026-05-07',
  readMinutes: 6,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h(
        'strong',
        null,
        'Traffic cone signs are sign panels designed to mount onto a standard 28-inch or 36-inch traffic cone, turning the cone into a portable sign stand.',
      ),
      ' They cost less than a tripod sign, deploy in seconds with no separate stand, and stack flat for transport. Three mounting formats compete: sleeve (sign wraps the cone), top-mount (sign clips to cone tip), and dome (rigid sign atop a custom dome cap). This guide covers when each format wins and what to buy.',
    ),

    h('h2', null, 'Why cone signs exist'),
    h(
      'p',
      null,
      'A standard tripod sign-on-stand is a 25–35 lb assembly with three legs, a sign panel, and a flag. It works great for fixed deployments — a 4-hour lane closure where the sign sits in one place. It works less great for the day a striping crew moves a "WET PAINT" sign 80 times across a parking lot. For that job, a 7 lb cone with a 4-lb sign sleeve is a better tool: the crew already deploys cones, and the sign moves wherever the cone moves.',
    ),
    h(
      'p',
      null,
      'Cone signs are also the natural fit for ',
      h('a', { href: '/blog/no-parking-cones-guide' }, 'no-parking and reserved-spot deployments'),
      ', emergency-response staging (police, EMS), and any short-duration job where setup speed matters more than rigidity.',
    ),

    h('h2', null, 'Format 1: cone sleeve signs'),
    h(
      'p',
      null,
      'A sleeve sign is a vinyl, plastic, or fabric panel with a built-in collar that slides down over the cone from the top. Most are double-sided (printed both faces) and held in place by friction against the cone taper. Common sizes: 10 in × 14 in (small) and 12 in × 18 in (standard).',
    ),
    h(
      'p',
      null,
      'Pros: cheapest format ($8–$25 each), takes 3 seconds to deploy, lies flat for storage. Cons: small face area limits text readability, the cone tip pokes through the top so you cannot stack messages, the friction fit can slip in heavy wind.',
    ),
    h(
      'p',
      null,
      'Use a sleeve sign for: NO PARKING placards, RESERVED, WET PAINT, KEEP RIGHT/LEFT, and short messages where the cone is acting as a marker rather than primary signage.',
    ),

    h('h2', null, 'Format 2: top-mount cone signs'),
    h(
      'p',
      null,
      'A top-mount sign is a rigid sign panel with a plastic cap that clips or snaps over the cone tip. The sign sits horizontally above the cone, like a flag on a flagpole — visible from 360 degrees. Common sizes: 12 in × 18 in and 18 in × 24 in.',
    ),
    h(
      'p',
      null,
      'Pros: better visibility than a sleeve (the sign is up where drivers look), supports rigid signs with proper reflective sheeting, and the cap design is more wind-stable than a friction sleeve. Cons: more expensive ($25–$60 each), slightly slower to deploy, and the cap is sized to a specific cone diameter (28 in vs 36 in).',
    ),
    h(
      'p',
      null,
      'Use a top-mount sign for: lane-shift markers, "DO NOT ENTER" at lot entrances, "DETOUR" arrows where the cone is part of the route, and any deployment where the message needs to read at distance.',
    ),

    h('h2', null, 'Format 3: dome cone signs'),
    h(
      'p',
      null,
      'A dome sign uses a custom plastic dome cap that replaces the cone tip with a flat top, then a sign panel mounts to the dome via screws or a clip. This is the heaviest-duty format and the closest a cone sign gets to a tripod-stand-equivalent.',
    ),
    h(
      'p',
      null,
      'Pros: most rigid, largest sign-face options (up to 24 in × 30 in on a 36-inch cone base), can carry multi-message stacks (e.g., "ROAD WORK AHEAD" on top of "RIGHT LANE CLOSED"). Cons: most expensive ($40–$120), the dome is sold separately from the sign, and storage is awkward (dome stays attached so the cone does not nest as flat).',
    ),
    h(
      'p',
      null,
      'Use a dome sign for: temporary work-zone leading signs on low-speed roads, sign-equivalent applications where a tripod will not fit (narrow lots, sidewalk work), and event signage where the cone-and-sign combo is moved as one unit.',
    ),

    h('h2', null, 'Format comparison'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Format'),
            h('th', { className: 'text-left p-2 border-b' }, 'Cost'),
            h('th', { className: 'text-left p-2 border-b' }, 'Max sign'),
            h('th', { className: 'text-left p-2 border-b' }, 'Wind'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best for'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Sleeve'), h('td', { className: 'p-2' }, '$8–$25'), h('td', { className: 'p-2' }, '12×18'), h('td', { className: 'p-2' }, 'Low'), h('td', { className: 'p-2' }, 'Fast deploy / move')),
          h('tr', null, h('td', { className: 'p-2' }, 'Top-mount'), h('td', { className: 'p-2' }, '$25–$60'), h('td', { className: 'p-2' }, '18×24'), h('td', { className: 'p-2' }, 'Medium'), h('td', { className: 'p-2' }, 'Distance visibility')),
          h('tr', null, h('td', { className: 'p-2' }, 'Dome'), h('td', { className: 'p-2' }, '$40–$120'), h('td', { className: 'p-2' }, '24×30'), h('td', { className: 'p-2' }, 'High'), h('td', { className: 'p-2' }, 'Multi-message work zones')),
        ),
      ),
    ),

    h('h2', null, 'MUTCD considerations'),
    h(
      'p',
      null,
      'Cone signs are a TTC device under MUTCD Part 6 when used in the highway right-of-way. Two requirements bite:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Reflective sheeting tier:'), ' Type III high-intensity prismatic for any night use or any state-route deployment. Engineer-grade is fine for parking lots and very-low-speed local work but will fail an NJDOT inspection on a state job.'),
      h('li', null, h('strong', null, 'Mounting height:'), ' MUTCD section 6F.05 prefers a 5 ft minimum to the bottom of the sign for primary work-zone signs. A cone sign on a 28-inch cone tops out around 4 ft. That is acceptable for supplementary signs (e.g., "FLAGGER AHEAD" near the actual work) but not as the primary advance warning sign.'),
    ),

    h('h2', null, 'Sizing rules'),
    h(
      'p',
      null,
      'Match the cone size to the sign size: 28-inch cones support sleeve and top-mount signs up to 12 × 18 inches. 36-inch cones support up to 18 × 24 inches via top-mount and 24 × 30 inches via dome. Going larger than this on a cone base puts the center-of-mass too high — the sign tips in moderate wind even with a sandbag in the cone base.',
    ),

    h('h2', null, 'What to buy first'),
    h(
      'p',
      null,
      'For a small NJ contractor outfitting a kit:',
    ),
    h(
      'ul',
      null,
      h('li', null, '20× sleeve signs for everyday use: NO PARKING, RESERVED, WET PAINT, KEEP RIGHT, KEEP LEFT'),
      h('li', null, '8× top-mount signs in 18 × 24 with Type III prismatic sheeting: DO NOT ENTER, DETOUR, ROAD CLOSED'),
      h('li', null, '4× dome cone signs for the work-zone leading-sign role'),
      h('li', null, '20× 28-inch cones and 8× 36-inch cones to mount them on (if not already in inventory)'),
    ),

    h('h2', null, 'Where to buy traffic cone signs in NJ'),
    h(
      'p',
      null,
      'Browse our ',
      h('a', { href: '/category/signs-sign-stands' }, 'signs and sign stands category'),
      ' for sleeve, top-mount, and dome cone signs alongside the cones they pair with. Not sure which mix fits your jobs? ',
      h('a', { href: '/assistant' }, 'Ask the Assistant'),
      ' — describe a typical job and it will spec the right format. For a custom kit with same-day Central NJ delivery, ',
      h('a', { href: '/quote' }, 'request a quote'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'What is a traffic cone sign?',
      a: 'A sign panel designed to mount onto a standard traffic cone, turning the cone into a portable sign stand. Three formats: sleeve (slides over the cone), top-mount (clips on the cone tip), and dome (rigid sign on a custom dome cap). Used for short-duration signage where a tripod stand is overkill.',
    },
    {
      q: 'How do you attach a sign to a traffic cone?',
      a: 'Three methods: (1) sleeve signs slide down from the top and grip via friction on the cone taper; (2) top-mount signs use a plastic cap that snaps over the cone tip; (3) dome signs replace the cone tip with a flat dome cap and mount the sign to the dome via screws or a clip. Match the cone size — 28-inch or 36-inch — to the cap or sleeve dimensions.',
    },
    {
      q: 'Are cone signs MUTCD compliant?',
      a: 'Yes for supplementary signs and reservation/no-parking placards in low-speed environments. For primary advance-warning signs in the highway right-of-way, MUTCD section 6F.05 prefers a 5 ft minimum height to the bottom of the sign — a 28-inch cone tops out at ~4 ft, so a tripod stand is the better choice for primary signs. Reflective sheeting must be Type III prismatic for state-route or night work.',
    },
    {
      q: 'How much do cone signs cost?',
      a: 'Sleeve signs: $8–$25 each. Top-mount signs: $25–$60 each. Dome cone signs: $40–$120 each (dome cap usually sold separately, $10–$20). A starter kit of 20 sleeve and 8 top-mount signs lands around $400–$600 retail.',
    },
    {
      q: 'What size sign fits on a 28-inch traffic cone?',
      a: 'Standard sizes are 10 × 14 inches (sleeve), 12 × 18 inches (sleeve or top-mount), and 18 × 24 inches (top-mount on 36-inch cones). Going larger pushes the center of mass too high and the assembly tips in moderate wind.',
    },
    {
      q: 'Do cone signs blow over in wind?',
      a: 'Sleeve signs are most prone to slipping or rotating in wind above 20 mph. Top-mount signs hold to about 25 mph sustained. Dome cone signs hold to about 30 mph. For any sustained wind above the format limit, sandbag the cone base or switch to a tripod sign-on-stand.',
    },
  ],
  relatedProducts: [
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Request a custom quote', path: '/quote' },
  ],
  relatedArticles: [
    'no-parking-cones-guide',
    'parking-lot-barricades-guide',
    'traffic-safety-signs-buying-guide',
  ],
}
