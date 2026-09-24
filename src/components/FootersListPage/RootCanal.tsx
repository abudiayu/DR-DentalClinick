import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'motion/react'
import {
  ShieldCheck, ArrowRight, ChevronRight,
  CheckCircle2, Star, Zap, Heart,
} from 'lucide-react'
import Footer from '../sections/Footer'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
}

export default function RootCanal() {
  const { t } = useTranslation()

  const myths = [
    { myth: t('rootCanal.myth1'), fact: t('rootCanal.fact1') },
    { myth: t('rootCanal.myth2'), fact: t('rootCanal.fact2') },
    { myth: t('rootCanal.myth3'), fact: t('rootCanal.fact3') },
  ]

  const steps = [
    { num: '01', title: t('rootCanal.step1Title'), desc: t('rootCanal.step1Desc') },
    { num: '02', title: t('rootCanal.step2Title'), desc: t('rootCanal.step2Desc') },
    { num: '03', title: t('rootCanal.step3Title'), desc: t('rootCanal.step3Desc') },
    { num: '04', title: t('rootCanal.step4Title'), desc: t('rootCanal.step4Desc') },
    { num: '05', title: t('rootCanal.step5Title'), desc: t('rootCanal.step5Desc') },
  ]

  const benefits = [
    { icon: <ShieldCheck className="w-5 h-5" />, title: t('rootCanal.ben1Title'), desc: t('rootCanal.ben1Desc') },
    { icon: <Zap className="w-5 h-5" />, title: t('rootCanal.ben2Title'), desc: t('rootCanal.ben2Desc') },
    { icon: <Heart className="w-5 h-5" />, title: t('rootCanal.ben3Title'), desc: t('rootCanal.ben3Desc') },
    { icon: <Star className="w-5 h-5" />, title: t('rootCanal.ben4Title'), desc: t('rootCanal.ben4Desc') },
  ]

  return (
    <div className="bg-[#f0f0f0] min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1f1a 0%, #0d3d30 50%, #0a1f1a 100%)' }}
      >
        <div className="absolute top-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm px-4 py-1.5 rounded-full mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            {t('rootCanal.badge')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {t('rootCanal.heroTitle')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.55 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('rootCanal.heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-teal-500/25"
            >
              {t('cta.bookAppointment')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#process"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-2xl hover:bg-white/20 transition-all"
            >
              {t('rootCanal.learnMore')}
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[
              { val: '4,500+', label: t('rootCanal.stat1') },
              { val: '1 Visit', label: t('rootCanal.stat2') },
              { val: '95%', label: t('rootCanal.stat3') },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{s.val}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-teal-600 text-sm font-medium uppercase tracking-widest">{t('rootCanal.benTag')}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mt-3">{t('rootCanal.benTitle')}</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">{t('rootCanal.benSubtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="bg-white rounded-3xl p-7 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {b.icon}
              </div>
              <h3 className="text-[#0f172a] font-semibold text-lg mb-2">{b.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Myth vs Fact ── */}
      <section className="bg-gradient-to-br from-teal-600 to-emerald-700 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">{t('rootCanal.mythTitle')}</h2>
            <p className="text-white/70 mt-3">{t('rootCanal.mythSubtitle')}</p>
          </motion.div>

          <div className="flex flex-col gap-5">
            {myths.map((m, i) => (
              <motion.div
                key={m.myth}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="bg-white/10 border border-white/10 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 shrink-0 rounded-full bg-red-400/20 border border-red-400/30 text-red-200 text-xs font-bold flex items-center justify-center">✕</span>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{t('rootCanal.mythLabel')}</p>
                    <p className="text-white/80 text-sm">{m.myth}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-7 h-7 shrink-0 text-emerald-300" />
                  <div>
                    <p className="text-emerald-200 text-xs uppercase tracking-wider mb-1">{t('rootCanal.factLabel')}</p>
                    <p className="text-white text-sm">{m.fact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Steps ── */}
      <section id="process" className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-teal-600 text-sm font-medium uppercase tracking-widest">{t('rootCanal.processTag')}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mt-3">{t('rootCanal.processTitle')}</h2>
        </motion.div>

        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="flex items-start gap-5 bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow"
            >
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-bold flex items-center justify-center">
                {step.num}
              </div>
              <div>
                <h3 className="text-[#0f172a] font-semibold text-base mb-1">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 p-12 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <ShieldCheck className="w-8 h-8 text-white mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('cta.heading')}</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">{t('cta.subheading')}</p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-white text-teal-700 font-semibold px-8 py-4 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
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
