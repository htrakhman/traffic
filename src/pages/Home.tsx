import '../styles/site.css'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
import HomeHeader from '../components/home/HomeHeader'
import Hero from '../components/home/Hero'
import QuoteSection from '../components/home/QuoteSection'
import HomeFooter from '../components/home/HomeFooter'

export default function Home() {
  return (
    <div className="tcs-site font-tcsBody">
      <SEO
        title="Best Priced Traffic Control Equipment Online — Wholesale & Retail"
        description="The best priced traffic control equipment on the internet. Cones, drums, barricades, signs and arrow boards, wholesale and retail. Send your list and get a quote."
        canonicalPath="/"
      />
      <JsonLd data={schema.organization()} />
      <JsonLd data={schema.website()} />
      <JsonLd data={schema.service()} />

      <HomeHeader />
      <main>
        <Hero />
        <QuoteSection />
      </main>
      <HomeFooter />
    </div>
  )
}
