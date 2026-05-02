import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic cones near me" (~5K/mo, High comp, ci=100) — local commercial
 * intent. Aligns directly with the 2026-04-27 BUY/DELIVERY pivot. FAQ-heavy AEO
 * structure that wins same-day-delivery + "where can I buy" searches.
 */
export const articleTrafficConesNearMeSameDayDelivery: Article = {
  slug: 'traffic-cones-near-me-same-day-delivery',
  title: 'Traffic Cones Near Me: Same-Day Delivery vs. Big-Box Pickup (NJ Buyer\'s Guide)',
  excerpt:
    'Need cones today? Here is the actual comparison between local NJ delivery, hardware-store pickup, and online order — what each costs, what you actually get, and how to avoid showing up to the job with the wrong size.',
  metaDescription:
    'Traffic cones near me: same-day NJ delivery vs Home Depot pickup vs online. Real prices, sizes available, and how to avoid the wrong cone for your job.',
  primaryKeyword: 'traffic cones near me',
  secondaryKeywords: [
    'safety cones near me',
    'road cones near me',
    'orange cones near me',
    'where to buy traffic cones',
    'traffic cones for sale near me',
    'same day traffic cone delivery',
    'NJ traffic cone supply',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-02',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'For NJ contractors and facility managers searching "traffic cones near me," there are three real options:'),
      ' (1) same-day local delivery from a traffic-control supplier like TrafficKit (28-inch MUTCD cones with the right reflective collar, delivered to your job by 5 PM if ordered by 11 AM), (2) drive to Home Depot or Lowe\'s and grab whatever 28-inch cones they have on the shelf (usually 1-2 SKUs, not always with the right collar), or (3) order online with 2-3 day shipping. The right choice depends on whether you need MUTCD-compliant cones for an inspected work zone or just hazard markers for a parking lot. Below is the full comparison.',
    ),

    h('h2', null, 'The three real "traffic cones near me" options in NJ'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Source'),
            h('th', { className: 'text-left p-2 border-b' }, 'Speed'),
            h('th', { className: 'text-left p-2 border-b' }, 'Size selection'),
            h('th', { className: 'text-left p-2 border-b' }, 'MUTCD spec?'),
            h('th', { className: 'text-left p-2 border-b' }, 'Price (28-in)'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Local traffic-control supplier'), h('td', { className: 'p-2' }, 'Same-day (by 11 AM cutoff)'), h('td', { className: 'p-2' }, '18, 28, 36 in + drums'), h('td', { className: 'p-2' }, 'Yes — verified collar grade'), h('td', { className: 'p-2' }, '$22-32 each')),
          h('tr', null, h('td', { className: 'p-2' }, 'Home Depot / Lowe\'s'), h('td', { className: 'p-2' }, 'Drive there now'), h('td', { className: 'p-2' }, '18, 28 in (limited stock)'), h('td', { className: 'p-2' }, 'Sometimes — check collar'), h('td', { className: 'p-2' }, '$28-40 each')),
          h('tr', null, h('td', { className: 'p-2' }, 'Amazon / online retailers'), h('td', { className: 'p-2' }, '2-5 days shipping'), h('td', { className: 'p-2' }, 'All sizes'), h('td', { className: 'p-2' }, 'Listed but verify on arrival'), h('td', { className: 'p-2' }, '$18-30 each + freight')),
          h('tr', null, h('td', { className: 'p-2' }, 'Tractor / farm supply'), h('td', { className: 'p-2' }, 'Same day at store'), h('td', { className: 'p-2' }, '18-28 in only'), h('td', { className: 'p-2' }, 'Rarely — agricultural use'), h('td', { className: 'p-2' }, '$25-35 each')),
          h('tr', null, h('td', { className: 'p-2' }, 'Rental yards (Sunbelt, etc.)'), h('td', { className: 'p-2' }, 'Same day pickup, daily rate'), h('td', { className: 'p-2' }, '28 in mostly'), h('td', { className: 'p-2' }, 'Yes — but rental, not buy'), h('td', { className: 'p-2' }, '$2-4/day rental')),
        ),
      ),
    ),

    h('h2', null, 'When to use a local traffic-control supplier'),
    h(
      'p',
      null,
      'You want a local traffic-control supplier when:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'The cones are going into a TCP-inspected work zone and you need MUTCD-compliant collar grades on every unit.'),
      h('li', null, 'You need more than 10-15 cones — moving that many through a Home Depot self-checkout is slow and the store typically only has 6-8 of any single SKU.'),
      h('li', null, 'You need a mix of sizes (18-in for parking-lot staging plus 28-in for the lane closure plus a few 36-in for nighttime).'),
      h('li', null, 'You want them delivered to the job site, not loaded into your truck across town and re-loaded again.'),
      h('li', null, 'You need any add-ons: cone bars, sandbag ballast, replacement reflective collars, sign mounts.'),
    ),
    h(
      'p',
      null,
      'For Central NJ — Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon counties — TrafficKit delivers same-day for orders placed before 11 AM. ',
      h('a', { href: '/category/cones-drums' }, 'Browse our cone inventory'),
      ' or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' and we will turn it around in minutes.',
    ),

    h('h2', null, 'When the big-box store is fine'),
    h(
      'p',
      null,
      'Drive to Home Depot or Lowe\'s when:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'You need 1-6 cones for a parking lot, driveway, or non-roadway hazard.'),
      h('li', null, 'You can verify in the aisle that the cone has a reflective collar (not all big-box SKUs do — some are flat orange).'),
      h('li', null, 'The job is on private property and not subject to NJDOT or municipal inspection.'),
      h('li', null, 'It is 9 PM and you need the cone tomorrow morning, before any local supplier opens.'),
    ),
    h(
      'p',
      null,
      'The catch: big-box selection is shallow. Most stores carry one 28-inch SKU and one 18-inch SKU, sometimes a "construction set" 4-pack. They do not stock 36-inch cones. They do not stock channelizing drums. They almost never carry double reflective collars (the spec required for nighttime work above 35 mph). For inspected highway work, this is a non-starter.',
    ),

    h('h2', null, 'When online ordering makes sense'),
    h(
      'p',
      null,
      'Order online when you have lead time. Amazon and direct-from-manufacturer sites usually beat local prices by $3-8 per cone, especially in 50+ count quantities. The trade-off is shipping time (2-5 business days for ground freight on a pallet of cones) and inspection risk on arrival — verify the collar grade matches the listing before you accept the freight delivery.',
    ),
    h(
      'p',
      null,
      'Online does not work when the job starts tomorrow. The freight company\'s 5-day window is real. If you need cones in the next 24-48 hours, local supply or big-box are your only options.',
    ),

    h('h2', null, 'What happens if you show up with the wrong cones'),
    h(
      'p',
      null,
      'On an NJDOT or municipal inspected work zone, the wrong cone is a TCP cite. The most common failures:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '18-inch cones on a 35+ mph road.'), ' MUTCD requires 28-inch minimum at that speed. Inspector flags the closure, you re-stage with 28-inch and the job loses an hour.'),
      h('li', null, h('strong', null, 'No reflective collar.'), ' For any night work or any work above 35 mph, missing collars fail nighttime visibility — automatic cite.'),
      h('li', null, h('strong', null, 'Wrong stripe orientation on barricades.'), ' Barricade stripes have to slope DOWN toward the side traffic should pass on. Reversed stripes fail inspection.'),
      h('li', null, h('strong', null, 'Faded cones.'), ' Pale or pink cones (18+ months of UV exposure) fail visibility. Inspectors carry a comparison swatch.'),
    ),
    h(
      'p',
      null,
      'For full TCP-spec detail, see our ',
      h('a', { href: '/blog/njdot-work-zone-standards-contractor-reference' }, 'NJDOT work zone standards reference'),
      '. For cone-count math on a specific lane closure, the ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'cone count guide'),
      ' walks through the formula.',
    ),

    h('h2', null, 'How TrafficKit\'s same-day delivery actually works'),
    h(
      'ol',
      { className: 'list-decimal pl-6 space-y-2' },
      h('li', null, h('strong', null, 'Order by 11 AM.'), ' Use the website checkout, call, or text. Tell us cone size, count, base weight, and reflective grade — or describe the job and we will spec it.'),
      h('li', null, h('strong', null, 'We confirm within 30 min.'), ' You get a delivery window (typically 1-5 PM same day for the 6-county NJ radius).'),
      h('li', null, h('strong', null, 'Truck rolls.'), ' We pull from inventory in the warehouse and deliver to your address — job site, yard, office, wherever.'),
      h('li', null, h('strong', null, 'You verify on arrival.'), ' Driver confirms count, size, collar grade. Sign and you are good to go.'),
    ),
    h(
      'p',
      null,
      'For after-hours or weekend deployments, advance notice helps but emergency runs are usually possible — text the dispatch number and we will work it.',
    ),

    h('h2', null, 'Outside the 6-county NJ radius'),
    h(
      'p',
      null,
      'For points further north (Bergen, Passaic, Essex, Morris, Sussex, Warren), south (Camden, Burlington, Gloucester, Atlantic, Cape May, Cumberland, Salem), or out-of-state (PA, NY, DE, CT), we ship freight next-day or 2-day depending on distance. Same-day is reserved for our delivery footprint where the truck can hit the address inside the workday.',
    ),
    h(
      'p',
      null,
      'For long-term build-up of stock, the freight option works fine — order a pallet, plan around the 2-3 day window, and your unit cost drops 15-25% vs same-day delivery pricing.',
    ),

    h('h2', null, 'What size cone to ask for (the 30-second answer)'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Parking lot, valet, school, indoor:'), ' 18-inch fluorescent orange, 4-7 lb base, single reflective collar (or no collar for indoor).'),
      h('li', null, h('strong', null, 'NJ road work, daytime, ≤45 mph:'), ' 28-inch fluorescent orange, 7-lb rubber base, double reflective collar (4-in + 6-in).'),
      h('li', null, h('strong', null, 'NJ nighttime work or 50+ mph:'), ' 36-inch fluorescent orange, 10-lb rubber base, double reflective collar.'),
      h('li', null, h('strong', null, 'Freeway taper:'), ' 36-inch cones plus 42-inch channelizing drums for the taper itself.'),
    ),
    h(
      'p',
      null,
      'For more nuance on the size-by-application breakdown, see our ',
      h('a', { href: '/blog/road-cones-vs-traffic-cones' }, 'road cones vs traffic cones article'),
      '.',
    ),

    h('h2', null, 'The bottom line'),
    h(
      'p',
      null,
      'For NJ buyers searching "traffic cones near me," the practical answer is: same-day local delivery beats the alternatives on every dimension except 1-3 cone parking-lot purchases. For any inspected work zone, any night job, or any order above 10 cones, calling a traffic-control supplier saves time, money, and inspection risk vs running the big-box loop. ',
      h('a', { href: '/category/cones-drums' }, 'Browse our cones'),
      ', use the ',
      h('a', { href: '/assistant' }, 'TCP assistant'),
      ' to spec the right size, or ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' for a same-day delivery to anywhere in our 6-county NJ footprint.',
    ),
  ),
  faqs: [
    {
      q: 'Where can I buy traffic cones near me in NJ?',
      a: 'For Central NJ (Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon), TrafficKit delivers same-day for orders placed by 11 AM. Big-box stores like Home Depot and Lowe\'s carry limited inventory (1-2 SKUs) for emergency 1-6 cone purchases. For larger orders or MUTCD-spec inspected work zones, a local traffic-control supplier is the right call.',
    },
    {
      q: 'Does Home Depot sell traffic cones?',
      a: 'Yes, but selection is limited — typically one 28-inch and one 18-inch SKU per store, sometimes a "construction set" 4-pack. Most stores do not stock 36-inch cones, channelizing drums, or double-collar reflective grades. Verify the collar grade in the aisle before buying for an inspected work zone.',
    },
    {
      q: 'Can I get traffic cones delivered same day in NJ?',
      a: 'Yes — TrafficKit runs same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon counties for orders placed by 11 AM. Outside that radius, we ship next-day freight.',
    },
    {
      q: 'How much do traffic cones cost?',
      a: 'In 2026, 28-inch fluorescent orange cones with double reflective collars run $22-32 each from local suppliers, $28-40 at big-box stores, and $18-30 plus freight from online retailers. 36-inch cones are roughly 2-2.5x the 28-inch price.',
    },
    {
      q: 'Should I rent or buy traffic cones?',
      a: 'For occasional one-off jobs (under 4-5 deployments per year), renting from a local yard at $2-4/cone/day works. For any contractor doing weekly road work, buying pays back in 6-10 deployments. See our rent vs buy guide for the full breakdown.',
    },
    {
      q: 'Where can I rent traffic cones near me?',
      a: 'Equipment rental yards (Sunbelt, United, etc.) carry 28-inch traffic cones at $2-4/day. For multi-week projects or recurring work, ask about weekly or monthly rates — they typically halve the daily rate. Our rent vs buy guide walks through when each makes sense.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Safety Vests & Hi-Vis', path: '/category/safety-vests-hi-vis' },
  ],
  relatedArticles: [
    'traffic-cones-buying-guide',
    'traffic-cones-for-sale',
    'road-cones-vs-traffic-cones',
  ],
}
