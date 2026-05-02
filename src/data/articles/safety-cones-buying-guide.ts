import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "safety cones" (~5K/mo, High comp, ci=100) — pillar buying guide
 * for the safety-cone family (workplace, parking lot, school, valet, road).
 * Sister to traffic-safety-cones-pillar-guide (broader) and parking-cones-buying-guide
 * (parking lot specific). This page anchors the workplace/non-roadway buying intent.
 */
export const articleSafetyConesBuyingGuide: Article = {
  slug: 'safety-cones-buying-guide',
  title: 'Safety Cones: Sizes, Colors, and What to Buy for Workplace, Parking Lot, and Road Use',
  excerpt:
    'Safety cones are the catch-all term for any cone used to mark a hazard. The right one depends on whether you are protecting a wet floor, a parking valet line, or a 45 mph lane closure. Here is the size, color, and base-weight breakdown — plus what to buy.',
  metaDescription:
    'Safety cones for workplace, parking lot, and roadway use. Size by speed, color meanings, base weights, and what to buy with same-day NJ delivery from TrafficKit.',
  primaryKeyword: 'safety cones',
  secondaryKeywords: [
    'safety cones for sale',
    'orange safety cones',
    'small safety cones',
    'large safety cones',
    'safety cones near me',
    'safety cone sizes',
    'workplace safety cones',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-02',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'Safety cones are the umbrella term for any cone-shaped hazard marker — and the right size depends entirely on where it lives.'),
      ' For interior wet-floor and warehouse routing, an 18-inch yellow or orange cone is plenty. For exterior parking lots and valet lanes, jump to 18 or 28 inches. For road work above 35 mph, the MUTCD requires 28-inch cones with double reflective collars, and 36-inch cones are required for nighttime work or 55+ mph traffic. Below is the size-by-application matrix, the color-code rules most buyers ignore, and a working stock list for each use case.',
    ),

    h('h2', null, 'What counts as a "safety cone"'),
    h(
      'p',
      null,
      '"Safety cone" is a catch-all retail term. The federal MUTCD calls these devices "traffic cones" when they are used in a roadway work zone, but in workplace safety, OSHA, ANSI, and ASTM all refer to the broader family as safety cones. The difference is mostly context, not construction:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Workplace safety cones'), ' — typically yellow, often paired with "Caution / Wet Floor" wording, used indoors to mark a slip hazard.'),
      h('li', null, h('strong', null, 'Parking-lot safety cones'), ' — orange, 18-28 in, used to channel cars at events, valets, schools, or temporary closures.'),
      h('li', null, h('strong', null, 'Road / construction safety cones'), ' — fluorescent orange, 28-36 in, with reflective collars, used in a TCP-compliant work zone.'),
    ),
    h(
      'p',
      null,
      'A 28-inch fluorescent orange cone with a 7-lb rubber base and double reflective collar passes as a "safety cone" in every one of those contexts — that is why it is the most common size on contractor trucks. The cheaper "wet floor" cones are not the same product.',
    ),

    h('h2', null, 'Color-code: what each safety cone color actually means'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Color'),
            h('th', { className: 'text-left p-2 border-b' }, 'Use case'),
            h('th', { className: 'text-left p-2 border-b' }, 'Standard reference'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Fluorescent orange'), h('td', { className: 'p-2' }, 'Standard work zone, construction, lane closure'), h('td', { className: 'p-2' }, 'MUTCD §6F.66')),
          h('tr', null, h('td', { className: 'p-2' }, 'Fluorescent pink-orange'), h('td', { className: 'p-2' }, 'Incident response, fire/EMS/police scenes'), h('td', { className: 'p-2' }, 'MUTCD 2023 update')),
          h('tr', null, h('td', { className: 'p-2' }, 'Yellow'), h('td', { className: 'p-2' }, 'Indoor wet floor, slip hazard, caution'), h('td', { className: 'p-2' }, 'ANSI Z535 (caution)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Red'), h('td', { className: 'p-2' }, 'Restricted area, no-entry, fire lane'), h('td', { className: 'p-2' }, 'ANSI Z535 (danger)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Green'), h('td', { className: 'p-2' }, 'Safe egress, first-aid station marking'), h('td', { className: 'p-2' }, 'ANSI Z535 (safety)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Blue'), h('td', { className: 'p-2' }, 'Mandatory action, equipment notice'), h('td', { className: 'p-2' }, 'ANSI Z535 (notice)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Lime / fluorescent green'), h('td', { className: 'p-2' }, 'School zones (some districts), pedestrian crossings'), h('td', { className: 'p-2' }, 'MUTCD pedestrian color')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'For 95% of buyers — contractors, facility managers, school maintenance, parking-lot operators — the right answer is fluorescent orange. Yellow has its place indoors for slip hazards but does not pass any roadway visibility check.',
    ),

    h('h2', null, 'Sizes: pick by where the cone will sit'),
    h('h3', null, '12-inch — the indoor mini-cone'),
    h(
      'p',
      null,
      '12-inch cones (sometimes called "agility cones" when sold to gyms) work for tabletop training, drill markers, and very-low-traffic interior signage. They are not safety cones in the OSHA sense — they are too small to stop foot traffic at any reasonable distance. Skip them unless you specifically need a training cone.',
    ),
    h('h3', null, '18-inch — small safety cones for indoor and parking lots'),
    h(
      'p',
      null,
      'The 18-inch cone is the workhorse for indoor warehouse routing, valet operations, churches, schools, parking lots, and wet-floor marking. Lightweight (typically 1.5-3 lb), easy to stack 30+ on a single hand truck. They are visible enough at 50-75 ft of approach distance to stop a foot pedestrian, and they channel parking-lot traffic well. They are NOT acceptable on any roadway with posted speed above 25 mph — they get blown over by truck wash and fail MUTCD inspection.',
    ),
    h('h3', null, '28-inch — the all-purpose contractor cone'),
    h(
      'p',
      null,
      'The 28-inch fluorescent orange cone with a 7-lb rubber base and double reflective collar is the most-bought cone in the country. It passes MUTCD for daytime use up to 45 mph, passes nighttime requirements up to 35 mph, and is the size most state DOTs spec as the contractor default. If you only buy one cone size, this is the one.',
    ),
    h('h3', null, '36-inch — large safety cones for highway and night work'),
    h(
      'p',
      null,
      '36-inch cones with 10-12 lb bases are required for any nighttime work on roads ≥35 mph and for daytime work on 55+ mph routes. Heavier and more expensive (roughly 2-3x the cost of 28-inch), but non-optional on highway TCPs. NJDOT prefers 42-inch channelizing drums over 36-inch cones for tapers on freeways — see our ',
      h('a', { href: '/blog/traffic-barrels-buying-guide' }, 'channelizer drum guide'),
      ' for the spec difference.',
    ),

    h('h2', null, 'Base weight — the silent failure point'),
    h(
      'p',
      null,
      'A cone that blows over is worse than no cone at all because it gives a false sense of coverage. The base weight has to match the application:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '4 lb:'), ' indoor / parking-lot only. Calm-air environments. They do not stay upright in any real wind.'),
      h('li', null, h('strong', null, '7 lb:'), ' daytime road work up to 45 mph. The NJ contractor standard.'),
      h('li', null, h('strong', null, '10 lb:'), ' nighttime work, 35-55 mph, or any open-wind site. Standard for closures that run past dusk.'),
      h('li', null, h('strong', null, '12 lb (or kettle-style with sandbag cavity):'), ' freeway, bridge decks, coastal wind. Always pair with a sandbag at 55+ mph or in gust-prone locations.'),
    ),

    h('h2', null, 'Reflectivity: what the collar actually has to do'),
    h(
      'p',
      null,
      'The reflective collar is what makes a "safety cone" actually safe at night. MUTCD requires Type IV (high-intensity prismatic) sheeting or better for any cone used after dusk. Plain fluorescent paint reflects almost nothing in headlights and does not pass.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Single 4-inch collar:'), ' acceptable for ≤35 mph daytime + nighttime use. Cheaper, fine for parking lots and low-speed work.'),
      h('li', null, h('strong', null, 'Double collar (4-inch + 6-inch):'), ' required for >35 mph nighttime work and best practice for any roadway use.'),
      h('li', null, h('strong', null, 'Diamond-grade prismatic:'), ' premium upgrade — visible at ~1,000 ft of approach distance vs ~600 ft for Type IV. Required for some federal projects.'),
    ),

    h('h2', null, 'How many safety cones to buy'),
    h('h3', null, 'Small business / facility starter set'),
    h(
      'ul',
      null,
      h('li', null, '6× 18-inch yellow "wet floor" cones for janitorial use'),
      h('li', null, '6× 18-inch fluorescent orange cones for parking-lot and exterior staging'),
      h('li', null, 'Optional: 4× 28-inch fluorescent orange cones if you ever close a driveway or single lane'),
    ),
    h(
      'p',
      null,
      'Total: roughly $300-$450 for a complete set with reflective collars on the orange cones.',
    ),
    h('h3', null, 'NJ road contractor working set'),
    h(
      'ul',
      null,
      h('li', null, '20× 28-inch fluorescent orange cones, 7-lb base, double reflective collar (covers most NJ jobs up to 45 mph)'),
      h('li', null, '6× 36-inch fluorescent orange cones, 10-lb base, for any nighttime or 50+ mph work'),
      h('li', null, '6× 18-inch cones for parking-lot / yard / staging-area work'),
      h('li', null, 'Cone storage rack for the truck (cones stay clean and last 2-3x longer)'),
    ),
    h(
      'p',
      null,
      'Total: roughly $1,200-$1,800 retail, depending on brand and reflective grade.',
    ),
    h(
      'p',
      null,
      'For a custom set sized to a specific job — taper length, lane width, daytime vs nighttime — use our ',
      h('a', { href: '/planner' }, 'site map planner'),
      ' to model the layout and the cone count is calculated automatically.',
    ),

    h('h2', null, 'Where safety cones fail (and how to spot the problem early)'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Faded color.'), ' UV exposure fades fluorescent orange in 18-36 months. Once they look pale or pink, they fail visibility and need to be replaced.'),
      h('li', null, h('strong', null, 'Peeling reflective collar.'), ' If the sheeting is lifting at the edges, the cone fails the nighttime check even if it looks fine in daylight.'),
      h('li', null, h('strong', null, 'Cracked PVC.'), ' Cones driven over enough times crack at the cone-to-base seam. Water gets in, base balance shifts, the cone walks in wind.'),
      h('li', null, h('strong', null, 'Wrong size for speed.'), ' Most-cited TCP failure: 18-inch cones on a 35+ mph roadway.'),
      h('li', null, h('strong', null, 'Wrong color for context.'), ' Yellow indoor "wet floor" cones used to close an exterior driveway will not stop a driver who is not specifically trained to read yellow as a barrier.'),
    ),

    h('h2', null, 'Buying safety cones in NJ — same-day delivery'),
    h(
      'p',
      null,
      'For Central NJ buyers, ',
      h('a', { href: '/category/cones-drums' }, 'browse our safety cone inventory'),
      ' — we stock 18-inch, 28-inch, and 36-inch cones in fluorescent orange with NJ-grade reflective sheeting, plus yellow indoor cones. Same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon counties for orders placed by 11 AM. For a custom set sized to your job, ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' — describe the use case and we will spec the size, count, and base weight that fit. If you are not sure what you need, our ',
      h('a', { href: '/assistant' }, 'TCP assistant'),
      ' can walk you through it in 2 minutes.',
    ),
  ),
  faqs: [
    {
      q: 'What is the difference between a safety cone and a traffic cone?',
      a: 'Same product family, different context. "Traffic cone" is the MUTCD term used in roadway work zones. "Safety cone" is the broader retail term that includes workplace, parking-lot, and roadway use. A 28-inch fluorescent orange cone with a 7-lb base passes as either.',
    },
    {
      q: 'What size safety cone do I need for a parking lot?',
      a: '18-inch fluorescent orange cones work for low-speed channeling, valets, and event setups. For closing off a section of lot or a driveway entrance, 28-inch cones are more visible and harder for drivers to overlook.',
    },
    {
      q: 'Are yellow safety cones OSHA-compliant?',
      a: 'Yellow safety cones with caution wording meet ANSI Z535 for "caution" indoor signage. They are appropriate for slip hazards, wet floors, and indoor warning use. They do not meet MUTCD requirements for any roadway work zone — orange is required there.',
    },
    {
      q: 'How heavy should a safety cone base be?',
      a: '4 lb is fine for indoor and calm-air parking lots. 7 lb is the road contractor standard for daytime work up to 45 mph. 10 lb for nighttime or 35-55 mph. 12 lb plus a sandbag for freeway and high-wind sites.',
    },
    {
      q: 'How long do safety cones last?',
      a: 'A well-cared-for orange safety cone lasts 3-5 years outdoors. UV fades the color in 18-36 months. Reflective collars usually need replacement before the cone body wears out — check the sheeting condition each season and replace any cone that looks pale, has lifted sheeting, or is cracked at the base seam.',
    },
    {
      q: 'Can I buy safety cones near me with same-day delivery?',
      a: 'In Central and Northern NJ, yes — order by 11 AM and we deliver same-day to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon counties. Outside that radius, next-day shipping by ground freight is standard.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Safety Vests & Hi-Vis', path: '/category/safety-vests-hi-vis' },
  ],
  relatedArticles: [
    'traffic-safety-cones-pillar-guide',
    'parking-cones-buying-guide',
    'road-cones-vs-traffic-cones',
  ],
}
