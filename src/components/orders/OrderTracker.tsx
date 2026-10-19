"use client";

import Link from "next/link";
import { useOrders } from "@/lib/store/orders";
import { STATUS_LABEL, TRACKING_STEPS } from "@/lib/orders/state";
import { formatRupees, formatTime, formatDateTime } from "@/lib/format";
import type { OrderStatus } from "@/types";

const TONE: Record<OrderStatus, string> = {
  pending: "bg-paper-2 text-ink",
  accepted: "bg-paper-2 text-ink",
  preparing: "bg-accent text-ink",
  ready: "bg-accent text-ink",
  completed: "bg-ink text-cream",
  rejected: "bg-ink text-cream",
  cancelled: "bg-ink text-cream",
};

export function OrderTracker({ code }: { code: string }) {
  const { orders, hydrated } = useOrders();
  const order = orders.find((o) => o.code.toLowerCase() === code.toLowerCase());

  if (!hydrated) {
    return <div className="h-64 animate-pulse bg-paper" aria-hidden="true" />;
  }

  if (!order) {
    return (
      <div className="bg-paper-2 p-8 text-center">
        <h2 className="display-wide t-lead text-ink">No order with that reference</h2>
        <p className="mx-auto mt-3 max-w-[44ch] text-ink-2">
          We could not find order {code}. In this prototype an order only exists
          in the browser that placed it, so open it on the same device and
          browser.
        </p>
        <Link href="/menu" className="btn mt-6">
          Back to the menu
        </Link>
      </div>
    );
  }

  const currentIndex = TRACKING_STEPS.findIndex((s) => s.status === order.status);
  const terminal = order.status === "rejected" || order.status === "cancelled";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-16">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`px-3 py-1.5 t-body font-semibold ${TONE[order.status]}`}>
            {STATUS_LABEL[order.status]}
          </span>
          <span className="t-body text-muted">
            Placed {formatDateTime(order.createdAt)}
          </span>
        </div>

        {terminal ? (
          <p className="mt-6 bg-ink p-4 text-cream">
            This order was {order.status}. The history below says when and why.
          </p>
        ) : null}

        <ol className="mt-8 space-y-0">
          {TRACKING_STEPS.map((step, index) => {
            const done = !terminal && currentIndex >= index;
            const active = !terminal && currentIndex === index;
            return (
              <li key={step.status} className="flex gap-4 pb-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full t-small font-semibold ${
                    done ? "bg-accent text-ink" : "bg-paper-2 text-muted"
                  }`}
                >
                  {done ? "✓" : index + 1}
                </span>
                <span className="min-w-0">
                  <span
                    className={`display-wide block t-body ${
                      done ? "text-ink" : "text-muted"
                    }`}
                  >
                    {step.label}
                    {active ? <span className="text-accent-deep"> · now</span> : null}
                  </span>
                  <span className="mt-1 block max-w-[52ch] t-body text-muted">
                    {step.blurb}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-4 bg-paper-2 p-5">
          <h2 className="display-wide t-body text-ink">History</h2>
          <ul className="mt-3 space-y-2 t-body">
            {order.events.map((event, index) => (
              <li key={index} className="flex flex-wrap justify-between gap-2">
                <span className="text-ink">{STATUS_LABEL[event.status]}</span>
                <span className="text-muted">
                  {formatTime(event.at)} · {event.by}
                  {event.note ? ` · ${event.note}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="bg-accent p-6 text-ink">
          <p className="display t-lead text-ink">Order {order.code}</p>
          <ul className="mt-4 space-y-2 t-body">
            {order.lines.map((line, index) => (
              <li key={`${line.itemId}-${index}`} className="flex justify-between gap-4">
                <span>
                  {line.quantity} × {line.name}
                  {line.modifiers.length > 0 ? (
                    <span className="block t-body">{line.modifiers.map((m) => m.name).join(", ")}</span>
                  ) : null}
                </span>
                <span className="tabular shrink-0">
                  {formatRupees(line.unitPricePaise * line.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t-2 border-ink/20 pt-3">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="tabular">{formatRupees(order.totals.subtotalPaise)}</dd>
            </div>
            <div className="flex justify-between t-body font-semibold">
              <dt>Total</dt>
              <dd className="tabular">{formatRupees(order.totals.totalPaise)}</dd>
            </div>
          </dl>
          <p className="mt-3 t-body">
            {order.fulfilmentType === "takeaway" ? "Takeaway" : "Eating in"} ·{" "}
            {order.customerName}
          </p>
          <p className="mt-4 t-body text-ink">
            Tracking is simulated. This order was never sent to the restaurant
            and will not appear on the kitchen display for a real customer.
          </p>
          <Link href="/menu" className="btn btn-ink mt-5 w-full">
            Order something else
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default OrderTracker;
