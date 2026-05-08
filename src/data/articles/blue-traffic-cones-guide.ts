import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "blue traffic cones" (~500/mo, High comp, $10.98 bid).
 * FAQ-heavy AEO structure: front-loaded direct-answer paragraphs and a
 * deep FAQ block aimed at AI-overview surfaces. Covers what blue cones
 * actually mean (utility / fire-hydrant / accessibility / handicap parking),
 * MUTCD non-applicability, and where they show up legitimately.
 */
export const articleBlueTrafficConesGuide: Article = {
  slug: 'blue-traffic-cones-guide',
  title: 'Blue Traffic Cones: What They Mean, Where to Use Them, and the MUTCD Truth',
  excerpt:
    'Blue traffic cones are not a MUTCD-recognized roadway color. They show up in three legitimate places: utility/water-line work, fire-hydrant marking, and ADA accessible-parking visualization — but the federal road-work rule is still orange.',
  metaDescription:
    'Blue traffic cones explained: utility-line marking, fire-hydrant visibility, ADA accessible parking. Why they are not MUTCD road-legal and where blue is the right choice.',
  primaryKeyword: 'blue traffic cones',
  secondaryKeywords: [
    'blue cones',
    'utility cones',
    'water line marking cones',
    'ADA cones',
    'fire hydrant cones',
    'blue safety cones',
  ],
  targetVolume: 500,
  datePublished: '2026-05-08',
  readMinutes: 6,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'Blue traffic cones are not MUTCD-approved for federal-aid roadway work.'),
      ' But blue does have three legitimate, common-in-the-field uses: marking water and utility lines (matching the APWA color code for water mains), flagging fire hydrants for visibility, and visualizing ADA accessible-parking compliance. If you are buying blue cones, the question is which of those three jobs you are doing — because the size, base, and reflective spec change for each.',
    ),

    h('h2', null, 'Direct answers (read this first)'),
    h(
      'p',
      null,
      h('strong', null, 'Are blue traffic cones legal for road work?'),
      ' No. The federal MUTCD specifies fluorescent orange (or fluorescent pink-orange for incident response) for all public-roadway channelizing devices. Blue cones can be cited on a DOT inspection.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'What does a blue traffic cone mean?'),
      ' On a utility job site, blue follows the APWA Uniform Color Code for underground utilities — blue marks potable water lines. On hospitality or retail property, blue often marks fire hydrants for visibility or ADA accessible-parking corridors. There is no national driver-facing meaning for blue on a public road.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'What size blue cone do I need?'),
      ' For utility marking and fire-hydrant visibility, 18-inch or 28-inch with a 4–7 lb base is standard. For ADA parking-stall visualization, 12-inch or 18-inch on a small base is typical.',
    ),

    h('h2', null, 'Use case 1 — APWA utility marking (water mains)'),
    h(
      'p',
      null,
      'The American Public Works Association Uniform Color Code is the recognized utility-locate standard in the U.S. The colors are: red for electric, yellow for gas/oil/steam, orange for telecom, blue for potable water, green for sewer, purple for reclaimed water, white for proposed excavation, pink for survey marks. Most utility marking is paint and flags, but contractors who want a 3D-visible reminder during the dig — especially on a multi-day excavation where flags get stepped on — use cones color-matched to the code.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Spec for utility cones:'),
      ' 28-inch blue cones with 7-lb base, single 4-inch reflective collar. The reflective grade matters because utility excavation often runs into evening hours and the cones live next to active equipment. Diamond-grade sheeting outlasts engineer-grade in this environment.',
    ),

    h('h2', null, 'Use case 2 — fire hydrant visibility'),
    h(
      'p',
      null,
      'Some municipalities, fire departments, and private property managers place blue cones over or beside fire hydrants — particularly during snow events or when surrounding parking would otherwise hide the hydrant from arriving fire apparatus. (The AASHTO/MUTCD reflective standard for hydrants themselves is the small blue raised pavement marker placed in the centerline opposite each hydrant; cones are a supplement, not a replacement.)',
    ),
    h(
      'p',
      null,
      'For winter use specifically, a tall (28–36 in) blue cone over a hydrant outperforms small flag markers because plow drivers can see the cone earlier. For summer event use (festivals, parking-lot setups), blue cones near hydrants flag the no-park zone explicitly to attendants.',
    ),

    h('h2', null, 'Use case 3 — ADA accessible-parking visualization'),
    h(
      'p',
      null,
      'The wheelchair-accessibility blue (specifically International Symbol of Accessibility blue, Federal Standard 595 #15090) shows up on accessible-parking signs, pavement marking, and curb paint. Some property managers extend that visual language to cones placed at the corners of accessible-parking stalls during a re-stripe, snow event, or when a ramp is being temporarily blocked. Blue cones at ADA stalls communicate to drivers that the stall is "owned" by the accessibility program — a useful visual cue that orange does not deliver.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Important:'),
      ' blue cones are NOT a substitute for the MUTCD R7-8 accessible-parking sign or the painted blue stall + symbol. They are an addition during temporary disruption.',
    ),

    h('h2', null, 'Where blue cones DO NOT belong'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Public roadway work zones.'), ' Federal MUTCD requires fluorescent orange. Blue is not approved.'),
      h('li', null, h('strong', null, 'Lane closures.'), ' Same rule — orange-only.'),
      h('li', null, h('strong', null, 'Detour routing.'), ' Same rule.'),
      h('li', null, h('strong', null, 'Anywhere a DOT inspector might see them.'), ' Even on a private contractor on a federal-aid project, blue cones on the active-work side of the work zone can be cited.'),
    ),

    h('h2', null, 'How blue cones are sold'),
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
          h('tr', null, h('td', { className: 'p-2' }, '12 in'), h('td', { className: 'p-2' }, '2–4 lb'), h('td', { className: 'p-2' }, 'ADA stall corners, indoor wayfinding'), h('td', { className: 'p-2' }, '$8–$12 each')),
          h('tr', null, h('td', { className: 'p-2' }, '18 in'), h('td', { className: 'p-2' }, '4–7 lb'), h('td', { className: 'p-2' }, 'Utility flagging, hydrant marking, low-speed PP work'), h('td', { className: 'p-2' }, '$10–$15 each')),
          h('tr', null, h('td', { className: 'p-2' }, '28 in'), h('td', { className: 'p-2' }, '7 lb'), h('td', { className: 'p-2' }, 'APWA utility cones for active excavation'), h('td', { className: 'p-2' }, '$15–$28 each')),
          h('tr', null, h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, '10–12 lb'), h('td', { className: 'p-2' }, 'Snow-cover hydrant visibility, large utility job'), h('td', { className: 'p-2' }, '$28–$45 each')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Blue cones are typically priced $1–$3 above the equivalent orange cone because the blue PVC pigment costs more and demand volume is lower. Custom-printed blue cones (with a logo, "FIRE HYDRANT," or "UTILITY") add $4–$8 per cone in 50-unit minimums.',
    ),

    h('h2', null, 'How to extend blue cone life'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Store indoors between jobs.'), ' UV degradation on blue PVC is faster than orange — blue fades to gray-green within 18 months of full sun.'),
      h('li', null, h('strong', null, 'Specify diamond-grade reflective.'), ' Reflective collars on blue cones often have to compete with brighter ambient (parking-lot lighting, headlight wash) so high-grade sheeting matters.'),
      h('li', null, h('strong', null, 'Pair with weighted bases.'), ' If the blue cones are over hydrants in winter, plow wash will blow lighter cones off-station; spec 7 lb minimum.'),
      h('li', null, h('strong', null, 'Color-match the entire kit.'), ' If you are doing APWA color-coded work, buy red, yellow, orange, green, blue, and white in the same brand so the heights and bases are interchangeable across the fleet.'),
    ),

    h('h2', null, 'Blue cones vs. other utility-color cones'),
    h(
      'p',
      null,
      'Most utility contractors who buy blue also buy red (electric), yellow (gas), and green (sewer) — a complete APWA-coded set. Red and yellow are the most-deployed utility colors because gas and electric lines are more common to mark than water; blue and green run distant third. If you are starting a utility-cone fleet, the typical contractor recipe is 20× orange (general), 15× yellow, 10× red, 8× blue, 8× green, with 4–6 white for proposed-excavation marking. Total kit: roughly $700–$1,200.',
    ),

    h('h2', null, 'Where to buy blue traffic cones in NJ'),
    h(
      'p',
      null,
      'For Central NJ utility contractors, plumbers running water-line cut-overs, fire-services teams, and property managers, ',
      h('a', { href: '/category/cones-drums' }, 'browse our cones catalog'),
      ' — we stock 18-inch and 28-inch blue cones with 7-lb bases and reflective collars, plus the matching APWA color set (red, yellow, green, white) for full utility-coded work. Same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon. For a custom-printed run with your company name or "WATER LINE" / "FIRE HYDRANT" stencil, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with the cone count and stencil text.',
    ),
    h(
      'p',
      null,
      'If your job is actually a public-road work zone — not utility marking, not hydrant flagging, not ADA visualization — read our ',
      h('a', { href: '/blog/orange-cones-explained' }, 'orange cones explainer'),
      ' for the MUTCD-compliant spec. Blue cones do not belong on the active road.',
    ),
  ),
  faqs: [
    {
      q: 'Are blue traffic cones MUTCD-approved?',
      a: 'No. The federal MUTCD specifies fluorescent orange (or fluorescent pink-orange for incident response) as the only acceptable cone body colors in a public-roadway work zone. Blue cones are not approved for federal-aid roadway work.',
    },
    {
      q: 'What does a blue traffic cone mean on a utility site?',
      a: 'Blue follows the APWA Uniform Color Code: blue marks potable water lines. Other APWA colors: red (electric), yellow (gas/oil/steam), orange (telecom), green (sewer), purple (reclaimed water), white (proposed excavation), pink (survey).',
    },
    {
      q: 'Why do some buildings put blue cones around fire hydrants?',
      a: 'Visibility — particularly during snow events or when surrounding parking would hide the hydrant from arriving fire apparatus. Tall (28–36 in) blue cones are visible from greater distance than the standard reflective hydrant marker, which makes them useful as a temporary supplement during winter or events.',
    },
    {
      q: 'Are blue cones related to ADA accessible parking?',
      a: 'Yes — some property managers use blue cones to mark accessible-parking stall corners during temporary disruption (re-stripe, snow event, ramp work). The blue matches the International Symbol of Accessibility color (Federal Standard 595 #15090). The cones are NOT a replacement for the MUTCD R7-8 sign or the painted stall — they are an addition.',
    },
    {
      q: 'How much do blue traffic cones cost?',
      a: '12 in: $8–$12 each. 18 in with 4–7 lb base: $10–$15. 28 in with 7 lb base: $15–$28. 36 in with 10–12 lb base: $28–$45. Blue typically runs $1–$3 over the equivalent orange because of pigment cost and lower production volume.',
    },
    {
      q: 'How long do blue cones last outdoors?',
      a: '12–18 months in full sun before noticeable color shift to gray-green. Diamond-grade reflective collars last 5+ years on the body. For year-round outdoor use, expect to replace cones on the annual buying cycle. Indoor or partial-shade use extends body life to 5–7 years.',
    },
    {
      q: 'Can I use blue cones for any road work?',
      a: 'No. The federal MUTCD requires fluorescent orange. Even on a private contractor or in a private parking lot, if the work zone is on or accessible to a public roadway and you are working under a federal-aid project (or any DOT permit), blue cones can trigger an inspection violation. Use orange for road work; reserve blue for utility marking, hydrant visibility, or ADA visualization on private property.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Accessories & Hardware', path: '/category/accessories-hardware' },
    { label: 'Pedestrian & Crowd Control', path: '/category/pedestrian-control' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
  ],
  relatedArticles: [
    'orange-cones-explained',
    'white-traffic-cones-guide',
    'red-cones-explained',
  ],
}
