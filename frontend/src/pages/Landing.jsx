import { Link } from 'react-router-dom'

// ── Language Icons ────────────────────────────────────────────────────────────
const PythonIcon = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
    <path d="M15.9 4C10.3 4 10.7 6.4 10.7 6.4v2.7H16v.9H8.6S4 9.4 4 15.1c0 5.7 3.2 5.5 3.2 5.5h1.9v-2.6s-.1-3.2 3.1-3.2h5.4s3 .05 3-2.9V7s.45-3-4.7-3zM13 5.9c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" fill="#3b82f6"/>
    <path d="M16.1 28c5.6 0 5.2-2.4 5.2-2.4v-2.7h-5.3v-.9h7.4s4.6.6 4.6-5.1c0-5.7-3.2-5.5-3.2-5.5h-1.9v2.6s.1 3.2-3.1 3.2h-5.4s-3-.05-3 2.9V25s-.45 3 4.7 3zm2.9-1.9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#60a5fa"/>
  </svg>
)
const JSIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="2" y="2" width="32" height="32" rx="5" fill="#f59e0b" fillOpacity="0.12" stroke="#f59e0b" strokeOpacity="0.3" strokeWidth="1"/>
    <path d="M11 26c.4.7 1 1.1 2.1 1.1 1.2 0 2-.6 2-1.7v-7.8h-1.8v7.7c0 .5-.2.7-.6.7-.4 0-.7-.3-.9-.6L11 26zm6.3-.3c.5.9 1.5 1.4 2.8 1.4 1.5 0 2.7-.8 2.7-2.3 0-1.3-.8-1.9-2-2.5l-.6-.3c-.6-.3-.9-.5-.9-.9 0-.4.3-.7.8-.7s.8.2 1.1.7l1.3-.8c-.5-.9-1.3-1.3-2.4-1.3-1.4 0-2.4.9-2.4 2.2 0 1.3.8 1.9 1.9 2.4l.6.3c.7.3 1 .6 1 1.1 0 .5-.4.8-1 .8-.7 0-1.2-.4-1.5-1L17.3 25.7z" fill="#f59e0b"/>
  </svg>
)
const CppIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="2" y="2" width="32" height="32" rx="5" fill="#a78bfa" fillOpacity="0.12" stroke="#a78bfa" strokeOpacity="0.3" strokeWidth="1"/>
    <path d="M13.5 22.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5c1.3 0 2.4.5 3.2 1.4l1.4-1.4C17 12.4 15.3 11.5 13.5 11.5c-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5c1.8 0 3.5-.8 4.6-2l-1.4-1.4c-.8.9-1.9 1.4-3.2 1.4zm7.5-2.5h2v2h2v-2h2v-2h-2v-2h-2v2h-2v2zm7 0h2v2h2v-2h2v-2h-2v-2h-2v2h-2v2z" fill="#a78bfa"/>
  </svg>
)
const JavaIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M14 25s-1.7 1 1.2 1.3c3.3.4 5 .3 8.6-.4 0 0 1 .6 2.3 1.1-8 3.4-18.2-.1-12.1-2z" fill="#f97316"/>
    <path d="M12.7 21.7s-2 1.4 2 1.7c3 .2 5.2.3 9.2-.4 0 0 .7.7 1.7.9-8.1 2.4-17.2.2-12.9-2.2z" fill="#f97316"/>
    <path d="M19.2 15.7c1.7 1.9-.5 3.6-.5 3.6s4.3-2.2 2.3-5c-1.9-2.6-3.3-3.8 4.5-8.3 0 0-12.3 3.1-6.3 9.7z" fill="#fb923c"/>
    <path d="M27.3 27.3s1.3 1-1.4 1.8c-5 1.6-20.8 2-25.3.1-1.6-.7 1.4-1.6 2.4-1.8 1-.2 1.6-.1 1.6-.1-1.8-1.3-11.8 2.5-5.1 3.6C18.3 33.8 33.2 29.5 27.3 27.3z" fill="#f97316"/>
  </svg>
)

// ── Feature Mode Icons ────────────────────────────────────────────────────────
const IconPuzzle = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
)
const IconSword = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/>
    <line x1="13" y1="19" x2="19" y2="13"/>
    <line x1="16" y1="16" x2="20" y2="20"/>
    <line x1="19" y1="21" x2="21" y2="19"/>
  </svg>
)
const IconMap = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/>
    <line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
)
const IconBug = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="6" width="8" height="14" rx="4"/>
    <path d="M19 7l-3 2M5 7l3 2M19 12h-4M5 12h4M19 17l-3-2M5 17l3-2M9 3l1.5 3M15 3l-1.5 3"/>
  </svg>
)
const IconShield = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
)
const IconTrophy = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="18" width="12" height="4"/>
  </svg>
)

