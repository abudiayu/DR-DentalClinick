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
