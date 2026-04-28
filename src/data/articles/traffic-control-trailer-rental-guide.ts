import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Article 11 — Targets "traffic control trailer" (500/mo, CI=35, Medium, score=14.3)
 * Secondary: "arrow board trailer", "trailer mounted message board",
 *            "trailer mounted traffic signal", "AFAD trailer",
 *            "attenuator trailer", "TMA trailer", "light tower trailer rental",
 *            "portable changeable message sign trailer"
 */
export const articleTrafficControlTrailerRentalGuide: Article = {
  slug: 'traffic-control-trailer-rental-guide',
  title: 'Traffic Control Trailers: Arrow Boards, PCMS, AFADs, and TMAs Compared',
  excerpt:
    'A field-level breakdown of the five trailer-mounted devices that show up on most work zones — what each does, what MUTCD Part 6 requires, and how to pick the right rental.',
  metaDescription:
    'Traffic control trailer rental guide: arrow board, PCMS, AFAD, TMA, and light tower trailers compared. MUTCD requirements, sizing rules, and 2026 rental rates.',
  primaryKeyword: 'traffic control trailer',
  secondaryKeywords: [
    'arrow board trailer',
    'trailer mounted message board',
    'trailer mounted traffic signal',
    'AFAD trailer',
    'attenuator trailer',
    'TMA trailer',
    'light tower trailer rental',
    'portable changeable message sign trailer',
  ],
  targetVolume: 500,
  datePublished: '2026-04-26',
  dateModified: '2026-04-28',
  readMinutes: 9,
  body: h(
    Fragment,
    null,

    h(
      'p',
      { className: 'lead' },
      'A traffic control trailer is any towable, self-contained work-zone device that mounts a regulated traffic-control function — directional arrows, motorist messages, automated flagging, attenuator impact protection, or area lighting — onto a road-legal chassis with its own power source. The five trailer types most contractors actually rent are arrow boards, portable changeable message signs (PCMS), automated flagger assistance devices (AFADs), truck or trailer mounted attenuators (TMAs), and light towers. Each one solves a specific MUTCD Part 6 problem; getting the wrong type on site means a failed DOT review, not just an inconvenient swap.',
    ),

    h('h2', null, 'What is a traffic control trailer used for?'),
    h(
      'p',
      null,
      'Trailer-mounted devices exist because most work-zone control functions need height, visibility, or power that ground-set channelizers cannot provide. An arrow panel needs to be visible from a half mile back at highway speed. A message board needs solar or battery power to run a 24-hour duty cycle. An AFAD needs a hardened mounting structure to survive being parked roadside for a week. A TMA needs mass and a crash cushion. Trailers are how you put each of those functions in the work zone without permanent installation.',
    ),
    h(
      'p',
      null,
      'The contractor question is rarely "do I need a trailer" — it is "which trailer, how many, and for how long." Picking wrong is expensive in two ways: you pay rental on equipment you do not need, and you fail inspection on the equipment you should have rented instead.',
    ),

    h('h2', null, 'What are the five main types of traffic control trailers?'),
    h(
      'p',
      null,
      'Most rental fleets organize trailer-mounted equipment into five families. Each one corresponds to a distinct MUTCD device class and a distinct moment in a typical work zone — the advance warning area, the transition, the activity area, or the termination area.',
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
            h('th', null, 'Trailer Type'),
            h('th', null, 'Primary Function'),
            h('th', null, 'MUTCD Reference'),
            h('th', null, 'Where It Sits in the Zone'),
            h('th', null, 'Typical Power'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', null, 'Arrow Board (Type A/B/C)'),
            h('td', null, 'Lane shift / lane closure indication'),
            h('td', null, '§6F.61, §6L.06'),
            h('td', null, 'Upstream of taper'),
            h('td', null, 'Solar + battery'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Portable Changeable Message Sign (PCMS)'),
            h('td', null, 'Custom motorist messages, advance warning'),
            h('td', null, '§6F.60'),
            h('td', null, 'Advance warning area'),
            h('td', null, 'Solar + battery'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Automated Flagger Assistance Device (AFAD)'),
            h('td', null, 'Remote-controlled STOP/SLOW or red/yellow signal'),
            h('td', null, '§6E.04'),
            h('td', null, 'Single-lane closure ends'),
            h('td', null, 'Battery, generator backup'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Truck/Trailer Mounted Attenuator (TMA)'),
            h('td', null, 'Crash cushion for shadow vehicle'),
            h('td', null, 'NCHRP 350 / MASH TL-2 or TL-3'),
            h('td', null, 'Activity area / mobile ops'),
            h('td', null, 'Towed or truck-mounted, no power'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Light Tower Trailer'),
            h('td', null, 'Area illumination for night work'),
            h('td', null, 'OSHA 1926.56 (illumination)'),
            h('td', null, 'Activity area'),
            h('td', null, 'Diesel generator or hybrid'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'These are not interchangeable. An arrow board cannot replace a PCMS — the federal standard limits arrow boards to four approved displays (right arrow, left arrow, four-corner caution, sequential chevron). A PCMS cannot replace an AFAD because it cannot stop traffic. A TMA does not warn anyone; it is structural. The right rental package usually includes two or three trailer types working together, not one trailer doing several jobs.',
    ),

    h('h2', null, 'What MUTCD and federal standards apply to traffic control trailers?'),
    h(
      'p',
      null,
      'Trailer-mounted devices fall under MUTCD Part 6 (Temporary Traffic Control). Arrow boards are governed by §6F.61 (specifications) and §6L.06 (mandatory use criteria — required on any closure of one lane on a multi-lane highway with operating speed above 45 mph). PCMS layout, character height, and message length are set in §6F.60. AFADs operate under §6E.04, which restricts them to single-lane two-way closures and requires a trained flagger to hold the remote control. TMAs are not an MUTCD device class but are required by most state DOT specifications for shadow vehicles in mobile and short-duration work on high-speed roads.',
    ),
    h(
      'p',
      null,
      'Crashworthiness for any device that can be struck by traffic — including TMAs and the trailers carrying arrow boards or PCMS placed inside the clear zone — is governed by AASHTO\'s Manual for Assessing Safety Hardware (MASH). The federal eligibility list is maintained by the ',
      h(
        'a',
        {
          href: 'https://highways.dot.gov/safety/other/roadside-departure/roadside-hardware',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        'FHWA Office of Safety roadside hardware program',
      ),
      ', and most state DOT contracts require equipment from that list. Confirm the test level (TL-2 for ≤45 mph, TL-3 for highway speeds) before signing the rental agreement.',
    ),
    h(
      'p',
      null,
      'OSHA 1926.201 covers flagger and signaling responsibilities — relevant when an AFAD trailer is paired with a flagger holding the remote — and 1926.56 sets minimum illumination levels (5 foot-candles for general work, 10 for excavation) that drive light tower sizing.',
    ),

    h('h2', null, 'How do I choose the right traffic control trailer?'),
    h(
      'p',
      null,
      'Three variables drive the choice: the operation class (mobile, short-duration, short-term, intermediate-term, long-term per MUTCD §6G.02), the road speed, and the lane configuration. A short-duration utility patch on a 35 mph road might need only a single arrow board trailer and a TMA. A multi-day overnight resurfacing on a 65 mph divided highway will pair an arrow board with a PCMS for advance warning, plus a TMA for the work-zone shadow vehicle and a light tower for the activity area.',
    ),
    h(
      'p',
      null,
      'A useful rule for sizing: every additional 10 mph of operating speed roughly doubles the advance warning distance you need, which in turn pushes you from a Type B arrow board to a Type C (the 96" × 48" highway-class panel with 15 lamps), and from a single PCMS to a paired PCMS deployment so motorists see two reinforcing messages before reaching the taper. State DOT temporary traffic control plans almost always specify minimums by speed class — pull the plan first, then size the rental.',
    ),

    h('h2', null, 'How much does it cost to rent a traffic control trailer?'),
    h(
      'p',
      null,
      'Rental rates in 2026 vary by trailer type, duration, and local market, but typical ranges look like this. Arrow board trailers run $75–$150/day or $300–$600/week. PCMS trailers run $125–$250/day or $500–$1,200/week — the wider range reflects character count and full-matrix vs. flip-disc displays. AFAD trailers (pair) run $400–$700/day or $1,500–$2,500/week because they almost always rent in matched sets. TMA trailers run $250–$450/day or $1,000–$1,800/week and often include the host vehicle. Light tower trailers run $80–$150/day or $300–$600/week.',
    ),
    h(
      'p',
      null,
      'Beyond the daily rate, the cost drivers worth asking about up front are delivery and pickup mileage, fuel for diesel light towers, generator service intervals on long-duration deployments, and damage waivers — a TMA cushion replacement after an actual hit is a five-figure event, and the rental contract will specify who pays.',
    ),

    h('h2', null, 'Can one trailer cover multiple functions?'),
    h(
      'p',
      null,
      'Combination trailers exist — most commonly a PCMS with an integrated arrow board, or a light tower with an integrated PCMS face — but they trade flexibility for footprint. A combo PCMS/arrow trailer cannot be in two places at once, and most work zones need the arrow at the taper and the PCMS in the advance warning area, which on a highway is half a mile apart. Combo units shine on small short-duration jobs where the warning and the lane-shift instruction can be delivered from the same point. For multi-day or multi-lane work, separate single-function trailers almost always perform better and cost the same or less to rent.',
    ),

    h('h2', null, 'How do I rent traffic control trailers?'),
    h(
      'p',
      null,
      'Submit a quote request that includes operation class (per MUTCD §6G.02), road speed, lane configuration, expected duration, delivery address, and any state DOT plan number. The rental coordinator can match the right trailer types and quantities to those parameters and confirm MASH eligibility for state-funded jobs. For arrow boards and PCMS, lead time is usually 24–48 hours; AFADs and TMAs run 2–5 business days because the fleet is smaller and units are often deployed. Plan accordingly on multi-trailer packages — the long-lead item sets the schedule.',
    ),

    h(
      'p',
      null,
      h('a', { href: '/quote', className: 'cta-inline' }, 'Request a traffic control trailer quote'),
      ' — list the trailer types and dates, and we will confirm availability and pricing within the hour.',
    ),
  ),

  faqs: [
    {
      q: 'Is an arrow board the same as a traffic control trailer?',
      a: 'An arrow board is one type of traffic control trailer. The category also includes portable changeable message signs (PCMS), automated flagger assistance devices (AFADs), truck/trailer mounted attenuators (TMAs), and light towers. Each one performs a different MUTCD Part 6 function and is not interchangeable with the others.',
    },
    {
      q: 'When is a traffic control trailer required by MUTCD?',
      a: 'Arrow boards are mandatory under §6L.06 for any single-lane closure on a multi-lane highway with operating speed above 45 mph. PCMS, AFADs, and light towers are not mandatory by name but are required indirectly when the state DOT temporary traffic control plan calls for advance warning, single-lane two-way control, or night-work illumination.',
    },
    {
      q: 'Do traffic control trailers need to be MASH crash-tested?',
      a: 'TMAs must be MASH-eligible at the appropriate test level (TL-2 for ≤45 mph, TL-3 for highway speeds). Arrow boards, PCMS, and AFAD trailers are not crash-tested as a unit, but the support hardware and any breakaway components that fall inside the clear zone are subject to MASH evaluation under the FHWA roadside hardware acceptance process.',
    },
    {
      q: 'Can I tow a traffic control trailer behind a pickup?',
      a: 'Most arrow board, PCMS, AFAD, and light tower trailers fall under 5,000 lb GVWR and are towable with a Class III (2") receiver hitch on a half-ton or larger pickup. TMAs are heavier (8,000–15,000 lb) and typically require a Class IV or V hitch and a 3/4-ton or larger truck. Confirm tongue weight and brake controller requirements with the rental company before pickup.',
    },
    {
      q: 'How much advance notice do I need to rent a traffic control trailer?',
      a: 'Arrow boards and PCMS typically have 24–48 hour lead times in major metros. AFADs and TMAs run 2–5 business days because the fleet is smaller and turnover is slower. Multi-trailer packages for highway-class work should be scheduled at least a week ahead, especially in peak paving season (April–October).',
    },
    {
      q: 'What is the difference between a TMA and a TMA trailer?',
      a: 'A TMA can be mounted directly on a truck chassis or pulled as a trailer. Truck-mounted TMAs are common on shadow vehicles in mobile operations because the cushion stays attached. Trailer-mounted TMAs let a contractor add crash protection to a vehicle that does not have a TMA mount, at the cost of one additional towed unit on site.',
    },
    {
      q: 'Do PCMS trailers come with pre-loaded message libraries?',
      a: 'Yes — most rental PCMS units arrive with NTCIP-compliant message libraries that include common phrases ("ROAD WORK AHEAD", "RIGHT LANE CLOSED", "FLAGGER AHEAD", "REDUCED SPEED"). Custom messages can be programmed on site through the controller or remotely via cellular link. MUTCD §6F.60 limits messages to two phases, three lines per phase, and 8-character lines for full-matrix displays.',
    },
    {
      q: 'How long can a solar-powered traffic control trailer run unattended?',
      a: 'Solar-powered arrow boards and PCMS are designed for continuous unattended operation when sized correctly. Modern units carry 200–400 Ah battery banks and 200–400 W of panels, which supports 24/7 operation in most US latitudes year-round. Winter deployments above 40° latitude can run short on overcast weeks — pair with a generator backup if the work zone cannot tolerate a dark sign.',
    },
  ],

  relatedProducts: [
    { label: 'Trailer-Mounted Arrow Board (15-Lamp Type C)', path: '/product/trailer-mounted-arrow-board-15' },
    { label: 'Portable Changeable Message Sign Trailer', path: '/product/portable-changeable-message-sign-trailer' },
    { label: 'Automated Flagger Assistance Device Trailer', path: '/product/automated-flagger-trailer' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
    { label: 'Message Boards', path: '/category/message-boards' },
  ],

  relatedArticles: [
    'arrow-board-rental-guide',
    'automated-flagger-assistance-device-afad-guide',
    'traffic-control-equipment-rental',
    'traffic-control-rental-guide',
  ],
}
