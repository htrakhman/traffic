import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "pedestrian barriers" (~500/mo, High comp, $23.44 bid).
 * Comparison angle - pedestrian-specific barrier types: crowd control,
 * bike-rack, plastic, concrete-skirted. Distinct from crowd-control-barriers
 * because this article frames around pedestrian protection in active work zones.
 */
export const articlePedestrianBarriersGuide: Article = {
  slug: 'pedestrian-barriers-guide',
  title: 'Pedestrian Barriers: Types, Heights, and When to Use Each',
  excerpt:
    'Pedestrian barriers separate foot traffic from a hazard or active work zone. The right one depends on whether you are protecting pedestrians from a vehicle, a fall, or just keeping a queue orderly. Five types compared.',
  metaDescription:
    'Pedestrian barriers buying guide. Bike-rack, crowd-control, water-filled, fence, and Type II A-frame compared - when to use each, MUTCD requirements, NJ contractor pricing.',
  primaryKeyword: 'pedestrian barriers',
  secondaryKeywords: [
    'pedestrian barricades',
    'pedestrian protection barriers',
    'pedestrian channelizing devices',
    'sidewalk closure barriers',
    'pedestrian fencing',
    'longitudinal channelizing devices',
  ],
  targetVolume: 500,
  datePublished: '2026-05-06',
  readMinutes: 6,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Pedestrian barriers do one of three jobs: ',
      h('strong', null, 'protect pedestrians from a hazard, channelize foot traffic past a hazard, or detour them around it'),
      '. The right barrier depends on the threat model. A bike-rack barrier keeps an event crowd in a queue but will not stop a vehicle. A water-filled barrier stops a sedan but is overkill for a sidewalk re-route. Pick the one that matches the actual risk.',
    ),

    h('h2', null, 'Five pedestrian barriers, in order of severity'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h('thead', null, h('tr', null,
          h('th', { className: 'text-left p-2 border-b' }, 'Barrier'),
          h('th', { className: 'text-left p-2 border-b' }, 'Stops'),
          h('th', { className: 'text-left p-2 border-b' }, 'Height'),
          h('th', { className: 'text-left p-2 border-b' }, 'Typical use'),
        )),
        h('tbody', null,
          h('tr', null, h('td', { className: 'p-2' }, 'Type II A-frame'), h('td', { className: 'p-2' }, 'Pedestrians (visual)'), h('td', { className: 'p-2' }, '~3 ft'), h('td', { className: 'p-2' }, 'Sidewalk closure, light foot traffic')),
          h('tr', null, h('td', { className: 'p-2' }, 'Bike-rack barricade'), h('td', { className: 'p-2' }, 'Crowd / queue'), h('td', { className: 'p-2' }, '~3.5 ft'), h('td', { className: 'p-2' }, 'Events, parades, queue lines')),
          h('tr', null, h('td', { className: 'p-2' }, 'Plastic mesh fence'), h('td', { className: 'p-2' }, 'Pedestrians (visual)'), h('td', { className: 'p-2' }, '4-6 ft'), h('td', { className: 'p-2' }, 'Excavation perimeter, long runs')),
          h('tr', null, h('td', { className: 'p-2' }, 'Water-filled barrier'), h('td', { className: 'p-2' }, 'Light vehicles + pedestrians'), h('td', { className: 'p-2' }, '~3.5 ft'), h('td', { className: 'p-2' }, 'Pedestrian channel adjacent to live traffic')),
          h('tr', null, h('td', { className: 'p-2' }, 'Longitudinal channelizing device (LCD)'), h('td', { className: 'p-2' }, 'Pedestrians (continuous wall)'), h('td', { className: 'p-2' }, '~32 in'), h('td', { className: 'p-2' }, 'ADA-compliant pedestrian channels')),
        ),
      ),
    ),

    h('h2', null, 'Type II A-frame barricades'),
    h(
      'p',
      null,
      'The Type II A-frame is the workhorse pedestrian barricade for short closures. Two horizontal reflective rails on a folding A-frame stand, alternating orange-and-white striping. Sets up in seconds, links end-to-end, folds flat for storage. Best for sidewalk closures, doorway / driveway blocks, and short-run work zones. ',
      h('strong', null, 'Will not stop a vehicle'),
      ' - the frame collapses on impact. Use only where vehicle intrusion is not a concern.',
    ),

    h('h2', null, 'Bike-rack barricades'),
    h('p', null, 'Bike-rack (or "interlocking") barricades are the long, rectangular metal frames you see at parades, marathons, and outdoor events. Each section is 6-8 ft long with hooks that link adjacent sections. Heavy enough to stay in place against a leaning crowd, but light enough that two people can move them. Decorative covers (jackets, scrims) slide over the frame for branding or sponsor signage. See our deeper dive in the bike-rack barricades for events guide.'),

    h('h2', null, 'Plastic mesh safety fence'),
    h('p', null, 'Orange plastic mesh fence on T-posts is the cheapest perimeter barrier per linear foot. Used for excavation perimeters, tree-protection zones, and any "long line" pedestrian deterrent that does not need to be impact-resistant. Comes in 4 ft and 6 ft heights, sold by 50 ft and 100 ft rolls. Caveat: not ADA-compliant for pedestrian channels because the surface is not detectable by cane.'),

    h('h2', null, 'Water-filled plastic barriers'),
    h(
      'p',
      null,
      'Water-filled plastic barriers (Triton, Yodock, Jersey-shape plastic) are filled on-site to give 700-1,200 lb per section. They will redirect a slow vehicle and reliably block pedestrian crossing. Used when a pedestrian channel runs adjacent to live vehicle traffic and the channel needs more than visual separation. Specify cap height: standard barriers are about 32" tall, but cap rails or fence-toppers extend the visual height. See ',
      h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'our water-filled barriers buying guide'),
      ' for sizing.',
    ),

    h('h2', null, 'Longitudinal channelizing devices (LCDs)'),
    h(
      'p',
      null,
      'LCDs are the long, continuous-wall barriers used to channel pedestrians (especially ADA pedestrians using a cane) past or through a work zone. The MUTCD ADA-compliance requirement is that the bottom of the channelizing element be detectable - a continuous lower edge no more than 2 inches off the ground. A row of cones does not satisfy this; an LCD does. Required for any sidewalk detour where ADA pedestrians may be present (i.e. virtually all of them).',
    ),

    h('h2', null, 'Picking the right barrier for the job'),
    h('p', null, 'Three questions answer the choice almost every time:'),
    h('ol', null,
      h('li', null, h('strong', null, 'Are pedestrians within the deflection envelope of moving vehicles? '), 'If yes, you need a positive-protection barrier (water-filled, concrete, or steel). Visual-only barriers (Type II, mesh fence) are not sufficient.'),
      h('li', null, h('strong', null, 'Will any ADA pedestrian use this channel? '), 'If yes (the safe assumption on any public sidewalk), use an LCD or another cane-detectable continuous-base device.'),
      h('li', null, h('strong', null, 'How long is the closure (hours, days, weeks)? '), 'Hours: Type II A-frames or bike-rack. Days: bike-rack with anchored bases or water-filled. Weeks/months: plastic mesh fence on driven posts.'),
    ),

    h('h2', null, 'Reflective treatment and night use'),
    h('p', null, 'Any barrier in a TTC zone needs reflective treatment if it will be in place at night. MUTCD specifies retroreflective sheeting on the rail or vertical face, alternating orange and white at 4-6" intervals. Bike-rack barricades and Type II A-frames usually come with this treatment factory-applied. Plastic mesh fence does not - add a top reflective tape line if the fence will sit overnight.'),

    h('h2', null, 'Pricing benchmarks'),
    h('ul', null,
      h('li', null, 'Type II A-frame, 8 ft, two-rail: $80-$140'),
      h('li', null, 'Bike-rack barricade, 7 ft steel: $120-$220'),
      h('li', null, 'Plastic mesh fence, 4 ft x 100 ft roll: $60-$120 + T-posts'),
      h('li', null, 'Water-filled barrier, 6 ft section: $180-$320 (empty)'),
      h('li', null, 'LCD, 6 ft section: $300-$520 (varies by manufacturer)'),
    ),

    h('h2', null, 'Where to source in NJ'),
    h(
      'p',
      null,
      'We stock Type II A-frames, bike-rack barricades, plastic mesh fence, and water-filled barriers out of our Central NJ yard with same-day delivery. LCD assemblies are typically project-rented; ask for a quote. Browse the full ',
      h('a', { href: '/category/barricades' }, 'barricades inventory'),
      ', the ',
      h('a', { href: '/category/fencing' }, 'pedestrian fencing inventory'),
      ', or get a ',
      h('a', { href: '/quote' }, 'job-site quote'),
      ' if you want a layout sized to your project.',
    ),
  ),
  faqs: [
    {
      q: 'What is the difference between a pedestrian barrier and a vehicle barrier?',
      a: 'A pedestrian barrier is sized and rated to deter a person on foot. A vehicle barrier is engineered to absorb or redirect vehicle impact (concrete Jersey, steel guardrail, crash cushions). Some barriers (water-filled, low-deflection plastic) do both at low speeds; most do not.',
    },
    {
      q: 'What MUTCD chapter covers pedestrian protection in work zones?',
      a: 'Part 6 of the MUTCD covers temporary traffic control, with Section 6D specifically addressing pedestrian and worker safety. Section 6F discusses channelizing devices, and Section 6G covers typical applications including pedestrian detours.',
    },
    {
      q: 'Are cones an acceptable pedestrian barrier?',
      a: 'Cones can delineate a pedestrian channel for sighted pedestrians, but they are not ADA-compliant because the bottom is not cane-detectable continuously. For any public sidewalk closure, use an LCD or other continuous-base device, not a cone line.',
    },
    {
      q: 'How long can a Type II A-frame stay in place?',
      a: 'Type II A-frames are designed for short-term use - hours to a few days. They are not anchored, so they tip in moderate wind. For closures of a week or more, switch to a fixed pedestrian fence or anchored bike-rack barricades.',
    },
    {
      q: 'Do I need permits for pedestrian barriers on a public sidewalk?',
      a: 'Yes, in NJ municipalities. Sidewalk closures usually require a right-of-way permit from the local public works department, which will dictate barrier type, signage, and detour routing. Pull the permit before mobilizing - retroactive permits cost more.',
    },
    {
      q: 'What height should a pedestrian barrier be?',
      a: '32" minimum visual height is the working rule for a temporary pedestrian channel; 42" or taller is standard for crowd-control / event use. Higher than 48" usually only matters for fall protection at edges, which is OSHA-governed (1926.502), not MUTCD.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades', path: '/category/barricades' },
    { label: 'Bike-Rack Barricades', path: '/category/barricades' },
    { label: 'Water-Filled Barriers', path: '/category/barriers' },
    { label: 'Get a Quote', path: '/quote' },
  ],
  relatedArticles: [
    'crowd-control-barriers-buying-guide',
    'bike-rack-barricades-events-guide',
    'water-filled-barriers-buying-guide',
  ],
}
