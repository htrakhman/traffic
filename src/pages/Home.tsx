import '../styles/site.css'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
import HomeHeader from '../components/home/HomeHeader'
import Hero, { HERO_IMAGES } from '../components/home/Hero'
import TopSellers, { TOP_SELLERS } from '../components/home/TopSellers'
import QuoteSection from '../components/home/QuoteSection'
import HomeFaq, { HOME_FAQ } from '../components/home/HomeFaq'
import HomeFooter from '../components/home/HomeFooter'

const PRODUCT_IMAGES: Record<string, string> = {
  'metal-crowd-control-barricades': HERO_IMAGES.crowdBarricade,
  'water-filled-barriers': HERO_IMAGES.waterBarrier,
}

export default function Home() {
  return (
    <div className="tcs-site font-tcsBody">
      <SEO
        title="Metal Crowd Control Barricades & Water Filled Barriers | Wholesale & Retail"
        description="Buy metal crowd control barricades (galvanized bike rack barricades) and water filled barriers at the best price online. Wholesale and retail, shipped nationwide. Get a quote."
        canonicalPath="/"
      />
      <JsonLd data={schema.organization()} />
      <JsonLd data={schema.website()} />
      <JsonLd data={schema.service()} />
      {TOP_SELLERS.map((p) => (
        <JsonLd
          key={p.id}
          data={schema.product({
            name: p.name,
            description: p.description,
            slug: `#${p.id}`,
            image: PRODUCT_IMAGES[p.id],
            category: p.id === 'water-filled-barriers' ? 'Traffic barriers' : 'Crowd control barricades',
          })}
        />
      ))}
      <JsonLd data={schema.faqPage(HOME_FAQ)} />

      <HomeHeader />
      <main>
        <Hero />
        <TopSellers />
        <QuoteSection />
        <HomeFaq />
      </main>
      <HomeFooter />
    </div>
  )
}
