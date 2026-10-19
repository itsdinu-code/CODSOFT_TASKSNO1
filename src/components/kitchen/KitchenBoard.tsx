"use client";

import { useMemo, useState } from "react";
import { useOrders } from "@/lib/store/orders";
import { formatTime } from "@/lib/format";
import { nextStatuses } from "@/lib/orders/state";
import { useClock, useOnline } from "@/lib/hooks";
import type { Order, OrderStatus } from "@/types";

const COLUMNS: { id: "new" | "preparing" | "ready"; label: string; statuses: OrderStatus[] }[] = [
  { id: "new", label: "New", statuses: ["pending", "accepted"] },
  { id: "preparing", label: "Preparing", statuses: ["preparing"] },
  { id: "ready", label: "Ready", statuses: ["ready"] },
];

const NEXT_LABEL: Partial<Record<OrderStatus, string>> = {
  accepted: "Accept",
  preparing: "Start",
  ready: "Ready",
  completed: "Hand over",
  rejected: "Reject",
  cancelled: "Cancel",
};

function minutesSince(iso: string, now: number): number {
  return Math.max(0, Math.floor((now - new Date(iso).getTime()) / 60000));
}

export function KitchenBoard() {
  const { orders, updateStatus, hydrated } = useOrders();
  const now = useClock(15000);
  const [sound, setSound] = useState(true);
  const online = useOnline();
  const [sort, setSort] = useState<"oldest" | "newest">("oldest");

  const live = useMemo(
    () => orders.filter((o) => !["completed", "cancelled", "rejected"].includes(o.status)),
    [orders],
  );

  const sorted = useMemo(() => {
    const list = [...live];
    list.sort((a, b) =>
      sort === "oldest"
        ? a.createdAt.localeCompare(b.createdAt)
        : b.createdAt.localeCompare(a.createdAt),
    );
    return list;
  }, [live, sort]);

  const clock = now
    ? new Date(now).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "--:--";

  if (!hydrated || now === 0) {
    return (
      <div className="kds-root">
        <div className="kds-top">
          <h1 className="kds-title">Kitchen</h1>
        </div>
        <p style={{ padding: 24, color: "var(--kds-muted)" }}>Loading the board…</p>
      </div>
    );
  }

  return (
    <div className="kds-root">
      <div className="kds-top">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <h1 className="kds-title">Kitchen</h1>
          <span className="kds-badge">Sample board · no real tickets</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            className="kds-btn"
            style={{ minWidth: 0, minHeight: 40, padding: "0 14px", fontSize: 15 }}
            onClick={() => setSort((s) => (s === "oldest" ? "newest" : "oldest"))}
          >
            Oldest first
          </button>
          <button
            type="button"
            className="kds-btn"
            style={{ minWidth: 0, minHeight: 40, padding: "0 14px", fontSize: 15 }}
            onClick={() => setSound((s) => !s)}
            aria-pressed={sound}
          >
            Sound {sound ? "on" : "off"}
          </button>
          <span className="kds-clock">{clock}</span>
        </div>
      </div>

      <div className="kds-cols">
        {COLUMNS.map((column) => {
          const tickets = sorted.filter((o) => column.statuses.includes(o.status));
          return (
            <section key={column.id} className="kds-col" data-state={column.id}>
              <div className="kds-col-head">
                <h2>{column.label}</h2>
                <span>{tickets.length}</span>
              </div>
              {tickets.length === 0 ? (
                <p className="kds-empty">Nothing here</p>
              ) : (
                tickets.map((order) => (
                  <Ticket
                    key={order.id}
                    order={order}
                    now={now}
                    onMove={(status) => updateStatus(order.code, status, "Kitchen")}
                  />
                ))
              )}
            </section>
          );
        })}
      </div>

      {!online ? (
        <p className="kds-offline" role="status">
          No connection to the server. Tickets are being shown from the last
          thing this device received.
        </p>
      ) : null}
    </div>
  );
}

function Ticket({
  order,
  now,
  onMove,
}: {
  order: Order;
  now: number;
  onMove: (status: OrderStatus) => void;
}) {
  const age = minutesSince(order.createdAt, now);
  const state = order.status === "pending" ? "new" : order.status === "ready" ? "ready" : "preparing";

  return (
    <article className="kds-ticket" data-state={state}>
      <div className="kds-ticket__head">
        <span className="kds-ticket__code">{order.code}</span>
        <span className="kds-ticket__age" data-late={age >= 15 ? "true" : "false"}>
          {age} min
        </span>
      </div>
      <p className="kds-ticket__meta">
        {formatTime(order.createdAt)} ·{" "}
        {order.fulfilmentType === "takeaway" ? "Takeaway" : "Eating in"} ·{" "}
        {order.customerName}
        {order.isDemo ? " · sample" : ""}
      </p>

      <ul className="kds-ticket__items">
        {order.lines.map((line, index) => (
          <li key={`${line.itemId}-${index}`}>
            <span className="kds-qty">{line.quantity}×</span>
            <span>
              {line.name}
              {line.modifiers.length > 0 ? (
                <span className="kds-ticket__modifiers">
                  {line.modifiers.map((m) => m.name).join(" · ")}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>

      {order.notes ? <p className="kds-ticket__note">{order.notes}</p> : null}

      <div className="kds-actions">
        {nextStatuses(order.status).map((next) => (
          <button
            key={next}
            type="button"
            className={
              next === "cancelled" || next === "rejected"
                ? "kds-btn"
                : "kds-btn kds-btn--go"
            }
            onClick={() => onMove(next)}
          >
            {NEXT_LABEL[next] ?? next}
          </button>
        ))}
      </div>
    </article>
  );
}

export default KitchenBoard;
