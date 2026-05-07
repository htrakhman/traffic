import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "metal barricades" (~500/mo, High comp, $27.34 bid).
 * Commercial-comparison structure: metal vs. plastic crowd-control, steel vs.
 * aluminum, sizing, weight, and what to buy. Catches "steel barricades"
 * traffic as a secondary cluster.
 */
export const articleMetalBarricadesBuyingGuide: Article = {
  slug: 'metal-barricades-buying-guide',
  title: 'Metal Barricades: Steel vs. Aluminum, Crowd Control vs. Pedestrian, Sizing & Costs',
  excerpt:
    'Metal barricades — steel or aluminum, interlocking or A-frame, with or without flat feet — are the workhorse for events, parades, and long-duration crowd control. Here is how to size, weight, and pick the right type.',
  metaDescription:
    'Metal barricades buying guide — steel vs. aluminum, interlocking crowd control vs. flat-foot pedestrian, weights, sizing rules, and what to buy for events and worksites.',
  primaryKeyword: 'metal barricades',
  secondaryKeywords: [
    'steel barricades',
    'metal crowd control barricades',
    'aluminum barricades',
    'interlocking barricades',
    'pedestrian barricades metal',
    'metal bike rack barricade',
  ],
  targetVolume: 500,
  datePublished: '2026-05-07',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      h(
        'strong',
        null,
        'Metal barricades are the durable, reusable choice when plastic crowd-control panels would be flimsy or short-lived.',
      ),
      ' Two camps dominate: ',
      h('em', null, 'steel interlocking ("French" or "bike-rack")'),
      ' panels for events and parades, and ',
      h('em', null, 'aluminum flat-foot'),
      ' pedestrian barricades for indoor venues and lightweight crowd channeling. This guide covers the tradeoffs, sizing, and what to actually buy.',
    ),

    h('h2', null, 'Steel vs. aluminum — the headline tradeoff'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Property'),
            h('th', { className: 'text-left p-2 border-b' }, 'Steel'),
            h('th', { className: 'text-left p-2 border-b' }, 'Aluminum'),
          ),
        ),
        h(
          'tbody',
          null,
          h('tr', null, h('td', { className: 'p-2' }, 'Weight (8 ft panel)'), h('td', { className: 'p-2' }, '38–55 lb'), h('td', { className: 'p-2' }, '18–28 lb')),
          h('tr', null, h('td', { className: 'p-2' }, 'Wind stability'), h('td', { className: 'p-2' }, 'High'), h('td', { className: 'p-2' }, 'Moderate')),
          h('tr', null, h('td', { className: 'p-2' }, 'Cost (per panel)'), h('td', { className: 'p-2' }, '$95–$180'), h('td', { className: 'p-2' }, '$140–$260')),
          h('tr', null, h('td', { className: 'p-2' }, 'Corrosion resistance'), h('td', { className: 'p-2' }, 'Galvanized = good'), h('td', { className: 'p-2' }, 'Excellent')),
          h('tr', null, h('td', { className: 'p-2' }, 'Best for'), h('td', { className: 'p-2' }, 'Outdoor events, long deployment'), h('td', { className: 'p-2' }, 'Indoor / frequent moves')),
        ),
      ),
    ),
    h(
      'p',
      null,
      'Steel is heavier, cheaper, and more wind-stable — what most outdoor events and contractor yards stock. Galvanized steel survives the salt and weather of a coastal NJ deployment for 8–12 years if you do not let it sit in puddles. Aluminum is lighter (one person can carry two panels), corrosion-proof, and the right pick if a venue crew sets up and tears down the same panels weekly. The price premium is real but pays back in labor.',
    ),

    h('h2', null, 'Interlocking ("French" / "bike-rack") barricades'),
    h(
      'p',
      null,
      'The interlocking design — sometimes called "French barricade" or "bike-rack barricade" because the silhouette resembles a public bike rack — is the dominant crowd-control format. Each panel ends in a hook on one side and a loop on the other; you walk down a row dropping each new panel into its neighbor. No tools, no pins, no ballast.',
    ),
    h(
      'p',
      null,
      'Standard dimensions: 8 ft long × 42–44 in tall, with 14–16 vertical bars. The hook is at the top; the loop is at the bottom. Once a row is connected, you cannot pull a single panel sideways without unhooking it from the row.',
    ),
    h(
      'p',
      null,
      'For parades, races, and concert lines, this is the default. The ',
      h('a', { href: '/blog/bike-rack-barricades-events-guide' }, 'bike-rack barricades for events guide'),
      ' covers spacing, gaps, and gating in more depth.',
    ),

    h('h2', null, 'Flat-foot pedestrian barricades'),
    h(
      'p',
      null,
      'Aluminum flat-foot barricades use a horizontal foot rail at the base instead of vertical legs that stand on the ground. The foot keeps the panel from tipping forward when a crowd presses on it, but they do NOT interlock — each panel is a stand-alone unit. They work well for indoor venues, museum stanchions, and queues where the crowd is light and the gaps between panels do not matter.',
    ),
    h(
      'p',
      null,
      'A flat-foot barricade is the wrong tool for a parade route or a concert front-of-house: there is nothing holding adjacent panels together, so a side push pops a single panel out of line. Use interlocking for crowds, flat-foot for queues.',
    ),

    h('h2', null, 'When metal beats plastic crowd control'),
    h(
      'ul',
      null,
      h(
        'li',
        null,
        h('strong', null, 'Long deployments.'),
        ' Plastic ABS crowd-control barriers fade and crack in UV after 1–2 seasons of outdoor exposure. Galvanized steel survives a decade.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Outdoor events with wind.'),
        ' A 30 lb water-fillable plastic barrier walks in 25 mph wind; a 45 lb steel panel does not.',
      ),
      h(
        'li',
        null,
        h('strong', null, 'Crowd-pressure scenarios.'),
        ' Front-of-house at concerts, parade routes, race chutes — anywhere a leaning crowd can push the line. Interlocking steel is the field-tested standard.',
      ),
    ),
    h(
      'p',
      null,
      'For the lighter-duty case, see ',
      h('a', { href: '/blog/crowd-control-barriers-buying-guide' }, 'crowd control barriers buying guide'),
      ' — the comparison covers when plastic interlocking or stanchion-and-rope is the better pick.',
    ),

    h('h2', null, 'When metal is overkill (use plastic instead)'),
    h(
      'ul',
      null,
      h('li', null, 'Indoor retail or office crowd channeling — stanchion-and-rope is more appropriate'),
      h('li', null, 'One-time small events with <50 ft of perimeter — plastic interlocking is cheaper and stores in a closet'),
      h('li', null, 'Construction-site travel-lane separation — water-filled barriers or jersey barriers do this job; metal crowd-control is for pedestrians'),
    ),

    h('h2', null, 'Weight, wind, and ballast'),
    h(
      'p',
      null,
      'A standard 8 ft × 42 in steel interlocking panel weighs roughly 45 lb and starts walking at sustained 35 mph wind, tipping at ~50 mph gust. That is more wind tolerance than any plastic crowd-control panel. For deployments in coastal weather (a Belmar boardwalk event in October, for example), you can usually skip ballast on a steel run; for an exposed parking-lot perimeter in spring storms, sandbag every fourth panel.',
    ),
    h(
      'p',
      null,
      'Aluminum panels are about half the weight and need ballast in any sustained crosswind above 22–25 mph. Plan accordingly — the labor saved on setup is partially eaten by sandbag handling.',
    ),

    h('h2', null, 'Sizing rules — how many panels for a perimeter'),
    h(
      'p',
      null,
      'Standard interlocking panels are 8 ft long. To wall off a perimeter, divide the perimeter length in feet by 8 and add 10–15% for corners and gates. A 200-ft perimeter needs 25 panels minimum, plus 3 for corners/gates — call it 30. A typical race-chute needs 2 rows of 30–50 panels each, with 6 ft gates every 60–80 ft for emergency egress.',
    ),

    h('h2', null, 'What to buy first'),
    h(
      'p',
      null,
      'For a small NJ contractor or event-services outfit:',
    ),
    h(
      'ul',
      null,
      h('li', null, '40× 8 ft × 42 in galvanized steel interlocking panels (covers most parades, races, and outdoor events)'),
      h('li', null, '8× corner / 6 ft gate panels'),
      h('li', null, '8× sandbags for the windy days'),
      h('li', null, 'Optional: 12× aluminum flat-foot panels for indoor venue or museum gigs'),
      h('li', null, 'A flat-bed trailer or 16-ft box truck to move them — 40 panels weigh ~1,800 lb stacked'),
    ),

    h('h2', null, 'Where to buy metal barricades in NJ'),
    h(
      'p',
      null,
      'Browse our ',
      h('a', { href: '/category/barricades-barriers' }, 'barricades and barriers category'),
      ' for steel and aluminum interlocking panels and flat-foot units. Not sure how many you need for a specific event or worksite? ',
      h('a', { href: '/assistant' }, 'Ask the Assistant'),
      ' — describe the perimeter and crowd size and it will spec a panel count. For a custom set with same-day Central NJ delivery, ',
      h('a', { href: '/quote' }, 'request a quote'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'What is a metal barricade?',
      a: 'A reusable barricade panel made of steel or aluminum, typically 8 ft long and 42–44 in tall, used for crowd control at events, parades, and worksite perimeters. Two main types: interlocking (hook-and-loop ends, the dominant format for crowds) and flat-foot (free-standing aluminum panel for indoor queues).',
    },
    {
      q: 'Steel or aluminum metal barricades — which is better?',
      a: 'Steel for outdoor events, long deployments, and crowd-pressure scenarios — heavier, cheaper, more wind-stable. Aluminum for indoor venues and crews that set up the same panels weekly — lighter, corrosion-proof, easier on labor but ~50% more expensive and less wind-stable.',
    },
    {
      q: 'How heavy is a metal barricade?',
      a: 'Standard 8 ft × 42 in steel interlocking panels weigh 38–55 lb (galvanized steel runs heavier). Aluminum equivalents weigh 18–28 lb. Heavier-duty 8 ft × 48 in steel panels for music-festival front-of-house can weigh 60–75 lb each.',
    },
    {
      q: 'How many metal barricades do I need for a 200-ft perimeter?',
      a: 'Roughly 25 standard 8 ft interlocking panels plus 3–4 extra for corners and gates — call it 28–30 panels for a complete perimeter. Add a row of 30 more if you are building a race chute or front-of-house double-row.',
    },
    {
      q: 'Do metal barricades need sandbags?',
      a: 'Steel interlocking panels are wind-stable to about 35 mph sustained / 50 mph gust without ballast — most outdoor events, no sandbags needed. Aluminum flat-foot panels need sandbags in any sustained crosswind above 22 mph. For exposed coastal sites, sandbag every third or fourth panel as a precaution.',
    },
    {
      q: 'How much do metal barricades cost?',
      a: 'Steel interlocking panels run $95–$180 each retail; aluminum equivalents run $140–$260. A 30-panel set with corners and gates lands around $3,000–$5,000 in steel or $4,500–$7,000 in aluminum. Used / refurbished steel panels are routinely available at 40–60% of new pricing.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Request a custom quote', path: '/quote' },
  ],
  relatedArticles: [
    'crowd-control-barriers-buying-guide',
    'bike-rack-barricades-events-guide',
    'pedestrian-barriers-guide',
  ],
}
