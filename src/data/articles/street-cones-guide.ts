import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "street cones" (50K/mo, High comp, ci=100). Application-focused
 * guide — written for the contractor, municipality crew, or property manager
 * Googling the term while standing at the back of a truck. Structure: prose-
 * heavy with H2/H3 sections by deployment scenario. No big buying-guide
 * tables (those are in the traffic-cones pillar). Different angle from the
 * other cone pieces: this one centers on the street use case — temporary
 * blockades, neighborhood work, sidewalk closures, water main breaks.
 */
export const articleStreetConesGuide: Article = {
  slug: 'street-cones-guide',
  title: 'Street Cones: How to Use Them on Neighborhood, Municipal, and Utility Work',
  excerpt:
    'Street cones are the same product as traffic cones — but the way you deploy them on a residential street, a sidewalk closure, or a water-main break is different from a freeway work zone. Here is the actual playbook.',
  metaDescription:
    'Street cones guide for contractors and municipalities: deployment for neighborhood roadwork, sidewalk closures, water-main breaks, parking blocks. Same-day NJ delivery.',
  primaryKeyword: 'street cones',
  secondaryKeywords: [
    'street cones for sale',
    'orange street cones',
    'small street cones',
    'street safety cones',
    'cones for street',
    'road traffic cones',
    'road safety cones',
    'small road cones',
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
      '"Street cones" is the casual name for traffic cones used on residential and municipal streets — the ones outside a water-main break, a sidewalk closure, a block party, or a sewer-line repair. ',
      h(
        'strong',
        null,
        'For most NJ street use, 28-inch fluorescent-orange cones with a 7-lb rubber base and dual reflective collars are the right buy.',
      ),
      ' That sizing covers neighborhood roads up through 45 mph arterials, deploys quickly, and survives a typical 2–3 day utility job. Below is the deployment playbook by scenario, the spacing math, and what most crews underbuy.',
    ),

    h('h2', null, 'Are street cones different from traffic cones?'),
    h(
      'p',
      null,
      'No — "street cones," "traffic cones," "road cones," and "construction cones" are all the same product family. The difference is in how they get deployed. A street cone in front of a brownstone is doing the same job as a freeway cone, just at a different scale and speed regime. The MUTCD calls them all "traffic cones" and specifies a single set of construction and color rules. For the formal spec breakdown see our ',
      h('a', { href: '/blog/traffic-cones-buying-guide' }, 'traffic cones buying guide'),
      '. For the road-cones-vs-traffic-cones terminology question, our ',
      h('a', { href: '/blog/road-cones-vs-traffic-cones' }, 'road cones vs traffic cones explainer'),
      ' goes deeper.',
    ),

    h('h2', null, 'Scenario 1 — Water-main break or service repair'),
    h(
      'p',
      null,
      'This is the most common municipal-utility deployment. Crew arrives at a leaking valve box or main break, needs to channelize drivers around a wet asphalt patch and a parked truck. The right setup:',
    ),
    h(
      'ul',
      null,
      h('li', null, '6–10 cones at 18 in or 28 in (28 in if posted speed is 35+ mph).'),
      h('li', null, 'A "ROAD WORK AHEAD" sign on a stand 200–500 ft upstream (less for residential, more for arterial).'),
      h('li', null, 'Tighter cone spacing right around the open trench — about every 5–8 ft, even if MUTCD math allows wider.'),
      h('li', null, 'A second sign at the work zone for the merge if you are pinching one lane.'),
    ),
    h(
      'p',
      null,
      'Crews working past dusk should add an arrow board if the closure shifts a lane. For after-hours emergencies, the cone count climbs because backup crews work in shifts and you need extra cones in inventory in the truck.',
    ),

    h('h2', null, 'Scenario 2 — Sidewalk closure for sewer lateral or sidewalk replacement'),
    h(
      'p',
      null,
      'Sidewalk-only closures often forget to channelize pedestrians. The MUTCD requires a parallel pedestrian route — or an explicit detour — around any closed sidewalk on a public street. Cones-only is not enough; pair them with at least Type I or Type II barricades and a "SIDEWALK CLOSED" sign with a directional arrow. For the barricade selection see our ',
      h('a', { href: '/blog/type-iii-barricade-vs-type-i-type-ii' }, 'Type I vs Type II vs Type III barricades guide'),
      '.',
    ),
    h(
      'p',
      null,
      'Cone count for a typical 60–80 ft sidewalk closure: 8–12 18-in cones (low speed, light), one ' +
        'pedestrian-direction sign, two Type II barricades, and a smooth detour mat if the alternate route crosses uneven pavement. ADA-accessible detours are required.',
    ),

    h('h2', null, 'Scenario 3 — Block party or special event'),
    h(
      'p',
      null,
      'Special-event street closures get permitted by the municipality and require a temporary traffic-control plan. Cone-only closures at corners are sometimes accepted on residential side streets, but most permits will require Type II/III barricades at the actual closure points and cones for parking-lane channelization down the block.',
    ),
    h(
      'ul',
      null,
      h('li', null, '20–40 cones at 18 in (residential, low speed).'),
      h('li', null, 'Type II barricades at the two closure points (one each direction).'),
      h('li', null, '"ROAD CLOSED — LOCAL TRAFFIC ONLY" sign on each barricade.'),
      h('li', null, 'A flagger or PD presence if the closure is on a through street.'),
    ),

    h('h2', null, 'Scenario 4 — Reserve-the-spot residential cones'),
    h(
      'p',
      null,
      'These are the cones a resident puts out for a moving truck, a contractor’s dumpster, or a recurring contractor parking spot. Most municipalities are quietly OK with this so long as you do not use the cones to reserve more than a single curb space, you do not block fire hydrants, and you take the cones in at end of day. Some towns require a permit for any cone in the public right-of-way — call the municipal clerk if you are unsure.',
    ),
    h(
      'p',
      null,
      'For this use, 12-in or 18-in cones with 4-lb bases are fine. Skip the 28-in heavy-base contractor cones unless the spot adjoins a 35+ mph road.',
    ),

    h('h2', null, 'Scenario 5 — School-zone and crossing-guard deployment'),
    h(
      'p',
      null,
      'Schools deploy 8–20 cones to reinforce drop-off lane geometry, channelize parents around the bus loop, and back up the crossing-guard’s position. The cones do not replace the guard; they make the guard’s lane visible from a distance.',
    ),
    h(
      'ul',
      null,
      h('li', null, '12–20 cones at 18 in (lots are low-speed).'),
      h('li', null, 'A "STOP" sign or "SCHOOL CROSSING" sign with the guard.'),
      h('li', null, 'Optional: a portable speed feedback sign in the upstream zone.'),
    ),

    h('h2', null, 'Scenario 6 — Filming or photo permits'),
    h(
      'p',
      null,
      'Film permits often require channelization on a residential block during shoot days. The municipality wants to see a TTC plan — even if the work is just "park the camera car for a day." Cones plus Type II barricades plus a film-permit sign is the typical setup. Crews underbuy here all the time and get hit on the permit walk-through.',
    ),

    h('h2', null, 'Spacing math — what every street deployment forgets'),
    h(
      'p',
      null,
      'The MUTCD channelizing-device spacing rule is ',
      h('strong', null, 'one cone per foot of posted speed (in feet) along the taper'),
      ', then once cones every speed-limit-in-feet along the buffer. On a 25 mph residential street, that is one cone every 25 ft along the merge — but most crews tighten to 15 ft because residential drivers cut through wider gaps. On a 35 mph collector, every 35 ft. On a 45 mph arterial, every 45 ft.',
    ),
    h(
      'p',
      null,
      'For exact taper math by speed, run the closure through the ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' or read the underlying ',
      h('a', { href: '/blog/mutcd-taper-length-formula-nj' }, 'MUTCD taper length formula guide'),
      '.',
    ),

    h('h2', null, 'Most-common street-cone mistakes'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Cones too small for the road.'), ' 12-in agility cones on a 35 mph collector. Step to 28 in.'),
      h('li', null, h('strong', null, 'No upstream warning sign.'), ' Cones-only is not a TTC plan. Pair with at least one ROAD WORK AHEAD sign upstream.'),
      h('li', null, h('strong', null, 'No nighttime reflectivity.'), ' Daytime cones left out overnight without ASTM Type III/IV collars are invisible past dusk.'),
      h('li', null, h('strong', null, 'Cones spaced too wide.'), ' Drivers cut between cones spaced over speed-limit-in-feet apart.'),
      h('li', null, h('strong', null, 'Faded cones.'), ' UV bleaches fluorescent orange to pink in 18–24 months. Retire any pink cone.'),
      h('li', null, h('strong', null, 'No ped path.'), ' Sidewalk closures need an explicit detour or parallel route, not just cones.'),
    ),

    h('h2', null, 'Quantity by job size'),
    h(
      'p',
      null,
      'Most contractors and municipal crews underbuy on cone count. Working numbers for street use:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Spot repair (1–2 hr):'), ' 6–10 cones plus 1 sign.'),
      h('li', null, h('strong', null, 'Half-day utility job:'), ' 15–25 cones plus 2 signs.'),
      h('li', null, h('strong', null, 'Multi-day sewer or water main:'), ' 40–60 cones plus 2–3 signs and 2–4 Type II barricades.'),
      h('li', null, h('strong', null, 'Block-long repave:'), ' 80–120 cones plus 4 signs and 4 Type III barricades.'),
      h('li', null, h('strong', null, 'Special event closure:'), ' 20–40 cones plus 2–4 Type II barricades.'),
    ),
    h(
      'p',
      null,
      'Always order 25–30% spare. Cones get hit by passing cars, get walked off by passers-by, and get forgotten on the truck at end of shift.',
    ),

    h('h2', null, 'Where to buy street cones in NJ (with same-day delivery)'),
    h(
      'p',
      null,
      'TrafficKit ships fluorescent-orange street cones in 18-in, 28-in, and 36-in heights with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean counties. Standard stock comes with ASTM Type IV reflective collars and 7-lb or 10-lb rubber bases. ',
      h('a', { href: '/category/cones-drums' }, 'Browse cones, drums, and channelizers'),
      ' for the catalog or describe the job to the ',
      h('a', { href: '/assistant' }, 'TrafficKit Assistant'),
      '. For municipal accounts (DPW, water utility, parks), ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' — recurring orders qualify for NET-30 terms after the first paid invoice.',
    ),
  ),
  faqs: [
    {
      q: 'What size street cones do I need?',
      a: 'For neighborhood and municipal work, 28-in fluorescent-orange cones with a 7-lb rubber base and dual reflective collars cover the typical 25–45 mph residential and collector streets. Drop to 18 in for parking-lot or driveway use; step to 36 in only on freeways or arterial work above 55 mph.',
    },
    {
      q: 'Can I use street cones to reserve a parking spot?',
      a: 'Most NJ municipalities allow brief reserve-the-spot use (a moving day, a delivery, a contractor truck) so long as you do not block hydrants, do not reserve more than a single curb space, and take the cones in at end of day. Some towns require a permit for any cone in the public right-of-way — call the municipal clerk if you are unsure.',
    },
    {
      q: 'How many street cones do I need for a sidewalk closure?',
      a: 'A typical 60–80 ft sidewalk closure uses 8–12 18-in cones plus two Type II barricades plus a SIDEWALK CLOSED sign with directional arrow. ADA detour or parallel route is required.',
    },
    {
      q: 'Are street cones MUTCD compliant?',
      a: 'Yes — "street cones" sold by a TTC supplier are the same MUTCD-compliant traffic cones used on highway work. The MUTCD floor for any public-road cone is 18 in. Make sure you are buying from a supplier and not a sporting-goods retailer.',
    },
    {
      q: 'Do street cones need reflective collars?',
      a: 'Required for any cone working past dusk. Spec ASTM Type IV at minimum. Daytime-only deployments do not require reflective sheeting, but most contractors stock dual-collar cones because the price differential is small and the same fleet covers day and night.',
    },
    {
      q: 'Where do I buy street cones near me in NJ?',
      a: 'TrafficKit delivers same-day to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean. Order through the catalog or request a quote.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Pedestrian Control', path: '/category/pedestrian-control' },
  ],
  relatedArticles: [
    'traffic-cones-buying-guide',
    'road-cones-vs-traffic-cones',
    'temporary-traffic-control-plan-utility-job',
  ],
}
