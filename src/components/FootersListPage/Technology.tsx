import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'motion/react'
import {
  Zap, Shield, Scan, Monitor, ArrowRight,
  ChevronRight, CheckCircle2, Cpu,
} from 'lucide-react'
import Footer from '../sections/Footer'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
}

export default function Technology() {
  const { t } = useTranslation()

  const technologies = [
    {
      icon: <Scan className="w-7 h-7" />,
      title: t('technology.tech1Title'),
      desc: t('technology.tech1Desc'),
      color: 'from-cyan-500 to-blue-600',
      tag: t('technology.tech1Tag'),
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: t('technology.tech2Title'),
      desc: t('technology.tech2Desc'),
      color: 'from-violet-500 to-purple-600',
      tag: t('technology.tech2Tag'),
    },
    {
      icon: <Monitor className="w-7 h-7" />,
      title: t('technology.tech3Title'),
      desc: t('technology.tech3Desc'),
      color: 'from-amber-500 to-orange-500',
      tag: t('technology.tech3Tag'),
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: t('technology.tech4Title'),
      desc: t('technology.tech4Desc'),
      color: 'from-teal-500 to-emerald-500',
      tag: t('technology.tech4Tag'),
    },
    {
      icon: <Cpu className="w-7 h-7" />,
      title: t('technology.tech5Title'),
      desc: t('technology.tech5Desc'),
      color: 'from-rose-500 to-pink-600',
      tag: t('technology.tech5Tag'),
    },
    {
      icon: <CheckCircle2 className="w-7 h-7" />,
      title: t('technology.tech6Title'),
      desc: t('technology.tech6Desc'),
      color: 'from-indigo-500 to-blue-600',
      tag: t('technology.tech6Tag'),
    },
  ]

  const advantages = [
    t('technology.adv1'), t('technology.adv2'), t('technology.adv3'),
    t('technology.adv4'), t('technology.adv5'), t('technology.adv6'),
  ]

  const stats = [
    { val: '3D', label: t('technology.stat1') },
    { val: '60%', label: t('technology.stat2') },
    { val: '99.9%', label: t('technology.stat3') },
    { val: '2x', label: t('technology.stat4') },
  ]

  return (
    <div className="bg-[#f0f0f0] min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #030712 0%, #0a1628 50%, #0d1f3c 100%)' }}
      >
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)', backgroundSize: '64px 64px' }}
        />
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm px-4 py-1.5 rounded-full mb-6"
          >
            <Cpu className="w-4 h-4" />
            {t('technology.badge')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {t('technology.heroTitle')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.55 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('technology.heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
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
              href="#tech"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-2xl hover:bg-white/20 transition-all"
            >
              {t('technology.explore')}
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{s.val}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Technology cards ── */}
      <section id="tech" className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-cyan-600 text-sm font-medium uppercase tracking-widest">{t('technology.techTag')}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mt-3">{t('technology.techTitle')}</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">{t('technology.techSubtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="group bg-white rounded-3xl p-7 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tech.color} text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                {tech.icon}
              </div>
              <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full">{tech.tag}</span>
              <h3 className="text-[#0f172a] font-bold text-xl mt-3 mb-2">{tech.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Advantages ── */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #030712 0%, #0a1628 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-widest">{t('technology.advTag')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">{t('technology.advTitle')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl px-5 py-4 hover:bg-white/8 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="text-slate-300 text-sm">{adv}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it helps ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          >
            <span className="text-cyan-600 text-sm font-medium uppercase tracking-widest">{t('technology.patientTag')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mt-3 mb-6">{t('technology.patientTitle')}</h2>
            <p className="text-slate-500 leading-relaxed mb-4">{t('technology.patientP1')}</p>
            <p className="text-slate-500 leading-relaxed mb-6">{t('technology.patientP2')}</p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all"
            >
              {t('cta.bookAppointment')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`rounded-3xl p-7 flex flex-col gap-2 ${i % 2 === 0 ? 'bg-[#0f172a]' : 'bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)]'}`}
              >
                <div className={`text-3xl font-black ${i % 2 === 0 ? 'text-cyan-400' : 'text-[#0f172a]'}`}>{s.val}</div>
                <div className={`text-sm ${i % 2 === 0 ? 'text-slate-400' : 'text-slate-500'}`}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="relative overflow-hidden rounded-3xl p-12 text-center"
          style={{ background: 'linear-gradient(135deg, #0891b2 0%, #2563eb 50%, #4f46e5 100%)' }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <Cpu className="w-8 h-8 text-yellow-300 mx-auto mb-4" />
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

      <div className="max-w-7xl mx-auto px-6 pb-10">
        <Footer />
      </div>
    </div>
  )
}
