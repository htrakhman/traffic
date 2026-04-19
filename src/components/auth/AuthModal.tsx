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
      if (!window.google) return
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
        ux_mode: 'popup',
      })
      setGsiReady(true)
    }

    if (window.google) {
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

  // Render Google button once GSI is ready and ref is available
  useEffect(() => {
    if (!gsiReady || !googleBtnRef.current || !window.google) return
    window.google.accounts.id.renderButton(googleBtnRef.current, {
      theme: 'outline',
      size: 'large',
      width: googleBtnRef.current.offsetWidth || 400,
      shape: 'rectangular',
      text: mode === 'login' ? 'signin_with' : 'signup_with',
      logo_alignment: 'center',
    })
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
          {/* Google sign-in */}
          {GOOGLE_CLIENT_ID ? (
            <>
              <div ref={googleBtnRef} className="w-full flex justify-center [&>div]:!w-full" />
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-800" />
                <span className="text-xs text-slate-500 shrink-0">or continue with email</span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>
            </>
          ) : (
            <button
              type="button"
              disabled
              title="Add VITE_GOOGLE_CLIENT_ID to .env to enable"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-medium text-sm rounded-xl border border-gray-200 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
            </button>
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
