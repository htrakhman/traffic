import { SITE_CONTACT_EMAIL, SITE_CONTACT_PHONE_DISPLAY, SITE_CONTACT_PHONE_E164, SITE_NAME } from '../../config/site'

export default function HomeFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="font-tcsDisplay text-base font-bold text-ink">{SITE_NAME}</div>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Wholesale and retail traffic control and work zone safety equipment.
            </p>
          </div>
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
            <nav aria-label="Footer">
              <ul className="space-y-2 text-sm">
                <li><a href="#wholesale" className="text-ink hover:text-zone">Wholesale</a></li>
                <li><a href="#retail" className="text-ink hover:text-zone">Retail</a></li>
                <li><a href="/blog" className="text-ink hover:text-zone">Work zone guides</a></li>
              </ul>
            </nav>
            <div className="tcs-mono text-sm text-muted">
              <a href={`tel:${SITE_CONTACT_PHONE_E164}`} className="block hover:text-ink">
                {SITE_CONTACT_PHONE_DISPLAY}
              </a>
              <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="mt-2 block hover:text-ink">
                {SITE_CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-line pt-6 text-xs text-muted">
          © {year} {SITE_NAME}.
        </div>
      </div>
    </footer>
  )
}
