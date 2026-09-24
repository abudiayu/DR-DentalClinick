import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Loader } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import NurseSidebar from './components/NurseSidebar'
import NurseTopbar from './components/NurseTopbar'
import NurseDashboard from './components/NurseDashboard'
import RegisterPatient from './components/RegisterPatient'
import CardPayments from './components/CardPayments'
import WaitingPatients from './components/WaitingPatients'
import PatientRecords from './components/PatientRecords'
import NurseReports from './components/NurseReports'
import NurseNotifications from './components/NurseNotifications'
import { useNurseData } from './useNurseData'
import type { NurseSection } from './types'

export default function Nerse() {
  const { t } = useTranslation()
  const [active, setActive]             = useState<NurseSection>('dashboard')
  const [sidebarOpen, setSidebarOpen]   = useState(false)
  const [globalSearch, setGlobalSearch] = useState('')
  const [navTick, setNavTick]           = useState(0)

  const {
    patients, notifications,
    loading, error,
    addPatient, updatePayment, updateStatus,
    markAllRead, refresh,
  } = useNurseData()

  const unread = notifications.filter(n => !n.read).length

  const TITLES: Record<NurseSection, string> = {
    dashboard:     t('nurse.dashboard'),
    register:      t('nurse.register'),
    payments:      t('nurse.payments'),
    waiting:       t('nurse.waiting'),
    records:       t('nurse.records'),
    reports:       t('nurse.reportsSection'),
    notifications: t('nurse.notifications'),
  }

  function handleSection(s: NurseSection) {
    setActive(s)
    setNavTick(tk => tk + 1)
    refresh()
  }

  function renderSection() {
    // Show a centered spinner while the initial fetch runs
    if (loading) {
      return (
        <div className="flex items-center justify-center py-24 gap-3 text-slate-400">
          <Loader className="w-5 h-5 animate-spin" />
          <span className="text-sm">Loading…</span>
        </div>
      )
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4 text-red-600 text-sm max-w-lg">
          {error}
        </div>
      )
    }

    switch (active) {
      case 'dashboard':
        return <NurseDashboard patients={patients} />
      case 'register':
        return (
          <RegisterPatient
            onDone={(patient) => {
              if (patient) addPatient(patient)
              handleSection('waiting')
            }}
          />
        )
      case 'payments':
        return <CardPayments patients={patients} onUpdatePayment={updatePayment} />
      case 'waiting':
        return <WaitingPatients patients={patients} onUpdateStatus={updateStatus} />
      case 'records':
        return <PatientRecords patients={patients} globalSearch={globalSearch} />
      case 'reports':
        return <NurseReports patients={patients} />
      case 'notifications':
        return <NurseNotifications notifications={notifications} onRead={markAllRead} />
    }
  }

  return (
    <div className="flex h-screen bg-[#f0f4f8] overflow-hidden">
      <NurseSidebar
        active={active}
        onChange={handleSection}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        unread={unread}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NurseTopbar
          title={TITLES[active]}
          onMenuClick={() => setSidebarOpen(true)}
          unread={unread}
          onNotifClick={() => handleSection('notifications')}
          onSearch={setGlobalSearch}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active + navTick}
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
