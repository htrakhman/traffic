import type { ReactNode } from 'react'
import BuyerLayout from '../components/buyer/BuyerLayout'
import QuoteForm from '../components/buyer/QuoteForm'
import BuyerFAQ from '../components/buyer/BuyerFAQ'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
import { SITE_CONTACT_EMAIL, SITE_NAME } from '../config/site'
import { STATES } from '../data/locations'

function InfoLayout({
  path,
  title,
  description,
  eyebrow,
  h1,
  children,
  faqs,
  quoteLabel,
}: {
  path: string
  title: string
  description: string
  eyebrow: string
  h1: string
  children: ReactNode
  faqs?: { q: string; a: string }[]
  quoteLabel: string
}) {
  return (
    <BuyerLayout>
      <SEO title={title} description={description} canonicalPath={path} />
      <JsonLd
        data={schema.breadcrumb([
          { name: 'Home', path: '/' },
          { name: eyebrow, path },
        ])}
      />
      {faqs && <JsonLd data={schema.faqPage(faqs)} />}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">{eyebrow}</p>
            <h1 className="mt-3 font-tcsDisplay text-4xl font-bold leading-tight text-ink sm:text-5xl">{h1}</h1>
            <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink/90">{children}</div>
            {faqs && (
              <div className="mt-12">
                <h2 className="font-tcsDisplay text-2xl font-bold text-ink">Questions</h2>
                <div className="mt-6">
                  <BuyerFAQ items={faqs} />
                </div>
              </div>
            )}
          </div>
          <div>
            <QuoteForm productCategory={quoteLabel} anchorId="quote" orderTypes={['Retail', 'Wholesale']} />
          </div>
        </div>
      </section>
    </BuyerLayout>
  )
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="pt-4 font-tcsDisplay text-2xl font-bold text-ink">{children}</h2>
}

export function About() {
  return (
    <InfoLayout
      path="/about"
      title={`About ${SITE_NAME} | New Jersey Traffic & Crowd Control Equipment Supplier`}
      description={`${SITE_NAME} is a New Jersey based supplier of crowd control barricades, water-filled barriers, cones and delineators, sold wholesale and retail and delivered nationwide.`}
      eyebrow="About"
      h1="A supplier that quotes the real number"
      quoteLabel="About page"
    >
      <JsonLd data={schema.organization()} />
      <p>
        {SITE_NAME} is a New Jersey based supplier of traffic and crowd control equipment. We sell steel
        crowd control barricades, water-filled barriers, traffic cones, delineator posts and temporary
        fence to contractors, municipalities, event producers, rental companies and resellers.
      </p>
      <p>
        We do not run a warehouse full of one brand. We buy from a network of manufacturers and
        distributors across the country, compare them on every order, and send you the best delivered
        total we can confirm. That is how we keep prices low without locking you into one product line.
      </p>
      <H2>How we quote</H2>
      <p>
        Every quote is built from a confirmed supplier price plus freight to your site. We do not send a
        number we cannot stand behind, and we tell you up front about anything that changes the total:
        unloading, delivery appointments, lead time, and tax or resale paperwork.
      </p>
      <H2>Who we work with</H2>
      <ul className="list-disc space-y-1 pl-5">
        <li>General and utility contractors</li>
        <li>Towns, counties and public works departments</li>
        <li>Event, festival and venue operators</li>
        <li>Equipment rental companies and resellers</li>
      </ul>
      <p>
        Questions? Email <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="underline">{SITE_CONTACT_EMAIL}</a>.
      </p>
    </InfoLayout>
  )
}

export function Contact() {
  return (
    <InfoLayout
      path="/contact"
      title={`Contact ${SITE_NAME} | Request a Quote`}
      description={`Contact ${SITE_NAME} by email or the quote form. Send product, quantity and delivery ZIP for a delivered quote on barricades, barriers, cones and more.`}
      eyebrow="Contact"
      h1="Get in touch"
      quoteLabel="Contact page"
    >
      <p>
        The fastest way to a price is the quote form on this page. You can also email{' '}
        <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="underline">{SITE_CONTACT_EMAIL}</a>.
      </p>
      <H2>What to include</H2>
      <ul className="list-disc space-y-1 pl-5">
        <li>The item, size and quantity (or the footage you need to cover)</li>
        <li>Delivery ZIP code, or say if you want to pick up</li>
        <li>When you need it on site</li>
        <li>Whether you have a forklift or crew to unload</li>
        <li>Your resale or tax-exempt certificate, if you have one</li>
      </ul>
      <p>We are based in New Jersey and deliver nationwide.</p>
    </InfoLayout>
  )
}

