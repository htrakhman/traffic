import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "no parking cones" (~500/mo, High comp, $10.92 bid).
 * FAQ-heavy AEO structure — lots of short Q/A pairs covering the legal,
 * practical, and product-spec questions a property manager / business
 * owner asks when reserving spots with cones. Distinct intent from
 * parking-cones-buying-guide (which is broad commercial). This is
 * narrowly about USING cones to RESERVE / BLOCK parking spots.
 */
export const articleNoParkingConesGuide: Article = {
  slug: 'no-parking-cones-guide',
  title: 'No Parking Cones: Are They Legal, What Size, and How to Use Them Right',
  excerpt:
    'Setting cones in a parking spot to reserve or block it is one of the most common uses of traffic cones — and one of the most legally murky. Here is what actually works (and what gets ignored, towed, or fined) for businesses, residences, and event setups.',
  metaDescription:
    'No parking cones explained: legal rules for reserving spots on private vs. public property, what size and color works, "Reserved Parking" cone signs, and how to keep cones from being moved.',
  primaryKeyword: 'no parking cones',
  secondaryKeywords: [
    'reserved parking cones',
    'no parking cones with sign',
    'parking reservation cones',
    'cones to block parking',
    'private parking cones',
    'event parking cones',
    'driveway parking cones',
  ],
  targetVolume: 500,
  datePublished: '2026-05-03',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Putting cones in a parking spot to reserve or block it works ',
      h('strong', null, 'most of the time on private property, almost never on a public street'),
      ', and depends entirely on whether the cones look "official." Below: the legal short version, the cone specs that actually deter movers, and how to attach a "Reserved" or "No Parking" sign so the cone does its job for the full day instead of getting kicked aside in 30 minutes.',
    ),

    h('h2', null, 'Are no parking cones legal?'),
    h(
      'p',
      null,
      'The short answer depends on whose pavement they sit on:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Private property (your driveway, your business lot, an HOA-managed spot):'), ' yes, you can place cones to reserve, block, or restrict parking. The lot owner has the authority. Posted "Reserved" or "No Parking" signage backs the cone up if a vehicle ignores it.'),
      h('li', null, h('strong', null, 'Public street with NO permit:'), ' generally NOT enforceable. Random orange cones in a public spot have no legal weight, can be moved by anyone, and the parker is not legally bound to honor them. Police and meter staff routinely remove unpermitted cones.'),
      h('li', null, h('strong', null, 'Public street WITH permit (block party, moving truck, contractor work zone):'), ' yes, when paired with the city-issued permit and any required signage. Most municipalities sell short-duration "no parking" permits for $25–$100 that include cones or barricades.'),
      h('li', null, h('strong', null, 'Curbside in front of a business with no posted reservation:'), ' enforceable only by the business owner with a signed contract / lease that includes the curbside; otherwise it is public street and the cones do nothing.'),
    ),
    h(
      'p',
      null,
      'The trick: a cone alone is a suggestion. A cone PLUS a printed sign that names the authority ("Reserved for [Tenant Name] — Lot 4 Management") shifts it from suggestion to enforceable, because anyone parking has been actually notified.',
    ),

    h('h2', null, 'What size cone deters movement'),
    h(
      'p',
      null,
      'Small 12 in or 18 in cones are decoration — anyone in a hurry will move them. The size and weight that actually keeps a spot held:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '28 in × 7 lb:'), ' the parking-lot standard. Visible from a moving vehicle, heavy enough that someone has to step out and physically lift it. Best price-to-effectiveness on a private lot.'),
      h('li', null, h('strong', null, '28 in × 10 lb:'), ' for windy locations or slope spots. Will NOT roll or blow over.'),
      h('li', null, h('strong', null, '36 in × 10 lb:'), ' the "do not move me" cone — much harder to ignore visually. Use one or two of these at the entrance to a multi-spot reservation.'),
      h('li', null, h('strong', null, '18 in × 3 lb:'), ' fine for valet / event-only ushering, useless for hold-the-spot work.'),
    ),

    h('h2', null, 'Cone color — orange is loudest, but not always best'),
    h(
      'p',
      null,
      'Orange is the default and is the most attention-grabbing color from distance. Two scenarios where orange is NOT the best pick:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Branded private lot (resort, hotel, retail):'), ' a black cone reads as deliberate hospitality reservation rather than construction. Black cones at 28 in match a curated brand presentation.'),
      h('li', null, h('strong', null, 'Permanent reservation that should look professional:'), ' a powder-coated metal "Reserved Parking" post is a better look than an orange cone for accessible / VIP spots that always need to be held.'),
    ),

    h('h2', null, 'How to attach a "No Parking" or "Reserved" sign'),
    h(
      'p',
      null,
      'A cone alone gets ignored. A cone with a printed sign on top gets respected ~80% of the time. Three attachment options:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Cone-top sign topper:'), ' molded plastic flag-style sign that drops onto the apex of the cone. Reusable, $8–$20 per topper, ships flat.'),
      h('li', null, h('strong', null, 'Cone-mount metal sign with bracket:'), ' a 12 in × 18 in aluminum sign on a slip-fit bracket. More durable, $25–$50 per cone, looks "official."'),
      h('li', null, h('strong', null, 'Cone bar / cone tape:'), ' a horizontal bar between two cones holding a sign or printed banner. Use for blocking a wider entry (driveway, multi-spot row).'),
    ),
    h(
      'p',
      null,
      'Common mistake: handwritten "DO NOT PARK" on cardboard taped to a cone. This reads as "some random person did this" and gets ignored. Spend the $20 on a real plastic topper — the perceived authority of a printed sign is enormous.',
    ),

    h('h2', null, 'Keeping cones from walking off'),
    h(
      'ul',
      null,
      h('li', null, 'Use 10 lb base cones in any location with foot traffic — a 7 lb cone is easy to "move and forget" by a passerby.'),
      h('li', null, 'For high-theft urban locations, chain or zip-tie cones together at the base. Two cones chained together are nearly impossible to walk off with.'),
      h('li', null, 'Engrave or sticker the property owner / business name on each cone — branded cones are far less likely to disappear.'),
      h('li', null, 'For overnight reservations, switch to a hard barricade (Type II / Type III) instead of cones. Cones disappear overnight in cities; barricades almost never do.'),
    ),

    h('h2', null, 'How many cones to use per spot'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Use case'), h('th', { className: 'text-left p-2 border-b' }, 'Cones needed'), h('th', { className: 'text-left p-2 border-b' }, 'Sign?')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'One reserved spot in a lot'), h('td', { className: 'p-2' }, '2 cones (front of spot)'), h('td', { className: 'p-2' }, 'Cone-top sign on each')),
          h('tr', null, h('td', { className: 'p-2' }, 'Block a driveway'), h('td', { className: 'p-2' }, '2 cones at the entry line'), h('td', { className: 'p-2' }, '"No Parking" topper')),
          h('tr', null, h('td', { className: 'p-2' }, 'Multi-spot VIP / event row'), h('td', { className: 'p-2' }, '1 cone per spot + 2 at row ends'), h('td', { className: 'p-2' }, 'Posted entry sign')),
          h('tr', null, h('td', { className: 'p-2' }, 'Curbside loading zone (permitted)'), h('td', { className: 'p-2' }, '1 cone per 8 ft'), h('td', { className: 'p-2' }, 'City-issued permit posted')),
          h('tr', null, h('td', { className: 'p-2' }, 'Block off the whole lot'), h('td', { className: 'p-2' }, 'Use barricades, not cones'), h('td', { className: 'p-2' }, 'Posted closure signage')),
        ),
      ),
    ),

    h('h2', null, 'Public street use — when cones do work'),
    h(
      'p',
      null,
      'Cones DO work on a public street in three specific scenarios:',
    ),
    h(
      'ol',
      null,
      h('li', null, 'A permitted moving-truck reservation issued by the city. The permit usually requires you place posted signage 24–48 hours in advance.'),
      h('li', null, 'A contractor work zone with an approved temporary traffic control plan. The cones are MUTCD-deployed (28 in, 10+ lb, 4 in retroreflective collar) and back up the posted closure.'),
      h('li', null, 'A block-party permit with closure notice from the local police precinct.'),
    ),
    h(
      'p',
      null,
      'Outside of these, public street cones are a courtesy at best. Random unpermitted cones in front of a house are routinely moved by neighbors, towed by city services, or ignored entirely. If you actually need to hold a public spot, get the permit.',
    ),

    h('h2', null, 'Where to buy no parking cones in NJ'),
    h(
      'p',
      null,
      'Browse our ',
      h('a', { href: '/category/cones-drums' }, 'cones and channelizers category'),
      ' for 28 in MUTCD-grade cones in 7 lb and 10 lb base weights, plus cone-top sign toppers in stock "No Parking" / "Reserved" / blank-custom variants. For a property-management or event-rental quantity with same-day Central NJ delivery, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' or ask the ',
      h('a', { href: '/assistant' }, 'AI Assistant'),
      ' how many cones your lot needs.',
    ),
  ),
  faqs: [
    {
      q: 'Are no parking cones legally enforceable?',
      a: 'On private property, yes — the property owner has authority to restrict parking and a cone with posted signage is a notice that holds up. On a public street with no permit, no — random cones can be ignored, moved, or removed by city services. With a city-issued no-parking or work-zone permit, yes again.',
    },
    {
      q: 'Can I put cones in front of my house to save a spot on the street?',
      a: 'Generally no — public-street parking is first-come, first-served unless you have a permit (moving truck, block party, contractor work). Random cones are not legally binding and can be moved by anyone. Most cities will remove unpermitted cones if reported.',
    },
    {
      q: 'What size cone should I use to reserve a parking spot?',
      a: '28 in with a 7–10 lb rubber base is the standard. Smaller 12–18 in cones are decoration and get moved easily. Heavier 36 in × 10 lb cones are nearly impossible to ignore visually and work best as the "anchor" cones at the entry to a multi-spot reservation.',
    },
    {
      q: 'How do I keep my reserved parking cones from being stolen?',
      a: 'Use 10 lb base cones (heavier = less casually moved), chain or zip-tie pairs of cones together at the base, and brand each cone with the property name or business sticker. For overnight reservations in urban areas, switch from cones to Type II or Type III barricades — they almost never walk off.',
    },
    {
      q: 'Do I need a sign on top of the cone, or is the cone enough?',
      a: 'Always add a sign. A cone alone gets ignored about half the time; a cone with a printed cone-top "Reserved" or "No Parking" sign is respected about 80% of the time. The sign communicates that someone in authority placed it deliberately, which is why a $10 plastic topper makes the cone work much harder.',
    },
    {
      q: 'How many cones do I need per parking spot?',
      a: 'Two cones at the front of a single spot (with sign toppers) is the standard. For a row of multiple reserved spots, use one cone per spot plus two anchor cones at each end of the row, with a posted entry sign. To block a driveway, two cones at the entry line with a "No Parking" topper is enough.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'parking-cones-buying-guide',
    'traffic-cones-buying-guide',
    'safety-cones-buying-guide',
  ],
}
