import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/client'
import useStore from '../store/useStore'

// ── Eye icon ──────────────────────────────────────────────────────────────────
const EyeOpen = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)
const EyeClosed = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

// ── Wakeup banner — shown when server is starting ─────────────────────────────
function WakeupBanner({ visible }) {
  if (!visible) return null
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
      background: 'linear-gradient(90deg, #7c3aed, #f97316)',
      color: '#fff', padding: '10px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      fontSize: 13, fontWeight: 600,
      animation: 'fadeIn 0.3s ease',
    }}>
      <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
      Server is waking up... This takes 20–40 seconds on first visit. Please wait!
    </div>
  )
}

// ── Input component ───────────────────────────────────────────────────────────
function Field({ label, type = 'text', value, onChange, onKeyDown, placeholder, error, success, rightEl, autoComplete }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: 1, textTransform: 'uppercase' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={type} value={value} onChange={onChange} onKeyDown={onKeyDown}
          placeholder={placeholder} autoComplete={autoComplete}
          style={{
            width: '100%', padding: rightEl ? '11px 44px 11px 14px' : '11px 14px',
            fontSize: 15, borderRadius: 10,
            border: `1.5px solid ${error ? 'var(--red)' : success ? 'var(--green)' : 'var(--border)'}`,
            background: 'rgba(255,255,255,0.04)',
            color: 'var(--text-1)', outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={e => e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.2)'}
          onBlur={e => e.target.style.boxShadow = 'none'}
        />
        {rightEl && (
          <div style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            display: 'flex', alignItems: 'center',
          }}>
            {rightEl}
          </div>
        )}
      </div>
      {error && (
        <div style={{ fontSize: 12, color: 'var(--red)', display: 'flex', alignItems: 'center', gap: 4 }}>
          ⚠ {error}
        </div>
      )}
    </div>
  )
}

