import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * PILLAR — Targets "pedestrian signs" (~5000/mo, High comp, $17.91 bid).
 * Broader umbrella above pedestrian-crossing-signs-mutcd-guide and
 * pedestrian-crosswalk-signs-mutcd. Covers warning + regulatory + guide
 * + work-zone categories so it can rank for the unmodified head term.
 */
export const articlePedestrianSignsPillarGuide: Article = {
  slug: 'pedestrian-signs-pillar-guide',
  title: 'Pedestrian Signs: A Complete Guide to MUTCD Categories, Sizes, and What to Buy',
  excerpt:
    'Pedestrian signs cover four MUTCD categories — warning (W11-2), regulatory (R1-6, R9-3), guide, and temporary work-zone (W11-15a). Here is what each does, the sizes you actually need, and how to choose between in-ground, portable, and overhead mounts.',
  metaDescription:
    'Pedestrian signs explained: MUTCD categories (W11-2, R1-6, R9-3), legal sizes for streets vs. private property, mounting types, and a buying checklist for contractors and property managers.',
  primaryKeyword: 'pedestrian signs',
  secondaryKeywords: [
    'pedestrian crossing signs',
    'pedestrian crosswalk signs',
    'walking signs',
    'pedestrian warning signs',
    'pedestrian regulatory signs',
    'state law yield to pedestrian sign',
    'in-street pedestrian sign',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-03',
  readMinutes: 10,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      '"Pedestrian signs" is an umbrella term covering ',
      h('strong', null, 'four MUTCD categories'),
      ': warning (yellow diamond W11-2), regulatory (white rectangle R1-6 / R9-3), guide (blue or green directional), and temporary work-zone (orange W11-15a). Each category has its own legal sizing, placement rule, and buying decision. The shortcut: if you are wondering which to install at a crosswalk, you almost certainly need a W11-2 warning sign on the approach AND an R1-6 in-street post at the crossing line itself. The rest of this guide unpacks why, and what to order for streets, parking lots, schools, and work zones.',
    ),

    h('h2', null, 'The four MUTCD categories — at a glance'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Category'),
            h('th', { className: 'text-left p-2 border-b' }, 'Color & shape'),
            h('th', { className: 'text-left p-2 border-b' }, 'Common codes'),
            h('th', { className: 'text-left p-2 border-b' }, 'Purpose'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Warning'), h('td', { className: 'p-2' }, 'Yellow diamond'), h('td', { className: 'p-2' }, 'W11-2, W11-15, S1-1'), h('td', { className: 'p-2' }, 'Alerts drivers to a potential pedestrian conflict ahead')),
          h('tr', null, h('td', { className: 'p-2' }, 'Regulatory'), h('td', { className: 'p-2' }, 'White rectangle, black/red text'), h('td', { className: 'p-2' }, 'R1-6, R1-6a, R9-3, R9-3a'), h('td', { className: 'p-2' }, 'Imposes a legal duty (yield, no crossing, use crosswalk)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Guide'), h('td', { className: 'p-2' }, 'Green or blue rectangle'), h('td', { className: 'p-2' }, 'D1, D3 series'), h('td', { className: 'p-2' }, 'Directional wayfinding for pedestrian routes')),
          h('tr', null, h('td', { className: 'p-2' }, 'Temporary work-zone'), h('td', { className: 'p-2' }, 'Orange diamond'), h('td', { className: 'p-2' }, 'W11-15a, R9-9, R9-10'), h('td', { className: 'p-2' }, 'Manages pedestrians around construction or detours')),
        ),
      ),
    ),

    h('h2', null, 'Warning signs — the W11-2 family'),
    h(
      'p',
      null,
      'The W11-2 yellow diamond — black silhouette of a walker — is the most-installed pedestrian sign in the US. Place it on the approach side of a crosswalk, mid-block crossing, school zone, or any location where drivers might not expect pedestrians. Standard size on streets is ',
      h('strong', null, '30 in × 30 in'),
      ' for posted speed ≤ 35 mph and ',
      h('strong', null, '36 in × 36 in'),
      ' for higher-speed approaches. School-zone variants (S1-1) use a five-sided pentagon shape and a fluorescent yellow-green sheeting that grades as Type IX or Type XI for high-conspicuity retroreflectivity.',
    ),
    h(
      'p',
      null,
      'A common mistake is installing the W11-2 AT the crosswalk instead of upstream. MUTCD §2C.05 wants the warning placed on the approach, with advance distance scaled to the posted speed (about 100 ft for 25 mph, 175 ft for 35 mph). Pair the upstream warning with a regulatory sign at the crossing line itself.',
    ),

    h('h2', null, 'Regulatory signs — R1-6 in-street, R9-3 prohibition'),
    h(
      'p',
      null,
      'The R1-6 ("State Law: Yield to Pedestrian Within Crosswalk") is the white-and-black in-street post that mounts in the road centerline, directly between travel lanes at the crosswalk. It is the highest-impact compliance device for marked uncontrolled crossings — federal studies show driver yield rates jump from ~30% to ~80% when an R1-6 is installed. Variants:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'R1-6:'), ' standard "Yield" wording — used for low-speed streets (≤ 35 mph posted)'),
      h('li', null, h('strong', null, 'R1-6a:'), ' "Stop Here for Pedestrian" — used where state law requires a full stop'),
      h('li', null, h('strong', null, 'R1-9:'), ' "Yield Here to Pedestrians" — placed at the yield line in advance of the crosswalk on multi-lane approaches'),
    ),
    h(
      'p',
      null,
      'In-street R1-6 posts must be MASH-tested for crashworthiness in most jurisdictions. They use a flexible base (urethane or spring-steel) so a vehicle impact deflects them rather than throwing the post into the windshield. Cheap rigid in-street posts are NOT MUTCD-compliant for in-road use; reserve those for shoulder mounting only.',
    ),
    h(
      'p',
      null,
      'The R9-3 ("No Pedestrian Crossing") is the regulatory PROHIBITION sign — used at locations where pedestrians are not allowed to cross (highway shoulders, restricted access points). Pair with R9-3a ("Use Crosswalk") that arrows pedestrians to the legal crossing point.',
    ),

    h('h2', null, 'Guide signs — D series'),
    h(
      'p',
      null,
      'Guide signs for pedestrians are blue (services) or green (directional). Common uses: D1 series for trail wayfinding, hospital-route signage on campus, and pedestrian transit-stop guidance. These are less safety-critical than warning/regulatory and are often custom-fabricated for the location, but the MUTCD still specifies font (Highway Gothic), color contrast, and minimum legibility distances.',
    ),

    h('h2', null, 'Temporary work-zone — W11-15a, R9-9, R9-10'),
    h(
      'p',
      null,
      'When construction blocks a sidewalk, MUTCD Part 6 requires a posted detour or a continuous pedestrian channel. The relevant signs:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'W11-15a:'), ' Orange diamond, "Sidewalk Closed Ahead" — placed at the upstream decision point so pedestrians can re-route before reaching the closure'),
      h('li', null, h('strong', null, 'R9-9:'), ' "Sidewalk Closed" — placed AT the sidewalk closure with a directional arrow'),
      h('li', null, h('strong', null, 'R9-10:'), ' "Sidewalk Closed — Use Other Side" — for closures where the detour is across the street'),
      h('li', null, h('strong', null, 'R9-11:'), ' "Cross Here" — at the crosswalk that begins the detour'),
    ),
    h(
      'p',
      null,
      'These are orange (work-zone) instead of yellow (permanent warning) — a key MUTCD distinction. If your supplier ships a yellow W11-15 for a construction job, the inspector can write a non-conformance.',
    ),

    h('h2', null, 'Sizing — the table that actually matters'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Application'), h('th', { className: 'text-left p-2 border-b' }, 'Min size'), h('th', { className: 'text-left p-2 border-b' }, 'Recommended')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Local street ≤ 30 mph'), h('td', { className: 'p-2' }, '24 in'), h('td', { className: 'p-2' }, '30 in')),
          h('tr', null, h('td', { className: 'p-2' }, 'Collector / arterial 35 mph'), h('td', { className: 'p-2' }, '30 in'), h('td', { className: 'p-2' }, '36 in')),
          h('tr', null, h('td', { className: 'p-2' }, 'Highway / 45+ mph'), h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, '48 in')),
          h('tr', null, h('td', { className: 'p-2' }, 'Parking lot / private property'), h('td', { className: 'p-2' }, '18 in'), h('td', { className: 'p-2' }, '24 in')),
          h('tr', null, h('td', { className: 'p-2' }, 'School zone'), h('td', { className: 'p-2' }, '30 in'), h('td', { className: 'p-2' }, '36 in fluorescent yellow-green')),
        ),
      ),
    ),
    h('p', null, 'Private property installations on parking lots and campuses can use 18–24 in signs because driver speeds are lower and the signs are closer to the eye. For any on-street installation, default to the 30 in or 36 in size unless your local DOT specifies otherwise.'),

    h('h2', null, 'Mounting — in-ground vs. portable vs. overhead'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'In-ground (U-channel post):'), ' permanent. 12-gauge galvanized U-channel post, set in concrete or driver-installed. Best for permanent crosswalks, school zones, and residential signage.'),
      h('li', null, h('strong', null, 'Portable (rubber base / spring steel):'), ' R1-6 in-street type. Sets up in 5 minutes for events, school crossings, or construction. The weighted rubber base resists displacement from wind and minor vehicle contact.'),
      h('li', null, h('strong', null, 'Overhead (mast arm / span wire):'), ' for high-volume mid-block crossings, RRFB-equipped beacons, or HAWK signal installations. These are engineered installs, not off-the-shelf orders.'),
      h('li', null, h('strong', null, 'Roll-up (vinyl on flexible frame):'), ' work-zone temporary use only. Folds for transport, sets up on a tripod. Legal for short-duration TTC; not durable enough for permanent install.'),
    ),

    h('h2', null, 'Sheeting grade — the spec that drives night visibility'),
    h(
      'p',
      null,
      'MUTCD sets minimum retroreflectivity for nighttime visibility. The sheeting grades, cheapest to brightest:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Engineer Grade (Type I):'), ' obsolete for street signs; legal only for some private-property uses'),
      h('li', null, h('strong', null, 'High-Intensity Prismatic (Type IV):'), ' the workhorse for most pedestrian signs on local/collector streets'),
      h('li', null, h('strong', null, 'Diamond Grade (Type IX or XI):'), ' required for school zones, RRFB systems, and most state-DOT pedestrian sign specs'),
    ),
    h(
      'p',
      null,
      'When you order: ask the supplier for the sheeting type. A sign that meets the MUTCD legend but uses Engineer Grade sheeting will fail a night-visibility audit — and that is the audit pedestrian-related signs get the most often.',
    ),

    h('h2', null, 'What to buy first'),
    h(
      'p',
      null,
      'For a contractor or property manager outfitting a working set of pedestrian signs:',
    ),
    h(
      'ul',
      null,
      h('li', null, '4× R1-6 in-street posts with weighted rubber bases (covers the typical lot or campus crosswalks)'),
      h('li', null, '4× W11-2 yellow diamond warning signs at 30 in, with U-channel posts'),
      h('li', null, '2× W11-15a orange "Sidewalk Closed Ahead" for any pavement / sidewalk work'),
      h('li', null, '2× R9-9 "Sidewalk Closed" with arrow for closures'),
      h('li', null, '4× cone-mount sign brackets for ad-hoc temporary deployments'),
    ),

    h('h2', null, 'When to skip MUTCD and use a custom sign'),
    h(
      'p',
      null,
      'MUTCD does not apply to private property — parking lots, campuses, and gated communities. You can legally use custom messaging ("Caution: Children at Play", "Slow — Children", branded crossing messages) on private property as long as you do not mimic regulatory MUTCD signs in a way that confuses drivers. The catch: the moment your private road connects to a public street, MUTCD applies at the connection point. So a campus interior can use custom signs, but the entrance crossings need real R1-6 / W11-2 hardware.',
    ),

    h('h2', null, 'Where to buy pedestrian signs in NJ'),
    h(
      'p',
      null,
      'Browse our ',
      h('a', { href: '/category/signs-sign-stands' }, 'signs and sign stands category'),
      ' for MUTCD-compliant pedestrian sign packages — W11-2, R1-6, W11-15a, U-channel posts, and rubber-base in-street kits in stock. For a custom set sized to a school, lot, or work-zone job, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' or ask the ',
      h('a', { href: '/assistant' }, 'AI Assistant'),
      ' which signs your jobsite needs — same-day Central NJ delivery.',
    ),
  ),
  faqs: [
    {
      q: 'What is the standard size for a pedestrian crossing sign?',
      a: 'On posted streets, 30 in × 30 in for speeds ≤ 35 mph and 36 in × 36 in for higher-speed approaches. School zones require 36 in fluorescent yellow-green sheeting (Type IX or XI). On private property and parking lots you can drop to 18 in or 24 in because driver speeds and viewing distances are lower.',
    },
    {
      q: 'Are R1-6 in-street pedestrian signs legally required?',
      a: 'Not federally required, but they are the highest-impact MUTCD device for marked uncontrolled crossings. Federal studies show driver yield rates jump from ~30% to ~80% when an R1-6 is installed. Many states (NJ, NY, MA among others) now require them at unsignalized crosswalks on multi-lane roads.',
    },
    {
      q: 'What is the difference between W11-2 and W11-15a pedestrian signs?',
      a: 'W11-2 is yellow (permanent warning) — used for crosswalks, school zones, and locations with regular pedestrian activity. W11-15a is orange (temporary work-zone) — used only when construction blocks a sidewalk and pedestrians need to re-route. Using yellow when you should use orange will fail an MUTCD inspection on a work zone.',
    },
    {
      q: 'Can I install a custom pedestrian sign on private property?',
      a: 'Yes. MUTCD does not apply to truly private property like parking lots, campuses, and gated communities. You can use custom wording, custom colors, and non-standard shapes. The exception: the connection points where private roads meet public streets must use MUTCD-compliant signs.',
    },
    {
      q: 'How far in advance of a crosswalk should the W11-2 sign be placed?',
      a: 'MUTCD §2C.05 ties advance placement to posted speed: about 100 ft upstream for 25 mph, 175 ft for 35 mph, 250 ft for 45 mph. Place it where a driver has time to perceive the warning, react, and slow down before reaching the crossing.',
    },
    {
      q: 'What sheeting grade do pedestrian signs need?',
      a: 'High-Intensity Prismatic (Type IV) is the minimum for most local and collector street installations. Diamond Grade (Type IX or XI) is required for school zones, RRFB systems, and most state-DOT pedestrian-sign specs. Engineer Grade (Type I) is obsolete for street use.',
    },
  ],
  relatedProducts: [
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'pedestrian-crossing-signs-mutcd-guide',
    'pedestrian-crosswalk-signs-mutcd',
    'traffic-control-signs-mutcd-guide',
  ],
}
