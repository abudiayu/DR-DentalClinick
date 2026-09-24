import { useTranslation } from 'react-i18next'
import StatusBadge from './StatusBadge'
import type { Payment, PaymentStatus } from '../types'

interface Props { payments: Payment[] }

export default function PaymentsSection({ payments }: Props) {
  const { t } = useTranslation()
  const totalCollected = payments.reduce((s, p) => s + p.paidAmount,  0)
  const totalPending   = payments.reduce((s, p) => s + p.remaining,   0)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <SummaryCard label={t('manager.totalCollected')} value={totalCollected}    color="text-emerald-600" />
        <SummaryCard label={t('manager.pendingBalance')} value={totalPending}      color="text-red-500"     />
        <SummaryCard label={t('manager.totalRecords')}   value={payments.length}   color="text-indigo-600"  isCount />
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {[t('manager.patient'), t('manager.service'), t('manager.totalFee'),
                  t('manager.paid'), t('manager.remaining'), t('manager.status')].map(h => (
                  <th key={h} className="text-start px-4 py-3 text-slate-500 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-slate-400">No payment records yet.</td></tr>
              ) : payments.map(p => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{p.patientName}</td>
                  <td className="px-4 py-3 text-slate-500">{p.service}</td>
                  <td className="px-4 py-3 text-slate-700 font-mono">{p.totalFee.toLocaleString()} {t('common.birr')}</td>
                  <td className="px-4 py-3 text-emerald-600 font-mono">{p.paidAmount.toLocaleString()} {t('common.birr')}</td>
                  <td className="px-4 py-3 text-red-500 font-mono">{p.remaining.toLocaleString()} {t('common.birr')}</td>
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
  const { t } = useTranslation()
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-4">
      <p className={`text-xl font-bold ${color}`}>
        {isCount ? value : `${value.toLocaleString()} ${t('common.birr')}`}
      </p>
      <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5">{label}</p>
    </div>
  )
}
