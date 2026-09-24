import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Star, ArrowRight, Award, GraduationCap,
  Stethoscope, Heart,
} from 'lucide-react'
import Footer from '../sections/Footer'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
}

export default function OurDoctors() {
  const { t } = useTranslation()

  const doctors = [
    {
      name: t('doctors.sarah'),
      specialty: t('doctors.sarahSpecialty'),
      initials: 'SC',
      color: 'from-pink-400 to-rose-500',
      bg: 'bg-pink-50',
      exp: '12',
      patients: '2,400+',
      rating: '4.9',
      edu: t('ourDoctors.sarahEdu'),
      bio: t('ourDoctors.sarahBio'),
      skills: [t('ourDoctors.sarahSkill1'), t('ourDoctors.sarahSkill2'), t('ourDoctors.sarahSkill3')],
    },
    {
      name: t('doctors.james'),
      specialty: t('doctors.jamesSpecialty'),
      initials: 'JO',
      color: 'from-blue-400 to-indigo-500',
      bg: 'bg-blue-50',
      exp: '15',
      patients: '3,100+',
      rating: '4.8',
      edu: t('ourDoctors.jamesEdu'),
      bio: t('ourDoctors.jamesBio'),
      skills: [t('ourDoctors.jamesSkill1'), t('ourDoctors.jamesSkill2'), t('ourDoctors.jamesSkill3')],
    },
    {
      name: t('doctors.lena'),
      specialty: t('doctors.lenaSpecialty'),
      initials: 'LM',
      color: 'from-violet-400 to-purple-500',
      bg: 'bg-violet-50',
      exp: '10',
      patients: '1,800+',
      rating: '4.9',
      edu: t('ourDoctors.lenaEdu'),
      bio: t('ourDoctors.lenaBio'),
      skills: [t('ourDoctors.lenaSkill1'), t('ourDoctors.lenaSkill2'), t('ourDoctors.lenaSkill3')],
    },
    {
      name: t('doctors.ravi'),
      specialty: t('doctors.raviSpecialty'),
      initials: 'RP',
      color: 'from-amber-400 to-orange-500',
      bg: 'bg-amber-50',
      exp: '14',
      patients: '2,700+',
      rating: '4.9',
      edu: t('ourDoctors.raviEdu'),
      bio: t('ourDoctors.raviBio'),
      skills: [t('ourDoctors.raviSkill1'), t('ourDoctors.raviSkill2'), t('ourDoctors.raviSkill3')],
    },
  ]

  const certifications = [
    t('ourDoctors.cert1'), t('ourDoctors.cert2'),
    t('ourDoctors.cert3'), t('ourDoctors.cert4'),
  ]

  return (
    <div className="bg-[#f0f0f0] min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d0d2b 0%, #1a1a5e 50%, #0d0d2b 100%)' }}
      >
        <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm px-4 py-1.5 rounded-full mb-6"
          >
            <Stethoscope className="w-4 h-4" />
            {t('ourDoctors.badge')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {t('ourDoctors.heroTitle')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.55 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('ourDoctors.heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-indigo-500/25"
            >
              {t('cta.bookAppointment')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[
              { val: '4', label: t('ourDoctors.stat1') },
              { val: '50+', label: t('ourDoctors.stat2') },
              { val: '10,000+', label: t('ourDoctors.stat3') },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{s.val}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Doctor Cards ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-indigo-600 text-sm font-medium uppercase tracking-widest">{t('doctors.sectionTag')}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mt-3">{t('ourDoctors.teamTitle')}</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">{t('ourDoctors.teamSubtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card header */}
              <div className={`${doc.bg} px-7 pt-7 pb-5`}>
                <div className="flex items-start gap-5">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${doc.color} text-white font-black text-2xl flex items-center justify-center shrink-0 shadow-lg`}>
                    {doc.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#0f172a] font-bold text-xl">{doc.name}</h3>
                    <p className="text-slate-500 text-sm mt-0.5">{doc.specialty}</p>
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-[#0f172a] text-xs font-semibold">{doc.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 text-xs">
                        <Award className="w-3.5 h-3.5" />
                        {doc.exp} {t('ourDoctors.yearsExp')}
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 text-xs">
                        <Heart className="w-3.5 h-3.5" />
                        {doc.patients} {t('ourDoctors.patients')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="px-7 py-6 flex flex-col gap-5">
                <p className="text-slate-500 text-sm leading-relaxed">{doc.bio}</p>

                <div className="flex items-start gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                  <p className="text-slate-500 text-xs">{doc.edu}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {doc.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <Link
                  to="/booking"
                  className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r ${doc.color} text-white text-sm font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition-all`}
                >
                  {t('ourDoctors.bookWith')} {doc.name.split(' ')[0]} {doc.name.split(' ')[1]}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="bg-[#0f172a] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white">{t('ourDoctors.certTitle')}</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4"
              >
                <Award className="w-5 h-5 text-yellow-400 shrink-0" />
                <span className="text-slate-300 text-sm">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-12 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <Stethoscope className="w-8 h-8 text-yellow-300 mx-auto mb-4" />
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
