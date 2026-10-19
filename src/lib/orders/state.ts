import type { OrderStatus } from "@/types";

/**
 * Order state machine.
 *
 * Fulfilment and payment are separate axes: an order can be ready for pickup
 * while its payment is still pending, and a cancelled order can still be
 * refunded. The prototype never guesses a payment outcome.
 */

export const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "accepted",
  "preparing",
  "ready",
  "completed",
  "rejected",
  "cancelled",
];

export const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Order received",
  accepted: "Accepted by the kitchen",
  preparing: "Preparing",
  ready: "Ready for pickup",
  completed: "Completed",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

export const STATUS_SHORT: Record<OrderStatus, string> = {
  pending: "Received",
  accepted: "Accepted",
  preparing: "Preparing",
  ready: "Ready",
  completed: "Completed",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

/** Allowed forward moves. Terminal states accept nothing. */
const TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ["accepted", "rejected", "cancelled"],
  accepted: ["preparing", "cancelled"],
  preparing: ["ready", "cancelled"],
  ready: ["completed", "cancelled"],
  completed: [],
  rejected: [],
  cancelled: [],
};

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  return TRANSITIONS[from]?.includes(to) ?? false;
}

export function nextStatuses(from: OrderStatus): OrderStatus[] {
  return TRANSITIONS[from] ?? [];
}

/** The customer-facing tracking steps, in order. */
export const TRACKING_STEPS: { status: OrderStatus; label: string; blurb: string }[] = [
  {
    status: "pending",
    label: "Order received",
    blurb: "Your order reference is confirmed and waiting for the kitchen.",
  },
  {
    status: "accepted",
    label: "Accepted by the kitchen",
    blurb: "The kitchen has taken the order and started the clock.",
  },
  {
    status: "preparing",
    label: "Preparing",
    blurb: "Your food is on the pass.",
  },
  {
    status: "ready",
    label: "Ready for pickup",
    blurb: "Collect it from the counter at Alappakkam.",
  },
  {
    status: "completed",
    label: "Completed",
    blurb: "Order closed. Thanks for eating with us.",
  },
];
