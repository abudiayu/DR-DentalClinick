import { useState } from 'react'
import { Search, Eye, Pencil, Printer, Trash2, Plus } from 'lucide-react'
import type { Patient, PaymentStatus } from '../types'
import { mockPatients } from '../mockData'
import StatusBadge from './StatusBadge'

export default function PatientsSection() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const PER_PAGE = 5

  const filtered = patients.filter(p =>
    p.fullName.toLowerCase().includes(search.toLowerCase()) ||
    p.cardNumber.toLowerCase().includes(search.toLowerCase())
  )
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function deletePatient(id: string) {
    if (confirm('Delete this patient record?')) {
      setPatients(prev => prev.filter(p => p.id !== id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search patients..."
            className="pl-8 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-slate-400 w-56"
          />
        </div>
        <button className="flex items-center gap-1.5 bg-[#0F172A] text-white text-xs px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add Patient
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Card #','Full Name','Phone','Address','Treatment','Status','Last Visit','Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-slate-500 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400">
                    No patients found
                  </td>
                </tr>
              ) : paged.map(p => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-600">{p.cardNumber}</td>
                  <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{p.fullName}</td>
                  <td className="px-4 py-3 text-slate-500">{p.phone}</td>
                  <td className="px-4 py-3 text-slate-500">{p.address}</td>
                  <td className="px-4 py-3 text-slate-600">{p.treatment}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.paymentStatus as PaymentStatus} /></td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{p.lastVisit}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <ActionBtn icon={<Eye className="w-3.5 h-3.5" />} color="text-indigo-500" />
                      <ActionBtn icon={<Pencil className="w-3.5 h-3.5" />} color="text-amber-500" />
                      <ActionBtn icon={<Printer className="w-3.5 h-3.5" />} color="text-slate-400" />
                      <ActionBtn icon={<Trash2 className="w-3.5 h-3.5" />} color="text-red-400" onClick={() => deletePatient(p.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
            <span className="text-xs text-slate-400">
              {filtered.length} records · Page {page} of {totalPages}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                    n === page ? 'bg-[#0F172A] text-white' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ActionBtn({ icon, color, onClick }: { icon: React.ReactNode; color: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`p-1.5 rounded-md hover:bg-slate-100 transition-colors ${color}`}
    >
      {icon}
    </button>
  )
}
