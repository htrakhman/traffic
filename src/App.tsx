import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Category from './pages/Category'
import Product from './pages/Product'
import Assistant from './pages/Assistant'
import Quote from './pages/Quote'
import Packages from './pages/Packages'
import Cart from './pages/Cart'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
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
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/packages" element={<Packages />} />
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
      <CartProvider>
        <ScrollToTop />
        <AppLayout />
      </CartProvider>
    </BrowserRouter>
  )
}
