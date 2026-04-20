import SEO from '../components/seo/SEO'
import Hero from '../components/home/Hero'
import CategoryGrid from '../components/home/CategoryGrid'
import FeaturedProducts from '../components/home/FeaturedProducts'
import TrustBar from '../components/home/TrustBar'
import HowItWorks from '../components/home/HowItWorks'
import { DEFAULT_PAGE_TITLE, SITE_DOMAIN } from '../config/site'

export default function Home() {
  return (
    <main>
      <SEO
        title={DEFAULT_PAGE_TITLE}
        description={`Rent MUTCD-aware traffic control and safety equipment with delivery. Cones, signs, barricades, arrow boards, and more at ${SITE_DOMAIN}.`}
        canonicalPath="/"
      />
      <Hero />
      {/* Marketplace visible immediately on load — categories right below hero */}
      <CategoryGrid />
      <FeaturedProducts />
      <TrustBar />
      <HowItWorks />
    </main>
  )
}
