import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "black traffic cones" (500/mo, High comp, $10.23 bid).
 * Pillar/definitional structure: explains what black cones are, when they
 * are MUTCD-compliant (rare), and the legitimate non-roadway use cases.
 */
export const articleBlackTrafficConesGuide: Article = {
  slug: 'black-traffic-cones-guide',
  title: 'Black Traffic Cones: When They Are Legal, When They Are Not, and What to Buy Instead',
  excerpt:
    'Black traffic cones look sharp, but they fail every MUTCD inspection on a public roadway. Here is when black cones are appropriate, when they are not, and what color you actually need for legal road work in NJ.',
  metaDescription:
    'Black traffic cones are NOT MUTCD-compliant for public roadways. Here is the short list of legal use cases (film, valet, indoor) and what to buy for road work instead.',
  primaryKeyword: 'black traffic cones',
  secondaryKeywords: [
    'black cones',
    'black safety cones',
    'non-orange traffic cones',
    'matte black cones',
    'black parking cones',
    'decorative cones',
  ],
  targetVolume: 500,
  datePublished: '2026-05-10',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Black traffic cones are sold widely online and look professional in photo shoots, valet operations, and event setups — but ',
      h('strong', null, 'they are not MUTCD-compliant for any public roadway in any U.S. state.'),
      ' If your job is on a road, the federal Manual on Uniform Traffic Control Devices requires fluorescent orange (or fluorescent pink-orange for incident response). Black cones are legitimate for a few specific non-roadway use cases — film sets, valet operations, indoor events, parking enforcement on private property — and that is it. Below is the short list of when black cones are right, when they are not, and what to buy if you accidentally bought black thinking they would work on a job site.',
    ),

    h('h2', null, 'Why black cones fail on roadways'),
    h(
      'p',
      null,
      'The MUTCD is explicit: traffic cones used in temporary traffic control on roads "shall be predominantly orange." The reason is contrast — fluorescent orange has the highest visibility against typical roadway backgrounds (asphalt, concrete, grass, dusk light) and stays detectable in low-light conditions. Black cones disappear into asphalt within 50 feet, which is exactly the distance at which an inattentive driver needs them to register.',
    ),
    h(
      'p',
      null,
      'Some manufacturers sell "black-orange" hybrid cones with an orange body and black collar (or vice versa). Those are a different product — usually meant for valet aesthetics — and still do not pass MUTCD inspection unless the cone body itself is orange. The rule is on the body color, not the trim.',
    ),

    h('h2', null, 'When black cones are appropriate'),
    h(
      'p',
      null,
      'Black cones are not illegal — they are just not legal for road work. There are several legitimate use cases where black cones make more sense than orange:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Film and TV production. '),
        'Productions use black cones to mark equipment positions, talent marks, and crew zones on set. Orange cones would show up in the shot. Black cones are the on-set standard.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Valet and high-end hospitality. '),
        'Hotels, restaurants, country clubs, and private event venues use black cones for aesthetics — they match the property branding and do not signal "construction zone" to arriving guests.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Indoor warehouse and distribution. '),
        'Inside warehouses, distribution centers, and manufacturing floors, contrast-against-asphalt is irrelevant. Many facilities standardize on black or other dark colors so cones do not get mistaken for emergency markers.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Private property parking enforcement. '),
        'On a fully private lot — apartment complex, gated community, private garage — there is no MUTCD jurisdiction. Some operators prefer black for branding consistency.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Sports and athletics. '),
        'Coaches and trainers buy black cones for drills because they show up clearly against grass and turf, do not get confused with safety equipment, and stack the same as standard cones.',
      ),
    ),

    h('h2', null, 'When black cones are wrong (and what to buy instead)'),
    h(
      'p',
      null,
      'If you are doing any of the following, return the black cones and order orange:',
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
            h('th', { className: 'text-left p-2 border-b' }, 'Use case'),
            h('th', { className: 'text-left p-2 border-b' }, 'Buy this instead'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Lane closure on any public road'), h('td', { className: 'p-2' }, 'Fluorescent orange 28-inch with double reflective collar')),
          h('tr', null, h('td', { className: 'p-2' }, 'Nighttime work above 35 mph'), h('td', { className: 'p-2' }, 'Fluorescent orange 36-inch with double reflective collar')),
          h('tr', null, h('td', { className: 'p-2' }, 'Utility job in the right-of-way'), h('td', { className: 'p-2' }, 'Fluorescent orange 28-inch')),
          h('tr', null, h('td', { className: 'p-2' }, 'Crash / incident response'), h('td', { className: 'p-2' }, 'Fluorescent pink-orange 28-inch')),
          h('tr', null, h('td', { className: 'p-2' }, 'Parking lot on commercial property'), h('td', { className: 'p-2' }, 'Orange 18 or 28-inch (commercial property still leans on MUTCD norms for liability)')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'See our ',
      h('a', { href: '/blog/orange-cones-explained' }, 'orange cones guide'),
      ' for the size-by-speed matrix and reflectivity grades that pass NJ inspection.',
    ),

    h('h2', null, 'What about visibility — can a black cone with reflective stripes work?'),
    h(
      'p',
      null,
      'Reflective stripes help at night when headlights hit them, but they do nothing during the day. A black cone with a single reflective collar is invisible to a driver approaching at 45 mph in the middle of the afternoon. The MUTCD nighttime visibility test is one factor; the daytime contrast test is the other, and black cones fail it on contrast alone.',
    ),
    h(
      'p',
      null,
      'There is a narrow exception for ',
      h('strong', null, 'low-profile black bases'),
      ' attached to orange cone bodies. Some 36-inch highway cones ship with black or dark gray rubber bases — that is fine and normal because the base is not the visibility surface. The cone body must be orange.',
    ),

    h('h2', null, 'Sizes and prices for black cones'),
    h(
      'p',
      null,
      'Black cones come in the same standard sizes as orange — 12, 18, 28, and 36-inch — but the market is much smaller. Expect to pay 15–30% more than the equivalent orange cone, partly because black PVC pigmenting is a smaller production run and partly because the audience (film, hospitality) is less price-sensitive. A 28-inch black cone with a 7-lb base typically runs $35–$55 retail per cone, versus $22–$35 for an equivalent orange cone.',
    ),

    h('h2', null, 'Care and durability'),
    h(
      'p',
      null,
      'Black cones do not fade the way fluorescent orange does. UV exposure breaks down the orange dye in 18–36 months and the cone visibly pales; black PVC just heats up more (which can soften the cone on a hot day) but does not fade. For indoor or shaded outdoor use, black cones often outlast orange in cosmetic appearance.',
    ),
    h(
      'p',
      null,
      'On the flip side, black cones show scuffs and dust more visibly, especially in high-traffic valet operations. A weekly wipe-down with a damp cloth keeps them presentable.',
    ),

    h('h2', null, 'What to buy if you need both'),
    h(
      'p',
      null,
      'A typical operator who runs both road work and a private property (event venue, hotel, or studio) carries two stocks:',
    ),
    h(
      'ul',
      null,
      h('li', null, '20–30 fluorescent orange 28-inch cones for any ROW or roadway job'),
      h('li', null, '10–20 black 18-inch or 28-inch cones for the private property / on-set work'),
      h('li', null, 'Storage racks labeled by color so the wrong color does not end up on a road job'),
    ),
    h(
      'p',
      null,
      'If you only need orange, ',
      h('a', { href: '/category/cones-drums' }, 'browse our cones and channelizers'),
      ' — we stock MUTCD-compliant 28-inch and 36-inch cones with same-day delivery to Central NJ. For mixed orders or specialty colors, ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' and tell us the use case; we will spec the right product.',
    ),

    h('h2', null, 'How NJ inspectors actually flag wrong-color cones'),
    h(
      'p',
      null,
      'On a NJDOT or municipal inspection, an inspector who finds black cones on a public road typically does the following: stops the work, requires the contractor to swap to compliant cones before resuming, and notes the deficiency on the project file. Repeat issues can affect prequalification and bid history. The fix is cheap (swap the cones) but the time loss on a one-day job can be the difference between profit and loss.',
    ),
    h(
      'p',
      null,
      'For a complete contractor reference, see our ',
      h('a', { href: '/blog/njdot-work-zone-standards-contractor-reference' }, 'NJDOT work zone standards'),
      ' and ',
      h('a', { href: '/blog/official-traffic-control-device-mutcd' }, 'official MUTCD device guide'),
      '. The Site Map Planner ',
      h('a', { href: '/planner' }, 'planner'),
      ' will flag black cones on a roadway plan automatically.',
    ),
  ),
  faqs: [
    {
      q: 'Are black traffic cones legal?',
      a: 'Black traffic cones are not legal on any public roadway under the MUTCD. The federal manual requires fluorescent orange for road work and fluorescent pink-orange for incident response. Black cones are legitimate for film sets, valet operations, indoor warehouse use, and private-property parking enforcement, where MUTCD does not apply.',
    },
    {
      q: 'Why do hotels and valets use black cones?',
      a: 'Aesthetics. Black cones do not signal "construction zone" the way orange cones do, and they match the branding of upscale hospitality properties. They are not visible enough for high-speed traffic, but valet zones run at walking speed, so visibility is not the primary concern.',
    },
    {
      q: 'Can a black cone with reflective stripes pass MUTCD?',
      a: 'No. MUTCD requires the cone body itself to be predominantly orange (or pink-orange for incident response). Reflective stripes help at night but do nothing for daytime contrast, and the rule is on body color, not retroreflectivity.',
    },
    {
      q: 'Are black cones used by police or fire?',
      a: 'No — emergency responders use fluorescent pink-orange cones for incident scenes, not black. Black cones on a crash scene would reduce visibility for arriving units and for civilian drivers approaching the scene. The 2023 MUTCD update specifically codified pink-orange for unplanned incident response.',
    },
    {
      q: 'Do black cones fade in sunlight?',
      a: 'Less than orange. Fluorescent orange dye degrades from UV exposure in 18–36 months; black PVC does not fade in any visible way. Black cones can soften from heat in direct summer sun, but they do not look paler the way faded orange cones do.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Custom Traffic Cones', path: '/category/custom-cones' },
    { label: 'Get a Quote', path: '/quote' },
    { label: 'Site Map Planner', path: '/planner' },
  ],
  relatedArticles: [
    'orange-cones-explained',
    'road-cones-vs-traffic-cones',
    'custom-traffic-cones-buying-guide',
  ],
}
