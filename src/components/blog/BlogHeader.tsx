import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { SITE_CONTACT_PHONE_DISPLAY, SITE_CONTACT_PHONE_E164, SITE_NAME } from '../../config/site'

export default function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/blog" className="text-base font-bold text-white whitespace-nowrap">
          {SITE_NAME}
          <span className="ml-2 text-slate-500 font-normal">Guides</span>
        </Link>
        <a
          href={`tel:${SITE_CONTACT_PHONE_E164}`}
          className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
        >
          <Phone size={14} className="text-brand-400" aria-hidden />
          <span className="hidden sm:inline">{SITE_CONTACT_PHONE_DISPLAY}</span>
        </a>
      </div>
    </header>
  )
}
