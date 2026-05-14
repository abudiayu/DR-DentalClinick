import { motion } from 'motion/react'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CtaBanner() {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-[2.5rem] min-h-[320px] md:min-h-[420px] flex items-center"
    >
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=85"
        alt="Dental clinic"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#202B4D]/70 via-[#202B4D]/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 px-8 md:px-14 py-12 md:py-16">
        {/* Left text */}
        <div className="flex flex-col gap-4 max-w-lg">
          <h2 className="text-[36px] md:text-[52px] lg:text-[60px] font-normal text-white tracking-tight leading-[1.05]">
            Transform your smile with expert care.
          </h2>
          <p className="text-white/70 text-sm md:text-base font-normal leading-relaxed max-w-sm">
            Join thousands of patients who trust RIVR Dental for world-class treatments and compassionate care across all specialties.
          </p>
        </div>

        {/* Right buttons */}
        <div className="flex flex-col gap-3 shrink-0">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/booking')}
            className="flex items-center gap-2 backdrop-blur-xl bg-white/70 text-[#202B4D] text-sm font-normal px-6 py-3.5 rounded-full hover:bg-white/90 transition-all cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            Book Appointment
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 backdrop-blur-xl bg-white/20 text-white text-sm font-normal px-6 py-3.5 rounded-full border border-white/30 hover:bg-white/30 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            Our Treatments
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
