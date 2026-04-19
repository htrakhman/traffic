import { createContext, useContext, type ReactNode } from 'react'
import { useAuth } from './AuthContext'

type MembershipContextValue = {
  isMember: boolean
}

const MembershipContext = createContext<MembershipContextValue | null>(null)

export function MembershipProvider({ children }: { children: ReactNode }) {
  const { isMemberActive } = useAuth()

  return (
    <MembershipContext.Provider value={{ isMember: isMemberActive }}>
      {children}
    </MembershipContext.Provider>
  )
}

export function useMembership(): MembershipContextValue {
  const ctx = useContext(MembershipContext)
  if (!ctx) throw new Error('useMembership must be used within MembershipProvider')
  return ctx
}
