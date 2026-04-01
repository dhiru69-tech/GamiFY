import { useEffect, useState } from 'react'

const FlameIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c0 6-6 8-6 14a6 6 0 0 0 12 0c0-6-6-8-6-14z"/>
    <path d="M12 12c0 3-2 4-2 7a2 2 0 0 0 4 0c0-3-2-4-2-7z"/>
  </svg>
)

export default function XPBar({ user }) {
  const xpForNext = user.level * 200 + 100
  const pct = Math.min((user.xp / xpForNext) * 100, 100)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 150)
    return () => clearTimeout(t)
  }, [pct])

  const tierLabel = user.level < 5 ? 'Beginner' : user.level < 10 ? 'Intermediate' : user.level < 15 ? 'Advanced' : user.level < 20 ? 'Expert' : 'Legend'
  const tierColor = user.level < 5 ? '#10b981' : user.level < 10 ? '#3b82f6' : user.level < 15 ? '#a78bfa' : user.level < 20 ? '#f59e0b' : '#ec4899'

  return (
    <div className="card" style={{ padding: '20px 24px', marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            padding: '4px 14px', borderRadius: 'var(--r-full)',
            background: `${tierColor}20`, border: `1px solid ${tierColor}50`,
            fontSize: 12, fontWeight: 700, color: tierColor, fontFamily: 'var(--mono)',
          }}>
            LVL {user.level}
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>{tierLabel}</span>
        </div>
        <span style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text-3)' }}>
          <span style={{ color: 'var(--orange)', fontWeight: 700 }}>{user.xp.toLocaleString()}</span>
          {' '}/ {xpForNext.toLocaleString()} XP
        </span>
      </div>
      <div className="xp-bar-track" style={{ height: 8 }}>
        <div className="xp-bar-fill" style={{ width: `${width}%` }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: 4 }}>
          {user.streak_days > 0 && (
            <>
              <FlameIcon />
              <span>{user.streak_days}-day streak</span>
              {user.streak_days >= 5 && <span style={{ color: 'var(--orange)', marginLeft: 4 }}>· 1.5× XP active</span>}
            </>
          )}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
          {(xpForNext - user.xp).toLocaleString()} XP to Level {user.level + 1}
        </div>
      </div>
    </div>
  )
}
