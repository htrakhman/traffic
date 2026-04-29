import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "orange cones" (50K/mo, High comp, ci=100). Definitional + visibility-
 * spec article — answers the implicit question "why are cones orange and what
 * does that mean," then converts on the buying side. Structure is heavier on
 * paragraphs and a single technical table (sheeting/conspicuity) — different
 * from the parking-cones table-heavy commercial guide and from the traffic-cones
 * pillar. AEO lead in the first 100 words.
 */
export const articleOrangeConesExplained: Article = {
  slug: 'orange-cones-explained',
  title: 'Why Orange Cones Are Orange — and What Each Spec Actually Means',
  excerpt:
    'Orange cones look the same to most people. Up close they vary on six specs that decide whether a cone passes a DOT inspection — color shade, sheeting, height, base weight, body construction, and spacing.',
  metaDescription:
    'Orange cones explained: why fluorescent orange, how MUTCD specifies cones, what 28 in vs 36 in actually means, plus same-day NJ delivery.',
  primaryKeyword: 'orange cones',
  secondaryKeywords: [
    'orange traffic cones',
    'orange safety cones',
    'orange construction cones',
    'orange road cones',
    'orange street cones',
    'large orange cones',
    'small orange cones',
    'orange cones for sale',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-29',
  dateModified: '2026-04-29',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Orange cones are orange because ',
      h(
        'strong',
        null,
        'fluorescent orange is the federally specified color for temporary traffic-channelizing devices under MUTCD Section 6F.63',
      ),
      '. The color was chosen because it sits in a wavelength range (~590–620 nm) that the human eye registers fastest at low ambient light, and because no other roadway sign or marking color competes with it — drivers see orange and read "temporary, slow down, follow the line." A "real" orange cone is fluorescent (not safety-orange paint), at least 18 inches tall on public roads, weighted with a 4–10 lb rubber base, and — for night work — wrapped in ASTM Type III or higher retroreflective collars. Below is what each of those specs actually means and why an "orange cone" is not just an orange cone.',
    ),

    h('h2', null, 'Why orange? The science of conspicuity'),
    h(
      'p',
      null,
      'The MUTCD picks colors for traffic-control devices on the principle that a driver should be able to identify a device’s function from its color alone before they have time to read it. Red means stop or prohibit, yellow means caution-permanent, white means regulatory, green means right-of-way, blue means motorist services, brown means recreational, and ',
      h('strong', null, 'orange means temporary traffic control'),
      '. The fluorescent variant pushes the orange into the green-blocking pigment range that flags as "this is happening right now, and it was not here yesterday."',
    ),
    h(
      'p',
      null,
      'Drivers learn this color encoding without being taught. By the time someone has held a license for a year, "orange cone" lights up the same neural pattern as "construction zone, narrow your lane, slow your speed." That is also why mixing colors on a single zone is a mistake — a red cone among orange cones reads as "stop here," and you suddenly have a queue where you wanted a merge.',
    ),

    h('h2', null, 'The six specs that turn an orange cone into a compliant orange cone'),
    h(
      'p',
      null,
      'Two cones can look identical on a Home Depot shelf and behave very differently in a work zone. The specs that matter are:',
    ),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'Color shade.'), ' Federal Yellow-Orange (FYO) per FHWA / ASTM D4956. Beware "safety-orange" repaints that fade in 12 months.'),
      h('li', null, h('strong', null, 'Reflective sheeting.'), ' ASTM Type III, IV, or higher. Determines visibility past dusk.'),
      h('li', null, h('strong', null, 'Height.'), ' 18, 28, or 36 inches. Sets which roads the cone is legal on.'),
      h('li', null, h('strong', null, 'Base weight.'), ' 4, 7, or 10 lb. Decides whether the cone stays upright in slipstream.'),
      h('li', null, h('strong', null, 'Body construction.'), ' One-piece PVC vs. PVC body + rubber base. Decides cone life span.'),
      h('li', null, h('strong', null, 'Spacing.'), ' One cone per foot of speed limit (in feet) along a taper. Decides whether drivers respect the routing.'),
    ),

    h('h2', null, 'Color shade — Federal Yellow-Orange vs. paint-store orange'),
    h(
      'p',
      null,
      'Real traffic cones are pigmented in the resin during injection molding. The color reference is Federal Yellow-Orange (sometimes "Federal Highway Orange") and matches the daytime chromaticity coordinates in ASTM D4956 Table 6. The fluorescent dyes are integral — not painted on — which is why a real cone fades in UV (the molecular dye breaks down) rather than chipping. A repainted "orange cone" from a hardware store often uses a non-fluorescent acrylic top-coat that chalks in a single summer.',
    ),
    h(
      'p',
      null,
      'In practice: order from a TTC supplier, not a general industrial-supply catalog. The cone you get will be molded in fluorescent orange resin; the cone you get from the wrong catalog may be painted.',
    ),

    h('h2', null, 'Reflective sheeting — what the collars actually do'),
    h(
      'p',
      null,
      'A bare PVC cone is barely visible past dusk. The reflective collars wrapped around the cone body are what make it a nighttime channelizer. The collars come in three retroreflectivity grades:',
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
            null,
            h('th', { className: 'text-left p-2 border-b' }, 'Sheeting grade'),
            h('th', { className: 'text-left p-2 border-b' }, 'Approx. visibility (clear night, low beam)'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best for'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'ASTM Type III (HI)'),
            h('td', { className: 'p-2' }, '~500 ft'),
            h('td', { className: 'p-2' }, 'Daytime + occasional dusk'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'ASTM Type IV (HIP)'),
            h('td', { className: 'p-2' }, '~750 ft'),
            h('td', { className: 'p-2' }, 'Standard contractor night spec'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'ASTM Type V/VIII (Diamond Grade)'),
            h('td', { className: 'p-2' }, '~1,000 ft'),
            h('td', { className: 'p-2' }, 'Freeway, bridge, photo-enforced zones'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'A cone working past dusk needs either one 6-inch collar near the top, or a dual 4 in + 6 in collar configuration, of ASTM Type III or higher. Dual ASTM Type IV is the safest spec for any contractor running a mix of day and night work.',
    ),

    h('h2', null, 'Heights — and why 18-inch orange cones are legal but rarely the right buy'),
    h(
      'p',
      null,
      'The MUTCD floor for any public-road cone is 18 inches. Below that, the cone is novelty (sport / agility / classroom) and inspectors will reject it. But ',
      h('strong', null, '18 inches is the floor, not the target.'),
      ' For most contractor work in NJ — county roads, paving, utility — 28 inches is the right buy. For freeway and bridge work, step up to 36 inches. We unpack the size logic in our ',
      h('a', { href: '/blog/traffic-cones-buying-guide' }, 'traffic cones buying guide'),
      ' if you want the full breakdown.',
    ),

    h('h2', null, 'Base weight — the spec everyone underbuys'),
    h(
      'p',
      null,
      'Base weight is what stops your fluorescent-orange cone from becoming a fluorescent-orange tip-over hazard. Wind and slipstream are the enemies. Once a cone tips, it is invisible from the eye height of an oncoming driver — they see asphalt, not your routing. The default for a road-job contractor is 7 lb. Step up to 10 lb for any freeway or exposed-ridge work. Indoor and parking-lot use can go down to 4 lb. Below 4 lb is for residential cone-the-driveway duty only.',
    ),

    h('h2', null, 'One-piece PVC vs. rubber base — buy rubber'),
    h(
      'p',
      null,
      'A "rubber-base orange cone" is two pieces — fluorescent PVC body, recycled-rubber base — friction-fit or molded together. A "one-piece" or "all-PVC" cone is cheaper but stress-fractures at the base seam after one impact. Net cost over 18 months is higher because of replacement frequency. The replacement cost differential per cone is small ($1–$2). Spend it. Buy rubber-base.',
    ),

    h('h2', null, 'Spacing — the orange cone "every-foot-of-speed" rule'),
    h(
      'p',
      null,
      'The MUTCD channelizing-device spacing rule for tapers is one cone per foot of posted speed limit, in feet, along the taper. So a 35-mph taper has cones every 35 ft along the merge. Tighten that to half-spacing if a wheelchair or pedestrian is being routed along the same path. For lane-closure cone math by speed, see the ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'cone-count guide'),
      ', or run the closure through the ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' for an automatic cone count.',
    ),

    h('h2', null, 'Other-color cones — when "orange cone" actually should not be orange'),
    h(
      'p',
      null,
      'Most cones are orange because most cones are channelizing roadway traffic. There are a few legitimate cases for other colors:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Lime / fluorescent yellow.'), ' Pedestrian-only hazard marking (wet floors, slip zones).'),
      h('li', null, h('strong', null, 'Red.'), ' Stop / no-entry zones, fire-lane reservation. Drivers misread red on a road as queue-and-wait.'),
      h('li', null, h('strong', null, 'Blue.'), ' ADA / accessible-stall marking and water-utility crews.'),
      h('li', null, h('strong', null, 'Pink-orange.'), ' Added by MUTCD 2023 for incident-response and emergency-management scenes only.'),
    ),

    h('h2', null, 'Where to buy fluorescent-orange cones in NJ'),
    h(
      'p',
      null,
      'TrafficKit ships 18 in, 28 in, and 36 in fluorescent-orange traffic cones — Federal Yellow-Orange resin, dual ASTM Type IV reflective collars, 7-lb or 10-lb rubber base — with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean. ',
      h('a', { href: '/category/cones-drums' }, 'Browse cones, drums, and channelizers'),
      ', or describe the job to the ',
      h('a', { href: '/assistant' }, 'TrafficKit Assistant'),
      ' and it will spec a kit. For one-off purchases, a ',
      h('a', { href: '/quote' }, 'quote'),
      ' is the fastest path.',
    ),
  ),
  faqs: [
    {
      q: 'Why are traffic cones orange?',
      a: 'Fluorescent orange is the MUTCD-specified color for temporary traffic-channelizing devices. The color sits in a wavelength range the human eye reads fastest at low ambient light, and no other roadway sign or marking color competes with it — drivers see orange and read "temporary work zone."',
    },
    {
      q: 'Are all orange cones the same?',
      a: 'No. Orange cones vary on six specs: color shade (Federal Yellow-Orange vs. paint-store orange), reflective sheeting grade (ASTM Type III vs. IV vs. V), height (18, 28, or 36 in), base weight (4, 7, or 10 lb), body construction (one-piece PVC vs. PVC + rubber base), and spacing in deployment.',
    },
    {
      q: 'What does it mean when there are orange cones?',
      a: 'Orange cones signal temporary traffic control — a work zone, lane closure, or other short-duration change in the normal road geometry. They are not permanent road furniture; they channelize drivers around or away from a hazard or work area.',
    },
    {
      q: 'Are 18-inch orange cones MUTCD compliant?',
      a: 'Yes, 18 inches is the MUTCD minimum height for any public-road traffic cone. But for posted speeds 45 mph and above, most state DOTs prefer 28 inches, and freeway work typically uses 36 inches.',
    },
    {
      q: 'How long does the orange on a traffic cone last?',
      a: 'Federal Yellow-Orange fluorescent dye fades in 18–24 months of full sun exposure. A faded cone reads pink, not orange, and inspectors will flag it. Stored cones (covered, off-duty) can last 5+ years before color retirement.',
    },
    {
      q: 'Can I paint an orange cone?',
      a: 'You can, but it will not last and inspectors will reject it. Real fluorescent-orange cones have the dye molded into the PVC resin during manufacture. Acrylic top-coat paint chalks in a single summer and shifts the chromaticity out of MUTCD spec.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Flares, Markers, Wands & Flags', path: '/category/flares-markers-wands-flags' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Safety Vests & Hi-Vis', path: '/category/safety-vests-hi-vis' },
  ],
  relatedArticles: [
    'traffic-cones-buying-guide',
    'parking-cones-buying-guide',
    'hazard-cones-vs-traffic-cones',
  ],
}
