import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "red danger tape" (~500/mo, High comp, $49.02 bid).
 * Secondary: red caution tape, red barricade tape, danger tape, red warning tape.
 * Commercial comparison: red vs yellow vs white tape, ANSI Z535 color rules,
 * what to buy for fire/electrical/asbestos vs general construction.
 */
export const articleRedDangerTapeGuide: Article = {
  slug: 'red-danger-tape-guide',
  title: 'Red Danger Tape: What It Means, When to Use It, and What to Buy (2026)',
  excerpt:
    'Red danger tape is the highest-severity barrier tape in the ANSI Z535 color hierarchy — it signals immediate danger, not general caution. Here is the spec, the legal use cases, and what to stock if you handle electrical, fire, or confined-space work in NJ.',
  metaDescription:
    'Red danger tape explained — ANSI Z535 color meaning, electrical/fire/confined-space use cases, red vs yellow vs white tape, and what to buy for NJ contractors.',
  primaryKeyword: 'red danger tape',
  secondaryKeywords: [
    'red caution tape',
    'red barricade tape',
    'red warning tape',
    'danger tape red',
    'red safety tape',
    'red hazard tape',
  ],
  targetVolume: 500,
  datePublished: '2026-05-16',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'Red danger tape signals IMMEDIATE danger — entry can cause death or serious injury.'),
      ' It sits one level above yellow CAUTION tape in the ANSI Z535.1 color hierarchy and is reserved for fire scenes, energized electrical work, asbestos containment, confined-space entry, and any zone where "do not enter" is the only safe instruction. If a worker would have to stop and read a sign before deciding whether to step over the line, red is wrong. Use red when crossing the tape is the hazard.',
    ),

    h('h2', null, 'What red means under ANSI Z535'),
    h(
      'p',
      null,
      'ANSI Z535.1 (the American National Standard for safety colors) assigns four signal-word colors that propagate from signs into barricade tape, floor marking, and lockout devices. The hierarchy matters: a crew that sees red has to react differently than a crew that sees yellow. OSHA 1910.144 references the same color scheme for fixed industrial signage, which is why most jobsite tape stocks follow ANSI Z535 even though it is a consensus standard, not a regulation.',
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
            { className: 'border-b' },
            h('th', { className: 'text-left p-2' }, 'Color'),
            h('th', { className: 'text-left p-2' }, 'Signal word'),
            h('th', { className: 'text-left p-2' }, 'Meaning'),
            h('th', { className: 'text-left p-2' }, 'Typical use'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Red'),
            h('td', { className: 'p-2' }, 'DANGER'),
            h('td', { className: 'p-2' }, 'Hazard will cause death or serious injury'),
            h('td', { className: 'p-2' }, 'Fire, energized electrical, confined space'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Orange'),
            h('td', { className: 'p-2' }, 'WARNING'),
            h('td', { className: 'p-2' }, 'Hazard could cause death or serious injury'),
            h('td', { className: 'p-2' }, 'Pinch points, exposed machinery, hot work'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Yellow'),
            h('td', { className: 'p-2' }, 'CAUTION'),
            h('td', { className: 'p-2' }, 'Hazard could cause minor or moderate injury'),
            h('td', { className: 'p-2' }, 'Trip hazards, general construction perimeter'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Magenta/yellow'),
            h('td', { className: 'p-2' }, 'RADIATION'),
            h('td', { className: 'p-2' }, 'Ionizing-radiation hazard'),
            h('td', { className: 'p-2' }, 'X-ray, radiography crews'),
          ),
        ),
      ),
    ),

    h('h2', null, 'When red danger tape is required (not just preferred)'),
    h(
      'p',
      null,
      'A handful of OSHA standards and NFPA codes either name red specifically or describe a condition where red is the only ANSI-aligned choice. If your job falls into one of these, switching to yellow caution tape is a citable error in an audit:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'NFPA 70E / energized electrical work: '),
        'arc-flash boundaries and shock approach boundaries are marked with red rope or tape per typical employer programs. The hazard is potentially fatal, and DANGER is the correct signal word.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'OSHA 1910.146 (permit-required confined spaces): '),
        'the entry perimeter must be marked with a sign reading "DANGER PERMIT-REQUIRED CONFINED SPACE." Red barricade tape is the matching field-deployable barrier when a sign post is not practical.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'NFPA 1: '),
        'fire scenes and structural-collapse perimeters are red-taped while overhaul or shoring is in progress. Crossing the line risks falling debris.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'OSHA 1926.1101 (asbestos): '),
        'regulated areas around Class I/II abatement must be demarcated. Red DANGER tape is used because asbestos inhalation is a serious-injury exposure.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Lockout/tagout staging areas: '),
        'where a partially de-energized panel has live conductors still exposed, the access lane is taped red until the LOTO sequence is verified.',
      ),
    ),

    h('h2', null, 'Red danger tape vs yellow caution tape vs white "barrier" tape'),
    h(
      'p',
      null,
      'Most contractors run yellow CAUTION tape by default. Red is a step up and white is a step down. Picking right matters because workers calibrate behavior to color over time — if every line on every job is red, the signal stops landing on the day it actually matters.',
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
            { className: 'border-b' },
            h('th', { className: 'text-left p-2' }, 'Tape'),
            h('th', { className: 'text-left p-2' }, 'Worker interpretation'),
            h('th', { className: 'text-left p-2' }, 'Typical job'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Red DANGER'),
            h('td', { className: 'p-2' }, 'Do not enter, period'),
            h('td', { className: 'p-2' }, 'Fire, live electrical, confined space, asbestos'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Yellow CAUTION'),
            h('td', { className: 'p-2' }, 'Use caution if entry is necessary'),
            h('td', { className: 'p-2' }, 'General work zone, trip hazard, fresh paint'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'White barricade'),
            h('td', { className: 'p-2' }, 'Wayfinding / general perimeter'),
            h('td', { className: 'p-2' }, 'Event lanes, parking lot rope-off, low-risk staging'),
          ),
        ),
      ),
    ),

    h('h2', null, 'Material spec — what to look for on the roll'),
    h(
      'p',
      null,
      'Two layers of spec matter: the resin and the print legibility. Cheap rolls fail one or both.',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Mil thickness: '),
        '2 mil polyethylene is the standard for non-adhesive barricade tape. 4 mil is heavier-duty for jobs that run multiple weeks outdoors. Below 2 mil tears in the wind.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Resin: '),
        'low-density polyethylene (LDPE) stretches and conforms around corners. High-density polyethylene (HDPE) is stiffer and snaps. Most red danger tape is LDPE for that reason.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Print: '),
        'the word "DANGER" in 2.5-inch tall black letters, repeated every 20–24 inches, is the legibility threshold for being read from ~20 feet away in daylight. Anything smaller is a cosmetic-grade roll.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Width: '),
        '3 in is the standard barricade-tape width. 6 in is used for high-visibility perimeters and reads from twice the distance.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Length: '),
        '1,000 ft rolls are the contractor-grade unit. 200 ft rolls are home-center sizing and run out fast.',
      ),
    ),

    h('h2', null, 'Red DANGER vs red BARRICADE vs red WARNING — print variants'),
    h(
      'p',
      null,
      'Red tape ships under three different printed legends and they are not interchangeable. Pick by the worst-case hazard at the line, not by what is in stock:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, '"DANGER" '),
        '— ANSI Z535 signal word for "will cause death or serious injury." Red background, black text. Default for fire, electrical, asbestos.',
      ),
      h(
        'li',
        null,
        h('strong', null, '"DANGER — DO NOT ENTER" '),
        '— same severity, with an explicit instruction. Preferred for confined-space and crime-scene-adjacent applications.',
      ),
      h(
        'li',
        null,
        h('strong', null, '"DANGER — KEEP OUT" '),
        '— security/perimeter framing. Common on demolition and partial-collapse sites.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Red "BARRICADE" '),
        '— solid red with no signal word. Generic perimeter tape used in industrial plants with house-color conventions. Confusing on a general jobsite where workers expect ANSI signal words.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Red "WARNING" '),
        '— mismatched: ANSI Z535 assigns orange to WARNING, not red. Avoid this combination because workers reading the color expect DANGER severity but the word says one tier down.',
      ),
    ),

    h('h2', null, 'How much red danger tape to keep on the truck'),
    h(
      'p',
      null,
      'Red is a low-volume, high-stakes line item. Most NJ small contractors burn through 5–10× as much yellow caution tape as red. Suggested kit for a 5–15 person crew:',
    ),
    h(
      'ul',
      null,
      h('li', null, '2× 1,000 ft rolls red "DANGER" 3 in × 2 mil (always on the truck)'),
      h('li', null, '1× 1,000 ft roll red "DO NOT ENTER" for confined-space jobs'),
      h('li', null, '1× 1,000 ft roll red "KEEP OUT" for demolition and partial-collapse perimeters'),
      h('li', null, 'Compare yellow caution tape stock: most crews carry 8–12 rolls'),
    ),

    h('h2', null, 'What red danger tape is NOT'),
    h(
      'p',
      null,
      'Two important boundaries:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'It is not a physical barrier. '),
        'Tape stops people who recognize the signal. It does not stop a forklift, a kid on a bike, or anyone who cannot read the legend. For physical exclusion, run ',
        h('a', { href: '/blog/type-iii-barricade-vs-type-i-type-ii' }, 'Type III barricades'),
        ' or ',
        h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'water-filled barriers'),
        ' behind the tape.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'It is not a substitute for a sign. '),
        'Confined-space, asbestos, and arc-flash boundaries all require a printed sign in addition to the tape. The tape is the field-deployable supplement, not the documentation.',
      ),
    ),

    h('h2', null, 'Where to buy red danger tape in NJ'),
    h(
      'p',
      null,
      'We stock 3-inch red DANGER and red DO NOT ENTER tape on the truck for same-day Central NJ delivery. Pair it with the ',
      h('a', { href: '/category/signs-sign-stands' }, 'signs and sign stands'),
      ' category for the required printed warnings, or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' for a full electrical/confined-space tape and sign kit. If you are not sure which color tape fits a specific job, our ',
      h('a', { href: '/assistant' }, 'Assistant'),
      ' will walk you through the ANSI Z535 hierarchy by hazard.',
    ),
  ),
  faqs: [
    {
      q: 'Is red danger tape OSHA-required?',
      a: 'OSHA does not name barricade-tape colors directly except for radiation (magenta/yellow). Red DANGER is required indirectly through ANSI Z535.1 — which OSHA recognizes — for any hazard that "will cause death or serious injury." Energized electrical, fire, confined space, and asbestos all fall under that severity tier, so red is the compliant choice.',
    },
    {
      q: 'What is the difference between red danger tape and red caution tape?',
      a: '"Red caution tape" is a misnomer. CAUTION is the ANSI Z535 signal word for yellow tape; it describes "minor or moderate injury" hazards. Red tape should carry the word DANGER (or DO NOT ENTER, or KEEP OUT). If you see a roll printed "red caution," it is a marketing label, not an ANSI-aligned product — treat it as red DANGER on the job.',
    },
    {
      q: 'Can I use red danger tape for a general construction perimeter?',
      a: 'No, and it backfires. If every site perimeter is red, workers stop reacting to red specifically — they treat it the same as yellow. Save red for boundaries where crossing the line is the hazard (live electrical, confined space, asbestos). Use yellow CAUTION for general work-zone perimeter.',
    },
    {
      q: 'How long does red danger tape last outdoors?',
      a: 'Standard 2 mil LDPE red tape holds color and tear strength for about 30 days in NJ summer sun and 60–90 days the rest of the year. UV-stabilized 4 mil rolls double that. For closures running longer than a month, run the tape behind Type III barricades or replace it every 30 days.',
    },
    {
      q: 'Is reflective red danger tape worth the extra cost?',
      a: 'Only for night work. Standard red barricade tape is not reflective and disappears under truck lights. If your crew works after dark on perimeters with vehicle traffic, reflective red tape (or red tape strung between barricades with Type B flashing lights) is worth the 3–4× price premium.',
    },
    {
      q: 'Does red danger tape work for arc-flash boundaries?',
      a: 'Yes, in combination with a sign. NFPA 70E does not require a specific color, but most arc-flash programs use red rope or tape because the hazard severity matches DANGER. The boundary must also be documented with an arc-flash label on the equipment per NFPA 70E Article 130.5.',
    },
  ],
  relatedProducts: [
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
    { label: 'Fencing & Site Safety', path: '/category/fencing-site-safety' },
  ],
  relatedArticles: [
    'danger-tape-vs-caution-tape-guide',
    'construction-caution-tape-buying-guide',
    'yellow-caution-tape-buying-guide',
  ],
}
