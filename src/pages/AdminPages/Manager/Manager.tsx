import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from 'react-i18next'
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

export default function Manager() {
  const { t } = useTranslation()
  const [active, setActive] = useState<SidebarSection>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const TITLES: Record<SidebarSection, string> = {
    dashboard:    t('manager.dashboard'),
    patients:     t('manager.patients'),
    payments:     t('manager.payments'),
    appointments: t('manager.appointments'),
    services:     t('manager.services'),
    reports:      t('manager.reports'),
    expenses:     t('manager.expenses'),
    settings:     t('manager.settings'),
  }

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
        <Topbar title={TITLES[active]} onMenuClick={() => setSidebarOpen(true)} />
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
