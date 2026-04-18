import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import type { Product } from './types'
import { CartProvider } from './context/CartContext'
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
import SiteMapPlanner from './pages/SiteMapPlanner'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

/** Loads TSS mirror catalog from `public/tss-catalog.json` (see `npm run catalog` / `scripts/generate-tss-catalog.mjs`). */
function CatalogLoader() {
  const { bump } = useCatalogSync()
  useEffect(() => {
    fetch('/tss-catalog.json')
      .then((r) => (r.ok ? (r.json() as Promise<Product[]>) : Promise.resolve(null)))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          registerExtendedCatalog(data)
          bump()
        }
      })
      .catch(() => {})
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
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/planner" element={<SiteMapPlanner />} />
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
        <CartProvider>
          <ScrollToTop />
          <AppLayout />
        </CartProvider>
      </CatalogSyncProvider>
    </BrowserRouter>
  )
}
