import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Smile, Star, ArrowRight, ChevronRight,
  CheckCircle2, Zap, Clock, Award,
} from 'lucide-react'
import Footer from '../sections/Footer'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
}

export default function BracesAligner() {
  const { t } = useTranslation()

  const options = [
    {
      icon: <Smile className="w-6 h-6" />,
      title: t('braces.opt1Title'),
      desc: t('braces.opt1Desc'),
      tag: t('braces.opt1Tag'),
      color: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-50',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('braces.opt2Title'),
      desc: t('braces.opt2Desc'),
      tag: t('braces.opt2Tag'),
      color: 'from-cyan-500 to-blue-500',
      bg: 'bg-cyan-50',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t('braces.opt3Title'),
      desc: t('braces.opt3Desc'),
      tag: t('braces.opt3Tag'),
      color: 'from-rose-500 to-pink-500',
      bg: 'bg-rose-50',
    },
  ]

  const benefits = [
    t('braces.ben1'), t('braces.ben2'), t('braces.ben3'),
    t('braces.ben4'), t('braces.ben5'), t('braces.ben6'),
  ]

  const steps = [
    { num: '01', title: t('braces.step1Title'), desc: t('braces.step1Desc') },
    { num: '02', title: t('braces.step2Title'), desc: t('braces.step2Desc') },
    { num: '03', title: t('braces.step3Title'), desc: t('braces.step3Desc') },
    { num: '04', title: t('braces.step4Title'), desc: t('braces.step4Desc') },
    { num: '05', title: t('braces.step5Title'), desc: t('braces.step5Desc') },
  ]

  return (
    <div className="bg-[#f0f0f0] min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a0533 0%, #3b1f6e 50%, #1a0a40 100%)' }}
      >
        <div className="absolute top-16 right-24 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-24 left-16 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm px-4 py-1.5 rounded-full mb-6"
          >
            <Smile className="w-4 h-4" />
            {t('braces.badge')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {t('braces.heroTitle')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.55 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('braces.heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-violet-500/25"
            >
              {t('cta.bookAppointment')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#options"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-2xl hover:bg-white/20 transition-all"
            >
              {t('braces.learnMore')}
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[
              { val: '3,000+', label: t('braces.stat1') },
              { val: '6–18mo', label: t('braces.stat2') },
              { val: '98%', label: t('braces.stat3') },
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
          <span className="text-violet-600 text-sm font-medium uppercase tracking-widest">{t('braces.optionsTag')}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mt-3">{t('braces.optionsTitle')}</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">{t('braces.optionsSubtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {options.map((opt, i) => (
            <motion.div
              key={opt.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="bg-white rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${opt.color} text-white flex items-center justify-center`}>
                {opt.icon}
              </div>
              <span className={`self-start text-xs font-medium px-3 py-1 rounded-full ${opt.bg} text-slate-600`}>{opt.tag}</span>
              <h3 className="text-[#0f172a] font-bold text-xl">{opt.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{opt.desc}</p>
              <Link
                to="/booking"
                className="mt-auto inline-flex items-center gap-1.5 text-violet-600 text-sm font-medium hover:gap-2.5 transition-all"
              >
                {t('cta.bookAppointment')} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="bg-gradient-to-br from-violet-600 to-purple-700 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">{t('braces.benefitsTitle')}</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-2xl px-5 py-4"
              >
                <CheckCircle2 className="w-5 h-5 text-yellow-300 shrink-0" />
                <span className="text-white text-sm">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journey Steps ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-violet-600 text-sm font-medium uppercase tracking-widest">{t('braces.journeyTag')}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mt-3">{t('braces.journeyTitle')}</h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-violet-200 via-violet-400 to-violet-200" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-violet-200 z-10">
                  {step.num}
                </div>
                <h3 className="text-[#0f172a] font-semibold text-sm">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 p-12 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <Clock className="w-8 h-8 text-yellow-300 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('cta.heading')}</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">{t('cta.subheading')}</p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold px-8 py-4 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
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