const FEATURES = [
  { Icon: IconPuzzle, title: 'Puzzle Mode',  desc: 'Fill in the blanks. Build muscle memory one block at a time.', color: '#10b981' },
  { Icon: IconSword,  title: 'Battle Mode',  desc: 'Race the clock. The faster you solve it, the more XP you earn.', color: '#f59e0b' },
  { Icon: IconMap,    title: 'Quest Mode',   desc: 'Story-driven challenges with real-world context and narrative.', color: '#3b82f6' },
  { Icon: IconBug,    title: 'Debug Hunt',   desc: 'Find and fix the bug. The skill every senior developer needs.', color: '#ef4444' },
  { Icon: IconShield, title: 'Boss Fights',  desc: 'Capstone challenges that gate your level progression.', color: '#a78bfa' },
  { Icon: IconTrophy, title: 'Leaderboard', desc: 'Compete weekly. Climb the global rankings.', color: '#f97316' },
]

const LANGUAGES = [
  { Icon: PythonIcon, name: 'Python',     color: '#3b82f6', challenges: '12+' },
  { Icon: JSIcon,     name: 'JavaScript', color: '#f59e0b', challenges: '8+' },
  { Icon: CppIcon,    name: 'C++',        color: '#a78bfa', challenges: '6+' },
  { Icon: JavaIcon,   name: 'Java',       color: '#f97316', challenges: '5+' },
]

const STATS = [['4+', 'Languages'], ['5', 'Game Modes'], ['20', 'Levels'], ['29+', 'Challenges']]

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.15), transparent)',
      }} />

      {/* ── Hero ── */}
      <section style={{
        position: 'relative', zIndex: 1,
        padding: 'clamp(72px, 12vw, 120px) 24px 80px',
        textAlign: 'center', maxWidth: 800, margin: '0 auto',
        animation: 'fadeInUp 0.5s ease',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: 'var(--r-full)', padding: '6px 18px',
          fontSize: 12, color: 'var(--purple-light)', fontFamily: 'var(--mono)',
          marginBottom: 36, letterSpacing: 1,
        }}>
          ✦ Learn by Playing — Not by Watching
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 6.5vw, 72px)', fontWeight: 800,
          lineHeight: 1.08, marginBottom: 28, letterSpacing: '-2px',
        }}>
          Level Up Your{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--purple-light), var(--orange))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Coding Skills
          </span>
          {' '}Through Games
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2.2vw, 19px)', color: 'var(--text-2)',
          lineHeight: 1.75, marginBottom: 44,
          maxWidth: 540, margin: '0 auto 44px',
        }}>
          Master programming through puzzles, boss fights, and timed battles.
          Earn XP, climb ranks, and unlock new challenges.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 72 }}>
          <Link to="/register">
            <button className="btn btn-primary btn-lg" style={{
              background: 'linear-gradient(135deg, var(--purple), #8b5cf6)',
              boxShadow: '0 0 32px rgba(124,58,237,0.4)',
              padding: '14px 36px', fontSize: 16,
            }}>
              Start for Free →
            </button>
          </Link>
          <Link to="/login">
            <button className="btn btn-secondary btn-lg" style={{ padding: '14px 36px', fontSize: 16 }}>
              Sign In
            </button>
          </Link>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: 'clamp(28px, 6vw, 56px)', flexWrap: 'wrap',
        }}>
          {STATS.map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(28px, 4.5vw, 38px)', fontWeight: 800,
                color: 'var(--purple-light)', fontFamily: 'var(--mono)',
              }}>{num}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Languages ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '60px 24px', maxWidth: 960, margin: '0 auto' }}>
        <p style={{
          textAlign: 'center', marginBottom: 32, color: 'var(--text-3)',
          fontSize: 12, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase',
          fontFamily: 'var(--mono)',
        }}>
          Four Languages. One Platform.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {LANGUAGES.map(({ Icon, name, color, challenges }) => (
            <div key={name} className="card card-interactive" style={{ padding: '24px 16px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                <Icon />
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color, marginBottom: 4 }}>{name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
                {challenges} challenges
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '60px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 10, fontWeight: 700 }}>Five Ways to Learn</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-3)', marginBottom: 44, fontSize: 15 }}>
          Every mode targets a different skill. You'll never get bored.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {FEATURES.map(({ Icon, title, desc, color }) => (
            <div key={title} className="card" style={{ padding: '22px' }}>
              <div style={{
                width: 46, height: 46, borderRadius: 12, marginBottom: 14,
                background: `${color}15`, border: `1px solid ${color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon color={color} />
              </div>
              <h3 style={{ fontSize: 15, marginBottom: 8, fontWeight: 700 }}>{title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px 100px', textAlign: 'center' }}>
        <div style={{
          maxWidth: 560, margin: '0 auto', padding: 'clamp(32px, 5vw, 52px)',
          background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(249,115,22,0.06))',
          border: '1px solid rgba(124,58,237,0.2)', borderRadius: 24,
        }}>
          <h2 style={{ marginBottom: 12, fontWeight: 700 }}>Ready to level up?</h2>
          <p style={{ color: 'var(--text-3)', marginBottom: 28, fontSize: 15 }}>
            Free forever. No credit card. Start coding in 60 seconds.
          </p>
          <Link to="/register">
            <button className="btn btn-primary btn-lg" style={{
              background: 'linear-gradient(135deg, var(--purple), #8b5cf6)',
              boxShadow: '0 0 24px rgba(124,58,237,0.35)',
            }}>
              Create Free Account →
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
