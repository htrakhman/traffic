import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "danger tape" (~500/mo, High comp, $21.37 bid).
 * FAQ-heavy AEO format — answers the basic confusion of danger tape vs.
 * caution tape vs. barricade tape, OSHA color codes, and what to actually buy
 * for a work zone. Sister piece to caution-tape and yellow-caution-tape guides.
 */
export const articleDangerTapeVsCautionTapeGuide: Article = {
  slug: 'danger-tape-vs-caution-tape-guide',
  title: 'Danger Tape vs. Caution Tape: OSHA Colors, ANSI Z535, and Which to Use',
  excerpt:
    'Danger tape (red) and caution tape (yellow) are not interchangeable — OSHA and ANSI Z535 give them different meanings. Here is what each color signals, when each is required, and what to buy.',
  metaDescription:
    'Danger tape (red) vs. caution tape (yellow) explained. OSHA 29 CFR 1910.144, ANSI Z535 color codes, when each is required, and what to buy for work zones.',
  primaryKeyword: 'danger tape',
  secondaryKeywords: [
    'red danger tape',
    'danger barricade tape',
    'osha danger tape',
    'danger tape vs caution tape',
    'red barricade tape',
    'do not enter tape',
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
        'Danger tape (red, "DANGER — DO NOT ENTER") signals an immediate hazard with serious or fatal consequences. Caution tape (yellow, "CAUTION") signals a hazard requiring care but not immediate danger.',
      ),
      ' The colors are not branding — they map to OSHA 29 CFR 1910.144 and ANSI Z535.1, and using the wrong one on a job site can fail an inspection. This guide covers the distinction, when each is required, and what to stock.',
    ),

    h('h2', null, 'The OSHA color code'),
    h(
      'p',
      null,
      'OSHA 29 CFR 1910.144 sets the safety color code that all subsequent work-zone tapes inherit:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Red:'), ' Identifies fire-protection equipment, danger, and emergency stops. Used for "DANGER" tape and signage where immediate hazards exist.'),
      h('li', null, h('strong', null, 'Yellow:'), ' Identifies caution and physical hazards (slipping, tripping, striking-against). Used for "CAUTION" tape, floor markings, and physical hazard warnings.'),
    ),
    h(
      'p',
      null,
      'ANSI Z535.1 expands this with finer gradations — orange for warning (between caution and danger), magenta/yellow for radiation hazards, green for safety/first-aid. For barricade tape on a typical work zone you will see red, yellow, and the orange/black "warning" tier.',
    ),

    h('h2', null, 'When to use danger tape (red)'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Open excavations and trenches'), ' deeper than 4 ft, especially before shoring goes in. The trench is an immediate fall/cave-in hazard with potentially fatal consequences — that is the textbook DANGER scenario.'),
      h('li', null, h('strong', null, 'Energized electrical hazards.'), ' Open panel boxes, overhead live lines, downed conductors. Pair with proper LOTO procedures.'),
      h('li', null, h('strong', null, 'Confined-space entries'), ' before a permit is signed. Red tape signals the space is not entered yet.'),
      h('li', null, h('strong', null, 'Asbestos / chemical / biological hazards'), ' where exposure is dangerous. Red plus the appropriate hazard pictogram.'),
      h('li', null, h('strong', null, 'Crush zones'), ' under suspended loads, around demolition pour-out areas, behind backing equipment.'),
    ),

    h('h2', null, 'When to use caution tape (yellow)'),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Wet floors, fresh concrete, painted lines.'),
        ' Slip/trip hazards where care is needed but the hazard is not life-threatening.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Material staging perimeters.'),
        ' Stacked palettes, gravel piles, lumber drops — keep foot traffic out without implying immediate danger.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Low-overhead obstructions, scaffold uprights, projecting rebar.'),
        ' Striking-against hazards at head/leg level.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'General work-zone perimeters'),
        ' on jobs without imminent serious-harm risk. The default for "stay out, work in progress."',
      ),
    ),
    h(
      'p',
      null,
      'For a deeper dive on yellow-specific applications and the "CAUTION CONSTRUCTION AREA" variant, see ',
      h('a', { href: '/blog/yellow-caution-tape-buying-guide' }, 'yellow caution tape buying guide'),
      '.',
    ),

    h('h2', null, 'The grey area: barricade tape vs. barrier tape'),
    h(
      'p',
      null,
      'You will see "barricade tape" and "barrier tape" used interchangeably with both danger and caution tape. They mean roughly: a 3-inch-wide non-adhesive plastic ribbon strung between stakes or barricades to delineate an area. The terminology is interchangeable; the COLOR is what carries the regulatory meaning.',
    ),

    h('h2', null, 'Material specs that actually matter'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Spec'),
            h('th', { className: 'text-left p-2 border-b' }, 'Light-duty'),
            h('th', { className: 'text-left p-2 border-b' }, 'Standard'),
            h('th', { className: 'text-left p-2 border-b' }, 'Heavy-duty'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Thickness (mil)'), h('td', { className: 'p-2' }, '1.5'), h('td', { className: 'p-2' }, '2.0'), h('td', { className: 'p-2' }, '4.0–6.0')),
          h('tr', null, h('td', { className: 'p-2' }, 'Width'), h('td', { className: 'p-2' }, '3 in'), h('td', { className: 'p-2' }, '3 in'), h('td', { className: 'p-2' }, '3 in')),
          h('tr', null, h('td', { className: 'p-2' }, 'Roll length'), h('td', { className: 'p-2' }, '1,000 ft'), h('td', { className: 'p-2' }, '1,000 ft'), h('td', { className: 'p-2' }, '500–1,000 ft')),
          h('tr', null, h('td', { className: 'p-2' }, 'Tensile strength'), h('td', { className: 'p-2' }, '~10 lb'), h('td', { className: 'p-2' }, '~18 lb'), h('td', { className: 'p-2' }, '~35 lb')),
          h('tr', null, h('td', { className: 'p-2' }, 'Best use'), h('td', { className: 'p-2' }, 'Indoor / short-term'), h('td', { className: 'p-2' }, 'Most outdoor jobs'), h('td', { className: 'p-2' }, 'Multi-day, windy')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'For one-day perimeters indoors, 1.5-mil is fine. For outdoor work-zone perimeters that need to last a week through wind and rain, 4-mil is the standard. Avoid 1.5-mil outdoors — it shreds in the first 30 mph gust and you will be re-stringing it daily.',
    ),

    h('h2', null, 'Printing — wording that meets ANSI Z535.4'),
    h(
      'p',
      null,
      'ANSI Z535.4 specifies the signal word, color, and pictogram pairing for safety signs and tape. Standard wording you will see in the field:',
    ),
    h(
      'ul',
      null,
      h('li', null, '"DANGER — DO NOT ENTER" (red, white text)'),
      h('li', null, '"DANGER — HIGH VOLTAGE" (red, white or black text, pictogram)'),
      h('li', null, '"CAUTION" (yellow, black text)'),
      h('li', null, '"CAUTION — CONSTRUCTION AREA" (yellow, black text)'),
      h('li', null, '"WARNING" (orange, black text — between caution and danger)'),
    ),

    h('h2', null, 'What to stock'),
    h(
      'p',
      null,
      'For a small contractor outfitting a kit:',
    ),
    h(
      'ul',
      null,
      h('li', null, '6× rolls 3-in × 1,000-ft yellow CAUTION tape, 2-mil (the everyday workhorse)'),
      h('li', null, '4× rolls 3-in × 1,000-ft red DANGER — DO NOT ENTER tape, 2-mil'),
      h('li', null, '2× rolls 3-in × 1,000-ft red DANGER — HIGH VOLTAGE tape (when electrical work is in scope)'),
      h('li', null, '1× box of metal stake-flags or small T-stakes for stringing tape between objects'),
      h('li', null, 'Heavy-duty 4-mil rolls for any deployment longer than 3 days outdoors'),
    ),

    h('h2', null, 'Where to buy danger tape and caution tape in NJ'),
    h(
      'p',
      null,
      'Browse our ',
      h('a', { href: '/category/cones-drums' }, 'cones, drums, and channelizers category'),
      ' for barricade-tape stock alongside the cones and stakes you usually deploy with it. For a custom kit sized to a specific job, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' — same-day Central NJ delivery.',
    ),
  ),
  faqs: [
    {
      q: 'What is the difference between danger tape and caution tape?',
      a: 'Color and severity. Red DANGER tape signals an immediate hazard with serious or fatal consequences (open trenches, energized electrical, confined spaces). Yellow CAUTION tape signals a hazard requiring care but not immediate danger (wet floors, material staging, low overheads). The colors are mandated by OSHA 29 CFR 1910.144, not branding.',
    },
    {
      q: 'Is danger tape the same as red barricade tape?',
      a: 'Yes — "danger tape," "red barricade tape," and "DANGER — DO NOT ENTER tape" all refer to the same product: a 3-inch-wide non-adhesive red plastic ribbon with black DANGER lettering. Width is the standard 3 inches; thickness ranges from 1.5 to 6 mil depending on duty.',
    },
    {
      q: 'Does OSHA require danger tape on construction sites?',
      a: 'OSHA does not mandate the tape itself, but 29 CFR 1910.144 mandates the color code: red for danger, yellow for caution. If you are using barricade tape to mark a hazard, OSHA expects the color to match the hazard severity. Inspectors flag yellow tape on an open trench as inadequate hazard communication.',
    },
    {
      q: 'How long does barricade tape last outdoors?',
      a: 'Light-duty 1.5-mil tape lasts 1–3 days outdoors before sun and wind shred it. Standard 2-mil lasts about a week. Heavy-duty 4-mil lasts 30+ days. For deployments longer than 3 days, use 4-mil or switch to a more rigid device — A-frame barricades, plastic chain, or ribbon-on-stand.',
    },
    {
      q: 'What does "WARNING" tape (orange) mean?',
      a: 'Orange WARNING tape sits between yellow CAUTION and red DANGER on the ANSI Z535 severity scale. It signals a hazard that could cause death or serious injury if not avoided — less imminent than DANGER, more serious than CAUTION. Common uses: striking-against hazards near moving equipment, work in progress with elevated risk, transitional zones near a danger area.',
    },
    {
      q: 'Can I use danger tape as a fall-protection barrier?',
      a: 'No. Barricade tape — red or yellow — is a hazard-communication device, not a fall-protection device. OSHA 29 CFR 1926.502 requires guardrail systems, safety net systems, or personal fall-arrest systems for fall protection at 6 ft and higher. Tape cannot substitute for a guardrail at an unprotected edge.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Request a custom quote', path: '/quote' },
  ],
  relatedArticles: [
    'yellow-caution-tape-buying-guide',
    'construction-caution-tape-buying-guide',
    'traffic-barricades-pillar-guide',
  ],
}
