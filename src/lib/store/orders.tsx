"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CartLine, FulfilmentType, Order, OrderStatus } from "@/types";
import { computeTotals } from "@/lib/pricing";
import { canTransition } from "@/lib/orders/state";
import { buildSeedOrders, SEED_BASE } from "@/lib/orders/seed";
import { orderCode } from "@/lib/format";
import { createLocalStore } from "./localStore";
import { useHydrated } from "@/lib/hooks";

const ORDERS_KEY = "chickadys.orders.v1";

/**
 * The sample orders, pinned to a fixed moment so the build never has to read
 * a clock. On the client they are re-based on the current time so the kitchen
 * board shows a live queue rather than a fixed afternoon in October.
 */
const store = createLocalStore<Order[]>(
  ORDERS_KEY,
  buildSeedOrders(SEED_BASE),
  // On the client the sample orders are re-based on the current moment, so
  // the kitchen board shows a live queue rather than a fixed afternoon.
  () => buildSeedOrders(new Date().toISOString()),
);

interface PlaceOrderInput {
  lines: CartLine[];
  customerName: string;
  customerPhone: string;
  fulfilmentType: FulfilmentType;
  notes?: string;
}

interface OrderContextValue {
  orders: Order[];
  hydrated: boolean;
  placeOrder: (input: PlaceOrderInput) => Order;
  updateStatus: (code: string, status: OrderStatus, by: string, note?: string) => boolean;
  getOrder: (code: string) => Order | undefined;
  resetToSeed: () => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const orders = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  const hydrated = useHydrated();

  const placeOrder = useCallback((input: PlaceOrderInput): Order => {
    const created = new Date().toISOString();
    const nextNumber = 4822 + Math.floor(Math.random() * 90);
    const order: Order = {
      id: `demo-${nextNumber}-${Date.now()}`,
      code: orderCode(nextNumber),
      createdAt: created,
      status: "pending",
      paymentStatus: "not-required",
      fulfilmentType: input.fulfilmentType,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      notes: input.notes,
      lines: input.lines,
      totals: computeTotals(input.lines),
      events: [{ at: created, status: "pending", by: "Customer" }],
      isDemo: true,
    };
    store.set([order, ...store.getSnapshot()]);
    return order;
  }, []);

  const updateStatus = useCallback(
    (code: string, status: OrderStatus, by: string, note?: string): boolean => {
      const current = store.getSnapshot();
      let applied = false;
      const next = current.map((order) => {
        if (order.code !== code) return order;
        if (!canTransition(order.status, status)) return order;
        applied = true;
        return {
          ...order,
          status,
          events: [...order.events, { at: new Date().toISOString(), status, by, note }],
        };
      });
      if (applied) store.set(next);
      return applied;
    },
    [],
  );

  const getOrder = useCallback(
    (code: string) =>
      store.getSnapshot().find((o) => o.code.toLowerCase() === code.toLowerCase()),
    [],
  );

  const resetToSeed = useCallback(() => {
    store.set(buildSeedOrders(new Date().toISOString()));
  }, []);

  const value = useMemo<OrderContextValue>(
    () => ({ orders, hydrated, placeOrder, updateStatus, getOrder, resetToSeed }),
    [orders, hydrated, placeOrder, updateStatus, getOrder, resetToSeed],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders(): OrderContextValue {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used inside <OrderProvider>");
  return ctx;
}
