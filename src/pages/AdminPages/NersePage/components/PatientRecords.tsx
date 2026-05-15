import { useState } from 'react'
import { Search } from 'lucide-react'
import type { NursePatient } from '../types'
import WaitingBadge from './WaitingBadge'

interface Props { patients: NursePatient[]; globalSearch: string }

const PER_PAGE = 6

export default function PatientRecords({ patients, globalSearch }: Props) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const q = (globalSearch || search).toLowerCase()
  const filtered = patients.filter(p =>
    p.fullName.toLowerCase().includes(q) ||
    p.cardNumber.toLowerCase().includes(q) ||
    p.phone.includes(q)
  )
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="space-y-4">
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search name, card, phone..."
          className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-cyan-400 transition-colors"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                {['Card #','Name','Age','Gender','Phone','Address','Service','Payment','Visit Date'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-slate-400 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-12 text-slate-300">No records found</td></tr>
              ) : paged.map(p => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 font-mono text-cyan-700 font-semibold">{p.cardNumber}</td>
                  <td className="px-4 py-3 font-medium text-[#0d2044] whitespace-nowrap">{p.fullName}</td>
                  <td className="px-4 py-3 text-slate-500">{p.age}</td>
                  <td className="px-4 py-3 text-slate-500">{p.gender}</td>
                  <td className="px-4 py-3 text-slate-500">{p.phone}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{p.address}</td>
                  <td className="px-4 py-3 text-slate-500">{p.serviceType}</td>
                  <td className="px-4 py-3"><WaitingBadge status={p.paymentStatus} /></td>
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{p.visitDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
            <span className="text-xs text-slate-400">{filtered.length} records · Page {page} of {totalPages}</span>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${n === page ? 'bg-[#0d2044] text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
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
