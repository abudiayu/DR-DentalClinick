import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import type { Appointment, AppointmentStatus } from '../types'
import { mockAppointments } from '../mockData'
import StatusBadge from './StatusBadge'

export default function AppointmentsSection() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)

  function updateStatus(id: string, status: AppointmentStatus) {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['Patient','Date','Time','Service','Doctor','Status','Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-slate-500 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appointments.map(a => (
              <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{a.patient}</td>
                <td className="px-4 py-3 text-slate-500">{a.date}</td>
                <td className="px-4 py-3 text-slate-500">{a.time}</td>
                <td className="px-4 py-3 text-slate-600">{a.service}</td>
                <td className="px-4 py-3 text-slate-500">{a.doctor}</td>
                <td className="px-4 py-3"><StatusBadge status={a.status as AppointmentStatus} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {a.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(a.id, 'Approved')}
                          className="p-1.5 rounded-md hover:bg-emerald-50 text-emerald-500 transition-colors"
                          title="Approve"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateStatus(a.id, 'Cancelled')}
                          className="p-1.5 rounded-md hover:bg-red-50 text-red-400 transition-colors"
                          title="Cancel"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                    {a.status !== 'Pending' && (
                      <span className="text-slate-300 text-[10px] uppercase tracking-widest">—</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
