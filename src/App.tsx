import { Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import HomeContent from './components/sections/HomeContent'
import Booking from './pages/Booking/Booking'
import Queue from './pages/Queue/Queue'
import Manager from './pages/AdminPages/Manager/Manager'
import Card from './pages/AdminPages/Card/Card'
import Nerse from './pages/AdminPages/NersePage/Nerse'
import Auth from './pages/AdminPages/Auth/Auth'
import { Error } from './Error/Error'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicLayout from './layouts/PublicLayout'

// Footer pages
import DentalSurgery   from './components/FootersListPage/DentalSurgery'
import BracesAligner   from './components/FootersListPage/BracesAligner'
import SmileDesign     from './components/FootersListPage/SmileDesign'
import RootCanal       from './components/FootersListPage/RootCanal'
import AboutUs         from './components/FootersListPage/AboutUs'
import OurDoctors      from './components/FootersListPage/OurDoctors'
import PatientStories  from './components/FootersListPage/PatientStories'
import Technology      from './components/FootersListPage/Technology'
import Careers         from './components/FootersListPage/Careers'
import TeethWhitening  from './components/FootersListPage/TeethWhitening'

function Home() {
  return (
    <main className="min-h-screen bg-[#f0f0f0]">
      <Hero />
      <HomeContent />
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      {/* ── Public pages — Navbar always shown ── */}
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="booking"        element={<Booking />} />
        <Route path="queue"          element={<Queue />} />
        <Route path="dental-surgery"  element={<DentalSurgery />} />
        <Route path="braces-aligners" element={<BracesAligner />} />
        <Route path="smile-design"    element={<SmileDesign />} />
        <Route path="root-canal"      element={<RootCanal />} />
        <Route path="about-us"        element={<AboutUs />} />
        <Route path="our-doctors"     element={<OurDoctors />} />
        <Route path="patient-stories" element={<PatientStories />} />
        <Route path="technology"      element={<Technology />} />
        <Route path="careers"         element={<Careers />} />
        <Route path="teeth-whitening" element={<TeethWhitening />} />
      </Route>

      {/* ── Auth — no navbar ── */}
      <Route path="/auth" element={<Auth />} />

      {/* ── Admin — protected, no public navbar ── */}
      <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
        <Route path="/manager" element={<Manager />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['nurse', 'manager']} />}>
        <Route path="/Nerse" element={<Nerse />} />
        <Route path="/card"  element={<Card />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  )
}
