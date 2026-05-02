import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "yellow caution tape" (~5K/mo, High comp, $10.97 bid).
 * Secondary: blue caution tape, yellow warning tape, caution tape adhesive,
 *            heavy duty caution tape.
 * AEO wedge: defines the OSHA color codes that determine which tape goes where.
 */
export const articleYellowCautionTapeBuyingGuide: Article = {
  slug: 'yellow-caution-tape-buying-guide',
  title: 'Yellow Caution Tape: OSHA Color Codes, Sizes, and What Actually Holds Up',
  excerpt:
    'Yellow caution tape is the OSHA-color-coded "warning, watch your step" tape. Red is for danger, blue is for utilities. Here is the OSHA color reference, the mil thicknesses that hold up, and what to buy.',
  metaDescription:
    'Yellow caution tape, OSHA color codes (yellow=caution, red=danger, blue=utility), mil thicknesses, adhesive vs barrier styles, and what holds up on a real job site.',
  primaryKeyword: 'yellow caution tape',
  secondaryKeywords: [
    'caution tape',
    'yellow warning tape',
    'blue caution tape',
    'caution tape adhesive',
    'heavy duty caution tape',
    'OSHA caution tape colors',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-02',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Yellow caution tape is the OSHA color code for ',
      h('strong', null, '"caution — watch your step / minor hazard."'),
      ' Red tape means "danger — do not enter." Blue tape marks underground or overhead utilities. Pink/magenta is for radiation. Buying yellow when the job calls for red is a recordable safety finding. Below: the OSHA color reference, the mil thicknesses that survive a real job site, the adhesive vs. barrier-tape distinction, and what to actually order.',
    ),

    h('h2', null, 'OSHA color codes — what each color actually signals'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Color'), h('th', { className: 'text-left p-2 border-b' }, 'OSHA meaning'), h('th', { className: 'text-left p-2 border-b' }, 'Common use')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Yellow'), h('td', { className: 'p-2' }, 'Caution — possible hazard'), h('td', { className: 'p-2' }, 'Watch your step, slip risk, minor hazards')),
          h('tr', null, h('td', { className: 'p-2' }, 'Red'), h('td', { className: 'p-2' }, 'Danger — do not enter'), h('td', { className: 'p-2' }, 'Active fall hazard, energized equipment, fire')),
          h('tr', null, h('td', { className: 'p-2' }, 'Blue'), h('td', { className: 'p-2' }, 'Utility / information'), h('td', { className: 'p-2' }, 'Buried utilities (per APWA color code)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Pink/Magenta'), h('td', { className: 'p-2' }, 'Radiation'), h('td', { className: 'p-2' }, 'Radiological hazards (rare, regulated)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Green'), h('td', { className: 'p-2' }, 'Safety / first aid'), h('td', { className: 'p-2' }, 'Safe egress, first-aid station, eye wash')),
        ),
      ),
    ),
    h('p', null, 'These are the OSHA 1910.144 color codes for safety. The APWA 811 utility color code overlaps for blue (potable water and underground utility marking) — different agencies, same color, similar meaning.'),

    h('h2', null, 'Two completely different products both called "caution tape"'),
    h(
      'p',
      null,
      'When a contractor says "caution tape," they could mean one of two things, and they are not interchangeable:',
    ),
    h('h3', null, 'Barrier tape (the unbacked roll)'),
    h(
      'p',
      null,
      'Lightweight 2.0–4.0 mil polyethylene, no adhesive, printed with "CAUTION" repeating. Sold in 1,000 ft rolls, 3" wide. You string it between cones, posts, or fences as a soft visual perimeter. Tears by hand, blows over in real wind, but it is cheap and fast — the most-used tape on construction sites.',
    ),
    h('h3', null, 'Adhesive caution tape (the sticky one)'),
    h(
      'p',
      null,
      'Vinyl or PVC tape with adhesive backing, 2"–6" wide, sold in 36 yd or 60 yd rolls. Used for striping floors (think warehouse aisles), marking edges, or temporary signage. Doesn\'t stretch like barrier tape; sticks like duct tape.',
    ),
    h(
      'p',
      null,
      'When ordering, specify which one. "Caution tape" with no qualifier almost always means the unbacked barrier roll.',
    ),

    h('h2', null, 'Mil thickness — why 2 mil vs. 4 mil matters'),
    h(
      'p',
      null,
      'Barrier tape comes in 1.5, 2, 3, and 4 mil thickness:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '1.5 mil:'), ' Single-day indoor use only. Tears in any breeze.'),
      h('li', null, h('strong', null, '2.0 mil (standard):'), ' The default for short-duration outdoor work. Lasts 2–5 days in mild weather, less in wind.'),
      h('li', null, h('strong', null, '3.0 mil:'), ' Multi-day work zones, stronger UV resistance. Lasts 1–2 weeks outdoors.'),
      h('li', null, h('strong', null, '4.0 mil ("heavy duty"):'), ' Long-duration perimeters, high-wind sites, contractor-yard semi-permanent. Lasts 3+ weeks. Costs roughly 3x the 2-mil price.'),
    ),
    h(
      'p',
      null,
      'Buy the thinnest you can get away with. 2 mil for almost everything; 4 mil for the few jobs that genuinely justify it (utility cuts that run a month, contractor yards that get reset weekly).',
    ),

    h('h2', null, 'Adhesive caution tape — vinyl vs. PVC vs. polyester'),
    h(
      'p',
      null,
      'Floor-marking and surface adhesive tapes split by substrate:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Vinyl (the workhorse):'), ' 5–7 mil thick, sticks to most clean floors. The default for warehouse aisle striping.'),
      h('li', null, h('strong', null, 'PVC (heavier duty):'), ' 8–10 mil. Better for outdoor floor marking, parking-lot perimeters, surfaces that get foot or light vehicle traffic.'),
      h('li', null, h('strong', null, 'Polyester (high-end):'), ' 10+ mil with industrial adhesive. Forklift-rated. Used in distribution centers where vehicles cross the tape repeatedly.'),
    ),
    h(
      'p',
      null,
      'For exterior temporary marking on asphalt or concrete, neither vinyl nor PVC sticks well to dirty/wet surfaces. Surface prep matters more than tape grade — sweep, dry, then apply.',
    ),

    h('h2', null, 'When to use yellow vs. red vs. striped'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Yellow only:'), ' Routine caution — slip risk, "fresh paint," minor step-down, overhead work nearby.'),
      h('li', null, h('strong', null, 'Red only:'), ' Active hazard that prohibits entry. Fall protection lines, energized panel access, demo zones.'),
      h('li', null, h('strong', null, 'Yellow + black stripes (diagonal):'), ' Caution + physical hazard combined — pinch point, moving equipment, sharp edge. The diagonal pattern is OSHA recognized.'),
      h('li', null, h('strong', null, 'Red + white stripes:'), ' Often used for fire-equipment access lanes that must remain clear.'),
    ),

    h('h2', null, 'Underground utility marking — the APWA color code'),
    h(
      'p',
      null,
      'Caution tape is also used as buried-utility warning tape, placed about 12" above the utility during backfill. The American Public Works Association (APWA) color code:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Red — electric power'),
      h('li', null, 'Yellow — gas, oil, steam'),
      h('li', null, 'Orange — communication, alarm, signal'),
      h('li', null, 'Blue — potable water'),
      h('li', null, 'Green — sewer, drain'),
      h('li', null, 'Purple — reclaimed water, irrigation'),
      h('li', null, 'White — proposed excavation extents'),
      h('li', null, 'Pink — temporary survey markings'),
    ),
    h(
      'p',
      null,
      'Yellow tape used as gas-line warning tape is detectable (metallic strip embedded) so future excavators with locators can find it before the third-party hits the line.',
    ),

    h('h2', null, 'Common mistakes'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Using yellow tape where the hazard demands red.'), ' OSHA inspectors will cite this — wrong color code is a recordable safety lapse.'),
      h('li', null, h('strong', null, 'Stringing tape between cones with no tension.'), ' A sagging perimeter does not channel pedestrians; it gets ducked under. Pull tight or use rigid stanchions.'),
      h('li', null, h('strong', null, 'Reusing weathered tape.'), ' Once the print fades the tape no longer reads as a hazard signal — legally still tape, functionally not a warning.'),
      h('li', null, h('strong', null, 'Adhesive tape on a dirty surface.'), ' If the floor is not swept and dry, vinyl stops sticking inside an hour. Surface prep is half the install.'),
    ),

    h('h2', null, 'How much do you need?'),
    h(
      'p',
      null,
      'A 1,000 ft barrier-tape roll covers a perimeter of 250 ft (4-strand) or 1,000 ft (single strand). A typical small contractor uses 1–2 rolls/month. A keep-on-hand minimum is 4 rolls of yellow + 2 rolls of red + 1 of striped.',
    ),
    h(
      'p',
      null,
      'For floor / surface adhesive tape, a 60 yd roll covers about 180 ft of single-strand stripe. Warehouse aisle marking uses 2 rolls per main aisle (both edges).',
    ),

    h('h2', null, 'What to buy first for a small NJ contractor'),
    h(
      'ul',
      null,
      h('li', null, '6× 1,000 ft rolls of 3 mil yellow caution tape (most-used grade)'),
      h('li', null, '2× 1,000 ft rolls of 3 mil red danger tape'),
      h('li', null, '1× 1,000 ft roll of yellow + black diagonal striped'),
      h('li', null, '2× rolls of 4 mil heavy-duty yellow for any job >2 weeks'),
      h('li', null, '1× pack of detectable underground gas-warning tape (yellow with metallic strip) if you do any utility work'),
    ),

    h('h2', null, 'Where to buy caution tape in NJ'),
    h(
      'p',
      null,
      'For Central NJ contractors, browse our ',
      h('a', { href: '/category/signs-sign-stands' }, 'signs and barrier-tape category'),
      '. For volume orders or a starter set, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' — same-day delivery on most tape orders, OSHA color codes always in stock.',
    ),
  ),
  faqs: [
    {
      q: 'What does yellow caution tape mean?',
      a: 'Yellow caution tape is the OSHA color code for "caution — possible hazard or watch your step." It signals a minor hazard that does not prohibit entry but warrants attention. Red tape is for "danger — do not enter," and blue is the APWA color for utility (potable water) marking.',
    },
    {
      q: 'What is the difference between caution tape and barricade tape?',
      a: 'They are the same product. "Caution tape," "barrier tape," "barricade tape," and "warning tape" all describe an unbacked polyethylene roll printed with a hazard message ("CAUTION," "DANGER," "DO NOT ENTER"). It comes in 1.5–4 mil thicknesses and 1,000 ft rolls.',
    },
    {
      q: 'How long does outdoor caution tape last?',
      a: 'Depends on mil thickness and weather. 2 mil tape lasts 2–5 days outdoors in mild conditions; 3 mil holds 1–2 weeks; 4 mil heavy-duty handles 3+ weeks. Wind cuts these times in half. UV exposure fades the print before the tape itself fails.',
    },
    {
      q: 'Is yellow caution tape OSHA approved?',
      a: 'OSHA does not "approve" specific brands but does specify the color code in 1910.144 — yellow signals caution / minor hazard, red signals danger. Any standard yellow caution tape with legible print and proper width meets the OSHA color requirement. The cite-magnet is using the wrong color, not the wrong brand.',
    },
    {
      q: 'How much yellow caution tape is in a roll?',
      a: 'Standard barrier-tape rolls are 1,000 ft long and 3" wide. Adhesive floor-marking tapes are typically 36 yd (108 ft) or 60 yd (180 ft) per roll, in widths of 2", 3", 4", or 6".',
    },
  ],
  relatedProducts: [
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'crowd-control-barriers-buying-guide',
    'pedestrian-crossing-signs-mutcd-guide',
    'traffic-control-signs-mutcd-guide',
  ],
}
