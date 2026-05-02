import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic barricades" (~5K/mo, High comp, ci=100) — pillar comparison
 * across the full barricade family (Type I/II/III, jersey, water-filled, crowd
 * control). Anchors the existing barricade cluster (jersey-barricades-guide,
 * type-iii-barricade-vs-type-i-type-ii, crowd-control-barriers-buying-guide,
 * road-barriers-buying-guide) with a single FAQ-heavy AEO entry point.
 */
export const articleTrafficBarricadesPillarGuide: Article = {
  slug: 'traffic-barricades-pillar-guide',
  title: 'Traffic Barricades: Every Type, What They Cost, and Which One You Need',
  excerpt:
    '"Traffic barricades" covers everything from a 4-foot Type I sawhorse to a 10-foot concrete jersey wall. Here is the full family breakdown — when each one is required, what they actually cost, and how to spec them for an NJ job.',
  metaDescription:
    'Traffic barricades explained: Type I, II, III, jersey, water-filled, crowd control. Cost, MUTCD spec, and when each is required. Same-day NJ delivery.',
  primaryKeyword: 'traffic barricades',
  secondaryKeywords: [
    'barricades',
    'jersey barricades',
    'type 3 barricade',
    'construction barricades',
    'barricades for sale',
    'plastic barricades',
    'water-filled barricades',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-02',
  readMinutes: 10,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, '"Traffic barricades" is a category, not a single product.'),
      ' The MUTCD recognizes three formal types (I, II, III) for work-zone use, plus jersey wall, water-filled barriers, and pedestrian crowd-control gates as adjacent classes. Type I is a 24"×8" sawhorse panel for sidewalk and pedestrian closures. Type II adds a second rail. Type III is the 8-ft, 3-rail panel required for full road closures. Jersey barricades and water-filled barriers are positive-protection devices for high-speed work zones. Below is the full type-by-type breakdown — what each costs, when each is required by code, and how to pick.',
    ),

    h('h2', null, 'The full traffic barricade family at a glance'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Size'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best use'),
            h('th', { className: 'text-left p-2 border-b' }, 'Approx. price each'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Type I'), h('td', { className: 'p-2' }, '4 ft wide × 1 rail (8" tall × 24" long stripe)'), h('td', { className: 'p-2' }, 'Sidewalk closure, daytime pedestrian routing'), h('td', { className: 'p-2' }, '$45-$80')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type II'), h('td', { className: 'p-2' }, '4 ft wide × 2 rails'), h('td', { className: 'p-2' }, 'Lane shift, low-speed work zone'), h('td', { className: 'p-2' }, '$70-$130')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type III'), h('td', { className: 'p-2' }, '8 ft wide × 3 rails'), h('td', { className: 'p-2' }, 'Full road closure, detour, freeway-speed work'), h('td', { className: 'p-2' }, '$120-$220')),
          h('tr', null, h('td', { className: 'p-2' }, 'Jersey (concrete)'), h('td', { className: 'p-2' }, '10 ft × 32 in tall × 4,000 lb'), h('td', { className: 'p-2' }, 'High-speed positive protection, long-duration zones'), h('td', { className: 'p-2' }, '$350-$500 + delivery')),
          h('tr', null, h('td', { className: 'p-2' }, 'Plastic jersey'), h('td', { className: 'p-2' }, '6 ft × 32 in tall, ~50-80 lb empty'), h('td', { className: 'p-2' }, 'Pedestrian channelization, light-duty work zone'), h('td', { className: 'p-2' }, '$140-$220')),
          h('tr', null, h('td', { className: 'p-2' }, 'Water-filled'), h('td', { className: 'p-2' }, '6 ft × 30 in tall, ~1,200 lb filled'), h('td', { className: 'p-2' }, 'Mid-speed work zone, fast deploy/recover'), h('td', { className: 'p-2' }, '$200-$320')),
          h('tr', null, h('td', { className: 'p-2' }, 'Crowd control gate'), h('td', { className: 'p-2' }, '8 ft × 40 in tall, interlocking'), h('td', { className: 'p-2' }, 'Event entry, queue line, parade route'), h('td', { className: 'p-2' }, '$60-$110')),
        ),
      ),
    ),

    h('h2', null, 'MUTCD types I, II, III — the formal categories'),
    h('h3', null, 'Type I — sidewalk and short pedestrian closures'),
    h(
      'p',
      null,
      'Type I barricades have a single 8" × 24" reflective rail on a portable A-frame. They are appropriate for sidewalk closures, daytime pedestrian routing, and very short work tasks where motor-vehicle traffic does not cross the barricade line. They are NOT acceptable for any closure that interacts with vehicle traffic.',
    ),
    h('h3', null, 'Type II — lane shifts and low-speed work zones'),
    h(
      'p',
      null,
      'Type II adds a second rail (so the panel is twice as visible head-on) but stays at the same 4-ft width as Type I. They are the right choice for daytime lane shifts on local roads (≤35 mph), short partial closures, and back-of-house staging in a TCP. They are still light enough to set up by hand.',
    ),
    h('h3', null, 'Type III — full road closures and detours'),
    h(
      'p',
      null,
      'Type III is what most contractors mean when they say "barricade." 8 ft wide, 3 horizontal reflective rails, and either A-frame legs or a flat-base configuration. Required for any full road closure, detour entrance, or end-of-work-zone sign panel. Type III barricades stand up to 6 ft tall and are visible from over 1,000 ft on a clear road. See our ',
      h('a', { href: '/blog/type-iii-barricade-vs-type-i-type-ii' }, 'Type III vs Type I/II breakdown'),
      ' for the full spec comparison.',
    ),

    h('h2', null, 'Beyond the MUTCD types: positive protection barricades'),
    h('h3', null, 'Concrete jersey barriers'),
    h(
      'p',
      null,
      'A jersey barricade (formal name: "concrete safety shape barrier") is a 4,000-lb crash-tested concrete wall, 32 inches tall and roughly 10 feet long. It is positive protection — the barrier physically stops a vehicle that strikes it, redirecting the energy along the wall. Required for long-duration high-speed work zones, bridge work, and any TCP where the consequence of a vehicle penetrating the work area is severe. See our ',
      h('a', { href: '/blog/jersey-barricades-guide' }, 'jersey barricades guide'),
      ' for the install, transport, and crash-rating detail.',
    ),
    h('h3', null, 'Plastic jersey and water-filled barriers'),
    h(
      'p',
      null,
      'Plastic jersey barriers (the orange or white plastic shape that looks like a jersey wall) and water-filled barriers (typically yellow, hollow until filled with water on site) trade crash-rating for portability. They deploy fast — a two-person crew can set 200 ft of plastic jersey in 30 minutes — but they are not crash-tested at highway speeds. Use them for pedestrian channelization, short-duration work zones, and event perimeters where positive crash protection is not required.',
    ),
    h('h3', null, 'Crowd control barricades'),
    h(
      'p',
      null,
      'Interlocking steel "bike rack" or "French gate" barricades are the standard for events, queue lines, and parade routes. They link end-to-end, fold for storage, and create a hard pedestrian boundary. They are not traffic barricades in the MUTCD sense — they will not stop a vehicle — but they are the right tool for crowd management. See our ',
      h('a', { href: '/blog/crowd-control-barriers-buying-guide' }, 'crowd control barriers guide'),
      '.',
    ),

    h('h2', null, 'How to pick the right traffic barricade'),
    h(
      'p',
      null,
      'The decision tree, in order:',
    ),
    h(
      'ol',
      { className: 'list-decimal pl-6 space-y-2' },
      h('li', null, h('strong', null, 'Is this a vehicle work zone?'), ' If no — pick crowd control gates or Type I (sidewalk).'),
      h('li', null, h('strong', null, 'What is the posted speed?'), ' Above 45 mph or freeway → jersey wall or water-filled positive protection. Below 45 mph → Type II/III plus channelizing devices.'),
      h('li', null, h('strong', null, 'Daytime or nighttime?'), ' Nighttime requires Type II (two rails) minimum and reflective sheeting that meets Type IV high-intensity prismatic.'),
      h('li', null, h('strong', null, 'How long does the closure last?'), ' Long-duration (multi-day) pushes you toward jersey wall or rented water-filled barriers. Short-duration (under 24 hours) is Type III + cones territory.'),
      h('li', null, h('strong', null, 'Is the area pedestrianized?'), ' If pedestrians cross the barricade line, MUTCD §6D.02 requires a continuous detectable barrier — not Type I sawhorse, but a solid plastic jersey or pedestrian-rated barricade.'),
    ),

    h('h2', null, 'What MUTCD requires (and what most contractors miss)'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Reflective sheeting:'), ' Type IV prismatic minimum on all rails, alternating orange and white in 6-inch stripes (8-inch on Type III).'),
      h('li', null, h('strong', null, 'Stripe orientation:'), ' the stripes slope DOWN toward the side traffic should pass on. Reversed stripes will fail an NJDOT inspection.'),
      h('li', null, h('strong', null, 'Warning lights:'), ' nighttime barricades require Type A flashing or Type B/C steady-burn lights mounted to the panel. See our ',
        h('a', { href: '/blog/njdot-work-zone-standards-contractor-reference' }, 'NJDOT standards reference'),
        ' for the spacing requirements.'),
      h('li', null, h('strong', null, 'Ballast:'), ' barricades blow over without ballast. 25-50 lb sandbags per leg for Type II/III, or use anchored steel A-frame legs.'),
      h('li', null, h('strong', null, 'Spacing:'), ' barricades placed at the lane line spacing per the TCP. Detour-entry barricades use a 3-Type III "candy stripe" stack.'),
    ),

    h('h2', null, 'Buying barricades: what most NJ contractors actually need'),
    h(
      'p',
      null,
      'For a small-to-mid NJ road shop, a working barricade inventory looks like this:',
    ),
    h(
      'ul',
      null,
      h('li', null, '4-6× Type III barricades (8-ft, 3-rail) for full road closures and detour entrances'),
      h('li', null, '6-10× Type II barricades for lane shifts and partial closures'),
      h('li', null, '4× Type I sawhorse barricades for sidewalk and pedestrian work'),
      h('li', null, '8× Type A flashing warning lights to mount on barricade panels for nighttime work'),
      h('li', null, 'Sandbags pre-staged in the truck (Type III without ballast walks in any wind)'),
    ),
    h(
      'p',
      null,
      'For positive-protection jobs (bridge, freeway shoulder, long-duration high-speed) — buy or rent jersey wall by the linear foot rather than stocking it. The transport cost makes ownership inefficient unless you run multi-month closures regularly.',
    ),

    h('h2', null, 'Pricing: what traffic barricades actually cost'),
    h(
      'p',
      null,
      'Retail pricing in 2026 (NJ market):',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Type I sawhorse:'), ' $45-80 each, plastic ABS construction with reflective rail.'),
      h('li', null, h('strong', null, 'Type II:'), ' $70-130 each, depending on rail material (steel rail premium).'),
      h('li', null, h('strong', null, 'Type III:'), ' $120-220 each, depending on whether you pick A-frame or flat-base configuration.'),
      h('li', null, h('strong', null, 'Plastic jersey:'), ' $140-220 per 6-ft section.'),
      h('li', null, h('strong', null, 'Concrete jersey:'), ' $350-500 per 10-ft section, plus delivery (these are 4,000-lb sections — flatbed delivery typically $400-800 per truck).'),
      h('li', null, h('strong', null, 'Water-filled:'), ' $200-320 each, refundable rentals are common.'),
    ),
    h(
      'p',
      null,
      'A complete starter set (4 Type III + 6 Type II + 4 Type I + 8 warning lights) runs roughly $1,400-$2,000 retail.',
    ),

    h('h2', null, 'Where to buy traffic barricades in NJ'),
    h(
      'p',
      null,
      'For Central NJ contractors, ',
      h('a', { href: '/category/barricades-barriers' }, 'browse our barricade inventory'),
      ' — we stock Type I, II, and III barricades, plastic jersey, water-filled, and crowd control gates with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon counties for orders placed by 11 AM. For a custom set sized to your TCP, ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' and describe the closure — we will spec the type, count, ballast, and warning-light needs for inspection-ready delivery. If you need help building the TCP itself, the ',
      h('a', { href: '/planner' }, 'site map planner'),
      ' lays it out visually and outputs the barricade count.',
    ),
  ),
  faqs: [
    {
      q: 'What is a Type III traffic barricade?',
      a: 'Type III is the largest MUTCD-recognized barricade — 8 ft wide with 3 horizontal reflective rails, used for full road closures and detour entrances. Required where vehicle traffic is fully blocked, not just shifted.',
    },
    {
      q: 'What is the difference between Type I, II, and III barricades?',
      a: 'Type I has 1 rail (sidewalk closures), Type II has 2 rails (lane shifts, low-speed), Type III has 3 rails and is 8 ft wide (full closures, detours). Each adds visibility for higher-stakes use cases.',
    },
    {
      q: 'How much does a traffic barricade cost?',
      a: 'Type I: $45-80 each. Type II: $70-130. Type III: $120-220. Plastic jersey barricades: $140-220 per 6-ft section. Concrete jersey: $350-500 per 10-ft section, plus flatbed delivery.',
    },
    {
      q: 'Do I need warning lights on traffic barricades?',
      a: 'For nighttime use, yes — MUTCD requires Type A flashing or Type B/C steady-burn lights mounted to barricade panels for any work zone in operation after dark. Most NJDOT TCPs require lights on every Type III in the closure.',
    },
    {
      q: 'How do I keep a barricade from blowing over?',
      a: 'Ballast. Type II/III barricades need 25-50 lb sandbags per leg, or use steel A-frame legs designed to anchor. Without ballast, a 25 mph wind tips a Type III flat.',
    },
    {
      q: 'Can I buy traffic barricades for same-day delivery in NJ?',
      a: 'Yes — TrafficKit delivers same-day across Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon counties for orders placed by 11 AM. Heavier inventory (concrete jersey, multiple Type III pallets) usually goes out next-day to schedule the flatbed.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
  ],
  relatedArticles: [
    'type-iii-barricade-vs-type-i-type-ii',
    'jersey-barricades-guide',
    'crowd-control-barriers-buying-guide',
  ],
}
