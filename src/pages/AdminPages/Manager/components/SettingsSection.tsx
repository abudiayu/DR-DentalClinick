import { useState } from 'react'
import { Save } from 'lucide-react'

export default function SettingsSection() {
  const [clinicName, setClinicName] = useState('Dr. Muhammed Zain Dental Clinic')
  const [password, setPassword]     = useState('')
  const [confirm, setConfirm]       = useState('')
  const [saved, setSaved]           = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-lg space-y-6">
      <form onSubmit={handleSave} className="bg-white rounded-xl border border-slate-100 p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Clinic Settings</h3>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Clinic Name</label>
          <input
            value={clinicName}
            onChange={e => setClinicName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-slate-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">New Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Leave blank to keep current"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-slate-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="Repeat new password"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-slate-400 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-[#0F172A] text-white text-xs px-4 py-2.5 rounded-lg hover:bg-slate-700 transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </form>

      {/* User roles info */}
      <div className="bg-white rounded-xl border border-slate-100 p-6 space-y-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">User Roles</h3>
        {[
          { role: 'Manager / Admin', perms: 'Full access to everything', color: 'bg-indigo-50 text-indigo-700' },
          { role: 'Receptionist',    perms: 'Register patients, accept payments', color: 'bg-amber-50 text-amber-700' },
          { role: 'Doctor',          perms: 'View patients, add treatment & diagnosis', color: 'bg-emerald-50 text-emerald-700' },
        ].map(u => (
          <div key={u.role} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${u.color}`}>{u.role}</span>
            <span className="text-xs text-slate-400">{u.perms}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
