/**
 * State delivery pages (/delivery/:slug). Only states where we have active
 * sourcing coverage in the Price Book. Keep every claim here true: no promised
 * delivery times, no warehouse addresses we don't have.
 */
export interface StatePage {
  slug: string
  state: string
  abbr: string
  dot: string
  metros: string[]
  intro: string
  localNotes: string[]
  faqs: { q: string; a: string }[]
}

export const STATES: StatePage[] = [
  {
    slug: 'new-jersey',
    state: 'New Jersey',
    abbr: 'NJ',
    dot: 'NJDOT',
    metros: ['Newark', 'Jersey City', 'New Brunswick', 'Trenton', 'Camden', 'Atlantic City'],
    intro:
      'We are based in New Jersey, and this is the state we know best. Contractors, towns and event crews here get barricades, water-filled barriers, cones and delineators quoted delivered to the site, with suppliers from North Jersey down to the shore.',
    localNotes: [
      'NJDOT work follows the MUTCD with the state supplement, so night work on state roads needs 28 inch or taller cones with reflective collars.',
      'Town street-opening permits often name the devices you must use. Send us the permit and we will quote to it.',
      'Shore towns and stadium events lean on steel crowd control barricades in summer, so order early for Memorial Day through Labor Day.',
    ],
    faqs: [
      {
        q: 'Do you deliver anywhere in New Jersey?',
        a: 'Yes. Every quote is priced delivered to your ZIP code, from Sussex County to Cape May.',
      },
      {
        q: 'Can I pick up instead of taking delivery?',
        a: 'Some of our New Jersey supply points allow will-call pickup. Ask on your quote and we will tell you whether pickup is available for your items.',
      },
    ],
  },
  {
    slug: 'new-york',
    state: 'New York',
    abbr: 'NY',
    dot: 'NYSDOT',
    metros: ['New York City', 'Long Island', 'Yonkers', 'Albany', 'Buffalo', 'Rochester'],
    intro:
      'From Brooklyn sidewalk closures to upstate highway jobs, we quote water-filled barriers, fence toppers, barricades and cones delivered across New York.',
    localNotes: [
      'New York City sidewalk and roadway work usually needs a full-height perimeter. A 42 inch water-filled barrier with a fence topper is the common setup.',
      'Deliveries into the five boroughs often need a delivery appointment and a crew on site to unload, since many trucks are not allowed to block the street for long.',
      'NYSDOT jobs follow the MUTCD with the New York supplement. Check your contract for required cone height and sheeting.',
    ],
    faqs: [
      {
        q: 'Can you deliver to a Manhattan or Brooklyn job site?',
        a: 'Yes. Tell us the cross streets, any delivery window and whether you have a forklift or crew on site so we can price the right truck.',
      },
    ],
  },
  {
    slug: 'pennsylvania',
    state: 'Pennsylvania',
    abbr: 'PA',
    dot: 'PennDOT',
    metros: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Harrisburg', 'Lancaster', 'Scranton'],
    intro:
      'Pennsylvania has one of the deepest supply networks for traffic control equipment in the country, so we can usually find stock close to your job and keep freight low.',
    localNotes: [
      'PennDOT Publication 213 sets temporary traffic control rules for state work. Bring your plan sheet and we will match the devices.',
      'Southeastern Pennsylvania jobs can often be supplied the same week because of nearby stocking points.',
    ],
    faqs: [
      {
        q: 'Do you ship to Western Pennsylvania?',
        a: 'Yes. We quote delivered pricing statewide and pick the closest supply point to your site.',
      },
    ],
  },
  {
    slug: 'florida',
    state: 'Florida',
    abbr: 'FL',
    dot: 'FDOT',
    metros: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Fort Lauderdale', 'Fort Myers'],
    intro:
      'Florida contractors and event producers can get cones, delineators, crowd control barricades and water-filled barriers quoted delivered, with supply points around the state.',
    localNotes: [
      'FDOT keeps an Approved Product List. On state jobs, ask for FDOT-approved cones and devices and we will quote only listed products.',
      'Coastal wind is the main reason cones tip. Heavier 10 to 15 lb bases are worth it near the water.',
      'Hurricane season drives sudden demand for barricades and barriers. Stock up before June if you can.',
    ],
    faqs: [
      {
        q: 'Do you carry FDOT-approved cones?',
        a: 'Yes, FDOT-approved cone models are available. Mention FDOT on your quote request.',
      },
    ],
  },
  {
    slug: 'texas',
    state: 'Texas',
    abbr: 'TX',
    dot: 'TxDOT',
    metros: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth', 'El Paso'],
    intro:
      'Texas events and job sites are big, and so are the orders. We quote steel crowd control barricades, water-filled barriers and cones by the truckload, delivered to Dallas, Houston, Austin and everywhere between.',
    localNotes: [
      'Large event perimeters in Texas often run thousands of feet of steel barricade. Ask for truckload pricing, which can drop the per-unit price a lot.',
      'Many Texas deliveries are curbside by a third-party carrier. Plan for people or a forklift on site to unload.',
      'TxDOT follows the Texas MUTCD. Check your plan for device requirements on state routes.',
    ],
    faqs: [
      {
        q: 'Can you quote barricades for a large event in Dallas or Austin?',
        a: 'Yes. Send the total footage, dates and delivery address. We compare several Texas supply points and send back the best delivered total.',
      },
    ],
  },
  {
    slug: 'california',
    state: 'California',
    abbr: 'CA',
    dot: 'Caltrans',
    metros: ['Los Angeles', 'San Diego', 'San Francisco', 'San Jose', 'Sacramento', 'Riverside'],
    intro:
      'For California job sites and events, we quote fence panels, crowd control barricades, delineators and cones delivered, sourced from West Coast supply points to avoid cross-country freight.',
    localNotes: [
      'Caltrans work follows the California MUTCD, which has its own device rules. Bring the spec and we will match it.',
      'Temporary chain link fence panels are heavily used on California construction sites, and volume pricing applies at truckload quantities.',
    ],
    faqs: [
      {
        q: 'Do you ship from the West Coast?',
        a: 'Yes. We source California orders from West Coast suppliers wherever possible to keep freight down.',
      },
    ],
  },
  {
    slug: 'north-carolina',
    state: 'North Carolina',
    abbr: 'NC',
    dot: 'NCDOT',
    metros: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Wilmington'],
    intro:
      'Charlotte and the Triangle host a steady run of concerts, games and road projects. We quote barricades, barriers and cones delivered across North Carolina.',
    localNotes: [
      'NCDOT follows the MUTCD with the North Carolina supplement.',
      'For small barricade orders in Charlotte, delivered pricing can beat driving to a distant yard. Ask us to compare both.',
    ],
    faqs: [
      {
        q: 'Is there a minimum order for delivery in North Carolina?',
        a: 'No set minimum. Small orders ship by parcel or LTL freight, and we quote the delivered total either way.',
      },
    ],
  },
  {
    slug: 'georgia',
    state: 'Georgia',
    abbr: 'GA',
    dot: 'GDOT',
    metros: ['Atlanta', 'Savannah', 'Augusta', 'Columbus', 'Macon', 'Athens'],
    intro:
      'From Atlanta stadium events to GDOT road jobs, we quote crowd control barricades, cones and delineators delivered anywhere in Georgia, with pickup options in metro Atlanta for some items.',
    localNotes: [
      'GDOT work follows the MUTCD. Night lane closures need reflective cones or drums.',
      'Resale orders may need a Georgia resale certificate on file with the supplier. Send it with your quote request to avoid delays.',
    ],
    faqs: [
      {
        q: 'Can I pick up in Atlanta?',
        a: 'For some items, yes. Ask on your quote and we will confirm whether a metro Atlanta pickup is available.',
      },
    ],
  },
]

