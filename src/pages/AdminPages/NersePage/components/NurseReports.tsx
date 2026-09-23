import { FileDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { NursePatient } from '../types'

interface Props { patients: NursePatient[] }

/** Local date string yyyy-mm-dd — uses device local timezone, not UTC */
function localToday(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Download report as CSV */
function exportCSV(today: string, data: {
  totalRegistered: number
  totalRevenue: number
  pending: number
  completed: number
  waiting: number
}) {
  const rows = [
    ['Date',                today],
    ['Registered Patients', String(data.totalRegistered)],
    ['Today Revenue (Birr)',String(data.totalRevenue)],
    ['Pending Payments (Birr)', String(data.pending)],
    ['Completed',           String(data.completed)],
    ['Still Waiting',       String(data.waiting)],
  ]
  const csv  = rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `daily_report_${today}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default function NurseReports({ patients }: Props) {
  const { t } = useTranslation()

  const today         = localToday()
  // Filter by today's date using local timezone
  const todayPatients = patients.filter(p => p.visitDate === today)
  // Exclude pending bookings (not yet approved by nurse) from report counts
  const activeToday   = todayPatients.filter(p => p.waitingStatus !== 'Pending')

  const totalRegistered = activeToday.length
  const totalRevenue    = activeToday
    .filter(p => p.paymentStatus === 'Paid')
    .reduce((s, p) => s + p.cardFee, 0)
  const pending         = activeToday
    .filter(p => p.paymentStatus !== 'Paid')
    .reduce((s, p) => s + p.cardFee, 0)
  const completed       = activeToday.filter(p => p.waitingStatus === 'Completed').length
  const waiting         = activeToday.filter(p => p.waitingStatus === 'Waiting').length

  const reportData = { totalRegistered, totalRevenue, pending, completed, waiting }

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-[#0d2044] uppercase tracking-widest">{t('nurse.dailyReport')}</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">{today}</p>
          </div>
          <button
            onClick={() => exportCSV(today, reportData)}
            className="flex items-center gap-1.5 text-[11px] text-cyan-600 border border-cyan-100 rounded-xl px-3 py-1.5 hover:bg-cyan-50 active:scale-95 transition-all"
          >
            <FileDown className="w-3.5 h-3.5" /> {t('common.export')}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: t('nurse.registeredPatients'),
              value: totalRegistered,
              color: 'text-indigo-600',
              bg:    'bg-indigo-50',
            },
            {
              label: t('nurse.todayRevenueReport'),
              value: `${totalRevenue.toLocaleString()} ${t('common.birr')}`,
              color: 'text-emerald-600',
              bg:    'bg-emerald-50',
            },
            {
              label: t('nurse.pendingPayments'),
              value: `${pending.toLocaleString()} ${t('common.birr')}`,
              color: 'text-red-500',
              bg:    'bg-red-50',
            },
            {
              label: t('nurse.completedReport'),
              value: completed,
              color: 'text-cyan-600',
              bg:    'bg-cyan-50',
            },
            {
              label: t('nurse.stillWaiting'),
              value: waiting,
              color: 'text-amber-600',
              bg:    'bg-amber-50',
            },
          ].map(m => (
            <div key={m.label} className={`${m.bg} rounded-xl p-4`}>
              <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
              <p className="text-[11px] text-slate-500 uppercase tracking-widest mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Synced notice */}
      <div className="bg-gradient-to-r from-[#0d2044]/5 to-cyan-500/5 border border-cyan-100 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 text-xs font-bold">✓</div>
        <div>
          <p className="text-xs font-semibold text-[#0d2044]">{t('nurse.reportSynced')}</p>
          <p className="text-[11px] text-slate-400">{t('nurse.reportSyncedDesc')}</p>
        </div>
      </div>
    </div>
  )
}
