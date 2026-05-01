import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "construction cones" (~5K/mo, High comp) — definitional / explainer.
 * Reader is searching for the term "construction cones" specifically — they
 * want to know what they are, what makes one construction-rated, and what to buy.
 */
export const articleConstructionConesExplained: Article = {
  slug: 'construction-cones-explained',
  title: 'Construction Cones: What Makes a Cone "Construction-Grade" (and Why It Matters)',
  excerpt:
    '"Construction cones" is a search term for orange MUTCD-compliant cones used on active construction sites — but not every orange cone is construction-grade. Here is what separates a real construction cone from a hardware-store cone.',
  metaDescription:
    'Construction cones explained: what makes a cone "construction-grade," MUTCD size and reflectivity rules, and why hardware-store cones do not pass site inspections.',
  primaryKeyword: 'construction cones',
  secondaryKeywords: [
    'orange construction cones',
    'construction cones for sale',
    'large construction cones',
    'small construction cones',
    'road construction cones',
    'large orange cones',
    'orange cones',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-01',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A ',
      h('strong', null, 'construction cone'),
      ' is an orange channelizing cone meeting MUTCD specifications for size, color, and retroreflectivity, deployed on or adjacent to an active construction site to mark hazards, route traffic, or close lanes. ',
      'In practice the term is used interchangeably with "traffic cone," "road cone," and "safety cone" — but only some of those will actually pass inspection on a job site. ',
      'A real construction-grade cone is at least 28 inches tall, fluorescent orange, has a double reflective collar with ASTM Type IV high-intensity prismatic sheeting, and sits on a 7- to 10-lb rubber base. ',
      'The 18-inch cones sold at big-box hardware stores are not construction-grade and will get cited on any TCP walk-through. The rest of this page explains why.',
    ),

    h('h2', null, 'What "construction cone" actually means'),
    h(
      'p',
      null,
      'There is no separate "construction cone" SKU class — the same product sold as a "construction cone" is also sold as a "road cone," "traffic cone," or "safety cone." What contractors and inspectors mean when they say "construction cone" is shorthand for: ',
      h('strong', null, 'a cone that meets MUTCD Chapter 6 work-zone requirements'),
      '. Specifically:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Color:'), ' fluorescent orange (or fluorescent pink-orange for incident response, 2023+ MUTCD)'),
      h('li', null, h('strong', null, 'Height:'), ' 28 inches minimum for any work above 25 mph daytime; 36 inches for nighttime above 35 mph or any 55+ mph daytime'),
      h('li', null, h('strong', null, 'Retroreflectivity:'), ' double reflective collar with ASTM Type IV (high-intensity prismatic) or better sheeting for nighttime work'),
      h('li', null, h('strong', null, 'Stability:'), ' weighted base appropriate to the wind/speed exposure (4–12 lb)'),
    ),
    h(
      'p',
      null,
      'A 12-inch dollar-store cone with no reflective sheeting is technically a cone, but it is not construction-grade. An inspector will not write that down — they will just check whether the cones in your work zone are tall enough, retroreflective enough, and weighted enough for the speed limit on the road. If they are not, you fail the inspection regardless of what the cone is labeled.',
    ),

    h('h2', null, 'Construction cone sizes — and what each is for'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Cone height'),
            h('th', { className: 'text-left p-2 border-b' }, 'Where it is used on a construction site'),
            h('th', { className: 'text-left p-2 border-b' }, 'Speed limit / time-of-day cap'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '12 in (small)'), h('td', { className: 'p-2' }, 'Indoor staging, sport, training. Not road-use rated.'), h('td', { className: 'p-2' }, 'No road use')),
          h('tr', null, h('td', { className: 'p-2' }, '18 in'), h('td', { className: 'p-2' }, 'Site interior, lay-down areas, parking-lot work, contractor yard'), h('td', { className: 'p-2' }, '≤25 mph daytime only')),
          h('tr', null, h('td', { className: 'p-2' }, '28 in'), h('td', { className: 'p-2' }, 'Most active construction zones — lane tapers, buffers, channelization'), h('td', { className: 'p-2' }, '≤45 mph day; ≤35 mph night')),
          h('tr', null, h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, 'Highway, freeway, and any nighttime work on faster roads'), h('td', { className: 'p-2' }, 'Required >35 mph night, >55 mph day')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'The point of having multiple sizes on a single construction site is staging: 18-inch cones in the contractor yard and lay-down area, 28-inch cones at the work-zone perimeter, 36-inch cones at the lane taper if the road runs faster than 45 mph or the work runs into nighttime hours.',
    ),

    h('h3', null, 'Large construction cones (36-inch)'),
    h(
      'p',
      null,
      'When people search "large construction cones" or "large orange cones," they usually mean 36-inch cones. These are the highway-and-nighttime size — substantially heavier (10–12 lb base), more truck space per cone, and roughly 2–3x the unit cost of 28-inch cones. Many state DOTs (NJDOT included) prefer 42-inch ',
      h('a', { href: '/blog/traffic-barrels-buying-guide' }, 'traffic barrels (channelizer drums)'),
      ' over 36-inch cones for tapers on freeways, since drums are even more visible and harder to displace.',
    ),

    h('h3', null, 'Small construction cones (18-inch and below)'),
    h(
      'p',
      null,
      '18-inch cones have a real place on a construction site, just not at the road. They mark site interiors, equipment lay-down zones, hazardous footings, and parking-lot perimeters. Because they are lighter and stack densely, you can carry many more on a truck without sacrificing storage for the road-rated cones. ',
      'Just do not deploy them outside the project boundary on a road posted above 25 mph — that is the single most-cited cone violation on NJ TCP reviews.',
    ),

    h('h2', null, 'Why hardware-store cones are not construction-grade'),
    h(
      'p',
      null,
      'Hardware-store and big-box cones — the ones priced at $5–$10 in a 4-pack — typically share three problems:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Wrong sheeting grade.'), ' Most are sold with engineer-grade (Type I) sheeting or no sheeting at all. They look fine in daylight but fail the nighttime retroreflectivity check.'),
      h('li', null, h('strong', null, 'Non-UV-stabilized PVC.'), ' The orange fades to pale pink within 12–18 months of sun exposure. Faded cones do not pass a daytime visibility check.'),
      h('li', null, h('strong', null, 'Too short.'), ' Most big-box cones are 18 inches or smaller — fine for a driveway, not legal at a 35+ mph work zone.'),
    ),
    h(
      'p',
      null,
      'A real construction-grade cone costs $20–$60 each in case quantities. The premium over hardware-store cones gets you UV-stabilized PVC, bonded (not glued) reflective collars, and the right size and weight for the job — which is why MUTCD-compliant cones last 3–5 years on rotation while hardware-store cones get retired in a single season.',
    ),

    h('h2', null, 'Base weight: the variable nobody thinks about until cones start tipping'),
    h(
      'p',
      null,
      'Construction sites are windy by nature — open ground, building corners that channel gusts, and a constant stream of trucks generating slipstream. The cone\'s base weight is what keeps the cone where you put it.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '4–7 lb base:'), ' parking-lot, yard, and daytime work up to 45 mph. The NJ contractor daytime standard is 7 lb on a rubber base.'),
      h('li', null, h('strong', null, '10 lb base:'), ' nighttime work or 35–55 mph daytime. Standard for any closure that runs past dusk.'),
      h('li', null, h('strong', null, '12 lb base or recessed-cavity kettle base:'), ' freeway and high-wind. Always pair with a sandbag at 55+ mph.'),
    ),
    h(
      'p',
      null,
      'The base material is also worth a sentence: rubber bases survive a truck rolling over the cone once or twice; PVC bases crack on the first impact. For any active construction site where there is real chance a piece of equipment grazes the cone, buy rubber-base.',
    ),

    h('h2', null, 'Construction cone color: why orange (and why 2023 added pink)'),
    h(
      'p',
      null,
      'The MUTCD specifies fluorescent orange as the standard color for short-duration and mobile work zones. Orange has the highest contrast against typical ambient backgrounds — concrete gray, asphalt black, grass green, and dirt brown — and stays visible in low-light conditions.',
    ),
    h(
      'p',
      null,
      'In 2023 the MUTCD added ',
      h('strong', null, 'fluorescent pink-orange'),
      ' for incident-response and emergency work zones, distinguishing planned construction (orange) from unplanned events (pink). Most contractors do not need pink cones; they are issued to fire / EMS / police agencies for crash scenes. ',
      'Lime green and red cones — sold for sport, parking, or warehouse use — are not MUTCD-compliant for any roadway construction work.',
    ),

    h('h2', null, 'Stocking a construction site: how many cones, what mix'),
    h(
      'p',
      null,
      'For a small-to-mid contractor outfitting a single crew, the working recipe is:',
    ),
    h(
      'ul',
      null,
      h('li', null, '24–30× 28-inch cones with double collar + 7-lb rubber base for active road work'),
      h('li', null, '6–10× 36-inch cones with 10-lb base for nighttime or freeway-speed jobs'),
      h('li', null, '8–12× 18-inch cones for site interior + lay-down area + yard'),
      h('li', null, 'A flat-stack truck rack so cones stay clean and load fast'),
    ),
    h(
      'p',
      null,
      'Cone count for a specific job depends on the taper length, buffer, and activity-area dimensions. The full math (taper × 10-foot spacing rule + buffer + 25% spares) is in our ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'cone-count guide for NJ lane closures'),
      '.',
    ),

    h('h2', null, 'Buying construction cones in Central NJ'),
    h(
      'p',
      null,
      'For Central NJ contractors, ',
      h('a', { href: '/category/cones-drums' }, 'browse our cones, drums, and channelizers'),
      ' — all sizes listed above, with NJ-grade reflective sheeting and same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean counties. ',
      'For a job-specific kit, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with the road speed, day-or-night, and crew count, and we will spec the size mix and count that pass inspection. ',
      'Or use the ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' to lay out the work zone first and back into the cone count automatically.',
    ),

    h('h2', null, 'Common mistakes when buying construction cones'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Buying one size to "cover everything."'), ' 28-inch cones do not work above 35 mph at night or above 55 mph daytime. You will need two sizes minimum to cover most contractor work.'),
      h('li', null, h('strong', null, 'Cheap sheeting.'), ' Type I engineer-grade sheeting is cheaper but fails nighttime visibility. Specify ASTM Type IV high-intensity prismatic.'),
      h('li', null, h('strong', null, 'Skipping the storage rack.'), ' Cones thrown into the truck bed get scratched, faded faster, and sometimes warp out-of-round so they no longer nest. A $150–$200 flat-stack rack pays for itself in cone life.'),
      h('li', null, h('strong', null, 'Forgetting sandbags for highway work.'), ' At 55+ mph the slipstream from a passing truck will tip a 12-lb cone. Buy sandbags or kettle-style cones with a recessed sandbag cavity.'),
    ),
  ),
  faqs: [
    {
      q: 'What is a construction cone?',
      a: 'A construction cone is an orange channelizing cone meeting MUTCD specifications for size, color, and retroreflectivity, deployed on or near an active construction site to mark hazards or route traffic. The term is interchangeable with "traffic cone" or "road cone" — what matters is whether the cone meets MUTCD Chapter 6 work-zone requirements: fluorescent orange, 28+ inches tall (for road work), and a double reflective collar with ASTM Type IV sheeting.',
    },
    {
      q: 'Are hardware-store cones construction-grade?',
      a: 'Usually no. Hardware-store cones are typically 18 inches or shorter, use engineer-grade (Type I) sheeting that fails nighttime visibility, and use non-UV-stabilized PVC that fades within 12–18 months. They are fine for a driveway, sport, or warehouse use, but they will get cited on a construction-site TCP review.',
    },
    {
      q: 'What size construction cone do I need?',
      a: '28-inch cones with a 7-lb rubber base and double reflective collar are the standard for daytime road work up to 45 mph. Step up to 36-inch cones with a 10–12 lb base for nighttime work above 35 mph or any 55+ mph daytime work. Use 18-inch cones only for site interior, lay-down areas, parking-lot work, and ≤25 mph daytime traffic.',
    },
    {
      q: 'Why are construction cones orange?',
      a: 'Fluorescent orange has the highest contrast against typical construction-site backgrounds (concrete, asphalt, dirt) and stays visible in low light. The federal MUTCD specifies fluorescent orange as the standard color for short-duration and mobile work zones. Since the 2023 MUTCD update, fluorescent pink-orange is also allowed for incident-response and emergency zones — but planned construction stays orange.',
    },
    {
      q: 'How long do construction cones last?',
      a: 'A well-cared-for 28-inch construction cone with UV-stabilized PVC and bonded reflective collars lasts 3–5 years on rotation. UV exposure fades cheap PVC to pale pink in 12–18 months — once they fade, they fail visibility checks. Reflective collars typically need replacement before the cone body wears out, so check sheeting condition each season.',
    },
    {
      q: 'Where can I buy construction cones near me in NJ?',
      a: 'We stock 18-inch, 28-inch (single + double collar), and 36-inch construction cones with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean counties. Orders before noon ship same-day; before 4pm ship next morning. Browse the cones category or request a quote for a job-specific kit.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Safety Vests & Hi-Vis', path: '/category/safety-vests-hi-vis' },
  ],
  relatedArticles: [
    'traffic-cones-buying-guide',
    'orange-cones-explained',
    'road-cones-vs-traffic-cones',
  ],
}
