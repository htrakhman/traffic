import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { useLocation } from 'react-router-dom'

const STORAGE_KEY = 'traffic-rentals-member'

type MembershipContextValue = {
  isMember: boolean
  setIsMember: (value: boolean) => void
}

const MembershipContext = createContext<MembershipContextValue | null>(null)

function readStoredMember(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function MembershipProvider({ children }: { children: ReactNode }) {
  const [isMember, setIsMemberState] = useState<boolean>(() =>
    typeof window !== 'undefined' ? readStoredMember() : false,
  )
  const location = useLocation()

  const setIsMember = useCallback((value: boolean) => {
    setIsMemberState(value)
    try {
      localStorage.setItem(STORAGE_KEY, value ? '1' : '0')
    } catch {
      /* ignore quota / private mode */
    }
  }, [])

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('member')
    if (q === '1') setIsMember(true)
    else if (q === '0') setIsMember(false)
  }, [location.search, setIsMember])

  return (
    <MembershipContext.Provider value={{ isMember, setIsMember }}>
      {children}
    </MembershipContext.Provider>
  )
}

export function useMembership(): MembershipContextValue {
  const ctx = useContext(MembershipContext)
  if (!ctx) {
    throw new Error('useMembership must be used within MembershipProvider')
  }
  return ctx
}
