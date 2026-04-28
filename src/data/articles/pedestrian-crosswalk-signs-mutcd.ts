import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * PILLAR — Targets "pedestrian crosswalk signs" (50K/mo, CI=94).
 * Absorbs "pedestrian crossing signs" (50K), "pedestrian crossing signal" (50K),
 * "crosswalk signs", "school crossing signs". Distinct topic — pedestrian-side
 * device family, not in any current article.
 */
export const articlePedestrianCrosswalkSignsMutcd: Article = {
  slug: 'pedestrian-crosswalk-signs-mutcd',
  title: 'Pedestrian Crosswalk Signs: MUTCD Specs, Sizes, and Placement',
  excerpt:
    'Pedestrian crosswalk signs warn drivers and route walkers around hazards. The MUTCD defines distinct sign types for crosswalks, school zones, and work-zone pedestrian routing. Here is the working reference.',
  metaDescription:
    'Pedestrian crosswalk signs explained: W11-2 vs S1-1 vs R1-6, MUTCD sizes, placement rules, beacon-augmented signals, and how to set up pedestrian routing in a work zone.',
  primaryKeyword: 'pedestrian crosswalk signs',
  secondaryKeywords: [
    'pedestrian crossing signs',
    'pedestrian crossing signal',
    'crosswalk signs',
    'school crossing signs',
    'W11-2 sign',
    'S1-1 sign',
    'R1-6 in-street pedestrian',
    'pedestrian channelizing devices',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-27',
  readMinutes: 11,
  body: h(
    Fragment,
    null,

    h(
      'p',
      { className: 'lead' },
      'Pedestrian crosswalk signs are the MUTCD-regulated signs that warn drivers of pedestrian crossings and route walkers safely through and around traffic. The federal manual recognizes several distinct sign types for this function: the W11-2 Pedestrian Symbol Sign (a generic pedestrian-crossing warning), the S1-1 School Crossing Sign (a school zone-specific pentagon-shape sign), the R1-6 In-Street Pedestrian Crossing Sign (a regulatory sign mounted on a crosswalk centerline), and the W11-15 Trail Crossing Sign for shared-use paths. Pedestrian signals — the WALK / DON\'T WALK and countdown indicators on signalized crossings — are governed under MUTCD Part 4E. The sign and signal families work together to give walkers safe routing and drivers clear notice.',
    ),

    h('h2', null, 'What are the main pedestrian crosswalk signs?'),
    h(
      'p',
      null,
      'Five sign types do most of the work. The fluorescent yellow-green W11-2 Pedestrian Symbol Sign warns drivers of an upcoming pedestrian crossing and is paired with a downward-pointing W16-7P plaque at the crosswalk itself. The fluorescent yellow-green S1-1 School Crossing Sign — recognizable by its pentagon shape — does the same job specifically for school zones and is required at school-route crossings. The fluorescent yellow-green W11-15 Trail Crossing Sign warns of shared-use path crossings. The R1-6 In-Street Pedestrian Crossing Sign is a regulatory device mounted on a flexible bollard in the center of the road at an unsignalized crosswalk; it commands "STOP FOR PEDESTRIANS WITHIN CROSSWALK" or "YIELD." The R1-5 series (smaller in-street YIELD signs) and the supplemental beacons that accompany them complete the working set.',
    ),
    h(
      'p',
      null,
      'On work zones, pedestrian routing devices come from MUTCD §6D — pedestrian channelizing devices, pedestrian routing signs (R9-9, R9-11, etc.), and the temporary pedestrian access route (TPAR) that walkers follow when the original sidewalk is closed.',
    ),

    h('h2', null, 'When does each pedestrian sign type go in?'),
    h(
      'p',
      null,
      'A typical permanent crosswalk on a 30 mph collector uses a W11-2 sign on each approach, mounted 100–250 feet upstream of the crosswalk per MUTCD Table 2C-4, with a W16-7P arrow plaque at the crosswalk itself. School zones add an S1-1 pentagon at every crossing and along the school route, often paired with a flashing School Speed Limit beacon (S5-1). Unsignalized mid-block crosswalks on lower-speed streets often add an R1-6 in-street sign on the centerline directly at the crosswalk to enforce the state\'s right-of-way law for pedestrians in marked crosswalks. High-traffic crossings step up to a Rectangular Rapid-Flashing Beacon (RRFB) or a Pedestrian Hybrid Beacon (PHB / HAWK signal) that motorists must yield to.',
    ),
    h(
      'p',
      null,
      'On work zones, when the contractor closes a sidewalk, MUTCD §6D requires either a TPAR (temporary pedestrian access route) along an alternate path with proper accessibility, or a sidewalk-closure sign sequence (R9-9 SIDEWALK CLOSED, R9-10 USE OTHER SIDEWALK, R9-11 SIDEWALK CLOSED AHEAD CROSS HERE) directing pedestrians to the alternate route. The route itself uses ',
      h('a', { href: '/product/economy-pedestrian-barricade-orange-eg' }, 'pedestrian barricades'),
      ' or ',
      h('a', { href: '/product/urbanite-water-filled-pedestrian-barricade' }, 'water-filled pedestrian barricades'),
      ' to physically channelize walkers.',
    ),

    h('h2', null, 'What MUTCD standards apply to pedestrian signs and signals?'),
    h(
      'p',
      null,
      'Permanent pedestrian signs are governed by MUTCD Part 2C (warning signs, including W11 series), Part 2B (regulatory signs, including R1 series), and Part 7 (school area signs). Pedestrian signals (WALK / DON\'T WALK indicators, countdown timers, RRFBs, PHBs) are governed by MUTCD Part 4E. Work-zone pedestrian routing devices are governed by MUTCD Part 6D and §6F.71 (pedestrian channelizing devices). The federal manual, edition status, and adopted state supplements are published online by the FHWA Office of Operations through the ',
      h(
        'a',
        {
          href: 'https://mutcd.fhwa.dot.gov/',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        'MUTCD Knowledge Center',
      ),
      '.',
    ),
    h(
      'p',
      null,
      'The Americans with Disabilities Act (ADA) overlays MUTCD on every pedestrian-route project. Temporary pedestrian access routes must meet ADA accessibility — minimum 48-inch clear width (60-inch preferred for two-way), maximum 5% running grade, detectable edges, and accessible push-button signals where applicable. PROWAG (the Public Right-of-Way Accessibility Guidelines) is the federal companion document; state DOT pedestrian-routing details usually reference both.',
    ),

    h('h2', null, 'How do I size pedestrian crosswalk signs and place them?'),
    h(
      'p',
      null,
      'Sign size scales with operating speed and sign location. MUTCD Table 2C-4 (warning signs) and Table 6F-1 (work-zone signs) give the minimums. The W11-2 Pedestrian Symbol Sign comes in 30" × 30" for low-speed, 36" × 36" for mid-speed, and 48" × 48" for higher-speed approaches. The fluorescent yellow-green sheeting (FYG) is required for crossing warning signs to maximize daylight conspicuity. Placement distance follows MUTCD Table 2C-4 — roughly 100 ft upstream at 25 mph, 250 ft at 35 mph, 500 ft at 45 mph and above for the W11-2.',
    ),
    h(
      'div',
      { className: 'overflow-x-auto' },
      h(
        'table',
        null,
        h(
          'thead',
          null,
          h(
            'tr',
            null,
            h('th', null, 'Sign'),
            h('th', null, 'MUTCD Code'),
            h('th', null, 'Size by Speed'),
            h('th', null, 'Where It Goes'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', null, 'Pedestrian Symbol'), h('td', null, 'W11-2'), h('td', null, '30/36/48 in'), h('td', null, 'Upstream of crosswalk per Table 2C-4')),
          h('tr', null, h('td', null, 'Pedestrian Crossing Plaque'), h('td', null, 'W16-7P'), h('td', null, '24/30 in'), h('td', null, 'Below W11-2 at the crosswalk')),
          h('tr', null, h('td', null, 'School Crossing'), h('td', null, 'S1-1'), h('td', null, '30/36/48 in pentagon'), h('td', null, 'School-zone approaches and crossings')),
          h('tr', null, h('td', null, 'Trail Crossing'), h('td', null, 'W11-15'), h('td', null, '30/36/48 in'), h('td', null, 'Shared-use path crossings')),
          h('tr', null, h('td', null, 'In-Street Stop/Yield'), h('td', null, 'R1-6 / R1-6a'), h('td', null, '12 × 36 in'), h('td', null, 'Crosswalk centerline on bollard')),
          h('tr', null, h('td', null, 'Sidewalk Closed'), h('td', null, 'R9-9 / R9-10 / R9-11'), h('td', null, '24 × 30 in'), h('td', null, 'Work-zone sidewalk closure')),
        ),
      ),
    ),

    h('h2', null, 'When does a crossing need a beacon or signal?'),
    h(
      'p',
      null,
      'Three thresholds in MUTCD §4F drive the beacon decision. Below ~10 pedestrians per hour at peak and on lower-speed streets, signs alone often suffice. Above that and on higher-speed approaches, an RRFB (Rectangular Rapid-Flashing Beacon) provides driver-actuated yellow flashes that increase yielding rates. On the highest-volume crossings or those with a documented crash history, a Pedestrian Hybrid Beacon (PHB / HAWK) — a combination beacon and red signal — provides full traffic control to stop vehicles. Full pedestrian signals (WALK / DON\'T WALK indicators on a permanent traffic signal) appear at signalized intersections per MUTCD Part 4E.',
    ),
    h(
      'p',
      null,
      'On work zones, where a permanent crosswalk is closed and walkers must be routed across active traffic, the contract drawings will specify either a flagger-controlled crossing, a temporary signal head, or a pedestrian-only AFAD-style remote-controlled signal. Each carries its own sign sequence per MUTCD Part 6.',
    ),

    h('h2', null, 'How do I rent pedestrian crosswalk signs and devices?'),
    h(
      'p',
      null,
      'For permanent installations (a new school crosswalk, a mid-block crosswalk addition), the work usually goes through a public-works agency rather than a rental — signs, posts, and beacons are purchased and installed under a capital contract. For temporary or work-zone pedestrian routing, the contractor rents the sign sequence (R9-9, R9-10, R9-11, R1-6 in-street signs, W11-2 signs as needed) plus the pedestrian channelizing devices (water-filled pedestrian barricades, fence panels, ADA-compliant detectable edge devices) and the sign stands or post mounts. Lead time runs 24–72 hours in major metros for standard pedestrian sign packages, longer for ADA-compliant TPAR equipment with detectable edges.',
    ),

    h(
      'p',
      null,
      h('a', { href: '/quote', className: 'cta-inline' }, 'Quote pedestrian crosswalk signs and routing'),
      ' — share the typical application and the sidewalk-closure plan, and we will line up the sign sequence, pedestrian barricades, and detectable-edge devices.',
    ),
  ),

  faqs: [
    {
      q: 'What is the difference between a W11-2 and an S1-1 sign?',
      a: 'W11-2 is the generic Pedestrian Symbol Sign — fluorescent yellow-green diamond used at any pedestrian crossing. S1-1 is the School Crossing Sign — fluorescent yellow-green pentagon used specifically at school-zone crossings and along school routes. The S1-1 pentagon shape is reserved for school applications under MUTCD Part 7.',
    },
    {
      q: 'Why are pedestrian crosswalk signs fluorescent yellow-green instead of yellow?',
      a: 'MUTCD §2A.11 designates fluorescent yellow-green (FYG) for pedestrian, school, and bicycle warning signs because the color is more conspicuous against typical roadway backgrounds in both daylight and headlights. The color is reserved for these vulnerable-user warning signs to make them visually distinct from generic yellow warning signs.',
    },
    {
      q: 'Is the R1-6 in-street pedestrian sign legal everywhere?',
      a: 'R1-6 is a federal MUTCD sign (Part 2B) and is generally legal where state law gives pedestrians right-of-way in marked crosswalks. Some states have adopted R1-6a (YIELD wording) instead because their state law uses "yield" rather than "stop." Check the state MUTCD supplement or DOT traffic-engineering standards before installing — wording must match state law.',
    },
    {
      q: 'How is a pedestrian crossing signal different from a regular traffic signal?',
      a: 'A traffic signal controls vehicle traffic with red/yellow/green lamps. A pedestrian signal — the WALK / DON\'T WALK or symbol indicators with countdown timers — controls pedestrian movements at signalized crossings. The two are coordinated by the controller cabinet to give walkers a safe interval and drivers a clear stopped phase. MUTCD Part 4E specifies the pedestrian signal indicators and pedestrian-actuated push-button requirements.',
    },
    {
      q: 'What is a Rectangular Rapid-Flashing Beacon (RRFB)?',
      a: 'RRFBs are pedestrian-actuated rectangular yellow LED beacons that flash in a rapid wig-wag pattern when a walker activates them. They are installed below a W11-2 Pedestrian Symbol Sign at unsignalized crosswalks to substantially increase driver yielding rates. MUTCD §4L.04 (Interim Approval) governs their use; FHWA has approved RRFB use at qualified crossings since 2008.',
    },
    {
      q: 'What is a TPAR (temporary pedestrian access route)?',
      a: 'A TPAR is the alternate sidewalk path that pedestrians use when a work zone closes the original sidewalk. MUTCD §6D and ADA / PROWAG require the TPAR to provide accessible passage — minimum 48-inch clear width, maximum 5% running grade, detectable edges visible to white-cane users, and stable, slip-resistant surface. The route is signed with R9-9 / R9-10 / R9-11 and channelized with pedestrian barricades.',
    },
    {
      q: 'Do pedestrian crosswalk signs need to be retroreflective?',
      a: 'Yes. MUTCD §2A.07 requires all signs to meet the FHWA Minimum Retroreflectivity Standards (23 CFR 655). Pedestrian-warning signs typically use fluorescent yellow-green prismatic sheeting (Type IX or Type XI), which provides higher daytime conspicuity and nighttime retroreflectivity than standard Type IV sheeting. Most states require Type IX or higher on FYG pedestrian signs.',
    },
    {
      q: 'Can I close a sidewalk and just put up a SIDEWALK CLOSED sign?',
      a: 'Only if the closure is short-distance and pedestrians have an obvious accessible alternate route on the same side or by crossing at a nearby signalized intersection. For longer closures or where the alternate route is not obvious, MUTCD §6D and ADA / PROWAG require a TPAR with R9-9, R9-10, R9-11 signs and physical channelization. Just posting "SIDEWALK CLOSED" without an accessible alternative is an ADA violation.',
    },
  ],

  relatedProducts: [
    { label: 'Pedestrian Barricade (Orange EG)', path: '/product/economy-pedestrian-barricade-orange-eg' },
    { label: 'Urbanite Water-Filled Pedestrian Barricade', path: '/product/urbanite-water-filled-pedestrian-barricade' },
    { label: 'Telescoping Sign Stand', path: '/product/telescoping-sign-stand' },
    { label: 'Galvanized Crowd Control Fence Panel (6 × 10)', path: '/product/galvanized-crowd-control-fence-panel-6x10' },
    { label: 'Pedestrian Control', path: '/category/pedestrian-control' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
  ],

  relatedArticles: [
    'uniform-traffic-control-devices-mutcd-guide',
    'barricade-rental-near-me-guide',
    'traffic-control-devices-guide',
  ],
}
