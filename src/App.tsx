import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { usePostHog } from '@posthog/react'
import SupplierHome from './pages/SupplierHome'
import BlogLayout from './components/blog/BlogLayout'
import TrafficSafetySupplies from './pages/buyers/TrafficSafetySupplies'
import TrafficConesForSale from './pages/buyers/TrafficConesForSale'
import TrafficControlEquipment from './pages/buyers/TrafficControlEquipment'
import TrafficSafetyEquipment from './pages/buyers/TrafficSafetyEquipment'

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
        {/* Job A — supplier lead-gen homepage. */}
        <Route path="/" element={<SupplierHome />} />

        {/* Job B — buyer product pages. Each ends in the quote form that is the
            product: every submission is a lead sold to a supplier. */}
        <Route path="/traffic-safety-supplies" element={<TrafficSafetySupplies />} />
        <Route path="/traffic-cones-for-sale" element={<TrafficConesForSale />} />
        <Route path="/traffic-control-equipment" element={<TrafficControlEquipment />} />
        <Route path="/traffic-safety-equipment" element={<TrafficSafetyEquipment />} />

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
