import { Bell, CreditCard, UserPlus, Stethoscope, List } from 'lucide-react'
import type { Notification } from '../types'

interface Props { notifications: Notification[]; onRead: () => void }

const icons: Record<Notification['type'], React.ReactNode> = {
  patient: <UserPlus className="w-3.5 h-3.5" />,
  payment: <CreditCard className="w-3.5 h-3.5" />,
  doctor:  <Stethoscope className="w-3.5 h-3.5" />,
  queue:   <List className="w-3.5 h-3.5" />,
}

const colors: Record<Notification['type'], string> = {
  patient: 'bg-indigo-100 text-indigo-600',
  payment: 'bg-emerald-100 text-emerald-600',
  doctor:  'bg-cyan-100 text-cyan-600',
  queue:   'bg-amber-100 text-amber-600',
}

export default function NurseNotifications({ notifications, onRead }: Props) {
  return (
    <div className="max-w-lg space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-[#0d2044] uppercase tracking-widest">Notifications</h3>
        <button onClick={onRead} className="text-[11px] text-cyan-600 hover:underline">Mark all read</button>
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 flex flex-col items-center gap-3">
          <Bell className="w-8 h-8 text-slate-200" />
          <p className="text-sm text-slate-300">No notifications</p>
        </div>
      ) : notifications.map(n => (
        <div key={n.id} className={`flex items-start gap-3 bg-white rounded-2xl border p-4 transition-all ${n.read ? 'border-slate-100 opacity-60' : 'border-cyan-100'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${colors[n.type]}`}>
            {icons[n.type]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-700">{n.message}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{n.time}</p>
          </div>
          {!n.read && <span className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0 mt-1" />}
        </div>
      ))}
    </div>
  )
}
