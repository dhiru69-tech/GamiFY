import { useNavigate } from 'react-router-dom'

// SVG icons — clean, no emojis
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const DIFF_COLOR = {
  easy:   { bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.25)',  text: '#10b981' },
  medium: { bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)',  text: '#f59e0b' },
  hard:   { bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.25)',   text: '#ef4444' },
  boss:   { bg: 'rgba(236,72,153,0.1)',  border: 'rgba(236,72,153,0.25)', text: '#ec4899' },
}

// Mode icons as SVG
const ModeIcon = ({ mode }) => {
  const s = { width: 13, height: 13, flexShrink: 0 }
  const c = { stroke: 'currentColor', fill: 'none', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (mode === 'puzzle')  return <svg viewBox="0 0 24 24" style={s} {...c}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
  if (mode === 'battle')  return <svg viewBox="0 0 24 24" style={s} {...c}><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  if (mode === 'quest')   return <svg viewBox="0 0 24 24" style={s} {...c}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
  if (mode === 'debug')   return <svg viewBox="0 0 24 24" style={s} {...c}><rect x="8" y="6" width="8" height="14" rx="4"/><path d="M19 7l-3 2M5 7l3 2M19 12h-4M5 12h4M19 17l-3-2M5 17l3-2"/></svg>
  if (mode === 'boss')    return <svg viewBox="0 0 24 24" style={s} {...c}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
  return null
}

const MODE_LABELS = { puzzle: 'Puzzle', battle: 'Battle', quest: 'Quest', debug: 'Debug', boss: 'Boss' }
const LANG_LABELS  = { python: 'Python', javascript: 'JavaScript', cpp: 'C++', java: 'Java' }

export default function ChallengeCard({ challenge, completed, userLevel }) {
  const navigate = useNavigate()
  const locked = challenge.level_req > userLevel
  const dc = DIFF_COLOR[challenge.difficulty] || DIFF_COLOR.easy

  return (
    <div
      className={`challenge-card ${challenge.difficulty} ${locked ? 'locked' : ''}`}
      onClick={() => !locked && navigate(`/play/${challenge.id}`)}
    >
      {/* Difficulty indicator dot */}
      <div style={{
        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: dc.bg, border: `1px solid ${dc.border}`,
      }}>
        {completed
          ? <CheckIcon />
          : <div style={{ width: 10, height: 10, borderRadius: '50%', background: dc.text }} />
        }
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: locked ? 'var(--text-3)' : 'var(--text-1)' }}>
            {challenge.title}
          </span>
          <span className={`pill pill-${challenge.difficulty}`}>{challenge.difficulty}</span>
          {locked && (
            <span style={{ fontSize: 10, color: 'var(--orange)', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <LockIcon /> Lvl {challenge.level_req}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="mode-badge" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <ModeIcon mode={challenge.game_mode} />
            {MODE_LABELS[challenge.game_mode]}
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
            {LANG_LABELS[challenge.language]} · {Math.floor(challenge.time_limit / 60)}m
          </span>
        </div>
      </div>

      {/* XP */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--orange)', fontFamily: 'var(--mono)' }}>
          +{challenge.xp_reward}
        </div>
        <div style={{ fontSize: 10, color: completed ? 'var(--green)' : 'var(--text-3)' }}>
          {completed ? 'Solved' : 'XP'}
        </div>
      </div>
    </div>
  )
}
