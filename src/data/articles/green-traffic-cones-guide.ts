import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "green traffic cones" (~500/mo, High comp, $11.99 bid).
 * Definitional / "what is X" structure: starts with what green cones
 * actually mean (APWA sewer/drain marking, golf-course wayfinding,
 * sports / training, MUTCD non-applicability), then sizing and sourcing.
 * Mirrors the blue/red/white color-cone series.
 */
export const articleGreenTrafficConesGuide: Article = {
  slug: 'green-traffic-cones-guide',
  title: 'Green Traffic Cones: What They Mean and Where They Belong',
  excerpt:
    'Green traffic cones are not federally approved for public-roadway work zones. They show up in three legitimate places: APWA sewer-line utility marking, golf course / property wayfinding, and sports training — but the federal road-work standard is fluorescent orange.',
  metaDescription:
    'Green traffic cones explained: APWA sewer/drain utility code, golf course markers, sports training cones. Why green is not MUTCD road-legal and the right size and base for each use.',
  primaryKeyword: 'green traffic cones',
  secondaryKeywords: [
    'green cones',
    'green safety cones',
    'sewer line cones',
    'utility marking cones',
    'golf course cones',
    'sports training cones',
  ],
  targetVolume: 500,
  datePublished: '2026-05-09',
  readMinutes: 6,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'Green traffic cones are not MUTCD-approved for federal-aid roadway work.'),
      ' But green has three legitimate, well-defined uses on a contractor or property-management site: marking sewer and storm-drain lines under the APWA color code, wayfinding on golf courses and large private properties, and sports / agility training. The right size, base weight, and reflective spec depend on which job you\'re using them for — and confusing road-construction green with golf-cart green will leave you with the wrong cone for both.',
    ),

    h('h2', null, 'What does a green cone mean?'),
    h(
      'p',
      null,
      'Unlike the orange traffic cone — which has a single, federally-defined meaning under MUTCD §6F.55 (channelization in a temporary traffic-control zone) — green cones inherit their meaning from the context they appear in. There are three contexts where a green cone has a recognized meaning:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'APWA Uniform Color Code: '), 'Green marks sewer, drain, and septic lines on a utility excavation. The full APWA code: red (electric), yellow (gas/oil/steam), orange (telecom), blue (potable water), green (sewer/drain), purple (reclaimed water), white (proposed excavation), pink (survey).'),
      h('li', null, h('strong', null, 'Golf-course / property wayfinding: '), 'Green cones direct play (cart paths, ground-under-repair, no-cart areas), partly because they read as "permitted" or "go" against the grass and partly because they color-match the maintained turf and don\'t scream "construction zone" at members.'),
      h('li', null, h('strong', null, 'Sports / agility training: '), 'Green is a high-contrast color against gym floors and indoor turf, used for football, soccer, and athletic-development drills. Sports-training cones are smaller (4 to 12 inches) and light, with a wide soft base.'),
    ),
    h(
      'p',
      null,
      'There is no driver-facing public-road meaning for green. A driver who sees a green cone on a public roadway has not been given any standardized message under the MUTCD.',
    ),

    h('h2', null, 'Use case 1 — APWA sewer-line marking'),
    h(
      'p',
      null,
      'Sewer and storm-drain marking is the largest legitimate field use for green cones. On a multi-day excavation, contractors place 28-inch green cones over each marked sewer-line locate, both as a 3D reminder during equipment swing and as a visual confirmation to the inspector that the locate was acknowledged. The same kit usually carries blue (potable water) and yellow (gas) cones for cross-utility excavation.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Spec for utility green cones:'),
      ' 28-inch with a 7-lb base, single 4-inch reflective collar, diamond-grade reflective sheeting if the dig runs into evening hours. Buy in 6-packs (typical sewer-locate density on a residential cut-over) or in a full APWA color set if you do mixed utility work.',
    ),

    h('h2', null, 'Use case 2 — golf course and property wayfinding'),
    h(
      'p',
      null,
      'Golf courses use green cones to mark cart-path routing during temporary construction (sprinkler repair, sod replacement, cart-path resurfacing), to flag ground-under-repair (GUR) zones during tournament play, and to define no-cart areas during wet conditions. The reason for green specifically: visual continuity. Orange cones on a golf course read as "construction emergency" to a member; green cones read as "directed play change."',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Spec for golf-course green cones:'),
      ' 18-inch with a 4–7 lb base is the most-bought size — visible from a moving cart, light enough that a single person can move 20 cones in 10 minutes for tournament setup. No reflective collar required (these are daylight-only). PVC or LDPE; LDPE survives a winter freeze better.',
    ),

    h('h2', null, 'Use case 3 — sports and agility training'),
    h(
      'p',
      null,
      'Sports-training green cones are an entirely different product from utility or wayfinding cones. They\'re 4 to 12 inches tall, made of soft PVC or rubber, with a wide rounded base for indoor floors. Typical use: agility drills, sprint markers, scrimmage boundary, drill spacing. Bought by the case (usually 50 cones at 4-inch or 25 cones at 9-inch) and color-coded across green / orange / blue / yellow / red so coaches can call drills by color.',
    ),
    h(
      'p',
      null,
      'Don\'t confuse a sports cone with an APWA utility cone. The sports cone has no reflective sheeting, the base is too soft to stand outdoors, and the body is 1/4 the height. Buying utility cones for sports drills wastes money; buying sports cones for utility work fails the locate-reminder job.',
    ),

    h('h2', null, 'Where green cones DO NOT belong'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Public roadway work zones.'), ' Federal MUTCD requires fluorescent orange (or fluorescent pink-orange for incident response). Green is not approved.'),
      h('li', null, h('strong', null, 'Lane closures or detours.'), ' Same rule — orange-only on the active travel side.'),
      h('li', null, h('strong', null, 'Anywhere a DOT or municipal inspector can see them in a road-work context.'), ' A green cone on the active side of a federal-aid project can trigger a violation even if the contractor\'s intent was to color-code internally.'),
      h('li', null, h('strong', null, 'Replacing a "go" traffic light.'), ' Green has no driver-facing roadway meaning under any state or federal vehicle code.'),
    ),

    h('h2', null, 'How green cones are sold'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Size'),
            h('th', { className: 'text-left p-2 border-b' }, 'Base'),
            h('th', { className: 'text-left p-2 border-b' }, 'Use case'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical price'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '4–9 in (sport)'), h('td', { className: 'p-2' }, 'Soft / saucer'), h('td', { className: 'p-2' }, 'Agility / sports training'), h('td', { className: 'p-2' }, '$1–$3 each, $40–$80/case')),
          h('tr', null, h('td', { className: 'p-2' }, '12 in'), h('td', { className: 'p-2' }, '2–4 lb'), h('td', { className: 'p-2' }, 'Indoor wayfinding, parking-lot stall corners'), h('td', { className: 'p-2' }, '$8–$12 each')),
          h('tr', null, h('td', { className: 'p-2' }, '18 in'), h('td', { className: 'p-2' }, '4–7 lb'), h('td', { className: 'p-2' }, 'Golf course, light utility, property wayfinding'), h('td', { className: 'p-2' }, '$10–$15 each')),
          h('tr', null, h('td', { className: 'p-2' }, '28 in'), h('td', { className: 'p-2' }, '7 lb'), h('td', { className: 'p-2' }, 'APWA sewer/drain utility marking'), h('td', { className: 'p-2' }, '$15–$28 each')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Green cones typically run $1–$3 above the equivalent orange cone — green PVC pigment costs more and production volume is lower. Custom-printed green cones (with a logo, "SEWER LINE," or course branding) add $4–$8 per cone in 50-unit minimums.',
    ),

    h('h2', null, 'How to extend green cone life'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Store indoors between uses.'), ' Green PVC fades faster than orange under UV exposure — full sun shifts the color toward yellow-olive within 18 months.'),
      h('li', null, h('strong', null, 'Match the base weight to the wind environment.'), ' Open-fairway cones in wind need 7-lb minimum; indoor cones can use a 2-lb base.'),
      h('li', null, h('strong', null, 'Buy LDPE for winter regions.'), ' LDPE flexes in freezing weather where rigid PVC cracks. Worth the $1–$2 premium per cone in NJ winters.'),
      h('li', null, h('strong', null, 'Keep a color-matched fleet.'), ' If you do utility work, buy green alongside red / yellow / blue / orange / white in the same brand so heights and bases interchange.'),
    ),

    h('h2', null, 'Where to buy green traffic cones in NJ'),
    h(
      'p',
      null,
      'Traffic Control Supply stocks 18-inch and 28-inch green cones with 7-lb bases (utility + golf), plus the matching APWA color set (red, yellow, blue, white) for full color-coded utility work. Browse our ',
      h('a', { href: '/category/cones-drums' }, 'cones catalog'),
      ' for the complete inventory. Same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean. For custom-printed cones (course branding, "SEWER" stencil, contractor logo), ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with the cone count and stencil text.',
    ),
    h(
      'p',
      null,
      'If your job is actually a public-road work zone — not utility marking, not golf-course wayfinding, not sports — read our ',
      h('a', { href: '/blog/orange-cones-explained' }, 'orange cones explainer'),
      ' for the MUTCD-compliant spec. Green cones do not belong on the active road.',
    ),
  ),
  faqs: [
    {
      q: 'Are green traffic cones MUTCD-approved?',
      a: 'No. The federal MUTCD specifies fluorescent orange (or fluorescent pink-orange for incident response) for public-roadway channelizing devices. Green is not an approved cone color for federal-aid roadway work zones.',
    },
    {
      q: 'What does a green cone mean on a utility site?',
      a: 'Under the APWA Uniform Color Code, green marks sewer, drain, and septic lines. APWA full code: red (electric), yellow (gas/oil/steam), orange (telecom), blue (potable water), green (sewer/drain), purple (reclaimed water), white (proposed excavation), pink (survey).',
    },
    {
      q: 'Why do golf courses use green cones?',
      a: 'Visual continuity. Orange cones on a golf course read as "construction emergency" to a member; green cones read as "directed play change" — used to flag cart-path detours, ground-under-repair zones, and wet-condition no-cart areas. They\'re typically 18-inch cones with no reflective collar (daylight-only use).',
    },
    {
      q: 'Are sports cones the same as utility green cones?',
      a: 'No. Sports / agility training cones are 4 to 12 inches tall, soft PVC or rubber, with a wide soft base for indoor floors. They have no reflective sheeting and are not weatherproof for outdoor utility work. Utility green cones are 18 to 28 inches with weighted bases and reflective collars.',
    },
    {
      q: 'How much do green traffic cones cost?',
      a: 'Sports cones (4-9 in): $1-$3 each, $40-$80 per case of 25-50. 12 in: $8-$12. 18 in: $10-$15. 28 in (utility): $15-$28. Green typically runs $1-$3 over the equivalent orange because of pigment cost and lower production volume.',
    },
    {
      q: 'Can I use green cones on my property if I want to?',
      a: 'Yes — on private property (parking lots, golf courses, sports fields, indoor warehouses, factories) you may use any cone color you wish. The MUTCD orange-only rule applies to public roadways and federal-aid projects. For private wayfinding, color choice is a branding and visibility decision, not a regulatory one.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Accessories & Hardware', path: '/category/accessories-hardware' },
    { label: 'Striping & Pavement Paint', path: '/category/striping-pavement-paint' },
    { label: 'Pedestrian & Crowd Control', path: '/category/pedestrian-control' },
  ],
  relatedArticles: [
    'blue-traffic-cones-guide',
    'red-cones-explained',
    'orange-cones-explained',
  ],
}
