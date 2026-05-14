import { motion } from 'motion/react'
import HeroBadge from './HeroBadge'
import BottomLeftCard from './BottomLeftCard'
import BottomRightCorner from './BottomRightCorner'

const BG_IMAGE = '/dental home.jfif.jpg'

export default function Hero() {
  return (
    <div id="home" className="w-full h-screen flex items-center justify-center p-3 md:p-5 bg-[#f0f0f0]">
      <section className="relative w-full max-w-[1536px] h-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-none flex flex-col items-center bg-white/10 group">

        {/* Background image */}
        <img
          src={BG_IMAGE}
          alt="Dental clinic"
          className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center z-0"
        />

        {/* Overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-[1]" />

        {/* Content layer — full height, center the text block */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

          {/* Text container */}
          <div className="w-full flex flex-col items-center px-6 text-center max-w-4xl">
            <HeroBadge />

            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-normal text-white mb-2 tracking-tight leading-[1.05]"
              style={{ textShadow: '0 2px 24px rgba(0,0,0,0.18)' }}
            >
              Dr Muhammed zain Dental clinick
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-xl font-normal"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.15)' }}
            >
              Access Smart Vaults, stake RIVR, NFTs, transform rigid holdings into liquid cash instantly.
            </motion.p>
          </div>

          <BottomLeftCard />
          <BottomRightCorner />
        </div>
      </section>
    </div>
  )
}
