import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Article 5 - Targets "portable traffic control devices" (500/mo, Low comp 9)
 * Secondary: "portable traffic signal system", "portable traffic control lights",
 *            "portable barricade", "portable barricade system", "portable arrow board",
 *            "portable traffic cones"
 */
export const articlePortableTrafficControlDevicesGuide: Article = {
  slug: 'portable-traffic-control-devices-guide',
  title: 'Portable Traffic Control Devices: A Crew-Tested Equipment Guide',
  excerpt:
    'Portable signals, cones, rumble strips, and barricades for short-term or mobile work zones. NCHRP 350 / MASH ratings, ATSSA standards, and when to use each type.',
  metaDescription:
    'Portable traffic control devices guide: signals, cones, rumble strips, ATSSA-certified gear, MASH ratings, and when to deploy portable vs permanent.',
  primaryKeyword: 'portable traffic control devices',
  secondaryKeywords: [
    'portable traffic signal system',
    'portable traffic control lights',
    'portable barricade',
    'portable barricade system',
    'portable arrow board',
    'portable traffic cones',
  ],
  targetVolume: 500,
  datePublished: '2026-04-19',
  readMinutes: 10,
  heroImage: '/images/catalog/barricade-flasher.jpg',
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Portable traffic control devices include everything from standard cones to solar-powered signals and crash-rated portable barricades. They are built to move between sites, withstand repeated deployment, and meet MUTCD and NCHRP 350 / MASH crashworthiness standards. This guide covers the main types, when each is appropriate, and how to choose between portable and permanent solutions.',
    ),
    h('h2', null, 'What are portable traffic control devices?'),
    h(
      'p',
      null,
      'Portable traffic control devices are traffic management tools designed for repeated deployment, quick setup, and transport between job sites. They include cones, drums, barricades, portable signals, rumble strips, and portable arrow boards. Unlike permanent infrastructure (fixed signals, painted lines), portable devices can be deployed in hours and removed without leaving a trace.',
    ),
    h('h2', null, 'What is the difference between portable cones and channelizing drums?'),
    h(
      'p',
      null,
      'Cones are 28 inches tall, lightweight (7-12 pounds), and appropriate for short-term, low-speed tapers (25 mph or less). They stack easily for transport. Drums are 36-45 inches tall, heavier (20-40 pounds), and appropriate for multi-day work and faster roads (up to 45 mph). Drums are more stable in wind and provide better visibility, but they require more storage space. For mobile utility work, cones are standard. For highway multi-day work, drums are preferred.',
    ),
    h('h2', null, 'What is a portable traffic signal system and when is one used?'),
    h(
      'p',
      null,
      'A portable traffic signal system is a solar-powered or battery-powered signal head (red, yellow, green) mounted on a portable mast or trailer. They control traffic at intersections or work zones where a permanent signal is not installed. Portable signals are ATSSA-certified (American Traffic Safety Services Association) and meet MUTCD Chapter 4 specifications. They are used for: (1) short-term lane closures at intersections, (2) multi-way stop replacements, (3) event traffic control. Cost is high: $3,000-$8,000/month rental. Use them only when flaggers or simpler devices won\'t work.',
    ),
    h(
      'p',
      null,
      'See the ',
      h(
        'a',
        { href: 'https://www.atssa.com/', target: '_blank', rel: 'noopener noreferrer' },
        'ATSSA standards',
      ),
      ' for certification details.',
    ),
    h('h2', null, 'What are rumble strips and portable rumble strips?'),
    h(
      'p',
      null,
      'Rumble strips are ridged or toothed devices placed in the roadway that vibrate and produce noise when driven over, alerting drivers to hazards or transitions. Permanent rumble strips are milled into pavement; portable rumble strips are self-contained rubber or plastic units that can be placed and removed. Portable rumble strips are used at work zone tapers, merge points, and lane transition areas. They enhance awareness of lane changes without blocking traffic.',
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
            h('th', null, 'Device Type'),
            h('th', null, 'Setup Time'),
            h('th', null, 'Speed Range'),
            h('th', null, 'Durability'),
            h('th', null, 'Best Use Case'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', null, 'Cones (28")'), h('td', null, '5-10 min'), h('td', null, 'Up to 25 mph'), h('td', null, 'Medium'), h('td', null, 'Short-term, low-speed')),
          h('tr', null, h('td', null, 'Drums (36-45")'), h('td', null, '10-15 min'), h('td', null, 'Up to 45 mph'), h('td', null, 'High'), h('td', null, 'Multi-day, moderate speed')),
          h('tr', null, h('td', null, 'Portable barricades (Type I/II/III)'), h('td', null, '10-20 min'), h('td', null, 'Up to 55+ mph'), h('td', null, 'Very high'), h('td', null, 'Closures, high-speed')),
          h('tr', null, h('td', null, 'Portable signal'), h('td', null, '30-60 min'), h('td', null, 'All'), h('td', null, 'High'), h('td', null, 'Intersection control, multi-way stops')),
          h('tr', null, h('td', null, 'Portable rumble strip'), h('td', null, '5-10 min'), h('td', null, 'All'), h('td', null, 'Medium'), h('td', null, 'Transition warning, merge awareness')),
        ),
      ),
    ),
    h('h2', null, 'What does NCHRP 350 / MASH certification mean for portable devices?'),
    h(
      'p',
      null,
      'NCHRP 350 (now superseded by AASHTO MASH) is a crash testing standard that evaluates how traffic control devices behave when struck by vehicles. Devices are tested at multiple impact speeds and angles. A device must absorb or deflect the impact without injuring occupants or causing secondary crashes. All portable barricades, drums, and signal supports sold for roadway use should carry NCHRP 350 or MASH certification. If a product does not claim certification, ask why and avoid it for high-speed or multi-lane work.',
    ),
    h(
      'p',
      null,
      'The crash-test criteria every manufacturer is measured against are published by AASHTO in MASH and by the ',
      h(
        'a',
        { href: 'https://safety.fhwa.dot.gov/roadway_dept/countermeasures/reduce_crash_severity/', target: '_blank', rel: 'noopener noreferrer' },
        'FHWA Office of Safety roadside hardware program',
      ),
      ', which is the reference state DOTs and federal-aid inspectors check before approving a device.',
    ),
    h('h2', null, 'When should I use portable devices instead of permanent solutions?'),
    h(
      'p',
      null,
      'Use portable devices when: (1) The work is temporary (days or weeks, not months). (2) You move between multiple sites (a utility crew covering a service area). (3) The site is not your property (you cannot install permanent infrastructure). (4) The job scope is uncertain and may change. Use permanent devices (fixed signals, painted lines, installed bollards) when: (1) The closure is permanent or semi-permanent (6+ months). (2) The location is stable and public-facing. (3) You want to eliminate ongoing setup labor. (4) The site is owned or operated by a public agency with long-term responsibility.',
    ),
    h('h2', null, 'What is ATSSA certification and why does it matter?'),
    h(
      'p',
      null,
      'ATSSA (American Traffic Safety Services Association) certifies traffic safety equipment manufacturers and workers against industry standards. ATSSA certification means a product or service has been independently verified to meet safety and performance requirements. For portable signals, temporary traffic control devices, and professional traffic management, ATSSA certification is a quality marker. Look for it when renting or purchasing.',
    ),
    h('h2', null, 'How do I transport portable traffic control devices?'),
    h(
      'p',
      null,
      'Cones stack in crates or bins (50-100 per crate). Drums require individual storage or rack systems. Portable barricades should be stored flat or upright in a secure rack. Portable signal heads are mounted on trailers or in protective cases. Most rental companies handle transport and delivery. If you own devices, budget space for secure, weather-protected storage (a storage unit or covered yard area).',
    ),
    h('h2', null, 'What is the cost difference between renting and buying portable devices?'),
    h(
      'p',
      null,
      'Cones: $0.50-$1.50/day rental vs. $30-$60 purchase per cone. For 100 cones and 50 days/year, renting ($2,500-$7,500/year) is cheaper. Drums: $5-$10/day rental vs. $200-$400 purchase. Portable barricades: $10-$20/day rental vs. $800-$1,500 purchase. Portable signals: $150-$300/day rental vs. $8,000-$15,000 purchase. If you use devices fewer than 100 days per year, rent. If you use them 200+ days, purchase becomes economical.',
    ),
  ),
  faqs: [
    {
      q: 'Can I use homemade or non-standard portable devices on a public road?',
      a: 'No. All traffic control devices on public roads must be MUTCD-compliant. Non-standard devices, even if homemade, are illegal and create liability. Always use certified equipment.',
    },
    {
      q: 'Are portable traffic signals (temporary signals) the same as permanent signals?',
      a: 'No. Portable signals are smaller, solar-powered or battery-powered, and designed for temporary deployment. Permanent signals are larger, AC-powered, and wired into traffic management systems. They serve the same function but are designed for different deployment timelines.',
    },
    {
      q: 'Do portable cones and drums expire or have a shelf life?',
      a: 'Cones and drums last 3-7 years with normal use. UV exposure and weather degrade plastic over time, but plastic is recyclable. If a cone develops cracks or loses retroreflectivity, retire it and replace it. Rental companies rotate stock regularly.',
    },
    {
      q: 'What happens if wind blows over a portable cone or drum?',
      a: 'Cones are light and can blow over in high wind (30+ mph). Drums are heavier and more stable. If wind is forecast, use heavier devices or weight them down with sandbags or water weights. Never rely on cones alone in windy conditions.',
    },
    {
      q: 'Can I use a portable barricade as a permanent one if I leave it in place?',
      a: 'Technically, yes, but it\'s not ideal. Portable barricades are designed for repeated setup/removal and may degrade faster with permanent exposure. If you need a permanent barrier, install one. Portable devices are meant to be portable.',
    },
    {
      q: 'Do portable signals require a traffic engineer to install?',
      a: 'Installation depends on local jurisdiction. Some areas require a licensed engineer or Traffic Control Supervisor to oversee setup and programming. Check with your local DOT. Operation requires ATSSA-certified training.',
    },
    {
      q: 'What maintenance do portable cones and drums need?',
      a: 'Clean them regularly to maintain retroreflectivity (reflectivity decreases with dirt accumulation). Inspect for cracks, missing reflectors, or fading. Replace any damaged devices. Rental companies handle maintenance; if you own devices, budget 10-15% of fleet annually for replacement.',
    },
    {
      q: 'Can portable rumble strips be used on any road surface?',
      a: 'Rumble strips work best on paved surfaces. On gravel, dirt, or poor pavement, they may not seat properly or may shift. Always verify compatibility with your road surface before deployment.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
    { label: 'Message Boards', path: '/category/message-boards' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
  ],
  relatedArticles: ['uniform-traffic-control-devices-mutcd-guide', 'automated-flagger-assistance-device-afad-guide'],
}
