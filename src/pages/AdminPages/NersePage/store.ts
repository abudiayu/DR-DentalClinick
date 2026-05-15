import type { NursePatient, Notification } from './types'

const seed: NursePatient[] = [
  {
    id: '1', cardNumber: 'DENT-0001', fullName: 'Abebe Girma', age: 34, gender: 'Male',
    phone: '0911234567', email: 'abebe@example.com', telegramId: '@abebe',
    address: 'Addis Ababa', emergencyContact: '0922111222',
    visitDate: '2026-05-15', cardFee: 200, paymentStatus: 'Paid',
    waitingStatus: 'In Treatment', registeredAt: '08:30', serviceType: 'Cleaning',
  },
  {
    id: '2', cardNumber: 'DENT-0002', fullName: 'Tigist Haile', age: 27, gender: 'Female',
    phone: '0922345678', email: 'tigist@example.com', telegramId: '@tigist',
    address: 'Bahir Dar', emergencyContact: '0933222333',
    visitDate: '2026-05-15', cardFee: 200, paymentStatus: 'Paid',
    waitingStatus: 'Waiting', registeredAt: '09:10', serviceType: 'Braces',
  },
  {
    id: '3', cardNumber: 'DENT-0003', fullName: 'Dawit Bekele', age: 45, gender: 'Male',
    phone: '0933456789', email: 'dawit@example.com', telegramId: '',
    address: 'Hawassa', emergencyContact: '0944333444',
    visitDate: '2026-05-15', cardFee: 200, paymentStatus: 'Unpaid',
    waitingStatus: 'Waiting', registeredAt: '09:45', serviceType: 'Extraction',
  },
  {
    id: '4', cardNumber: 'DENT-0004', fullName: 'Meron Tadesse', age: 22, gender: 'Female',
    phone: '0944567890', email: 'meron@example.com', telegramId: '@meron',
    address: 'Dire Dawa', emergencyContact: '0955444555',
    visitDate: '2026-05-15', cardFee: 200, paymentStatus: 'Paid',
    waitingStatus: 'Completed', registeredAt: '10:00', serviceType: 'Whitening',
  },
]

export let patients: NursePatient[] = [...seed]

export let notifications: Notification[] = [
  { id: '1', message: 'Abebe Girma moved to In Treatment', time: '08:35', read: false, type: 'doctor'  },
  { id: '2', message: 'Payment received from Tigist Haile', time: '09:12', read: false, type: 'payment' },
  { id: '3', message: 'New patient Dawit Bekele registered', time: '09:46', read: true,  type: 'patient' },
]

let counter = seed.length + 1

export function nextCardNumber(): string {
  return `DENT-${String(counter).padStart(4, '0')}`
}

export function addPatient(p: NursePatient) {
  patients = [...patients, p]
  counter++
  notifications = [
    {
      id: Date.now().toString(),
      message: `New patient ${p.fullName} registered — ${p.cardNumber}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'patient',
    },
    ...notifications,
  ]
}

export function updatePatientStatus(id: string, status: NursePatient['waitingStatus']) {
  patients = patients.map(p => p.id === id ? { ...p, waitingStatus: status } : p)
}

export function updatePaymentStatus(id: string, status: NursePatient['paymentStatus']) {
  patients = patients.map(p => p.id === id ? { ...p, paymentStatus: status } : p)
}
