import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic control signs" (~5K/mo, High comp) — FAQ-heavy AEO regulatory.
 * Differs from "road-signals-and-signs-guide" by focusing on the
 * work-zone TTC sign family specifically (regulatory, warning, guide).
 */
export const articleTrafficControlSignsMutcdGuide: Article = {
  slug: 'traffic-control-signs-mutcd-guide',
  title: 'Traffic Control Signs: The Three MUTCD Categories Every Contractor Has to Get Right',
  excerpt:
    'Every traffic control sign falls into one of three MUTCD categories — regulatory (white), warning (orange in work zones, yellow elsewhere), or guide. Each has different shape, color, and placement rules. Here is the working contractor reference.',
  metaDescription:
    'Traffic control signs explained: the three MUTCD categories (regulatory, warning, guide), color and shape rules, work-zone sign packages, and what each sign actually means.',
  primaryKeyword: 'traffic control signs',
  secondaryKeywords: [
    'traffic signs for sale',
    'work zone signs',
    'roll up signs',
    'mutcd signs',
    'construction signs',
    'regulatory signs',
    'warning signs',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-01',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Every ',
      h('strong', null, 'traffic control sign'),
      ' falls into one of three MUTCD categories — ',
      h('strong', null, 'regulatory, warning, or guide'),
      ' — and each category has its own shape and color rules that drivers (and inspectors) read instantly. ',
      'Regulatory signs are usually white background with black or red legend (STOP, YIELD, speed limits, regulatory work zone signs like ROAD CLOSED). ',
      'Warning signs are diamond-shaped: standard warning is yellow background, ',
      h('strong', null, 'work-zone warning is fluorescent orange'),
      ' background with the same diamond shape. ',
      'Guide signs are rectangular green or brown for navigation. ',
      'For a typical short-duration work zone in NJ, the contractor needs roughly 6–10 orange-diamond warning signs (W-series) plus 2–4 white regulatory signs (R-series), all on quick-deploy roll-up or rigid stands. The rest of this page is the working reference.',
    ),

    h('h2', null, 'The three MUTCD sign categories — what each one looks like'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'MUTCD prefix'),
            h('th', { className: 'text-left p-2 border-b' }, 'Shape'),
            h('th', { className: 'text-left p-2 border-b' }, 'Color (standard / work zone)'),
            h('th', { className: 'text-left p-2 border-b' }, 'Examples'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Regulatory'), h('td', { className: 'p-2' }, 'R'), h('td', { className: 'p-2' }, 'Mostly rectangular; STOP is octagonal, YIELD is triangle'), h('td', { className: 'p-2' }, 'White / black + red'), h('td', { className: 'p-2' }, 'STOP, YIELD, ROAD CLOSED, DO NOT ENTER, speed limits')),
          h('tr', null, h('td', { className: 'p-2' }, 'Warning'), h('td', { className: 'p-2' }, 'W'), h('td', { className: 'p-2' }, 'Diamond'), h('td', { className: 'p-2' }, 'Yellow / fluorescent orange (work zone)'), h('td', { className: 'p-2' }, 'ROAD WORK AHEAD, FLAGGER, LANE ENDS, DETOUR')),
          h('tr', null, h('td', { className: 'p-2' }, 'Guide'), h('td', { className: 'p-2' }, 'D / M'), h('td', { className: 'p-2' }, 'Rectangular'), h('td', { className: 'p-2' }, 'Green / brown / blue'), h('td', { className: 'p-2' }, 'EXIT, route markers, REST AREA, services')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'The reason for the color and shape system: drivers can identify the sign category from a much greater distance than they can read the legend. A flash of fluorescent orange in a diamond means "warning, work zone ahead" before the driver has read a single word. A red octagon means STOP whether you can read English or not. Inspectors verify the color and shape first; the legend is checked second.',
    ),

    h('h2', null, 'Regulatory signs (R-series) on a work zone'),
    h(
      'p',
      null,
      'Regulatory signs in a work zone are mostly the same R-series signs used elsewhere on the roadway: ROAD CLOSED (R11-2), DETOUR (M4-9 — technically a route marker), DO NOT ENTER (R5-1), and reduced speed signs in advance of the work area.',
    ),
    h(
      'p',
      null,
      'Common R-signs on a work-zone TCP:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'R11-2 ROAD CLOSED'), ' — at the closure point itself.'),
      h('li', null, h('strong', null, 'R11-3 ROAD CLOSED TO THRU TRAFFIC'), ' — when local access is preserved.'),
      h('li', null, h('strong', null, 'R2-1 SPEED LIMIT XX'), ' — reduced regulatory speed in the work zone.'),
      h('li', null, h('strong', null, 'R3-1 / R3-2 NO TURN'), ' — closing turns at the closure approach.'),
      h('li', null, h('strong', null, 'R4-7 KEEP RIGHT (chevron)'), ' — at the upstream end of a diversion.'),
      h('li', null, h('strong', null, 'R5-1 DO NOT ENTER'), ' — at one-way diversions or detour exits.'),
    ),
    h(
      'p',
      null,
      'Regulatory signs are enforceable. A driver running a R11-2 ROAD CLOSED sign is committing a moving violation — which is also why the legal posting of those signs is taken seriously by inspectors and DOT.',
    ),

    h('h2', null, 'Warning signs (W-series) — orange diamonds in a work zone'),
    h(
      'p',
      null,
      'Warning signs are the workhorses of a work-zone TCP. The diamond shape and fluorescent orange background tell drivers a hazard is ahead well before the legend can be read.',
    ),
    h(
      'p',
      null,
      'Common W-series signs on a typical short-duration NJ work zone:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'W20-1 ROAD WORK AHEAD'), ' — the canonical first warning sign in the advance warning area.'),
      h('li', null, h('strong', null, 'W20-7 FLAGGER'), ' — symbol sign, placed before the activity area when a flagger is on station.'),
      h('li', null, h('strong', null, 'W4-2 LANE ENDS (left/right)'), ' — at lane closures or merges.'),
      h('li', null, h('strong', null, 'W20-5 RIGHT LANE CLOSED AHEAD'), ' — text variant.'),
      h('li', null, h('strong', null, 'W21-1 WORKERS AHEAD'), ' — when workers are on or near the road.'),
      h('li', null, h('strong', null, 'W20-4 ONE LANE ROAD AHEAD'), ' — for alternating traffic flagger control.'),
      h('li', null, h('strong', null, 'W3-4 BE PREPARED TO STOP'), ' — before flagger or signal stations.'),
      h('li', null, h('strong', null, 'M4-9 DETOUR'), ' — at every decision point on a detour route.'),
    ),
    h(
      'p',
      null,
      'Spacing between signs in the advance warning area is set by MUTCD Table 6C-1 (or the post-2009 update tables) and depends on speed limit:',
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
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Posted speed'), h('th', { className: 'text-left p-2 border-b' }, 'A (first sign distance)'), h('th', { className: 'text-left p-2 border-b' }, 'B (second sign distance)'), h('th', { className: 'text-left p-2 border-b' }, 'C (third sign distance)')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '≤30 mph (urban)'), h('td', { className: 'p-2' }, '100 ft'), h('td', { className: 'p-2' }, '100 ft'), h('td', { className: 'p-2' }, '100 ft')),
          h('tr', null, h('td', { className: 'p-2' }, '35–40 mph'), h('td', { className: 'p-2' }, '350 ft'), h('td', { className: 'p-2' }, '350 ft'), h('td', { className: 'p-2' }, '350 ft')),
          h('tr', null, h('td', { className: 'p-2' }, '45–55 mph (rural)'), h('td', { className: 'p-2' }, '500 ft'), h('td', { className: 'p-2' }, '500 ft'), h('td', { className: 'p-2' }, '500 ft')),
          h('tr', null, h('td', { className: 'p-2' }, '≥55 mph (expressway/freeway)'), h('td', { className: 'p-2' }, '1,000 ft'), h('td', { className: 'p-2' }, '1,500 ft'), h('td', { className: 'p-2' }, '2,640 ft (½ mi)')),
        ),
      ),
    ),
    h(
      'p',
      null,
      h('em', null, 'Verify spacing tables against the current edition of the MUTCD or the project-specific NJDOT TCP — chapter and table numbers shift with revisions.'),
    ),

    h('h2', null, 'Guide signs in work zones'),
    h(
      'p',
      null,
      'Guide signs are the green and brown rectangular navigational signs (EXIT 12, route shields, REST AREA, etc.) — most are permanent infrastructure, not contractor inventory. The exception in a work zone is the ',
      h('strong', null, 'M4-9 DETOUR sign'),
      ' (technically a route marker), which a contractor may need to deploy at every decision point along a detour route.',
    ),
    h(
      'p',
      null,
      'On a long detour, the contractor must place a M4-9 DETOUR sign at every turn, intersection, and re-entry point. Missing a single decision point sends drivers off-route and is one of the most common cited issues on a detour TCP review.',
    ),

    h('h2', null, 'Roll-up signs vs. rigid signs'),
    h(
      'p',
      null,
      'Work-zone signs come in two physical formats:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Roll-up signs (vinyl on a fiberglass X-frame).'), ' Fold flat for transport, deploy in 30–60 seconds. The standard for short-duration work zones. Sizes: 36 in (low speed), 48 in (most jobs), 60 in (highway).'),
      h('li', null, h('strong', null, 'Rigid signs (aluminum on a sign stand).'), ' Standard for long-duration work zones (>3 days), DOT projects, or anywhere the sign needs to survive weather and time. Use folding sign stands or post-mount.'),
    ),
    h(
      'p',
      null,
      'Most contractors carry a kit of roll-up signs sized for the most-frequent road class they work, plus a few rigid ROAD CLOSED and DETOUR signs for jobs that run multiple days.',
    ),

    h('h2', null, 'A typical short-duration NJ work-zone sign package'),
    h(
      'p',
      null,
      'For a single-lane closure on a 40 mph two-lane road in NJ — the most common job for a small contractor — the typical sign package is:',
    ),
    h(
      'ul',
      null,
      h('li', null, '1× W20-1 ROAD WORK AHEAD (48 in roll-up) at 350 ft upstream'),
      h('li', null, '1× W20-7 FLAGGER (48 in roll-up) at 350 ft from activity area, if flagged'),
      h('li', null, '1× W4-2 LANE ENDS (48 in roll-up) at the start of the taper'),
      h('li', null, '1× R2-1 reduced SPEED LIMIT (48 in roll-up) in the advance warning area, if speed reduction is approved'),
      h('li', null, '1× R11-2 ROAD CLOSED (rigid, 48 in) at the closure point if applicable'),
      h('li', null, '1× G20-2 END ROAD WORK (48 in roll-up) at the downstream end of the work zone'),
    ),
    h(
      'p',
      null,
      'Plus sign stands sized for each, and ballast (sandbag, base plate) on each stand. Total kit cost: roughly $1,400–$2,200 retail depending on sign sizes and stand grades.',
    ),
    h(
      'p',
      null,
      'For a deeper TCP walkthrough, see our ',
      h('a', { href: '/blog/temporary-traffic-control-plan-utility-job' }, 'temporary traffic control plan guide for utility jobs'),
      ' or our ',
      h('a', { href: '/blog/njdot-work-zone-standards-contractor-reference' }, 'NJDOT work zone standards reference'),
      '.',
    ),

    h('h2', null, 'Sign sheeting grades — Type IV minimum for work zones'),
    h(
      'p',
      null,
      'Like cones, traffic control signs have a retroreflective sheeting grade. The MUTCD requires Type IV (high-intensity prismatic) or better for any sign in a work zone. Engineer-grade (Type I/II) sheeting is cheaper but fails nighttime visibility — never spec it for a road sign.',
    ),
    h(
      'p',
      null,
      'For high-speed roads, Type XI prismatic (diamond-grade) sheeting offers higher retroreflectivity at wider angles and is increasingly required by NJDOT on freeway-speed work zones.',
    ),

    h('h2', null, 'Where to buy traffic control signs in NJ (same-day)'),
    h(
      'p',
      null,
      'For Central NJ contractors, ',
      h('a', { href: '/category/signs-sign-stands' }, 'browse our signs and sign stands'),
      ' — roll-up vinyl signs in 36 / 48 / 60 inch, rigid aluminum signs, and folding sign stands. Same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean counties.',
    ),
    h(
      'p',
      null,
      'For a project-specific sign package, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with the road class, speed limit, project duration, and TCP requirements. Or use the ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' to lay out the work zone and back into the sign list automatically.',
    ),

    h('h2', null, 'Common traffic control sign mistakes'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Yellow warning signs in a work zone.'), ' Standard warning is yellow; work-zone warning is fluorescent orange. Yellow W-series in an active work zone is a cite.'),
      h('li', null, h('strong', null, 'Wrong advance-warning spacing.'), ' Putting the W20-1 at 100 ft instead of 350 ft on a 40 mph road. Inspectors measure with a wheel.'),
      h('li', null, h('strong', null, 'Missing END ROAD WORK at the downstream end.'), ' Frequently forgotten and frequently cited.'),
      h('li', null, h('strong', null, 'Engineer-grade sheeting on roll-up signs.'), ' Type IV minimum. Verify the sheeting grade on the manufacturer\'s spec sheet — many imported roll-ups use Type I sheeting and look identical until tested at night.'),
      h('li', null, h('strong', null, 'Sign stands without ballast.'), ' Wind tips an unbeasted X-frame stand routinely. Use a 25-lb sandbag or a base plate on every stand.'),
    ),
  ),
  faqs: [
    {
      q: 'What are the three categories of traffic control signs?',
      a: 'Per the MUTCD, every traffic control sign falls into one of three categories: regulatory (R-series, mostly white background with black/red legend, like STOP and ROAD CLOSED), warning (W-series, diamond-shaped, yellow background standard / fluorescent orange in work zones, like ROAD WORK AHEAD), or guide (D/M-series, green or brown rectangular signs for navigation). Each category has its own shape and color rules so drivers can identify the sign type from a distance.',
    },
    {
      q: 'What color are work zone traffic control signs?',
      a: 'Warning signs in a work zone are fluorescent orange diamond-shape (W-series). Regulatory signs are white with black/red legend (R-series) — the same as elsewhere on the roadway. Guide signs are green or brown rectangles. Yellow warning signs are NOT MUTCD-compliant inside an active work zone — work-zone warning is orange.',
    },
    {
      q: 'How far apart should work zone signs be placed?',
      a: 'Per MUTCD Table 6C-1, the advance warning area sign spacing depends on posted speed: 100 ft each at ≤30 mph (urban), 350 ft each at 35–40 mph, 500 ft each at 45–55 mph rural, and 1,000 / 1,500 / 2,640 ft on freeways. Verify against the current MUTCD edition and the project TCP — table numbers and exact distances shift with each revision.',
    },
    {
      q: 'What signs do I need for a typical small NJ work zone?',
      a: 'For a single-lane closure on a 40 mph road, the typical kit is: ROAD WORK AHEAD (W20-1), FLAGGER (W20-7) if flagged, LANE ENDS (W4-2), reduced SPEED LIMIT (R2-1) if approved, ROAD CLOSED (R11-2) at the closure if applicable, and END ROAD WORK (G20-2) at the downstream end. All as 48-inch roll-up signs on X-frame stands with ballast. Roughly 6–8 signs total.',
    },
    {
      q: 'Are roll-up signs MUTCD-compliant?',
      a: 'Yes, when the sheeting grade is Type IV or better (high-intensity prismatic). Roll-up signs are explicitly permitted by MUTCD for short-duration work zones and are the standard for most contractor TCPs. Verify the sheeting grade on the manufacturer\'s spec — engineer-grade Type I sheeting on a roll-up will fail nighttime retroreflectivity even if the sign looks identical in daylight.',
    },
    {
      q: 'Where can I buy traffic control signs near me in NJ?',
      a: 'We stock roll-up signs (36 / 48 / 60 inch), rigid aluminum signs, and folding sign stands with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean counties. Browse the signs and sign stands category, or request a quote with the road class, speed, and project duration for a project-specific kit.',
    },
  ],
  relatedProducts: [
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
  ],
  relatedArticles: [
    'road-signals-and-signs-guide',
    'pedestrian-crossing-signs-mutcd-guide',
    'temporary-traffic-control-plan-utility-job',
  ],
}
