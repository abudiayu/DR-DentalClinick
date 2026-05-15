import { motion } from 'motion/react'
import {
  LayoutDashboard, UserPlus, CreditCard, Clock,
  FolderOpen, BarChart3, Bell, LogOut, X
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { NurseSection } from '../types'

interface Props {
  active: NurseSection
  onChange: (s: NurseSection) => void
  open: boolean
  onClose: () => void
  unread: number
}

const items: { key: NurseSection; label: string; icon: React.ReactNode }[] = [
  { key: 'dashboard',     label: 'Dashboard',       icon: <LayoutDashboard className="w-4 h-4" /> },
  { key: 'register',      label: 'Register Patient', icon: <UserPlus className="w-4 h-4" />       },
  { key: 'payments',      label: 'Card Payments',    icon: <CreditCard className="w-4 h-4" />     },
  { key: 'waiting',       label: 'Waiting Patients', icon: <Clock className="w-4 h-4" />          },
  { key: 'records',       label: 'Patient Records',  icon: <FolderOpen className="w-4 h-4" />     },
  { key: 'reports',       label: 'Reports',          icon: <BarChart3 className="w-4 h-4" />      },
  { key: 'notifications', label: 'Notifications',    icon: <Bell className="w-4 h-4" />           },
]

export default function NurseSidebar({ active, onChange, open, onClose, unread }: Props) {
  const navigate = useNavigate()

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />}

      <aside className={`
        fixed top-0 left-0 h-full w-60 z-40 flex flex-col
        bg-gradient-to-b from-[#0a1628] to-[#0d2044]
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center">
              <img
                src="/logodesign.png"
                alt="Dr Logo"
                className="h-10 w-auto object-contain cursor-pointer drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]"
                onClick={() => navigate('/')}
              />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Dr. Zain</p>
              <p className="text-cyan-400/60 text-[10px] uppercase tracking-widest">Nurse Panel</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-white/30 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {items.map(item => (
            <motion.button
              key={item.key}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { onChange(item.key); onClose() }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all relative
                ${active === item.key
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/20'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
            >
              {item.icon}
              <span className="tracking-wide">{item.label}</span>
              {item.key === 'notifications' && unread > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
              {active === item.key && (
                <span className="ml-auto w-1 h-4 rounded-full bg-cyan-400" />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => navigate('/auth')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:text-white hover:bg-white/5 text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
