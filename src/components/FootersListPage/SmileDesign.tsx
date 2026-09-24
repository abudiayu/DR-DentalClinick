import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'motion/react'
import {
  Sparkles, ArrowRight, ChevronRight,
  CheckCircle2, Star, Heart,
} from 'lucide-react'
import Footer from '../sections/Footer'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
}

export default function SmileDesign() {
  const { t } = useTranslation()

  const treatments = [
    { title: t('smileDesign.t1Title'), desc: t('smileDesign.t1Desc'), color: 'from-pink-500 to-rose-500', num: '01' },
    { title: t('smileDesign.t2Title'), desc: t('smileDesign.t2Desc'), color: 'from-amber-400 to-orange-500', num: '02' },
    { title: t('smileDesign.t3Title'), desc: t('smileDesign.t3Desc'), color: 'from-teal-500 to-emerald-500', num: '03' },
    { title: t('smileDesign.t4Title'), desc: t('smileDesign.t4Desc'), color: 'from-blue-500 to-indigo-600', num: '04' },
    { title: t('smileDesign.t5Title'), desc: t('smileDesign.t5Desc'), color: 'from-violet-500 to-purple-600', num: '05' },
    { title: t('smileDesign.t6Title'), desc: t('smileDesign.t6Desc'), color: 'from-rose-400 to-pink-600', num: '06' },
  ]

  const testimonials = [
    { name: t('smileDesign.testi1Name'), text: t('smileDesign.testi1Text'), rating: 5 },
    { name: t('smileDesign.testi2Name'), text: t('smileDesign.testi2Text'), rating: 5 },
    { name: t('smileDesign.testi3Name'), text: t('smileDesign.testi3Text'), rating: 5 },
  ]

  const steps = [
    { title: t('smileDesign.step1Title'), desc: t('smileDesign.step1Desc') },
    { title: t('smileDesign.step2Title'), desc: t('smileDesign.step2Desc') },
    { title: t('smileDesign.step3Title'), desc: t('smileDesign.step3Desc') },
    { title: t('smileDesign.step4Title'), desc: t('smileDesign.step4Desc') },
  ]

  return (
    <div className="bg-[#f0f0f0] min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2d0a1a 0%, #7c1c44 50%, #1a0d2e 100%)' }}
      >
        <div className="absolute top-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 text-pink-300 text-sm px-4 py-1.5 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4" />
            {t('smileDesign.badge')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {t('smileDesign.heroTitle')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.55 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('smileDesign.heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-pink-500/25"
            >
              {t('cta.bookAppointment')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#treatments"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-2xl hover:bg-white/20 transition-all"
            >
              {t('smileDesign.learnMore')}
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[
              { val: '8,000+', label: t('smileDesign.stat1') },
              { val: '20+', label: t('smileDesign.stat2') },
              { val: '100%', label: t('smileDesign.stat3') },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{s.val}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Treatments grid ── */}
      <section id="treatments" className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-rose-600 text-sm font-medium uppercase tracking-widest">{t('smileDesign.treatTag')}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mt-3">{t('smileDesign.treatTitle')}</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">{t('smileDesign.treatSubtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((tr, i) => (
            <motion.div
              key={tr.num}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="group bg-white rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`h-2 w-full bg-gradient-to-r ${tr.color}`} />
              <div className="p-7">
                <span className={`text-xs font-bold bg-gradient-to-r ${tr.color} bg-clip-text text-transparent`}>{tr.num}</span>
                <h3 className="text-[#0f172a] font-bold text-xl mt-2 mb-3">{tr.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{tr.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-slate-400 group-hover:text-rose-500 transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs">{t('smileDesign.included')}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-[#0f172a] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-14"
          >
            <span className="text-pink-400 text-sm font-medium uppercase tracking-widest">{t('smileDesign.processTag')}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">{t('smileDesign.processTitle')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="text-center flex flex-col items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white font-bold text-xl flex items-center justify-center shadow-lg">
                  {i + 1}
                </div>
                <h3 className="text-white font-semibold">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-rose-600 text-sm font-medium uppercase tracking-widest">{t('smileDesign.testiTag')}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mt-3">{t('smileDesign.testiTitle')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testi, i) => (
            <motion.div
              key={testi.name}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="bg-white rounded-3xl p-7 shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex flex-col gap-4"
            >
              <div className="flex gap-1">
                {Array.from({ length: testi.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic">"{testi.text}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-sm">
                  {testi.name.charAt(0)}
                </div>
                <span className="text-[#0f172a] font-semibold text-sm">{testi.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 p-12 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <Heart className="w-8 h-8 text-white mx-auto mb-4 fill-white" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('cta.heading')}</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">{t('cta.subheading')}</p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-white text-rose-600 font-semibold px-8 py-4 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
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
