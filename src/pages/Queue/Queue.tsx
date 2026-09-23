import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import { Clock, CheckCircle, Loader, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { queueApi, type QueuePatient } from '../../lib/api'

// ── helpers ───────────────────────────────────────────────────────────────────

/**
 * Compute how many seconds a waiting patient still has to wait.
 * We take their est_wait_seconds and subtract elapsed time since created_at,
 * so the countdown is meaningful even after a page reload.
 */
function secondsLeft(p: QueuePatient): number {
  if (p.status !== 'waiting') return 0
  const elapsedMs = Date.now() - new Date(p.created_at).getTime()
  const remaining = p.est_wait_seconds - Math.floor(elapsedMs / 1000)
  return Math.max(0, remaining)
}

function formatTime(seconds: number): string {
  if (seconds <= 0) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m ${s.toString().padStart(2, '0')}s`
}

// ── component ─────────────────────────────────────────────────────────────────

export default function Queue() {
  const { t } = useTranslation()

  const [active, setActive]       = useState<QueuePatient[]>([])
  const [done, setDone]           = useState<QueuePatient[]>([])
  const [tick, setTick]           = useState(0)   // drives 1-second countdown re-renders
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState<string | null>(null)

  // Keep latest data in refs so the 5-second poller always sees fresh state
  const activeRef = useRef<QueuePatient[]>([])
  const doneRef   = useRef<QueuePatient[]>([])

  const fetchQueue = useCallback(async () => {
    try {
      const [activeData, doneData] = await Promise.all([
        queueApi.getToday(),
        queueApi.getCompletedToday(),
      ])
      activeRef.current = activeData
      doneRef.current   = doneData
      setActive(activeData)
      setDone(doneData)
      setError(null)
    } catch (err) {
      // Log the full error so DevTools console shows the real cause
      console.error('[Queue] fetch failed:', err)
      setError(err instanceof Error ? err.message : 'Could not load queue.')
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial fetch + poll every 5 seconds
  useEffect(() => {
    fetchQueue()
    const poll = setInterval(fetchQueue, 5_000)
    return () => clearInterval(poll)
  }, [fetchQueue])

  // Countdown tick every second (no server call — pure UI)
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1_000)
    return () => clearInterval(timer)
  }, [])

  const statusConfig = {
    in_treatment: {
      label: t('queue.inTreatment'),
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-100',
      icon: <Loader className="w-3.5 h-3.5 animate-spin" />,
    },
    waiting: {
      label: t('queue.waiting'),
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-100',
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    completed: {
      label: t('queue.done'),
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-100',
      icon: <CheckCircle className="w-3.5 h-3.5" />,
    },
  } as const

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
              {t('queue.clinicName')}
            </span>
            <h1 className="text-[32px] md:text-[40px] font-normal text-[#202B4D] tracking-tight">
              {t('queue.title')}
            </h1>
            <p className="text-[#5E6470] text-sm">
              {t('queue.subtitle')}
            </p>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-20 gap-3 text-[#5E6470]">
              <Loader className="w-5 h-5 animate-spin" />
              <span className="text-sm">Loading queue…</span>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && active.length === 0 && (
            <div className="bg-white rounded-[1.5rem] px-5 py-12 border border-black/5 text-center text-[#5E6470] text-sm">
              No patients in queue right now.
            </div>
          )}

          {/* Active queue */}
          {!loading && active.length > 0 && (
            <div className="flex flex-col gap-3 mb-6">
              {active.map((patient, i) => {
                const cfg = statusConfig[patient.status]
                // `tick` dependency makes this re-evaluate every second
                const secs = tick >= 0 ? secondsLeft(patient) : 0
                return (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="bg-white rounded-[1.5rem] px-5 py-4 border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center gap-4"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#f0f0f0] flex items-center justify-center shrink-0">
                      <span className="text-[#202B4D] text-sm font-normal">{patient.queue_number}</span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#202B4D]/10 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-[#202B4D]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#202B4D] text-[15px] font-normal truncate">{patient.patient_name}</p>
                      <p className="text-[#5E6470] text-[12px] truncate">{patient.treatment}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {patient.status === 'in_treatment' ? (
                        <span className="text-blue-500 text-[12px]">{t('queue.now')}</span>
                      ) : (
                        <span className="text-[#202B4D] text-[13px] font-normal tabular-nums">
                          {formatTime(secs)}
                        </span>
                      )}
                      <p className="text-[#5E6470] text-[10px] uppercase tracking-wider">
                        {patient.status === 'in_treatment' ? t('queue.treating') : t('queue.estWait')}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-normal shrink-0 ${cfg.bg} ${cfg.color}`}>
                      {cfg.icon}
                      {cfg.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Completed section */}
          {!loading && done.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#5E6470] px-1">
                {t('queue.completedToday')}
              </span>
              {done.map((patient, i) => {
                const cfg = statusConfig.completed
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
                      <p className="text-[#5E6470] text-[15px] font-normal truncate">{patient.patient_name}</p>
                      <p className="text-[#5E6470] text-[12px] truncate">{patient.treatment}</p>
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
