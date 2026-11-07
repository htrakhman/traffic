/** Side-by-side buying guides at /compare/:slug. */
export interface Comparison {
  slug: string
  title: string
  h1: string
  description: string
  intro: string
  columns: [string, string]
  rows: [string, string, string][]
  sections: { heading: string; body: string }[]
  verdict: string
  links: { label: string; href: string }[]
  faqs: { q: string; a: string }[]
}

export const COMPARISONS: Comparison[] = [
  {
    slug: 'water-filled-vs-concrete-jersey-barriers',
    title: 'Water-Filled vs Concrete Jersey Barriers: Cost, Weight and When to Use Each',
    h1: 'Water-filled vs concrete jersey barriers',
    description:
      'Plastic water-filled barriers vs concrete jersey barriers compared on weight, cost, crash rating, setup and best uses.',
    intro:
      'Both make a wall, but they do different jobs. Concrete stops vehicles. Plastic guides them, and it moves without a crane.',
    columns: ['Water-filled plastic', 'Concrete jersey'],
    rows: [
      ['Empty weight (6 ft unit)', 'about 100 to 150 lb', 'n/a, about 4,000 lb per 10 ft'],
      ['Set with', 'Two people and a hose', 'Crane or loader'],
      ['Crash rating', 'Usually none (channelizing only)', 'Rated systems available'],
      ['Cost to place', 'Low: no equipment needed', 'Higher: crane, truck and crew'],
      ['Move it later', 'Drain, lift, re-fill', 'Needs equipment again'],
      ['Looks', 'Orange or white, can take a fence topper', 'Gray concrete'],
    ],
    sections: [
      {
        heading: 'Choose water-filled when',
        body: 'You are separating people from work, building a sidewalk closure, shaping event traffic, or the layout changes often. It is also the only option where a truck crane cannot reach.',
      },
      {
        heading: 'Choose concrete when',
        body: 'Your traffic control plan calls for positive protection, which means a crash-tested barrier between live highway traffic and workers. Plastic channelizing barriers do not meet that requirement.',
      },
    ],
    verdict:
      'For most city, event and private-site work, water-filled barriers are cheaper to place and move. For highway work-zone protection, follow the plan, which usually means concrete or a rated steel system.',
    links: [
      { label: 'Shop water filled barriers', href: '/water-filled-barriers' },
      { label: '42 in water-filled barrier', href: '/products/water-filled-barrier-42-inch' },
    ],
    faqs: [
      {
        q: 'Can a water-filled barrier stop a car?',
        a: 'Most cannot. They slow and redirect at low speed but are not crash barriers unless the specific system carries a MASH or NCHRP-350 rating and is installed as tested.',
      },
    ],
  },
  {
    slug: 'steel-vs-plastic-crowd-control-barricades',
    title: 'Steel vs Plastic Crowd Control Barricades: Which Should You Buy?',
    h1: 'Steel vs plastic crowd control barricades',
    description:
      'Galvanized steel bike-rack barricades compared with plastic pedestrian barriers on strength, weight, price, storage and use.',
    intro:
      'Steel barricades hold a line when people push. Plastic barricades are lighter and brighter but give way under load. The right choice depends on how much the crowd will lean.',
    columns: ['Steel (galvanized)', 'Plastic'],
    rows: [
      ['Weight', '40 to 60 lb per panel', '10 to 25 lb per panel'],
      ['Holds a pushing crowd', 'Yes', 'No'],
      ['Lifespan', 'Many seasons of reuse', 'Shorter, especially in sun'],
      ['Weather', 'Galvanized resists rust for years', 'UV can fade and embrittle over time'],
      ['Storage', 'Stacks flat on carts', 'Nests, lighter to move'],
      ['Best at', 'Concerts, parades, police lines', 'Light routing, short events, indoor use'],
    ],
    sections: [
      {
        heading: 'Steel is the default for events',
        body: 'Police departments, stadiums and rental fleets buy steel because it survives years of loading, unloading and crowd pressure.',
      },
      {
        heading: 'Plastic has a place',
        body: 'For queue lines, short-term routing and sites where one person sets everything up, lighter plastic barriers save labor.',
      },
    ],
    verdict:
      'If people will lean on it, buy steel. If you only need to show where to walk, plastic is fine.',
    links: [
      { label: 'Shop steel crowd control barricades', href: '/crowd-control-barricades' },
      { label: 'Barricade calculator', href: '/tools/barricade-calculator' },
    ],
    faqs: [
      {
        q: 'Which steel barricade length is best?',
        a: '8 to 8.5 ft panels cover the most line per unit. 6.5 ft panels are easier to handle and turn corners.',
      },
    ],
  },
  {
    slug: '28-vs-36-inch-traffic-cones',
    title: '28 vs 36 Inch Traffic Cones: MUTCD Rules and Which to Buy',
    h1: '28 inch vs 36 inch traffic cones',
    description:
      'When a 28 inch cone is enough and when you need 36 inches, with MUTCD height and reflective collar rules and base weights.',
    intro:
      'Both sizes meet the MUTCD minimum for higher-speed roads. The difference is visibility, wind resistance and what your contract asks for.',
    columns: ['28 inch', '36 inch'],
    rows: [
      ['MUTCD use', 'Minimum for higher-speed roads and night', 'Preferred on freeways, many DOT specs'],
      ['Reflective at night', '6 in + 4 in collars', '6 in + 4 in collars'],
      ['Typical base', '7 to 10 lb', '10 to 15 lb'],
      ['Cost', 'Lower per cone', 'Higher per cone'],
      ['Stacking and storage', 'More per truck', 'Fewer per truck'],
    ],
    sections: [
      {
        heading: 'Buy 28 inch for',
        body: 'Most local roads, utility work and day-to-day crew use. It is the fleet standard because it is cheaper, lighter and fits more per truck.',
      },
      {
        heading: 'Buy 36 inch for',
        body: 'Highways, long tapers and anywhere drivers approach fast. The extra height buys earlier warning, and heavier bases resist truck wake.',
      },
    ],
    verdict:
      'Stock 28 inch reflective cones as your base fleet and add 36 inch cones for highway or DOT jobs that require them.',
    links: [
      { label: 'Shop traffic cones', href: '/traffic-cones-for-sale' },
      { label: 'Cone taper calculator', href: '/tools/cone-taper-calculator' },
    ],
    faqs: [
      {
        q: 'Can I use 18 inch cones on a road?',
        a: 'Only on low-speed roads in daylight. Higher speeds and night work need 28 inches or taller with reflective collars.',
      },
    ],
  },
  {
    slug: 'portable-vs-surface-mount-delineators',
    title: 'Portable vs Surface-Mount Delineator Posts: Which Do You Need?',
    h1: 'Portable vs surface-mount delineator posts',
    description:
      'Delineator posts on rubber bases compared with flexible surface-mount posts on cost, installation, durability and use.',
    intro:
      'Both mark an edge with a narrow upright post. One moves with the job; the other stays in place for months or years.',
    columns: ['Portable (rubber base)', 'Surface mount'],
    rows: [
      ['Install', 'Set it down', 'Adhesive or anchor bolts'],
      ['When hit', 'Knocks over, reset by hand', 'Bends and springs back'],
      ['Up-front cost', 'Post plus base', 'Post plus install labor'],
      ['Best duration', 'Hours to weeks', 'Months to years'],
      ['Common use', 'Work zones, events', 'Bike lanes, medians, garages'],
    ],
    sections: [
      {
        heading: 'Portable posts',
        body: 'Use them when the layout changes, such as daily lane closures, event lanes and temporary detours.',
      },
      {
        heading: 'Surface-mount posts',
        body: 'Use them for anything permanent or semi-permanent where you do not want staff resetting knocked-over posts.',
      },
    ],
    verdict: 'Temporary job, buy portable. Lane that stays, buy surface mount.',
    links: [{ label: 'Shop delineator posts', href: '/delineator-posts' }],
    faqs: [
      {
        q: 'How far apart should delineators be?',
        a: 'In a work zone taper, spacing in feet is roughly equal to the speed limit in mph. For permanent lane separation, follow your engineer or local standard, often 10 to 40 ft.',
      },
    ],
  },
]

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug)
}
