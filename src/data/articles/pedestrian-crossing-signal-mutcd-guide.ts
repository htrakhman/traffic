import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "pedestrian crossing signal" (50K/mo, High comp, ci=94). FAQ-heavy
 * AEO regulatory piece. Distinct from "pedestrian crossing signs" (already
 * published) and "pedestrian crosswalk signs" (already published) — this one
 * is about the *signal heads* (WALK/DON'T WALK / countdown timers / RRFB /
 * HAWK / PHB), which is a different MUTCD chapter. Targets contractors,
 * municipal traffic engineers, and PMs who get asked "do we need a signal
 * here." Structure: shorter prose intro, then large FAQ block, then a
 * portable-vs-permanent comparison.
 */
export const articlePedestrianCrossingSignalMutcdGuide: Article = {
  slug: 'pedestrian-crossing-signal-mutcd-guide',
  title: 'Pedestrian Crossing Signals: MUTCD Rules, Types, and When You Need One',
  excerpt:
    'WALK / DON’T WALK heads, RRFBs, HAWK signals, in-pavement flashers — they are not interchangeable. MUTCD picks the right one based on speed, volume, and crossing distance. Here is the call.',
  metaDescription:
    'Pedestrian crossing signal guide: MUTCD rules for WALK/DON’T WALK, RRFB, HAWK / PHB, and in-pavement flashers. Plus portable temporary signals for NJ work zones.',
  primaryKeyword: 'pedestrian crossing signal',
  secondaryKeywords: [
    'pedestrian signal head',
    'walk signal',
    'don\'t walk signal',
    'pedestrian hybrid beacon',
    'rectangular rapid flashing beacon',
    'RRFB',
    'HAWK signal',
    'pedestrian countdown signal',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-29',
  dateModified: '2026-04-29',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A "pedestrian crossing signal" is the lighted device — WALK / DON’T WALK head, countdown timer, flashing beacon, or hybrid beacon — that tells pedestrians when to cross. ',
      h(
        'strong',
        null,
        'The MUTCD specifies four main types: pedestrian signal heads (Chapter 4I), pedestrian hybrid beacons / HAWK (Chapter 4F), rectangular rapid flashing beacons / RRFB (Chapter 4L.03), and in-pavement warning lights (Chapter 4N).',
      ),
      ' Which one applies depends on the road’s speed limit, the crossing distance, the daily pedestrian volume, and whether the crossing is at an intersection or mid-block. Below is the MUTCD-grounded selection logic, followed by an FAQ that covers what most municipal engineers and contractors actually ask.',
    ),

    h(
      'p',
      null,
      h('em', null, 'Always verify against the current edition of the MUTCD and any state supplements before installation. NJ supplement language can vary from federal MUTCD baselines.'),
    ),

    h('h2', null, 'The four pedestrian crossing signal types — quick reference'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Signal type'),
            h('th', { className: 'text-left p-2 border-b' }, 'MUTCD chapter'),
            h('th', { className: 'text-left p-2 border-b' }, 'Where it goes'),
            h('th', { className: 'text-left p-2 border-b' }, 'Driver behavior'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Pedestrian signal head (WALK / DON’T WALK)'),
            h('td', { className: 'p-2' }, '4I'),
            h('td', { className: 'p-2' }, 'Signalized intersection — paired with vehicle signal'),
            h('td', { className: 'p-2' }, 'Stops on red as part of the intersection cycle'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Pedestrian hybrid beacon (PHB / HAWK)'),
            h('td', { className: 'p-2' }, '4F'),
            h('td', { className: 'p-2' }, 'Mid-block or uncontrolled approach'),
            h('td', { className: 'p-2' }, 'Dark → flashing yellow → solid yellow → solid red → alternating flashing red'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Rectangular rapid flashing beacon (RRFB)'),
            h('td', { className: 'p-2' }, '4L.03'),
            h('td', { className: 'p-2' }, 'Mid-block / uncontrolled crossing on a road ≤45 mph'),
            h('td', { className: 'p-2' }, 'Yield warning — driver still has to stop voluntarily'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'In-pavement warning light'),
            h('td', { className: 'p-2' }, '4N'),
            h('td', { className: 'p-2' }, 'Marked crosswalk on low-speed road, supplements RRFB'),
            h('td', { className: 'p-2' }, 'Visual warning — supplements other signs'),
          ),
        ),
      ),
    ),

    h('h2', null, 'How to pick the right signal'),
    h(
      'p',
      null,
      'The MUTCD does not pick a signal type for you — it constrains the choice based on the crossing’s speed, volume, and geometry. The general logic:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Signalized intersection?'), ' Then the WALK / DON’T WALK head (Chapter 4I) is required, paired with the vehicle signal. Countdown timers are required for any new install or reconstruction (4E.07).'),
      h('li', null, h('strong', null, 'Mid-block or uncontrolled crossing on a high-speed (>40 mph) road?'), ' PHB / HAWK is the right call (4F). PHBs stop traffic, where RRFBs only warn.'),
      h('li', null, h('strong', null, 'Mid-block on a slower road (≤45 mph) with a marked crosswalk?'), ' RRFB is usually the cost-effective choice (4L.03). High driver-yield rates have been documented in the FHWA evaluations.'),
      h('li', null, h('strong', null, 'School or pedestrian-heavy zone?'), ' The MUTCD pedestrian-volume warrants in Chapter 4 specify whether a signal upgrade is justified — generally above 100 pedestrians per peak hour, or specific school-crossing thresholds.'),
    ),

    h('h2', null, 'Pedestrian signal heads — WALK / DON’T WALK'),
    h(
      'p',
      null,
      'These are the standard signal heads at signalized intersections — a white "walking person" symbol for WALK, an orange "raised hand" symbol for DON’T WALK, and a flashing-hand-with-countdown for clearance. The MUTCD requires both a steady WALK indication and a clearance interval long enough to let a pedestrian who has just stepped off the curb finish crossing at 3.5 ft/s walking speed. Countdown timers (Chapter 4E.07) are required on any new install or reconstruction.',
    ),
    h(
      'p',
      null,
      'On contractor side, work-zone pedestrian routing through an active intersection still has to honor the existing signal pattern. If you are temporarily blocking the curb ramp, your TTC plan needs to reroute pedestrians before the signal head, not at it. See our ',
      h('a', { href: '/blog/temporary-traffic-control-plan-utility-job' }, 'TTC plan guide for utility jobs'),
      ' for how to fold ped routing into a small-job plan.',
    ),

    h('h2', null, 'PHB / HAWK — when traffic actually has to stop'),
    h(
      'p',
      null,
      'A pedestrian hybrid beacon (sometimes "HAWK signal" — High-intensity Activated crossWalK) sits over a mid-block or uncontrolled crossing on a higher-speed road and goes through a five-state cycle: dark → flashing yellow → solid yellow → solid red (drivers must stop) → alternating flashing red (drivers may proceed if clear). PHBs have been shown in FHWA evaluations to achieve >95% driver compliance, far higher than warning-only beacons.',
    ),
    h(
      'p',
      null,
      'PHBs are the right call when (a) the crossing is mid-block, (b) the road is over 40 mph, and (c) pedestrian volume justifies a signalized control per the MUTCD warrants. They cost more than RRFBs but stop traffic reliably.',
    ),

    h('h2', null, 'RRFB — the high-yield warning beacon'),
    h(
      'p',
      null,
      'A rectangular rapid flashing beacon is two amber LED rectangles that fire in a stutter-flash pattern when a pedestrian pushes the button. The driver sees the flash and yields voluntarily — the RRFB does not legally compel a stop the way a PHB or signal head does. FHWA evaluations have documented driver-yield rates of 80–90%+ at RRFB-equipped crossings, much higher than crosswalk-only or static-sign-only crossings.',
    ),
    h(
      'p',
      null,
      'RRFBs are the cost-effective sweet spot for mid-block crossings on roads at or below 45 mph. Above 45 mph, jurisdictions usually step up to a PHB. Pair the RRFB with the right warning signs upstream — see our ',
      h('a', { href: '/blog/pedestrian-crossing-signs-mutcd-guide' }, 'pedestrian crossing signs guide'),
      ' for sign selection.',
    ),

    h('h2', null, 'In-pavement warning lights — supplemental, not primary'),
    h(
      'p',
      null,
      'In-pavement warning lights (Chapter 4N) are LED markers embedded in the pavement that flash to outline a marked crosswalk when activated. They are explicitly supplemental in the MUTCD — they augment a primary warning device (RRFB, PHB, signal) rather than replacing one. Some municipalities install them at school-zone crossings on low-speed streets where a full beacon is not warranted but additional driver-attention is desired.',
    ),

    h('h2', null, 'Portable / temporary pedestrian crossing signals for work zones'),
    h(
      'p',
      null,
      'For work zones that detour pedestrians across a road that did not previously have a crossing, portable RRFB-style beacons exist on trailer-mount and post-mount frames. These are MUTCD-acceptable for temporary work-zone use under Chapter 6F. They get deployed for utility detours, sidewalk closures with a parallel-route ped crossing, and short-term construction reroutes. Pair them with appropriate signage and the right barricades — see our ',
      h('a', { href: '/blog/type-iii-barricade-vs-type-i-type-ii' }, 'Type I / II / III barricades guide'),
      ' for the closure-side equipment.',
    ),

    h('h2', null, 'Pedestrian crossing signal warrants — the volume math'),
    h(
      'p',
      null,
      'The MUTCD warrants a pedestrian signal upgrade based on pedestrian volume, vehicle volume, crossing distance, and crash history. Common thresholds:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '100 pedestrians per peak hour'), ' on a 4-lane road typically warrants RRFB or PHB consideration.'),
      h('li', null, h('strong', null, 'School crossings'), ' have separate warrants — generally 20+ student crossings per peak hour on a road over 35 mph.'),
      h('li', null, h('strong', null, 'Crash-history justification'), ' (3+ pedestrian-vehicle crashes in 12 months at a single uncontrolled location) can warrant signal upgrade independently of volume.'),
    ),
    h(
      'p',
      null,
      'These thresholds are guidelines — verify against the current MUTCD edition and the applicable state supplement before initiating an installation request.',
    ),

    h('h2', null, 'Where to source pedestrian signal equipment in NJ'),
    h(
      'p',
      null,
      'TrafficKit ships portable pedestrian-warning equipment for work zones — RRFB-style trailer beacons, portable signal heads, MUTCD-compliant pedestrian signs, and the barricades and cones required for the closure side of any ped detour — with same-day delivery in Central NJ. ',
      h('a', { href: '/category/signs-sign-stands' }, 'Browse signs and sign stands'),
      ' or describe the closure to the ',
      h('a', { href: '/assistant' }, 'TrafficKit Assistant'),
      ' and it will spec the kit. For permanent intersection signal heads (which require utility coordination and an electrical sub), ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' and we will scope the install.',
    ),
  ),
  faqs: [
    {
      q: 'What is a pedestrian crossing signal?',
      a: 'A lighted device that tells pedestrians when to cross. The MUTCD specifies four main types: pedestrian signal heads (WALK / DON’T WALK at signalized intersections), pedestrian hybrid beacons (PHB / HAWK at mid-block crossings), rectangular rapid flashing beacons (RRFB), and in-pavement warning lights. Which is required depends on speed, volume, and geometry.',
    },
    {
      q: 'What is the difference between an RRFB and a HAWK signal?',
      a: 'An RRFB is a yield-warning beacon — it flashes amber LEDs to alert drivers but does not legally compel a stop. A HAWK / PHB is a stop-required signal — it cycles through yellow to solid red, requiring drivers to stop. PHBs are used on higher-speed (>40 mph) crossings where reliable stopping is required; RRFBs are the cost-effective choice on roads ≤45 mph.',
    },
    {
      q: 'When does the MUTCD require a pedestrian crossing signal?',
      a: 'Pedestrian-volume warrants in MUTCD Chapter 4 typically trigger above 100 pedestrians per peak hour on a 4-lane road, or for school crossings with 20+ student crossings per peak hour on roads over 35 mph. Crash history (3+ pedestrian-vehicle crashes in 12 months) can warrant a signal independently. Verify against the current edition and applicable state supplement.',
    },
    {
      q: 'Are pedestrian countdown timers required?',
      a: 'Yes — the MUTCD (Section 4E.07) requires countdown timers on any new pedestrian signal install or reconstruction. Existing fixed-time pedestrian heads without countdown displays are usually grandfathered until the intersection is rebuilt.',
    },
    {
      q: 'How long is the pedestrian clearance interval?',
      a: 'Long enough for a pedestrian who has just stepped off the curb to finish crossing at a 3.5 ft/s walking speed. The MUTCD allows slower walking speeds (3.0 ft/s) at locations with high concentrations of older pedestrians or pedestrians with disabilities.',
    },
    {
      q: 'Can I use an RRFB on a 50 mph road?',
      a: 'Generally no. The MUTCD and FHWA guidance recommend RRFBs for roads ≤45 mph. Above 45 mph, the jurisdiction should step up to a PHB / HAWK signal, which compels driver stops rather than requesting voluntary yield.',
    },
    {
      q: 'Do I need a permit for a portable pedestrian signal in a work zone?',
      a: 'Yes — any pedestrian routing through a public-road work zone requires an approved Temporary Traffic Control plan, which the municipality or NJDOT (depending on jurisdiction) must approve before deployment. Portable RRFB beacons are MUTCD-acceptable under Chapter 6F for temporary use.',
    },
  ],
  relatedProducts: [
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Pedestrian Control', path: '/category/pedestrian-control' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
  ],
  relatedArticles: [
    'pedestrian-crossing-signs-mutcd-guide',
    'pedestrian-crosswalk-signs-mutcd',
    'temporary-traffic-control-plan-utility-job',
  ],
}
