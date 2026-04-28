import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "hazard cones" (50K/mo, High comp).
 * Commercial-intent comparison — distinguishes "hazard cone" (the broader
 * category, often facility-safety / wet-floor / spill-marking gear) from a
 * "traffic cone." Pivots toward the right TrafficKit SKUs.
 */
export const articleHazardConesVsTrafficCones: Article = {
  slug: 'hazard-cones-vs-traffic-cones',
  title: 'Hazard Cones vs. Traffic Cones: When You Need a Wet-Floor Cone, a Caution Cone, or a Real Road Cone',
  excerpt:
    '"Hazard cone" is a fuzzy term — it could mean a 12-inch wet-floor sign, a yellow caution cone, or a full 28-inch road cone with reflective collars. Here is which one each situation actually needs.',
  metaDescription:
    'Hazard cones explained: wet-floor cones, yellow caution cones, OSHA spill cones, and full road-grade traffic cones. Which to buy and when. Same-day NJ delivery.',
  primaryKeyword: 'hazard cones',
  secondaryKeywords: [
    'safety cones',
    'caution cones',
    'wet floor cones',
    'yellow safety cones',
    'osha hazard cones',
    'spill cones',
    'orange cones',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-28',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      '"Hazard cone" is a catch-all term. In facility-safety and janitorial contexts, it means a ',
      h('strong', null, 'yellow wet-floor or caution cone'),
      ' (12–24 in, fold-out or A-frame, no reflective collar). In construction or roadway use, it means a ',
      h('strong', null, 'fluorescent-orange traffic cone'),
      ' (18–36 in, weighted rubber base, MUTCD-compliant). They are not interchangeable: a yellow wet-floor cone has zero standing on a road work zone, and a road traffic cone is overkill for a spill in aisle 5. This guide separates the two and shows which to buy for each situation.',
    ),

    h('h2', null, 'The two categories — quick reference'),
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
            h('th', { className: 'text-left p-2 border-b' }, ''),
            h('th', { className: 'text-left p-2 border-b' }, 'Wet-floor / caution cone'),
            h('th', { className: 'text-left p-2 border-b' }, 'Traffic / road cone'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', { className: 'p-2 font-semibold' }, 'Color'),
            h('td', { className: 'p-2' }, 'Yellow (occasionally lime / red)'),
            h('td', { className: 'p-2' }, 'Fluorescent orange'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2 font-semibold' }, 'Height'),
            h('td', { className: 'p-2' }, '12–24 in'),
            h('td', { className: 'p-2' }, '18, 28, 36 in'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2 font-semibold' }, 'Body'),
            h('td', { className: 'p-2' }, 'Fold-out plastic or A-frame'),
            h('td', { className: 'p-2' }, 'Solid hollow PVC + rubber base'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2 font-semibold' }, 'Base weight'),
            h('td', { className: 'p-2' }, '< 1 lb (decorative)'),
            h('td', { className: 'p-2' }, '4–12 lb (functional)'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2 font-semibold' }, 'Reflective?'),
            h('td', { className: 'p-2' }, 'Rare'),
            h('td', { className: 'p-2' }, 'Standard for night use'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2 font-semibold' }, 'Spec'),
            h('td', { className: 'p-2' }, 'OSHA 1910.144 color code'),
            h('td', { className: 'p-2' }, 'MUTCD, NCHRP-350 / MASH'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2 font-semibold' }, 'Typical price'),
            h('td', { className: 'p-2' }, '$8 – $30'),
            h('td', { className: 'p-2' }, '$22 – $110'),
          ),
        ),
      ),
    ),

    h('h2', null, 'When you need a wet-floor or caution cone'),
    h(
      'p',
      null,
      'Yellow caution cones (sometimes called "hazard cones" or "wet-floor cones") are facility-safety gear. They are designed to satisfy OSHA 1910.144 color-coding, which assigns yellow to "caution" hazards — slip / trip / fall risks, low-clearance, projecting object. Common buyers:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Janitorial services for slip-hazard marking after mopping or after a spill.'),
      h('li', null, 'Property managers for elevator-out / stairwell-closed routing.'),
      h('li', null, 'Restaurant and hospitality ops for ingress-side wet-floor warnings.'),
      h('li', null, 'Airports and transit for slip and trip hazard marking on tile / smooth flooring.'),
      h('li', null, 'Healthcare facilities for floor-cleaning and infection-control zone marking.'),
    ),
    h(
      'p',
      null,
      'Spec-wise, yellow caution cones do not have stability requirements — they sit on a flat floor and never face wind or vehicle slipstream. Most are 24–26 in tall, fold flat for storage, weigh under a pound, and read "CAUTION — WET FLOOR" or "CAUTION — CUIDADO" in two languages. The cheap ones tip if a stroller bumps them; the better ones have a wider A-frame base.',
    ),

    h('h2', null, 'When you need a real traffic / road cone'),
    h(
      'p',
      null,
      'Once you are routing vehicles or pedestrians on or near a roadway, a yellow caution cone is the wrong tool. The federal MUTCD requires fluorescent orange channelizing devices for any work zone on a public road. A yellow cone has no standing in a TCP review; an inspector will flag it on first sight. Use a traffic cone (also called a "road cone," "safety cone," "construction cone," or "parking cone") for:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Lane closures, taper setup, buffer-and-activity-area marking on any public road.'),
      h('li', null, 'Parking-lot routing where a public-road driveway connects to the lot.'),
      h('li', null, 'Construction-zone perimeters where vehicles or heavy equipment operate.'),
      h('li', null, 'Outdoor event ingress where vehicles cross or staff a route.'),
      h('li', null, 'Any nighttime hazard near a public road — caution cones lack the ASTM Type IV reflective sheeting needed.'),
    ),

    h('h2', null, 'The OSHA color code (and why it is not the same as MUTCD)'),
    h(
      'p',
      null,
      'OSHA 1910.144 assigns colors to hazard categories in the workplace:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Red:'), ' fire / emergency / immediate-stop equipment.'),
      h('li', null, h('strong', null, 'Yellow:'), ' caution — slip, trip, fall, projecting / low-clearance hazards.'),
      h('li', null, h('strong', null, 'Orange:'), ' "dangerous parts of machines or equipment which may cut, crush, shock or otherwise injure" — and channelizing devices on roadways.'),
      h('li', null, h('strong', null, 'Green:'), ' safety / first-aid / emergency-egress equipment.'),
      h('li', null, h('strong', null, 'Blue:'), ' information / out-of-service.'),
    ),
    h(
      'p',
      null,
      'OSHA governs workplace conditions; MUTCD governs traffic control on public roads. The two systems overlap for orange (both classify it as a high-attention danger color) but diverge on yellow — OSHA caution and MUTCD school/pedestrian warning are unrelated despite using overlapping pigment ranges. Buy yellow for a wet-floor; buy orange for a road.',
    ),

    h('h2', null, 'Where each cone fails'),
    h('h3', null, 'Yellow caution cone failures'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Used on a roadway.'), ' First and most common — yellow cones do not meet MUTCD; an inspector will cite them; in a crash, an injured party will use it as evidence of negligence.'),
      h('li', null, h('strong', null, 'Tipped by an HVAC slipstream or door swing.'), ' The lightest cones (under 1 lb) blow over near building entries and air-handler discharges.'),
      h('li', null, h('strong', null, 'Hidden under a display.'), ' If the cone is visible only from one angle, traffic from the other direction has no warning. Use two cones, not one.'),
      h('li', null, h('strong', null, 'Faded yellow.'), ' UV is not the issue indoors, but cleaning-chemical exposure (bleach, ammonia) yellows the plastic toward dingy beige.'),
    ),
    h('h3', null, 'Orange traffic cone failures'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Wrong size for speed.'), ' 18-inch cones on a 35+ mph roadway is the most common cite.'),
      h('li', null, h('strong', null, 'No reflective collar at night.'), ' MUTCD requires single 4-in collar for ≤45 mph nighttime, double collars for >45 mph.'),
      h('li', null, h('strong', null, 'Cracked PVC base.'), ' One vehicle hit and a solid PVC base cracks at the seam — always buy rubber base.'),
      h('li', null, h('strong', null, 'UV-faded color.'), ' Fluorescent orange bleaches to pale pink in 18–36 months of full sun. Retire and replace.'),
    ),

    h('h2', null, 'Mixed-use scenarios — when you need both'),
    h(
      'p',
      null,
      'A few real situations require both cone types side by side:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Hospital / commercial parking ramp:'),
        ' yellow cones inside the building (slip / wayfinding); orange cones outside on the ramp drive.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'School pickup/drop-off:'),
        ' fluorescent-yellow-green W11-2 + S1-1 signs at the road edge; orange traffic cones channelizing the pickup lane on the school driveway; yellow caution cones inside the entry vestibule for any wet-floor situation.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Outdoor event with food / beverage service:'),
        ' orange cones for vehicle ingress; yellow caution cones near beverage stations and ice-bath spillover.',
      ),
    ),

    h('h2', null, 'What to buy — recipes'),

    h('h3', null, 'Recipe: small-property facility-safety kit'),
    h(
      'ul',
      null,
      h('li', null, '6× yellow A-frame "CAUTION — WET FLOOR" cones, 24 in.'),
      h('li', null, '2× yellow "MEN AT WORK" or "CLEANING IN PROGRESS" A-frames.'),
      h('li', null, 'Total retail: $90–$160.'),
    ),

    h('h3', null, 'Recipe: parking lot + road frontage kit'),
    h(
      'ul',
      null,
      h('li', null, '12× 18-in orange traffic cones (4 lb base) for lot routing.'),
      h('li', null, '4× 28-in orange traffic cones (7 lb base, single reflective collar) for road frontage at the driveway.'),
      h('li', null, '2× yellow "CAUTION — WET FLOOR" cones for occasional indoor spill duty.'),
      h('li', null, 'Total retail: $400–$580.'),
    ),

    h('h3', null, 'Recipe: contractor work-zone starter kit'),
    h(
      'ul',
      null,
      h('li', null, '20× 28-in orange traffic cones, 7 lb rubber base, double reflective collar.'),
      h('li', null, '6× 36-in orange traffic cones, 10 lb base, double collar (for nighttime).'),
      h('li', null, '4× yellow caution cones for crew break-area / portable-toilet / generator marking.'),
      h('li', null, 'Total retail: $1,000–$1,500.'),
    ),

    h('h2', null, 'Where to buy hazard cones (both kinds) in NJ'),
    h(
      'p',
      null,
      'TrafficKit ships both yellow caution cones and orange traffic cones with same-day delivery to Central NJ. ',
      h('a', { href: '/category/cones-drums' }, 'Browse the cone and channelizer catalog'),
      ' for the orange road cones; ',
      h('a', { href: '/category/pedestrian-control' }, 'browse pedestrian and crowd-control gear'),
      ' for yellow A-frames and other facility-safety items. For mixed-property kits, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' — describe the property and we will spec a kit that covers both indoor and outdoor needs. The ',
      h('a', { href: '/assistant' }, 'TrafficKit Assistant'),
      ' can also recommend a starter set in real time.',
    ),
    h(
      'p',
      null,
      'For a deeper look at sizing and standards on the orange-traffic-cone side, see our ',
      h('a', { href: '/blog/traffic-safety-cones-pillar-guide' }, 'traffic safety cones complete guide'),
      ' and our ',
      h('a', { href: '/blog/road-cones-vs-traffic-cones' }, 'road cones vs. traffic cones piece'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'What is a hazard cone?',
      a: '"Hazard cone" is a generic term. In facility safety it usually means a yellow wet-floor or caution cone (12–24 in, fold-out, no reflective collar) used to mark indoor slip / trip / fall hazards under OSHA 1910.144. In construction or road use it means a fluorescent-orange traffic cone (18–36 in, weighted rubber base) used to route vehicles per MUTCD. The two are not interchangeable.',
    },
    {
      q: 'Are hazard cones the same as traffic cones?',
      a: 'No. Yellow hazard / caution cones are for indoor slip-hazard marking under OSHA. Orange traffic cones are for vehicle and pedestrian routing on roadways under MUTCD. A yellow cone has no standing in a road work zone — an inspector will flag it.',
    },
    {
      q: 'What color are hazard cones?',
      a: 'Yellow for indoor caution / slip-hazard cones (per OSHA 1910.144 color code). Fluorescent orange for road traffic cones. Lime is sometimes used for pedestrian-only outdoor warnings. Red is reserved for fire / emergency / no-entry. Blue for information / ADA.',
    },
    {
      q: 'Can I use a yellow hazard cone on a road?',
      a: 'No. The MUTCD specifies fluorescent orange (or fluorescent pink-orange for incident response) for any channelizing device on a public road. Yellow cones do not meet the spec, will be cited on a TCP review, and create liability exposure if a crash happens at the work zone.',
    },
    {
      q: 'How heavy should a hazard cone be?',
      a: 'For indoor wet-floor cones, weight is not a stability concern — they sit on a flat floor without wind. Lightweight (under 1 lb) is fine. For outdoor traffic cones, base weight matters: 4 lb for parking, 7 lb for daytime road work, 10 lb for nighttime, 12 lb for freeway speed.',
    },
    {
      q: 'How much does a hazard cone cost?',
      a: 'Yellow caution cones run $8–30 retail. Orange traffic cones run $22–110 depending on size and reflective grade — 28 in single collar around $22–32, 36 in double collar around $58–110.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Pedestrian & Crowd Control', path: '/category/pedestrian-control' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Safety Vests & Hi-Vis Apparel', path: '/category/safety-vests-hi-vis' },
  ],
  relatedArticles: [
    'road-cones-vs-traffic-cones',
    'traffic-safety-cones-pillar-guide',
    'parking-cones-buying-guide',
  ],
}
