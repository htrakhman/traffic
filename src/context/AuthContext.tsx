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
}

type GoogleProfile = { googleId: string; email: string; name: string; picture?: string }

type AuthContextValue = {
  user: User | null
  login: (email: string, password: string) => { ok: boolean; error?: string }
  signup: (name: string, email: string, password: string) => { ok: boolean; error?: string }
  loginWithGoogle: (profile: GoogleProfile) => { ok: boolean; error?: string }
  logout: () => void
  updateUser: (updates: Partial<Omit<User, 'id' | 'passwordHash'>>) => void
  activateMembership: () => void
  cancelMembership: () => void
  isMemberActive: boolean
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
    // Re-hydrate from users store in case it was updated
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
      // Auto-create account on first Google sign-in
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
      // Update google fields
      found = { ...found, googleId: profile.googleId, picture: profile.picture }
      users[key] = found
      saveUsers(users)
    }
    setUser(found)
    return { ok: true }
  }, [setUser])

  const logout = useCallback(() => {
    setUser(null)
    window.google?.accounts.id.cancel?.()
  }, [setUser])

  const updateUser = useCallback((updates: Partial<Omit<User, 'id' | 'passwordHash'>>) => {
    if (!user) return
    const users = loadUsers()
    const updated = { ...user, ...updates }
    users[user.email] = updated
    saveUsers(users)
    setUser(updated)
  }, [user, setUser])

  const activateMembership = useCallback(() => {
    if (!user) return
    const now = new Date()
    const expiry = new Date(now)
    expiry.setMonth(expiry.getMonth() + 1)
    const users = loadUsers()
    const updated: User = {
      ...user,
      isMember: true,
      memberSince: user.memberSince ?? now.toISOString(),
      memberExpiry: expiry.toISOString(),
    }
    users[user.email] = updated
    saveUsers(users)
    setUser(updated)
  }, [user, setUser])

  const cancelMembership = useCallback(() => {
    if (!user) return
    const users = loadUsers()
    const updated: User = { ...user, isMember: false, memberExpiry: undefined }
    users[user.email] = updated
    saveUsers(users)
    setUser(updated)
  }, [user, setUser])

  const isMemberActive = user ? memberIsActive(user) : false

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout, updateUser, activateMembership, cancelMembership, isMemberActive }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
