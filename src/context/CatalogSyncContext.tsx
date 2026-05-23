import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Product } from '../types'
import { setCatalogProducts } from '../data/products'
import { CATALOG_SEED_PRODUCTS } from '../data/catalogSeed'
import { dbProductToStorefront } from '../lib/storefrontMapper'

interface Value {
  tick: number
  bump: () => void
  loaded: boolean
}

const CatalogSyncContext = createContext<Value>({ tick: 0, bump: () => {}, loaded: false })

function seedFallback(): Product[] {
  return CATALOG_SEED_PRODUCTS.filter((p) => p.status === 'active').map(dbProductToStorefront)
}

export function CatalogSyncProvider({ children }: { children: ReactNode }) {
  const [tick, setTick] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const load = useCallback(() => {
    fetch('/api/products')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { products?: Product[] } | null) => {
        if (data?.products?.length) setCatalogProducts(data.products)
        else setCatalogProducts(seedFallback())
        setLoaded(true)
        setTick((t) => t + 1)
      })
      .catch(() => {
        setCatalogProducts(seedFallback())
        setLoaded(true)
        setTick((t) => t + 1)
      })
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const bump = useCallback(() => load(), [load])

  return (
    <CatalogSyncContext.Provider value={{ tick, bump, loaded }}>
      {children}
    </CatalogSyncContext.Provider>
  )
}

export function useCatalogSync(): Value {
  return useContext(CatalogSyncContext)
}
