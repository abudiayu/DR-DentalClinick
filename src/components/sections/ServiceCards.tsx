import { motion } from 'motion/react'
import { ArrowUpRight, Smile, Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const cardBase = 'bg-white rounded-[2rem] p-6 md:p-8 border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.03)]'

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] uppercase tracking-[0.18em] text-[#5E6470] font-normal">
      {children}
    </span>
  )
}

export default function ServiceCards() {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4 md:gap-5">

      {/* Card 1 — Tall Left */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`${cardBase} flex flex-col justify-between min-h-[480px] lg:min-h-[560px]`}
      >
        <div className="flex-1 rounded-[1.4rem] overflow-hidden mb-6 min-h-[220px] lg:min-h-[300px] relative">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Ha4bRK54CdJuJDGDfPNouw-3orb9UqbwH385P9XkzVxdlzrRTfx53nWL&s=10"
            alt={t('services.smileDesign')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Tag>{t('services.smileDesign')}</Tag>
            <div className="w-8 h-8 rounded-full bg-[#f0f0f0] flex items-center justify-center">
              <Smile className="w-4 h-4 text-[#202B4D]" />
            </div>
          </div>
          <h3 className="text-[22px] md:text-[26px] font-normal text-[#202B4D] tracking-tight leading-tight">
            {t('services.smileDesignTitle')}
          </h3>
          <p className="text-[#5E6470] text-sm leading-relaxed font-normal">
            {t('services.smileDesignDesc')}
          </p>
        </div>
      </motion.div>

      {/* Right column */}
      <div className="flex flex-col gap-4 md:gap-5">

        {/* Card 2 — Top Right Wide */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`${cardBase} flex flex-col gap-4`}
        >
          <div className="flex items-center justify-between">
            <Tag>{t('services.realtimeCare')}</Tag>
            <Tag>{t('services.available247')}</Tag>
          </div>
          <h3 className="text-[22px] md:text-[26px] font-normal text-[#202B4D] tracking-tight leading-tight">
            {t('services.emergency')}
          </h3>
          <p className="text-[#5E6470] text-sm leading-relaxed font-normal">
            {t('services.emergencyDesc')}
          </p>

          <div className="rounded-[1.4rem] overflow-hidden h-[180px] md:h-[220px] relative mt-2">
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80"
              alt={t('services.emergency')}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
          </div>
        </motion.div>

        {/* Bottom two small cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`${cardBase} flex flex-col justify-between gap-6 min-h-[200px]`}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Tag>{t('services.orthodontics')}</Tag>
                <div className="w-7 h-7 rounded-full bg-[#f0f0f0] flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-[#202B4D]" />
                </div>
              </div>
              <p className="text-[#5E6470] text-sm leading-relaxed font-normal">
                {t('services.orthodonticsDesc')}
              </p>
            </div>
            <button className="flex items-center gap-1 text-[#202B4D] text-[13px] font-normal hover:opacity-70 transition-opacity cursor-pointer self-start">
              {t('services.viewPlans')} <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`${cardBase} flex flex-col justify-between gap-4 min-h-[200px]`}
          >
            <div className="flex items-center justify-between">
              <Tag>{t('services.implants')}</Tag>
              <Tag>{t('services.permanent')}</Tag>
            </div>

            <motion.div
              whileHover={{ scale: 1.06 }}
              className="w-12 h-12 rounded-full bg-[#202B4D] flex items-center justify-center cursor-pointer self-start"
            >
              <ArrowUpRight className="w-5 h-5 text-white" />
            </motion.div>

            <p className="text-[#5E6470] text-sm leading-relaxed font-normal">
              {t('services.implantsDesc')}
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
