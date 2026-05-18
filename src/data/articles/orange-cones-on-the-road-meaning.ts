import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "orange cones on the road" (~5,000/mo, High comp, $10.99 bid).
 * Definitional "what is X" structure — explains what those orange cones mean
 * to a driver who saw them, then transitions to contractor buying intent.
 */
export const articleOrangeConesOnTheRoadMeaning: Article = {
  slug: 'orange-cones-on-the-road-meaning',
  title: 'Orange Cones on the Road: What They Mean and What You Should Do',
  excerpt:
    'Orange cones on the road mean a temporary traffic-control zone is active — a work crew, an accident response, a utility job, or a planned closure. They direct your line of travel and they have legal weight.',
  metaDescription:
    'Orange cones on the road explained — what they mean to drivers, MUTCD rules, the rules of approach, and why fluorescent orange is the universal color.',
  primaryKeyword: 'orange cones on the road',
  secondaryKeywords: [
    'orange cone road',
    'what do orange cones mean',
    'why are traffic cones orange',
    'meaning of orange cones',
    'orange cones in road',
    'orange cone law',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-18',
  readMinutes: 6,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Orange cones on the road mean a temporary traffic-control zone is active — a work crew, an accident response, a utility job, or a planned closure. ',
      h('strong', null, 'Treat them like a moving lane stripe: follow them, do not cross them, slow down before you reach them, and double-fine zones may apply.'),
      ' Here is what those cones are actually telling you, and the rules behind why they look the way they do.',
    ),

    h('h2', null, 'The short answer: cones are a lane line you cannot ignore'),
    h(
      'p',
      null,
      'A line of orange cones on a roadway is a legal traffic-control device under the federal Manual on Uniform Traffic Control Devices (MUTCD), which all 50 states adopt as the basis for their road-rules. The cones define where your vehicle is supposed to go — the same way painted lane stripes do — and they override the painted stripes underneath when they conflict.',
    ),
    h(
      'p',
      null,
      'That means: if a line of cones channels you out of the right lane into the left, you change lanes, even if the painted stripe still says the right lane is open. The cones win.',
    ),

    h('h2', null, 'Why fluorescent orange'),
    h(
      'p',
      null,
      "Fluorescent orange is the MUTCD color code for temporary traffic control. It's not arbitrary — orange is the color that:",
    ),
    h(
      'ul',
      null,
      h('li', null, "Has the highest contrast against typical road and sky backgrounds at all times of day."),
      h('li', null, "Is not used for any permanent traffic device (those are yellow, white, green, blue, brown, red — different meaning each)."),
      h('li', null, "Stays bright under photovoltaic stress better than red or yellow once a reflective coating is added."),
      h('li', null, "Is the international standard for 'this is temporary — pay attention'."),
    ),
    h(
      'p',
      null,
      "Combined with the white retroreflective bands that catch headlights at night, an orange cone is the most visible 28-inch object that exists on a roadway. That's by design — the cone has to compete with everything else a driver is looking at.",
    ),

    h('h2', null, 'What the cone pattern is telling you'),
    h(
      'p',
      null,
      'Cones are not just present — they are arranged. The arrangement tells you what is happening:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Tapered line (cones angling across a lane) '), '— a lane closure ahead. The taper length is calibrated to the posted speed; longer tapers on faster roads. You should merge before the taper begins, not at the end. See the ',
        h('a', { href: '/blog/mutcd-taper-length-formula-nj' }, 'MUTCD taper length formula'),
        ' for the math.'),
      h('li', null, h('strong', null, 'Parallel line (cones running alongside your lane) '), "— a buffer zone protecting a work activity to your side. Your lane is open, but the lane next to it is closed. Do not drift."),
      h('li', null, h('strong', null, 'Cones across the road '), '— full road closure. Find the detour, follow the orange ',
        h('a', { href: '/blog/road-closed-barricade-guide' }, 'ROAD CLOSED barricade'),
        " signs."),
      h('li', null, h('strong', null, 'Cones around a single point '), '— a hazard, an obstruction, a vehicle, or an open utility access. Pass with extra width if you safely can.'),
      h('li', null, h('strong', null, 'Cones in a curve or arc '), '— a channelizing device guiding you around something. Follow the curve; do not cut inside it.'),
    ),

    h('h2', null, 'The rules of approach: what to do as a driver'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Slow down before the cones, not at them. '), 'You should be at the posted work-zone speed (often 35–45 mph) by the time you reach the first cone. Brake on the approach, not when you are already inside.'),
      h('li', null, h('strong', null, 'Merge early. '), 'Find the gap and take it before the taper closes the lane. Last-second merging causes most work-zone collisions.'),
      h('li', null, h('strong', null, 'Increase following distance. '), 'In a work zone, the truck in front of you can stop unexpectedly for the crew or another driver. Add 1–2 car lengths.'),
      h('li', null, h('strong', null, 'No phone, no fiddling. '), 'Work zones have the highest distracted-driving citation rate. The cones telegraph that.'),
      h('li', null, h('strong', null, 'Watch for workers. '), 'A worker behind a cone has very little protection. Yield to them as you would to a pedestrian in a crosswalk.'),
    ),

    h('h2', null, 'Double-fine and enhanced-enforcement zones'),
    h(
      'p',
      null,
      "Most states — including New Jersey, New York, Pennsylvania, Connecticut — apply doubled or enhanced fines for moving violations inside an active work zone, regardless of whether workers are visibly present. The fine is keyed to the presence of cones and signs, not to whether a person is actually on the pavement.",
    ),
    h(
      'p',
      null,
      'In NJ, the work-zone fine multiplier is 2x the base fine for speeding, careless driving, and following too closely. The cones are themselves the legal trigger.',
    ),

    h('h2', null, 'What if you hit a cone?'),
    h(
      'p',
      null,
      "If you brush or knock down a cone, do not stop on the roadway. Continue safely to the next exit or a wide shoulder, then call the local non-emergency line if you think the work zone needs to know. The cone itself is a $20 item; stopping in a live work zone is a serious hazard for you and the crew.",
    ),
    h(
      'p',
      null,
      "If the cone caused vehicle damage, take photos at a safe location. A standard 28-inch traffic cone weighs 7–12 lbs and rarely causes more than scratches, but cone-light battery packs and ballast rings can scuff bumpers.",
    ),

    h('h2', null, 'For contractors: the buying side'),
    h(
      'p',
      null,
      "If you're reading this because you put the cones out, not because you saw them on the road — the basics:",
    ),
    h(
      'ul',
      null,
      h('li', null, '28-inch is the MUTCD-minimum height for any roadway with posted speeds above 45 mph. 18-inch is acceptable on parking lots, residential streets, and pedestrian-only zones.'),
      h('li', null, 'Cones need two retroreflective bands (6" upper, 4" lower) on the body for nighttime use.'),
      h('li', null, 'Fluorescent orange is required for federal-aid roadways; other colors (pink, blue, white, yellow) have specific limited uses.'),
      h('li', null, 'Spacing on a taper follows the MUTCD formula; on a parallel buffer, every 20–40 ft is typical depending on posted speed.'),
    ),
    h(
      'p',
      null,
      'For the full cone family, see ',
      h('a', { href: '/category/cones' }, 'Cones, Drums & Channelizers'),
      '. For a setup that fits your job, the ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' generates an MUTCD-compliant cone count from your inputs, or chat with the ',
      h('a', { href: '/assistant' }, 'Assistant'),
      ' for a recommendation.',
    ),

    h('h2', null, 'The other cone colors and what they mean'),
    h(
      'p',
      null,
      'Orange is the dominant cone color, but you may see others on the road. Each has its own meaning:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Orange '), '— standard temporary traffic control (this article).'),
      h('li', null, h('strong', null, 'Lime / fluorescent green '), '— pedestrian and bicycle work zones, sometimes used by parks and event-management crews.'),
      h('li', null, h('strong', null, 'Pink '), '— incident response: cones placed by police or first responders for crash, fire, or chemical incidents.'),
      h('li', null, h('strong', null, 'Blue '), '— surveying, mapping, or non-traffic purposes; sometimes utility-marker cones.'),
      h('li', null, h('strong', null, 'White '), '— ceremonial, sport event, or parking-lot use; not for active traffic control.'),
      h('li', null, h('strong', null, 'Yellow '), '— caution, but yellow cones do not carry the same MUTCD weight as orange and are uncommon on public roads.'),
    ),

    h('h2', null, 'Bottom line'),
    h(
      'p',
      null,
      'Orange cones on the road are a temporary lane line with legal authority. Follow them, do not cross them, slow down before you reach them. Work-zone fines are doubled in most states. The cones are designed to be the most visible thing on the road — give them the attention that visibility was designed to extract.',
    ),
  ),
  faqs: [
    {
      q: 'What do orange cones on the road mean?',
      a: 'Orange cones mark a temporary traffic-control zone — construction, utility work, accident response, or a planned closure. They define your lane of travel and have the same legal authority as painted stripes, overriding the underlying paint when they conflict.',
    },
    {
      q: 'Why are traffic cones orange?',
      a: 'Fluorescent orange is the MUTCD code color for temporary traffic control. It offers the highest contrast against road and sky backgrounds, does not conflict with any permanent traffic-device color, and is the international standard for "this is temporary, pay attention."',
    },
    {
      q: 'Is it illegal to hit a traffic cone?',
      a: "Hitting a cone is typically not itself a citable offense, but the actions that led to it (speeding in a work zone, distracted driving, lane-line violations) are. Work-zone fines are often doubled in NJ and other states. Don't stop on the roadway after hitting a cone — continue to a safe shoulder.",
    },
    {
      q: 'What does a line of cones tapered across a lane mean?',
      a: 'A tapered line of cones is a lane closure ahead. The taper length is calibrated to posted speed (longer tapers on faster roads). Merge before the taper begins, not at the end — last-second merging causes most work-zone collisions.',
    },
    {
      q: 'Do work-zone fines double even when no workers are present?',
      a: "Yes in most states, including New Jersey. The doubled fine is keyed to the presence of cones, signs, and other traffic-control devices marking an active work zone — not to whether a worker is visibly on the pavement.",
    },
    {
      q: 'Can I cross a line of orange cones?',
      a: 'No. Treat cones as a moving lane line you cannot cross. They override the painted stripes underneath when they conflict. Crossing the cones into a closed area is a traffic violation and a safety risk to workers behind them.',
    },
  ],
  relatedProducts: [
    { label: 'Browse cones, drums & channelizers', path: '/category/cones' },
    { label: 'Browse signs & sign stands', path: '/category/signs' },
    { label: 'Build a TTC plan with SiteMapPlanner', path: '/planner' },
    { label: 'Chat with the Assistant', path: '/assistant' },
  ],
  relatedArticles: [
    'orange-cones-explained',
    'orange-traffic-cones-guide',
    'cone-zone-work-zone-guide',
  ],
}
