import { useState, useCallback } from 'react'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
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
        description={`Traffic control supplies without the markup. Cones, barricades, drums, signs, vests, wheel chocks, speed bumps, and parking lot safety at ${SITE_DOMAIN}.`}
        canonicalPath="/"
      />
      <JsonLd data={schema.organization()} />
      <JsonLd data={schema.website()} />
      <Hero
        browseSearchQuery={browseSearchQuery}
        browseSearchQueryDebounced={debouncedBrowseSearch}
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
