import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "red cones" (~5,000/mo, High comp, $8.76 bid).
 * FAQ-heavy AEO / definitional angle - what red cones actually mean,
 * whether they're MUTCD-legal, where they're legitimately used, and
 * what to buy if you actually want a red traffic cone.
 */
export const articleRedConesExplained: Article = {
  slug: 'red-cones-explained',
  title: 'Red Cones: Are They Legal, What They Mean, and When to Buy Them (2026)',
  excerpt:
    'Red traffic cones aren\'t MUTCD-compliant for public road work - the standard is fluorescent orange. Here is when red cones are legitimately used (private property, military, fire, indoor) and what to buy if you need them.',
  metaDescription:
    'Red cones explained - why MUTCD requires orange, when red is legitimate (private, fire, military), and what to buy. AEO answer card with FAQs.',
  primaryKeyword: 'red cones',
  secondaryKeywords: [
    'red traffic cones',
    'red safety cones',
    'red parking cones',
    'are red cones legal',
    'what do red cones mean',
    'red cone meaning',
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
      'Red traffic cones are ',
      h('strong', null, 'NOT MUTCD-compliant for public road work'),
      ' - the federal standard requires fluorescent orange or fluorescent yellow-green for any cone used on a public roadway. Red cones are legitimate, however, in private-property, military, fire-service, and indoor-warehouse settings where MUTCD does not apply. Below: what red cones mean, when they\'re used, and what to buy if you need them.',
    ),

    h('h2', null, 'Are red traffic cones legal?'),
    h(
      'p',
      null,
      'It depends on where they\'re used:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Public roads (state, county, municipal): '), 'No. The MUTCD (11th edition, Section 6F.66) requires fluorescent orange or fluorescent yellow-green for cones used on public roadways. Red is not in the spec. NJDOT, NJTA, and county inspectors will reject red cones in any public-road work zone.'),
      h('li', null, h('strong', null, 'Private property (parking lots, gated communities, private roads): '), 'Yes. The MUTCD does not govern private property. Red cones are commonly used to designate fire lanes, reserved parking, and "do not enter" zones inside private parking structures.'),
      h('li', null, h('strong', null, 'Military installations: '), 'Yes, and often required. Many DoD bases and ranges use red cones to mark restricted areas, ordnance zones, and "stop here" points at gate checkpoints.'),
      h('li', null, h('strong', null, 'Fire service: '), 'Yes. Fire departments use red cones to mark fire-hydrant zones, fire-lane entrances, and incident-perimeter staging.'),
      h('li', null, h('strong', null, 'Indoor warehouse / industrial: '), 'Yes. OSHA does not require a specific color for in-building cones; red is commonly used to designate hazard zones, forklift-no-go areas, and emergency-equipment locations.'),
    ),

    h('h2', null, 'What do red cones mean?'),
    h(
      'p',
      null,
      'Red cones don\'t have a single fixed meaning - the meaning is set by the property owner or organization deploying them. Common conventions:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Fire lane / fire equipment: '), 'fire departments and many private property managers use red to mark a no-park fire lane or hydrant zone.'),
      h('li', null, h('strong', null, 'Reserved / VIP parking: '), 'red cones often mark reserved spots in private lots (corporate, hotel, hospital).'),
      h('li', null, h('strong', null, '"Stop" or "do not enter": '), 'at military and security checkpoints, red cones mean "stop here" or "do not pass."'),
      h('li', null, h('strong', null, 'Hazard / chemical area: '), 'in industrial settings, red can mean a chemical-spill zone or restricted-access perimeter.'),
    ),
    h(
      'p',
      null,
      'If you put red cones on your private property, the meaning is whatever you tell people it is. There is no national or state convention.',
    ),

    h('h2', null, 'Why MUTCD picked orange (and not red)'),
    h(
      'p',
      null,
      'Two practical reasons fluorescent orange is the federal road-work standard:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Daytime visibility. '), 'Fluorescent orange is the most visible color in daylight against asphalt, concrete, snow, and most vegetation backgrounds. Red is visible but less so against red-brown earth tones (common in highway shoulders).'),
      h('li', null, h('strong', null, 'Color-blindness compatibility. '), 'About 8% of men are red-green colorblind. Red signage is harder for them to distinguish; fluorescent orange is more universally visible.'),
    ),
    h(
      'p',
      null,
      'These reasons don\'t apply at private-property scale. A fire-lane red cone in a parking lot is not asking a 70-mph driver to react in 2 seconds; it\'s asking a parking driver to read a static restriction.',
    ),

    h('h2', null, 'Red cone sizes available'),
    h(
      'p',
      null,
      'Red cones are usually sold in three sizes:',
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
          h('tr', null, h('th', { className: 'text-left p-2 border-b' }, 'Size'), h('th', { className: 'text-left p-2 border-b' }, 'Weight'), h('th', { className: 'text-left p-2 border-b' }, 'Typical use'), h('th', { className: 'text-left p-2 border-b' }, 'Price')),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, '12"'), h('td', { className: 'p-2' }, '1 lb'), h('td', { className: 'p-2' }, 'Indoor / warehouse / hazard zones'), h('td', { className: 'p-2' }, '$8-$15')),
          h('tr', null, h('td', { className: 'p-2' }, '18"'), h('td', { className: 'p-2' }, '3 lb'), h('td', { className: 'p-2' }, 'Parking lot, fire lane, valet'), h('td', { className: 'p-2' }, '$15-$25')),
          h('tr', null, h('td', { className: 'p-2' }, '28"'), h('td', { className: 'p-2' }, '5-7 lb'), h('td', { className: 'p-2' }, 'Military checkpoint, large private lots'), h('td', { className: 'p-2' }, '$25-$40')),
        ),
      ),
    ),
    h('p', null, 'Red cones are usually offered in PVC or molded rubber. Reflective collars (white) are optional and typically not required - red cones are usually not used at night-time vehicle speeds.'),

    h('h2', null, 'When NOT to buy red cones'),
    h(
      'p',
      null,
      'Skip red and buy orange instead if any of these apply:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'You\'re doing any work on a public road, anywhere.'),
      h('li', null, 'Your jobs include NJDOT, county, or municipal inspections.'),
      h('li', null, 'You need cones that work for both private and public sites - orange is universal, red is private-only.'),
      h('li', null, 'You want resale value - used orange cones are easier to move than used red.'),
    ),
    h('p', null, 'For most NJ contractors, fluorescent orange is the right buy. Red is a specialty purchase for specific use cases.'),

    h('h2', null, 'When red cones are the right buy'),
    h(
      'p',
      null,
      'Red is the right purchase when:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'You manage a private property (parking lot, gated community, hotel, hospital) and want to designate fire lanes or reserved areas.'),
      h('li', null, 'You operate a fire department or fire-marshal office.'),
      h('li', null, 'You\'re on a military installation that specs red cones.'),
      h('li', null, 'You manage an industrial site where OSHA-style hazard color-coding (red = stop / fire) is in use.'),
      h('li', null, 'You run a valet operation and want a brand-color that stands out from generic orange.'),
    ),

    h('h2', null, 'Red vs. orange in real-world use'),
    h(
      'p',
      null,
      'On a typical NJ contractor truck, you\'ll see 90%+ orange cones and an occasional handful of red for specific tasks. Common red-cone deployments we see in the field:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Hospital parking-lot ambulance bay markers.'),
      h('li', null, 'Hotel valet zones at the front-door drop-off.'),
      h('li', null, 'Corporate-campus fire-lane markings (especially data centers, refineries, distribution warehouses).'),
      h('li', null, 'Wedding / event venues marking off "no parking past this point" zones.'),
    ),

    h('h2', null, 'Where to buy red cones in NJ'),
    h(
      'p',
      null,
      'Red cones are usually a special-order or limited-stock item at TC suppliers. Browse our ',
      h('a', { href: '/category/cones-drums' }, 'cones, drums and channelizers category'),
      ' for in-stock items, or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' for red cones in 12", 18", and 28" sizes - same-day Central NJ delivery on stock items, 5-10 business days on special orders. For roadway work, see our ',
      h('a', { href: '/article/highway-cones-guide' }, 'highway cones guide'),
      ' on the orange MUTCD-compliant alternatives.',
    ),
  ),
  faqs: [
    {
      q: 'Are red traffic cones legal on public roads?',
      a: 'No. The MUTCD (Manual on Uniform Traffic Control Devices, 11th edition, Section 6F.66) requires fluorescent orange or fluorescent yellow-green cones on public roadways. Red is not in the spec, and NJDOT inspectors will reject red cones in any public-road work zone.',
    },
    {
      q: 'What do red traffic cones mean?',
      a: 'Red cones do not have a single fixed meaning. Property owners use them to mark fire lanes, reserved parking, hazard zones, security checkpoints, or "do not enter" areas. Meaning is local - whatever the property owner or organization says it is.',
    },
    {
      q: 'Where can I use red cones legally?',
      a: 'On private property (parking lots, gated communities, hotels, corporate campuses, hospitals, industrial sites), at military installations that spec them, in fire-service deployments, and indoors in warehouses or factories. Anywhere MUTCD applies (public roads), red is not allowed.',
    },
    {
      q: 'Why are most traffic cones orange and not red?',
      a: 'Fluorescent orange is more visible than red against typical roadway backgrounds (asphalt, concrete, dirt) and works better for color-blind drivers. The MUTCD picked it as the federal road-work standard for these visibility reasons. Red works fine in low-speed private-property settings where those reasons matter less.',
    },
    {
      q: 'How much do red cones cost?',
      a: 'A 12" indoor red cone is $8-$15. An 18" parking-lot red cone is $15-$25. A 28" red cone (for private-road or military checkpoint use) is $25-$40. Bulk pricing usually kicks in at 25-50 unit orders.',
    },
    {
      q: 'Can I use red cones to mark a fire lane?',
      a: 'Yes, on private property. Many property managers use red cones to designate fire lanes, especially in parking lots and at corporate or hospital entrances. Some local fire codes specifically reference or recommend red for fire-lane markings - check with your local fire marshal for the exact requirement in your municipality.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'orange-cones-explained',
    'highway-cones-guide',
    'safety-pylons-vs-traffic-cones',
  ],
}
