import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Phone, Mail, MapPin,
  ArrowUpRight,
} from 'lucide-react'

const treatmentLinks = [
  { key: 'footer.dentalSurgery',   to: '/dental-surgery' },
  { key: 'footer.bracesAligners',  to: '/braces-aligners' },
  { key: 'footer.smileDesign',     to: '/smile-design' },
  { key: 'footer.rootCanal',       to: '/root-canal' },
  { key: 'footer.teethWhitening',  to: '/teeth-whitening' },
]

const clinicLinks = [
  { key: 'footer.aboutUs',        to: '/about-us' },
  { key: 'footer.ourDoctors',     to: '/our-doctors' },
  { key: 'footer.patientStories', to: '/patient-stories' },
  { key: 'footer.technology',     to: '/technology' },
  { key: 'footer.careers',        to: '/careers' },
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#0f172a] text-white rounded-3xl overflow-hidden"
    >
      {/* Top gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400" />

      <div className="px-8 md:px-12 lg:px-16 pt-14 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <img
              src="/logodesign.png"
              alt="Dr. Muhammed Zain Dental Clinic"
              className="h-20 w-auto object-contain brightness-0 invert"
            />
            <p className="text-slate-400 text-[13px] leading-relaxed">
              {t('footer.tagline')}
            </p>
            {/* Contact info */}
            <div className="flex flex-col gap-3 mt-2">
              <a
                href="tel:+251913909509"
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 text-[13px] transition-colors group"
              >
                <span className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-400/10 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                +251 913 909 509
              </a>
              <a
                href="mailto:info@drmzain.com"
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 text-[13px] transition-colors group"
              >
                <span className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-400/10 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                info@drmzain.com
              </a>
              <div className="flex items-center gap-2 text-slate-400 text-[13px]">
                <span className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                Addis Ababa, Ethiopia
              </div>
            </div>
            {/* Social */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 flex items-center justify-center transition-all duration-300 group"
              >
                {/* Instagram icon */}
                <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 group"
              >
                <span className="text-slate-400 group-hover:text-white text-sm font-bold transition-colors">f</span>
              </a>
            </div>
          </div>

          {/* Treatments */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-cyan-400 font-medium">
              {t('footer.treatments')}
            </span>
            <ul className="flex flex-col gap-2.5">
              {treatmentLinks.map(({ key, to }) => (
                <li key={key}>
                  <Link
                    to={to}
                    className="text-slate-400 text-[13px] hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-cyan-400 font-medium">
              {t('footer.clinic')}
            </span>
            <ul className="flex flex-col gap-2.5">
              {clinicLinks.map(({ key, to }) => (
                <li key={key}>
                  <Link
                    to={to}
                    className="text-slate-400 text-[13px] hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Book Now CTA */}
          <div className="flex flex-col gap-5">
            <span className="text-[11px] uppercase tracking-[0.2em] text-cyan-400 font-medium">
              {t('footer.connect')}
            </span>
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
              <p className="text-slate-300 text-[13px] leading-relaxed">
                {t('footer.ctaText')}
              </p>
              <Link
                to="/booking"
                className="flex items-center justify-between bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[13px] font-medium rounded-xl px-4 py-3 hover:opacity-90 transition-opacity group"
              >
                {t('footer.bookOnline')}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/queue"
                className="text-center text-slate-400 hover:text-white text-[13px] transition-colors"
              >
                {t('footer.patientPortal')}
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-slate-500 text-[12px] flex items-center gap-1.5">
            {t('footer.copyright')}
          </span>
          <span className="text-slate-500 text-[12px]">
            {t('footer.privacyPolicy')} · {t('footer.termsOfService')}
          </span>
        </div>
      </div>
    </motion.footer>
  )
}
