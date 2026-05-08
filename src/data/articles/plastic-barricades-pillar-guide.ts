import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "plastic barricades" (~500/mo, High comp, $20.61 bid).
 * Pillar guide structure: covers all five plastic barricade families
 * (Type I, Type II, Type III, A-frame, water-filled), with a use-case
 * matrix and a "buy plastic vs. metal vs. concrete" decision section.
 */
export const articlePlasticBarricadesPillarGuide: Article = {
  slug: 'plastic-barricades-pillar-guide',
  title: 'Plastic Barricades: The Five Families, MUTCD Specs, and What to Buy by Job Type',
  excerpt:
    'Plastic barricades cover everything from $30 A-frames to $250 water-filled Jersey shapes. Here is the five-family breakdown — Type I, Type II, Type III, A-frame, water-filled — plus the MUTCD spec and price each one carries.',
  metaDescription:
    'The plastic barricades buyer guide: five families (Type I, II, III, A-frame, water-filled), MUTCD §6F.63 specs, prices from $30 to $250, and a decision matrix by job type.',
  primaryKeyword: 'plastic barricades',
  secondaryKeywords: [
    'plastic barricade',
    'plastic traffic barriers',
    'plastic crowd control barriers',
    'type 1 plastic barricade',
    'type 2 plastic barricade',
    'type 3 plastic barricade',
    'a frame plastic barricade',
  ],
  targetVolume: 500,
  datePublished: '2026-05-08',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Plastic barricades are the lightweight, repositionable cousin of metal and concrete — they go up fast, they handle weather, and they are the right answer for most short-duration work zones, parking-lot closures, and event perimeters. ',
      h('strong', null, 'There are five families that all get called "plastic barricades":'),
      ' Type I, Type II, and Type III channelizing barricades (per MUTCD §6F.63), A-frame folding barricades, and water-filled longitudinal barriers. Each one fits a specific job. Below is the buyer guide that tells you which to buy and what each costs.',
    ),

    h('h2', null, 'The MUTCD §6F.63 spec table — what makes a barricade a Type I, II, or III'),
    h(
      'p',
      null,
      'The MUTCD classifies channelizing barricades by panel count, not material. A Type I has one rail, Type II has two, Type III has three. The plastic versions follow the same rule — a "plastic Type II" is just a Type II with plastic rails instead of wood or metal.',
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
            null,
            h('th', { className: 'text-left p-2 border-b' }, 'Type'),
            h('th', { className: 'text-left p-2 border-b' }, 'Rails'),
            h('th', { className: 'text-left p-2 border-b' }, 'Min. height'),
            h('th', { className: 'text-left p-2 border-b' }, 'Use case'),
            h('th', { className: 'text-left p-2 border-b' }, 'Plastic price (each)'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Type I'), h('td', { className: 'p-2' }, '1 rail'), h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, 'Short-duration daytime, low speed'), h('td', { className: 'p-2' }, '$30–$60')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type II'), h('td', { className: 'p-2' }, '2 rails'), h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, 'Intermediate-term daytime/nighttime'), h('td', { className: 'p-2' }, '$50–$95')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type III'), h('td', { className: 'p-2' }, '3 rails'), h('td', { className: 'p-2' }, '60 in'), h('td', { className: 'p-2' }, 'Road closures, long-duration high-visibility'), h('td', { className: 'p-2' }, '$120–$220')),
          h('tr', null, h('td', { className: 'p-2' }, 'A-frame'), h('td', { className: 'p-2' }, 'Folding panels'), h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, 'Pedestrian / sidewalk / event'), h('td', { className: 'p-2' }, '$25–$70')),
          h('tr', null, h('td', { className: 'p-2' }, 'Water-filled'), h('td', { className: 'p-2' }, 'Solid wall'), h('td', { className: 'p-2' }, '24–42 in'), h('td', { className: 'p-2' }, 'Vehicle channelization, low-speed perimeter'), h('td', { className: 'p-2' }, '$120–$280')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Rail width on Type I/II/III is 8 inches minimum, with alternating 6-inch orange/white reflective stripes. Rails come in 6-ft and 8-ft lengths; 8-ft is the contractor default because it covers a wider span with fewer units.',
    ),

    h('h2', null, 'Family 1 — Type I plastic barricades (the daytime workhorse)'),
    h(
      'p',
      null,
      'Type I is the cheapest channelizing barricade you can buy and the most-deployed unit on contractor trucks. Single horizontal rail at ~36 inches, mounted on a plastic A-frame or saddle base, often water-or-sand ballasted. Use them for daytime utility work, short-term sidewalk closures, parking-lot work, and any job where the closure is up for less than two days.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'When NOT to use a Type I:'),
      ' nighttime work above 35 mph (Type II minimum), full road closure (Type III required), or any work zone over a week long (the rail UV-fades and the plastic body cracks at hinges).',
    ),

    h('h2', null, 'Family 2 — Type II plastic barricades'),
    h(
      'p',
      null,
      'Two rails — one at ~36 in, one at ~24 in. The lower rail catches taller pedestrian sightlines and gives drivers a stronger visual cue at speed. Type II is the spec inflection point for nighttime and 35–45 mph daytime work zones in most state DOT manuals (NJDOT, NYSDOT, PennDOT all spec Type II minimum on intermediate-term work). The plastic version is typically a single-piece molded panel with two integrated reflective bands or a frame with two snap-in rails.',
    ),

    h('h2', null, 'Family 3 — Type III plastic barricades (road closure)'),
    h(
      'p',
      null,
      'Three rails, 60-inch minimum height. Type III is what you put across a closed road or at the upstream end of a full-lane diversion. The plastic version uses three separate 8-ft rails clipped into a frame; the frame itself is plastic (lightweight) but engineered to take a pickup-truck wind-blast at 45 mph without flipping.',
    ),
    h(
      'p',
      null,
      'Type III is also the place to spec lights — most jurisdictions require a steady-burn or flashing Type A/B light at the top of every Type III used for nighttime or 24-hour closures. We cover the head-to-head Type I/II/III decision in detail in our ',
      h('a', { href: '/blog/type-iii-barricade-vs-type-i-type-ii' }, 'Type III vs Type I and II comparison'),
      '.',
    ),

    h('h2', null, 'Family 4 — A-frame plastic barricades (events, valet, sidewalks)'),
    h(
      'p',
      null,
      'A-frame plastic barricades fold flat, weigh 8–18 lb, and stack. They are the right call for events, parking-lot directional control, valet, retail crowd control, and indoor warehouse routing. They are NOT MUTCD-rated for road work — the panel height is below 36 inches on most folding designs, and the wind-load tolerance is too low. Treat A-frames as event gear, not work-zone gear.',
    ),
    h(
      'p',
      null,
      'For a deeper dive on A-frame designs, weights, and storage, see our ',
      h('a', { href: '/blog/a-frame-barricades-guide' }, 'A-frame barricades guide'),
      '.',
    ),

    h('h2', null, 'Family 5 — Water-filled plastic barriers'),
    h(
      'p',
      null,
      'Water-filled plastic Jerseys are the heaviest plastic-class option. Empty they weigh 90–180 lb (one person can move them); filled they weigh 1,400–1,900 lb depending on length. They ship empty (a 53-ft trailer carries 80–100 units), then fill on site from a hydrant or tank truck.',
    ),
    h(
      'p',
      null,
      'Crash rating depends on model: most carry MASH TL-1 or TL-2 (low-speed redirective), and a handful of longer models (12-ft sections with steel-pin connections) carry TL-3. They are the right choice for parking-lot perimeters, event vehicle-control, low-speed work zones up to ~45 mph, and any job where freight cost would otherwise dominate. Our ',
      h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'water-filled barriers buying guide'),
      ' covers the fill, freeze, and drain logistics in detail.',
    ),

    h('h2', null, 'Plastic vs. metal vs. concrete — the simple decision tree'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Crowd control or pedestrian channeling?'), ' Steel bike-rack barricades or A-frame plastics. Both legitimate.'),
      h('li', null, h('strong', null, 'Vehicle redirection at < 45 mph?'), ' Plastic Type II/III or water-filled. Plastic wins on weight and freight.'),
      h('li', null, h('strong', null, 'Vehicle redirection at > 45 mph?'), ' Concrete or steel. Plastic Type III is for visual channelization only at that speed; you need MASH TL-3 mass for redirection.'),
      h('li', null, h('strong', null, 'Permanent perimeter (>6 months)?'), ' Concrete or steel. Plastic UV-fades and the rails embrittle outdoors after 18–36 months.'),
      h('li', null, h('strong', null, 'Repositioning during the job?'), ' Plastic. Two people move a plastic Type III; you need a forklift for concrete.'),
    ),

    h('h2', null, 'Where plastic barricades fail (so you can avoid the recall)'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'UV degradation.'), ' Orange fluorescence drops below MUTCD thresholds in 18–24 months of full sun. Inspectors flag faded barricades as a TCP violation. Replace rails before the body.'),
      h('li', null, h('strong', null, 'Hinge cracks on A-frames.'), ' The plastic hinge on cheap A-frames cracks after ~50 fold cycles. Buy A-frames with metal-pin hinges if you fold them daily.'),
      h('li', null, h('strong', null, 'Wind-flip on under-ballasted Type I.'), ' Empty saddle bases blow over at 25 mph wind gusts. Always fill the saddle with sand or water for any work above 25 mph posted speed.'),
      h('li', null, h('strong', null, 'Broken Type III rail clips.'), ' The rail-to-frame clips on cheap plastic Type IIIs are the failure point. Inspect on every set-down; replace clips, not whole barricades.'),
      h('li', null, h('strong', null, 'Reflective sheeting peel.'), ' Engineer-grade sheeting peels at the corners after one winter. Buy diamond-grade if the unit is going to live outside year-round.'),
    ),

    h('h2', null, 'How many plastic barricades do you actually need?'),
    h(
      'p',
      null,
      'Spacing depends on application. For a Type I/II line along a lane closure, MUTCD §6F.63 puts barricades at the same spacing as channelizing devices (cones/drums) — typically equal to the speed limit in feet on the taper, double that on the tangent. For a Type III at a road closure, you usually need two units (one each side of the closed lane) plus advance Type III warning signage. For pedestrian A-frame work, the working standard is one barricade every 8–10 ft along the channelized path.',
    ),
    h(
      'p',
      null,
      'Our ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'lane-closure cone-count guide'),
      ' walks the same math for cones and applies cleanly to barricades. For a quick spec on a specific job, our ',
      h('a', { href: '/planner' }, 'work-zone planner'),
      ' generates a layout you can hand to a foreman.',
    ),

    h('h2', null, 'What to buy — by job type'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Sidewalk / utility / pothole work, daytime, < 25 mph:'), ' 6× Type I + 2× A-frame.'),
      h('li', null, h('strong', null, 'Lane closure, 35–45 mph, daytime + nighttime:'), ' 8× Type II + 25–30 cones + 2× advance warning signs.'),
      h('li', null, h('strong', null, 'Road closure or major detour:'), ' 4× Type III with Type A flashing lights + signage package.'),
      h('li', null, h('strong', null, 'Parking-lot perimeter, event:'), ' 20× water-filled barriers (filled on site) + 4× Type III at access points.'),
      h('li', null, h('strong', null, 'Pedestrian event channeling:'), ' 30–60× A-frames or steel bike-rack barricades; A-frames win on storage, steel wins on durability.'),
    ),

    h('h2', null, 'Where to buy plastic barricades in NJ'),
    h(
      'p',
      null,
      'For Central NJ contractors, ',
      h('a', { href: '/category/barricades-barriers' }, 'browse our barricades catalog'),
      ' — we stock plastic Type I, Type II, Type III, A-frame, and water-filled units with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon counties. For a job-specific spec (which type, how many, what lights), ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with the road class, duration, and posted speed and we will spec the right plastic family for you.',
    ),
  ),
  faqs: [
    {
      q: 'What are the different types of plastic barricades?',
      a: 'Five families. Type I (one rail, daytime short-term), Type II (two rails, intermediate-term daytime/nighttime), Type III (three rails, 60-inch minimum height for road closures), A-frame folding (events and pedestrians), and water-filled longitudinal barriers (vehicle channelization at low speed).',
    },
    {
      q: 'Are plastic barricades MUTCD-compliant?',
      a: 'Yes — Type I, II, and III plastic barricades that meet MUTCD §6F.63 panel count, height, and reflective-stripe specs are fully compliant for their respective use cases. A-frame and event-style folding plastic barricades are generally NOT MUTCD-compliant for road work because their height and wind-load tolerance fall below spec.',
    },
    {
      q: 'How much does a plastic barricade cost?',
      a: 'Type I: $30–$60 each. Type II: $50–$95. Type III: $120–$220 (rails only; lights add $30–$60). A-frame folding: $25–$70. Water-filled Jersey-shape: $120–$280 each. Reflective sheeting grade and panel quantity drive most of the price spread within each family.',
    },
    {
      q: 'Can plastic barricades stop a vehicle?',
      a: 'Channelizing plastic barricades (Type I/II/III) are visual devices — they redirect driver attention, not vehicles. Water-filled plastic barriers DO have crash ratings (typically MASH TL-1 or TL-2) and provide low-speed vehicle redirection when filled. For high-speed redirection (>45 mph), use concrete or steel.',
    },
    {
      q: 'How long do plastic barricades last outdoors?',
      a: 'Reflective sheeting fails first — engineer-grade peels in 12–18 months, high-intensity prismatic lasts 3–5 years, diamond-grade 5–7. The plastic body itself lasts 5–8 years with reasonable care; UV-faded orange becomes too pale to pass inspection around year 3 unless the unit is stored indoors between jobs.',
    },
    {
      q: 'What is the difference between a plastic barricade and a plastic barrier?',
      a: 'Vocabulary: a "barricade" channelizes (Type I/II/III, A-frame) — it tells drivers and pedestrians where to go. A "barrier" is intended to physically stop or redirect vehicles (water-filled Jersey, concrete, steel). Most catalogs and DOT specs use the words loosely; what matters is the MUTCD type designation and the crash rating.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Pedestrian & Crowd Control', path: '/category/pedestrian-control' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
  ],
  relatedArticles: [
    'type-iii-barricade-vs-type-i-type-ii',
    'a-frame-barricades-guide',
    'water-filled-barriers-buying-guide',
  ],
}
