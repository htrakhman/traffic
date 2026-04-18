import Hero from '../components/home/Hero'
import CategoryGrid from '../components/home/CategoryGrid'
import FeaturedProducts from '../components/home/FeaturedProducts'
import TrustBar from '../components/home/TrustBar'
import HowItWorks from '../components/home/HowItWorks'

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Marketplace visible immediately on load — categories right below hero */}
      <CategoryGrid />
      <FeaturedProducts />
      <TrustBar />
      <HowItWorks />
    </main>
  )
}
