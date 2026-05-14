import StatsRow from './StatsRow'
import SectionHeader from './SectionHeader'
import ServiceCards from './ServiceCards'
import DoctorRow from './DoctorRow'
import CtaBanner from './CtaBanner'
import Footer from './Footer'

export default function HomeContent() {
  return (
    <section className="w-full bg-[#f0f0f0] px-4 md:px-8 lg:px-12 py-16 md:py-24">
      <div className="max-w-[1536px] mx-auto flex flex-col gap-8 md:gap-12">
        {/* About Us anchor */}
        <div id="about">
          <StatsRow />
        </div>

        {/* Services anchor */}
        <div id="services">
          <SectionHeader />
          <div className="mt-8 md:mt-12">
            <ServiceCards />
          </div>
        </div>

        <DoctorRow />

        {/* Contact anchor */}
        <div id="contact">
          <CtaBanner />
        </div>

        <Footer />
      </div>
    </section>
  )
}
