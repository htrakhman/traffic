import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic cones for sale" (~5K/mo, High comp) — high commercial intent.
 * Buyer is ready to purchase; the page needs to deliver size/price guidance,
 * stock posture, delivery options, and a fast path to a quote.
 */
export const articleTrafficConesForSaleBuyingGuide: Article = {
  slug: 'traffic-cones-for-sale',
  title: 'Traffic Cones for Sale: 18", 28", and 36" Cones with Same-Day Central NJ Delivery',
  excerpt:
    'Buying traffic cones is mostly a sizing problem — get the wrong height for the speed limit and you fail inspection. Here is the practical buying guide: sizes, base weights, reflective grades, and what to expect to spend.',
  metaDescription:
    'Traffic cones for sale — 18-inch parking-lot cones, 28-inch road cones, and 36-inch highway cones with double reflective collars. Pricing, base weights, and same-day NJ delivery.',
  primaryKeyword: 'traffic cones for sale',
  secondaryKeywords: [
    'safety cones for sale',
    'orange cones for sale',
    'traffic safety cones for sale',
    'road cones for sale',
    'street cones for sale',
    'construction cones for sale',
    'traffic cones near me',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-01',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'When you search "traffic cones for sale," what you actually need to know first is ',
      h('strong', null, 'what size cone is legal for the road you will use them on'),
      '. ',
      'For low-speed parking lots and yards, 18-inch cones with a 4–7 lb base run roughly $9–$18 each. ',
      'For typical contractor road work up to 45 mph, the standard buy is a 28-inch cone with a 7-lb rubber base and double reflective collar — $20–$32 each in case quantities. ',
      'For nighttime work above 35 mph or any 55+ mph daytime work, you need a 36-inch cone with a 10–12 lb base — $35–$60 each. ',
      'Anything below those size/reflectivity specs will not pass an MUTCD inspection. The rest of this page walks through how to pick the right cone, what to spend, and how to get them delivered the same day in Central NJ.',
    ),

    h('h2', null, 'The two questions that decide which cone to buy'),
    h(
      'p',
      null,
      'Every cone purchase comes down to two questions, in this order:',
    ),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'What is the posted speed limit on the road or area where the cones will deploy?'), ' This sets the minimum cone height and reflectivity grade.'),
      h('li', null, h('strong', null, 'Daytime only, or does the work run into dusk and after dark?'), ' Nighttime work bumps the minimum cone height up one tier and requires double reflective collars.'),
    ),
    h(
      'p',
      null,
      'Almost every other variable — color, base material, brand — is downstream of those two answers. The MUTCD does not care whether your cone is rubber or PVC; it cares about height, color, and how visible it is at the design retroreflectivity distance.',
    ),

    h('h2', null, 'Cone sizes for sale and what each is actually for'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Cone size'),
            h('th', { className: 'text-left p-2 border-b' }, 'Base weight'),
            h('th', { className: 'text-left p-2 border-b' }, 'Use case'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical price (each, case qty)'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '12 in'), h('td', { className: 'p-2' }, '1–2 lb'), h('td', { className: 'p-2' }, 'Indoor / sport / training'), h('td', { className: 'p-2' }, '$3–$6')),
          h('tr', null, h('td', { className: 'p-2' }, '18 in'), h('td', { className: 'p-2' }, '4–7 lb'), h('td', { className: 'p-2' }, 'Parking lots, yards, ≤25 mph daytime'), h('td', { className: 'p-2' }, '$9–$18')),
          h('tr', null, h('td', { className: 'p-2' }, '28 in (single collar)'), h('td', { className: 'p-2' }, '7–10 lb'), h('td', { className: 'p-2' }, 'Daytime road work to 45 mph'), h('td', { className: 'p-2' }, '$18–$28')),
          h('tr', null, h('td', { className: 'p-2' }, '28 in (double collar)'), h('td', { className: 'p-2' }, '7–10 lb'), h('td', { className: 'p-2' }, 'Most contractor jobs — works day or night to 45 mph'), h('td', { className: 'p-2' }, '$22–$32')),
          h('tr', null, h('td', { className: 'p-2' }, '36 in (double collar)'), h('td', { className: 'p-2' }, '10–12 lb'), h('td', { className: 'p-2' }, 'Nighttime + 35–55 mph; daytime 55+ mph'), h('td', { className: 'p-2' }, '$35–$60')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'The single most-bought item in this list, by case volume, is the 28-inch double-collar cone with a 7-lb rubber base. ',
      'It is the cone that survives daily contractor abuse, passes inspection on most NJ municipal and county roads, and stays upright in normal wind. ',
      'If you are stocking a single truck and want one cone size, this is it.',
    ),

    h('h2', null, 'Reflective collars: single, double, ASTM type IV'),
    h(
      'p',
      null,
      'A "collar" is the reflective sheeting wrapped around the upper third of the cone body. The MUTCD specifies the collar layout by speed and time of day:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Single 4-inch collar:'), ' OK for daytime ≤35 mph. Marginal at night.'),
      h('li', null, h('strong', null, 'Double collar (4-inch upper + 6-inch lower):'), ' the working standard for any road work that may run into nighttime hours. This is what we recommend for all serious contractor purchases.'),
      h('li', null, h('strong', null, 'ASTM Type IV / high-intensity prismatic sheeting:'), ' meets nighttime retroreflectivity requirements. Type I or II "engineer-grade" sheeting may be cheaper at the dollar store but will fail an inspection for nighttime visibility.'),
    ),
    h(
      'p',
      null,
      'Buying advice: ',
      h('strong', null, 'spend the extra $4–$6 per cone for the double collar with Type IV sheeting'),
      '. The premium adds ~$80–$120 to a case of 25 cones, and it is the single cheapest way to keep your cones legal across daytime and nighttime jobs without re-buying inventory.',
    ),

    h('h2', null, 'Base weight matters more than people think'),
    h(
      'p',
      null,
      'A cone\'s job is to stay where you put it. The base weight controls two things: wind resistance, and what happens when a passing truck\'s slipstream hits the cone.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '4-lb bases:'), ' indoor and sheltered parking lot only. They blow over in any real wind.'),
      h('li', null, h('strong', null, '7-lb bases:'), ' the NJ contractor daytime standard, up to roughly 45 mph traffic.'),
      h('li', null, h('strong', null, '10-lb bases:'), ' nighttime work, or 35–55 mph daytime. Standard for any closure that runs past dusk.'),
      h('li', null, h('strong', null, '12-lb bases (or kettle-style with a sandbag cavity):'), ' freeway and high-wind jobs. Always pair with a sandbag at 55+ mph.'),
    ),
    h(
      'p',
      null,
      'PVC vs. rubber base: the cone body is almost always PVC; the base is almost always rubber or recycled rubber compound. Buy rubber-base cones for any road job — rubber survives being driven over once or twice; PVC bases crack on the first impact.',
    ),

    h('h2', null, 'Color: orange, fluorescent pink-orange, lime, or red?'),
    h(
      'p',
      null,
      'For 95% of buyers, the answer is fluorescent orange. The federal MUTCD specifies "fluorescent orange" as the standard color for short-duration and mobile work zones, and it is the only color that ships from major manufacturers in case quantities at the prices listed above.',
    ),
    h(
      'p',
      null,
      'The 2023 MUTCD update allows ',
      h('strong', null, 'fluorescent pink-orange'),
      ' for incident-response and emergency work zones — distinguishing planned construction (orange) from unplanned events (pink). Most contractors do not need pink; they are issued to fire / EMS / police agencies for crash scenes. Lime green and red cones are not MUTCD-compliant for any roadway use; they are sold for sport, parking lot, or warehouse applications only.',
    ),

    h('h2', null, 'How many cones to buy for a typical contractor outfit'),
    h(
      'p',
      null,
      'For a small NJ road-work shop putting together a first cone set, the practical recipe is:',
    ),
    h(
      'ul',
      null,
      h('li', null, '20× 28-inch cones with 7-lb rubber base, double reflective collar — covers most NJ jobs up to 45 mph daytime + most nighttime work to 35 mph'),
      h('li', null, '6× 36-inch cones with 10-lb base — covers nighttime work above 35 mph and any 55+ mph job'),
      h('li', null, '6× 18-inch cones with 4-lb base — for parking-lot / yard / staging-area work where you do not want to deploy the larger gear'),
      h('li', null, 'A flat-stack storage rack on the truck — cones stay clean, last longer, and load/unload faster than a "throw them in the bed" approach'),
    ),
    h(
      'p',
      null,
      'Total stocking cost for that recipe: roughly $1,200–$1,800 retail plus ~$200 for the storage rack. ',
      'For specific job-by-job cone counts, see our ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'cone-count guide for NJ lane closures'),
      ' — the math is taper length × 10-foot spacing rule, plus 25% spares, plus the buffer-and-activity area at 2× spacing.',
    ),

    h('h2', null, 'Where to buy traffic cones in Central NJ (same-day delivery)'),
    h(
      'p',
      null,
      'For Central NJ contractors, ',
      h('a', { href: '/category/cones-drums' }, 'browse our cones, drums, and channelizers'),
      ' — we stock every size listed above with NJ-grade reflective sheeting and ship same-day to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean counties. ',
      'Orders placed before noon ship the same day; orders placed before 4pm ship next morning.',
    ),
    h(
      'p',
      null,
      'For a custom set sized to a specific job, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' — describe the speed limit, day or night work, and the number of crews and we will spec the exact size, count, base weight, and collar grade that pass NJ inspection on the first walk-through. ',
      'Or use the ',
      h('a', { href: '/assistant' }, 'TrafficKit Assistant'),
      ' to walk through cone selection interactively if you are not sure where to start.',
    ),

    h('h2', null, 'What separates a good cone from a cheap one'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'UV-stabilized PVC.'), ' Cheap PVC fades from fluorescent orange to pale pink in 12–18 months of sun. Stabilized PVC holds color for 3–5 years.'),
      h('li', null, h('strong', null, 'Bonded reflective collar (not glued).'), ' Glued collars peel at the edges within a season; bonded collars survive being driven over.'),
      h('li', null, h('strong', null, 'Recessed-base sandbag cavity.'), ' On 12-lb cones, a built-in cavity for a sandbag adds another 8–15 lb of ballast for high-wind or freeway work.'),
      h('li', null, h('strong', null, 'Stackable/nestable design.'), ' All major-brand cones nest, but cheap imports sometimes warp and do not nest cleanly. Cones that do not nest waste truck space.'),
    ),

    h('h2', null, 'When cones fail an inspection'),
    h(
      'p',
      null,
      'The four most common reasons cones get cited on a TCP review:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Wrong size for posted speed.'), ' 18-inch cones on a 35+ mph road. The most common cite.'),
      h('li', null, h('strong', null, 'Faded orange.'), ' Cones that are pale or pink from UV exposure fail the daytime visibility check.'),
      h('li', null, h('strong', null, 'Peeling collar.'), ' If the reflective sheeting is lifting at the edges, the cone fails the nighttime visibility check even if it looks fine in daylight.'),
      h('li', null, h('strong', null, 'Cracked PVC body.'), ' Cones driven over enough times start cracking at the cone-to-base seam. Once cracked, water gets in, balance shifts, and the cone tips easier.'),
    ),
    h(
      'p',
      null,
      'Replace cones once any of those conditions appear. A faded cone costs you the same job-site cite as no cone at all.',
    ),
  ),
  faqs: [
    {
      q: 'How much does a traffic cone cost?',
      a: 'In case quantities, expect $9–$18 each for an 18-inch parking-lot cone, $20–$32 for a 28-inch double-collar road cone with a 7-lb rubber base, and $35–$60 for a 36-inch highway cone with a 10–12 lb base. The 28-inch cone is the most-bought size for NJ contractors and the one we recommend most often.',
    },
    {
      q: 'What size traffic cone do I need to buy?',
      a: 'Match the cone to the road. 18-inch cones are OK for parking lots and ≤25 mph daytime work only. 28-inch cones are the standard for daytime road work up to 45 mph and nighttime work up to 35 mph. 36-inch cones are required for nighttime work above 35 mph and any 55+ mph daytime work. If in doubt, buy the 28-inch double-collar cone — it covers the widest range of jobs.',
    },
    {
      q: 'Are 18-inch traffic cones legal for road work?',
      a: 'Only on roads posted 25 mph or less, and only during daytime. For any work zone above 35 mph or anytime at night, 18-inch cones are too short to meet MUTCD visibility requirements and inspectors will cite them on a TCP review. Buy 28-inch cones if you are doing any real road work.',
    },
    {
      q: 'Can I buy traffic cones same-day in NJ?',
      a: 'Yes. We stock 18-inch, 28-inch (single and double collar), and 36-inch cones with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean counties. Orders placed before noon ship the same day; before 4pm ship next morning.',
    },
    {
      q: 'How many cones should I buy for a typical lane closure?',
      a: 'For a single-lane closure on a 40 mph road, plan for 20–30 cones (taper + buffer + activity area + 25% spares). For a parking-lot or event channelization, plan for 1 cone every 8–10 feet of channelized path. The full math is in our cone-count guide for NJ lane closures.',
    },
    {
      q: 'Do traffic cones come with reflective collars or do I have to add them?',
      a: 'They come with collars from the factory. The two collar configurations are single 4-inch (OK for daytime ≤35 mph) and double 4+6-inch (the working standard for day/night work to 45 mph). Always specify ASTM Type IV / high-intensity prismatic sheeting; engineer-grade Type I/II will fail nighttime visibility checks.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
  ],
  relatedArticles: [
    'traffic-cones-buying-guide',
    'road-cones-vs-traffic-cones',
    'how-many-cones-for-lane-closure-nj',
  ],
}
