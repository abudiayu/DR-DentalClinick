import { FileDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ManagerData } from '../useManagerData'

interface Props { data: ManagerData }

type ReportRow = {
  label:      string
  period:     string
  patients:   number
  income:     number
  expenses:   number
  profit:     number
  topService: string
}

/** Download a report as a CSV file in the browser */
function exportCSV(report: ReportRow) {
  const rows = [
    ['Report',      report.label],
    ['Period',      report.period],
    ['Patients',    String(report.patients)],
    ['Income (Birr)',    String(report.income)],
    ['Expenses (Birr)',  String(report.expenses)],
    ['Net Profit (Birr)',String(report.profit)],
    ['Top Service', report.topService],
  ]

  const csv     = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob    = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url     = URL.createObjectURL(blob)
  const a       = document.createElement('a')
  a.href        = url
  a.download    = `${report.label.replace(/\s+/g, '_')}_report.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default function ReportsSection({ data }: Props) {
  const { t } = useTranslation()

  const today      = new Date().toISOString().slice(0, 10)
  const weekAgo    = new Date(Date.now() - 7 * 86400_000).toISOString().slice(0, 10)
  const monthStart = new Date().toISOString().slice(0, 7) + '-01'
  const yearStart  = new Date().getFullYear() + '-01-01'

  function income(from: string, to: string) {
    return data.payments
      .filter((_, i) => {
        const d = data.patients[i]?.lastVisit ?? ''
        return d >= from && d <= to
      })
      .reduce((s, p) => s + p.paidAmount, 0)
  }

  function expenseSum(from: string, to: string) {
    return data.expenses
      .filter(e => e.date >= from && e.date <= to)
      .reduce((s, e) => s + e.amount, 0)
  }

  function patientCount(from: string, to: string) {
    return data.patients.filter(p => p.lastVisit >= from && p.lastVisit <= to).length
  }

  function topService(from: string, to: string) {
    const counts: Record<string, number> = {}
    data.patients
      .filter(p => p.lastVisit >= from && p.lastVisit <= to)
      .forEach(p => { counts[p.treatment] = (counts[p.treatment] ?? 0) + 1 })
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
    return top ? top[0] : '—'
  }

  function makeReport(label: string, period: string, from: string, to: string): ReportRow {
    const inc = income(from, to)
    const exp = expenseSum(from, to)
    return { label, period, patients: patientCount(from, to), income: inc, expenses: exp, profit: inc - exp, topService: topService(from, to) }
  }

  const reports: ReportRow[] = [
    makeReport(t('manager.dailyReport'),   today, today, today),
    makeReport(t('manager.weeklyReport'),  `${weekAgo} – ${today}`, weekAgo, today),
    makeReport(t('manager.monthlyReport'), new Date().toLocaleString('default', { month: 'long', year: 'numeric' }), monthStart, today),
    makeReport(t('manager.yearlyReport'),  String(new Date().getFullYear()), yearStart, today),
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {reports.map(r => (
        <div key={r.label} className="bg-white rounded-xl border border-slate-100 p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">{r.label}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{r.period}</p>
            </div>
            <button
              onClick={() => exportCSV(r)}
              className="flex items-center gap-1.5 text-[11px] text-indigo-600 hover:text-indigo-800 transition-colors border border-indigo-100 rounded-lg px-2.5 py-1.5 hover:bg-indigo-50 active:scale-95"
            >
              <FileDown className="w-3.5 h-3.5" /> {t('common.export')}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Metric label={t('manager.patientCount')} value={String(r.patients)}                    color="text-slate-800"   />
            <Metric label={t('manager.income')}       value={`${r.income.toLocaleString()} Birr`}   color="text-indigo-600"  />
            <Metric label={t('manager.totalExpenses')}value={`${r.expenses.toLocaleString()} Birr`} color="text-red-500"     />
            <Metric label={t('manager.netProfit')}    value={`${r.profit.toLocaleString()} Birr`}   color={r.profit >= 0 ? 'text-emerald-600' : 'text-red-500'} />
          </div>

          <div className="pt-2 border-t border-slate-50">
            <p className="text-[11px] text-slate-400">
              {t('manager.topService')}: <span className="text-slate-700 font-medium">{r.topService}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function Metric({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-slate-50 rounded-lg p-3">
      <p className={`text-sm font-bold ${color}`}>{value}</p>
      <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{label}</p>
    </div>
  )
}
