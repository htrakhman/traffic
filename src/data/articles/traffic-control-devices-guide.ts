import { createElement as h, Fragment } from 'react'
import { Link } from 'react-router-dom'
import type { Article } from '../articles'

/**
 * PILLAR ARTICLE - Targets "traffic control devices" (5,000/mo, CI=68, score=74)
 * Secondary: "traffic control equipment", "work zone traffic control devices",
 *            "temporary traffic control devices", "traffic safety devices",
 *            "traffic control device rental"
 */
export const articleTrafficControlDevicesGuide: Article = {
  slug: 'traffic-control-devices-guide',
  title: 'Traffic Control Devices: Types, Standards, and How to Rent Them',
  excerpt:
    'A contractor-focused breakdown of traffic control device categories — cones, signs, barricades, arrow boards, and signals — with MUTCD standards, sizing rules, and rental guidance.',
  metaDescription:
    'Traffic control devices explained: cones, barricades, signs, arrow boards, and signals. MUTCD compliance, spacing tables, and rental rates for road work.',
  primaryKeyword: 'traffic control devices',
  secondaryKeywords: [
    'traffic control equipment',
    'work zone traffic control devices',
    'temporary traffic control devices',
    'traffic safety devices',
    'traffic control device rental',
    'MUTCD work zone devices',
  ],
  targetVolume: 5000,
  datePublished: '2026-04-22',
  dateModified: '2026-04-28',
  readMinutes: 11,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Traffic control devices are the signs, channelizing devices, barriers, and signals used to warn drivers, redirect lanes, and protect crews in and around active work zones. Every device used on a public road must conform to the Manual on Uniform Traffic Control Devices (MUTCD). This guide breaks down the major device categories, when each is required, and how to size a compliant package for your job.',
    ),

    // Section 1: What + When
    h('h2', null, 'What are traffic control devices and when are they required?'),
    h(
      'p',
      null,
      'Any physical object, sign, signal, or marking placed on or adjacent to a roadway to convey a regulatory, warning, or guiding message to road users is a traffic control device under the MUTCD. They are required any time work, maintenance, or an emergency narrows or blocks a travel lane, reduces sight distance, or diverts pedestrians from the normal path — regardless of whether the road is a state highway or a private access drive with public traffic.',
    ),
    h(
      'p',
      null,
      'The legal basis is MUTCD Part 1A, which requires all traffic control devices on streets and highways open to public travel to meet federal standards. Failure to deploy MUTCD-compliant devices exposes contractors, municipalities, and project owners to liability when crashes occur.',
    ),

    // Section 2: Problem framing
    h('h2', null, 'What problem do traffic control devices actually solve?'),
    h(
      'p',
      null,
      'The core problem is transition time. A driver at 45 mph covers 66 feet per second. The devices you install must give them enough distance and time to see the hazard, process it, and change behavior before entering the work area. Advance warning signs give cognitive notice. Channelizing devices give physical guidance. Barriers give physical protection. Each layer compensates for the fact that the next one may fail.',
    ),
    h(
      'p',
      null,
      'Secondary problems include pedestrian diversion, worker exposure reduction, and night visibility. A device package that handles daytime clear-weather lane closure may fail catastrophically at night or in rain if retroreflectivity is insufficient or warning distance is too short for the posted speed.',
    ),

    // Section 3: Equipment categories with product links
    h('h2', null, 'What categories of traffic control devices do I need?'),
    h(
      'p',
      null,
      'MUTCD Chapter 6 groups work-zone devices into five functional categories. Most jobs draw from at least three of them.',
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
            h('th', null, 'Category'),
            h('th', null, 'Common Devices'),
            h('th', null, 'MUTCD Reference'),
            h('th', null, 'Typical Use'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', null, 'Warning Signs'),
            h('td', null, 'Road Work Ahead, Flagger Ahead, Lane Closed'),
            h('td', null, '6F.57–6F.70'),
            h('td', null, 'Advance warning zone, 500–2,640 ft upstream'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Channelizing Devices'),
            h('td', null, 'Cones, drums, tubular markers, delineators'),
            h('td', null, '6F.63–6F.78'),
            h('td', null, 'Taper, buffer, and activity zone delineation'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Barriers & Barricades'),
            h('td', null, 'Type I/II/III barricades, water-filled barriers, jersey barriers'),
            h('td', null, '6F.63–6F.65'),
            h('td', null, 'Road closures, pedestrian diversions, high-speed work'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Arrow Boards & PCMSs'),
            h('td', null, 'Trailer/truck-mounted arrow boards, portable message boards'),
            h('td', null, '6F.53–6F.57'),
            h('td', null, 'Multi-lane closures, advance notification, complex diversions'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Safety Lighting'),
            h('td', null, 'Type A/B/C flashing lights, steady-burn lights'),
            h('td', null, '6F.79–6F.84'),
            h('td', null, 'Night work, long-duration closures'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Cones and drums from the ',
      h(Link, { to: '/category/cones-drums' }, 'cones and drums category'),
      ' handle most taper and activity zone work. For closures and diversions, pair them with ',
      h(Link, { to: '/category/barricades-barriers' }, 'barricades and barriers'),
      '. Any job on a multi-lane road — or anywhere a driver needs advance notice beyond sign distance — needs an ',
      h(Link, { to: '/category/arrow-boards' }, 'arrow board'),
      '.',
    ),

    // Section 4: MUTCD/OSHA standards
    h('h2', null, 'Which MUTCD and OSHA standards govern traffic control devices?'),
    h(
      'p',
      null,
      'Chapter 6 of the MUTCD covers temporary traffic control in its entirety. Within it, Part 6F defines device specifications (dimensions, retroreflectivity, materials), and Part 6G sets up standard work-zone layouts. For worker safety, OSHA 29 CFR 1926.200–1926.202 requires that all signs, signals, and barricades used on construction projects conform to the MUTCD — which means federal OSHA compliance and MUTCD compliance are essentially the same obligation on public roads.',
    ),
    h(
      'p',
      null,
      'The ',
      h(
        'a',
        { href: 'https://mutcd.fhwa.dot.gov/', target: '_blank', rel: 'noopener noreferrer' },
        'FHWA MUTCD portal',
      ),
      ' hosts the complete 11th Edition text. State DOTs may adopt supplements — California\u2019s CA MUTCD and Texas\u2019s Texas MUTCD both add device-specific requirements — so always verify state adoption status before ordering equipment.',
    ),
    h(
      'p',
      null,
      'Retroreflectivity is the most commonly missed requirement. Engineer Grade (EG) sheeting suffices for daytime, low-speed work. High Intensity (HI) or Diamond Grade (DG) is required for speeds above 45 mph and for all nighttime operations. If your rental inventory is not labeled with sheeting grade, ask before you accept delivery.',
    ),
    h(
      'p',
      null,
      'Crashworthiness is the second common gap. MUTCD channelizing devices, barricades, and work-zone hardware must pass either NCHRP Report 350 or AASHTO MASH crash-testing criteria. The ',
      h(
        'a',
        { href: 'https://safety.fhwa.dot.gov/roadway_dept/countermeasures/reduce_crash_severity/', target: '_blank', rel: 'noopener noreferrer' },
        'FHWA Office of Safety roadside hardware program',
      ),
      ' maintains the current list of federally eligible devices for use on the National Highway System.',
    ),

    // Section 5: Sizing table
    h('h2', null, 'How do I size a traffic control device package for my job?'),
    h(
      'p',
      null,
      'Three inputs drive quantity: posted speed limit, number of lanes closed, and work duration. Use the table below to estimate your taper length and device spacing — then multiply by the number of tapers your layout requires.',
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
            h('th', null, 'Min. Advance Warning Distance'),
            h('th', null, 'Taper Length (1-lane closure)'),
            h('th', null, 'Cone/Drum Spacing in Taper'),
            h('th', null, 'Cone/Drum Spacing in Buffer'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', null, '25 mph'),
            h('td', null, '100–350 ft'),
            h('td', null, '155 ft'),
            h('td', null, '10 ft'),
            h('td', null, '20 ft'),
          ),
          h(
            'tr',
            null,
            h('td', null, '35 mph'),
            h('td', null, '350–500 ft'),
            h('td', null, '305 ft'),
            h('td', null, '20 ft'),
            h('td', null, '40 ft'),
          ),
          h(
            'tr',
            null,
            h('td', null, '45 mph'),
            h('td', null, '500–1,000 ft'),
            h('td', null, '505 ft'),
            h('td', null, '40 ft'),
            h('td', null, '80 ft'),
          ),
          h(
            'tr',
            null,
            h('td', null, '55 mph'),
            h('td', null, '1,000–1,500 ft'),
            h('td', null, '755 ft'),
            h('td', null, '80 ft'),
            h('td', null, '160 ft'),
          ),
          h(
            'tr',
            null,
            h('td', null, '65 mph'),
            h('td', null, '1,500–2,640 ft'),
            h('td', null, '1,005 ft'),
            h('td', null, '120 ft'),
            h('td', null, '240 ft'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Values per MUTCD Table 6C-1 (advance warning distances) and Table 6F-1 (channelizing device spacing). Taper lengths are calculated as L = WS²/60 for speeds ≤ 40 mph and L = WS for speeds > 40 mph (W = lane width in feet, S = speed in mph).',
    ),
    h(
      'p',
      null,
      'For work durations over 3 days on roads above 45 mph, upgrade channelizing devices from cones to drums, and add a ',
      h(Link, { to: '/category/message-boards' }, 'portable message board'),
      ' at the upstream approach. Multi-day closures with night work require a minimum of Type B flashing lights on all channelizing devices and Type III barricades — not Type I.',
    ),
    h('h2', null, 'Do I need an arrow board for my work zone?'),
    h(
      'p',
      null,
      'MUTCD Section 6F.53 makes arrow boards mandatory on multi-lane road lane closures and strongly recommended for single-lane closures on roads above 45 mph. The practical threshold most DOT inspectors enforce: if you\u2019re closing a travel lane on a road with a center line and a posted speed above 35 mph, an arrow board should be on site. For shoulder work only, arrow boards are advisory, not mandatory — but they reduce near-miss rates substantially.',
    ),
    h(
      'p',
      null,
      'Trailer-mounted Type C arrow boards (at least 48" × 96" with 15 lamp panel) are the standard for highway work. Truck-mounted boards are acceptable where the host vehicle stays in position throughout the shift. See the ',
      h(Link, { to: '/blog/arrow-board-rental-guide' }, 'arrow board rental guide'),
      ' for panel size, mounting, and rate comparisons.',
    ),

    // Section 7: Related reading (before CTA)
    h('h2', null, 'What else should I read before planning my work zone?'),
    h(
      'p',
      null,
      'If your job uses flaggers or will run longer than one day, review the ',
      h(Link, { to: '/blog/uniform-traffic-control-devices-mutcd-guide' }, 'MUTCD field guide'),
      ' for device-by-device compliance details and retroreflectivity requirements. For jobs that need full road closures or detours, the ',
      h(Link, { to: '/blog/barricade-rental-near-me-guide' }, 'barricade rental guide'),
      ' covers Type I\u2013III selection, material options, and how to build a watertight pedestrian diversion.',
    ),
    h(
      'p',
      null,
      'If labor costs are driving the decision between flaggers and automation, the ',
      h(Link, { to: '/blog/automated-flagger-assistance-device-afad-guide' }, 'AFAD guide'),
      ' covers MUTCD Section 6E.04 requirements, STOP/SLOW vs. Red/Yellow Lens types, and when an AFAD pays off on a multi-week job.',
    ),

    // Section 8: CTA block
    h('h2', null, 'Ready to build your device package?'),
    h(
      'p',
      null,
      'Use the ',
      h(Link, { to: '/quote' }, 'online quote tool'),
      ' to spec cones, barricades, signs, and an arrow board against your job\u2019s speed limit and duration. If you\u2019re not sure what you need, describe the work and the road — the form routes your request to a specialist who can put together an MUTCD-compliant package and confirm pricing in one business day.',
    ),
    h(
      'p',
      null,
      'Browse the full inventory by device category: ',
      h(Link, { to: '/category/cones-drums' }, 'cones and drums'),
      ', ',
      h(Link, { to: '/category/signs-sign-stands' }, 'signs and sign stands'),
      ', ',
      h(Link, { to: '/category/barricades-barriers' }, 'barricades and barriers'),
      ', ',
      h(Link, { to: '/category/arrow-boards' }, 'arrow boards'),
      ', and ',
      h(Link, { to: '/category/safety-lighting' }, 'safety lighting'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'What is a traffic control device?',
      a: 'A traffic control device is any sign, signal, marking, or physical barrier placed on or adjacent to a roadway to convey regulatory, warning, or guidance information to drivers and pedestrians. All devices used on public roads in the U.S. must conform to the MUTCD.',
    },
    {
      q: 'How many cones do I need for a lane closure?',
      a: 'At 45 mph with a 12-foot lane width, MUTCD taper length is roughly 505 feet and cones should be spaced 40 feet apart in the taper, giving about 13 cones for the taper alone. Add buffer zone and activity zone devices based on work length. At 25 mph the taper is ~155 ft with 10-foot spacing — about 15 cones for the taper.',
    },
    {
      q: 'What is the difference between Type I, II, and III barricades?',
      a: 'Type I has one retroreflective rail and is for low-speed, short-term closures. Type II has two rails. Type III has three rails and is required for road closures, high-speed work zones, and nighttime operations per MUTCD Section 6F.63.',
    },
    {
      q: 'Do traffic control devices need to be retroreflective?',
      a: 'Yes. MUTCD Section 6F.02 requires all temporary traffic control devices to be retroreflective or illuminated so they are visible at nighttime. Engineer Grade (EG) sheeting is the minimum; High Intensity (HI) or Diamond Grade is required for speeds above 45 mph and all nighttime work.',
    },
    {
      q: 'When is an arrow board required?',
      a: 'MUTCD Section 6F.53 mandates arrow boards for lane closures on multi-lane roads. For single-lane closures above 45 mph they are strongly recommended. Most state DOT inspectors treat any lane closure with a center-line road above 35 mph as requiring an arrow board.',
    },
    {
      q: 'Can I rent traffic control devices instead of buying them?',
      a: 'Yes, and renting is the standard approach for project-based work. Daily, weekly, and monthly rates are typical. Rentals come with compliant sheeting grades, current crashworthiness ratings, and delivery/pickup service — avoiding the depreciation and storage costs of ownership.',
    },
    {
      q: 'What OSHA standard applies to traffic control devices?',
      a: 'OSHA 29 CFR 1926.200–1926.202 requires that all signs, signals, and barricades on construction projects conform to the MUTCD. For flaggers specifically, OSHA 1926.201 sets minimum PPE and positioning requirements.',
    },
    {
      q: 'What does MASH-compliant mean for a barricade?',
      a: 'MASH (Manual for Assessing Safety Hardware) is the current AASHTO crash-testing standard, replacing NCHRP 350. A MASH-compliant barricade or device has passed updated impact tests at highway speeds and is eligible for use on federally funded roads. NCHRP 350-certified devices are still acceptable on non-NHS roads in most states.',
    },
  ],
  relatedProducts: [
    { label: 'Traffic Cones & Drums', path: '/category/cones-drums' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
    { label: 'Message Boards', path: '/category/message-boards' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
  ],
  relatedArticles: [
    'uniform-traffic-control-devices-mutcd-guide',
    'barricade-rental-near-me-guide',
    'arrow-board-rental-guide',
  ],
}
