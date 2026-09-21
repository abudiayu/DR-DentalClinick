import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { User, Phone, Mail, Calendar, MessageSquare, Stethoscope, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import './Booking.css'

export default function Booking() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const services: string[] = t('booking.services', { returnObjects: true }) as string[]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert(t('booking.successAlert'))
    navigate('/queue')
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center p-4 md:p-8 pt-24 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <div
          onClick={() => navigate('/')}
          className="booking_back"
        >
          <div className="bg-white/20 p-1 md:p-1.5 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span>{t('booking.back')}</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          {/* Header */}
          <div className="flex flex-col gap-2 mb-10">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#5E6470]">
              {t('booking.clinicName')}
            </span>
            <h1 className="text-[32px] md:text-[40px] font-normal text-[#202B4D] tracking-tight leading-tight">
              {t('booking.title')}
            </h1>
            <p className="text-[#5E6470] text-sm leading-relaxed">
              {t('booking.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-[0.15em] text-[#5E6470]">
                {t('booking.fullName')}
              </label>
              <div className="flex items-center gap-3 bg-[#f8f8f8] border border-black/5 rounded-2xl px-4 py-3.5">
                <User className="w-4 h-4 text-[#5E6470] shrink-0" />
                <input
                  type="text"
                  required
                  placeholder={t('booking.fullNamePlaceholder')}
                  aria-label={t('booking.fullName')}
                  className="bg-transparent w-full text-[#202B4D] text-sm font-normal outline-none placeholder:text-[#5E6470]/50"
                />
              </div>
            </div>

            {/* Phone + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-[0.15em] text-[#5E6470]">
                  {t('booking.phone')}
                </label>
                <div className="flex items-center gap-3 bg-[#f8f8f8] border border-black/5 rounded-2xl px-4 py-3.5">
                  <Phone className="w-4 h-4 text-[#5E6470] shrink-0" />
                  <input
                    type="tel"
                    required
                    placeholder={t('booking.phonePlaceholder')}
                    aria-label={t('booking.phone')}
                    className="bg-transparent w-full text-[#202B4D] text-sm font-normal outline-none placeholder:text-[#5E6470]/50"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-[0.15em] text-[#5E6470]">
                  {t('booking.email')}
                </label>
                <div className="flex items-center gap-3 bg-[#f8f8f8] border border-black/5 rounded-2xl px-4 py-3.5">
                  <Mail className="w-4 h-4 text-[#5E6470] shrink-0" />
                  <input
                    type="email"
                    placeholder={t('booking.emailPlaceholder')}
                    aria-label={t('booking.email')}
                    className="bg-transparent w-full text-[#202B4D] text-sm font-normal outline-none placeholder:text-[#5E6470]/50"
                  />
                </div>
              </div>
            </div>

            {/* Service */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-[0.15em] text-[#5E6470]">
                {t('booking.service')}
              </label>
              <div className="flex items-center gap-3 bg-[#f8f8f8] border border-black/5 rounded-2xl px-4 py-3.5">
                <Stethoscope className="w-4 h-4 text-[#5E6470] shrink-0" />
                <select
                  required
                  aria-label={t('booking.service')}
                  className="bg-transparent w-full text-[#202B4D] text-sm font-normal outline-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>{t('booking.selectService')}</option>
                  {services.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-[0.15em] text-[#5E6470]">
                {t('booking.preferredDate')}
              </label>
              <div className="flex items-center gap-3 bg-[#f8f8f8] border border-black/5 rounded-2xl px-4 py-3.5">
                <Calendar className="w-4 h-4 text-[#5E6470] shrink-0" />
                <input
                  type="date"
                  required
                  aria-label={t('booking.preferredDate')}
                  className="bg-transparent w-full text-[#202B4D] text-sm font-normal outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-[0.15em] text-[#5E6470]">
                {t('booking.message')}
              </label>
              <div className="flex items-start gap-3 bg-[#f8f8f8] border border-black/5 rounded-2xl px-4 py-3.5">
                <MessageSquare className="w-4 h-4 text-[#5E6470] shrink-0 mt-0.5" />
                <textarea
                  rows={3}
                  placeholder={t('booking.messagePlaceholder')}
                  aria-label={t('booking.message')}
                  className="bg-transparent w-full text-[#202B4D] text-sm font-normal outline-none resize-none placeholder:text-[#5E6470]/50"
                />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 w-full bg-[#202B4D] text-white text-sm font-normal py-4 rounded-2xl hover:bg-[#2d3d6b] transition-colors cursor-pointer"
            >
              {t('booking.confirm')}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
