import { useEffect, useRef } from 'react'
import { SITE_CONTACT_EMAIL, SITE_NAME } from '../config/site'
import { CATEGORIES } from '../data/catalog'
import { useQuoteList } from '../lib/quoteList'
import { USE_CASES } from '../data/useCases'

const PRODUCTS = [
  ...CATEGORIES.map((c) => ({ label: c.shortName, href: c.path })),
  { label: 'Type II & III barricades', href: '/barricades' },
  { label: 'Channelizer drums', href: '/channelizing-drums' },
  { label: 'Work zone signs', href: '/work-zone-signs' },
  { label: 'Arrow boards', href: '/arrow-boards' },
  { label: 'All traffic safety supplies', href: '/traffic-safety-supplies' },
]

const SOLUTIONS = USE_CASES.map((u) => ({ label: u.h1.replace(/ (equipment|and security equipment)$/, ''), href: `/uses/${u.slug}` }))

const RESOURCES = [
  { label: 'Barricade calculator', href: '/tools/barricade-calculator' },
  { label: 'Cone taper calculator', href: '/tools/cone-taper-calculator' },
  { label: 'Water vs concrete barriers', href: '/compare/water-filled-vs-concrete-jersey-barriers' },
  { label: 'Steel vs plastic barricades', href: '/compare/steel-vs-plastic-crowd-control-barricades' },
  { label: '28 vs 36 inch cones', href: '/compare/28-vs-36-inch-traffic-cones' },
  { label: 'Traffic control glossary', href: '/glossary' },
  { label: 'Guides and articles', href: '/blog' },
]

const COMPANY = [
  { label: 'Wholesale', href: '/wholesale' },
  { label: 'Shipping & delivery', href: '/shipping-and-delivery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

type NavLink = { label: string; href: string }

function Dropdown({ label, links }: { label: string; links: NavLink[] }) {
  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-ink hover:text-zone [&::-webkit-details-marker]:hidden">
        {label}
        <span aria-hidden="true" className="text-xs transition group-open:rotate-180">▾</span>
      </summary>
      <ul className="absolute left-0 top-full z-50 mt-2 min-w-[15rem] rounded-lg border border-line bg-surface p-2 shadow-lg">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="block rounded-md px-3 py-2 text-sm text-ink hover:bg-paper hover:text-zone">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}

/** Site-wide top bar: logo, product/resource menus, quote button. Menus are <details>, so they work before JS loads. */
export default function SiteHeader() {
  const ref = useRef<HTMLElement>(null)
  const quoteCount = useQuoteList().length

  // Close any open menu when clicking outside it or pressing Escape.
  useEffect(() => {
    const closeAll = (except?: Node | null) =>
      ref.current?.querySelectorAll('details[open]').forEach((d) => {
        if (!except || !d.contains(except)) d.removeAttribute('open')
      })
    const onClick = (e: MouseEvent) => closeAll(e.target as Node)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeAll()
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <header ref={ref} className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-8">
        <a href="/" className="min-w-0 whitespace-nowrap font-tcsDisplay text-base font-bold tracking-tight text-ink sm:text-xl">
          {SITE_NAME}
        </a>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          <Dropdown label="Products" links={PRODUCTS} />
          <a href="/crowd-control-barricades" className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-ink hover:text-zone">
            Crowd control
          </a>
          <a href="/water-filled-barriers" className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-ink hover:text-zone">
            Water barriers
          </a>
          <Dropdown label="Solutions" links={SOLUTIONS} />
          <Dropdown label="Resources" links={RESOURCES} />
          <Dropdown label="Company" links={COMPANY} />
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={quoteCount ? '/request-quote' : '#quote'}
            className="whitespace-nowrap rounded-md bg-zone px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#c85009] sm:px-5 sm:py-2.5"
          >
            {quoteCount ? `Quote list (${quoteCount})` : 'Get a quote'}
          </a>

          <details className="group lg:hidden">
            <summary
              className="flex cursor-pointer list-none items-center rounded-md border border-line px-2.5 py-2 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden"
              aria-label="Menu"
            >
              <span className="group-open:hidden">Menu</span>
              <span className="hidden group-open:inline">Close</span>
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute inset-x-0 top-full max-h-[80vh] overflow-y-auto border-b border-line bg-surface px-5 pb-6 pt-2 shadow-lg sm:px-8"
            >
              {[
                { title: 'Products', links: PRODUCTS },
                { title: 'Solutions', links: SOLUTIONS },
                { title: 'Resources', links: RESOURCES },
                { title: 'Company', links: COMPANY },
              ].map((g) => (
                <div key={g.title} className="mt-4">
                  <p className="tcs-mono text-xs uppercase tracking-[0.1em] text-muted">{g.title}</p>
                  <ul className="mt-2 grid grid-cols-2 gap-x-4">
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} className="block py-2 text-sm text-ink hover:text-zone">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="tcs-mono mt-5 block text-sm text-muted">
                {SITE_CONTACT_EMAIL}
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
