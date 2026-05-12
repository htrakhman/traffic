import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "delineator cones" (~500/mo, High comp, $20.24 bid).
 * Decision-tree structure: walks the buyer through which device they
 * actually need — a delineator cone vs. a tubular delineator vs. a
 * channelizer drum — based on the job they describe in the search.
 */
export const articleDelineatorConesGuide: Article = {
  slug: 'delineator-cones-guide',
  title: 'Delineator Cones: What They Are, When to Use Them, and What to Buy Instead (2026)',
  excerpt:
    'A "delineator cone" is the awkward middle child of work-zone hardware — taller and skinnier than a traffic cone, shorter and lighter than a drum. Most jobs that search for one actually want a tubular delineator or a channelizer cone. Here is how to tell which.',
  metaDescription:
    'Delineator cones explained — how they differ from tubular delineators, channelizer cones, and traffic drums. Pick the right device with this decision tree.',
  primaryKeyword: 'delineator cones',
  secondaryKeywords: [
    'road delineators',
    'flexible traffic delineators',
    'pylon cone',
    'channelizer cones',
    'cone barriers',
    'barrier cones',
  ],
  targetVolume: 500,
  datePublished: '2026-05-12',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A "delineator cone" usually means one of three things, and the difference matters because the wrong choice fails MUTCD inspection. ',
      h('strong', null, 'Short answer:'),
      ' if you need to channelize traffic in a daytime work zone for a few hours, you probably want a 28" or 36" traffic cone. If you need a permanent edge marker on a curve or a parking-lot lane, you want a tubular delineator on a flexible base. If you need a long-term work-zone marker that survives wind and bumper kisses, you want a 42" channelizer drum. The page below walks the decision tree so you order the right thing the first time.',
    ),

    h('h2', null, 'What "delineator cone" actually means'),
    h(
      'p',
      null,
      'The phrase shows up in three different vocabularies and the searcher rarely says which one they\'re in:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Channelizer cone (DOT vocabulary).'), ' A 36"–42" tall, narrow, flexible-plastic device with reflective sheeting, mounted on a square or round rubber base. MUTCD calls these "channelizing devices" in Chapter 6F. They are what most contractors mean when they say "delineator cone."'),
      h('li', null, h('strong', null, 'Tubular delineator (engineer vocabulary).'), ' A 28"–48" thin orange or white tube on a 7–10 lb base, used for permanent or semi-permanent edge marking — gore points, parking-lot striping, slow-curve warnings. Slimmer than a channelizer, less impact-tolerant.'),
      h('li', null, h('strong', null, 'Traffic cone (catalog vocabulary).'), ' Some retailers list standard 28" or 36" traffic cones as "delineator cones" because they delineate a path. They are not the same product as the two above and you should not buy them for permanent installation.'),
    ),
    h(
      'p',
      null,
      'If a spec sheet, a state DOT plan, or an inspector asked for "delineators," they almost certainly mean tubular delineators or channelizer drums — not the rubber-base cones in your truck. Match the language before you order.',
    ),

    h('h2', null, 'Decision tree — pick by the job, not the word'),
    h(
      'p',
      null,
      'Walk through these questions in order. The first "yes" is your answer.',
    ),

    h('h3', null, '1. Is the device staying in place for more than 2 weeks?'),
    h(
      'p',
      null,
      'Yes → You need a ',
      h('strong', null, 'tubular delineator'),
      ' (semi-permanent) or a ',
      h('strong', null, '42" channelizer drum'),
      ' (long-term work zone). Standard rubber-base traffic cones get walked off, knocked into ditches, and faded by UV in under a month. If the device needs to outlast the weather, it has to be designed for it.',
    ),

    h('h3', null, '2. Is posted traffic moving past it at 45+ mph?'),
    h(
      'p',
      null,
      'Yes → You need a ',
      h('strong', null, '36" minimum height channelizing device'),
      ' (MUTCD Section 6F.65). At those speeds, a 28" cone is below windshield-line for many vehicles and is too easy to overlook. Step up to a 36" channelizer cone or a 42" drum. Reflective collars must be ASTM Type IV or better.',
    ),

    h('h3', null, '3. Is the work happening at night?'),
    h(
      'p',
      null,
      'Yes → Add reflective sheeting. ',
      h('strong', null, 'Two reflective collars'),
      ' (a 6" collar near the top and a 4" collar below it) is the MUTCD nighttime standard. Channelizer cones and drums ship with them; standard daytime cones often do not. Verify before deployment.',
    ),

    h('h3', null, '4. Is the device on a curve, gore, or parking lot edge?'),
    h(
      'p',
      null,
      'Yes → ',
      h('strong', null, 'Tubular delineators on flexible bases'),
      ' are the right fit. They flex when bumped, return upright, and are skinny enough not to obstruct sight lines. A traffic cone in this position becomes a windshield missile the first time someone clips it.',
    ),

    h('h3', null, '5. Is this just a daytime closure, today, for a couple hours?'),
    h(
      'p',
      null,
      'Yes → A standard ',
      h('strong', null, '28" traffic cone'),
      ' is fine and is what most contractors keep on the truck. No need to overspend on channelizer drums for short work.',
    ),

    h('h2', null, 'Side-by-side: cones, channelizers, drums, tubular delineators'),
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
            h('th', { className: 'text-left p-2 border-b' }, 'Height'),
            h('th', { className: 'text-left p-2 border-b' }, 'Base weight'),
            h('th', { className: 'text-left p-2 border-b' }, 'Best use'),
            h('th', { className: 'text-left p-2 border-b' }, 'Price each'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '28" traffic cone'),
            h('td', { className: 'p-2' }, '28 in'),
            h('td', { className: 'p-2' }, '7–10 lb'),
            h('td', { className: 'p-2' }, 'Daytime closures up to 45 mph'),
            h('td', { className: 'p-2' }, '$20–$32'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '36" channelizer cone'),
            h('td', { className: 'p-2' }, '36 in'),
            h('td', { className: 'p-2' }, '10–12 lb'),
            h('td', { className: 'p-2' }, 'Higher-speed roads, nighttime'),
            h('td', { className: 'p-2' }, '$35–$60'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, 'Tubular delineator'),
            h('td', { className: 'p-2' }, '28–48 in'),
            h('td', { className: 'p-2' }, '4–10 lb'),
            h('td', { className: 'p-2' }, 'Edges, curves, parking lots'),
            h('td', { className: 'p-2' }, '$15–$45'),
          ),
          h(
            'tr',
            null,
            h('td', { className: 'p-2' }, '42" channelizer drum'),
            h('td', { className: 'p-2' }, '42 in'),
            h('td', { className: 'p-2' }, '15–35 lb (tire ring)'),
            h('td', { className: 'p-2' }, 'Long-term work zones, freeways'),
            h('td', { className: 'p-2' }, '$55–$110'),
          ),
        ),
      ),
    ),

    h('h2', null, 'Reflective grade — the spec that gets skipped'),
    h(
      'p',
      null,
      'The white collars on a delineator cone are not all the same. Three sheeting grades show up in catalogs:',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Engineer Grade (Type I).'), ' Cheapest. Returns about 70 candela per lux. NOT acceptable for nighttime work zones in most states. Avoid for any road use.'),
      h('li', null, h('strong', null, 'High-Intensity Prismatic (Type IV).'), ' Roughly 250 cd/lx. The current MUTCD nighttime minimum. This is what you should buy by default.'),
      h('li', null, h('strong', null, 'Diamond Grade (Type IX or XI).'), ' 500–800 cd/lx. Required for high-speed freeway work in some states; overkill for most municipal jobs.'),
    ),
    h(
      'p',
      null,
      'A "delineator cone" with no sheeting type printed on the spec sheet is almost always Engineer Grade. Ask before you commit to a case quantity.',
    ),

    h('h2', null, 'Spacing — how many you need'),
    h(
      'p',
      null,
      'MUTCD spacing for channelizing devices is roughly equal to the speed limit in feet — a 35 mph zone uses a device every 35 feet, a 55 mph zone every 55 feet. For a tighter look (e.g., a parking-lot taper or a sidewalk closure) you can run them closer; you cannot run them farther apart on a posted road.',
    ),
    h(
      'p',
      null,
      'Quick math for a 200 ft taper at 45 mph: 200 ÷ 45 ≈ 5 devices in the taper, plus the buffer cones at the entry and exit. For a longer planning calculation see our ',
      h('a', { href: '/blog/mutcd-taper-length-formula-nj' }, 'MUTCD taper length formula guide'),
      '.',
    ),

    h('h2', null, 'Mistakes that cost real money'),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Buying 28" cones for a 50 mph road.'), ' Inspector will fail the setup; you redeploy the entire taper.'),
      h('li', null, h('strong', null, 'Engineer Grade sheeting at night.'), ' Looks fine in the yard, invisible at 50 ft on a wet road. Cited in NJDOT post-incident reviews more than any other gear failure.'),
      h('li', null, h('strong', null, 'Light bases on a windy bridge deck.'), ' A 4 lb tubular delineator base will skate across an open deck in 25 mph wind. Use 10 lb minimum or sandbag.'),
      h('li', null, h('strong', null, 'Treating cones as permanent.'), ' Standard rubber-base cones fade, walk off, and get stolen inside a week of unattended deployment. For longer than that, buy a tubular delineator or rent a drum.'),
    ),

    h('h2', null, 'What to actually buy'),
    h(
      'p',
      null,
      'For a typical NJ contractor stocking a working truck:',
    ),
    h(
      'ul',
      null,
      h('li', null, '24× 28" traffic cones with double Type IV reflective collars (workhorse for daytime jobs)'),
      h('li', null, '8× 36" channelizer cones for higher-speed or nighttime work'),
      h('li', null, '12× 36" tubular delineators on 10 lb bases for parking-lot striping and gore points'),
      h('li', null, 'Optional: 6× 42" channelizer drums if you ever take freeway-side work'),
    ),
    h(
      'p',
      null,
      'Browse our ',
      h('a', { href: '/category/cones-drums' }, 'cones, drums, and channelizers'),
      ' for sizes, sheeting grades, and bulk pricing. For a mixed kit sized to a specific job, ',
      h('a', { href: '/quote' }, 'request a quote'),
      ' — same-day Central NJ delivery, MUTCD spec on every line item, and we will swap Engineer Grade sheeting for Type IV at no cost on any standing order.',
    ),
    h(
      'p',
      null,
      'Not sure which device the job calls for? Try the ',
      h('a', { href: '/assistant' }, 'site assistant'),
      ' — describe the road and the job and it will return the channelizing-device list.',
    ),
  ),
  faqs: [
    {
      q: 'Are delineator cones the same as traffic cones?',
      a: 'Not exactly. "Delineator cone" usually refers to a 36"+ channelizing device — taller, skinnier, and built for higher-speed and nighttime work zones. A standard traffic cone is shorter (18", 28", or 36") and built for short-duration daytime channelizing. The MUTCD treats them as related but distinct devices in Chapter 6F.',
    },
    {
      q: 'When should I use a tubular delineator instead of a cone?',
      a: 'Use tubular delineators when the marker needs to stay in place semi-permanently (more than 2 weeks), when it sits at an edge or curve where a wider cone would block sightlines, and for parking-lot striping that needs to flex when bumped. Cones are for daytime, short-duration work-zone channelizing.',
    },
    {
      q: 'How far apart do I space delineator cones in a work zone?',
      a: 'MUTCD spacing for channelizing devices in a tangent (straight) section is roughly the speed limit in feet — a 35 mph zone gets a device every 35 ft, a 55 mph zone every 55 ft. In a taper, divide the taper length by the speed limit to get the device count. Local DOTs may require tighter spacing.',
    },
    {
      q: 'Do delineator cones need reflective collars at night?',
      a: 'Yes. MUTCD requires two reflective collars on any channelizing device used after dark — a 6" collar near the top and a 4" collar below. Sheeting must be ASTM Type IV (High-Intensity Prismatic) or better. Engineer Grade sheeting is not acceptable for nighttime work zones.',
    },
    {
      q: 'How much do delineator cones cost?',
      a: 'A 36" channelizer cone with a 10–12 lb rubber base and double Type IV reflective collars typically runs $35–$60 each in case quantities. A 28" tubular delineator on a flexible base runs $15–$30. A 42" channelizer drum with a tire ring runs $55–$110. Skip Engineer Grade products even if they are cheaper.',
    },
  ],
  relatedProducts: [
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],
  relatedArticles: [
    'channelizer-cones-guide',
    'traffic-delineators-guide',
    'mutcd-taper-length-formula-nj',
  ],
}
