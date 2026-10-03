import QuoteForm from '../buyer/QuoteForm'
import { SITE_CONTACT_EMAIL, SITE_CONTACT_PHONE_DISPLAY, SITE_CONTACT_PHONE_E164 } from '../../config/site'

export default function QuoteSection() {
  return (
    <section id="quote" className="scroll-mt-20 bg-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">Get a quote</p>
          <h2 className="mt-3 font-tcsDisplay text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Send us your list. We'll send back a price.
          </h2>
          <p className="mt-5 text-muted">
            Wholesale or retail, one item or a full work zone. Include quantities and where it's
            going, and we'll quote it with delivery included.
          </p>
          <div className="mt-8 space-y-3 text-ink">
            <p className="text-sm text-muted">Rather talk it through?</p>
            <a href={`tel:${SITE_CONTACT_PHONE_E164}`} className="tcs-mono block text-lg hover:text-zone">
              {SITE_CONTACT_PHONE_DISPLAY}
            </a>
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="tcs-mono block hover:text-zone">
              {SITE_CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <QuoteForm
          productCategory="Homepage quote"
          heading="Request a quote"
          orderTypes={['Retail', 'Wholesale']}
        />
      </div>
    </section>
  )
}
