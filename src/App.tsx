import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HomeContent from './components/sections/HomeContent'
import Booking from './pages/Booking/Booking'
import Queue from './pages/Queue/Queue'

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
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/queue" element={<Queue />} />
      </Routes>
    </>
  )
}
