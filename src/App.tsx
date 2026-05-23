import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { usePostHog } from '@posthog/react'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { MembershipProvider } from './context/MembershipContext'
import { CatalogSyncProvider } from './context/CatalogSyncContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import AIPlannerWidget from './components/ai/AIPlannerWidget'
import Home from './pages/Home'
import { LegacyCategoryRedirect, LegacyProductRedirect } from './components/routing/LegacyRedirects'

const Browse = lazy(() => import('./pages/Browse'))
const Category = lazy(() => import('./pages/Category'))
const ProductPage = lazy(() => import('./pages/Product'))
const Assistant = lazy(() => import('./pages/Assistant'))
const Quote = lazy(() => import('./pages/Quote'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const SiteMapPlanner = lazy(() => import('./pages/SiteMapPlanner'))
const Blog = lazy(() => import('./pages/Blog'))
const Article = lazy(() => import('./pages/Article'))
const Account = lazy(() => import('./pages/Account'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const SupplierSourceMap = lazy(() => import('./pages/admin/SupplierSourceMap'))
const AdminProductEdit = lazy(() => import('./pages/admin/AdminProductEdit'))
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'))
const AdminOrderDetail = lazy(() => import('./pages/admin/AdminOrderDetail'))

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

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/product-legacy/:slug" element={<LegacyProductRedirect />} />
          <Route path="/category-legacy/:slug" element={<LegacyCategoryRedirect />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/planner" element={<SiteMapPlanner />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/guides" element={<Navigate to="/blog" replace />} />
          <Route path="/guides/:slug" element={<GuidesSlugRedirect />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Home />} />
        </Routes>
        </Suspense>
      </div>
      <Footer />
      <AIPlannerWidget />
    </div>
  )
}

export default function App() {
  const hasPostHogToken = Boolean(
    import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN ?? import.meta.env.NEXT_PUBLIC_POSTHOG_KEY
  )

  return (
    <BrowserRouter>
      <CatalogSyncProvider>
        <AuthProvider>
        <MembershipProvider>
          <CartProvider>
            <ScrollToTop />
            {hasPostHogToken ? <PostHogPageview /> : null}
            <Routes>
              <Route
                path="/admin"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <AdminLayout />
                  </Suspense>
                }
              >
                <Route index element={<Navigate to="/admin/supplier-source-map" replace />} />
                <Route path="supplier-source-map" element={<SupplierSourceMap />} />
                <Route path="products/:id" element={<AdminProductEdit />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="orders/:id" element={<AdminOrderDetail />} />
              </Route>
              <Route path="/*" element={<AppLayout />} />
            </Routes>
          </CartProvider>
        </MembershipProvider>
        </AuthProvider>
      </CatalogSyncProvider>
    </BrowserRouter>
  )
}
