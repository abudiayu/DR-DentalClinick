import { motion } from 'motion/react'

const columns = [
  {
    title: 'Treatments',
    links: ['Teeth Whitening', 'Dental Surgery', 'Braces & Aligners', 'Smile Design', 'Root Canal'],
  },
  {
    title: 'Clinic',
    links: ['About Us', 'Our Doctors', 'Patient Stories', 'Technology', 'Careers'],
  },
  {
    title: 'Connect',
    links: ['Book Online', 'Contact Us', 'Instagram', 'Facebook', 'Patient Portal'],
  },
]

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="pt-12 pb-8 border-t border-black/5"
    >
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 justify-between">
        {/* Brand */}
        <div className="flex flex-col gap-4 max-w-[220px]">
          <div className="flex items-center gap-2">
            <img src="/logodesign.png" alt="Dr Logo" className="h-24 w-auto object-contain" />
          </div>
          <p className="text-[#5E6470] text-[13px] leading-relaxed font-normal">
            Premium dental care for every smile. Trusted by 15,000+ patients worldwide.
          </p>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#202B4D] font-normal">
                {col.title}
              </span>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#5E6470] text-[13px] font-normal hover:text-[#202B4D] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="text-[#5E6470] text-[12px] font-normal">
          © 2026 Abdulkadir. All rights reserved.
        </span>
        <span className="text-[#5E6470] text-[12px] font-normal">
          Privacy Policy · Terms of Service
        </span>
      </div>
    </motion.footer>
  )
}
