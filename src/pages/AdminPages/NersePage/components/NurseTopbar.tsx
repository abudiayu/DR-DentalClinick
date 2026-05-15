import { useState, useEffect } from 'react'
import { Menu, Search, Bell } from 'lucide-react'

interface Props {
  onMenuClick: () => void
  title: string
  unread: number
  onNotifClick: () => void
  onSearch: (q: string) => void
}

export default function NurseTopbar({ onMenuClick, title, unread, onNotifClick, onSearch }: Props) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const dateStr = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <header className="h-14 bg-white/80 backdrop-blur border-b border-slate-100 flex items-center px-4 gap-3 sticky top-0 z-20">
      <button onClick={onMenuClick} className="lg:hidden text-slate-500 hover:text-slate-800">
        <Menu className="w-5 h-5" />
      </button>

      <h1 className="text-xs font-bold text-[#0d2044] uppercase tracking-widest hidden sm:block">{title}</h1>

      {/* Search */}
      <div className="flex-1 max-w-xs ml-auto sm:ml-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          onChange={e => onSearch(e.target.value)}
          placeholder="Search patient, card, phone..."
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-cyan-400 transition-colors"
        />
      </div>

      {/* Date/time */}
      <div className="hidden md:flex flex-col items-end">
        <span className="text-[11px] font-semibold text-slate-700">{timeStr}</span>
        <span className="text-[10px] text-slate-400">{dateStr}</span>
      </div>

      {/* Bell */}
      <button onClick={onNotifClick} className="relative text-slate-500 hover:text-cyan-600 transition-colors">
        <Bell className="w-4 h-4" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* Profile */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-700 text-xs font-bold">
          N
        </div>
        <span className="text-xs font-medium text-slate-600 hidden sm:block">Nurse</span>
      </div>
    </header>
  )
}
