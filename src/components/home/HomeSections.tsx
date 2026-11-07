import ProductGrid from '../catalog/ProductGrid'
import { CATEGORIES, getProduct, type Product } from '../../data/catalog'
import { STATES } from '../../data/locations'
import { COMPARISONS } from '../../data/comparisons'
import { USE_CASES } from '../../data/useCases'

/** Category tiles on the homepage, in priority order. Also feeds the homepage ItemList schema. */
export const HOME_CATEGORIES = [
  ...CATEGORIES.map((c) => ({ name: c.name, path: c.path, blurb: c.description })),
  {
    name: 'Type II & Type III Barricades',
    path: '/barricades',
    blurb: 'MUTCD traffic barricades for lane and road closures, plus Type I A-frames for short work.',
  },
  {
    name: 'Channelizer Drums',
    path: '/channelizing-drums',
    blurb: 'Reflective traffic barrels with tire-ring bases for highway tapers and long work zones.',
  },
  {
    name: 'Work Zone Signs',
    path: '/work-zone-signs',
    blurb: 'Roll-up and rigid construction signs with spring stands for MUTCD advance warning.',
  },
  {
    name: 'Arrow Boards',
    path: '/arrow-boards',
    blurb: 'Solar trailer-mounted arrow boards for lane closures and mobile operations.',
  },
]

const POPULAR = [
  'steel-crowd-control-barricade-8-5-ft',
  'steel-crowd-control-barricade-6-5-ft',
  'water-filled-barrier-42-inch',
  'water-filled-barrier-with-fence-panel',
  'traffic-cone-28-inch-reflective',
  'delineator-post-42-inch-with-base',
]
  .map(getProduct)
  .filter((p): p is Product => Boolean(p))

function SectionHead({ eyebrow, title, id, children }: { eyebrow: string; title: string; id: string; children?: React.ReactNode }) {
  return (
    <>
      <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-tcsDisplay text-3xl font-bold leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {children && <p className="mt-4 max-w-3xl text-lg text-muted">{children}</p>}
    </>
  )
}