export function getState(slug: string): StatePage | undefined {
  return STATES.find((s) => s.slug === slug)
}

/**
 * City pages (/delivery/:state/:city). Keep local details general enough to be
 * true: no promised delivery times, no named permit offices we can't confirm.
 */
export interface CityPage {
  slug: string
  city: string
  stateSlug: string
  intro: string
  notes: string[]
  nearby: string[]
  faqs: { q: string; a: string }[]
}

export const CITIES: CityPage[] = [
  {
    slug: 'newark',
    city: 'Newark',
    stateSlug: 'new-jersey',
    intro:
      'Newark job sites, venues and city crews get steel barricades, water-filled barriers, cones and fence panels quoted delivered from our New Jersey supply network.',
    notes: [
      'Street and sidewalk work in Newark needs a city right-of-way permit, and the permit often specifies devices. Send it with your request and we quote to it.',
      'Arena and downtown events lean on steel crowd control barricades for queues and water-filled barriers for street closures.',
      'Downtown deliveries often need a scheduled window and people on site to unload, since trucks can not block the street for long.',
    ],
    nearby: ['Jersey City', 'Elizabeth', 'East Orange', 'Harrison', 'Kearny', 'Irvington'],
    faqs: [
      {
        q: 'Can you deliver barricades to Newark?',
        a: 'Yes. We quote a delivered price to any Newark address. Tell us the delivery window and whether you have a forklift or crew to unload.',
      },
    ],
  },
  {
    slug: 'jersey-city',
    city: 'Jersey City',
    stateSlug: 'new-jersey',
    intro:
      'From waterfront construction to street fairs, we quote barriers, fencing, barricades and cones delivered anywhere in Jersey City and Hudson County.',
    notes: [
      'Dense blocks and active sidewalks mean many jobs need a continuous pedestrian detour. Interlocking water-filled barriers with fence toppers are a common setup.',
      'Waterfront sites see strong wind, so plan heavier cone bases and extra bracing on fence panels.',
      'Street work requires a city permit. Bring the permit conditions and we will match the devices.',
    ],
    nearby: ['Hoboken', 'Bayonne', 'Newark', 'Union City', 'Weehawken', 'Secaucus'],
    faqs: [
      {
        q: 'Do you deliver to Hoboken and the rest of Hudson County?',
        a: 'Yes. We quote delivered pricing to every Hudson County town.',
      },
    ],
  },
  {
    slug: 'new-brunswick',
    city: 'New Brunswick',
    stateSlug: 'new-jersey',
    intro:
      'In Central New Jersey, close to home for us, we quote crowd control barricades, cones, delineators and barriers delivered to New Brunswick and the rest of Middlesex County.',
    notes: [
      'University events, game days and downtown festivals drive demand for steel barricades and colored cones for parking.',
      'Middlesex County road and utility jobs follow NJDOT and the MUTCD, so night work needs 28 inch or taller reflective cones.',
    ],
    nearby: ['East Brunswick', 'Edison', 'Piscataway', 'Highland Park', 'North Brunswick', 'Sayreville'],
    faqs: [
      {
        q: 'Do you serve all of Middlesex County?',
        a: 'Yes. We quote delivered pricing to every Middlesex County town.',
      },
    ],
  },
  {
    slug: 'new-york-city',
    city: 'New York City',
    stateSlug: 'new-york',
    intro:
      'Manhattan sidewalk closures, Brooklyn job sites, Queens events: we quote water-filled barriers, fence toppers, steel barricades and cones delivered to all five boroughs.',
    notes: [
      'Sidewalk and street work in New York City requires NYC DOT permits, and the permit stipulations often specify the barrier. A 42 inch water-filled barrier with a fence topper is a common setup.',
      'Most deliveries need a scheduled appointment, a crew to unload and attention to truck route and parking rules on your block.',
      'Parades, marathons and street fairs use steel crowd control barricades by the hundreds. Ask for truckload pricing on large orders.',
    ],
    nearby: ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island', 'Long Island'],
    faqs: [
      {
        q: 'Can you deliver to a job site in Manhattan?',
        a: 'Yes. Send the address with cross streets, your delivery window and whether you have a crew on site, and we will price the right truck.',
      },
    ],
  },
  {
    slug: 'philadelphia',
    city: 'Philadelphia',
    stateSlug: 'pennsylvania',
    intro:
      'Philadelphia contractors, venues and event producers get barricades, barriers, cones and fence quoted delivered, often from nearby Pennsylvania supply points that keep freight low.',
    notes: [
      'Street and sidewalk closures in Philadelphia need a permit from the city Streets Department, and the permit often names the devices.',
      'Stadium-district events and parades use steel crowd control barricades in volume.',
      'Southeastern Pennsylvania has several stocking points for traffic control equipment, so many orders can ship quickly.',
    ],
    nearby: ['Camden', 'Cherry Hill', 'King of Prussia', 'Chester', 'Upper Darby', 'Trenton'],
    faqs: [
      {
        q: 'Do you deliver to South Jersey too?',
        a: 'Yes. Camden, Cherry Hill and the rest of South Jersey are quoted delivered just like Philadelphia.',
      },
    ],
  },
]

export function getCity(stateSlug: string, citySlug: string): CityPage | undefined {
  return CITIES.find((c) => c.stateSlug === stateSlug && c.slug === citySlug)
}
