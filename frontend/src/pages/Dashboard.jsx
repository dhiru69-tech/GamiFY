import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useStore from '../store/useStore'
import api from '../api/client'
import XPBar from '../components/XPBar'

// Clean language SVG icons
const PythonSVG = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path d="M15.9 4C10.3 4 10.7 6.4 10.7 6.4v2.7H16v.9H8.6S4 9.4 4 15.1c0 5.7 3.2 5.5 3.2 5.5h1.9v-2.6s-.1-3.2 3.1-3.2h5.4s3 .05 3-2.9V7c0 0 .45-3-4.7-3zM13 5.9c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" fill="#3b82f6"/>
    <path d="M16.1 28c5.6 0 5.2-2.4 5.2-2.4v-2.7h-5.3v-.9h7.4s4.6.6 4.6-5.1c0-5.7-3.2-5.5-3.2-5.5h-1.9v2.6s.1 3.2-3.1 3.2h-5.4s-3-.05-3 2.9V25s-.45 3 4.7 3zm2.9-1.9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#60a5fa"/>
  </svg>
)
const JSSVG = () => (
  <svg width="28" height="28" viewBox="0 0 32 32">
    <rect x="2" y="2" width="28" height="28" rx="4" fill="#f59e0b" opacity="0.15"/>
    <rect x="2" y="2" width="28" height="28" rx="4" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.3"/>
    <text x="6" y="23" fontFamily="'JetBrains Mono',monospace" fontWeight="900" fontSize="14" fill="#f59e0b">JS</text>
  </svg>
)
const CppSVG = () => (
  <svg width="28" height="28" viewBox="0 0 32 32">
    <rect x="2" y="2" width="28" height="28" rx="4" fill="#a78bfa" opacity="0.15"/>
    <rect x="2" y="2" width="28" height="28" rx="4" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.3"/>
    <text x="4" y="22" fontFamily="'JetBrains Mono',monospace" fontWeight="900" fontSize="12" fill="#a78bfa">C++</text>
  </svg>
)
const JavaSVG = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path d="M12 22s-1.5.9 1 1.2c2.9.3 4.4.3 7.6-.3 0 0 .8.5 2 1-7.1 3-16.1-.1-10.6-1.9z" fill="#f97316"/>
    <path d="M11 19.2s-1.7 1.3 1.8 1.5c2.6.2 4.6.2 8.1-.3 0 0 .6.6 1.5.8-7.2 2.1-15.2.2-11.4-2z" fill="#f97316"/>
    <path d="M17.2 13.8c1.5 1.7-.4 3.2-.4 3.2s3.8-2 2-4.4c-1.6-2.3-2.9-3.4 4-7.3 0 0-10.9 2.7-5.6 8.5z" fill="#fb923c"/>
    <path d="M24.2 24.5s1.1.9-1.2 1.6c-4.5 1.4-18.5 1.8-22.4.1-1.4-.6 1.2-1.4 2.1-1.6.9-.2 1.4-.1 1.4-.1-1.6-1.1-10.4 2.2-4.5 3.2C15.8 29.3 29.1 25.5 24.2 24.5z" fill="#f97316"/>
  </svg>
)

const LANG_TRACKS = [
  { key: 'python',     name: 'Python',     color: '#3b82f6', Icon: PythonSVG },
  { key: 'javascript', name: 'JavaScript', color: '#f59e0b', Icon: JSSVG },
  { key: 'cpp',        name: 'C++',        color: '#a78bfa', Icon: CppSVG },
  { key: 'java',       name: 'Java',       color: '#f97316', Icon: JavaSVG },
]

const PlayIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
)
const RankIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="18" width="12" height="4"/>
  </svg>
)

export default function Dashboard() {
  const { user } = useStore()
  const [stats, setStats]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/progress/stats')
      .then(r => setStats(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (!user) return null

  const STAT_CARDS = [
    { label: 'Challenges Solved', value: loading ? '—' : (stats?.completed ?? 0),                sub: 'total completed' },
    { label: 'Accuracy Rate',     value: loading ? '—' : `${stats?.accuracy ?? 0}%`,              sub: 'correct submissions' },
    { label: 'Total XP Earned',   value: loading ? '—' : (user.total_xp || 0).toLocaleString(),  sub: 'all time' },
    { label: 'Current Streak',    value: loading ? '—' : `${user.streak_days}d`,                  sub: user.streak_days >= 5 ? 'Streak bonus active' : 'Keep going!' },
  ]

  return (
    <div className="container page-enter">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ marginBottom: 6 }}>
          Welcome back,{' '}
          <span style={{ color: 'var(--purple-light)' }}>{user.username}</span>
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
          // {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <XPBar user={user} />

      <div className="grid-2" style={{ marginBottom: 28 }}>
        {STAT_CARDS.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 28 }}>
        <div className="section-label">Language Tracks</div>
        <div className="grid-4">
          {LANG_TRACKS.map(({ key, name, color, Icon }) => {
            const langData = stats?.lang_stats?.[key]
            const pct   = langData ? langData.pct : 0
            const done  = langData ? langData.completed : 0
            const total = langData ? langData.total : 0
            return (
              <Link key={key} to={`/play?lang=${key}`} style={{ textDecoration: 'none' }}>
                <div className="card card-interactive" style={{ padding: '18px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                    <Icon />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13, color, marginBottom: 4 }}>{name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--mono)', marginBottom: 10 }}>
                    {loading ? '...' : `${done} / ${total} solved`}
                  </div>
                  <div className="xp-bar-track">
                    <div style={{
                      height: '100%', width: loading ? '0%' : `${pct}%`,
                      background: color, borderRadius: 3, transition: 'width 1s ease',
                    }} />
                  </div>
                  <div style={{ fontSize: 9, color: 'var(--text-4)', marginTop: 6, fontFamily: 'var(--mono)' }}>
                    {loading ? '' : `${pct}%`}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <Link to="/play" style={{ flex: 1 }}>
          <button className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15, gap: 8 }}>
            <PlayIcon /> Play Now
          </button>
        </Link>
        <Link to="/leaderboard" style={{ flex: 1 }}>
          <button className="btn btn-secondary" style={{ width: '100%', padding: '14px', fontSize: 15, gap: 8 }}>
            <RankIcon /> Rankings
          </button>
        </Link>
      </div>
    </div>
  )
}
