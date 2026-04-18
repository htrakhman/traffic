import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

interface Value {
  /** Increment when `tss-catalog.json` is merged so consumers recompute listings. */
  tick: number
  bump: () => void
}

const CatalogSyncContext = createContext<Value>({ tick: 0, bump: () => {} })

export function CatalogSyncProvider({ children }: { children: ReactNode }) {
  const [tick, setTick] = useState(0)
  const bump = useCallback(() => setTick((t) => t + 1), [])
  return <CatalogSyncContext.Provider value={{ tick, bump }}>{children}</CatalogSyncContext.Provider>
}

export function useCatalogSync(): Value {
  return useContext(CatalogSyncContext)
}
