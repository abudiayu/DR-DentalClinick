import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import NurseSidebar from './components/NurseSidebar'
import NurseTopbar from './components/NurseTopbar'
import NurseDashboard from './components/NurseDashboard'
import RegisterPatient from './components/RegisterPatient'
import CardPayments from './components/CardPayments'
import WaitingPatients from './components/WaitingPatients'
import PatientRecords from './components/PatientRecords'
import NurseReports from './components/NurseReports'
import NurseNotifications from './components/NurseNotifications'
import { patients as storePatients, notifications as storeNotifs } from './store'
import type { NurseSection } from './types'

const TITLES: Record<NurseSection, string> = {
  dashboard:     'Nurse Dashboard',
  register:      'Register Patient',
  payments:      'Card Payments',
  waiting:       'Waiting Patients',
  records:       'Patient Records',
  reports:       'Daily Reports',
  notifications: 'Notifications',
}

export default function Nerse() {
  const [active, setActive]         = useState<NurseSection>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [globalSearch, setGlobalSearch] = useState('')
  // tick forces re-render to pick up store mutations
  const [tick, setTick] = useState(0)
  const refresh = useCallback(() => setTick(t => t + 1), [])

  const patients      = storePatients
  const notifications = storeNotifs
  const unread        = notifications.filter(n => !n.read).length

  function markAllRead() {
    storeNotifs.forEach(n => { n.read = true })
    refresh()
  }

  function handleSection(s: NurseSection) {
    setActive(s)
    refresh()
  }

  function renderSection() {
    switch (active) {
      case 'dashboard':     return <NurseDashboard patients={patients} />
      case 'register':      return <RegisterPatient onDone={() => { handleSection('waiting') }} />
      case 'payments':      return <CardPayments patients={patients} />
      case 'waiting':       return <WaitingPatients patients={patients} />
      case 'records':       return <PatientRecords patients={patients} globalSearch={globalSearch} />
      case 'reports':       return <NurseReports patients={patients} />
      case 'notifications': return <NurseNotifications notifications={notifications} onRead={markAllRead} />
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
              key={active + tick}
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
