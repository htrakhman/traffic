import { productPath, type Product } from '../../data/catalog'

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <li key={p.slug}>
          <a
            href={productPath(p)}
            className="group flex h-full flex-col rounded-lg border border-line bg-surface p-5 transition hover:border-zone"
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.imageAlt ?? p.name}
                loading="lazy"
                className={`mb-4 aspect-[4/3] w-full rounded-md bg-paper ${p.image?.startsWith('/photos/') ? 'object-cover' : 'object-contain'}`}
              />
            )}
            <h3 className="font-tcsDisplay text-lg font-bold leading-snug text-ink group-hover:text-zone">
              {p.name}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
            <p className="tcs-mono mt-4 text-xs uppercase tracking-[0.08em] text-zone">Specs and quote →</p>
          </a>
        </li>
      ))}
    </ul>
  )
}
