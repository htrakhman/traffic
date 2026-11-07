import '../styles/site.css'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
import HomeHeader from '../components/home/HomeHeader'
import Hero from '../components/home/Hero'
import TopSellers from '../components/home/TopSellers'
import {
  DeliveryAreas,
  GuidesAndTools,
  HOME_CATEGORIES,
  HowItWorks,
  PopularProducts,
  ShopByCategory,
  ShopByJob,
} from '../components/home/HomeSections'
import QuoteSection from '../components/home/QuoteSection'
import HomeFaq, { HOME_FAQ } from '../components/home/HomeFaq'
import HomeFooter from '../components/home/HomeFooter'

export default function Home() {
  return (
    <div className="tcs-site font-tcsBody">
      <SEO
        title="Crowd Control Barricades & Water-Filled Barriers for Sale | Traffic Control Supply"
        description="Steel crowd control barricades, water-filled barriers, traffic cones, delineators and temporary fence for sale. Wholesale and retail, delivered nationwide from New Jersey. Get a quote."
        canonicalPath="/"
      />
      <JsonLd data={schema.organization()} />
      <JsonLd data={schema.website()} />
      <JsonLd data={schema.service()} />
      <JsonLd data={schema.itemList(HOME_CATEGORIES.map((c) => ({ name: c.name, path: c.path })))} />
      <JsonLd data={schema.faqPage(HOME_FAQ)} />

      <HomeHeader />
      <main>
        <Hero />
        <TopSellers />
        <ShopByCategory />
        <ShopByJob />
        <PopularProducts />
        <HowItWorks />
        <QuoteSection />
        <GuidesAndTools />
        <DeliveryAreas />
        <HomeFaq />
      </main>
      <HomeFooter />
    </div>
  )
}
