import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "reflective traffic cones" (~500/mo, High comp, $10.99 bid).
 * Pillar guide on cone reflectivity — the spec most buyers ignore until
 * they fail a nighttime inspection. Covers ASTM sheeting types, MUTCD
 * collar geometry, and what to actually buy.
 */
export const articleReflectiveTrafficConesGuide: Article = {
  slug: 'reflective-traffic-cones-guide',
  title: 'Reflective Traffic Cones: ASTM Sheeting Grades, Collar Specs, and Nighttime Inspection',
  excerpt:
    'Most "traffic cones" sold at hardware stores are not legal for nighttime road work. The reflective collars are too narrow, too low-grade, or missing entirely. Here is what reflective actually means on a cone.',
  metaDescription:
    'Reflective traffic cones explained — ASTM Type IV vs Engineer Grade sheeting, collar geometry per MUTCD, and what to buy for nighttime road work in NJ.',
  primaryKeyword: 'reflective traffic cones',
  secondaryKeywords: [
    'reflective cones',
    'retroreflective tape',
    'high visibility traffic cones',
    'nighttime traffic cones',
    'traffic cone reflective collar',
    'ASTM Type IV traffic cones',
  ],
  targetVolume: 500,
  datePublished: '2026-05-12',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'A reflective traffic cone is only legal for nighttime road work if it has two ASTM Type IV (or better) collars at the right heights.'),
      ' For a 28" cone, that means a 6" collar starting 3–4" from the top and a 4" collar starting 2" below the first. ',
      'For a 36" cone, both collars are 6" wide. ',
      'Anything narrower, anything in Engineer Grade sheeting, anything with a single collar — fails MUTCD §6F.65 the moment a state or municipal inspector looks. ',
      'Below: the sheeting grades that matter, the collar geometry, what to expect to spend, and the cones we actually stock for NJ contractors.',
    ),

    h('h2', null, 'Why reflectivity matters more than people think'),
    h(
      'p',
      null,
      'Headlights at night put about 40 candela of light onto a cone 200 ft away. A non-reflective cone returns essentially zero of that light back to the driver — the cone is invisible until the headlight beam itself lights its surface, which happens at roughly 100 ft. At 50 mph, 100 ft is 1.4 seconds of reaction distance. That is not enough.',
    ),
    h(
      'p',
      null,
      'A cone with two Type IV reflective collars returns about 250 candela per lux from each collar surface — the cone is visible at 800–1,000 ft, which gives the driver 11+ seconds at 50 mph. Same cone, same position, same headlights — the difference is one $4 sheeting upgrade per cone.',
    ),

    h('h2', null, 'ASTM sheeting types — the only spec that matters'),
    h(
      'p',
      null,
      'Reflective sheeting on a cone follows ASTM D4956. Five types show up in catalogs; only three are real options:',
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
          h(
            'tr',
            null,
            h('th', { className: 'text-left p-2 border-b' }, 'ASTM type'),
            h('th', { className: 'text-left p-2 border-b' }, 'Common name'),
            h('th', { className: 'text-left p-2 border-b' }, 'Brightness (cd/lx)'),
            h('th', { className: 'text-left p-2 border-b' }, 'Acceptable use'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Type I'), h('td', { className: 'p-2' }, 'Engineer Grade'), h('td', { className: 'p-2' }, '~70'), h('td', { className: 'p-2' }, 'Daytime channelizing only — NOT for nighttime road work')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type III'), h('td', { className: 'p-2' }, 'High-Intensity Beaded'), h('td', { className: 'p-2' }, '~250'), h('td', { className: 'p-2' }, 'Acceptable in some states; being phased out')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type IV'), h('td', { className: 'p-2' }, 'High-Intensity Prismatic'), h('td', { className: 'p-2' }, '~250'), h('td', { className: 'p-2' }, 'MUTCD nighttime minimum — buy this by default')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type IX'), h('td', { className: 'p-2' }, 'Very-High-Intensity Prismatic'), h('td', { className: 'p-2' }, '~500'), h('td', { className: 'p-2' }, 'Higher-speed roadways, weather hardship')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type XI'), h('td', { className: 'p-2' }, 'Diamond Grade'), h('td', { className: 'p-2' }, '~700+'), h('td', { className: 'p-2' }, 'Freeway-level deployment, premium price')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'For practical NJ contractor purposes, ',
      h('strong', null, 'Type IV is the right answer 95% of the time'),
      '. Type III still ships in older inventory; Type IX/XI is overkill for a municipal cone that will be on the road for an afternoon.',
    ),

    h('h2', null, 'Collar geometry — the spec that fails inspections'),
    h(
      'p',
      null,
      'MUTCD §6F.65 specifies collar widths and positions by cone height:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '28" cones (low-speed roads):'), ' One 6" collar starting 3–4" from the top, plus one 4" collar starting 2" below the first.'),
      h('li', null, h('strong', null, '36" cones (high-speed and nighttime):'), ' One 6" collar starting 3–4" from the top, plus one 4" collar starting 2" below the first. Some specs require a third reflective stripe lower down.'),
      h('li', null, h('strong', null, '42" channelizer drums:'), ' Four collars (two 4" white over two 4" orange), alternating, covering the upper two-thirds of the drum.'),
    ),
    h(
      'p',
      null,
      'Cheap import cones often ship with a single 3" collar — visually similar at 10 ft, fails the moment the inspector measures it. If a quote line item does not specify collar width, ask. The collar spec is what separates a "cone" from an MUTCD-compliant channelizing device.',
    ),

    h('h2', null, 'What "retroreflective" actually means'),
    h(
      'p',
      null,
      'Retroreflective sheeting bounces light back along the path it came from — so a vehicle\'s headlight returns light to that same vehicle\'s driver, not to a pedestrian standing off to the side. The mechanism is either glass beads (Types I–III) or microprismatic cube corners (Types IV+). Prismatic types are brighter, more durable, and more expensive.',
    ),
    h(
      'p',
      null,
      'A reflective collar is good for about 5–7 years of UV exposure before brightness degrades below acceptable. Cones in active fleet rotation should be inspected annually — fade and dirt are gradual. A quick gut check: shine a flashlight at the collar from 30 ft. If the return is clearly dimmer than a known-fresh cone, retire it from nighttime use.',
    ),

    h('h2', null, 'Pricing — what a real reflective cone costs'),
    h(
      'p',
      null,
      'For 28" cones with a 7-lb rubber base and double Type IV collars: $20–$32 each in case quantities. For 36" cones with a 10–12 lb base and double 6" collars: $35–$60. Single-collar Engineer Grade cones run $9–$15 — they have a place (parking-lot daytime use) but cannot legally back a road work zone after dark.',
    ),
    h(
      'p',
      null,
      'Custom-stenciled reflective cones (company name, phone) add roughly $4–$8 per cone over base pricing. Worth it on owned fleet because cones in plain orange disappear from job sites at a rate that surprises new contractors.',
    ),

    h('h2', null, 'Common buying mistakes'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Buying by photo, not spec sheet.'), ' Two cones look identical in product photos; one has Engineer Grade sheeting and one has Type IV. Always demand the ASTM spec.'),
      h('li', null, h('strong', null, 'Single-collar cones for road work.'), ' MUTCD requires two collars for any cone used on a road, day or night. Single-collar cones are for warehouse / parking-lot use.'),
      h('li', null, h('strong', null, 'Reflective tape "added later" to non-reflective cones.'), ' The bond fails inside one cleaning cycle. Buy molded-collar cones from the factory.'),
      h('li', null, h('strong', null, 'Buying short cones for fast roads.'), ' A 28" cone, no matter how reflective, is below windshield-line for many vehicles at 45+ mph. Step up to 36" for higher speeds.'),
    ),

    h('h2', null, 'How many reflective cones do you need'),
    h(
      'p',
      null,
      'For most NJ contractor work, plan a baseline kit:',
    ),
    h(
      'ul',
      null,
      h('li', null, '24× 28" Type IV double-collar cones (workhorse fleet)'),
      h('li', null, '12× 36" Type IV double-collar cones (high-speed and nighttime jobs)'),
      h('li', null, '6× 18" cones with single collar for parking-lot setups'),
      h('li', null, 'A spare 6-pack of each size for damaged-cone replacement'),
    ),
    h(
      'p',
      null,
      'For a sizing calculation by job, see ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'How Many Cones Do You Actually Need for a Lane Closure'),
      '.',
    ),

    h('h2', null, 'Where to buy in Central NJ'),
    h(
      'p',
      null,
      'Browse our ',
      h('a', { href: '/category/cones-drums' }, 'cones, drums, and channelizers'),
      ' for Type IV and Type IX sheeting, double-collar geometry, and rubber-base or recycled-rubber base options. Custom stenciling available. To match the right cones to a specific scope of work, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' — same-day Central NJ delivery on standard sizes.',
    ),
    h(
      'p',
      null,
      'Not sure what counts as "nighttime" for your job? The ',
      h('a', { href: '/assistant' }, 'site assistant'),
      ' will read your job description and return the cone spec the inspector will look for.',
    ),
  ),
  faqs: [
    {
      q: 'What sheeting grade do I need for nighttime traffic cones?',
      a: 'ASTM Type IV (High-Intensity Prismatic) is the current MUTCD nighttime minimum and is the right default for almost all NJ contractor work. Type IX or Type XI are stepped-up grades for higher-speed freeway work but are not required for typical municipal jobs. Engineer Grade (Type I) is NOT acceptable for nighttime road work.',
    },
    {
      q: 'How many reflective collars does a traffic cone need?',
      a: 'MUTCD §6F.65 requires two reflective collars on any cone used on a road. A 6" wide collar starting 3–4" from the top, plus a 4" wide collar starting 2" below it. Single-collar cones are for parking lots and warehouses, not road work zones.',
    },
    {
      q: 'How long do reflective collars last on a traffic cone?',
      a: 'Type IV sheeting on a fleet cone is good for roughly 5–7 years of UV exposure before brightness degrades below acceptable. Inspect annually — flashlight from 30 ft, compare to a fresh cone. If the return is clearly dimmer, rotate the old cone to daytime-only or recycle it.',
    },
    {
      q: 'Can I add reflective tape to a non-reflective cone?',
      a: 'Not reliably. Aftermarket adhesive tape bonds to PVC cone bodies for one or two cleaning cycles, then peels. MUTCD compliance requires factory-molded collars or heat-applied sheeting. If you are planning to use a cone after dark, buy it with the collars already installed.',
    },
    {
      q: 'What is the difference between reflective and retroreflective?',
      a: 'In casual use they are interchangeable. Technically, "retroreflective" means the light is bounced back along the path it came from — so a headlight beam returns to that vehicle\'s driver. All cone sheeting is retroreflective in this sense. A simple mirror is reflective but not retroreflective.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'traffic-cones-buying-guide',
    'how-many-cones-for-lane-closure-nj',
    'orange-cones-explained',
  ],
}
