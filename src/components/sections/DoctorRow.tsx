import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

export default function DoctorRow() {
  const { t } = useTranslation()

  const doctors = [
    {
      name:      t('doctors.sarah'),
      specialty: t('doctors.sarahSpecialty'),
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR0n40jqSqu30_IWH4FsWVJ3D1lbE67vvtrnlMLr6Dc7Eq45BvY-Dq6IM&s=10',
    },
    {
      name:      t('doctors.james'),
      specialty: t('doctors.jamesSpecialty'),
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwy6VoZwXENkqvCfTOX-Z9RI8RKFmyxB5is-3z0YzgrA&s=10',
    },
    {
      name:      t('doctors.lena'),
      specialty: t('doctors.lenaSpecialty'),
      img: 'https://girum-hospital.com/wp-content/uploads/2018/06/3x-480x300.jpg?i=96967',
    },
    {
      name:      t('doctors.ravi'),
      specialty: t('doctors.raviSpecialty'),
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXvwANYPNcRp7opjWOzxC6_OJtXzgJbdXZy5yZtXqB391FokZOkbvVw-Xq&s=10',
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 rounded-full bg-[#202B4D]" />
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#5E6470]">
          {t('doctors.sectionTag')}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {doctors.map((doc, i) => (
          <motion.div
            key={doc.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white rounded-[1.8rem] overflow-hidden border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] group cursor-pointer"
          >
            <div className="h-[180px] md:h-[220px] overflow-hidden">
              <img
                src={doc.img}
                alt={doc.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4 md:p-5 flex flex-col gap-1">
              <span className="text-[15px] md:text-[17px] font-normal text-[#202B4D] tracking-tight">
                {doc.name}
              </span>
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#5E6470]">
                {doc.specialty}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
