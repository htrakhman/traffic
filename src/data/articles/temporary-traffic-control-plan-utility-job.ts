import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "temporary traffic control plan" (~1,300/mo).
 * Secondary: "TTC plan", "traffic control plan utility job", "MUTCD TTC plan",
 *             "small utility job traffic control".
 */
export const articleTemporaryTrafficControlPlanUtilityJob: Article = {
  slug: 'temporary-traffic-control-plan-utility-job',
  title: 'How to Build a Temporary Traffic Control Plan for a Small Utility Job (NJ Field Guide)',
  excerpt:
    'A practical, MUTCD-compliant template for building a TTC plan for a small utility job — water service, gas tap, fiber pull. Includes the gear list, sign placement, taper math, and what NJ municipalities actually want to see on the permit.',
  metaDescription:
    'Build a temporary traffic control plan for a small utility job: gear list, sign placement, taper math, and the NJ municipal permit checklist.',
  primaryKeyword: 'temporary traffic control plan',
  secondaryKeywords: [
    'TTC plan',
    'traffic control plan utility job',
    'MUTCD TTC plan',
    'small utility job traffic control',
    'NJ work zone permit',
  ],
  targetVolume: 1300,
  datePublished: '2026-04-27',
  readMinutes: 10,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A temporary traffic control plan (TTC plan) for a small utility job has six pieces: ',
      h('strong', null, 'a vicinity sketch, a work zone diagram, a device schedule, a sign list, the work hours, and a flagger or detour plan.'),
      ' If you can hand a permit reviewer those six items on one page, you will get approved fast. Below is the contractor field-guide version — what to put in each section, the math behind the taper, and the gear list for a typical NJ water-service or fiber-pull job.',
    ),

    h('h2', null, 'What a TTC plan is, and what it is not'),
    h(
      'p',
      null,
      'The MUTCD calls a TTC plan a "Temporary Traffic Control Plan" — a written document that describes how road users and workers will be safely separated and routed through or around a work zone. For a small utility job (a service connection, a curb-stop replacement, a fiber drop), the plan is a one-pager. For a long-duration NJDOT closure, it is a stamped engineering document with sheets.',
    ),
    h(
      'p',
      null,
      'This guide is for the one-pager — short-duration, low-volume, contractor-prepared. If your job is on a state route, exceeds 3 days, or impacts more than half the roadway width, you almost certainly need a stamped TCP from a licensed engineer instead.',
    ),

    h('h2', null, 'The six required pieces'),

    h('h3', null, '1. Vicinity sketch'),
    h(
      'p',
      null,
      'A simple plan-view of the work site showing the cross streets, north arrow, and approximate scale. Hand-drawn is fine; a Google Maps screenshot with a marker is better. The reviewer needs to see where the work is in the context of the surrounding road network.',
    ),

    h('h3', null, '2. Work zone diagram (the meat of the plan)'),
    h(
      'p',
      null,
      'The diagram shows the actual cone, sign, and barricade layout. The MUTCD has standard typical applications (TAs) — TA-10 for a shoulder closure, TA-11 for a one-lane closure on a two-lane road, TA-23 for a flagger operation, and so on. ',
      h('strong', null, 'You do not have to invent the diagram'),
      ' — pick the closest TA, copy it, and adapt the dimensions to your job.',
    ),
    h(
      'p',
      null,
      'NJDOT and most NJ municipalities accept a labeled MUTCD TA reference plus your taper length and channelizer count. They want to see: advance signing distances, taper length L, buffer space, activity area length, and downstream taper.',
    ),

    h('h3', null, '3. Device schedule'),
    h(
      'p',
      null,
      'A short table listing each device on the diagram and the spec.',
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
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Device'), h('th', { className: 'text-left p-2 border-b' }, 'Quantity'), h('th', { className: 'text-left p-2 border-b' }, 'Spec / size')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Traffic cones'), h('td', { className: 'p-2' }, '20'), h('td', { className: 'p-2' }, '28-inch reflective collar')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type II barricade'), h('td', { className: 'p-2' }, '2'), h('td', { className: 'p-2' }, '36-inch, both sides reflective')),
          h('tr', null, h('td', { className: 'p-2' }, 'W20-1 ROAD WORK AHEAD'), h('td', { className: 'p-2' }, '1'), h('td', { className: 'p-2' }, '48-inch diamond, post-mounted or stand')),
          h('tr', null, h('td', { className: 'p-2' }, 'W21-5 SHOULDER WORK'), h('td', { className: 'p-2' }, '1'), h('td', { className: 'p-2' }, '48-inch diamond, downstream of W20-1')),
          h('tr', null, h('td', { className: 'p-2' }, 'W4-2 LANE ENDS'), h('td', { className: 'p-2' }, '1'), h('td', { className: 'p-2' }, '48-inch diamond, before taper')),
        ),
      ),
    ),

    h('h3', null, '4. Sign list with placement distances'),
    h(
      'p',
      null,
      'Advance warning signs spacing comes from MUTCD Table 6C-1. For low-speed (≤30 mph) urban streets, signs go at 100 / 100 / 100 ft upstream. For 35–45 mph, 350 / 350 / 350 ft. For 45+ mph, 500 / 500 / 500 ft (or the agency-specified spacing). The list should call out distance from the start of the taper.',
    ),

    h('h3', null, '5. Work hours'),
    h(
      'p',
      null,
      'Most NJ municipalities restrict work-zone hours: typically 9 AM to 3 PM on arterials to avoid peak commute, and no overnight without explicit overnight permit. Be specific: "0900–1500, Mon–Fri, no work on holidays."',
    ),

    h('h3', null, '6. Flagger / detour plan'),
    h(
      'p',
      null,
      'For a single-lane closure on a two-lane road, you have two options: alternating one-way traffic with flaggers (TA-10/TA-11 with flaggers), or a temporary signal, or a detour around the block. Spell out which one you are using. If flaggers, identify how many (minimum two, one at each end) and confirm they are ATSSA-certified or NJ DOT-approved.',
    ),

    h('h2', null, 'Worked example — water service connection in Middlesex County'),
    h(
      'p',
      null,
      'Job: replace a 1-inch water service from the curb stop to the meter pit. Estimated 6 hours, single shift, on a 35 mph local collector.',
    ),
    h(
      'p',
      null,
      'Working through the six sections:',
    ),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'Vicinity sketch:'), ' Google Maps screenshot, marker on the address, two upstream block names labeled.'),
      h('li', null, h('strong', null, 'Diagram:'), ' MUTCD TA-10 (shoulder closure / utility work) adapted. Right-lane closure with flagger control during pipe pull.'),
      h('li', null, h('strong', null, 'Devices:'), ' 20 cones (28-inch), 2 Type II barricades, advance signs (W20-1, W21-5, W4-2, W20-7 FLAGGER).'),
      h('li', null, h('strong', null, 'Sign placement:'), ' W20-1 at 350 ft upstream, W21-5 at 700 ft upstream, W20-7 FLAGGER at 1000 ft upstream of the activity area.'),
      h('li', null, h('strong', null, 'Hours:'), ' 0900–1500, single day.'),
      h('li', null, h('strong', null, 'Flagger plan:'), ' two ATSSA-certified flaggers, alternating one-way, radio communication.'),
    ),
    h(
      'p',
      null,
      'Taper math (35 mph, 12-ft lane): L = (12 × 35²) ÷ 60 = 245 ft, cone spacing 25 ft, minimum 10 cones in the taper. With buffer + activity + downstream: ~16 cones in placement, plus spares.',
    ),

    h('h2', null, 'NJ municipal permit checklist'),
    h(
      'p',
      null,
      'Across NJ municipalities, the items reviewers actually ask for are remarkably consistent. The plan should have:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'A site address and parcel ID (block/lot)'),
      h('li', null, 'Contractor name, license number, and 24-hour emergency contact'),
      h('li', null, 'A signed indemnification statement (or attached COI for the policy)'),
      h('li', null, 'Specific work hours and a "no work on holidays" line'),
      h('li', null, 'The MUTCD TA reference for your closure type'),
      h('li', null, 'Road owner identified (municipal, county, state) — wrong owner is the #1 reason permits get bounced'),
      h('li', null, 'A plan for emergency vehicle access during the closure (usually a written commitment to break down within 5 minutes if needed)'),
      h('li', null, 'A restoration plan describing how the road / lawn / sidewalk gets put back'),
    ),

    h('h2', null, 'Five mistakes that bounce a TTC plan'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Wrong road owner.'), ' If the road is a county route, the municipality cannot issue your permit. Check Open Roads or call the public works office before you submit.'),
      h('li', null, h('strong', null, 'Generic MUTCD TA copy with no dimensions.'), ' Reviewers want to see your taper L and your specific sign distances, not just a TA number.'),
      h('li', null, h('strong', null, 'No flagger plan on a closure that needs it.'), ' If you are alternating traffic, you need flaggers. Saying "controlled by flagman" without naming credentials gets bounced.'),
      h('li', null, h('strong', null, 'Hours that include peak commute.'), ' Most NJ towns won\'t approve closures during 7–9 AM or 3–6 PM on arterials. Restrict yourself or get a deviation.'),
      h('li', null, h('strong', null, 'No emergency-access plan.'), ' Reviewers care about this — if your closure blocks the only way for an ambulance, your permit will sit.'),
    ),

    h('h2', null, 'Templates and tools'),
    h(
      'p',
      null,
      'You do not need fancy software for a one-page TTC plan. A printable PDF template plus the MUTCD TA reference is enough. If you want a faster path: describe your job to our ',
      h('a', { href: '/assistant' }, 'AI Assistant'),
      ' (job address, road type, work hours, equipment) and it returns a gear list and an MUTCD-compliant device schedule that you can attach to your permit. Use the ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' to drop the gear on a real map and export a diagram.',
    ),
    h(
      'p',
      null,
      'For same-day delivery of the cones, signs, and barricades on the device schedule, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' — Central NJ delivery is the same day on most orders.',
    ),

    h('h2', null, 'When you need a stamped TCP instead'),
    h(
      'p',
      null,
      'Some jobs are too big for a one-page contractor plan. The triggers, in NJ practice, are: any work on a state route (NJDOT-maintained), any closure longer than 3 days, any closure that takes more than half the roadway width, any nighttime work on a 45+ mph road, and any closure on the NJ Turnpike or Garden State Parkway. For those, you need a stamped TCP prepared by a licensed PE who carries traffic-control experience. Engage one early — the lead time on a stamped plan can be 1–3 weeks.',
    ),
  ),
  faqs: [
    {
      q: 'What is a temporary traffic control plan (TTC plan)?',
      a: 'A written plan, required by the MUTCD, that describes how road users and workers are kept safely separated through a work zone. For small utility jobs in NJ, it is typically a one-pager with a vicinity sketch, work-zone diagram, device schedule, sign list, work hours, and flagger or detour plan.',
    },
    {
      q: 'Do I need an engineer-stamped TCP for a small utility job?',
      a: 'Usually no. A contractor-prepared TTC plan is acceptable for short-duration (≤3 days), low-volume work on municipal or county roads. You need a stamped engineering TCP for state-route work, multi-day closures, more-than-half-roadway closures, or any work on NJ Turnpike or Parkway.',
    },
    {
      q: 'How long does it take to get a TTC plan approved in NJ?',
      a: 'Most NJ municipalities turn around a complete one-page contractor plan in 5–10 business days. State-route work and stamped TCPs can take 4–8 weeks. Submitting an incomplete plan is the most common cause of delay — use the six-section format and the permit checklist before submitting.',
    },
    {
      q: 'Can I just copy a MUTCD typical application (TA) and use that as my plan?',
      a: 'Partially. You can reference a TA number (e.g., TA-10) as the layout, but your plan also needs site-specific dimensions: taper length, sign distances, device counts, work hours, flagger plan, and an emergency-access statement. Reviewers will not approve a plain TA copy without those details.',
    },
    {
      q: 'What is the difference between a TTC plan and a TCP?',
      a: 'They mean nearly the same thing. "TTC plan" is the MUTCD term for any temporary traffic control plan, including informal contractor one-pagers. "TCP" is more often used to mean a formal engineered document on a state-route or long-duration project. In NJ, the contractor-prepared one-pager is usually called a TTC plan or a "traffic control plan attached to a permit."',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'mutcd-taper-length-formula-nj',
    'how-many-cones-for-lane-closure-nj',
    'uniform-traffic-control-devices-mutcd-guide',
  ],
}
