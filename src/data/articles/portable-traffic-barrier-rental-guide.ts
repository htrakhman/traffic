import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "portable traffic barrier" (500/mo, CI=99, score=5.05).
 * Tactical article — focused on continuous LONGITUDINAL barriers
 * (water-filled, concrete, steel) rather than discrete barricades.
 * Distinguished from barricade-rental-near-me-guide which covers Type I/II/III.
 */
export const articlePortableTrafficBarrierRentalGuide: Article = {
  slug: 'portable-traffic-barrier-rental-guide',
  title: 'Portable Traffic Barrier Rental: Water-Filled, Concrete, and Steel',
  excerpt:
    'A practical comparison of the three portable longitudinal barriers contractors actually rent — water-filled plastic, precast concrete, and steel — with MASH test levels, deflection, and 2026 rental rates.',
  metaDescription:
    'Portable traffic barrier rental guide: water-filled vs concrete vs steel longitudinal barriers, MASH TL-2/TL-3 ratings, deflection distances, and 2026 daily and weekly rates.',
  primaryKeyword: 'portable traffic barrier',
  secondaryKeywords: [
    'water-filled barrier rental',
    'jersey barrier rental',
    'concrete barrier rental',
    'longitudinal channelizing devices',
    'portable barrier MASH',
    'temporary concrete barrier',
    'work zone barrier rental',
  ],
  targetVolume: 500,
  datePublished: '2026-04-27',
  dateModified: '2026-04-28',
  readMinutes: 8,
  body: h(
    Fragment,
    null,

    h(
      'p',
      { className: 'lead' },
      'A portable traffic barrier is a continuous longitudinal device — water-filled plastic, precast concrete, or interlocking steel — placed along the edge of a work zone to physically separate traffic from workers, equipment, or a drop-off. Portable barriers are not the same thing as barricades. Barricades (Type I, II, III) are discrete devices placed at intervals to channelize traffic; barriers are continuous walls that contain an errant vehicle. The three rental options most contractors use are water-filled plastic barriers for short-duration low-speed work, precast concrete (jersey) barriers for high-speed long-duration containment, and steel barriers for the middle ground.',
    ),

    h('h2', null, 'When does a contractor actually need a portable traffic barrier?'),
    h(
      'p',
      null,
      'A portable barrier is the right call when one of three conditions is true. First, when there is a drop-off or fixed hazard on one side of the work zone — an excavation, an unprotected utility cut, a bridge edge — and an errant vehicle would cause a fatal outcome rather than a fender bender. Second, when the work duration exceeds three days and the workers will be in the active travel zone repeatedly across that span. Third, when the state DOT temporary traffic control plan calls for "positive protection" rather than "channelization" — the words are not interchangeable.',
    ),
    h(
      'p',
      null,
      'For shorter, lower-risk work, channelizing drums, Type III barricades, or longitudinal channelizing devices (LCDs) usually suffice. They warn and guide; barriers contain. The decision tree is roughly: speed above 45 mph plus workers exposed plus duration above 3 days equals positive-protection barrier required.',
    ),

    h('h2', null, 'What are the three main types of portable traffic barriers?'),
    h(
      'p',
      null,
      'Each barrier type optimizes for a different combination of speed of installation, deflection on impact, and rental cost. The fastest to deploy is the most permissive on impact; the toughest on impact takes the longest to set up.',
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
            h('th', null, 'Barrier Type'),
            h('th', null, 'Typical MASH Level'),
            h('th', null, 'Install Speed'),
            h('th', null, 'Deflection on Impact'),
            h('th', null, 'Best Use Case'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', null, 'Water-Filled Plastic'),
            h('td', null, 'TL-2 (≤45 mph)'),
            h('td', null, 'Fastest — empty, place, fill'),
            h('td', null, '4–8 ft'),
            h('td', null, 'Short-duration low-speed channelization with positive separation'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Precast Concrete (Jersey)'),
            h('td', null, 'TL-3 / TL-4'),
            h('td', null, 'Slowest — crane / truck-set'),
            h('td', null, '1–2 ft'),
            h('td', null, 'High-speed long-duration containment with rigid separation'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Interlocking Steel'),
            h('td', null, 'TL-3'),
            h('td', null, 'Medium — pin connections'),
            h('td', null, '2–4 ft'),
            h('td', null, 'Mid-speed work where install time matters but containment is required'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'These are not interchangeable in the way trailer types are. A water-filled barrier on a 65 mph highway is a failed inspection. A precast concrete run on a 35 mph collector for a two-day patch is wasted money and craned hours. The job class drives the choice; the rental supplier should not be substituting types without permission.',
    ),

    h('h2', null, 'What MASH and MUTCD standards apply to portable barriers?'),
    h(
      'p',
      null,
      'Crashworthy hardware — and any portable barrier in or near a travel lane is crashworthy hardware — is governed by AASHTO\'s Manual for Assessing Safety Hardware (MASH). The federal eligibility list for barriers is maintained by the ',
      h(
        'a',
        {
          href: 'https://highways.dot.gov/safety/other/roadside-departure/roadside-hardware',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        'FHWA Office of Safety roadside hardware program',
      ),
      ', which tracks the federal handoff from NCHRP 350 to MASH. Test Level 2 (TL-2) covers passenger-vehicle impacts at ~45 mph and is acceptable for low-speed work. Test Level 3 (TL-3) covers ~62 mph and is the highway-class minimum. TL-4 adds heavy-truck impact and is required by some state DOTs on Interstate work.',
    ),
    h(
      'p',
      null,
      'MUTCD §6F.85 covers temporary traffic barriers as a device class — placement, delineation, and end-treatment requirements. Every barrier run needs an approved end treatment (impact attenuator, anchored crash cushion, or a tapered length-of-need extension); a blunt barrier end is a known hazard and is not MUTCD-compliant. OSHA 1926.502 covers fall-protection adjacent to barriers when the work involves an unprotected drop-off behind the barrier line.',
    ),

    h('h2', null, 'How do I size a portable barrier run?'),
    h(
      'p',
      null,
      'Three numbers drive the run length. First, the activity-area length — how far the workers and equipment actually extend. Second, the upstream taper, set by MUTCD Table 6C-3 to the posted speed (50:1 ratio at 45+ mph, shorter at lower speeds). Third, the downstream end treatment, typically 50–100 feet for an attenuator. Add those and round up to the segment length of the barrier you are renting (typically 6, 10, or 20 feet per piece). Concrete barrier segments come in 10-foot or 20-foot lengths and weigh 2,800 lb (10\') to 5,800 lb (20\'); water-filled segments are 6 feet long and weigh 1,800–2,400 lb when filled.',
    ),
    h(
      'p',
      null,
      'For an Interstate paving operation with 1,500 feet of activity area, a 50:1 taper at 65 mph adds 600 feet upstream, and a 100-foot end treatment downstream — call it 2,200 feet of barrier per side. That is 110 ten-foot segments per side, 220 total. Plan the barrier order at least a week ahead at that scale; the trucking is the long-pole item.',
    ),

    h('h2', null, 'How much does it cost to rent a portable traffic barrier?'),
    h(
      'p',
      null,
      'Rental rates in 2026 vary by barrier type, run length, and delivery distance. Typical ranges look like this. Water-filled plastic barrier runs $8–$15 per linear foot per week, with a one-time fill/empty fee of $200–$400 and a delivery fee. Precast concrete barrier runs $15–$30 per linear foot per week plus a per-segment crane and trucking charge of $50–$100 each way; long runs (1,000+ feet) usually negotiate flat-rate transport. Interlocking steel barrier runs $12–$22 per linear foot per week and is the cheapest to ship per pound because the pieces are lighter than concrete.',
    ),
    h(
      'p',
      null,
      'Beyond the linear foot rate, the cost drivers worth asking about up front are the end treatment (an attenuator can add $1,500–$3,000 per end), the trucking, and the on-site crane time for concrete barrier — concrete is the cheapest material to rent and the most expensive to mobilize and demobilize.',
    ),

    h('h2', null, 'How do I rent a portable traffic barrier?'),
    h(
      'p',
      null,
      'Send the quote with the run length (linear feet, both sides if applicable), road speed, work duration, delivery address, and the state DOT plan or specification reference. The rental coordinator can match the right barrier type and MASH level, confirm end-treatment availability, and schedule trucking. Lead times for water-filled barrier run 24–72 hours in major metros. Concrete barrier runs 1–2 weeks because the trucking pool is smaller and the segments queue at the yard. Plan early on big runs.',
    ),

    h(
      'p',
      null,
      h('a', { href: '/quote', className: 'cta-inline' }, 'Request a portable traffic barrier quote'),
      ' — list the linear feet, road speed, and dates, and we will confirm material, MASH level, and trucking within the hour.',
    ),
  ),

  faqs: [
    {
      q: 'Is a barricade the same as a portable traffic barrier?',
      a: 'No. Barricades (Type I, II, III per MUTCD §6F.63) are discrete devices placed at intervals to channelize and warn. Portable barriers are continuous longitudinal walls that physically contain an errant vehicle. Barricades are channelization; barriers are positive protection. The state DOT plan will use one word or the other; they are not interchangeable.',
    },
    {
      q: 'Can a water-filled barrier be used on a 55 mph road?',
      a: 'Generally no. Water-filled plastic barriers are typically MASH TL-2 rated, which covers posted speeds at or below 45 mph. For 55+ mph, the state spec will require precast concrete or interlocking steel at TL-3 or higher. A small number of water-filled designs have TL-3 letters; check the FHWA acceptance letter before assuming.',
    },
    {
      q: 'How long does it take to install a 1,000-foot concrete barrier run?',
      a: 'A two-truck two-crane crew can place 100 ten-foot segments in roughly 6–10 hours, including end treatments. Removal runs about the same. Water-filled barrier of the same length installs in 3–5 hours because the segments are lighter and do not need a crane — the constraint is filling time at the water hydrant.',
    },
    {
      q: 'What is barrier deflection and why does it matter?',
      a: 'Deflection is how far the barrier moves laterally when struck. Concrete barriers deflect 1–2 feet on a TL-3 hit; water-filled barriers deflect 4–8 feet. The deflection distance must be cleared between the back of the barrier and any worker, drop-off, or fixed hazard, or the barrier provides no protection. State plans usually specify the required clear zone behind the barrier line.',
    },
    {
      q: 'Do I need an end treatment on a barrier run?',
      a: 'Yes — every exposed barrier end in a travel direction needs an approved end treatment (anchored attenuator or tapered length-of-need). A blunt concrete or steel barrier end at highway speed is a known fatal hazard and is not MUTCD-compliant. Water-filled barriers usually integrate a softer transition end into the rental package, but it must still be on the FHWA acceptance list.',
    },
    {
      q: 'Can I move a portable barrier mid-shift to reopen lanes?',
      a: 'Water-filled barrier can be drained and moved in 1–3 hours per 100 feet by a small crew. Concrete and steel barrier cannot be moved without a crane and trucking, so reopening lanes mid-shift is impractical. For projects with frequent lane-configuration changes, water-filled or interlocking steel is the right call even if the speed allows concrete.',
    },
    {
      q: 'Are portable barriers required to be reflective or marked?',
      a: 'Yes. MUTCD §6F.85 requires barriers in or adjacent to travel lanes to carry retroreflective delineation visible from the approach direction. Most rental concrete barriers come with factory-applied yellow reflective tape on top corners or with delineator posts mounted at intervals; water-filled barriers ship with integrated reflective panels or attachment points. Confirm reflectivity grade matches MUTCD §6F.03.',
    },
    {
      q: 'How is a longitudinal channelizing device (LCD) different from a barrier?',
      a: 'LCDs (MUTCD §6F.74) are continuous channelizers — typically water-filled plastic or interlocking soft-shell devices — designed to delineate a path without providing positive protection. A barrier physically contains an errant vehicle. An LCD redirects only at low speed and angle. The wording on the contract plan ("LCD" vs "barrier") drives the rental selection.',
    },
  ],

  relatedProducts: [
    { label: 'Water-Filled Barrier (6 ft)', path: '/product/water-filled-barrier-6ft' },
    { label: 'Type III Barricade', path: '/product/type-iii-barricade' },
    { label: 'Type II Barricade', path: '/product/type-ii-barricade' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Pedestrian Control', path: '/category/pedestrian-control' },
  ],

  relatedArticles: [
    'barricade-rental-near-me-guide',
    'traffic-control-equipment-rental',
    'uniform-traffic-control-devices-mutcd-guide',
  ],
}
