"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createLocalStore } from "./localStore";
import { useHydrated } from "@/lib/hooks";

export const RESERVATIONS_KEY = "chickadys.reservations.v1";

export interface TableReservation {
  id: string;
  /** The day requested, as YYYY-MM-DD (not a confirmed booking). */
  date: string;
  /** HH:MM within the listing hours. */
  slot: string;
  guests: number;
  name: string;
  phone: string;
  note?: string;
  createdAt: string;
  status: "requested" | "cancelled";
}

/**
 * Table reservations, demo build.
 *
 * A request is written to this browser only — nothing reaches the shop, and
 * the card says so at the point of use. The shop will need to confirm every
 * request by phone until a real booking channel exists.
 */
const store = createLocalStore<TableReservation[]>(RESERVATIONS_KEY, []);

const ReservationsContext = createContext<ReservationsValue | null>(null);

interface ReservationsValue {
  reservations: TableReservation[];
  hydrated: boolean;
  request: (input: Omit<TableReservation, "id" | "createdAt" | "status">) => TableReservation;
  cancel: (id: string) => void;
}

export function ReservationsProvider({ children }: { children: ReactNode }) {
  const reservations = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const hydrated = useHydrated();

  const request = useCallback(
    (input: Omit<TableReservation, "id" | "createdAt" | "status">) => {
      const created = new Date().toISOString();
      const reservation: TableReservation = {
        ...input,
        id: `res-${Date.now()}`,
        createdAt: created,
        status: "requested",
      };
      store.set([reservation, ...store.getSnapshot()]);
      return reservation;
    },
    [],
  );

  const cancel = useCallback((id: string) => {
    store.set(
      store.getSnapshot().map((r) =>
        r.id === id ? { ...r, status: "cancelled" as const } : r,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({ reservations, hydrated, request, cancel }),
    [reservations, hydrated, request, cancel],
  );

  return (
    <ReservationsContext.Provider value={value}>
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  const value = useContext(ReservationsContext);
  if (!value) throw new Error("useReservations needs ReservationsProvider");
  return value;
}
