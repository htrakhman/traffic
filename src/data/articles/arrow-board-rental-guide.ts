import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Article 2 - Targets "arrow board rental" (500/mo, Medium comp 38)
 * Secondary: "arrow board rental near me", "truck mounted arrow boards",
 *            "trailer mounted arrow board", "flashing arrow boards", "wanco arrow board"
 */
export const articleArrowBoardRentalGuide: Article = {
  slug: 'arrow-board-rental-guide',
  title: 'Arrow Board Rental: Trailer vs. Truck-Mount, Specs, and What You Will Pay',
  excerpt:
    'Compare trailer and truck-mounted arrow boards for lane closures. Learn MUTCD Type A/B/C specs, when they\'re required, and real rental rates for daily, weekly, and monthly terms.',
  metaDescription:
    'Arrow board rental: Type A/B/C specs, trailer vs truck-mounted, MUTCD requirements, and pricing. What you need to know before you rent.',
  primaryKeyword: 'arrow board rental',
  secondaryKeywords: [
    'arrow board rental near me',
    'truck mounted arrow boards',
    'trailer mounted arrow board',
    'flashing arrow boards',
    'arrow board traffic control',
    'wanco arrow board',
  ],
  targetVolume: 500,
  datePublished: '2026-04-19',
  readMinutes: 9,
  heroImage: 'https://www.wanco.com/wp-content/uploads/2020/03/featr-prod-arrowbd-trailer-folding-585x400.jpg',
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Arrow boards are the digital signs on trailers and trucks that flash arrows to merge traffic around a lane closure. Renting is almost always smarter than buying. This guide covers Type A/B/C specs, which mounting style fits your job, and what rental costs look like in 2026.',
    ),
    h('h2', null, 'What is an arrow board and when is one required?'),
    h(
      'p',
      null,
      'An arrow board is a traffic control device consisting of a matrix of lamps arranged to display directional arrows or messages. They are used on multi-lane highways and high-speed roads to warn drivers of lane closures and guide merging. MUTCD Section 6L.06 states that an arrow board is required on any roadway with two or more lanes in each direction where a lane closure occurs, on roads with speed limits above 45 mph, or in any situation where advance warning alone is insufficient.',
    ),
    h(
      'p',
      null,
      'See the ',
      h(
        'a',
        { href: 'https://up.codes/s/arrow-boards', target: '_blank', rel: 'noopener noreferrer' },
        'UpCodes MUTCD Arrow Boards section',
      ),
      ' for the full standard.',
    ),
    h('h2', null, 'What are the three MUTCD arrow board types?'),
    h(
      'p',
      null,
      'The MUTCD defines three arrow board types: Type A, Type B, and Type C. Each is sized and brightness-rated for different traffic speeds and visibility distances.',
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
          h('tr', null, h('th', null, 'Type'), h('th', null, 'Size'), h('th', null, 'Lamps'), h('th', null, 'Best For'), h('th', null, 'Visibility Distance')),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', null, 'Type A'),
            h('td', null, '18" × 18"'),
            h('td', null, '100-200'),
            h('td', null, 'Low-speed urban (25 mph or less)'),
            h('td', null, '100-200 ft'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Type B'),
            h('td', null, '30" × 30"'),
            h('td', null, '400-600'),
            h('td', null, 'Mid-speed arterials (25-50 mph)'),
            h('td', null, '300-500 ft'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Type C'),
            h('td', null, '40" × 40" (or larger)'),
            h('td', null, '800-1,000'),
            h('td', null, 'High-speed highways (50+ mph)'),
            h('td', null, '800-1,500 ft'),
          ),
        ),
      ),
    ),
    h('h2', null, 'Should I rent a trailer-mounted or truck-mounted arrow board?'),
    h(
      'p',
      null,
      'Trailer-mounted boards are towed behind a company truck and are cheaper to rent and deploy. Truck-mounted boards are welded or bolted to a dedicated truck, require no towing setup, and can be repositioned quickly. Choose trailer-mounted for multi-day or fixed-location work. Choose truck-mounted for mobile crews, utility work, or single-lane jobs where speed of setup matters.',
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
          h('tr', null, h('th', null, 'Factor'), h('th', null, 'Trailer-Mounted'), h('th', null, 'Truck-Mounted')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', null, 'Setup time'), h('td', null, '30-60 min'), h('td', null, '5-15 min')),
          h('tr', null, h('td', null, 'Daily rental'), h('td', null, '$75-$125'), h('td', null, '$150-$250')),
          h('tr', null, h('td', null, 'Fuel cost'), h('td', null, 'Low (towed)'), h('td', null, 'Higher (dedicated truck)')),
          h('tr', null, h('td', null, 'Portability'), h('td', null, 'Good (tow to next site)'), h('td', null, 'Excellent (always ready)')),
          h('tr', null, h('td', null, 'Best use case'), h('td', null, 'Multi-day, fixed location'), h('td', null, 'Mobile, multiple sites')),
        ),
      ),
    ),
    h('h2', null, 'What are typical arrow board rental rates?'),
    h(
      'p',
      null,
      'Rental rates vary by region, Type (A/B/C), and whether the board includes delivery and operator labor. These ranges reflect 2026 market rates for the lower 48 states.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Type B trailer (standard)'), ' - $75-$125/day, $250-$400/week, $650-$950/month'),
      h('li', null, h('strong', null, 'Type C trailer (highway-grade)'), ' - $125-$175/day, $400-$600/week, $1,000-$1,500/month'),
      h('li', null, h('strong', null, 'Truck-mounted (any type)'), ' - $150-$250/day, $500-$800/week, $1,200-$1,800/month'),
      h('li', null, h('strong', null, 'Delivery/setup'), ' - $150-$300 first drop, return trip included or billed separately'),
      h('li', null, h('strong', null, 'Operator/attendance'), ' - Some providers bundle a driver; others bill labor separately at $40-$80/hr'),
    ),
    h('h2', null, 'What questions should I ask a rental provider?'),
    h(
      'p',
      null,
      'Before booking, confirm: (1) Does the rental include delivery and pickup, or is that billed separately? (2) Is the board MUTCD-compliant and tested for crashworthiness (NCHRP 350 or MASH)? (3) Are replacement lamps included if any burn out during the rental term? (4) What is the backup plan if the board malfunctions? (5) Do they provide setup labor, or must you arrange it? (6) Are there minimum rental periods or discounts for longer terms?',
    ),
    h('h2', null, 'Can I buy a used arrow board instead of renting?'),
    h(
      'p',
      null,
      'Used arrow boards range from $5,000 to $15,000, depending on age, lamp count, and condition. Unless you deploy boards weekly, rental is cheaper. Buying commits you to maintenance, storage, and lamp replacement ($2,000-$5,000 annually). Rental providers absorb these costs and guarantee MUTCD compliance.',
    ),
    h('h2', null, 'What maintenance does an arrow board need while rented?'),
    h(
      'p',
      null,
      'The rental provider handles all maintenance. Your crew should: (1) Keep the board clean and free of mud/snow that could obscure the display. (2) Ensure power connections stay secure. (3) Verify the arrow pattern matches your work zone (left merge, right merge, or straight-ahead). (4) Never leave the board unattended or without advance warning signs. (5) Report any dimming or burned lamps immediately.',
    ),
  ),
  faqs: [
    {
      q: 'Do I need a Type C arrow board for a 55 mph highway?',
      a: 'Almost certainly yes. Type C is MUTCD-required for speeds above 50 mph on multi-lane roads. Type B may work for a single-lane closure on a lower-speed road, but verify with your state DOT or traffic engineer.',
    },
    {
      q: 'What happens if my crew damages the rented arrow board?',
      a: 'Rental agreements typically have damage waiver options. Collision, theft, and weather damage can cost $500-$2,000 to repair. Ask about insurance and waivers upfront.',
    },
    {
      q: 'Can I use an arrow board on a private parking lot or driveway?',
      a: 'MUTCD applies to public roads and highways. Private work may have local codes or no codes at all, but using a MUTCD-compliant board is always safer and more professional.',
    },
    {
      q: 'How far upstream does an arrow board need to be from the work zone?',
      a: 'MUTCD requires advance warning at least 500 feet upstream on low-speed roads, 1,000 feet on 45-55 mph roads, and 1,500 feet on 55+ mph roads. The arrow board is placed at the taper entrance or sooner.',
    },
    {
      q: 'Can I rent an arrow board just for a single shift or 4-hour job?',
      a: 'Most providers require a minimum 1-day rental. Some may negotiate hourly rates for short jobs, but expect premium pricing. For quick traffic fixes, consider cones and signs instead.',
    },
    {
      q: 'Do arrow boards need solar power or a diesel generator?',
      a: 'Most modern boards are solar-powered, which eliminates fuel costs and noise. Older boards may use diesel or tow-behind generators. Ask the rental company whether the board is solar-equipped.',
    },
    {
      q: 'What is the difference between a solid arrow and a flashing arrow?',
      a: 'Flashing arrows (sequential chase) are far more visible and are standard on all MUTCD-compliant boards. Some boards also offer message mode (e.g., "Left Lane Closed 1 Mile"). Verify the board supports the arrow pattern you need.',
    },
    {
      q: 'Can I rent an arrow board month-to-month, or do I need a long-term commitment?',
      a: 'Most rental companies offer daily, weekly, monthly, and sometimes project-based contracts. Longer terms usually come with discounts. Discuss your timeline when you quote.',
    },
  ],
  relatedProducts: [
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
  ],
  relatedArticles: ['uniform-traffic-control-devices-mutcd-guide', 'barricade-rental-near-me-guide'],
}
