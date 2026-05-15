import { motion } from 'motion/react'
import {
  LayoutDashboard, Users, CreditCard, Calendar,
  Stethoscope, BarChart3, Receipt, Settings, LogOut, X
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { SidebarSection } from '../types'

interface SidebarProps {
  active: SidebarSection
  onChange: (s: SidebarSection) => void
  open: boolean
  onClose: () => void
}

const items: { key: SidebarSection; label: string; icon: React.ReactNode }[] = [
  { key: 'dashboard',    label: 'Dashboard',    icon: <LayoutDashboard className="w-4 h-4" /> },
  { key: 'patients',     label: 'Patients',     icon: <Users className="w-4 h-4" /> },
  { key: 'payments',     label: 'Payments',     icon: <CreditCard className="w-4 h-4" /> },
  { key: 'appointments', label: 'Appointments', icon: <Calendar className="w-4 h-4" /> },
  { key: 'services',     label: 'Services',     icon: <Stethoscope className="w-4 h-4" /> },
  { key: 'reports',      label: 'Reports',      icon: <BarChart3 className="w-4 h-4" /> },
  { key: 'expenses',     label: 'Expenses',     icon: <Receipt className="w-4 h-4" /> },
  { key: 'settings',     label: 'Settings',     icon: <Settings className="w-4 h-4" /> },
]

export default function Sidebar({ active, onChange, open, onClose }: SidebarProps) {
  const navigate = useNavigate()
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-60 bg-[#0F172A] flex flex-col z-40
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="flex items-center  px-1 py-2 border-b border-white/10">
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
              <p className="text-white text-sm font-semibold ">Dr. Zain</p>
              <p className="text-white/40 text-[15px] uppercase tracking-widest">Dental Clinic</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {items.map(item => (
            <motion.button
              key={item.key}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { onChange(item.key); onClose() }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                ${active === item.key
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
            >
              {item.icon}
              <span className="tracking-wide">{item.label}</span>
              {active === item.key && (
                <span className="ml-auto w-1 h-4 rounded-full bg-indigo-400" />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => navigate('/auth')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
