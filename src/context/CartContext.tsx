import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../types'
import { getMinimumOrderQuantity } from '../utils/pricing'

export interface CartLine {
  productId: string
  quantity: number
}

const STORAGE_KEY = 'traffickit-cart-v2'
const LEGACY_STORAGE_KEY = 'traffickit-cart-v1'

function writeStorage(lines: CartLine[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  } catch {
    /* ignore quota */
  }
}

interface CartContextValue {
  lines: CartLine[]
  itemCount: number
  addItem: (product: Product, quantity: number) => void
  setLineQuantity: (productId: string, quantity: number, product: Product) => void
  removeLine: (productId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function normalizeQuantityForProduct(product: Product, quantity: number): number {
  const moq = getMinimumOrderQuantity(product)
  return Math.max(moq, Math.floor(quantity))
}

function parseCartLine(row: unknown): CartLine | null {
  if (!row || typeof row !== 'object') return null
  const o = row as Record<string, unknown>
  if (typeof o.productId !== 'string' || typeof o.quantity !== 'number') return null
  return {
    productId: o.productId,
    quantity: Math.max(1, Math.floor(o.quantity)),
  }
}

function loadLines(): CartLine[] {
  try {
    let raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY)
      if (raw) {
        try {
          localStorage.removeItem(LEGACY_STORAGE_KEY)
        } catch {
          /* ignore */
        }
      }
    }
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.map(parseCartLine).filter((row): row is CartLine => row !== null)
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadLines)

  const addItem = useCallback((product: Product, quantity: number) => {
    const q = normalizeQuantityForProduct(product, quantity)
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === product.id)
      let next: CartLine[]
      if (idx === -1) {
        next = [...prev, { productId: product.id, quantity: q }]
      } else {
        const cur = prev[idx]!
        next = [...prev]
        next[idx] = {
          productId: cur.productId,
          quantity: normalizeQuantityForProduct(product, cur.quantity + q),
        }
      }
      writeStorage(next)
      return next
    })
  }, [])

  const setLineQuantity = useCallback((productId: string, quantity: number, product: Product) => {
    const q = normalizeQuantityForProduct(product, quantity)
    setLines((prev) => {
      const next = prev.map((l) => (l.productId === productId ? { ...l, quantity: q } : l))
      writeStorage(next)
      return next
    })
  }, [])

  const removeLine = useCallback((productId: string) => {
    setLines((prev) => {
      const next = prev.filter((l) => l.productId !== productId)
      writeStorage(next)
      return next
    })
  }, [])

  const clearCart = useCallback(() => {
    setLines(() => {
      writeStorage([])
      return []
    })
  }, [])

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  )

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      addItem,
      setLineQuantity,
      removeLine,
      clearCart,
    }),
    [lines, itemCount, addItem, setLineQuantity, removeLine, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
