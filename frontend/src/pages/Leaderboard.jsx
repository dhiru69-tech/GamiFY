import { useEffect, useState } from 'react'
import api from '../api/client'

const MEDAL_COLORS = { 1: '#f59e0b', 2: '#94a3b8', 3: '#cd7f32' }

// Medal SVG icons — gold / silver / bronze
const MedalIcon = ({ rank }) => {
  const color = MEDAL_COLORS[rank]
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5"/>
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill={color} fontFamily="monospace">
        {rank}
      </text>
    </svg>
  )
}

const FlameIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round">
    <path d="M12 2c0 6-6 8-6 14a6 6 0 0 0 12 0c0-6-6-8-6-14z"/>
  </svg>
)

export default function Leaderboard() {
  const [board, setBoard]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/leaderboard/').then(r => setBoard(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="container page-enter">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ marginBottom: 6 }}>Global Rankings</h1>
        <p style={{ fontSize: 13, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
          // updated in real time · {board.length} players
        </p>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '52px 1fr 80px 100px',
          gap: 12, padding: '12px 20px',
          borderBottom: '1px solid var(--border)',
          fontSize: 10, color: 'var(--text-4)',
          textTransform: 'uppercase', letterSpacing: 1.2,
        }}>
          <span>Rank</span><span>Player</span>
          <span style={{ textAlign: 'center' }}>Level</span>
          <span style={{ textAlign: 'right' }}>Total XP</span>
        </div>

        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
            Loading rankings...
          </div>
        ) : board.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-3)' }}>
            No players yet. Be the first!
          </div>
        ) : board.map((entry, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '52px 1fr 80px 100px',
            gap: 12, padding: '14px 20px',
            borderBottom: i < board.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            background: entry.is_me ? 'rgba(124,58,237,0.06)' : 'transparent',
            borderLeft: entry.is_me ? '3px solid var(--purple)' : '3px solid transparent',
            alignItems: 'center', transition: 'background 0.15s',
          }}
            onMouseEnter={e => { if (!entry.is_me) e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
            onMouseLeave={e => { e.currentTarget.style.background = entry.is_me ? 'rgba(124,58,237,0.06)' : 'transparent' }}
          >
            {/* Rank */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {entry.rank <= 3
                ? <MedalIcon rank={entry.rank} />
                : <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
                    #{entry.rank}
                  </span>
              }
            </div>

            {/* Player */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                background: entry.is_me ? 'rgba(124,58,237,0.3)' : 'var(--bg-4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700,
                color: entry.is_me ? 'var(--purple-light)' : 'var(--text-2)',
              }}>
                {entry.username.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: entry.is_me ? 'var(--text-1)' : 'var(--text-2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {entry.username}
                  {entry.is_me && <span style={{ fontSize: 9, color: 'var(--purple-light)', fontFamily: 'var(--mono)', letterSpacing: 1 }}>YOU</span>}
                </div>
                {entry.streak > 0 && (
                  <div style={{ fontSize: 10, color: 'var(--text-4)', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <FlameIcon />{entry.streak}-day streak
                  </div>
                )}
              </div>
            </div>

            {/* Level */}
            <div style={{ textAlign: 'center' }}>
              <span style={{
                padding: '3px 10px', borderRadius: 'var(--r-full)',
                background: 'var(--purple-dim)', color: 'var(--purple-light)',
                fontSize: 11, fontWeight: 700, fontFamily: 'var(--mono)',
              }}>
                LVL {entry.level}
              </span>
            </div>

            {/* XP */}
            <div style={{ textAlign: 'right', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 13, color: 'var(--orange)' }}>
              {entry.total_xp.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
