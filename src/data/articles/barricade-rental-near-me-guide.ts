import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Article 4 - Targets "barricade rental near me" (500/mo, High comp 76)
 * Secondary: "barricades for rent near me", "street barricade rental", "road barricade rental",
 *            "construction barricade rental", "pedestrian barricade rental", "type 3 barricade rental"
 */
export const articleBarricadeRentalNearMeGuide: Article = {
  slug: 'barricade-rental-near-me-guide',
  title: 'Barricade Rental Near Me: How to Pick the Right Type and Provider',
  excerpt:
    'MUTCD Type I, II, and III barricades explained. Decide which type your job needs, compare water-filled vs. steel vs. plastic, and what to ask a local rental provider.',
  metaDescription:
    'Barricade rental guide: Type I/II/III specs per MUTCD, water-filled vs steel, how to choose, and what to ask your local provider.',
  primaryKeyword: 'barricade rental near me',
  secondaryKeywords: [
    'barricades for rent near me',
    'street barricade rental',
    'road barricade rental',
    'construction barricade rental',
    'pedestrian barricade rental',
    'type 3 barricade rental',
  ],
  targetVolume: 500,
  datePublished: '2026-04-19',
  readMinutes: 9,
  heroImage: '/images/catalog/barricade-type3.jpg',
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'Barricades are rigid physical barriers that close lanes, redirect traffic, and protect work zones. Every job has a different need: short daytime work, highway closures, pedestrian diversions. This guide covers MUTCD Type I, II, and III specs, material options, and how to vet a local provider.',
    ),
    h('h2', null, 'What is a barricade and when is one required?'),
    h(
      'p',
      null,
      'A barricade is a rigid portable barrier with reflective rails used to block access to a roadway, work zone, or hazard. MUTCD Section 6F.63 defines three types, each with a different number of reflective rails and appropriate use case. Barricades are required on any road closure, lane reduction, or hazardous area where cones or signs alone are insufficient. They are especially important on multi-lane roads, at night, and in high-speed environments.',
    ),
    h('h2', null, 'What is the difference between Type I, II, and Type III barricades?'),
    h(
      'p',
      null,
      'The three types differ by the number of reflective rails: Type I has one, Type II has two, and Type III has three. The more rails, the greater the visibility and the more appropriate for high-speed, nighttime, or long-term deployments.',
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
            h('th', null, 'Type'),
            h('th', null, 'Rails'),
            h('th', null, 'Height'),
            h('th', null, 'Best For'),
            h('th', null, 'Speed Limit'),
          ),
        ),
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h('td', null, 'Type I'),
            h('td', null, '1 reflective rail'),
            h('td', null, '42"'),
            h('td', null, 'Daytime, low-speed, short-term work'),
            h('td', null, 'Up to 25 mph'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Type II'),
            h('td', null, '2 reflective rails'),
            h('td', null, '42"-54"'),
            h('td', null, 'Daytime/night, mid-speed roads, 3-5 day work'),
            h('td', null, '25-45 mph'),
          ),
          h(
            'tr',
            null,
            h('td', null, 'Type III'),
            h('td', null, '3 reflective rails'),
            h('td', null, '54"-63"'),
            h('td', null, 'Nighttime, high-speed, long-term or highway closures'),
            h('td', null, '45+ mph'),
          ),
        ),
      ),
    ),
    h(
      'p',
      null,
      'The federal rail widths, reflective-sheeting grades, and minimum heights each barricade type has to meet before it goes on a public road are spelled out in ',
      h(
        'a',
        { href: 'https://mutcd.fhwa.dot.gov/pdfs/2009r1r2/part6.pdf', target: '_blank', rel: 'noopener noreferrer' },
        'MUTCD Part 6F',
      ),
      ', which is the standard state DOTs and federal-aid projects inspect against.',
    ),
    h('h2', null, 'What materials are barricades made from?'),
    h(
      'p',
      null,
      'Barricades come in three primary constructions: steel frame with plastic or reflective rails (most common, most durable), all-plastic (lightweight, portable, weather-resistant), and water-filled barriers (popular for events and crowd control, not MUTCD traffic closures).',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Steel frame barricades'), ' - Galvanized or powder-coated steel uprights with three plastic or reflective rails. Most durable, heaviest (100-150 lbs), best for long-term highway work. Cost: $15-$30/month to rent.'),
      h('li', null, h('strong', null, 'Plastic barricades'), ' - All-plastic frame and rails, usually orange or white. Lightweight (30-50 lbs), portable, affordable. Durability depends on material quality. Cost: $10-$20/month to rent.'),
      h('li', null, h('strong', null, 'Water-filled barriers'), ' - Interlocking plastic units filled with water or sand. Popular for events, pedestrian diversions, and parking lot control. Not typically MUTCD-approved for traffic closures but legal for crowd control. Cost: $5-$15/month to rent.'),
    ),
    h('h2', null, 'How do I choose the right barricade type for my job?'),
    h(
      'p',
      null,
      'Use this simple decision tree: (1) What is the posted speed limit? (2) How many days will the barricade be deployed? (3) Is the work during day, night, or both? (4) Is it a lane closure or a complete road closure?',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Speed up to 25 mph, daytime only, 1-2 days'), ' → Type I (plastic is fine)'),
      h('li', null, h('strong', null, 'Speed 25-45 mph, any time, 2-5 days'), ' → Type II (steel preferred, plastic acceptable)'),
      h('li', null, h('strong', null, 'Speed 45+ mph, nighttime or long-term (5+ days)'), ' → Type III (steel required, high-intensity reflectivity)'),
      h('li', null, h('strong', null, 'Pedestrian diversion, event traffic, parking'), ' → Water-filled or crowd control barriers'),
    ),
    h('h2', null, 'What is the difference between engineer-grade and high-intensity reflectivity?'),
    h(
      'p',
      null,
      'Engineer Grade (EG) reflective sheeting is acceptable for daytime work and low-speed roads (up to 35 mph). High Intensity (HI) is required for nighttime work and speeds above 45 mph. HI reflectivity is 3-5 times brighter than EG. Always request HI for night work or highway closures.',
    ),
    h('h2', null, 'What should I ask a local rental provider before booking?'),
    h(
      'p',
      null,
      'Questions to ask: (1) Do you stock Type I, II, and III barricades? (2) Are they MUTCD-compliant and NCHRP 350 or MASH crash-tested? (3) Is reflectivity Engineer Grade or High Intensity? (4) Does the rental include delivery and pickup within [your distance]? (5) What is the backup plan if a barricade is damaged on-site? (6) Are there minimum rental periods or volume discounts? (7) Do you offer setup labor, or must I do it? (8) Can you handle rush orders if I need extras mid-project?',
    ),
    h('h2', null, 'How many barricades do I need for a lane closure?'),
    h(
      'p',
      null,
      'MUTCD requires barricades spaced per traffic speed: 100 feet apart at 25 mph, 200 feet apart at 45 mph, and 300 feet apart at 55+ mph. A typical lane taper on a two-lane road at 45 mph needs 5-8 barricades per side (advance warning + transition zone). A highway lane closure needs 10-15 per side. Your traffic control plan should specify exact placement.',
    ),
    h('h2', null, 'Can I use barricades for pedestrian control?'),
    h(
      'p',
      null,
      'Yes. Pedestrian barricades (often called "crowd control" or "event barricades") are shorter (24-36 inches), lighter, and sometimes made of interlocking plastic. They are suitable for sidewalk diversions, event traffic, and crowd control but are not designed for vehicle traffic. Never use pedestrian barricades for road closures.',
    ),
  ),
  faqs: [
    {
      q: 'Can I mix Type I and Type III barricades on the same job?',
      a: 'Not recommended. MUTCD requires uniform types along a closure. Mixing looks unprofessional and may violate state DOT standards. If you need to add barricades mid-job, upgrade to all Type II or Type III.',
    },
    {
      q: 'What happens if a barricade gets hit by a vehicle?',
      a: 'Well-designed barricades (NCHRP 350 or MASH-tested) are designed to be struck and deflect or absorb the impact safely. Steel barricades are repairable; plastic ones may need replacement. Always report strikes to the rental company and check for damage before continuing.',
    },
    {
      q: 'Do I need a separate permit to deploy barricades?',
      a: 'Most public road work requires a work zone permit from the local DOT or road authority. Private work (parking lots, driveways) may not. Always check with your local jurisdiction.',
    },
    {
      q: 'How do I transport barricades if I don\'t have a truck?',
      a: 'Ask your rental provider about delivery service. They can deploy and retrieve barricades for an additional fee (typically $150-$300 per drop). This is often cheaper and easier than renting a truck.',
    },
    {
      q: 'Are plastic barricades as strong as steel?',
      a: 'No. Plastic barricades are lighter and more affordable but less durable and less crashworthy. Steel is preferred for high-speed, long-term, and nighttime work. For short, low-speed daytime work, plastic is acceptable and cheaper.',
    },
    {
      q: 'Can I use a jersey barrier instead of MUTCD barricades?',
      a: 'Jersey barriers are concrete or plastic dividers designed for highway lane shifts. They are heavier, more permanent, and more expensive to deploy. They are not interchangeable with barricades. Barricades are portable and temporary; jersey barriers are semi-permanent. Use barricades unless your DOT specifically requires a jersey barrier.',
    },
    {
      q: 'What is a "break-away" barricade?',
      a: 'A break-away barricade is designed to yield or separate upon impact, reducing injury and vehicle damage. Many modern MASH-tested barricades are break-away systems. This is a safety feature, not a defect.',
    },
    {
      q: 'How long can a rented barricade stay on my site?',
      a: 'Rental terms are typically daily, weekly, or monthly. Long-term deployments (60+ days) may have contract rates. Ask your provider about project-based pricing if the work is ongoing.',
    },
  ],
  relatedProducts: [
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Cones, Drums & Channelizers', path: '/category/cones-drums' },
    { label: 'Pedestrian & Crowd Control', path: '/category/pedestrian-control' },
    { label: 'Signs & Sign Stands', path: '/category/signs-sign-stands' },
  ],
  relatedArticles: ['uniform-traffic-control-devices-mutcd-guide', 'arrow-board-rental-guide'],
}
