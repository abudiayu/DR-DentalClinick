import { motion } from 'motion/react'

const stats = [
  { value: '15K+', label: 'Patients Treated' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '40+', label: 'Specialist Doctors' },
  { value: '< 30min', label: 'Average Wait Time' },
]

export default function StatsRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-black/5 rounded-[2rem] overflow-hidden bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className={`flex flex-col items-center justify-center py-8 md:py-12 px-4 text-center
            ${i < stats.length - 1 ? 'border-r border-black/5' : ''}
            ${i < 2 ? 'border-b md:border-b-0 border-black/5' : ''}
          `}
        >
          <span className="text-[38px] md:text-[52px] tracking-tight text-[#202B4D] font-semibold leading-none">
            {stat.value}
          </span>
          <span className="text-[10px] md:text-[12px] uppercase tracking-[0.18em] text-[#5E6470] mt-2">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
