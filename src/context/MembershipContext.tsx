import { createContext, useContext, type ReactNode } from 'react'
import { useAuth } from './AuthContext'

type MembershipContextValue = {
  isMember: boolean
  /** @deprecated Use AuthContext.activateMembership / cancelMembership instead */
  setIsMember: (value: boolean) => void
}

const MembershipContext = createContext<MembershipContextValue | null>(null)

export function MembershipProvider({ children }: { children: ReactNode }) {
  const { isMemberActive, activateMembership, cancelMembership } = useAuth()

  const setIsMember = (value: boolean) => {
    if (value) activateMembership()
    else cancelMembership()
  }

  return (
    <MembershipContext.Provider value={{ isMember: isMemberActive, setIsMember }}>
      {children}
    </MembershipContext.Provider>
  )
}

export function useMembership(): MembershipContextValue {
  const ctx = useContext(MembershipContext)
  if (!ctx) throw new Error('useMembership must be used within MembershipProvider')
  return ctx
}
