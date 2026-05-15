import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

interface Props {
  icon: React.ReactNode
  label: string
  value: number
  prefix?: string
  suffix?: string
  color: string
  delay?: number
}

function useCounter(target: number) {
  const [n, setN] = useState(0)
  const raf = useRef<number>(0)
  useEffect(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1000, 1)
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target])
  return n
}

export default function NurseStatCard({ icon, label, value, prefix = '', suffix = '', color, delay = 0 }: Props) {
  const count = useCounter(value)
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3, boxShadow: `0 12px 32px -8px ${color}44` }}
      className="bg-white rounded-2xl p-4 border border-slate-100 cursor-default transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, color }}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-[#0d2044]">{prefix}{count.toLocaleString()}{suffix}</p>
      <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5">{label}</p>
    </motion.div>
  )
}
