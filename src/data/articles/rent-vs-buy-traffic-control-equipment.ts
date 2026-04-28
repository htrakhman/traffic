import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "what traffic control equipment to buy" + "stock vs order per-job".
 * Decision-tree content for contractors deciding what to keep on the truck
 * vs. what to order per-job. Reframed for the buy/sell model (no rental).
 */
export const articleRentVsBuyTrafficControlEquipment: Article = {
  slug: 'rent-vs-buy-traffic-control-equipment',
  title: 'What Traffic Control Gear Should You Stock vs. Order Per Job? (Contractor\'s Guide)',
  excerpt:
    'Buy the gear you use every week; order the high-value, low-utilization gear (arrow boards, message boards, Type III barricades, full sign packages) per job with same-day delivery. Here is the breakeven math by category.',
  metaDescription:
    'What traffic control gear small NJ contractors should stock vs. order per job. Breakeven math by category — cones, barricades, arrow boards, message boards.',
  primaryKeyword: 'traffic control equipment to buy',
  secondaryKeywords: [
    'what traffic cones to buy',
    'arrow board purchase vs order',
    'work zone equipment ownership cost',
    'NJ contractor equipment list',
    'traffic control gear stocking guide',
  ],
  targetVolume: 590,
  datePublished: '2026-04-27',
  dateModified: '2026-04-28',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Short answer: ',
      h('strong', null, 'stock the commodity gear (cones, basic signs, Type I/II barricades) on your truck, and order the high-value, low-utilization gear (arrow boards, message boards, Type III barricades, full MUTCD sign packages, crash cushions) per-job with same-day delivery.'),
      ' The breakeven on a working set of cones is hit in the first month. The breakeven on a single arrow board is over a year. Most contractors hit the cone breakeven the first week and never hit the arrow-board breakeven, which is exactly the gap a per-job order model fills.',
    ),

    h('h2', null, 'How to think about the decision'),
    h(
      'p',
      null,
      'Owning a piece of work-zone gear has three real costs: the purchase price, the storage and transport cost, and the depreciation/damage cost. Ordering per-job replaces all three with a single delivered price you pay only when the gear is on a job. The math comes down to ',
      h('strong', null, 'utilization rate'),
      ' — the fraction of working days you actually need that gear on the truck.',
    ),
    h(
      'p',
      null,
      'Quick rule of thumb: if a piece of gear is on more than 30% of working days (about 78 days a year), buy it and stock it. If it is on fewer than 15% of working days, order per-job. The middle band is judgment-based and depends on storage and damage realities.',
    ),

    h('h2', null, 'Cones, drums, basic signs — stock them'),
    h(
      'p',
      null,
      'Cones, vertical panels, and basic warning signs are commodity gear. A 28-inch traffic cone retails for $20–35; even with weighted bases you are at $40–60 each. A typical NJ work zone needs 20–30 cones. That is $1,000–$1,800 for a working set — well under the cost of any single substantial job.',
    ),
    h(
      'p',
      null,
      'For any contractor doing road work even occasionally, stocking your own cone set pays back inside the first month and saves a delivery wait every time you respond to a small job. Cones survive a long time if you take care of them (rinse off, store dry, replace when reflective collars peel).',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Verdict: stock.'),
      ' Get the 28-inch cones with double reflective collars (NJ inspectors expect them on anything above 35 mph), a basic set of 48-inch advance warning signs (W20-1, W21-5, W4-2, R11-2, W20-7), and a couple of Type II barricades. ',
      h('a', { href: '/category/cones-drums' }, 'Browse cones and channelizers'),
      '.',
    ),

    h('h2', null, 'Arrow boards — order per-job'),
    h(
      'p',
      null,
      'A trailer-mount arrow board retails for $8,000–$15,000 new. A mid-tier used board off auction is $4,000–$8,000. For a small or mid-sized contractor that needs an arrow board on a handful of jobs a month, the math rarely justifies owning one outright.',
    ),
    h(
      'p',
      null,
      'But the financial math undersells the case for ordering per-job. An arrow board sitting in your yard depreciates regardless of whether it works. The battery / solar charge controller fails. The LED panel takes a hit from a forklift. The trailer suspension rusts. By the time you actually need it, half the owned arrow boards in any small fleet are not job-ready.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Verdict: order per-job.'),
      ' Unless you have a long-term highway contract that needs an arrow board on-site continuously, ordering with delivery is cheaper, less hassle, and the unit shows up working. ',
      h('a', { href: '/category/arrow-boards' }, 'Browse arrow boards'),
      '.',
    ),

    h('h2', null, 'Message boards (PCMS / VMS) — order per-job'),
    h(
      'p',
      null,
      'Same logic as arrow boards but more so. A trailer-mount portable changeable message sign retails for $25,000–$45,000 new. Even a year-round utilization barely justifies ownership for a small shop. Add the cellular data plan, the message-content management software, and the calibration/firmware updates — owning a message board is a small operations problem in itself.',
    ),
    h(
      'p',
      null,
      'The only contractors who buy message boards outright are very large (50+ employees, multiple long-duration contracts) where the unit lives on a single job for 6+ months at a time. Everyone else orders per-job.',
    ),

    h('h2', null, 'Type III barricades — depends on closure cadence'),
    h(
      'p',
      null,
      'Type III barricades retail for $400–800 each. A typical road closure needs at least four. Storage is real — a Type III takes 6 ft of yard space and they get banged up in transport. Sandbags or water-filled bases are extra storage.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Verdict: stock a working set if you do at least one full road closure a month;'),
      ' order per-job if you do them less frequently or you need to surge for a one-off big job.',
    ),

    h('h2', null, 'Crash cushions and TMAs — almost always order per-job'),
    h(
      'p',
      null,
      'A truck-mounted attenuator (TMA) is a $50,000–$80,000 trailer that gets attached to a shadow vehicle to absorb a rear-end impact and protect workers downstream. They are required on most NJDOT work zones and on the Turnpike / Parkway for travel-lane closures.',
    ),
    h(
      'p',
      null,
      'Buying makes sense only for very large flagging or closure operations that staff their own TMA crews. For a small or mid-sized contractor, the math never works — you would have to deploy the TMA almost daily to break even, and the operator/CDL/insurance overhead is its own cost. Order per-job, often as a package with the operator and the truck.',
    ),

    h('h2', null, 'Sign packages and full MUTCD kits — mixed'),
    h(
      'p',
      null,
      'Stock the basic warning signs you use on every job. Order specialty signs you need once a quarter (oversize R11 series, W series with route-specific overlays, custom detour signs). A "full MUTCD package" delivery (advance warning + work-zone-internal signs + closure barricades) is also useful for short-notice jobs where you do not have time to assemble the kit yourself.',
    ),

    h('h2', null, 'The breakeven cheat sheet'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Equipment'), h('th', { className: 'text-left p-2 border-b' }, 'Stock if utilization >'), h('th', { className: 'text-left p-2 border-b' }, 'Default recommendation')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Cones, basic signs, Type I/II barricades'), h('td', { className: 'p-2' }, '15 days/yr'), h('td', { className: 'p-2' }, 'Stock')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type III barricades'), h('td', { className: 'p-2' }, '50 days/yr'), h('td', { className: 'p-2' }, 'Order per-job')),
          h('tr', null, h('td', { className: 'p-2' }, 'Arrow boards'), h('td', { className: 'p-2' }, '90 days/yr'), h('td', { className: 'p-2' }, 'Order per-job')),
          h('tr', null, h('td', { className: 'p-2' }, 'PCMS/message boards'), h('td', { className: 'p-2' }, '180 days/yr'), h('td', { className: 'p-2' }, 'Order per-job')),
          h('tr', null, h('td', { className: 'p-2' }, 'TMA / crash cushion'), h('td', { className: 'p-2' }, '200 days/yr'), h('td', { className: 'p-2' }, 'Order per-job')),
          h('tr', null, h('td', { className: 'p-2' }, 'Specialty signs (custom detour, oversize)'), h('td', { className: 'p-2' }, '30 days/yr'), h('td', { className: 'p-2' }, 'Order as needed')),
        ),
      ),
    ),

    h('h2', null, 'Hidden costs that change the math'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Storage and yard space.'), ' Type IIIs and arrow boards take up real square footage. Some shops rent yard space — that cost belongs in the ownership equation.'),
      h('li', null, h('strong', null, 'Transport.'), ' Hauling an arrow board between your yard and a remote job adds CDL hours and fuel. Per-job orders are typically delivered, which removes that cost.'),
      h('li', null, h('strong', null, 'Damage and theft.'), ' Cones get stolen. Arrow boards get vandalized. Owned gear is your insurance problem.'),
      h('li', null, h('strong', null, 'Compliance updates.'), ' MUTCD revisions occasionally change reflectivity requirements. Owned gear that fails the new standard is a sunk cost.'),
      h('li', null, h('strong', null, 'Inspection failures.'), ' Owned gear with peeling sheeting or bent rails fails inspection — and you cannot get a replacement on Saturday from your own yard.'),
    ),

    h('h2', null, 'When stocking a fuller fleet makes sense'),
    h(
      'p',
      null,
      'There are three contractor profiles that justify buying more rather than less:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Long-term highway contract holders.'), ' If you are running a 1–3 year NJDOT job that has continuous lane closures, owning the arrow boards and Type IIIs probably pays back inside 18 months.'),
      h('li', null, h('strong', null, 'Multi-crew operators with ≥5 active work zones daily.'), ' At that scale, the per-job ordering coordination overhead alone justifies stocking the high-frequency gear.'),
      h('li', null, h('strong', null, 'Specialty event-traffic firms.'), ' Race events, parades, festivals — high-density short-duration setups where stocking a fleet of barricades is unavoidable.'),
    ),

    h('h2', null, 'How to decide for your shop'),
    h(
      'p',
      null,
      'Pull last year\'s job logs and count: how many days per year did you actually deploy each gear category? If a category sits below 15% of working days, order per-job. If it sits above 30%, stock it. Anything in between, do the storage-and-damage gut check.',
    ),
    h(
      'p',
      null,
      'For per-job orders, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' on the gear list you are pricing — same-day Central NJ delivery on most categories. For decision support on a specific job, our ',
      h('a', { href: '/assistant' }, 'AI Assistant'),
      ' will return a gear list and quantities.',
    ),
  ),
  faqs: [
    {
      q: 'What traffic control gear should every NJ road contractor stock?',
      a: 'A working set of 28-inch reflective cones (20–30 minimum), a basic advance warning sign kit (W20-1, W21-5, W4-2, W20-7, R11-2), and 2 Type II barricades. That covers any one-pager TTC plan you would prepare yourself. Everything else — Type III, arrow boards, message boards, TMAs, specialty signs — order per-job with delivery.',
    },
    {
      q: 'Should I buy an arrow board for my shop?',
      a: 'Probably not, unless you deploy an arrow board more than ~90 days a year. New trailer-mount arrow boards run $8,000–$15,000, plus battery / charge-controller maintenance, transport, and storage. Ordering per-job with same-day delivery is almost always cheaper for small and mid-sized contractors.',
    },
    {
      q: 'When does it make sense to buy a message board?',
      a: 'Almost never for a small or mid-sized contractor. PCMS units retail for $25,000–$45,000 new and need a data plan, software, and firmware updates. Owning makes sense only for shops with 6+ months of continuous utilization a year, and the operations overhead still favors ordering per-job.',
    },
    {
      q: 'How many days per year of road closures justifies stocking Type III barricades?',
      a: 'If you do at least one full road closure a month (12+/year), and that pace is steady, owning a working set of 4–6 Type IIIs starts to pay back. Below that, order per-job. Real-world breakeven (factoring storage and damage) is closer to 50 closure-days a year.',
    },
    {
      q: 'What is the cheapest way to outfit a small road-work crew?',
      a: 'Buy the cones, basic signs, and Type II barricades. Order arrow boards, Type IIIs, message boards, and specialty signs per-job. Total upfront stock cost for a small NJ crew runs about $2,000–$3,500 (cones + signs + Type IIs), and per-job order costs scale only with the jobs you actually win.',
    },
  ],
  relatedProducts: [
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
  ],
  relatedArticles: [
    'arrow-board-rental-guide',
    'traffic-control-trailer-rental-guide',
    'traffic-control-equipment-rental',
  ],
}
