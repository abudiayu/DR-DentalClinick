// useManagerData.ts — single source of truth for all manager page data.
// Fetches from the backend (nurse_patients, clinic_expenses, clinic_services).
// Computes derived stats and chart data from raw rows.

import { useState, useEffect, useCallback } from "react";
import { patientApi, expenseApi, serviceApi, type NursePatientRow, type ExpenseRow, type ServiceRow } from "../../../lib/api";
import type { Patient, Payment, Appointment, Expense, Service } from "./types";

// ── mappers ────────────────────────────────────────────────────────────────────

function rowToPatient(r: NursePatientRow): Patient {
  return {
    id:            r.id,
    cardNumber:    r.card_number,
    fullName:      r.full_name,
    phone:         r.phone,
    address:       r.address ?? "—",
    treatment:     r.service_type,
    paymentStatus: r.payment_status,
    lastVisit:     r.visit_date,
    totalFee:      r.card_fee,
    paidAmount:    r.payment_status === "Paid" ? r.card_fee
                 : r.payment_status === "Partial" ? Math.round(r.card_fee * 0.5)
                 : 0,
  };
}

function patientToPayment(p: Patient): Payment {
  return {
    id:          p.id,
    patientName: p.fullName,
    service:     p.treatment,
    totalFee:    p.totalFee,
    paidAmount:  p.paidAmount,
    remaining:   p.totalFee - p.paidAmount,
    status:      p.paymentStatus,
  };
}

function rowToExpense(r: ExpenseRow): Expense {
  return { id: r.id, title: r.title, amount: r.amount, category: r.category as Expense["category"], date: r.date };
}

function rowToService(r: ServiceRow): Service {
  return { id: r.id, name: r.name, price: r.price, description: r.description, active: r.active };
}

// Pending bookings from nurse_patients become Appointments in the manager view
function patientToAppointment(r: NursePatientRow): Appointment {
  return {
    id:      r.id,
    patient: r.full_name,
    date:    r.visit_date,
    time:    r.registered_at ?? "—",
    service: r.service_type,
    status:  r.waiting_status === "Pending" ? "Pending"
           : r.waiting_status === "Completed" ? "Approved"
           : "Approved",
    doctor:  "Dr. Muhammed",
  };
}

// ── chart helpers ──────────────────────────────────────────────────────────────

function buildDailyIncome(patients: NursePatientRow[]) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const map: Record<string, { earnings: number; card: number; treatment: number }> = {};
  days.forEach(d => { map[d] = { earnings: 0, card: 0, treatment: 0 }; });

  patients.forEach(p => {
    const day = days[new Date(p.visit_date).getDay()];
    if (!map[day]) return;
    const fee = p.payment_status === "Paid" ? p.card_fee
              : p.payment_status === "Partial" ? Math.round(p.card_fee * 0.5) : 0;
    map[day].earnings   += fee;
    map[day].card       += p.card_fee;        // registration card fee portion
    map[day].treatment  += Math.max(0, fee - p.card_fee);
  });

  // Return last 7 days in order starting from today's weekday
  const todayIdx = new Date().getDay();
  return Array.from({ length: 7 }, (_, i) => {
    const d = days[(todayIdx - 6 + i + 7) % 7];
    return { day: d, ...map[d] };
  });
}

function buildMonthlyProfit(patients: NursePatientRow[], expenses: ExpenseRow[]) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const incomeMap: Record<number, number>  = {};
  const expenseMap: Record<number, number> = {};

  patients.forEach(p => {
    const m = new Date(p.visit_date).getMonth();
    const fee = p.payment_status === "Paid" ? p.card_fee
              : p.payment_status === "Partial" ? Math.round(p.card_fee * 0.5) : 0;
    incomeMap[m]  = (incomeMap[m]  ?? 0) + fee;
  });

  expenses.forEach(e => {
    const m = new Date(e.date).getMonth();
    expenseMap[m] = (expenseMap[m] ?? 0) + e.amount;
  });

  return months.map((month, i) => ({
    month,
    income:   incomeMap[i]  ?? 0,
    expenses: expenseMap[i] ?? 0,
    profit:   (incomeMap[i] ?? 0) - (expenseMap[i] ?? 0),
  })).slice(0, new Date().getMonth() + 1);
}

const PIE_COLORS = ["#6366f1","#8b5cf6","#a78bfa","#c4b5fd","#ddd6fe","#e0e7ff","#818cf8"];

function buildServiceRevenue(patients: NursePatientRow[]) {
  const map: Record<string, number> = {};
  patients.forEach(p => {
    const fee = p.payment_status === "Paid" ? p.card_fee
              : p.payment_status === "Partial" ? Math.round(p.card_fee * 0.5) : 0;
    map[p.service_type] = (map[p.service_type] ?? 0) + fee;
  });
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value], i) => ({ name, value, color: PIE_COLORS[i % PIE_COLORS.length] }));
}

// ── hook ──────────────────────────────────────────────────────────────────────

