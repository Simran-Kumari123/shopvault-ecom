import { useState } from 'react'
import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../context/ThemeContext'
import { useSessionTimer } from '../../hooks/useSessionTimer'
import {
  ShoppingBag, LayoutDashboard, Package, ShoppingCart,
  User, LogOut, Menu, X, Sun, Moon, Clock, ChevronRight
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/cart', icon: ShoppingCart, label: 'Cart' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const { dark, toggleTheme } = useTheme()
  const { formatted, isWarning } = useSessionTimer()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-surface-100 dark:bg-surface-950 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-surface-900 border-r border-surface-100 dark:border-surface-800
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-surface-100 dark:border-surface-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <ShoppingBag size={16} className="text-white" />
            </div>
            <span className="font-display text-lg font-semibold text-surface-900 dark:text-white">ShopVault</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-surface-400 hover:text-surface-600 dark:hover:text-surface-200">
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="px-4 py-4 mx-3 mt-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-sm font-body">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-surface-900 dark:text-white truncate font-body">{user?.name}</p>
              <p className="text-xs text-surface-400 truncate font-body">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Session Timer */}
        <div className={`mx-3 mt-2 px-4 py-2.5 rounded-xl flex items-center gap-2 ${isWarning ? 'bg-red-50 dark:bg-red-900/20' : 'bg-brand-50 dark:bg-brand-900/20'}`}>
          <Clock size={14} className={isWarning ? 'text-red-500' : 'text-brand-500'} />
          <span className={`font-mono text-sm font-medium ${isWarning ? 'text-red-600 dark:text-red-400 animate-pulse' : 'text-brand-600 dark:text-brand-400'}`}>
            {formatted}
          </span>
          <span className="text-xs text-surface-400 font-body">session</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to} to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm font-medium transition-all duration-150 group relative
                ${isActive
                  ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'
                  : 'text-surface-500 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-white'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={isActive ? 'text-brand-500' : ''} />
                  <span className="flex-1">{label}</span>
                  {label === 'Cart' && cartCount > 0 && (
                    <span className="bg-brand-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                  {isActive && <ChevronRight size={14} className="text-brand-400" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="px-3 py-4 border-t border-surface-100 dark:border-surface-800 space-y-1">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-surface-500 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-white font-body text-sm font-medium transition-all"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-body text-sm font-medium transition-all"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar (mobile) */}
        <header className="lg:hidden sticky top-0 z-10 bg-white dark:bg-surface-900 border-b border-surface-100 dark:border-surface-800 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white p-1">
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-brand-500" />
            <span className="font-display font-semibold text-surface-900 dark:text-white">ShopVault</span>
          </div>
          <NavLink to="/cart" className="relative">
            <ShoppingCart size={22} className="text-surface-500 dark:text-surface-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </NavLink>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
