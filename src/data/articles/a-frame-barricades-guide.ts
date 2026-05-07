import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "a frame barricades" (~500/mo, High comp, $23.78 bid).
 * Decision-tree style: when an A-frame is the right pick vs. Type II / Type III,
 * sizing rules, weight/wind ratings, and what to buy. Doubles as the AEO
 * answer for "what is an A-frame barricade?" queries.
 */
export const articleAFrameBarricadesGuide: Article = {
  slug: 'a-frame-barricades-guide',
  title: 'A-Frame Barricades: When to Use Them, What to Buy, and the Type II Confusion',
  excerpt:
    'A-frame barricades are the folding, free-standing units you see around utility cuts and sidewalk closures. Here is what they actually are, when they beat a Type II or Type III, and how to size and buy them.',
  metaDescription:
    'A-frame barricades explained — what they are, when they replace Type II / Type III, MUTCD reflective sheeting requirements, sizing, wind ratings, and what to buy.',
  primaryKeyword: 'a frame barricades',
  secondaryKeywords: [
    'a-frame barricades',
    'folding barricades',
    'sidewalk barricades',
    'utility barricades',
    'sidewalk closure barricade',
    'free standing barricade',
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
      'An A-frame barricade is a free-standing, folding barricade — two legs hinged at the top, one or two rails of orange-and-white reflective sheeting, and zero ballast required. ',
      h(
        'strong',
        null,
        'Reach for one when you need a barricade that one person can carry, place, and fold flat at the end of the day — not for high-speed travel-lane separation.',
      ),
      ' A-frames sit between a Type I/II rail-on-stand and a Type III sawhorse: lighter than Type III, more visible than a single rail, and the dominant choice for sidewalk closures, utility cuts, and short-term pedestrian channelizing.',
    ),

    h('h2', null, 'What an A-frame barricade actually is'),
    h(
      'p',
      null,
      'The "A" describes the silhouette: two angled legs that meet at a hinge along the top, opening into a stable triangular base. The reflective rail (or two stacked rails) sits across the front face. Most units fold flat for transport — flat as a pizza box — which is the main reason crews buy them over rigid Type II barricades.',
    ),
    h(
      'p',
      null,
      'Materials are usually high-density polyethylene (HDPE) or steel. Plastic A-frames weigh 8–15 lb each and stack a dozen-deep on a pickup bed. Steel A-frames are heavier (20–35 lb), more wind-stable, and survive more drop cycles. Both are MUTCD-compliant when fitted with retroreflective sheeting that meets the orange-and-white stripe pattern in MUTCD Section 6F.63.',
    ),

    h('h2', null, 'When an A-frame is the right pick'),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Sidewalk closures.'),
        ' One A-frame across the entrance plus a "SIDEWALK CLOSED" sign covers most short-term closures. Pedestrian crossings of the closure line require a Type II or pedestrian-rated channelizing device; the A-frame is the visual block, not the protective barrier.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Utility cuts and small excavations.'),
        ' For a one-day water-main or curb-box cut, an A-frame perimeter of 4–6 units is faster to deploy than a Type III run.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Crew/equipment staging.'),
        ' Marking off a tool drop, materials staging, or a generator is the bread-and-butter A-frame use case. They are visible, light, and crews actually deploy them because they fold flat.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Pedestrian-only events.'),
        ' Parade routes, line management at venues, and fenced-perimeter overflow.',
      ),
    ),

    h('h2', null, 'When NOT to use an A-frame'),
    h(
      'ul',
      null,
      h('li', null, 'Travel-lane separation on roads with posted speed >25 mph — use Type III barricades, water-filled barriers, or jersey barriers depending on the duration and impact risk.'),
      h('li', null, 'Long-term closures (>72 hours) — A-frames walk in wind and get knocked over by sanitation trucks. Switch to Type III or water-filled.'),
      h('li', null, 'Any deployment where impact protection matters. A-frames are visual devices, not crashworthy barriers.'),
    ),

    h('h2', null, 'A-frame vs. Type II vs. Type III — the cheat sheet'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Device'),
            h('th', { className: 'text-left p-2 border-b' }, 'Rails'),
            h('th', { className: 'text-left p-2 border-b' }, 'Min. height'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best for'),
            h('th', { className: 'text-left p-2 border-b' }, 'Ballast'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'A-frame'), h('td', { className: 'p-2' }, '1–2'), h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, 'Sidewalks, utility cuts'), h('td', { className: 'p-2' }, 'None (fold legs)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type II'), h('td', { className: 'p-2' }, '2'), h('td', { className: 'p-2' }, '36 in'), h('td', { className: 'p-2' }, 'Low-speed roads'), h('td', { className: 'p-2' }, 'Sandbag base')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type III'), h('td', { className: 'p-2' }, '3'), h('td', { className: 'p-2' }, '60 in'), h('td', { className: 'p-2' }, 'Full-road closures'), h('td', { className: 'p-2' }, 'Sandbag or pin')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'For a side-by-side on the rigid Type family, see ',
      h('a', { href: '/blog/type-iii-barricade-vs-type-i-type-ii' }, 'Type III vs. Type I/II barricades'),
      '. For the broader category, the ',
      h('a', { href: '/blog/traffic-barricades-pillar-guide' }, 'traffic barricades pillar guide'),
      ' covers selection across all five MUTCD types.',
    ),

    h('h2', null, 'Sizing rules — height, rail width, and reflective sheeting'),
    h(
      'p',
      null,
      'MUTCD section 6F.63 sets the rail dimensions: rails must be at least 8 inches wide for a single-rail device, with alternating orange and white stripes at 6-inch (low-speed) or 12-inch (high-speed) widths. The minimum top-rail height for a Type II equivalent is 36 inches; A-frames marketed as "sidewalk barricades" frequently come at 36–42 inches and meet that spec.',
    ),
    h(
      'p',
      null,
      'For night work or any deployment in poor visibility, the reflective sheeting must be Type III high-intensity prismatic or better (NJDOT references this in §617). Cheap A-frames sold with engineer-grade sheeting will fail an inspection on a state job — verify the sheeting tier before you buy.',
    ),

    h('h2', null, 'Wind and weight — why some A-frames walk away'),
    h(
      'p',
      null,
      'A typical 12-lb plastic A-frame starts walking at sustained 18–22 mph crosswind and tips at 28–32 mph gust. Steel units are stable to ~35 mph. If you are deploying near a highway shoulder where truck wash regularly hits 30+ mph, sandbag the base or move to a Type III with sandbags — A-frames are not designed for that envelope.',
    ),

    h('h2', null, 'What to buy first'),
    h(
      'p',
      null,
      'For a small NJ contractor outfitting a working A-frame set:',
    ),
    h(
      'ul',
      null,
      h('li', null, '8× 42-inch plastic A-frames with Type III prismatic sheeting (covers most utility and sidewalk jobs)'),
      h('li', null, '4× 36-inch steel A-frames for windy/long-duration deployments'),
      h('li', null, '4× "SIDEWALK CLOSED — USE OTHER SIDE" sign panels that mount to the A-frame top rail'),
      h('li', null, '8× sandbags (for the marginal-wind days where the plastic units start walking)'),
    ),

    h('h2', null, 'Where to buy A-frame barricades in NJ'),
    h(
      'p',
      null,
      'Browse our ',
      h('a', { href: '/category/barricades-barriers' }, 'barricades and barriers category'),
      ' for A-frame, Type II, and Type III options. Not sure which mix fits your jobs? ',
      h('a', { href: '/assistant' }, 'Ask the Assistant'),
      ' — describe a typical job and it will spec a starter set. For a custom kit with same-day Central NJ delivery, ',
      h('a', { href: '/quote' }, 'request a quote'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'What is an A-frame barricade?',
      a: 'A free-standing folding barricade with two hinged legs forming an A-shape and one or two reflective orange-and-white rails across the front. It is MUTCD-compliant for low-speed and pedestrian channelizing applications, folds flat for transport, and requires no ballast in normal wind conditions.',
    },
    {
      q: 'Is an A-frame the same as a Type II barricade?',
      a: 'Functionally similar but not identical. Both have two reflective rails at 36-inch minimum height. Type II usually refers to a rigid rail-on-stand design that requires sandbag ballast; an A-frame is the folding variant that stands on its own legs. Many state DOT specs accept either as Type II equivalent for short-duration low-speed work.',
    },
    {
      q: 'Do A-frame barricades need sandbags?',
      a: 'Not in normal conditions — the splayed legs give a stable base under wind below ~20 mph. In sustained crosswind above 25 mph, near highway shoulders with truck wash, or for deployments longer than 24 hours, add a sandbag or two to keep them in place.',
    },
    {
      q: 'Can I use A-frames on a road closure?',
      a: 'Only on low-speed local roads and short-duration closures. For posted speeds above 25 mph, full-road closures, or any deployment where vehicle impact is plausible, switch to Type III barricades, water-filled barriers, or jersey barriers. A-frames are visual devices, not crashworthy.',
    },
    {
      q: 'How much do A-frame barricades cost?',
      a: 'Plastic A-frames typically run $45–$95 each retail; steel units run $120–$250 depending on rail count and sheeting tier. Type III prismatic sheeting (required for state work) adds about $15–$30 per unit over engineer-grade. Sets of 4–8 with bulk discounts are common.',
    },
    {
      q: 'How tall is a standard A-frame barricade?',
      a: 'Most A-frames stand 36–42 inches at the top rail, matching the Type II minimum. Pedestrian-channelizing variants are sometimes shorter (30–36 inches) and event/crowd-control variants can run up to 48 inches with multiple rails.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Request a custom quote', path: '/quote' },
  ],
  relatedArticles: [
    'type-iii-barricade-vs-type-i-type-ii',
    'traffic-barricades-pillar-guide',
    'barricades-types-uses-guide',
  ],
}
