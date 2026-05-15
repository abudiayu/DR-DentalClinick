import { useState } from 'react'
import type { NursePatient, PaymentStatus } from '../types'
import { updatePaymentStatus } from '../store'
import WaitingBadge from './WaitingBadge'
import { CheckCircle } from 'lucide-react'

interface Props { patients: NursePatient[] }

export default function CardPayments({ patients }: Props) {
  const [list, setList] = useState<NursePatient[]>(patients)

  function markPaid(id: string) {
    updatePaymentStatus(id, 'Paid')
    setList(prev => prev.map(p => p.id === id ? { ...p, paymentStatus: 'Paid' } : p))
  }

  const totalCollected = list.filter(p => p.paymentStatus === 'Paid').reduce((s, p) => s + p.cardFee, 0)
  const totalPending   = list.filter(p => p.paymentStatus !== 'Paid').reduce((s, p) => s + p.cardFee, 0)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <SumCard label="Collected Today" value={`${totalCollected.toLocaleString()} Birr`} color="text-emerald-600" bg="bg-emerald-50" />
        <SumCard label="Pending"         value={`${totalPending.toLocaleString()} Birr`}   color="text-red-500"     bg="bg-red-50"     />
        <SumCard label="Total Patients"  value={String(list.length)}                        color="text-indigo-600"  bg="bg-indigo-50"  />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                {['Card #','Patient','Service','Card Fee','Status','Action'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-slate-400 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map(p => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 font-mono text-cyan-700 font-semibold">{p.cardNumber}</td>
                  <td className="px-4 py-3 font-medium text-[#0d2044] whitespace-nowrap">{p.fullName}</td>
                  <td className="px-4 py-3 text-slate-500">{p.serviceType}</td>
                  <td className="px-4 py-3 font-mono text-slate-700">{p.cardFee} Birr</td>
                  <td className="px-4 py-3"><WaitingBadge status={p.paymentStatus as PaymentStatus} /></td>
                  <td className="px-4 py-3">
                    {p.paymentStatus !== 'Paid' ? (
                      <button
                        onClick={() => markPaid(p.id)}
                        className="flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg hover:bg-emerald-100 transition-colors font-semibold"
                      >
                        <CheckCircle className="w-3 h-3" /> Mark Paid
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
