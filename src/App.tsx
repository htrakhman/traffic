import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { usePostHog } from '@posthog/react'
import type { Product } from './types'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { MembershipProvider } from './context/MembershipContext'
import { CatalogSyncProvider, useCatalogSync } from './context/CatalogSyncContext'
import { registerExtendedCatalog } from './data/products'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Category from './pages/Category'
import ProductPage from './pages/Product'
import Assistant from './pages/Assistant'
import Quote from './pages/Quote'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import SiteMapPlanner from './pages/SiteMapPlanner'
import Blog from './pages/Blog'
import Article from './pages/Article'
import Account from './pages/Account'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
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

/** Loads TSS mirror catalog from `public/tss-catalog.json` (see `npm run catalog` / `scripts/generate-tss-catalog.mjs`). */
function CatalogLoader() {
  const { bump } = useCatalogSync()
  useEffect(() => {
    fetch('/tss-catalog.json')
      .then((r) => {
        if (!r.ok) {
          console.warn('[CatalogLoader] /tss-catalog.json HTTP', r.status)
          return null
        }
        return r.json() as Promise<Product[]>
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          registerExtendedCatalog(data)
          bump()
        }
      })
      .catch((err) => {
        console.warn('[CatalogLoader] Failed to load or parse /tss-catalog.json:', err)
      })
  }, [bump])
  return null
}

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/planner" element={<SiteMapPlanner />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/account" element={<Account />} />
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CatalogSyncProvider>
        <CatalogLoader />
        <AuthProvider>
        <MembershipProvider>
          <CartProvider>
            <ScrollToTop />
            {import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN ? <PostHogPageview /> : null}
            <AppLayout />
          </CartProvider>
        </MembershipProvider>
        </AuthProvider>
      </CatalogSyncProvider>
    </BrowserRouter>
  )
}
