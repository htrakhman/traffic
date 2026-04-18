import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search, Phone, ChevronDown } from 'lucide-react'
import { categories } from '../../data/categories'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCatOpen, setIsCatOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsCatOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/30">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2.5}>
                <path d="M12 2L8 7h8L12 2z" fill="currentColor" stroke="none" />
                <path d="M9 9h6l1.5 11H7.5L9 9z" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              Traffic<span className="text-brand-400">Kit</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Categories dropdown */}
            <div className="relative" onMouseLeave={() => setIsCatOpen(false)}>
              <button
                onMouseEnter={() => setIsCatOpen(true)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-all duration-150"
              >
                Equipment
                <ChevronDown size={14} className={`transition-transform ${isCatOpen ? 'rotate-180' : ''}`} />
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

            <Link to="/browse" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-all duration-150">
              Browse
            </Link>
            <Link to="/assistant" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-all duration-150">
              Job Planner
            </Link>
            <Link to="/packages" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-all duration-150">
              Packages
            </Link>
          </nav>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+18005551234" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
              <Phone size={14} />
              <span>1-800-555-1234</span>
            </a>
            <Link to="/browse" className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all">
              <Search size={18} />
            </Link>
            <Link to="/quote" className="btn-primary text-sm py-2 px-4">
              Get a Quote
            </Link>
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
              <Link to="/assistant" className="block px-3 py-2.5 rounded-lg hover:bg-slate-800 text-sm text-slate-300 transition-colors">Job Planner</Link>
              <Link to="/packages" className="block px-3 py-2.5 rounded-lg hover:bg-slate-800 text-sm text-slate-300 transition-colors">Packages</Link>
            </div>
            <div className="border-t border-slate-800 pt-3 mt-3">
              <Link to="/quote" className="btn-primary w-full justify-center">Get a Quote</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
