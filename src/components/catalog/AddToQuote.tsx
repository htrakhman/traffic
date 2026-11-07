import { addToQuoteList, useQuoteList } from '../../lib/quoteList'

export default function AddToQuote({ item }: { item: string }) {
  const list = useQuoteList()
  const added = list.some((x) => x.item === item)
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => addToQuoteList(item)}
        disabled={added}
        className="rounded-md border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white disabled:cursor-default disabled:border-line disabled:bg-paper disabled:text-muted"
      >
        {added ? 'Added to quote list ✓' : 'Add to quote list'}
      </button>
      {list.length > 0 && (
        <a href="/request-quote" className="text-sm font-semibold text-zone hover:underline">
          View quote list ({list.length}) →
        </a>
      )}
    </div>
  )
}