export function ShopByCategory() {
  return (
    <section id="categories" aria-labelledby="categories-heading" className="scroll-mt-20 bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHead eyebrow="Shop by category" title="Traffic and crowd control equipment for sale" id="categories-heading">
          Everything a crew, venue or town needs to close a lane, fence a site or hold a crowd line, sold by the
          piece or by the truckload.
        </SectionHead>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_CATEGORIES.map((c) => (
            <li key={c.path}>
              <a
                href={c.path}
                className="group flex h-full flex-col rounded-lg border border-line bg-paper p-5 transition hover:border-zone"
              >
                <h3 className="font-tcsDisplay text-lg font-bold text-ink group-hover:text-zone">{c.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.blurb}</p>
                <span className="tcs-mono mt-4 text-xs uppercase tracking-[0.08em] text-zone">Shop →</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ShopByJob() {
  return (
    <section aria-labelledby="jobs-heading" className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20">
        <SectionHead eyebrow="Shop by job" title="Equipment lists for common jobs" id="jobs-heading">
          Not sure what to order? Start from the job and we list what it takes.
        </SectionHead>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u) => (
            <li key={u.slug}>
              <a
                href={`/uses/${u.slug}`}
                className="block rounded-lg border border-line bg-surface px-5 py-4 font-semibold text-ink hover:border-zone hover:text-zone"
              >
                {u.h1} →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function PopularProducts() {
  return (
    <section aria-labelledby="popular-heading" className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHead eyebrow="Most requested" title="Popular products" id="popular-heading" />
        <div className="mt-10">
          <ProductGrid products={POPULAR} />
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  {
    title: 'Send your list',
    body: 'Tell us the items, quantities and delivery ZIP code, or the footage you need to cover. A rough list is fine.',
  },
  {
    title: 'We compare suppliers',
    body: 'We check manufacturers and distributors for stock, price and freight to your site, then pick the best delivered total.',
  },
  {
    title: 'Get one delivered price',
    body: 'You get a single quote with delivery, lead time and unloading needs spelled out. No surprise freight line later.',
  },
]

const AUDIENCES = [
  'Event producers, festivals, stadiums and venues',
  'General, paving and utility contractors',
  'Towns, counties, police and public works',
  'Equipment rental companies and resellers',
  'Property managers, schools and parking operators',
  'Film, TV and production crews',
]

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHead eyebrow="How ordering works" title="Wholesale pricing without the runaround" id="how-heading" />
          <ol className="mt-8 space-y-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="tcs-mono flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zone text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-tcsDisplay text-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-1 text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="font-tcsDisplay text-2xl font-bold text-ink">Who buys from us</h2>
          <ul className="mt-6 space-y-3">
            {AUDIENCES.map((a) => (
              <li key={a} className="flex items-start gap-3 text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zone" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
          <a href="/wholesale" className="mt-6 inline-block font-semibold text-zone hover:underline">
            Wholesale and fleet accounts →
          </a>
        </div>
      </div>
    </section>
  )
}

const GUIDES = [
  { label: 'How many cones for a lane closure', href: '/blog/how-many-cones-for-lane-closure-nj' },
  { label: 'Water-filled barrier buying guide', href: '/blog/water-filled-barriers-buying-guide' },
  { label: 'Type I vs Type II vs Type III barricades', href: '/blog/type-iii-barricade-vs-type-i-type-ii' },
  { label: 'MUTCD taper length formula', href: '/blog/mutcd-taper-length-formula-nj' },
]

export function GuidesAndTools() {
  return (
    <section aria-labelledby="guides-heading" className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHead eyebrow="Plan the job" title="Calculators and buying guides" id="guides-heading">
          Free tools and plain-English guides for sizing a barricade line, laying out a lane closure and picking
          the right barrier.
        </SectionHead>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-tcsDisplay text-lg font-bold text-ink">Calculators</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="/tools/barricade-calculator" className="text-ink underline hover:text-zone">
                  Crowd control barricade calculator
                </a>
              </li>
              <li>
                <a href="/tools/cone-taper-calculator" className="text-ink underline hover:text-zone">
                  Cone taper and lane closure calculator
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-tcsDisplay text-lg font-bold text-ink">Comparisons</h3>
            <ul className="mt-3 space-y-2">
              {COMPARISONS.map((c) => (
                <li key={c.slug}>
                  <a href={`/compare/${c.slug}`} className="text-ink underline hover:text-zone">
                    {c.h1.charAt(0).toUpperCase() + c.h1.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-tcsDisplay text-lg font-bold text-ink">Popular guides</h3>
            <ul className="mt-3 space-y-2">
              {GUIDES.map((g) => (
                <li key={g.href}>
                  <a href={g.href} className="text-ink underline hover:text-zone">
                    {g.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/glossary" className="text-ink underline hover:text-zone">
                  Traffic control glossary
                </a>
              </li>
              <li>
                <a href="/blog" className="font-semibold text-zone hover:underline">
                  All guides →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function DeliveryAreas() {
  return (
    <section aria-labelledby="delivery-heading" className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHead eyebrow="Where we deliver" title="Based in New Jersey, delivering nationwide" id="delivery-heading">
          We quote delivered pricing to any ZIP code in the continental US, sourcing from the supply point that gets
          your order there for the lowest total.
        </SectionHead>
        <ul className="mt-8 flex flex-wrap gap-3">
          {STATES.map((s) => (
            <li key={s.slug}>
              <a
                href={`/delivery/${s.slug}`}
                className="inline-block rounded-md border border-line bg-paper px-4 py-2 text-sm text-ink hover:border-zone"
              >
                {s.state}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/shipping-and-delivery"
              className="inline-block rounded-md px-4 py-2 text-sm font-semibold text-zone hover:underline"
            >
              How delivery works →
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