// ── REGISTER PAGE ─────────────────────────────────────────────────────────────
function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [waking, setWaking] = useState(false)
  const [errors, setErrors] = useState({})
  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.username.trim()) e.username = 'Username is required'
    else if (form.username.trim().length < 3) e.username = 'At least 3 characters'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'At least 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setLoading(true)
    const timer = setTimeout(() => setWaking(true), 5000)
    try {
      await api.post('/auth/register', {
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      })
      clearTimeout(timer)
      setWaking(false)
      toast.success('Account created! Sign in now.')
      navigate('/login')
    } catch (err) {
      clearTimeout(timer)
      setWaking(false)
      const msg = err.response?.data?.detail
      if (typeof msg === 'string') {
        if (msg.toLowerCase().includes('username')) setErrors(e => ({ ...e, username: msg }))
        else if (msg.toLowerCase().includes('email')) setErrors(e => ({ ...e, email: msg }))
        else toast.error(msg)
      } else {
        toast.error('Server is not responding. Please try again in a moment.')
      }
    } finally {
      setLoading(false)
    }
  }

  const pwStrength = form.password.length >= 10 ? 'strong' : form.password.length >= 6 ? 'ok' : 'weak'
  const strengthColor = { strong: '#10b981', ok: '#f59e0b', weak: '#ef4444' }
  const strengthLabel = { strong: 'Strong', ok: 'Good', weak: 'Too short' }

  return (
    <>
      <WakeupBanner visible={waking} />
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-0)', padding: '24px 16px',
      }}>
        <div style={{
          position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 500, borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
        }} />

        <div style={{ width: '100%', maxWidth: 420, animation: 'fadeInUp 0.4s ease' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16, margin: '0 auto 14px',
              background: 'linear-gradient(135deg, var(--purple), var(--orange))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, fontWeight: 900, color: '#fff',
              boxShadow: '0 8px 24px rgba(124,58,237,0.4)',
            }}>G</div>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Create your account</h1>
            <p style={{ fontSize: 13, color: 'var(--text-3)' }}>Free forever. Start learning through games.</p>
          </div>

          <div style={{
            background: 'var(--bg-2)', borderRadius: 16,
            border: '1px solid var(--border)', padding: '24px 24px',
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <Field
              label="Username" value={form.username} onChange={up('username')}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="e.g. coolcoder42" autoComplete="username" error={errors.username}
              success={form.username.length >= 3}
              rightEl={form.username.length >= 3 && !errors.username ? <CheckIcon /> : null}
            />

            <Field
              label="Email" type="email" value={form.email} onChange={up('email')}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="you@example.com" autoComplete="email" error={errors.email}
              success={/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)}
              rightEl={/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) && !errors.email ? <CheckIcon /> : null}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: 1, textTransform: 'uppercase' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={up('password')}
                  onKeyDown={e => e.key === 'Enter' && submit()}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  style={{
                    width: '100%', padding: '11px 44px 11px 14px', fontSize: 15, borderRadius: 10,
                    border: `1.5px solid ${errors.password ? 'var(--red)' : form.password.length >= 6 ? 'var(--green)' : 'var(--border)'}`,
                    background: 'rgba(255,255,255,0.04)', color: 'var(--text-1)', outline: 'none',
                  }}
                  onFocus={e => e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.2)'}
                  onBlur={e => e.target.style.boxShadow = 'none'}
                />
                <button type="button" onClick={() => setShowPw(s => !s)} style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)',
                  display: 'flex', padding: 4,
                }}>
                  {showPw ? <EyeClosed /> : <EyeOpen />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                  <div style={{ flex: 1, height: 3, borderRadius: 2, background: 'var(--bg-4)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 2,
                      width: pwStrength === 'strong' ? '100%' : pwStrength === 'ok' ? '60%' : '30%',
                      background: strengthColor[pwStrength],
                      transition: 'width 0.3s ease, background 0.3s ease',
                    }} />
                  </div>
                  <span style={{ fontSize: 11, color: strengthColor[pwStrength], fontWeight: 600 }}>
                    {strengthLabel[pwStrength]}
                  </span>
                </div>
              )}
              {errors.password && <div style={{ fontSize: 12, color: 'var(--red)' }}>⚠ {errors.password}</div>}
            </div>

            <button
              onClick={submit} disabled={loading}
              style={{
                width: '100%', padding: '13px', fontSize: 15, fontWeight: 700,
                borderRadius: 12, border: 'none', cursor: loading ? 'wait' : 'pointer',
                background: loading ? 'var(--bg-4)' : 'linear-gradient(135deg, var(--purple), #8b5cf6)',
                color: '#fff', marginTop: 4,
                boxShadow: loading ? 'none' : '0 4px 20px rgba(124,58,237,0.4)',
                transition: 'all 0.2s',
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span>
                  Creating account...
                </span>
              ) : 'Create Account →'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--purple-light)', fontWeight: 700, textDecoration: 'none' }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// ── LOGIN PAGE ────────────────────────────────────────────────────────────────
