import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "white traffic cones" (~500/mo, High comp, $10.16 bid).
 * Decision-tree structure: when to use white instead of orange,
 * sport vs. valet vs. interior vs. snow vs. wedding use cases,
 * and what the MUTCD actually permits.
 */
export const articleWhiteTrafficConesGuide: Article = {
  slug: 'white-traffic-cones-guide',
  title: 'White Traffic Cones: When to Use Them, When to Use Orange Instead',
  excerpt:
    'White traffic cones are NOT MUTCD-approved for road work — but they have legitimate uses for valet, weddings, sports practice, snow visibility, and interior facility routing. Here is the decision tree of when white is the right call.',
  metaDescription:
    'White traffic cones use cases: valet, sports, weddings, interiors, snow. Why they are not MUTCD road-legal, and the decision tree for when white beats orange.',
  primaryKeyword: 'white traffic cones',
  secondaryKeywords: [
    'white cones',
    'white safety cones',
    'white parking cones',
    'soccer cones',
    'valet cones',
    'wedding cones',
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
      h('strong', null, 'White traffic cones are not legal for federal-aid road work.'),
      ' The MUTCD specifies fluorescent orange (or fluorescent pink-orange for incident response) as the only acceptable cone colors in a public-roadway work zone. White cones still have plenty of legitimate uses — valet operations, weddings and events, sports practice, snow-cover visibility, and interior facility routing — but if your job is a road, white is the wrong color. Here is the decision tree.',
    ),

    h('h2', null, 'Quick decision tree: do I want white or orange?'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Public roadway, any speed, any duration → ORANGE.'), ' MUTCD §6F.64 requires fluorescent orange. White is not approved.'),
      h('li', null, h('strong', null, 'Private parking lot, valet, hotel arrival → WHITE OR ORANGE.'), ' Both work. White looks cleaner against asphalt and pairs with hospitality branding.'),
      h('li', null, h('strong', null, 'Wedding aisle, ceremony, country club → WHITE.'), ' Orange is jarring against formal wear and white linens.'),
      h('li', null, h('strong', null, 'Snow-covered ground (hangar, ski area, winter event) → WHITE IS A BAD CHOICE.'), ' Counterintuitive but true: white disappears against snow. Use orange or red.'),
      h('li', null, h('strong', null, 'Sports practice (soccer, lacrosse, drills) → WHITE OR ANY BRIGHT COLOR.'), ' Pick whatever contrasts the field. White on green grass works fine.'),
      h('li', null, h('strong', null, 'Interior warehouse / facility routing → WHITE OR ORANGE.'), ' White contrasts better against industrial gray flooring.'),
    ),

    h('h2', null, 'Why the MUTCD specifies orange (and not white)'),
    h(
      'p',
      null,
      'The federal MUTCD specifies fluorescent orange because it has the highest contrast against the most-common backgrounds in a roadway environment — asphalt black, concrete gray, grass green, and the human-eye background of vehicle paint colors. Fluorescent orange also stays visible at lower light levels than white, which goes "milky" at dusk and disappears against the gray-blue ambient of a cloudy day. White cones photograph well in catalog shots; they do not perform well at 45 mph in marginal light.',
    ),
    h(
      'p',
      null,
      'For nighttime visibility, both orange and white cones rely on reflective collars (Type IV high-intensity prismatic minimum). The reflective sheeting carries most of the night visibility regardless of body color, but the body color controls daytime conspicuity, and in daytime tests on real roadway backgrounds, fluorescent orange beats white.',
    ),

    h('h2', null, 'Use case 1 — valet, hotel arrival, country club'),
    h(
      'p',
      null,
      'White is the contractor-favorite color for hospitality applications. The reasons are aesthetic, not technical: white cones look cleaner against poured concrete drives, they pair with valet stand fabrics, and they read as "for guests" rather than "construction." For a hotel arrival lane, 18-inch white cones with a single thin reflective collar are the working standard. Stack 30 in a closet, deploy 12 at the curb, replace the faded ones each season.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Spec to buy:'),
      ' 18-inch white PVC cones with rubber base (4–7 lb), single 4-inch reflective collar. Pricing $8–$15 per cone in 12-pack quantities.',
    ),

    h('h2', null, 'Use case 2 — weddings and events on private property'),
    h(
      'p',
      null,
      'For weddings and ceremony rentals, the cone color is part of the visual production. White cones disappear into a white-flower aesthetic in a way orange cannot. Some wedding planners go further and order custom-printed cones with the couple\'s monogram, but for most planners 18-inch unmarked white cones are sufficient. Keep them out of the photographs by placing them on the parking-lot side of the property line, not the ceremony side.',
    ),

    h('h2', null, 'Use case 3 — sports practice'),
    h(
      'p',
      null,
      'Sports cones (sometimes called "soccer cones" or "drill cones") are typically 6-inch to 12-inch, color-coded by drill sequence, and made of soft PVC that does not injure a player who steps on one. White is one of several common colors — the choice is purely about field contrast and color-coded drill design. Coaches typically buy mixed-color sets (10 of each color) rather than a single-color set.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'Spec:'),
      ' 9-inch soft PVC cones in 10-pack mixed colors. Not weight-rated; not for any environment with vehicles.',
    ),

    h('h2', null, 'Use case 4 — interior facility routing'),
    h(
      'p',
      null,
      'For warehouses, hangars, distribution centers, and other indoor environments, the choice between white and orange is mostly about background contrast. Polished concrete and epoxy floors run gray to slate-blue, which orange contrasts well with. Older industrial gray-and-white tile or whitewashed walls washes out white cones — orange wins there too. The exception: facilities with safety branding in white (food-grade plants, pharmaceutical clean-zones) sometimes spec white cones to match the visual language of the rest of the safety equipment.',
    ),

    h('h2', null, 'Where white cones FAIL — read this before buying'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Snow.'), ' White cones disappear against snow. Use orange or red for any winter outdoor application.'),
      h('li', null, h('strong', null, 'Public roadway work.'), ' Federal MUTCD requires fluorescent orange. A municipal inspector can shut a job down for using white cones on a public road, even on a private contractor on a federal-aid project.'),
      h('li', null, h('strong', null, 'Yellowing UV exposure.'), ' White PVC yellows and grays after 12–18 months of full-sun exposure. White cones for outdoor use age worse than orange — they do not just fade, they discolor unevenly.'),
      h('li', null, h('strong', null, 'Photography contrast.'), ' For event photography, white cones photograph as gray smudges in low light; if visual cleanliness matters for the photos, get them out of the shot before the photographer arrives.'),
    ),

    h('h2', null, 'Sizes and base weights for white cones'),
    h(
      'p',
      null,
      'White cones are typically sold in the same size lineup as orange but skew smaller because most use cases are private-property:',
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
            h('th', { className: 'text-left p-2 border-b' }, 'Size'),
            h('th', { className: 'text-left p-2 border-b' }, 'Base'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best for'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical price'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '6–9 in (sport)'), h('td', { className: 'p-2' }, 'Soft, no separate base'), h('td', { className: 'p-2' }, 'Drills, indoor practice'), h('td', { className: 'p-2' }, '$3–$6 each')),
          h('tr', null, h('td', { className: 'p-2' }, '12 in'), h('td', { className: 'p-2' }, '2–4 lb'), h('td', { className: 'p-2' }, 'Indoor parking, retail, valet stand'), h('td', { className: 'p-2' }, '$6–$10 each')),
          h('tr', null, h('td', { className: 'p-2' }, '18 in'), h('td', { className: 'p-2' }, '4–7 lb'), h('td', { className: 'p-2' }, 'Hotel arrival, valet, weddings'), h('td', { className: 'p-2' }, '$8–$15 each')),
          h('tr', null, h('td', { className: 'p-2' }, '28 in'), h('td', { className: 'p-2' }, '7 lb'), h('td', { className: 'p-2' }, 'Private parking lots, large events'), h('td', { className: 'p-2' }, '$15–$28 each')),
        ),
      ),
    ),

    h('h2', null, 'White cone vs. orange cone — side-by-side'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Factor'), h('th', { className: 'text-left p-2 border-b' }, 'White cones'), h('th', { className: 'text-left p-2 border-b' }, 'Orange cones')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Daytime visibility, road bg'), h('td', { className: 'p-2' }, 'Lower'), h('td', { className: 'p-2' }, 'Higher')),
          h('tr', null, h('td', { className: 'p-2' }, 'Snow-cover visibility'), h('td', { className: 'p-2' }, 'Poor'), h('td', { className: 'p-2' }, 'Good')),
          h('tr', null, h('td', { className: 'p-2' }, 'Hospitality aesthetics'), h('td', { className: 'p-2' }, 'Better'), h('td', { className: 'p-2' }, 'Worse')),
          h('tr', null, h('td', { className: 'p-2' }, 'MUTCD road-legal'), h('td', { className: 'p-2' }, 'No'), h('td', { className: 'p-2' }, 'Yes')),
          h('tr', null, h('td', { className: 'p-2' }, 'UV color stability'), h('td', { className: 'p-2' }, 'Yellows/grays'), h('td', { className: 'p-2' }, 'Fades to pale')),
          h('tr', null, h('td', { className: 'p-2' }, 'Cost'), h('td', { className: 'p-2' }, 'Roughly equal'), h('td', { className: 'p-2' }, 'Roughly equal')),
        ),
      ),
    ),

    h('h2', null, 'Where to buy white traffic cones in NJ'),
    h(
      'p',
      null,
      'For Central NJ valet operators, hotel ops teams, country clubs, and event planners, ',
      h('a', { href: '/category/cones-drums' }, 'browse our cones catalog'),
      ' — we stock 12-inch and 18-inch white cones with rubber bases and single reflective collars, plus the matching orange units for the road-work side of the business. Same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon. For a custom kit (mixed colors, branded, or sized for a specific job), ',
      h('a', { href: '/quote' }, 'request a quote'),
      '.',
    ),
    h(
      'p',
      null,
      'If you are deciding between cones for an actual road-work zone — not a valet stand — read our ',
      h('a', { href: '/blog/road-cones-vs-traffic-cones' }, 'road cones vs traffic cones guide'),
      ' for the MUTCD size and reflectivity rules. White does not appear in that decision because the federal answer is unambiguously orange.',
    ),
  ),
  faqs: [
    {
      q: 'Are white traffic cones MUTCD-approved?',
      a: 'No. The MUTCD specifies fluorescent orange (or fluorescent pink-orange for incident response) as the only acceptable cone body colors in a public-roadway work zone. White cones are not approved for federal-aid roadway work and a DOT inspector will cite them.',
    },
    {
      q: 'When should I use white cones instead of orange?',
      a: 'Private-property hospitality applications: hotel arrival, valet, country clubs, weddings, country clubs. Sports practice and indoor facility routing also work in white. Avoid white in any environment with snow cover (white-on-snow disappears) or on any public roadway.',
    },
    {
      q: 'Do white cones work in snow?',
      a: 'Poorly. White cones disappear against snow at any distance over 30 ft. For winter outdoor use (ski areas, hangars, snow events), use orange or red cones. The reflective collar helps at night but daytime visibility against snow is the failure mode.',
    },
    {
      q: 'How much do white traffic cones cost?',
      a: 'Sport-style 6–9 in: $3–$6 each. 12 in indoor cones with light base: $6–$10 each. 18 in valet/hospitality cones: $8–$15 each. 28 in cones for private-property road work: $15–$28 each. Reflective grade and order quantity drive most of the spread.',
    },
    {
      q: 'Why do hotels use white cones instead of orange?',
      a: 'Aesthetics. White cones blend into a hospitality visual environment (white-painted curbs, stone-paved drives, branded valet stands) where orange reads as "construction" and undermines the brand. The choice is not safety-driven; both colors work in low-speed private-property environments.',
    },
    {
      q: 'Do white cones fade or yellow over time?',
      a: 'Yes — white PVC yellows and turns gray after 12–18 months of full-sun UV exposure, and the discoloration is uneven (the sun-facing side ages faster). For outdoor use, plan to replace white cones every 18 months. Indoor white cones last 5+ years with normal use.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Pedestrian & Crowd Control', path: '/category/pedestrian-control' },
    { label: 'Accessories & Hardware', path: '/category/accessories-hardware' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
  ],
  relatedArticles: [
    'road-cones-vs-traffic-cones',
    'orange-cones-explained',
    'parking-cones-buying-guide',
  ],
}
