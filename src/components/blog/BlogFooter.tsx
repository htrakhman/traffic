import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'
import { SITE_CONTACT_EMAIL, SITE_CONTACT_PHONE_DISPLAY, SITE_CONTACT_PHONE_E164, SITE_NAME } from '../../config/site'

export default function BlogFooter() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="text-sm font-semibold text-white">{SITE_NAME}</div>
          <p className="mt-1 text-xs text-slate-500">
            © {new Date().getFullYear()} {SITE_NAME}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-slate-400">
          <a href={`tel:${SITE_CONTACT_PHONE_E164}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={14} className="text-brand-400" aria-hidden />
            {SITE_CONTACT_PHONE_DISPLAY}
          </a>
          <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={14} className="text-brand-400" aria-hidden />
            {SITE_CONTACT_EMAIL}
          </a>
        </div>
        <Link to="/" className="text-sm text-slate-500 hover:text-white transition-colors">
          ← Back to {SITE_NAME}
        </Link>
      </div>
    </footer>
  )
}
