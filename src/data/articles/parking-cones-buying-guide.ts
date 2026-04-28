import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "parking cones" (50K/mo, High comp).
 * Commercial-intent buyer's guide — parking-lot operators / property managers
 * Googling for what to actually order. Pivots toward TrafficKit's purchase +
 * same-day-delivery offering.
 */
export const articleParkingConesBuyingGuide: Article = {
  slug: 'parking-cones-buying-guide',
  title: 'Parking Cones: What to Buy for Lots, Garages, and Private Property (2026 Guide)',
  excerpt:
    'Most "parking cones" people buy are too short, too light, and fade in 18 months. Here is the size, weight, color, and quantity to actually order for a lot, garage, or event — plus what to skip.',
  metaDescription:
    'Parking cones buying guide: 18 in vs 28 in, base weights, colors, and how many to order for lots, garages, valet, and events. Same-day NJ delivery on commercial sets.',
  primaryKeyword: 'parking cones',
  secondaryKeywords: [
    'orange cones',
    'safety cones',
    'parking lot cones',
    'cone for traffic',
    'small traffic cones',
    'cones for parking',
    'parking cones for sale',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-28',
  readMinutes: 9,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'For a parking lot, garage, or private-property job, ',
      h('strong', null, '18-inch fluorescent-orange cones with a 4–7 lb rubber base are the right buy in 95% of cases.'),
      ' Skip the 6-inch and 12-inch novelty cones — they tip in any breeze and your insurance carrier will not back a claim against a cone shorter than 18 inches. For a typical surface lot you want 12–24 cones; a parking garage with two-way ramp control needs 20–40; a valet line wants 8–12 plus a couple of "VALET" sign stands. Below is the full size-by-application guide, the colors that mean different things, and what we ship same-day in Central NJ.',
    ),

    h('h2', null, 'Are parking cones the same as traffic cones?'),
    h(
      'p',
      null,
      '"Parking cones," "safety cones," "orange cones," and "traffic cones" all describe the same product family — a hollow PVC body in fluorescent orange with a weighted rubber base. The terms are interchangeable in casual use. The MUTCD (Manual on Uniform Traffic Control Devices) calls them "traffic cones" and only certifies sizes 18 inches and up. Anything shorter — the 6-inch agility cones or 12-inch sport cones — is not approved for any vehicle-route channelization. If you are routing cars, do not buy below 18 inches.',
    ),
    h(
      'p',
      null,
      'For a side-by-side on the terminology overlap, see our ',
      h('a', { href: '/blog/road-cones-vs-traffic-cones' }, 'road cones vs. traffic cones guide'),
      '.',
    ),

    h('h2', null, 'Size by application'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Use'),
            h('th', { className: 'text-left p-2 border-b' }, 'Cone size'),
            h('th', { className: 'text-left p-2 border-b' }, 'Base weight'),
            h('th', { className: 'text-left p-2 border-b' }, 'Why'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Indoor warehouse / showroom'),
            h('td', { className: 'p-2' }, '12 in or 18 in'),
            h('td', { className: 'p-2' }, '2–4 lb'),
            h('td', { className: 'p-2' }, 'No wind, low speed. Easy to stack.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Surface parking lot'),
            h('td', { className: 'p-2' }, '18 in'),
            h('td', { className: 'p-2' }, '4–7 lb'),
            h('td', { className: 'p-2' }, 'Visible to drivers, stays put in light wind.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Parking garage / structured lot'),
            h('td', { className: 'p-2' }, '18 in'),
            h('td', { className: 'p-2' }, '7 lb'),
            h('td', { className: 'p-2' }, 'Ramp slipstream tips lighter cones.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Valet / hotel drop-off'),
            h('td', { className: 'p-2' }, '18 in or 28 in'),
            h('td', { className: 'p-2' }, '4–7 lb'),
            h('td', { className: 'p-2' }, '28 in if cars exit at 25+ mph; otherwise 18 in.'),
          ),
          h(
            'tr',
            null,
            h(
              'td',
              { className: 'p-2' },
              'Event ingress / festival',
            ),
            h('td', { className: 'p-2' }, '18 in'),
            h('td', { className: 'p-2' }, '4–7 lb'),
            h('td', { className: 'p-2' }, 'Channelize foot + slow vehicle traffic.'),
          ),
          h(
            'tr',
            null,
            h(
              'td',
              { className: 'p-2' },
              'Driveway / residential',
            ),
            h('td', { className: 'p-2' }, '12 in or 18 in'),
            h('td', { className: 'p-2' }, '2–4 lb'),
            h('td', { className: 'p-2' }, 'Reserve-this-spot duty, low speed.'),
          ),
          h(
            'tr',
            null,
            h(
              'td',
              { className: 'p-2' },
              'Parking lot ON A ROAD (>25 mph adjacent)',
            ),
            h('td', { className: 'p-2' }, '28 in'),
            h('td', { className: 'p-2' }, '7 lb'),
            h('td', { className: 'p-2' }, 'MUTCD minimum once vehicle traffic is involved.'),
          ),
        ),
      ),
    ),

    h('h2', null, 'Colors — what each one means'),
    h(
      'p',
      null,
      'Almost every parking cone you will ever buy is fluorescent orange because that is the federally specified color for channelizing devices. But there are real cases for other colors:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Orange (default).'), ' Construction, parking, lane-routing, anywhere a driver needs to be steered.'),
      h('li', null, h('strong', null, 'Lime / yellow.'), ' Pedestrian safety only — wet floor, broken tile, slip hazards. Not for car routing.'),
      h('li', null, h('strong', null, 'Red.'), ' "Stop / no entry" zones, fire-lane reservation, security blockades. Do not use for actual road work — drivers misread red as stop-and-wait, then you have a queue problem.'),
      h('li', null, h('strong', null, 'Blue.'), ' Reserved for ADA / accessible parking marking and water-utility crews. Property managers occasionally buy a couple to mark accessible-only stalls during repaves.'),
      h('li', null, h('strong', null, 'White.'), ' Indoor showroom / trade-show only. Useless outside.'),
      h('li', null, h('strong', null, 'Pink-orange.'), ' MUTCD 2023 added fluorescent pink-orange for incident-response only. Not a parking-lot color.'),
    ),

    h('h2', null, 'How many parking cones do you actually need?'),
    h(
      'p',
      null,
      'Quantity comes down to the perimeter you are channelizing. The working rule for parking-lot work is ',
      h('strong', null, 'one cone every 8–10 feet'),
      ' along the routing path, plus a 25% spare buffer for losses (cones get stolen, run over, and forgotten in the lot at end of shift).',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Single closed parking row (10–12 stalls):'), ' 10–12 cones.'),
      h('li', null, h('strong', null, 'Double row + crossover lane:'), ' 20–25 cones.'),
      h('li', null, h('strong', null, 'Full half-lot closure for restripe / sealcoat:'), ' 40–60 cones.'),
      h('li', null, h('strong', null, 'Garage two-way ramp control:'), ' 20–30 cones plus 2–4 directional sign stands.'),
      h('li', null, h('strong', null, 'Valet ingress + queue:'), ' 8–12 cones plus a "VALET" stand.'),
      h('li', null, h('strong', null, 'Special-event ingress (church / school / wedding):'), ' 30–80 cones depending on driveway length.'),
    ),
    h(
      'p',
      null,
      'For closures that touch a public road — like a parking lot whose driveway dumps onto a 35 mph county road — the cone math changes. Use our ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'cone-count guide for lane closures'),
      ' for the taper math. Or open the ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' and lay out the lot — it will spit back a cone count sized to the speed limit.',
    ),

    h('h2', null, 'PVC body vs. rubber-base — and why rubber wins for parking lots'),
    h(
      'p',
      null,
      'Cones come in two construction styles: solid one-piece PVC (cheap, light, brittle) and PVC body + recycled-rubber base (slightly heavier, cheap to replace). For parking-lot duty, ',
      h('strong', null, 'always buy rubber-base.'),
      ' A driver will roll over your cone at some point. A rubber base survives and pops back up; a solid PVC base cracks at the seam, the cone lists, and the weight redistribution makes it tip in any wind. Replacement cost is the same either way — just buy rubber up front.',
    ),

    h('h2', null, 'Reflective collars — when do you need them?'),
    h(
      'p',
      null,
      'For daytime-only lot work (a typical sealcoat or restripe), no. For any cone that will sit out overnight or during dawn/dusk, yes — a single 4-inch reflective collar at minimum. ASTM Type IV high-intensity prismatic sheeting is the spec to look for. Plain reflective tape from a hardware store does not pass nighttime visibility checks and your insurance underwriter will note it.',
    ),
    h(
      'p',
      null,
      'For 24-hour event setups (festivals, race courses, multi-day site work), spec double collars (4 in + 6 in). The premium over single-collar is small (~$3/cone) and visibility doubles past 50 ft.',
    ),

    h('h2', null, 'Storage and care — the part nobody buys for'),
    h(
      'p',
      null,
      'Parking cones live or die by storage. Most of the cones we replace got stacked in a hot truck bed for a summer and warped, or got piled with the bases inside out and split. The two things that double cone life:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'A cone rack with a vertical post — cones drop on, base-down, no compression.'),
      h('li', null, 'A canvas cover or shaded shed for any cones in long-term storage. UV bleaches fluorescent orange to pale yellow in 18–24 months of sun exposure, even when the cones are off-duty.'),
    ),

    h('h2', null, 'Bulk-buying tiers (what most NJ parking-lot accounts order)'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Order size'),
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
            h('td', { className: 'p-2' }, 'Single-property mgr, valet, small church'),
            h('td', { className: 'p-2' }, '12× 18 in / 4 lb'),
            h('td', { className: 'p-2' }, '$180 – $260'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Lot operator'),
            h('td', { className: 'p-2' }, 'Multi-stall lot, garage'),
            h('td', { className: 'p-2' }, '24× 18 in / 7 lb'),
            h('td', { className: 'p-2' }, '$360 – $520'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Property co.'),
            h('td', { className: 'p-2' }, 'Sealcoat / paving sub'),
            h('td', { className: 'p-2' }, '50× 18 in + 12× 28 in'),
            h('td', { className: 'p-2' }, '$1,000 – $1,400'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Event ops'),
            h('td', { className: 'p-2' }, 'Festival, parking-lot ministry, school'),
            h('td', { className: 'p-2' }, '80× 18 in + 6× sign stands'),
            h('td', { className: 'p-2' }, '$1,400 – $1,900'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'These are TrafficKit retail ranges as of April 2026. Bid pricing on quantities above 100 cones is custom — ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' with the lot dimensions and we will spec the right size mix.',
    ),

    h('h2', null, 'Where to buy parking cones in NJ (with same-day delivery)'),
    h(
      'p',
      null,
      'TrafficKit ships 18-inch and 28-inch parking cones with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon, and northern Ocean counties. ',
      h('a', { href: '/category/cones-drums' }, 'Browse cones and channelizers'),
      ' for the catalog, or talk to the ',
      h('a', { href: '/assistant' }, 'TrafficKit Assistant'),
      ' if you want it to spec a kit from a description of the lot. Property managers ordering recurring sealcoat / striping cycles get NET-30 terms after the first paid invoice.',
    ),

    h('h2', null, 'Common parking-cone mistakes we see on lot inspections'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Faded orange.'), ' Cones older than 24 months in sun should be retired. They look pink, not orange, and inspectors flag them.'),
      h('li', null, h('strong', null, 'Tipped cones in wind.'), ' If a 4-lb base keeps tipping, you bought too light for the lot — step up to 7 lb. Adding a sandbag works in a pinch.'),
      h('li', null, h('strong', null, 'Wrong color for the use.'), ' Red cones on a sealcoat closure send the wrong signal — drivers stop, queue forms, and you have a complaint. Use orange for routing.'),
      h('li', null, h('strong', null, 'Insufficient count.'), ' One cone every 20 feet is not enough. Drivers cut between cones spaced wider than ~10 ft.'),
    ),
  ),
  faqs: [
    {
      q: 'What size are standard parking cones?',
      a: '18 inches with a 4 lb or 7 lb rubber base is the parking-lot default. Smaller (12 in) is fine indoors; larger (28 in) is needed if the lot adjoins a road with traffic above 25 mph.',
    },
    {
      q: 'Are 18-inch cones legal for parking lots?',
      a: 'Yes. The MUTCD does not regulate private parking lots the same way it regulates public roads. 18-inch cones are the standard size for surface lots, garages, and valet lines. The 18-inch minimum from MUTCD only applies once you are channelizing public-road vehicle traffic.',
    },
    {
      q: 'How many parking cones do I need for a lot?',
      a: 'Plan one cone every 8–10 feet of routing path, plus a 25% spare buffer. A 12-stall row needs 10–12 cones; a half-lot closure for sealcoat needs 40–60; a parking-garage ramp-control setup needs 20–30. For closures that touch a public road, switch to the lane-closure cone math.',
    },
    {
      q: 'What color cone should I buy?',
      a: 'Fluorescent orange for almost every use case (the federally standard color). Lime/yellow for pedestrian-only hazard marking. Red ONLY for stop or no-entry zones — never for routing, drivers misread it. Blue is reserved for ADA / accessible-stall marking.',
    },
    {
      q: 'Are parking cones reflective?',
      a: 'Daytime-only lots: not required. Anything that sits past dusk: spec a 4-inch reflective collar at minimum. ASTM Type IV high-intensity prismatic is the right grade. Skip the hardware-store reflective tape — it does not meet visibility specs.',
    },
    {
      q: 'How long do parking cones last?',
      a: '3–5 years for a well-stored 18-inch cone. UV exposure fades fluorescent orange in 18–24 months of sun, so cones in a lot 24/7 will need replacement before the body wears out. A cone rack and shaded storage doubles useful life.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Parking Blocks', path: '/category/parking-blocks' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Speed Bumps & Humps', path: '/category/speed-bumps-humps' },
  ],
  relatedArticles: [
    'road-cones-vs-traffic-cones',
    'traffic-cone-rental-guide',
    'how-many-cones-for-lane-closure-nj',
  ],
}
