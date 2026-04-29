import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "safety pylons" (50K/mo, High comp, ci=100). Definitional + comparison
 * piece. The cluster already has "what-is-a-traffic-pylon"; this one comes at
 * it from the "safety pylons vs cones vs delineators" angle, which is a different
 * search intent. AEO-flavored — directly answers the question "are safety pylons
 * the same as traffic cones." Structure: terminology table + comparison table.
 */
export const articleSafetyPylonsVsTrafficCones: Article = {
  slug: 'safety-pylons-vs-traffic-cones',
  title: 'Safety Pylons vs Traffic Cones vs Delineators: What Each One Actually Is',
  excerpt:
    '"Safety pylon" gets used for at least three different products: a tall traffic cone, a tubular delineator, and a flexible bollard. Here is which is which, what each one is for, and what to actually buy.',
  metaDescription:
    'Safety pylons explained: how they differ from traffic cones, channelizer drums, and delineator posts. Same-day NJ delivery on the right product for your job.',
  primaryKeyword: 'safety pylons',
  secondaryKeywords: [
    'traffic pylon',
    'traffic delineators',
    'tubular delineators',
    'flexible delineator post',
    'safety cones',
    'channelizer drum',
    'flexible bollard',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-29',
  dateModified: '2026-04-29',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      '"Safety pylon" is not a single product. ',
      h(
        'strong',
        null,
        'In the field the term gets used for three different things: (1) a tall traffic cone (28 in or 36 in), (2) a tubular delineator post, and (3) a flexible bollard.',
      ),
      ' Each is MUTCD-compliant for different jobs. If you are buying for a road work zone, you almost certainly want a 28-in or 36-in fluorescent-orange traffic cone. If you are buying to mark a permanent lane separation, you want a tubular delineator. If you are buying to protect a corner from being clipped by a delivery truck, you want a flexible bollard. Below is the breakdown of which is which and how to spec the right product.',
    ),

    h('h2', null, 'The three products people call "safety pylons"'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Product'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical height'),
            h('th', { className: 'text-left p-2 border-b' }, 'Anchored?'),
            h('th', { className: 'text-left p-2 border-b' }, 'MUTCD class'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best for'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Traffic cone (28 in / 36 in)'),
            h('td', { className: 'p-2' }, '28–36 in'),
            h('td', { className: 'p-2' }, 'No (rubber base)'),
            h('td', { className: 'p-2' }, 'Channelizing device — Section 6F.63'),
            h('td', { className: 'p-2' }, 'Short-term work zones, lane closures, taper'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Tubular delineator'),
            h('td', { className: 'p-2' }, '36–48 in'),
            h('td', { className: 'p-2' }, 'Yes (epoxy / drilled)'),
            h('td', { className: 'p-2' }, 'Channelizing device — Section 6F.65'),
            h('td', { className: 'p-2' }, 'Long-term lane separation, parking lane edge, bike lane'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Flexible bollard'),
            h('td', { className: 'p-2' }, '36–48 in'),
            h('td', { className: 'p-2' }, 'Yes (surface-mounted base)'),
            h('td', { className: 'p-2' }, 'Not a TTC device — perimeter / asset protection'),
            h('td', { className: 'p-2' }, 'Drive-thru pinch points, parking-lot corners, ADA loading zones'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Channelizer drum'),
            h('td', { className: 'p-2' }, '36 in'),
            h('td', { className: 'p-2' }, 'No (weighted base)'),
            h('td', { className: 'p-2' }, 'Channelizing device — Section 6F.64'),
            h('td', { className: 'p-2' }, 'Long-term work zones (replaces cones for >3-day jobs)'),
          ),
        ),
      ),
    ),

    h('h2', null, 'Safety pylon = traffic cone, in most contractor use'),
    h(
      'p',
      null,
      'In casual contractor and municipal use, "safety pylon" almost always means a tall traffic cone — typically 28 in or 36 in fluorescent orange with reflective collars. The cone is hand-deployable, weighted with a rubber base, and approved by MUTCD for short-term work zone channelization. If somebody tells you to "set out the safety pylons" on a paving job, this is what they mean.',
    ),
    h(
      'p',
      null,
      'For the cone-side spec breakdown, see our ',
      h('a', { href: '/blog/traffic-cones-buying-guide' }, 'traffic cones buying guide'),
      '. Our ',
      h('a', { href: '/blog/what-is-a-traffic-pylon' }, '"what is a traffic pylon" explainer'),
      ' covers the same product family from a different angle.',
    ),

    h('h2', null, 'Tubular delineator — when "pylon" means a permanent post'),
    h(
      'p',
      null,
      'In some jurisdictions and product catalogs, "pylon" specifically means a tubular delineator post — a tall, slim, flexible orange or white tube anchored into the pavement with epoxy or a drilled-and-driven base. These do not move. They are MUTCD Section 6F.65 channelizing devices used for ',
      h('em', null, 'long-term'),
      ' lane separation: bike-lane edges, dedicated turn lane separators, parking-lane delineation on a 4-lane city street.',
    ),
    h(
      'p',
      null,
      'Tubular delineators are generally white with reflective bands, but orange variants exist for work-zone use that lasts more than 14 days. They flex when struck by a vehicle and snap back to upright (most styles). Replacement is straightforward — unscrew the post from the base, insert a new one. The base stays anchored.',
    ),

    h('h2', null, 'Flexible bollard — perimeter and asset protection, not channelization'),
    h(
      'p',
      null,
      'Flexible bollards are sometimes called "safety pylons" by parking-lot operators and warehouse managers. They are 36–48 in tall, surface-mount on a steel-and-rubber plate, and protect a building corner, a drive-thru pinch point, or an ADA loading zone from being clipped by a delivery truck. They are ',
      h('em', null, 'not'),
      ' MUTCD channelizing devices — they are perimeter protection. Buying them as a "pylon" for a road work zone is the wrong product.',
    ),

    h('h2', null, 'Channelizer drum — the long-term work-zone alternative'),
    h(
      'p',
      null,
      'Once a work zone is going to last more than 3 days, the MUTCD prefers channelizer drums (36-in fluorescent-orange-and-white striped barrels with weighted bases) over cones. Drums do not migrate as much in wind, are more visible from speed, and survive being clipped at glancing angles. Some contractors call drums "safety pylons" too — and on a long-duration zone they are the right call. For the rule-of-thumb on cone-vs-drum decisions, see our ',
      h('a', { href: '/blog/portable-traffic-control-devices-guide' }, 'portable traffic control devices guide'),
      '.',
    ),

    h('h2', null, 'How to figure out which "safety pylon" you actually need'),
    h(
      'p',
      null,
      'Start from the job, not the product name. Three quick questions:',
    ),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'How long will this stay deployed?'), ' Hours to a day → traffic cone. Days to weeks → channelizer drum. Months to permanent → tubular delineator.'),
      h('li', null, h('strong', null, 'Are you channelizing vehicles or protecting a corner?'), ' Channelizing → cone, drum, or delineator. Protecting a corner → flexible bollard.'),
      h('li', null, h('strong', null, 'Does it need to be anchored?'), ' Anchored → tubular delineator or bollard. Hand-deployable → cone or drum.'),
    ),

    h('h2', null, 'Sizing and visibility specs that apply to all four products'),
    h(
      'p',
      null,
      'Whether you call it a pylon, cone, drum, or delineator, the visibility specs converge:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Color:'), ' Fluorescent orange for temporary TTC. White for permanent lane delineation.'),
      h('li', null, h('strong', null, 'Reflective sheeting:'), ' ASTM Type III at minimum, ASTM Type IV for night work, ASTM Type V/VIII for freeway/photo-enforced.'),
      h('li', null, h('strong', null, 'Height:'), ' 28 in floor for road-work cones; 36 in standard for drums and delineators.'),
      h('li', null, h('strong', null, 'Spacing:'), ' One device per foot of posted speed limit, in feet, along a taper.'),
    ),
    h(
      'p',
      null,
      'For the closure-specific cone math by speed, run the closure through the ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' or read our ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'cone-count guide for lane closures'),
      '.',
    ),

    h('h2', null, 'What we ship in NJ when contractors order "safety pylons"'),
    h(
      'p',
      null,
      'In 90% of orders that hit our system tagged "safety pylons," what the buyer actually wants is 28-in or 36-in fluorescent-orange traffic cones with dual ASTM Type IV collars and 7-lb or 10-lb rubber bases. The other 10% breaks down to tubular delineators (long-term lane separation) and flexible bollards (parking-lot corner protection). When in doubt, describe the job to the ',
      h('a', { href: '/assistant' }, 'TrafficKit Assistant'),
      ' and it will spec the right product family. Or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with the deployment scenario and we will steer you to the right product.',
    ),
    h(
      'p',
      null,
      'Same-day delivery in Central NJ on cones, drums, delineators, and bollards. ',
      h('a', { href: '/category/cones-drums' }, 'Browse cones and channelizers'),
      ' or ',
      h('a', { href: '/category/bollards-chocks-corners' }, 'browse bollards and corner protection'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'Is a safety pylon the same thing as a traffic cone?',
      a: 'Usually yes. In casual contractor and municipal use, "safety pylon" almost always means a tall traffic cone (28 in or 36 in). The term is also sometimes used for tubular delineator posts (long-term, anchored) and flexible bollards (perimeter protection), so confirm the use case before ordering.',
    },
    {
      q: 'What is the difference between a pylon and a cone?',
      a: 'Functionally none, when "pylon" is being used to mean a tall traffic cone. Some product catalogs use "pylon" to mean a tubular delineator (36–48 in, anchored) — that is a different product, used for long-term lane separation rather than short-term work-zone channelization.',
    },
    {
      q: 'Are safety pylons MUTCD compliant?',
      a: 'Tall traffic cones (28 in / 36 in) are MUTCD-compliant channelizing devices under Section 6F.63. Tubular delineators are compliant under Section 6F.65. Flexible bollards are perimeter protection, not MUTCD channelizing devices, and should not be specified for work-zone use.',
    },
    {
      q: 'How tall is a standard safety pylon?',
      a: '28 in or 36 in is the standard for road-work pylons. Tubular delineators run 36–48 in. Flexible bollards run 36–48 in. The right height depends on the job — see the comparison table above.',
    },
    {
      q: 'How many safety pylons do I need for a lane closure?',
      a: 'For a 35-mph county-road lane closure, 30–40 cones along the taper and buffer. For 45 mph, 50–70. For 55 mph freeway, 80–120 (use 36-in cones). Always order 25–30% spare. Run the closure through the SiteMapPlanner for an exact count.',
    },
    {
      q: 'Can I use a flexible bollard as a traffic pylon?',
      a: 'Not for work-zone channelization. Flexible bollards are perimeter / asset protection — they protect a corner or building from being clipped by a vehicle. They are not MUTCD-compliant TTC devices and inspectors will reject them as channelizers.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Bollards, Chocks & Corner Protection', path: '/category/bollards-chocks-corners' },
    { label: 'Flares, Markers, Wands & Flags', path: '/category/flares-markers-wands-flags' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
  ],
  relatedArticles: [
    'what-is-a-traffic-pylon',
    'traffic-cones-buying-guide',
    'portable-traffic-control-devices-guide',
  ],
}
