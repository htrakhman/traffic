import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'

export type User = {
  id: string
  email: string
  name: string
  company?: string
  phone?: string
  passwordHash: string
  googleId?: string
  picture?: string
  isMember: boolean
  memberSince?: string
  memberExpiry?: string
  /** Set after Stripe Checkout subscription; used for portal + renewal sync. */
  stripeCustomerId?: string
  stripeSubscriptionId?: string
}

type GoogleProfile = { googleId: string; email: string; name: string; picture?: string }

type AuthContextValue = {
  user: User | null
  login: (email: string, password: string) => { ok: boolean; error?: string }
  signup: (name: string, email: string, password: string) => { ok: boolean; error?: string }
  loginWithGoogle: (profile: GoogleProfile) => { ok: boolean; error?: string }
  logout: () => void
  updateUser: (updates: Partial<Omit<User, 'id' | 'passwordHash'>>) => void
  /** Clears local membership only (legacy accounts without Stripe). Stripe subscribers use the billing portal. */
  cancelMembership: () => void
  isMemberActive: boolean
  startStripeMembershipCheckout: (options?: {
    /** Return URL after Stripe; use when membership is started from cart checkout. */
    returnToCheckout?: boolean
  }) => Promise<{ ok: boolean; error?: string }>
  completeStripeMembershipCheckout: (sessionId: string) => Promise<{ ok: boolean; error?: string }>
  refreshStripeMembership: () => Promise<void>
  openStripeCustomerPortal: () => Promise<{ ok: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const USERS_KEY = 'traffic-rentals-users'
const SESSION_KEY = 'traffic-rentals-session'

/** Very simple hash — good enough for demo localStorage auth */
function simpleHash(str: string): string {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0
  }
  return h.toString(16)
}

function loadUsers(): Record<string, User> {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveUsers(users: Record<string, User>) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch {}
}

function loadSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveSession(user: User | null) {
  try {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  } catch {}
}

function memberIsActive(user: User): boolean {
  if (!user.isMember) return false
  if (!user.memberExpiry) return false
  return new Date(user.memberExpiry) > new Date()
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(() => {
    const s = loadSession()
    if (!s) return null
    const users = loadUsers()
    return users[s.email] ?? s
  })

  const setUser = useCallback((u: User | null) => {
    setUserState(u)
    saveSession(u)
  }, [])

  const login = useCallback((email: string, password: string) => {
    const users = loadUsers()
    const found = users[email.toLowerCase()]
    if (!found) return { ok: false, error: 'No account found with that email.' }
    if (found.passwordHash !== simpleHash(password)) return { ok: false, error: 'Incorrect password.' }
    setUser(found)
    return { ok: true }
  }, [setUser])

  const signup = useCallback((name: string, email: string, password: string) => {
    if (!name.trim()) return { ok: false, error: 'Name is required.' }
    if (!email.includes('@')) return { ok: false, error: 'Enter a valid email.' }
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' }

    const users = loadUsers()
    const key = email.toLowerCase()
    if (users[key]) return { ok: false, error: 'An account with that email already exists.' }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: key,
      name: name.trim(),
      passwordHash: simpleHash(password),
      isMember: false,
    }
    users[key] = newUser
    saveUsers(users)
    setUser(newUser)
    return { ok: true }
  }, [setUser])

  const loginWithGoogle = useCallback((profile: GoogleProfile) => {
    const users = loadUsers()
    const key = profile.email.toLowerCase()
    let found = users[key]
    if (!found) {
      found = {
        id: crypto.randomUUID(),
        email: key,
        name: profile.name,
        passwordHash: '',
        googleId: profile.googleId,
        picture: profile.picture,
        isMember: false,
      }
      users[key] = found
      saveUsers(users)
    } else {
      found = { ...found, googleId: profile.googleId, picture: profile.picture }
      users[key] = found
      saveUsers(users)
    }
    setUser(found)
    return { ok: true }
  }, [setUser])

  const logout = useCallback(() => {
    setUser(null)
    window.google?.accounts?.id?.cancel?.()
  }, [setUser])

  const updateUser = useCallback((updates: Partial<Omit<User, 'id' | 'passwordHash'>>) => {
    if (!user) return
    const users = loadUsers()
    const updated = { ...user, ...updates }
    users[user.email] = updated
    saveUsers(users)
    setUser(updated)
  }, [user, setUser])

  const cancelMembership = useCallback(() => {
    if (!user) return
    if (user.stripeCustomerId) return
    const users = loadUsers()
    const updated: User = {
      ...user,
      isMember: false,
      memberExpiry: undefined,
      memberSince: undefined,
    }
    users[user.email] = updated
    saveUsers(users)
    setUser(updated)
  }, [user, setUser])

  const startStripeMembershipCheckout = useCallback(
    async (options?: { returnToCheckout?: boolean }): Promise<{ ok: boolean; error?: string }> => {
    if (!user) return { ok: false, error: 'Sign in to subscribe.' }
    try {
      const res = await fetch('/api/create-membership-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          returnToCheckout: options?.returnToCheckout === true,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string; detail?: string }
      if (!res.ok) {
        const msg = data.error || data.detail || 'Checkout could not be started.'
        return { ok: false, error: msg }
      }
      if (!data.url) return { ok: false, error: 'No checkout URL returned.' }
      window.location.assign(data.url)
      return { ok: true }
    } catch {
      return { ok: false, error: 'Network error. Use “vercel dev” locally so /api routes exist, or try again.' }
    }
  },
  [user],
)

  const completeStripeMembershipCheckout = useCallback(
    async (sessionId: string): Promise<{ ok: boolean; error?: string }> => {
      if (!user) return { ok: false, error: 'Not signed in.' }
      try {
        const res = await fetch('/api/membership-complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, email: user.email }),
        })
        const data = (await res.json().catch(() => ({}))) as {
          stripeCustomerId?: string
          stripeSubscriptionId?: string
          memberExpiry?: string
          error?: string
          detail?: string
        }
        if (!res.ok) {
          return { ok: false, error: data.error || data.detail || 'Could not verify payment.' }
        }
        const { stripeCustomerId, stripeSubscriptionId, memberExpiry } = data
        if (!stripeCustomerId || !memberExpiry) {
          return { ok: false, error: 'Invalid response from server.' }
        }
        const users = loadUsers()
        const now = new Date().toISOString()
        const updated: User = {
          ...user,
          isMember: true,
          memberSince: user.memberSince ?? now,
          memberExpiry,
          stripeCustomerId,
          stripeSubscriptionId: stripeSubscriptionId || user.stripeSubscriptionId,
        }
        users[user.email] = updated
        saveUsers(users)
        setUser(updated)
        return { ok: true }
      } catch {
        return { ok: false, error: 'Network error.' }
      }
    },
    [user, setUser],
  )

  const refreshStripeMembership = useCallback(async () => {
    if (!user?.stripeCustomerId) return
    try {
      const res = await fetch('/api/membership-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: user.stripeCustomerId }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        active?: boolean
        stripeSubscriptionId?: string
        memberExpiry?: string
      }
      if (!res.ok) return

      const users = loadUsers()
      if (data.active && data.memberExpiry) {
        const updated: User = {
          ...user,
          isMember: true,
          memberExpiry: data.memberExpiry,
          stripeSubscriptionId: data.stripeSubscriptionId || user.stripeSubscriptionId,
        }
        users[user.email] = updated
        saveUsers(users)
        setUser(updated)
      } else {
        const updated: User = {
          ...user,
          isMember: false,
          memberExpiry: undefined,
          stripeSubscriptionId: undefined,
        }
        users[user.email] = updated
        saveUsers(users)
        setUser(updated)
      }
    } catch {
      /* ignore transient errors */
    }
  }, [user, setUser])

  const openStripeCustomerPortal = useCallback(async (): Promise<{ ok: boolean; error?: string }> => {
    if (!user?.stripeCustomerId) return { ok: false, error: 'No Stripe billing profile on this account.' }
    const returnUrl = `${window.location.origin}/account`
    try {
      const res = await fetch('/api/stripe-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: user.stripeCustomerId, returnUrl }),
      })
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string; detail?: string }
      if (!res.ok) {
        return { ok: false, error: data.error || data.detail || 'Could not open billing portal.' }
      }
      if (!data.url) return { ok: false, error: 'No portal URL returned.' }
      window.location.assign(data.url)
      return { ok: true }
    } catch {
      return { ok: false, error: 'Network error.' }
    }
  }, [user])

  const isMemberActive = user ? memberIsActive(user) : false

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        loginWithGoogle,
        logout,
        updateUser,
        cancelMembership,
        isMemberActive,
        startStripeMembershipCheckout,
        completeStripeMembershipCheckout,
        refreshStripeMembership,
        openStripeCustomerPortal,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
