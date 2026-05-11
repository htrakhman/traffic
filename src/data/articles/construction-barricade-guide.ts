import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "construction barricade" (~500/mo, High comp, $19.54 bid).
 * Pillar / definitional. Disambiguates the term, walks MUTCD Type I/II/III,
 * water-filled, and pedestrian variants, and gives a buying playbook.
 */
export const articleConstructionBarricadeGuide: Article = {
  slug: 'construction-barricade-guide',
  title: 'Construction Barricade: Types, MUTCD Rules, and What to Actually Buy',
  excerpt:
    '"Construction barricade" is a catch-all that covers four very different products: Type I, Type II, Type III, and water-filled barriers. Picking the wrong one is the #1 reason small contractors fail TCP inspection. Here is the full sort.',
  metaDescription:
    'Construction barricades — Type I, II, III, A-frame, and water-filled — explained with MUTCD rules, speed/duration matchups, and what to buy for NJ road work.',
  primaryKeyword: 'construction barricade',
  secondaryKeywords: [
    'construction barricades',
    'barricade traffic',
    'barricade for traffic',
    'safety barricade',
    'road construction barricade',
    'work zone barricade',
  ],
  targetVolume: 500,
  datePublished: '2026-05-11',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      '"Construction barricade" is the umbrella term contractors and procurement folks use for anything that physically blocks or channels traffic on a job site. ',
      h('strong', null, 'In practice it covers four distinct products — Type I, Type II, Type III, and water-filled barrier — each with its own MUTCD speed limit, duration class, and price point.'),
      ' Buy the wrong type for the job and you will either fail inspection on day one or replace the whole set after the first wind event. This is the working sort, with the buy recommendations underneath.',
    ),

    h('h2', null, 'What "construction barricade" actually means in the MUTCD'),
    h(
      'p',
      null,
      'The federal Manual on Uniform Traffic Control Devices (MUTCD) does not use the phrase "construction barricade" anywhere. The term lives in catalog language and contractor speech. The MUTCD calls these devices ',
      h('em', null, 'channelizing devices'),
      ' (cones, drums, tubular markers) when they guide traffic, and ',
      h('em', null, 'barricades'),
      ' (Type I, II, III) when they close off a hazard. A "construction barricade" in most procurement contexts is one of the three Type classes — typically a rail-and-stripe device that closes a lane, a sidewalk, or an open trench during active work.',
    ),
    h(
      'p',
      null,
      'For a full breakdown of MUTCD §6F.63 and the type classes, see our ',
      h('a', { href: '/blog/type-iii-barricade-vs-type-i-type-ii' }, 'Type I vs II vs III comparison'),
      ' — that article is the technical companion to this one.',
    ),

    h('h2', null, 'The four products that get called "construction barricade"'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Type'),
            h('th', { className: 'text-left p-2 border-b' }, 'Profile'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical use'),
            h('th', { className: 'text-left p-2 border-b' }, 'Speed ceiling'),
            h('th', { className: 'text-left p-2 border-b' }, 'Retail / unit'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Type I'), h('td', { className: 'p-2' }, 'Single 8" reflective rail, A-frame'), h('td', { className: 'p-2' }, 'Sidewalks, low-speed lanes'), h('td', { className: 'p-2' }, '≤ 35 mph daytime'), h('td', { className: 'p-2' }, '$45–$80')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type II'), h('td', { className: 'p-2' }, 'Two 8" rails stacked'), h('td', { className: 'p-2' }, 'Higher visibility, same-speed work'), h('td', { className: 'p-2' }, '≤ 35 mph daytime'), h('td', { className: 'p-2' }, '$70–$120')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type III'), h('td', { className: 'p-2' }, 'Three 8" rails, 4–8 ft wide'), h('td', { className: 'p-2' }, 'Road closures, detours'), h('td', { className: 'p-2' }, 'Any speed if anchored'), h('td', { className: 'p-2' }, '$110–$280')),
          h('tr', null, h('td', { className: 'p-2' }, 'Water-filled'), h('td', { className: 'p-2' }, 'Plastic shell, 200–1500 lb when filled'), h('td', { className: 'p-2' }, 'Long-duration closures, positive protection'), h('td', { className: 'p-2' }, '45 mph (TL-2)'), h('td', { className: 'p-2' }, '$140–$320')),
        ),
      ),
    ),
    h('p', null, 'Prices are NJ retail ranges as of early 2026; bulk pricing and contractor accounts beat these by 10–20%.'),

    h('h2', null, 'Picking the right one — a 30-second decision tree'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Sidewalk or pedestrian path closure, posted speed ≤ 35 mph:'), ' Type I or A-frame. Plastic is fine. Cheap and stackable.'),
      h('li', null, h('strong', null, 'Lane closure on a 25–35 mph collector, daytime only:'), ' Type II. Two rails give the extra visibility against parked-car backgrounds.'),
      h('li', null, h('strong', null, 'Any road closure, detour route, or nighttime work above 35 mph:'), ' Type III with crashworthy (NCHRP 350 or MASH TL-2) base, sandbagged.'),
      h('li', null, h('strong', null, 'Long-duration closure (weeks+) or a positive-protection requirement from the engineer:'), ' Water-filled barrier. Heavy, slow to set up, but it actually stops a passenger car at 45 mph.'),
      h('li', null, h('strong', null, 'Crowd or event control (no vehicles):'), ' Bike-rack or pedestrian barriers — not the same product class. See our ',
        h('a', { href: '/blog/crowd-control-barriers-buying-guide' }, 'crowd-control barriers guide'),
        '.',
      ),
    ),

    h('h2', null, 'Materials — what to pay for and what to skip'),
    h('h3', null, 'Plastic (HDPE / polyethylene)'),
    h(
      'p',
      null,
      'Lightweight (12–25 lb empty), stackable, UV-stable for 5–7 years before the orange fades. Plastic Type I and Type II barricades are the workhorse for short-duration work — one person can deploy 20 of them out of a pickup bed. Downside: in 20+ mph wind they walk unless ballasted. Always add a sandbag at the base on any windy day.',
    ),
    h('h3', null, 'Steel and aluminum'),
    h(
      'p',
      null,
      'Steel A-frames last decades but they rust at the rail attachments and they are heavy enough that a single contractor will not load 20 in a day. Aluminum is the middle ground — same weight as plastic, lasts longer, costs 30–50% more. For a fleet that lives outside year-round, aluminum or steel wins on total cost of ownership; for jobs where you redeploy weekly, plastic is faster.',
    ),
    h('h3', null, 'Water-filled (positive protection)'),
    h(
      'p',
      null,
      'Empty, these are ~80 lb of HDPE; filled, each unit holds 50–60 gallons and weighs ~500 lb. Linked together they form a continuous wall that meets crashworthy standards (MASH TL-2 for most models). They are the right pick when an engineer has specified "positive protection" — meaning the barrier must physically redirect an errant vehicle, not just signal a closure. See our ',
      h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'water-filled barriers guide'),
      ' for the install math.',
    ),

    h('h2', null, 'Reflectivity — the spec that fails most TCP reviews'),
    h(
      'p',
      null,
      'MUTCD §6F.63 requires reflective sheeting on the orange-and-white striped rail. The grade matters: ASTM Type IV high-intensity prismatic is the minimum for any roadway work; Type IX diamond-grade is required on freeway / Interstate closures in most state DOT specs. Plain painted stripes do not pass — they read fine in daylight but disappear at night under headlight glare. NJDOT inspectors flag non-prismatic sheeting on routine reviews; replace any barricade where the sheeting is lifting, faded, or grime-coated to the point you cannot read it from 50 ft at night.',
    ),

    h('h2', null, 'Anchoring — wind and stray drivers'),
    h(
      'p',
      null,
      'No construction barricade stands up to wind or vehicle slipstream without ballast. Practical rules:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Type I / II:'), ' 25-lb sandbag on the base for any sustained wind > 15 mph or any roadway with vehicle traffic within 10 ft.'),
      h('li', null, h('strong', null, 'Type III:'), ' Two 50-lb sandbags or a 5-gal water-filled base; on 45+ mph roads, MASH-compliant base or relocate to a barrier-protected setup.'),
      h('li', null, h('strong', null, 'Water-filled barrier:'), ' The water IS the ballast — but only if you actually fill it. The most common audit finding on these is empty units left as "visual barricades" with no water in them. Inspectors will fail the setup.'),
    ),

    h('h2', null, 'What to buy for a small NJ contractor outfit'),
    h(
      'p',
      null,
      'For a contractor outfitting a working set covering 80% of typical road and utility jobs:',
    ),
    h(
      'ul',
      null,
      h('li', null, '12× Type I plastic A-frame barricades with Type IV sheeting — sidewalks, low-speed lane closures'),
      h('li', null, '6× Type III 8-ft plastic barricades with sandbag tabs — road closures and detours'),
      h('li', null, '4× water-filled barriers (200-lb empty) — long-duration closures, positive protection'),
      h('li', null, '20× 25-lb sandbags pre-filled with sand for ballast'),
    ),
    h(
      'p',
      null,
      'Total stocking cost: roughly $2,800–$3,800 retail. ',
      h('a', { href: '/category/barricades-barriers' }, 'Browse our barricades and barriers'),
      ' for current pricing, or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with the job specs and we will size the set to your typical work — Central NJ same-day delivery available.',
    ),

    h('h2', null, 'When to rent vs. buy'),
    h(
      'p',
      null,
      'For a contractor that runs work zones more than ~10 days a year, buying beats renting on a 6–10 month payback. Renting still wins for one-off jobs (utility shutdowns, weekend events) and for water-filled barriers in any quantity over 20 units — the truck math gets ugly fast. Our ',
      h('a', { href: '/blog/rent-vs-buy-traffic-control-equipment' }, 'rent vs. buy guide'),
      ' has the breakeven math by category.',
    ),
  ),
  faqs: [
    {
      q: 'What is a construction barricade?',
      a: 'A construction barricade is a rail-and-stripe device used to close or channel traffic around active work. The MUTCD classifies them as Type I (single rail, ≤ 35 mph), Type II (two rails, ≤ 35 mph), or Type III (three rails, any speed if anchored). Water-filled plastic barriers are sometimes called barricades too, but technically they are positive-protection barriers.',
    },
    {
      q: 'Are plastic construction barricades MUTCD-compliant?',
      a: 'Yes — plastic Type I, II, and III barricades are fully MUTCD-compliant as long as they carry the required reflective sheeting (ASTM Type IV minimum) and are anchored against wind. The material is not the issue; the visibility and stability are.',
    },
    {
      q: 'How much does a construction barricade cost?',
      a: 'NJ retail: Type I plastic A-frames run $45–$80; Type II run $70–$120; Type III run $110–$280; water-filled barriers run $140–$320 per unit empty. Contractor accounts and 10+ unit buys typically drop these by 10–20%.',
    },
    {
      q: 'What is the difference between a barricade and a barrier?',
      a: 'A barricade is a visual / channelizing device — it tells drivers a lane is closed but does not physically stop an errant vehicle. A barrier (water-filled, concrete, steel guardrail) is a positive-protection device that physically redirects a vehicle. When an engineer specifies "positive protection" on a TCP, you need a barrier, not a barricade.',
    },
    {
      q: 'Do construction barricades need to be anchored?',
      a: 'In practice, yes — every type. Type I and II need a 25-lb sandbag for any sustained wind or traffic slipstream within 10 ft. Type III on a 45+ mph road needs two 50-lb sandbags or a MASH-rated base. Water-filled barriers are only ballasted if you actually fill them, which is the most common audit failure.',
    },
    {
      q: 'Can I use construction barricades for crowd control at an event?',
      a: 'You can, but it is the wrong tool. Bike-rack / pedestrian barriers interlock and are sized for crowd containment; Type I barricades are sized for traffic channelization and tip easily when leaned on. For events, use a pedestrian / crowd-control barrier. For work zones with no pedestrian crowd, use a construction barricade.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Request a job-sized barricade quote', path: '/quote' },
  ],
  relatedArticles: [
    'type-iii-barricade-vs-type-i-type-ii',
    'water-filled-barriers-buying-guide',
    'plastic-barricades-pillar-guide',
  ],
}
