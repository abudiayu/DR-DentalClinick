import { FileDown } from 'lucide-react'
import type { NursePatient } from '../types'

interface Props { patients: NursePatient[] }

export default function NurseReports({ patients }: Props) {
  const today = new Date().toISOString().slice(0, 10)
  const todayPatients = patients.filter(p => p.visitDate === today)

  const totalRegistered = todayPatients.length
  const totalRevenue    = todayPatients.filter(p => p.paymentStatus === 'Paid').reduce((s, p) => s + p.cardFee, 0)
  const pending         = todayPatients.filter(p => p.paymentStatus !== 'Paid').reduce((s, p) => s + p.cardFee, 0)
  const completed       = todayPatients.filter(p => p.waitingStatus === 'Completed').length
  const waiting         = todayPatients.filter(p => p.waitingStatus === 'Waiting').length

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-[#0d2044] uppercase tracking-widest">Daily Report</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">{today}</p>
          </div>
          <button className="flex items-center gap-1.5 text-[11px] text-cyan-600 border border-cyan-100 rounded-xl px-3 py-1.5 hover:bg-cyan-50 transition-colors">
            <FileDown className="w-3.5 h-3.5" /> Export
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Registered Patients', value: totalRegistered, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Today Revenue',        value: `${totalRevenue.toLocaleString()} Birr`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Pending Payments',     value: `${pending.toLocaleString()} Birr`,      color: 'text-red-500',     bg: 'bg-red-50'     },
            { label: 'Completed',            value: completed,                                color: 'text-cyan-600',    bg: 'bg-cyan-50'    },
            { label: 'Still Waiting',        value: waiting,                                  color: 'text-amber-600',   bg: 'bg-amber-50'   },
          ].map(m => (
            <div key={m.label} className={`${m.bg} rounded-xl p-4`}>
              <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
              <p className="text-[11px] text-slate-500 uppercase tracking-widest mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sent to manager notice */}
      <div className="bg-gradient-to-r from-[#0d2044]/5 to-cyan-500/5 border border-cyan-100 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 text-xs font-bold">✓</div>
        <div>
          <p className="text-xs font-semibold text-[#0d2044]">Report synced to Manager Dashboard</p>
          <p className="text-[11px] text-slate-400">All patient and payment data is automatically shared.</p>
        </div>
      </div>
    </div>
  )
}
