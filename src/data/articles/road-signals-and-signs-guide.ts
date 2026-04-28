import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * PILLAR — Targets "road signals and signs" (50K/mo, CI=61).
 * Head pillar covering the sign + signal categories most contractors deal with.
 * Absorbs "road signal signs" (50K) as primary; "traffic control signs" (5K),
 * "construction signs", "regulatory signs", "warning signs" as secondary.
 */
export const articleRoadSignalsAndSignsGuide: Article = {
  slug: 'road-signals-and-signs-guide',
  title: 'Road Signals and Signs: A Contractor Guide to Work-Zone Devices',
  excerpt:
    'Signs warn, regulate, and guide. Signals control. The MUTCD splits the road-device world into distinct families, and a contractor needs to know which one to deploy when. Here is the working reference.',
  metaDescription:
    'Road signals and signs: MUTCD device families (regulatory, warning, guide, signal), work-zone sign sequence, sizing by speed, retroreflectivity, and how to rent them.',
  primaryKeyword: 'road signals and signs',
  secondaryKeywords: [
    'road signal signs',
    'traffic control signs',
    'construction signs',
    'regulatory signs',
    'warning signs',
    'guide signs',
    'work zone signs',
    'MUTCD signs',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-27',
  dateModified: '2026-04-28',
  readMinutes: 11,
  body: h(
    Fragment,
    null,

    h(
      'p',
      { className: 'lead' },
      '"Road signals and signs" is the umbrella term for the visual devices that regulate, warn, guide, and control traffic on public roads. The federal MUTCD splits them into four families that every contractor and traffic-control professional needs to keep straight: regulatory signs (red/black, "must do" — STOP, YIELD, SPEED LIMIT), warning signs (yellow or orange, "be ready" — CURVE, FLAGGER, ROAD WORK AHEAD), guide signs (green, "where" — route markers, exits), and signals (lighted devices that change state — traffic signals, pedestrian signals, beacons). Each family lives in a different MUTCD Part, has different specs, and shows up in different parts of a work zone or roadway.',
    ),

    h('h2', null, 'What is the difference between road signals and road signs?'),
    h(
      'p',
      null,
      'A sign is a static panel — a piece of metal, plywood, or roll-up vinyl with retroreflective sheeting, mounted on a post or stand. A signal is a lighted device that changes state — a traffic signal head, a pedestrian WALK/DON\'T WALK indicator, a flashing beacon, an arrow board. Signs communicate continuously through reflectivity and shape; signals communicate by lamps changing color or pattern. The MUTCD treats them as distinct device classes (Part 2 for signs, Part 4 for signals) because they behave differently for the driver: a sign is observable on approach at any moment; a signal requires the driver to attend to its current state.',
    ),
    h(
      'p',
      null,
      'In a temporary traffic control context, the distinction matters because the sign category is huge — every work zone uses dozens of W-series and R-series signs — while the signal category is narrow and usually means an arrow board, a portable changeable message sign, an AFAD\'s remote-controlled signal head, or a portable traffic signal trailer for two-way single-lane control.',
    ),

    h('h2', null, 'What are the four MUTCD sign families?'),
    h(
      'p',
      null,
      'The four families are color-coded and shape-coded by MUTCD §2A. Regulatory signs are white background with red or black legend, octagonal (STOP), triangular (YIELD), or rectangular (most others) — they direct mandatory driver action. Warning signs are typically yellow background with black legend, diamond-shaped — they alert drivers to upcoming conditions. Guide signs are green background with white legend, rectangular — they tell drivers where they are or where things are. The temporary work-zone subset of warning signs (the W21 and W20 series the contractor actually deploys) uses orange background instead of yellow to distinguish work-zone hazards from permanent road hazards.',
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
            h('th', null, 'Family'),
            h('th', null, 'Color'),
            h('th', null, 'Shape'),
            h('th', null, 'Examples'),
            h('th', null, 'MUTCD Part'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', null, 'Regulatory'), h('td', null, 'White / red / black'), h('td', null, 'Octagon, triangle, rectangle'), h('td', null, 'STOP, YIELD, SPEED LIMIT, R1-1, R1-2, R2-1'), h('td', null, 'Part 2B')),
          h('tr', null, h('td', null, 'Warning (permanent)'), h('td', null, 'Yellow / black'), h('td', null, 'Diamond'), h('td', null, 'CURVE, INTERSECTION, W1-1, W2-1'), h('td', null, 'Part 2C')),
          h('tr', null, h('td', null, 'Warning (work zone)'), h('td', null, 'Orange / black'), h('td', null, 'Diamond'), h('td', null, 'ROAD WORK AHEAD W20-1, FLAGGER W21-7, LANE CLOSED W20-5'), h('td', null, 'Part 6F'),),
          h('tr', null, h('td', null, 'Guide'), h('td', null, 'Green / white'), h('td', null, 'Rectangle'), h('td', null, 'EXIT, ROUTE MARKER, DETOUR'), h('td', null, 'Part 2D'),),
          h('tr', null, h('td', null, 'Signal'), h('td', null, 'N/A — lighted'), h('td', null, 'Vertical 3-section heads, ped indicators'), h('td', null, 'Traffic signal, AFAD signal, arrow board'), h('td', null, 'Part 4 / Part 6F.61')),
        ),
      ),
    ),

    h('h2', null, 'What signs and signals does a typical contractor cone zone need?'),
    h(
      'p',
      null,
      'A standard work-zone sign sequence runs from upstream to downstream in this order: ',
      h('a', { href: '/product/roll-up-road-work-ahead' }, 'ROAD WORK AHEAD (W20-1)'),
      ', situational warning (',
      h('a', { href: '/product/roll-up-flagger-ahead' }, 'FLAGGER W21-7'),
      ' or ',
      h('a', { href: '/product/roll-up-one-lane-road' }, 'ONE LANE ROAD AHEAD W20-4'),
      '), the closure indication (LANE CLOSED W20-5 or LEFT/RIGHT LANE CLOSED W4-2), the regulatory speed reduction if applicable (R2-5b or R2-5bP), and the guide signs for any detour (M4-9 / M4-10 series). Each sign rides on a ',
      h('a', { href: '/product/telescoping-sign-stand' }, 'telescoping sign stand'),
      ' weighted with sandbags or a ',
      h('a', { href: '/product/rubber-sign-stand-base-weight' }, 'rubber base weight'),
      '.',
    ),
    h(
      'p',
      null,
      'On the signal side, the contractor typically deploys one or more ',
      h('a', { href: '/product/trailer-mounted-arrow-board-15' }, 'trailer-mounted arrow boards'),
      ' upstream of the taper on lane closures, a ',
      h('a', { href: '/product/portable-message-board-3line' }, 'portable changeable message sign (PCMS)'),
      ' farther upstream for advance messaging, and on single-lane two-way operations either a flagger pair or an AFAD pair (automated flagger assistance device — a portable signal head replacing the human paddle).',
    ),

    h('h2', null, 'What MUTCD and OSHA standards govern signs and signals?'),
    h(
      'p',
      null,
      'MUTCD Part 2 covers permanent signs (Part 2A general, Part 2B regulatory, Part 2C warning, Part 2D guide). MUTCD Part 4 covers permanent traffic signals. MUTCD Part 6 covers temporary traffic control — Part 6F is the device chapter (signs §6F.03–F.59, channelizers §6F.63–F.67, lights §6F.81), and §6F.60–F.62 cover changeable message signs, arrow boards, and PCMS. The federal manual, edition status, and adopted state supplements are published online by the FHWA Office of Operations through the ',
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
      'OSHA 1926.200 incorporates MUTCD by reference for construction work, which means non-conforming signs in a work zone are not just an FHWA issue but a federal occupational-safety violation. Sign retroreflectivity is governed by the FHWA Minimum Retroreflectivity Standards (23 CFR 655) — agencies and contractors must maintain signs above a minimum reflective performance level over the sign\'s service life.',
    ),

    h('h2', null, 'How do I size signs and place them on a work zone?'),
    h(
      'p',
      null,
      'Sign size scales with operating speed. MUTCD Table 6F-1 gives the minimum sizes by speed for the work-zone W-series. Below 35 mph, 36" × 36" is acceptable; 35–55 mph, 48" × 48" is standard; above 55 mph (freeway-class), 48" × 48" is the minimum and 60" × 60" is common. Letter heights inside the sign follow MUTCD §2A.13 — 6-inch capital letters for low-speed, 8 to 10 inches for high-speed, scaled to the road class.',
    ),
    h(
      'p',
      null,
      'Placement distance — how far upstream of the work zone the sign goes — comes from MUTCD Table 6C-1. Roughly: 100–150 ft at 25 mph, 250–500 ft at 40 mph, 500–1,000 ft at 65 mph. On high-speed roads the W20-1 ROAD WORK AHEAD sign is paired with one or two more advance-warning signs (a "ROAD WORK 1500 FT" or a PCMS) so the motorist sees a sequence rather than a single warning.',
    ),

    h('h2', null, 'How long do work-zone signs and signals last?'),
    h(
      'p',
      null,
      'Roll-up vinyl signs with prismatic sheeting carry 1–3 year service-life warranties under continuous outdoor exposure, with noticeable retroreflectivity loss after 12–18 months of continuous deployment. Rigid aluminum signs with high-intensity prismatic sheeting last 7–10 years. Sign stands (X-stands and telescoping poles) last several years with normal handling but are prone to wind damage if undersized base weights are used. Solar-powered arrow boards and PCMS units carry 5–7 year service lives on the panel and 3–5 year service life on the battery bank, with battery replacement scheduled mid-life.',
    ),

    h('h2', null, 'How do I rent the right signs and signals for a job?'),
    h(
      'p',
      null,
      'Send the quote with the work-zone typical application (the MUTCD Part 6 TA number from the contract drawings), road speed, lane configuration, and duration. The rental coordinator can pull the conforming sign sequence — W20-1, W21-7, W20-5, etc. — at the right size for the speed, plus the right arrow board class (Type B for low-speed, Type C for highway), plus warning lights, sign stands, and base weights. Lead time runs 24–48 hours for sign packages and arrow boards in major metros, 2–5 business days for AFADs and portable signal trailers, and 1 week or more for full PCMS deployments on long-duration projects.',
    ),

    h(
      'p',
      null,
      h('a', { href: '/quote', className: 'cta-inline' }, 'Quote signs and signals for your work zone'),
      ' — share the typical application and the road class, and we will line up a conforming sign sequence and arrow boards.',
    ),
  ),

  faqs: [
    {
      q: 'What is the difference between a regulatory and a warning sign?',
      a: 'Regulatory signs (white background, red or black) command mandatory driver action — STOP, YIELD, SPEED LIMIT — and are enforceable. Warning signs (yellow or orange background, diamond shape) alert drivers to a condition ahead but do not impose a mandatory action. Both are governed by MUTCD Part 2 (permanent) and Part 6F (work zone) and must conform to size, color, and shape standards to be legally valid.',
    },
    {
      q: 'Why are work-zone warning signs orange instead of yellow?',
      a: 'MUTCD §6F distinguishes temporary traffic control from permanent conditions by color. Orange background signals a temporary condition associated with construction, maintenance, or utility work. Yellow background signals a permanent or semi-permanent condition (a curve, an intersection). The driver behavioral response is similar but the color tells them which device class they are seeing.',
    },
    {
      q: 'What size signs are required in a work zone?',
      a: 'MUTCD Table 6F-1 sets the minimum sizes by operating speed. Below 35 mph: 36" × 36" minimum. 35–55 mph: 48" × 48" standard. Above 55 mph (freeway): 48" × 48" minimum, 60" × 60" common. Roll-up signs must match these dimensions and carry retroreflective sheeting that meets §6F.03 (typically Type IV or higher prismatic).',
    },
    {
      q: 'Can a single sign cover both a regulatory and a warning function?',
      a: 'No — MUTCD treats them as separate device classes with different colors and shapes. A sign that needs to convey both functions (e.g., a flagger station with a speed reduction) uses two adjacent signs: the W21-7 warning sign first, then the R2-5 regulatory speed-limit sign. Combining them on a single panel is non-conforming.',
    },
    {
      q: 'When does a work zone need an arrow board?',
      a: 'MUTCD §6L.06 makes a flashing arrow board mandatory on any single-lane closure on a multi-lane highway with operating speed above 45 mph. On lower-speed two-lane work and on shoulder closures, an arrow board is not required by the manual but is often required by state DOT specifications. The contract drawings will specify.',
    },
    {
      q: 'Are portable changeable message signs (PCMS) "signs" or "signals"?',
      a: 'Both, in different ways. A PCMS is governed by MUTCD §6F.60 as a temporary traffic control sign (it conveys regulatory or warning content) but it changes state like a signal (the message library cycles by command). Most state DOTs treat it as a sign for placement purposes and as a signal for power and operational requirements.',
    },
    {
      q: 'How is sign retroreflectivity measured and verified?',
      a: 'Retroreflectivity is measured in candelas per lux per square meter (cd/lux/m²) using a retroreflectometer. The FHWA Minimum Retroreflectivity Standards (23 CFR 655) set minimum performance levels by sign type and color. Roadway agencies and contractors verify reflectivity through visual inspection during nighttime patrols, periodic retroreflectometer testing, or sheeting-life-cycle tracking — three methods accepted by FHWA.',
    },
    {
      q: 'Does a work zone need both signs and signals, or can it use just one?',
      a: 'Most work zones use both. Signs handle the persistent communication (ROAD WORK AHEAD, FLAGGER, SPEED LIMIT) and signals handle the dynamic communication (the lane shift via arrow board, the active flagger control via AFAD). On low-speed short-duration work, signs alone may suffice. On highway-class multi-lane closures, both are typically required by the contract drawings.',
    },
  ],

  relatedProducts: [
    { label: 'Roll-Up "Road Work Ahead" Sign', path: '/product/roll-up-road-work-ahead' },
    { label: 'Roll-Up "Flagger Ahead" Sign', path: '/product/roll-up-flagger-ahead' },
    { label: 'Roll-Up "One Lane Road" Sign', path: '/product/roll-up-one-lane-road' },
    { label: 'Telescoping Sign Stand', path: '/product/telescoping-sign-stand' },
    { label: 'Trailer-Mounted Arrow Board (15-Lamp)', path: '/product/trailer-mounted-arrow-board-15' },
    { label: 'Portable Message Board (3-Line)', path: '/product/portable-message-board-3line' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
  ],

  relatedArticles: [
    'uniform-traffic-control-devices-mutcd-guide',
    'arrow-board-rental-guide',
    'traffic-control-devices-guide',
  ],
}
