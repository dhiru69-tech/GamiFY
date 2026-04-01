import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'
import toast from 'react-hot-toast'

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

export default function Navbar() {
  const { user, isLoggedIn, logout } = useStore()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const xpForNext = user ? user.level * 200 + 100 : 300
  const pct = user ? Math.min((user.xp / xpForNext) * 100, 100) : 0

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/play',      label: 'Play' },
    { to: '/leaderboard', label: 'Rankings' },
  ]

  return (
    <>
      <nav style={{
        background: 'rgba(6,6,16,0.97)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100,
        height: 60,
        display: 'flex', alignItems: 'center',
        padding: '0 20px',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link
          to={isLoggedIn ? '/dashboard' : '/'}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(135deg, var(--purple), var(--orange))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0,
          }}>G</div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.3px', color: 'var(--text-1)' }}>
            Gamify
          </span>
        </Link>

        {isLoggedIn && user ? (
          <>
            {/* Desktop nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}
              className="nav-desktop">
              <div style={{ display: 'flex', gap: 4 }}>
                {navLinks.map(({ to, label }) => (
                  <Link key={to} to={to} style={{
                    textDecoration: 'none',
                    padding: '6px 12px', borderRadius: 8,
                    fontSize: 13, fontWeight: 600,
                    color: pathname.startsWith(to) ? 'var(--purple-light)' : 'var(--text-2)',
                    background: pathname.startsWith(to) ? 'var(--purple-dim)' : 'transparent',
                    transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}>
                    {label}
                  </Link>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--mono)', marginBottom: 4 }}>
                    LVL {user.level} · {user.xp} / {xpForNext} XP
                  </div>
                  <div className="xp-bar-track" style={{ width: 80 }}>
                    <div className="xp-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  title={`${user.username} — click to sign out`}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--purple), var(--orange))',
                    border: 'none', cursor: 'pointer',
                    fontSize: 12, fontWeight: 800, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.2s', flexShrink: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {user.username.slice(0, 2).toUpperCase()}
                </button>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              className="nav-mobile-toggle"
              onClick={() => setMobileOpen(o => !o)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-1)', display: 'flex', padding: 4,
              }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/login"><button className="btn btn-secondary btn-sm">Sign In</button></Link>
            <Link to="/register"><button className="btn btn-primary btn-sm">Get Started</button></Link>
          </div>
        )}
      </nav>

      {/* Mobile drawer */}
      {isLoggedIn && user && mobileOpen && (
        <div style={{
          position: 'fixed', top: 60, left: 0, right: 0, zIndex: 99,
          background: 'rgba(6,6,16,0.98)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
          padding: '16px 20px 20px',
          animation: 'fadeInUp 0.15s ease',
        }}>
          {/* XP row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 14px', borderRadius: 10,
            background: 'var(--bg-2)', marginBottom: 12,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, var(--purple), var(--orange))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 800, color: '#fff',
            }}>
              {user.username.slice(0, 2).toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', marginBottom: 4 }}>
                {user.username}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--mono)', marginBottom: 4 }}>
                LVL {user.level} · {user.xp} / {xpForNext} XP
              </div>
              <div className="xp-bar-track" style={{ width: '100%' }}>
                <div className="xp-bar-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to}
                onClick={() => setMobileOpen(false)}
                style={{
                  textDecoration: 'none', padding: '11px 14px', borderRadius: 8,
                  fontSize: 14, fontWeight: 600,
                  color: pathname.startsWith(to) ? 'var(--purple-light)' : 'var(--text-2)',
                  background: pathname.startsWith(to) ? 'var(--purple-dim)' : 'transparent',
                }}
              >
                {label}
              </Link>
            ))}
            <div style={{ height: 1, background: 'var(--border)', margin: '8px 0' }} />
            <button
              onClick={handleLogout}
              style={{
                textAlign: 'left', padding: '11px 14px', borderRadius: 8,
                fontSize: 14, fontWeight: 600, color: '#ef4444',
                background: 'none', border: 'none', cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile-toggle { display: none !important; }
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  )
}
