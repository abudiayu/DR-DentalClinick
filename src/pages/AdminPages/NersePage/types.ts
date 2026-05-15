export type Gender = 'Male' | 'Female' | 'Other'
export type PaymentStatus = 'Paid' | 'Partial' | 'Unpaid'
export type WaitingStatus = 'Waiting' | 'In Treatment' | 'Completed'
export type NurseSection =
  | 'dashboard'
  | 'register'
  | 'payments'
  | 'waiting'
  | 'records'
  | 'reports'
  | 'notifications'

export interface NursePatient {
  id: string
  cardNumber: string
  fullName: string
  age: number
  gender: Gender
  phone: string
  email: string
  telegramId: string
  address: string
  emergencyContact: string
  visitDate: string
  cardFee: number
  paymentStatus: PaymentStatus
  waitingStatus: WaitingStatus
  registeredAt: string
  serviceType: string
}

export interface Notification {
  id: string
  message: string
  time: string
  read: boolean
  type: 'patient' | 'payment' | 'doctor' | 'queue'
}
