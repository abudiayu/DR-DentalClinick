import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

export default function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </>
  )
}
