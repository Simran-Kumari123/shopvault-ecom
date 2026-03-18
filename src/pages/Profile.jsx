import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { User, Mail, Lock, Eye, EyeOff, Save, Edit3, Shield } from 'lucide-react'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '', confirmPassword: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSave = () => {
    setError('')
    if (!form.name.trim()) { setError('Name is required.'); return }
    if (!form.email.trim()) { setError('Email is required.'); return }
    if (form.password && form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (form.password && form.password !== form.confirmPassword) { setError('Passwords do not match.'); return }

    setLoading(true)
    try {
      const updates = { name: form.name.trim(), email: form.email.trim().toLowerCase() }
      if (form.password) updates.password = form.password
      updateProfile(updates)
      setEditing(false)
      setForm(p => ({ ...p, password: '', confirmPassword: '' }))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditing(false)
    setError('')
    setForm({ name: user?.name || '', email: user?.email || '', password: '', confirmPassword: '' })
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-surface-900 dark:text-white mb-1">My Profile</h1>
        <p className="text-surface-400 font-body">Manage your account information.</p>
      </div>

      {/* Avatar card */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-100 dark:border-surface-700 p-6 mb-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-display text-2xl font-bold flex-shrink-0">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-surface-900 dark:text-white">{user?.name}</h2>
          <p className="text-surface-400 font-body text-sm">{user?.email}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Shield size={12} className="text-green-500" />
            <span className="text-xs text-green-500 font-body font-medium">Verified Account</span>
          </div>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="ml-auto flex items-center gap-2 px-4 py-2 bg-surface-50 dark:bg-surface-700 hover:bg-brand-50 dark:hover:bg-brand-900/30 text-surface-600 dark:text-surface-300 hover:text-brand-600 dark:hover:text-brand-400 rounded-xl font-body text-sm font-medium transition-all border border-surface-200 dark:border-surface-600"
          >
            <Edit3 size={14} />
            Edit
          </button>
        )}
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-100 dark:border-surface-700 p-6">
        <h3 className="font-display text-base font-semibold text-surface-900 dark:text-white mb-5">Account Details</h3>

        {error && (
          <div className="mb-5 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-body animate-fade-in">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5 font-body flex items-center gap-2">
              <User size={14} />Full Name
            </label>
            {editing ? (
              <input
                name="name" type="text" value={form.name} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-body text-sm transition"
              />
            ) : (
              <div className="px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-900 border border-surface-100 dark:border-surface-700 text-surface-900 dark:text-white font-body text-sm">
                {user?.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5 font-body flex items-center gap-2">
              <Mail size={14} />Email Address
            </label>
            {editing ? (
              <input
                name="email" type="email" value={form.email} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-body text-sm transition"
              />
            ) : (
              <div className="px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-900 border border-surface-100 dark:border-surface-700 text-surface-900 dark:text-white font-body text-sm">
                {user?.email}
              </div>
            )}
          </div>

          {/* Password - only shown when editing */}
          {editing && (
            <>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5 font-body flex items-center gap-2">
                  <Lock size={14} />New Password <span className="text-surface-400 font-normal">(leave blank to keep current)</span>
                </label>
                <div className="relative">
                  <input
                    name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={handleChange}
                    placeholder="New password"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white placeholder-surface-300 dark:placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-brand-500 font-body text-sm transition"
                  />
                  <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {form.password && (
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5 font-body">Confirm New Password</label>
                  <input
                    name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white placeholder-surface-300 dark:placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-brand-500 font-body text-sm transition"
                  />
                </div>
              )}
            </>
          )}
        </div>

        {editing && (
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave} disabled={loading}
              className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white rounded-xl font-medium font-body text-sm flex items-center justify-center gap-2 transition-all"
            >
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={15} />Save Changes</>}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 py-3 bg-surface-50 dark:bg-surface-700 hover:bg-surface-100 dark:hover:bg-surface-600 text-surface-600 dark:text-surface-300 rounded-xl font-medium font-body text-sm transition-all"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Account info */}
      <div className="mt-4 p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl border border-surface-100 dark:border-surface-700">
        <p className="text-xs text-surface-400 font-body text-center">
          Account ID: <span className="font-mono text-surface-500 dark:text-surface-400">{user?.id}</span>
        </p>
      </div>
    </div>
  )
}
