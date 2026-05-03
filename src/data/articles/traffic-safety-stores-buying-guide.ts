import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic safety stores" (~5000/mo, High comp, $36.00 bid).
 * Decision-tree structure — walks a buyer through the question of where
 * to buy traffic safety equipment (national chain vs. regional supplier
 * vs. catalog-only vs. local with delivery), with a checklist for vetting
 * any vendor. High commercial intent — bid is the highest in the cluster.
 */
export const articleTrafficSafetyStoresBuyingGuide: Article = {
  slug: 'traffic-safety-stores-buying-guide',
  title: 'Traffic Safety Stores: How to Pick a Supplier (Decision Tree for Contractors)',
  excerpt:
    'Where you buy traffic safety gear matters more than what you buy — a $40 cone from a vendor with no inventory and a 10-day shipping window costs you more than a $55 cone delivered same-day. Here is the decision tree for picking a supplier, plus a 12-point vetting checklist.',
  metaDescription:
    'Traffic safety stores compared: national chains vs. regional vs. catalog vs. local-with-delivery. Decision tree, 12-point vendor vetting checklist, and how to actually evaluate a quote.',
  primaryKeyword: 'traffic safety stores',
  secondaryKeywords: [
    'traffic safety supply',
    'traffic safety equipment supplier',
    'traffic safety store near me',
    'where to buy traffic cones',
    'traffic safety warehouse',
    'work zone supply store',
    'traffic control supplier',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-03',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Most contractors pick a traffic safety store the wrong way: lowest item price, then complain about shipping. The right way is the opposite. ',
      h('strong', null, 'Total landed cost (item + shipping + lead time) is what determines the real price'),
      ', and the suppliers with the best item prices almost never win on landed cost. This guide is a decision tree — answer a few questions about your job, and you will know which type of supplier to call before you compare prices.',
    ),

    h('h2', null, 'Step 1 — Answer four questions about the job'),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'When do you need it?'), ' Same day, 2–3 days, this week, or stocking inventory?'),
      h('li', null, h('strong', null, 'How big is the order?'), ' < $500, $500–$5,000, $5,000–$50,000, or > $50,000?'),
      h('li', null, h('strong', null, 'Do you need MUTCD / state-DOT compliance paperwork?'), ' (MASH test reports, NCHRP-350 docs, retroreflectivity certs)'),
      h('li', null, h('strong', null, 'Do you need an installer or just gear?'), ' Some jobs (RRFB, in-street post installs, bury depths) need someone to come out.'),
    ),
    h(
      'p',
      null,
      'Your answers point you to one of four supplier types below. There is no universal best vendor — there is only the best one for your specific combination of speed, size, and compliance needs.',
    ),

    h('h2', null, 'Type 1 — National catalog (large inventory, slow ship)'),
    h(
      'p',
      null,
      'Examples: the big national catalogs that ship from a midwest warehouse. Tens of thousands of SKUs, deep specialty inventory, but most orders ship UPS Ground from a single warehouse.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Best for:'), ' specialty / unusual gear (custom signs, exotic crash cushions, rare MUTCD codes)'),
      h('li', null, h('strong', null, 'Best for:'), ' inventory orders where lead time is not critical'),
      h('li', null, h('strong', null, 'Avoid for:'), ' same-day or next-day jobs — typical lead is 5–10 business days plus shipping'),
      h('li', null, h('strong', null, 'Avoid for:'), ' bulky items where freight cost approaches item cost (water-filled barriers, message boards)'),
    ),

    h('h2', null, 'Type 2 — Regional distributor (mid-size warehouse, regional fleet)'),
    h(
      'p',
      null,
      'Examples: regional traffic-control distributors that operate one or two warehouses serving a multi-state area, often with their own delivery trucks.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Best for:'), ' large standing orders ($5K+) where the regional fleet can deliver pallet quantities'),
      h('li', null, h('strong', null, 'Best for:'), ' state-route work that needs MASH-rated inventory in volume'),
      h('li', null, h('strong', null, 'Avoid for:'), ' small or sub-$500 orders — minimum-order surcharges and freight will eat 20–30% of the order'),
      h('li', null, h('strong', null, 'Avoid for:'), ' urgent orders outside the regional warehouse footprint — they will substitute UPS or refuse the job'),
    ),

    h('h2', null, 'Type 3 — Big-box / hardware retail (in-stock, limited specialty)'),
    h(
      'p',
      null,
      'Examples: the orange-and-blue national chains. Carry the basics — generic 28 in cones, Type I barricades, basic warning signs — and you can drive over and pick them up today.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Best for:'), ' a same-day "I forgot to bring cones" emergency on a small job'),
      h('li', null, h('strong', null, 'Best for:'), ' a homeowner doing a one-time DIY project'),
      h('li', null, h('strong', null, 'Avoid for:'), ' MUTCD-compliant work on public roads — most retail cones are 7 lb, sub-grade rubber, and not legal for travel-lane use over 35 mph'),
      h('li', null, h('strong', null, 'Avoid for:'), ' contractors who need consistent inventory — out-of-stock is the norm in TTC at retail'),
    ),

    h('h2', null, 'Type 4 — Local supplier with same-day delivery (the buy/sell + delivery model)'),
    h(
      'p',
      null,
      'Examples: regional sellers with a yard 30–60 minutes from your jobsite, holding inventory and running a delivery truck on the same day. (This is what we do — Traffic Control Supply, Central NJ.)',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Best for:'), ' contractors on a job today who realized at 9 am they need 40 cones, an arrow board, and a sign package by 1 pm'),
      h('li', null, h('strong', null, 'Best for:'), ' total-landed-cost optimization — no freight, no UPS surcharge, no minimum-order penalty'),
      h('li', null, h('strong', null, 'Best for:'), ' MUTCD-compliant gear (MASH-rated barriers, Type IV/IX sheeting signs, real Type III barricades)'),
      h('li', null, h('strong', null, 'Avoid for:'), ' truly exotic items not in the local supplier catalog (escalate to a national catalog and accept the lead time)'),
      h('li', null, h('strong', null, 'Avoid for:'), ' jobs outside the local supplier delivery footprint (call before you order)'),
    ),

    h('h2', null, 'The 12-point vendor vetting checklist'),
    h(
      'p',
      null,
      'Before you place an order over $500 with any traffic safety store, run this checklist:',
    ),
    h(
      'ol',
      null,
      h('li', null, 'Does the supplier carry MASH or NCHRP-350 paperwork on barriers / crash cushions?'),
      h('li', null, 'What is the actual sheeting grade on signs (Engineer / High-Intensity Prismatic / Diamond)?'),
      h('li', null, 'What is the cone base material and weight (rubber, recycled-rubber, virgin PVC, weight in pounds)?'),
      h('li', null, 'Will they substitute brands without telling you, or do you get exactly what you ordered?'),
      h('li', null, 'What is the realistic lead time (not the website default — what they will actually quote you on the phone)?'),
      h('li', null, 'How is freight calculated? (Flat rate, dim weight, or actual?)'),
      h('li', null, 'Is there a minimum order? A small-order surcharge?'),
      h('li', null, 'What is the return policy if you over-order or get the wrong item?'),
      h('li', null, 'Will they hold inventory for a regular customer (call-off orders)?'),
      h('li', null, 'Do they have a real phone number with a real person, or only an order portal?'),
      h('li', null, 'Can they deliver, or are you arranging your own pickup?'),
      h('li', null, 'Do they offer payment terms (net 30) or only credit-card-on-order?'),
    ),

    h('h2', null, 'Total landed cost — the calculation that actually decides'),
    h(
      'p',
      null,
      'A worked example. You need 20 cones, a Type III barricade pack, and 4 signs by tomorrow morning.',
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
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Vendor type'), h('th', { className: 'text-left p-2 border-b' }, 'Items'), h('th', { className: 'text-left p-2 border-b' }, 'Freight'), h('th', { className: 'text-left p-2 border-b' }, 'Lead'), h('th', { className: 'text-left p-2 border-b' }, 'Landed total')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'National catalog'), h('td', { className: 'p-2' }, '$1,150'), h('td', { className: 'p-2' }, '$320'), h('td', { className: 'p-2' }, '7–10 days'), h('td', { className: 'p-2' }, '$1,470 + missed deadline')),
          h('tr', null, h('td', { className: 'p-2' }, 'Regional distributor'), h('td', { className: 'p-2' }, '$1,250'), h('td', { className: 'p-2' }, '$180'), h('td', { className: 'p-2' }, '3–5 days'), h('td', { className: 'p-2' }, '$1,430 + missed deadline')),
          h('tr', null, h('td', { className: 'p-2' }, 'Big-box retail'), h('td', { className: 'p-2' }, '$1,400 (no Type III)'), h('td', { className: 'p-2' }, '$0'), h('td', { className: 'p-2' }, 'Same day'), h('td', { className: 'p-2' }, '$1,400 + non-compliant')),
          h('tr', null, h('td', { className: 'p-2' }, 'Local + delivery'), h('td', { className: 'p-2' }, '$1,320'), h('td', { className: 'p-2' }, '$0–75'), h('td', { className: 'p-2' }, 'Same day'), h('td', { className: 'p-2' }, '$1,320–1,395 ✓')),
        ),
      ),
    ),
    h('p', null, 'On a 24-hour deadline, the local-delivery option is the only one that ships compliant gear in time AND comes in cheapest after freight. The cheapest item-line price (national catalog) is the most expensive landed cost.'),

    h('h2', null, 'Red flags when calling a traffic safety store'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '"Standard MUTCD" with no spec sheet:'), ' the supplier does not actually know what they are shipping'),
      h('li', null, h('strong', null, '"We can drop-ship from a partner":'), ' lead time becomes the partner\'s lead time, plus an extra handling fee'),
      h('li', null, h('strong', null, '"All sales final on TTC equipment":'), ' fine for cones; bad for $5K orders where over-buying happens'),
      h('li', null, h('strong', null, 'Cannot give a delivery date until after payment:'), ' classic catalog-broker tell, walk away'),
      h('li', null, h('strong', null, 'Pricing only via "request a quote" with a 48-hour callback:'), ' fine for big jobs, dealbreaker for normal orders'),
    ),

    h('h2', null, 'Where we fit'),
    h(
      'p',
      null,
      'Traffic Control Supply is a Type 4 — local supplier with same-day Central NJ delivery. We hold inventory in a yard 30–60 minutes from most NJ jobsites, run our own delivery truck, and ship MASH-paperwork-on-request gear. Browse the ',
      h('a', { href: '/category/cones-drums' }, 'cones'),
      ', ',
      h('a', { href: '/category/barricades-barriers' }, 'barricades'),
      ', and ',
      h('a', { href: '/category/signs-sign-stands' }, 'signs'),
      ' categories — or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' and we will spec the order over the phone in under 10 minutes.',
    ),
  ),
  faqs: [
    {
      q: 'What is the best traffic safety store for contractors?',
      a: 'It depends on the job. For same-day MUTCD-compliant jobs, a local supplier with delivery beats every other vendor type on landed cost. For exotic specialty items, a national catalog is the only choice. For multi-pallet standing orders, a regional distributor with a fleet wins. Use the four-question decision in this guide before you compare prices.',
    },
    {
      q: 'Why is the cheapest traffic safety store usually the most expensive in total?',
      a: 'Item price is one of three line items in landed cost — the others are freight (often 15–30% of the order on bulky TTC gear) and lead-time penalty (a missed jobsite deadline costs more than any item markup). National catalogs win on item price and lose on freight and lead time, so they end up most expensive in delivered total.',
    },
    {
      q: 'Can I buy MUTCD-compliant cones at a big-box hardware store?',
      a: 'Mostly no. Most retail cones are 7 lb sub-grade rubber, fine for a driveway or a private jobsite, but not legal for travel-lane use over 35 mph. MUTCD requires 10 lb minimum at posted speeds 35–45 mph and 18–28 lb above 45 mph. Real road work needs a TTC supplier, not a hardware retailer.',
    },
    {
      q: 'How do I vet a traffic safety supplier I have not used before?',
      a: 'Run the 12-point checklist in this guide before placing an order over $500 — MASH paperwork, sheeting grade, base weights, brand-substitution policy, real lead time, freight calculation, return policy, and whether they answer the phone. The first three questions alone filter out the vendors who do not actually know what they sell.',
    },
    {
      q: 'What is the typical lead time from a traffic safety store?',
      a: 'National catalogs: 5–10 business days plus shipping. Regional distributors: 3–5 business days. Local-with-delivery: same day in the delivery footprint, next morning if ordered after cutoff. Big-box retail: in-stock or out-of-stock — no middle ground. Always ask for the realistic lead time on the phone, not the website default.',
    },
    {
      q: 'Do traffic safety stores deliver, or do I have to pick up?',
      a: 'Varies by type. Catalogs ship UPS or freight (you pay). Regional distributors deliver in their truck footprint, otherwise UPS. Local suppliers with delivery (like us) bring it on a flatbed or box truck same-day. Big-box: pickup only. Confirm delivery before you place a large order — bulky items like water-filled barriers and message boards can hit $300–800 in freight from a non-local vendor.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'rent-vs-buy-traffic-control-equipment',
    'traffic-cones-near-me-same-day-delivery',
    'safety-cones-buying-guide',
  ],
}
