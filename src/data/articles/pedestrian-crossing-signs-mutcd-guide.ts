import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "pedestrian crossing signs" (50K/mo, High comp, ci=94).
 * FAQ-heavy AEO structure — answers the questions municipal procurement officers,
 * school facility managers, and HOA boards Google about W11-2, S1-1, RRFB,
 * MUTCD compliance, etc.
 */
export const articlePedestrianCrossingSignsMutcdGuide: Article = {
  slug: 'pedestrian-crossing-signs-mutcd-guide',
  title: 'Pedestrian Crossing Signs: MUTCD Codes, Where Each Goes, and What to Buy (2026)',
  excerpt:
    'W11-2, S1-1, R1-6, RRFB — the alphabet of pedestrian crossing signs is confusing until you map it to the actual situation. This guide pairs every common sign with the use case, the MUTCD code, and what to order.',
  metaDescription:
    'Pedestrian crossing signs explained: MUTCD codes (W11-2, S1-1, R1-6, RRFB), placement rules, and what each sign means. Same-day delivery on NJ-spec sign packages.',
  primaryKeyword: 'pedestrian crossing signs',
  secondaryKeywords: [
    'pedestrian crossing signal',
    'pedestrian crosswalk signs',
    'school crossing signs',
    'crosswalk sign',
    'pedestrian warning sign',
    'pedestrian crossing sign mutcd',
    'rrfb sign',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-28',
  dateModified: '2026-04-28',
  readMinutes: 10,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Pedestrian crossing signs are warning, regulatory, and guide signs that alert drivers to a place where pedestrians cross a roadway. The federal ',
      h('strong', null, 'Manual on Uniform Traffic Control Devices (MUTCD)'),
      ' assigns each one a code and a use case. The most common ones: ',
      h('strong', null, 'W11-2'),
      ' (yellow diamond pedestrian symbol — generic warning), ',
      h('strong', null, 'S1-1'),
      ' (fluorescent yellow-green pentagon — school crossing), ',
      h('strong', null, 'R1-6'),
      ' (in-street "Yield to Pedestrians"), and ',
      h('strong', null, 'RRFB'),
      ' (rectangular rapid-flashing beacon — actively flashes when activated). Below, every common pedestrian crossing sign mapped to where it belongs and what to actually order. Verify all MUTCD specs against your current state edition — federal MUTCD is the floor; states can add stricter requirements.',
    ),

    h('h2', null, 'The four sign categories you will encounter'),
    h(
      'p',
      null,
      'Pedestrian-related signs split into four MUTCD categories:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Warning (W-series, yellow diamonds)'), ' — alert drivers ahead of a pedestrian crossing.'),
      h('li', null, h('strong', null, 'Regulatory (R-series, white rectangles)'), ' — state a legal rule (e.g., yield, stop).'),
      h('li', null, h('strong', null, 'School (S-series, fluorescent yellow-green pentagons or diamonds)'), ' — designate a school zone or school crossing.'),
      h('li', null, h('strong', null, 'Active beacons (RRFB, PHB, HAWK)'), ' — supplement static signs with flashing or signal-controlled lights, typically driver-actuated by a pedestrian.'),
    ),

    h('h2', null, 'Common pedestrian signs — code, image, and where it goes'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'MUTCD code'),
            h('th', { className: 'text-left p-2 border-b' }, 'Sign'),
            h('th', { className: 'text-left p-2 border-b' }, 'Color / shape'),
            h('th', { className: 'text-left p-2 border-b' }, 'Use'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'W11-2'),
            h('td', { className: 'p-2' }, 'Pedestrian Crossing'),
            h('td', { className: 'p-2' }, 'Fluorescent yellow-green diamond'),
            h('td', { className: 'p-2' }, 'Advance warning of any pedestrian crossing.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'W11-15'),
            h('td', { className: 'p-2' }, 'Pedestrian + Bicycle'),
            h('td', { className: 'p-2' }, 'Fluorescent yellow-green diamond'),
            h('td', { className: 'p-2' }, 'Combined ped/bike crossing — multi-use trail crossings.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'W16-7P'),
            h('td', { className: 'p-2' }, 'Diagonal Down-Arrow Plaque'),
            h('td', { className: 'p-2' }, 'Yellow rectangular plaque'),
            h('td', { className: 'p-2' }, 'Mounted under W11-2 to indicate the crossing is right here.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'S1-1'),
            h('td', { className: 'p-2' }, 'School Crossing'),
            h('td', { className: 'p-2' }, 'Fluorescent yellow-green pentagon'),
            h('td', { className: 'p-2' }, 'Crossing used by school-age pedestrians.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'R1-6 / R1-6a'),
            h('td', { className: 'p-2' }, 'In-Street Yield/Stop to Pedestrians'),
            h('td', { className: 'p-2' }, 'White rectangle'),
            h('td', { className: 'p-2' }, 'Mounted in the roadway center, at the crosswalk.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'R10-15'),
            h('td', { className: 'p-2' }, '"Turning Vehicles Yield to Pedestrians"'),
            h('td', { className: 'p-2' }, 'White regulatory'),
            h('td', { className: 'p-2' }, 'At signalized intersections with right-on-red turns.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'R9-3a'),
            h('td', { className: 'p-2' }, '"No Pedestrian Crossing"'),
            h('td', { className: 'p-2' }, 'White regulatory'),
            h('td', { className: 'p-2' }, 'Where pedestrians are prohibited (freeway entries, etc.).'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'RRFB'),
            h('td', { className: 'p-2' }, 'Rectangular Rapid-Flashing Beacon'),
            h('td', { className: 'p-2' }, 'LED beacon assembly'),
            h('td', { className: 'p-2' }, 'Driver-actuated supplement to W11-2 at uncontrolled crossings.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'PHB / HAWK'),
            h('td', { className: 'p-2' }, 'Pedestrian Hybrid Beacon'),
            h('td', { className: 'p-2' }, 'Signal head'),
            h('td', { className: 'p-2' }, 'High-volume crossings; full red signal when activated.'),
          ),
        ),
      ),
    ),

    h('h2', null, 'Frequently asked questions'),

    h('h3', null, 'What sign do I need at an unsignalized mid-block crossing?'),
    h(
      'p',
      null,
      'The standard package is W11-2 (advance warning) + W16-7P (down-arrow plaque) at the crosswalk. If average daily traffic is above ~2,000 vehicles or speed limit is above 35 mph, MUTCD recommends adding an RRFB (rectangular rapid-flashing beacon). For very high volume (≥9,000 ADT), upgrade to a PHB / HAWK signal.',
    ),

    h('h3', null, 'What is the difference between W11-2 and S1-1?'),
    h(
      'p',
      null,
      'Both are fluorescent yellow-green warning signs about pedestrians. W11-2 is the generic pedestrian crossing warning — a diamond. S1-1 is the school crossing warning — a pentagon (the only pentagon-shaped sign in the MUTCD). Use S1-1 for crossings serving K-12 schools; use W11-2 for everything else.',
    ),

    h('h3', null, 'Why are pedestrian signs fluorescent yellow-green and not regular yellow?'),
    h(
      'p',
      null,
      'In 1998 the FHWA approved fluorescent yellow-green specifically for pedestrian, school, and bicycle warning signs. Studies showed that the lime-green color was 1.4x more conspicuous than standard yellow, especially at dawn / dusk and in cluttered urban backgrounds. The 2009 MUTCD made it the preferred color for these warning categories. Some legacy yellow signs remain on jurisdictional roadways but new installs should be fluorescent yellow-green.',
    ),

    h('h3', null, 'How tall do pedestrian signs need to be mounted?'),
    h(
      'p',
      null,
      'Per MUTCD §2A.18, the bottom of a sign on the side of a rural roadway must be at least 5 ft above the pavement edge. In a business / urban / pedestrian-heavy area where parked vehicles can obscure the sign, the minimum is 7 ft to the bottom edge. For an in-street R1-6 yield sign, the assembly is mounted in the roadway center on a flexible base (~24-in tall sign with a 36-in delineator).',
    ),

    h('h3', null, 'What size are pedestrian crossing signs?'),
    h(
      'p',
      null,
      'Standard W11-2 is 30 in × 30 in for conventional roads; 36 in × 36 in is the expressway minimum. S1-1 is 30 in × 30 in. R1-6 in-street signs are 12 in × 36 in (NJ standard). Increase one size for higher-speed roads (≥45 mph) — MUTCD has size tables in §2A.06.',
    ),

    h('h3', null, 'Are pedestrian signs required to be reflective?'),
    h(
      'p',
      null,
      'Yes — all permanent traffic signs must meet a minimum reflectivity standard (FHWA-published levels by sign type, mostly Engineer Grade Type I as the floor and Type IV high-intensity prismatic as the working standard). For pedestrian / school signs, fluorescent yellow-green sheeting in High-Intensity Prismatic or Diamond Grade is the typical spec. Plain non-reflective signs do not pass.',
    ),

    h('h3', null, 'What is an RRFB and when do I need one?'),
    h(
      'p',
      null,
      'A rectangular rapid-flashing beacon (RRFB) is an LED beacon assembly mounted next to a W11-2 sign that flashes a stutter pattern when a pedestrian pushes the button. They are highly effective — studies show driver yield rates jump from 18% to 80% with an RRFB. They are now the recommended treatment at uncontrolled mid-block crossings on roads with ≥35 mph posted speed or ≥2,000 ADT. Most municipal RRFB packages are solar-powered; cost is $4,000–$8,000 per crossing installed.',
    ),

    h('h3', null, 'What is a HAWK signal?'),
    h(
      'p',
      null,
      'A pedestrian hybrid beacon (PHB), commonly called a HAWK ("High-intensity Activated crossWalK"), is a full red-yellow-red signal head used at high-volume uncontrolled crossings. It rests dark; when activated, it goes flashing yellow → solid yellow → solid red → flashing red (drivers may proceed once clear) → dark. PHBs are warranted at very high volume crossings (~9,000 ADT) where an RRFB is not enough.',
    ),

    h('h3', null, 'Do I need both an advance W11-2 and a sign at the crossing?'),
    h(
      'p',
      null,
      'Yes — best practice is one W11-2 placed in advance (typically 100–250 ft before the crossing depending on speed) plus a W11-2 with W16-7P down-arrow plaque AT the crossing. The advance sign gets drivers to slow; the at-crossing sign tells them where exactly. Skipping the advance sign is a common cite on a TCP review.',
    ),

    h('h3', null, 'Can I install pedestrian crossing signs on private property?'),
    h(
      'p',
      null,
      'Yes — shopping centers, apartment complexes, school campuses, and corporate parks can install non-jurisdictional pedestrian signs. Match MUTCD spec for color and size; you cannot use it as a legal regulatory sign (only the agency with jurisdiction can do that), but the warning function still works. For HOAs and property managers buying signs for residential use, the W11-2 is the right choice.',
    ),

    h('h3', null, 'Who is responsible for installing pedestrian crossing signs?'),
    h(
      'p',
      null,
      'The agency with jurisdiction over the road. State DOTs handle state highways; county DPWs handle county roads; municipal public works handle local streets. Permit-required for all jurisdictional installs — the agency engineer has to sign off on the location and type. Private property installs (parking lots, campuses) do not need a state permit but should follow MUTCD spec.',
    ),

    h('h3', null, 'How much does a pedestrian crossing sign package cost?'),
    h(
      'p',
      null,
      'A bare W11-2 + W16-7P + post + base runs $180–$320 retail. Add a school S1-1 plus zone signs and you are at $400–$650. RRFB packages run $4,000–$8,000 installed. PHB/HAWK signals are $25K–$60K turnkey. NJ municipal procurement quotes vary widely with installation labor.',
    ),

    h('h2', null, 'Signs to pair with the crossing — the package mindset'),
    h(
      'p',
      null,
      'Most pedestrian crossing failures come from buying one sign instead of a package. A complete uncontrolled mid-block crossing typically uses:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Advance W11-2 + W16-9P "AHEAD" plaque (200 ft pre-crossing on a 35 mph road).'),
      h('li', null, 'At-crossing W11-2 + W16-7P down-arrow.'),
      h('li', null, 'In-street R1-6 "Yield to Pedestrians" centerline assembly.'),
      h('li', null, 'High-visibility crosswalk markings (continental or zebra-striped pattern).'),
      h('li', null, 'RRFB if speed/volume thresholds met.'),
    ),

    h('h2', null, 'Where to buy pedestrian crossing signs in NJ'),
    h(
      'p',
      null,
      'TrafficKit ships MUTCD-compliant pedestrian crossing signs (W11-2, S1-1, R1-6, R10-15, and more) to Central NJ contractors and municipalities with same-day delivery. ',
      h('a', { href: '/category/signs-sign-stands' }, 'Browse signs and sign stands'),
      ' for the catalog, or ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' for a custom package — give us the road, the speed, and the volume, and we will spec the right sign mix. For school-zone work specifically, the S-series signs are stocked separately. Talk to the ',
      h('a', { href: '/assistant' }, 'TrafficKit Assistant'),
      ' if you want a recommendation in real time.',
    ),
    h(
      'p',
      null,
      'For the related crosswalk-marking and crosswalk-sign math, see our ',
      h('a', { href: '/blog/pedestrian-crosswalk-signs-mutcd' }, 'pedestrian crosswalk signs guide'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'What does a pedestrian crossing sign look like?',
      a: 'The most common is W11-2 — a fluorescent yellow-green diamond with a black silhouette of a pedestrian. School crossings use S1-1, a fluorescent yellow-green pentagon (the only pentagon-shaped sign in the MUTCD). In-street yield signs are white rectangles labeled "State Law: Yield to Pedestrians within Crosswalk."',
    },
    {
      q: 'What is the MUTCD code for a pedestrian crossing sign?',
      a: 'W11-2 is the generic pedestrian crossing warning sign. W11-15 is the combined pedestrian/bicycle version. S1-1 is the school crossing warning. R1-6 is the in-street yield sign. RRFB and PHB / HAWK are active beacons that supplement the static signs.',
    },
    {
      q: 'How tall should a pedestrian sign be mounted?',
      a: '5 ft to the bottom of the sign in a rural area; 7 ft in a business/urban area where parked cars can block the view. In-street R1-6 yield signs are mounted on a centerline base, typically 24-in panel on a 36-in delineator post.',
    },
    {
      q: 'When do I need an RRFB?',
      a: 'MUTCD recommends an RRFB at uncontrolled mid-block pedestrian crossings on roads with a posted speed of 35 mph or higher OR average daily traffic of 2,000+ vehicles. Studies show driver yield rates jump from 18% to 80% with an RRFB installed.',
    },
    {
      q: 'What color are pedestrian crossing signs?',
      a: 'Fluorescent yellow-green for warning signs (W11-2, S1-1) and school zone signs. White for regulatory signs (R1-6 in-street yield). The fluorescent yellow-green color was approved in 1998 for pedestrian, school, and bicycle warnings because it tested 1.4x more conspicuous than standard yellow.',
    },
    {
      q: 'Can a private property owner install pedestrian signs?',
      a: 'Yes for warning signs (W11-2) on apartment complexes, shopping centers, schools, and corporate parks. Match MUTCD color and size specs. You cannot install regulatory signs (R-series) as legally enforceable — only the road jurisdiction can — but the warning value still applies.',
    },
  ],
  relatedProducts: [
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Pedestrian & Crowd Control', path: '/category/pedestrian-control' },
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
  ],
  relatedArticles: [
    'pedestrian-crosswalk-signs-mutcd',
    'road-signals-and-signs-guide',
    'official-traffic-control-device-mutcd',
  ],
}
