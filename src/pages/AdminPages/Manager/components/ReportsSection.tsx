import { FileDown } from 'lucide-react'

const reportTypes = [
  { label: 'Daily Report',   period: 'Today · May 15, 2026',   patients: 8,  income: 6200,  expenses: 1800, profit: 4400, topService: 'Cleaning'  },
  { label: 'Weekly Report',  period: 'May 9 – 15, 2026',       patients: 42, income: 31600, expenses: 9200, profit: 22400,topService: 'Braces'    },
  { label: 'Monthly Report', period: 'May 2026',                patients: 168,income: 98000, expenses: 67500,profit: 30500,topService: 'Whitening' },
  { label: 'Yearly Report',  period: '2026 (Jan – May)',        patients: 720,income: 458000,expenses: 322500,profit:135500,topService: 'Braces'   },
]

export default function ReportsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {reportTypes.map(r => (
        <div key={r.label} className="bg-white rounded-xl border border-slate-100 p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">{r.label}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{r.period}</p>
            </div>
            <button className="flex items-center gap-1.5 text-[11px] text-indigo-600 hover:text-indigo-800 transition-colors border border-indigo-100 rounded-lg px-2.5 py-1.5 hover:bg-indigo-50">
              <FileDown className="w-3.5 h-3.5" /> Export
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Metric label="Patients"    value={String(r.patients)}                  color="text-slate-800" />
            <Metric label="Income"      value={`${r.income.toLocaleString()} Birr`} color="text-indigo-600" />
            <Metric label="Expenses"    value={`${r.expenses.toLocaleString()} Birr`}color="text-red-500"  />
            <Metric label="Net Profit"  value={`${r.profit.toLocaleString()} Birr`} color="text-emerald-600" />
          </div>

          <div className="pt-2 border-t border-slate-50">
            <p className="text-[11px] text-slate-400">
              Top service: <span className="text-slate-700 font-medium">{r.topService}</span>
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
