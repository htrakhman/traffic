import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  User as UserIcon,
  LogOut,
  Crown,
  CheckCircle,
  XCircle,
  CreditCard,
  Truck,
  Package,
  ExternalLink,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AuthModal from '../components/auth/AuthModal'

export default function Account() {
  const {
    user,
    logout,
    cancelMembership,
    isMemberActive,
    startStripeMembershipCheckout,
    completeStripeMembershipCheckout,
    refreshStripeMembership,
    openStripeCustomerPortal,
  } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [cancelling, setCancelling] = useState(false)
  const [joinLoading, setJoinLoading] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const [membershipErr, setMembershipErr] = useState<string | null>(null)
  const [infoBanner, setInfoBanner] = useState<string | null>(null)

  useEffect(() => {
    if (searchParams.get('membership') === 'cancelled') {
      setInfoBanner('Checkout was cancelled. You can subscribe again whenever you are ready.')
      const next = new URLSearchParams(searchParams)
      next.delete('membership')
      setSearchParams(next, { replace: true })
    }
  }, [searchParams, setSearchParams])

  useEffect(() => {
    if (!user?.stripeCustomerId) return
    void refreshStripeMembership()
  }, [user?.id, user?.stripeCustomerId, refreshStripeMembership])

  useEffect(() => {
    if (!user?.stripeCustomerId) return
    const onFocus = () => void refreshStripeMembership()
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [user?.stripeCustomerId, refreshStripeMembership])

  useEffect(() => {
    if (!user) return
    const sessionId = new URLSearchParams(window.location.search).get('session_id')
    if (!sessionId) return

    let cancelled = false
    void completeStripeMembershipCheckout(sessionId).then((result) => {
      if (cancelled) return
      navigate('/account', { replace: true })
      if (result.ok) {
        setMembershipErr(null)
      } else {
        setMembershipErr(result.error || 'Could not activate membership.')
      }
    })

    return () => {
      cancelled = true
    }
  }, [user, completeStripeMembershipCheckout, navigate])

  if (!user) {
    return (
      <main className="min-h-screen pt-28 flex items-center justify-center px-4">
        {showAuth && (
          <AuthModal defaultMode={authMode} onClose={() => setShowAuth(false)} />
        )}
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <UserIcon size={28} className="text-brand-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">My Account</h1>
          <p className="text-slate-400 mb-8">Sign in to manage your profile.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              className="btn-primary px-6"
              onClick={() => {
                setAuthMode('login')
                setShowAuth(true)
              }}
            >
              Sign in
            </button>
            <button
              className="btn-secondary px-6"
              onClick={() => {
                setAuthMode('signup')
                setShowAuth(true)
              }}
            >
              Create account
            </button>
          </div>
        </div>
      </main>
    )
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const expiryDate = user.memberExpiry
    ? new Date(user.memberExpiry).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null

  const handleJoinStripe = async () => {
    setMembershipErr(null)
    setJoinLoading(true)
    const result = await startStripeMembershipCheckout()
    setJoinLoading(false)
    if (!result.ok) {
      setMembershipErr(result.error || 'Could not start checkout.')
    }
  }

  const handleOpenPortal = async () => {
    setMembershipErr(null)
    setPortalLoading(true)
    const result = await openStripeCustomerPortal()
    setPortalLoading(false)
    if (!result.ok) {
      setMembershipErr(result.error || 'Could not open billing portal. Enable the Customer Portal in Stripe Dashboard (Settings → Billing → Customer portal).')
    }
  }

  return (
    <main className="min-h-screen pt-24">
      <div className="border-b border-slate-800/60 bg-slate-900/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
              <UserIcon className="text-brand-400" size={28} />
              My Account
            </h1>
            <p className="text-slate-400">Manage your profile.</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors self-start sm:self-auto"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Profile card */}
        <div className="card p-6">
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
            <UserIcon size={16} className="text-slate-400" />
            Profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="label text-xs block mb-0.5">Name</span>
              <span className="text-white">{user.name}</span>
            </div>
            <div>
              <span className="label text-xs block mb-0.5">Email</span>
              <span className="text-white">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Membership card hidden — platform is focused on drop-ship purchases for now. */}
        {(false as boolean) && (
        <div className="card p-6">
          <h2 className="font-semibold text-white mb-1 flex items-center gap-2">
            <Crown size={16} className="text-amber-400" />
            Monthly Membership
          </h2>
          <p className="text-slate-400 text-sm mb-5">
            $150/month via Stripe — no $150 delivery fee and no $150 pickup fee on orders while your subscription is
            active.
          </p>

          {infoBanner ? (
            <p className="text-sm text-slate-300 bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 mb-4">
              {infoBanner}
            </p>
          ) : null}

          {membershipErr ? (
            <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-4">
              {membershipErr}
            </p>
          ) : null}

          {/* Benefits breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {[
              { icon: <Truck size={18} />, label: 'Delivery fee', saving: '$150 waived' },
              { icon: <Package size={18} />, label: 'Pickup fee', saving: '$150 waived' },
              { icon: <CreditCard size={18} />, label: 'Billed monthly', saving: '$150/mo' },
            ].map(({ icon, label, saving }) => (
              <div key={label} className="bg-slate-800/60 rounded-xl p-3 flex flex-col gap-1">
                <div className="text-brand-400">{icon}</div>
                <div className="text-xs text-slate-400">{label}</div>
                <div className="text-sm font-semibold text-white">{saving}</div>
              </div>
            ))}
          </div>

          {isMemberActive ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <CheckCircle size={16} />
                Active member{expiryDate ? ` · current period through ${expiryDate}` : ''}
              </div>
              {user.stripeCustomerId ? (
                <p className="text-xs text-slate-500">
                  Subscription is managed in Stripe. Use billing to update your card, view invoices, or cancel.
                </p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {user.stripeCustomerId ? (
                  <button
                    type="button"
                    onClick={() => void handleOpenPortal()}
                    disabled={portalLoading}
                    className="btn-secondary gap-2 text-sm disabled:opacity-60"
                  >
                    <ExternalLink size={16} />
                    {portalLoading ? 'Opening…' : 'Manage billing in Stripe'}
                  </button>
                ) : null}
              </div>
              {!user.stripeCustomerId ? (
                cancelling ? (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 space-y-3">
                    <p className="text-sm text-red-300">
                      End this preview membership? Delivery and pickup fees will apply again on new quotes and
                      checkout.
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          cancelMembership()
                          setCancelling(false)
                        }}
                        className="text-sm px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
                      >
                        Yes, end membership
                      </button>
                      <button
                        type="button"
                        onClick={() => setCancelling(false)}
                        className="text-sm px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
                      >
                        Keep membership
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCancelling(true)}
                    className="text-sm text-slate-500 hover:text-red-400 transition-colors"
                  >
                    End local preview membership
                  </button>
                )
              ) : null}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <XCircle size={15} className="text-slate-600" />
                Not subscribed
              </div>
              <button
                type="button"
                onClick={() => void handleJoinStripe()}
                disabled={joinLoading}
                className="btn-primary gap-2 disabled:opacity-60"
              >
                <Crown size={16} />
                {joinLoading ? 'Redirecting to Stripe…' : 'Subscribe for $150/month'}
              </button>
              <p className="text-xs text-slate-500">
                Secure checkout on Stripe (card or other methods you enable). After subscribing, return here — your
                account updates automatically.
              </p>
            </div>
          )}
        </div>
        )}
      </div>
    </main>
  )
}

