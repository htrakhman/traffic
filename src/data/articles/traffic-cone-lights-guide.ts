import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic cone lights" (~500/mo, High comp, $13.54 bid).
 * Secondary: cone lights, barricade light, LED traffic cone lights, flashing cone lights.
 * FAQ-heavy AEO structure with direct-answer lede and 8+ Q/A pairs.
 */
export const articleTrafficConeLightsGuide: Article = {
  slug: 'traffic-cone-lights-guide',
  title: 'Traffic Cone Lights: MUTCD Types, Battery Life, and What to Buy',
  excerpt:
    'Traffic cone lights add nighttime visibility to standard cones and barricades. MUTCD §6F.83 splits them into Type A flashing, Type B high-intensity flashing, and Type C steady-burn — each with a specific job. Quick-answer guide below.',
  metaDescription:
    'Traffic cone lights explained — MUTCD Type A/B/C, LED vs incandescent, battery life, mounting, and what to buy for NJ work zones. Direct answers + buyer guide.',
  primaryKeyword: 'traffic cone lights',
  secondaryKeywords: [
    'cone lights',
    'barricade light',
    'LED traffic cone lights',
    'flashing cone lights',
    'cone mounted warning light',
    'traffic warning lights',
  ],
  targetVolume: 500,
  datePublished: '2026-05-16',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'Quick answer:'),
      ' Traffic cone lights are MUTCD-classified warning lamps that mount on top of cones, drums, or barricades to make a work zone visible at night. There are three MUTCD types (A flashing, B high-intensity flashing, C steady-burn), and the right one depends on whether the light is marking advance warning, a closure, or a taper. Standard contractor-grade LED cone lights cost $12–$35 each, run 30–120 hours on a single set of batteries, and replace the older incandescent units that dominated the market until ~2015.',
    ),

    h('h2', null, 'The MUTCD three-type breakdown'),
    h(
      'p',
      null,
      'MUTCD §6F.83 defines three categories of warning lights. Pick by purpose, not by the cheapest box on the shelf.',
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
          h(
            'tr',
            { className: 'border-b' },
            h('th', { className: 'text-left p-2' }, 'Type'),
            h('th', { className: 'text-left p-2' }, 'Action'),
            h('th', { className: 'text-left p-2' }, 'Use'),
            h('th', { className: 'text-left p-2' }, 'Where mounted'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Type A'),
            h('td', { className: 'p-2' }, 'Low-intensity flashing yellow'),
            h('td', { className: 'p-2' }, 'Advance warning, single-point hazard'),
            h('td', { className: 'p-2' }, 'Cones, drums, advance-warning signs'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Type B'),
            h('td', { className: 'p-2' }, 'High-intensity flashing yellow'),
            h('td', { className: 'p-2' }, 'Major closures, daytime + nighttime use'),
            h('td', { className: 'p-2' }, 'Type III barricades, equipment perimeters'),
          ),
          h(
            'tr',
            { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Type C'),
            h('td', { className: 'p-2' }, 'Steady-burn yellow'),
            h('td', { className: 'p-2' }, 'Taper or channelizing line'),
            h('td', { className: 'p-2' }, 'Drums, cones along a taper run'),
          ),
        ),
      ),
    ),

    h('h2', null, 'LED vs incandescent (settled debate)'),
    h(
      'p',
      null,
      'As of 2026, LED is the default. Incandescent cone lights still exist but are obsolete on a 5-year TCO basis. The reason:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'LED draws 50–150 mA at flash; incandescent draws 700–1,200 mA'),
      h(
        'li',
        null,
        'LED on 2× D-cells: 80–150 hours of flashing. Incandescent on same batteries: 12–30 hours',
      ),
      h(
        'li',
        null,
        'LED bulb life: ~50,000 hours. Incandescent: ~1,000 hours, often less in cold or vibration',
      ),
      h(
        'li',
        null,
        'LED unit cost: $12–$35 retail. Incandescent: $8–$20 — but you replace 4× as many batteries and 50× as many bulbs',
      ),
    ),
    h(
      'p',
      null,
      'A 50-light contractor inventory burns $300–$600/year in batteries with incandescent; the same inventory burns $60–$120/year with LED. Payback on switching is typically inside one season.',
    ),

    h('h2', null, 'Battery options'),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, '2× D-cell '),
        '— most common. Easy to source, ~$1 each in bulk, 80–150 hours of LED flashing. Standard for contractor-grade cone lights.',
      ),
      h(
        'li',
        null,
        h('strong', null, '4× AA-cell '),
        '— compact units. Shorter runtime (40–70 hours) but lighter to ship and replace. Good for short-duration crews.',
      ),
      h(
        'li',
        null,
        h('strong', null, '6V lantern battery '),
        '— heavy-duty Type B flashers (high-intensity). 200–400 hours runtime; ~$4–$8 per battery. Use for long-duration closures.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Solar / rechargeable '),
        '— premium ($45–$85 per light). Built-in solar panel + Li-ion or NiMH cell. Worth it for permanent or recurring deployments (perpetual closures, parking-lot crash protection); not worth it for one-off jobs.',
      ),
    ),

    h('h2', null, 'Mounting — does any light fit any cone?'),
    h(
      'p',
      null,
      'No. There are three mounting standards and they are not interchangeable without an adapter:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Cone-tip clamp '),
        '— jaws grip the 1.5-inch cone tip. Fits 28" and 36" MUTCD cones. Will NOT fit 18" parking-lot cones or drum-style channelizers.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Drum-top strap '),
        '— elastic strap that wraps around a channelizing drum top. Standard accessory on most LED Type C steady-burns.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Barricade bolt-on '),
        '— bolts to the top rail of a Type II or Type III barricade. Includes a 1/4"-20 thru-bolt; the same light usually has a cone-clamp on the other side, so one SKU fits two devices.',
      ),
    ),
    h(
      'p',
      null,
      'Buying tip: if you stock both cones and drums, pick lights with combo mounts (cone clamp + drum strap) so one SKU covers both devices. It is a $2 premium per light vs single-mount and eliminates the wrong-light-in-the-wrong-pocket problem.',
    ),

    h('h2', null, 'Photocell vs always-on'),
    h(
      'p',
      null,
      'Photocell ("dusk-to-dawn") cone lights detect ambient light and shut off in daylight to save battery. Two flavors:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'On/off photocell '),
        '— shuts the light off completely when it detects daylight. Battery life on a 12-hour-on / 12-hour-off cycle is 2× the always-on equivalent.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Steady-by-day, flash-by-night '),
        '— required for Type B high-intensity lights on barricades, which must be visible 24/7. The flasher logic switches automatically.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Always-on '),
        '— manual switch. Cheaper ($2–$4 less) but burns daylight battery. Use for short jobs where the crew picks them up at the end of shift.',
      ),
    ),

    h('h2', null, 'When are cone lights required by MUTCD?'),
    h(
      'p',
      null,
      'MUTCD §6F.83 and §6L.06 spell out the night-work requirements:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Any work zone operating during darkness (sunset to sunrise) needs warning lights on the closure devices'),
      h(
        'li',
        null,
        'Type B (high-intensity) on the outboard corners of Type III barricades blocking travel lanes',
      ),
      h(
        'li',
        null,
        'Type A (low-intensity flashing) on advance warning signs and at isolated single-point hazards',
      ),
      h(
        'li',
        null,
        'Type C (steady-burn) on every device in a taper or channelizing run on roads ≥ 45 mph',
      ),
      h(
        'li',
        null,
        'Day-only short-duration work zones (open and closed within daylight) do not require lights — but inspectors flag the absence as a finding if conditions could push past sunset',
      ),
    ),

    h('h2', null, 'Quick buyer checklist'),
    h(
      'p',
      null,
      'For an NJ contractor stocking a starter cone-light inventory:',
    ),
    h(
      'ul',
      null,
      h('li', null, '20× LED Type A flashers, photocell, cone-clamp + barricade-mount combo (~$15–$22 each)'),
      h('li', null, '8× LED Type B high-intensity flashers, photocell, barricade bolt-on (~$25–$40 each)'),
      h('li', null, '24× LED Type C steady-burns, drum-strap, photocell (~$12–$18 each)'),
      h('li', null, '60× spare D-cells (2 per Type A, 4 per Type B, 2 per Type C — buy 2× the burn rate)'),
      h('li', null, '4× solar charging Type A lights for recurring "leave it" closures'),
    ),
    h(
      'p',
      null,
      'Total starter inventory: $750–$1,250 in lights, $60 in batteries. Covers a typical Profile A or B closure (see our ',
      h('a', { href: '/blog/road-closed-barricade-guide' }, 'road closed barricade guide'),
      ') with no shortfall.',
    ),

    h('h2', null, 'Where to buy traffic cone lights in NJ'),
    h(
      'p',
      null,
      'We stock Type A, B, and C LED warning lights for cones, drums, and barricades — combo-mount when possible. Browse the ',
      h('a', { href: '/category/safety-lighting' }, 'safety lighting category'),
      ' or pair with cones from ',
      h('a', { href: '/category/cones-drums' }, 'cones and channelizers'),
      '. For a full night-work kit (lights + spare batteries + barricades), ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' for same-day Central NJ delivery.',
    ),
  ),
  faqs: [
    {
      q: 'Are LED cone lights MUTCD-compliant?',
      a: 'Yes — MUTCD §6F.83 specifies performance characteristics (flash rate 50–60 fpm for Type A, 70–80 fpm for Type B, steady for Type C) rather than light source. LED, incandescent, and xenon are all compliant if they meet the photometric and flash-rate spec. LED dominates the market because it is cheaper to run, not because it is mandated.',
    },
    {
      q: 'How long do LED cone lights run on a set of D-cells?',
      a: '80–150 hours for a Type A flasher on 2× D-cells, depending on flash rate and LED current. Type B high-intensity lights on a 6V lantern battery run 200–400 hours. Cold weather (below 20°F) cuts those numbers by 20–30%; switch to lithium D-cells in winter for a 2× cold-weather extension.',
    },
    {
      q: 'Can I use barricade lights on cones?',
      a: 'Only if the unit has a cone-clamp mount in addition to (or instead of) the barricade bolt-on. A bolt-on-only light will not hold on a cone tip. Combo-mount LED lights are the right buy if you switch between cones and barricades on different jobs.',
    },
    {
      q: 'What color should traffic cone lights be?',
      a: 'Yellow (amber). MUTCD §6F.83 reserves yellow for work-zone warning lights. Red is for emergency vehicles and stop indications only — using red on a work-zone cone is non-compliant and creates dangerous confusion. White and blue are not used on work-zone devices.',
    },
    {
      q: 'Do I need lights on every cone, or just the ones at the start of the taper?',
      a: 'Per MUTCD §6F.83, Type C steady-burn lights are required on every device in a taper or channelizing run on roads with speeds ≥ 45 mph during nighttime operations. Below 45 mph, lighting every-other-cone is acceptable. The first and last devices in any line must always be lit at night regardless of speed.',
    },
    {
      q: 'What is the difference between a cone light and an arrow board?',
      a: 'A cone light marks the position of a single device; an arrow board (MUTCD §6F.61) is a trailer-mounted or vehicle-mounted directional display that points a driver into the open lane. For lane-closure tapers on roads ≥ 45 mph or multi-approach-lane closures, MUTCD requires an arrow board in addition to cone lights — not instead of.',
    },
    {
      q: 'Are solar cone lights worth the extra cost?',
      a: 'For recurring or long-duration deployments (overnight parking-lot closures, permanent crash-cushion lights), yes — payback is ~6 months on battery savings alone. For one-off jobs or general truck stock, conventional D-cell LED lights are better because solar units are 3× the unit cost and store more poorly between jobs.',
    },
    {
      q: 'Do cone lights need to be turned in / picked up at end of shift?',
      a: 'If the closure ends with the shift, yes — photocell or not, lights left on overnight at an open work zone will be stolen or damaged. For multi-day closures, leave them on the devices with photocell mode so they auto-shut in daylight. Many contractors paint a number on each light to track inventory.',
    },
  ],
  relatedProducts: [
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Accessories & Hardware', path: '/category/accessories-hardware' },
  ],
  relatedArticles: [
    'road-closed-barricade-guide',
    'type-iii-barricade-vs-type-i-type-ii',
    'reflective-traffic-cones-guide',
  ],
}
