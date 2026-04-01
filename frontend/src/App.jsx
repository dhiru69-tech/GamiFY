import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useStore from './store/useStore'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Play from './pages/Play'
import GamePlay from './pages/GamePlay'
import Leaderboard from './pages/Leaderboard'
import { LoginPage, RegisterPage, ForgotPasswordPage } from './pages/Auth'
import { wakeServer } from './api/client'

export default function App() {
  const { fetchMe, isLoggedIn } = useStore()

  useEffect(() => {
    // Wake up Render backend immediately on app load
    wakeServer()
    if (localStorage.getItem('g_access')) fetchMe()
  }, [])

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg-3)',
            color: 'var(--text-1)',
            border: '1px solid var(--border-bright)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            borderRadius: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#052e16' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#1a0505' } },
          duration: 4000,
        }}
      />
      <Routes>
        {/* Auth pages — no navbar */}
        <Route path="/login"            element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register"         element={isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path="/forgot-password"  element={isLoggedIn ? <Navigate to="/dashboard" /> : <ForgotPasswordPage />} />

        {/* Main app — with navbar */}
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/"            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Landing />} />
              <Route path="/dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/play"        element={<ProtectedRoute><Play /></ProtectedRoute>} />
              <Route path="/play/:id"    element={<ProtectedRoute><GamePlay /></ProtectedRoute>} />
              <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
              <Route path="*"            element={<Navigate to="/" />} />
            </Routes>
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}
