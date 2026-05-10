import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "channelizer cones" (500/mo, High comp, $17.94 bid).
 * "What is" definitional structure with FAQ block. Distinguishes channelizers
 * from standard cones, drums, and tubular markers in MUTCD terminology.
 */
export const articleChannelizerConesGuide: Article = {
  slug: 'channelizer-cones-guide',
  title: 'What Are Channelizer Cones? Tubular Markers, Drums, and the MUTCD Definitions',
  excerpt:
    'A "channelizer cone" is not always a cone. It is the MUTCD category that includes traffic cones, tubular markers, vertical panels, and drums — all the devices that channel traffic without barricading it. Here is how the categories differ and what to actually buy.',
  metaDescription:
    'Channelizer cones is an MUTCD umbrella term for cones, tubular markers, drums, and vertical panels. Here is how they differ and which to buy for which job.',
  primaryKeyword: 'channelizer cones',
  secondaryKeywords: [
    'channelizing devices',
    'tubular markers',
    'traffic drums',
    'vertical panels',
    'channelizer cone vs cone',
    'mutcd channelizer',
  ],
  targetVolume: 500,
  datePublished: '2026-05-10',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A "channelizer cone" is the everyday term for any of the devices the MUTCD calls ',
      h('strong', null, 'channelizing devices'),
      ' — the bright orange (or pink) markers that route traffic around or through a work zone without forming a hard barrier. ',
      h('strong', null, 'The category includes four products: traffic cones, tubular markers, drums (sometimes called barrels), and vertical panels.'),
      ' Each is the right answer for a different combination of speed, duration, and visibility need. Below is the plain-English definition of each, and how to pick the right one without ordering the wrong gear.',
    ),

    h('h2', null, 'The MUTCD definition (and why the term is fuzzy)'),
    h(
      'p',
      null,
      'Part 6 of the MUTCD groups channelizing devices into a single chapter because they share a function: warn drivers and shift them away from a hazard, but allow a vehicle to physically pass through if needed. They are not designed to stop a vehicle the way a barrier or barricade is. The "cone" in "channelizer cone" is shorthand — many of the devices in the category are not technically cones.',
    ),
    h(
      'p',
      null,
      'In retail catalogs, "channelizer" by itself sometimes means just the tall tubular marker (the 28-to-42-inch skinny marker with a flexible base). In contractor speech, "channelizer cones" usually means the whole family. Both usages are common; context decides.',
    ),

    h('h2', null, 'The four channelizing devices, side by side'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Device'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical height'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best for'),
            h('th', { className: 'text-left p-2 border-b' }, 'Per-unit cost'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Traffic cone'), h('td', { className: 'p-2' }, '18, 28, or 36 in'), h('td', { className: 'p-2' }, 'Short-duration daily work, mobile crews'), h('td', { className: 'p-2' }, '$22–$60')),
          h('tr', null, h('td', { className: 'p-2' }, 'Tubular marker'), h('td', { className: 'p-2' }, '28 or 42 in'), h('td', { className: 'p-2' }, 'Lane-line delineation, narrow gaps'), h('td', { className: 'p-2' }, '$20–$45')),
          h('tr', null, h('td', { className: 'p-2' }, 'Drum (barrel)'), h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, 'Long-duration, freeway-speed, nighttime'), h('td', { className: 'p-2' }, '$60–$140')),
          h('tr', null, h('td', { className: 'p-2' }, 'Vertical panel'), h('td', { className: 'p-2' }, '24 or 36 in tall, narrow'), h('td', { className: 'p-2' }, 'Tight spaces, sidewalk closures, lane shifts on narrow roads'), h('td', { className: 'p-2' }, '$45–$95')),
        ),
      ),
    ),

    h('h2', null, 'Traffic cones — the default channelizer'),
    h(
      'p',
      null,
      'When a contractor says "give me 30 cones for the lane closure," they almost always mean fluorescent orange traffic cones — 28-inch with a 7-lb base for daytime, or 36-inch for nighttime / higher speeds. Cones are the cheapest channelizer and the most flexible: they stack on a truck, deploy in seconds, and a crew can recover them just as fast. The downside is wind sensitivity — even a 36-inch cone with a 10-lb base will roll on a windy bridge deck.',
    ),
    h(
      'p',
      null,
      'For the size-by-speed and reflectivity rules, see our ',
      h('a', { href: '/blog/road-cones-vs-traffic-cones' }, 'road cones vs traffic cones guide'),
      '.',
    ),

    h('h2', null, 'Tubular markers — when you need a slim profile'),
    h(
      'p',
      null,
      'Tubular markers (sometimes called "channelizer posts" or just "channelizers") are the tall, skinny orange markers, usually 28 or 42 inches, with a flat or square base and reflective collars. They are mostly used for two things: marking the centerline through a temporary lane shift, and replacing cones in a setup where the visible marker needs to be more vertical (like along a lane-divider in a narrow construction zone).',
    ),
    h(
      'p',
      null,
      'They handle being run over better than a standard cone — most tubular markers are designed to flex flat on impact and pop back up. That makes them the right choice for a high-traffic urban work zone where cones get knocked over a dozen times per shift.',
    ),

    h('h2', null, 'Drums — long-duration, high-speed work'),
    h(
      'p',
      null,
      'Drums (sometimes called "barrels" — same product) are 36-inch high, roughly 18 inches in diameter, with multiple reflective bands. NJDOT and most state DOTs strongly prefer drums over cones for any taper on a 50+ mph route or for any closure that runs more than a single shift. Drums weigh 35–55 lb fully ballasted (with a tire base or sand bag), so wind is not an issue, and the larger surface area carries more retroreflective sheeting.',
    ),
    h(
      'p',
      null,
      'The downside: drums take a lot more truck space. A pickup that hauls 60 cones hauls maybe 12 drums. Plan logistics accordingly.',
    ),

    h('h2', null, 'Vertical panels — for tight spaces'),
    h(
      'p',
      null,
      'Vertical panels are flat, narrow rectangles (typically 8 or 12 inches wide, 24 or 36 inches tall) with diagonal orange-and-white stripes. They are the right choice when there is not enough room for a cone or drum — sidewalk closures, narrow shoulder work, lane shifts on a curb-tight road. They take very little ground footprint and are visually distinct from cones, which signals "different kind of work zone" to drivers.',
    ),
    h(
      'p',
      null,
      'Vertical panels are not interchangeable with cones in MUTCD spacing tables. Check the device-specific spacing in the TCP if you are mixing them.',
    ),

    h('h2', null, 'How to pick the right channelizer for the job'),
    h('h3', null, 'Daytime, short duration, < 35 mph'),
    h(
      'p',
      null,
      'Traffic cones, 28-inch. The default. For most lane closures, utility jobs, and tree work, cones are the right answer.',
    ),
    h('h3', null, 'Nighttime or 35–50 mph'),
    h(
      'p',
      null,
      '36-inch cones with double reflective collars OR drums. Drums are preferred for any closure that crosses shift boundaries.',
    ),
    h('h3', null, '50+ mph or freeway'),
    h(
      'p',
      null,
      'Drums. Cones blow over and inspectors will ding the TCP. Some state DOTs explicitly mandate drums for any taper on 50+ mph routes.',
    ),
    h('h3', null, 'Curb-tight or narrow sidewalk'),
    h(
      'p',
      null,
      'Vertical panels. Less footprint than a drum, more presence than a cone.',
    ),
    h('h3', null, 'Long lane shift on urban arterials'),
    h(
      'p',
      null,
      'Tubular markers. They flex when struck (cones get knocked away), and the slim vertical profile reads cleanly from a long sight distance.',
    ),

    h('h2', null, 'Spacing — the rule that catches contractors'),
    h(
      'p',
      null,
      'MUTCD device spacing depends on speed and on the role of the device:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Tapers: '), 'channelizer spacing in feet equals the speed limit in mph. 35 mph = 35 ft spacing. (For details, our ',
        h('a', { href: '/blog/mutcd-taper-length-formula-nj' }, 'taper length formula guide'), ' walks the math.)'),
      h('li', null, h('strong', null, 'Tangent (the long parallel section after a taper): '), 'spacing in feet equals 2× speed in mph. 35 mph = 70 ft.'),
      h('li', null, h('strong', null, 'Activity area perimeter: '), 'spacing 20–40 ft depending on speed and visibility.'),
    ),
    h(
      'p',
      null,
      'These rules apply to all four channelizing devices. If you switch from cones to drums in the middle of a closure, the spacing rule does not change.',
    ),

    h('h2', null, 'How many channelizers do you need?'),
    h(
      'p',
      null,
      'For a single-lane closure on a 40 mph NJ road, the working number is about 25–30 channelizers (cones or a mix). For a freeway taper on a 65 mph highway, plan on 50–80 drums for the closure plus the buffer and activity area. Our ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'cone-count guide'),
      ' walks the count step by step, and the ',
      h('a', { href: '/planner' }, 'Site Map Planner'),
      ' will spec the exact device count and spacing for any lane-closure layout you draw.',
    ),

    h('h2', null, 'What to buy for a starter contractor kit'),
    h(
      'ul',
      null,
      h('li', null, '20–30× 28-inch traffic cones, 7-lb rubber base, double reflective collar'),
      h('li', null, '6–10× 36-inch traffic cones with 10-lb base for nighttime / 50 mph'),
      h('li', null, '12–24× 36-inch drums (after first DOT job — they are an investment)'),
      h('li', null, '6× vertical panels for sidewalk and curb-tight work'),
      h('li', null, '12× tubular markers for urban lane shifts'),
    ),
    h(
      'p',
      null,
      'For Central NJ contractors, ',
      h('a', { href: '/category/cones-drums' }, 'browse our cones, drums, and channelizers'),
      ' — or ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' on a starter or expansion kit. Same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon.',
    ),
  ),
  faqs: [
    {
      q: 'What is the difference between a channelizer and a traffic cone?',
      a: 'In MUTCD terms, traffic cones are one type of channelizing device. The umbrella category — "channelizers" — also includes tubular markers, drums (barrels), and vertical panels. In retail use, "channelizer cone" usually means the whole family; "channelizer" alone sometimes specifically means the tall tubular marker.',
    },
    {
      q: 'Can I use cones instead of drums on a freeway closure?',
      a: 'Generally no. Most state DOTs (NJDOT included) require drums on tapers for 50+ mph speeds. Cones blow over from truck slipstream and fail the visibility check at freeway speeds. A short-duration daytime closure on a 50 mph route may permit 36-inch cones with 12-lb bases plus sandbags — check the project TCP.',
    },
    {
      q: 'Are vertical panels the same as Type I barricades?',
      a: 'No. Vertical panels are channelizing devices (route traffic but allow passage). Type I barricades are warning devices, typically used at temporary closure ends or shoulder closures. Type I barricades are wider and have a different stripe pattern. See our barricade-types guide for the full distinction.',
    },
    {
      q: 'Do tubular markers count as cones for MUTCD spacing?',
      a: 'For taper and tangent spacing, yes — the same device-spacing rule (speed in mph = spacing in feet on a taper, 2× on tangent) applies to all four channelizing devices. The TCP may specify the device type, but the spacing math is the same.',
    },
    {
      q: 'Why are drums more expensive than cones?',
      a: 'Drums are larger (more material), have heavier ballast bases, carry more retroreflective sheeting, and are designed for multi-shift outdoor use. A drum costs roughly 3–6x what an equivalent 36-inch cone costs but lasts longer in heavy use and is mandatory on freeway-speed closures.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Traffic Drums', path: '/category/cones-drums' },
    { label: 'Site Map Planner', path: '/planner' },
    { label: 'Get a Quote', path: '/quote' },
  ],
  relatedArticles: [
    'road-cones-vs-traffic-cones',
    'traffic-delineators-guide',
    'mutcd-taper-length-formula-nj',
  ],
}
