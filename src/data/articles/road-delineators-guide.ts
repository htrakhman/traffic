import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "road delineators" (~500/mo, High comp, $14.94 bid).
 * FAQ-heavy AEO structure: short body, deep FAQ block tuned for AI answer engines.
 */
export const articleRoadDelineatorsGuide: Article = {
  slug: 'road-delineators-guide',
  title: 'Road Delineators: What They Are, MUTCD Requirements, and Where to Buy',
  excerpt:
    'Road delineators are the slim, reflective posts that line the edge of a roadway, marking the travel path through curves, narrow shoulders, and active work zones. They are not channelizers, not barricades, and not bollards — a different MUTCD device with a specific role.',
  metaDescription:
    'Road delineators explained — MUTCD §3F spec, post types (flexible, rigid, surface-mount), reflective requirements, and what to buy for contractor and municipal work.',
  primaryKeyword: 'road delineators',
  secondaryKeywords: [
    'flexible road delineators',
    'highway delineators',
    'delineator posts',
    'reflective delineators',
    'roadway delineators',
    'mutcd delineators',
  ],
  targetVolume: 500,
  datePublished: '2026-05-17',
  readMinutes: 6,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A road delineator is a slim vertical post — typically 36 to 48 inches tall, 2 to 4 inches in diameter — placed at the edge of a roadway and topped with retroreflective sheeting to mark the travel path. ',
      h('strong', null, 'They are not channelizers (which redirect traffic), not barricades (which block it), and not bollards (which physically stop vehicles). The MUTCD treats them as a separate device class in §3F.'),
      ' This guide covers the spec, the post types, where they go, and what contractors and municipalities should buy.',
    ),

    h('h2', null, 'The MUTCD definition'),
    h(
      'p',
      null,
      'MUTCD §3F.01 defines delineators as "light-retroreflecting devices mounted at the side of the roadway, in series, to indicate the alignment of the roadway." Three properties matter:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Color of reflective element '), '— white on right side of one-way roads; yellow on left side of two-way roads (matching the lane line color).'),
      h('li', null, h('strong', null, 'Mounting height '), '— 4 ft above the roadway surface for the center of the reflective unit.'),
      h('li', null, h('strong', null, 'Spacing '), '— roughly 200 ft on tangent (straight) sections; tighter through curves (down to 25 ft on tight curves) per the formula in §3F.04.'),
    ),
    h(
      'p',
      null,
      'Delineators are guidance devices, not warning devices. They do not require flashing lights, do not need to be daylight visible at any specific distance, and do not substitute for any active warning device on a work zone.',
    ),

    h('h2', null, 'Post types — three categories'),
    h(
      'p',
      null,
      'Manufacturers sell three structurally distinct delineator post designs:',
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
          h('tr', { className: 'border-b' },
            h('th', { className: 'text-left p-2' }, 'Type'),
            h('th', { className: 'text-left p-2' }, 'Material'),
            h('th', { className: 'text-left p-2' }, 'Behavior on impact'),
            h('th', { className: 'text-left p-2' }, 'Typical use'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Flexible'),
            h('td', { className: 'p-2' }, 'Polyurethane / TPU'),
            h('td', { className: 'p-2' }, 'Bends, returns upright'),
            h('td', { className: 'p-2' }, 'Permanent shoulder, lane separators'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Semi-rigid'),
            h('td', { className: 'p-2' }, 'HDPE composite'),
            h('td', { className: 'p-2' }, 'Bends to 90°, returns slowly'),
            h('td', { className: 'p-2' }, 'Work zones, curves'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Rigid'),
            h('td', { className: 'p-2' }, 'Steel, aluminum, fiberglass'),
            h('td', { className: 'p-2' }, 'Bent permanently or replaced'),
            h('td', { className: 'p-2' }, 'Decorative, fixed installations'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Modern roadway practice strongly favors flexible delineator posts — they survive being struck by snowplows, passenger cars, and string-trimmers without replacement. NJDOT specifies flexible TPU for most new installations on state roads.',
    ),

    h('h2', null, 'How road delineators differ from channelizers, barricades, and bollards'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Channelizers (cones, drums, tubular markers) '), '— actively redirect traffic. Larger, more visible, often used in series with arrow board guidance.'),
      h('li', null, h('strong', null, 'Barricades (Type 1/2/3) '), '— block or close part of a road. Horizontal rails on stable bases.'),
      h('li', null, h('strong', null, 'Bollards '), '— physical protection. Steel posts set in concrete; designed to stop a vehicle.'),
      h('li', null, h('strong', null, 'Delineators '), '— passive guidance. Mark the path of the road; do not redirect, block, or physically stop.'),
    ),

    h('h2', null, 'Mounting and installation'),
    h(
      'p',
      null,
      'Four mounting methods cover almost all installations:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Drive-in ground anchor '), '— steel base driven 12–18 inches into soil. Standard for shoulder and median work. Post slides into the anchor and locks with a pin.'),
      h('li', null, h('strong', null, 'Surface-mount with adhesive '), '— round PE base bonded to asphalt or concrete with epoxy or urethane adhesive. Used on parking-lot lane separators and curb extensions.'),
      h('li', null, h('strong', null, 'Bolt-down base '), '— steel or PE base anchored with 3/8-inch concrete screws. More secure than adhesive; visible bolts.'),
      h('li', null, h('strong', null, 'Portable weighted base '), '— rubber or steel disc with the post slip-fitted. Used for short-duration work zone placement. Easily knocked over but easy to redeploy.'),
    ),

    h('h2', null, 'What to buy — three use profiles'),
    h(
      'h3',
      null,
      'Profile A: municipal road maintenance crew',
    ),
    h(
      'ul',
      null,
      h('li', null, '50× flexible TPU delineators, 42" tall, drive-in anchor — ~$24 each'),
      h('li', null, 'White reflective for one-way roads, yellow for two-way center-line installation'),
      h('li', null, 'Total kit: ~$1,200'),
    ),
    h(
      'h3',
      null,
      'Profile B: paving / striping contractor',
    ),
    h(
      'ul',
      null,
      h('li', null, '40× flexible TPU delineators, surface-mount adhesive base — ~$28 each'),
      h('li', null, '10× portable weighted-base versions for short-term work — ~$32 each'),
      h('li', null, 'Total kit: ~$1,440'),
    ),
    h(
      'h3',
      null,
      'Profile C: utility / construction work zone',
    ),
    h(
      'ul',
      null,
      h('li', null, '24× semi-rigid HDPE delineators with portable rubber bases — ~$30 each'),
      h('li', null, 'Used to mark long shoulder closures and curve approaches between barricade arrays'),
      h('li', null, 'Total kit: ~$720'),
    ),

    h('h2', null, 'Common mistakes'),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Using delineators as channelizers: '),
        'a slim 3-inch post does not redirect a 4,000 lb vehicle. For active channelizing, use cones, drums, or tubular markers per MUTCD §6F.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Wrong reflective color: '),
        'white on the right edge of any roadway; yellow on the left edge of a two-way road (matching the center-line color). Mixed colors confuse drivers and is a citable error.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Wrong spacing: '),
        'tangent spacing on a 55 mph rural road is ~200 ft. Tighter spacing (down to 25 ft) is appropriate through curves and on freeway-to-arterial transitions. Uniform 50-ft spacing on a tangent is a waste; uniform 200-ft spacing through a curve is a citable error.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Using rigid posts in plow zones: '),
        'a snowplow snaps a rigid post on first contact. Flexible TPU survives 50+ plow strikes and bounces back. Replacement cost across one winter swallows the upfront savings.',
      ),
    ),

    h('h2', null, 'Where to buy road delineators in NJ'),
    h(
      'p',
      null,
      'We stock flexible TPU, semi-rigid HDPE, and rigid delineator posts in 36" and 42" heights with drive-in, adhesive, bolt-down, and portable bases — same-day Central NJ delivery. Browse the ',
      h('a', { href: '/category/cones-drums' }, 'cones, drums, and channelizers category'),
      ' or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' for a kit sized to a specific job. For a layout question — delineator spacing through a curve, mixing delineators and channelizers, where to transition — the ',
      h('a', { href: '/assistant' }, 'Assistant'),
      ' walks through the MUTCD formula by job geometry.',
    ),
    h(
      'p',
      null,
      'Related reading: ',
      h('a', { href: '/blog/traffic-delineators-guide' }, 'traffic delineators guide'),
      ', ',
      h('a', { href: '/blog/delineator-cones-guide' }, 'delineator cones'),
      ', and ',
      h('a', { href: '/blog/channelizer-cones-guide' }, 'channelizer cones'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'What are road delineators used for?',
      a: 'Road delineators mark the edge alignment of a roadway — guiding drivers through curves, narrow shoulders, ramp transitions, and work zones. They are passive guidance devices, not active channelizers or barriers. MUTCD §3F defines them as light-retroreflecting devices mounted in series at the side of the road.',
    },
    {
      q: 'What is the difference between a delineator and a channelizer?',
      a: 'A delineator marks the edge of the roadway for passive guidance — slim post, reflective face, ~4 ft tall, spaced 25–200 ft apart. A channelizer (cone, drum, tubular marker) actively redirects traffic — wider, more visible, in tight series along a taper or lane closure. MUTCD treats them as separate device classes.',
    },
    {
      q: 'How far apart should road delineators be placed?',
      a: 'On tangent (straight) sections, roughly 200 ft on rural roads and shorter on urban arterials. Through curves, spacing drops to as little as 25 ft based on the formula in MUTCD §3F.04, which ties spacing to the curve radius and the design speed.',
    },
    {
      q: 'What color should road delineators be?',
      a: 'The reflective unit color matches the corresponding lane-line color. White on the right edge of any roadway, including one-way streets. Yellow on the left edge of a two-way road (the side facing oncoming traffic). Bidirectional units exist for medians and some lane-separator installations.',
    },
    {
      q: 'Are flexible road delineators MUTCD-compliant?',
      a: 'Yes, when they meet the reflective sheeting and mounting height requirements of §3F. Flexibility itself is not an MUTCD criterion; what matters is the reflective face area, the sheeting type (Type III prismatic or higher is standard), the color, and the 4 ft mounting height.',
    },
    {
      q: 'How long do flexible road delineators last?',
      a: 'Quality TPU delineators last 5–10 years even with regular plow and vehicle strikes. The reflective sheeting is usually the limiting factor — Type III prismatic sheeting degrades to non-compliant brightness at 5–7 years; replacement involves re-sheeting the existing post rather than buying new posts.',
    },
    {
      q: 'Can I install road delineators myself or do I need a contractor?',
      a: 'Surface-mount and portable-base delineators install with hand tools — adhesive curing time is the gating factor. Drive-in ground anchor posts need a soft-soil shoulder or a hammer drill for paved surfaces. Public-road installations need a permit from the road owner (NJDOT for state routes, municipality for local roads).',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
    { label: 'Accessories & Hardware', path: '/category/accessories-hardware' },
  ],
  relatedArticles: [
    'traffic-delineators-guide',
    'delineator-cones-guide',
    'channelizer-cones-guide',
  ],
}
