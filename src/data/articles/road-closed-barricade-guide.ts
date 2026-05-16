import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "road closed barricade" (~500/mo, High comp, $15.63 bid).
 * Secondary: road closed sign, road closure barricades, road closed ahead barricade.
 * Decision-tree structure: pick the right barricade for the type of closure
 * (full closure, partial, detour, emergency).
 */
export const articleRoadClosedBarricadeGuide: Article = {
  slug: 'road-closed-barricade-guide',
  title: 'Road Closed Barricade: Which One You Actually Need (Decision Tree)',
  excerpt:
    'There is no single "road closed" barricade. MUTCD specifies different devices for full closures, partial closures, detours, and emergency closures — and using the wrong one is a top reason municipal inspections fail. This guide walks the decision tree.',
  metaDescription:
    'Road closed barricade decision tree — Type III, water-filled, drum, and sign-stand combinations per MUTCD §6F.63 for full, partial, and emergency road closures.',
  primaryKeyword: 'road closed barricade',
  secondaryKeywords: [
    'road closure barricade',
    'road closed sign barricade',
    'road closed ahead barricade',
    'street closed barricade',
    'detour barricade',
    'full road closure barricade',
  ],
  targetVolume: 500,
  datePublished: '2026-05-16',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'A "road closed" setup is a system, not a single device.'),
      ' MUTCD §6F.63 requires a Type III barricade (or equivalent) across the travel lane, mounted with the R11-2 ROAD CLOSED sign or an R11-3a/4 sign with detour information. Add advance-warning signs, channelizing devices, and (after dark) flashing Type B lights. This guide walks you through which combination fits your closure — full, partial, detour, or emergency — so the setup passes a NJDOT or municipal inspection on the first walk-through.',
    ),

    h('h2', null, 'Step 1: classify the closure'),
    h(
      'p',
      null,
      'Four closure types, four hardware recipes. Pick the row that matches your job before you load the truck.',
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
            { className: 'border-b' },
            h('th', { className: 'text-left p-2' }, 'Closure type'),
            h('th', { className: 'text-left p-2' }, 'Primary device'),
            h('th', { className: 'text-left p-2' }, 'Sign'),
            h('th', { className: 'text-left p-2' }, 'Typical use'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Full closure'),
            h('td', { className: 'p-2' }, 'Type III barricade across full lane width'),
            h('td', { className: 'p-2' }, 'R11-2 "ROAD CLOSED"'),
            h('td', { className: 'p-2' }, 'Paving, milling, utility cut, slab repair'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Partial / lane closure'),
            h('td', { className: 'p-2' }, 'Channelizing drums or 36" cones with taper'),
            h('td', { className: 'p-2' }, 'W20-1 + W4-2 (lane closed)'),
            h('td', { className: 'p-2' }, 'Single-lane closure, shoulder work'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Detour'),
            h('td', { className: 'p-2' }, 'Type III + flashers'),
            h('td', { className: 'p-2' }, 'R11-3a or R11-4 with M4-9/10 detour arrows'),
            h('td', { className: 'p-2' }, 'Through-route closed, alternate route signed'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Emergency'),
            h('td', { className: 'p-2' }, 'Type II + flares/cones, or water-filled if available'),
            h('td', { className: 'p-2' }, 'R11-2 if printed; flashing arrow board otherwise'),
            h('td', { className: 'p-2' }, 'Crash response, sinkhole, water main break'),
          ),
        ),
      ),
    ),

    h('h2', null, 'Step 2: pick the barricade type'),
    h(
      'p',
      null,
      'MUTCD §6F.63 defines three barricade types by rail count. Match the type to the duration and speed of the closure:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Type I '),
        '— one horizontal rail (24-in min). Light duty. Short-duration daytime work on low-speed streets (≤25 mph). Not suitable as the primary "ROAD CLOSED" device.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Type II '),
        '— two rails. Medium duty. Short-to-intermediate term work; OK for residential or collector streets up to 35 mph. Acceptable across a closed driveway or alley.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Type III '),
        '— three rails (48-in min length, 60-in min height). Heavy duty. ',
        h('strong', null, 'The default device for any full road closure regardless of speed.'),
        ' Required across travel lanes ≥ 35 mph and recommended below that for any closure expected to last more than a shift.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Water-filled barriers '),
        '— substitute for Type III where vehicle impact is a real possibility (closure on a curve, near a high school, etc.). MASH TL-2 rated units redirect at 45 mph. See our ',
        h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'water-filled barrier buying guide'),
        '.',
      ),
    ),

    h('h2', null, 'Step 3: cover the full lane width'),
    h(
      'p',
      null,
      'A single 4-ft Type III barricade does not close a 12-ft travel lane — a driver will steer around it. The lane must be physically blocked across its full width.',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        'For a 10–12 ft lane: 3 Type III units stacked side-by-side, OR 2 Type III plus drums to close the gap to the curb',
      ),
      h('li', null, 'For a 20–24 ft two-lane local road: 5–6 Type III units shoulder-to-shoulder'),
      h(
        'li',
        null,
        'For wider arterials: switch to a water-filled barrier run or use a closed truck with a TMA as the head-end device',
      ),
    ),

    h('h2', null, 'Step 4: pick the right sign'),
    h(
      'p',
      null,
      'The MUTCD R11-series regulates road-closed signage. Pick by what drivers need to do next:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'R11-2 "ROAD CLOSED" '),
        '— 48 in × 30 in standard, white on red. Use when the closure is the end of the line: no through traffic, turn around.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'R11-3a "ROAD CLOSED TO THROUGH TRAFFIC" '),
        '— for closures where local access is still permitted (residents, deliveries). The most common municipal sign because it allows mail/EMS access.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'R11-4 "ROAD CLOSED [arrow] DETOUR" '),
        '— directs traffic to an alternate route. Pair with M4-9/M4-10 detour assemblies at the next intersection.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'R11-2a "BRIDGE OUT" '),
        '— closure caused by a structural failure. Specific to bridge/culvert closures.',
      ),
    ),

    h('h2', null, 'Step 5: advance-warning placement'),
    h(
      'p',
      null,
      'A "ROAD CLOSED" barricade at the closure itself is not enough. MUTCD Table 6C-1 requires advance warning signs upstream, distance scaled to the road speed:',
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
            { className: 'border-b' },
            h('th', { className: 'text-left p-2' }, 'Speed limit'),
            h('th', { className: 'text-left p-2' }, 'First warning'),
            h('th', { className: 'text-left p-2' }, 'Second warning'),
            h('th', { className: 'text-left p-2' }, 'Closure'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, '25 mph'),
            h('td', { className: 'p-2' }, '100 ft'),
            h('td', { className: 'p-2' }, '—'),
            h('td', { className: 'p-2' }, 'Closure point'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, '35 mph'),
            h('td', { className: 'p-2' }, '350 ft'),
            h('td', { className: 'p-2' }, '100 ft'),
            h('td', { className: 'p-2' }, 'Closure point'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, '45 mph'),
            h('td', { className: 'p-2' }, '500 ft'),
            h('td', { className: 'p-2' }, '350 ft'),
            h('td', { className: 'p-2' }, 'Closure point'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, '55 mph+'),
            h('td', { className: 'p-2' }, '½ mile'),
            h('td', { className: 'p-2' }, '1500 ft'),
            h('td', { className: 'p-2' }, 'Closure point'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Standard upstream sequence: W20-3 "ROAD CLOSED AHEAD" at the first position, W20-2 "DETOUR AHEAD" or W4-2 lane-closed pictogram at the second, then the R11-2 at the barricade itself.',
    ),

    h('h2', null, 'Step 6: night and low-visibility setup'),
    h(
      'p',
      null,
      'After dark or in fog, the closure is invisible without lights. MUTCD §6F.83 requires:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Type A or B flashing warning lights on the outboard ends of every Type III barricade'),
      h('li', null, 'Type C steady-burn lights on intermediate barricades or drums along a taper'),
      h(
        'li',
        null,
        'Retroreflective sheeting Type IV or higher (prismatic) on barricade rails — Engineer Grade is no longer compliant after FHWA 2018 retroreflectivity rule',
      ),
      h(
        'li',
        null,
        'An arrow board if the closure is on a road with speeds ≥ 45 mph or with more than one approach lane',
      ),
    ),

    h('h2', null, 'Decision tree: which combination do I buy?'),
    h(
      'p',
      null,
      'Three jobsite profiles cover most NJ contractor closures. Pick the one closest to your typical job and stock for that:',
    ),
    h(
      'h3',
      null,
      'Profile A — residential / municipal short-duration (≤ 35 mph, < 1 day)',
    ),
    h(
      'ul',
      null,
      h('li', null, '2× Type III barricades (48" rail)'),
      h('li', null, '1× R11-3a "ROAD CLOSED TO THROUGH TRAFFIC" sign + stand'),
      h('li', null, '1× W20-3 "ROAD CLOSED AHEAD" sign + stand'),
      h('li', null, '12× 28" cones for taper and intersection blocking'),
      h('li', null, '2× Type A flashing lights (night work)'),
    ),
    h(
      'h3',
      null,
      'Profile B — collector / arterial multi-day (35–45 mph, 1–7 days)',
    ),
    h(
      'ul',
      null,
      h('li', null, '4× Type III barricades or 6× water-filled barrier units'),
      h('li', null, '1× R11-4 "ROAD CLOSED DETOUR" sign assembly + M4-9 detour arrows'),
      h('li', null, '2× W20-3 advance warning signs (placed at table distances above)'),
      h('li', null, '20× channelizing drums for the taper'),
      h('li', null, '4× Type B flashing lights, 4× Type C steady-burns'),
      h('li', null, '1× arrow board (rented or on lease)'),
    ),
    h(
      'h3',
      null,
      'Profile C — emergency closure (any speed, hours-not-days notice)',
    ),
    h(
      'ul',
      null,
      h('li', null, '2× Type II barricades (fastest deployable) + cones'),
      h('li', null, '1× R11-2 "ROAD CLOSED" sign (printed or magnetic-back)'),
      h('li', null, '1× arrow board, deployed first while the rest is set up'),
      h(
        'li',
        null,
        'Flares or LED hazard lights for the first 30 minutes before the full barricade run is in place',
      ),
    ),

    h('h2', null, 'Common inspection failures'),
    h(
      'p',
      null,
      'NJDOT and municipal inspectors flag the same handful of mistakes on most residential closures. Avoid these to pass on the first walk-through:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Type I or Type II barricade used where Type III is required by speed/duration'),
      h('li', null, 'Only one barricade across a full lane width — driver can steer around it'),
      h('li', null, 'No advance-warning signs upstream of the closure'),
      h('li', null, 'No flashing lights after dusk'),
      h('li', null, 'R11-2 "ROAD CLOSED" used when R11-3a "TO THROUGH TRAFFIC" is intended — blocks local access'),
      h(
        'li',
        null,
        'Engineer Grade reflective sheeting (no longer compliant for work-zone use post-2018 FHWA rule)',
      ),
    ),

    h('h2', null, 'Where to buy road closed barricades in NJ'),
    h(
      'p',
      null,
      'We stock Type III barricades, R11-series signs, and complete closure kits for same-day Central NJ delivery. Browse the ',
      h('a', { href: '/category/barricades-barriers' }, 'barricades and barriers category'),
      ' for individual units, the ',
      h('a', { href: '/category/signs-sign-stands' }, 'signs category'),
      ' for R11 signs and stands, or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' for a profile-matched kit. Not sure which profile fits? Walk it through the ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' — it builds a MUTCD-compliant device list from the closure type and speed.',
    ),
  ),
  faqs: [
    {
      q: 'Do I need a Type III barricade for every road closure?',
      a: 'For any full closure on a road ≥ 35 mph, or any closure expected to last longer than one work shift, yes. Below 35 mph and under one shift, a Type II barricade is acceptable per MUTCD §6F.63 — but Type III is the default because inspectors can fail you for "insufficient device" on a borderline call.',
    },
    {
      q: 'Can I use water-filled barriers instead of Type III barricades for a road closure?',
      a: 'Yes, and it is preferable where vehicle impact is plausible (closures on curves, near schools, on rainy nights). Water-filled units rated MASH TL-2 redirect a passenger vehicle at 45 mph; an empty plastic Type III barricade does not. The tradeoff is fill time (5–10 min per unit) and the need for a water source.',
    },
    {
      q: 'What is the difference between R11-2 and R11-3a?',
      a: 'R11-2 ("ROAD CLOSED") means no traffic past this point, period. R11-3a ("ROAD CLOSED TO THROUGH TRAFFIC") allows local residents, deliveries, and emergency vehicles. Most municipal residential closures use R11-3a because it preserves mail and EMS access. R11-2 is for full closures with a hard detour.',
    },
    {
      q: 'How far in advance of the closure do I need the warning signs?',
      a: 'MUTCD Table 6C-1 sets the distances by speed limit: 100 ft at 25 mph, 350 ft at 35 mph, 500 ft at 45 mph, and ½ mile at 55+ mph. The W20-3 "ROAD CLOSED AHEAD" sign goes at the first position; closer warnings (W4-2 lane-closed, taper signs) fill in between.',
    },
    {
      q: 'Do I need an arrow board for a road closure?',
      a: 'Arrow boards are required by MUTCD §6F.61 for lane closures on roads with speeds ≥ 45 mph, or any closure with more than one approach lane. For a full closure with no through traffic, an arrow board is not required but is strongly recommended at speeds ≥ 35 mph because it gives a 30+ second visual cue from upstream.',
    },
    {
      q: 'Can I just rent a "road closed" kit instead of buying?',
      a: 'You can — but our buy/sell model with same-day delivery typically pencils out under purchase after 3–4 closures. A typical Profile A kit runs $850–$1,200 to buy outright vs $200–$300/day to rent the same package. If you do more than 4 closures a year, owning is cheaper.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
  ],
  relatedArticles: [
    'type-iii-barricade-vs-type-i-type-ii',
    'water-filled-barriers-buying-guide',
    'mutcd-taper-length-formula-nj',
  ],
}
