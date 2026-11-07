import BuyerLayout from '../components/buyer/BuyerLayout'
import SEO from '../components/seo/SEO'
import { CATEGORIES } from '../data/catalog'

/** Served as dist/404.html, so unknown URLs return a real 404 instead of the homepage. */
export default function NotFound() {
  return (
    <BuyerLayout>
      <SEO title="Page not found | Traffic Control Supply" description="This page does not exist." noindex />
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
          <h1 className="font-tcsDisplay text-4xl font-bold text-ink sm:text-5xl">Page not found</h1>
          <p className="mt-4 text-lg text-muted">That page moved or never existed. Try one of these:</p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <a href={c.path} className="flex justify-between py-3 text-ink hover:text-zone">
                  {c.name}
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
            <li>
              <a href="/blog" className="flex justify-between py-3 text-ink hover:text-zone">
                Guides and articles
                <span aria-hidden="true">→</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </BuyerLayout>
  )
}
