import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic pylon" + "safety pylons" (50K/mo each, High comp).
 * "What is X" definitional — answers the search query directly with a 60-word
 * lead, then expands into when to use a pylon vs. cone vs. delineator.
 */
export const articleWhatIsATrafficPylon: Article = {
  slug: 'what-is-a-traffic-pylon',
  title: 'What Is a Traffic Pylon? (And When to Use One Instead of a Cone)',
  excerpt:
    'A "traffic pylon" is the formal term for an orange traffic cone — but in some industries it specifically means the taller, slimmer tubular variant. Here is the difference, when to use each, and what to buy.',
  metaDescription:
    'A traffic pylon is the formal name for a traffic cone — the orange channelizing device that routes vehicles. This is when to use a pylon vs. cone vs. delineator. Same-day NJ delivery.',
  primaryKeyword: 'traffic pylon',
  secondaryKeywords: [
    'safety pylons',
    'pylons traffic',
    'traffic cones',
    'tubular markers',
    'channelizing devices',
    'traffic pylon meaning',
    'orange pylons',
  ],
  targetVolume: 50000,
  datePublished: '2026-04-28',
  dateModified: '2026-04-28',
  readMinutes: 7,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A ',
      h('strong', null, 'traffic pylon'),
      ' is the formal name for the orange ',
      h('strong', null, 'traffic cone'),
      ' — a hollow, weighted channelizing device used to route vehicles or pedestrians around a hazard. The terms are interchangeable in everyday usage. In some industries (motorsports, driver-training, military convoy work) "pylon" specifically refers to the taller, slimmer tubular variant the MUTCD classifies as a "tubular marker." If you are buying for a road or parking lot, "traffic pylon" and "traffic cone" mean the same product. Below is the difference between cones, pylons, and delineators — and which to buy.',
    ),

    h('h2', null, 'Where the word "pylon" came from'),
    h(
      'p',
      null,
      'In aviation, a "pylon" is a vertical mast that planes navigate around in air races (think the Reno Air Races). The term migrated to motorsports in the 1950s for the orange cones used to define autocross courses. From there it moved into law-enforcement driver training, sport-cone agility (for hockey, soccer, basketball drills), and eventually into general usage as a synonym for traffic cone. Federal documents (MUTCD, FHWA, OSHA) almost never use "pylon" — they say "traffic cone" or "tubular marker." But in industry catalog listings, sales conversations, and consumer search, "traffic pylon" is alive and well.',
    ),

    h('h2', null, 'Pylon vs. cone vs. delineator vs. tubular marker'),
    h(
      'p',
      null,
      'The MUTCD classifies channelizing devices into a handful of categories. Each has a different visual silhouette and a different stability + visibility profile.',
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
          h(
            'tr',
            null,
            h('th', { className: 'text-left p-2 border-b' }, 'Device'),
            h('th', { className: 'text-left p-2 border-b' }, 'Shape'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical height'),
            h('th', { className: 'text-left p-2 border-b' }, 'Where used'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Traffic cone (pylon)'),
            h('td', { className: 'p-2' }, 'Solid cone with rubber base'),
            h('td', { className: 'p-2' }, '18, 28, 36 in'),
            h('td', { className: 'p-2' }, 'Routine work zones, parking, events.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Tubular marker'),
            h('td', { className: 'p-2' }, 'Slim hollow tube, flexible'),
            h('td', { className: 'p-2' }, '18, 28, 36, 42 in'),
            h('td', { className: 'p-2' }, 'Lane-line delineation; curb-mounted divider.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Drum (channelizer)'),
            h('td', { className: 'p-2' }, 'Plastic barrel, 36 in tall'),
            h('td', { className: 'p-2' }, '36 in'),
            h('td', { className: 'p-2' }, 'Tapers, freeway closures, long-duration work.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Vertical panel'),
            h('td', { className: 'p-2' }, 'Tall flat panel with stripes'),
            h('td', { className: 'p-2' }, '24–36 in'),
            h('td', { className: 'p-2' }, 'Tight-clearance zones; sidewalks; railroad work.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Delineator post'),
            h('td', { className: 'p-2' }, 'Slim flexible post on epoxy'),
            h('td', { className: 'p-2' }, '36–48 in'),
            h('td', { className: 'p-2' }, 'Permanent / semi-permanent edge marking.'),
          ),
        ),
      ),
    ),

    h('h2', null, 'When does "pylon" mean a tubular marker (not a cone)?'),
    h(
      'p',
      null,
      'In motorsports, military, and driver-training contexts, "pylon" usually means the slimmer ',
      h('strong', null, 'tubular marker'),
      ' — a hollow plastic tube on a flat rubber base. Tubular markers are 1.5–4 in in diameter at the body (vs. 6–10 in for a cone), so they take less course space and stack denser for transport. They also bend and rebound when hit, where a cone tips over. Driver-training schools and autocross clubs prefer them for that reason. If your search for "traffic pylon" was about training-course or motorsport gear, you want tubular markers. If it was about a road work zone, you want a cone.',
    ),

    h('h2', null, 'When to use a pylon vs. a cone'),
    h('h3', null, 'Use a cone when:'),
    h(
      'ul',
      null,
      h('li', null, 'The road has vehicle traffic at any speed.'),
      h('li', null, 'You need MUTCD compliance — only cones (and drums, panels) are explicitly approved as channelizing devices for public-road work.'),
      h('li', null, 'You need a stable base that resists wind and slipstream — cone bases run 4–12 lb.'),
      h('li', null, 'You need stackability for transport — a 28-inch cone with a 7 lb base stacks 30+ on a flat truck rack.'),
    ),
    h('h3', null, 'Use a tubular marker (sometimes called a "pylon") when:'),
    h(
      'ul',
      null,
      h('li', null, 'You are running an autocross or driver-training course.'),
      h('li', null, 'You need a slim profile so the device does not narrow the active lane (parking-garage column protection, retail entry).'),
      h('li', null, 'You need the device to bend and rebound rather than tip — military convoy training, security gate routing.'),
      h('li', null, 'You are creating semi-permanent lane delineation that needs to survive vehicle hits without re-deployment.'),
    ),

    h('h2', null, 'Common search variations and what people actually want'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Search term'),
            h('th', { className: 'text-left p-2 border-b' }, 'What the user usually means'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '"traffic pylon"'),
            h('td', { className: 'p-2' }, 'Generic search for an orange traffic cone (most common).'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '"safety pylons"'),
            h('td', { className: 'p-2' }, 'Same — orange traffic cones, with emphasis on the safety-equipment use.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '"orange pylons"'),
            h('td', { className: 'p-2' }, 'Same as above; sometimes refers to short 6–9 in agility cones.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '"tubular pylons / markers"'),
            h('td', { className: 'p-2' }, 'Slim tubular markers — driver-training or course-marking gear.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '"sport pylons"'),
            h('td', { className: 'p-2' }, 'Mini agility cones (4–9 in) for sports drills.'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '"flexible pylons"'),
            h('td', { className: 'p-2' }, 'Either flexible tubular markers OR rebounding "smart cones" with a soft body.'),
          ),
        ),
      ),
    ),

    h('h2', null, 'How tall is a standard traffic pylon?'),
    h(
      'p',
      null,
      'For road-work pylons (cones), the standard is 28 inches with a 7-lb rubber base. For motorsport / driver-training pylons (tubular markers), 18–36 inches is the common range, with 28 in being most popular. For sport-and-fitness pylons (agility cones), 4–12 inches is typical. Each tier costs roughly half the next: a sport pylon is $2–4, a tubular marker is $8–14, a road-work cone is $22–48.',
    ),

    h('h2', null, 'How much do traffic pylons cost?'),
    h(
      'p',
      null,
      'Per-unit retail pricing in 2026:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Mini sport pylon (4–9 in):'), ' $2–6'),
      h('li', null, h('strong', null, '12-inch indoor pylon:'), ' $8–14'),
      h('li', null, h('strong', null, '18-inch parking pylon:'), ' $12–18'),
      h('li', null, h('strong', null, '28-inch road pylon:'), ' $22–32 (single collar) / $32–48 (double collar)'),
      h('li', null, h('strong', null, '36-inch highway pylon:'), ' $58–110'),
      h('li', null, h('strong', null, '36-inch tubular marker:'), ' $14–22'),
    ),
    h(
      'p',
      null,
      'Bulk pricing kicks in at 50+ units, typically a 10–15% discount.',
    ),

    h('h2', null, 'Do traffic pylons need reflective collars?'),
    h(
      'p',
      null,
      'For nighttime use on any roadway, yes — ASTM Type IV high-intensity prismatic on a 4-inch collar is the MUTCD minimum. For roads above 45 mph, double collars (4 in + 6 in). For daytime-only parking-lot use, a collar is optional but usually a smart upgrade for $3–5 more per cone. Sport / training pylons are typically non-reflective because they are used in daytime under controlled conditions.',
    ),

    h('h2', null, 'Where to buy traffic pylons in NJ'),
    h(
      'p',
      null,
      'TrafficKit ships traffic pylons (cones) and tubular markers to Central NJ contractors with same-day delivery. ',
      h('a', { href: '/category/cones-drums' }, 'Browse cones, drums, and channelizers'),
      ' for the catalog. For a custom set sized to a specific job, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' — describe what you are routing (road, lot, course) and we will spec the right product. Or talk to the ',
      h('a', { href: '/assistant' }, 'TrafficKit Assistant'),
      ' for a real-time recommendation. For a deeper dive into when to choose a cone vs. a drum vs. a vertical panel, see our ',
      h('a', { href: '/blog/portable-traffic-control-devices-guide' }, 'portable traffic control devices guide'),
      '.',
    ),
  ),
  faqs: [
    {
      q: 'What is a traffic pylon?',
      a: 'A traffic pylon is another name for a traffic cone — a hollow orange PVC channelizing device with a weighted rubber base, used to route vehicles or pedestrians around a hazard. In motorsports and driver-training contexts, "pylon" sometimes specifically means a slimmer tubular marker, but in everyday usage it means the same thing as a traffic cone.',
    },
    {
      q: 'What is the difference between a traffic pylon and a traffic cone?',
      a: 'No functional difference — they are the same product, called different things in different industries. The MUTCD uses "traffic cone." Motorsports, military, and driver-training use "pylon." Some "pylons" are technically slim tubular markers (a separate MUTCD device class), but for road or parking use, the terms are interchangeable.',
    },
    {
      q: 'How tall is a standard traffic pylon?',
      a: '28 inches is the contractor default for road work. 18 inches is the parking-lot standard. 36 inches is required for nighttime work above 35 mph and for daytime above 55 mph. Sport and training pylons range from 4 to 12 inches.',
    },
    {
      q: 'What color is a traffic pylon?',
      a: 'Fluorescent orange is the federally standard color for channelizing devices, including traffic pylons. Fluorescent pink-orange (added in MUTCD 2023) is for incident response only. Other colors (lime, red, blue) exist but have specific use cases — most pylons are orange.',
    },
    {
      q: 'Are traffic pylons reflective?',
      a: 'Road-work pylons used at night must have ASTM Type IV high-intensity prismatic reflective collars — a 4-inch collar is the MUTCD minimum, double collars (4 + 6 in) for roads above 45 mph. Daytime parking-lot and sport pylons typically skip the collar.',
    },
    {
      q: 'How much does a traffic pylon cost?',
      a: 'A 28-inch road pylon with single reflective collar runs $22–32 retail; double collar is $32–48. 36-inch highway pylons run $58–110. Tubular markers are $14–22. Sport-grade mini pylons (4–9 in) are $2–6.',
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
    'portable-traffic-control-devices-guide',
    'traffic-cone-rental-guide',
  ],
}
