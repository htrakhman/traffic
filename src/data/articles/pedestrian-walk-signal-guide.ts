import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "pedestrian walk signal" (~5,000/mo, High comp, $15.25 bid).
 * FAQ-heavy AEO structure: front-loaded direct-answer paragraphs and a
 * deep FAQ block aimed at AI-overview surfaces. Distinct from
 * pedestrian-crossing-signal-mutcd-guide — this article is aimed at the
 * "walk signal" wording specifically (the device itself, the hand/man
 * symbology, the countdown timer, and how contractors spec or replace one).
 */
export const articlePedestrianWalkSignalGuide: Article = {
  slug: 'pedestrian-walk-signal-guide',
  title: 'Pedestrian Walk Signal: How It Works, MUTCD Spec, and What to Replace',
  excerpt:
    'A pedestrian walk signal is the WALKING PERSON / steady-hand / flashing-hand DON\'T WALK device required at signalized crossings under MUTCD §4E. This guide answers what each phase means, the timing math, the countdown rule, and how contractors replace or upgrade a non-compliant head.',
  metaDescription:
    'Pedestrian walk signal explained: WALK / DON\'T WALK / countdown phases, MUTCD §4E timing, accessible-pedestrian-signal (APS) rules, contractor spec for replacement heads.',
  primaryKeyword: 'pedestrian walk signal',
  secondaryKeywords: [
    'walk signal',
    "don't walk signal",
    'pedestrian signal head',
    'countdown pedestrian signal',
    'accessible pedestrian signal',
    'pedestrian signal timing',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-09',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'A pedestrian walk signal is the device that tells a person on foot when it is safe to enter a signalized crosswalk.'),
      ' Federally, it is governed by MUTCD §4E and the United States Access Board\'s Public Right-of-Way Accessibility Guidelines (PROWAG). Modern installations are required to display three phases — a steady WALKING PERSON (white), a flashing UPRAISED HAND with countdown timer (orange), and a steady UPRAISED HAND (orange). Most older installations missing the countdown timer are now non-compliant under the 11th Edition MUTCD (2023) for new and substantially reconstructed signals.',
    ),

    h('h2', null, 'Direct answers (read this first)'),
    h(
      'p',
      null,
      h('strong', null, 'What does the WALK symbol mean?'),
      ' The steady WALKING PERSON (white silhouette) means a pedestrian may begin to cross. Per MUTCD §4E.06, this phase must last at least 7 seconds, and ideally long enough for a pedestrian to leave the curb and enter the crosswalk before the flashing-hand phase begins.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'What does the flashing hand with countdown mean?'),
      ' The flashing UPRAISED HAND (orange silhouette) plus the numeric countdown timer mean: do NOT begin to cross. If you are already in the crosswalk, you may continue to the opposite curb. The countdown number is the seconds remaining before the steady-hand phase begins.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'What does the steady hand mean?'),
      ' The steady UPRAISED HAND (orange) means: do not be in the crosswalk. Pedestrians who entered legally during the WALK phase should already have reached the far side; pedestrians on the curb must wait for the next WALK phase.',
    ),

    h('h2', null, 'The three phases under MUTCD §4E.06'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Phase'),
            h('th', { className: 'text-left p-2 border-b' }, 'Display'),
            h('th', { className: 'text-left p-2 border-b' }, 'Meaning'),
            h('th', { className: 'text-left p-2 border-b' }, 'Min duration'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'WALK'), h('td', { className: 'p-2' }, 'Steady white walking person'), h('td', { className: 'p-2' }, 'Begin crossing'), h('td', { className: 'p-2' }, '7 sec (4 sec absolute floor)')),
          h('tr', null, h('td', { className: 'p-2' }, 'FLASHING DON\'T WALK + countdown'), h('td', { className: 'p-2' }, 'Flashing orange hand + numeric timer'), h('td', { className: 'p-2' }, 'Don\'t begin; finish crossing if started'), h('td', { className: 'p-2' }, 'Crossing distance ÷ 3.5 ft/s')),
          h('tr', null, h('td', { className: 'p-2' }, 'DON\'T WALK'), h('td', { className: 'p-2' }, 'Steady orange hand'), h('td', { className: 'p-2' }, 'Do not be in crosswalk'), h('td', { className: 'p-2' }, 'Vehicle phase length')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'The flashing-hand-with-countdown phase length is computed from a pedestrian walking speed of 3.5 ft/s (down from the older 4.0 ft/s after the 2009 MUTCD update; FHWA tightened it again in the 2023 11th Edition for crossings serving older or mobility-limited pedestrians). For a 60-foot crossing, that means at least 60 / 3.5 ≈ 17 seconds of flashing-hand-with-countdown, plus the buffer interval (typically 3 seconds). Add the steady WALK (7 seconds minimum) and the typical pedestrian phase consumes roughly 27 seconds of cycle time per crossing.',
    ),

    h('h2', null, 'The countdown timer is now mandatory'),
    h(
      'p',
      null,
      'Under the MUTCD 11th Edition (December 2023, effective for new and substantially reconstructed signals), pedestrian signal heads with a flashing UPRAISED HAND phase of 7 seconds or more must include a countdown display. In practice, this captures essentially every signalized intersection. Older signal heads that show only the WALKING PERSON / UPRAISED HAND symbols without numeric countdown will need replacement during the next signal upgrade.',
    ),
    h(
      'p',
      null,
      'The countdown timer must be visible from the curb (not just from the middle of the crosswalk), the digits must be 9 inches tall minimum at major intersections, and the digits must count down only during the flashing-hand phase — they must not show during the steady DON\'T WALK or WALK phases.',
    ),

    h('h2', null, 'Accessible pedestrian signals (APS)'),
    h(
      'p',
      null,
      'PROWAG and MUTCD §4I require accessible pedestrian signals at new or replaced signal installations. An APS adds three things to the visual walk signal: an audible WALK indication (typically a rapid tick or a "walk sign is on" speech message), a vibrotactile arrow on the pushbutton that pulses during WALK, and locator tones (the slow chirp from the pushbutton that helps a vision-impaired pedestrian find the unit before pressing it).',
    ),
    h(
      'p',
      null,
      'APS pushbuttons must be located within 5 feet of the crosswalk, between 1.5 and 6 feet from the curb edge, and mounted at 42–48 inches above the walking surface. The pushbutton head must be at least 2 inches in diameter. Each pole carries one pushbutton per crosswalk direction, and the two pushbuttons on a single pole must be at least 10 feet apart so the user can distinguish which crossing they are activating.',
    ),

    h('h2', null, 'When does a contractor replace a walk signal head?'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'New signalized intersection installation.'), ' All new signals get LED pedestrian heads with countdown and APS — no exceptions under the 2023 MUTCD.'),
      h('li', null, h('strong', null, 'Substantial reconstruction'), ' (defined per state DOT engineering manual — typically a paving project that touches the signal, mast-arm replacement, or controller upgrade) — the pedestrian heads upgrade to current spec.'),
      h('li', null, h('strong', null, 'Legacy "Don\'t Walk" word display'), ' (red-orange neon "DON\'T WALK" text without the symbol) — these are obsolete; replace with the symbol-style head at next maintenance.'),
      h('li', null, h('strong', null, 'Failing pixels on an LED head'), ' — once 25%+ of the WALK or HAND pixels are dark, the symbol becomes ambiguous to a pedestrian and the head should be swapped.'),
      h('li', null, h('strong', null, 'Sun-burned amber lens on incandescent units'), ' — incandescent ped heads are no longer manufactured; replacement is LED.'),
    ),

    h('h2', null, 'How to spec a replacement head'),
    h(
      'p',
      null,
      'A modern compliant pedestrian signal head specification looks like this:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Symbol size: '), '16 inch × 18 inch (full-size) for major intersections; 9 inch × 9 inch is no longer compliant for new installations.'),
      h('li', null, h('strong', null, 'Display: '), 'LED, with separate WALKING PERSON and UPRAISED HAND elements plus 9-inch numeric countdown.'),
      h('li', null, h('strong', null, 'Voltage: '), '120 V AC (compatible with existing controller cabinet) or low-voltage if upgrading the cabinet at the same time.'),
      h('li', null, h('strong', null, 'Visor: '), 'Polycarbonate visor, black or industrial green per state DOT.'),
      h('li', null, h('strong', null, 'Compliance: '), 'NEMA TS-2 type signal head with ITE-compliant message; ETL or UL listed.'),
      h('li', null, h('strong', null, 'APS pushbutton: '), 'Polara Navigator-class or equivalent — vibrotactile, locator tone, speech, hardwired to controller.'),
    ),

    h('h2', null, 'Common pedestrian walk signal mistakes'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'WALK phase too short.'), ' Less than 7 seconds is non-compliant; less than 4 seconds is illegal under any MUTCD edition.'),
      h('li', null, h('strong', null, 'Walking speed coded too fast.'), ' Older installations still using 4.0 ft/s create flashing-hand intervals too short for older or mobility-impaired pedestrians.'),
      h('li', null, h('strong', null, 'No countdown timer.'), ' Required on any new install since 2023; required at substantially reconstructed signals.'),
      h('li', null, h('strong', null, 'Pushbutton placement off-spec.'), ' If the APS button is not within 5 feet of the crosswalk, vision-impaired pedestrians cannot reliably locate it before the cycle.'),
      h('li', null, h('strong', null, 'Symbol head obscured by tree branches.'), ' MUTCD §4E.04 requires the head to be visible from the entire approach length of the crosswalk.'),
    ),

    h('h2', null, 'Where to source pedestrian walk signal equipment'),
    h(
      'p',
      null,
      'Traffic Control Supply stocks compliant LED pedestrian signal heads (16x18 with countdown), APS pushbuttons (Polara Navigator and equivalent), and signal-mast hardware for Central NJ contractors. Browse our ',
      h('a', { href: '/category/safety-lighting' }, 'safety lighting & signal catalog'),
      ' or see our ',
      h('a', { href: '/blog/pedestrian-crossing-signal-mutcd-guide' }, 'pedestrian crossing signal MUTCD guide'),
      ' for the broader signalized-intersection rules. For larger replacement projects (multiple intersections, full APS retrofit), ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with the intersection list and existing controller make/model.',
    ),
  ),
  faqs: [
    {
      q: 'What does the WALK symbol on a pedestrian signal mean?',
      a: 'The steady WALKING PERSON (white silhouette) means pedestrians may begin to cross. The phase must last at least 7 seconds under MUTCD §4E.06, and the symbol must remain illuminated long enough for a pedestrian to leave the curb and enter the crosswalk before the flashing-hand phase starts.',
    },
    {
      q: 'What does the flashing UPRAISED HAND with a countdown mean?',
      a: 'It means do not begin to cross. If you are already in the crosswalk, you may continue to the opposite curb. The countdown number is the seconds remaining before the steady-hand DON\'T WALK phase begins. The interval is calculated as crossing distance ÷ 3.5 ft/s.',
    },
    {
      q: 'Are countdown pedestrian signals required?',
      a: 'Yes for new and substantially reconstructed signals under the MUTCD 11th Edition (2023). Any pedestrian signal with a flashing-hand phase of 7 seconds or more must include a countdown display. Older signal heads without countdown timers will need replacement during the next signal upgrade.',
    },
    {
      q: 'What is an accessible pedestrian signal (APS)?',
      a: 'APS adds three features to a standard walk signal: an audible WALK indication (rapid ticks or speech message), a vibrotactile arrow on the pushbutton, and a locator tone so vision-impaired pedestrians can find the pushbutton. PROWAG and MUTCD §4I require APS at new or replaced signal installations.',
    },
    {
      q: 'How tall does the WALK symbol have to be?',
      a: 'For new installations, MUTCD §4E.04 requires a 16-inch × 18-inch full-size pedestrian signal head, with the WALKING PERSON symbol and UPRAISED HAND each occupying the full lens. The countdown numeric must be at least 9 inches tall at major intersections.',
    },
    {
      q: 'Can I cross during the flashing hand?',
      a: 'You may not BEGIN crossing during the flashing UPRAISED HAND. If you are already in the crosswalk when the flashing phase starts, you may continue to the far side — the timer is calibrated to give you enough time at 3.5 ft/s walking speed to reach the opposite curb before the steady-hand phase.',
    },
  ],
  relatedProducts: [
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Pedestrian & Crowd Control', path: '/category/pedestrian-control' },
    { label: 'Accessories & Hardware', path: '/category/accessories-hardware' },
  ],
  relatedArticles: [
    'pedestrian-crossing-signal-mutcd-guide',
    'pedestrian-crossing-signs-mutcd-guide',
    'pedestrian-crosswalk-signs-mutcd',
  ],
}
