import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "type 2 barricade" (~500/mo, High comp, $18.25 bid).
 * Definitional / decision-tree structure: when do you escalate from Type 1
 * to Type 2, and when do you keep going to Type 3.
 */
export const articleType2BarricadeGuide: Article = {
  slug: 'type-2-barricade-guide',
  title: 'What Is a Type 2 Barricade? MUTCD Spec, When to Use It, and What to Buy',
  excerpt:
    'A Type 2 barricade is the two-rail version of the MUTCD barricade family — used when speeds, duration, or visibility needs exceed what a Type 1 can handle, but the job is not a full road closure.',
  metaDescription:
    'Type 2 barricades explained — MUTCD §6F.63 spec, when to step up from Type 1, when to step up to Type 3, and the right model for contractor work.',
  primaryKeyword: 'type 2 barricade',
  secondaryKeywords: [
    'type ii barricade',
    'mutcd type 2 barricade',
    'two rail barricade',
    'type 1 vs type 2 barricade',
    'type 2 vs type 3 barricade',
    'medium duration barricade',
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
      'A Type 2 barricade (sometimes written Type II) is the middle tier of the three MUTCD barricade types — two horizontal rails, each 8 to 12 inches tall and 24 to 48 inches long, mounted on an A-frame or single-post base. ',
      h('strong', null, "It is the right call when a Type 1 doesn't give enough visibility — higher posted speeds, overnight work, or longer durations — but the job still isn't a road closure."),
      ' This guide walks the spec, the upgrade-from-Type-1 decision, the upgrade-to-Type-3 ceiling, and what to actually buy.',
    ),

    h('h2', null, 'The MUTCD definition'),
    h(
      'p',
      null,
      'MUTCD §6F.63 ranks barricades by rail count and the visibility that comes with each rail:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Type 1 '), '— one rail, 8" to 12" tall, 24" to 48" wide. Short-duration daytime channelizing on low-speed streets.'),
      h('li', null, h('strong', null, 'Type 2 '), '— two rails, same per-rail dimensions, same width range. Medium-duration or higher-speed channelizing, with or without supplemental lights.'),
      h('li', null, h('strong', null, 'Type 3 '), '— three rails, 8" to 12" tall, 48" to 96" wide, on dual supports. Road closures and detours.'),
    ),
    h(
      'p',
      null,
      'All three carry the same 6" alternating orange and white stripes, retroreflective Type III or higher sheeting, and the orange-on-white color. What changes is how much rail surface is presented to oncoming traffic — and how stable the base is under wind and minor impacts.',
    ),

    h('h2', null, 'When to escalate from Type 1 to Type 2'),
    h(
      'p',
      null,
      'Step up to Type 2 when any one of these is true on the work zone:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Posted speed is 35–45 mph (Type 1 caps at 35).'),
      h('li', null, "It's an overnight job, or the barricade will sit through dawn or dusk transitions — the second reflective rail materially improves headlight pickup."),
      h('li', null, 'Duration crosses a single work shift in one location — wind, weather, and incidental traffic accumulate.'),
      h('li', null, "There's a pedestrian channel adjacent to the channelizing line — two rails read more clearly as a wall to pedestrians than one."),
      h('li', null, 'You need higher conspicuity in fog, rain, or low sun without going all the way to Type 3.'),
    ),

    h('h2', null, 'When to escalate from Type 2 to Type 3'),
    h(
      'p',
      null,
      "Type 2 has a real ceiling. Keep going to Type 3 if any of these apply:",
    ),
    h(
      'ul',
      null,
      h('li', null, 'Posted speed exceeds 45 mph — Type 2 is not rated for highway work.'),
      h('li', null, 'You are closing a road or a lane permanently for the duration of the project — Type 3 with an R11-2 ROAD CLOSED sign is the MUTCD pattern.'),
      h('li', null, 'You are setting a detour — Type 3 supports the directional sign panel; Type 2 does not.'),
      h('li', null, 'You need a barricade that holds position against significant wind or incidental nudges — Type 3 has a much wider base footprint and dual support legs.'),
    ),
    h(
      'p',
      null,
      'For the full comparison, see ',
      h('a', { href: '/blog/type-iii-barricade-vs-type-i-type-ii' }, 'Type III barricade vs. Type I/II'),
      ' — it includes a visibility chart by posted speed.',
    ),

    h('h2', null, 'Type 1 vs Type 2 vs Type 3 — quick reference'),
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
            h('th', { className: 'text-left p-2' }, 'Property'),
            h('th', { className: 'text-left p-2' }, 'Type 1'),
            h('th', { className: 'text-left p-2' }, 'Type 2'),
            h('th', { className: 'text-left p-2' }, 'Type 3'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Rails'),
            h('td', { className: 'p-2' }, '1'),
            h('td', { className: 'p-2' }, '2'),
            h('td', { className: 'p-2' }, '3'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Max posted speed'),
            h('td', { className: 'p-2' }, '35 mph'),
            h('td', { className: 'p-2' }, '45 mph'),
            h('td', { className: 'p-2' }, 'No upper limit'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Duration'),
            h('td', { className: 'p-2' }, 'Short / one shift'),
            h('td', { className: 'p-2' }, 'Medium / multi-shift'),
            h('td', { className: 'p-2' }, 'Long / project-length'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Road closure rated'),
            h('td', { className: 'p-2' }, 'No'),
            h('td', { className: 'p-2' }, 'No'),
            h('td', { className: 'p-2' }, 'Yes'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Detour sign panel'),
            h('td', { className: 'p-2' }, 'No'),
            h('td', { className: 'p-2' }, 'No'),
            h('td', { className: 'p-2' }, 'Yes'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Typical width'),
            h('td', { className: 'p-2' }, '24"–48"'),
            h('td', { className: 'p-2' }, '24"–48"'),
            h('td', { className: 'p-2' }, '48"–96"'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Typical price (each, new)'),
            h('td', { className: 'p-2' }, '$40–$80'),
            h('td', { className: 'p-2' }, '$70–$130'),
            h('td', { className: 'p-2' }, '$120–$220'),
          ),
        ),
      ),
    ),

    h('h2', null, 'What to buy: the practical shortlist'),
    h(
      'p',
      null,
      'For contractor purchase, three Type 2 patterns cover almost every job:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Plastic A-frame Type 2 '), '— light, stackable, fast to deploy. Best for utility crews and short-duration jobs where one person sets and pulls the barricade. Expect 8–10 lbs each empty, 25–35 lbs with sand ballast.'),
      h('li', null, h('strong', null, 'Steel A-frame Type 2 '), "— heavier (20–30 lbs empty), more durable, doesn't blow over as easily. Best when the same barricade sits on the same job for multiple shifts or stages."),
      h('li', null, h('strong', null, 'Folding Type 2 '), '— compact storage, fast deployment by one worker. Best for contractors who haul a lot of gear in a single pickup and need to fit barricades, cones, and signs in the same bed.'),
    ),
    h(
      'p',
      null,
      'For specs and pricing on each pattern, see our ',
      h('a', { href: '/category/barricades' }, 'Barricades category page'),
      '. Not sure which pattern? Our ',
      h('a', { href: '/assistant' }, 'Assistant'),
      ' will ask three quick questions and recommend a count and pattern.',
    ),

    h('h2', null, 'Light kits, sheeting grade, and storage'),
    h(
      'p',
      null,
      'Type 2 barricades do not require steady-burn warning lights in daylight, but most state DOTs (including NJDOT) require Type A flashing lights overnight or in low-visibility conditions on roadways. Spec out a light kit with each barricade if any portion of your work window is dark.',
    ),
    h(
      'p',
      null,
      'Sheeting grade matters more than rail count in many night-work failures. Type III prismatic is the floor — for highway-adjacent Type 2 use cases, jump to ASTM Type IV or higher. Reflectivity ages faster than the plastic body; budget to re-sheet rails every 2–3 years on heavy-use units.',
    ),
    h(
      'p',
      null,
      "Storage notes from contractors who buy ours: nest A-frame Type 2 units in stacks of 6 against a wall, head-up. Don't lay them flat — long-term flat storage warps the rail mount on plastic frames and can cause the sheeting to delaminate at the edges.",
    ),

    h('h2', null, 'Compliance checklist before deployment'),
    h(
      'ul',
      null,
      h('li', null, 'Rail count: 2, both at 8"–12" tall, 24"–48" wide.'),
      h('li', null, 'Stripes: 6" alternating orange and white, sloped down to the side traffic should pass.'),
      h('li', null, 'Sheeting: ASTM Type III minimum, Type IV+ recommended for >35 mph.'),
      h('li', null, 'Ballast: sand bag or built-in ballast per manufacturer; never use rebar through the base on a roadway.'),
      h('li', null, 'Lights: Type A flashing if any nighttime exposure or low-visibility work.'),
      h('li', null, 'Spacing: per the work zone TTC plan — typically tighter than cones, ~20–40 ft on tangent sections.'),
    ),
    h(
      'p',
      null,
      'For a full lane closure plan that integrates barricades with cones, advance warning signs, and tapers, the ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' will generate an MUTCD-compliant layout from a few inputs.',
    ),

    h('h2', null, 'Bottom line'),
    h(
      'p',
      null,
      "Type 2 is the workhorse barricade for jobs that have outgrown Type 1 but don't need Type 3. If your posted speed is 36–45 mph, the work crosses one shift, or you need clear overnight conspicuity — buy Type 2. Pair every Type 2 with a Type A light kit and ballast appropriate to the surface. Re-sheet rails on a 2–3 year cycle and they will outlast several seasons of NJ contractor use.",
    ),
  ),
  faqs: [
    {
      q: 'Is a Type 2 barricade the same as a Type II barricade?',
      a: 'Yes. "Type 2" and "Type II" are interchangeable spellings of the same MUTCD §6F.63 device — two horizontal rails on a single-post or A-frame base.',
    },
    {
      q: 'Can I use a Type 2 barricade to close a road?',
      a: 'No. Road closures require a Type 3 barricade with an R11-2 ROAD CLOSED sign panel. Type 2 is a channelizing device, not a closure device.',
    },
    {
      q: 'What is the max speed for a Type 2 barricade?',
      a: 'MUTCD guidance and most state DOT specs cap Type 2 at posted speeds up to about 45 mph. Above 45 mph, step up to Type 3.',
    },
    {
      q: 'Do Type 2 barricades need lights overnight?',
      a: 'Yes. Most state DOTs require Type A low-intensity flashing warning lights on barricades exposed to traffic during darkness or low-visibility conditions. Check your state DOT supplement for specifics.',
    },
    {
      q: 'How many Type 2 barricades do I need per job?',
      a: 'It depends on the closure geometry — typically every 20–40 ft along the channelizing line on tangent sections, tighter through curves. Our SiteMapPlanner generates a compliant count from your job inputs.',
    },
    {
      q: 'Do you deliver Type 2 barricades in Central NJ?',
      a: "Yes — same-day Central NJ delivery on Type 2 barricades and full TTC packages. Get a quote on the /quote page or chat with our Assistant for a fast count.",
    },
  ],
  relatedProducts: [
    { label: 'Browse barricades', path: '/category/barricades' },
    { label: 'Browse signs & sign stands', path: '/category/signs' },
    { label: 'Get a TTC delivery quote', path: '/quote' },
    { label: 'Chat with the Assistant', path: '/assistant' },
  ],
  relatedArticles: [
    'type-1-barricade-guide',
    'type-iii-barricade-vs-type-i-type-ii',
    'barricades-types-uses-guide',
  ],
}
