import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * PILLAR ARTICLE - Targets "uniform traffic control devices" (50,000/mo, Low comp)
 * Secondary: "traffic control devices", "temporary traffic control devices", "MUTCD",
 *            "channelizing devices", "pedestrian channelizing devices"
 */
export const articleUniformTrafficControlDevicesMutcdGuide: Article = {
  slug: 'uniform-traffic-control-devices-mutcd-guide',
  title: 'What Are Uniform Traffic Control Devices? An MUTCD Field Guide',
  excerpt:
    'A comprehensive breakdown of uniform traffic control devices, MUTCD standards, and how each device category keeps work zones and traffic safe. Written for contractors and DOT crews.',
  metaDescription:
    'Uniform traffic control devices explained: MUTCD standards, device categories, barricades, signs, signals, and markings. Complete field reference for road work.',
  primaryKeyword: 'uniform traffic control devices',
  secondaryKeywords: [
    'traffic control devices',
    'temporary traffic control devices',
    'MUTCD',
    'channelizing devices',
    'pedestrian channelizing devices',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-19',
  readMinutes: 13,
  heroImage:
    'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/images/products/thumb/heavy-duty-roll-up-sign-road-work-ahead-hip-roll-up-sign-mutcd.webp',
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Uniform traffic control devices (UTCDs) are the signs, signals, markings, and physical barriers that keep drivers, pedestrians, and work crews safe in traffic. Every state and federal agency is required to use them. This guide explains what the MUTCD is, how device categories work, and when each type is required.',
    ),
    h('h2', null, 'What is the MUTCD?'),
    h(
      'p',
      null,
      'The Manual on Uniform Traffic Control Devices (MUTCD) is the national standard for all traffic control devices used on U.S. roads and highways. Published by the Federal Highway Administration (FHWA) and adopted by every state, the MUTCD sets minimum design, placement, and operational standards for signs, signals, markings, and temporary work zone devices. The 11th Edition became effective January 18, 2024, with an updated revision released in December 2025.',
    ),
    h(
      'p',
      null,
      'See the official ',
      h(
        'a',
        { href: 'https://mutcd.fhwa.dot.gov/', target: '_blank', rel: 'noopener noreferrer' },
        'FHWA MUTCD website',
      ),
      ' for the full text and technical provisions.',
    ),
    h('h2', null, 'What are the five categories of traffic control devices?'),
    h(
      'p',
      null,
      'The MUTCD organizes traffic control devices into five core categories: signs, signals, markings, channelizing devices, and temporary traffic control devices. Each category has its own chapters, specifications, and placement rules.',
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
          h('tr', null, h('th', null, 'Category'), h('th', null, 'Examples'), h('th', null, 'Purpose'), h('th', null, 'MUTCD Chapter')),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', null, 'Warning Signs'),
            h('td', null, 'Road Work Ahead, Lane Closed, Flagger Ahead'),
            h('td', null, 'Alert drivers to hazards and work zones'),
            h('td', null, '2C'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Regulatory Signs'),
            h('td', null, 'Stop, Yield, Speed limits'),
            h('td', null, 'Communicate legal requirements'),
            h('td', null, '2B'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Traffic Control Signals'),
            h('td', null, 'Red, yellow, green lights; arrow signals'),
            h('td', null, 'Control traffic flow at intersections'),
            h('td', null, '4D'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Pavement Markings'),
            h('td', null, 'Lane lines, edge lines, temporary tape'),
            h('td', null, 'Delineate lanes and work boundaries'),
            h('td', null, '3B'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Channelizing Devices'),
            h('td', null, 'Cones, drums, barricades, delineators'),
            h('td', null, 'Physically separate traffic and work areas'),
            h('td', null, '6F'),
          ),
        ),
      ),
    ),
    h('h2', null, 'What are channelizing devices and when are they required?'),
    h(
      'p',
      null,
      'Channelizing devices are physical objects placed in the roadway to guide and separate traffic. They include cones, drums, barricades, and longitudinal delineators. Every work zone taper, lane shift, or temporary closure requires them. MUTCD Chapter 6F defines specifications for spacing, height, retroreflectivity, and positioning based on traffic speed and work duration.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Traffic cones'), ' - 28" orange cones for low-speed short-term tapers. Require one per 10 linear feet at 25 mph, one per 20 feet at 45 mph.'),
      h('li', null, h('strong', null, 'Channelizing drums'), ' - larger, heavier cylinders (often 36-45 inches tall) for multi-day work zones on higher-speed roads.'),
      h('li', null, h('strong', null, 'Type I, II, III barricades'), ' - rigid barriers with reflective rails. Type III (three rails) is required on high-speed or night work.'),
      h('li', null, h('strong', null, 'Delineators and posts'), ' - edge markers for multi-lane closures and lane shifts.'),
    ),
    h('h2', null, 'What is the difference between temporary and permanent traffic control devices?'),
    h(
      'p',
      null,
      'Temporary traffic control (TTC) devices are deployed for work zones, events, and short-term traffic management, and are covered in MUTCD Chapter 6 (Work Zone devices). They must meet the same retroreflectivity and visibility standards as permanent devices, but their placement and spacing rules are tighter-there are more devices closer together because workers and drivers have less time to react.',
    ),
    h(
      'p',
      null,
      'Permanent devices (e.g., a speed limit sign on a town street) are typically in place year-round and can use different placement criteria.',
    ),
    h('h2', null, 'What are automated flagger assistance devices (AFADs)?'),
    h(
      'p',
      null,
      'An AFAD is a traffic control device that enables a flagger to stop and release traffic from a remote location without standing in the roadway. Under MUTCD Section 6E.04, AFADs come in two types: STOP/SLOW AFADs (with two sides, one showing STOP and one showing SLOW) and Red/Yellow Lens AFADs. AFADs are only allowed in single-lane traffic situations and must be operated by a trained flagger who never leaves the device unattended.',
    ),
    h(
      'p',
      null,
      'See the ',
      h(
        'a',
        { href: 'https://mutcd.fhwa.dot.gov/HTM/2003r1/afad/afad_tech012705.htm', target: '_blank', rel: 'noopener noreferrer' },
        'FHWA AFAD Technical Provisions',
      ),
      ' for crash testing and operational details.',
    ),
    h('h2', null, 'What are the retroreflectivity and visibility standards?'),
    h(
      'p',
      null,
      'MUTCD Sections 6F.02 and 6F.08 define minimum retroreflectivity (the ability to reflect light back to the source) for all temporary traffic control devices. Higher-speed roads require higher retroreflectivity: Engineer Grade (EG) is acceptable for daytime/low-speed work; High Intensity (HI) is required for night work and speeds above 45 mph. At night, all barricades and major channelizing devices must include flashing lights or lamps.',
    ),
    h('h2', null, 'What does MUTCD-compliant mean for a work zone?'),
    h(
      'p',
      null,
      'A MUTCD-compliant work zone follows the standard four-zone layout: Advance Warning Zone (500-1000 feet upstream, depending on speed), Transition Zone (taper where lanes narrow), Activity Zone (where work happens), and Termination Zone (return to normal). Each zone must have advance warning signs, proper device spacing, and appropriate channelizing based on traffic speed, lane configuration, and work duration.',
    ),
    h('h2', null, 'What is crashworthiness and why does it matter?'),
    h(
      'p',
      null,
      'Crashworthiness means a device is designed to either absorb impact without injuring occupants or deflect a vehicle safely. MUTCD work zone devices must meet either NCHRP Report 350 (legacy standard, sunset December 2019) or the newer AASHTO MASH (Manual for Assessing Safety Hardware) criteria. MASH includes updated crash testing for higher-speed vehicles and taller barriers. Always verify that barricades, arrow boards, and major devices are NCHRP 350 or MASH-compliant.',
    ),
    h(
      'p',
      null,
      'The federal handoff from NCHRP Report 350 to the newer AASHTO MASH criteria is tracked by the ',
      h(
        'a',
        { href: 'https://safety.fhwa.dot.gov/roadway_dept/countermeasures/reduce_crash_severity/', target: '_blank', rel: 'noopener noreferrer' },
        'FHWA Office of Safety roadside hardware program',
      ),
      ', which maintains the current list of federally eligible barriers, crash cushions, and end treatments for use on the National Highway System.',
    ),
    h('h2', null, 'What is the role of flaggers and flagger PPE?'),
    h(
      'p',
      null,
      'Flaggers are workers who manually direct traffic. OSHA 29 CFR 1926.201 and MUTCD Part 6 require flaggers to wear high-visibility apparel meeting ANSI/ISEA 107 Class 2 (for roads up to 50 mph) or Class 3 (above 50 mph or low visibility). Flaggers must also carry a STOP/SLOW paddle or hand signal device and be positioned where they are clearly visible. Never allow a flagger to stand in an active traffic lane without advance warning signage and sufficient buffer.',
    ),
    h(
      'p',
      null,
      'See ',
      h(
        'a',
        { href: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.201', target: '_blank', rel: 'noopener noreferrer' },
        'OSHA 1926.201',
      ),
      ' for the full requirement.',
    ),
  ),
  faqs: [
    {
      q: 'Who decides which MUTCD devices I need for my job?',
      a: 'Your state DOT, the public agency owning the roadway, or a licensed professional engineer. For private work (parking lots, driveways) some jurisdictions have less stringent requirements, but highway and public road work always requires MUTCD compliance.',
    },
    {
      q: 'Do I need a license or certification to set up a MUTCD work zone?',
      a: 'Not always. Many contractors learn by doing, but hiring a certified Traffic Control Supervisor or ordering a plan from a traffic engineer reduces liability and ensures compliance. Some states (e.g., Massachusetts, California) require specific credentials.',
    },
    {
      q: 'Can I use cones alone for a road closure?',
      a: 'Not for traffic. Cones alone are only for low-speed (under 15 mph) short-term warnings. Multi-lane closures and road closures require barricades, signs, and/or arrow boards per MUTCD.',
    },
    {
      q: 'What is the difference between Type I, II, and Type III barricades?',
      a: 'Type I has one rail, Type II has two, and Type III has three. Higher-speed and nighttime work requires Type III. Type I is adequate for daytime, low-speed, short-term work.',
    },
    {
      q: 'Do all traffic control devices have to be reflective?',
      a: 'Yes. MUTCD devices must be retroreflective (reflect light back to the source). The specific reflectivity class depends on traffic speed and time of day.',
    },
    {
      q: 'Can I replace a flagger with an AFAD to save labor?',
      a: 'Only if your job has single-lane traffic and the AFAD operator has an unobstructed view of approaching traffic. MUTCD Section 6E.04 limits AFADs to one-lane scenarios and requires trained operation.',
    },
  ],
  relatedProducts: [
    { label: 'Traffic Cones', path: '/category/cones-drums' },
    { label: 'Type III Barricades', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
    { label: 'Roll-Up Signs', path: '/category/signs-sign-stands' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
  ],
  relatedArticles: ['arrow-board-rental-guide', 'automated-flagger-assistance-device-afad-guide', 'barricade-rental-near-me-guide'],
}
