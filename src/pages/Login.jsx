import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, LogIn, ShoppingBag } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || '/dashboard'

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      login(form.email.trim().toLowerCase(), form.password)
      navigate(from, { replace: true })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-surface-900 dark:bg-surface-800 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, #f97316 0%, transparent 50%), radial-gradient(circle at 70% 30%, #c2410c 0%, transparent 40%)' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-brand-400" size={28} />
            <span className="font-display text-white text-2xl font-semibold">ShopVault</span>
          </div>
        </div>
        <div className="relative z-10">
          <h2 className="font-display text-white text-4xl font-bold leading-tight mb-4">
            Your personal<br />shopping universe.
          </h2>
          <p className="text-surface-300 font-body text-lg">
            Premium products. Seamless experience. Curated just for you.
          </p>
        </div>
        <div className="relative z-10">
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-surface-200 font-body text-sm italic mb-3">"ShopVault completely changed how I shop online. The experience is unmatched."</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-400 flex items-center justify-center text-white text-xs font-bold">A</div>
              <div>
                <p className="text-white text-sm font-medium">Aisha Sharma</p>
                <p className="text-surface-400 text-xs">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-slide-up">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <ShoppingBag className="text-brand-500" size={22} />
            <span className="font-display text-xl font-semibold dark:text-white">ShopVault</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-surface-900 dark:text-white mb-2">Welcome back</h1>
          <p className="text-surface-400 mb-8 font-body">Sign in to your account to continue.</p>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-body animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5 font-body">Email</label>
              <input
                name="email" type="email" required value={form.email} onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-white placeholder-surface-300 dark:placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-brand-500 font-body transition"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-surface-700 dark:text-surface-300 font-body">Password</label>
              </div>
              <div className="relative">
                <input
                  name="password" type={showPass ? 'text' : 'password'} required value={form.password} onChange={handleChange}
                  placeholder="Your password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-white placeholder-surface-300 dark:placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-brand-500 font-body transition"
                />
                <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-200">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white rounded-xl font-medium font-body flex items-center justify-center gap-2 transition-all duration-200 mt-2"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><LogIn size={18} /> Sign In</>}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800">
            <p className="text-xs text-brand-700 dark:text-brand-300 font-body">
              <span className="font-semibold">Demo tip:</span> Register a new account to get started. Sessions last 5 minutes.
            </p>
          </div>

          <p className="text-center text-surface-500 dark:text-surface-400 mt-6 font-body text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-500 hover:text-brand-600 font-medium">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
