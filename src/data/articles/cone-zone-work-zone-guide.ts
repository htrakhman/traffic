import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * PILLAR — Targets "cone zone" (50K/mo, CI=1, score=50000).
 * Highest opportunity score in the entire keyword set.
 * Solution-hub pattern with 8 sections.
 */
export const articleConeZoneWorkZoneGuide: Article = {
  slug: 'cone-zone-work-zone-guide',
  title: 'Cone Zone: How Contractors Build a Compliant Work Zone',
  excerpt:
    'A "cone zone" is the everyday name for a temporary traffic control work zone — the cones, drums, signs, and arrow boards that protect a crew on the road. Here is how to build one that actually passes inspection.',
  metaDescription:
    'Cone zone explained: MUTCD Part 6 device order, cone counts and spacing by speed, equipment list, contractor sizing rules, and the standards that govern every work zone.',
  primaryKeyword: 'cone zone',
  secondaryKeywords: [
    'work zone setup',
    'temporary traffic control zone',
    'cone zone meaning',
    'work zone cones',
    'construction cone zone',
    'MUTCD work zone',
    'cone zone safety',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-27',
  readMinutes: 11,
  body: h(
    Fragment,
    null,

    h(
      'p',
      { className: 'lead' },
      'A "cone zone" is the everyday name for a temporary traffic control work zone — the regulated stretch of road where contractors set up cones, drums, signs, arrow boards, and barricades to redirect traffic around active work. The term shows up on highway message boards ("ENTERING CONE ZONE 1 MILE") and in DOT public-awareness campaigns, but the engineering behind it is governed by MUTCD Part 6 (Temporary Traffic Control). A compliant cone zone has four functional areas — advance warning, transition, activity, and termination — each one carrying specific devices in specific quantities at specific spacings.',
    ),

    h('h2', null, 'What does "cone zone" actually mean?'),
    h(
      'p',
      null,
      'The phrase originated in state DOT public-awareness campaigns starting in the late 1990s — Caltrans, Iowa DOT, and several others used "cone zone" to teach drivers that orange cones equal slow down and pay attention. It has since become a workplace shorthand for any temporary traffic control area, especially one with extensive cone or drum channelization. From the contractor side, "cone zone" usually refers specifically to the channelizing portion of the work zone — the cones running along the taper and through the activity area — even though the regulated zone is broader and includes the upstream warning signs and the downstream termination taper.',
    ),
    h(
      'p',
      null,
      'The legal standard is MUTCD Part 6. Whatever you call it on radio, the cone zone has to conform to the federal manual to be enforceable, defensible, and inspection-ready. Plain cones in a road do not constitute a compliant work zone unless they sit inside a four-area structure with conforming devices.',
    ),

    h('h2', null, 'Why does a properly built cone zone matter?'),
    h(
      'p',
      null,
      'Federal Highway Administration data has consistently shown several hundred work-zone fatalities per year in the United States, with the majority involving motorists rather than workers — runoff crashes, rear-end collisions, and rollovers triggered by drivers who did not perceive the work zone soon enough or could not navigate it safely. Most of those crashes share root causes: insufficient advance warning distance, abrupt taper without proper channelization, missing or non-retroreflective devices at night. A correctly built cone zone is not paperwork — it is the difference between an uneventful shift and a fatality investigation.',
    ),
    h(
      'p',
      null,
      'The contractor question is therefore not "do I need a cone zone" but "what specific devices, in what quantities, at what spacings, are required for the work I am about to do." That answer comes from a temporary traffic control plan that maps to the MUTCD typical applications — TA-10 (lane closure on a two-lane road), TA-15 (lane closure on a multi-lane road), TA-21 (lane shift on a divided highway), and so on.',
    ),

    h('h2', null, 'What equipment goes in a cone zone?'),
    h(
      'p',
      null,
      'A typical contractor cone zone uses six to eight device classes. The exact mix depends on the typical application from the contract plans, but the working list rarely strays far from this:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Channelizing devices'),
        ' — ',
        h('a', { href: '/product/28-inch-traffic-cone' }, '28-inch traffic cones'),
        ' for low-speed work, ',
        h('a', { href: '/product/36-inch-traffic-cone' }, '36-inch traffic cones'),
        ' for higher-speed or nighttime work, and ',
        h('a', { href: '/product/channelizing-drum' }, 'channelizing drums'),
        ' for multi-day deployments.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Advance warning signs'),
        ' — ',
        h('a', { href: '/product/roll-up-road-work-ahead' }, 'ROAD WORK AHEAD (W20-1)'),
        ', ',
        h('a', { href: '/product/roll-up-flagger-ahead' }, 'FLAGGER (W21-7)'),
        ', LANE CLOSED, ',
        h('a', { href: '/product/roll-up-one-lane-road' }, 'ONE LANE ROAD AHEAD (W20-4)'),
        ', mounted on a ',
        h('a', { href: '/product/telescoping-sign-stand' }, 'telescoping sign stand'),
        '.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Arrow board'),
        ' — a ',
        h('a', { href: '/product/trailer-mounted-arrow-board-15' }, 'trailer-mounted Type C arrow board'),
        ' upstream of the taper on any lane closure on a multi-lane road above 45 mph.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Type III barricades'),
        ' — used when the closure is full or pedestrian-rated, like a complete road closure or a sidewalk shutdown.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Warning lights'),
        ' — ',
        h('a', { href: '/product/type-b-flashing-warning-light' }, 'Type B flashing warning lights'),
        ' on signs and barricades for nighttime work above 45 mph.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Hi-visibility apparel'),
        ' — ANSI Class 2 or Class 3 garments for every worker on foot inside the zone.',
      ),
    ),
    h(
      'p',
      null,
      'On highway-class work, the device list expands to include shadow vehicles with truck-mounted attenuators (TMAs), portable changeable message signs (PCMS), and sometimes longitudinal barriers — water-filled or concrete — when positive protection is required.',
    ),

    h('h2', null, 'What MUTCD and OSHA standards govern the cone zone?'),
    h(
      'p',
      null,
      'MUTCD Part 6 is the master standard. §6C describes the four work-zone areas (advance warning, transition, activity, termination); §6F covers each device class (signs §6F.03–F.59, channelizers §6F.63–F.67, lights §6F.81); §6G covers operation classes (mobile, short-duration, short-term, intermediate-term, long-term); §6H provides the typical applications that contractors map their plans to. The federal text, Edition status, and adopted state supplements are published online by the FHWA Office of Operations through the ',
      h(
        'a',
        {
          href: 'https://mutcd.fhwa.dot.gov/',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        'MUTCD Knowledge Center',
      ),
      '.',
    ),
    h(
      'p',
      null,
      'OSHA 1926.200 incorporates MUTCD by reference for construction work, which means MUTCD compliance is a federal occupational-safety duty, not just a traffic engineering obligation. OSHA 1926.201 covers flagger and signaling rules — high-visibility apparel, paddle specifications, training. Crashworthy hardware (TMAs, longitudinal barriers, breakaway sign supports) is governed by AASHTO\'s Manual for Assessing Safety Hardware (MASH); the federal eligibility list is maintained through the FHWA roadside hardware acceptance process.',
    ),

    h('h2', null, 'How do I size a cone zone?'),
    h(
      'p',
      null,
      'Three numbers drive the layout: the advance warning distance, the taper length, and the cone spacing in the taper. All three scale with the operating speed of the road. The contractor pulls the typical application from the contract plans, then sizes by MUTCD Tables 6C-1 (advance warning), 6C-3 (taper length), and 6F-1 (sign size). The numbers below are the MUTCD baseline; state supplements may tighten them.',
    ),
    h(
      'div',
      { className: 'overflow-x-auto' },
      h(
        'table',
        null,
        h(
          'thead',
          null,
          h(
            'tr',
            null,
            h('th', null, 'Posted Speed'),
            h('th', null, 'Advance Warning Distance (ft)'),
            h('th', null, 'Taper Length (ft, 12-ft lane)'),
            h('th', null, 'Cone Spacing in Taper (ft)'),
            h('th', null, 'Cones in Taper'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', null, '25 mph'),
            h('td', null, '100'),
            h('td', null, '105'),
            h('td', null, '25'),
            h('td', null, '5'),
          ),
          h(
            'tr',
            null,
            h('td', null, '35 mph'),
            h('td', null, '250'),
            h('td', null, '205'),
            h('td', null, '35'),
            h('td', null, '7'),
          ),
          h(
            'tr',
            null,
            h('td', null, '45 mph'),
            h('td', null, '500'),
            h('td', null, '540'),
            h('td', null, '45'),
            h('td', null, '13'),
          ),
          h(
            'tr',
            null,
            h('td', null, '55 mph'),
            h('td', null, '500'),
            h('td', null, '660'),
            h('td', null, '55'),
            h('td', null, '13'),
          ),
          h(
            'tr',
            null,
            h('td', null, '65 mph'),
            h('td', null, '1,000'),
            h('td', null, '780'),
            h('td', null, '65'),
            h('td', null, '13'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Total cone count for a job is the taper count plus the activity-area count (one cone every 1× the speed in feet — 65 cones every 65 feet on a 65 mph road) plus the termination taper (typically 100 feet for any speed). A 1,000-foot activity area at 45 mph adds 22 cones at 45-foot tangent spacing, giving roughly 35–40 cones per side for the full setup. Round up. Bring extras — cones get hit, kicked, and run over.',
    ),

    h('h2', null, 'What are the most common cone zone mistakes?'),
    h(
      'p',
      null,
      'Five mistakes catch contractors at inspection. First, cones too short for the speed — 18-inch cones on a 45 mph road, when MUTCD §6F.64 requires 28-inch minimum. Second, missing reflective collars on nighttime work — 36-inch cones with two collars are the standard above 35 mph at night. Third, taper too short — improvising the taper instead of pulling the table value. Fourth, advance warning sign too close — the W20-1 ROAD WORK AHEAD sign needs to sit at the Table 6C-1 distance upstream of the first cone, not at the start of the taper. Fifth, no termination taper — a downstream taper is required to cleanly return traffic to the normal lane configuration; skipping it leaves the work zone open at the back end.',
    ),
    h(
      'p',
      null,
      'The other failure mode is mid-shift erosion. The setup at 7 AM looks compliant; by 3 PM cones have been dragged, knocked over, or kicked into the active lane. A documented mid-shift inspection — once every two hours at minimum, more often in heavy traffic — catches and corrects the drift.',
    ),

    h('h2', null, 'How do I rent equipment for a cone zone?'),
    h(
      'p',
      null,
      'Send a quote request with the operation class (mobile, short-duration, short-term, intermediate-term, long-term per MUTCD §6G.02), road speed, lane configuration, expected duration, delivery address, and any state DOT plan number or typical-application reference. The rental coordinator can match cones, drums, signs, arrow boards, and any required barriers to the plan, confirm MASH eligibility for state-funded work, and stage delivery for the morning of mobilization. Lead time runs 24–48 hours for cones, signs, and arrow boards in major metros; longer for water-filled or concrete barriers and for multi-trailer packages.',
    ),

    h(
      'p',
      null,
      h('a', { href: '/quote', className: 'cta-inline' }, 'Quote a complete cone zone setup'),
      ' — share the typical application and the dates, and we will line up cones, drums, signs, and arrow boards to spec.',
    ),
  ),

  faqs: [
    {
      q: 'Is "cone zone" an official MUTCD term?',
      a: 'No. The federal manual uses "temporary traffic control zone" and divides it into advance warning, transition, activity, and termination areas. "Cone zone" is the public-awareness shorthand used on message boards and in DOT campaigns, and it has been picked up by contractors and crews as workplace shorthand. The compliance bar is set by MUTCD Part 6 regardless of what you call it.',
    },
    {
      q: 'How many cones does a typical cone zone need?',
      a: 'For a single-lane closure on a 45 mph road, plan on roughly 35–50 cones per side: 13 in the taper at 45-foot spacing, 22 in the activity area along a 1,000-foot work area, and a downstream termination taper. Higher speeds spread the spacing out so the count rises slowly with road class. Always bring 10–20 percent extras.',
    },
    {
      q: 'What size cones are required in a cone zone?',
      a: 'MUTCD §6F.64 sets the minimum: 28-inch cones for any roadway above 35 mph, 36-inch cones for nighttime work above 35 mph and freeway-class work, with two reflective collars. 18-inch cones are not acceptable on any vehicle-speed work zone except parking-lot or pedestrian-only areas. Cone height is the most-cited inspection failure.',
    },
    {
      q: 'Do I need an arrow board in a cone zone?',
      a: 'On any single-lane closure on a multi-lane highway with operating speed above 45 mph, MUTCD §6L.06 makes a flashing arrow board mandatory. On lower-speed two-lane work and on shoulder closures, an arrow board is not required by the manual but is often required by state DOT specifications. The contract drawings will specify.',
    },
    {
      q: 'How do flaggers fit into a cone zone?',
      a: 'A flagger station is a regulated MUTCD §6E device — a trained flagger with a STOP/SLOW paddle, ANSI Class 3 garment, and an upstream W21-7 Flagger Symbol Sign. Flaggers control single-lane two-way operations on roads where signals or AFADs are not used. Multiple flaggers stationed at both ends are coordinated by radio.',
    },
    {
      q: 'What is the difference between a cone zone and a barrier-protected work zone?',
      a: 'Cones channelize and warn — they redirect traffic but do not contain it. Barriers (water-filled, concrete, steel) physically contain an errant vehicle. Long-duration work above 45 mph with workers in the active travel zone usually requires positive protection (barriers) in addition to channelizing cones. The state plan will use the words "channelization" or "positive protection" to specify which.',
    },
    {
      q: 'How often does the cone zone need to be re-inspected during a shift?',
      a: 'Best practice is a documented inspection at the start of each shift, every 2 hours during the shift, and at any change in conditions (weather, lane configuration, crew rotation). A one-line entry per inspection in a daily log is enough — cone count, sign condition, lighting state, any near-miss. The log is what protects the contractor in any post-incident review.',
    },
    {
      q: 'Are "cone zone" violations citable to drivers?',
      a: 'Yes. Most states have enhanced fines for moving violations within an active work zone — speeding, distracted driving, improper lane use. The W21-1 WORKERS PRESENT sign or "FINES DOUBLED IN WORK ZONES" plaque is the regulatory notice. The cone zone itself must be properly signed and the workers actually present for the enhancement to apply.',
    },
  ],

  relatedProducts: [
    { label: '28-Inch Traffic Cone', path: '/product/28-inch-traffic-cone' },
    { label: '36-Inch Traffic Cone', path: '/product/36-inch-traffic-cone' },
    { label: 'Channelizing Drum', path: '/product/channelizing-drum' },
    { label: 'Roll-Up "Road Work Ahead" Sign', path: '/product/roll-up-road-work-ahead' },
    { label: 'Trailer-Mounted Arrow Board (15-Lamp)', path: '/product/trailer-mounted-arrow-board-15' },
    { label: 'Cones & Drums', path: '/category/cones-drums' },
  ],

  relatedArticles: [
    'traffic-control-rental-guide',
    'how-many-cones-for-lane-closure-nj',
    'uniform-traffic-control-devices-mutcd-guide',
  ],
}
