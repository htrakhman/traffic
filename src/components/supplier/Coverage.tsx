import { categories } from '../../data/categories'

export default function Coverage() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Coverage</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Nationwide, routed by territory. If there's no real demand in your area yet, we'll tell
          you that instead of taking your money for it.
        </p>

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {categories.map((cat) => (
            <span
              key={cat.id}
              className="rounded-full border border-line bg-zone-soft px-4 py-1.5 text-sm font-medium text-ink"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
