import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export function useSessionTimer() {
  const { getTimeRemaining, sessionExpiry } = useAuth()
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining())
    }, 1000)
    return () => clearInterval(interval)
  }, [sessionExpiry])

  const minutes = Math.floor(timeLeft / 60000)
  const seconds = Math.floor((timeLeft % 60000) / 1000)
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  const isWarning = timeLeft < 60000 && timeLeft > 0

  return { timeLeft, formatted, isWarning }
}
