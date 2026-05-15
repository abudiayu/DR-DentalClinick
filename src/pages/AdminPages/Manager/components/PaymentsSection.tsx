import { mockPayments } from '../mockData'
import StatusBadge from './StatusBadge'
import type { PaymentStatus } from '../types'

export default function PaymentsSection() {
  const totalIncome  = mockPayments.reduce((s, p) => s + p.paidAmount, 0)
  const totalPending = mockPayments.reduce((s, p) => s + p.remaining, 0)

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <SummaryCard label="Total Collected" value={totalIncome}  color="text-emerald-600" />
        <SummaryCard label="Pending Balance" value={totalPending} color="text-red-500"     />
        <SummaryCard label="Total Records"   value={mockPayments.length} color="text-indigo-600" isCount />
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Patient','Service','Total Fee','Paid','Remaining','Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-slate-500 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockPayments.map(p => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{p.patientName}</td>
                  <td className="px-4 py-3 text-slate-500">{p.service}</td>
                  <td className="px-4 py-3 text-slate-700 font-mono">{p.totalFee.toLocaleString()} Birr</td>
                  <td className="px-4 py-3 text-emerald-600 font-mono">{p.paidAmount.toLocaleString()} Birr</td>
                  <td className="px-4 py-3 text-red-500 font-mono">{p.remaining.toLocaleString()} Birr</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status as PaymentStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ label, value, color, isCount }: { label: string; value: number; color: string; isCount?: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-4">
      <p className={`text-xl font-bold ${color}`}>
        {isCount ? value : `${value.toLocaleString()} Birr`}
      </p>
      <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5">{label}</p>
    </div>
  )
}
