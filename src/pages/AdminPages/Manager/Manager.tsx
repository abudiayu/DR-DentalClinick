import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import DashboardOverview from './components/DashboardOverview'
import PatientsSection from './components/PatientsSection'
import PaymentsSection from './components/PaymentsSection'
import AppointmentsSection from './components/AppointmentsSection'
import ServicesSection from './components/ServicesSection'
import ReportsSection from './components/ReportsSection'
import ExpensesSection from './components/ExpensesSection'
import SettingsSection from './components/SettingsSection'
import type { SidebarSection } from './types'

const TITLES: Record<SidebarSection, string> = {
  dashboard:    'Dashboard',
  patients:     'Patient Management',
  payments:     'Payment Management',
  appointments: 'Appointments',
  services:     'Service Management',
  reports:      'Reports',
  expenses:     'Expense Management',
  settings:     'Settings',
}

export default function Manager() {
  const [active, setActive] = useState<SidebarSection>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function renderSection() {
    switch (active) {
      case 'dashboard':    return <DashboardOverview />
      case 'patients':     return <PatientsSection />
      case 'payments':     return <PaymentsSection />
      case 'appointments': return <AppointmentsSection />
      case 'services':     return <ServicesSection />
      case 'reports':      return <ReportsSection />
      case 'expenses':     return <ExpensesSection />
      case 'settings':     return <SettingsSection />
    }
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar
        active={active}
        onChange={setActive}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          title={TITLES[active]}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
