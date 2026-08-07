import { SITE_CONTACT_PHONE_DISPLAY, SITE_CONTACT_PHONE_E164, SITE_NAME } from '../../config/site'

export default function BuyerHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="/" className="font-tcsDisplay text-lg font-bold tracking-tight text-ink sm:text-xl">
          {SITE_NAME}
        </a>
        <div className="flex items-center gap-4">
          <a
            href={`tel:${SITE_CONTACT_PHONE_E164}`}
            className="tcs-mono hidden text-sm text-muted hover:text-ink sm:block"
          >
            {SITE_CONTACT_PHONE_DISPLAY}
          </a>
          <a
            href="#quote"
            className="rounded-md bg-zone px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c85009] sm:px-5 sm:py-2.5"
          >
            Get a quote
          </a>
        </div>
      </div>
    </header>
  )
}
