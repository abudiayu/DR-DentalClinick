import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'motion/react'
import {
  Sparkles, ArrowRight, ChevronRight,
  CheckCircle2, Star, Clock, Zap,
} from 'lucide-react'
import Footer from '../sections/Footer'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
}

export default function TeethWhitening() {
  const { t } = useTranslation()

  const options = [
    {
      title: t('whitening.opt1Title'),
      desc: t('whitening.opt1Desc'),
      duration: t('whitening.opt1Duration'),
      result: t('whitening.opt1Result'),
      color: 'from-amber-400 to-yellow-500',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: t('whitening.opt2Title'),
      desc: t('whitening.opt2Desc'),
      duration: t('whitening.opt2Duration'),
      result: t('whitening.opt2Result'),
      color: 'from-blue-500 to-indigo-600',
      icon: <Star className="w-6 h-6" />,
      featured: true,
    },
    {
      title: t('whitening.opt3Title'),
      desc: t('whitening.opt3Desc'),
      duration: t('whitening.opt3Duration'),
      result: t('whitening.opt3Result'),
      color: 'from-teal-500 to-emerald-500',
      icon: <Clock className="w-6 h-6" />,
    },
  ]

  const benefits = [
    t('whitening.ben1'), t('whitening.ben2'), t('whitening.ben3'),
    t('whitening.ben4'), t('whitening.ben5'), t('whitening.ben6'),
  ]

  const steps = [
    { title: t('whitening.step1Title'), desc: t('whitening.step1Desc') },
    { title: t('whitening.step2Title'), desc: t('whitening.step2Desc') },
    { title: t('whitening.step3Title'), desc: t('whitening.step3Desc') },
    { title: t('whitening.step4Title'), desc: t('whitening.step4Desc') },
  ]

  const faqs = [
    { q: t('whitening.faq1Q'), a: t('whitening.faq1A') },
    { q: t('whitening.faq2Q'), a: t('whitening.faq2A') },
    { q: t('whitening.faq3Q'), a: t('whitening.faq3A') },
    { q: t('whitening.faq4Q'), a: t('whitening.faq4A') },
  ]

  return (
    <div className="bg-[#f0f0f0] min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1200 0%, #3d2c00 50%, #1a1800 100%)' }}
      >
        <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm px-4 py-1.5 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4" />
            {t('whitening.badge')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {t('whitening.heroTitle')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.55 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('whitening.heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1a1200] font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-amber-500/25"
            >
              {t('cta.bookAppointment')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#options"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-2xl hover:bg-white/20 transition-all"
            >
              {t('whitening.viewOptions')}
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[
              { val: '8 Shades', label: t('whitening.stat1') },
              { val: '1 Hour', label: t('whitening.stat2') },
              { val: '6,000+', label: t('whitening.stat3') },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{s.val}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Options ── */}
      <section id="options" className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-amber-600 text-sm font-medium uppercase tracking-widest">{t('whitening.optTag')}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mt-3">{t('whitening.optTitle')}</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">{t('whitening.optSubtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((opt, i) => (
            <motion.div
              key={opt.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className={`relative rounded-3xl p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 ${opt.featured
                ? 'bg-[#0f172a] shadow-[0_16px_48px_rgba(0,0,0,0.15)]'
                : 'bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)]'
              }`}
            >
              {opt.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1a1200] text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {t('whitening.mostPopular')}
                </span>
              )}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${opt.color} text-white flex items-center justify-center`}>
                {opt.icon}
              </div>
              <h3 className={`font-bold text-xl ${opt.featured ? 'text-white' : 'text-[#0f172a]'}`}>{opt.title}</h3>
              <p className={`text-sm leading-relaxed ${opt.featured ? 'text-slate-400' : 'text-slate-500'}`}>{opt.desc}</p>
              <div className={`flex flex-col gap-2 border-t pt-4 ${opt.featured ? 'border-white/10' : 'border-slate-100'}`}>
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${opt.featured ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className={`text-xs ${opt.featured ? 'text-slate-400' : 'text-slate-500'}`}>{opt.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className={`w-4 h-4 ${opt.featured ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className={`text-xs ${opt.featured ? 'text-slate-400' : 'text-slate-500'}`}>{opt.result}</span>
                </div>
              </div>
              <Link
                to="/booking"
                className={`mt-auto inline-flex items-center justify-center gap-2 font-semibold text-sm px-5 py-3 rounded-xl transition-all hover:opacity-90 ${opt.featured
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1a1200]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t('cta.bookAppointment')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="bg-gradient-to-br from-amber-500 to-yellow-600 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white">{t('whitening.benTitle')}</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="flex items-center gap-3 bg-white/15 border border-white/20 rounded-2xl px-5 py-4"
              >
                <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                <span className="text-white text-sm">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-amber-600 text-sm font-medium uppercase tracking-widest">{t('whitening.stepTag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mt-3">{t('whitening.stepTitle')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-white font-bold text-xl flex items-center justify-center shadow-lg shadow-amber-200">
                {i + 1}
              </div>
              <h3 className="text-[#0f172a] font-semibold">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="text-amber-600 text-sm font-medium uppercase tracking-widest">{t('whitening.faqTag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mt-3">{t('whitening.faqTitle')}</h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
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
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 p-12 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <Sparkles className="w-8 h-8 text-white mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('cta.heading')}</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">{t('cta.subheading')}</p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-white text-amber-700 font-semibold px-8 py-4 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
            >
              {t('cta.bookAppointment')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-10">
        <Footer />
      </div>
    </div>
  )
}
