import { SITE_CONTACT_EMAIL, SITE_CONTACT_PHONE_DISPLAY, SITE_CONTACT_PHONE_E164, SITE_NAME } from '../../config/site'

export default function HomeFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>© {year} {SITE_NAME}</span>
        <span className="tcs-mono flex flex-col gap-1 sm:flex-row sm:gap-6">
          <a href={`tel:${SITE_CONTACT_PHONE_E164}`} className="hover:text-ink">{SITE_CONTACT_PHONE_DISPLAY}</a>
          <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="hover:text-ink">{SITE_CONTACT_EMAIL}</a>
        </span>
      </div>
    </footer>
  )
}
