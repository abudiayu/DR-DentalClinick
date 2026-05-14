import { motion } from 'motion/react'
import { ArrowUpRight, Phone, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Home',     anchor: 'home'     },
  { label: 'About Us', anchor: 'about'    },
  { label: 'Service',  anchor: 'services' },
  { label: 'Contact',  anchor: 'contact'  },
]

export default function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(anchor: string) {
    const el = document.getElementById(anchor)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // If not on home page, go home first then scroll
      navigate('/')
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-3 px-6 md:px-10 w-full border-b transition-all duration-300
      ${scrolled
        ? 'bg-black/40 backdrop-blur-md border-white/10'
        : 'bg-transparent border-transparent'
      }`}
    >      {/* Left: logo + phone */}
      <div className="flex-1 flex items-center gap-4">
        <img
          src="/logodesign.png"
          alt="Dr Logo"
          className="h-20 w-auto object-contain cursor-pointer drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]"
          onClick={() => navigate('/')}
        />
        <a
          href="tel:+251913909509"
          className="hidden md:flex items-center gap-2 text-white hover:text-white/80 text-base font-semibold transition-colors"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
        >
          <Phone className="w-4 h-4" />
          +251 913 909 509
        </a>
      </div>

      {/* Center menu — absolutely centered */}
      <ul className="hidden md:flex items-center gap-8 text-white font-normal text-base absolute left-1/2 -translate-x-1/2" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}>
        {navItems.map(({ label, anchor }) => (
          <motion.li
            key={label}
            onClick={() => scrollTo(anchor)}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1 group text-white"
          >
            {label}
            <ChevronDown className="w-4 h-4 opacity-100 stroke-[2.5] transition-transform duration-200 group-hover:translate-y-0.5" />
          </motion.li>
        ))}
      </ul>

      {/* Right: Book Now */}
      <div className="flex-1 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/booking')}
          className="flex items-center bg-[rgba(30,50,90,0.8)] text-white rounded-full pl-2 pr-4 md:pr-6 py-1.5 md:py-2 gap-2 md:gap-3 hover:bg-[rgba(30,50,90,1)] transition-colors group cursor-pointer"
        >
          <div className="bg-white/20 p-1 md:p-1.5 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className="text-xs md:text-sm font-normal">Book Now</span>
        </motion.button>
      </div>
    </nav>
  )
}
