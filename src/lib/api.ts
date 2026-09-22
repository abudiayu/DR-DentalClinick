// src/lib/api.ts
// Centralised fetch wrapper.  All components import from here so the base URL
// is configured in exactly one place via VITE_API_URL.

const BASE = (import.meta.env.VITE_API_URL as string | undefined) || "http://localhost:5000";

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown };

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const d = data as { message?: string; detail?: string; hint?: string; code?: string };
    // Log the full server response so DevTools console shows the real cause
    console.error(
      `[api] ${options.method ?? "GET"} ${path} → HTTP ${res.status}`,
      d
    );
    const message = d.detail
      ? `${d.message ?? "Request failed"} — ${d.detail}${d.hint ? ` (hint: ${d.hint})` : ""}`
      : d.message || `HTTP ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}

// ── Queue API ─────────────────────────────────────────────────────────────────

export interface QueuePatient {
  id: string;
  queue_number: number;
  patient_name: string;
  treatment: string;
  status: "waiting" | "in_treatment" | "completed";
  started_at: string | null;
  completed_at: string | null;
  est_wait_seconds: number;
  created_at: string;
}

export const queueApi = {
  /** Today's waiting + in_treatment patients */
  getToday: () => request<QueuePatient[]>("/api/queue/today"),

  /** Today's completed patients */
  getCompletedToday: () => request<QueuePatient[]>("/api/queue/completed-today"),

  /** Add a patient to the queue after registration */
  add: (payload: { patient_name: string; treatment: string; est_wait_seconds?: number }) =>
    request<QueuePatient>("/api/queue", { method: "POST", body: payload }),

  /** Advance a patient's status */
  updateStatus: (id: string, status: "waiting" | "in_treatment" | "completed") =>
    request<QueuePatient>(`/api/queue/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),
};

// ── Patient API (Nurse section) ───────────────────────────────────────────────

export interface NursePatientRow {
  id: string;
  card_number: string;
  full_name: string;
  age: number;
  gender: string;
  phone: string;
  email: string | null;
  telegram_id: string | null;
  address: string | null;
  emergency_contact: string | null;
  visit_date: string;
  card_fee: number;
  payment_status: "Paid" | "Partial" | "Unpaid";
  waiting_status: "Waiting" | "In Treatment" | "Completed";
  registered_at: string;
  service_type: string;
}

export type NewPatientPayload = Omit<
  NursePatientRow,
  "id" | "card_number" | "registered_at" | "waiting_status"
>;

export const patientApi = {
  /** Fetch all patients, optionally filtered by search string */
  getAll: (search?: string) =>
    request<NursePatientRow[]>(
      `/api/patients${search ? `?search=${encodeURIComponent(search)}` : ""}`
    ),

  /** Register a new patient (nurse panel — requires JWT) */
  register: (payload: NewPatientPayload) =>
    request<NursePatientRow>("/api/patients", { method: "POST", body: payload }),

  /** Update payment status */
  updatePayment: (id: string, payment_status: "Paid" | "Partial" | "Unpaid") =>
    request<NursePatientRow>(`/api/patients/${id}/payment`, {
      method: "PATCH",
      body: { payment_status },
    }),

  /** Update waiting status — Pending→Waiting also auto-adds to queue */
  updateStatus: (id: string, waiting_status: "Pending" | "Waiting" | "In Treatment" | "Completed") =>
    request<NursePatientRow>(`/api/patients/${id}/status`, {
      method: "PATCH",
      body: { waiting_status },
    }),
};

// ── Public Booking API (no JWT) ───────────────────────────────────────────────

export interface BookingPayload {
  full_name: string;
  phone: string;
  email?: string;
  service_type: string;
  preferred_date: string;
  message?: string;
}

export const bookingApi = {
  /** Submit appointment booking form — public, no auth required */
  submit: (payload: BookingPayload) =>
    request<{ message: string; booking: { id: string; card_number: string } }>(
      "/api/bookings",
      { method: "POST", body: payload }
    ),
};

// ── Manager: Expenses API ─────────────────────────────────────────────────────

export interface ExpenseRow {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export const expenseApi = {
  getAll: () => request<ExpenseRow[]>("/api/expenses"),
  add: (payload: Omit<ExpenseRow, "id">) =>
    request<ExpenseRow>("/api/expenses", { method: "POST", body: payload }),
  remove: (id: string) =>
    request<{ message: string }>(`/api/expenses/${id}`, { method: "DELETE" }),
};

// ── Manager: Services API ─────────────────────────────────────────────────────

export interface ServiceRow {
  id: string;
  name: string;
  price: number;
  description: string;
  active: boolean;
}

export const serviceApi = {
  getAll: () => request<ServiceRow[]>("/api/services"),
  add: (payload: Omit<ServiceRow, "id">) =>
    request<ServiceRow>("/api/services", { method: "POST", body: payload }),
  update: (id: string, payload: Partial<Omit<ServiceRow, "id">>) =>
    request<ServiceRow>(`/api/services/${id}`, { method: "PATCH", body: payload }),
  remove: (id: string) =>
    request<{ message: string }>(`/api/services/${id}`, { method: "DELETE" }),
};
