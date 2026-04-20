import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Article 3 - Targets "automated flagger assistance device" (500/mo, Low comp 27)
 * Secondary: "automated flagger device", "AFAD", "automated flagger assistance device price",
 *            "automated flagger assistance device for sale", "flagger safety equipment"
 */
export const articleAutomatedFlaggerAssistanceDeviceAfadGuide: Article = {
  slug: 'automated-flagger-assistance-device-afad-guide',
  title: 'Automated Flagger Assistance Devices (AFADs): What They Are and When to Use One',
  excerpt:
    'A technical guide to AFADs: how they work, MUTCD Section 6E.04 rules, when to use STOP/SLOW vs. Red/Yellow Lens models, and typical costs-purchase vs. daily rental.',
  metaDescription:
    'Automated Flagger Assistance Device (AFAD) guide: MUTCD rules, STOP/SLOW vs. Red/Yellow, when required, and pricing. For single-lane traffic control.',
  primaryKeyword: 'automated flagger assistance device',
  secondaryKeywords: [
    'automated flagger device',
    'AFAD',
    'automated flagger assistance device price',
    'automated flagger assistance device for sale',
    'flagger safety equipment',
  ],
  targetVolume: 500,
  datePublished: '2026-04-19',
  readMinutes: 8,
  heroImage:
    'https://vermaccom-218d5.kxcdn.com/media/product/image/image/bpcms-1210_deploye_g3_face_1000x1000_left_lane_closed_v2.png.1000x1000_q85_crop-center_upscale.png',
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'An Automated Flagger Assistance Device (AFAD) lets one trained operator stop and release traffic from a remote location without standing in the roadway. They\'re used on utility cuts, pipeline work, and emergency repairs. This guide covers how they work, when they\'re allowed, and whether to rent or buy.',
    ),
    h('h2', null, 'What is an AFAD and how does it work?'),
    h(
      'p',
      null,
      'An AFAD is a traffic control device that displays STOP on one side and SLOW (or a "prepare to stop" message) on the other. A trained flagger operates it from a remote control, allowing the operator to keep sight of both the device and approaching traffic without standing in the travel lanes. AFADs have been tested for crashworthiness under NCHRP 350 or AASHTO MASH standards and are part of MUTCD Chapter 6, Section 6E.',
    ),
    h(
      'p',
      null,
      'See the official ',
      h(
        'a',
        { href: 'https://mutcd.fhwa.dot.gov/HTM/2003r1/afad/afad_tech012705.htm', target: '_blank', rel: 'noopener noreferrer' },
        'FHWA AFAD Technical Provisions',
      ),
      ' for engineering specifications.',
    ),
    h('h2', null, 'What are the two types of AFADs?'),
    h(
      'p',
      null,
      'The MUTCD recognizes two AFAD types: STOP/SLOW AFADs and Red/Yellow Lens AFADs. STOP/SLOW displays a static STOP sign on one side and SLOW on the other. Red/Yellow Lens AFADs mimic traffic signals with red and yellow lenses. Both types are legal under MUTCD Section 6E.04, but STOP/SLOW is more common in work zones because it is more intuitive for drivers unfamiliar with red-light signals in non-intersection settings.',
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
          h('tr', null, h('th', null, 'Type'), h('th', null, 'Display'), h('th', null, 'Best For'), h('th', null, 'Driver Familiarity')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', null, 'STOP/SLOW AFAD'), h('td', null, 'STOP on one side, SLOW on the other'), h('td', null, 'Utility cuts, construction, temporary work'), h('td', null, 'Very high (drivers understand STOP)')),
          h(
            'tr',
            null,
            h('td', null, 'Red/Yellow Lens AFAD'),
            h('td', null, 'Red light (stop), yellow light (prepare to stop)'),
            h('td', null, 'Long-term alternating closures, event traffic'),
            h('td', null, 'Medium (drivers expect it at intersections, not on highways)'),
          ),
        ),
      ),
    ),
    h('h2', null, 'When can an AFAD be used?'),
    h(
      'p',
      null,
      "MUTCD Section 6E.04 limits AFADs to single-lane traffic situations-meaning only one lane of traffic approaching the device in each direction. AFADs cannot be used on multi-lane roads where traffic can move around a closed lane. They're typical on rural roads, utility cuts across a single lane, or one-way streets.",
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Single-lane two-way road'), ' - one AFAD operates traffic from both directions (Method 1: two AFADs, one at each end; or Method 2: one AFAD and one human flagger)'),
      h('li', null, h('strong', null, 'Cannot be used'), ' - on multi-lane highways, divided highways, or where traffic can bypass the work zone'),
    ),
    h('h2', null, 'What are the MUTCD Section 6E.04 operational rules for AFADs?'),
    h(
      'p',
      null,
      'Under MUTCD \\u00a76E.04, an AFAD must: (1) Be operated only by a trained flagger. (2) Never be left unattended while in use. (3) Have an unobstructed line of sight from the operator to the device and approaching traffic. (4) Be illuminated at night per Section 6E.08 (warning lights or reflective sheeting). (5) Meet crashworthiness criteria per Section 6F.01 (NCHRP 350 or MASH). (6) Be positioned where drivers have sufficient warning and a clear view of the sign.',
    ),
    h('h2', null, 'What does an AFAD cost to purchase versus rent?'),
    h(
      'p',
      null,
      'New STOP/SLOW AFADs range from $15,000 to $30,000 depending on brand (Wanco, Trafcon, National Signal) and features. Used AFADs typically cost $8,000-$15,000. Daily rental ranges from $50-$100. Weekly rental is $150-$250. Monthly rental is $400-$700. If you use an AFAD fewer than 100 days per year, rental is more economical. If you deploy them 200+ days annually, purchase becomes competitive.',
    ),
    h('h2', null, 'What training is required to operate an AFAD?'),
    h(
      'p',
      null,
      'Operators must be trained on the specific AFAD model they will use. Training typically covers: (1) Device operation (remote control, sign placement, light activation). (2) Sight lines and positioning (never leaving the device unattended, maintaining clear view of traffic). (3) MUTCD rules and job-site integration. (4) Emergency procedures (malfunction, breakdown). Training is usually 2-4 hours and often provided by the AFAD manufacturer or a rental company. Some states (e.g., Massachusetts) require certified Traffic Control Supervisors to oversee AFAD work.',
    ),
    h('h2', null, 'How do AFADs improve flagger safety?'),
    h(
      'p',
      null,
      'Flaggers standing in roadways are hit by vehicles every year. AFADs remove the flagger from traffic entirely, allowing operation from a safe position (sidewalk, shoulder, a shielded area). The operator maintains constant visibility, reducing misunderstandings. OSHA 29 CFR 1926.201 and MUTCD Part 6 require flagger PPE (high-visibility vests, hard hats, ANSI/ISEA Class 2 or 3 apparel). AFADs are one of the highest-impact interventions for reducing flagger struck-by incidents.',
    ),
    h('h2', null, 'What are common AFAD brands and where are they available?'),
    h(
      'p',
      null,
      'Major AFAD manufacturers include Wanco, Trafcon, National Signal, and Bay-Con. Rental is available through most national and regional traffic safety equipment companies. Purchase options include direct from manufacturers and distributors. Many rental companies also sell used AFADs.',
    ),
    h('h2', null, 'What maintenance does an AFAD require?'),
    h(
      'p',
      null,
      'Routine maintenance includes: (1) Checking that lamps and reflectors are clean and operational. (2) Verifying battery charge (on solar or battery-powered models). (3) Testing the remote control for signal strength. (4) Inspecting the device for physical damage or corrosion. (5) Replacing worn or failed lamps. Rental providers usually handle all maintenance. If you own an AFAD, budget $1,000-$2,000 annually for upkeep.',
    ),
  ),
  faqs: [
    {
      q: 'Can I use an AFAD on a four-lane divided highway?',
      a: 'No. MUTCD Section 6E.04 limits AFADs to single-lane traffic. On multi-lane roads, you need human flaggers, arrow boards, and proper lane tapers.',
    },
    {
      q: 'What happens if the AFAD loses power or breaks down?',
      a: 'The operator must immediately switch to manual flagging (STOP paddle) or evacuate the work zone and post advance warning signs. Never leave an AFAD unattended. Have a backup plan (additional flaggers, portable signs) in your traffic control plan.',
    },
    {
      q: 'Can I rent an AFAD for just 4 hours, or is there a minimum?',
      a: 'Most rental companies require a 1-day minimum. Some may offer 4-hour rentals at premium rates (e.g., half-day billing). Contact your provider directly about short-term needs.',
    },
    {
      q: 'Do AFADs work at night?',
      a: 'Yes, if they are properly illuminated. MUTCD Section 6E.08 requires AFADs to be lit with warning lights or have retroreflective sheeting visible to approaching traffic. Some AFADs have solar-powered LED lighting that activates at dusk.',
    },
    {
      q: 'Is flagger training for AFAD operation the same as roadside flagger training?',
      a: 'No. AFAD operators need device-specific training (operation, remote control, sign placement) in addition to general traffic control knowledge. Always require operator certification before deployment.',
    },
    {
      q: 'What is the difference between an AFAD and a temporary traffic signal?',
      a: 'A temporary traffic signal displays red, yellow, and green lights and is used at intersections. An AFAD displays STOP/SLOW (or red/yellow) and is used on non-intersection roadways for work zones. Temporary signals are much more expensive ($5,000-$15,000/month rental) and require utility coordination.',
    },
    {
      q: 'Can one operator manage two AFADs (one at each end of a work zone)?',
      a: 'Only if the operator has an unobstructed view of both devices and approaching traffic from both directions. MUTCD Section 6E.04 allows this under "Method 1" with proper sight-line verification. This is rare and risky-most setups use two operators or one AFAD plus one human flagger.',
    },
    {
      q: 'How long can an AFAD be deployed continuously?',
      a: 'AFADs can operate 24/7 if properly powered and illuminated. However, operators must rotate (no operator should work more than 4-6 continuous hours without a break) per OSHA fatigue guidelines and common sense. MUTCD does not specify operator shift limits.',
    },
  ],
  relatedProducts: [
    { label: 'Safety Vests & Hi-Vis Apparel', path: '/category/safety-vests-hi-vis' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
  ],
  relatedArticles: ['uniform-traffic-control-devices-mutcd-guide', 'portable-traffic-control-devices-guide'],
}
