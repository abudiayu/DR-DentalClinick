import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'motion/react'
import {
  Briefcase, ArrowRight, ChevronRight,
  CheckCircle2, Users, Heart, Zap,
  GraduationCap, MapPin, Clock, Star,
} from 'lucide-react'
import Footer from '../sections/Footer'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
}

export default function Careers() {
  const { t } = useTranslation()

  const jobs = [
    {
      title: t('careers.job1Title'),
      dept: t('careers.job1Dept'),
      type: t('careers.fullTime'),
      location: t('careers.location'),
      level: t('careers.job1Level'),
      color: 'from-blue-500 to-indigo-600',
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      title: t('careers.job2Title'),
      dept: t('careers.job2Dept'),
      type: t('careers.fullTime'),
      location: t('careers.location'),
      level: t('careers.job2Level'),
      color: 'from-teal-500 to-emerald-600',
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: t('careers.job3Title'),
      dept: t('careers.job3Dept'),
      type: t('careers.fullTime'),
      location: t('careers.location'),
      level: t('careers.job3Level'),
      color: 'from-violet-500 to-purple-600',
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: t('careers.job4Title'),
      dept: t('careers.job4Dept'),
      type: t('careers.partTime'),
      location: t('careers.location'),
      level: t('careers.job4Level'),
      color: 'from-amber-500 to-orange-500',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: t('careers.job5Title'),
      dept: t('careers.job5Dept'),
      type: t('careers.fullTime'),
      location: t('careers.location'),
      level: t('careers.job5Level'),
      color: 'from-rose-500 to-pink-600',
      icon: <Star className="w-5 h-5" />,
    },
    {
      title: t('careers.job6Title'),
      dept: t('careers.job6Dept'),
      type: t('careers.partTime'),
      location: t('careers.location'),
      level: t('careers.job6Level'),
      color: 'from-cyan-500 to-blue-500',
      icon: <Briefcase className="w-5 h-5" />,
    },
  ]

  const perks = [
    { icon: <Heart className="w-6 h-6" />, title: t('careers.perk1Title'), desc: t('careers.perk1Desc'), color: 'from-rose-500 to-pink-600' },
    { icon: <GraduationCap className="w-6 h-6" />, title: t('careers.perk2Title'), desc: t('careers.perk2Desc'), color: 'from-blue-500 to-indigo-600' },
    { icon: <Zap className="w-6 h-6" />, title: t('careers.perk3Title'), desc: t('careers.perk3Desc'), color: 'from-amber-500 to-orange-500' },
    { icon: <Users className="w-6 h-6" />, title: t('careers.perk4Title'), desc: t('careers.perk4Desc'), color: 'from-teal-500 to-emerald-500' },
  ]

  const values = [
    t('careers.val1'), t('careers.val2'), t('careers.val3'),
    t('careers.val4'), t('careers.val5'), t('careers.val6'),
  ]

  return (
    <div className="bg-[#f0f0f0] min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #111827 50%, #0f172a 100%)' }}
      >
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm px-4 py-1.5 rounded-full mb-6"
          >
            <Briefcase className="w-4 h-4" />
            {t('careers.badge')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {t('careers.heroTitle')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.55 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('careers.heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#openings"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              {t('careers.viewOpenings')}
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#perks"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-2xl hover:bg-white/20 transition-all"
            >
              {t('careers.whyUs')}
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[
              { val: '30+', label: t('careers.stat1') },
              { val: '6', label: t('careers.stat2') },
              { val: '98%', label: t('careers.stat3') },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{s.val}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Perks ── */}
      <section id="perks" className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-blue-600 text-sm font-medium uppercase tracking-widest">{t('careers.perksTag')}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mt-3">{t('careers.perksTitle')}</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">{t('careers.perksSubtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="bg-white rounded-3xl p-7 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${perk.color} text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                {perk.icon}
              </div>
              <h3 className="text-[#0f172a] font-semibold text-lg mb-2">{perk.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{perk.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Culture values ── */}
      <section className="bg-[#0f172a] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white">{t('careers.cultureTitle')}</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {values.map((val, i) => (
              <motion.div
                key={val}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4"
              >
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="text-slate-300 text-sm">{val}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open positions ── */}
      <section id="openings" className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-blue-600 text-sm font-medium uppercase tracking-widest">{t('careers.openTag')}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mt-3">{t('careers.openTitle')}</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">{t('careers.openSubtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {jobs.map((job, i) => (
            <motion.div
              key={job.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="bg-white rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${job.color} text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  {job.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#0f172a] font-bold text-lg">{job.title}</h3>
                  <p className="text-slate-500 text-sm mt-0.5">{job.dept}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                      <Clock className="w-3 h-3" /> {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                      <Star className="w-3 h-3" /> {job.level}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className={`text-xs font-semibold bg-gradient-to-r ${job.color} bg-clip-text text-transparent`}>
                  {t('careers.nowHiring')}
                </span>
                <Link
                  to="/booking"
                  className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${job.color} text-white text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-all`}
                >
                  {t('careers.apply')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 p-12 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <Briefcase className="w-8 h-8 text-yellow-300 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('careers.ctaTitle')}</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">{t('careers.ctaSubtitle')}</p>
            <a
              href="mailto:careers@drmzain.com"
              className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-8 py-4 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
            >
              {t('careers.sendResume')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-10">
        <Footer />
      </div>
    </div>
  )
}
