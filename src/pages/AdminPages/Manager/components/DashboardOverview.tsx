import { Users, DollarSign, TrendingUp, Clock, Stethoscope, UserCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import StatCard from './StatCard'
import { DailyIncomeChart, MonthlyProfitChart, ServiceRevenuePie } from './Charts'
import StatusBadge from './StatusBadge'
import type { ManagerData } from '../useManagerData'
import type { AppointmentStatus } from '../types'

interface Props { data: ManagerData }

export default function DashboardOverview({ data }: Props) {
  const { t } = useTranslation()

  const recentPatients     = data.patients.slice(0, 5)
  const todayAppointments  = data.appointments.slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatCard icon={<Users        className="w-4 h-4" />} label={t('manager.patientsToday')}      value={data.todayPatients}   growth="" positive color="#6366f1" delay={0}    />
        <StatCard icon={<DollarSign   className="w-4 h-4" />} label={t('manager.todayIncome')}        value={data.todayIncome}     growth="" positive color="#10b981" delay={0.05} suffix=" Br" />
        <StatCard icon={<TrendingUp   className="w-4 h-4" />} label={t('manager.monthlyProfit')}      value={Math.max(0, data.monthlyProfit)} growth="" positive color="#8b5cf6" delay={0.1} suffix=" Br" />
        <StatCard icon={<Clock        className="w-4 h-4" />} label={t('manager.pendingPayments')}    value={data.pendingPayments} growth="" positive={false} color="#f59e0b" delay={0.15} suffix=" Br" />
        <StatCard icon={<Stethoscope  className="w-4 h-4" />} label={t('manager.totalServices')}      value={data.services.filter(s => s.active).length} growth="" positive color="#06b6d4" delay={0.2} />
        <StatCard icon={<UserCheck    className="w-4 h-4" />} label={t('manager.registeredPatients')} value={data.totalRegistered} growth="" positive color="#ec4899" delay={0.25} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DailyIncomeChart  data={data.dailyIncomeData} />
        <MonthlyProfitChart data={data.monthlyProfitData} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <ServiceRevenuePie data={data.serviceRevenueData} />
        </div>

        {/* Today's appointments */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 p-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            {t('manager.todaysAppointments')}
          </h3>
          <div className="space-y-2">
            {todayAppointments.length === 0 ? (
              <p className="text-sm text-slate-300 text-center py-6">No appointments yet.</p>
            ) : todayAppointments.map(a => (
              <div key={a.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-800">{a.patient}</p>
                  <p className="text-[11px] text-slate-400">{a.service} · {a.time}</p>
                </div>
                <StatusBadge status={a.status as AppointmentStatus} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent patients */}
      <div className="bg-white rounded-xl border border-slate-100 p-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
          {t('manager.recentPatients')}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                {[t('manager.cardNo'), t('manager.name'), t('manager.treatment'), t('manager.lastVisit'), t('manager.status')].map(h => (
                  <th key={h} className="text-start pb-2 text-slate-400 font-semibold uppercase tracking-wider pe-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentPatients.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-slate-300">No patients yet.</td></tr>
              ) : recentPatients.map(p => (
                <tr key={p.id} className="border-b border-slate-50 last:border-0">
                  <td className="py-2.5 pe-4 font-mono text-slate-500">{p.cardNumber}</td>
                  <td className="py-2.5 pe-4 font-medium text-slate-800 whitespace-nowrap">{p.fullName}</td>
                  <td className="py-2.5 pe-4 text-slate-500">{p.treatment}</td>
                  <td className="py-2.5 pe-4 text-slate-400 whitespace-nowrap">{p.lastVisit}</td>
                  <td className="py-2.5"><StatusBadge status={p.paymentStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
