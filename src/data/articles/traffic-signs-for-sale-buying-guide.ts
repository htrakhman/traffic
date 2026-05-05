import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic signs for sale" (~5,000/mo, High comp, $5.32 bid).
 * Commercial buyer's-guide angle - sign types, MUTCD letter codes,
 * sheeting grades, mounting options, and what NJ contractors should
 * actually buy.
 */
export const articleTrafficSignsForSaleBuyingGuide: Article = {
  slug: 'traffic-signs-for-sale-buying-guide',
  title: 'Traffic Signs for Sale: Types, MUTCD Codes, and What to Buy (2026)',
  excerpt:
    'Buying traffic signs for road work, private property, or events? Here is the contractor buying guide - sign categories, MUTCD letter codes, reflective sheeting grades, and pricing for typical NJ jobs.',
  metaDescription:
    'Traffic signs for sale - regulatory, warning, work-zone, and guide signs explained. MUTCD codes, sheeting grades (Type IV/V), pricing, and where to buy in NJ.',
  primaryKeyword: 'traffic signs for sale',
  secondaryKeywords: [
    'road signs for sale',
    'work zone signs for sale',
    'mutcd traffic signs',
    'reflective traffic signs',
    'construction signs for sale',
    'buy traffic signs nj',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-05',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Traffic signs for sale fall into five categories - ',
      h('strong', null, 'regulatory, warning, work-zone, guide, and school/specialty'),
      '. Pricing depends on size (24"-48"), material (aluminum vs roll-up vinyl), and reflective sheeting grade (Type I through Type V). Below: what each category covers, what NJ contractors actually buy, and what a complete sign kit costs.',
    ),

    h('h2', null, 'The five sign categories'),
    h('h3', null, '1. Regulatory signs (R-codes)'),
    h(
      'p',
      null,
      'Regulatory signs tell drivers what they MUST do. Black on white, white on red, or other prescribed combos per the MUTCD. Common contractor purchases:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'R1-1 STOP: '), '30" octagon, $35-$60 in Type IV.'),
      h('li', null, h('strong', null, 'R2-1 SPEED LIMIT: '), '24"x30" rectangle, $35-$55.'),
      h('li', null, h('strong', null, 'R3-2 NO LEFT TURN: '), '24"x24", $30-$50.'),
      h('li', null, h('strong', null, 'R5-1 DO NOT ENTER: '), '30"x30", $40-$60.'),
    ),

    h('h3', null, '2. Warning signs (W-codes)'),
    h(
      'p',
      null,
      'Warning signs alert drivers to conditions ahead. Black on yellow diamond. Common buys:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'W1-X CURVE / TURN: '), '30"x30" diamond, $40-$60.'),
      h('li', null, h('strong', null, 'W11-1 BICYCLE: '), '30"x30", $40-$60.'),
      h('li', null, h('strong', null, 'W11-2 PEDESTRIAN: '), '30"x30", $40-$60.'),
      h('li', null, h('strong', null, 'W14-1 DEAD END: '), '30"x30", $40-$55.'),
      h('li', null, h('strong', null, 'W15-1 PLAYGROUND: '), '30"x30", $40-$60.'),
    ),

    h('h3', null, '3. Work-zone signs (W20-series)'),
    h(
      'p',
      null,
      'The contractor staple. Black on orange, used to set up the temporary traffic control around any active work zone:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'W20-1 ROAD WORK AHEAD: '), '48"x48" diamond, $55-$95 rigid; $35-$55 roll-up.'),
      h('li', null, h('strong', null, 'W20-3 ROAD WORK X FT: '), '48"x48", $55-$95 rigid; $35-$55 roll-up.'),
      h('li', null, h('strong', null, 'W20-5 LANE ENDS: '), '48"x48", $55-$95.'),
      h('li', null, h('strong', null, 'W20-7 FLAGGER (symbol): '), '48"x48", $60-$100.'),
      h('li', null, h('strong', null, 'W21-1a WORKERS AHEAD: '), '48"x48", $55-$95.'),
    ),

    h('h3', null, '4. Guide signs (D, M, J series)'),
    h(
      'p',
      null,
      'Direction, distance, and route information. Less common as contractor purchases - usually owned by NJDOT or municipalities.',
    ),

    h('h3', null, '5. School and specialty'),
    h(
      'p',
      null,
      'School-zone signs (S-series, fluorescent yellow-green), pedestrian-crossing signs, parking-lot signs, no-trespassing, and OSHA workplace signs. Pricing varies $25-$120 depending on size and shape.',
    ),

    h('h2', null, 'Rigid aluminum vs roll-up vinyl'),
    h(
      'p',
      null,
      'Two construction types dominate the contractor sign market:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Rigid aluminum (.080" or .063" gauge): '), 'permanent or semi-permanent installation. Lasts 7-10 years if Type IV+ sheeting. The right buy for installed signs (parking lots, private roads, permanent regulatory).'),
      h('li', null, h('strong', null, 'Roll-up vinyl (with fiberglass ribs): '), 'temporary work-zone use. Folds into a backpack-size case, deploys on a spring frame in 30 seconds. Typical lifespan 1-3 seasons depending on UV exposure and how rough the crew is.'),
    ),
    h(
      'p',
      null,
      'For active road-work crews, roll-up is the right buy for W20-series and W21-series signs. Rigid aluminum is the right buy for anything that stays installed.',
    ),

    h('h2', null, 'Reflective sheeting - what grade do you need?'),
    h(
      'p',
      null,
      'ASTM D4956 grades reflective sheeting from Type I (engineering) to Type IX (super high-intensity diamond). For NJ contractor work:',
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
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Sheeting'), h('th', { className: 'text-left p-2 border-b' }, 'Use case'), h('th', { className: 'text-left p-2 border-b' }, 'Lifespan'), h('th', { className: 'text-left p-2 border-b' }, 'Price premium')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Type I (Engineering)'), h('td', { className: 'p-2' }, 'Private property, parking lot'), h('td', { className: 'p-2' }, '5-7 yr'), h('td', { className: 'p-2' }, 'Baseline')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type III (HIP)'), h('td', { className: 'p-2' }, 'Local-road regulatory'), h('td', { className: 'p-2' }, '7-10 yr'), h('td', { className: 'p-2' }, '+25%')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type IV (HIP+)'), h('td', { className: 'p-2' }, 'NJDOT state-route work'), h('td', { className: 'p-2' }, '10-12 yr'), h('td', { className: 'p-2' }, '+50%')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type V/IX (Diamond)'), h('td', { className: 'p-2' }, 'Turnpike, Parkway, freeway'), h('td', { className: 'p-2' }, '10-15 yr'), h('td', { className: 'p-2' }, '+100%')),
        ),
      ),
    ),
    h('p', null, 'For roll-up vinyl work-zone signs, the practical default is Type IV. NJDOT inspectors will sometimes spec Type V on Turnpike or Parkway work; check the contract docs before mobilizing.'),

    h('h2', null, 'Sign stands and mounting'),
    h(
      'p',
      null,
      'A sign without a stand is just a piece of aluminum. Common mounting options:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Spring-base portable stand: '), '$45-$95. The work-zone standard. Folds flat, sets up in 60 seconds, springs back if hit by truck wash.'),
      h('li', null, h('strong', null, 'Heavy-duty cone-mount: '), '$15-$35. Lets you mount a sign on top of a 28" or 36" cone. Useful for taper heads.'),
      h('li', null, h('strong', null, 'Permanent post (U-channel): '), '$25-$75 per 8 ft post. The right install for permanent regulatory signs.'),
      h('li', null, h('strong', null, 'Sandbag-base portable: '), '$35-$70. Fold-flat A-frame for low-speed parking-lot use.'),
    ),

    h('h2', null, 'A typical contractor sign kit'),
    h(
      'p',
      null,
      'For a 2-truck NJ road-work crew, a starter sign kit looks like:',
    ),
    h(
      'ul',
      null,
      h('li', null, '4x ROAD WORK AHEAD (W20-1) roll-up, 48"x48", Type IV.'),
      h('li', null, '2x FLAGGER (W20-7) roll-up, 48"x48", Type IV.'),
      h('li', null, '2x WORKERS AHEAD (W21-1a) roll-up, 48"x48", Type IV.'),
      h('li', null, '2x LANE ENDS (W20-5) roll-up, 48"x48", Type IV.'),
      h('li', null, '8x spring-base portable sign stands.'),
      h('li', null, '4x cone-mount sign brackets for taper heads.'),
    ),
    h(
      'p',
      null,
      'Total spend: roughly $700-$1,100 for the kit. Like cones, signs are an asset - amortize over 3-5 years and they cost about $0.50-$1/day per sign.',
    ),

    h('h2', null, 'When to buy custom-printed signs'),
    h(
      'p',
      null,
      'Custom signs (your company name, project number, special instructions, multilingual text) cost more and have lead times of 5-15 business days. Buy custom when:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'You\'re running a long-duration project where the same custom message will be redeployed.'),
      h('li', null, 'A municipality or NJDOT engineer has spec\'d a non-standard message.'),
      h('li', null, 'You want company branding on private-job signs (parking lots, security gates).'),
    ),
    h(
      'p',
      null,
      'For everything else, MUTCD-standard signs are cheaper, available faster, and acceptable to inspectors.',
    ),

    h('h2', null, 'Where to buy traffic signs in NJ'),
    h(
      'p',
      null,
      'Browse our ',
      h('a', { href: '/category/signs-sign-stands' }, 'signs and sign stands category'),
      ' for MUTCD-compliant rigid aluminum and roll-up vinyl signs in 24"-48" sizes with Type III, IV, and V sheeting. Need a kit sized to your crew? Run the spec through our ',
      h('a', { href: '/assistant' }, 'AI gear assistant'),
      ' or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' - same-day Central NJ delivery on stock items, 5-10 business days on custom prints.',
    ),
  ),
  faqs: [
    {
      q: 'Where can I buy traffic signs?',
      a: 'For MUTCD-compliant signs, buy from a traffic-control supplier rather than a hardware store - hardware stores carry only a handful of generic signs without the right reflective sheeting. NJ contractors should buy from a Central NJ supplier with same-day delivery on stock items.',
    },
    {
      q: 'How much do traffic signs cost?',
      a: 'A 30"x30" warning sign in Type IV reflective aluminum is $40-$60. A 48"x48" roll-up work-zone sign is $35-$55. A 30" octagonal STOP sign in Type IV is $35-$60. Spring-base sign stands are $45-$95. Custom-printed signs run 50-100% more.',
    },
    {
      q: 'What is the difference between Type IV and Type V reflective sheeting?',
      a: 'Type IV (high-intensity prismatic) reflects ~500 candela/lux at 0.2 deg. Type V (super-high-intensity diamond grade) reflects ~800+ candela/lux. Type IV is the NJDOT default for state-route work; Type V is sometimes specd on NJ Turnpike, Parkway, or freeway work zones for greater nighttime visibility at high speed.',
    },
    {
      q: 'Are roll-up signs as good as rigid aluminum?',
      a: 'For work-zone use, yes. Roll-up vinyl signs with fiberglass ribs deploy in 30 seconds and pack into a backpack case, so they are the right tool for crews that set up and strike daily. Rigid aluminum is the right tool for permanent installation - parking lots, private roads, gated communities.',
    },
    {
      q: 'Can I buy custom-printed traffic signs?',
      a: 'Yes. Most TC suppliers offer custom prints with 5-15 business day lead times. Cost is typically 50-100% above the standard MUTCD sign price. Custom is worth it for long-duration projects or when an engineer has specd a non-standard message; for everyday work, MUTCD-standard signs are faster and cheaper.',
    },
    {
      q: 'Do I need a permit to put up traffic signs?',
      a: 'On private property, no. On a public road, yes - any temporary traffic-control deployment on a state or local road in NJ usually requires a road-opening permit and an MUTCD-compliant TTC plan. Permanent regulatory signs are owned and installed by NJDOT or municipal public-works departments only.',
    },
  ],
  relatedProducts: [
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'traffic-control-signs-mutcd-guide',
    'pedestrian-crossing-signs-mutcd-guide',
    'highway-cones-guide',
  ],
}
