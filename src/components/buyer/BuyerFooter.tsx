import { SITE_CONTACT_EMAIL, SITE_NAME } from '../../config/site'

const PAGES = [
  { label: 'Crowd control barricades', href: '/crowd-control-barricades' },
  { label: 'Water filled barriers', href: '/water-filled-barriers' },
  { label: 'Delineator posts', href: '/delineator-posts' },
  { label: 'Temporary fence panels', href: '/temporary-fence-panels' },
  { label: 'Traffic safety supplies', href: '/traffic-safety-supplies' },
  { label: 'Traffic cones for sale', href: '/traffic-cones-for-sale' },
  { label: 'Traffic control equipment', href: '/traffic-control-equipment' },
  { label: 'Traffic safety equipment', href: '/traffic-safety-equipment' },
  { label: 'Barricades', href: '/barricades' },
  { label: 'Arrow boards', href: '/arrow-boards' },
  { label: 'Channelizing drums', href: '/channelizing-drums' },
  { label: 'Work zone signs', href: '/work-zone-signs' },
]

const RESOURCES = [
  { label: 'Barricade calculator', href: '/tools/barricade-calculator' },
  { label: 'Cone taper calculator', href: '/tools/cone-taper-calculator' },
  { label: 'Water vs concrete barriers', href: '/compare/water-filled-vs-concrete-jersey-barriers' },
  { label: 'Steel vs plastic barricades', href: '/compare/steel-vs-plastic-crowd-control-barricades' },
  { label: '28 vs 36 inch cones', href: '/compare/28-vs-36-inch-traffic-cones' },
  { label: 'Blog', href: '/blog' },
]

const COMPANY = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Wholesale', href: '/wholesale' },
  { label: 'Shipping and delivery', href: '/shipping-and-delivery' },
  { label: 'New Jersey', href: '/delivery/new-jersey' },
  { label: 'New York', href: '/delivery/new-york' },
]

export default function BuyerFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <div className="font-tcsDisplay text-base font-bold text-ink">{SITE_NAME}</div>
            <div className="tcs-mono mt-3 text-sm text-muted">
              <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="block hover:text-ink">
                {SITE_CONTACT_EMAIL}
              </a>
            </div>
          </div>
          <nav aria-label="Product pages">
            <p className="tcs-mono text-xs uppercase tracking-[0.1em] text-muted">Shop by category</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="text-sm text-ink hover:text-zone">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {[
            { title: 'Resources', links: RESOURCES },
            { title: 'Company', links: COMPANY },
          ].map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <p className="tcs-mono text-xs uppercase tracking-[0.1em] text-muted">{group.title}</p>
              <ul className="mt-3 space-y-2">
                {group.links.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="text-sm text-ink hover:text-zone">
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-8 border-t border-line pt-6 text-xs text-muted">
          © {year} {SITE_NAME}. Purchase only.
        </div>
      </div>
    </footer>
  )
}
