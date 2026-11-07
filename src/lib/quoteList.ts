import { useEffect, useState } from 'react'

/** Items a visitor has added to their quote request, kept in localStorage. */
export interface QuoteItem {
  item: string
  qty: string
}

const KEY = 'tcs-quote-list'
const EVENT = 'tcs-quote-list-change'

export function readQuoteList(): QuoteItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x?.item === 'string') : []
  } catch {
    return []
  }
}

export function writeQuoteList(items: QuoteItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items))
  } catch {
    // Private mode or storage blocked: the list just won't persist.
  }
  window.dispatchEvent(new Event(EVENT))
}

export function addToQuoteList(item: string, qty = '') {
  const list = readQuoteList()
  if (!list.some((x) => x.item === item)) writeQuoteList([...list, { item, qty }])
}

export function clearQuoteList() {
  writeQuoteList([])
}

/** Live view of the quote list; empty during prerender and first paint. */
export function useQuoteList(): QuoteItem[] {
  const [items, setItems] = useState<QuoteItem[]>([])
  useEffect(() => {
    const sync = () => setItems(readQuoteList())
    sync()
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])
  return items
}
