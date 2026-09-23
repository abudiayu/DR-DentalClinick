import { Users, DollarSign, Clock, CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import NurseStatCard from './NurseStatCard'
import WaitingBadge from './WaitingBadge'
import type { NursePatient } from '../types'

interface Props { patients: NursePatient[] }

/** Local date string yyyy-mm-dd — uses the device's local timezone, not UTC */
function localToday(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function NurseDashboard({ patients }: Props) {
  const { t } = useTranslation()

  const today     = localToday()
  // Include both today's registrations AND patients whose visit_date is today
  const todayList = patients.filter(p => p.visitDate === today)

  // All active patients (exclude Pending bookings not yet approved)
  const activeToday = todayList.filter(p => p.waitingStatus !== 'Pending')

  const totalToday = activeToday.length
  const revenue    = activeToday
    .filter(p => p.paymentStatus === 'Paid')
    .reduce((s, p) => s + p.cardFee, 0)
  const waiting    = activeToday.filter(p => p.waitingStatus === 'Waiting').length
  const completed  = activeToday.filter(p => p.waitingStatus === 'Completed').length

  const tableHeaders = [
    t('nurse.cardNumber'), t('nurse.fullName'),
    t('nurse.service'), t('nurse.fee'), t('nurse.payment'),
  ]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <NurseStatCard icon={<Users       className="w-4 h-4" />} label={t('nurse.patientsToday')} value={totalToday} color="#6366f1" delay={0}    />
        <NurseStatCard icon={<DollarSign  className="w-4 h-4" />} label={t('nurse.todayRevenue')}  value={revenue}    color="#10b981" delay={0.05} suffix=" Br" />
        <NurseStatCard icon={<Clock       className="w-4 h-4" />} label={t('nurse.waitingCount')}  value={waiting}    color="#f59e0b" delay={0.1}  />
        <NurseStatCard icon={<CheckCircle className="w-4 h-4" />} label={t('nurse.completed')}     value={completed}  color="#06b6d4" delay={0.15} />
      </div>

      {/* Today's queue */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <h3 className="text-xs font-bold text-[#0d2044] uppercase tracking-widest mb-4">{t('nurse.todaysQueue')}</h3>
        {activeToday.length === 0 ? (
          <p className="text-sm text-slate-300 text-center py-8">{t('nurse.noPatients')}</p>
        ) : (
          <div className="space-y-2">
            {activeToday.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0d2044] truncate">{p.fullName}</p>
                  <p className="text-[11px] text-slate-400">{p.serviceType} · {p.registeredAt}</p>
                </div>
                <span className="font-mono text-[11px] text-cyan-600">{p.cardNumber}</span>
                <WaitingBadge status={p.waitingStatus} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent registrations — all time, newest 5 */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <h3 className="text-xs font-bold text-[#0d2044] uppercase tracking-widest mb-4">{t('nurse.recentRegistrations')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                {tableHeaders.map(h => (
                  <th key={h} className="text-start pb-2 text-slate-400 font-semibold uppercase tracking-wider pe-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr><td colSpan={5} className="py-6 text-center text-slate-300 text-sm">{t('nurse.noPatients')}</td></tr>
              ) : patients.slice(0, 5).map(p => (
                <tr key={p.id} className="border-b border-slate-50 last:border-0">
                  <td className="py-2.5 pe-4 font-mono text-cyan-700 font-semibold">{p.cardNumber}</td>
                  <td className="py-2.5 pe-4 font-medium text-[#0d2044] whitespace-nowrap">{p.fullName}</td>
                  <td className="py-2.5 pe-4 text-slate-500">{p.serviceType}</td>
                  <td className="py-2.5 pe-4 font-mono text-slate-600">{p.cardFee} {t('common.birr')}</td>
                  <td className="py-2.5"><WaitingBadge status={p.paymentStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
