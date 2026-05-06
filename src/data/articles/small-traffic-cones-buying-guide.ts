import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "small cones" / "small traffic cones" (~5,000/mo, High comp, $5.55 bid).
 * Commercial sizing comparison angle - paired with large-traffic-cones-buying-guide.
 * Decision-tree structure: where each small size (4", 6", 9", 12", 18") actually fits.
 */
export const articleSmallTrafficConesBuyingGuide: Article = {
  slug: 'small-traffic-cones-buying-guide',
  title: 'Small Traffic Cones: 4" to 18" Sizes Compared',
  excerpt:
    'Small traffic cones (4", 6", 9", 12", 18") are not roadway gear - they are floor markers, training cones, parking-stripers, and warehouse channelizers. Here is which size fits which job, and what NOT to use them for.',
  metaDescription:
    'Small traffic cones buying guide - 4 inch, 6 inch, 9 inch, 12 inch, and 18 inch sizes compared. Where each fits, what they cost, and when to size up to a real roadway cone.',
  primaryKeyword: 'small cones',
  secondaryKeywords: [
    'small traffic cones',
    'mini traffic cones',
    'small orange cones',
    'small safety cones',
    '4 inch cones',
    '6 inch cones',
    '9 inch cones',
    '12 inch cones',
    '18 inch cones',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-06',
  readMinutes: 6,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Small traffic cones means anything ',
      h('strong', null, 'shorter than 28" - typically 4", 6", 9", 12", or 18" tall'),
      '. They are not legal for roadway use under MUTCD, but each size has a real job: floor marking, training drills, parking striping, warehouse pedestrian routes. Pick the wrong size and the cone gets ignored or kicked across the floor. Here is the decision tree.',
    ),

    h('h2', null, 'Quick decision: which small cone fits your job'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null,
            h('th', { className: 'text-left p-2 border-b' }, 'Job'),
            h('th', { className: 'text-left p-2 border-b' }, 'Size'),
            h('th', { className: 'text-left p-2 border-b' }, 'Why'),
          ),
        ),
        h('tbody', null,
          h('tr', null, h('td', { className: 'p-2' }, 'Soccer / agility drill'), h('td', { className: 'p-2' }, '4" or 6"'), h('td', { className: 'p-2' }, 'Foot-clearable disc, no tipping')),
          h('tr', null, h('td', { className: 'p-2' }, 'Wet floor / spill warning indoors'), h('td', { className: 'p-2' }, '12"'), h('td', { className: 'p-2' }, 'Visible from 20 ft, fits in a closet')),
          h('tr', null, h('td', { className: 'p-2' }, 'Parking-lot striping / queue line'), h('td', { className: 'p-2' }, '18"'), h('td', { className: 'p-2' }, 'Visible to drivers, light enough to redeploy')),
          h('tr', null, h('td', { className: 'p-2' }, 'Warehouse pedestrian channel'), h('td', { className: 'p-2' }, '18"'), h('td', { className: 'p-2' }, 'Tall enough to deter cart drivers')),
          h('tr', null, h('td', { className: 'p-2' }, 'Driver-ed practice course'), h('td', { className: 'p-2' }, '9" or 12"'), h('td', { className: 'p-2' }, 'Visible from a windshield, cheap if hit')),
          h('tr', null, h('td', { className: 'p-2' }, 'Any roadway, parking lot above 5 mph'), h('td', { className: 'p-2' }, 'Use 28"+ instead'), h('td', { className: 'p-2' }, 'Small cones are not MUTCD-compliant')),
        ),
      ),
    ),

    h('h2', null, 'Size-by-size breakdown'),

    h('h3', null, '4-inch and 6-inch cones (sport / training cones)'),
    h(
      'p',
      null,
      'These are coaching cones - flat-footed discs or short cones used for soccer, lacrosse, basketball drills, and agility work. They are made to be stepped on without breaking. Sold in stacks of 10-50 in mixed colors so coaches can run multi-color drills. Typical price: ',
      h('strong', null, '$0.50-$1.20 per cone in stacks of 50.'),
      ' Do not use these for any vehicle traffic - a 4" cone disappears under any tire.',
    ),

    h('h3', null, '9-inch cones (driver training, low-speed drills)'),
    h('p', null, 'The 9" cone is a step up from sport cones - heavier base, more visible. Used by driving schools for parallel-parking practice and slow-speed maneuvering. Some warehouses use them as floor markers for low-traffic forklift areas. Price: $2-$4 per cone. Still too small for any active traffic.'),

    h('h3', null, '12-inch cones (indoor warning, wet-floor markers)'),
    h(
      'p',
      null,
      'The 12" cone is the standard "wet floor" / spill marker for offices, retail floors, hospitals, and gyms. Bright orange or yellow PVC, sometimes with a printed "Wet Floor" message. Lightweight (under 1 lb) and stackable in a janitor closet. Price: ',
      h('strong', null, '$3-$6 each.'),
      ' Some come with two reflective collars but the reflectivity is decorative at this size - the cone is not for nighttime roadway use.',
    ),

    h('h3', null, '18-inch cones (parking lots, light commercial use)'),
    h('p', null, 'The 18" cone is the largest "small" cone and the smallest one that some lower-speed parking lots will accept. Used by valet operators, event-parking crews, and drive-thru queue setups. Heavy enough (2-4 lb) to stay put in mild wind. Price: $7-$14 each. NOT acceptable for street work even on residential roads - MUTCD requires a minimum 28" cone for any roadway above 25 mph during daylight, and 36" at night.'),

    h('h2', null, 'Where small cones go wrong'),
    h('p', null, 'The most common contractor mistake: showing up to a residential job with 18" cones because that is what was on the truck. A municipal inspector or NJDOT roving foreman will shut the work zone down. The MUTCD line is clear: 28" or taller for any traffic-direction use. If you need cones for a driveway-only job (no public road), 18" is the practical floor.'),

    h('h2', null, 'Reflective collars on small cones'),
    h(
      'p',
      null,
      'You will see "reflective" 12" and 18" cones in catalogs. The collar is real, but the reflectivity grade is rarely high enough for nighttime use - usually engineering-grade vinyl, not the ASTM D4956 Type IV+ that MUTCD requires for roadway cones. If your job has any night-shift component, use a 28" or 36" cone with proper sheeting. See our ',
      h('a', { href: '/blog/safety-cones-buying-guide' }, 'safety cones buying guide'),
      ' for the right specs.',
    ),

    h('h2', null, 'Buying in bulk'),
    h('p', null, 'Small cones are usually sold in cases of 10, 25, or 50. Per-cone price drops sharply with case quantity. A 50-pack of 12" wet-floor cones runs about $150-$240; a 10-pack runs $40-$60. Buy the case if you have anywhere to store them - they nest into a column under 36" tall.'),
    h('ul', null,
      h('li', null, '10-pack of 4" sport cones: $5-$12'),
      h('li', null, '50-pack of 4" sport cones: $20-$45'),
      h('li', null, '10-pack of 12" wet-floor cones: $40-$60'),
      h('li', null, '25-pack of 18" cones: $150-$280'),
    ),

    h('h2', null, 'When to skip small cones entirely'),
    h(
      'p',
      null,
      'For ANY public roadway, parking lot above 25 mph, construction zone, or job that an OSHA or DOT inspector might walk through: skip small cones, go straight to 28" or 36". The cost difference per cone ($10 versus $30) is trivial against a single citation or shutdown. Browse our ',
      h('a', { href: '/category/cones' }, 'full cones inventory'),
      ' or talk to the ',
      h('a', { href: '/assistant' }, 'AI Assistant'),
      ' if you are not sure which size your job needs.',
    ),

    h('h2', null, 'Small-cone storage and transport'),
    h('p', null, 'A bag of 50 sport cones fits in a cubby. A stack of 25 18" cones fits in a truck bed corner under 4 ft tall. The biggest pain point with small cones is misplacement - they are easy to lose at the bottom of a tool bag. Color-code by job (orange for active, yellow for spill, red for restricted) and store on a wall hook, not in a bin.'),
  ),
  faqs: [
    {
      q: 'Are small traffic cones legal for road work?',
      a: 'No. MUTCD requires a minimum 28" cone for any roadway use during daylight and 36" at night. Cones smaller than 28" are intended for floor marking, training, or low-speed parking lot use only.',
    },
    {
      q: 'What is the smallest cone I can use in a parking lot?',
      a: 'For parking-lot use under 10 mph (valet, event parking, drive-thru queues), 18" cones are commonly accepted. Anything above that speed - or any public-street boundary - should use a 28" or 36" cone.',
    },
    {
      q: 'Do small cones come in colors other than orange?',
      a: 'Yes. Sport cones come in mixed colors (red, yellow, blue, green) for drill differentiation. Wet-floor cones are commonly yellow with printed wording. Driver-training cones are usually orange. Color does not affect compliance - the issue is height.',
    },
    {
      q: 'How heavy is an 18-inch cone?',
      a: 'Most 18" cones weigh 2-4 lb depending on the base. That is heavy enough for indoor use and calm-day outdoor use, but not for any wind-exposed location. Sandbag the base if the cone needs to hold position outdoors.',
    },
    {
      q: 'What is the difference between a small traffic cone and a sport cone?',
      a: 'Sport cones (4-9") are designed for athletic drills - flat or short, soft enough to step on. Small traffic cones (12-18") have proper bases and look like miniature road cones. They do not interchange well - a sport cone in a wet-floor application is too low to see.',
    },
    {
      q: 'Can I use small cones to mark out a soccer practice and a parking event?',
      a: 'Use different cones for each. Sport cones (4-6") are too small for any vehicle scenario. 18" cones are too tall to step on without tripping during agility drills. Buy a small kit of each instead of trying to use one size for both.',
    },
  ],
  relatedProducts: [
    { label: 'Traffic Cones', path: '/category/cones' },
    { label: 'Wet Floor Signs', path: '/category/signs' },
    { label: 'Safety Cones', path: '/category/cones' },
    { label: 'Get a Quote', path: '/quote' },
  ],
  relatedArticles: [
    'large-traffic-cones-buying-guide',
    'safety-cones-buying-guide',
    'traffic-cones-buying-guide',
  ],
}
