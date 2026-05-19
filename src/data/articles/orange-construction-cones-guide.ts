import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "orange construction cones" (~5K/mo, High comp, $9.89 bid).
 * Definitional / what-is-X structure: explains WHY orange, what makes a
 * "construction" cone different from a parking-lot cone, and the sizing
 * rules. Bridges to the buying guide and the cones category.
 */
export const articleOrangeConstructionConesGuide: Article = {
  slug: 'orange-construction-cones-guide',
  title: 'Orange Construction Cones: What They Are, Why They\'re Orange, and Which Ones to Buy',
  excerpt:
    'Orange construction cones are not just orange-colored versions of regular cones — the fluorescent orange shade, base weight, and reflective collars are defined by federal standards. Here is what makes a cone "construction-grade" and which models to buy in 2026.',
  metaDescription:
    'Orange construction cones explained: why fluorescent orange, what MUTCD requires, sizing by speed, and which contractor-grade models actually pass inspection.',
  primaryKeyword: 'orange construction cones',
  secondaryKeywords: [
    'construction cones',
    'orange cones',
    'orange traffic cones',
    'construction cone color',
    'fluorescent orange cone',
    'construction safety cones',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-19',
  readMinutes: 6,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'An "orange construction cone" is a flexible, weighted-base, fluorescent-orange channelizing device used to mark work zones, lane closures, and roadway hazards. ',
      h('strong', null, 'The orange color is not a styling choice — it is mandated by the federal MUTCD (Manual on Uniform Traffic Control Devices)'),
      ' as the color humans see fastest against asphalt, concrete, and roadside vegetation. Below is what makes a cone genuinely construction-grade versus a cone that just happens to be orange.',
    ),

    h('h2', null, 'Why orange? The visibility science'),
    h(
      'p',
      null,
      'Fluorescent orange sits in a wavelength range (around 590–620 nm) that the human eye detects faster than almost any other color, and it has the highest contrast against the three backgrounds where road work happens most: asphalt gray, concrete white, and grass green. Studies done for the Federal Highway Administration in the 1980s established orange as the highest-detection color for work-zone applications, and the MUTCD codified it.',
    ),
    h(
      'p',
      null,
      'Fluorescent orange specifically — not regular orange. The "fluorescent" treatment means the cone re-emits absorbed UV light as additional visible orange, which boosts apparent brightness in daylight by 30–40% over plain orange paint. That\'s what gives construction cones their almost glowing appearance on a sunny day.',
    ),

    h('h2', null, 'What makes a cone "construction-grade" vs. just orange'),
    h(
      'p',
      null,
      'A cone qualifies as a construction cone (a "channelizing device" in MUTCD language) when it meets four requirements:',
    ),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'Color: '), 'Fluorescent orange, not faded or plain. Sun-faded cones must be retired.'),
      h('li', null, h('strong', null, 'Height: '), '18 inches minimum for low-speed (≤25 mph), 28 inches for most roadways, 36 inches for high-speed (≥55 mph) or any nighttime work.'),
      h('li', null, h('strong', null, 'Reflective collar: '), 'ASTM Type IV (high-intensity prismatic) sheeting. Single 4-inch band minimum; double bands (4-inch + 6-inch) required above 35 mph.'),
      h('li', null, h('strong', null, 'Base weight: '), 'Heavy enough to stay upright in the wind blast from passing vehicles. 7 lb is the practical minimum on roadways; 10–12 lb for highway work.'),
    ),
    h(
      'p',
      null,
      'Cones missing any one of those four become parking-lot cones. They can still mark a tripping hazard in a garage, but they are not legal on a public roadway under any DOT.',
    ),

    h('h2', null, 'The three sizes you will see on a construction site'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null,
            h('th', { className: 'text-left p-2 border-b' }, 'Size'),
            h('th', { className: 'text-left p-2 border-b' }, 'Where it\'s used'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical base'),
            h('th', { className: 'text-left p-2 border-b' }, 'Price each (contractor)'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '18 in'), h('td', { className: 'p-2' }, 'Parking lots, sidewalks, indoor'), h('td', { className: 'p-2' }, '3–4 lb'), h('td', { className: 'p-2' }, '$8–12')),
          h('tr', null, h('td', { className: 'p-2' }, '28 in'), h('td', { className: 'p-2' }, 'Most roadway work, ≤55 mph'), h('td', { className: 'p-2' }, '7–10 lb'), h('td', { className: 'p-2' }, '$14–22')),
          h('tr', null, h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, 'Highway, night work, ≥55 mph'), h('td', { className: 'p-2' }, '10–12 lb'), h('td', { className: 'p-2' }, '$24–38')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'The 28-inch is the workhorse — about 70% of cones in active use on Central NJ contractor jobs are 28-inch with a 10-lb base. 36-inch cones are kept for higher-speed jobs or whenever NJDOT or a municipal engineer requires them by spec.',
    ),

    h('h2', null, 'Orange vs. fluorescent pink: what the second color means'),
    h(
      'p',
      null,
      'Since the 2023 MUTCD update, fluorescent pink-orange has been authorized for ',
      h('em', null, 'incident-response'),
      ' work zones — crash scenes, emergency response, unplanned events. Construction cones stay orange. Pink cones are typically issued to fire, EMS, and state police. If you are a contractor, you should be buying orange. Pink cones used on planned construction can confuse drivers and may not be accepted by some state DOTs as substitutes.',
    ),

    h('h2', null, 'How long does a construction cone actually last?'),
    h(
      'p',
      null,
      'Three to five years of regular use is typical for a virgin-PVC contractor-grade cone. Failure modes:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Faded color.'), ' UV degrades fluorescent orange in roughly 2–4 years of full outdoor storage. Indoor or covered storage doubles the life.'),
      h('li', null, h('strong', null, 'Peeling reflective.'), ' Heat-bonded collars last 4–6 years. Adhesive-stuck collars start lifting after 12–18 months.'),
      h('li', null, h('strong', null, 'Cracked body.'), ' Recycled PVC cones crack in cold weather (below 20°F) after 2–3 winters. TPE rubber cones survive 5+ winters.'),
      h('li', null, h('strong', null, 'Damaged base.'), ' Most bases are field-replaceable. Don\'t throw away a cone with a broken base — buy replacement bases.'),
    ),
    h(
      'p',
      null,
      'Inspect cones at the start of every season. A faded or peeling cone gives drivers less warning, and your state DOT inspector will flag them on a work-zone audit.',
    ),

    h('h2', null, 'When orange cones are NOT enough'),
    h(
      'p',
      null,
      'Orange construction cones are channelizing devices. They tell drivers where to go but do not physically stop a vehicle. For situations where you need a real barrier — long-duration closures, work zones with workers on foot near live traffic, or pedestrian protection — switch to ',
      h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'water-filled barriers'),
      ' or ',
      h('a', { href: '/blog/jersey-barriers-for-sale-near-me' }, 'concrete Jersey barriers'),
      '. The MUTCD is explicit: cones are for delineation, not protection.',
    ),
    h(
      'p',
      null,
      'For mixed work zones, plan a layered approach: drums on the taper, cones along the tangent, and a barrier between the work area and traffic. Our ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' will generate the layout if you tell it the road speed and length.',
    ),

    h('h2', null, 'What to buy for a new Central NJ contractor stocking up'),
    h(
      'p',
      null,
      'If you are buying your first set, here is the realistic starter inventory for a typical NJ subcontractor doing utility, paving, or excavation work:',
    ),
    h(
      'ul',
      null,
      h('li', null, '50 × 28-inch double-collar TPE rubber cones, 10-lb base. The everyday workhorse.'),
      h('li', null, '12 × 36-inch double-collar cones, 12-lb base. For higher-speed jobs and night work.'),
      h('li', null, '6 × cone bars (4-ft, retro-reflective). Span two cones to block a pedestrian path.'),
      h('li', null, '12 × cone-mountable flashing LEDs for nighttime visibility.'),
      h('li', null, 'Cone storage rack for the back of the truck so the bases stay dry.'),
    ),
    h(
      'p',
      null,
      'For the 28-inch cones, expect to spend $1,000–1,200. The full starter kit lands around $2,000–2,500. Submit a ',
      h('a', { href: '/quote' }, 'starter-kit quote'),
      ' and we can usually deliver same-day in Central NJ. See our full ',
      h('a', { href: '/category/traffic-cones' }, 'cone selection'),
      ' for all sizes and configurations.',
    ),
  ),
  faqs: [
    {
      q: 'Why are construction cones orange and not red or yellow?',
      a: 'Fluorescent orange has the highest detection rate against asphalt, concrete, and grass — the three backgrounds where construction happens most. Federal MUTCD studies in the 1980s established it as the standard, and it has been required ever since.',
    },
    {
      q: 'Are orange construction cones the same as orange traffic cones?',
      a: 'Yes. The terms are interchangeable in everyday use. Both describe the MUTCD channelizing device used to mark work zones, lane closures, and hazards. Same cone, same standards.',
    },
    {
      q: 'Can I use orange parking-lot cones on a road?',
      a: 'No. Parking-lot cones are usually 18 inches with a lightweight base and no reflective collar — they will fail any state DOT inspection on a roadway and will blow over in passing-truck wind blast.',
    },
    {
      q: 'How many orange cones do I need to close a lane?',
      a: 'A typical short-duration lane closure on a 40-mph road needs about 25–35 cones (taper plus tangent plus downstream). For higher-speed roads, plan 50+ cones and consider mixing in drums. Our SiteMapPlanner generates exact counts.',
    },
    {
      q: 'Do orange construction cones expire?',
      a: 'They do not have a formal expiration, but most state DOTs require cones to be retired when the fluorescent color has visibly faded or the reflective collar shows peeling, cracking, or significant dirt staining. Plan for 3–5 years of use.',
    },
    {
      q: 'Are pink cones replacing orange cones?',
      a: 'No. The 2023 MUTCD update authorized fluorescent pink-orange cones for incident-response zones only (crashes, emergencies). Planned construction zones still require orange. Pink is for first responders, not contractors.',
    },
  ],
  relatedProducts: [
    { label: 'Orange Construction Cones', path: '/category/traffic-cones' },
    { label: 'Cone Lights & Beacons', path: '/category/cone-lights' },
    { label: 'Drums & Channelizers', path: '/category/drums-channelizers' },
    { label: 'Request a Cone Quote', path: '/quote' },
  ],
  relatedArticles: [
    'road-cones-for-sale-buying-guide',
    'orange-cones-explained',
    'road-cones-vs-traffic-cones',
  ],
}
