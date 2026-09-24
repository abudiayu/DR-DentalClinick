import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Error = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="grid-overlay" />
      <div className="frame-line frame-line-top"    />
      <div className="frame-line frame-line-bottom" />
      <div className="frame-line frame-line-left"   />
      <div className="frame-line frame-line-right"  />

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center max-w-md"
      >
        <motion.p
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[120px] sm:text-[160px] font-black text-[#0F172A] leading-none tracking-tighter select-none"
          style={{ textShadow: '0 4px 40px rgba(15,23,42,0.08)' }}
        >
          404
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-16 h-px bg-[#E2E8F0] my-6"
        />

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg font-bold text-[#0F172A] uppercase tracking-[0.15em] mb-2"
        >
          {t('error.pageNotFound')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-[#94A3B8] leading-relaxed"
        >
          {t('error.message')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-3 mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] text-xs font-semibold uppercase tracking-widest hover:border-[#94A3B8] hover:text-[#0F172A] transition-all bg-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t('error.goBack')}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#1E293B] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            {t('error.home')}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
