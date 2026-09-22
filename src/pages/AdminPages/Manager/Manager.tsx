import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Loader } from 'lucide-react'
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
import { useManagerData } from './useManagerData'
import type { SidebarSection } from './types'

export default function Manager() {
  const { t } = useTranslation()
  const [active, setActive] = useState<SidebarSection>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const data = useManagerData()

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
    if (data.loading) {
      return (
        <div className="flex items-center justify-center py-24 gap-3 text-slate-400">
          <Loader className="w-5 h-5 animate-spin" />
          <span className="text-sm">Loading…</span>
        </div>
      )
    }
    if (data.error) {
      return (
        <div className="bg-red-50 border border-red-100 rounded-xl px-5 py-4 text-red-600 text-sm max-w-lg">
          {data.error}
        </div>
      )
    }

    switch (active) {
      case 'dashboard':    return <DashboardOverview data={data} />
      case 'patients':     return <PatientsSection patients={data.patients} />
      case 'payments':     return <PaymentsSection payments={data.payments} />
      case 'appointments': return <AppointmentsSection appointments={data.appointments} onUpdateStatus={data.updateAppointmentStatus} />
      case 'services':     return <ServicesSection services={data.services} onAdd={data.addService} onUpdate={data.updateService} onDelete={data.deleteService} />
      case 'reports':      return <ReportsSection data={data} />
      case 'expenses':     return <ExpensesSection expenses={data.expenses} onAdd={data.addExpense} onDelete={data.deleteExpense} totalIncome={data.monthlyProfit + data.expenses.reduce((s, e) => s + e.amount, 0)} />
      case 'settings':     return <SettingsSection />
    }
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar active={active} onChange={setActive} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
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
