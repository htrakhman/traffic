import '../styles/site.css'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
import { DEFAULT_PAGE_TITLE, SITE_DOMAIN } from '../config/site'
import SupplierHeader from '../components/supplier/SupplierHeader'
import SupplierFooter from '../components/supplier/SupplierFooter'
import StripeDivider from '../components/supplier/StripeDivider'
import Hero from '../components/supplier/Hero'
import Gap from '../components/supplier/Gap'
import LeadDefinition from '../components/supplier/LeadDefinition'
import Coverage from '../components/supplier/Coverage'
import FAQ, { SUPPLIER_FAQS } from '../components/supplier/FAQ'
import SignupForm from '../components/supplier/SignupForm'

export default function SupplierHome() {
  return (
    <div className="tcs-site font-tcsBody">
      <SEO
        title={`${DEFAULT_PAGE_TITLE} — Leads for Suppliers`}
        description={`We generate purchase-intent demand for traffic control and work zone safety equipment, then sell those leads to suppliers nationwide on a pay-per-lead basis. ${SITE_DOMAIN}.`}
        canonicalPath="/"
      />
      <JsonLd data={schema.organization()} />
      <JsonLd data={schema.website()} />
      <JsonLd data={schema.service()} />
      <JsonLd data={schema.faqPage(SUPPLIER_FAQS)} />

      <SupplierHeader />
      <main>
        <Hero />
        <StripeDivider />
        <Gap />
        <StripeDivider />
        <LeadDefinition />
        <StripeDivider />
        <Coverage />
        <FAQ />
        <SignupForm />
      </main>
      <SupplierFooter />
    </div>
  )
}
