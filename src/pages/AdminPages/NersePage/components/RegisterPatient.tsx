import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { UserPlus } from 'lucide-react'
import type { Gender, PaymentStatus, NursePatient } from '../types'
import { nextCardNumber, addPatient } from '../store'
import PatientCardModal from './PatientCardModal'

interface Props { onDone: () => void }

const SERVICES = ['Cleaning', 'Whitening', 'Extraction', 'Braces', 'Surgery', 'Consultation', 'X-Ray']

export default function RegisterPatient({ onDone }: Props) {
  const [registeredPatient, setRegisteredPatient] = useState<NursePatient | null>(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: '', age: '', gender: 'Male' as Gender,
    phone: '', email: '', telegramId: '',
    address: '', emergencyContact: '',
    visitDate: new Date().toISOString().slice(0, 10),
    cardFee: '200', serviceType: 'Cleaning',
    paymentStatus: 'Paid' as PaymentStatus,
  })

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })) }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const now = new Date()
    const patient: NursePatient = {
      id: Date.now().toString(),
      cardNumber: nextCardNumber(),
      fullName: form.fullName,
      age: Number(form.age),
      gender: form.gender,
      phone: form.phone,
      email: form.email,
      telegramId: form.telegramId,
      address: form.address,
      emergencyContact: form.emergencyContact,
      visitDate: form.visitDate,
      cardFee: Number(form.cardFee),
      paymentStatus: form.paymentStatus,
      waitingStatus: 'Waiting',
      registeredAt: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      serviceType: form.serviceType,
    }
    addPatient(patient)
    setTimeout(() => {
      setLoading(false)
      setRegisteredPatient(patient)
    }, 600)
  }

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="bg-white rounded-2xl border border-slate-100 p-6 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-cyan-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0d2044] uppercase tracking-widest">Register New Patient</h2>
              <p className="text-[11px] text-slate-400">Card auto-generated · DENT-XXXX format</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name"           value={form.fullName}         onChange={v => set('fullName', v)}         required />
              <Field label="Age"                 value={form.age}              onChange={v => set('age', v)}              type="number" required />

              <div>
                <label className="field-label">Gender</label>
                <select value={form.gender} onChange={e => set('gender', e.target.value)} className="field-input">
                  {(['Male','Female','Other'] as Gender[]).map(g => <option key={g}>{g}</option>)}
                </select>
              </div>

              <Field label="Phone Number"        value={form.phone}            onChange={v => set('phone', v)}            required />
              <Field label="Email Address"       value={form.email}            onChange={v => set('email', v)}            type="email" />
              <Field label="Telegram Username"   value={form.telegramId}       onChange={v => set('telegramId', v)}       placeholder="@username" />
              <Field label="Address / Come From" value={form.address}          onChange={v => set('address', v)}          required />
              <Field label="Emergency Contact"   value={form.emergencyContact} onChange={v => set('emergencyContact', v)} />
              <Field label="Visit Date"          value={form.visitDate}        onChange={v => set('visitDate', v)}        type="date" required />

              <div>
                <label className="field-label">Service Type</label>
                <select value={form.serviceType} onChange={e => set('serviceType', e.target.value)} className="field-input">
                  {SERVICES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <Field label="Card Fee (Birr)"     value={form.cardFee}          onChange={v => set('cardFee', v)}          type="number" required />

              <div>
                <label className="field-label">Payment Status</label>
                <select value={form.paymentStatus} onChange={e => set('paymentStatus', e.target.value as PaymentStatus)} className="field-input">
                  {(['Paid','Partial','Unpaid'] as PaymentStatus[]).map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-[#0d2044] to-[#0e3a6e] text-white rounded-xl py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <UserPlus className="w-4 h-4" />
              }
              {loading ? 'Generating Card...' : 'Generate Patient Card'}
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Card modal */}
      <AnimatePresence>
        {registeredPatient && (
          <PatientCardModal
            patient={registeredPatient}
            onClose={() => { setRegisteredPatient(null); onDone() }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function Field({ label, value, onChange, type = 'text', required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; required?: boolean; placeholder?: string
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        required={required} className="field-input"
      />
    </div>
  )
}
