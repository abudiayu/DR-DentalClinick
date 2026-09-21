import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function SectionHeader() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-6"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 rounded-full bg-[#202B4D]" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#5E6470]">
            {t('services.sectionTag')}
          </span>
        </div>
        <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-normal text-[#202B4D] tracking-tight leading-[1.05] max-w-xl">
          {t('services.heading')}
        </h2>
        <p className="text-[#5E6470] text-sm md:text-base font-normal max-w-md leading-relaxed">
          {t('services.subheading')}
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/booking')}
        className="flex items-center gap-2 self-start md:self-auto bg-[#202B4D] text-white text-sm font-normal px-5 py-3 rounded-full hover:bg-[#2d3d6b] transition-colors cursor-pointer whitespace-nowrap"
      >
        {t('services.bookAppointment')}
        <ArrowUpRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  )
}
