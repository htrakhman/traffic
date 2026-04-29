import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic cones" (50K/mo, High comp, ci=100) — the pillar term in
 * the cone family. Commercial-intent buying guide written for contractors,
 * facilities, and event ops who are about to actually order cones. Anchors
 * the cone topical cluster (already covers parking cones, road cones,
 * traffic safety cones, hazard cones, traffic pylon, etc.) with this
 * pillar piece linking out to all of them.
 */
export const articleTrafficConesBuyingGuide: Article = {
  slug: 'traffic-cones-buying-guide',
  title: 'Traffic Cones: The Contractor’s 2026 Buying Guide (Sizes, Weights, MUTCD Specs)',
  excerpt:
    'Stop guessing on cone size, base weight, and reflective collar specs. The exact specs we ship most often, what the MUTCD actually requires, and how many cones a typical NJ work zone burns through in a year.',
  metaDescription:
    'Traffic cones buying guide for 2026: 18 in vs 28 in vs 36 in, base weights, MUTCD reflective sheeting, color codes, and quantity math. Same-day NJ delivery.',
  primaryKeyword: 'traffic cones',
  secondaryKeywords: [
    'traffic cones for sale',
    'safety cones',
    'orange traffic cones',
    'cone for traffic',
    'a traffic cone',
    'traffic cones near me',
    'large traffic cones',
    'small traffic cones',
    'highway cones',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-29',
  dateModified: '2026-04-29',
  readMinutes: 11,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'For a typical road or parking job, ',
      h('strong', null, '28-inch fluorescent-orange traffic cones with a 7–10 lb rubber base and dual ASTM Type IV reflective collars are the right buy.'),
      ' That is the size and spec the MUTCD requires anywhere posted speeds exceed 45 mph, and it is the size most state DOTs accept without a second look. Drop to 18 inches for parking lots, indoor work, and roads under 45 mph; step up to 36 inches for freeway work zones and heavy night ops. Below is the full size, weight, color, sheeting, and quantity guide — with the pricing tiers most NJ contractors actually order.',
    ),

    h('h2', null, 'What is a traffic cone?'),
    h(
      'p',
      null,
      'A traffic cone is a hollow, vertically tapered marker used to channelize, separate, or delineate vehicle and pedestrian traffic in a work zone, parking lot, or temporary closure. The MUTCD (Manual on Uniform Traffic Control Devices) classifies cones as Channelizing Devices under Chapter 6F.63 and specifies minimum height, color, and retroreflectivity requirements. A cone is not a barrier — it is a visual cue — and a driver who decides to drive through one will. The point of cone-and-spacing math is to give every reasonable driver enough advance warning to make the right decision at speed.',
    ),
    h(
      'p',
      null,
      'Cones are made by injection-molding a fluorescent-orange PVC body and seating it on a recycled-rubber base. Cheaper "all-in-one" PVC cones exist, but rubber-base is the right buy in 95% of cases — see the construction section below.',
    ),

    h('h2', null, 'Traffic cone sizes — the four standard heights'),
    h(
      'p',
      null,
      'Traffic cones are sold in four practical sizes. Anything outside this list is novelty (sport cones, agility cones) and does not belong on a job:',
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
            h('th', { className: 'text-left p-2 border-b' }, 'Height'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical use'),
            h('th', { className: 'text-left p-2 border-b' }, 'MUTCD-approved?'),
            h('th', { className: 'text-left p-2 border-b' }, 'Base weight options'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '12 in'),
            h('td', { className: 'p-2' }, 'Indoor warehouse, showroom, residential driveway'),
            h('td', { className: 'p-2' }, 'No (under 18 in minimum)'),
            h('td', { className: 'p-2' }, '1–3 lb'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '18 in'),
            h('td', { className: 'p-2' }, 'Parking lots, low-speed (<25 mph) routing, valet'),
            h('td', { className: 'p-2' }, 'Yes — minimum for any public-road use'),
            h('td', { className: 'p-2' }, '3–7 lb'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '28 in'),
            h('td', { className: 'p-2' }, 'County / municipal roads, daytime work, all-purpose contractor'),
            h('td', { className: 'p-2' }, 'Yes — required for posted speeds 45+ mph'),
            h('td', { className: 'p-2' }, '7–10 lb'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '36 in'),
            h('td', { className: 'p-2' }, 'Freeway, high-speed taper, night work'),
            h('td', { className: 'p-2' }, 'Yes — specified by some state DOTs for >55 mph'),
            h('td', { className: 'p-2' }, '10–15 lb'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'For a job that crosses speed regimes — an arterial that drops from 50 to 35 through your work zone — spec to the highest posted speed encountered in the buffer. NJDOT inspectors will measure to the worst case, not the average. If you are sizing for a specific lane closure, run the cone math through our ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'cone-count guide for lane closures'),
      ', which folds taper length and speed limit together.',
    ),

    h('h2', null, 'Base weight — the spec that decides whether your cones stay upright'),
    h(
      'p',
      null,
      'Base weight is the most under-spec’d field on any cone purchase order. Light cones tip in wind, in the slipstream of a passing semi, and on uneven asphalt. Once a cone tips, it is invisible from a driver’s eye height — you have just spent money on a hazard, not a control.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '3 lb base.'), ' Indoor and dead-still outdoor use only. Will tip in any sustained 10 mph breeze.'),
      h('li', null, h('strong', null, '4–5 lb base.'), ' Parking lots, low-speed neighborhood work. Tipping is rare but possible in storm gusts.'),
      h('li', null, h('strong', null, '7 lb base.'), ' The contractor default. Holds in most semi slipstreams. Buy this if you are buying one weight only.'),
      h('li', null, h('strong', null, '10 lb base.'), ' Freeway, bridge work, exposed ridge work. Survives gusty cuts past trucks at speed. Heavier to deploy — plan for it.'),
      h('li', null, h('strong', null, '15 lb mega-base.'), ' Specialized — high-wind permanent zones, ferry decks, port operations. Rare in NJ road work.'),
    ),

    h('h2', null, 'Reflective collars — ASTM Type III, IV, or V'),
    h(
      'p',
      null,
      'Any cone working past dusk needs retroreflective sheeting wrapped around the body in horizontal collars. The MUTCD requires either one 6-inch collar near the top, or two collars (4 in upper + 6 in lower), of either ASTM Type III high-intensity or higher.',
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
            h('th', { className: 'text-left p-2 border-b' }, 'Sheeting type'),
            h('th', { className: 'text-left p-2 border-b' }, 'Brightness'),
            h('th', { className: 'text-left p-2 border-b' }, 'Use case'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'ASTM Type III'),
            h('td', { className: 'p-2' }, 'Standard high-intensity'),
            h('td', { className: 'p-2' }, 'Daytime + occasional dusk'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'ASTM Type IV (HIP)'),
            h('td', { className: 'p-2' }, 'High-intensity prismatic'),
            h('td', { className: 'p-2' }, 'Standard contractor spec for night work'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'ASTM Type V/VIII (DG3 / Diamond Grade)'),
            h('td', { className: 'p-2' }, 'Premium prismatic'),
            h('td', { className: 'p-2' }, 'Freeway, bridge, photo-enforced zones'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Skip plain "reflective tape" from a hardware store — it is glass-bead engineering grade, fades in two seasons, and your insurance underwriter will note it on a claim. ',
      h('strong', null, 'Spec ASTM Type IV at minimum on any cone working past dusk.'),
    ),

    h('h2', null, 'Color — fluorescent orange, with a few legitimate exceptions'),
    h(
      'p',
      null,
      'The federally specified color for traffic-channelizing cones is fluorescent orange. Other colors exist and have legitimate non-roadway uses, but mixing them into a road or lot job sends the wrong signal to drivers:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Fluorescent orange.'), ' The default. All public-road and parking-lot routing.'),
      h('li', null, h('strong', null, 'Lime / fluorescent yellow.'), ' Pedestrian-only hazards — wet floors, broken tile, slip zones. Not for vehicle channelization.'),
      h('li', null, h('strong', null, 'Red.'), ' Stop / no-entry / fire-lane reservation. Drivers misread red as queue-and-wait, so never use it for routing.'),
      h('li', null, h('strong', null, 'Blue.'), ' ADA / accessible-stall marking and water-utility crews.'),
      h('li', null, h('strong', null, 'Green.'), ' Right-of-way / "you may proceed" zones at managed events. Specialty.'),
      h('li', null, h('strong', null, 'White / black.'), ' Indoor showroom and trade-show backdrop only.'),
      h('li', null, h('strong', null, 'Pink-orange.'), ' Added by MUTCD 2023 for incident-response and emergency-management scenes only.'),
    ),
    h(
      'p',
      null,
      'For a deeper look at why drivers respond to orange specifically, see our companion guide on ',
      h('a', { href: '/blog/orange-cones-explained' }, 'why orange cones are orange and what they mean'),
      '.',
    ),

    h('h2', null, 'Construction — rubber-base vs. one-piece PVC'),
    h(
      'p',
      null,
      'Cones come in two body designs. Either matters for a real job:',
    ),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'PVC body + rubber base.'), ' The body is fluorescent-orange injection-molded PVC; the base is recycled black rubber. The two are friction-fit or molded together. When a vehicle rolls over this design, the cone springs back. The base flexes. Replace cost is the same as one-piece. ',
        h('em', null, 'Buy this in 95% of cases.'),
      ),
      h(
        'li',
        null,
        h('strong', null, 'One-piece PVC.'), ' Cheaper at first glance ($1–2 less per cone). One impact will stress-fracture the base seam, the cone lists, and a 5 mph wind tips it. Net cost over 18 months is higher because of replacement frequency. Skip.',
      ),
    ),

    h('h2', null, 'How many traffic cones do you actually need?'),
    h(
      'p',
      null,
      'Quantity comes down to taper length and channelizing-device spacing. The MUTCD device-spacing rule of thumb in feet is ',
      h('strong', null, 'one cone per foot of speed limit'),
      ' along the taper, then one cone every speed-limit-in-feet along the buffer/work area. Round up. Add 25–30% spares because cones get hit, lost, run over, and forgotten on the truck at end of shift.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Single 25-mph residential lane shift:'), ' 15–20 cones.'),
      h('li', null, h('strong', null, 'Single 35-mph county-road lane closure:'), ' 30–40 cones.'),
      h('li', null, h('strong', null, 'Single 45-mph arterial lane closure:'), ' 50–70 cones.'),
      h('li', null, h('strong', null, 'Single 55-mph freeway lane closure:'), ' 80–120 cones (28 in or 36 in).'),
      h('li', null, h('strong', null, 'Full intersection blockade:'), ' 40–60 cones, plus Type II/III barricades at corners.'),
      h('li', null, h('strong', null, 'Parking lot half-closure:'), ' 20–40 cones (18 in is fine).'),
    ),
    h(
      'p',
      null,
      'For exact taper math by speed, run the closure through the ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' — it returns a cone count and a printable layout. Or read the underlying ',
      h('a', { href: '/blog/mutcd-taper-length-formula-nj' }, 'MUTCD taper length formula guide'),
      '.',
    ),

    h('h2', null, 'Pricing tiers — what most NJ contractors order'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Tier'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical buyer'),
            h('th', { className: 'text-left p-2 border-b' }, 'Order'),
            h('th', { className: 'text-left p-2 border-b' }, 'Approx. retail'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Starter'),
            h('td', { className: 'p-2' }, 'Solo contractor, 1–2 truck crew'),
            h('td', { className: 'p-2' }, '20× 28 in / 7 lb / dual collar'),
            h('td', { className: 'p-2' }, '$520 – $720'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Crew kit'),
            h('td', { className: 'p-2' }, '5–15 employee site contractor'),
            h('td', { className: 'p-2' }, '50× 28 in + 12× 36 in / 10 lb'),
            h('td', { className: 'p-2' }, '$1,650 – $2,250'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Multi-crew'),
            h('td', { className: 'p-2' }, '15–50 employee paving / utility'),
            h('td', { className: 'p-2' }, '120× 28 in + 36× 36 in'),
            h('td', { className: 'p-2' }, '$4,400 – $5,800'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Municipal / DOT'),
            h('td', { className: 'p-2' }, 'Public works, NJDOT sub'),
            h('td', { className: 'p-2' }, '300+ mixed sizes'),
            h('td', { className: 'p-2' }, 'Quote'),
          ),
        ),
      ),
    ),

    h('h2', null, 'Where to buy traffic cones in NJ (with same-day delivery)'),
    h(
      'p',
      null,
      'TrafficKit ships 18 in, 28 in, and 36 in fluorescent-orange traffic cones with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean counties. Standard stock comes with ASTM Type IV dual reflective collars and 7-lb or 10-lb rubber bases. ',
      h('a', { href: '/category/cones-drums' }, 'Browse cones, drums, and channelizers'),
      ' for the catalog, or describe the job to the ',
      h('a', { href: '/assistant' }, 'TrafficKit Assistant'),
      ' — it will spec a kit (size, weight, count) from a few sentences and a posted speed.',
    ),
    h(
      'p',
      null,
      'For one-off needs, a ',
      h('a', { href: '/quote' }, 'quote'),
      ' is the fastest path. Recurring municipal and contractor accounts get NET-30 terms after the first paid invoice and a standing fleet replenishment cadence.',
    ),

    h('h2', null, 'Common cone-spec mistakes we see on punch-list inspections'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Undersized cone for the speed.'), ' 18-inch cones on a 45-mph road are an immediate inspector flag. Step to 28 in.'),
      h('li', null, h('strong', null, 'Faded orange.'), ' UV bleaches fluorescent orange to pale pink in 18–24 months of sun. Retire any cone that reads pink.'),
      h('li', null, h('strong', null, 'No collars on night work.'), ' A non-reflective cone past dusk is a hazard, not a control. Add ASTM Type IV.'),
      h('li', null, h('strong', null, 'Insufficient base weight.'), ' If your cones tip on first deployment, the wind/slipstream beat the base. Step up to 10 lb.'),
      h('li', null, h('strong', null, 'Wrong color.'), ' Red and yellow cones on a road job send conflicting signals. Use orange.'),
      h('li', null, h('strong', null, 'Spacing too wide.'), ' Drivers cut between cones spaced over ~ speed-limit-in-feet apart. Tighten up.'),
    ),
  ),
  faqs: [
    {
      q: 'What size traffic cone do I need for a road job?',
      a: '28 in for any public road work. 18 in is the MUTCD floor for public-road use but is typically reserved for parking-lot and sub-25 mph routing. Step to 36 in for posted speeds at or above 55 mph, and for any night work where conspicuity matters.',
    },
    {
      q: 'Are 18-inch traffic cones legal on roads?',
      a: 'Yes, 18 in is the MUTCD minimum for any public-road channelization. But most state DOTs (NJDOT included) prefer 28 in once posted speed reaches 45 mph, and on a freeway you should be in 36 in.',
    },
    {
      q: 'How heavy should a traffic cone base be?',
      a: '7 lb is the contractor default and holds in most slipstreams. Step to 10 lb for freeway and bridge work, where gusts past trucks at speed will tip lighter bases. 4–5 lb is fine for parking-lot and indoor use only.',
    },
    {
      q: 'Do all traffic cones need reflective collars?',
      a: 'Only if they will work past dusk. The MUTCD requires either one 6-inch collar or dual 4 in + 6 in collars, ASTM Type III or higher, on any cone working between sunset and sunrise or in low-visibility conditions. Most contractors spec dual ASTM Type IV by default.',
    },
    {
      q: 'How many traffic cones do I need to buy?',
      a: 'For a single 35-mph county lane closure, 30–40 cones. For 45 mph, 50–70. For freeway 55 mph, 80–120. Always order 25–30% spare capacity — cones get hit, lost, and forgotten on the truck. Run the math by speed in the SiteMapPlanner.',
    },
    {
      q: 'What is the difference between a traffic cone and a channelizer drum?',
      a: 'Cones are short (18–36 in), light, hand-deployable, and used for short-term channelization. Drums are 36-in fluorescent-orange-and-white striped barrels with weighted bases, used for longer-duration zones (overnight or multi-day) where cones would migrate. Drums are MUTCD-required on long-term work zones; cones are required on short-term.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Flares, Markers, Wands & Flags', path: '/category/flares-markers-wands-flags' },
  ],
  relatedArticles: [
    'parking-cones-buying-guide',
    'road-cones-vs-traffic-cones',
    'how-many-cones-for-lane-closure-nj',
  ],
}
