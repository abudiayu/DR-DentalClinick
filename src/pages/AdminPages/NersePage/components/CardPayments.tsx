import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { NursePatient, PaymentStatus } from '../types'
import WaitingBadge from './WaitingBadge'

interface Props {
  patients: NursePatient[]
  onUpdatePayment: (id: string, status: PaymentStatus) => Promise<void>
}

export default function CardPayments({ patients, onUpdatePayment }: Props) {
  const { t } = useTranslation()
  const [marking, setMarking] = useState<Set<string>>(new Set())

  async function markPaid(id: string) {
    setMarking(prev => new Set(prev).add(id))
    try {
      await onUpdatePayment(id, 'Paid')
    } finally {
      setMarking(prev => { const s = new Set(prev); s.delete(id); return s })
    }
  }

  const totalCollected = patients.filter(p => p.paymentStatus === 'Paid').reduce((s, p) => s + p.cardFee, 0)
  const totalPending   = patients.filter(p => p.paymentStatus !== 'Paid').reduce((s, p) => s + p.cardFee, 0)

  const headers = [
    t('nurse.cardNumber'), t('nurse.fullName'), t('nurse.service'),
    t('nurse.fee'), t('manager.status'), t('manager.actions'),
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <SumCard label={t('nurse.collectedToday')} value={`${totalCollected.toLocaleString()} ${t('common.birr')}`} color="text-emerald-600" bg="bg-emerald-50" />
        <SumCard label={t('nurse.pending')}         value={`${totalPending.toLocaleString()} ${t('common.birr')}`}   color="text-red-500"     bg="bg-red-50"     />
        <SumCard label={t('nurse.totalPatients')}   value={String(patients.length)}                                   color="text-indigo-600"  bg="bg-indigo-50"  />
      </div>

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
                  <td colSpan={6} className="text-center py-12 text-slate-300 text-sm">No payment records yet.</td>
                </tr>
              ) : patients.map(p => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 font-mono text-cyan-700 font-semibold">{p.cardNumber}</td>
                  <td className="px-4 py-3 font-medium text-[#0d2044] whitespace-nowrap">{p.fullName}</td>
                  <td className="px-4 py-3 text-slate-500">{p.serviceType}</td>
                  <td className="px-4 py-3 font-mono text-slate-700">{p.cardFee} {t('common.birr')}</td>
                  <td className="px-4 py-3"><WaitingBadge status={p.paymentStatus} /></td>
                  <td className="px-4 py-3">
                    {p.paymentStatus !== 'Paid' ? (
                      <button
                        onClick={() => markPaid(p.id)}
                        disabled={marking.has(p.id)}
                        className="flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg hover:bg-emerald-100 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {marking.has(p.id)
                          ? <span className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                          : <CheckCircle className="w-3 h-3" />
                        }
                        {t('nurse.markPaid')}
                      </button>
                    ) : (
                      <span className="text-slate-300 text-[11px]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SumCard({ label, value, color, bg }: { label: string; value: string; color: string; bg: string }) {
  return (
    <div className={`${bg} rounded-2xl p-4 border border-white`}>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      <p className="text-[11px] text-slate-500 uppercase tracking-widest mt-0.5">{label}</p>
    </div>
  )
}
