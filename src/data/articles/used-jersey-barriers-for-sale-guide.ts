import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "used jersey barriers for sale" (~500/mo, High comp, $7.03 bid).
 * FAQ-heavy AEO structure: direct-answer paragraphs to each likely query,
 * plus a clear "should you buy used" decision section.
 */
export const articleUsedJerseyBarriersForSaleGuide: Article = {
  slug: 'used-jersey-barriers-for-sale-guide',
  title: 'Used Jersey Barriers for Sale: What to Inspect, What to Pay, What to Avoid',
  excerpt:
    'Used concrete Jersey barriers typically sell for $80–$180 each — about 40–60% off new. The catch is condition: rebar exposure, spalling, and impact cracks can make a $90 barrier worthless.',
  metaDescription:
    'Used Jersey barriers for sale — pricing, inspection checklist, when used makes sense vs new or rental, and what contractors actually pay in the NJ/NY/PA market.',
  primaryKeyword: 'used jersey barriers for sale',
  secondaryKeywords: [
    'used concrete jersey barriers',
    'used jersey barriers near me',
    'jersey barriers for sale used',
    'cheap jersey barriers',
    'second hand jersey barriers',
    'salvaged concrete barriers',
  ],
  targetVolume: 500,
  datePublished: '2026-05-18',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Used concrete Jersey barriers typically sell for $80–$180 each in the NJ/NY/PA market — roughly 40–60% off new. ',
      h('strong', null, 'The savings are real, but condition is everything: a barrier with exposed rebar, deep spalling, or impact cracks at the lift points can be worthless even at $90.'),
      ' This guide covers what used Jersey barriers actually cost, the inspection checklist that separates buys from passes, when used is the right call, and when to step up to new or look at plastic instead.',
    ),

    h('h2', null, 'What you pay: 2026 used-market pricing'),
    h(
      'p',
      null,
      "Used 10-ft concrete Jersey barriers in the NJ/NY/PA secondary market are clustering in three pricing bands as of mid-2026:",
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Fair condition, $80–$110 each '), '— surface scuffs, light spalling under 1" deep, no exposed rebar, lift inserts intact. The bulk of the used inventory sits here. Fine for temporary detours, construction yards, and parking-lot perimeter work.'),
      h('li', null, h('strong', null, 'Good condition, $120–$150 each '), "— cosmetic wear only, all 4 lift inserts working, original DOT bid spec, can prove the source. The right buy if you're using them long-term."),
      h('li', null, h('strong', null, 'Like-new, $150–$180 each '), '— pulled from a finished DOT job after 1–2 years of service, fully traceable. Often available in small lots after specific contracts close.'),
    ),
    h(
      'p',
      null,
      'For comparison, new 10-ft concrete Jersey barriers run $220–$320 each delivered in the same market. New plastic water-filled barriers run $180–$280. So a used concrete buy at $120 saves about $130 per unit vs new concrete — meaningful at quantity.',
    ),

    h('h2', null, 'The inspection checklist before you buy'),
    h(
      'p',
      null,
      "Walk every barrier you're buying. Photos lie. The five fast checks:",
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '1. Lift inserts. '), 'All four must be present, threads clean. A barrier with stripped or missing inserts has to be lifted with strap-and-chain, which is slower and risks dropping. Walk away if more than one insert is bad.'),
      h('li', null, h('strong', null, '2. Rebar exposure. '), "Any rebar showing through the concrete is a fail — the barrier loses structural integrity fast once oxidation starts, and DOTs won't accept it for re-use on public work. A small spalled corner is fine; visible bar is not."),
      h('li', null, h('strong', null, '3. Lift-point cracking. '), 'Look at the concrete around each insert. Hairline cracks radiating from the insert mean the barrier has been lifted under load — possibly dropped — and the structural anchor is compromised. Tap the area with a hammer: a hollow sound means delamination underneath.'),
      h('li', null, h('strong', null, '4. End-connection condition. '), 'The pin holes at each end of a barrier (where it connects to the next one) take the most abuse. Crushed concrete around the pin holes means the barrier has been impacted in service. It might still work for static perimeter use, but not for active TTC where impact loading matters.'),
      h('li', null, h('strong', null, '5. Source documentation. '), "Ask where the barriers came from. A finished DOT job is gold — there's a paper trail and the barriers met spec when installed. A no-history barrier from a salvage yard could be from a demolished bridge deck or a failed pour and you have no way to tell."),
    ),

    h('h2', null, 'When used Jersey barriers are the right buy'),
    h(
      'p',
      null,
      'Used makes sense in three specific scenarios:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Long-term perimeter or storage-yard barriers '), '— construction company yards, equipment lots, storage facility perimeters. Static use, no impact loading, condition only needs to be "intact." Used at $90 each is a no-brainer here.'),
      h('li', null, h('strong', null, 'Quantity buys for project-length deployment '), '— if you need 200 barriers for an 18-month project, the $26,000 you save by going used vs new pays for the freight and any inspection time many times over.'),
      h('li', null, h('strong', null, 'Stockpiling for the next job '), '— contractors with a yard often buy used when local DOT closeouts hit the market, even without an immediate use, because the next project will need them and new lead times are 4–8 weeks.'),
    ),

    h('h2', null, 'When to skip used and buy new (or plastic) instead'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Active highway TTC '), '— if a barrier is going to take an impact, you need known structural integrity. Buy new concrete, or use a tested portable barrier system.'),
      h('li', null, h('strong', null, 'Frequent moves '), '— used concrete still weighs 4,000 lbs each; the move cost is the same as new. If you set up and tear down frequently, water-filled plastic at 80 lbs empty (filled in place) is the better economic choice. See ',
        h('a', { href: '/blog/water-filled-jersey-barriers-guide' }, 'water-filled Jersey barriers'),
        '.'),
      h('li', null, h('strong', null, 'Aesthetics matter '), "— used barriers look used. Stained, weathered, sometimes graffitied. For event perimeters or anything customer-facing, new or plastic is worth the premium."),
      h('li', null, h('strong', null, 'You cannot inspect '), '— if the seller will not let you walk the lot before buying, walk away. Photos do not show lift-insert cracking.'),
    ),

    h('h2', null, 'Where used Jersey barriers come from'),
    h(
      'p',
      null,
      'Understanding the supply side helps you spot deals — and traps. Used inventory in the NJ/NY/PA market comes from four sources:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'DOT contract closeouts '), '— state DOTs sell off barriers at the end of large projects (interchange rebuilds, bridge replacements). Inventory comes in 50–500 unit lots, condition is documented, pricing is competitive. Sign up for NJDOT, NYSDOT, PennDOT surplus notification.'),
      h('li', null, h('strong', null, 'General contractor liquidations '), '— GCs sell off barriers when they exit a market or wind down a long-running project. Quality varies; ask for the project history.'),
      h('li', null, h('strong', null, 'Salvage and demolition yards '), '— catch-all for everything else. Pricing is lowest, quality is most variable. Inspect everything.'),
      h('li', null, h('strong', null, 'Online marketplaces (Facebook, Craigslist, machinery sites) '), '— individual sellers, often property owners who acquired barriers for a one-off use. Surprisingly good source for 10–50 unit lots. Always inspect in person.'),
    ),

    h('h2', null, 'Freight: the budget item buyers forget'),
    h(
      'p',
      null,
      'A 10-ft concrete Jersey barrier weighs about 4,000 lbs. A flatbed holds 10–11 barriers maxed by weight (40,000 lb DOT load limit). At $4–$6 per loaded mile and a 200-mile round trip, freight on a 10-barrier load runs $800–$1,200 — about $80–$120 per barrier.',
    ),
    h(
      'p',
      null,
      "Buy local. A used barrier at $130 with $120 freight ($250 total landed) is worse than a new barrier at $260 delivered. Always quote landed cost, not unit cost.",
    ),

    h('h2', null, 'Used Jersey barriers vs water-filled plastic: the head-to-head'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', { className: 'border-b' },
            h('th', { className: 'text-left p-2' }, 'Factor'),
            h('th', { className: 'text-left p-2' }, 'Used concrete'),
            h('th', { className: 'text-left p-2' }, 'New water-filled plastic'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Unit cost'),
            h('td', { className: 'p-2' }, '$80–$180'),
            h('td', { className: 'p-2' }, '$180–$280'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Weight to move'),
            h('td', { className: 'p-2' }, '4,000 lbs'),
            h('td', { className: 'p-2' }, '80 lbs empty / 1,600 lbs full'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Equipment to deploy'),
            h('td', { className: 'p-2' }, 'Crane or HIAB'),
            h('td', { className: 'p-2' }, '2-person lift + water source'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Impact rating'),
            h('td', { className: 'p-2' }, 'TL-3 (if intact)'),
            h('td', { className: 'p-2' }, 'TL-1 to TL-2'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Best use'),
            h('td', { className: 'p-2' }, 'Long-term static perimeter'),
            h('td', { className: 'p-2' }, 'Frequent redeployment'),
          ),
        ),
      ),
    ),

    h('h2', null, 'Buying tips from contractors who do this regularly'),
    h(
      'ul',
      null,
      h('li', null, 'Inspect with a 2-lb hammer and a flashlight. Hollow sound = delamination. Trust your ears.'),
      h('li', null, 'Buy in pin-compatible lots. Different states and manufacturers use slightly different pin systems. If you mix sources, half your barriers will not connect to the other half.'),
      h('li', null, 'Bring a tape measure. Spec is 10-ft length, 24-inch base, 32-inch height. Off-spec barriers (12 ft, taller, custom widths) are harder to integrate into a standard run.'),
      h('li', null, 'Ask about wash. Barriers from oil-spill projects, fuel-tank perimeters, or contaminated sites may need decontamination paperwork. Skip if unclear.'),
      h('li', null, 'Stage delivery. Do not have all 50 dropped at once if you cannot place them the same day — they become a liability and a theft target on the curb.'),
    ),
    h(
      'p',
      null,
      'For new concrete and water-filled options, see ',
      h('a', { href: '/category/barricades' }, 'Barricades & Barriers'),
      '. For a delivery quote on either used or new in Central NJ, hit ',
      h('a', { href: '/quote' }, '/quote'),
      '.',
    ),

    h('h2', null, 'Bottom line'),
    h(
      'p',
      null,
      "Used Jersey barriers are a strong buy at $80–$180 each for static, long-term, perimeter-type use — if you inspect them. Always check lift inserts, rebar exposure, and lift-point cracking. Buy local to avoid eating the savings on freight. For active TTC with impact exposure, buy new. For frequent redeployment, look at water-filled plastic — the move cost flips the math.",
    ),
  ),
  faqs: [
    {
      q: 'How much do used Jersey barriers cost?',
      a: 'In the NJ/NY/PA market in 2026, used 10-ft concrete Jersey barriers run $80–$110 in fair condition, $120–$150 in good condition, and $150–$180 in like-new condition. New equivalents run $220–$320 delivered.',
    },
    {
      q: 'Where can I buy used Jersey barriers?',
      a: 'Four main sources: state DOT contract closeouts (best documentation), general contractor liquidations, salvage and demolition yards (most variable), and online marketplaces like Facebook Marketplace and Craigslist (good for small lots). Always inspect in person.',
    },
    {
      q: 'How heavy is a used concrete Jersey barrier?',
      a: 'A standard 10-ft used concrete Jersey barrier weighs approximately 4,000 lbs — the same as a new one. Used does not mean lighter. You need a crane, HIAB truck, or forklift with adequate capacity to handle them.',
    },
    {
      q: 'Are used Jersey barriers safe to use?',
      a: 'Yes for static perimeter use if they pass inspection (intact lift inserts, no exposed rebar, no lift-point cracking). For active TTC with impact exposure, buy new — you need known structural integrity.',
    },
    {
      q: 'How do I inspect a used Jersey barrier?',
      a: 'Five checks: (1) all four lift inserts present and threaded; (2) no exposed rebar; (3) no hairline cracks radiating from lift points; (4) intact end connections (pin holes not crushed); (5) source documentation. Tap suspect areas with a hammer — hollow sound means delamination.',
    },
    {
      q: 'Are used Jersey barriers cheaper than water-filled plastic?',
      a: 'Per unit, yes — used concrete is often $100 cheaper than new water-filled plastic. But factor freight and deployment cost: water-filled empties weigh 80 lbs and need only a 2-person lift plus a water source, while concrete needs a crane each move. For frequent redeployment, plastic wins on total cost.',
    },
  ],
  relatedProducts: [
    { label: 'Browse barricades & barriers', path: '/category/barricades' },
    { label: 'Browse cones & channelizers', path: '/category/cones' },
    { label: 'Get a delivery quote', path: '/quote' },
    { label: 'Chat with the Assistant', path: '/assistant' },
  ],
  relatedArticles: [
    'jersey-barriers-for-sale-near-me',
    'water-filled-jersey-barriers-guide',
    'concrete-barriers-for-sale-guide',
  ],
}
