import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useStore from '../store/useStore'

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useStore()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Give fetchMe() (called in App.jsx on load) up to 300ms to resolve
    // before deciding to redirect. Prevents black screen flash.
    const t = setTimeout(() => setChecking(false), 300)
    return () => clearTimeout(t)
  }, [])

  // If we have a token but fetchMe hasn't returned yet, show nothing
  if (checking && localStorage.getItem('g_access')) return null

  if (!isLoggedIn) return <Navigate to="/login" replace />
  return children
}
