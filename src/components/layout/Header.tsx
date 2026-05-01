import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search, Phone, ChevronDown, ShoppingCart, User, LogOut, Truck } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { categories } from '../../data/categories'
import { SITE_CONTACT_PHONE_DISPLAY, SITE_CONTACT_PHONE_E164 } from '../../config/site'
import BrandLogoLink from './BrandLogoLink'
import AuthModal from '../auth/AuthModal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCatOpen, setIsCatOpen] = useState(false)
  const [isUserOpen, setIsUserOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const location = useLocation()
  const { itemCount } = useCart()
  const { user, logout } = useAuth()
  const userDropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsCatOpen(false)
    setIsUserOpen(false)
  }, [location.pathname])

  // Close user dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userDropRef.current && !userDropRef.current.contains(e.target as Node)) {
        setIsUserOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const openLogin = () => { setAuthMode('login'); setShowAuth(true); setIsMenuOpen(false) }
  const openSignup = () => { setAuthMode('signup'); setShowAuth(true); setIsMenuOpen(false) }

  return (
    <>
      {showAuth && <AuthModal defaultMode={authMode} onClose={() => setShowAuth(false)} />}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        {/* Sitewide delivery trust bar */}
        <div className="bg-brand-500 text-white text-xs font-semibold text-center py-1.5 px-4 flex items-center justify-center gap-2">
          <Truck size={12} className="flex-shrink-0" />
          Free Delivery on Every Order — No Minimum
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-3 min-h-16 py-2 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:justify-normal lg:gap-x-3 xl:gap-x-5 lg:py-0 lg:min-h-[4.25rem]">
            {/* Logo — PNG wordmark (public/brand); sr-only site name for assistive tech */}
            <BrandLogoLink
              size="header"
              className="max-w-[calc(100vw-8rem)] sm:max-w-none mr-1 xl:mr-2"
            />

            {/* Desktop nav — no horizontal clip (that hid "Equipment" / "Guides"); compact lg–xl instead */}
            <nav className="hidden lg:flex justify-center items-center min-w-0 w-full px-0.5 xl:px-1">
              <div className="flex flex-nowrap items-center justify-center gap-0 lg:gap-px xl:gap-0.5">
              <div
                className="relative shrink-0"
                onMouseLeave={() => setIsCatOpen(false)}
              >
                <div
                  className="inline-flex items-stretch rounded-lg hover:bg-slate-800 transition-all duration-150 h-9 xl:h-10"
                  onMouseEnter={() => setIsCatOpen(true)}
                >
                  <Link
                    to="/browse"
                    className="inline-flex items-center justify-center pl-2 pr-1 text-[13px] font-medium text-slate-300 hover:text-white whitespace-nowrap xl:pl-3 xl:pr-1 xl:text-sm"
                  >
                    Equipment
                  </Link>
                  <button
                    type="button"
                    aria-expanded={isCatOpen}
                    aria-haspopup="menu"
                    aria-label="Browse equipment categories"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsCatOpen((v) => !v)
                    }}
                    className="inline-flex items-center justify-center pr-2 pl-0.5 text-slate-300 hover:text-white rounded-r-lg xl:pr-3"
                  >
                    <ChevronDown
                      size={14}
                      className={`shrink-0 transition-transform ${isCatOpen ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                  </button>
                </div>
                {isCatOpen && (
                  <div className="absolute top-full left-0 z-50 pt-1 w-64 min-w-[16rem]">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-slide-up">
                      <div className="p-2">
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/category/${cat.slug}`}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors group"
                            onClick={() => setIsCatOpen(false)}
                          >
                            <span className="text-lg">{cat.icon}</span>
                            <div>
                              <div className="text-sm font-medium text-slate-200 group-hover:text-white">{cat.name}</div>
                              <div className="text-xs text-slate-500">{cat.productCount} items</div>
                            </div>
                          </Link>
                        ))}
                        <div className="border-t border-slate-800 mt-2 pt-2">
                          <Link
                            to="/browse"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors"
                            onClick={() => setIsCatOpen(false)}
                          >
                            View all equipment →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link
                to="/assistant"
                className="inline-flex items-center justify-center h-9 px-2 text-[13px] font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-all duration-150 whitespace-nowrap shrink-0 xl:h-10 xl:px-3 xl:text-sm"
              >
                Job Planner
              </Link>
              <Link
                to="/planner"
                className="inline-flex items-center justify-center h-9 px-2 text-[13px] font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-all duration-150 whitespace-nowrap shrink-0 xl:h-10 xl:px-3 xl:text-sm"
              >
                Site Map
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center justify-center h-9 px-2 text-[13px] font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-all duration-150 whitespace-nowrap shrink-0 xl:h-10 xl:px-3 xl:text-sm"
              >
                Guides
              </Link>
              </div>
            </nav>

            {/* Desktop right — phone · icons · auth */}
            <div className="hidden lg:relative lg:z-10 lg:flex lg:items-center lg:shrink-0 lg:gap-0 lg:min-w-0">
              <a
                href={`tel:${SITE_CONTACT_PHONE_E164}`}
                aria-label={`Call ${SITE_CONTACT_PHONE_DISPLAY}`}
                title={SITE_CONTACT_PHONE_DISPLAY}
                className="inline-flex items-center justify-center gap-2 h-9 shrink-0 px-2 xl:h-10 xl:gap-2.5 xl:pr-3 xl:mr-3 border-r border-slate-800 text-slate-400 hover:text-white transition-colors whitespace-nowrap tabular-nums text-sm"
              >
                <Phone size={15} className="shrink-0 text-slate-500" aria-hidden />
                <span className="text-slate-300">{SITE_CONTACT_PHONE_DISPLAY}</span>
              </a>
              <div className="flex items-center gap-0.5 pl-1.5 pr-2 mr-2 border-r border-slate-800 shrink-0 xl:pl-2 xl:pr-3 xl:mr-3">
                <Link
                  to="/browse"
                  className="inline-flex h-9 w-9 xl:h-10 xl:w-10 items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
                  aria-label="Search catalog"
                >
                  <Search size={18} />
                </Link>
                <Link
                  to="/cart"
                  className="relative inline-flex h-9 w-9 xl:h-10 xl:w-10 items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
                  aria-label={itemCount > 0 ? `Cart, ${itemCount} items` : 'Cart'}
                >
                  <ShoppingCart size={18} />
                  {itemCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white leading-none">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* User / auth */}
              {user ? (
                <div className="relative flex items-center gap-2 pl-1" ref={userDropRef}>
                  <button
                    type="button"
                    onClick={() => setIsUserOpen(v => !v)}
                    className="flex items-center gap-2 h-9 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-sm shrink-0 xl:h-10 xl:px-3"
                  >
                    <User size={15} className="text-slate-300" />
                    <span className="text-slate-200 max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                    <ChevronDown size={13} className={`text-slate-400 transition-transform ${isUserOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isUserOpen && (
                    <div className="absolute top-full right-0 mt-1 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-slide-up z-10">
                      <div className="px-3 py-2.5 border-b border-slate-800">
                        <div className="text-xs text-slate-500">Signed in as</div>
                        <div className="text-sm font-medium text-white truncate">{user.email}</div>
                      </div>
                      <div className="p-1.5">
                        <Link
                          to="/account"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800 text-sm text-slate-300 hover:text-white transition-colors"
                        >
                          <User size={14} />
                          My account
                        </Link>
                        {/* Membership link hidden while platform focuses on drop-shipping. */}
                        <button
                          type="button"
                          onClick={logout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800 text-sm text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <LogOut size={14} />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                  <Link
                    to="/quote"
                    className="btn-primary text-sm h-9 px-3 shrink-0 whitespace-nowrap !shadow-none hover:!translate-y-0 xl:h-10 xl:px-4"
                  >
                    <span className="xl:hidden">Quote</span>
                    <span className="hidden xl:inline">Request quote</span>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 shrink-0 pl-1 xl:gap-2">
                  <button
                    type="button"
                    onClick={openLogin}
                    className="btn-secondary text-sm h-9 px-3 whitespace-nowrap !shadow-none hover:!translate-y-0 xl:h-10 xl:px-4"
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={openSignup}
                    className="btn-primary text-sm h-9 px-3 whitespace-nowrap !shadow-none hover:!translate-y-0 xl:h-10 xl:px-4"
                  >
                    Sign up
                  </button>
                  <Link
                    to="/quote"
                    className="btn-primary text-sm h-9 px-3 whitespace-nowrap !shadow-none hover:!translate-y-0 xl:h-10 xl:px-4"
                  >
                    <span className="xl:hidden">Quote</span>
                    <span className="hidden xl:inline">Request quote</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-t border-slate-800 animate-slide-up">
            <div className="px-4 py-4 space-y-1">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 pb-2">Equipment</div>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <span>{cat.icon}</span>
                  <span className="text-sm text-slate-300">{cat.name}</span>
                </Link>
              ))}
              <div className="border-t border-slate-800 pt-3 mt-3 space-y-1">
                <Link to="/browse" className="block px-3 py-2.5 rounded-lg hover:bg-slate-800 text-sm text-slate-300 transition-colors">Browse All</Link>
                <Link to="/cart" className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-800 text-sm text-slate-300 transition-colors">
                  <span className="flex items-center gap-2">
                    <ShoppingCart size={16} />
                    Cart
                  </span>
                  {itemCount > 0 && (
                    <span className="text-[10px] font-bold bg-brand-500 text-white px-2 py-0.5 rounded-full">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </Link>
                <Link to="/assistant" className="block px-3 py-2.5 rounded-lg hover:bg-slate-800 text-sm text-slate-300 transition-colors">Job Planner</Link>
                <Link to="/planner" className="block px-3 py-2.5 rounded-lg hover:bg-slate-800 text-sm text-slate-300 transition-colors">Site Map</Link>
                <Link to="/blog" className="block px-3 py-2.5 rounded-lg hover:bg-slate-800 text-sm text-slate-300 transition-colors">Guides</Link>
              </div>

              {/* Auth section */}
              <div className="border-t border-slate-800 pt-3 mt-3 space-y-2">
                {user ? (
                  <>
                    <div className="px-3 py-2">
                      <div className="text-xs text-slate-500">Signed in as</div>
                      <div className="text-sm text-white font-medium">{user.name}</div>
                    </div>
                    <Link to="/account" className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-slate-800 text-sm text-slate-300 transition-colors">
                      <User size={15} />
                      My account
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-slate-800 text-sm text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <LogOut size={15} />
                      Sign out
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2 px-3">
                    <button onClick={openLogin} className="flex-1 btn-secondary text-sm py-2.5 justify-center">Sign in</button>
                    <button onClick={openSignup} className="flex-1 btn-primary text-sm py-2.5 justify-center">Sign up</button>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-800 pt-3 mt-3 space-y-2">
                <a
                  href={`tel:${SITE_CONTACT_PHONE_E164}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-slate-700 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Phone size={16} className="text-slate-500" aria-hidden />
                  {SITE_CONTACT_PHONE_DISPLAY}
                </a>
                <Link to="/quote" className="btn-primary w-full justify-center">
                  Request quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
