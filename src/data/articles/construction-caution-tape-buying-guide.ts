import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "construction caution tape" (~5000/mo, High comp, $16.02 bid).
 * Commercial comparison structure — pits caution tape against barricade
 * tape, danger tape, and OSHA-marked tape so a contractor can buy the
 * right roll for the job. Distinct from yellow-caution-tape-buying-guide
 * (color-specific) by anchoring around construction-site use cases.
 */
export const articleConstructionCautionTapeBuyingGuide: Article = {
  slug: 'construction-caution-tape-buying-guide',
  title: 'Construction Caution Tape: Caution vs. Barricade vs. Danger — Which Roll to Buy',
  excerpt:
    'Construction sites use four different colors of plastic ribbon — yellow CAUTION, red DANGER, magenta RADIATION, and orange BARRICADE — and each has a specific OSHA meaning. Here is how to choose the right tape for the hazard, and what specs separate a roll that lasts a season from one that snaps in a week.',
  metaDescription:
    'Construction caution tape buying guide: yellow vs. red vs. orange tape meanings under OSHA, mil thickness, lengths, when to use barricade tape vs. caution tape, and what to stock on a job truck.',
  primaryKeyword: 'construction caution tape',
  secondaryKeywords: [
    'caution tape construction',
    'barricade tape',
    'danger tape',
    'osha caution tape',
    'construction barrier tape',
    'high visibility caution tape',
    'yellow construction tape',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-06',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'On a construction site, ',
      h('strong', null, 'caution tape (yellow) and danger tape (red) are NOT interchangeable'),
      '. OSHA 1926.200 ties color to hazard severity: yellow means "be aware, proceed carefully," red means "do not enter, life-threatening hazard," and the wrong color in a citation can earn the GC a fine even if the area was actually cordoned off. This guide walks the four colors, the spec sheet that matters (mil thickness, length, weather rating), and the small list of rolls a working crew should keep on the truck.',
    ),

    h('h2', null, 'OSHA color code — what each tape legally means'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Color'), h('th', { className: 'text-left p-2 border-b' }, 'Wording'), h('th', { className: 'text-left p-2 border-b' }, 'OSHA meaning'), h('th', { className: 'text-left p-2 border-b' }, 'Typical use')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Yellow'), h('td', { className: 'p-2' }, 'CAUTION'), h('td', { className: 'p-2' }, 'Be aware, hazard ahead, proceed carefully'), h('td', { className: 'p-2' }, 'Wet floors, low-clearance, recently poured concrete, trip hazards')),
          h('tr', null, h('td', { className: 'p-2' }, 'Red'), h('td', { className: 'p-2' }, 'DANGER'), h('td', { className: 'p-2' }, 'Do not enter, life-threatening hazard'), h('td', { className: 'p-2' }, 'Open trenches, fall edges, energized lines, confined-space entry')),
          h('tr', null, h('td', { className: 'p-2' }, 'Orange'), h('td', { className: 'p-2' }, 'BARRICADE / CONSTRUCTION AREA'), h('td', { className: 'p-2' }, 'Active construction zone, public exclusion'), h('td', { className: 'p-2' }, 'Site perimeters, sidewalk closures, work-zone delineation')),
          h('tr', null, h('td', { className: 'p-2' }, 'Magenta'), h('td', { className: 'p-2' }, 'RADIATION'), h('td', { className: 'p-2' }, 'Radiation hazard'), h('td', { className: 'p-2' }, 'X-ray inspection, density gauge, NDT areas')),
        ),
      ),
    ),

    h('h2', null, 'Caution tape vs. barricade tape — the most-confused pair'),
    h(
      'p',
      null,
      'These look similar at a glance but are not the same product:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Caution tape:'), ' Yellow, 1.5–2.0 mil polyethylene, lighter, designed for short-duration interior or low-impact use. Snaps easily under wind or contact. Use for a wet-floor roping, a ladder zone, a mid-day work area you will tear down before sunset.'),
      h('li', null, h('strong', null, 'Barricade tape:'), ' Orange or red-and-black, 3.0–4.0 mil polyethylene, heavier, weather-resistant for multi-day deployment. Use for site perimeters, sidewalk closures, overnight cordons.'),
      h('li', null, h('strong', null, 'Underground utility tape:'), ' Detectable (with metal foil core) — buried 12 in above pipe/cable so a future excavator hits the tape before the asset. Different category but often shelved next to the others; do not confuse.'),
    ),
    h(
      'p',
      null,
      'A common error: cordoning a multi-day work zone with thin yellow caution tape. By morning the wind has snapped it in three places and pedestrians are walking through. Use orange barricade tape for any cordon that needs to last past the end of the shift.',
    ),

    h('h2', null, 'Mil thickness — the spec that decides how long the roll lasts'),
    h(
      'p',
      null,
      'Caution and barricade tape is sold by mil (thousandth of an inch) thickness. Real-world durability ladder:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '1.5 mil:'), ' bargain rolls. Snap in light wind, tear if a worker brushes them. Indoor / one-day use only.'),
      h('li', null, h('strong', null, '2.0 mil:'), ' the standard. Will hold for a working day outdoors in calm conditions; replace daily if windy.'),
      h('li', null, h('strong', null, '3.0 mil:'), ' the contractor-grade roll. Survives a few days outdoors, will hold through light rain and sustained 15 mph wind.'),
      h('li', null, h('strong', null, '4.0+ mil:'), ' barricade tape. Multi-week deployment, withstands moderate wind and weather. Pulls hard against staples without ripping. Costs 3–4× a 2.0 mil roll but lasts 10× longer in field use.'),
    ),

    h('h2', null, 'Length — the math contractors get wrong'),
    h(
      'p',
      null,
      'Standard rolls are 1,000 ft. A common ordering mistake: assuming one roll covers a perimeter that is much longer in reality. Quick math:',
    ),
    h(
      'ul',
      null,
      h('li', null, '100 ft × 100 ft site perimeter = 400 ft of perimeter ≈ half a roll'),
      h('li', null, '50 ft sidewalk closure with two-line cordon (top and bottom) = 100 ft'),
      h('li', null, 'Multi-floor jobsite stairwell rope-off = roughly 50 ft per floor × number of floors'),
    ),
    h(
      'p',
      null,
      'Order in cases of 12 rolls — case pricing is typically 30–40% better per roll than buying single rolls, and a working crew burns through one roll a day on a busy site.',
    ),

    h('h2', null, 'When NOT to use caution tape at all'),
    h(
      'p',
      null,
      'Tape is a soft barrier. It signals presence; it does not stop entry. OSHA expects HARD barricades — steel-frame Type II/III barricades, water-filled barriers, or fence — anywhere there is a real fall, vehicle-strike, or excavation hazard. Specifically:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Excavations deeper than 6 ft:'), ' OSHA 1926.652 requires a hard barricade or fence, not tape'),
      h('li', null, h('strong', null, 'Open-edge fall protection:'), ' guardrails or hard barricade — tape alone is a citation'),
      h('li', null, h('strong', null, 'Pedestrian sidewalk closures longer than 8 hours:'), ' MUTCD Part 6 requires barricades, not just tape'),
      h('li', null, h('strong', null, 'Vehicle exclusion at active loading zones:'), ' use cones, barrels, or barricades — tape will snap on first vehicle contact'),
    ),

    h('h2', null, 'How to deploy tape so it stays up'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Anchor every 8–10 ft:'), ' tape stretched between two points 50 ft apart will sag and tear on the first wind gust. Use traffic cones, sign posts, or temporary stakes at regular intervals.'),
      h('li', null, h('strong', null, 'Twist the tape every few feet:'), ' a flat tape sheet acts like a sail. A twisted ribbon sheds wind and lasts much longer.'),
      h('li', null, h('strong', null, 'Two-line cordon for higher visibility:'), ' a single line at waist height is missed by half of pedestrians. Run two lines (knee + chest height) at busy sites.'),
      h('li', null, h('strong', null, 'Pair with a sign:'), ' a yellow tape with no posted message is ambiguous. Add a "DO NOT ENTER" or "WET CONCRETE" placard at the entrance to every cordon.'),
    ),

    h('h2', null, 'What a working crew should keep on the truck'),
    h(
      'ul',
      null,
      h('li', null, '4× 1,000 ft yellow caution tape (2.0 mil) — daily use'),
      h('li', null, '4× 1,000 ft orange barricade tape (3.0 mil) — multi-day cordons'),
      h('li', null, '2× 1,000 ft red danger tape (3.0 mil) — fall edges, trenches'),
      h('li', null, '1× detectable underground utility tape — for any pipe / cable trench'),
      h('li', null, 'Cone-mount tape brackets — for fast deploy off cones without staples'),
    ),

    h('h2', null, 'Where to buy construction caution tape in NJ'),
    h(
      'p',
      null,
      'Browse our ',
      h('a', { href: '/category/cones-drums' }, 'cones and channelizers category'),
      ' for caution tape, barricade tape, and tape-mounting brackets that pair with our cone and barricade lineup. For a job-sized order with same-day delivery in Central NJ, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' or use the ',
      h('a', { href: '/assistant' }, 'AI Assistant'),
      ' to spec a tape + barricade + sign package for your specific hazard.',
    ),
  ),
  faqs: [
    {
      q: 'What is the difference between caution tape and danger tape?',
      a: 'Caution tape is yellow and means "proceed carefully — hazard ahead." Danger tape is red and means "do not enter — life-threatening hazard." OSHA 1926.200 codifies the colors; using yellow when red is required can result in a citation even if the area was actually cordoned.',
    },
    {
      q: 'How thick should construction caution tape be?',
      a: 'For daily indoor or low-impact outdoor use, 2.0 mil polyethylene is the standard. For multi-day site cordons, sidewalk closures, or any windy outdoor location, step up to 3.0 mil barricade tape. Cheap 1.5 mil rolls snap in the first wind gust and waste more time than they save.',
    },
    {
      q: 'Can I use caution tape for fall protection or trench cordons?',
      a: 'No. OSHA requires hard barricades — guardrails, fence, or steel-frame barricades — for any open-edge fall hazard or excavation deeper than 6 ft. Tape signals presence but does not stop entry, and using only tape where a hard barricade is required is a citable violation.',
    },
    {
      q: 'How far does one roll of construction caution tape go?',
      a: 'Standard rolls are 1,000 ft. A 100 ft × 100 ft site perimeter is 400 ft of cordon, or roughly half a roll. Order by the case (12 rolls) for case pricing — busy sites burn through one roll a day, and case pricing is typically 30–40% cheaper per roll than buying singles.',
    },
    {
      q: 'What color tape is used on construction sites for general work areas?',
      a: 'Orange BARRICADE tape (3.0–4.0 mil) is the standard for site perimeters, sidewalk closures, and active construction-zone delineation. Yellow CAUTION tape is used inside the site for transient hazards like wet floors, ladder zones, or freshly poured concrete.',
    },
    {
      q: 'Why does my caution tape keep snapping in the wind?',
      a: 'Two reasons: the tape is too thin (use 3.0 mil or higher outdoors) and it is anchored too far apart. Place an anchor every 8–10 ft, and twist the ribbon a half-turn every few feet so it does not act like a sail. A flat sheet of tape stretched 30 ft will tear on the first gust over 15 mph.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'yellow-caution-tape-buying-guide',
    'barricades-types-uses-guide',
    'temporary-traffic-control-plan-utility-job',
  ],
}
