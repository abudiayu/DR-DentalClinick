import { useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { User, Phone, Mail, Calendar, MessageSquare, Stethoscope, ArrowUpRight, Loader } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { bookingApi } from '../../lib/api'
import './Booking.css'

export default function Booking() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const services: string[] = t('booking.services', { returnObjects: true }) as string[]

  const [loading,   setLoading]   = useState(false)
  const [apiError,  setApiError]  = useState('')
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '',
    service: '', date: '', message: '',
  })

  function setField(k: string, v: string) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiError('')
    setLoading(true)

    try {
      await bookingApi.submit({
        full_name:      form.fullName,
        phone:          form.phone,
        email:          form.email || undefined,
        service_type:   form.service,
        preferred_date: form.date,
        message:        form.message || undefined,
      })
      // Success → go to queue page so patient can see their position
      navigate('/queue', { state: { booked: true } })
    } catch (err) {
      console.error('[Booking] submit failed:', err)
      setApiError(err instanceof Error ? err.message : t('auth.serverUnreachable'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="booking-page min-h-screen bg-[#f0f0f0] flex items-center justify-center p-4 md:p-8 pt-24 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <div onClick={() => navigate('/')} className="booking_back">
          <div className="bg-white/20 p-1 md:p-1.5 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span>{t('booking.back')}</span>
        </div>

        {/* Card */}
        <div className="booking-card bg-white rounded-[2rem] p-8 md:p-12 border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

          {/* Header */}
          <div className="flex flex-col gap-2 mb-10">
            <span className="booking-clinic-label text-[11px] uppercase tracking-[0.2em] text-[#5E6470]">
              {t('booking.clinicName')}
            </span>
            <h1 className="booking-title text-[32px] md:text-[40px] font-normal text-[#202B4D] tracking-tight leading-tight">
              {t('booking.title')}
            </h1>
            <p className="booking-subtitle text-[#5E6470] text-sm leading-relaxed">
              {t('booking.subtitle')}
            </p>
          </div>

          {/* Error banner */}
          {apiError && (
            <div className="mb-6 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="booking-field-label text-[11px] uppercase tracking-[0.15em] text-[#5E6470]">
                {t('booking.fullName')}
              </label>
              <div className="booking-field-wrapper flex items-center gap-3 bg-[#f8f8f8] border border-black/5 rounded-2xl px-4 py-3.5 transition-all duration-200">
                <User className="booking-field-icon w-4 h-4 text-[#5E6470] shrink-0" />
                <input
                  type="text" required
                  value={form.fullName}
                  onChange={e => setField('fullName', e.target.value)}
                  placeholder={t('booking.fullNamePlaceholder')}
                  aria-label={t('booking.fullName')}
                  className="bg-transparent w-full text-[#202B4D] text-sm font-normal outline-none placeholder:text-[#5E6470]/50"
                />
              </div>
            </div>

            {/* Phone + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="booking-field-label text-[11px] uppercase tracking-[0.15em] text-[#5E6470]">
                  {t('booking.phone')}
                </label>
                <div className="booking-field-wrapper flex items-center gap-3 bg-[#f8f8f8] border border-black/5 rounded-2xl px-4 py-3.5 transition-all duration-200">
                  <Phone className="booking-field-icon w-4 h-4 text-[#5E6470] shrink-0" />
                  <input
                    type="tel" required
                    value={form.phone}
                    onChange={e => setField('phone', e.target.value)}
                    placeholder={t('booking.phonePlaceholder')}
                    aria-label={t('booking.phone')}
                    className="bg-transparent w-full text-[#202B4D] text-sm font-normal outline-none placeholder:text-[#5E6470]/50"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="booking-field-label text-[11px] uppercase tracking-[0.15em] text-[#5E6470]">
                  {t('booking.email')}
                </label>
                <div className="booking-field-wrapper flex items-center gap-3 bg-[#f8f8f8] border border-black/5 rounded-2xl px-4 py-3.5 transition-all duration-200">
                  <Mail className="booking-field-icon w-4 h-4 text-[#5E6470] shrink-0" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setField('email', e.target.value)}
                    placeholder={t('booking.emailPlaceholder')}
                    aria-label={t('booking.email')}
                    className="bg-transparent w-full text-[#202B4D] text-sm font-normal outline-none placeholder:text-[#5E6470]/50"
                  />
                </div>
              </div>
            </div>

            {/* Service */}
            <div className="flex flex-col gap-2">
              <label className="booking-field-label text-[11px] uppercase tracking-[0.15em] text-[#5E6470]">
                {t('booking.service')}
              </label>
              <div className="booking-field-wrapper flex items-center gap-3 bg-[#f8f8f8] border border-black/5 rounded-2xl px-4 py-3.5 transition-all duration-200">
                <Stethoscope className="booking-field-icon w-4 h-4 text-[#5E6470] shrink-0" />
                <select
                  required
                  value={form.service}
                  onChange={e => setField('service', e.target.value)}
                  aria-label={t('booking.service')}
                  className="bg-transparent w-full text-[#202B4D] text-sm font-normal outline-none cursor-pointer"
                >
                  <option value="" disabled>{t('booking.selectService')}</option>
                  {services.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preferred Date */}
            <div className="flex flex-col gap-2">
              <label className="booking-field-label text-[11px] uppercase tracking-[0.15em] text-[#5E6470]">
                {t('booking.preferredDate')}
              </label>
              <div className="booking-field-wrapper flex items-center gap-3 bg-[#f8f8f8] border border-black/5 rounded-2xl px-4 py-3.5 transition-all duration-200">
                <Calendar className="booking-field-icon w-4 h-4 text-[#5E6470] shrink-0" />
                <input
                  type="date" required
                  value={form.date}
                  onChange={e => setField('date', e.target.value)}
                  min={new Date().toISOString().slice(0, 10)}
                  aria-label={t('booking.preferredDate')}
                  className="bg-transparent w-full text-[#202B4D] text-sm font-normal outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="booking-field-label text-[11px] uppercase tracking-[0.15em] text-[#5E6470]">
                {t('booking.message')}
              </label>
              <div className="booking-field-wrapper flex items-start gap-3 bg-[#f8f8f8] border border-black/5 rounded-2xl px-4 py-3.5 transition-all duration-200">
                <MessageSquare className="booking-field-icon w-4 h-4 text-[#5E6470] shrink-0 mt-0.5" />
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={e => setField('message', e.target.value)}
                  placeholder={t('booking.messagePlaceholder')}
                  aria-label={t('booking.message')}
                  className="bg-transparent w-full text-[#202B4D] text-sm font-normal outline-none resize-none placeholder:text-[#5E6470]/50"
                />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              disabled={loading}
              className="booking-submit-btn mt-2 w-full bg-[#202B4D] text-white text-sm font-normal py-4 rounded-2xl hover:bg-[#2d3d6b] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              {t('booking.confirm')}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
