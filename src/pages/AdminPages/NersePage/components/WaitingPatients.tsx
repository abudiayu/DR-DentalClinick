import { useState } from 'react'
import { Eye, Printer, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { NursePatient, WaitingStatus } from '../types'
import WaitingBadge from './WaitingBadge'

interface Props {
  patients: NursePatient[]
  onUpdateStatus: (id: string, status: WaitingStatus) => Promise<void>
}

const STATUS_CYCLE: Record<WaitingStatus, WaitingStatus> = {
  Waiting:        'In Treatment',
  'In Treatment': 'Completed',
  Completed:      'Completed',
}

export default function WaitingPatients({ patients, onUpdateStatus }: Props) {
  const { t } = useTranslation()
  const [selected,  setSelected]  = useState<NursePatient | null>(null)
  const [advancing, setAdvancing] = useState<Set<string>>(new Set())

  async function advance(id: string, current: WaitingStatus) {
    const next = STATUS_CYCLE[current]
    if (next === current) return
    setAdvancing(prev => new Set(prev).add(id))
    try {
      await onUpdateStatus(id, next)
    } finally {
      setAdvancing(prev => { const s = new Set(prev); s.delete(id); return s })
    }
  }

  const waiting   = patients.filter(p => p.waitingStatus === 'Waiting').length
  const treating  = patients.filter(p => p.waitingStatus === 'In Treatment').length
  const completed = patients.filter(p => p.waitingStatus === 'Completed').length

  const headers = [
    t('nurse.cardNumber'), t('nurse.fullName'), t('nurse.age2'),
    t('nurse.service'), t('nurse.payment'), t('nurse.registeredAt'),
    t('manager.status'), t('manager.actions'),
  ]

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: t('nurse.waitingStatus'), count: waiting,   color: 'text-amber-600',   bg: 'bg-amber-50'   },
          { label: t('nurse.inTreatment'),   count: treating,  color: 'text-blue-600',    bg: 'bg-blue-50'    },
          { label: t('nurse.completed'),     count: completed, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-white`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-[11px] text-slate-500 uppercase tracking-widest mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                {headers.map(h => (
                  <th key={h} className="text-start px-4 py-3 text-slate-400 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-300 text-sm">{t('nurse.noQueue')}</td>
                </tr>
              ) : patients.map(p => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 font-mono text-cyan-700 font-semibold">{p.cardNumber}</td>
                  <td className="px-4 py-3 font-medium text-[#0d2044] whitespace-nowrap">{p.fullName}</td>
                  <td className="px-4 py-3 text-slate-500">{p.age}</td>
                  <td className="px-4 py-3 text-slate-500">{p.serviceType}</td>
                  <td className="px-4 py-3"><WaitingBadge status={p.paymentStatus} /></td>
                  <td className="px-4 py-3 text-slate-400">{p.registeredAt}</td>
                  <td className="px-4 py-3"><WaitingBadge status={p.waitingStatus} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Btn icon={<Eye className="w-4 h-4 sm:w-3.5 sm:h-3.5" />}
                        color="text-indigo-400" onClick={() => setSelected(p)} />
                      <Btn icon={<Printer className="w-4 h-4 sm:w-3.5 sm:h-3.5" />}
                        color="text-slate-400" onClick={() => window.print()} />
                      {p.waitingStatus !== 'Completed' && (
                        <Btn
                          disabled={advancing.has(p.id)}
                          color="text-cyan-500"
                          onClick={() => advance(p.id, p.waitingStatus)}
                          icon={
                            advancing.has(p.id)
                              ? <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin inline-block" />
                              : <ArrowRight className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                          }
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-sm">
                {selected.fullName[0]}
              </div>
              <div>
                <p className="font-bold text-[#0d2044]">{selected.fullName}</p>
                <p className="text-xs text-cyan-600 font-mono">{selected.cardNumber}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {[
                [t('nurse.age2'),             selected.age],
                [t('nurse.gender'),           selected.gender],
                [t('nurse.phoneNumber'),      selected.phone],
                [t('nurse.address'),          selected.address],
                [t('nurse.emergencyContact'), selected.emergencyContact],
                [t('nurse.serviceType'),      selected.serviceType],
                [t('nurse.cardFee'),          `${selected.cardFee} ${t('common.birr')}`],
                [t('nurse.paymentStatus'),    selected.paymentStatus],
                [t('manager.status'),         selected.waitingStatus],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 uppercase tracking-wider">{k}</span>
                  <span className="font-medium text-slate-700">{String(v)}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setSelected(null)}
              className="mt-4 w-full py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition-colors">
              {t('common.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Btn({ icon, color, onClick, disabled }: {
  icon: React.ReactNode; color: string; onClick: () => void; disabled?: boolean
}) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`p-2.5 sm:p-1.5 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors ${color} min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed`}>
      {icon}
    </button>
  )
}
