import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Appointment, AppointmentStatus } from '../types'
import StatusBadge from './StatusBadge'

interface Props {
  appointments: Appointment[]
  onUpdateStatus: (id: string, status: 'Approved' | 'Cancelled') => Promise<void>
}

export default function AppointmentsSection({ appointments, onUpdateStatus }: Props) {
  const { t } = useTranslation()
  const [processing, setProcessing] = useState<Set<string>>(new Set())

  async function act(id: string, status: 'Approved' | 'Cancelled') {
    setProcessing(prev => new Set(prev).add(id))
    try { await onUpdateStatus(id, status) }
    finally { setProcessing(prev => { const s = new Set(prev); s.delete(id); return s }) }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {[t('manager.patient'), t('manager.date'), t('manager.time'),
                t('manager.service'), t('manager.doctor'), t('manager.status'), t('manager.actions')].map(h => (
                <th key={h} className="text-start px-4 py-3 text-slate-500 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-12 text-slate-400">No appointments yet.</td></tr>
            ) : appointments.map(a => (
              <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{a.patient}</td>
                <td className="px-4 py-3 text-slate-500">{a.date}</td>
                <td className="px-4 py-3 text-slate-500">{a.time}</td>
                <td className="px-4 py-3 text-slate-600">{a.service}</td>
                <td className="px-4 py-3 text-slate-500">{a.doctor}</td>
                <td className="px-4 py-3"><StatusBadge status={a.status as AppointmentStatus} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {a.status === 'Pending' ? (
                      <>
                        <button onClick={() => act(a.id, 'Approved')} disabled={processing.has(a.id)}
                          className="p-1.5 rounded-md hover:bg-emerald-50 text-emerald-500 transition-colors disabled:opacity-40">
                          {processing.has(a.id)
                            ? <span className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin inline-block" />
                            : <CheckCircle className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => act(a.id, 'Cancelled')} disabled={processing.has(a.id)}
                          className="p-1.5 rounded-md hover:bg-red-50 text-red-400 transition-colors disabled:opacity-40">
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
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
