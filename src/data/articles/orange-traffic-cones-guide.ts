import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "orange traffic cones" (~5K/mo, High comp).
 * Definitional / what-is structure. Explains WHY orange, what the MUTCD says,
 * and which orange-cone variant to buy for which job.
 */
export const articleOrangeTrafficConesGuide: Article = {
  slug: 'orange-traffic-cones-guide',
  title: 'Orange Traffic Cones: What They Are, Why They Exist, and Which One to Buy',
  excerpt:
    'Orange traffic cones are the default channelizing device in U.S. work zones — but only some heights and reflective grades actually pass MUTCD inspection. Here is what the color means, what to buy, and what to skip.',
  metaDescription:
    'Why are traffic cones orange? Buying guide for MUTCD-compliant orange traffic cones by height, base weight, and reflective grade. NJ contractor pricing.',
  primaryKeyword: 'orange traffic cones',
  secondaryKeywords: [
    'orange cones',
    'orange safety cones',
    'orange road cones',
    'orange construction cones',
    'safety cone orange',
    'orange cones for sale',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-13',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'An orange traffic cone is a fluorescent-orange channelizing device — usually PVC with a rubber base — used to mark hazards, close lanes, and route traffic around work zones. ',
      h('strong', null, 'The orange is not aesthetic; it is a federally specified safety color under the MUTCD.'),
      ' Any cone you see on a U.S. road work zone is orange because the Manual on Uniform Traffic Control Devices says it has to be. Below: what the spec actually requires, which orange cones are road-legal, and what to buy for a typical NJ contractor truck.',
    ),

    h('h2', null, 'Why orange? (And why the color is non-optional)'),
    h(
      'p',
      null,
      'The MUTCD designates fluorescent orange as the standard color for short-duration and mobile temporary traffic-control devices. Fluorescent orange sits at the high-contrast end of the visible spectrum against the three backgrounds a driver scans — gray concrete, black asphalt, green/brown shoulder — and stays visible through dusk and low-sun glare. There is no equivalent non-orange cone that meets the spec; substitute colors (yellow, red, green, blue) exist for private-property work but are not road-legal.',
    ),
    h(
      'p',
      null,
      'In the 2023 MUTCD update, fluorescent ',
      h('strong', null, 'pink-orange'),
      ' was added as an allowed channel-marker color — specifically for incident-response (unplanned) work zones run by fire, EMS, and police. Planned construction stays orange. Most contractors will never need pink-orange cones; they are agency-issued.',
    ),

    h('h2', null, 'What makes a cone "MUTCD orange"'),
    h(
      'p',
      null,
      'Two things, and inspectors check both:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Color rating.'),
        ' The orange has to be fluorescent (it glows under UV), not a flat painted orange. ASTM D4956 is the sheeting standard referenced by most state DOTs. A faded cone (more pink than orange after UV exposure) fails this test.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Reflective collars.'),
        ' One or two white reflective bands around the cone body. Single 4-inch collar is acceptable for daytime work on roads ≤ 35 mph. Double collar (4 inch + 6 inch) is required at night and on any roadway above 35 mph. Sheeting must be ASTM Type IV high-intensity prismatic or better.',
      ),
    ),

    h('h2', null, 'Orange cone heights — what each one is actually for'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Height'), h('th', { className: 'text-left p-2 border-b' }, 'Use case'), h('th', { className: 'text-left p-2 border-b' }, 'Speed limit'), h('th', { className: 'text-left p-2 border-b' }, 'Typical base')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '12 in'), h('td', { className: 'p-2' }, 'Indoor / sports / kids'), h('td', { className: 'p-2' }, 'NOT for roadway'), h('td', { className: 'p-2' }, '1–2 lb')),
          h('tr', null, h('td', { className: 'p-2' }, '18 in'), h('td', { className: 'p-2' }, 'Parking lot, valet, yard'), h('td', { className: 'p-2' }, '≤ 25 mph, daytime'), h('td', { className: 'p-2' }, '3 lb')),
          h('tr', null, h('td', { className: 'p-2' }, '28 in'), h('td', { className: 'p-2' }, 'NJ contractor default'), h('td', { className: 'p-2' }, '≤ 45 mph day / night-OK with double collar'), h('td', { className: 'p-2' }, '7 lb')),
          h('tr', null, h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, 'Highway, nighttime'), h('td', { className: 'p-2' }, '55+ mph or any night work'), h('td', { className: 'p-2' }, '10–12 lb')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'For a full size-by-application breakdown, see our ',
      h('a', { href: '/blog/road-cones-vs-traffic-cones' }, 'road cones vs. traffic cones guide'),
      '.',
    ),

    h('h2', null, 'The orange-cone variants you will see for sale'),
    h('h3', null, 'Standard PVC orange cone (the default)'),
    h(
      'p',
      null,
      'Bright orange PVC body, separate or molded-in rubber base, one or two reflective collars. The workhorse. 28-inch is the most-bought size by NJ contractors. Lifespan is 3–5 years; UV will fade the orange first.',
    ),
    h('h3', null, 'Collapsible / spring orange cone'),
    h(
      'p',
      null,
      'Cones with a coil spring inside that lets them fold flat for storage. Useful for pickup-truck operators who need 30+ cones but limited bed space. Not as durable under repeated vehicle strikes as a one-piece PVC cone. See our ',
      h('a', { href: '/blog/collapsible-traffic-cones-guide' }, 'collapsible cones guide'),
      ' for tradeoffs.',
    ),
    h('h3', null, 'Heavy-duty / kettle-base orange cone'),
    h(
      'p',
      null,
      'Recessed-base design that accepts a sandbag for extra ballast. Standard on freeway-speed and high-wind jobs. Pricier (about 1.5× standard) but the only honest choice at 55+ mph.',
    ),
    h('h3', null, 'Custom-printed orange cones'),
    h(
      'p',
      null,
      'Cones with a company logo or "NO PARKING" decal printed on the body. Identical safety performance as standard; the print adds about $4–8 per cone. See our ',
      h('a', { href: '/blog/custom-traffic-cones-buying-guide' }, 'custom traffic cones guide'),
      '.',
    ),

    h('h2', null, 'What an orange traffic cone actually costs'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '18-inch, 3 lb base:'), ' $8–14 each retail. Buy 12+ at a time for the per-unit price to drop.'),
      h('li', null, h('strong', null, '28-inch, 7 lb base, double collar:'), ' $18–30 each. NJ contractor sweet spot.'),
      h('li', null, h('strong', null, '36-inch, 10 lb base, double collar:'), ' $32–55 each.'),
      h('li', null, h('strong', null, 'Premium reflective (ASTM Type IX diamond grade):'), ' add ~$8–12 per cone.'),
    ),
    h(
      'p',
      null,
      'Bulk pricing kicks in around 25 cones for the same SKU. A full small-shop kit (20× 28-inch + 6× 36-inch + 6× 18-inch) lands at roughly $1,000–$1,500 retail.',
    ),

    h('h2', null, 'When NOT to buy orange cones'),
    h(
      'p',
      null,
      'Counter-intuitively, orange is the wrong call in three specific scenarios:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Private parking-lot striping where the cone is permanent.'), ' Faded orange looks abandoned. Buy yellow or pure-orange (non-fluorescent) cones for long-term placement; the UV failure is slower because there is no fluorescent dye to degrade.'),
      h('li', null, h('strong', null, 'Indoor warehouse routing.'), ' Orange is overkill indoors and the cones get dirty fast. Yellow indoor-rated cones are cheaper and read just as well under fluorescent lighting.'),
      h('li', null, h('strong', null, 'Sports / training / agility drills.'), ' 9-inch or 12-inch soft cones in mixed colors are the right product. Roadway-grade cones are too heavy and too tall for athletic use.'),
    ),

    h('h2', null, 'How orange cones fail (and what to look for)'),
    h(
      'p',
      null,
      'Inspectors mark cones non-compliant for four common reasons. None of them are obvious from across a parking lot:',
    ),
    h(
      'ol',
      null,
      h('li', null, 'Faded color — the orange has shifted toward pink or pale. Replace immediately.'),
      h('li', null, 'Peeling reflective collar — sheeting lifting at the edges. The cone is night-blind even if it looks fine at noon.'),
      h('li', null, 'Cracked body — water gets in, the cone gets bottom-heavy, balance shifts. Common after a vehicle strike.'),
      h('li', null, 'Wrong size for the posted speed — 18-inch cones on a 35+ mph road is the most-cited violation.'),
    ),

    h('h2', null, 'How many orange cones do you need?'),
    h(
      'p',
      null,
      'For a single-lane closure on a 40 mph NJ road, the rule-of-thumb is 20–30 cones (taper + buffer + activity area). For a parking-lot job, 1 cone every 8–10 ft of channelized path. The exact math (taper length × spacing rule + 25% spares) lives in our ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'lane-closure cone-count guide'),
      ' and our ',
      h('a', { href: '/planner' }, 'SiteMapPlanner tool'),
      ' will compute it from a job description.',
    ),

    h('h2', null, 'Where to buy orange traffic cones in NJ'),
    h(
      'p',
      null,
      'Central NJ contractors can ',
      h('a', { href: '/category/cones-drums' }, 'browse our orange traffic cones, drums, and channelizers'),
      ' — we stock 18-inch, 28-inch, and 36-inch orange cones with ASTM Type IV double reflective collars and same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean counties. For a job-specific count, ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' and we will spec the size, base weight, and quantity that pass NJ inspection.',
    ),
  ),
  faqs: [
    {
      q: 'Why are traffic cones orange?',
      a: 'Fluorescent orange has the highest visual contrast against typical roadway backgrounds (asphalt, concrete, shoulder vegetation) and stays visible in low light. The MUTCD specifies fluorescent orange as the standard color for short-duration and mobile temporary traffic control. Substitute colors are not road-legal.',
    },
    {
      q: 'Are orange traffic cones required to be a certain shade of orange?',
      a: 'Yes. The cone must be fluorescent orange that meets ASTM D4956 sheeting standards (or the cone-body equivalent). A faded cone — one that looks pink or pale — fails the standard, even though it still looks "orange" from a distance.',
    },
    {
      q: 'What is the difference between an orange traffic cone and an orange safety cone?',
      a: 'Functionally none — the terms are interchangeable in the trade. "Safety cone" tends to refer to smaller indoor or parking-lot units; "traffic cone" implies a road-rated 28-inch or 36-inch cone with reflective collars. The MUTCD calls all of them "traffic cones."',
    },
    {
      q: 'Can I use non-orange cones on a road work zone?',
      a: 'No, with one narrow exception. Federal MUTCD requires fluorescent orange (or 2023-allowed pink-orange for incident response). Yellow, red, green, blue, and white cones exist for private property, sports, and indoor use, but inspectors will cite their use on any public roadway.',
    },
    {
      q: 'How long do orange traffic cones last in NJ weather?',
      a: 'A 28-inch PVC cone with rubber base lasts 3–5 years in regular Central NJ outdoor service. UV exposure fades the fluorescent orange within 18–36 months — that is usually the failure mode, not the cone body itself. Store cones out of direct sun when not deployed to extend life.',
    },
    {
      q: 'Do I need orange cones or orange drums for highway work?',
      a: 'Above 45 mph and on freeway-speed work, NJDOT and most state DOTs prefer 42-inch orange channelizing drums over 36-inch cones for tapers. Cones are still allowed; drums are just more visible and harder to knock over. A common rig uses drums on the taper and cones in the activity area.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
    { label: 'Flares, Markers & Flags', path: '/category/flares-markers-wands-flags' },
  ],
  relatedArticles: [
    'road-cones-vs-traffic-cones',
    'how-many-cones-for-lane-closure-nj',
    'orange-cones-explained',
  ],
}
