import type { Patient, Payment, Service, Appointment, Expense } from './types'

export const mockPatients: Patient[] = [
  { id: '1', cardNumber: 'DC-001', fullName: 'Abebe Girma',    phone: '0911234567', address: 'Addis Ababa', treatment: 'Cleaning',    paymentStatus: 'Paid',    lastVisit: '2026-05-14', totalFee: 500,   paidAmount: 500  },
  { id: '2', cardNumber: 'DC-002', fullName: 'Tigist Haile',   phone: '0922345678', address: 'Bahir Dar',   treatment: 'Braces',      paymentStatus: 'Partial', lastVisit: '2026-05-13', totalFee: 10000, paidAmount: 4000 },
  { id: '3', cardNumber: 'DC-003', fullName: 'Dawit Bekele',   phone: '0933456789', address: 'Hawassa',     treatment: 'Extraction',  paymentStatus: 'Unpaid',  lastVisit: '2026-05-12', totalFee: 800,   paidAmount: 0    },
  { id: '4', cardNumber: 'DC-004', fullName: 'Meron Tadesse',  phone: '0944567890', address: 'Dire Dawa',   treatment: 'Whitening',   paymentStatus: 'Paid',    lastVisit: '2026-05-11', totalFee: 2000,  paidAmount: 2000 },
  { id: '5', cardNumber: 'DC-005', fullName: 'Yonas Alemu',    phone: '0955678901', address: 'Mekelle',     treatment: 'Surgery',     paymentStatus: 'Partial', lastVisit: '2026-05-10', totalFee: 15000, paidAmount: 7000 },
  { id: '6', cardNumber: 'DC-006', fullName: 'Hana Worku',     phone: '0966789012', address: 'Addis Ababa', treatment: 'Cleaning',    paymentStatus: 'Paid',    lastVisit: '2026-05-09', totalFee: 500,   paidAmount: 500  },
]

export const mockPayments: Payment[] = mockPatients.map(p => ({
  id: p.id,
  patientName: p.fullName,
  service: p.treatment,
  totalFee: p.totalFee,
  paidAmount: p.paidAmount,
  remaining: p.totalFee - p.paidAmount,
  status: p.paymentStatus,
}))

export const mockServices: Service[] = [
  { id: '1', name: 'Tooth Cleaning',  price: 500,   description: 'Professional dental cleaning',       active: true  },
  { id: '2', name: 'Teeth Whitening', price: 2000,  description: 'Laser whitening treatment',          active: true  },
  { id: '3', name: 'Tooth Extraction',price: 800,   description: 'Safe tooth removal procedure',       active: true  },
  { id: '4', name: 'Braces',          price: 10000, description: 'Orthodontic braces installation',    active: true  },
  { id: '5', name: 'Dental Surgery',  price: 15000, description: 'Complex surgical dental procedures', active: false },
]

export const mockAppointments: Appointment[] = [
  { id: '1', patient: 'Abebe Girma',   date: '2026-05-15', time: '09:00', service: 'Cleaning',   status: 'Approved',   doctor: 'Dr. Muhammed' },
  { id: '2', patient: 'Tigist Haile',  date: '2026-05-15', time: '10:30', service: 'Braces',     status: 'Pending',    doctor: 'Dr. Muhammed' },
  { id: '3', patient: 'Dawit Bekele',  date: '2026-05-16', time: '11:00', service: 'Extraction', status: 'Pending',    doctor: 'Unassigned'   },
  { id: '4', patient: 'Meron Tadesse', date: '2026-05-16', time: '14:00', service: 'Whitening',  status: 'Cancelled',  doctor: 'Dr. Muhammed' },
]

export const mockExpenses: Expense[] = [
  { id: '1', title: 'Electricity Bill',    amount: 3200,  category: 'Electricity',     date: '2026-05-01' },
  { id: '2', title: 'Water Bill',          amount: 800,   category: 'Water',           date: '2026-05-01' },
  { id: '3', title: 'Dental Equipment',    amount: 12000, category: 'Equipment',       date: '2026-05-05' },
  { id: '4', title: 'Staff Salaries',      amount: 45000, category: 'Employee Salary', date: '2026-05-10' },
  { id: '5', title: 'Medicine & Supplies', amount: 6500,  category: 'Medicine',        date: '2026-05-12' },
]

export const dailyIncomeData = [
  { day: 'Mon', earnings: 4200, card: 1800, treatment: 2400 },
  { day: 'Tue', earnings: 3800, card: 1200, treatment: 2600 },
  { day: 'Wed', earnings: 5100, card: 2100, treatment: 3000 },
  { day: 'Thu', earnings: 4700, card: 1900, treatment: 2800 },
  { day: 'Fri', earnings: 6200, card: 2800, treatment: 3400 },
  { day: 'Sat', earnings: 5500, card: 2200, treatment: 3300 },
  { day: 'Sun', earnings: 2100, card: 800,  treatment: 1300 },
]

export const monthlyProfitData = [
  { month: 'Jan', income: 85000, expenses: 62000, profit: 23000 },
  { month: 'Feb', income: 92000, expenses: 65000, profit: 27000 },
  { month: 'Mar', income: 78000, expenses: 58000, profit: 20000 },
  { month: 'Apr', income: 105000,expenses: 70000, profit: 35000 },
  { month: 'May', income: 98000, expenses: 67500, profit: 30500 },
]

export const serviceRevenueData = [
  { name: 'Cleaning',   value: 12500, color: '#6366f1' },
  { name: 'Whitening',  value: 18000, color: '#8b5cf6' },
  { name: 'Surgery',    value: 30000, color: '#a78bfa' },
  { name: 'Braces',     value: 40000, color: '#c4b5fd' },
  { name: 'Extraction', value: 8000,  color: '#ddd6fe' },
]
