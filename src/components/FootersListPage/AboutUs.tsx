import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'motion/react'
import {
  Heart, Shield, Award, Users, ArrowRight,
  ChevronRight, Star, Clock, CheckCircle2,
} from 'lucide-react'
import Footer from '../sections/Footer'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
}

export default function AboutUs() {
  const { t } = useTranslation()

  const values = [
    { icon: <Heart className="w-6 h-6" />, title: t('aboutUs.val1Title'), desc: t('aboutUs.val1Desc'), color: 'from-rose-500 to-pink-600' },
    { icon: <Shield className="w-6 h-6" />, title: t('aboutUs.val2Title'), desc: t('aboutUs.val2Desc'), color: 'from-blue-500 to-indigo-600' },
    { icon: <Award className="w-6 h-6" />, title: t('aboutUs.val3Title'), desc: t('aboutUs.val3Desc'), color: 'from-amber-500 to-orange-500' },
    { icon: <Users className="w-6 h-6" />, title: t('aboutUs.val4Title'), desc: t('aboutUs.val4Desc'), color: 'from-teal-500 to-emerald-500' },
  ]

  const stats = [
    { val: '15,000+', label: t('aboutUs.stat1') },
    { val: '15+', label: t('aboutUs.stat2') },
    { val: '12', label: t('aboutUs.stat3') },
    { val: '98%', label: t('aboutUs.stat4') },
  ]

  const milestones = [
    { year: '2010', title: t('aboutUs.mile1Title'), desc: t('aboutUs.mile1Desc') },
    { year: '2014', title: t('aboutUs.mile2Title'), desc: t('aboutUs.mile2Desc') },
    { year: '2018', title: t('aboutUs.mile3Title'), desc: t('aboutUs.mile3Desc') },
    { year: '2022', title: t('aboutUs.mile4Title'), desc: t('aboutUs.mile4Desc') },
    { year: '2026', title: t('aboutUs.mile5Title'), desc: t('aboutUs.mile5Desc') },
  ]

  const team = [
    { name: t('doctors.sarah'), role: t('doctors.sarahSpecialty'), initials: 'SC', color: 'from-pink-400 to-rose-500' },
    { name: t('doctors.james'), role: t('doctors.jamesSpecialty'), initials: 'JO', color: 'from-blue-400 to-indigo-500' },
    { name: t('doctors.lena'),  role: t('doctors.lenaSpecialty'),  initials: 'LM', color: 'from-violet-400 to-purple-500' },
    { name: t('doctors.ravi'),  role: t('doctors.raviSpecialty'),  initials: 'RP', color: 'from-amber-400 to-orange-500' },
  ]

  return (
    <div className="bg-[#f0f0f0] min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
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
            <Heart className="w-4 h-4" />
            {t('aboutUs.badge')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {t('aboutUs.heroTitle')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.55 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('aboutUs.heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              {t('cta.bookAppointment')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#story"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-2xl hover:bg-white/20 transition-all"
            >
              {t('aboutUs.ourStory')}
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{s.val}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section id="story" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          >
            <span className="text-blue-600 text-sm font-medium uppercase tracking-widest">{t('aboutUs.missionTag')}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mt-3 mb-6">{t('aboutUs.missionTitle')}</h2>
            <p className="text-slate-500 leading-relaxed mb-4">{t('aboutUs.missionP1')}</p>
            <p className="text-slate-500 leading-relaxed mb-8">{t('aboutUs.missionP2')}</p>
            <div className="flex flex-col gap-3">
              {[t('aboutUs.mis1'), t('aboutUs.mis2'), t('aboutUs.mis3')].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                  <span className="text-slate-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`rounded-3xl p-7 flex flex-col gap-2 ${i % 2 === 0 ? 'bg-[#0f172a] text-white' : 'bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)]'}`}
              >
                <div className={`text-3xl font-black ${i % 2 === 0 ? 'text-blue-400' : 'text-[#0f172a]'}`}>{s.val}</div>
                <div className={`text-sm ${i % 2 === 0 ? 'text-slate-400' : 'text-slate-500'}`}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-[#0f172a] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-14"
          >
            <span className="text-blue-400 text-sm font-medium uppercase tracking-widest">{t('aboutUs.valuesTag')}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">{t('aboutUs.valuesTitle')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/8 transition-colors group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  {v.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-blue-600 text-sm font-medium uppercase tracking-widest">{t('aboutUs.timelineTag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mt-3">{t('aboutUs.timelineTitle')}</h2>
        </motion.div>

        <div className="relative flex flex-col gap-0">
          <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 to-indigo-600 hidden sm:block" />
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="flex items-start gap-6 py-6"
            >
              <div className="relative shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm flex items-center justify-center z-10 shadow-lg shadow-blue-200">
                {m.year}
              </div>
              <div className="bg-white rounded-2xl p-5 flex-1 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h3 className="text-[#0f172a] font-semibold mb-1">{m.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="text-blue-600 text-sm font-medium uppercase tracking-widest">{t('doctors.sectionTag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mt-3">{t('aboutUs.teamTitle')}</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="bg-white rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] transition-all hover:-translate-y-1 text-center"
            >
              <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${member.color} text-white font-bold text-2xl flex items-center justify-center mb-4`}>
                {member.initials}
              </div>
              <h3 className="text-[#0f172a] font-semibold text-sm">{member.name}</h3>
              <p className="text-slate-500 text-xs mt-1">{member.role}</p>
              <div className="flex justify-center gap-0.5 mt-3">
                {[1,2,3,4,5].map((j) => <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
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
            <Clock className="w-8 h-8 text-yellow-300 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('cta.heading')}</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">{t('cta.subheading')}</p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-8 py-4 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
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
