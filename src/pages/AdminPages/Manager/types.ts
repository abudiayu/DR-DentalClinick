export type PaymentStatus = 'Paid' | 'Partial' | 'Unpaid'
export type AppointmentStatus = 'Pending' | 'Approved' | 'Cancelled'
export type ExpenseCategory = 'Electricity' | 'Water' | 'Equipment' | 'Employee Salary' | 'Medicine'

export interface Patient {
  id: string
  cardNumber: string
  fullName: string
  phone: string
  address: string
  treatment: string
  paymentStatus: PaymentStatus
  lastVisit: string
  totalFee: number
  paidAmount: number
}

export interface Payment {
  id: string
  patientName: string
  service: string
  totalFee: number
  paidAmount: number
  remaining: number
  status: PaymentStatus
}

export interface Service {
  id: string
  name: string
  price: number
  description: string
  active: boolean
}

export interface Appointment {
  id: string
  patient: string
  date: string
  time: string
  service: string
  status: AppointmentStatus
  doctor: string
}

export interface Expense {
  id: string
  title: string
  amount: number
  category: ExpenseCategory
  date: string
}

export type SidebarSection =
  | 'dashboard'
  | 'patients'
  | 'payments'
  | 'appointments'
  | 'services'
  | 'reports'
  | 'expenses'
  | 'settings'
