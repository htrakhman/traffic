import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "retractable barricade" (~500/mo, High comp, $15.09 bid).
 * Secondary: retractable barrier, retractable belt barrier, retractable safety barricade.
 * What-is / definitional structure: distinguishes retractable-belt stanchions
 * from expandable accordion barricades from electric/gate retractable bollards.
 */
export const articleRetractableBarricadeGuide: Article = {
  slug: 'retractable-barricade-guide',
  title: 'What Is a Retractable Barricade? (Three Different Devices, One Confusing Name)',
  excerpt:
    'The phrase "retractable barricade" covers three completely different devices: belt stanchions, accordion safety barriers, and electric retractable bollards. Which one you actually need depends on whether you are guiding people, walling off a hazard, or stopping a vehicle.',
  metaDescription:
    'Retractable barricade explained — belt stanchions vs accordion safety barriers vs retractable bollards. Specs, prices, and when to use each.',
  primaryKeyword: 'retractable barricade',
  secondaryKeywords: [
    'retractable barrier',
    'retractable belt barrier',
    'retractable safety barricade',
    'retractable barrier post',
    'retractable bollard',
    'expandable retractable barricade',
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
      h('strong', null, '"Retractable barricade" is three different products under one search term.'),
      ' A retractable belt stanchion (the airport-line type) is a wayfinding device — it guides foot traffic. An accordion-style safety barricade is a temporary wall that retracts for storage. A retractable bollard is a vehicle-stopping post that drops into the ground. Picking the wrong one is the difference between a $40 stanchion and a $4,000 hydraulic bollard, so this guide starts by naming each device and ends with a buy recommendation.',
    ),

    h('h2', null, 'The three devices, side by side'),
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
            h('th', { className: 'text-left p-2' }, 'Device'),
            h('th', { className: 'text-left p-2' }, 'What retracts'),
            h('th', { className: 'text-left p-2' }, 'Stops'),
            h('th', { className: 'text-left p-2' }, 'Price each'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Belt stanchion'),
            h('td', { className: 'p-2' }, 'Webbing belt (7–13 ft) into the post'),
            h('td', { className: 'p-2' }, 'Pedestrians (wayfinding)'),
            h('td', { className: 'p-2' }, '$40–$160'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Accordion safety barricade'),
            h('td', { className: 'p-2' }, 'Scissor-link panel folds flat'),
            h('td', { className: 'p-2' }, 'Pedestrians (perimeter)'),
            h('td', { className: 'p-2' }, '$140–$450'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Retractable bollard'),
            h('td', { className: 'p-2' }, 'Steel post drops into sleeve'),
            h('td', { className: 'p-2' }, 'Vehicles (anti-ram + access)'),
            h('td', { className: 'p-2' }, '$500–$8,000'),
          ),
        ),
      ),
    ),

    h('h2', null, 'Device 1: retractable belt stanchion'),
    h(
      'p',
      null,
      'The post-with-a-pull-out-belt design every airport, bank, and event venue uses. Two stanchions plus a belt between them mark off a queue lane, a "wet floor" zone, or a closed elevator. The belt retracts on a spring-loaded reel inside the post head.',
    ),
    h('h3', null, 'Spec essentials'),
    h(
      'ul',
      null,
      h('li', null, 'Post height: 36–40 in standard; 50 in for crowd-management variants'),
      h('li', null, 'Belt length: 7 ft (indoor), 10 ft, or 13 ft (event/outdoor)'),
      h('li', null, 'Belt width: 2 in standard'),
      h('li', null, 'Base: cast iron (25–30 lb) for stability; weighted base options for outdoor use'),
      h(
        'li',
        null,
        'Belt-end clip: 4-way receiver in the post head (so a stanchion can anchor up to 4 belts in different directions)',
      ),
    ),
    h('h3', null, 'When it is right'),
    h(
      'ul',
      null,
      h('li', null, 'Indoor queuing — DMV, retail returns, polling places'),
      h('li', null, 'Temporary lobby reconfiguration'),
      h('li', null, 'Marking off "out of service" elevators or wet floor zones'),
      h('li', null, 'Event ingress, ticket lines, will-call windows'),
    ),
    h('h3', null, 'When it is wrong'),
    h(
      'p',
      null,
      'Belt stanchions are a soft signal. They stop people who choose to be stopped. They do not stop a determined person, an unattended child, or a vehicle. Do not use them for hazard exclusion (open shafts, energized panels, fall risks).',
    ),

    h('h2', null, 'Device 2: accordion safety barricade'),
    h(
      'p',
      null,
      'A scissor-link panel that opens out to 8–10 ft and folds down to about 12 inches wide for storage. Used as a temporary perimeter — closed corridor, hallway closure, doorway block-off. Some models have integrated castors for one-person deployment. We covered the device in depth in our ',
      h('a', { href: '/blog/expandable-barricade-guide' }, 'expandable barricade guide'),
      '; the short version is below.',
    ),
    h('h3', null, 'Spec essentials'),
    h(
      'ul',
      null,
      h('li', null, 'Expanded width: 7–10 ft typical; 12 ft heavy-duty'),
      h('li', null, 'Folded width: 10–15 in (stores flat against a wall)'),
      h('li', null, 'Height: 38–40 in (industrial) or 60 in (corridor-wall style)'),
      h('li', null, 'Material: steel scissor frame with plastic or steel slats'),
      h('li', null, 'Color: typically safety yellow with red retroreflective tape'),
    ),
    h('h3', null, 'When it is right'),
    h(
      'ul',
      null,
      h('li', null, 'Temporary corridor or doorway closure (facility maintenance)'),
      h('li', null, 'Indoor work zones — janitorial, electrical panel access, paint'),
      h('li', null, 'Trade show booth fencing'),
      h('li', null, 'Schools, hospitals, hotels — anywhere a portable, indoor-friendly perimeter is needed'),
    ),
    h('h3', null, 'When it is wrong'),
    h(
      'p',
      null,
      'Not crashworthy. Not MUTCD-compliant for roadway use. Top-heavy when fully extended; a child can knock one over. For roadway work zones, use a ',
      h('a', { href: '/blog/type-iii-barricade-vs-type-i-type-ii' }, 'Type III barricade'),
      ' instead.',
    ),

    h('h2', null, 'Device 3: retractable bollard'),
    h(
      'p',
      null,
      'A steel post embedded in a ground sleeve that can be raised, lowered, or fully removed to control vehicle access. Three sub-types by retraction mechanism — and the price gap between them is enormous:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Manual / removable: '),
        'lift-out post. The bollard is lifted by hand and stored elsewhere when not deployed. $200–$600. Use for occasional access (gated driveways, loading docks).',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Semi-automatic / gas-spring: '),
        'unlocked with a key, raised/lowered with a gas strut. $800–$1,800. Use for daily access (private driveway, parking lot).',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Automatic / hydraulic or electric: '),
        'fully powered. Raises in 3–8 seconds via a wired controller or remote. $3,500–$8,000+. Use for high-throughput access (gated communities, embassy compounds, anti-terror perimeters).',
      ),
    ),
    h('h3', null, 'When it is right'),
    h(
      'ul',
      null,
      h('li', null, 'Driveway or alley that needs to alternate between open and closed'),
      h('li', null, 'Pedestrian plaza that occasionally allows service or emergency vehicles'),
      h('li', null, 'Anti-ram perimeter at a sensitive facility (ASTM F2656 / F3016 rated bollards)'),
      h('li', null, 'Parking-space "save my spot" residential applications'),
    ),
    h('h3', null, 'Crashworthiness — the important spec'),
    h(
      'p',
      null,
      'Vehicle-stopping retractable bollards are rated under ASTM F2656 (high-security anti-ram) or ASTM F3016 (shallow-mount low-speed). An ASTM F2656 M50 rating means the bollard stops a 15,000 lb truck at 50 mph. A non-rated decorative bollard stops nothing — it is wayfinding only. If you are buying for security, do not skip the rating.',
    ),

    h('h2', null, 'Decision tree: which retractable do I need?'),
    h(
      'p',
      null,
      'Three questions narrow it down:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, '1. What are you stopping?'),
        ' Pedestrians → stanchion or accordion. Vehicles → bollard.',
      ),
      h(
        'li',
        null,
        h('strong', null, '2. Indoor or outdoor?'),
        ' Indoor → belt stanchion (lightest) or accordion. Outdoor with weather → bollard or weighted accordion.',
      ),
      h(
        'li',
        null,
        h('strong', null, '3. How often does the line open and close?'),
        ' Every few minutes (queue) → belt stanchion. Daily (driveway) → semi-auto bollard. Hourly with throughput requirements → automatic bollard.',
      ),
    ),

    h('h2', null, 'How much do retractable barricades cost (with examples)'),
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
            h('th', { className: 'text-left p-2' }, 'Example use'),
            h('th', { className: 'text-left p-2' }, 'Device'),
            h('th', { className: 'text-left p-2' }, 'Approx cost'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'DMV lobby queue (10 stanchions, 7 ft belts)'),
            h('td', { className: 'p-2' }, 'Belt stanchion'),
            h('td', { className: 'p-2' }, '$500–$1,500'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'School corridor closure during repair'),
            h('td', { className: 'p-2' }, 'Accordion safety barricade'),
            h('td', { className: 'p-2' }, '$250–$450'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Private driveway gate (manual)'),
            h('td', { className: 'p-2' }, 'Removable bollard'),
            h('td', { className: 'p-2' }, '$300–$700 (1 unit)'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Pedestrian plaza service access'),
            h('td', { className: 'p-2' }, 'Semi-automatic bollard (3 units)'),
            h('td', { className: 'p-2' }, '$3,000–$5,500'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Federal building anti-ram perimeter'),
            h('td', { className: 'p-2' }, 'ASTM F2656 M50 automatic bollards (6 units)'),
            h('td', { className: 'p-2' }, '$45,000–$80,000'),
          ),
        ),
      ),
    ),

    h('h2', null, 'What about "retractable" in product names that are not actually retractable?'),
    h(
      'p',
      null,
      'A few products marketed as "retractable" use the word loosely:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Retractable cone tape: '),
        'a hand reel of tape strung between two cones. The reel retracts; the cones do not. We treat this as a sub-category of cone-mounted tape — see the ',
        h('a', { href: '/blog/yellow-caution-tape-buying-guide' }, 'caution tape guide'),
        '.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Retractable safety fence: '),
        'a polypropylene roll-up fence on a hand crank, usually 4 ft tall × 50 ft long. More of a temporary perimeter system than a retractable barricade, but searched together.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Retractable signage: '),
        'pull-up banner stands. Not a barricade at all — wayfinding signage only.',
      ),
    ),

    h('h2', null, 'Where to buy retractable barricades in NJ'),
    h(
      'p',
      null,
      'We stock belt stanchions and accordion barricades for indoor / event use, plus removable and semi-automatic bollards for driveway and small-perimeter access control. Browse the ',
      h('a', { href: '/category/pedestrian-control' }, 'pedestrian control category'),
      ' for belt stanchions, the ',
      h('a', { href: '/category/barricades-barriers' }, 'barricades category'),
      ' for accordion units, and the ',
      h('a', { href: '/category/bollards-chocks-corners' }, 'bollards category'),
      ' for retractable vehicle bollards. For an anti-ram security spec, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' — we will source ASTM F2656 / F3016 rated units directly from the manufacturer.',
    ),
  ),
  faqs: [
    {
      q: 'Are retractable belt barricades crowd-control rated?',
      a: 'No. Belt stanchions are wayfinding devices — they cue people which way to line up. They are not rated for crowd-load impact, and a 30-lb base will tip if leaned on. For actual crowd loads (concerts, parades), use bike-rack barricades (Mojo / French style) instead.',
    },
    {
      q: 'How long does a retractable belt last?',
      a: 'Indoor use: 5–10 years; the spring reel typically outlasts the post finish. Outdoor use with sun exposure: 1–3 years before the webbing fades and frays. For permanent outdoor stanchion lines, use UV-stabilized webbing or replace yearly.',
    },
    {
      q: 'Can a retractable bollard stop a vehicle?',
      a: 'Only if it is ASTM F2656 or F3016 rated. A standard manual / removable bollard is wayfinding — a car can push it over. Anti-ram rated bollards are tested to stop a specific vehicle weight at a specific speed (M30 = 15,000 lb at 30 mph; M50 = 15,000 lb at 50 mph). Check for the certification before you spec for security.',
    },
    {
      q: 'What is the difference between a retractable bollard and a removable bollard?',
      a: 'Removable bollards lift out by hand and are stored separately. Retractable bollards stay in the sleeve and lower below grade — nothing to store. Removable is cheaper ($200–$600) but the post can get lost or forgotten. Retractable ($800–$8,000) is more reliable for daily use.',
    },
    {
      q: 'Do retractable barricades need to be MUTCD-compliant?',
      a: 'Only when used in the public right-of-way for traffic control. None of the three retractable variants (belt stanchion, accordion, bollard) are MUTCD-compliant work-zone devices. Use Type I/II/III barricades for roadway closures and reserve retractables for indoor, event, or private-property applications.',
    },
    {
      q: 'Can I install a retractable bollard myself?',
      a: 'A removable bollard with a 12-in sleeve, yes — concrete saw, dig 14 in, set sleeve, pour anchor mix, done. Semi-automatic gas-spring bollards typically need a 24-in deep installation and are within reach for a competent DIY. Automatic hydraulic/electric bollards require a power feed, drain provision, and trenching to the controller — hire an electrician and a concrete crew.',
    },
  ],
  relatedProducts: [
    { label: 'Pedestrian & Crowd Control', path: '/category/pedestrian-control' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Bollards, Chocks & Corner Guards', path: '/category/bollards-chocks-corners' },
    { label: 'Fencing & Site Safety', path: '/category/fencing-site-safety' },
  ],
  relatedArticles: [
    'expandable-barricade-guide',
    'crowd-control-barriers-buying-guide',
    'pedestrian-barriers-guide',
  ],
}
