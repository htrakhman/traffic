import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Article 7 — Targets "traffic control equipment rental" (500/mo, Low comp 19, score 26.3)
 * Secondary: "traffic control equipment", "traffic safety equipment rental",
 *            "traffic safety rental", "traffic control equipment near me",
 *            "temporary traffic control devices", "traffic control equipment suppliers"
 */
export const articleTrafficControlEquipmentRental: Article = {
  slug: 'traffic-control-equipment-rental',
  title: "Traffic Control Equipment Rental: A Contractor's Field Checklist",
  excerpt:
    'What each type of traffic control device does, where MUTCD Part 6 requires it, and how to assemble a compliant kit for road work, utility cuts, and lane closures.',
  metaDescription:
    'Traffic control equipment rental guide: cones, barricades, arrow boards, signs, and PCMS. MUTCD requirements, daily/weekly rates, and how to size your kit. Get a quote.',
  primaryKeyword: 'traffic control equipment rental',
  secondaryKeywords: [
    'traffic control equipment',
    'traffic safety equipment rental',
    'traffic safety rental',
    'traffic control equipment near me',
    'temporary traffic control devices',
    'traffic control equipment suppliers',
  ],
  targetVolume: 500,
  datePublished: '2026-04-20',
  readMinutes: 10,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Traffic control equipment rental puts MUTCD-compliant devices on your job site without the capital outlay of ownership — no storage costs, no sheeting replacement cycles, no fleet maintenance. This guide breaks down the five major equipment categories, when each is required under MUTCD Part 6, how to size a package by road speed and job duration, and what daily and weekly rates look like in 2026.',
    ),

    h('h2', null, 'What does traffic control equipment include?'),
    h(
      'p',
      null,
      'MUTCD Part 6 organizes work zone devices into categories based on function. The five most commonly rented are:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Channelizing devices'),
        ' — cones (28–36 in.), drums (36–45 in.), delineators, and tubular markers. These form the taper, buffer, and activity-zone edges. Drums are preferred over cones above 45 mph.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Signing and sign stands'),
        ' — roll-up and rigid aluminum panels (Road Work Ahead, Lane Ends, Flagger Ahead, speed plaques) on adjustable stands. Most contractors need six to twelve signs per lane-closure package.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Barricades and barriers'),
        ' — Type I (one reflective rail) for low-speed edges, Type II (two rails) for intermediate hazards, Type III (three rails) for road closures and high-speed work. Water-filled barriers are a separate class used where vehicle containment is needed.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Arrow boards and warning trailers'),
        ' — trailer-mounted Type C (48 × 96 in. minimum) or truck-mounted Type B/C panels. Required on any stationary lane closure on a multi-lane roadway above 45 mph and on all mobile operations.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Portable changeable message signs (PCMS)'),
        ' — three-line LED boards on solar-charged trailer frames. Used for advance notice 24–72 hours before a closure begins and for multi-week operations.',
      ),
    ),

    h('h2', null, 'What equipment does my specific job require?'),
    h(
      'p',
      null,
      'The answer comes from three job parameters: posted speed limit, number of lanes being closed, and how long the work lasts. A one-day utility cut on a residential street needs cones, two advance warning signs, and a flagger paddle. A week-long lane closure on a divided highway needs advance warning signs at 500, 1,000, and 1,500 feet, a drum taper, a trailer-mounted arrow board, and a shadow vehicle.',
    ),
    h('p', null, 'Use this table as a starting point, then adjust for local DOT requirements:'),
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
            h('th', null, 'Scenario'),
            h('th', null, 'Channelizers'),
            h('th', null, 'Signing'),
            h('th', null, 'Barrier/Barricade'),
            h('th', null, 'Arrow Board'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', null, 'Residential street ≤25 mph, 1 lane, <1 day'),
            h('td', null, '12–20 cones'),
            h('td', null, '2–3 roll-up signs'),
            h('td', null, 'Not required'),
            h('td', null, 'Not required'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Urban arterial 25–45 mph, 1 lane, multi-day'),
            h('td', null, '20–40 cones or drums'),
            h('td', null, '4–6 signs + plaques'),
            h('td', null, 'Type II barricades at ends'),
            h('td', null, 'Recommended'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Highway 45–65 mph, 1 lane, stationary'),
            h('td', null, '40–80 drums'),
            h('td', null, '6–10 signs'),
            h('td', null, 'Type III at closure, water barrier optional'),
            h('td', null, 'Required (Type C)'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Event or pedestrian diversion'),
            h('td', null, 'Pedestrian barricades, delineators'),
            h('td', null, '2–4 signs'),
            h('td', null, 'Type I barricades'),
            h('td', null, 'Not required'),
          ),
        ),
      ),
    ),

    h('h2', null, 'What standards govern work zone traffic control equipment?'),
    h(
      'p',
      null,
      'Federal requirements come from two documents. ',
      h(
        'a',
        { href: 'https://mutcd.fhwa.dot.gov/htm/2009r1r2/part6/part6intro.htm', target: '_blank', rel: 'noopener noreferrer' },
        'MUTCD Part 6',
      ),
      ', published by FHWA, sets device dimensions, reflective sheeting grades, placement rules, and taper formulas for all temporary traffic control zones on federally funded roadways. OSHA 29 CFR 1926.201(a) requires that all highway-adjacent construction work conform to MUTCD. Most state DOTs adopt MUTCD by reference with state-specific supplements; California (Caltrans), Texas (TxDOT), and Massachusetts (MassDOT) publish their own qualified products lists (QPLs) that approved rental gear must appear on.',
    ),
    h(
      'p',
      null,
      "Crashworthiness is the other compliance dimension. Channelizing devices on the National Highway System must meet NCHRP 350 or its successor MASH (Manual for Assessing Safety Hardware) impact-attenuation criteria. When you rent from a reputable provider, the equipment's test level and approval number should be available on request — this matters if your project is federally funded or state-inspected.",
    ),

    h('h2', null, 'Typical traffic control equipment rental rates in 2026'),
    h(
      'p',
      null,
      'Rates vary by region, fleet availability, and rental term. The figures below reflect mid-market pricing for most of the continental U.S.; large metro markets and remote deliveries will run higher.',
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
          h('tr', null, h('th', null, 'Equipment'), h('th', null, 'Daily'), h('th', null, 'Weekly'), h('th', null, 'Monthly')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', null, '28" traffic cone'), h('td', null, '$1–$2'), h('td', null, '$4–$7'), h('td', null, '$10–$18')),
          h('tr', null, h('td', null, 'Channelizing drum (36–45")'), h('td', null, '$3–$6'), h('td', null, '$12–$20'), h('td', null, '$30–$50')),
          h('tr', null, h('td', null, 'Roll-up sign + stand'), h('td', null, '$8–$15'), h('td', null, '$25–$45'), h('td', null, '$70–$110')),
          h('tr', null, h('td', null, 'Type II barricade'), h('td', null, '$8–$14'), h('td', null, '$25–$50'), h('td', null, '$70–$130')),
          h('tr', null, h('td', null, 'Type III barricade (8 ft)'), h('td', null, '$12–$20'), h('td', null, '$40–$65'), h('td', null, '$110–$175')),
          h('tr', null, h('td', null, 'Water-filled barrier (per 6 ft section)'), h('td', null, '$4–$8'), h('td', null, '$15–$25'), h('td', null, '$40–$65')),
          h('tr', null, h('td', null, 'Trailer arrow board (Type C)'), h('td', null, '$75–$125'), h('td', null, '$250–$400'), h('td', null, '$650–$950')),
          h('tr', null, h('td', null, 'Truck-mounted arrow board (Type B)'), h('td', null, '$50–$90'), h('td', null, '$175–$300'), h('td', null, '$500–$750')),
          h('tr', null, h('td', null, 'PCMS / portable message board'), h('td', null, '$125–$200'), h('td', null, '$450–$700'), h('td', null, '$1,200–$1,800')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Delivery and pickup are billed separately, typically $150–$400 round-trip within 30 miles. Emergency or after-hours drops add $200–$500 depending on distance and time. Ask whether setup and breakdown are included; for multi-day jobs, crew-assisted setup is often worth the cost when it keeps your own workers on productive tasks.',
    ),

    h('h2', null, 'How long before renting stops making sense?'),
    h(
      'p',
      null,
      'The break-even for ownership vs. rental on a trailer-mounted arrow board is roughly 90–120 field days per year. Below that threshold, rental beats ownership once you factor in storage, annual DOT lamp inspections, battery maintenance, and loading labor. For most utility, paving, and general contractors running seasonal traffic control work, renting equipment for every job is the right call. The exceptions are high-use commodity items: if you run 200+ cones daily across a dozen active projects, buying a cone inventory pays off quickly.',
    ),
    h(
      'p',
      null,
      'Message boards and AFADs (automated flagger assistance devices) almost always make more sense as rentals. Their purchase price is high ($8,000–$30,000), utilization is sporadic, and maintenance is specialized. Renting also keeps you current on the equipment without capital write-downs.',
    ),

    h('h2', null, 'How to vet a traffic control equipment rental supplier'),
    h(
      'p',
      null,
      'Fleet size, compliance, and response time matter more than proximity. Before committing to a provider, ask: (1) Are your channelizing devices and barriers NCHRP 350 or MASH certified? (2) Is your arrow board fleet on the FHWA-approved products list? (3) What is your emergency delivery window? A provider that can answer all three clearly — and produce documentation on request — is the right choice for any job where a state inspector may walk the zone.',
    ),
    h(
      'p',
      null,
      'Also confirm reflective sheeting grade. Engineer-grade (EG) sheeting is the MUTCD minimum, but high-intensity prismatic (HIP) or diamond grade is required by many state DOTs on freeways and at night. A rental provider that can specify sheeting grade on the quote is showing you they understand compliance — one that cannot should give you pause.',
    ),
  ),
  faqs: [
    {
      q: 'What is the minimum traffic control equipment needed for a road work zone?',
      a: 'The MUTCD minimum for any work zone includes advance warning signs (at least two in urban areas, three in rural/highway), a transition taper of channelizing devices, and an activity-zone boundary. Any lane closure on a multi-lane roadway above 45 mph also requires an arrow board.',
    },
    {
      q: 'Do I need an arrow board for a one-lane road closure?',
      a: 'MUTCD recommends arrow boards for lane closures on multilane roadways at all speeds and requires them above 45 mph. On a single-lane two-way road with flagging, an arrow board is not required but improves driver compliance. Check your state DOT supplement for local requirements.',
    },
    {
      q: 'How far in advance do advance warning signs need to be placed?',
      a: 'MUTCD Table 6C-1 sets advance warning distances by posted speed: 350 ft at 25 mph, 500 ft at 35 mph, 1,000 ft at 45 mph, and 1,500 ft at 55–65 mph. Multiple signs are spaced at these distances from the work area.',
    },
    {
      q: 'Can I mix rented and owned traffic control equipment?',
      a: 'Yes — mixing is common. Many contractors own cones but rent arrow boards and message boards. The only rule is that all devices in the work zone must meet MUTCD specifications. Rented gear typically comes with sheeting grade certification; if you are mixing in owned items, verify those meet the same or better standard.',
    },
    {
      q: 'What is the difference between Type B and Type C arrow boards?',
      a: 'Type B boards are smaller (48 × 24 in. minimum, 15 lamps), mounted to the rear of a vehicle, and suited for mobile operations like pothole patching or sweeping. Type C boards are larger (48 × 96 in. minimum, 15 lamps minimum), trailer-mounted, and used for stationary lane closures where the board will stay in place for the duration of work.',
    },
    {
      q: 'How much notice does a traffic control equipment rental company need?',
      a: 'Standard lead time is next-business-day within 30–50 miles of the depot. For large packages (40+ drums, multiple signs, arrow board), two business days is safer. Emergency same-day delivery is available from most full-service providers for a surcharge. Book early for holiday weekends and high-season months (May–October).',
    },
    {
      q: 'Are rental rates negotiable for long-term or large-volume jobs?',
      a: 'Yes. Monthly rental terms are 20–40% cheaper per day than daily rates, and most providers will negotiate package discounts for large orders or repeat business. Multi-week paving or utility jobs should ask for a standing monthly rate and a dedicated account contact rather than booking day-by-day.',
    },
    {
      q: 'What happens if rented equipment is lost or damaged on the job?',
      a: 'Rental contracts include a replacement cost schedule. Damage is typically billed at 25–50% of list price; total loss at 60–100%. Photograph all devices at delivery and return. For high-traffic night work where device loss is common, ask the provider about a damage waiver add-on.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
    { label: 'Portable Message Boards', path: '/category/message-boards' },
    { label: 'Hi-Way Safety M90 Arrow Board Trailer', path: '/product/trailer-mounted-arrow-board-15' },
  ],
  relatedArticles: [
    'traffic-control-rental-guide',
    'arrow-board-rental-guide',
    'barricade-rental-near-me-guide',
    'portable-traffic-control-devices-guide',
  ],
}
