import {
  Users, DollarSign, TrendingUp, Clock, Stethoscope, UserCheck
} from 'lucide-react'
import StatCard from './StatCard'
import { DailyIncomeChart, MonthlyProfitChart, ServiceRevenuePie } from './Charts'
import { mockAppointments, mockPatients } from '../mockData'
import StatusBadge from './StatusBadge'
import type { AppointmentStatus } from '../types'

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatCard icon={<Users className="w-4 h-4" />}        label="Patients Today"      value={8}      growth="+12%"  positive color="#6366f1" delay={0}    />
        <StatCard icon={<DollarSign className="w-4 h-4" />}   label="Today Income"        value={6200}   growth="+8%"   positive color="#10b981" delay={0.05} prefix="" suffix=" Br" />
        <StatCard icon={<TrendingUp className="w-4 h-4" />}   label="Monthly Profit"      value={30500}  growth="+15%"  positive color="#8b5cf6" delay={0.1}  suffix=" Br" />
        <StatCard icon={<Clock className="w-4 h-4" />}        label="Pending Payments"    value={14800}  growth="-3%"   positive={false} color="#f59e0b" delay={0.15} suffix=" Br" />
        <StatCard icon={<Stethoscope className="w-4 h-4" />}  label="Total Services"      value={5}      growth="+1"    positive color="#06b6d4" delay={0.2}  />
        <StatCard icon={<UserCheck className="w-4 h-4" />}    label="Registered Patients" value={168}    growth="+24"   positive color="#ec4899" delay={0.25} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DailyIncomeChart />
        <MonthlyProfitChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <ServiceRevenuePie />
        </div>

        {/* Recent appointments */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 p-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Today's Appointments</h3>
          <div className="space-y-2">
            {mockAppointments.slice(0, 4).map(a => (
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
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Recent Patients</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                {['Card #','Name','Treatment','Last Visit','Status'].map(h => (
                  <th key={h} className="text-left pb-2 text-slate-400 font-semibold uppercase tracking-wider pr-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockPatients.slice(0, 5).map(p => (
                <tr key={p.id} className="border-b border-slate-50 last:border-0">
                  <td className="py-2.5 pr-4 font-mono text-slate-500">{p.cardNumber}</td>
                  <td className="py-2.5 pr-4 font-medium text-slate-800 whitespace-nowrap">{p.fullName}</td>
                  <td className="py-2.5 pr-4 text-slate-500">{p.treatment}</td>
                  <td className="py-2.5 pr-4 text-slate-400 whitespace-nowrap">{p.lastVisit}</td>
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
