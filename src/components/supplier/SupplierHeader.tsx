import { SITE_NAME } from '../../config/site'

export default function SupplierHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="/" className="font-tcsDisplay text-lg font-bold tracking-tight text-ink sm:text-xl">
          {SITE_NAME}
        </a>
        <a
          href="#signup"
          className="rounded-md bg-zone px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c85009] sm:px-5 sm:py-2.5"
        >
          Request lead access
        </a>
      </div>
    </header>
  )
}
