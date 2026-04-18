import Hero from '../components/home/Hero'
import CategoryGrid from '../components/home/CategoryGrid'
import FeaturedProducts from '../components/home/FeaturedProducts'
import TrustBar from '../components/home/TrustBar'
import PackagesSection from '../components/home/PackagesSection'
import HowItWorks from '../components/home/HowItWorks'

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Marketplace visible immediately on load — categories right below hero */}
      <CategoryGrid />
      <FeaturedProducts />
      <TrustBar />
      <PackagesSection />
      <HowItWorks />
    </main>
  )
}