export interface ManagerData {
  patients:     Patient[];
  payments:     Payment[];
  appointments: Appointment[];
  expenses:     Expense[];
  services:     Service[];
  // Computed stats
  todayPatients:    number;
  todayIncome:      number;
  monthlyProfit:    number;
  pendingPayments:  number;
  totalRegistered:  number;
  // Chart data
  dailyIncomeData:    { day: string; earnings: number; card: number; treatment: number }[];
  monthlyProfitData:  { month: string; income: number; expenses: number; profit: number }[];
  serviceRevenueData: { name: string; value: number; color: string }[];
  // Mutations
  addExpense:    (e: Omit<Expense, "id">) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  addService:    (s: Omit<Service, "id">) => Promise<void>;
  updateService: (id: string, patch: Partial<Omit<Service, "id">>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  updateAppointmentStatus: (id: string, status: "Approved" | "Cancelled") => Promise<void>;
  // State
  loading: boolean;
  error:   string | null;
  refresh: () => void;
}

export function useManagerData(): ManagerData {
  const [patientRows,  setPatientRows]  = useState<NursePatientRow[]>([]);
  const [expenseRows,  setExpenseRows]  = useState<ExpenseRow[]>([]);
  const [serviceRows,  setServiceRows]  = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [tick,    setTick]    = useState(0);

  const fetchAll = useCallback(async () => {
    try {
      const [pRows, eRows, sRows] = await Promise.all([
        patientApi.getAll(),
        expenseApi.getAll(),
        serviceApi.getAll(),
      ]);
      setPatientRows(pRows);
      setExpenseRows(eRows);
      setServiceRows(sRows);
      setError(null);
    } catch (err) {
      console.error("[useManagerData] fetch failed:", err);
      setError(err instanceof Error ? err.message : "Could not load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const poll = setInterval(fetchAll, 30_000);
    return () => clearInterval(poll);
  }, [fetchAll, tick]);

  // ── derived data ─────────────────────────────────────────────────────────────

  const today = new Date().toISOString().slice(0, 10);

  const patients     = patientRows.map(rowToPatient);
  const payments     = patients.map(patientToPayment);
  const appointments = patientRows.map(patientToAppointment);
  const expenses     = expenseRows.map(rowToExpense);
  const services     = serviceRows.map(rowToService);

  const todayRows       = patientRows.filter(p => p.visit_date === today);
  const todayIncome     = todayRows.reduce((s, p) => s + (p.payment_status === "Paid" ? p.card_fee : p.payment_status === "Partial" ? Math.round(p.card_fee * 0.5) : 0), 0);
  const totalExpenses   = expenseRows.reduce((s, e) => s + e.amount, 0);
  const totalIncome     = patientRows.reduce((s, p) => s + (p.payment_status === "Paid" ? p.card_fee : p.payment_status === "Partial" ? Math.round(p.card_fee * 0.5) : 0), 0);
  const pendingPayments = patientRows.filter(p => p.payment_status !== "Paid").reduce((s, p) => s + (p.card_fee - (p.payment_status === "Partial" ? Math.round(p.card_fee * 0.5) : 0)), 0);

  const dailyIncomeData    = buildDailyIncome(patientRows);
  const monthlyProfitData  = buildMonthlyProfit(patientRows, expenseRows);
  const serviceRevenueData = buildServiceRevenue(patientRows);

  // ── mutations ─────────────────────────────────────────────────────────────────

  const addExpense = useCallback(async (e: Omit<Expense, "id">) => {
    const row = await expenseApi.add(e);
    setExpenseRows(prev => [row, ...prev]);
  }, []);

  const deleteExpense = useCallback(async (id: string) => {
    await expenseApi.remove(id);
    setExpenseRows(prev => prev.filter(e => e.id !== id));
  }, []);

  const addService = useCallback(async (s: Omit<Service, "id">) => {
    const row = await serviceApi.add(s);
    setServiceRows(prev => [...prev, row]);
  }, []);

  const updateService = useCallback(async (id: string, patch: Partial<Omit<Service, "id">>) => {
    const row = await serviceApi.update(id, patch);
    setServiceRows(prev => prev.map(s => s.id === id ? row : s));
  }, []);

  const deleteService = useCallback(async (id: string) => {
    await serviceApi.remove(id);
    setServiceRows(prev => prev.filter(s => s.id !== id));
  }, []);

  const updateAppointmentStatus = useCallback(async (id: string, status: "Approved" | "Cancelled") => {
    const ws = status === "Approved" ? "Waiting" : "Completed";
    await patientApi.updateStatus(id, ws);
    setPatientRows(prev => prev.map(p => p.id === id ? { ...p, waiting_status: ws } : p));
  }, []);

  const refresh = useCallback(() => setTick(t => t + 1), []);

  return {
    patients, payments, appointments, expenses, services,
    todayPatients:   todayRows.length,
    todayIncome,
    monthlyProfit:   totalIncome - totalExpenses,
    pendingPayments,
    totalRegistered: patientRows.length,
    dailyIncomeData,
    monthlyProfitData,
    serviceRevenueData,
    addExpense, deleteExpense,
    addService, updateService, deleteService,
    updateAppointmentStatus,
    loading, error, refresh,
  };
}
