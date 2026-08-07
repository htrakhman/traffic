import { SITE_CONTACT_EMAIL, SITE_CONTACT_PHONE_DISPLAY, SITE_CONTACT_PHONE_E164, SITE_NAME } from '../../config/site'

export default function SupplierFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="font-tcsDisplay text-base font-bold text-ink">{SITE_NAME}</div>
            <p className="mt-2 max-w-sm text-sm text-muted">
              We generate purchase-intent demand for traffic control equipment and route it to
              suppliers who cover the territory.
            </p>
          </div>
          <div className="tcs-mono text-sm text-muted">
            <a href={`tel:${SITE_CONTACT_PHONE_E164}`} className="block hover:text-ink">
              {SITE_CONTACT_PHONE_DISPLAY}
            </a>
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="mt-1 block hover:text-ink">
              {SITE_CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {SITE_NAME}. Leads only. We do not sell or rent equipment directly.</span>
          <a href="/browse" className="hover:text-ink">
            Looking to buy equipment instead?
          </a>
        </div>
      </div>
    </footer>
  )
}
