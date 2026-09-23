import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Eye, EyeOff, Loader, GitBranch, Globe } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CornerDot from '../../../components/CornerDot'

type Position = 'manager' | 'nurse' | 'card'

type AuthUser = {
  id: string
  name: string
  email: string
  role: Position
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const POSITION_ROUTES: Record<Position, string> = {
  manager: '/manager',
  nurse:   '/Nerse',
  card:    '/card',
}

export default function Auth() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  // If ProtectedRoute sent the user here, go back to the page they wanted
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname

  const POSITIONS: { value: Position; label: string }[] = [
    { value: 'manager', label: t('auth.manager')   },
    { value: 'nurse',   label: t('auth.nurse')     },
    { value: 'card',    label: t('auth.cardStaff') },
  ]

  const [isRegister, setIsRegister]     = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [position, setPosition]         = useState<Position>('manager')
  const [error, setError]               = useState('')
  const [notice, setNotice]             = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '', inviteCode: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function toggleMode() {
    setIsRegister(r => !r)
    setError('')
    setNotice('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setNotice('')

    if (isRegister && form.password.length < 8) {
      setError(t('auth.passwordTooShort', { defaultValue: 'Password must be at least 8 characters.' }))
      return
    }

    setLoading(true)
    try {
      const endpoint = isRegister ? 'register' : 'login'
      const payload = isRegister
        ? {
            name: form.name,
            email: form.email,
            password: form.password,
            role: position,
            inviteCode: form.inviteCode,
          }
        : { email: form.email, password: form.password, role: position }

      const res = await fetch(`${API_URL}/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(
          data.message ||
            t('auth.somethingWrong', { defaultValue: 'Something went wrong. Please try again.' })
        )
        return
      }

      if (isRegister) {
        setIsRegister(false)
        setForm(prev => ({ ...prev, password: '', inviteCode: '' }))
        setNotice(
          t('auth.accountCreated', { defaultValue: 'Account created. You can log in now.' })
        )
        return
      }

      // Login OK: keep the token + user (ProtectedRoute reads these)
      const user = data.user as AuthUser
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(user))
      navigate(from || POSITION_ROUTES[user.role] || '/', { replace: true })
    } catch {
      setError(
        t('auth.serverUnreachable', {
          defaultValue: 'Cannot reach the server. Check your connection and try again.',
        })
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center relative overflow-hidden">
      <div className="grid-overlay" />
      <div className="frame-line frame-line-top"    />
      <div className="frame-line frame-line-bottom" />
      <div className="frame-line frame-line-left"   />
      <div className="frame-line frame-line-right"  />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-[440px] mx-4 bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm"
      >
        <CornerDot position="tl" />
        <CornerDot position="tr" />
        <CornerDot position="bl" />
        <CornerDot position="br" />

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/logodesign.png"
              alt="Dr Logo"
              className="h-20 w-auto object-contain cursor-pointer drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]"
              onClick={() => navigate('/')}
            />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0F172A] uppercase tracking-[0.18em]">
            {isRegister ? t('auth.register') : t('auth.access')}
          </h1>
          <p className="text-[#94A3B8] text-xs uppercase tracking-widest mt-1">
            {isRegister ? t('auth.establishProtocol') : t('auth.authenticateSession')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Success / error messages */}
          {notice && (
            <div
              role="status"
              className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700"
            >
              {notice}
            </div>
          )}
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600"
            >
              {error}
            </div>
          )}

          <AnimatePresence>
            {isRegister && (
              <motion.div
                key="name-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <label className="block text-[10px] uppercase tracking-widest text-[#64748B] mb-1.5">
                  {t('auth.fullName')}
                </label>
                <input
                  name="name"
                  type="text"
                  required={isRegister}
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('auth.fullNamePlaceholder')}
                  aria-label={t('auth.fullName')}
                  autoComplete="name"
                  className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#94A3B8] shadow-inner transition-colors"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#64748B] mb-1.5">
              {t('auth.email')}
            </label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder={t('auth.emailPlaceholder')}
              aria-label={t('auth.email')}
              autoComplete="email"
              className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#94A3B8] shadow-inner transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#64748B] mb-1.5">
              {t('auth.password')}
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={isRegister ? 8 : undefined}
                value={form.password}
                onChange={handleChange}
                placeholder={t('auth.passwordPlaceholder')}
                aria-label={t('auth.password')}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-4 py-2.5 pr-10 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#94A3B8] shadow-inner transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Staff invite code — register only */}
          <AnimatePresence>
            {isRegister && (
              <motion.div
                key="invite-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <label className="block text-[10px] uppercase tracking-widest text-[#64748B] mb-1.5">
                  {t('auth.inviteCode', { defaultValue: 'Staff invite code' })}
                </label>
                <input
                  name="inviteCode"
                  type="password"
                  required={isRegister}
                  value={form.inviteCode}
                  onChange={handleChange}
                  placeholder={t('auth.inviteCodePlaceholder', { defaultValue: 'Code from the clinic manager' })}
                  aria-label={t('auth.inviteCode', { defaultValue: 'Staff invite code' })}
                  autoComplete="off"
                  className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#94A3B8] shadow-inner transition-colors"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Position selector — login and register */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#64748B] mb-1.5">
              {t('auth.position')}
            </label>
            <div className="flex gap-2">
              {POSITIONS.map(p => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPosition(p.value)}
                  className={`flex-1 py-2 rounded-lg border text-[11px] uppercase tracking-widest font-medium transition-all duration-200
                    ${position === p.value
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0] hover:border-[#94A3B8]'
                    }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="mt-2 w-full bg-[#0F172A] text-white rounded-lg py-3 text-[11px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 hover:bg-[#1E293B] transition-colors disabled:opacity-70"
          >
            {loading
              ? <Loader className="w-4 h-4 animate-spin" />
              : isRegister ? t('auth.establishBtn') : t('auth.authenticateBtn')
            }
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#E2E8F0]" />
          <span className="text-[10px] uppercase tracking-widest text-[#94A3B8]">{t('auth.or')}</span>
          <div className="flex-1 h-px bg-[#E2E8F0]" />
        </div>

        {/* Social */}
        <div className="flex gap-3">
          {[
            { icon: <GitBranch className="w-4 h-4" />, label: t('auth.github') },
            { icon: <Globe     className="w-4 h-4" />, label: t('auth.google') },
          ].map(s => (
            <motion.button
              key={s.label}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 border border-[#E2E8F0] rounded-lg py-2.5 text-[#64748B] hover:border-[#94A3B8] hover:text-[#0F172A] transition-all text-xs uppercase tracking-widest bg-[#F8FAFC]"
            >
              {s.icon}
              {s.label}
            </motion.button>
          ))}
        </div>

        {/* Toggle */}
        <p className="text-center text-xs text-[#94A3B8] mt-6 uppercase tracking-widest">
          {isRegister ? t('auth.alreadyHaveAccess') : t('auth.noAccount')}{' '}
          <button
            type="button"
            onClick={toggleMode}
            className="text-[#0F172A] font-semibold hover:underline transition-all"
          >
            {isRegister ? t('auth.login') : t('auth.register')}
          </button>
        </p>
      </motion.div>
    </div>
  )
}