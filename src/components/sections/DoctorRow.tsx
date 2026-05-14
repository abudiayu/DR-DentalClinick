import { motion } from 'motion/react'

const doctors = [
  {
    name: 'Dr. Sarah Chen',
    specialty: 'Cosmetic Dentistry',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
  },
  {
    name: 'Dr. James Okafor',
    specialty: 'Oral Surgery',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
  },
  {
    name: 'Dr. Lena Müller',
    specialty: 'Orthodontics',
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
  },
  {
    name: 'Dr. Ravi Patel',
    specialty: 'Implantology',
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
  },
]

export default function DoctorRow() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 rounded-full bg-[#202B4D]" />
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#5E6470]">Meet the Team</span>
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
