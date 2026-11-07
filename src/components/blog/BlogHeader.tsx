import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { SITE_CONTACT_EMAIL, SITE_NAME } from '../../config/site'

export default function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/blog" className="text-base font-bold text-white whitespace-nowrap">
          {SITE_NAME}
          <span className="ml-2 hidden text-slate-500 font-normal sm:inline">Guides</span>
        </Link>
        <nav aria-label="Shop" className="flex items-center gap-3 text-sm sm:gap-4">
          <a href="/crowd-control-barricades" className="hidden text-slate-300 hover:text-white md:inline">
            Crowd control
          </a>
          <a href="/water-filled-barriers" className="hidden text-slate-300 hover:text-white md:inline">
            Water barriers
          </a>
          <a href="/traffic-cones-for-sale" className="hidden text-slate-300 hover:text-white md:inline">
            Cones
          </a>
          <a href="/traffic-safety-supplies" className="text-slate-300 hover:text-white">
            Shop
          </a>
          <a
            href={`mailto:${SITE_CONTACT_EMAIL}`}
            className="hidden items-center gap-2 text-slate-300 hover:text-white transition-colors lg:inline-flex"
          >
            <Mail size={14} className="text-brand-400" aria-hidden />
            {SITE_CONTACT_EMAIL}
          </a>
          <a href="/contact" className="rounded-md bg-orange-600 px-3 py-1.5 font-semibold text-white hover:bg-orange-500">
            Get a quote
          </a>
        </nav>
      </div>
    </header>
  )
}
