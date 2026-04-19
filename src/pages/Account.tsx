import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User as UserIcon,
  LogOut,
  Crown,
  CheckCircle,
  XCircle,
  CreditCard,
  Truck,
  Package,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AuthModal from '../components/auth/AuthModal'

export default function Account() {
  const { user, logout, activateMembership, cancelMembership, isMemberActive } = useAuth()
  const navigate = useNavigate()
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [checkoutDone, setCheckoutDone] = useState(false)
  const [cancelling, setCancelling] = useState(false)

  if (!user) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center px-4">
        {showAuth && (
          <AuthModal defaultMode={authMode} onClose={() => setShowAuth(false)} />
        )}
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <UserIcon size={28} className="text-brand-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">My Account</h1>
          <p className="text-slate-400 mb-8">Sign in to manage your membership and access member pricing.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              className="btn-primary px-6"
              onClick={() => { setAuthMode('login'); setShowAuth(true) }}
            >
              Sign in
            </button>
            <button
              className="btn-secondary px-6"
              onClick={() => { setAuthMode('signup'); setShowAuth(true) }}
            >
              Create account
            </button>
          </div>
        </div>
      </main>
    )
  }

  const handleActivate = () => {
    activateMembership()
    setCheckoutDone(true)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const expiryDate = user.memberExpiry
    ? new Date(user.memberExpiry).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null

  return (
    <main className="min-h-screen pt-20">
      <div className="border-b border-slate-800/60 bg-slate-900/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
              <UserIcon className="text-brand-400" size={28} />
              My Account
            </h1>
            <p className="text-slate-400">Manage your profile and membership.</p>
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

        {/* Membership card */}
        <div className="card p-6">
          <h2 className="font-semibold text-white mb-1 flex items-center gap-2">
            <Crown size={16} className="text-amber-400" />
            Monthly Membership
          </h2>
          <p className="text-slate-400 text-sm mb-5">
            $150/month — skip the $150 delivery fee and $150 pickup fee on every order.
          </p>

          {/* Benefits breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {[
              { icon: <Truck size={18} />, label: 'Delivery fee', saving: '$150 waived' },
              { icon: <Package size={18} />, label: 'Pickup fee', saving: '$150 waived' },
              { icon: <CreditCard size={18} />, label: 'Monthly cost', saving: '$150/mo' },
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
                Active member{expiryDate ? ` · renews ${expiryDate}` : ''}
              </div>
              {cancelling ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 space-y-3">
                  <p className="text-sm text-red-300">Are you sure? You'll lose free delivery and pickup immediately.</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => { cancelMembership(); setCancelling(false) }}
                      className="text-sm px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
                    >
                      Yes, cancel
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
                  Cancel membership
                </button>
              )}
            </div>
          ) : checkoutDone ? (
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
              <CheckCircle size={16} />
              Membership activated! Free delivery and pickup apply to your next order.
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <XCircle size={15} className="text-slate-600" />
                Not a member
              </div>
              <button
                type="button"
                onClick={handleActivate}
                className="btn-primary gap-2"
              >
                <Crown size={16} />
                Join for $150/month
              </button>
              <p className="text-xs text-slate-500">
                No payment is charged here — your first invoice will include the $150 membership fee. Cancel anytime.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
