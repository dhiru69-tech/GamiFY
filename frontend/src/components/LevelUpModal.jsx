import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

export default function LevelUpModal({ newLevel, onClose }) {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight })

  useEffect(() => {
    const resize = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', resize)
    const t = setTimeout(onClose, 6000)
    return () => { window.removeEventListener('resize', resize); clearTimeout(t) }
  }, [onClose])

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(6,6,16,0.92)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 0.3s ease', cursor: 'pointer',
    }}>
      <Confetti
        width={size.w} height={size.h}
        colors={['#7c3aed','#f97316','#a78bfa','#ec4899','#10b981','#fbbf24']}
        numberOfPieces={350} recycle={false}
      />
      <div style={{ textAlign: 'center', animation: 'levelUpPop 0.5s cubic-bezier(.22,1,.36,1) both' }}
        onClick={e => e.stopPropagation()}>

        {/* Trophy SVG instead of emoji */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%', margin: '0 auto 20px',
          background: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(124,58,237,0.2))',
          border: '2px solid rgba(249,115,22,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
            stroke="url(#tg)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="tg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa"/>
                <stop offset="100%" stopColor="#f97316"/>
              </linearGradient>
            </defs>
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="18" width="12" height="4"/>
          </svg>
        </div>

        <div style={{
          fontSize: 11, letterSpacing: 4, textTransform: 'uppercase',
          color: 'var(--purple-light)', fontFamily: 'var(--mono)', marginBottom: 12,
        }}>Level Up</div>

        <div style={{
          fontSize: 96, fontWeight: 800, lineHeight: 1,
          background: 'linear-gradient(135deg, var(--purple-light), var(--orange))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: 20,
        }}>{newLevel}</div>

        <div style={{ fontSize: 18, color: 'var(--text-2)', marginBottom: 8 }}>
          You reached Level {newLevel}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
          New challenges unlocked. Keep going.
        </div>
        <div style={{ marginTop: 24, fontSize: 11, color: 'var(--text-4)' }}>
          Click anywhere to continue
        </div>
      </div>
    </div>
  )
}
