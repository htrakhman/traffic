/**
 * Product catalog for /products/:slug and the category pages.
 *
 * No prices on the site: every order is quoted from a verified supplier total.
 * Every title and description is written in-house — never paste supplier or
 * competitor copy into this file.
 */

export type CategoryId =
  | 'crowd-control-barricades'
  | 'water-filled-barriers'
  | 'traffic-cones'
  | 'delineator-posts'
  | 'temporary-fence-panels'

export interface Category {
  id: CategoryId
  /** Root-relative URL of the category page. */
  path: string
  name: string
  /** Short label for nav and cards. */
  shortName: string
  title: string
  description: string
  intro: string[]
  faqs: { q: string; a: string }[]
}

export interface Product {
  slug: string
  category: CategoryId
  name: string
  /** One sentence, used for cards and the meta description. */
  summary: string
  body: string[]
  specs: [string, string][]
  bestFor: string[]
  faqs: { q: string; a: string }[]
  image?: string
  /** Describes what the photo shows (it may not be the exact model). */
  imageAlt?: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'crowd-control-barricades',
    path: '/crowd-control-barricades',
    name: 'Metal Crowd Control Barricades',
    shortName: 'Crowd control barricades',
    title: 'Metal Crowd Control Barricades for Sale | Steel Bike Rack Barriers',
    description:
      'Galvanized steel crowd control barricades in 6.5, 7.5, 8 and 8.5 ft lengths, flat or bridge feet. Wholesale and retail, quoted delivered to your site.',
    intro: [
      'A steel crowd control barricade (often called a bike rack barrier or police barricade) is a welded tube frame that hooks to the next panel, so a single line can run as long as you need. They are built to steer people, not stop vehicles.',
      'Length is the main decision. Shorter 6.5 ft panels are easier for one person to carry and set; 8 to 8.5 ft panels cover more ground per unit, so a long perimeter takes fewer pieces. Flat feet sit low and are hard to trip over; bridge feet raise the frame on a crossbar and handle uneven ground better.',
    ],
    faqs: [
      {
        q: 'How many crowd control barricades do I need?',
        a: 'Divide the perimeter in feet by the panel length, round up, and add one or two spares per run for gates and corners. 300 ft of line is 38 panels at 8 ft, or 47 at 6.5 ft. Our barricade calculator does the math for you.',
      },
      {
        q: 'Galvanized or powder coated?',
        a: 'Hot-dip galvanized steel is the default for outdoor use because the zinc coating holds up to rain and road salt. Powder coating adds color for branded events but chips with heavy handling, so most rental fleets stay galvanized.',
      },
      {
        q: 'Can crowd control barricades be used on a road closure?',
        a: 'Not as a traffic device. They are not crash tested for vehicles. For roadwork, use Type II or Type III barricades, drums or water-filled barriers, and keep steel barricades for pedestrians.',
      },
    ],
  },
  {
    id: 'water-filled-barriers',
    path: '/water-filled-barriers',
    name: 'Water Filled Barriers',
    shortName: 'Water filled barriers',
    title: 'Water Filled Barriers for Sale | Plastic Jersey & Pedestrian Barriers',
    description:
      'Plastic water-filled barriers from low-profile 8 ft airport modules to 42 inch interlocking jersey-style units, with fence panel options. Quoted delivered to your site.',
    intro: [
      'A water-filled barrier ships empty and light, then gets its weight on site from a hose. Once filled, it holds position against people and slow-moving equipment, and it drains for the trip home. That is the main advantage over concrete: no crane to set it and no flatbed full of 4,000 lb sections.',
      'Pick by height and job. Low 20 inch modules mark airport ramps and parking lanes. 32 inch units channel traffic and pedestrians at work sites. 42 inch interlocking units with an optional fence panel on top are what most crews use to close a sidewalk or wall off a work zone.',
    ],
    faqs: [
      {
        q: 'Are water-filled barriers crash rated?',
        a: 'Most plastic barriers are channelizing and delineation devices, not crash barriers. A small number of systems carry MASH or NCHRP-350 ratings only when installed with their specific connection hardware. Tell us the spec on your plans and we will match it.',
      },
      {
        q: 'How much does a filled barrier weigh?',
        a: 'Roughly 8.3 lb per gallon of water. A 6 ft, 42 inch unit typically holds 150 to 200 gallons, so about 1,200 to 1,700 lb filled versus 100 to 150 lb empty.',
      },
      {
        q: 'Do they freeze in winter?',
        a: 'Plain water will. Crews in cold climates add calcium chloride or a non-toxic antifreeze brine. Ice expansion can split the shell, so drain or treat before a hard freeze.',
      },
    ],
  },
  {
    id: 'traffic-cones',
    path: '/traffic-cones-for-sale',
    name: 'Traffic Cones',
    shortName: 'Traffic cones',
    title: 'Traffic Cones for Sale',
    description: 'Traffic cones from 12 to 36 inches.',
    intro: [],
    faqs: [],
  },
  {
    id: 'delineator-posts',
    path: '/delineator-posts',
    name: 'Delineator Posts',
    shortName: 'Delineator posts',
    title: 'Delineator Posts for Sale | Portable & Surface Mount Channelizers',
    description:
      'Portable 42 inch delineator posts with rubber bases and flexible surface-mount posts in 36 and 48 inch heights. Wholesale and bulk quotes.',
    intro: [
      'A delineator post is a narrow upright marker that guides drivers along an edge or lane line. It takes up far less room than a cone or drum, which is why you see them separating bike lanes, toll plazas, parking garage ramps and long work zone tapers.',
      'There are two families. Portable posts sit in a weighted rubber base and move with the job. Surface-mount posts bolt or glue to the pavement and bend over when hit, then spring back, so they suit permanent lane separation.',
    ],
    faqs: [
      {
        q: 'Portable base or surface mount?',
        a: 'Use a portable base when the layout changes day to day, such as work zones and events. Use surface mount for anything that stays put for months: bike lanes, loading zones, parking separators.',
      },
      {
        q: 'What base weight do I need for a 42 inch post?',
        a: '8 lb bases are fine for parking lots and low-speed areas. Go to 12 lb or more for open roads, wind or truck traffic.',
      },
      {
        q: 'Is reflective sheeting included?',
        a: 'Portable posts normally come with two reflective bands. Surface-mount posts are often sold with sheeting as a separate line; ours are quoted with standard high-intensity sheeting included.',
      },
    ],
  },
  {
    id: 'temporary-fence-panels',
    path: '/temporary-fence-panels',
    name: 'Temporary Fence Panels',
    shortName: 'Temporary fence panels',
    title: 'Temporary Fence Panels for Sale | 6 x 12 Chain Link & Barrier Toppers',
    description:
      'Galvanized 6 ft x 12 ft temporary chain link fence panels, plastic panel fencing and fence toppers for water-filled barriers. Volume pricing and delivered quotes.',
    intro: [
      'Panel fencing gives a job site or event a full-height perimeter without digging post holes. Each panel stands in a stand or base, clamps to the next, and comes down in an afternoon.',
      'Galvanized 6 x 12 chain link panels are the contractor standard for security. Plastic panels are lighter and more visible, so they suit short events and pedestrian routing. Fence toppers mount on water-filled barriers to turn a low wall into a 7 to 8 ft enclosure.',
    ],
    faqs: [
      {
        q: 'How many fence panels for my site?',
        a: 'Divide the perimeter by 12 for 6 x 12 panels and round up. Add one stand per panel plus one, and one clamp per joint. Plan sandbags or weights on windy or exposed sites, especially with privacy screen attached.',
      },
      {
        q: 'Do panels come with stands and clamps?',
        a: 'Usually not. Stands, clamps and bracing are separate items. Tell us your run length and we will quote the full kit.',
      },
    ],
  },
]

