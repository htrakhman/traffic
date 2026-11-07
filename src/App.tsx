import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { usePostHog } from '@posthog/react'
import Home from './pages/Home'
import BlogLayout from './components/blog/BlogLayout'
import TrafficSafetySupplies from './pages/buyers/TrafficSafetySupplies'
import TrafficConesForSale from './pages/buyers/TrafficConesForSale'
import TrafficControlEquipment from './pages/buyers/TrafficControlEquipment'
import TrafficSafetyEquipment from './pages/buyers/TrafficSafetyEquipment'
import Barricades from './pages/buyers/Barricades'
import ArrowBoards from './pages/buyers/ArrowBoards'
import ChannelizingDrums from './pages/buyers/ChannelizingDrums'
import WorkZoneSigns from './pages/buyers/WorkZoneSigns'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import LocationPage from './pages/LocationPage'
import ComparisonPage from './pages/ComparisonPage'
import BarricadeCalculator from './pages/tools/BarricadeCalculator'
import ConeTaperCalculator from './pages/tools/ConeTaperCalculator'
import { About, Contact, Shipping, Wholesale } from './pages/InfoPages'

const Blog = lazy(() => import('./pages/Blog'))
const Article = lazy(() => import('./pages/Article'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function GuidesSlugRedirect() {
  const { slug } = useParams()
  if (!slug) return <Navigate to="/blog" replace />
  return <Navigate to={`/blog/${slug}`} replace />
}

/** SPA route changes: capture $pageview when PostHog is enabled (see `main.tsx`). */
function PostHogPageview() {
  const client = usePostHog()
  const location = useLocation()
  useEffect(() => {
    client?.capture('$pageview')
  }, [client, location.pathname, location.search])
  return null
}

export default function App() {
  const hasPostHogToken = Boolean(
    import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN ?? import.meta.env.NEXT_PUBLIC_POSTHOG_KEY
  )

  return (
    <BrowserRouter>
      <ScrollToTop />
      {hasPostHogToken ? <PostHogPageview /> : null}
      <Routes>
        {/* Wholesale + retail landing page. */}
        <Route path="/" element={<Home />} />

        {/* Category pages. Each ends in the quote form. */}
        <Route path="/traffic-safety-supplies" element={<TrafficSafetySupplies />} />
        <Route path="/traffic-cones-for-sale" element={<TrafficConesForSale />} />
        <Route path="/traffic-control-equipment" element={<TrafficControlEquipment />} />
        <Route path="/traffic-safety-equipment" element={<TrafficSafetyEquipment />} />
        <Route path="/barricades" element={<Barricades />} />
        <Route path="/arrow-boards" element={<ArrowBoards />} />
        <Route path="/channelizing-drums" element={<ChannelizingDrums />} />
        <Route path="/work-zone-signs" element={<WorkZoneSigns />} />
        <Route path="/crowd-control-barricades" element={<CategoryPage id="crowd-control-barricades" />} />
        <Route path="/water-filled-barriers" element={<CategoryPage id="water-filled-barriers" />} />
        <Route path="/delineator-posts" element={<CategoryPage id="delineator-posts" />} />
        <Route path="/temporary-fence-panels" element={<CategoryPage id="temporary-fence-panels" />} />

        {/* Product, location, comparison, tool and trust pages. */}
        <Route path="/products/:slug" element={<ProductPage />} />
        <Route path="/delivery/:state" element={<LocationPage />} />
        <Route path="/compare/:slug" element={<ComparisonPage />} />
        <Route path="/tools/barricade-calculator" element={<BarricadeCalculator />} />
        <Route path="/tools/cone-taper-calculator" element={<ConeTaperCalculator />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shipping-and-delivery" element={<Shipping />} />
        <Route path="/wholesale" element={<Wholesale />} />

        {/* Work zone guides — pre-existing content, kept live. */}
        <Route
          path="/blog"
          element={
            <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
              <BlogLayout>
                <Blog />
              </BlogLayout>
            </Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
              <BlogLayout>
                <Article />
              </BlogLayout>
            </Suspense>
          }
        />
        <Route path="/guides" element={<Navigate to="/blog" replace />} />
        <Route path="/guides/:slug" element={<GuidesSlugRedirect />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
