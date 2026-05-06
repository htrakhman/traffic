import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "safety cones near me" (~5,000/mo, High comp, $8.81 bid).
 * Local intent / decision-tree angle - where to actually buy safety cones
 * in NJ today, with a flow chart for "what should I do" depending on
 * timeline, quantity, and spec needs.
 */
export const articleSafetyConesNearMeNj: Article = {
  slug: 'safety-cones-near-me-nj',
  title: 'Safety Cones Near Me: Where to Buy in NJ (Same-Day Decision Tree, 2026)',
  excerpt:
    'Searching "safety cones near me" usually means you need them today. Here is a practical decision tree for NJ contractors - what to buy where, by quantity, by spec, by deadline.',
  metaDescription:
    'Where to buy safety cones near you in NJ - hardware store vs traffic-control supplier vs same-day delivery. Decision tree by quantity, spec, and timeline.',
  primaryKeyword: 'safety cones near me',
  secondaryKeywords: [
    'traffic cones near me',
    'safety cones for sale near me',
    'orange cones near me',
    'road cones near me',
    'where to buy safety cones',
    'safety cones nj',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-05',
  readMinutes: 6,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'When NJ contractors search "safety cones near me," they usually need cones ',
      h('strong', null, 'today, in volume, and to a specific MUTCD spec'),
      '. Hardware stores have a few cones in stock; traffic-control suppliers have hundreds in the right sizes with the right reflective collars. Below: a decision tree by timeline and spec, so you don\'t waste a half-day driving to four Home Depots looking for 36" cones.',
    ),

    h('h2', null, 'Quick decision tree'),
    h(
      'p',
      null,
      'Before you drive anywhere, answer three questions:',
    ),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'How many do you need? '), '1-5 / 6-25 / 26+'),
      h('li', null, h('strong', null, 'Do they need to be MUTCD-compliant for road work? '), 'Yes / no'),
      h('li', null, h('strong', null, 'When do you need them? '), 'Today / this week / next week or later'),
    ),
    h(
      'p',
      null,
      'The combination of those three answers tells you exactly where to go. Here is the matrix:',
    ),

    h('h2', null, 'The "where to buy" matrix'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Need'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best source'),
            h('th', { className: 'text-left p-2 border-b' }, 'Realistic price'),
            h('th', { className: 'text-left p-2 border-b' }, 'Wait'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '1-5 cones, no spec, today'), h('td', { className: 'p-2' }, 'Big-box hardware (HD/Lowes)'), h('td', { className: 'p-2' }, '$15-$25/ea'), h('td', { className: 'p-2' }, 'Drive there')),
          h('tr', null, h('td', { className: 'p-2' }, '6-25 cones, no spec, today'), h('td', { className: 'p-2' }, 'Local TC supplier with delivery'), h('td', { className: 'p-2' }, '$20-$35/ea'), h('td', { className: 'p-2' }, '4-8 hr')),
          h('tr', null, h('td', { className: 'p-2' }, '26+ cones, MUTCD spec, today'), h('td', { className: 'p-2' }, 'Same-day delivery TC supplier'), h('td', { className: 'p-2' }, '$22-$32/ea'), h('td', { className: 'p-2' }, 'Same day in Central NJ')),
          h('tr', null, h('td', { className: 'p-2' }, '50+ cones, MUTCD spec, this week'), h('td', { className: 'p-2' }, 'Wholesale order with delivery'), h('td', { className: 'p-2' }, '$18-$28/ea'), h('td', { className: 'p-2' }, '1-3 days')),
          h('tr', null, h('td', { className: 'p-2' }, '100+ cones, MUTCD spec, lead time OK'), h('td', { className: 'p-2' }, 'Direct from manufacturer'), h('td', { className: 'p-2' }, '$15-$22/ea'), h('td', { className: 'p-2' }, '1-3 weeks')),
        ),
      ),
    ),
    h('p', null, 'For 90% of "safety cones near me" searches in NJ, the right answer is option 3: a TC supplier with same-day delivery. Hardware stores rarely stock more than 6-10 cones at a time, and almost never the 36" MUTCD-compliant ones with proper reflective collars.'),

    h('h2', null, 'Why hardware stores are the wrong answer (for contractors)'),
    h(
      'p',
      null,
      'Big-box hardware stores - Home Depot, Lowes, Menards - stock 28" PVC cones with 5 lb bases. Three problems for contractor use:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Wrong height. '), 'NJDOT and the MUTCD require 36" cones on roadways posted 45+ mph. Hardware-store cones are almost always 28".'),
      h('li', null, h('strong', null, 'Wrong reflective spec. '), 'Hardware-store cones often have ASTM Type I sheeting (engineering grade). NJDOT specs require Type IV or higher. The collar will look reflective in a flashlight test but fail an inspector\'s photometer reading.'),
      h('li', null, h('strong', null, 'Wrong quantity. '), 'A typical Home Depot has 4-12 cones in stock. A single-lane closure on a 55 mph road needs 30-40 cones. You\'ll clean out 3 stores and still be short.'),
    ),
    h(
      'p',
      null,
      'For homeowner / driveway / school-event use, hardware-store cones are fine. For contractor work on a public road, they are not the right tool.',
    ),

    h('h2', null, 'What to ask a TC supplier on the phone'),
    h(
      'p',
      null,
      'When you call a traffic-control supplier, the staff will move faster if you can tell them:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Cone height (28" or 36").'),
      h('li', null, 'Base weight (7 lb, 10 lb, 12 lb).'),
      h('li', null, 'Reflective sheeting type (Type III, IV, V).'),
      h('li', null, 'Quantity needed today vs. quantity for restock.'),
      h('li', null, 'Delivery address (street + ZIP) - drives the delivery window quote.'),
    ),
    h(
      'p',
      null,
      'A reasonable supplier will quote a price and a delivery window in under 2 minutes. If they need to "check stock" for more than 10 minutes, call somewhere else - that is usually code for "we don\'t have any."',
    ),

    h('h2', null, 'Same-day delivery in Central NJ'),
    h(
      'p',
      null,
      'Same-day cone delivery is realistic anywhere in Central NJ if you order before noon. Delivery windows and pricing depend on:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Distance from the supplier\'s yard - most NJ TC suppliers are based in Mercer, Middlesex, or Monmouth counties.'),
      h('li', null, 'Quantity - 50 cones fits in a pickup; 200 cones needs a box truck.'),
      h('li', null, 'Stock level - 36" 12 lb Turnpike-spec cones occasionally back-order.'),
    ),
    h('p', null, 'Typical Central NJ same-day windows are 4-8 hours from order to drop-off. North Jersey, Ocean County, and Hunterdon are usually next-business-day.'),

    h('h2', null, 'When pickup is the better answer'),
    h(
      'p',
      null,
      'If you\'re between deliveries, on the way back to the yard, or you only need 5-10 cones, will-call pickup at the supplier is faster than waiting for a delivery driver. Most TC suppliers in NJ have a fenced yard with a phone-in pickup window. Call ahead, give them the SKU and quantity, drive over, sign, leave.',
    ),
    h('p', null, 'Will-call is also the right move when you need a specific cone the supplier might not have on the truck (42" cones, lime-green daytime cones, custom-printed bases). Always confirm stock before you drive.'),

    h('h2', null, 'What to do if no NJ supplier has stock today'),
    h(
      'p',
      null,
      'Two backup options when local stock is thin:',
    ),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'Borrow from a peer. '), 'Other NJ contractors will often loan 50-100 cones for a day if you can return same number same condition. Build that network before you need it.'),
      h('li', null, h('strong', null, 'Substitute drums for cones in some positions. '), 'Where MUTCD allows, a 42" drum (channelizing drum) can stand in for several cones at the head of a taper. Drums are bulkier but you may have them in your yard already.'),
    ),
    h(
      'p',
      null,
      'Do not substitute hardware-store cones into a state-route work zone. NJDOT inspectors can stop work and you eat a day\'s crew time.',
    ),

    h('h2', null, 'Where to buy safety cones near you'),
    h(
      'p',
      null,
      'For Central NJ contractors, browse our ',
      h('a', { href: '/category/cones-drums' }, 'cones, drums and channelizers category'),
      ' for 28" and 36" MUTCD-compliant cones with Type IV collars. Same-day delivery in Central NJ; 50+ in stock at all times. Call (732) 675-2499 or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' for a price and delivery window in under 2 minutes.',
    ),
  ),
  faqs: [
    {
      q: 'Where can I buy safety cones near me in NJ today?',
      a: 'For 1-5 cones with no MUTCD spec, Home Depot or Lowes will have small PVC cones in stock. For 5+ cones to MUTCD spec for road work, call a Central NJ traffic-control supplier - same-day delivery is realistic anywhere in Mercer, Middlesex, Monmouth, Somerset, Union, Hunterdon, and northern Ocean if you order before noon.',
    },
    {
      q: 'Does Home Depot sell traffic cones?',
      a: 'Home Depot stocks 18" and 28" PVC cones in small quantities (typically 4-12 per store). They are fine for parking lots and driveways but usually not MUTCD-compliant for roadway work - the height and reflective sheeting often do not meet NJDOT specs.',
    },
    {
      q: 'How much do safety cones cost?',
      a: 'A 28" 7 lb cone with one reflective collar is $22-$32 retail in 2026. A 36" 10 lb cone with two collars (NJDOT-compliant) is $32-$48. Bulk orders of 25+ run $4-$8 less per cone.',
    },
    {
      q: 'Can I get same-day cone delivery in NJ?',
      a: 'Yes, in Central NJ if you order before noon. Most local TC suppliers run a daily route covering Mercer, Middlesex, Monmouth, Somerset, Union, and parts of Hunterdon and Ocean. North NJ is usually next-day.',
    },
    {
      q: 'Are hardware-store cones okay for road work?',
      a: 'Generally no. Hardware-store cones are typically 28" PVC with 5 lb bases and Type I reflective sheeting. NJDOT specs require 36" with 10+ lb bases and Type IV sheeting on most state routes. Inspectors will reject hardware-store cones on a public road work zone.',
    },
    {
      q: 'How many safety cones do I need?',
      a: 'For a single-lane closure on a 55 mph road with a 1,000 ft work zone, plan on 35-40 cones. For a residential street closure under 35 mph, plan on 12-18. For a parking-lot setup, 6-10 is usually enough. Round up 25% for damage replacement.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'traffic-cones-near-me-same-day-delivery',
    'highway-cones-guide',
    'safety-cones-buying-guide',
  ],
}
