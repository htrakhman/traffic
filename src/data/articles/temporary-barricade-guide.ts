import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "temporary barricade" (~500/mo, High comp, $20.67 bid).
 * Pillar guide structure: definitional + family overview + buying picker.
 */
export const articleTemporaryBarricadeGuide: Article = {
  slug: 'temporary-barricade-guide',
  title: 'Temporary Barricades: A Pillar Guide to the Whole Family',
  excerpt:
    'A temporary barricade is any barricade meant to be deployed and removed within hours to months — covering everything from plastic A-frames to water-filled barriers to retractable belt stanchions.',
  metaDescription:
    'Temporary barricades pillar guide — the seven main types, MUTCD compliance, when to use each, and how to size a complete short-duration setup for contractor work.',
  primaryKeyword: 'temporary barricade',
  secondaryKeywords: [
    'temporary barricades',
    'temporary fencing barricade',
    'short term barricade',
    'temporary traffic barricade',
    'temporary pedestrian barricade',
    'portable temporary barricade',
  ],
  targetVolume: 500,
  datePublished: '2026-05-18',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A temporary barricade is any barricade meant to be deployed and removed within hours to months — distinct from permanent barriers like cast-in-place concrete or fixed bollards. ',
      h('strong', null, 'The "temporary" label covers seven distinct families, from $40 plastic A-frames to $3,000 truck-deployed concrete barriers, and choosing the wrong family is the most common buying mistake in this category.'),
      ' This pillar guide walks the whole map: the seven families, the MUTCD framework that ties them together, and a buying picker by job type.',
    ),

    h('h2', null, 'What "temporary" actually means'),
    h(
      'p',
      null,
      'Temporary barricades are defined by deployability, not by structure. The criterion: can a 2-to-4 person crew install and remove the barricade with standard truck-mounted gear (no crane, no excavator) in under an hour per unit? If yes, it is temporary. If no, it is permanent infrastructure.',
    ),
    h(
      'p',
      null,
      'That criterion brings together a wide family — plastic, steel, concrete, water-filled, retractable, and event-specific designs all qualify. What they share is mobility. What they differ on is impact rating, visibility, footprint, and price.',
    ),

    h('h2', null, 'The seven families'),
    h(
      'p',
      null,
      "Every temporary barricade you'll encounter fits into one of these:",
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, '1. MUTCD Type 1/2/3 barricades '), '— the codified family. One, two, or three rails on A-frame or post bases. Used for traffic channelizing and road closures. See ',
        h('a', { href: '/blog/barricades-types-uses-guide' }, 'Types I/II/III barricades'),
        '.'),
      h('li', null, h('strong', null, '2. Water-filled plastic barriers '), '— Jersey-shape plastic shells filled on site. TL-1/TL-2 impact rating. Good for medium-duration closures and pedestrian protection. See ',
        h('a', { href: '/blog/water-filled-barriers-buying-guide' }, 'water-filled barriers'),
        '.'),
      h('li', null, h('strong', null, '3. Portable concrete barriers '), "— pin-connected Jersey barriers placed by HIAB truck. Full TL-3 rating, used on freeway-grade work. Heavier setup but the only temporary option rated for high-speed impacts."),
      h('li', null, h('strong', null, '4. A-frame / saw-horse barricades '), '— the lightest, fastest format. Single horizontal panel on hinged legs. Pedestrian and low-speed channelizing only.'),
      h('li', null, h('strong', null, '5. Bike-rack / crowd-control barricades '), '— interlocking steel grid panels. Crowd flow and event work, not vehicle protection. See ',
        h('a', { href: '/blog/crowd-control-barriers-buying-guide' }, 'crowd control barriers'),
        '.'),
      h('li', null, h('strong', null, '6. Expandable / retractable barricades '), '— accordion frames or belt stanchions. Indoor and pedestrian-corridor use, where setup speed and storage compactness matter more than impact rating.'),
      h('li', null, h('strong', null, '7. Custom / specialty '), "— low-profile airport barricades, scissor barricades, parade-specific designs. Niche applications that don't fit cleanly into the other six."),
    ),

    h('h2', null, 'MUTCD compliance: what carries through'),
    h(
      'p',
      null,
      'MUTCD §6F.63 applies primarily to Type 1/2/3 barricades — the codified family. The other temporary families pick up MUTCD requirements selectively:',
    ),
    h(
      'ul',
      null,
      h('li', null, 'Color: orange-and-white striping at 6" alternating intervals on anything that channelizes traffic on a public road. Skipped on event-only and crowd-control units.'),
      h('li', null, 'Reflectivity: ASTM Type III sheeting minimum on any roadway-exposed temporary barricade. Type IV for >35 mph, Type V for highway.'),
      h('li', null, 'Lighting: Type A flashing low-intensity for nighttime exposure on any roadway barricade. Specified by state DOT — check the NJDOT supplement.'),
      h('li', null, 'Sign-mounting: only Type 3 barricades are MUTCD-rated to carry an R11-2 ROAD CLOSED panel.'),
      h('li', null, 'Impact rating: NCHRP 350 / MASH for anything intended to redirect a vehicle. Water-filled plastic = TL-1/TL-2; portable concrete = TL-3; nothing else qualifies for impact use.'),
    ),

    h('h2', null, 'Buying picker by job type'),
    h(
      'p',
      null,
      "Pick the family first, then the model within the family:",
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
          h('tr', { className: 'border-b' },
            h('th', { className: 'text-left p-2' }, 'Job'),
            h('th', { className: 'text-left p-2' }, 'Family'),
            h('th', { className: 'text-left p-2' }, 'Typical unit cost'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Sidewalk closure, single shift'),
            h('td', { className: 'p-2' }, 'A-frame Type 1'),
            h('td', { className: 'p-2' }, '$40–$80'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Residential street channelizing, 1–3 days'),
            h('td', { className: 'p-2' }, 'Type 2 (A-frame)'),
            h('td', { className: 'p-2' }, '$70–$130'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Road closure with detour'),
            h('td', { className: 'p-2' }, 'Type 3 + R11-2'),
            h('td', { className: 'p-2' }, '$140–$240'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Pedestrian protection alongside vehicle traffic'),
            h('td', { className: 'p-2' }, 'Water-filled plastic'),
            h('td', { className: 'p-2' }, '$180–$280'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Freeway lane closure, >45 mph'),
            h('td', { className: 'p-2' }, 'Portable concrete'),
            h('td', { className: 'p-2' }, '$220–$320 new / $80–$180 used'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Parade, race, or outdoor event'),
            h('td', { className: 'p-2' }, 'Bike-rack / crowd-control'),
            h('td', { className: 'p-2' }, '$60–$140'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Indoor queue or pedestrian corridor'),
            h('td', { className: 'p-2' }, 'Retractable belt stanchion'),
            h('td', { className: 'p-2' }, '$60–$160'),
          ),
          h('tr', { className: 'border-b' },
            h('td', { className: 'p-2' }, 'Storage-yard perimeter'),
            h('td', { className: 'p-2' }, 'Used concrete'),
            h('td', { className: 'p-2' }, '$80–$180'),
          ),
        ),
      ),
    ),

    h('h2', null, 'Sizing a complete temporary setup'),
    h(
      'p',
      null,
      'A real temporary work zone needs more than just barricades. The full ladder, from advance warning to termination:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Advance warning area '), '— signs at 500–1,500 ft before the work zone, depending on posted speed.'),
      h('li', null, h('strong', null, 'Transition area '), '— tapered cones and channelizers, length per MUTCD taper formula. See ',
        h('a', { href: '/blog/mutcd-taper-length-formula-nj' }, 'MUTCD taper length formula'),
        '.'),
      h('li', null, h('strong', null, 'Activity area '), '— this is where the temporary barricades live. Type 2 or Type 3 channelizing the work; concrete or water-filled if positive protection is needed.'),
      h('li', null, h('strong', null, 'Termination area '), '— tapered cones returning traffic to the open lane. END ROAD WORK sign.'),
    ),
    h(
      'p',
      null,
      'For a complete count from job geometry, the ',
      h('a', { href: '/planner' }, 'SiteMapPlanner'),
      ' generates a full MUTCD-compliant layout — cones, signs, barricades, light kits — from a handful of inputs.',
    ),

    h('h2', null, 'Common mistakes when buying temporary barricades'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Buying one family for every job. '), "A contractor who buys 50 Type 2 A-frames thinks they're set — but they still need bike-rack barricades for the next parade gig and water-filled units for the next freeway shoulder closure."),
      h('li', null, h('strong', null, 'Skipping the impact-rating question. '), "If a vehicle can hit the barricade and you didn't buy something TL-rated, you have a personal-injury exposure. A-frames do not stop cars."),
      h('li', null, h('strong', null, 'Under-spec\'ing the sheeting. '), 'A new Type 2 with old Type III sheeting fails nighttime visibility audits within 18 months. Spec Type IV from the start on highway-adjacent work.'),
      h('li', null, h('strong', null, 'Mixing pin/connection systems. '), 'Different manufacturers use different end-connectors. Buy your barricades in pin-compatible lots so a 50-unit run actually links end-to-end.'),
      h('li', null, h('strong', null, 'Forgetting ballast. '), 'Plastic temporary barricades blow over in wind. Spec sandbags or water-filled ballast with the order; do not improvise on site.'),
    ),

    h('h2', null, 'Storage and life-cycle'),
    h(
      'p',
      null,
      "Temporary barricades live longer when stored right. Plastic A-frames last 5–8 years stored under shade or indoors and 2–3 years stored in direct sun. Steel A-frames last 10+ years if dry-stored, half that under tarps that hold moisture. Water-filled plastic lasts 4–6 years; the failure mode is UV cracking of the shell, not the water capacity.",
    ),
    h(
      'p',
      null,
      'Budget for re-sheeting every 2–3 years on heavy-use units. Replacement sheeting kits run $8–$15 per rail and take about 5 minutes per barricade to apply.',
    ),

    h('h2', null, 'Bottom line'),
    h(
      'p',
      null,
      "Temporary barricade is a category, not a product. Map your job — speed, duration, impact exposure, pedestrian or vehicle, indoor or outdoor — to one of the seven families before shopping models. For contractor stock, the practical mix is: Type 2 A-frames, a small set of Type 3 with R11-2 panels, water-filled plastic for protection work, and a stack of bike-rack barricades for event side gigs. Add portable concrete only when freeway work is regular. Re-sheet every 2–3 years and the inventory pays out across many seasons.",
    ),
  ),
  faqs: [
    {
      q: 'What is a temporary barricade?',
      a: 'A temporary barricade is any barricade deployable and removable by a 2-to-4 person crew with truck-mounted gear in under an hour per unit. It covers MUTCD Type 1/2/3, water-filled plastic, portable concrete, A-frames, bike-rack panels, retractable belt stanchions, and event-specific designs.',
    },
    {
      q: 'Are temporary barricades MUTCD compliant?',
      a: 'MUTCD §6F.63 specifies Type 1/2/3 barricades directly. Other temporary families pick up MUTCD color, reflectivity, and lighting requirements when used on public roads — orange-and-white striping, ASTM Type III sheeting minimum, Type A flashing lights at night.',
    },
    {
      q: 'How long can a temporary barricade stay in place?',
      a: 'Duration is set by state DOT TTC standards, not by the barricade itself. Type 1 is short-duration (under one shift). Type 2 and Type 3 cover medium and project-length. Water-filled and portable concrete are rated for project-length use. All require periodic inspection during deployment.',
    },
    {
      q: 'Do temporary barricades stop vehicles?',
      a: 'Only some. Portable concrete (TL-3) and water-filled plastic (TL-1/TL-2) are crash-rated. Type 1/2/3, A-frames, and bike-rack panels are channelizing devices — they redirect attention, not vehicles. For positive impact protection, buy crash-rated.',
    },
    {
      q: 'What is the cheapest temporary barricade?',
      a: 'A-frame Type 1 plastic barricades run $40–$80 each new. They are the right buy only for sidewalk closures, pedestrian channelizing, and low-speed daytime work. For anything else, the lowest cost option is rarely the right one.',
    },
    {
      q: 'Where do I buy temporary barricades in NJ?',
      a: 'We stock all seven temporary barricade families for purchase with same-day Central NJ delivery, including TL-rated water-filled units and portable concrete. Get a quote on /quote or chat with our Assistant for a count tied to your job.',
    },
  ],
  relatedProducts: [
    { label: 'Browse barricades & barriers', path: '/category/barricades' },
    { label: 'Browse signs & sign stands', path: '/category/signs' },
    { label: 'Get a TTC delivery quote', path: '/quote' },
    { label: 'Build a TTC plan with SiteMapPlanner', path: '/planner' },
  ],
  relatedArticles: [
    'barricades-types-uses-guide',
    'water-filled-barriers-buying-guide',
    'crowd-control-barriers-buying-guide',
  ],
}
