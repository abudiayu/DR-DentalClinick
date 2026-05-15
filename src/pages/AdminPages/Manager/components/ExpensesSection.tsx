import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { Expense, ExpenseCategory } from '../types'
import { mockExpenses } from '../mockData'

const CATEGORIES: ExpenseCategory[] = ['Electricity', 'Water', 'Equipment', 'Employee Salary', 'Medicine']

const catColors: Record<ExpenseCategory, string> = {
  Electricity:      'bg-yellow-50 text-yellow-700',
  Water:            'bg-blue-50 text-blue-700',
  Equipment:        'bg-indigo-50 text-indigo-700',
  'Employee Salary':'bg-purple-50 text-purple-700',
  Medicine:         'bg-emerald-50 text-emerald-700',
}

export default function ExpensesSection() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', amount: '', category: CATEGORIES[0] as ExpenseCategory, date: '' })

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0)
  const totalIncome   = 98000 // from monthly data
  const netProfit     = totalIncome - totalExpenses

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setExpenses(prev => [...prev, {
      id: Date.now().toString(),
      title: form.title,
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
    }])
    setForm({ title: '', amount: '', category: CATEGORIES[0], date: '' })
    setShowForm(false)
  }

  return (
    <div className="space-y-4">
      {/* Profit summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <p className="text-xl font-bold text-indigo-600">{totalIncome.toLocaleString()} Birr</p>
          <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5">Total Income</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <p className="text-xl font-bold text-red-500">{totalExpenses.toLocaleString()} Birr</p>
          <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5">Total Expenses</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <p className={`text-xl font-bold ${netProfit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {netProfit.toLocaleString()} Birr
          </p>
          <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5">Net Profit</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-1.5 bg-[#0F172A] text-white text-xs px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Expense
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-widest">New Expense</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Title</label>
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-400" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Amount (Birr)</label>
              <input required type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-400" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as ExpenseCategory }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-400">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Date</label>
              <input required type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-400" />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button type="submit" className="bg-[#0F172A] text-white text-xs px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="text-xs px-4 py-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['Title','Amount','Category','Date'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-slate-500 font-semibold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map(e => (
              <tr key={e.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-800">{e.title}</td>
                <td className="px-4 py-3 text-red-500 font-mono">{e.amount.toLocaleString()} Birr</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${catColors[e.category]}`}>
                    {e.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{e.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