function LoginPage_() {
  const navigate = useNavigate()
  const { setUser } = useStore()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [waking, setWaking] = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const inflightRef = useRef(false)   // hard lock — prevents any double-fire
  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const doLogin = async (username, password, isDemo = false) => {
    // Hard guard — if a request is already in flight, ignore all clicks
    if (inflightRef.current) return
    inflightRef.current = true

    if (isDemo) setDemoLoading(true)
    else setLoading(true)

    const wakeTimer = setTimeout(() => setWaking(true), 4000)

    try {
      const { data } = await api.post('/auth/login', { username, password })
      clearTimeout(wakeTimer)
      setWaking(false)
      localStorage.setItem('g_access', data.access_token)
      localStorage.setItem('g_refresh', data.refresh_token)
      const { data: me } = await api.get('/progress/me')
      setUser(me)
      toast.success(`Welcome back, ${me.username}!`)
      navigate('/dashboard')
    } catch (err) {
      clearTimeout(wakeTimer)
      setWaking(false)
      const msg = err.response?.data?.detail
      if (typeof msg === 'string') {
        if (isDemo) {
          toast.error('Demo account is not available right now. Please register a free account.')
        } else if (msg.toLowerCase().includes('password') || msg.toLowerCase().includes('username') || msg.toLowerCase().includes('incorrect')) {
          setErrors({ password: msg })
        } else if (msg.toLowerCase().includes('locked')) {
          toast.error(msg, { duration: 5000 })
        } else {
          toast.error(msg)
        }
      } else {
        // Network error / cold start — show one clean message, don't stack toasts
        toast.dismiss()
        toast.error('Server is waking up. Wait 20–40 seconds, then try again.', { duration: 6000 })
      }
    } finally {
      setLoading(false)
      setDemoLoading(false)
      // Release lock after a short delay so accidental double-clicks don't sneak in
      setTimeout(() => { inflightRef.current = false }, 800)
    }
  }

  const submit = () => {
    const e = {}
    if (!form.username.trim()) e.username = 'Username is required'
    if (!form.password) e.password = 'Password is required'
    setErrors(e)
    if (Object.keys(e).length > 0) return
    doLogin(form.username.trim(), form.password)
  }

  const anyLoading = loading || demoLoading

  return (
    <>
      <WakeupBanner visible={waking} />
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-0)', padding: '24px 16px',
      }}>
        <div style={{
          position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 500, borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
        }} />

        <div style={{ width: '100%', maxWidth: 420, animation: 'fadeInUp 0.4s ease' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16, margin: '0 auto 14px',
              background: 'linear-gradient(135deg, var(--purple), var(--orange))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, fontWeight: 900, color: '#fff',
              boxShadow: '0 8px 24px rgba(124,58,237,0.4)',
            }}>G</div>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Welcome back</h1>
            <p style={{ fontSize: 13, color: 'var(--text-3)' }}>Sign in to continue your journey</p>
          </div>

          <div style={{
            background: 'var(--bg-2)', borderRadius: 16,
            border: '1px solid var(--border)', padding: '24px 24px',
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <Field
              label="Username" value={form.username} onChange={up('username')}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="your_username" autoComplete="username" error={errors.username}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: 1, textTransform: 'uppercase' }}>
                  Password
                </label>
                <Link to="/forgot-password" style={{
                  fontSize: 12, color: 'var(--purple-light)', textDecoration: 'none', fontWeight: 600,
                }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password} onChange={up('password')}
                  onKeyDown={e => e.key === 'Enter' && submit()}
                  placeholder="Enter your password" autoComplete="current-password"
                  style={{
                    width: '100%', padding: '11px 44px 11px 14px', fontSize: 15, borderRadius: 10,
                    border: `1.5px solid ${errors.password ? 'var(--red)' : 'var(--border)'}`,
                    background: 'rgba(255,255,255,0.04)', color: 'var(--text-1)', outline: 'none',
                  }}
                  onFocus={e => e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.2)'}
                  onBlur={e => e.target.style.boxShadow = 'none'}
                />
                <button type="button" onClick={() => setShowPw(s => !s)} style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)',
                  display: 'flex', padding: 4,
                }}>
                  {showPw ? <EyeClosed /> : <EyeOpen />}
                </button>
              </div>
              {errors.password && <div style={{ fontSize: 12, color: 'var(--red)' }}>⚠ {errors.password}</div>}
            </div>

            <button
              onClick={submit} disabled={anyLoading}
              style={{
                width: '100%', padding: '13px', fontSize: 15, fontWeight: 700,
                borderRadius: 12, border: 'none', cursor: anyLoading ? 'not-allowed' : 'pointer',
                background: anyLoading ? 'var(--bg-4)' : 'linear-gradient(135deg, var(--purple), #8b5cf6)',
                color: anyLoading ? 'var(--text-3)' : '#fff', marginTop: 4,
                boxShadow: anyLoading ? 'none' : '0 4px 20px rgba(124,58,237,0.4)',
                transition: 'all 0.2s',
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span>
                  Signing in...
                </span>
              ) : 'Sign In →'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>
              No account?{' '}
              <Link to="/register" style={{ color: 'var(--purple-light)', fontWeight: 700, textDecoration: 'none' }}>
                Sign up free
              </Link>
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span style={{ fontSize: 11, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>or try instantly</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>

            <button
              onClick={() => doLogin('demo_user', 'demo1234', true)}
              disabled={anyLoading}
              style={{
                width: '100%', padding: '11px', fontSize: 13, fontWeight: 600,
                borderRadius: 10, cursor: anyLoading ? 'not-allowed' : 'pointer',
                border: `1.5px solid ${demoLoading ? 'var(--purple)' : 'var(--border)'}`,
                background: demoLoading ? 'var(--purple-dim)' : 'transparent',
                color: demoLoading ? 'var(--purple-light)' : 'var(--text-2)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!anyLoading) { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--purple-light)' }}}
              onMouseLeave={e => { if (!demoLoading) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}}
            >
              {demoLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span>
                  Loading demo...
                </span>
              ) : 'Continue with Demo Account'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// ── FORGOT PASSWORD PAGE ──────────────────────────────────────────────────────
function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', new_password: '', confirm_password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState({})
  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    const e = {}
    if (!form.username.trim()) e.username = 'Username is required'
    if (!form.email.trim()) e.email = 'Email is required'
    if (!form.new_password) e.new_password = 'New password is required'
    else if (form.new_password.length < 6) e.new_password = 'At least 6 characters'
    if (form.new_password !== form.confirm_password) e.confirm_password = 'Passwords do not match'
    setErrors(e)
    if (Object.keys(e).length > 0) return

    setLoading(true)
    try {
      await api.post('/auth/forgot-password', {
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        new_password: form.new_password,
      })
      setDone(true)
      toast.success('Password reset successful!')
    } catch (err) {
      const msg = err.response?.data?.detail
      if (typeof msg === 'string') toast.error(msg)
      else toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-0)', padding: 24,
    }}>
      <div style={{ textAlign: 'center', maxWidth: 380 }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.12)',
          border: '1.5px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', margin: '0 auto 20px',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 style={{ marginBottom: 8 }}>Password Updated</h2>
        <p style={{ color: 'var(--text-3)', marginBottom: 24, fontSize: 14 }}>
          Your password has been changed. You can now sign in with your new credentials.
        </p>
        <button
          onClick={() => navigate('/login')}
          style={{
            padding: '12px 32px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: 'var(--purple)', color: '#fff', fontSize: 15, fontWeight: 700,
          }}
        >
          Go to Sign In →
        </button>
      </div>
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-0)', padding: '24px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: 420, animation: 'fadeInUp 0.4s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, margin: '0 auto 14px',
            background: 'linear-gradient(135deg, var(--purple), var(--orange))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(124,58,237,0.4)',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Reset your password</h1>
          <p style={{ fontSize: 13, color: 'var(--text-3)' }}>
            Enter your username and email to verify your account
          </p>
        </div>

        <div style={{
          background: 'var(--bg-2)', borderRadius: 16,
          border: '1px solid var(--border)', padding: '24px 24px',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          <Field label="Username" value={form.username} onChange={up('username')}
            placeholder="your_username" autoComplete="username" error={errors.username} />

          <Field label="Email" type="email" value={form.email} onChange={up('email')}
            placeholder="you@example.com" autoComplete="email" error={errors.email} />

          <div style={{ height: 1, background: 'var(--border)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: 1, textTransform: 'uppercase' }}>
              New Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                value={form.new_password} onChange={up('new_password')}
                placeholder="At least 6 characters" autoComplete="new-password"
                style={{
                  width: '100%', padding: '11px 44px 11px 14px', fontSize: 15, borderRadius: 10,
                  border: `1.5px solid ${errors.new_password ? 'var(--red)' : 'var(--border)'}`,
                  background: 'rgba(255,255,255,0.04)', color: 'var(--text-1)', outline: 'none',
                }}
              />
              <button type="button" onClick={() => setShowPw(s => !s)} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', display: 'flex', padding: 4,
              }}>
                {showPw ? <EyeClosed /> : <EyeOpen />}
              </button>
            </div>
            {errors.new_password && <div style={{ fontSize: 12, color: 'var(--red)' }}>⚠ {errors.new_password}</div>}
          </div>

          <Field label="Confirm New Password" type={showPw ? 'text' : 'password'}
            value={form.confirm_password} onChange={up('confirm_password')}
            placeholder="Repeat your new password" autoComplete="new-password"
            error={errors.confirm_password} />

          <button
            onClick={submit} disabled={loading}
            style={{
              width: '100%', padding: '13px', fontSize: 15, fontWeight: 700,
              borderRadius: 12, border: 'none', cursor: loading ? 'wait' : 'pointer',
              background: loading ? 'var(--bg-4)' : 'var(--purple)',
              color: '#fff', transition: 'all 0.2s',
            }}
          >
            {loading ? 'Resetting...' : 'Reset Password →'}
          </button>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-3)' }}>
            Remember it?{' '}
            <Link to="/login" style={{ color: 'var(--purple-light)', fontWeight: 700, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export { LoginPage_, ForgotPasswordPage }
export const LoginPage = LoginPage_
export const RegisterPage_ = RegisterPage
export { RegisterPage }
