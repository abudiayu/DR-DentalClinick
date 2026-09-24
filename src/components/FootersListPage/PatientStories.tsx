import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'motion/react'
import {
  Star, ArrowRight, Quote, Heart,
  MessageCircle, ThumbsUp,
} from 'lucide-react'
import Footer from '../sections/Footer'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
}

export default function PatientStories() {
  const { t } = useTranslation()

  const stories = [
    {
      name: t('patientStories.p1Name'),
      treatment: t('patientStories.p1Treatment'),
      story: t('patientStories.p1Story'),
      rating: 5,
      color: 'from-pink-400 to-rose-500',
      initials: 'AM',
      tag: t('patientStories.p1Tag'),
    },
    {
      name: t('patientStories.p2Name'),
      treatment: t('patientStories.p2Treatment'),
      story: t('patientStories.p2Story'),
      rating: 5,
      color: 'from-blue-400 to-indigo-500',
      initials: 'TK',
      tag: t('patientStories.p2Tag'),
    },
    {
      name: t('patientStories.p3Name'),
      treatment: t('patientStories.p3Treatment'),
      story: t('patientStories.p3Story'),
      rating: 5,
      color: 'from-teal-400 to-emerald-500',
      initials: 'FA',
      tag: t('patientStories.p3Tag'),
    },
    {
      name: t('patientStories.p4Name'),
      treatment: t('patientStories.p4Treatment'),
      story: t('patientStories.p4Story'),
      rating: 5,
      color: 'from-violet-400 to-purple-500',
      initials: 'MH',
      tag: t('patientStories.p4Tag'),
    },
    {
      name: t('patientStories.p5Name'),
      treatment: t('patientStories.p5Treatment'),
      story: t('patientStories.p5Story'),
      rating: 5,
      color: 'from-amber-400 to-orange-500',
      initials: 'SR',
      tag: t('patientStories.p5Tag'),
    },
    {
      name: t('patientStories.p6Name'),
      treatment: t('patientStories.p6Treatment'),
      story: t('patientStories.p6Story'),
      rating: 5,
      color: 'from-cyan-400 to-blue-500',
      initials: 'LB',
      tag: t('patientStories.p6Tag'),
    },
  ]

  const metrics = [
    { val: '15,000+', label: t('patientStories.met1'), icon: <Heart className="w-5 h-5" /> },
    { val: '98%', label: t('patientStories.met2'), icon: <ThumbsUp className="w-5 h-5" /> },
    { val: '4.9/5', label: t('patientStories.met3'), icon: <Star className="w-5 h-5" /> },
    { val: '2,400+', label: t('patientStories.met4'), icon: <MessageCircle className="w-5 h-5" /> },
  ]

  return (
    <div className="bg-[#f0f0f0] min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #3d1a7a 50%, #1a0a2e 100%)' }}
      >
        <div className="absolute top-20 right-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm px-4 py-1.5 rounded-full mb-6"
          >
            <Quote className="w-4 h-4" />
            {t('patientStories.badge')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {t('patientStories.heroTitle')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.55 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('patientStories.heroSubtitle')}
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
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {metrics.map((m) => (
              <div key={m.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="flex justify-center mb-2 text-violet-400">{m.icon}</div>
                <div className="text-xl font-bold text-white">{m.val}</div>
                <div className="text-slate-400 text-xs mt-1">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stories grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-violet-600 text-sm font-medium uppercase tracking-widest">{t('patientStories.storiesTag')}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mt-3">{t('patientStories.storiesTitle')}</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">{t('patientStories.storiesSubtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={story.name}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="bg-white rounded-3xl p-7 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4"
            >
              {/* Quote icon */}
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${story.color} text-white flex items-center justify-center`}>
                <Quote className="w-5 h-5" />
              </div>

              {/* Treatment tag */}
              <span className="self-start text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">
                {story.tag}
              </span>

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: story.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Story text */}
              <p className="text-slate-600 text-sm leading-relaxed flex-1 italic">
                "{story.story}"
              </p>

              {/* Patient */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${story.color} text-white font-bold text-sm flex items-center justify-center shrink-0`}>
                  {story.initials}
                </div>
                <div>
                  <p className="text-[#0f172a] font-semibold text-sm">{story.name}</p>
                  <p className="text-slate-500 text-xs">{story.treatment}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Overall rating banner ── */}
      <section className="bg-[#0f172a] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          >
            <p className="text-slate-400 text-sm uppercase tracking-widest mb-4">{t('patientStories.overallTag')}</p>
            <div className="flex justify-center gap-2 mb-4">
              {[1,2,3,4,5].map((j) => (
                <Star key={j} className="w-8 h-8 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <div className="text-7xl font-black text-white mb-2">4.9</div>
            <p className="text-slate-400">{t('patientStories.basedOn')}</p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 p-12 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <Heart className="w-8 h-8 text-pink-300 mx-auto mb-4 fill-pink-300" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('cta.heading')}</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">{t('cta.subheading')}</p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-8 py-4 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
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
