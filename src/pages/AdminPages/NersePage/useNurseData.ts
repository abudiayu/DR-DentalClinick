// useNurseData.ts
// Single source of truth for all live nurse-page data.
// Replaces the in-memory store.ts — all reads come from Supabase via the backend.

import { useState, useEffect, useCallback, useRef } from "react";
import { patientApi, type NursePatientRow } from "../../../lib/api";
import type { NursePatient, Notification } from "./types";

/** Map the Supabase snake_case row to the existing NursePatient shape used by every component */
export function rowToPatient(r: NursePatientRow): NursePatient {
  return {
    id:               r.id,
    cardNumber:       r.card_number,
    fullName:         r.full_name,
    age:              r.age,
    gender:           r.gender as NursePatient["gender"],
    phone:            r.phone,
    email:            r.email ?? "",
    telegramId:       r.telegram_id ?? "",
    address:          r.address ?? "",
    emergencyContact: r.emergency_contact ?? "",
    visitDate:        r.visit_date,
    cardFee:          r.card_fee,
    paymentStatus:    r.payment_status,
    waitingStatus:    r.waiting_status,
    registeredAt:     r.registered_at,
    serviceType:      r.service_type,
  };
}

export interface NurseDataState {
  patients:      NursePatient[];
  notifications: Notification[];
  loading:       boolean;
  error:         string | null;
  /** Call after registering a patient to add it to local state immediately */
  addPatient:    (p: NursePatient) => void;
  /** Optimistic payment update — syncs to DB and rolls back on failure */
  updatePayment: (id: string, status: NursePatient["paymentStatus"]) => Promise<void>;
  /** Optimistic status update — syncs to DB and rolls back on failure */
  updateStatus:  (id: string, status: NursePatient["waitingStatus"]) => Promise<void>;
  markAllRead:   () => void;
  /** Force a full re-fetch */
  refresh:       () => void;
}

export function useNurseData(): NurseDataState {
  const [patients,      setPatients]      = useState<NursePatient[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState<string | null>(null);
  const [tick,          setTick]          = useState(0);

  // Keep a ref so callbacks always see the latest patients without stale closures
  const patientsRef = useRef<NursePatient[]>([]);
  patientsRef.current = patients;

  const fetchAll = useCallback(async () => {
    try {
      const rows = await patientApi.getAll();
      const mapped = rows.map(rowToPatient);
      setPatients(mapped);
      setError(null);
    } catch (err) {
      console.error("[useNurseData] fetch failed:", err);
      setError(err instanceof Error ? err.message : "Could not load patient data.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchAll();
  }, [fetchAll, tick]);

  // ── addPatient ──────────────────────────────────────────────────────────────
  const addPatient = useCallback((p: NursePatient) => {
    setPatients(prev => [p, ...prev]);
    setNotifications(prev => [
      {
        id:      Date.now().toString(),
        message: `New patient ${p.fullName} registered — ${p.cardNumber}`,
        time:    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read:    false,
        type:    "patient" as const,
      },
      ...prev,
    ]);
  }, []);

  // ── updatePayment ───────────────────────────────────────────────────────────
  const updatePayment = useCallback(
    async (id: string, status: NursePatient["paymentStatus"]) => {
      // Optimistic update
      const prev = patientsRef.current;
      setPatients(prev => prev.map(p => p.id === id ? { ...p, paymentStatus: status } : p));
      try {
        await patientApi.updatePayment(id, status);
        setNotifications(n => [
          {
            id:      Date.now().toString(),
            message: `Payment updated to ${status}`,
            time:    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            read:    false,
            type:    "payment" as const,
          },
          ...n,
        ]);
      } catch (err) {
        console.error("[useNurseData] updatePayment failed:", err);
        // Roll back
        setPatients(prev);
      }
    },
    []
  );

  // ── updateStatus ────────────────────────────────────────────────────────────
  const updateStatus = useCallback(
    async (id: string, status: NursePatient["waitingStatus"]) => {
      const prev = patientsRef.current;
      setPatients(prev => prev.map(p => p.id === id ? { ...p, waitingStatus: status } : p));
      try {
        await patientApi.updateStatus(id, status);
        setNotifications(n => [
          {
            id:      Date.now().toString(),
            message: `Patient moved to ${status}`,
            time:    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            read:    false,
            type:    "doctor" as const,
          },
          ...n,
        ]);
      } catch (err) {
        console.error("[useNurseData] updateStatus failed:", err);
        setPatients(prev);
      }
    },
    []
  );

  // ── markAllRead ─────────────────────────────────────────────────────────────
  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const refresh = useCallback(() => setTick(t => t + 1), []);

  return {
    patients,
    notifications,
    loading,
    error,
    addPatient,
    updatePayment,
    updateStatus,
    markAllRead,
    refresh,
  };
}