const SHIPPING_FAQS = [
  {
    q: 'Is delivery included in the price?',
    a: 'Every quote shows the delivered total to your ZIP code, so there is no surprise freight line later.',
  },
  {
    q: 'Will the driver unload?',
    a: 'Most freight deliveries are curbside, and many carriers require someone on site to unload. If you need a liftgate or have no forklift, tell us when you request the quote so we can price it in.',
  },
  {
    q: 'How long does delivery take?',
    a: 'It depends on the item and the supply point. Stocked items often ship within a few business days; large or custom orders take longer. Your quote states the lead time.',
  },
  {
    q: 'Can I pick up?',
    a: 'Some supply points allow will-call pickup. Ask on your quote and we will tell you whether it is available near you.',
  },
]

export function Shipping() {
  return (
    <InfoLayout
      path="/shipping-and-delivery"
      title="Shipping & Delivery | Delivered Quotes Nationwide"
      description="How delivery works: delivered quotes to your ZIP, parcel, LTL and truckload freight, unloading, delivery appointments and will-call pickup."
      eyebrow="Shipping and delivery"
      h1="How delivery works"
      faqs={SHIPPING_FAQS}
      quoteLabel="Shipping page"
    >
      <p>
        We quote every order delivered to your site. We pick the supply point that gets the product to you
        for the lowest total, which is often not the closest warehouse, and we show you the full number
        before you commit.
      </p>
      <H2>Freight types</H2>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Parcel:</strong> small cone and delineator orders.
        </li>
        <li>
          <strong>LTL (palletized):</strong> most barricade and barrier orders, delivered curbside.
        </li>
        <li>
          <strong>Full truckload:</strong> large event and fleet orders, which carry the lowest per-unit
          freight.
        </li>
      </ul>
      <H2>Before your delivery</H2>
      <p>
        Plan for people or a forklift to unload, and tell us about tight streets, delivery windows or
        job-site rules. City deliveries often need a scheduled appointment.
      </p>
      <H2>States we serve most</H2>
      <p>
        {STATES.map((s, i) => (
          <span key={s.slug}>
            {i > 0 && ', '}
            <a href={`/delivery/${s.slug}`} className="underline hover:text-zone">
              {s.state}
            </a>
          </span>
        ))}
        , and anywhere else in the continental US by quote.
      </p>
    </InfoLayout>
  )
}

const WHOLESALE_FAQS = [
  {
    q: 'Is there a minimum order for wholesale pricing?',
    a: 'No fixed minimum. Pricing improves with volume, and full pallets and truckloads get the best rates.',
  },
  {
    q: 'Do you sell to resellers and rental companies?',
    a: 'Yes. Send your resale certificate with your first request so quotes come back without sales tax where it applies.',
  },
  {
    q: 'Can municipalities buy from you?',
    a: 'Yes. Send your tax-exempt certificate and any bid or spec sheet, and we will quote to the specification.',
  },
]

export function Wholesale() {
  return (
    <InfoLayout
      path="/wholesale"
      title="Wholesale Traffic Control Equipment | Contractor, Reseller & Municipal Pricing"
      description="Wholesale pricing on crowd control barricades, water-filled barriers, cones and delineators for contractors, rental companies, resellers and municipalities."
      eyebrow="Wholesale"
      h1="Wholesale pricing for fleets, resellers and agencies"
      faqs={WHOLESALE_FAQS}
      quoteLabel="Wholesale page"
    >
      <p>
        If you buy barricades, barriers or cones by the pallet, we will compare suppliers on every order
        and send you the best confirmed delivered total, with volume pricing built in.
      </p>
      <H2>Who qualifies</H2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Rental companies building or refreshing a fleet</li>
        <li>Resellers and safety distributors</li>
        <li>Contractors stocking multiple crews</li>
        <li>Towns, counties, schools and public agencies</li>
      </ul>
      <H2>What to send</H2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Products and quantities, or a full equipment list</li>
        <li>Delivery ZIP codes and timing</li>
        <li>Resale or tax-exempt certificate</li>
        <li>Any spec, bid or approved-product requirement</li>
      </ul>
    </InfoLayout>
  )
}
