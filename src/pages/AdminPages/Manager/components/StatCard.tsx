import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number
  prefix?: string
  suffix?: string
  growth: string
  positive?: boolean
  color: string
  delay?: number
}

function useCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0)
  const raf = useRef<number>(0)

  useEffect(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration])

  return count
}

export default function StatCard({
  icon, label, value, prefix = '', suffix = '',
  growth, positive = true, color, delay = 0
}: StatCardProps) {
  const count = useCounter(value)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, boxShadow: `0 8px 30px -8px ${color}55` }}
      className="bg-white rounded-xl p-4 border border-slate-100 cursor-default transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}18`, color }}
        >
          {icon}
        </div>
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
          positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
        }`}>
          {growth}
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-800 tracking-tight">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-widest">{label}</p>
    </motion.div>
  )
}