export const PRODUCTS: Product[] = [
  // ── Crowd control barricades ─────────────────────────────────────────────
  {
    slug: 'steel-crowd-control-barricade-6-5-ft',
    category: 'crowd-control-barricades',
    name: '6.5 ft Steel Crowd Control Barricade',
    summary:
      'The compact steel barricade: hot-dip galvanized, light enough for one person to place, and short enough to turn tight corners.',
    body: [
      'The 6.5 ft length is the easiest steel barricade to work with. One person can lift and hang it, it fits in a pickup bed, and the short span follows curved lines around stages, entrances and queues without leaving gaps.',
      'You need more units per foot than a longer panel, so it makes most sense for venues, schools and smaller events where handling matters more than covering distance.',
    ],
    specs: [
      ['Length', '6.5 ft (about 78 in)'],
      ['Height', 'about 43 in'],
      ['Frame', 'Steel tube, hot-dip galvanized'],
      ['Feet', 'Flat feet'],
      ['Connection', 'Hook and loop, interlocks end to end'],
    ],
    bestFor: ['Venue entrances and queue lines', 'Stage fronts and VIP areas', 'Small crews without a lift'],
    faqs: [
      {
        q: 'How many 6.5 ft barricades cover 100 ft?',
        a: '16 panels, since each panel covers about 6.5 ft once hooked together. Add a spare for a gate opening.',
      },
    ],
    image: '/catalog/metal-crowd-control-barricade.webp',
  },
  {
    slug: 'steel-crowd-control-barricade-7-5-ft',
    category: 'crowd-control-barricades',
    name: '7.5 ft Galvanized Steel Barricade',
    summary:
      'A middle-length galvanized barricade that balances coverage and handling, popular with municipalities and rental fleets.',
    body: [
      'At 7.5 ft, each panel covers about 15% more ground than the short size while staying manageable for one worker. That balance is why many city public works departments standardize on it.',
      'Pick flat feet for paved plazas and streets, or ask about V-feet and bridge feet if you are setting on grass or uneven ground.',
    ],
    specs: [
      ['Length', '7.5 ft'],
      ['Height', 'about 43 in'],
      ['Frame', 'Galvanized steel tube with vertical pickets'],
      ['Feet', 'Flat feet standard; V-feet on request'],
      ['Connection', 'Interlocking hooks'],
    ],
    bestFor: ['Parades and street fairs', 'Municipal fleets', 'Mixed pavement and grass sites'],
    faqs: [
      {
        q: 'Will 7.5 ft barricades hook to my existing 8 ft panels?',
        a: 'Usually yes if the hook spacing matches, but it varies by maker. Send us a photo of your current hooks and we will confirm before you order.',
      },
    ],
    image: '/catalog/metal-crowd-control-barricade.webp',
  },
  {
    slug: 'steel-crowd-control-barricade-7-ft-bridge-feet',
    category: 'crowd-control-barricades',
    name: '7 ft Steel Barricade with Bridge Feet',
    summary:
      'Galvanized 7 ft barricade on bridge-style feet that straddle cables, curbs and uneven ground while keeping a stable stance.',
    body: [
      'Bridge feet are a crossbar foot that lifts the frame slightly and spreads the load. They sit steadier than flat feet on broken asphalt, grass and gravel, and they can straddle a cable run.',
      'The trade-off is a slightly wider footprint that people can catch a toe on, so they are best on the outside of a perimeter rather than inside a dense crowd.',
    ],
    specs: [
      ['Length', '7 ft (about 87 in)'],
      ['Height', 'about 42 in'],
      ['Frame', 'Galvanized steel'],
      ['Feet', 'Removable bridge feet'],
      ['Connection', 'Interlocking hooks'],
    ],
    bestFor: ['Outdoor festivals on grass', 'Sites with cable runs', 'Uneven or sloped ground'],
    faqs: [
      {
        q: 'Are the feet removable?',
        a: 'Yes. Bridge feet slide off for flat stacking, which lets you fit more panels per pallet or trailer.',
      },
    ],
    image: '/catalog/metal-crowd-control-barricade.webp',
  },
  {
    slug: 'steel-crowd-control-barricade-8-ft',
    category: 'crowd-control-barricades',
    name: '8 ft Heavy-Duty Steel Barricade',
    summary:
      'An 8 ft galvanized steel barricade for long perimeters, with a heavier frame that stays put when a crowd leans on it.',
    body: [
      'The 8 ft panel is the common choice for big events and long police lines. Fewer panels per run means fewer connections to check and less handling at setup and teardown.',
      'Heavy-duty frames use thicker tube and closer picket spacing, which matters when a crowd pushes against the line. Ask for the gauge if your venue or police department sets a minimum.',
    ],
    specs: [
      ['Length', '8 ft (about 100 in)'],
      ['Height', 'about 43 in'],
      ['Frame', 'Heavy-duty steel tube, galvanized'],
      ['Feet', 'Flat feet'],
      ['Connection', 'Interlocking hooks'],
    ],
    bestFor: ['Concerts and stadium lines', 'Police and security perimeters', 'Long runs over 300 ft'],
    faqs: [
      {
        q: 'How much does an 8 ft steel barricade weigh?',
        a: 'Typically 45 to 60 lb depending on tube gauge. That is heavy enough to resist a lean but still a one or two person carry.',
      },
    ],
    image: '/catalog/metal-crowd-control-barricade.webp',
  },
  {
    slug: 'steel-crowd-control-barricade-8-5-ft',
    category: 'crowd-control-barricades',
    name: '8.5 ft Galvanized Crowd Barricade',
    summary:
      'The longest standard steel barricade and usually the lowest cost per foot of line, pre-galvanized for outdoor use.',
    body: [
      'If the goal is covering the most distance for the least money, the 8.5 ft panel usually wins on cost per foot. It is the go-to for marathon routes, festival grounds and parking lot queues.',
      'Economy versions use pre-galvanized tube; heavy-duty versions are hot-dip galvanized after welding for longer life. We will quote whichever your budget and use call for.',
    ],
    specs: [
      ['Length', '8.5 ft (about 102 in)'],
      ['Height', 'about 40 to 43 in'],
      ['Frame', 'Pre-galvanized or hot-dip galvanized steel'],
      ['Feet', 'Flat or bridge feet'],
      ['Connection', 'Interlocking hooks'],
    ],
    bestFor: ['Race routes and festivals', 'Lowest cost per foot', 'Rental fleets buying in volume'],
    faqs: [
      {
        q: 'Pre-galvanized vs hot-dip galvanized?',
        a: 'Pre-galvanized tube is coated before welding, so the welds get a paint touch-up. Hot-dip coats the whole finished panel, including welds, and lasts longer outdoors. Hot-dip costs more.',
      },
    ],
    image: '/catalog/metal-crowd-control-barricade.webp',
  },
  {
    slug: 'powder-coated-steel-barricade-8-5-ft',
    category: 'crowd-control-barricades',
    name: '8.5 ft Powder-Coated Steel Barricade (Colors)',
    summary:
      'A steel barricade finished in a color, such as white, black, blue or red, for branded events and venues that want a cleaner look.',
    body: [
      'Powder coating turns a utilitarian barricade into something that fits a branded event, a premium venue or a city with a color standard. White and black are the most requested.',
      'Expect to touch up chips over time on panels that get moved a lot. Pair with fabric jackets or banners if you want sponsor printing.',
    ],
    specs: [
      ['Length', '8.5 ft'],
      ['Finish', 'Powder coat over steel'],
      ['Colors', 'White, black, and others on request'],
      ['Feet', 'Flat or bridge feet'],
      ['Connection', 'Interlocking hooks'],
    ],
    bestFor: ['Branded and VIP events', 'Hotels and venues', 'Cities with a color standard'],
    faqs: [
      {
        q: 'Can I get custom colors?',
        a: 'Standard colors ship fastest. Custom colors are possible on larger orders with longer lead time; tell us the quantity and color.',
      },
    ],
    image: '/catalog/metal-crowd-control-barricade.webp',
  },
  {
    slug: 'expandable-steel-safety-barricade-8-ft',
    category: 'crowd-control-barricades',
    name: 'Expandable Steel Safety Gate, 8 ft',
    summary:
      'A scissor-style steel barrier on casters that folds to about 18 inches wide and stretches to 8 ft to close a doorway, aisle or dock.',
    body: [
      'An expandable barricade folds like an accordion. Roll it into place, pull it open, and it closes an opening up to about 8 ft wide; push it shut and it parks against a wall.',
      'It is a facility tool more than an event barricade. Warehouses, parking garages and maintenance crews use it to close a lane or bay for a few hours.',
    ],
    specs: [
      ['Extended length', 'up to 8 ft'],
      ['Folded width', 'about 18 in'],
      ['Height', 'about 43 in'],
      ['Frame', 'Steel, painted or coated'],
      ['Mobility', 'Casters on the legs'],
    ],
    bestFor: ['Warehouse aisles and docks', 'Garage lane closures', 'Maintenance and cleaning crews'],
    faqs: [
      {
        q: 'Does it lock in place?',
        a: 'Most units have locking casters. For longer closures, add a sign or warning light to the top rail.',
      },
    ],
    image: '/photos/expandable-steel-safety-barricade-8-ft.webp',
    imageAlt: 'Expandable red and white scissor barrier closing off a work area',
  },

  // ── Water filled barriers ────────────────────────────────────────────────
  {
    slug: 'low-profile-water-filled-barrier-8-ft',
    category: 'water-filled-barriers',
    name: 'Low-Profile Water-Fillable Barrier, 8 ft',
    summary:
      'A low 8 ft module, about 20 inches tall, that marks airport ramps, aprons and parking lanes without blocking sightlines.',
    body: [
      'Low-profile barriers are built to stay under wings, mirrors and sightlines. Airports use them to outline construction on aprons and taxiway edges; parking operators use them to form lanes.',
      'Each module pins to the next and can be ballasted with water for wind, or left light for quick moves. High-intensity reflective sheeting is standard for night visibility.',
    ],
    specs: [
      ['Length', '96 in (8 ft)'],
      ['Height', 'about 20 in'],
      ['Width', 'about 10 in'],
      ['Material', 'Polyethylene, water-fillable'],
      ['Sheeting', 'High-intensity reflective'],
      ['Colors', 'Orange or white'],
    ],
    bestFor: ['Airport ramps and aprons', 'Parking lane separation', 'Low sightline areas'],
    faqs: [
      {
        q: 'Is this FAA compliant?',
        a: 'Low-profile airport barricades are designed for FAA advisory circular guidance on construction marking. Confirm the requirement on your project spec and we will match the model.',
      },
    ],
    image: '/catalog/water-filled-barrier.webp',
  },
  {
    slug: 'stackable-water-filled-barrier-32x48',
    category: 'water-filled-barriers',
    name: 'Stackable Water Barrier, 32 x 48 in',
    summary:
      'A short 4 ft water-fillable barrier that nests for storage, sized for sidewalks, driveways and tight urban work zones.',
    body: [
      'At 4 ft long, this barrier fits where 6 ft units do not: narrow sidewalks, driveway cuts and around utility pits. Empty units stack, so a crew can carry more per truck.',
      'It is a channelizing device. Use it to guide pedestrians and slow traffic around a hazard, not as a crash barrier.',
    ],
    specs: [
      ['Length', '48 in'],
      ['Height', '32 in'],
      ['Material', 'Polyethylene, water-fillable'],
      ['Storage', 'Nests or stacks when empty'],
      ['Colors', 'Orange; white on request'],
    ],
    bestFor: ['Sidewalk closures', 'Utility pits and driveways', 'Crews with limited truck space'],
    faqs: [
      {
        q: 'How much water does it hold?',
        a: 'Expect roughly 40 to 60 gallons depending on the model, or about 330 to 500 lb filled.',
      },
    ],
    image: '/photos/stackable-water-filled-barrier-32x48.webp',
    imageAlt: 'Short yellow plastic barriers lined up on asphalt',
  },
  {
    slug: 'water-filled-barrier-32x72',
    category: 'water-filled-barriers',
    name: 'Water Wall Barrier, 32 x 72 in',
    summary:
      'A 6 ft long, 32 inch tall water-filled wall for channeling vehicles and people through a work zone or event entrance.',
    body: [
      'The 32 by 72 size is the everyday workhorse: long enough to build a line quickly, short enough to see over, and light enough empty to set by hand.',
      'Units interlock end to end with pins. Add sheeting or warning lights for night work.',
    ],
    specs: [
      ['Length', '72 in (6 ft)'],
      ['Height', '32 in'],
      ['Material', 'Polyethylene, water-fillable'],
      ['Connection', 'Interlocking with pins'],
      ['Colors', 'Orange or white'],
    ],
    bestFor: ['Work zone channelizing', 'Event vehicle lanes', 'Parking lot traffic control'],
    faqs: [
      {
        q: 'Can I mix orange and white units?',
        a: 'Yes. Alternating orange and white is common because it reads clearly to drivers, especially at night.',
      },
    ],
    image: '/photos/water-filled-barrier-32x72.webp',
    imageAlt: 'Red and white plastic barriers lining a city street',
  },
  {
    slug: 'water-filled-barrier-42-inch',
    category: 'water-filled-barriers',
    name: '42 in Interlocking Water-Filled Barrier, 6 ft',
    summary:
      'A tall 42 inch interlocking barrier that forms a continuous wall around work zones, sidewalks and security perimeters.',
    body: [
      'At 42 inches, the barrier is tall enough to keep pedestrians out of a work area and to read as a solid wall to drivers. It is the size most often specified for sidewalk closures in dense cities.',
      'Units link with interlocking knuckles and pins, and many models accept a fence panel on top when you need a full-height enclosure.',
    ],
    specs: [
      ['Length', '72 in (6 ft)'],
      ['Height', '42 in'],
      ['Material', 'Polyethylene, water-fillable'],
      ['Fill capacity', 'about 150 to 200 gal'],
      ['Options', 'Fence panel topper, warning lights'],
    ],
    bestFor: ['Sidewalk and lane closures', 'Security and event perimeters', 'Sites needing a fence-ready base'],
    faqs: [
      {
        q: 'Will a fence panel fit on this barrier?',
        a: 'Most 42 inch interlocking barriers accept a matching fence topper. Fence panels are model-specific, so order them together.',
      },
    ],
    image: '/catalog/water-filled-barrier.webp',
  },
  {
    slug: 'plastic-jersey-barrier-42x72',
    category: 'water-filled-barriers',
    name: 'Plastic Jersey Barrier, 42 x 72 in',
    summary:
      'Jersey-profile plastic barrier with the sloped concrete-barrier shape, water-filled on site for a wall that looks like the real thing.',
    body: [
      'The jersey shape has a wide base and sloped face like the concrete barriers on highways. In plastic, it gives you the familiar look without heavy equipment to place it.',
      'Use it where the visual of a jersey barrier matters, such as campus roads, staging yards and municipal projects, and confirm the rating if your plans call for a crash-tested system.',
    ],
    specs: [
      ['Length', '72 in (6 ft)'],
      ['Height', '42 in'],
      ['Profile', 'Jersey (sloped face, wide base)'],
      ['Material', 'Polyethylene, water-fillable'],
      ['Colors', 'Orange or white'],
    ],
    bestFor: ['Staging yards', 'Campus and municipal roads', 'Temporary lane separation'],
    faqs: [
      {
        q: 'Plastic or concrete jersey barrier?',
        a: 'Concrete stops vehicles and needs a crane; plastic guides traffic and sets by hand. See our full comparison guide for which one your job needs.',
      },
    ],
    image: '/photos/plastic-jersey-barrier-42x72.webp',
    imageAlt: 'Long line of white plastic jersey-style barriers beside a road',
  },
  {
    slug: 'water-filled-barrier-with-fence-panel',
    category: 'water-filled-barriers',
    name: 'Water-Filled Barrier with Fence Topper',
    summary:
      'A 42 inch water-filled barrier paired with a matching fence panel, making a ready-to-set 7 to 8 ft enclosure section.',
    body: [
      'This pairing turns a low wall into a full-height barrier that people cannot step over. It is the standard setup for sidewalk sheds, building demolition perimeters and outdoor event security in cities.',
      'Order the barrier and topper together so the mounting hardware matches. Privacy screen can be added for jobs that need to hide the work area.',
    ],
    specs: [
      ['Barrier', '42 in tall, 6 ft long, water-fillable'],
      ['Fence', 'Steel mesh panel mounted on top'],
      ['Overall height', 'about 7 to 8 ft'],
      ['Options', 'Privacy screen, warning lights'],
      ['Colors', 'Orange or white barrier'],
    ],
    bestFor: ['Demolition and building perimeters', 'Urban event security', 'Sidewalk closures that need full height'],
    faqs: [
      {
        q: 'How do I fill the barrier with the fence on?',
        a: 'Set the barriers in place, fill them, then mount the fence panels. The fill port stays reachable on most models.',
      },
    ],
    image: '/photos/water-filled-barrier-with-fence-panel.webp',
    imageAlt: 'Orange and white water-filled barriers with fence panels on top enclosing a work area',
  },

  // ── Traffic cones ────────────────────────────────────────────────────────
  {
    slug: 'traffic-cone-12-inch',
    category: 'traffic-cones',
    name: '12 in Orange Safety Cone',
    summary:
      'A small, lightweight orange cone for indoor floors, sports drills, parking spots and quick hazard marking.',
    body: [
      'Twelve-inch cones are the right size where a big cone would be in the way: warehouse floors, spill marking, parking spot reservations, and training drills.',
      'They are not meant for roadways. For any lane or shoulder work, step up to 28 inches or taller.',
    ],
    specs: [
      ['Height', '12 in'],
      ['Material', 'PVC'],
      ['Color', 'Fluorescent orange'],
      ['Reflective', 'No'],
    ],
    bestFor: ['Indoor hazard marking', 'Parking spot holds', 'Sports and training'],
    faqs: [],
    image: '/photos/traffic-cone-12-inch.webp',
    imageAlt: 'Small orange safety cones spaced across a paved plaza',
  },
  {
    slug: 'traffic-cone-18-inch',
    category: 'traffic-cones',
    name: '18 in Orange Traffic Cone, 3 lb',
    summary: 'A mid-size 3 lb cone for parking lots, driveways and low-speed areas where a tall cone is overkill.',
    body: [
      'The 18 inch cone is a parking lot staple. It is tall enough for a driver to see over the hood and heavy enough at 3 lb not to blow over in light wind.',
      'MUTCD calls for at least 18 inch cones on low-speed roads in daylight. For anything faster or at night, use 28 inch reflective cones.',
    ],
    specs: [
      ['Height', '18 in'],
      ['Weight', 'about 3 lb'],
      ['Material', 'PVC'],
      ['Reflective', 'No'],
    ],
    bestFor: ['Parking lots and driveways', 'Low-speed daytime work', 'School and facility use'],
    faqs: [],
    image: '/photos/traffic-cone-18-inch.webp',
    imageAlt: 'Orange traffic cone on a black base against a wall',
  },
  {
    slug: 'traffic-cone-18-inch-reflective',
    category: 'traffic-cones',
    name: '18 in Traffic Cone with Reflective Collar',
    summary: 'The 18 inch cone with a 6 inch reflective band so it shows up in headlights at dusk and in garages.',
    body: [
      'Adding a reflective collar makes an 18 inch cone useful after dark in parking garages, loading docks and private roads.',
      'It is still a low-speed cone. Public roads at night call for 28 inch cones with two collars.',
    ],
    specs: [
      ['Height', '18 in'],
      ['Weight', 'about 3 lb'],
      ['Reflective', '6 in collar'],
      ['Material', 'PVC'],
    ],
    bestFor: ['Parking garages', 'Loading docks at night', 'Private roads and campuses'],
    faqs: [],
    image: '/photos/traffic-cone-18-inch-reflective.webp',
    imageAlt: 'Row of orange traffic cones along a curb',
  },
  {
    slug: 'traffic-cone-18-inch-colors',
    category: 'traffic-cones',
    name: '18 in Colored Cones (Blue, Red, Yellow, Pink and more)',
    summary:
      'Non-orange 18 inch cones for color-coding lots, events, school pickup lanes and sports, with no traffic meaning attached.',
    body: [
      'Colored cones let you sort space without implying a traffic hazard: blue for accessible spots, yellow for drop-off, green for valet, red for no entry.',
      'Orange stays reserved for work zones. Use colored cones anywhere you need organization rather than a warning.',
    ],
    specs: [
      ['Height', '18 in'],
      ['Weight', 'about 3 lb'],
      ['Colors', 'Blue, red, yellow, green, pink, white, navy'],
      ['Reflective', 'Optional collar'],
    ],
    bestFor: ['Event parking color codes', 'School pickup lanes', 'Sports facilities'],
    faqs: [],
    image: '/photos/traffic-cone-18-inch-colors.webp',
    imageAlt: 'Stacks of green, tan and orange traffic cones',
  },
  {
    slug: 'traffic-cone-28-inch',
    category: 'traffic-cones',
    name: '28 in Orange Traffic Cone, 7 lb',
    summary: 'The standard road cone: 28 inches tall on a 7 lb black base, plain orange for daytime work.',
    body: [
      'Twenty-eight inches is the minimum MUTCD height for cones on higher-speed roads and the size most contractors keep by the hundreds. The 7 lb base resists wind and truck drafts.',
      'This plain version is for daytime use. If any of your work runs past sunset, buy the reflective version below.',
    ],
    specs: [
      ['Height', '28 in'],
      ['Base weight', '7 lb'],
      ['Material', 'PVC with black base'],
      ['Reflective', 'No'],
    ],
    bestFor: ['Daytime lane and shoulder work', 'Utility crews', 'Bulk fleet orders'],
    faqs: [],
    image: '/catalog/cone-28-orange-7lb.webp',
  },
  {
    slug: 'traffic-cone-28-inch-reflective',
    category: 'traffic-cones',
    name: '28 in Reflective Traffic Cone, 7 lb',
    summary:
      'A 28 inch, 7 lb road cone with 6 and 4 inch reflective collars, meeting the MUTCD night-use requirement.',
    body: [
      'MUTCD requires retroreflective bands on 28 inch cones used at night: a 6 inch band near the top and a 4 inch band below it. This cone ships with both.',
      'For most crews, this is the only cone worth stocking, since it covers day and night work with one SKU.',
    ],
    specs: [
      ['Height', '28 in'],
      ['Base weight', '7 lb'],
      ['Reflective', '6 in + 4 in collars'],
      ['Material', 'PVC with black base'],
    ],
    bestFor: ['Night and day roadwork', 'DOT and municipal jobs', 'Standard fleet cone'],
    faqs: [
      {
        q: 'Do I need reflective collars?',
        a: 'Yes for any night use on public roads. MUTCD calls for a 6 inch and a 4 inch white retroreflective band on 28 to 36 inch cones used at night.',
      },
    ],
    image: '/photos/traffic-cone-28-inch-reflective.webp',
    imageAlt: 'Orange traffic cone with white reflective collars in a row of cones',
  },
  {
    slug: 'traffic-cone-28-inch-10-lb-reflective',
    category: 'traffic-cones',
    name: '28 in Reflective Cone, 10 lb Heavy Base',
    summary: 'A 28 inch reflective cone on a heavier 10 lb base for windy sites, bridges and high-speed shoulders.',
    body: [
      'The extra 3 lb of base makes a real difference on bridges, open highways and anywhere trucks pass close. Fewer knocked-over cones means less time walking the line.',
      'Same height and collars as the standard cone, so they mix in with your existing fleet.',
    ],
    specs: [
      ['Height', '28 in'],
      ['Base weight', '10 lb'],
      ['Reflective', '6 in + 4 in collars'],
      ['Material', 'PVC'],
    ],
    bestFor: ['Bridges and overpasses', 'Windy or open sites', 'High-speed shoulders'],
    faqs: [],
    image: '/photos/traffic-cone-28-inch-10-lb-reflective.webp',
    imageAlt: 'Orange traffic cone with reflective collars on a heavy black base',
  },
  {
    slug: 'traffic-cone-28-inch-lime-reflective',
    category: 'traffic-cones',
    name: '28 in Lime Reflective Cone',
    summary: 'A fluorescent lime-green 28 inch cone with reflective collars, used by some utilities and agencies for contrast.',
    body: [
      'Some utility companies and agencies use lime cones so their crew equipment stands out from general construction orange.',
      'Check your state or company standard before switching colors on a public road.',
    ],
    specs: [
      ['Height', '28 in'],
      ['Base weight', '7 lb'],
      ['Color', 'Fluorescent lime'],
      ['Reflective', '6 in + 4 in collars'],
    ],
    bestFor: ['Utility fleets', 'Company color standards', 'High-contrast marking'],
    faqs: [],
    image: '/catalog/cone-36-lime.png',
    imageAlt: 'Fluorescent lime traffic cone on a black base',
  },
  {
    slug: 'grabber-cone-28-inch-16-lb-base',
    category: 'traffic-cones',
    name: '28 in Grab-Top Cone with 16 lb Base',
    summary:
      'A cone with a handle top and a separate 16 lb rubber base, so it is easy to pick up from a moving truck and hard to knock over.',
    body: [
      'The molded handle lets a worker grab the cone without bending, which speeds up mobile operations like line striping and pothole crews.',
      'The heavy rubber base comes off for stacking and keeps the cone planted in truck wind.',
    ],
    specs: [
      ['Height', '28 in'],
      ['Base', '16 lb recycled rubber, removable'],
      ['Top', 'Molded grab handle'],
      ['Reflective', 'Collars included'],
    ],
    bestFor: ['Mobile and moving operations', 'Striping and patching crews', 'High-wind sites'],
    faqs: [],
  },
  {
    slug: 'traffic-cone-36-inch-reflective',
    category: 'traffic-cones',
    name: '36 in Reflective Traffic Cone, 10 lb',
    summary: 'A tall 36 inch reflective cone on a 10 lb base for highways and anywhere drivers need to see it from farther away.',
    body: [
      'Taller cones are visible sooner, which matters at highway speed. Many state DOTs require 36 inch cones on freeways and for night closures.',
      'This version includes the 6 and 4 inch reflective collars on a 10 lb base.',
    ],
    specs: [
      ['Height', '36 in'],
      ['Base weight', '10 lb'],
      ['Reflective', '6 in + 4 in collars'],
      ['Material', 'PVC'],
    ],
    bestFor: ['Highway and freeway work', 'Night closures', 'DOT spec jobs'],
    faqs: [],
    image: '/photos/traffic-cone-36-inch-reflective.webp',
    imageAlt: 'Tall orange traffic cone with reflective bands on a road',
  },
  {
    slug: 'traffic-cone-36-inch-15-lb-reflective',
    category: 'traffic-cones',
    name: '36 in Reflective Cone, 15 lb Extra-Heavy Base',
    summary: 'The heaviest standard cone: 36 inches on a 15 lb base for interstate work and exposed, windy locations.',
    body: [
      'When cones keep blowing over or getting pulled by truck wake, a 15 lb base is the fix. Some interstate specs call for it outright.',
      'It is heavier to carry, so crews often mix these at the taper and use lighter cones along the tangent.',
    ],
    specs: [
      ['Height', '36 in'],
      ['Base weight', '15 lb'],
      ['Reflective', '6 in + 4 in collars'],
      ['Material', 'PVC'],
    ],
    bestFor: ['Interstate work zones', 'Coastal and windy sites', 'Taper and transition areas'],
    faqs: [],
    image: '/photos/traffic-cone-36-inch-15-lb-reflective.webp',
    imageAlt: 'Line of reflective traffic cones along a curved road edge',
  },

  // ── Delineator posts ─────────────────────────────────────────────────────
  {
    slug: 'delineator-post-42-inch-with-base',
    category: 'delineator-posts',
    name: '42 in Delineator Post with Rubber Base',
    summary: 'A complete portable delineator: 42 inch orange post, two reflective bands and a rubber base, ready to set.',
    body: [
      'This is the portable delineator most work zones use. It is narrower than a cone, so you can space them closer in tight tapers without eating the lane.',
      'Posts lift out of the base for stacking. Choose an 8 lb base for low-speed areas or ask for 12 lb for open roads.',
    ],
    specs: [
      ['Height', '42 in post'],
      ['Base', 'Recycled rubber, 8 lb standard (12 lb option)'],
      ['Reflective', 'Two white bands'],
      ['Color', 'Orange'],
    ],
    bestFor: ['Work zone tapers', 'Event lanes', 'Toll and parking lanes'],
    faqs: [],
  },
  {
    slug: 'delineator-post-42-inch-top-only',
    category: 'delineator-posts',
    name: '42 in Delineator Post, Replacement Top',
    summary: 'A 42 inch delineator post without a base, for replacing damaged posts or using bases you already own.',
    body: [
      'Posts get hit; bases usually survive. Buying replacement tops keeps a fleet running for a fraction of the cost of complete units.',
      'Confirm your base type (round-hole or square) when you order so the post seats correctly.',
    ],
    specs: [
      ['Height', '42 in'],
      ['Base', 'Not included'],
      ['Reflective', 'Two white bands'],
      ['Top style', 'Knob or ring top'],
    ],
    bestFor: ['Fleet replacement', 'Bulk orders with existing bases'],
    faqs: [],
  },
  {
    slug: 'surface-mount-delineator-36-inch',
    category: 'delineator-posts',
    name: '36 in Flexible Surface-Mount Delineator',
    summary:
      'A flexible tubular post that mounts to pavement and springs back after impact, for bike lanes and permanent lane separation.',
    body: [
      'Surface-mount delineators glue or bolt down and stay for months or years. When a car clips one, it folds and recovers instead of breaking.',
      'We quote it with standard high-intensity reflective sheeting included, which is often a separate line elsewhere.',
    ],
    specs: [
      ['Height', '36 in'],
      ['Mount', 'Surface mount (adhesive or anchors)'],
      ['Material', 'Flexible polyurethane tube'],
      ['Reflective', 'High-intensity sheeting included'],
      ['Colors', 'White, yellow or orange'],
    ],
    bestFor: ['Bike lanes', 'Lane and turn separation', 'Loading and no-parking zones'],
    faqs: [],
    image: '/photos/surface-mount-delineator-36-inch.webp',
    imageAlt: 'Row of red and white flexible delineator posts on a road',
  },
  {
    slug: 'surface-mount-delineator-48-inch',
    category: 'delineator-posts',
    name: '48 in Flexible Surface-Mount Delineator',
    summary: 'A taller 48 inch flexible post for medians, ramps and locations where drivers need to see the marker sooner.',
    body: [
      'The extra foot of height makes a 48 inch post easier to spot from a distance and over the hood of trucks.',
      'Same flexible, self-righting design as the 36 inch post, quoted with reflective sheeting included.',
    ],
    specs: [
      ['Height', '48 in'],
      ['Mount', 'Surface mount'],
      ['Material', 'Flexible polyurethane tube'],
      ['Reflective', 'High-intensity sheeting included'],
      ['Colors', 'White, yellow or orange'],
    ],
    bestFor: ['Medians and gore areas', 'Highway ramps', 'Truck routes'],
    faqs: [],
    image: '/photos/surface-mount-delineator-48-inch.webp',
    imageAlt: 'Yellow flexible delineator posts lining a path',
  },

  // ── Temporary fence panels ───────────────────────────────────────────────
  {
    slug: 'temporary-chain-link-fence-panel-6x12',
    category: 'temporary-fence-panels',
    name: '6 x 12 ft Temporary Chain Link Fence Panel',
    summary: 'A galvanized 6 ft tall by 12 ft wide chain link panel, the contractor standard for site security without posts.',
    body: [
      'Each panel stands in a base and clamps to the next. A two-person crew can enclose a typical lot in a few hours and take it down just as fast.',
      'Truckload orders get the best per-panel rate; small orders are quoted per piece. Stands, clamps and sandbags are separate.',
    ],
    specs: [
      ['Size', '6 ft tall × 12 ft wide'],
      ['Frame', 'Galvanized steel tube'],
      ['Mesh', 'Chain link'],
      ['Accessories', 'Stands, clamps, bracing and privacy screen sold separately'],
    ],
    bestFor: ['Construction site security', 'Laydown and storage yards', 'Long-term event perimeters'],
    faqs: [],
    image: '/photos/temporary-chain-link-fence-panel-6x12.webp',
    imageAlt: 'Temporary metal fence panels at a construction site',
  },
  {
    slug: 'plastic-temporary-fence-panel',
    category: 'temporary-fence-panels',
    name: 'Plastic Temporary Fence Panel',
    summary: 'A lightweight, bright plastic panel for event routing and short-term pedestrian control that sets up in minutes.',
    body: [
      'Plastic panels weigh a fraction of steel, so one person can set a line. The bright color reads as a boundary without looking like a construction site.',
      'Use them for festivals, sports events and short closures where security is less of a concern than speed.',
    ],
    specs: [
      ['Material', 'High-density plastic'],
      ['Setup', 'Interlocking, freestanding with feet'],
      ['Colors', 'Orange, white and others'],
    ],
    bestFor: ['Festivals and races', 'Pedestrian routing', 'Short-term closures'],
    faqs: [],
    image: '/photos/plastic-temporary-fence-panel.webp',
    imageAlt: 'Orange plastic barricade panel with traffic cones on a sidewalk',
  },
  {
    slug: 'fence-panel-for-water-filled-barrier',
    category: 'temporary-fence-panels',
    name: 'Fence Topper for Water-Filled Barriers',
    summary: 'A steel mesh fence panel that mounts on top of a 42 inch water-filled barrier to create a full-height enclosure.',
    body: [
      'Already own water-filled barriers? A fence topper turns them into a 7 to 8 ft enclosure without buying a second system.',
      'Toppers are model-specific. Send us the barrier make or a photo of the top and we will match the panel.',
    ],
    specs: [
      ['Fits', '42 in interlocking water-filled barriers (model-specific)'],
      ['Material', 'Steel frame and mesh'],
      ['Options', 'Privacy screen'],
    ],
    bestFor: ['Upgrading existing barriers', 'Urban job sites', 'Event security'],
    faqs: [],
    image: '/photos/fence-panel-for-water-filled-barrier.webp',
    imageAlt: 'Fence panels mounted on top of orange and white water-filled barriers',
  },
]

export function getCategory(id: CategoryId): Category {
  const c = CATEGORIES.find((x) => x.id === id)
  if (!c) throw new Error(`Unknown category ${id}`)
  return c
}

export function productsIn(id: CategoryId): Product[] {
  return PRODUCTS.filter((p) => p.category === id)
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

/** Topic keywords → catalog category, used to link articles to matching products. */
const TOPIC_CATEGORIES: [RegExp, CategoryId][] = [
  [/crowd|bike.?rack|pedestrian|event|parade|queue/i, 'crowd-control-barricades'],
  [/water.?fill|jersey|barrier/i, 'water-filled-barriers'],
  [/delineator|channelizer|bike.?lane|tubular/i, 'delineator-posts'],
  [/fence|fencing/i, 'temporary-fence-panels'],
  [/cone|pylon|taper|lane.?closure/i, 'traffic-cones'],
]

export function productsForTopic(text: string, limit: number): Product[] {
  const hit = TOPIC_CATEGORIES.find(([re]) => re.test(text))
  return hit ? productsIn(hit[1]).slice(0, limit) : []
}

export function productPath(p: Product): string {
  return `/products/${p.slug}`
}
