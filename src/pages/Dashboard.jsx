import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useSessionTimer } from '../hooks/useSessionTimer'
import { Package, ShoppingCart, User, ArrowRight, Clock, Sparkles } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const { cart, cartTotal, cartCount } = useCart()
  const { formatted, isWarning } = useSessionTimer()
  const navigate = useNavigate()

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const cards = [
    {
      icon: Package, label: 'Browse Products', desc: 'Discover thousands of curated items',
      action: () => navigate('/products'), color: 'from-brand-500 to-brand-600', stat: 'New arrivals daily'
    },
    {
      icon: ShoppingCart, label: 'View Cart', desc: `${cartCount} items · $${cartTotal.toFixed(2)}`,
      action: () => navigate('/cart'), color: 'from-surface-700 to-surface-800', stat: cartCount > 0 ? 'Ready to checkout' : 'Cart is empty'
    },
    {
      icon: User, label: 'My Profile', desc: 'Manage your account details',
      action: () => navigate('/profile'), color: 'from-surface-600 to-surface-700', stat: user?.email
    },
  ]

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* Hero welcome */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-brand-500 text-sm font-body font-medium mb-2">
          <Sparkles size={14} />
          <span>{greeting()}</span>
        </div>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-2">
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-surface-400 font-body text-lg">Here's what's happening with your account.</p>
      </div>

      {/* Session banner */}
      <div className={`mb-8 p-4 rounded-2xl flex items-center gap-4 border ${
        isWarning
          ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700'
      }`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isWarning ? 'bg-red-100 dark:bg-red-900/40' : 'bg-brand-50 dark:bg-brand-900/30'}`}>
          <Clock size={18} className={isWarning ? 'text-red-500' : 'text-brand-500'} />
        </div>
        <div className="flex-1">
          <p className={`text-sm font-medium font-body ${isWarning ? 'text-red-700 dark:text-red-300' : 'text-surface-700 dark:text-surface-300'}`}>
            {isWarning ? '⚠ Session expiring soon!' : 'Session active'}
          </p>
          <p className={`text-xs font-body ${isWarning ? 'text-red-500' : 'text-surface-400'}`}>
            {isWarning ? 'You will be logged out automatically.' : 'Your session is secure and active.'}
          </p>
        </div>
        <span className={`font-mono text-lg font-bold ${isWarning ? 'text-red-500 animate-pulse' : 'text-brand-500'}`}>
          {formatted}
        </span>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Cart Items', value: cartCount, suffix: 'items' },
          { label: 'Cart Total', value: `$${cartTotal.toFixed(2)}`, suffix: '' },
          { label: 'Member Since', value: new Date().getFullYear(), suffix: '' },
          { label: 'Status', value: 'Active', suffix: '' },
        ].map(({ label, value, suffix }) => (
          <div key={label} className="bg-white dark:bg-surface-800 rounded-2xl p-4 border border-surface-100 dark:border-surface-700">
            <p className="text-xs font-body text-surface-400 mb-1">{label}</p>
            <p className="font-display text-xl font-bold text-surface-900 dark:text-white">
              {value} <span className="text-sm font-body font-normal text-surface-400">{suffix}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Action cards */}
      <h2 className="font-display text-lg font-semibold text-surface-900 dark:text-white mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ icon: Icon, label, desc, action, color, stat }) => (
          <button
            key={label} onClick={action}
            className="group bg-white dark:bg-surface-800 rounded-2xl p-6 border border-surface-100 dark:border-surface-700 hover:border-brand-200 dark:hover:border-brand-700 text-left transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/10 hover:-translate-y-0.5"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
              <Icon size={22} className="text-white" />
            </div>
            <h3 className="font-display text-base font-semibold text-surface-900 dark:text-white mb-1">{label}</h3>
            <p className="text-sm text-surface-400 font-body mb-4 line-clamp-1">{desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-surface-300 dark:text-surface-600 font-body truncate">{stat}</span>
              <ArrowRight size={16} className="text-brand-400 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
