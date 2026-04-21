import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search, Phone, ChevronDown, ShoppingCart, User, LogOut, Crown } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { categories } from '../../data/categories'
import { SITE_CONTACT_PHONE_DISPLAY, SITE_CONTACT_PHONE_E164 } from '../../config/site'
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
  const { user, logout, isMemberActive } = useAuth()
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-3 min-h-16 py-2 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:justify-normal lg:gap-x-3 xl:gap-x-5 lg:py-0 lg:min-h-[4.25rem]">
            {/* Logo — slightly smaller wordmark lg–xl so the nav column keeps enough width */}
            <Link to="/" className="flex items-center gap-2 shrink-0 min-w-0 max-w-[calc(100vw-8rem)] sm:max-w-none xl:gap-2.5">
              <div className="w-8 h-8 shrink-0 bg-brand-500 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/30">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M12 2L8 7h8L12 2z" fill="currentColor" stroke="none" />
                  <path d="M9 9h6l1.5 11H7.5L9 9z" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <span className="font-bold text-white tracking-tight leading-snug text-sm sm:text-base lg:text-sm xl:text-lg">
                Traffic Control <span className="text-brand-400">Rental</span>
              </span>
            </Link>

            {/* Desktop nav — no horizontal clip (that hid "Equipment" / "Guides"); compact lg–xl instead */}
            <nav className="hidden lg:flex justify-center items-center min-w-0 w-full px-0.5 xl:px-1">
              <div className="flex flex-nowrap items-center justify-center gap-0 lg:gap-px xl:gap-0.5">
              {/* Categories dropdown */}
              <div className="relative shrink-0" onMouseLeave={() => setIsCatOpen(false)}>
                <button
                  type="button"
                  onMouseEnter={() => setIsCatOpen(true)}
                  className="inline-flex items-center justify-center gap-1 h-9 px-2 text-[13px] font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-all duration-150 whitespace-nowrap xl:h-10 xl:px-3 xl:text-sm"
                >
                  Equipment
                  <ChevronDown size={14} className={`shrink-0 transition-transform ${isCatOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCatOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-slide-up">
                    <div className="p-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/category/${cat.slug}`}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors group"
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
                        >
                          View all equipment →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/browse"
                className="inline-flex items-center justify-center h-9 px-2 text-[13px] font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-all duration-150 whitespace-nowrap shrink-0 xl:h-10 xl:px-3 xl:text-sm"
              >
                Browse
              </Link>
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
                    {isMemberActive && <Crown size={13} className="text-amber-400" />}
                    <User size={15} className="text-slate-300" />
                    <span className="text-slate-200 max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                    <ChevronDown size={13} className={`text-slate-400 transition-transform ${isUserOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isUserOpen && (
                    <div className="absolute top-full right-0 mt-1 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-slide-up z-10">
                      <div className="px-3 py-2.5 border-b border-slate-800">
                        <div className="text-xs text-slate-500">Signed in as</div>
                        <div className="text-sm font-medium text-white truncate">{user.email}</div>
                        {isMemberActive && (
                          <div className="flex items-center gap-1 text-xs text-amber-400 mt-0.5">
                            <Crown size={11} />
                            Member
                          </div>
                        )}
                      </div>
                      <div className="p-1.5">
                        <Link
                          to="/account"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800 text-sm text-slate-300 hover:text-white transition-colors"
                        >
                          <User size={14} />
                          My account
                        </Link>
                        {!isMemberActive && (
                          <Link
                            to="/account"
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                          >
                            <Crown size={14} />
                            Join membership
                          </Link>
                        )}
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
                    <span className="xl:hidden">Book rental</span>
                    <span className="hidden xl:inline">Book your rental</span>
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
                    <span className="xl:hidden">Book rental</span>
                    <span className="hidden xl:inline">Book your rental</span>
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
                      {isMemberActive && (
                        <div className="flex items-center gap-1 text-xs text-amber-400 mt-0.5">
                          <Crown size={11} />
                          Active member
                        </div>
                      )}
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
                  Book your rental
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
