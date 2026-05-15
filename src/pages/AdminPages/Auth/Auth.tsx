import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Eye, EyeOff, Loader, GitBranch, Globe } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CornerDot from '../../../components/CornerDot'

type Position = 'manager' | 'nurse' | 'card'

const POSITION_ROUTES: Record<Position, string> = {
  manager: '/manager',
  nurse: '/Nerse',
  card: '/card',
}

const POSITIONS: { value: Position; label: string }[] = [
  { value: 'manager', label: 'Manager' },
  { value: 'nurse',   label: 'Nurse'   },
  { value: 'card',    label: 'Card Staff' },
]

export default function Auth() {
  const navigate = useNavigate()
  const [isRegister, setIsRegister]     = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [position, setPosition]         = useState<Position>('manager')
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate(POSITION_ROUTES[position])
    }, 1400)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center relative overflow-hidden">

      {/* Grid background */}
      <div className="grid-overlay" />

      {/* Frame lines */}
      <div className="frame-line frame-line-top"    />
      <div className="frame-line frame-line-bottom" />
      <div className="frame-line frame-line-left"   />
      <div className="frame-line frame-line-right"  />

      {/* Auth card */}
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
          <div className="w-10 h-10 border border-[#E2E8F0] flex items-center justify-center rotate-45 bg-[#F1F5F9]">
            <span className="text-[#0F172A] font-bold text-sm -rotate-45 tracking-widest">A</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0F172A] uppercase tracking-[0.18em]">
            {isRegister ? 'Register' : 'Access'}
          </h1>
          <p className="text-[#94A3B8] text-xs uppercase tracking-widest mt-1">
            {isRegister ? 'Establish your protocol' : 'Authenticate your session'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Full Name — register only */}
          <AnimatePresence>
            {isRegister && (
              <motion.div
                key="name-field"
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <label className="block text-[10px] uppercase tracking-widest text-[#64748B] mb-1.5">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  required={isRegister}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#94A3B8] shadow-inner transition-colors"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#64748B] mb-1.5">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@clinic.com"
              className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#94A3B8] shadow-inner transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#64748B] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-4 py-2.5 pr-10 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#94A3B8] shadow-inner transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Position selector — login only */}
          {!isRegister && (
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#64748B] mb-1.5">
                Position
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
          )}

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
              : isRegister ? 'Establish Protocol' : 'Authenticate Session'
            }
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#E2E8F0]" />
          <span className="text-[10px] uppercase tracking-widest text-[#94A3B8]">or</span>
          <div className="flex-1 h-px bg-[#E2E8F0]" />
        </div>

        {/* Social */}
        <div className="flex gap-3">
          {[
          { icon: <GitBranch className="w-4 h-4" />, label: 'GitHub' },
            { icon: <Globe className="w-4 h-4" />, label: 'Google' },
          ].map(s => (
            <motion.button
              key={s.label}
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
          {isRegister ? 'Already have access?' : 'No account yet?'}{' '}
          <button
            onClick={() => setIsRegister(r => !r)}
            className="text-[#0F172A] font-semibold hover:underline transition-all"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}
