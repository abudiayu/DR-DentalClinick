import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Stethoscope, ShieldCheck, Clock, Users, ChevronRight,
  CheckCircle2, Star, ArrowRight,
} from 'lucide-react'
import Footer from '../sections/Footer'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
}

export default function DentalSurgery() {
  const { t } = useTranslation()

  const services = [
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: t('dentalSurgery.s1Title'),
      desc: t('dentalSurgery.s1Desc'),
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: t('dentalSurgery.s2Title'),
      desc: t('dentalSurgery.s2Desc'),
      color: 'from-violet-500 to-purple-600',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t('dentalSurgery.s3Title'),
      desc: t('dentalSurgery.s3Desc'),
      color: 'from-rose-500 to-pink-600',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('dentalSurgery.s4Title'),
      desc: t('dentalSurgery.s4Desc'),
      color: 'from-amber-500 to-orange-500',
    },
  ]

  const steps = [
    { num: '01', title: t('dentalSurgery.step1Title'), desc: t('dentalSurgery.step1Desc') },
    { num: '02', title: t('dentalSurgery.step2Title'), desc: t('dentalSurgery.step2Desc') },
    { num: '03', title: t('dentalSurgery.step3Title'), desc: t('dentalSurgery.step3Desc') },
    { num: '04', title: t('dentalSurgery.step4Title'), desc: t('dentalSurgery.step4Desc') },
  ]

  const faqs = [
    { q: t('dentalSurgery.faq1Q'), a: t('dentalSurgery.faq1A') },
    { q: t('dentalSurgery.faq2Q'), a: t('dentalSurgery.faq2A') },
    { q: t('dentalSurgery.faq3Q'), a: t('dentalSurgery.faq3A') },
    { q: t('dentalSurgery.faq4Q'), a: t('dentalSurgery.faq4A') },
  ]

  return (
    <div className="bg-[#f0f0f0] min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f2744 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm px-4 py-1.5 rounded-full mb-6"
          >
            <Stethoscope className="w-4 h-4" />
            {t('dentalSurgery.badge')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {t('dentalSurgery.heroTitle')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.55 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('dentalSurgery.heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-cyan-500/25"
            >
              {t('cta.bookAppointment')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#services"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-2xl hover:bg-white/20 transition-all"
            >
              {t('dentalSurgery.learnMore')}
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[
              { val: '5,000+', label: t('dentalSurgery.stat1') },
              { val: '15+', label: t('dentalSurgery.stat2') },
              { val: '99%', label: t('dentalSurgery.stat3') },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{s.val}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          custom={0} variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-cyan-600 text-sm font-medium uppercase tracking-widest">{t('dentalSurgery.servicesTag')}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mt-3">{t('dentalSurgery.servicesTitle')}</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto text-base">{t('dentalSurgery.servicesSubtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              custom={i} variants={fadeUp}
              className="bg-white rounded-3xl p-7 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                {s.icon}
              </div>
              <h3 className="text-[#0f172a] font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="bg-[#0f172a] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            custom={0} variants={fadeUp}
            className="text-center mb-14"
          >
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-widest">{t('dentalSurgery.processTag')}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">{t('dentalSurgery.processTitle')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                custom={i} variants={fadeUp}
                className="relative bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/8 transition-colors"
              >
                <span className="text-5xl font-black text-white/5 select-none absolute top-5 right-6">{step.num}</span>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm mb-4">
                  {step.num}
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          custom={0} variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="text-cyan-600 text-sm font-medium uppercase tracking-widest">{t('dentalSurgery.faqTag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mt-3">{t('dentalSurgery.faqTitle')}</h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              custom={i} variants={fadeUp}
              className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#0f172a] mb-1.5">{faq.q}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          custom={0} variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 p-12 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <Star className="w-8 h-8 text-yellow-300 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('cta.heading')}</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">{t('cta.subheading')}</p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-4 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
            >
              {t('cta.bookAppointment')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <Footer />
      </div>
    </div>
  )
}
