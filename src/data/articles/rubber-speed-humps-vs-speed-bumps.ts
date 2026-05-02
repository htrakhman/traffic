import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "rubber speed humps" (~5K/mo, High comp, ci=100) — comparison-style
 * "humps vs bumps" article. Sister to rubber-speed-bumps-buying-guide which
 * already covers the bumps side. This page wins the "humps" search and the
 * "what's the difference" SERP at the same time.
 */
export const articleRubberSpeedHumpsVsSpeedBumps: Article = {
  slug: 'rubber-speed-humps-vs-speed-bumps',
  title: 'Rubber Speed Humps vs. Speed Bumps: Which One You Actually Need',
  excerpt:
    'Speed humps and speed bumps look similar but slow traffic at different speeds and feel completely different to drivers. Here is the engineering difference, where each one belongs, and what to spec for a parking lot or private road.',
  metaDescription:
    'Rubber speed humps vs speed bumps: profile, target speed, cost, install. Pick the right one for your lot or road. Same-day NJ delivery from TrafficKit.',
  primaryKeyword: 'rubber speed humps',
  secondaryKeywords: [
    'speed humps vs speed bumps',
    'rubber speed bumps',
    'speed humps for sale',
    'parking lot speed bumps',
    'modular speed humps',
    'driveway speed bumps',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-02',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h('strong', null, 'A speed bump is a 3-4 inch tall, 6-12 inch wide hump designed to force drivers down to 2-5 mph — used in parking lots, alleys, and very-low-speed private property.'),
      ' A speed hump is a much wider 3-4 inch tall, 12-14 foot wide profile designed to slow drivers to 15-20 mph without jarring them — used on residential streets, longer driveways, and any roadway where you want traffic-calming without forcing a near-stop. They are not interchangeable. Picking the wrong one gets complaints, lawsuits, or — for the bump where a hump belonged — undercarriage damage. Below is the side-by-side breakdown.',
    ),

    h('h2', null, 'The single most important difference: target speed'),
    h(
      'p',
      null,
      'Speed bumps and speed humps are not the same shape, and that difference is what changes how traffic responds. The geometry is engineered around a target speed:',
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
            h('th', { className: 'text-left p-2 border-b' }, 'Spec'),
            h('th', { className: 'text-left p-2 border-b' }, 'Rubber speed bump'),
            h('th', { className: 'text-left p-2 border-b' }, 'Rubber speed hump'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Height'), h('td', { className: 'p-2' }, '3-4 inches'), h('td', { className: 'p-2' }, '3-4 inches')),
          h('tr', null, h('td', { className: 'p-2' }, 'Width (travel direction)'), h('td', { className: 'p-2' }, '6-12 inches'), h('td', { className: 'p-2' }, '12-14 feet')),
          h('tr', null, h('td', { className: 'p-2' }, 'Target speed'), h('td', { className: 'p-2' }, '2-5 mph'), h('td', { className: 'p-2' }, '15-20 mph')),
          h('tr', null, h('td', { className: 'p-2' }, 'Driver feel'), h('td', { className: 'p-2' }, 'Sharp jolt'), h('td', { className: 'p-2' }, 'Gentle rise and fall')),
          h('tr', null, h('td', { className: 'p-2' }, 'Best location'), h('td', { className: 'p-2' }, 'Parking lot, alley, drive-thru'), h('td', { className: 'p-2' }, 'Residential street, longer private road')),
          h('tr', null, h('td', { className: 'p-2' }, 'Vehicle damage risk'), h('td', { className: 'p-2' }, 'Higher (low cars, motorcycles)'), h('td', { className: 'p-2' }, 'Low')),
          h('tr', null, h('td', { className: 'p-2' }, 'Emergency vehicle impact'), h('td', { className: 'p-2' }, 'Significant slowdown'), h('td', { className: 'p-2' }, 'Minor slowdown')),
          h('tr', null, h('td', { className: 'p-2' }, 'Approx. price'), h('td', { className: 'p-2' }, '$120-220 per 6-ft section'), h('td', { className: 'p-2' }, '$400-700 per 6-ft section')),
        ),
      ),
    ),

    h('h2', null, 'Speed bumps — the parking-lot tool'),
    h(
      'p',
      null,
      'A rubber speed bump is short and steep. The 6-12 inch travel-direction width means a vehicle going 10 mph or faster takes a sharp jolt — the rear axle has not landed before the front has already passed. That sharp feedback is the point: bumps force drivers down to 2-5 mph or they lose control of their suspension.',
    ),
    h(
      'p',
      null,
      'Use bumps for:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Parking lots (apartment complex, retail, school)'),
      h('li', null, 'Alleys and rear-of-building delivery routes'),
      h('li', null, 'Drive-thru exits and entrance lines'),
      h('li', null, 'Garage entrances and driveways under 200 ft'),
      h('li', null, 'Loading docks and warehouse aisles'),
      h('li', null, 'Mobile-home parks and gated communities'),
    ),
    h(
      'p',
      null,
      'Do NOT use bumps on:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Public residential streets (most municipalities ban them — too rough on emergency vehicles)'),
      h('li', null, 'Roads with regular bus or fire-truck traffic'),
      h('li', null, 'Steep grades (water pools at the upstream side and freezes in winter)'),
      h('li', null, 'Roads where motorcycles and low-clearance sports cars travel'),
    ),
    h(
      'p',
      null,
      'For full install, sizing, and bolt-pattern detail, see our ',
      h('a', { href: '/blog/rubber-speed-bumps-buying-guide' }, 'rubber speed bumps buying guide'),
      '.',
    ),

    h('h2', null, 'Speed humps — the residential traffic-calming tool'),
    h(
      'p',
      null,
      'A rubber speed hump is much wider in the travel direction — 12 to 14 feet — but the same 3-4 inch height. The driver feels a single rise and fall over about 2 vehicle wheelbases. At 15-20 mph the experience is mild; above 25 mph the suspension complains hard enough to back drivers off without jarring them.',
    ),
    h(
      'p',
      null,
      'That gentler profile is why municipalities use humps on residential streets where bumps are banned. Fire and EMS departments tolerate humps because the slowdown is real but the response-time penalty is small (usually 2-5 seconds per hump). Bumps cost emergency vehicles 5-10 seconds each and damage suspension on heavy apparatus over time, which is why most fire chiefs veto them.',
    ),
    h(
      'p',
      null,
      'Use humps for:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Residential streets where municipal traffic-calming is approved'),
      h('li', null, 'Long private roads and HOA collector streets'),
      h('li', null, 'School zones and park access roads'),
      h('li', null, 'Hospital and senior-living campuses'),
      h('li', null, 'Industrial-park access roads where 20 mph is the goal'),
    ),

    h('h2', null, 'The sub-types: speed cushions, speed tables, raised crosswalks'),
    h(
      'p',
      null,
      'Once you understand humps vs bumps, three more profiles round out the family. They are all rubber-modular variations on the speed hump:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Speed cushion'), ' — a hump split into 2-3 segments with gaps wide enough for a fire engine\'s wheelbase to straddle. Fire and ambulance pass with zero slowdown; passenger cars still hit the cushion. Used where municipal calming is wanted but EMS objects to humps.'),
      h('li', null, h('strong', null, 'Speed table'), ' — a flat-topped hump 22 ft wide instead of 14 ft, with a flat plateau in the middle. Even gentler than a hump. Used on bus routes and collector streets where the goal is 25-30 mph, not 15-20.'),
      h('li', null, h('strong', null, 'Raised crosswalk'), ' — a speed table with crosswalk striping on the flat plateau. Slows traffic AND elevates the pedestrian crossing for visibility. Common at school zones and downtown crossings.'),
    ),

    h('h2', null, 'Rubber vs asphalt — why most new installs are rubber'),
    h(
      'p',
      null,
      'Asphalt humps and bumps used to be the default — paved permanently into the surface. Most new installs since 2015 are modular rubber for four reasons:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Removable.'), ' Snowplows can lift them in October and reinstall in spring. Asphalt humps tear up plows.'),
      h('li', null, h('strong', null, 'Replaceable.'), ' If a vehicle damages a section, swap the section instead of repaving the whole hump.'),
      h('li', null, h('strong', null, 'Reflective.'), ' Most rubber units have factory-molded yellow and white reflective stripes. Asphalt humps need painted markings re-applied annually.'),
      h('li', null, h('strong', null, 'Cheaper installed.'), ' A 14-ft modular rubber hump installs in 30 minutes with anchors and a torque wrench. Asphalt humps need a paving crew and a half-day road closure.'),
    ),
    h(
      'p',
      null,
      'Rubber units are the standard for parking lots, private roads, HOA streets, and most municipal traffic-calming retrofits. Asphalt remains common only on new road construction where the hump is paved in with the rest of the surface.',
    ),

    h('h2', null, 'How to install a rubber speed hump (the short version)'),
    h(
      'ol',
      { className: 'list-decimal pl-6 space-y-2' },
      h('li', null, 'Mark the centerline across the road with chalk. Set the hump segments end-to-end across the full lane width.'),
      h('li', null, 'Drill 3/8-in to 1/2-in concrete anchors through the factory-bolt holes — typically 6-8 anchors per 6-ft section. For asphalt, use lag-shield anchors with 2-3 inch embedment; for concrete, use sleeve or wedge anchors.'),
      h('li', null, 'Torque to the manufacturer spec (usually 30-50 ft-lb). Over-torque cracks the rubber.'),
      h('li', null, 'Add the end-cap segments — these reduce the chance of plow blades catching the edge.'),
      h('li', null, 'Verify the reflective stripes face the direction of approach. Most units are bidirectional but a few are one-way.'),
    ),
    h(
      'p',
      null,
      'Total time: 30-45 minutes for a single 14-ft hump with a 2-person crew.',
    ),

    h('h2', null, 'Pricing in 2026 (NJ market)'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Rubber speed bump, 6-ft section, 2-3 in tall:'), ' $120-180 each.'),
      h('li', null, h('strong', null, 'Rubber speed bump, 6-ft section, 4 in tall (high-profile):'), ' $180-220 each.'),
      h('li', null, h('strong', null, 'Rubber speed hump, 6-ft section (combined to make 12 ft total):'), ' $400-550 per 6-ft section.'),
      h('li', null, h('strong', null, 'Speed cushion, 6-ft segment:'), ' $500-700 each.'),
      h('li', null, h('strong', null, 'Mounting hardware (anchors, end caps):'), ' $40-80 per hump.'),
    ),
    h(
      'p',
      null,
      'A complete 14-ft hump install across one residential lane runs roughly $900-1,300 retail including hardware.',
    ),

    h('h2', null, 'Permits and HOA rules — the part most buyers skip'),
    h(
      'p',
      null,
      'On private property (parking lots, driveways, HOA roads) you generally do not need municipal approval to install a rubber speed bump or hump. On any public street, you almost always need a traffic-engineering review and a city or county permit. Most NJ municipalities require:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'A formal traffic study or speed/volume measurement showing the calming is justified.'),
      h('li', null, 'A neighbor petition or HOA vote in residential areas.'),
      h('li', null, 'Coordination with the local fire department.'),
      h('li', null, 'Approved hump geometry (some municipalities only allow specific profiles).'),
      h('li', null, 'Advance warning signs (W17-1 "BUMP" or "HUMP") with appropriate spacing.'),
    ),
    h(
      'p',
      null,
      'Skipping the warning sign step is the most common cite. MUTCD requires advance warning at the spacing called for by the road\'s posted speed.',
    ),

    h('h2', null, 'Where to buy rubber speed humps in NJ'),
    h(
      'p',
      null,
      'For Central NJ buyers, ',
      h('a', { href: '/category/speed-bumps-humps' }, 'browse our rubber speed humps and bumps inventory'),
      ' — we stock modular rubber bumps (3-4 in), humps (14 ft), speed cushions, and the hardware kits with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon counties for orders placed by 11 AM. Need help picking between bump, hump, or cushion for a specific situation? Our ',
      h('a', { href: '/assistant' }, 'TCP assistant'),
      ' walks you through the decision in 2 minutes, or ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' and we will spec the right profile for your lot or road.',
    ),
  ),
  faqs: [
    {
      q: 'What is the difference between a speed hump and a speed bump?',
      a: 'Width. Speed bumps are 6-12 inches wide in the travel direction and force traffic to 2-5 mph (parking lot use). Speed humps are 12-14 feet wide and slow traffic to 15-20 mph (residential street use). Both are typically 3-4 inches tall.',
    },
    {
      q: 'Can I install a rubber speed bump on a public road?',
      a: 'Almost never without a permit. Most NJ municipalities prohibit speed bumps on public streets because they slow emergency vehicles too much. Residential streets typically use speed humps or speed cushions instead, and even those require a traffic-engineering review and a city permit.',
    },
    {
      q: 'How much does a rubber speed hump cost?',
      a: 'A 14-foot hump (two 6-ft modular sections plus end caps) runs $900-1,300 installed retail in NJ, including the anchor hardware. Speed bumps for parking-lot use are cheaper at $120-220 per 6-ft section.',
    },
    {
      q: 'Do speed humps damage cars?',
      a: 'At the design speed (15-20 mph for humps), no. Above 25 mph the ride gets harsh. Speed bumps at the design 2-5 mph cause no damage; at 10+ mph they can scrape low-clearance sports cars and unsettle motorcycles.',
    },
    {
      q: 'Will a rubber speed hump survive snowplows?',
      a: 'The reputable modular units do — most are rated for plow blade contact when the unit is anchored and the end caps are installed. Some property managers still pull them in October and reinstall in April to extend service life. Check the manufacturer\'s plow-blade rating before assuming.',
    },
    {
      q: 'How long do rubber speed humps last?',
      a: '7-15 years outdoors with proper anchoring. UV exposure and freeze-thaw eventually break down the rubber, and regular plow contact wears the top surface. Reflective stripes typically need replacement every 4-6 years before the hump body wears out.',
    },
  ],
  relatedProducts: [
    { label: 'Speed Bumps & Humps', path: '/category/speed-bumps-humps' },
    { label: 'Parking Blocks', path: '/category/parking-blocks' },
    { label: 'Bollards & Chocks', path: '/category/bollards-chocks-corners' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
  ],
  relatedArticles: [
    'rubber-speed-bumps-buying-guide',
    'parking-cones-buying-guide',
    'temporary-traffic-control-plan-utility-job',
  ],
}
