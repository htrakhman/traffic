import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic delineators" (~5K/mo, High comp) — definitional / "what is X".
 * Differentiates delineators from cones, drums, and tubular markers.
 */
export const articleTrafficDelineatorsGuide: Article = {
  slug: 'traffic-delineators-guide',
  title: 'Traffic Delineators: What They Are, How They Differ from Cones, and When to Use Each',
  excerpt:
    'A traffic delineator is a vertical retroreflective channelizer used to mark a path of travel. Confusingly, the word "delineator" gets applied to four very different products. Here is the definitional guide.',
  metaDescription:
    'Traffic delineators explained — what they are, the four product types (post, tubular, panel, surface), MUTCD specs, and when to use each instead of cones or drums.',
  primaryKeyword: 'traffic delineators',
  secondaryKeywords: [
    'delineator posts',
    'tubular markers',
    'flexible delineators',
    'reflective delineators',
    'highway delineators',
    'channelizing devices',
    'lane delineators',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-01',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A ',
      h('strong', null, 'traffic delineator'),
      ' is a vertical retroreflective channelizing device used to mark the edge or alignment of a path of travel — usually a roadway, work-zone lane, or temporary detour. ',
      'Per MUTCD definition, a delineator is a "light-retroreflecting device mounted on the roadway side that provides a continuous indication of roadway alignment." ',
      'In practice, the word "delineator" is applied to four physically distinct products: ',
      h('strong', null, 'post-mounted delineators, tubular markers, panel delineators, and surface-mounted delineators'),
      '. They look different, install differently, and serve different jobs. The confusion is why this page exists.',
    ),

    h('h2', null, 'The four types of traffic delineator'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Type'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical height'),
            h('th', { className: 'text-left p-2 border-b' }, 'Mounting'),
            h('th', { className: 'text-left p-2 border-b' }, 'Common application'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Post-mounted (delineator post)'), h('td', { className: 'p-2' }, '4–6 ft'), h('td', { className: 'p-2' }, 'Driven into shoulder soil'), h('td', { className: 'p-2' }, 'Permanent shoulder edge / curve markers')),
          h('tr', null, h('td', { className: 'p-2' }, 'Tubular marker'), h('td', { className: 'p-2' }, '18–48 in'), h('td', { className: 'p-2' }, 'Rubber base, surface-set'), h('td', { className: 'p-2' }, 'Temporary work-zone channelization')),
          h('tr', null, h('td', { className: 'p-2' }, 'Panel delineator'), h('td', { className: 'p-2' }, '24–42 in'), h('td', { className: 'p-2' }, 'Flexible flat panel on rubber base'), h('td', { className: 'p-2' }, 'Lane separation, parking, low-speed channelization')),
          h('tr', null, h('td', { className: 'p-2' }, 'Surface-mounted (raised pavement marker)'), h('td', { className: 'p-2' }, 'Under 1 in'), h('td', { className: 'p-2' }, 'Bonded to pavement'), h('td', { className: 'p-2' }, 'Lane line / centerline reflectors')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'When most contractors say "traffic delineator," they mean either the post-mounted type (driven into the shoulder) or the tubular marker (the slim orange tube with a rubber base, sometimes called a "soft tube" or "candle"). The other two are infrastructure-grade or specialty.',
    ),

    h('h2', null, 'Post-mounted delineators (the highway shoulder ones)'),
    h(
      'p',
      null,
      'These are the white or yellow flexible posts you see along highway shoulders and curve cuts — typically 4–6 feet tall, with a single 3-inch retroreflective panel near the top facing oncoming traffic. They are made from flexible polyethylene or polyurethane, so a stray vehicle hitting one bends the post over without breaking it. After impact, the post returns to vertical.',
    ),
    h(
      'p',
      null,
      'Per MUTCD Section 3F, post-mounted delineators are deployed at fixed spacing along the shoulder, with closer spacing on curves. They mount to a driven anchor (a 12–18 inch steel spike) that stays in the soil between post replacements. Standard colors are ',
      h('strong', null, 'white'),
      ' for the right edge of a roadway and ',
      h('strong', null, 'yellow'),
      ' for the left edge of divided roadways or to mark exit gore.',
    ),
    h(
      'p',
      null,
      'Use case: permanent or semi-permanent shoulder marking, rural roads without striping, curve approaches, and bridge approaches. Not the right product for short-duration work zones.',
    ),

    h('h2', null, 'Tubular markers (the temporary work-zone delineator)'),
    h(
      'p',
      null,
      'Tubular markers — also called "candles" or "channelizers" — are slim orange polyethylene or PVC tubes 18 to 48 inches tall, mounted on a rubber base. A 28-inch tubular marker has roughly the same height as a 28-inch traffic cone but takes about a third of the truck-bed space because tubes nest tighter than cones.',
    ),
    h(
      'p',
      null,
      'When to use a tubular marker instead of a cone:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Long lane delineations.'), ' On a 1,000-foot taper, the same crew can carry roughly 3x as many tubular markers as cones for the same truck-bed volume.'),
      h('li', null, h('strong', null, 'Tight lateral spacing.'), ' Tubular markers have a smaller footprint, so they fit into narrow shoulders or median openings cones cannot.'),
      h('li', null, h('strong', null, 'Visual continuity at speed.'), ' Several tubes spaced closely give a more "wall-like" visual cue than the same number of cones, which helps drivers track the lane.'),
    ),
    h(
      'p',
      null,
      'When tubular markers are NOT the right product:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'High wind / high speed.'), ' A tubular marker has less surface area than a cone but also less base mass — they tip easier in 50+ mph slipstream. In high-wind conditions, cones or drums are more stable.'),
      h('li', null, h('strong', null, 'Crash protection.'), ' Like cones, tubular markers offer no crash protection. They guide traffic; they do not stop a wayward vehicle.'),
      h('li', null, h('strong', null, 'Where the spec calls for a cone.'), ' Some DOT specs and TCPs explicitly call out cones; tubes are not always an acceptable substitute.'),
    ),

    h('h2', null, 'Panel delineators (the flat-panel kind)'),
    h(
      'p',
      null,
      'Panel delineators are flat or curved retroreflective panels on a flexible base, typically 24–42 inches tall. The wider face presents a larger retroreflective area than a tube, so they are visible at a longer range. Common in pedestrian-vs-vehicle separation at parking lots, event entrances, and low-speed channelization where panel-style visual mass beats a tube\'s slim profile.',
    ),
    h(
      'p',
      null,
      'They are not interchangeable with crash-rated road barriers. Panel delineators redirect ',
      h('em', null, 'attention'),
      ' — they do not redirect ',
      h('em', null, 'vehicles'),
      '. For crash protection see our ',
      h('a', { href: '/blog/road-barriers-buying-guide' }, 'road barriers comparison'),
      '.',
    ),

    h('h2', null, 'Surface-mounted delineators / raised pavement markers (RPMs)'),
    h(
      'p',
      null,
      'RPMs are the small ceramic, plastic, or glass-bead reflectors bonded to pavement at lane lines and centerlines. They are technically "delineators" by MUTCD definition but in practice are referred to as "raised pavement markers." They are an infrastructure install, not a contractor inventory item — most are placed by line-striping crews using bituminous or epoxy adhesive.',
    ),
    h(
      'p',
      null,
      'If you are reading this looking for what to buy for an active work zone, RPMs are not it. The two relevant categories for contractor inventory are post-mounted delineators (semi-permanent shoulder marking) and tubular markers (temporary work-zone channelization).',
    ),

    h('h2', null, 'Delineator vs. cone vs. drum vs. barrel — quick reference'),
    h(
      'p',
      null,
      'These four product names get used interchangeably and they should not be. The MUTCD distinguishes them clearly:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Cone:'), ' fluorescent orange tapered channelizer, 18–36 in, retroreflective collar(s). Standard short-duration work-zone device.'),
      h('li', null, h('strong', null, 'Tubular marker / delineator:'), ' slim orange tube on a rubber base, 18–48 in. Smaller footprint than a cone, used for long delineations or tight spaces.'),
      h('li', null, h('strong', null, 'Drum (channelizer drum / traffic barrel):'), ' 36–42 in tall, broader and taller silhouette, used at lane tapers and for longer-duration work zones. Visible from farther.'),
      h('li', null, h('strong', null, 'Post-mounted delineator:'), ' 4–6 ft tall, single small retroreflective panel, driven into shoulder. Permanent or semi-permanent.'),
    ),
    h(
      'p',
      null,
      'For a deeper comparison of cones, tubes, and drums, see our ',
      h('a', { href: '/blog/traffic-barrels-buying-guide' }, 'traffic barrels buying guide'),
      ' — drums are the heavier-duty cousin of the tubular marker and the right call for long-duration work zones above 45 mph.',
    ),

    h('h2', null, 'How to choose between cones and tubular delineators for a work zone'),
    h(
      'ol',
      null,
      h('li', null, h('strong', null, 'Distance.'), ' Less than 300 ft of channelization → cones. More than 300 ft → tubular markers (truck space).'),
      h('li', null, h('strong', null, 'Speed.'), ' Above 50 mph → cones or drums. Tubular markers tip easier in heavy slipstream.'),
      h('li', null, h('strong', null, 'Wind exposure.'), ' Open / windy site → cones with 10-lb base. Sheltered site → tubular markers OK.'),
      h('li', null, h('strong', null, 'Spec.'), ' Read the TCP. If the spec says "cones," use cones. If it says "channelizing devices," tubes or cones are usually both acceptable.'),
      h('li', null, h('strong', null, 'Visibility distance.'), ' If the design retroreflectivity has to be visible from 1,500+ ft, drums beat both cones and tubes.'),
    ),

    h('h2', null, 'Buying delineators in Central NJ'),
    h(
      'p',
      null,
      'For Central NJ contractors, ',
      h('a', { href: '/category/cones-drums' }, 'browse our cones, drums, and channelizers'),
      ' — we stock 28-inch and 36-inch tubular markers with double reflective collars, plus post-mounted delineators in white and yellow. Same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean counties.',
    ),
    h(
      'p',
      null,
      'For a job-specific kit, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with the channelization length, road speed, and project duration. Or use the ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' to lay out the work zone and back into the device count automatically.',
    ),

    h('h2', null, 'Common delineator mistakes'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Using tubular markers above 50 mph.'), ' They are visible enough but not stable enough — the slipstream from passing trucks tips them.'),
      h('li', null, h('strong', null, 'Substituting tubes for cones when the TCP specs cones.'), ' If the spec calls for cones, the inspector expects cones.'),
      h('li', null, h('strong', null, 'Wrong color post-delineator.'), ' White marks right edge; yellow marks left edge of divided roadway. Reversing them is a cite.'),
      h('li', null, h('strong', null, 'Engineer-grade sheeting on highway tubes.'), ' Type IV high-intensity prismatic minimum. Type I/II will not pass nighttime visibility on a 50+ mph road.'),
    ),
  ),
  faqs: [
    {
      q: 'What is a traffic delineator?',
      a: 'A traffic delineator is a vertical retroreflective channelizing device that marks the edge or alignment of a path of travel — usually a road, work-zone lane, or detour. Per MUTCD definition, a delineator provides a "continuous indication of roadway alignment." In practice the word covers four products: post-mounted delineators, tubular markers, panel delineators, and surface-mounted raised pavement markers.',
    },
    {
      q: 'What is the difference between a delineator and a traffic cone?',
      a: 'A cone is a tapered, broad-base channelizer typically 18–36 inches tall used for short-duration work zones. A tubular delineator (the most common kind) is a slim, vertical tube of similar height with a smaller footprint. Tubes nest tighter for transport but tip easier in high wind and high-speed slipstream. Cones are more stable; tubes are more compact. Both serve the same channelization role for low- and mid-speed work zones.',
    },
    {
      q: 'When do I use a tubular marker instead of a cone?',
      a: 'Tubular markers when you need to channelize long distances on lower-speed roads (under 50 mph) and need to fit more channelizing devices in the truck. Cones when you need stability in wind or high-speed slipstream, when the TCP spec calls for cones explicitly, or when you need the broader visual silhouette of a cone profile.',
    },
    {
      q: 'What color should a delineator be?',
      a: 'Tubular markers and panel delineators in active work zones are fluorescent orange. Post-mounted shoulder delineators are white for the right edge of a roadway and yellow for the left edge of divided roadways or exit gore. The color rule comes from MUTCD Section 3F.',
    },
    {
      q: 'Are traffic delineators MUTCD-compliant?',
      a: 'They have to be to be deployed in a federal- or state-funded work zone. MUTCD-compliant tubular markers are 28+ inches tall, fluorescent orange, with ASTM Type IV high-intensity prismatic retroreflective sheeting on at least one circumferential band. Buying delineators with engineer-grade (Type I) sheeting will fail nighttime visibility checks.',
    },
    {
      q: 'How tall does a delineator need to be?',
      a: 'For temporary work-zone channelization on roads under 45 mph, 28-inch tubular markers are the working standard. Step up to 36-inch tubes (or 36-inch cones, or 42-inch drums) for nighttime work above 35 mph and any 55+ mph daytime work. For permanent shoulder delineators, MUTCD specifies a minimum 4-ft post height.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Flares, Markers, Wands & Flags', path: '/category/flares-markers-wands-flags' },
  ],
  relatedArticles: [
    'traffic-barrels-buying-guide',
    'what-is-a-traffic-pylon',
    'safety-pylons-vs-traffic-cones',
  ],
}
