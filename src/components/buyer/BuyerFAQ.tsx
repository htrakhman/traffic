export default function BuyerFAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-tcsDisplay text-base font-bold text-ink">
            {item.q}
            <span className="tcs-mono shrink-0 text-zone group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
