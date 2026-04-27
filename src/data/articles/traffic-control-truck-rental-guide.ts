import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic control truck" (500/mo, CI=39, score=12.82).
 * Tactical article — distinguished from traffic-control-trailer-rental-guide
 * by focusing on truck-mounted/operated vehicles (TMA trucks, cone trucks,
 * shadow vehicles, attenuator trucks) rather than towed trailers.
 */
export const articleTrafficControlTruckRentalGuide: Article = {
  slug: 'traffic-control-truck-rental-guide',
  title: 'Traffic Control Truck Rental: TMA Trucks, Cone Trucks, and Shadow Vehicles',
  excerpt:
    'A field-level guide to the truck-mounted vehicles that anchor a modern work zone — TMA trucks, cone trucks, shadow vehicles, and arrow-board trucks — with MUTCD use cases and 2026 rental rates.',
  metaDescription:
    'Traffic control truck rental: TMA trucks, cone trucks, shadow vehicles, arrow board trucks. MUTCD/MASH requirements, sizing rules, and 2026 daily and weekly rates.',
  primaryKeyword: 'traffic control truck',
  secondaryKeywords: [
    'TMA truck rental',
    'truck mounted attenuator',
    'shadow vehicle rental',
    'cone truck rental',
    'truck mounted arrow board',
    'mobile work zone vehicle',
    'attenuator truck',
  ],
  targetVolume: 500,
  datePublished: '2026-04-27',
  readMinutes: 8,
  body: h(
    Fragment,
    null,

    h(
      'p',
      { className: 'lead' },
      'A traffic control truck is a road-legal vehicle outfitted with a regulated work-zone function — impact protection, directional signaling, cone deployment, or shadow-vehicle warning — that the contractor drives onto the job and either parks at the activity area or rolls along with the work. Unlike a towed trailer, a truck-mounted device travels under its own power, can reposition during the shift, and usually carries a Class 5 or larger chassis to handle the gear. The four types most contractors actually rent are TMA (truck mounted attenuator) trucks, cone trucks, shadow vehicles, and truck mounted arrow board (TMAB) trucks.',
    ),

    h('h2', null, 'What is a traffic control truck used for?'),
    h(
      'p',
      null,
      'Truck-mounted devices solve the problems that towed trailers cannot: mobile operations that move with the work, short-duration patches where setup time matters, and shadow-vehicle protection where the chassis itself is the impact buffer. A trailer must be parked, leveled, and chocked. A truck rolls. That distinction matters on mobile striping, paving crack-seal, line-painting, sweeping, and overhead utility work, where the protected zone moves at 1–10 mph for hours.',
    ),
    h(
      'p',
      null,
      'The other big use case is impact protection on highway-class work. State DOT specifications routinely require a shadow vehicle equipped with a MASH-eligible TMA upstream of any worker on foot in the active travel lane. The truck is structural — the cushion absorbs the hit so the workers do not.',
    ),

    h('h2', null, 'What are the four main types of traffic control trucks?'),
    h(
      'p',
      null,
      'Most rental fleets organize truck-mounted equipment into four families. Each one answers a distinct work-zone question — protect, deploy, warn, or signal.',
    ),
    h(
      'div',
      { className: 'overflow-x-auto' },
      h(
        'table',
        null,
        h(
          'thead',
          null,
          h(
            'tr',
            null,
            h('th', null, 'Truck Type'),
            h('th', null, 'Primary Function'),
            h('th', null, 'Standard / Reference'),
            h('th', null, 'Where It Sits'),
            h('th', null, 'Typical Chassis'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', null, 'TMA Truck'),
            h('td', null, 'Crash cushion shadow vehicle'),
            h('td', null, 'MASH TL-2 / TL-3'),
            h('td', null, 'Upstream of activity area'),
            h('td', null, '15k–26k GVWR'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Cone Truck'),
            h('td', null, 'Cone laydown / pickup'),
            h('td', null, 'MUTCD §6F.64 cone specs'),
            h('td', null, 'Mobile, runs the taper'),
            h('td', null, '15k–26k GVWR'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Shadow Vehicle'),
            h('td', null, 'Visible upstream warning'),
            h('td', null, 'MUTCD §6G.01 mobile ops'),
            h('td', null, 'Trailing the work crew'),
            h('td', null, '10k–26k GVWR'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Truck Mounted Arrow Board (TMAB)'),
            h('td', null, 'Lane shift / lane closure indication'),
            h('td', null, 'MUTCD §6F.61, §6L.06'),
            h('td', null, 'Upstream of taper'),
            h('td', null, '15k+ GVWR'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'A TMA truck and a shadow vehicle are not the same thing. A shadow vehicle is any visible chase truck with appropriate warning lights and signs. A TMA truck is a shadow vehicle that also carries a MASH-eligible impact attenuator on the rear — it is the one the state spec usually requires on highway work. Cone trucks are the niche fleet asset most general contractors rent rather than own; the cone-handling rack and conveyor are not worth buying for occasional jobs.',
    ),

    h('h2', null, 'What MUTCD and MASH standards apply to traffic control trucks?'),
    h(
      'p',
      null,
      'TMAs are crashworthy hardware, governed by AASHTO\'s Manual for Assessing Safety Hardware (MASH). The federal eligibility list is maintained by the ',
      h(
        'a',
        {
          href: 'https://highways.dot.gov/safety/other/roadside-departure/roadside-hardware',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        'FHWA Office of Safety roadside hardware program',
      ),
      ', which tracks the federal handoff from NCHRP 350 to MASH. State DOT contracts almost always require the TMA to be on that federal eligibility list at TL-2 (posted speeds at or below 45 mph) or TL-3 (higher-speed work). Confirm the test level before the truck rolls — a TL-2 cushion on a 65 mph highway is a failed inspection.',
    ),
    h(
      'p',
      null,
      'Truck mounted arrow boards fall under MUTCD §6F.61 (specifications) and §6L.06 (mandatory use criteria — required on any single-lane closure on a multi-lane highway with operating speed above 45 mph). Mobile operations are described in MUTCD §6G.01 and require visible advance warning that travels with the work; a shadow vehicle with a high-mounted flashing arrow or PCMS face is the standard implementation. OSHA 1926.201 covers the flagger and signaling rules that apply when the truck is parked at a control point.',
    ),

    h('h2', null, 'How do I choose the right traffic control truck?'),
    h(
      'p',
      null,
      'Three variables drive the choice: operation class (mobile vs short-duration vs longer per MUTCD §6G.02), road speed, and crew exposure. Mobile striping or sweeping at 5–10 mph on a 65 mph highway needs a TMA truck behind the work train, full stop. A short-duration utility patch on a 35 mph collector might need only a shadow vehicle with an arrow board and not a TMA at all, depending on the state spec. A long-duration paving operation that already has trailer-mounted protection in the activity area may still need a TMA truck on the rolling shoulder closure.',
    ),
    h(
      'p',
      null,
      'A useful rule for sizing: every additional 10 mph of operating speed roughly doubles the offset distance between the workers and the upstream TMA. State temporary traffic control plans almost always specify the offset by speed class. Pull the plan, check the offset, then size the truck — not the other way around.',
    ),

    h('h2', null, 'How much does it cost to rent a traffic control truck?'),
    h(
      'p',
      null,
      'Rental rates in 2026 vary by truck type, duration, and whether the operator is included. Typical ranges look like this. TMA trucks run $400–$700/day or $1,800–$3,200/week with operator; bare-rental (no driver) is rare because most fleets keep the truck and the cushion paired. Cone trucks run $500–$900/day or $2,000–$4,000/week with operator, plus a per-cone deployment fee on some contracts. Shadow vehicles without a TMA cushion run $250–$450/day with operator. Truck mounted arrow boards run $200–$350/day or $800–$1,500/week, often as add-ons to a TMA chassis.',
    ),
    h(
      'p',
      null,
      'Beyond the daily rate, the cost drivers worth asking about up front are operator hours (overtime past an eight-hour shift), fuel for the host vehicle, and the damage waiver on the cushion itself — a TMA replacement after an actual hit is a five-figure event, and the rental contract will specify who pays.',
    ),

    h('h2', null, 'How do I rent a traffic control truck?'),
    h(
      'p',
      null,
      'Send the quote with the operation class, road speed, lane configuration, expected duration, delivery address, any state DOT plan number, and whether you need an operator. The rental coordinator can match the right truck type and confirm MASH eligibility for state-funded jobs. Lead times for TMA trucks run 2–5 business days because the fleet is smaller and operators schedule out further than equipment-only rentals. Cone trucks usually run 24–48 hours in major metros.',
    ),

    h(
      'p',
      null,
      h('a', { href: '/quote', className: 'cta-inline' }, 'Request a traffic control truck quote'),
      ' — list the truck type and dates, and we will confirm chassis availability, MASH test level, and operator scheduling within the hour.',
    ),
  ),

  faqs: [
    {
      q: 'Is a TMA truck the same as a shadow vehicle?',
      a: 'A TMA truck is one type of shadow vehicle. A shadow vehicle is any visible chase truck with warning lights and signing that trails the work crew; a TMA truck adds a MASH-eligible impact attenuator on the rear. State DOT highway specifications usually require the shadow vehicle to be a TMA truck — a plain shadow vehicle without a cushion is rarely accepted on roads above 45 mph.',
    },
    {
      q: 'When is a TMA truck required by MUTCD?',
      a: 'MUTCD does not name TMAs as a mandatory device class — the MUTCD covers placement and signing. The TMA requirement comes from state DOT specifications and AASHTO\'s MASH crashworthiness standard. Most state highway contracts require a MASH-eligible TMA upstream of any worker on foot in an active travel lane on roads above 45 mph posted speed.',
    },
    {
      q: 'Do I need a CDL to drive a traffic control truck?',
      a: 'It depends on the chassis GVWR and the gross combined weight when towing. TMA trucks on 26,000 lb GVWR chassis require a Class B CDL. Smaller shadow vehicles on 10,000–15,000 lb chassis do not. If the truck is towing a trailer that pushes combined weight above 26,001 lb, a Class A CDL is required. Most rental TMA packages come with an operator for exactly this reason.',
    },
    {
      q: 'Can I use a pickup truck with a flashing light bar as a shadow vehicle?',
      a: 'For short-duration utility work on low-speed roads, sometimes — but check the state and local specs. On state highway projects, the shadow vehicle is almost always defined as a Class 5 or larger chassis with high-mounted warning lights or an arrow panel, and a pickup will not qualify. The cost of using the wrong vehicle is a failed inspection and a stopped job.',
    },
    {
      q: 'How is a cone truck different from a flatbed with cones on it?',
      a: 'A purpose-built cone truck has a hydraulic conveyor or a side-rack system that lets a single operator deploy and retrieve cones at 5–15 mph without exiting the cab. A flatbed with cones requires a worker on foot at the back of the truck — slower, more exposed, and rarely allowed on high-speed roads. Cone trucks become economical when the taper is longer than about 30 cones per move.',
    },
    {
      q: 'Does MASH TL-3 apply to TMA trucks at all speeds?',
      a: 'No. TL-2 is acceptable for posted speeds at or below 45 mph; TL-3 is required at higher speeds. The federal acceptance letter for the specific cushion model lists the test level, and the state spec lists the required level. Match the two before the truck rolls onto the job.',
    },
    {
      q: 'Can a truck mounted arrow board replace a trailer-mounted arrow board?',
      a: 'Sometimes. MUTCD §6F.61 specifies the panel sizes (Type A, B, C) and lamp counts; whether the panel is on a truck or a trailer is irrelevant to MUTCD compliance. The practical difference is that a truck-mounted arrow can move with the work but cannot be left unattended overnight. Trailer-mounted arrows park and stay; truck-mounted arrows go home with the operator.',
    },
    {
      q: 'How long does a TMA truck rental typically last?',
      a: 'Most TMA truck rentals are billed by the day with a 4-hour or 8-hour minimum operator window. Multi-day deployments roll over at a discounted weekly rate. For long-duration projects (more than 30 days), monthly contracts with a dedicated chassis and operator are common and usually 20–30 percent cheaper per day than spot rentals.',
    },
  ],

  relatedProducts: [
    { label: 'Truck-Mounted Arrow Board (15-Lamp)', path: '/product/truck-mounted-arrow-board-15' },
    { label: 'Trailer-Mounted Arrow Board (15-Lamp)', path: '/product/trailer-mounted-arrow-board-15' },
    { label: 'Type III Barricade', path: '/product/type-iii-barricade' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],

  relatedArticles: [
    'traffic-control-trailer-rental-guide',
    'arrow-board-rental-guide',
    'traffic-control-equipment-rental',
  ],
}
