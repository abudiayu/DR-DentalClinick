import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HomeContent from './components/sections/HomeContent'
import Booking from './pages/Booking/Booking'
import Queue from './pages/Queue/Queue'
import Manager from './pages/AdminPages/Manager/Manager'
import Card from './pages/AdminPages/Card/Card'
import Nerse from './pages/AdminPages/NersePage/Nerse'
import Auth from './pages/AdminPages/Auth/Auth'
import { Error } from './Error/Error'
import ProtectedRoute from './routes/ProtectedRoute';

function Home() {
  return (
    <main className="min-h-screen bg-[#f0f0f0]">
      <Hero />
      <HomeContent />
    </main>
  )
}

const HIDE_NAV = ['/auth', '/manager', '/card', '/nerse']

export default function App() {
  const { pathname } = useLocation()
  const showNav = !HIDE_NAV.includes(pathname.toLowerCase())

  return (
    <>
  {showNav && <Navbar />}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/auth" element={<Auth />} />


        <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
          <Route path="/manager" element={<Manager />} />
        </Route>

        {/* Nurse (and manager) */}
        <Route element={<ProtectedRoute allowedRoles={["nurse", "manager"]} />}>
          <Route path="/Nerse" element={<Nerse />} />
          <Route path="/card" element={<Card />} />
        </Route>

        <Route path="*" element={<Error />} />
          </Routes>
        </>
  )
}
