import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Article — "How Many Traffic Cones Do You Actually Need for a Lane Closure?"
 * Targets "how many cones for lane closure" (~1,200/mo, Low-Med comp)
 * Secondary: "MUTCD cone spacing", "NJ lane closure requirements",
 *             "taper length for cones", "work zone cone count"
 * AEO wedge: first 100 words contain the direct answer AI engines quote.
 */
export const articleHowManyConesForLaneClosure: Article = {
  slug: 'how-many-cones-for-lane-closure-nj',
  title: 'How Many Traffic Cones Do You Actually Need for a Lane Closure? (NJ MUTCD Guide)',
  excerpt:
    'For a typical single-lane closure on a 40 mph NJ road you need roughly 20–30 cones. Here\'s the MUTCD formula, worked examples for 25–55 mph roads, nighttime rules, and what NJDOT adds on top.',
  metaDescription:
    'Exact cone count for a lane closure in NJ using the MUTCD formula. Worked examples for 25–55 mph roads, nighttime rules, and what NJDOT adds on top.',
  primaryKeyword: 'how many cones for lane closure',
  secondaryKeywords: [
    'MUTCD cone spacing',
    'NJ lane closure requirements',
    'taper length for cones',
    'work zone cone count',
    'how many traffic cones do I need',
    'lane closure cone spacing NJDOT',
  ],
  targetVolume: 1200,
  datePublished: '2026-04-25',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    // AEO answer span — first 100 words, direct answer AI engines quote
    h(
      'p',
      { className: 'lead' },
      'For a typical single-lane closure on a 40 mph road in New Jersey, you need roughly ',
      h('strong', null, '20–30 cones'),
      ': a taper of about 10 cones spaced 40 ft apart, plus cones through the buffer and work area at roughly 80 ft spacing. The exact count depends on your road\'s speed limit, lane width, and how long the closure runs. Here\'s how to work it out for your specific job — with real examples.',
    ),

    h('h2', null, 'The MUTCD formula everyone uses'),
    h(
      'p',
      null,
      'The federal ',
      h('em', null, 'Manual on Uniform Traffic Control Devices'),
      ' (MUTCD) gives you two formulas for taper length. ',
      h('strong', null, 'Taper length (L)'),
      ' is the distance over which you transition traffic out of the lane — the diagonal section of cones before the lane is fully closed.',
    ),
    h(
      'p',
      null,
      h('strong', null, 'For roads 40 mph and under:'),
      ' L = (W × S²) ÷ 60',
    ),
    h(
      'p',
      null,
      h('strong', null, 'For roads above 40 mph:'),
      ' L = W × S',
    ),
    h(
      'p',
      null,
      'Where W = lane width in feet (typically 10–12 ft on NJ roads) and S = posted speed limit in mph.',
    ),
    h(
      'p',
      null,
      'Once you have L, cone spacing in the taper is ',
      h('strong', null, 'L ÷ 10'),
      ' (with a minimum of 10 cones). Through the buffer zone and activity area, space cones at ',
      h('strong', null, '2× the taper spacing'),
      '. This is the same formula NJDOT inspectors use and what your TCP preparer will base the plan on.',
    ),

    h('h2', null, 'Worked example: typical NJ 40 mph road closure'),
    h(
      'p',
      null,
      'Let\'s walk through the most common scenario in Central NJ: a standard arterial road with a 12-foot lane and a 40 mph speed limit.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Taper length:'), ' L = (12 × 40²) ÷ 60 = 320 ft'),
      h('li', null, h('strong', null, 'Cone spacing in taper:'), ' 320 ÷ 10 = 32 ft → round to 40 ft for clean MUTCD compliance'),
      h('li', null, h('strong', null, 'Taper cones:'), ' 320 ft ÷ 40 ft = 8 → round up to 10 (MUTCD minimum)'),
      h('li', null, h('strong', null, 'Buffer + 500-ft work zone:'), ' 600 ft at 80 ft spacing = 8 cones'),
      h('li', null, h('strong', null, 'Total minimum:'), ' 18 cones. Add 25% spare → bring 23 on site.'),
    ),
    h(
      'p',
      null,
      'That 23-cone number is your floor — what passes inspection. In practice, bring 25–28 to account for cones knocked over by traffic or needed to redirect pedestrians.',
    ),

    h('h2', null, 'Cone count by speed limit — quick reference'),
    h(
      'p',
      null,
      'The table below uses a standard 12-foot lane width and a 500-foot work zone. Scale the work zone column for longer or shorter jobs.',
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
            h('th', null, 'Speed limit'),
            h('th', null, 'Taper length'),
            h('th', null, 'Taper spacing'),
            h('th', null, 'Taper cones'),
            h('th', null, 'Buffer + work zone cones'),
            h('th', null, 'Total'),
            h('th', null, 'Bring (with 25% spare)'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', null, '25 mph'), h('td', null, '125 ft'), h('td', null, '15 ft'), h('td', null, '10'), h('td', null, '7'), h('td', null, '17'), h('td', null, '22')),
          h('tr', null, h('td', null, '35 mph'), h('td', null, '245 ft'), h('td', null, '25 ft'), h('td', null, '10'), h('td', null, '6'), h('td', null, '16'), h('td', null, '20')),
          h('tr', null, h('td', null, '40 mph'), h('td', null, '320 ft'), h('td', null, '40 ft'), h('td', null, '10'), h('td', null, '8'), h('td', null, '18'), h('td', null, '23')),
          h('tr', null, h('td', null, '45 mph'), h('td', null, '540 ft'), h('td', null, '54 ft'), h('td', null, '10'), h('td', null, '5'), h('td', null, '15'), h('td', null, '19')),
          h('tr', null, h('td', null, '55 mph'), h('td', null, '660 ft'), h('td', null, '66 ft'), h('td', null, '10'), h('td', null, '5'), h('td', null, '15'), h('td', null, '19')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Counter-intuitive takeaway: higher-speed roads use ',
      h('em', null, 'fewer cones through the work area'),
      ' because wide spacing is code-compliant past the taper. The 25 mph scenario often surprises contractors — tight spacing in a low-speed urban zone is more hardware than people expect.',
    ),

    h('h2', null, 'When you need more than the minimum'),
    h(
      'p',
      null,
      'The MUTCD numbers are a floor. Several common conditions require you to exceed them, and NJDOT inspectors know exactly what to look for.',
    ),
    h('h3', null, 'Nighttime work'),
    h(
      'p',
      null,
      'NJDOT follows MUTCD Section 6F.64: all cones in a nighttime work zone on any road above 35 mph must be at least ',
      h('strong', null, '36 inches tall with a retroreflective collar'),
      '. On roads 35 mph and under, 28-inch cones with double retroreflective banding are the minimum. 18-inch cones are daytime-only. If you\'re using the wrong cone at night and there\'s an incident, you\'re exposed.',
    ),
    h('h3', null, 'Curves and limited sight lines'),
    h(
      'p',
      null,
      'When the taper or work zone goes around a bend, tighten spacing. Rule of thumb: if a driver rounding the curve has less than a 500-ft sight line to the first cone, halve your normal spacing.',
    ),
    h('h3', null, 'High-volume roads'),
    h(
      'p',
      null,
      'On roads above ~15,000 AADT (Route 1, Route 9, many Middlesex and Monmouth County corridors), double up the first and last cones in the taper. Also a good call when trucks make up a large share of traffic — they run wide.',
    ),
    h('h3', null, 'Adjacent pedestrian channels'),
    h(
      'p',
      null,
      'If your closure forces pedestrians near the work zone, you need a continuous channelized path separating foot traffic from equipment. Count those cones separately from your lane-closure total.',
    ),

    h('h2', null, 'What NJ adds on top of the federal MUTCD'),
    h(
      'p',
      null,
      'New Jersey adopts the federal MUTCD with state-specific amendments from NJDOT. The differences contractors run into most:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Municipal permits vary.'),
        ' A 40 mph road through Woodbridge Township may require more lead time and additional signing than the MUTCD minimum. Always check the permit — it often specifies exact TTC plan elements for your road class.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Overnight closures on state highways.'),
        ' Any closure on an NJDOT-maintained road (Route 1, Route 9, Route 18, GSP shoulders, Turnpike) requires pre-approval and often a TCP stamped by a licensed engineer. NJDOT\'s NJ Permit Management system includes route-specific cone count and type requirements.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'NJDOT Standard Specifications Section 801.'),
        ' If you\'re a sub on a DOT contract, your TCP must meet these specs — not just federal MUTCD. Check ',
        h(
          'a',
          { href: 'https://www.nj.gov/transportation/eng/specs/', target: '_blank', rel: 'noopener noreferrer' },
          'NJDOT\'s Standards & Specifications page',
        ),
        ' for the current version.',
      ),
    ),

    h('h2', null, 'Cone types matter — which ones pass inspection?'),
    h('p', null, 'Not all cones are equal. NJ inspectors check size, reflectivity, and base weight.'),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, '18-inch cones'),
        ' — Parking lots, event management, and pedestrian guidance only. Not acceptable for any road-speed lane closure.',
      ),
      h(
        'li',
        null,
        h('strong', null, '28-inch cones (7 lb base)'),
        ' — The standard for daytime work on roads up to 45 mph. Look for a single or double retroreflective collar. These are the cone most NJ contractors rent for typical jobs.',
      ),
      h(
        'li',
        null,
        h('strong', null, '36-inch cones (10 lb base)'),
        ' — Required for nighttime work on roads above 35 mph, and recommended for any highway-speed closure day or night. The heavier base stays put when a car clips it at 55 mph; lighter cones blow into traffic.',
      ),
    ),
    h(
      'p',
      null,
      'Quick check: if your cones don\'t have a prominent reflective collar visible from 400+ feet, they\'re not passing a nighttime inspection. Browse our ',
      h('a', { href: '/category/cones-drums' }, '28" and 36" rental cones'),
      ' if you need the right size for your job.',
    ),

    h('h2', null, 'The math you actually use on-site'),
    h(
      'p',
      null,
      'When you\'re setting up with 15 minutes to go and no MUTCD in the truck, here\'s the thumb-rule version:',
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
          h('tr', null, h('th', null, 'Speed limit'), h('th', null, 'Taper cones'), h('th', null, 'Work zone spacing')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', null, '25–30 mph'), h('td', null, '10'), h('td', null, '15 ft apart')),
          h('tr', null, h('td', null, '35–40 mph'), h('td', null, '10'), h('td', null, '40 ft apart')),
          h('tr', null, h('td', null, '45–50 mph'), h('td', null, '10'), h('td', null, '50–60 ft apart')),
          h('tr', null, h('td', null, '55+ mph'), h('td', null, '10–12'), h('td', null, '80 ft apart')),
        ),
      ),
    ),
    h(
      'p',
      null,
      '"When in doubt, add 20%" exists for a reason: cones get knocked over, repositioned mid-job, or borrowed by another crew. Starting 20–25% above the minimum means the closure stays intact without a re-supply run.',
    ),
    h(
      'p',
      null,
      'Best on-site habit: ',
      h('strong', null, 'pace your spacing before you drop cones'),
      '. Walk the taper, place a chalk mark or stick at each interval, then set cones. Takes 3 minutes and eliminates the accordion effect where your first five are perfect and the last five bunch up at the work area.',
    ),

    h('h2', null, 'Need help planning the full setup?'),
    h(
      'p',
      null,
      'If the cone count is only part of the puzzle — you also need to figure out sign placement, arrow board positioning, or the full MUTCD-compliant layout — use our ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      '. Enter your road type, speed limit, and closure length and it generates a gear checklist and work zone diagram.',
    ),
    h(
      'p',
      null,
      'For same-day or next-day rentals in Central NJ (Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon counties), ',
      h('a', { href: '/quote' }, 'get a quote here'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'How far apart should traffic cones be in a work zone?',
      a: 'In the taper, space cones at L ÷ 10 feet, where L is the calculated taper length. On a 40 mph road with a 12-ft lane, that\'s about 32 ft — round to 40 ft for clean MUTCD compliance. Through the buffer and activity area, double the spacing: 80 ft on a 40 mph road.',
    },
    {
      q: 'Do I need bigger cones at night?',
      a: 'Yes. MUTCD requires 36-inch retroreflective cones for nighttime work on roads with a speed limit above 35 mph. On lower-speed roads, 28-inch cones with double retroreflective collars are the minimum. 18-inch cones are not acceptable for any vehicle-speed work zone after dark.',
    },
    {
      q: 'What is the minimum taper length on a 25 mph road?',
      a: 'On a 25 mph road with a standard 12-ft lane: L = (12 × 625) ÷ 60 = 125 ft. Minimum 10 cones at about 12.5 ft spacing (round to 15 ft). Always cross-check against your municipal permit, which sometimes exceeds the federal minimum.',
    },
    {
      q: 'Can I mix 18-inch and 28-inch cones in the same work zone?',
      a: 'The MUTCD does not explicitly prohibit it, but NJ inspectors expect uniformity. If the road is above 35 mph, 28-inch cones are the minimum for the entire setup — not just part of it. Mixing sizes is a red flag in an inspection.',
    },
    {
      q: 'How many spare cones should I bring on a job?',
      a: 'Add 25% to your calculated minimum. On a job requiring 20 cones, bring 25. Cones get knocked over, repositioned, or borrowed mid-job. When renting, there\'s no penalty for returning extras.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: '28" Traffic Cone (7 lb)', path: '/product/28-inch-traffic-cone' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'arrow-board-rental-guide',
    'uniform-traffic-control-devices-mutcd-guide',
    'barricade-rental-near-me-guide',
  ],
}
