import '../styles/site.css'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
import { DEFAULT_PAGE_TITLE } from '../config/site'
import HomeHeader from '../components/home/HomeHeader'
import Hero from '../components/home/Hero'
import TwoWays from '../components/home/TwoWays'
import WhyUs from '../components/home/WhyUs'
import WhoWeServe from '../components/home/WhoWeServe'
import HowItWorks from '../components/home/HowItWorks'
import HomeFAQ, { HOME_FAQS } from '../components/home/HomeFAQ'
import QuoteSection from '../components/home/QuoteSection'
import HomeFooter from '../components/home/HomeFooter'

export default function Home() {
  return (
    <div className="tcs-site font-tcsBody">
      <SEO
        title={`${DEFAULT_PAGE_TITLE} — Wholesale & Retail`}
        description="Wholesale and retail traffic control equipment: cones, drums, barricades, signs, arrow boards and barriers for contractors, municipalities, rental companies and resellers. Get a quote."
        canonicalPath="/"
      />
      <JsonLd data={schema.organization()} />
      <JsonLd data={schema.website()} />
      <JsonLd data={schema.service()} />
      <JsonLd data={schema.faqPage(HOME_FAQS)} />

      <HomeHeader />
      <main>
        <Hero />
        <TwoWays />
        <WhyUs />
        <WhoWeServe />
        <HowItWorks />
        <HomeFAQ />
        <QuoteSection />
      </main>
      <HomeFooter />
    </div>
  )
}
