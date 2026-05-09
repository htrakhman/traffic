import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "safe barriers" / "safety barriers" (~5,000/mo, High comp, $26.71 bid).
 * Pillar guide structure: maps the entire safety-barrier category by hazard
 * profile (vehicle, pedestrian, fall, crowd, work-zone) so a buyer can land
 * the right SKU in one visit. Buy/sell framing — no rental references.
 */
export const articleSafeBarriersPillarGuide: Article = {
  slug: 'safe-barriers-pillar-guide',
  title: 'Safe Barriers: A Buyer\'s Pillar Guide to Vehicle, Pedestrian, Fall, and Work-Zone Protection',
  excerpt:
    '"Safe barriers" is a category, not a product. The right one depends on what you\'re protecting against — a 55 MPH errant vehicle, a wandering pedestrian, an open trench, or a crowd at a festival. This guide maps the five hazard profiles to the SKUs that solve them.',
  metaDescription:
    'Safe barriers buying guide: pick the right vehicle, pedestrian, fall-protection, crowd, or work-zone barrier. Match hazard, MUTCD/ANSI standard, and budget in one decision tree.',
  primaryKeyword: 'safe barriers',
  secondaryKeywords: [
    'safety barriers',
    'safety barrier types',
    'protective barriers',
    'safety barrier system',
    'jobsite safety barriers',
    'highway safety barriers',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-09',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'Safe barriers fall into five buying buckets:'),
      ' vehicle-impact, pedestrian-channelizing, fall-protection edge, crowd-control, and work-zone temporary. Each has its own MUTCD or ANSI/OSHA reference, its own crashworthiness class, and a 5x-to-100x price spread. If you buy from the wrong bucket, you either over-pay for steel you didn\'t need or — far worse — install a cosmetic plastic fence in front of a real impact threat. This guide tells you which bucket your job lives in and what spec to ask for inside it.',
    ),

    h('h2', null, 'The decision question: what is the threat?'),
    h(
      'p',
      null,
      'Every safety-barrier purchase starts with one question — what specific failure are you preventing? Walk through these in order and stop at the first that matches your job:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'A moving vehicle could leave the travel lane and hit a person or structure.'), ' You need a vehicle-impact barrier rated to MASH TL-1 through TL-6, sized to the design speed.'),
      h('li', null, h('strong', null, 'A person on foot could wander into a hazard'), ' (open trench, active machinery, fresh concrete, electric panel). You need a pedestrian channelizing barrier per MUTCD §6F.71 — typically Type II/III barricades, plastic chain fence, or modular pedestrian barricade.'),
      h('li', null, h('strong', null, 'A worker could fall from height'), ' (roof edge, mezzanine, scaffolding, excavation > 6 ft). You need an OSHA 1926.501-compliant guardrail or fall-protection barrier rated for 200 lb point load.'),
      h('li', null, h('strong', null, 'A crowd at an event could surge into a stage, parade route, or restricted area.'), ' You need crowd-control barriers (bike-rack style or interlocking steel) — not vehicle-impact barriers, which are overbuilt for crowd loads.'),
      h('li', null, h('strong', null, 'A short-duration work zone needs visible separation between traffic and workers.'), ' You need MUTCD-compliant work-zone barriers — water-filled plastic, concrete jersey, or steel.'),
    ),
    h(
      'p',
      null,
      'Half of bad barrier purchases come from skipping this step. A water-filled plastic barrier looks substantial; it will not stop a 55 MPH pickup. A 6-foot bike-rack barricade looks like a fence; it will not catch a worker stepping back off a roof. Match the SKU to the threat.',
    ),

    h('h2', null, 'Bucket 1 — vehicle-impact safe barriers'),
    h(
      'p',
      null,
      'Vehicle-impact barriers are tested under MASH (Manual for Assessing Safety Hardware), the federal crashworthiness standard administered by FHWA. The Test Levels are:',
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
            h('th', { className: 'text-left p-2 border-b' }, 'MASH level'),
            h('th', { className: 'text-left p-2 border-b' }, 'Test vehicle'),
            h('th', { className: 'text-left p-2 border-b' }, 'Test speed'),
            h('th', { className: 'text-left p-2 border-b' }, 'Use case'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'TL-1'), h('td', { className: 'p-2' }, '2,425 lb passenger car'), h('td', { className: 'p-2' }, '31 MPH'), h('td', { className: 'p-2' }, 'Low-speed urban work zones, parking lots')),
          h('tr', null, h('td', { className: 'p-2' }, 'TL-2'), h('td', { className: 'p-2' }, '2,425 lb car'), h('td', { className: 'p-2' }, '44 MPH'), h('td', { className: 'p-2' }, 'Collector roads, ≤45 MPH posted')),
          h('tr', null, h('td', { className: 'p-2' }, 'TL-3'), h('td', { className: 'p-2' }, '4,950 lb pickup'), h('td', { className: 'p-2' }, '62 MPH'), h('td', { className: 'p-2' }, 'Most highway work zones — the everyday spec')),
          h('tr', null, h('td', { className: 'p-2' }, 'TL-4'), h('td', { className: 'p-2' }, '22,000 lb single-unit truck'), h('td', { className: 'p-2' }, '56 MPH'), h('td', { className: 'p-2' }, 'High-volume divided highway, truck-heavy corridors')),
          h('tr', null, h('td', { className: 'p-2' }, 'TL-5'), h('td', { className: 'p-2' }, '79,300 lb tractor-van trailer'), h('td', { className: 'p-2' }, '50 MPH'), h('td', { className: 'p-2' }, 'Bridge piers, fixed structures next to interstate')),
          h('tr', null, h('td', { className: 'p-2' }, 'TL-6'), h('td', { className: 'p-2' }, '79,300 lb tractor-tank trailer'), h('td', { className: 'p-2' }, '50 MPH'), h('td', { className: 'p-2' }, 'Hazmat-corridor protection')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Common SKUs in this bucket: precast concrete jersey barriers (TL-3 to TL-5 depending on length and pinning), steel guardrail (W-beam at TL-3), high-tension cable barrier (TL-3 to TL-4), and water-filled plastic barriers — but only the specific water-filled models tested under MASH and only when filled to the tested water level. Generic "water-filled barriers" without a MASH letter are NOT vehicle-impact rated.',
    ),

    h('h2', null, 'Bucket 2 — pedestrian channelizing barriers'),
    h(
      'p',
      null,
      'Pedestrian barriers separate people on foot from a hazard. The federal reference is MUTCD §6F.71 (pedestrian channelizing devices) plus the ADA Public Right-of-Way Accessibility Guidelines (PROWAG), which require detectable bottom rails and continuous top rails for visually impaired users. The common pedestrian barrier SKUs:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Type II/III barricades'), ' — used to close pedestrian routes around an excavation or sidewalk demolition.'),
      h('li', null, h('strong', null, 'Modular plastic pedestrian barricade'), ' (e.g., ADA-compliant longitudinal channelizers) — interlocking 6–8 ft sections with detectable bottom rail.'),
      h('li', null, h('strong', null, 'Plastic chain or temporary fence'), ' — fine for low-stakes containment (paint-drying floor) but NOT acceptable as the only separation from a fall hazard or live traffic.'),
      h('li', null, h('strong', null, 'Bike-rack pedestrian barriers'), ' — fast deploy, repositionable, ADA-compliant when fitted with a bottom rail kit.'),
    ),
    h(
      'p',
      null,
      'See our ',
      h('a', { href: '/blog/pedestrian-barriers-guide' }, 'pedestrian barriers guide'),
      ' for the full MUTCD §6F.71 walk-through and PROWAG bottom-rail spec.',
    ),

    h('h2', null, 'Bucket 3 — fall-protection edge barriers'),
    h(
      'p',
      null,
      'Fall-protection barriers protect workers (or, on roof-edge work, the public below) from edge falls of 4 ft or more (general industry, OSHA 1910.28) or 6 ft or more (construction, OSHA 1926.501). The barrier itself must be a guardrail system meeting OSHA 1926.502(b): top rail 39–45 inches, midrail at half height, capable of withstanding 200 lb of force applied outward and downward at the top edge.',
    ),
    h(
      'p',
      null,
      'Common SKUs: counterweighted free-standing roof guardrail (no penetration of the membrane), parapet-mount steel guardrail, scaffold guardrail kits, and trench / excavation guardrail with toe-board. Plastic deck-edge fence is NOT compliant — it does not pass the 200 lb point-load test. Don\'t confuse fall-protection guardrail with pedestrian or crowd barriers; the load case is fundamentally different.',
    ),

    h('h2', null, 'Bucket 4 — crowd-control barriers'),
    h(
      'p',
      null,
      'Crowd-control barriers (bike-rack barricades, interlocking steel barricades, French-style mojo barriers) are designed for repeated lateral pressure from people, not impact from vehicles. They\'re sold by the foot — typical event setups run 8 ft sections of bike-rack-style barricade weighing 35–55 lb each, interlocking through hooks and slots. Material is hot-dipped galvanized or powder-coated steel; aluminum versions exist for portability but bend under the same crowd surge that steel absorbs.',
    ),
    h(
      'p',
      null,
      'For high-energy events (festivals, marathons, motorsport pit lane), step up to ',
      h('a', { href: '/category/pedestrian-control' }, 'mojo / interlocking steel crowd barriers'),
      '. For ordinary line management (museum queue, concert ingress) bike-rack is fine. See our ',
      h('a', { href: '/blog/crowd-control-barriers-buying-guide' }, 'crowd-control barriers buying guide'),
      ' for the full sizing matrix.',
    ),

    h('h2', null, 'Bucket 5 — work-zone temporary barriers'),
    h(
      'p',
      null,
      'Work-zone barriers protect both the worker and the traveling public during temporary traffic-control operations. The MUTCD (Part 6) and the AASHTO Roadside Design Guide both reference these. Common SKUs:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Concrete jersey barriers'), ' — TL-3 / TL-4 vehicle-rated, deployable in 10-ft or 20-ft sections.'),
      h('li', null, h('strong', null, 'Water-filled plastic barriers'), ' (MASH-tested versions only) — fast deploy, lower vehicle-impact rating but pedestrian-channelizing certified.'),
      h('li', null, h('strong', null, 'Steel barriers'), ' (e.g., portable steel barriers) — middle ground on weight and protection.'),
      h('li', null, h('strong', null, 'Type III barricades + drum / cone channelization'), ' — for low-speed (< 35 MPH) work where positive vehicle protection is not required.'),
    ),

    h('h2', null, 'Common buying mistakes'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Cosmetic plastic in front of real impact risk.'), ' Empty plastic barriers and bike-rack barricades are visible but stop nothing heavier than a person.'),
      h('li', null, h('strong', null, 'Wrong MASH test level for the design speed.'), ' TL-2 on a 65 MPH highway is a paperwork-only barrier; an inspection will flag it and an actual impact will go through.'),
      h('li', null, h('strong', null, 'No ADA bottom rail on pedestrian barriers near a sidewalk closure.'), ' Federal PROWAG requires a detectable rail at 2 inches above grade; cane-detection without it is a complaint waiting to happen.'),
      h('li', null, h('strong', null, 'Counterweight roof guardrail without checking the membrane spec.'), ' Some single-ply roofs require pad isolation under counterweight feet — adds $80–$150 per foot to the install.'),
      h('li', null, h('strong', null, 'Buying steel crowd barricade for a vehicle-protection job.'), ' Crowd barriers are not vehicle-rated; a panel van will go through them.'),
    ),

    h('h2', null, 'Where to buy safe barriers in Central NJ'),
    h(
      'p',
      null,
      'Traffic Control Supply stocks all five buckets — concrete jersey, water-filled plastic, MUTCD pedestrian, OSHA roof-edge guardrail, bike-rack crowd barricade — for purchase with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon. Browse ',
      h('a', { href: '/category/barricades-barriers' }, 'our barricades & barriers catalog'),
      ' or, if you want a recommendation matched to your specific job parameters (design speed, duration, sidewalk closure, workforce exposure), use our ',
      h('a', { href: '/assistant' }, 'AI assistant'),
      ' — it will pick the right MASH level, the right MUTCD article, and the right quantity. For larger orders, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with the job address, design speed, and barrier-foot total.',
    ),
  ),
  faqs: [
    {
      q: 'What is a safe barrier?',
      a: 'A "safe barrier" is any structure that prevents a defined hazard from reaching a person or asset. There is no single product called a safe barrier — the category covers vehicle-impact barriers (MASH-rated), pedestrian channelizing barriers (MUTCD §6F.71), fall-protection edge guardrail (OSHA 1926.502), crowd-control barriers, and work-zone temporary barriers. Pick the bucket by the hazard you are protecting against.',
    },
    {
      q: 'Are water-filled plastic barriers safe for highway work zones?',
      a: 'Only the specific water-filled barrier models that have been MASH-tested at the relevant Test Level (typically TL-3) and only when filled to the tested water level. Generic water-filled plastic barriers without a MASH letter from FHWA are pedestrian channelizers, not vehicle-impact protection. Check the manufacturer eligibility letter before deploying on a federal-aid road.',
    },
    {
      q: 'What is the difference between a barrier and a barricade?',
      a: 'In the MUTCD vocabulary, a barricade is a sign-style channelizing device with reflective stripes (Type I, II, III) used to delineate a closed lane or route. A barrier is a continuous structural element (concrete jersey, steel guardrail, water-filled plastic) that physically resists impact or intrusion. Barricades guide; barriers stop.',
    },
    {
      q: 'How do I know what MASH level I need?',
      a: 'Match it to the design speed (often higher than the posted speed). 31 MPH or below = TL-1; up to 44 MPH = TL-2; up to 62 MPH = TL-3 (the everyday choice for most work zones); 56 MPH with truck traffic = TL-4; high-volume bridge piers = TL-5; hazmat corridors = TL-6. State DOTs sometimes specify a minimum higher than design speed would suggest — check the contract.',
    },
    {
      q: 'Can crowd-control barriers stop a vehicle?',
      a: 'No. Crowd-control bike-rack barricades and interlocking steel barriers are designed for lateral pressure from people. They are not vehicle-rated and a passenger vehicle will go through them at highway speeds. For vehicle-blocking at events (anti-ram protection), use MASH-tested vehicle barriers — typically wedge / surface-mounted bollards or specialized event vehicle barriers.',
    },
    {
      q: 'Do roof-edge fall-protection barriers need to be permanent?',
      a: 'No. OSHA 1926.502(b) accepts free-standing counterweighted guardrail systems for temporary roof work, provided they meet the 200 lb top-rail load test, have midrail and toe-board where required, and are placed at the correct setback from the edge. They are removed when the work ends.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Pedestrian & Crowd Control', path: '/category/pedestrian-control' },
    { label: 'Fall Protection', path: '/category/fall-protection' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
  ],
  relatedArticles: [
    'traffic-barriers-types-comparison',
    'water-filled-barriers-buying-guide',
    'crowd-control-barriers-buying-guide',
  ],
}
