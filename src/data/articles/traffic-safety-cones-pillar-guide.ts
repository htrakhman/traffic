import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic safety cones" (50K/mo, High comp).
 * Pillar guide — broad coverage of the category, links out to the cluster
 * (sizes, colors, MUTCD, lane-closure math, parking, etc.). Topical-authority
 * play per Harold's 2026-04-27 directive.
 */
export const articleTrafficSafetyConesPillarGuide: Article = {
  slug: 'traffic-safety-cones-pillar-guide',
  title: 'Traffic Safety Cones: The Complete Guide (Sizes, Standards, Use Cases, and What to Buy)',
  excerpt:
    'Traffic safety cones are the most-used channelizing device on US roads — but most people buy the wrong size. This is the pillar guide: every size, color, weight, MUTCD spec, and use-case in one place.',
  metaDescription:
    'Complete guide to traffic safety cones: sizes (18/28/36 in), colors, base weights, MUTCD specs, use cases, and buying advice. Same-day NJ delivery on contractor sets.',
  primaryKeyword: 'traffic safety cones',
  secondaryKeywords: [
    'safety cones',
    'traffic cones',
    'orange cones',
    'road cones',
    'cone for traffic',
    'cones safety',
    'traffic safety supply',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-28',
  dateModified: '2026-04-28',
  readMinutes: 11,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A traffic safety cone is a hollow plastic channelizing device with a weighted base, used to route vehicles or pedestrians around a hazard. The federal ',
      h('strong', null, 'Manual on Uniform Traffic Control Devices (MUTCD)'),
      ' sets the rules for size, color, and reflectivity in any work zone on a public road. The short version: 18 inches is the absolute minimum, 28 inches is the contractor default for daytime road work, 36 inches is required for nighttime or high-speed (>45 mph) work, and the color is fluorescent orange (or pink-orange for incident response). This guide covers every size, the inspection-passing details, common mistakes, and what to actually buy.',
    ),

    h('h2', null, 'What "traffic safety cone" actually means'),
    h(
      'p',
      null,
      'The terminology is loose. "Traffic cone," "safety cone," "road cone," "street cone," "orange cone," "parking cone," and "construction cone" all describe the same product. The MUTCD uses the term "traffic cone" and treats them as a Category 1 channelizing device (alongside drums, tubular markers, and vertical panels). The marketing term "traffic safety cone" emphasizes the safety-equipment use case and is the SEO term most contractors and procurement officers search for. Functionally, they are all the same orange PVC body on a rubber-weighted base.',
    ),

    h('h2', null, 'A short history'),
    h(
      'p',
      null,
      'Traffic cones were invented by Charles D. Scanlon in Los Angeles in 1940 — he patented a hollow rubber cone designed to mark fresh road paint without damaging vehicles. The design held up for 80+ years; modern cones use injection-molded PVC instead of rubber for the body, but the silhouette is unchanged. The signature orange color was added in the 1970s when the FHWA standardized fluorescent orange as the federal channelizing-device color. Most innovation since 1980 has happened in the reflective sheeting (going from glass-bead to high-intensity prismatic) and in base weight engineering — the recessed-cavity "sandbag-ready" base is a 2010s addition.',
    ),

    h('h2', null, 'The four sizes — and where each one belongs'),
    h('h3', null, '12-inch cones'),
    h(
      'p',
      null,
      '12-inch cones are not approved for vehicle traffic on any public road. Their entire use case is indoor: warehouse routing, training drills, sports / agility, retail merchandising, indoor showroom layout. They are typically 1–2 lb total, easy to stack 50+ in a tote. Buy them only if your need is genuinely indoor.',
    ),

    h('h3', null, '18-inch cones (parking, low-speed, daytime)'),
    h(
      'p',
      null,
      '18-inch cones are the parking-lot and low-speed standard. The MUTCD allows them on roadways with a posted speed of 25 mph or less, in daytime conditions only. They will not pass an inspection on a 35+ mph road or any nighttime work. For a deeper buyer\'s guide on the parking-lot use case, see our ',
      h('a', { href: '/blog/parking-cones-buying-guide' }, 'parking cones buying guide'),
      '.',
    ),

    h('h3', null, '28-inch cones (the contractor default)'),
    h(
      'p',
      null,
      '28-inch cones with a 7 lb rubber base are the most-used size on US road construction. They handle 35–45 mph traffic, stack reasonably for a pickup-bed or trailer rack, and meet MUTCD nighttime visibility requirements when fitted with a double 4-in + 6-in reflective collar. Most contractor "starter sets" are 20–30 cones in this size.',
    ),

    h('h3', null, '36-inch cones (nighttime, highway, freeway-speed)'),
    h(
      'p',
      null,
      '36-inch cones with a 10–12 lb base are the spec for nighttime work on roads ≥35 mph and for daytime work on roads ≥55 mph. They are heavier (harder to stack and load), take more truck space, and cost roughly 2.5x what 28-inch cones cost. NJDOT and most state DOTs prefer 42-inch drums for tapers on freeways, so 36-inch cones are typically the buffer-and-activity-area gear, not the taper.',
    ),

    h('h2', null, 'MUTCD specifications — what to check before you order'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Requirement'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Color'),
            h('td', { className: 'p-2' }, 'Fluorescent orange (or fluorescent pink-orange for incident response, per MUTCD 2023).'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Minimum height (vehicle traffic)'),
            h('td', { className: 'p-2' }, '18 in (≤25 mph daytime); 28 in (≤45 mph); 36 in (>45 mph or any nighttime).'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Reflective sheeting'),
            h('td', { className: 'p-2' }, 'ASTM Type IV high-intensity prismatic. Single 4-in collar minimum at night ≤45 mph; double collar (4 in + 6 in) for >45 mph.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Stability test'),
            h('td', { className: 'p-2' }, 'Must remain upright in vehicle slipstream — practically translates to ≥7 lb base for road work.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Crashworthiness'),
            h('td', { className: 'p-2' }, 'NCHRP-350 / MASH compliance — most major-brand cones meet this; off-brand imports often do not.'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      h('em', null, 'Verify all MUTCD specs against the current published edition for your state — federal MUTCD is the floor, but your state DOT may have stricter requirements. NJDOT generally tracks federal but reserves the right to specify by job.'),
    ),

    h('h2', null, 'Use cases — by job type'),

    h('h3', null, 'Road construction lane closure'),
    h(
      'p',
      null,
      'A typical NJ single-lane closure on a 40 mph county road needs 20–30 cones (28 in) for the taper, buffer, and activity area, plus a 25% spare buffer for losses. The exact count comes out of the MUTCD taper formula. We worked the math in detail in our ',
      h('a', { href: '/blog/how-many-cones-for-lane-closure-nj' }, 'cone count for a lane closure guide'),
      ' and the ',
      h('a', { href: '/blog/mutcd-taper-length-formula-nj' }, 'taper length formula breakdown'),
      '.',
    ),

    h('h3', null, 'Utility / sewer / excavation'),
    h(
      'p',
      null,
      'Short-duration utility work uses smaller cone sets — typically 12–18 cones plus advance warning signs. Cones channelize traffic around a single dig, with the 28-inch size handling daytime work and 36-inch for after-hours. The full small-job recipe is in our ',
      h('a', { href: '/blog/temporary-traffic-control-plan-utility-job' }, 'TTC plan for a utility job guide'),
      '.',
    ),

    h('h3', null, 'Parking and event'),
    h(
      'p',
      null,
      '18-inch cones with a 4–7 lb base, spaced 8–10 ft apart, work for any parking-lot or event ingress job. A typical festival ingress is 50–150 cones; a sealcoat closure is 40–60.',
    ),

    h('h3', null, 'Emergency / incident response'),
    h(
      'p',
      null,
      'Fire / EMS / police use 28-inch cones in fluorescent pink-orange (per MUTCD 2023) to mark incident scenes. The pink color distinguishes unplanned events from planned construction. Most contractors do not stock pink cones.',
    ),

    h('h3', null, 'Pedestrian routing'),
    h(
      'p',
      null,
      'For pedestrian-only routing (sidewalk closure, mall, indoor event), 18-inch cones plus rope or retractable belt stanchions work better than 28-inch cones. Heavier cones look industrial and intimidate foot traffic. For sidewalk closures that touch vehicle traffic, see our ',
      h('a', { href: '/blog/pedestrian-crosswalk-signs-mutcd' }, 'pedestrian crosswalk signs guide'),
      '.',
    ),

    h('h2', null, 'Base weight — the spec people overlook'),
    h(
      'p',
      null,
      'Base weight matters as much as cone height. The base resists wind and the slipstream from a passing vehicle:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '2–4 lb:'), ' indoor and parking-lot only.'),
      h('li', null, h('strong', null, '7 lb:'), ' the road-work standard. Holds up to 45 mph traffic and most NJ wind days.'),
      h('li', null, h('strong', null, '10 lb:'), ' nighttime or 35–55 mph.'),
      h('li', null, h('strong', null, '12 lb (or recessed-cavity for sandbag):'), ' freeway and high-wind. Always pair with a sandbag at 55+ mph.'),
    ),

    h('h2', null, 'Reflective collars — sheeting grades that pass inspection'),
    h(
      'p',
      null,
      'The reflective collar is what makes a cone visible at night. There are three sheeting grades you will see specified:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Engineer Grade (Type I/II):'), ' minimum reflectivity. NOT acceptable for any modern MUTCD work zone.'),
      h('li', null, h('strong', null, 'High-Intensity Prismatic (Type IV):'), ' the work-zone minimum. ~600 candelas-per-lux at -4° entrance angle.'),
      h('li', null, h('strong', null, 'Diamond Grade (Type IX/XI):'), ' premium. Used on signs and high-priority cones. Roughly 2x the reflectivity of Type IV.'),
    ),
    h(
      'p',
      null,
      'For most NJ contractor cone sets, ASTM Type IV is correct. Specify it on the order; do not assume it is included in the cheap-imports SKUs.',
    ),

    h('h2', null, 'Common buying mistakes'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Buying 18-inch for a road job.'), ' The single most common cite. 18-inch cones are not legal above 25 mph.'),
      h('li', null, h('strong', null, 'Skipping the reflective collar.'), ' "Daytime job, do not need it" — until you run past dusk and the inspector shows up.'),
      h('li', null, h('strong', null, 'Solid PVC base.'), ' Cracks on the first vehicle hit. Always buy rubber base.'),
      h('li', null, h('strong', null, 'Off-brand import.'), ' Cones that do not meet NCHRP-350 / MASH crashworthiness specs are technically illegal on federally-funded jobs (which is most NJDOT work).'),
      h('li', null, h('strong', null, 'Under-counting.'), ' Buy 25% more than the calculated minimum. Cones get stolen, run over, and lost in the lot.'),
    ),

    h('h2', null, 'How long do safety cones last?'),
    h(
      'p',
      null,
      'A well-cared-for 28-inch cone with rubber base lasts 3–5 years. The first thing to fail is the fluorescent-orange color — UV exposure bleaches it to pale pink in 18–36 months of full sun. Replacement triggers:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Color faded past pink — "pumpkin" rather than "fluorescent" — replace.'),
      h('li', null, 'Reflective collar peeling at the edges — replace, or recollar if cone body is still good.'),
      h('li', null, 'Cracked PVC at the cone-to-base seam — retire, the cone is now unstable.'),
      h('li', null, 'Base damage from repeated vehicle hits — base alone can be replaced on most premium models; cheap imports are throw-away.'),
    ),

    h('h2', null, 'Pricing — what cones cost in 2026'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Size'),
            h('th', { className: 'text-left p-2 border-b' }, 'Base'),
            h('th', { className: 'text-left p-2 border-b' }, 'Reflective'),
            h('th', { className: 'text-left p-2 border-b' }, 'Approx. retail / cone'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '18 in'),
            h('td', { className: 'p-2' }, '4 lb'),
            h('td', { className: 'p-2' }, 'None'),
            h('td', { className: 'p-2' }, '$12 – $18'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '28 in'),
            h('td', { className: 'p-2' }, '7 lb'),
            h('td', { className: 'p-2' }, 'Single 4-in collar'),
            h('td', { className: 'p-2' }, '$22 – $32'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '28 in'),
            h('td', { className: 'p-2' }, '10 lb'),
            h('td', { className: 'p-2' }, 'Double collar'),
            h('td', { className: 'p-2' }, '$32 – $48'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '36 in'),
            h('td', { className: 'p-2' }, '10 lb'),
            h('td', { className: 'p-2' }, 'Double collar'),
            h('td', { className: 'p-2' }, '$58 – $80'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '36 in'),
            h('td', { className: 'p-2' }, '12 lb / sandbag-ready'),
            h('td', { className: 'p-2' }, 'Double collar'),
            h('td', { className: 'p-2' }, '$80 – $110'),
          ),
        ),
      ),
    ),
    h('p', null, 'These are 2026 retail ranges. Bulk pricing kicks in at quantities of 50+ — typically a 10–15% discount.'),

    h('h2', null, 'Where to buy traffic safety cones in NJ'),
    h(
      'p',
      null,
      'TrafficKit ships traffic safety cones (18 in, 28 in, 36 in, with single or double reflective collars) to Central NJ contractors with same-day delivery. ',
      h('a', { href: '/category/cones-drums' }, 'Browse cones and channelizers'),
      ' for the catalog. For a custom set sized to a specific job, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' — describe the job and we will spec the size, count, and base weight that pass inspection. Or talk to the ',
      h('a', { href: '/assistant' }, 'TrafficKit Assistant'),
      ' for a real-time spec.',
    ),
  ),
  faqs: [
    {
      q: 'What is a traffic safety cone?',
      a: 'A traffic safety cone is a hollow PVC channelizing device — typically fluorescent orange with a weighted rubber base — used to route vehicles or pedestrians around a hazard. The MUTCD treats them as a Category 1 channelizing device alongside drums and tubular markers.',
    },
    {
      q: 'What sizes do traffic safety cones come in?',
      a: '12 in, 18 in, 28 in, and 36 in are the standard sizes. 12 in is indoor-only; 18 in is parking and low-speed daytime work; 28 in is the contractor default for road work; 36 in is required for nighttime work above 35 mph and for daytime above 55 mph.',
    },
    {
      q: 'Are traffic safety cones reflective?',
      a: 'They should be for any nighttime work. ASTM Type IV high-intensity prismatic sheeting on a 4-inch collar is the minimum. For roads above 45 mph, MUTCD requires double collars (4 in + 6 in). Daytime-only parking-lot cones can skip the collar.',
    },
    {
      q: 'What does each cone color mean?',
      a: 'Fluorescent orange is the federally standard channelizing color. Fluorescent pink-orange (added in MUTCD 2023) is for incident response. Lime / yellow is pedestrian-hazard only. Red is stop or no-entry zones (do not use for routing). Blue is ADA / accessible-stall marking.',
    },
    {
      q: 'How heavy should the base be?',
      a: '4 lb for indoor / parking-lot use. 7 lb for daytime road work up to 45 mph (the contractor standard). 10 lb for nighttime or 35–55 mph. 12 lb for freeway and high-wind, plus a sandbag at 55+ mph.',
    },
    {
      q: 'How long do safety cones last?',
      a: '3–5 years for a quality 28-inch cone with rubber base. UV fades fluorescent orange in 18–36 months — once the color looks pink rather than orange, retire the cone. Reflective collars typically need replacement before the cone body wears out.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Safety Lighting', path: '/category/safety-lighting' },
  ],
  relatedArticles: [
    'road-cones-vs-traffic-cones',
    'parking-cones-buying-guide',
    'how-many-cones-for-lane-closure-nj',
  ],
}
