import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

const SESSION_DURATION = 5 * 60 * 1000 // 5 minutes in ms

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [sessionExpiry, setSessionExpiry] = useState(null)
  const [loading, setLoading] = useState(true)

  const logout = useCallback((expired = false) => {
    setUser(null)
    setSessionExpiry(null)
    localStorage.removeItem('session')
    if (expired) {
      toast.error('Session expired. Please login again.', { id: 'session-expired' })
    }
  }, [])

  // Restore session from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('session')
    if (saved) {
      try {
        const { user: savedUser, expiry } = JSON.parse(saved)
        if (Date.now() < expiry) {
          setUser(savedUser)
          setSessionExpiry(expiry)
        } else {
          localStorage.removeItem('session')
          toast.error('Session expired. Please login again.', { id: 'session-expired' })
        }
      } catch {
        localStorage.removeItem('session')
      }
    }
    setLoading(false)
  }, [])

  // Session timer - check every second
  useEffect(() => {
    if (!sessionExpiry) return
    const interval = setInterval(() => {
      if (Date.now() >= sessionExpiry) {
        logout(true)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [sessionExpiry, logout])

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const exists = users.find(u => u.email === email)
    if (exists) {
      throw new Error('An account with this email already exists.')
    }
    const newUser = { id: Date.now().toString(), name, email, password }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    toast.success('Account created! Please login.')
    return true
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) {
      throw new Error('Invalid email or password.')
    }
    const expiry = Date.now() + SESSION_DURATION
    const sessionUser = { id: found.id, name: found.name, email: found.email }
    setUser(sessionUser)
    setSessionExpiry(expiry)
    localStorage.setItem('session', JSON.stringify({ user: sessionUser, expiry }))
    toast.success(`Welcome back, ${found.name}!`)
    return true
  }

  const updateProfile = (updates) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const idx = users.findIndex(u => u.id === user.id)
    if (idx === -1) throw new Error('User not found.')

    // Check email uniqueness if changed
    if (updates.email && updates.email !== user.email) {
      const emailTaken = users.find(u => u.email === updates.email && u.id !== user.id)
      if (emailTaken) throw new Error('Email already in use by another account.')
    }

    const updated = { ...users[idx], ...updates }
    users[idx] = updated
    localStorage.setItem('users', JSON.stringify(users))

    const updatedSession = { id: updated.id, name: updated.name, email: updated.email }
    setUser(updatedSession)
    // Extend session on profile update
    const expiry = sessionExpiry
    localStorage.setItem('session', JSON.stringify({ user: updatedSession, expiry }))
    toast.success('Profile updated successfully!')
  }

  const getTimeRemaining = () => {
    if (!sessionExpiry) return 0
    return Math.max(0, sessionExpiry - Date.now())
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, getTimeRemaining, sessionExpiry }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
