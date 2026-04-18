import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../types'

export interface CartLine {
  productId: string
  quantity: number
  rentalDays: number
}

const STORAGE_KEY = 'traffickit-cart-v1'

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
  addItem: (product: Product, quantity: number, rentalDays: number) => void
  setLineQuantity: (productId: string, quantity: number) => void
  setLineRentalDays: (productId: string, rentalDays: number, minDays: number) => void
  removeLine: (productId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function loadLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (row): row is CartLine =>
          row &&
          typeof row === 'object' &&
          typeof (row as CartLine).productId === 'string' &&
          typeof (row as CartLine).quantity === 'number' &&
          typeof (row as CartLine).rentalDays === 'number',
      )
      .map((row) => ({
        productId: row.productId,
        quantity: Math.max(1, Math.floor(row.quantity)),
        rentalDays: Math.max(1, Math.floor(row.rentalDays)),
      }))
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadLines)

  const addItem = useCallback((product: Product, quantity: number, rentalDays: number) => {
    const q = Math.max(1, quantity)
    const d = Math.max(product.minimumRentalDays, rentalDays)
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === product.id)
      let next: CartLine[]
      if (idx === -1) {
        next = [...prev, { productId: product.id, quantity: q, rentalDays: d }]
      } else {
        const cur = prev[idx]!
        next = [...prev]
        next[idx] = {
          productId: cur.productId,
          quantity: cur.quantity + q,
          rentalDays: Math.max(cur.rentalDays, d),
        }
      }
      writeStorage(next)
      return next
    })
  }, [])

  const setLineQuantity = useCallback((productId: string, quantity: number) => {
    const q = Math.max(1, quantity)
    setLines((prev) => {
      const next = prev.map((l) => (l.productId === productId ? { ...l, quantity: q } : l))
      writeStorage(next)
      return next
    })
  }, [])

  const setLineRentalDays = useCallback((productId: string, rentalDays: number, minDays: number) => {
    const d = Math.max(minDays, rentalDays)
    setLines((prev) => {
      const next = prev.map((l) => (l.productId === productId ? { ...l, rentalDays: d } : l))
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
      setLineRentalDays,
      removeLine,
      clearCart,
    }),
    [lines, itemCount, addItem, setLineQuantity, setLineRentalDays, removeLine, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
