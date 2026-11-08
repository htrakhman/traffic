/**
 * Job-based landing pages at /uses/:slug. Written around how buyers describe
 * the job, each one links to the specific products that job needs.
 */
export interface UseCase {
  slug: string
  title: string
  h1: string
  description: string
  intro: string[]
  image?: string
  imageAlt?: string
  /** Product slugs from catalog.ts with a note on how each is used for this job. */
  kit: { slug: string; why: string }[]
  planning: { heading: string; body: string }[]
  links: { label: string; href: string }[]
  faqs: { q: string; a: string }[]
}

export const USE_CASES: UseCase[] = [
  {
    slug: 'event-crowd-control',
    image: '/photos/use-event-crowd-control.webp',
    imageAlt: 'Crowd lined up behind steel barricades at a street event',
    title: 'Crowd Control Barricades for Events, Concerts & Festivals',
    h1: 'Crowd control equipment for events and festivals',
    description:
      'Steel barricades, water-filled barriers and fencing for concerts, festivals, parades, races and stadium lines. How to plan a perimeter and what to order.',
    intro: [
      'Events need two different kinds of line. Steel crowd control barricades hold people back at stages, entrances and queues. Heavier water-filled barriers keep vehicles out of pedestrian areas and close streets.',
      'Most event orders mix both, plus fence for back-of-house areas. We quote the whole kit delivered to the venue.',
    ],
    kit: [
      { slug: 'steel-crowd-control-barricade-8-5-ft', why: 'Long perimeters and queue lines at the lowest cost per foot.' },
      { slug: 'steel-crowd-control-barricade-6-5-ft', why: 'Tight corners, stage fronts and entrances where staff move panels by hand.' },
      { slug: 'powder-coated-steel-barricade-8-5-ft', why: 'VIP areas and branded events that need a cleaner look.' },
      { slug: 'water-filled-barrier-42-inch', why: 'Street closures and vehicle-free zones around the event footprint.' },
      { slug: 'plastic-temporary-fence-panel', why: 'Back-of-house areas and pedestrian routing between zones.' },
    ],
    planning: [
      {
        heading: 'Measure the line, then add spares',
        body: 'Walk the perimeter, divide the footage by the panel length and round up. Add a panel per separate run and 5 to 10% extra for gates, corners and last-minute changes.',
      },
      {
        heading: 'Separate people and vehicles',
        body: 'Steel barricades are not built to stop cars. Anywhere vehicles could enter the crowd, use water-filled barriers or other vehicle-rated devices, and follow the plan your police or fire department approves.',
      },
      {
        heading: 'Plan the unload',
        body: 'Barricades arrive palletized on a truck. Have a forklift or a crew on site at the delivery time, and tell us if the venue has a loading window.',
      },
    ],
    links: [
      { label: 'Barricade calculator', href: '/tools/barricade-calculator' },
      { label: 'Steel vs plastic barricades', href: '/compare/steel-vs-plastic-crowd-control-barricades' },
    ],
    faqs: [
      {
        q: 'How many barricades do I need for an event?',
        a: 'Total line length divided by panel length, rounded up, plus spares. 500 ft of queue and stage line takes 59 panels at 8.5 ft before spares.',
      },
      {
        q: 'Should I rent or buy event barricades?',
        a: 'If you run more than a few events a year, buying usually pays for itself quickly compared with repeated rental and delivery fees. We sell; we do not rent.',
      },
    ],
  },
  {
    slug: 'construction-site-perimeter',
    image: '/photos/use-construction-site-perimeter.webp',
    imageAlt: 'Construction area keep out sign on a chain link fence',
    title: 'Construction Site Fencing & Barriers | Perimeter Security Equipment',
    h1: 'Construction site perimeter and security equipment',
    description:
      'Temporary chain link fence panels, water-filled barriers with fence toppers, and barricades to secure a construction site or laydown yard.',
    intro: [
      'A job site perimeter has to keep the public out, keep the site secure overnight, and still open for deliveries. Temporary fence panels do most of the work; barriers handle the parts that face traffic.',
    ],
    kit: [
      { slug: 'temporary-chain-link-fence-panel-6x12', why: 'Full-height security fencing for the site boundary, with no post holes.' },
      { slug: 'water-filled-barrier-with-fence-panel', why: 'Street-facing sides where you need weight against traffic plus full height.' },
      { slug: 'water-filled-barrier-42-inch', why: 'Gates, haul road edges and staging areas.' },
      { slug: 'traffic-cone-28-inch-reflective', why: 'Marking haul routes and delivery zones day and night.' },
    ],
    planning: [
      {
        heading: 'Count panels and stands',
        body: 'For 6 x 12 panels, divide the perimeter by 12 and round up. You need one stand per panel plus one, and one clamp per joint. Add bracing and sandbags on windy or exposed sites.',
      },
      {
        heading: 'Privacy screen catches wind',
        body: 'Screen turns a fence into a sail. If you add it, add more bracing and weight, or use water-filled barriers as the base on exposed sides.',
      },
    ],
    links: [
      { label: 'Temporary fence panels', href: '/temporary-fence-panels' },
      { label: 'Water vs concrete barriers', href: '/compare/water-filled-vs-concrete-jersey-barriers' },
    ],
    faqs: [
      {
        q: 'How many fence panels for a 400 ft perimeter?',
        a: '34 panels at 12 ft (400 divided by 12, rounded up), 35 stands, and about 34 clamps, plus gate panels and bracing.',
      },
    ],
  },
  {
    slug: 'sidewalk-and-street-closures',
    image: '/photos/use-sidewalk-and-street-closures.webp',
    imageAlt: 'Water-filled barriers with fence panels closing off a sidewalk work area',
    title: 'Sidewalk & Street Closure Barriers | Pedestrian Detour Equipment',
    h1: 'Sidewalk and street closure equipment',
    description:
      'Water-filled barriers, fence toppers, barricades and cones for closing a sidewalk or street and routing pedestrians safely around the work.',
    intro: [
      'Closing a sidewalk means building a safe detour, not just blocking the path. Cities usually want a continuous barrier people cannot step over, a clear alternate route, and devices that a cane can detect.',
      'Water-filled barriers are the common choice because they form a solid wall without heavy equipment, and they take a fence topper where full height is required.',
    ],
    kit: [
      { slug: 'water-filled-barrier-42-inch', why: 'A continuous wall along the closure and the pedestrian detour.' },
      { slug: 'water-filled-barrier-with-fence-panel', why: 'Full-height enclosure where the work area must be sealed off.' },
      { slug: 'stackable-water-filled-barrier-32x48', why: 'Short runs around pits and driveways on narrow sidewalks.' },
      { slug: 'traffic-cone-28-inch-reflective', why: 'Marking the transition into a parking-lane walkway.' },
    ],
    planning: [
      {
        heading: 'Check the permit first',
        body: 'Most cities require a permit for sidewalk or street closures, and the permit often names the devices and the detour layout. Send it with your quote request and we will match it.',
      },
      {
        heading: 'Keep the detour accessible',
        body: 'Pedestrian channelizing devices should form a continuous, detectable edge for people using a cane, with no gaps at joints. Interlocking water-filled barriers do this well.',
      },
    ],
    links: [
      { label: 'Water-filled barriers', href: '/water-filled-barriers' },
      { label: 'New York delivery', href: '/delivery/new-york' },
    ],
    faqs: [
      {
        q: 'What barrier do cities accept for sidewalk closures?',
        a: 'It depends on the city and permit, but continuous interlocking barriers, often water-filled with a fence topper, are widely accepted because they are solid, detectable and hard to step over.',
      },
    ],
  },
  {
    slug: 'parking-lot-traffic-control',
    image: '/photos/use-parking-lot-traffic-control.webp',
    imageAlt: 'Yellow lane separators on a parking area crosswalk',
    title: 'Parking Lot Traffic Control Equipment | Cones, Delineators & Barriers',
    h1: 'Parking lot and garage traffic control',
    description:
      'Cones, colored cones, delineator posts and low-profile barriers for parking lots, garages, valet lanes and loading zones.',
    intro: [
      'Parking areas run at low speed, so the goal is clear guidance rather than heavy protection. The right mix is usually cones for anything temporary and delineators for lanes that stay put.',
    ],
    kit: [
      { slug: 'traffic-cone-18-inch', why: 'Reserving spaces and closing aisles in daylight.' },
      { slug: 'traffic-cone-18-inch-reflective', why: 'Garages and lots used after dark.' },
      { slug: 'traffic-cone-18-inch-colors', why: 'Color-coding valet, pickup, accessible and staff areas.' },
      { slug: 'surface-mount-delineator-36-inch', why: 'Permanent lane separation, entry and exit lanes, and loading zones.' },
      { slug: 'low-profile-water-filled-barrier-8-ft', why: 'Defining lanes without blocking sightlines or bumpers.' },
    ],
    planning: [
      {
        heading: 'Temporary vs permanent',
        body: 'If a layout changes daily, use cones or portable delineators. If it stays for months, surface-mount delineators save staff from resetting knocked-over cones.',
      },
    ],
    links: [
      { label: 'Portable vs surface-mount delineators', href: '/compare/portable-vs-surface-mount-delineators' },
      { label: 'Delineator posts', href: '/delineator-posts' },
    ],
    faqs: [
      {
        q: 'What size cones are best for parking lots?',
        a: '18 inch cones are the standard for parking lots. Add a reflective collar for garages and night use. Use 28 inch cones if the lot connects to a public road.',
      },
    ],
  },
  {
    slug: 'road-work-lane-closures',
    image: '/photos/use-road-work-lane-closures.webp',
    imageAlt: 'Orange traffic cones lined up along a road edge',
    title: 'Lane Closure Equipment for Road Work | Cones, Barricades & Delineators',
    h1: 'Lane closure and road work equipment',
    description:
      'MUTCD-sized cones, delineators, barricades and water-filled barriers for lane closures, shoulder work and utility jobs, with taper planning help.',
    intro: [
      'A lane closure has a structure: advance warning signs, a taper that merges traffic, a buffer, and the work area. Each part has its own device spacing and size rules in the MUTCD and your state supplement.',
    ],
    kit: [
      { slug: 'traffic-cone-28-inch-reflective', why: 'The standard channelizing device for most lane closures, day and night.' },
      { slug: 'traffic-cone-36-inch-reflective', why: 'Highways and high-speed roads where drivers need more warning.' },
      { slug: 'grabber-cone-28-inch-16-lb-base', why: 'Mobile operations where cones are placed and picked up from a truck.' },
      { slug: 'delineator-post-42-inch-with-base', why: 'Long tangents and tight tapers where cones take too much room.' },
      { slug: 'water-filled-barrier-32x72', why: 'Separating the work area from traffic on longer jobs.' },
    ],
    planning: [
      {
        heading: 'Size the taper',
        body: 'For speeds of 45 mph and up the taper length is the lane width times the speed. Below 45 mph it is width times speed squared, divided by 60. Space devices about one foot per mph of speed.',
      },
      {
        heading: 'Night work needs reflectivity',
        body: 'At night, cones need 6 inch and 4 inch reflective collars, and many jobs add warning lights or move to drums.',
      },
    ],
    links: [
      { label: 'Cone taper calculator', href: '/tools/cone-taper-calculator' },
      { label: '28 vs 36 inch cones', href: '/compare/28-vs-36-inch-traffic-cones' },
    ],
    faqs: [
      {
        q: 'How many cones do I need to close one lane at 45 mph?',
        a: 'A 12 ft lane at 45 mph needs a 540 ft taper. At about 45 ft spacing that is 13 cones for the taper alone, plus cones along the buffer and work area.',
      },
    ],
  },
  {
    slug: 'schools-and-campuses',
    title: 'Traffic & Crowd Control for Schools and Campuses',
    h1: 'Traffic and crowd control for schools and campuses',
    description:
      'Cones, colored cones, delineators and barricades for school pickup lanes, campus events, game days and graduation.',
    intro: [
      'Schools juggle daily pickup lines, sports events and a few huge days a year like graduation. A small stock of the right equipment covers all of it.',
    ],
    kit: [
      { slug: 'traffic-cone-18-inch-colors', why: 'Color-coded pickup and drop-off lanes.' },
      { slug: 'traffic-cone-28-inch-reflective', why: 'Campus roads and early-morning or evening use.' },
      { slug: 'steel-crowd-control-barricade-6-5-ft', why: 'Game day lines and graduation seating, light enough for staff to move.' },
      { slug: 'delineator-post-42-inch-with-base', why: 'Bus lanes and drop-off loops.' },
    ],
    planning: [
      {
        heading: 'Pick equipment staff can handle',
        body: 'Custodial and athletic staff usually set everything up, so lighter 6.5 ft barricades and stackable cones save time and injuries.',
      },
    ],
    links: [
      { label: 'Crowd control barricades', href: '/crowd-control-barricades' },
      { label: 'Traffic cones', href: '/traffic-cones-for-sale' },
    ],
    faqs: [
      {
        q: 'Can schools buy with a tax-exempt certificate?',
        a: 'Yes. Send your tax-exempt certificate with the quote request and we will quote without sales tax where it applies.',
      },
    ],
  },
]

export function getUseCase(slug: string): UseCase | undefined {
  return USE_CASES.find((u) => u.slug === slug)
}
