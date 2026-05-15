import { useState } from 'react'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import type { Service } from '../types'
import { mockServices } from '../mockData'

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>(mockServices)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', price: '', description: '' })
  const [editId, setEditId] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editId) {
      setServices(prev => prev.map(s =>
        s.id === editId ? { ...s, name: form.name, price: Number(form.price), description: form.description } : s
      ))
      setEditId(null)
    } else {
      setServices(prev => [...prev, {
        id: Date.now().toString(),
        name: form.name,
        price: Number(form.price),
        description: form.description,
        active: true,
      }])
    }
    setForm({ name: '', price: '', description: '' })
    setShowForm(false)
  }

  function startEdit(s: Service) {
    setForm({ name: s.name, price: String(s.price), description: s.description })
    setEditId(s.id)
    setShowForm(true)
  }

  function deleteService(id: string) {
    if (confirm('Delete this service?')) setServices(prev => prev.filter(s => s.id !== id))
  }

  function toggleActive(id: string) {
    setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => { setShowForm(v => !v); setEditId(null); setForm({ name: '', price: '', description: '' }) }}
          className="flex items-center gap-1.5 bg-[#0F172A] text-white text-xs px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Service
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
            {editId ? 'Edit Service' : 'New Service'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Service Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} required />
            <Field label="Price (Birr)"  value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} type="number" required />
          </div>
          <Field label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} />
          <div className="flex gap-2 pt-1">
            <button type="submit" className="bg-[#0F172A] text-white text-xs px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              {editId ? 'Update' : 'Save Service'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-xs px-4 py-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {services.map(s => (
          <div key={s.id} className={`bg-white rounded-xl border p-4 transition-all ${s.active ? 'border-slate-100' : 'border-slate-100 opacity-60'}`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.description}</p>
              </div>
              <span className="text-indigo-600 font-bold text-sm whitespace-nowrap ml-2">
                {s.price.toLocaleString()} Birr
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-50">
              <button onClick={() => startEdit(s)} className="p-1.5 rounded-md hover:bg-slate-100 text-amber-500 transition-colors">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => deleteService(s.id)} className="p-1.5 rounded-md hover:bg-slate-100 text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => toggleActive(s.id)} className={`ml-auto p-1.5 rounded-md transition-colors ${s.active ? 'text-emerald-500 hover:bg-emerald-50' : 'text-slate-400 hover:bg-slate-100'}`}>
                {s.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
              </button>
              <span className={`text-[10px] uppercase tracking-widest ${s.active ? 'text-emerald-500' : 'text-slate-400'}`}>
                {s.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', required }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors"
      />
    </div>
  )
}
