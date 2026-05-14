import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Clock, CheckCircle, Loader, User } from 'lucide-react'

type Status = 'waiting' | 'in-treatment' | 'done'

interface Patient {
  id: number
  name: string
  service: string
  status: Status
  secondsLeft: number
}

const initialPatients: Patient[] = [
  { id: 1, name: 'Abebe Girma',     service: 'Root Canal Treatment',  status: 'in-treatment', secondsLeft: 0 },
  { id: 2, name: 'Fatuma Ali',      service: 'Teeth Whitening',       status: 'waiting',      secondsLeft: 420 },
  { id: 3, name: 'Yonas Tadesse',   service: 'Dental Implants',       status: 'waiting',      secondsLeft: 900 },
  { id: 4, name: 'Meron Bekele',    service: 'Braces & Orthodontics', status: 'waiting',      secondsLeft: 1380 },
  { id: 5, name: 'Dawit Haile',     service: 'Smile Design',          status: 'waiting',      secondsLeft: 1860 },
  { id: 6, name: 'Selam Tesfaye',   service: 'General Checkup',       status: 'done',         secondsLeft: 0 },
  { id: 7, name: 'Biruk Lemma',     service: 'Emergency Dental Care', status: 'done',         secondsLeft: 0 },
]

function formatTime(seconds: number) {
  if (seconds <= 0) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m ${s.toString().padStart(2, '0')}s`
}

const statusConfig: Record<Status, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  'in-treatment': {
    label: 'In Treatment',
    color: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-100',
    icon: <Loader className="w-3.5 h-3.5 animate-spin" />,
  },
  waiting: {
    label: 'Waiting',
    color: 'text-amber-600',
    bg: 'bg-amber-50 border-amber-100',
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  done: {
    label: 'Done',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-100',
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
}

export default function Queue() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)

  // Tick down waiting countdowns every second
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev =>
        prev.map(p =>
          p.status === 'waiting' && p.secondsLeft > 0
            ? { ...p, secondsLeft: p.secondsLeft - 1 }
            : p
        )
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const active = patients.filter(p => p.status !== 'done')
  const done   = patients.filter(p => p.status === 'done')

  return (
    <div className="min-h-screen bg-[#f0f0f0] p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col gap-1 mb-8">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#5E6470]">
              Dr. Muhammed Zain Dental Clinic
            </span>
            <h1 className="text-[32px] md:text-[40px] font-normal text-[#202B4D] tracking-tight">
              Patient Queue
            </h1>
            <p className="text-[#5E6470] text-sm">
              Live queue — updates every second
            </p>
          </div>

          {/* Active queue */}
          <div className="flex flex-col gap-3 mb-6">
            {active.map((patient, i) => {
              const cfg = statusConfig[patient.status]
              return (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="bg-white rounded-[1.5rem] px-5 py-4 border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center gap-4"
                >
                  {/* Position number */}
                  <div className="w-9 h-9 rounded-full bg-[#f0f0f0] flex items-center justify-center shrink-0">
                    <span className="text-[#202B4D] text-sm font-normal">{i + 1}</span>
                  </div>

                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-[#202B4D]/10 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-[#202B4D]" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[#202B4D] text-[15px] font-normal truncate">{patient.name}</p>
                    <p className="text-[#5E6470] text-[12px] truncate">{patient.service}</p>
                  </div>

                  {/* Time left */}
                  <div className="text-right shrink-0">
                    {patient.status === 'in-treatment' ? (
                      <span className="text-blue-500 text-[12px]">Now</span>
                    ) : (
                      <span className="text-[#202B4D] text-[13px] font-normal tabular-nums">
                        {formatTime(patient.secondsLeft)}
                      </span>
                    )}
                    <p className="text-[#5E6470] text-[10px] uppercase tracking-wider">
                      {patient.status === 'in-treatment' ? 'treating' : 'est. wait'}
                    </p>
                  </div>

                  {/* Status badge */}
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-normal shrink-0 ${cfg.bg} ${cfg.color}`}>
                    {cfg.icon}
                    {cfg.label}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Done section */}
          {done.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#5E6470] px-1">
                Completed Today
              </span>
              {done.map((patient, i) => {
                const cfg = statusConfig[patient.status]
                return (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.07 + 0.3 }}
                    className="bg-white/60 rounded-[1.5rem] px-5 py-4 border border-black/5 flex items-center gap-4 opacity-60"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#f0f0f0] flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-[#5E6470]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#5E6470] text-[15px] font-normal truncate">{patient.name}</p>
                      <p className="text-[#5E6470] text-[12px] truncate">{patient.service}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] shrink-0 ${cfg.bg} ${cfg.color}`}>
                      {cfg.icon}
                      {cfg.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
