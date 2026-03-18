import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, UserPlus, ShoppingBag } from 'lucide-react'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      register(form.name.trim(), form.email.trim().toLowerCase(), form.password)
      navigate('/login')
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
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ea580c 0%, transparent 40%)' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-brand-400" size={28} />
            <span className="font-display text-white text-2xl font-semibold">ShopVault</span>
          </div>
        </div>
        <div className="relative z-10">
          <h2 className="font-display text-white text-4xl font-bold leading-tight mb-4">
            Join thousands of<br />smart shoppers.
          </h2>
          <p className="text-surface-300 font-body text-lg">
            Discover curated products, track orders, and enjoy a seamless shopping experience.
          </p>
        </div>
        <div className="relative z-10 flex gap-8">
          {[['10K+', 'Products'], ['50K+', 'Users'], ['4.9★', 'Rating']].map(([val, label]) => (
            <div key={label}>
              <div className="text-brand-400 font-display text-2xl font-bold">{val}</div>
              <div className="text-surface-400 text-sm font-body">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-slide-up">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <ShoppingBag className="text-brand-500" size={22} />
            <span className="font-display text-xl font-semibold dark:text-white">ShopVault</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-surface-900 dark:text-white mb-2">Create account</h1>
          <p className="text-surface-400 mb-8 font-body">Start your shopping journey today.</p>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-body animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5 font-body">Full Name</label>
              <input
                name="name" type="text" required value={form.name} onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-white placeholder-surface-300 dark:placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-brand-500 font-body transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5 font-body">Email</label>
              <input
                name="email" type="email" required value={form.email} onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-white placeholder-surface-300 dark:placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-brand-500 font-body transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5 font-body">Password</label>
              <div className="relative">
                <input
                  name="password" type={showPass ? 'text' : 'password'} required value={form.password} onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-white placeholder-surface-300 dark:placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-brand-500 font-body transition"
                />
                <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-200">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5 font-body">Confirm Password</label>
              <input
                name="confirmPassword" type="password" required value={form.confirmPassword} onChange={handleChange}
                placeholder="Repeat password"
                className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-white placeholder-surface-300 dark:placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-brand-500 font-body transition"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white rounded-xl font-medium font-body flex items-center justify-center gap-2 transition-all duration-200 mt-2"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><UserPlus size={18} /> Create Account</>}
            </button>
          </form>

          <p className="text-center text-surface-500 dark:text-surface-400 mt-6 font-body text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-500 hover:text-brand-600 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
