import { useState, useCallback } from 'react'
import SEO from '../components/seo/SEO'
import Hero from '../components/home/Hero'
import CategoryGrid from '../components/home/CategoryGrid'
import FeaturedProducts from '../components/home/FeaturedProducts'
import TrustBar from '../components/home/TrustBar'
import HowItWorks from '../components/home/HowItWorks'
import { DEFAULT_PAGE_TITLE, SITE_DOMAIN } from '../config/site'
import { useDebouncedString } from '../hooks/useDebouncedString'

export default function Home() {
  const [browseSearchQuery, setBrowseSearchQuery] = useState('')
  const onBrowseSearchClear = useCallback(() => setBrowseSearchQuery(''), [])
  /** Debounced filter text keeps the product grid from repainting on every keystroke. */
  const debouncedBrowseSearch = useDebouncedString(browseSearchQuery, 100)

  return (
    <main>
      <SEO
        title={DEFAULT_PAGE_TITLE}
        description={`Rent MUTCD-aware traffic control and safety equipment with delivery. Cones, signs, barricades, arrow boards, and more at ${SITE_DOMAIN}.`}
        canonicalPath="/"
      />
      <Hero
        browseSearchQuery={browseSearchQuery}
        onBrowseSearchQueryChange={setBrowseSearchQuery}
        onBrowseSearchClear={onBrowseSearchClear}
      />
      {/* Marketplace visible immediately on load — categories right below hero */}
      <CategoryGrid
        liveSearchQuery={debouncedBrowseSearch}
        liveSearchDisplayQuery={browseSearchQuery}
      />
      {browseSearchQuery.trim() ? null : <FeaturedProducts />}
      <TrustBar />
      <HowItWorks />
    </main>
  )
}
