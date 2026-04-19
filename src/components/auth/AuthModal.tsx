import { useState, useEffect, useRef, useCallback } from 'react'
import { X, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

type Mode = 'login' | 'signup'

type Props = {
  defaultMode?: Mode
  onClose: () => void
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (cfg: {
            client_id: string
            callback: (resp: { credential: string }) => void
            ux_mode?: string
          }) => void
          prompt: () => void
          renderButton: (el: HTMLElement, cfg: object) => void
          cancel: () => void
        }
      }
    }
  }
}

function parseJwt(token: string): Record<string, string> {
  try {
    return JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return {}
  }
}

export default function AuthModal({ defaultMode = 'login', onClose }: Props) {
  const { login, signup, loginWithGoogle } = useAuth()
  const [mode, setMode] = useState<Mode>(defaultMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [gsiReady, setGsiReady] = useState(false)
  const backdropRef = useRef<HTMLDivElement>(null)
  const googleBtnRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleGoogleCredential = useCallback((resp: { credential: string }) => {
    const payload = parseJwt(resp.credential)
    const result = loginWithGoogle({
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    })
    if (result.ok) {
      onClose()
    } else {
      setError(result.error ?? 'Google sign-in failed.')
    }
  }, [loginWithGoogle, onClose])

  // Load and initialize GSI
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return

    const init = () => {
      // Maps API sets `window.google` without `accounts.id`; only GSI provides Sign-In.
      if (!window.google?.accounts?.id) return
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
        ux_mode: 'popup',
      })
      setGsiReady(true)
    }

    if (window.google?.accounts?.id) {
      init()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = init
    document.head.appendChild(script)
  }, [handleGoogleCredential])

  // Render Google button — defer one frame so the modal is painted and offsetWidth is valid
  useEffect(() => {
    if (!gsiReady || !googleBtnRef.current || !window.google?.accounts?.id) return
    const el = googleBtnRef.current
    const id = requestAnimationFrame(() => {
      if (!window.google?.accounts?.id || !el) return
      try {
        window.google.accounts.id.renderButton(el, {
          theme: 'outline',
          size: 'large',
          width: Math.max(el.offsetWidth, 300),
          shape: 'rectangular',
          text: mode === 'login' ? 'signin_with' : 'signup_with',
          logo_alignment: 'center',
        })
      } catch {
        // GSI not ready yet — will retry on next state change
      }
    })
    return () => cancelAnimationFrame(id)
  }, [gsiReady, mode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = mode === 'login'
      ? login(email, password)
      : signup(name, email, password)
    setLoading(false)
    if (result.ok) {
      onClose()
    } else {
      setError(result.error ?? 'Something went wrong.')
    }
  }

  const switchMode = () => {
    setMode(m => m === 'login' ? 'signup' : 'login')
    setError('')
  }

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === backdropRef.current) onClose() }}
    >
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl shadow-black/50 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            {mode === 'login'
              ? <LogIn size={20} className="text-brand-400" />
              : <UserPlus size={20} className="text-brand-400" />}
            <h2 className="text-lg font-semibold text-white">
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Google sign-in — only shown when client ID is configured */}
          {GOOGLE_CLIENT_ID && (
            <>
              <div ref={googleBtnRef} className="w-full flex justify-center [&>div]:!w-full" />
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-800" />
                <span className="text-xs text-slate-500 shrink-0">or continue with email</span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>
            </>
          )}

          {/* Manual form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="label">Full name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="John Smith"
                  className="input text-sm"
                  required
                  autoFocus
                />
              </div>
            )}

            <div>
              <label className="label">Email *</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="input text-sm"
                required
                autoFocus={mode === 'login'}
              />
            </div>

            <div>
              <label className="label">Password *</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
                  className="input text-sm pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 justify-center text-base gap-2"
            >
              {mode === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />}
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="text-sm text-center text-slate-500">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={switchMode}
              className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
