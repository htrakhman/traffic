import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "low profile airport barricades" (~500/mo, High comp, $36.74 bid).
 * Niche "what is X" definitional. FAA-specific use case, height limits,
 * frangibility requirements, and how it differs from generic low-profile.
 */
export const articleLowProfileAirportBarricadesGuide: Article = {
  slug: 'low-profile-airport-barricades-guide',
  title: 'Low Profile Airport Barricades: FAA Spec, Frangibility, and What to Buy',
  excerpt:
    'Airport-specific low profile barricades have to clear aircraft underbelly heights AND break away cleanly on impact — two requirements no roadway barricade is built for. Here is the FAA spec, the products that meet it, and what they cost.',
  metaDescription:
    'Low profile airport barricades — FAA Advisory Circular requirements, frangibility, max height, lighting, and the product picks for airport apron and taxiway work.',
  primaryKeyword: 'low profile airport barricades',
  secondaryKeywords: [
    'airport barricade',
    'airfield barricade',
    'low profile barricade airport',
    'frangible airport barricade',
    'faa barricade',
    'taxiway barricade',
  ],
  targetVolume: 500,
  datePublished: '2026-05-11',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Low profile airport barricades are a specialty subset of airfield equipment built to meet two requirements that ordinary roadway barricades cannot satisfy: ',
      h('strong', null, 'they must stay below the underbelly clearance of taxiing aircraft (typically under 18 inches), and they must be frangible — designed to break apart cleanly on impact without piercing fuel tanks or engine nacelles.'),
      ' Buying one off the road-construction shelf is not just wrong; in some scenarios it is dangerous. Here is the FAA spec and the buying picture.',
    ),

    h('h2', null, 'What "low profile airport barricade" actually means'),
    h(
      'p',
      null,
      'In airport operations, "low profile" describes a barricade designed for use on apron, taxiway, and runway-adjacent areas where aircraft will operate at low speeds. The barricade must:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Stay under FAA height limits for the surface it is placed on (typically 18 in on taxiways, lower on runway shoulders)'),
      h('li', null, 'Break or deflect on contact — never gouge tires, puncture fuselage, or be ingested by engines'),
      h('li', null, 'Carry high-visibility orange-and-white striping plus red obstruction lights for night operations'),
      h('li', null, 'Resist jet blast and propwash without becoming projectiles'),
    ),
    h(
      'p',
      null,
      'These requirements come primarily from FAA Advisory Circular 150/5370-2G, "Operational Safety on Airports During Construction." The AC governs how barricades, lights, and signage are placed during airport construction projects.',
    ),

    h('h2', null, 'Why a regular low-profile barricade does NOT work'),
    h(
      'p',
      null,
      'Roadway low-profile barricades (the kind we cover in our ',
      h('a', { href: '/blog/low-profile-barricades-guide' }, 'low profile barricades guide'),
      ') are designed to survive snowplow passes and vehicle slipstream. They are not frangible. A solid plastic or steel barricade hit by a 30-knot taxiing aircraft tire would punch into the sidewall and shred the tire — or worse, get ingested by a low-mounted turbofan engine. Airport-grade barricades use intentionally weak joints and breakaway connections that fail on contact.',
    ),
    h(
      'p',
      null,
      'The same goes for sign stands, light bases, and any other rigid object placed in aircraft-movement areas. FAA AC 150/5370-2G is explicit about this — all temporary objects within aircraft-movement areas must be frangible.',
    ),

    h('h2', null, 'Key FAA specs for airport barricades'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Requirement'),
            h('th', { className: 'text-left p-2 border-b' }, 'Source'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Max height (taxiway/apron)'), h('td', { className: 'p-2' }, 'Typically ≤ 18 in (project-specific)'), h('td', { className: 'p-2' }, 'AC 150/5370-2G')),
          h('tr', null, h('td', { className: 'p-2' }, 'Frangibility'), h('td', { className: 'p-2' }, 'Required for movement areas'), h('td', { className: 'p-2' }, 'AC 150/5345-46 ref.')),
          h('tr', null, h('td', { className: 'p-2' }, 'Striping'), h('td', { className: 'p-2' }, 'Orange and white alternating, retroreflective'), h('td', { className: 'p-2' }, 'AC 150/5370-2G')),
          h('tr', null, h('td', { className: 'p-2' }, 'Obstruction lights'), h('td', { className: 'p-2' }, 'Red steady-burn, 1 per 10 ft of barricade'), h('td', { className: 'p-2' }, 'AC 150/5345-50')),
          h('tr', null, h('td', { className: 'p-2' }, 'Wind / jet blast'), h('td', { className: 'p-2' }, 'Must remain in place under design wind + propwash'), h('td', { className: 'p-2' }, 'Project CSPP')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'CSPP (Construction Safety and Phasing Plan) is project-specific — the airport sponsor and FAA review every construction project and can tighten these limits based on the specific area. Always work from the approved CSPP, not from generic catalog specs.',
    ),

    h('h2', null, 'Common airport-barricade product types'),
    h('h3', null, 'Frangible plastic low-profile (water-filled)'),
    h(
      'p',
      null,
      'Hollow HDPE units, 12–18 in tall, filled with water for ballast. Designed with thin-wall sections at the seams so they crack and deflate on impact. Most common product for taxiway and apron construction zones. Cost: $180–$340 per 6-ft section.',
    ),
    h('h3', null, 'Foam-filled low-profile'),
    h(
      'p',
      null,
      'HDPE shell with frangible polyurethane foam fill. Lighter than water-filled (no water management, no freeze risk), maintains shape better in extreme heat. Cost: $260–$420 per 6-ft section. Used where water-filled is impractical (no water source, freezing weather).',
    ),
    h('h3', null, 'Tubular / drum-style low-profile'),
    h(
      'p',
      null,
      'Round-profile barricades roughly 18 in tall, designed primarily for short-duration daytime work on aprons. Lighter, cheaper, but less visible than panel-style. Cost: $90–$160 per unit. Used as supplemental marking, not primary work-zone barricade.',
    ),
    h('h3', null, 'Lighting'),
    h(
      'p',
      null,
      'Red steady-burn obstruction lights, FAA L-810 type, solar or battery powered. Required at night and during low-visibility operations. Cost: $80–$160 per light unit. Plan one per 10 ft of barricade plus end-point markers.',
    ),

    h('h2', null, 'Who actually buys airport barricades'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Airport sponsors directly,'), ' for routine taxiway maintenance and self-perform work.'),
      h('li', null, h('strong', null, 'Airfield construction contractors,'), ' bidding on FAA-funded improvement projects.'),
      h('li', null, h('strong', null, 'Pavement and lighting specialists,'), ' who self-supply the barricades for closures during their scope.'),
      h('li', null, h('strong', null, 'FBOs and corporate hangar operators,'), ' for occasional ramp restripe / repair work.'),
      h('li', null, h('strong', null, 'Military installations,'), ' for airfield maintenance under similar (but separate) DoD criteria.'),
    ),
    h(
      'p',
      null,
      'If you are a road / utility / municipal contractor and you have stumbled onto this article looking for low-profile barricades for road work, you almost certainly want the road-grade product instead — see our ',
      h('a', { href: '/blog/low-profile-barricades-guide' }, 'low profile barricades buying guide'),
      '.',
    ),

    h('h2', null, 'Buying notes'),
    h('h3', null, 'Lead time and procurement'),
    h(
      'p',
      null,
      'Airport-grade barricades are usually a special-order product line. Lead times run 3–8 weeks from manufacturer. Major suppliers (Off the Wall, Yodock, TrafFix, Roadtech) all carry FAA-compliant lines. Most distributors will sell directly; some will only quote against an open project number.',
    ),
    h('h3', null, 'Pricing and rental'),
    h(
      'p',
      null,
      'Per-unit costs run higher than roadway equivalents because of the frangibility engineering and FAA-listed lighting. Rental is common — rates typically $25–$50 per 6-ft section per week, plus lighting at $8–$15 per light per week. For a typical taxiway closure (~600 ft perimeter), expect $1,800–$3,000/week in barricade rental alone.',
    ),
    h('h3', null, 'Documentation and submittals'),
    h(
      'p',
      null,
      'Most airport projects require manufacturer cut sheets and frangibility certificates as part of the construction submittal package. Verify the supplier can provide these BEFORE ordering; FAA inspectors will not accept the units on site without documentation.',
    ),

    h('h2', null, 'How TrafficKit can help (and where we cannot)'),
    h(
      'p',
      null,
      'Our primary market is road / utility / municipal contractor work — Type I/II/III construction barricades, water-filled barriers, cones, signs, arrow boards. We do not stock airport-grade frangible barricades. If you are in NJ and need a quote on airport work, we can refer you to the major FAA-listed manufacturers (Off the Wall, Yodock\'s airport line, TrafFix). For roadway low-profile work, see our ',
      h('a', { href: '/blog/low-profile-barricades-guide' }, 'low profile barricades guide'),
      ' or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' through our standard channel.',
    ),
  ),
  faqs: [
    {
      q: 'What is a low profile airport barricade?',
      a: 'A low profile airport barricade is a frangible (breakaway), short-stature barricade used during airport apron, taxiway, and runway construction. Typical height is 12–18 inches — low enough to clear aircraft underbelly, with engineered weak points that break apart on contact rather than damaging aircraft tires, fuselage, or engines.',
    },
    {
      q: 'What is the FAA spec for airport barricades?',
      a: 'The governing reference is FAA Advisory Circular 150/5370-2G, "Operational Safety on Airports During Construction." It covers height limits, frangibility, marking, lighting (red steady-burn L-810 obstruction lights), and placement. Project-specific limits come from the airport\'s approved Construction Safety and Phasing Plan (CSPP).',
    },
    {
      q: 'Can I use a regular low-profile road barricade at an airport?',
      a: 'No. Regular low-profile road barricades are not frangible. On an airport movement area, a rigid barricade hit by a taxiing aircraft can puncture tires, damage landing gear, or be ingested by engines. All temporary objects in aircraft-movement areas must be frangible per FAA AC 150/5370-2G.',
    },
    {
      q: 'How much does an airport barricade cost?',
      a: 'Frangible plastic water-filled low-profile units run $180–$340 per 6-ft section. Foam-filled units run $260–$420. Add $80–$160 per FAA L-810 red steady-burn obstruction light. Most projects rent rather than buy: $25–$50/week per section, $8–$15/week per light.',
    },
    {
      q: 'What height limit applies to airport barricades?',
      a: 'Project-specific, from the approved CSPP. A common limit on active taxiways is 18 inches; runway shoulders and runway safety areas are stricter (often well below 18 in). Always work from the project CSPP — generic catalog limits do not substitute for the airport-approved plan.',
    },
    {
      q: 'Do I need lights on airport barricades?',
      a: 'Yes, for any nighttime or low-visibility operations. FAA AC 150/5345-50 specifies L-810 red steady-burn obstruction lights. Standard spacing is one light per 10 ft of barricade, plus extra lights at both end points and any direction-change corners. Solar or battery powered units are common; verify your project CSPP for specifics.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers (road grade)', path: '/category/barricades-barriers' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Request a quote (road work)', path: '/quote' },
  ],
  relatedArticles: [
    'low-profile-barricades-guide',
    'water-filled-barriers-buying-guide',
    'construction-barricade-guide',
  ],
}
