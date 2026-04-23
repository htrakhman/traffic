import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react'
import { SITE_CONTACT_EMAIL, SITE_CONTACT_PHONE_DISPLAY, SITE_CONTACT_PHONE_E164, SITE_NAME } from '../../config/site'
import BrandLogoLink from './BrandLogoLink'

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <BrandLogoLink size="footer" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              The modern traffic control equipment rental marketplace. AI-powered job planning for contractors and work-zone operators.
            </p>
            <div className="space-y-2.5">
              <a
                href={`tel:${SITE_CONTACT_PHONE_E164}`}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-brand-400" />
                {SITE_CONTACT_PHONE_DISPLAY}
              </a>
              <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <Mail size={14} className="text-brand-400" />
                {SITE_CONTACT_EMAIL}
              </a>
              <div className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin size={14} className="text-brand-400 mt-0.5 flex-shrink-0" />
                <span>Equipment shipped to your job site.</span>
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Equipment</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Cones & Drums', href: '/category/cones-drums' },
                { label: 'Signs & Sign Stands', href: '/category/signs-sign-stands' },
                { label: 'Barricades & Barriers', href: '/category/barricades-barriers' },
                { label: 'Arrow Boards', href: '/category/arrow-boards' },
                { label: 'Message Boards', href: '/category/message-boards' },
                { label: 'Safety Lighting', href: '/category/safety-lighting' },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'AI Job Planner', href: '/assistant' },
                { label: 'Book your rental', href: '/quote' },
                { label: 'Browse All Inventory', href: '/browse' },
                { label: 'Work Zone Guides', href: '/blog' },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Information</h3>
            <ul className="space-y-2.5">
              {[
                { label: `About ${SITE_NAME}`, href: '/about' },
                { label: 'How It Works', href: '/how-it-works' },
                { label: 'FAQ', href: '/faq' },
                { label: 'MUTCD Reference', href: '/resources/mutcd', external: true },
                { label: 'Contact Us', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors">
                    {item.label}
                    {item.external && <ExternalLink size={10} />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span className="text-yellow-500">⚠</span>
            <span>AI recommendations are planning guidance only. Final requirements may vary by project conditions and applicable traffic-control standards.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
