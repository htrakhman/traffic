import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "crowd control barriers" (~5K/mo, High comp 100).
 * Secondary cluster: pedestrian barriers, crowd control barricades, event barriers,
 *   bike rack barricades, French barriers.
 * Format: definitional + commercial buying guide. AEO lead defines the gear and
 * who actually needs it (event ops, parade routes, security perimeters).
 */
export const articleCrowdControlBarriersBuyingGuide: Article = {
  slug: 'crowd-control-barriers-buying-guide',
  title: 'Crowd Control Barriers: Types, Sizes, and What to Buy for Events and Worksites',
  excerpt:
    'Crowd control barriers — also called pedestrian barriers, French barriers, or bike-rack barricades — are the interlocking 8-ft steel panels you see at parades, marathons, concerts, and security perimeters. Here is the size guide and what to actually buy.',
  metaDescription:
    'Crowd control barriers explained: steel vs plastic, 8-ft vs 6-ft panels, weights, when to use, and what to buy for events, worksites, and security perimeters. With same-day NJ delivery.',
  primaryKeyword: 'crowd control barriers',
  secondaryKeywords: [
    'pedestrian barriers',
    'crowd control barricades',
    'bike rack barricades',
    'event barriers',
    'french barriers',
    'pedestrian barricades',
  ],
  targetVolume: 5000,
  datePublished: '2026-04-30',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'Crowd control barriers'),
      ' are interlocking metal or plastic panels — typically 40 inches tall and 6 to 8 feet wide — used to channel pedestrians, define security perimeters, and keep spectators out of streets during parades, marathons, festivals, and construction zones. They are sometimes called ',
      h('strong', null, 'pedestrian barriers, French barriers, bike-rack barricades, or crowd control barricades'),
      '. The standard event-grade unit is a galvanized-steel "bike rack" panel, 8 ft × 40 in, weighing 25–35 lbs, that hooks to its neighbor without tools. Below: when to use steel vs plastic, the size guide, and what to actually buy.',
    ),

    h('h2', null, 'What is a crowd control barrier? (Plain definition)'),
    h(
      'p',
      null,
      'A crowd control barrier is a portable, free-standing panel — usually around hip-to-chest height — designed to be linked into a continuous run. They do two things at once: physically separate pedestrians from a hazard or activity, and make the boundary visually obvious so people self-route. They are NOT designed to stop a vehicle or a serious crowd surge — that is the job of jersey barriers, bollards, or vehicle-barricade rated barriers. For pedestrian channeling, the standard panels are exactly right.',
    ),
    h(
      'p',
      null,
      'The MUTCD does not formally define a "crowd control barrier" the way it defines a Type III barricade or a 28-inch traffic cone. They sit in the broader category of pedestrian channelizing devices, used heavily at events, sidewalk closures around construction, and any mixed-use area where you need a continuous physical line.',
    ),

    h('h2', null, 'The three forms you will actually see'),
    h('h3', null, '1. Steel "bike rack" barriers (the event default)'),
    h(
      'p',
      null,
      'The classic 8-ft × 40-in galvanized steel panel with a flat foot at each end. Connecting hooks let you link panels into a run of any length. Weight is 25–35 lbs per panel — heavy enough to stay put under normal pedestrian pressure, light enough that one person can carry one at a time. Galvanized finish lasts 10–15 years outdoors. This is what you see at every major NYC parade, the NYC Marathon course, and most concert venues.',
    ),
    h('h3', null, '2. Plastic interlocking barriers (pedestrian and worksite)'),
    h(
      'p',
      null,
      'Polyethylene panels, usually 6–8 ft long and 40–43 in tall, with hollow internal cavities that can be water-ballasted in place. Empty weight is 15–25 lbs (one-person carry); ballasted, they weigh 50–80 lbs. High-vis orange or yellow color makes them work in worksite contexts where steel "bike rack" gear would be invisible. They are easier to transport in volume — a pickup bed holds 30+ empty plastic panels vs about 12 steel ones.',
    ),
    h('h3', null, '3. Retractable belt stanchions (indoor / queue)'),
    h(
      'p',
      null,
      'The "Disney line" gear — chrome posts with retractable nylon belts. Not really a "crowd control barrier" in the outdoor-event sense, but the same keyword pulls in indoor queue management. Standard belt is 6.5 ft, post height 36–40 in. Use indoors only; they tip over in any wind.',
    ),

    h('h2', null, 'Steel vs plastic: which to buy'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Steel'),
            h('th', { className: 'text-left p-2 border-b' }, 'Plastic'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Parade / marathon / festival'), h('td', { className: 'p-2' }, 'Standard'), h('td', { className: 'p-2' }, 'OK if water-ballasted')),
          h('tr', null, h('td', { className: 'p-2' }, 'Construction sidewalk closure'), h('td', { className: 'p-2' }, 'OK'), h('td', { className: 'p-2' }, 'Better — high-vis color')),
          h('tr', null, h('td', { className: 'p-2' }, 'Concert security line'), h('td', { className: 'p-2' }, 'Required (heavier)'), h('td', { className: 'p-2' }, 'Not enough mass')),
          h('tr', null, h('td', { className: 'p-2' }, 'Indoor queue / venue entry'), h('td', { className: 'p-2' }, 'Overkill'), h('td', { className: 'p-2' }, 'OK; stanchions better')),
          h('tr', null, h('td', { className: 'p-2' }, 'Long-term install (3+ months)'), h('td', { className: 'p-2' }, 'Galvanized lasts 10+ yr'), h('td', { className: 'p-2' }, 'UV degrades 2–4 yr')),
          h('tr', null, h('td', { className: 'p-2' }, 'High wind exposure'), h('td', { className: 'p-2' }, 'OK if linked'), h('td', { className: 'p-2' }, 'Must be ballasted')),
        ),
      ),
    ),

    h('h2', null, 'How many panels do you need?'),
    h(
      'p',
      null,
      'Math is straightforward: divide the linear footage of the line you need by the panel length. An 8-ft panel covers 8 ft minus the overlap at the connector — call it 7.5 ft of net coverage. So:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Both sides of a one-block parade route (300 ft):'), ' ~80 panels (40 per side).'),
      h('li', null, h('strong', null, 'Concert security line (200 ft):'), ' ~28 panels for a single-line front-of-stage.'),
      h('li', null, h('strong', null, 'Construction sidewalk closure (50 ft):'), ' 8 panels (one side only) plus 2 for a corner return.'),
      h('li', null, h('strong', null, '5K race start line + 100 ft of corral:'), ' ~30 panels including the two corral lanes.'),
    ),
    h('p', null, 'Add 10–15% for spares — connectors break, panels get bent, and you always need an extra at the corners.'),

    h('h2', null, 'What about ADA and pedestrian-route requirements?'),
    h(
      'p',
      null,
      'When crowd control barriers close a sidewalk, the ADA and the MUTCD\'s Part 6 (Temporary Traffic Control) require a continuous accessible path of at least 60 inches wide. If you cannot keep 60 inches on the sidewalk, you have to either route pedestrians into the street with a temporary lane closure (cones + signs) or open a parallel route on the other side. Crowd control barriers themselves do not satisfy ADA — they define the corridor; you need to make sure the corridor is wide enough and obstacle-free. See our ',
      h('a', { href: '/blog/temporary-traffic-control-plan-utility-job' }, 'temporary traffic control plan guide'),
      ' for the pedestrian-route rules in the context of a typical utility job.',
    ),

    h('h2', null, 'Buying tips for first-time event ops'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Check the connector style.'), ' "Hook-to-flat" connectors (the most common) link in seconds without tools. "Pin and ring" connectors are stronger but slower. For events you set up and tear down weekly, hook-to-flat saves hours per event.'),
      h('li', null, h('strong', null, 'Foot type matters.'), ' Flat feet sit on any surface and are the standard. Domed feet rock on uneven ground. For grass / cobblestone / mixed surface, ask for flat feet with rubber pads.'),
      h('li', null, h('strong', null, 'Color and signage.'), ' Galvanized silver is invisible at dusk — for any event running into low light, add a reflective banner, branded scrim, or sponsor wrap. Many events buy plain barriers and have local print shops produce zip-tied vinyl scrim at $40–60 per panel.'),
      h('li', null, h('strong', null, 'Storage cubes.'), ' 30 panels stacked flat take up about 4 ft × 8 ft of floor space. If you are storing 100+, a wheeled storage cube saves your crew\'s back.'),
    ),

    h('h2', null, 'Pricing — what to expect (Apr 2026)'),
    h(
      'p',
      null,
      'Steel "bike rack" 8-ft × 40-in, galvanized: ',
      h('strong', null, '$45–$75 per panel'),
      ' new, in lots of 25+. Plastic interlocking, 6-ft × 40-in: ',
      h('strong', null, '$60–$110 per panel'),
      ' new (more expensive than steel because of the manufacturing process; cheaper to ship). Used / refurbished steel runs $25–$40 per panel if you can find them at municipal surplus auctions.',
    ),

    h('h2', null, 'Where to buy crowd control barriers in NJ'),
    h(
      'p',
      null,
      'For Central NJ event ops, parade committees, and contractors with sidewalk closures, ',
      h('a', { href: '/category/pedestrian-control' }, 'browse our crowd control barriers and pedestrian gear'),
      ' — we stock galvanized steel and plastic interlocking panels with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon counties. Need help spec\'ing the panel count and connector style for a specific event? ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' or run the layout through our ',
      h('a', { href: '/planner' }, 'site map planner'),
      ' to see the exact perimeter footage before you order.',
    ),
  ),
  faqs: [
    {
      q: 'What is the difference between crowd control barriers and traffic barriers?',
      a: 'Crowd control barriers are pedestrian-rated panels (typically 40 in tall, 6–8 ft long, 25–35 lbs steel or 15–25 lbs plastic) designed to channel foot traffic at events, parades, and worksites. Traffic barriers — jersey barriers, water-filled barriers, and concrete blocks — are vehicle-rated and stop or redirect cars and trucks. Do not use crowd control barriers as a vehicle barrier. They will not stop a car.',
    },
    {
      q: 'How tall are crowd control barriers?',
      a: 'Standard height is 40 inches (about hip-high on most adults). Some heavy-duty event panels run 43–45 inches; indoor stanchion-and-belt setups are typically 36–40 inches. Heights below 36 inches are not effective at deterring people from stepping over.',
    },
    {
      q: 'Are crowd control barriers ADA compliant?',
      a: 'The barriers themselves are neutral — what matters is the corridor they create. ADA and MUTCD Part 6 require a continuous accessible pedestrian route at least 60 inches wide. If a barrier line narrows the sidewalk below that, you must provide an alternate route (parallel sidewalk or a temporary lane closure with cones and signs).',
    },
    {
      q: 'How much do crowd control barriers cost to buy?',
      a: 'Galvanized steel "bike rack" panels (8 ft × 40 in) run $45–$75 per panel new in lots of 25+. Plastic interlocking panels run $60–$110 each. Used municipal-surplus panels can be found for $25–$40 if you watch GovDeals and Municibid auctions.',
    },
    {
      q: 'How many crowd control barriers do I need for a parade?',
      a: 'Rule of thumb: panels needed = (linear feet of route × number of sides being barricaded) ÷ 7.5 ft net coverage per panel. A one-block (300 ft) parade with both sides lined needs about 80 panels. Add 10–15% for spares because connectors break and corners need extras.',
    },
    {
      q: 'Do plastic crowd control barriers work as well as steel?',
      a: 'For pedestrian channeling on events under 4 hours, yes — especially when water-ballasted. For long-term installs, security perimeters, or anywhere a determined person might lean on the line, steel holds up better. Plastic also UV-degrades after 2–4 outdoor seasons; galvanized steel lasts 10–15 years.',
    },
  ],
  relatedProducts: [
    { label: 'Pedestrian & Crowd Control', path: '/category/pedestrian-control' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
  ],
  relatedArticles: [
    'jersey-barricades-guide',
    'temporary-traffic-control-plan-utility-job',
    'pedestrian-crosswalk-signs-mutcd',
  ],
}
