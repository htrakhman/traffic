import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "traffic safety supply" (~5,000/mo, High comp, $13.57 bid).
 * Pillar guide angle - what to look for in a TC supplier, how stocked
 * inventory + same-day delivery beats catalog-and-ship for NJ contractors.
 */
export const articleTrafficSafetySupplyBuyingGuide: Article = {
  slug: 'traffic-safety-supply-buying-guide',
  title: 'Traffic Safety Supply: How to Pick a Supplier in 2026',
  excerpt:
    'A traffic safety supply company sells the cones, barricades, signs, and channelizers that go into MUTCD-compliant work zones. Not every supplier is equal - here is what separates a yard you can call at 6 a.m. from a catalog drop-shipper.',
  metaDescription:
    'Traffic safety supply guide for contractors. What a real supplier stocks, how same-day delivery works, and what questions to ask before placing your first order in NJ.',
  primaryKeyword: 'traffic safety supply',
  secondaryKeywords: [
    'traffic safety supplies',
    'traffic safety supplier',
    'traffic safety company',
    'traffic safety equipment',
    'traffic control supply',
    'work zone supply',
    'roadway safety supply',
  ],
  targetVolume: 5000,
  datePublished: '2026-05-06',
  readMinutes: 8,
  body: h(
    Fragment,
    null,
    h(
      'p',
      { className: 'lead' },
      'A ',
      h('strong', null, 'traffic safety supply company sells the gear that goes into MUTCD-compliant work zones'),
      ' - cones, drums, barricades, signs, channelizers, arrow boards, flagger gear, and the small stuff like flags, paddles, and reflective vests. The supplier you pick decides whether your foreman waits two days for a sign stand or has it on the truck the same morning. This is what to evaluate.',
    ),

    h('h2', null, 'What a real traffic safety supply yard stocks'),
    h(
      'p',
      null,
      'A working yard stocks roughly six categories at any given time. If a supplier cannot show you all six in inventory the day you call, they are probably reselling out of a distant warehouse and quoting drop-ship lead times.',
    ),
    h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Channelizing devices: '), '28" and 36" traffic cones in 7 lb and 10 lb base weights, traffic drums (Type II), tubular markers, and vertical panels. The 36" cone is the line in the sand - if a yard does not stock 36" cones, they cannot serve roadway work above 45 mph.'),
      h('li', null, h('strong', null, 'Barricades: '), 'Type I and Type II A-frames, Type III barricades for road closures, plastic water-fillable barriers, and crowd-control / bike-rack barricades for events. Real yards stock at least the Type I/II/III set in quantity - those are the daily MUTCD shapes.'),
      h('li', null, h('strong', null, 'Signs and stands: '), 'standard MUTCD warning signs (W series), regulatory signs (R series), guide signs, and the spring-base or X-base sign stands that hold them up. A good supplier stocks the most-used signs (Road Work Ahead, Lane Closed, Detour, Flagger Ahead) cut and ready, plus blanks for custom prints.'),
      h('li', null, h('strong', null, 'Tape and tagging: '), 'caution tape, danger tape, barricade tape, detectable underground tape, and reflective marking tape. These wear out fast on real jobs - expect to reorder monthly.'),
      h('li', null, h('strong', null, 'Personal protection: '), 'Class 2 and Class 3 ANSI 107 vests, hard hats, and traffic paddles for flaggers. Many crews source these elsewhere, but a one-stop supplier reduces purchase-order overhead.'),
      h('li', null, h('strong', null, 'Smart-zone equipment: '), 'arrow boards, portable changeable message signs (PCMS), automated flagger assistance devices (AFAD), and speed-feedback trailers. Most contractors rent these from the same supplier instead of buying because the capex is high.'),
    ),

    h('h2', null, 'The five questions that separate suppliers'),
    h('p', null, 'Three questions tell you whether the company on the other end of the phone is a real supplier or a website. Two more tell you whether they will be useful when something goes wrong.'),

    h('h3', null, '1. "Can I pick up 30 cones in the next two hours?"'),
    h('p', null, 'Real yards say yes. Drop-shippers say "we can have those in 3-5 business days." If the answer is anything other than a same-day yes for ordinary cones and Type I barricades, the supplier is not stocking inventory locally and you are paying for warehouse transit time on top of price.'),

    h('h3', null, '2. "Do you carry the 36" cones with two reflective collars?"'),
    h('p', null, 'This is the litmus question for whether the supplier serves contractors or homeowners. The 36" cone with a 6" + 4" collar pair is the MUTCD requirement for any roadway 45 mph or above. A supplier that only stocks 18"-28" parking cones is selling to facility-management buyers, not roadway crews.'),

    h('h3', null, '3. "Can you deliver to a job site, not an address?"'),
    h(
      'p',
      null,
      'Job-site delivery means the driver finds your foreman at the work zone (often without a street number) and drops the gear where the truck can stage it. Catalog suppliers ship to a billing address. The difference matters when your crew is set up at MP 31 on Route 1 and the order needs to land at the cone-up point. ',
      h('a', { href: '/quote' }, 'Request a job-site quote'),
      ' if you want to see how this is priced in practice.',
    ),

    h('h3', null, '4. "What is the lead time on a custom-printed sign?"'),
    h('p', null, 'A real supplier can quote you 24-72 hours on a vinyl-overlay or printed-aluminum sign because they have the cutter and printer in-house, or a partner two miles away. Drop-shippers quote 2-3 weeks because the file goes to a third-party printer. If your project plan calls for project-specific signs (company logo, specific detour wording, reflective sheeting type), the supplier turnaround time is on your critical path.'),

    h('h3', null, '5. "Who do I call when a barricade gets hit at 2 a.m.?"'),
    h('p', null, 'Roadway gear gets damaged. A supplier with an after-hours line and a yard staffed by a foreman (not a call center) can dispatch replacement cones, drums, or barricades in time for the morning shift. Ask explicitly. If the answer is "open a ticket on the website," plan for at least one full shift of downtime per incident.'),

    h('h2', null, 'Buy vs rent: when each makes sense'),
    h('p', null, 'Most NJ contractors run a hybrid model. Cones, signs, tape, vests, and small barricades are bought outright because they are consumable and you need them on every job. Arrow boards, PCMS, AFAD units, and crash trucks are rented per-project because the capex is large and utilization is uneven.'),
    h(
      'div',
      { className: 'overflow-x-auto my-4' },
      h(
        'table',
        { className: 'min-w-full text-sm border-collapse' },
        h(
          'thead',
          null,
          h('tr', null,
            h('th', { className: 'text-left p-2 border-b' }, 'Item'),
            h('th', { className: 'text-left p-2 border-b' }, 'Typical decision'),
            h('th', { className: 'text-left p-2 border-b' }, 'Why'),
          ),
        ),
        h('tbody', null,
          h('tr', null, h('td', { className: 'p-2' }, '28"/36" cones'), h('td', { className: 'p-2' }, 'Buy'), h('td', { className: 'p-2' }, 'Used daily, payback in 3-4 jobs')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type I/II barricades'), h('td', { className: 'p-2' }, 'Buy'), h('td', { className: 'p-2' }, 'Same logic as cones')),
          h('tr', null, h('td', { className: 'p-2' }, 'Type III road closures'), h('td', { className: 'p-2' }, 'Buy if monthly use'), h('td', { className: 'p-2' }, 'Bulky to store - rent for one-off shutdowns')),
          h('tr', null, h('td', { className: 'p-2' }, 'Arrow boards'), h('td', { className: 'p-2' }, 'Rent'), h('td', { className: 'p-2' }, '$8K-$15K capex, low utilization')),
          h('tr', null, h('td', { className: 'p-2' }, 'AFAD / PCMS'), h('td', { className: 'p-2' }, 'Rent'), h('td', { className: 'p-2' }, 'High capex, project-specific')),
          h('tr', null, h('td', { className: 'p-2' }, 'Sign stands'), h('td', { className: 'p-2' }, 'Buy'), h('td', { className: 'p-2' }, 'Cheap, breakable, always need spares')),
        ),
      ),
    ),

    h('h2', null, 'Pricing benchmarks for 2026'),
    h('p', null, 'Use these as a sanity check. If a supplier quotes you double these numbers, they are pricing for casual buyers, not contractor accounts. If a supplier quotes you half, suspect quality - usually thin-wall cones, light bases, or non-DOT-grade reflective sheeting.'),
    h('ul', null,
      h('li', null, '28" 7 lb cone with 6" collar: $22-$32 each in case quantities'),
      h('li', null, '36" 10 lb cone with 6"+4" collars: $32-$48'),
      h('li', null, 'Type I A-frame barricade: $50-$80'),
      h('li', null, 'Type III triple-rail barricade: $180-$280'),
      h('li', null, 'Standard W20-1 "Road Work Ahead" sign on aluminum: $60-$95'),
      h('li', null, 'Spring-base sign stand: $70-$120'),
      h('li', null, 'Class 2 ANSI vest: $14-$22'),
    ),

    h('h2', null, 'Building a starter package'),
    h('p', null, 'A new contractor doing local-road work in NJ - utility cuts, residential paving, parking-lot striping - can start with the following loadout for one truck. Adjust counts up for crew size.'),
    h('ul', null,
      h('li', null, '24x 28" cones (7 lb base)'),
      h('li', null, '6x Type I A-frame barricades'),
      h('li', null, '4x sign stands'),
      h('li', null, '2x Road Work Ahead, 2x Lane Closed Ahead, 2x Flagger Ahead, 1x Detour signs'),
      h('li', null, '2x rolls caution tape, 1x roll danger tape'),
      h('li', null, '4x Class 2 vests, 4x hard hats, 2x flagger paddles'),
    ),
    h('p', null, 'Total budget for the above is roughly $1,200-$1,800 depending on quality grade. Browse our full ',
      h('a', { href: '/category/cones' }, 'cones inventory'), ', ',
      h('a', { href: '/category/barricades' }, 'barricades'), ', and ',
      h('a', { href: '/category/signs' }, 'signs'),
      ' to spec your kit, or use the ',
      h('a', { href: '/assistant' }, 'AI Assistant'),
      ' to size a kit by job type.',
    ),

    h('h2', null, 'Red flags when shopping'),
    h('ul', null,
      h('li', null, h('strong', null, 'No physical address: '), 'a supplier without a yard is a reseller. Their lead times depend on their wholesaler\'s lead times.'),
      h('li', null, h('strong', null, 'Catalog-only ordering: '), 'if you cannot get a foreman on the phone in two rings, you cannot get an emergency replacement order in two rings either.'),
      h('li', null, h('strong', null, 'Vague reflective specs: '), 'cones must use ASTM D4956 Type IV or higher sheeting for nighttime use. If the listing does not name the sheeting type, assume the cheapest grade.'),
      h('li', null, h('strong', null, 'No NJDOT delivery experience: '), 'jobs on state routes have specific staging rules. A supplier that has never delivered to NJDOT or NJTA right-of-way will get turned away at the gate.'),
    ),

    h('h2', null, 'Working with Traffic Control Supply'),
    h('p', null, 'We stock everything in the six categories above out of our Central NJ yard, run same-day delivery in Middlesex / Monmouth / Mercer / Somerset / Union / Hunterdon / northern Ocean counties, and answer the phone after hours. Set up a contractor account once and orders ship without a credit card swipe each time.'),
  ),
  faqs: [
    {
      q: 'What is the difference between a traffic safety supply company and a traffic control rental company?',
      a: 'A supply company sells equipment outright - you own it and use it across jobs. A rental company leases it for a project window and picks it up after. Most contractors buy consumables (cones, signs, barricades) from a supplier and rent only the high-capex items (arrow boards, PCMS, AFAD, crash trucks). Traffic Control Supply now operates as a buy/sell + delivery model after pivoting from rental in April 2026.',
    },
    {
      q: 'Do I need an account to order traffic safety supplies?',
      a: 'For one-off small orders, no - any reputable supplier will sell to walk-ins. For repeat orders, a contractor account gets you net-30 terms, line-of-credit pricing, and faster phone-order checkout. Setting up an account usually requires a W-9 and trade references.',
    },
    {
      q: 'How much should a starter kit for a small NJ contractor cost?',
      a: 'A one-truck starter kit (24 cones, 6 Type I barricades, 4 sign stands, the 5-6 most-used signs, vests, tape) runs about $1,200-$1,800 in 2026 prices. Pricing scales linearly per truck after that.',
    },
    {
      q: 'Are traffic safety supplies tax-exempt for contractors?',
      a: 'In NJ, tax exemption depends on what the equipment is used for and who is paying. Equipment installed permanently on a public-works contract is often exempt; equipment used on private commercial work is generally not. Bring an ST-3 or ST-13 form to your supplier if applicable. We do not give tax advice - confirm with your accountant.',
    },
    {
      q: 'Can a traffic safety supplier help me design a work-zone layout?',
      a: 'A good one will spec the gear given your job description and provide a typical-application diagram from MUTCD Part 6. They will not stamp a TTC plan - that is on the contractor or a licensed PE. Our AI Job Planner generates MUTCD-compliant layouts you can use as a starting point with your engineer.',
    },
    {
      q: 'What is the busiest day of the year for traffic safety suppliers?',
      a: 'Late March through early May is peak in NJ - frost laws lift, paving season starts, and contractors restock all consumables. Order early in the season; lead times stretch from 2 days to 2 weeks once spring is in full swing.',
    },
  ],
  relatedProducts: [
    { label: 'Traffic Cones', path: '/category/cones' },
    { label: 'Barricades', path: '/category/barricades' },
    { label: 'Signs', path: '/category/signs' },
    { label: 'Get a Job Quote', path: '/quote' },
  ],
  relatedArticles: [
    'traffic-safety-stores-buying-guide',
    'safety-cones-buying-guide',
    'traffic-barricades-pillar-guide',
  ],
}
