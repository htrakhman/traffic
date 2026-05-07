import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "parking lot barricades" (~500/mo, High comp, $17.14 bid).
 * Decision-tree style for the parking-lot use case — what to use to close
 * a row, mark off resurfacing/sealcoating, secure a perimeter, or stage
 * a temporary event lot. Distinct from the broader pillar guides because
 * the constraints (low speed, soft asphalt, repeated redeployment) are
 * specific to lots.
 */
export const articleParkingLotBarricadesGuide: Article = {
  slug: 'parking-lot-barricades-guide',
  title: 'Parking Lot Barricades: What to Use for Resurfacing, Reserved Rows, and Event Closures',
  excerpt:
    'Closing parking lot rows for resurfacing, reserving spots, or staging an event each call for a different barricade. Here is the decision tree, with weight, footprint, and damage-to-asphalt notes.',
  metaDescription:
    'Parking lot barricades buying guide — what to use for resurfacing, reserved-spot blocking, sealcoating, and event closures. Decision tree by use case with sizing.',
  primaryKeyword: 'parking lot barricades',
  secondaryKeywords: [
    'parking lot barriers',
    'reserved parking barricade',
    'sealcoat barricades',
    'resurfacing barricades',
    'no parking barricade',
    'lot closure barricades',
  ],
  targetVolume: 500,
  datePublished: '2026-05-07',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h(
        'strong',
        null,
        'Parking lots are a low-speed, asphalt-or-concrete environment with a unique constraint: whatever you put down has to be deployable, removable, and not damage the surface.',
      ),
      ' That rules out heavy concrete, jersey barriers, and anything pinned to the deck. The right answer depends on the job — resurfacing, reserved rows, sealcoating cure-time, or event staging each have a different best fit. This guide walks the four common cases and the gear that fits each.',
    ),

    h('h2', null, 'The four parking-lot scenarios'),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'Resurfacing or sealcoating'), ' — closing one or more rows for 24–72 hours so a paving or sealcoat crew can work, with the surface curing for hours afterward.'),
      h('li', null, h('strong', null, 'Reserved-spot blocking'), ' — keeping a single space (or a group of spaces) clear for a delivery, a VIP, or a service truck for a few hours.'),
      h('li', null, h('strong', null, 'Lot or row closure'), ' — closing the lot entrance or a major aisle for striping, sweep, or repair work.'),
      h('li', null, h('strong', null, 'Event staging / overflow'), ' — turning a lot into a controlled event area: gating, channeling pedestrians, marking pickup zones.'),
    ),

    h('h2', null, 'Resurfacing and sealcoating'),
    h(
      'p',
      null,
      'The constraints: surface is fresh asphalt or wet sealer; you cannot drop anything heavy on the cure; deployment lasts 24–72 hours; signage needs to be unambiguous to the public.',
    ),
    h(
      'p',
      null,
      'Best fit: ',
      h('strong', null, 'A-frame barricades with reflective rails plus orange channelizing cones at the perimeter.'),
      ' A-frames fold flat for transport, weigh 8–15 lb each (no asphalt damage), and stand on their own legs. See the ',
      h('a', { href: '/blog/a-frame-barricades-guide' }, 'A-frame barricades guide'),
      ' for spacing rules. Pair with "WET SEALER" or "FRESH PAVEMENT — KEEP OFF" sign panels.',
    ),
    h(
      'p',
      null,
      'Avoid: water-filled barriers (overkill for the threat model and they leave wet rings on cured asphalt), Type III barricades (too tall and heavy for the duration), jersey barriers (will damage soft cured surface).',
    ),

    h('h2', null, 'Reserved-spot blocking'),
    h(
      'p',
      null,
      'The constraints: short duration (1–8 hours), one car needs to NOT park here, you need to deploy fast and pick up fast.',
    ),
    h(
      'p',
      null,
      'Best fit: ',
      h('strong', null, '28-inch or 36-inch traffic cones with a "RESERVED" or "NO PARKING" sign placard.'),
      ' Two cones per spot is sufficient — one at each end. For a row of 4–6 spots, set a cone at each end and one in the middle. The ',
      h('a', { href: '/blog/no-parking-cones-guide' }, 'no-parking cones guide'),
      ' covers placard mounting and the visibility math.',
    ),
    h(
      'p',
      null,
      'A pop-up plastic sign-on-stand (folding tripod with a "RESERVED" face) also works for office or hotel applications where cones look too construction-y.',
    ),

    h('h2', null, 'Lot entrance / row closure'),
    h(
      'p',
      null,
      'The constraints: closure may last a full day or longer, you need a visual stop that survives wind and the occasional pickup truck nudge, and the closure must communicate "do not enter" at speed (even at 10 mph through a lot, drivers do not always read).',
    ),
    h(
      'p',
      null,
      'Best fit: ',
      h('strong', null, 'Type III barricades or A-frame barricades across the entrance, with a "LOT CLOSED" sign and 4–6 cones tapering off the approach.'),
      ' For longer closures (3+ days), upgrade to ',
      h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'water-filled barriers'),
      ' — they are heavier, more visible from a distance, and survive a slow-speed contact without falling over.',
    ),
    h(
      'p',
      null,
      'Avoid: Type II rail barricades (too short to register from a moving vehicle), single A-frames without supporting cones (drivers can miss the visual cue at the lot entrance), plastic chain (does not stop a vehicle and looks unofficial).',
    ),

    h('h2', null, 'Event staging and overflow'),
    h(
      'p',
      null,
      'The constraints: pedestrians and vehicles are intermixed; you need to channel foot traffic, mark drop-off and pickup zones, and possibly contain an outdoor crowd.',
    ),
    h(
      'p',
      null,
      'Best fit: ',
      h('strong', null, 'Steel interlocking ("bike-rack") barricades for crowd channeling, plus traffic cones for vehicle path and "drop-off only" signage.'),
      ' Steel interlocking panels do not interlock with cones, so use both: cones direct cars, panels direct pedestrians. The ',
      h('a', { href: '/blog/metal-barricades-buying-guide' }, 'metal barricades buying guide'),
      ' covers panel selection.',
    ),

    h('h2', null, 'Quick-reference matrix'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Use case'),
            h('th', { className: 'text-left p-2 border-b' }, 'Primary device'),
            h('th', { className: 'text-left p-2 border-b' }, 'Add-on'),
            h('th', { className: 'text-left p-2 border-b' }, 'Duration'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Resurfacing / sealcoat'), h('td', { className: 'p-2' }, 'A-frame barricades'), h('td', { className: 'p-2' }, 'Cones + sign'), h('td', { className: 'p-2' }, '1–3 days')),
          h('tr', null, h('td', { className: 'p-2' }, 'Reserved spot'), h('td', { className: 'p-2' }, '28–36 in cones'), h('td', { className: 'p-2' }, 'NO PARKING placard'), h('td', { className: 'p-2' }, '1–8 hours')),
          h('tr', null, h('td', { className: 'p-2' }, 'Lot / row closure'), h('td', { className: 'p-2' }, 'Type III or water-filled'), h('td', { className: 'p-2' }, 'Cones + LOT CLOSED sign'), h('td', { className: 'p-2' }, '1+ days')),
          h('tr', null, h('td', { className: 'p-2' }, 'Event staging'), h('td', { className: 'p-2' }, 'Steel interlocking'), h('td', { className: 'p-2' }, 'Cones for vehicles'), h('td', { className: 'p-2' }, 'Per event')),
        ),
      ),
    ),

    h('h2', null, 'Asphalt and concrete: what NOT to do'),
    h(
      'ul',
      null,
      h('li', null, 'Do not pin or stake into asphalt. The patch costs more than the barricade.'),
      h('li', null, 'Do not drag concrete jersey barriers across cured sealcoat — black streaks and gouges that the lot owner will charge back.'),
      h('li', null, 'Do not deploy anything heavy on a sealcoat that has cured less than 24 hours. Plastic A-frame legs leave dimples.'),
      h('li', null, 'Do not use steel-stake mounted signs on hot asphalt in summer — the stake heats and warps the asphalt around the entry hole.'),
    ),

    h('h2', null, 'What to stock for a contractor doing parking-lot work'),
    h(
      'ul',
      null,
      h('li', null, '12× 42-inch plastic A-frame barricades with Type III prismatic sheeting'),
      h('li', null, '40× 28-inch traffic cones (the workhorse for both reserved spots and channelizing)'),
      h('li', null, '8× 36-inch traffic cones for higher-visibility entrance closures'),
      h('li', null, '4× pop-up sign-on-stand units with NO PARKING / LOT CLOSED / WET SEALER faces'),
      h('li', null, '4× Type III barricades for full lot-entrance closures'),
      h('li', null, '6× water-filled barriers for multi-day closures or paving-day perimeters'),
    ),

    h('h2', null, 'Where to buy parking lot barricades in NJ'),
    h(
      'p',
      null,
      'Browse our ',
      h('a', { href: '/category/barricades-barriers' }, 'barricades and barriers category'),
      ' and ',
      h('a', { href: '/category/cones-drums' }, 'cones, drums, and channelizers'),
      ' for the full mix. Not sure what to spec for a specific lot? ',
      h('a', { href: '/assistant' }, 'Ask the Assistant'),
      ' — describe the lot, the work, and the duration and it will spec the kit. For a custom set with same-day Central NJ delivery, ',
      h('a', { href: '/quote' }, 'request a quote'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'What barricades do I use for parking lot resurfacing?',
      a: 'A-frame barricades with reflective rails along the closure line, plus orange traffic cones at the perimeter and a "WET SEALER" or "FRESH PAVEMENT — KEEP OFF" sign at the entrance. A-frames fold flat for transport, weigh under 15 lb so they will not damage cured asphalt, and stand on their own legs without ballast.',
    },
    {
      q: 'How do I block a single parking spot?',
      a: 'Two 28-inch traffic cones — one at each end of the spot — with a "NO PARKING" or "RESERVED" placard mounted on top. For a row of 4–6 spots, set a cone at each end of the row and one in the middle. Pop-up tripod signs are an alternative for office or hotel use where cones feel too construction-zone.',
    },
    {
      q: 'Can I put concrete jersey barriers in a parking lot?',
      a: 'Almost never. Concrete barriers weigh 4,000–6,000 lb, require a flatbed and a forklift to deploy, and gouge asphalt when dragged. For multi-day lot closures use water-filled barriers — same height and visibility, fraction of the weight, deployable by 2 people with a hose.',
    },
    {
      q: 'How long do A-frame barricades last in a parking lot deployment?',
      a: 'Plastic A-frames hold up well for 1–3 day deployments — the surface they sit on is forgiving and there is no truck wash. For week-plus deployments, upgrade to steel A-frames or water-filled barriers; plastic legs splay over time when sat on by curious customers.',
    },
    {
      q: 'Do I need a permit to close a parking lot row?',
      a: 'Depends on jurisdiction and the lot owner. Private lot, lot-owner permission alone — typical for resurfacing. Public-access or municipal lots — most NJ municipalities require a closure permit and standard MUTCD-compliant signage. Check the specific town clerk before deployment.',
    },
    {
      q: 'What is the difference between a parking lot barricade and a traffic barricade?',
      a: 'No formal MUTCD distinction — "parking lot barricade" is a use-case label. Devices used in lots tend to be A-frames, cones, water-filled barriers, and steel interlocking panels because they are removable, do not damage the surface, and fit the low-speed environment. "Traffic barricade" usually implies the full Type I / II / III rigid barricade family used on roads.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Request a custom quote', path: '/quote' },
  ],
  relatedArticles: [
    'a-frame-barricades-guide',
    'no-parking-cones-guide',
    'water-filled-barriers-buying-guide',
  ],
}
