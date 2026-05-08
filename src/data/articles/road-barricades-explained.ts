import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "road barricades" (~500/mo, High comp, $21.90 bid).
 * "What is X" definitional structure: defines road barricades, walks
 * the MUTCD §6F.63 type system, distinguishes barricade-vs-barrier-vs-channelizer,
 * and answers the search-intent questions inspectors actually get asked.
 */
export const articleRoadBarricadesExplained: Article = {
  slug: 'road-barricades-explained',
  title: 'What Are Road Barricades? Types, MUTCD Requirements, and How They Differ from Barriers',
  excerpt:
    'A road barricade is a portable, striped-rail device used to channelize traffic, close roadways, or warn drivers of a hazard. The MUTCD defines three types — Type I, II, III — and most contractor confusion comes from mixing them up with barriers and crowd-control fencing.',
  metaDescription:
    'Road barricades defined: what they are, the three MUTCD §6F.63 types (I, II, III), how they differ from barriers and crowd-control fencing, and which ones to use by job type.',
  primaryKeyword: 'road barricades',
  secondaryKeywords: [
    'road barricade',
    'street barricades',
    'road closed barricade',
    'barricade for road',
    'road closure barricade',
    'mutcd road barricade',
  ],
  targetVolume: 500,
  datePublished: '2026-05-08',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'A road barricade is a portable channelizing device — typically a frame holding one to three orange-and-white striped rails — used to close a roadway, divert traffic around a hazard, or mark the upstream end of a work zone.'),
      ' The federal MUTCD defines three official types (Type I, Type II, and Type III) in §6F.63, distinguished by the number of horizontal rails. The contractor confusion almost always lives in three places: which type to use, when a barricade gets called a "barrier" instead, and what light or sign needs to ride on top. This is the plain-English answer.',
    ),

    h('h2', null, 'The MUTCD definition (and why it matters)'),
    h(
      'p',
      null,
      'Per MUTCD §6F.63, a road barricade is a portable or fixed device that has retroreflectorized rail-faced panels and that channelizes traffic or marks a closure. The official term in the MUTCD is "channelizing barricade." In the field, contractors call them road barricades, traffic barricades, work-zone barricades, or street barricades — same gear, different names.',
    ),
    h(
      'p',
      null,
      'The reason the MUTCD spec matters: any DOT job (state, county, or municipal) requires devices that meet the MUTCD type specification AND a crashworthy testing letter (FHWA WZTC eligibility list, evaluated under MASH or NCHRP 350). A hardware-store "road closed" stand without a crashworthy letter on file fails the inspection.',
    ),

    h('h2', null, 'The three MUTCD types — what each one is'),
    h('h3', null, 'Type I road barricade'),
    h(
      'p',
      null,
      'Single horizontal rail, 8 inches wide minimum, mounted at ~36 inches above the roadway. Used for short-duration daytime work in low-speed environments — utility patches, sidewalk closures, parking-lot work. Type I is the cheapest and lightest; one person carries two.',
    ),
    h('h3', null, 'Type II road barricade'),
    h(
      'p',
      null,
      'Two horizontal rails, mounted at ~36 in and ~24 in. Type II is the working spec for most intermediate-term work zones (a few days to a few weeks) and for any job that operates day-into-night on roads up to ~45 mph. Most NJDOT contractor specs default to Type II for state-route work.',
    ),
    h('h3', null, 'Type III road barricade'),
    h(
      'p',
      null,
      'Three horizontal rails, 60-inch minimum total height, panel width 4 to 8 ft, and most jurisdictions require a flashing or steady-burn light on top for nighttime use. Type III is the device used at full-roadway closures — the "ROAD CLOSED" barricade you see across a closed-off street is almost always a Type III with a sign panel mounted above the rails. Our deeper comparison lives in the ',
      h('a', { href: '/blog/type-iii-barricade-vs-type-i-type-ii' }, 'Type III vs Type I and II breakdown'),
      '.',
    ),

    h('h2', null, 'Road barricades vs. road barriers vs. crowd-control fencing'),
    h(
      'p',
      null,
      'These three classes get conflated constantly. Each one does a different job:',
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
            null,
            h('th', { className: 'text-left p-2 border-b' }, 'Class'),
            h('th', { className: 'text-left p-2 border-b' }, 'Function'),
            h('th', { className: 'text-left p-2 border-b' }, 'MUTCD reference'),
            h('th', { className: 'text-left p-2 border-b' }, 'Stops a vehicle?'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Road barricade (Type I/II/III)'), h('td', { className: 'p-2' }, 'Channelizes — visual cue only'), h('td', { className: 'p-2' }, '§6F.63'), h('td', { className: 'p-2' }, 'No')),
          h('tr', null, h('td', { className: 'p-2' }, 'Road barrier (concrete, water-filled, steel)'), h('td', { className: 'p-2' }, 'Redirects vehicle (longitudinal)'), h('td', { className: 'p-2' }, '§6F.85'), h('td', { className: 'p-2' }, 'Yes (per crash rating)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Crowd-control / pedestrian barricade'), h('td', { className: 'p-2' }, 'Pedestrian channelization'), h('td', { className: 'p-2' }, '§6D.02'), h('td', { className: 'p-2' }, 'No')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'A road barricade does NOT stop a car. It is a striped sign on legs. If you need to physically prevent a vehicle from entering an area, you need a road BARRIER — concrete Jersey, water-filled Jersey, or steel longitudinal — with a MASH crash rating. Cross-referenced in our ',
      h('a', { href: '/blog/road-barriers-types-comparison' }, 'road barriers comparison'),
      '.',
    ),

    h('h2', null, 'What goes on top of a road barricade'),
    h(
      'p',
      null,
      'A bare Type I or Type II is almost never the final deployed unit. Three things commonly ride on the rails or above the frame:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'A Type A, B, or C barricade light.'), ' Type A flashing for warning at the upstream end of a work zone; Type B high-intensity flashing for major hazards; Type C steady-burn for delineating lane edges. Required at night per MUTCD §6F.83.'),
      h('li', null, h('strong', null, 'A regulatory or warning sign.'), ' "ROAD CLOSED" (R11-2), "DETOUR" (M4-9), "ROAD CLOSED TO THRU TRAFFIC" (R11-4). Sign-on-barricade combos are a pre-built unit on most Type III models.'),
      h('li', null, h('strong', null, 'Reflective sheeting on the rails.'), ' MUTCD requires Type IV high-intensity prismatic minimum on rails for nighttime work. Diamond-grade is standard on highway work.'),
    ),

    h('h2', null, 'Typical deployment patterns'),
    h('h3', null, 'Pattern 1: full road closure'),
    h(
      'p',
      null,
      'Two Type IIIs across the closed roadway, one each side of the centerline, with a "ROAD CLOSED" sign mounted above the rails on each. Plus advance warning: an "R11-2 ROAD CLOSED AHEAD" sign at 500–1000 ft advance distance, and a "DETOUR" sign sequence routing through-traffic around the closure. Lights on Type IIIs at night.',
    ),
    h('h3', null, 'Pattern 2: partial road closure (lane closure)'),
    h(
      'p',
      null,
      'No Type III — instead use Type II at the taper merge plus a cone or drum line down the closed lane. The Type II marks where the closed lane begins; the cones channelize traffic past the work area. Spacing on the cone line per MUTCD Table 6C-2 (taper length × 10 rule). Walked through in our ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'lane-closure cone-count guide'),
      '.',
    ),
    h('h3', null, 'Pattern 3: short-duration utility work'),
    h(
      'p',
      null,
      'Type I at each end of the work area plus a few cones to channelize. Daytime only, low speed. If the job extends past sunset, swap the Type Is for Type IIs and add Type C steady-burn lights.',
    ),

    h('h2', null, 'Where road barricades fail inspection'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Wrong type for road class.'), ' Type I on a 45 mph state route is the most common cite — needs Type II or III at that speed.'),
      h('li', null, h('strong', null, 'No crashworthy letter on file.'), ' Hardware-store barricades without an FHWA WZTC eligibility letter fail DOT inspection regardless of how official they look.'),
      h('li', null, h('strong', null, 'Faded reflective sheeting.'), ' Engineer-grade fades fast in NJ summer sun. Inspectors check sheeting condition by daylight reflectance.'),
      h('li', null, h('strong', null, 'No light at night.'), ' Type II/III without a Type A/B/C light at night is an automatic violation if the work zone runs after sunset.'),
      h('li', null, h('strong', null, 'Wrong sign on the wrong barricade.'), ' "ROAD CLOSED" (R11-2) on a single-lane partial closure is a contradictory message — use "ROAD WORK AHEAD" (W20-1) or the appropriate MUTCD lane-closure sign.'),
    ),

    h('h2', null, 'How many road barricades does a job need?'),
    h(
      'p',
      null,
      'Working defaults for typical NJ contractor work:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Sidewalk / utility patch:'), ' 2× Type I.'),
      h('li', null, h('strong', null, 'Lane closure on a 35–45 mph road:'), ' 2× Type II at each end of the work area + cone line.'),
      h('li', null, h('strong', null, 'Full road closure (residential):'), ' 2× Type III with R11-2 signs + 2 advance R11-2-ahead signs.'),
      h('li', null, h('strong', null, 'Full road closure (state route):'), ' 4× Type III + lighting + detour route signage + advance warning sequence (5–10 signs depending on speed).'),
    ),
    h(
      'p',
      null,
      'For job-specific layouts, our ',
      h('a', { href: '/planner' }, 'work-zone planner'),
      ' generates a MUTCD-compliant device count and sign sequence for the specific road class and closure type — useful for handing a foreman a one-page plan.',
    ),

    h('h2', null, 'Where to buy road barricades in NJ'),
    h(
      'p',
      null,
      'For Central NJ contractors, ',
      h('a', { href: '/category/barricades-barriers' }, 'browse our barricades catalog'),
      ' — we stock Type I, Type II, and Type III road barricades with crashworthy letters on file, reflective sheeting in HIP and diamond-grade, and same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon. To spec a kit for a specific closure, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with the road class, posted speed, and closure duration.',
    ),
  ),
  faqs: [
    {
      q: 'What are road barricades called in MUTCD?',
      a: 'The MUTCD calls them "channelizing barricades" and defines three types in §6F.63: Type I (one rail), Type II (two rails), and Type III (three rails, 60-inch minimum height). Field vocabulary uses "road barricades," "traffic barricades," "street barricades," and "work-zone barricades" interchangeably.',
    },
    {
      q: 'What is the difference between a road barricade and a road barrier?',
      a: 'A road barricade is a striped channelizing device — it gives drivers a visual cue but does not physically stop a vehicle. A road barrier (concrete, water-filled, steel) has a MASH or NCHRP 350 crash rating and is engineered to redirect a vehicle on impact. Use barricades for visual channelization; use barriers when you need physical separation.',
    },
    {
      q: 'How tall is a road barricade?',
      a: 'Type I and Type II barricades have a top rail at approximately 36 inches above the roadway. Type III barricades are 60 inches minimum total height. A-frame and pedestrian barricades run shorter (typically 36–42 inches) and are NOT acceptable for highway road work.',
    },
    {
      q: 'Do road barricades need lights at night?',
      a: 'Yes — MUTCD §6F.83 requires Type A or Type B warning lights on barricades used at the upstream end of a nighttime work zone, and Type C steady-burn lights for delineation along the lane edge. A bare Type II or Type III without a light at night is an automatic inspection violation.',
    },
    {
      q: 'Can I use a road barricade to physically block a road?',
      a: 'No — a barricade is a visual device, not a physical block. A determined driver can push a Type III out of the way. For physical road closure (security perimeter, anti-vehicle), use concrete barriers, water-filled barriers, or ASTM F2656-rated wedge or bollard hardware. Most "ROAD CLOSED" closures are visual + signage + driver compliance, not physical.',
    },
    {
      q: 'How much do road barricades cost?',
      a: 'Plastic Type I: $30–$60. Plastic Type II: $50–$95. Plastic Type III: $120–$220 plus $30–$60 for a flashing light. Steel/wood-rail Type III with full reflective sheeting and integrated sign panel: $250–$450. Reflective sheeting grade (HIP vs diamond-grade) and rail material drive most of the price spread.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
  ],
  relatedArticles: [
    'type-iii-barricade-vs-type-i-type-ii',
    'barricades-types-uses-guide',
    'plastic-barricades-pillar-guide',
  ],
}
