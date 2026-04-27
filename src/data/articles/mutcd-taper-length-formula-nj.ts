import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "MUTCD taper length" (~720/mo).
 * Secondary: "taper length formula", "lane closure taper", "NJDOT taper length".
 * AEO wedge: gives the two formulas + a 3-row worked-example table in the
 * answer span — exactly the structure AI engines quote.
 */
export const articleMutcdTaperLengthFormulaNj: Article = {
  slug: 'mutcd-taper-length-formula-nj',
  title: 'MUTCD Taper Length Formula: How to Calculate Lane-Closure Tapers (With NJ DOT Examples)',
  excerpt:
    'Two MUTCD taper formulas, three worked NJ examples, and a quick-reference table for 25–65 mph roads. Plus what NJDOT and municipal permits add on top.',
  metaDescription:
    'MUTCD taper length formula explained — L = WS²/60 (≤40 mph) and L = WS (>40 mph). Worked NJ DOT examples and a 25–65 mph reference table.',
  primaryKeyword: 'MUTCD taper length',
  secondaryKeywords: [
    'taper length formula',
    'MUTCD taper formula',
    'lane closure taper',
    'NJDOT taper length',
    'work zone taper calculation',
  ],
  targetVolume: 720,
  datePublished: '2026-04-27',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'The MUTCD gives you two taper-length formulas. ',
      h('strong', null, 'For posted speeds 40 mph and below: L = (W × S²) ÷ 60.'),
      ' ',
      h('strong', null, 'For speeds above 40 mph: L = W × S.'),
      ' W is the width of the offset (typically the 10–12 ft lane width) and S is the speed limit in mph. On a 12-ft lane at 40 mph that is a 320-ft taper; at 55 mph it is 660 ft. Below are worked examples at NJ-typical speeds and the spacing rules that go with them.',
    ),

    h('h2', null, 'The two formulas, side by side'),
    h(
      'p',
      null,
      'A taper is the diagonal section of cones, drums, or vertical panels that moves traffic out of the closing lane. Taper length L is the longitudinal distance over which that lateral shift happens. The federal MUTCD splits the formula at 40 mph because the underlying design model changes from a kinematic (decel-driven) calculation to a ',
      h('em', null, 'time-headway'),
      ' calculation at higher speeds.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Speeds ≤ 40 mph: L = (W × S²) ÷ 60.'),
      ' Use this whenever the posted speed limit is 40 mph or less. (Some agencies use the prevailing 85th-percentile speed if it is materially higher than the posted limit; check your TCP review notes.)',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Speeds > 40 mph: L = W × S.'),
      ' Use this for all 45+ mph roads.',
    ),
    h(
      'p',
      null,
      'You will see L referenced as "merging taper length" in the MUTCD; downstream tapers, shoulder tapers, and shifting tapers all use fractions of L (1/2 L, 1/3 L, etc.). The full table is in MUTCD Table 6C-3.',
    ),

    h('h2', null, 'Quick-reference table — most common NJ scenarios'),
    h('p', null, 'Round up taper length to the next 5 ft for clean cone spacing. All values assume a standard 12-ft travel lane.'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Speed'),
            h('th', { className: 'text-left p-2 border-b' }, 'Formula'),
            h('th', { className: 'text-left p-2 border-b' }, 'Taper L'),
            h('th', { className: 'text-left p-2 border-b' }, 'Cone spacing in taper'),
            h('th', { className: 'text-left p-2 border-b' }, 'Min cones in taper'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '25 mph'), h('td', { className: 'p-2' }, '12×625÷60'), h('td', { className: 'p-2' }, '125 ft'), h('td', { className: 'p-2' }, '~12.5 ft (round to 15)'), h('td', { className: 'p-2' }, '10')),
          h('tr', null, h('td', { className: 'p-2' }, '30 mph'), h('td', { className: 'p-2' }, '12×900÷60'), h('td', { className: 'p-2' }, '180 ft'), h('td', { className: 'p-2' }, '~18 ft (round to 20)'), h('td', { className: 'p-2' }, '10')),
          h('tr', null, h('td', { className: 'p-2' }, '35 mph'), h('td', { className: 'p-2' }, '12×1225÷60'), h('td', { className: 'p-2' }, '245 ft'), h('td', { className: 'p-2' }, '~25 ft'), h('td', { className: 'p-2' }, '10')),
          h('tr', null, h('td', { className: 'p-2' }, '40 mph'), h('td', { className: 'p-2' }, '12×1600÷60'), h('td', { className: 'p-2' }, '320 ft'), h('td', { className: 'p-2' }, '~32 ft (round to 40)'), h('td', { className: 'p-2' }, '10')),
          h('tr', null, h('td', { className: 'p-2' }, '45 mph'), h('td', { className: 'p-2' }, '12×45'), h('td', { className: 'p-2' }, '540 ft'), h('td', { className: 'p-2' }, '~45 ft'), h('td', { className: 'p-2' }, '12')),
          h('tr', null, h('td', { className: 'p-2' }, '50 mph'), h('td', { className: 'p-2' }, '12×50'), h('td', { className: 'p-2' }, '600 ft'), h('td', { className: 'p-2' }, '~50 ft'), h('td', { className: 'p-2' }, '12')),
          h('tr', null, h('td', { className: 'p-2' }, '55 mph'), h('td', { className: 'p-2' }, '12×55'), h('td', { className: 'p-2' }, '660 ft'), h('td', { className: 'p-2' }, '~55 ft'), h('td', { className: 'p-2' }, '12')),
          h('tr', null, h('td', { className: 'p-2' }, '65 mph'), h('td', { className: 'p-2' }, '12×65'), h('td', { className: 'p-2' }, '780 ft'), h('td', { className: 'p-2' }, '~65 ft'), h('td', { className: 'p-2' }, '12')),
        ),
      ),
    ),
    h('p', null, 'Cone spacing in the taper is L ÷ 10 — round to the next clean number. Through the buffer and activity area, double the spacing.'),

    h('h2', null, 'Worked example 1 — 40 mph county road, single lane closed'),
    h(
      'p',
      null,
      'Setup: Middlesex County collector road, 40 mph posted, two 12-ft lanes, taking the right-hand lane for a sewer cut.',
    ),
    h(
      'ul',
      null,
      h('li', null, 'L = (12 × 40²) ÷ 60 = (12 × 1600) ÷ 60 = ', h('strong', null, '320 ft taper')),
      h('li', null, 'Cones in taper: 320 / 10 = 32 ft spacing → round to 40 ft → ', h('strong', null, '8–10 cones in the taper')),
      h('li', null, '100 ft buffer + 300 ft work area = 400 ft at 80 ft spacing → ', h('strong', null, '5 cones')),
      h('li', null, 'Downstream taper (1/3 L) = ~107 ft → ', h('strong', null, '3 cones')),
      h('li', null, h('strong', null, 'Total: ~17 cones plus 25% spares = 22 cones')),
    ),

    h('h2', null, 'Worked example 2 — 55 mph state route'),
    h(
      'p',
      null,
      'Setup: NJ Route 18, 55 mph posted, three lanes northbound, taking the right lane for paving.',
    ),
    h(
      'ul',
      null,
      h('li', null, 'L = 12 × 55 = ', h('strong', null, '660 ft taper')),
      h('li', null, 'Cones in taper: 660 / 10 = 66 ft → round to 70 ft → ', h('strong', null, '~10 cones')),
      h('li', null, '200 ft buffer + 1500 ft work area = 1700 ft at 140 ft spacing → ', h('strong', null, '~12 cones (or 36-inch drums)')),
      h('li', null, 'At 55+ mph the MUTCD prefers ', h('strong', null, 'Type II vertical panels or 42-inch drums'), ' over cones for the taper itself'),
      h('li', null, 'Plus arrow board, advance signing series, and shadow vehicle for any travel-lane work'),
    ),

    h('h2', null, 'Worked example 3 — 25 mph residential street'),
    h(
      'p',
      null,
      'Setup: residential street in Mercer County, 25 mph, single lane each way, closing one direction for a curb cut.',
    ),
    h(
      'ul',
      null,
      h('li', null, 'L = (12 × 25²) ÷ 60 = (12 × 625) ÷ 60 = ', h('strong', null, '125 ft taper')),
      h('li', null, 'Cones in taper: 125 / 10 = 12.5 ft → round to 15 ft → ', h('strong', null, 'minimum 10 cones (MUTCD floor)')),
      h('li', null, 'On a residential street, plan for one-way alternating traffic with a flagger pair, OR a Type III barricade closure with a posted detour'),
      h('li', null, 'Plus advance signs (W20-1 ROAD WORK AHEAD, W20-7 FLAGGER, etc.)'),
    ),

    h('h2', null, 'When the formula is not enough'),
    h(
      'p',
      null,
      'The MUTCD formula gives a minimum. Several real-world conditions push you longer:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Curves and crests:'), ' if a driver cannot see the start of your taper at full sight-distance, push the taper back so it is visible from a safe stopping distance.'),
      h('li', null, h('strong', null, 'Heavy trucks:'), ' commercial-vehicle stopping distances are longer. On freight-heavy corridors (NJ Turnpike, I-78, Routes 1, 9, 22) add 25–30% to L.'),
      h('li', null, h('strong', null, 'Wet or icy weather:'), ' some agencies require a longer taper in winter. Check the TCP submittal notes.'),
      h('li', null, h('strong', null, 'Adjacent tapers:'), ' if you have two closures back to back, the second taper starts after the first activity area ends, not where the first taper ends.'),
    ),

    h('h2', null, 'What NJDOT and NJTA add on top of MUTCD'),
    h(
      'p',
      null,
      'Federal MUTCD is the floor. NJ-specific overlays you should know:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'NJDOT Standard Construction Details'), ' (currently in the BDC and Standard Specifications) often call out drum spacing rather than cones for tapers on roads ≥45 mph.'),
      h('li', null, h('strong', null, 'NJ Turnpike Authority'), ' (Turnpike + Garden State Parkway) publishes its own work-zone standards that exceed MUTCD on lighting, arrow board placement, and shadow-vehicle requirements. Always verify against the latest NJTA Standard Specifications when working those facilities.'),
      h('li', null, h('strong', null, 'Municipal permits'), ' frequently add overnight setback requirements, longer advance signing, or mandate Type III at the start of every taper. Read the permit, do not assume.'),
    ),

    h('h2', null, 'Common taper mistakes inspectors flag'),
    h(
      'ul',
      null,
      h('li', null, 'Computing taper for a 30-ft lane width when the actual lane is 11 ft (use the offset, not the road width).'),
      h('li', null, 'Skipping the downstream taper. MUTCD calls for one on most lane closures.'),
      h('li', null, 'Compressing the taper to fit a short approach. If your taper does not fit, move the work zone or get a different setup approved — do not just shorten L.'),
      h('li', null, 'Using cones at 55+ mph instead of drums or vertical panels. Cones blow over at highway speeds.'),
      h('li', null, 'Mixing channelizer types within the taper (some cones, some drums). Pick one and stay consistent.'),
    ),

    h('h2', null, 'Need the full setup, not just the math?'),
    h(
      'p',
      null,
      'If you have the taper figured out but you also need an arrow board, advance signing, and a buffer-area gear list, our ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' generates an MUTCD-compliant work-zone layout from a couple of inputs. For same-day delivery on cones, drums, vertical panels, or arrow boards in Central NJ, ',
      h('a', { href: '/quote' }, 'request a quote here'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'What is the MUTCD taper length formula?',
      a: 'For roads with a posted speed of 40 mph or below, L = (W × S²) ÷ 60. For roads above 40 mph, L = W × S. W is the lateral offset in feet (usually the lane width) and S is the speed limit in mph. L is the merging taper length; downstream and shoulder tapers use fractions of L per MUTCD Table 6C-3.',
    },
    {
      q: 'How do I calculate taper length on a 45 mph road in NJ?',
      a: 'On a 45 mph road with a 12-ft lane, L = 12 × 45 = 540 ft. Cone or drum spacing in the taper = L/10 = 54 ft (round to 55). Minimum 12 channelizers in the taper. At 45+ mph many NJ agencies prefer 42-inch drums over cones.',
    },
    {
      q: 'What is the difference between a merging taper and a shifting taper?',
      a: 'A merging taper closes a lane outright — drivers must merge into another lane. Use the full L from the MUTCD formula. A shifting taper jogs traffic into a parallel lane (same number of lanes maintained), and uses ½ L. A downstream taper that opens the closure back up uses 1/3 L.',
    },
    {
      q: 'Do I have to use the posted speed limit, or the actual prevailing speed?',
      a: 'MUTCD allows agencies to use the higher of the posted speed limit or the 85th-percentile prevailing speed. In practice, NJDOT uses the posted speed for design unless a speed study shows the prevailing speed is materially higher (typically 5+ mph). When in doubt, use the higher number — it never hurts to over-design a taper.',
    },
    {
      q: 'Can I shorten the taper if I do not have enough room?',
      a: 'No — not without a formal engineering deviation approved by the road owner. If your taper does not fit, the safer responses are: relocate the work zone, use a different lane configuration (e.g., one-way alternating with flaggers), or add advance warning further upstream and reduce the posted speed via signs (with the agency\'s approval).',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
  ],
  relatedArticles: [
    'how-many-cones-for-lane-closure-nj',
    'uniform-traffic-control-devices-mutcd-guide',
    'type-iii-barricade-vs-type-i-type-ii',
  ],
}
