import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "pink traffic cones" (500/mo, High comp, $5.50 bid).
 * Decision-tree structure: when pink is the right cone (incident response),
 * when it isn't, and how the 2023 MUTCD update changed what's compliant.
 */
export const articlePinkTrafficConesGuide: Article = {
  slug: 'pink-traffic-cones-guide',
  title: 'Pink Traffic Cones: When They Are MUTCD-Compliant and When They Are Not',
  excerpt:
    'Fluorescent pink (technically pink-orange) cones became MUTCD-approved in 2023 — but only for one specific use case: incident response. Here is the decision tree for when pink is the right cone, when it is not, and what to buy.',
  metaDescription:
    'Pink traffic cones are MUTCD-approved as of 2023, but only for incident response (crash scenes, emergencies). Decision tree: when to use pink, when to use orange.',
  primaryKeyword: 'pink traffic cones',
  secondaryKeywords: [
    'pink cones',
    'fluorescent pink cones',
    'incident response cones',
    'emergency cones',
    'pink-orange cones',
    'first responder cones',
  ],
  targetVolume: 500,
  datePublished: '2026-05-10',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Pink traffic cones — technically "fluorescent pink" or "pink-orange" — are not just a styling choice. ',
      h('strong', null, 'The 2023 MUTCD update added pink as an approved color for one specific situation: incident response.'),
      ' Crash scenes, fire response, hazmat, downed-vehicle recovery, and other unplanned roadside events are the only conditions where a pink cone is the right cone. For everything else — planned construction, lane closures, utility work — fluorescent orange remains the required color. Below is the decision tree, the regulatory background, and what to buy if you operate in either category.',
    ),

    h('h2', null, 'Quick decision tree'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Did the work zone arrive without a permit? '), 'It is incident response → pink is allowed. (Crash scene, downed tree, vehicle fire, hazmat.)'),
      h('li', null, h('strong', null, 'Was the work zone planned and submitted via a TCP? '), 'Use orange. Pink will be cited.'),
      h('li', null, h('strong', null, 'Mixed scene (planned work that became an incident)? '), 'Default to orange unless an emergency responder takes command of the scene.'),
      h('li', null, h('strong', null, 'Sports drill / coaching / non-roadway? '), 'Pink is fine — MUTCD does not apply off public roads.'),
    ),

    h('h2', null, 'Why the 2023 MUTCD added pink'),
    h(
      'p',
      null,
      'Before 2023, every cone on the road was supposed to be fluorescent orange (or fluorescent yellow-green for school zones — a separate category). Incident responders had been using pink unofficially for years because police/fire/EMS wanted a way to distinguish a crash scene from a planned construction zone. The 2023 MUTCD codified the practice: fluorescent pink-orange (sometimes labeled "incident response pink") became an approved color, but only for incident response and emergency management situations.',
    ),
    h(
      'p',
      null,
      'The reasoning: an arriving driver who sees orange cones expects "construction ahead, slow down" — but that mental model can be a poor fit for an incident scene where the lane closure is sudden, the geometry is irregular, and personnel are exposed in unexpected places. Pink signals a different mental model: "something happened here, get extra cautious."',
    ),

    h('h2', null, 'When pink is the correct cone'),
    h('h3', null, 'Crash scene investigations'),
    h(
      'p',
      null,
      'Fire, EMS, and police use pink cones to mark vehicle positions, evidence, and worker exclusion zones during a crash investigation. Pink also helps photographic documentation — markers stand out against the orange-leaning palette of typical road backgrounds.',
    ),
    h('h3', null, 'Vehicle fires and hazmat'),
    h(
      'p',
      null,
      'Pink cones mark the exclusion zone perimeter and command-post staging during fire and hazmat response. The color cues civilian drivers that this is not normal road work and to expect non-standard behavior on the scene.',
    ),
    h('h3', null, 'Downed-tree and weather emergencies'),
    h(
      'p',
      null,
      'After a storm, when crews respond to a downed tree or live-wire situation that has not been TCP-permitted, pink cones are the right gear. Once the situation transitions from "emergency" to "planned cleanup with a TCP," the cones swap to orange.',
    ),
    h('h3', null, 'Tow truck and recovery operations'),
    h(
      'p',
      null,
      'Tow operators clearing a disabled vehicle on the shoulder use pink cones to mark the recovery area. NHTSA-style guidance on roadside recovery has been moving toward pink as the default for incident-related markers.',
    ),

    h('h2', null, 'When pink is the WRONG cone (and what to use instead)'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Scenario'),
            h('th', { className: 'text-left p-2 border-b' }, 'Use this'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Lane closure for paving'), h('td', { className: 'p-2' }, 'Fluorescent orange (28 or 36 in)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Utility excavation in the right-of-way'), h('td', { className: 'p-2' }, 'Fluorescent orange')),
          h('tr', null, h('td', { className: 'p-2' }, 'Long-duration construction'), h('td', { className: 'p-2' }, 'Fluorescent orange + drums')),
          h('tr', null, h('td', { className: 'p-2' }, 'School zone'), h('td', { className: 'p-2' }, 'Fluorescent yellow-green (separate MUTCD color)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Parking lot or private property'), h('td', { className: 'p-2' }, 'Orange (or any color — no MUTCD jurisdiction)')),
          h('tr', null, h('td', { className: 'p-2' }, 'Crash scene investigation'), h('td', { className: 'p-2' }, 'Fluorescent pink')),
        ),
      ),
    ),

    h('h2', null, 'Who should buy pink cones'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Fire departments. '), 'Most NJ paid and volunteer departments are transitioning to pink for vehicle fire and rescue scenes.'),
      h('li', null, h('strong', null, 'EMS agencies. '), 'Pink at the patient-loading area separates the EMS scene from any nearby road-construction zone.'),
      h('li', null, h('strong', null, 'Police traffic units. '), 'Crash-scene investigation increasingly uses pink for exclusion zones.'),
      h('li', null, h('strong', null, 'Tow operators. '), 'Recovery operations on shoulders and ROW.'),
      h('li', null, h('strong', null, 'Highway maintenance crews. '), 'For incident response, not for planned maintenance.'),
    ),
    h(
      'p',
      null,
      'A typical fire department or EMS agency stocks 12–24 pink cones per response unit. They live in the apparatus, deploy on scene, and recover when the incident clears.',
    ),

    h('h2', null, 'Sizes and prices'),
    h(
      'p',
      null,
      'Pink cones come in the standard MUTCD sizes — 18, 28, and 36 inches — with the same reflective collar requirements as orange. A 28-inch pink cone with a 7-lb base typically runs $32–$50 retail, slightly more than the orange equivalent because the production volume is smaller. Reflective collars are usually high-intensity prismatic; some vendors offer a "incident command" variant with a fluorescent pink cone body and lime-yellow reflective collar for daytime/nighttime mixed visibility.',
    ),

    h('h2', null, 'Watch out for these mistakes'),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Pink on a planned closure. '),
        'A contractor who buys pink because "they look cool" will get cited on the first NJDOT inspection. The MUTCD restriction is on use, not on possession.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Mixing pink and orange in the same scene. '),
        'Once an incident scene is established, keep the marking consistent. Mixing colors confuses arriving drivers about whether the geometry is incident or construction.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Pre-2023 pink without proper retroreflectivity. '),
        'Some early pink cones predate the MUTCD spec and have weaker reflective sheeting. Buy pink cones spec\'d to the 2023 incident-response standard, with high-intensity prismatic collars.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Faded pink. '),
        'Pink fades faster than orange under UV. A pink cone may need replacement at 12–24 months versus 18–36 for orange.',
      ),
    ),

    h('h2', null, 'What to buy if you operate in both categories'),
    h(
      'p',
      null,
      'A road contractor who occasionally responds to incidents (a tow operator, a DOT maintenance crew, a utility company on emergency call-outs) usually carries both colors:',
    ),
    h(
      'ul',
      null,
      h('li', null, '20–30× fluorescent orange 28-inch cones for scheduled work'),
      h('li', null, '12× fluorescent pink 28-inch cones in a separate rack for incident response'),
      h('li', null, 'Truck or apparatus-mounted storage clearly labeled by color so the wrong cone never lands on the wrong scene'),
    ),
    h(
      'p',
      null,
      'For Central NJ contractors and emergency-services agencies, ',
      h('a', { href: '/category/cones-drums' }, 'browse our cones and channelizers'),
      ' — we stock both colors with same-day delivery to Middlesex, Monmouth, Mercer, Somerset, Union, and Hunterdon. To spec the right cone count and color for a job or incident-response kit, ',
      h('a', { href: '/quote' }, 'get a quote'),
      ' or ask the ',
      h('a', { href: '/assistant' }, 'Assistant'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'Are pink traffic cones MUTCD-approved?',
      a: 'Yes, as of the 2023 MUTCD update, fluorescent pink (also called pink-orange) is approved — but only for incident response and emergency management. For planned construction and routine work zones, fluorescent orange remains required.',
    },
    {
      q: 'Can a contractor use pink cones on a regular work zone?',
      a: 'No. The 2023 MUTCD restricts pink to incident response. A contractor using pink cones on a planned, TCP-permitted work zone will be cited on inspection. The orange-versus-pink distinction is a meaningful regulatory split, not a styling option.',
    },
    {
      q: 'Why did MUTCD add pink in 2023?',
      a: 'To distinguish unplanned incident scenes (crashes, fires, hazmat, downed trees) from planned construction. Drivers approaching orange expect construction patterns; pink cues a different mental model — irregular geometry, exposed personnel, expect the unexpected. Many emergency responders had been using pink informally for years before the 2023 codification.',
    },
    {
      q: 'Do I need different reflective sheeting on pink cones?',
      a: 'The retroreflectivity requirements are the same as for orange — high-intensity prismatic collars, daytime and nighttime visibility per ASTM Type IV or better. The pink cone body uses fluorescent dye that fades slightly faster than orange under UV exposure.',
    },
    {
      q: 'Can fire and police buy pink cones now?',
      a: 'Yes — most NJ fire departments, EMS agencies, and police traffic units are transitioning their incident-response kits to pink as of the 2023 update. Stock per response unit is typically 12–24 cones. Some agencies keep a small orange backup for situations where their crew is supporting a planned road-construction operation.',
    },
  ],
  relatedProducts: [
    { label: 'Cones & Channelizers', path: '/category/cones-drums' },
    { label: 'Custom Traffic Cones', path: '/category/custom-cones' },
    { label: 'Site Map Planner', path: '/planner' },
    { label: 'Get a Quote', path: '/quote' },
  ],
  relatedArticles: [
    'orange-cones-explained',
    'road-cones-vs-traffic-cones',
    'official-traffic-control-device-mutcd',
  ],
}
