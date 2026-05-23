import { createContext, useContext, useMemo, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'

type AdminAuth = {
  email: string
  setEmail: (e: string) => void
  headers: () => Record<string, string>
}

const AdminAuthContext = createContext<AdminAuth | null>(null)

function AdminEmailGate({ onDone }: { onDone: (e: string) => void }) {
  const [draft, setDraft] = useState('')
  return (
    <>
      <input
        type="email"
        className="input-dark w-full mb-3"
        placeholder="you@example.com"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />
      <button
        type="button"
        className="btn-primary"
        onClick={() => {
          localStorage.setItem('tcs-admin-email', draft.trim())
          onDone(draft.trim())
        }}
      >
        Continue
      </button>
    </>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth outside provider')
  return ctx
}

export default function AdminLayout() {
  const [email, setEmail] = useState(() => localStorage.getItem('tcs-admin-email') ?? '')

  const value = useMemo(
    () => ({
      email,
      setEmail: (e: string) => {
        setEmail(e)
        localStorage.setItem('tcs-admin-email', e)
      },
      headers: () => ({ 'Content-Type': 'application/json', 'x-admin-email': email }),
    }),
    [email],
  )

  if (!email.trim()) {
    return (
      <main className="min-h-screen pt-28 px-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-white mb-4">Admin sign in</h1>
        <p className="text-slate-400 text-sm mb-4">
          Enter your allowlisted admin email. Must match ADMIN_EMAIL_ALLOWLIST on the server.
        </p>
        <AdminEmailGate onDone={setEmail} />
      </main>
    )
  }

  return (
    <AdminAuthContext.Provider value={value}>
      <div className="min-h-screen bg-slate-950 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex flex-wrap gap-4 mb-8 text-sm">
            <Link to="/admin/supplier-source-map" className="text-brand-400 hover:text-brand-300">
              Supplier Source Map
            </Link>
            <Link to="/admin/orders" className="text-brand-400 hover:text-brand-300">
              Orders
            </Link>
            <Link to="/" className="text-slate-500 hover:text-slate-300">
              Storefront
            </Link>
            <span className="text-slate-600 ml-auto">{email}</span>
          </nav>
          <Outlet />
        </div>
      </div>
    </AdminAuthContext.Provider>
  )
}
