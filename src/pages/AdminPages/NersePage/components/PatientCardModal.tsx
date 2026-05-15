import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import QRCode from 'qrcode'
import { X, Download, Printer, Send, Mail, CheckCircle, Loader } from 'lucide-react'
import type { NursePatient } from '../types'
import { generatePatientCardPDF } from '../utils/generatePDF'

interface Props {
  patient: NursePatient
  onClose: () => void
}

type SendState = 'idle' | 'sending' | 'sent'

export default function PatientCardModal({ patient, onClose }: Props) {
  const [qrUrl, setQrUrl] = useState('')
  const [pdfLoading, setPdfLoading] = useState(false)
  const [emailState, setEmailState] = useState<SendState>('idle')
  const [telegramState, setTelegramState] = useState<SendState>('idle')
  const cardRef = useRef<HTMLDivElement>(null)

  // Build QR payload
  const qrPayload = JSON.stringify({
    id: patient.id,
    card: patient.cardNumber,
    name: patient.fullName,
    date: patient.visitDate,
    payment: patient.paymentStatus,
  })

  useEffect(() => {
    QRCode.toDataURL(qrPayload, { width: 120, margin: 1, color: { dark: '#0d2044', light: '#ffffff' } })
      .then(setQrUrl)
  }, [qrPayload])

  async function handleDownloadPDF() {
    setPdfLoading(true)
    await generatePatientCardPDF(patient, qrUrl)
    setPdfLoading(false)
  }

  function handlePrint() {
    const win = window.open('', '_blank')
    if (!win || !cardRef.current) return
    win.document.write(`
      <html><head><title>Patient Card — ${patient.cardNumber}</title>
      <style>
        body { margin: 0; background: #0d2044; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .card { width: 340px; background: linear-gradient(135deg,#0d2044,#0e3a6e); border-radius: 16px; padding: 24px; color: white; font-family: sans-serif; }
        .accent { height: 4px; background: #06b6d4; border-radius: 2px; margin-bottom: 16px; }
        .card-num { color: #06b6d4; font-size: 12px; letter-spacing: 2px; margin-bottom: 4px; }
        .name { font-size: 20px; font-weight: bold; margin-bottom: 12px; }
        .row { font-size: 12px; color: #94a3b8; margin-bottom: 4px; }
        .badge { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; background: #10b981; color: white; margin-top: 8px; }
        .qr { margin-top: 12px; }
        img { width: 80px; height: 80px; }
      </style></head><body>
      <div class="card">
        <div class="accent"></div>
        <div class="card-num">${patient.cardNumber}</div>
        <div class="name">${patient.fullName}</div>
        <div class="row">Age: ${patient.age} &nbsp;|&nbsp; ${patient.gender}</div>
        <div class="row">Phone: ${patient.phone}</div>
        <div class="row">Service: ${patient.serviceType}</div>
        <div class="row">Date: ${patient.visitDate}</div>
        <div class="row">Fee: ${patient.cardFee} Birr</div>
        <div class="badge">${patient.paymentStatus}</div>
        ${qrUrl ? `<div class="qr"><img src="${qrUrl}" /></div>` : ''}
      </div>
      </body></html>
    `)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); win.close() }, 400)
  }

  function simulateSend(setter: (s: SendState) => void) {
    setter('sending')
    setTimeout(() => setter('sent'), 1500)
  }

  const statusColor = patient.paymentStatus === 'Paid'
    ? 'bg-emerald-500' : patient.paymentStatus === 'Partial'
    ? 'bg-amber-500' : 'bg-red-500'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <p className="text-sm font-bold text-[#0d2044] uppercase tracking-widest">Patient Card</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Generated successfully</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Card preview */}
          <div className="p-5">
            <div
              ref={cardRef}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0d2044 0%, #0e3a6e 100%)' }}
            >
              {/* Cyan accent top */}
              <div className="h-1.5 bg-gradient-to-r from-cyan-400 to-cyan-600" />

              <div className="p-5 flex gap-4">
                {/* Left info */}
                <div className="flex-1 min-w-0">
                  {/* Clinic */}
                  <p className="text-[9px] text-cyan-400/70 uppercase tracking-[0.2em] mb-3">
                    Dr. Muhammed Zain Dental Clinic
                  </p>

                  {/* Card number */}
                  <p className="text-cyan-400 text-xs font-mono font-bold tracking-widest mb-1">
                    {patient.cardNumber}
                  </p>

                  {/* Name */}
                  <p className="text-white text-lg font-bold leading-tight mb-3 truncate">
                    {patient.fullName}
                  </p>

                  {/* Details */}
                  <div className="space-y-1">
                    {[
                      ['Age / Gender', `${patient.age} · ${patient.gender}`],
                      ['Phone',        patient.phone],
                      ['Service',      patient.serviceType],
                      ['Date',         patient.visitDate],
                      ['Fee',          `${patient.cardFee} Birr`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <span className="text-[10px] text-slate-400 w-20 flex-shrink-0">{k}</span>
                        <span className="text-[10px] text-white/80 truncate">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Payment badge */}
                  <span className={`inline-block mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white ${statusColor}`}>
                    {patient.paymentStatus}
                  </span>
                </div>

                {/* QR code */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  {qrUrl ? (
                    <img src={qrUrl} alt="QR" className="w-20 h-20 rounded-lg bg-white p-1" />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-white/10 flex items-center justify-center">
                      <Loader className="w-4 h-4 text-white/40 animate-spin" />
                    </div>
                  )}
                  <p className="text-[9px] text-white/30 text-center">Scan to verify</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-5 pb-5 space-y-3">
            {/* Primary actions */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleDownloadPDF}
                disabled={pdfLoading || !qrUrl}
                className="flex-1 flex items-center justify-center gap-2 bg-[#0d2044] text-white rounded-xl py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#0e3a6e] transition-colors disabled:opacity-50"
              >
                {pdfLoading ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                Download PDF
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 border border-slate-200 text-slate-600 rounded-xl py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Card
              </motion.button>
            </div>

            {/* Send actions */}
            <div className="flex gap-2">
              {/* Email */}
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => simulateSend(setEmailState)}
                disabled={emailState !== 'idle'}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold uppercase tracking-widest transition-all
                  ${emailState === 'sent'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100'
                  } disabled:opacity-70`}
              >
                {emailState === 'sending' ? <Loader className="w-3.5 h-3.5 animate-spin" />
                  : emailState === 'sent' ? <CheckCircle className="w-3.5 h-3.5" />
                  : <Mail className="w-3.5 h-3.5" />}
                {emailState === 'sent' ? 'Email Sent' : 'Send Email'}
              </motion.button>

              {/* Telegram */}
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => simulateSend(setTelegramState)}
                disabled={telegramState !== 'idle'}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold uppercase tracking-widest transition-all
                  ${telegramState === 'sent'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-cyan-50 text-cyan-600 border border-cyan-100 hover:bg-cyan-100'
                  } disabled:opacity-70`}
              >
                {telegramState === 'sending' ? <Loader className="w-3.5 h-3.5 animate-spin" />
                  : telegramState === 'sent' ? <CheckCircle className="w-3.5 h-3.5" />
                  : <Send className="w-3.5 h-3.5" />}
                {telegramState === 'sent' ? 'Telegram Sent' : 'Telegram'}
              </motion.button>
            </div>

            {/* Patient contact info */}
            {(patient.email || patient.telegramId) && (
              <div className="bg-slate-50 rounded-xl px-3 py-2 flex gap-4 text-[11px] text-slate-500">
                {patient.email && <span>✉ {patient.email}</span>}
                {patient.telegramId && <span>✈ {patient.telegramId}</span>}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
