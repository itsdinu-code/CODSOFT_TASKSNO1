"use client";

import { useMemo, useState } from "react";
import { useOrders } from "@/lib/store/orders";
import { formatRupees, formatTime } from "@/lib/format";
import { STATUS_LABEL, nextStatuses } from "@/lib/orders/state";
import type { OrderStatus } from "@/types";

const FILTERS: { id: "all" | OrderStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Received" },
  { id: "accepted", label: "Accepted" },
  { id: "preparing", label: "Preparing" },
  { id: "ready", label: "Ready" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

const NEXT_LABEL: Partial<Record<OrderStatus, string>> = {
  accepted: "Accept",
  preparing: "Start preparing",
  ready: "Mark ready",
  completed: "Hand over",
  rejected: "Reject",
  cancelled: "Cancel",
};

export function AdminOrders() {
  const { orders, updateStatus } = useOrders();
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const [selected, setSelected] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      orders
        .filter((o) => (filter === "all" ? true : o.status === filter))
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [orders, filter],
  );

  const order = rows.find((o) => o.code === selected) ?? rows[0];

  if (orders.length === 0) {
    return <p style={{ color: "var(--muted)" }}>The sample queue is empty.</p>;
  }

  return (
    <>
      <h1 className="admin-title">Orders</h1>
      <p className="admin-note">
        Sample orders held in this browser. Accepting, preparing and handing
        over change the state of the sample ticket only — nothing is sent to a
        kitchen, and no order made here reaches a customer.
      </p>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 18,
          borderBottom: "1px solid var(--line)",
          overflowX: "auto",
        }}
      >
        {FILTERS.map((f) => {
          const count =
            f.id === "all" ? orders.length : orders.filter((o) => o.status === f.id).length;
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={active}
              style={{
                border: 0,
                background: "transparent",
                padding: "0 2px 10px",
                marginRight: 18,
                cursor: "pointer",
                fontFamily: "var(--font-plex)",
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                color: active ? "var(--ink)" : "var(--muted)",
                borderBottom: active ? "2px solid var(--ink)" : "2px solid transparent",
                whiteSpace: "nowrap",
              }}
            >
              {f.label} <span className="admin-mono">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="admin-split" style={{ marginTop: 18, gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)" }}>
        <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ padding: "14px 0 8px" }}>Order</th>
                <th style={{ padding: "14px 0 8px" }}>Placed</th>
                <th style={{ padding: "14px 0 8px" }}>Status</th>
                <th className="admin-num" style={{ padding: "14px 0 8px" }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr
                  key={o.id}
                  onClick={() => setSelected(o.code)}
                  style={{
                    cursor: "pointer",
                    background: order?.code === o.code ? "#faf9f6" : "transparent",
                  }}
                >
                  <td className="admin-mono" style={{ padding: "11px 12px 11px 0" }}>
                    {o.code}
                  </td>
                  <td>{formatTime(o.createdAt)}</td>
                  <td>
                    <span
                      className="admin-pill"
                      style={{
                        background:
                          o.status === "pending"
                            ? "#fdf1e8"
                            : o.status === "ready"
                              ? "#eef3ee"
                              : "#f1efe9",
                        color:
                          o.status === "pending"
                            ? "#6b2f08"
                            : o.status === "ready"
                              ? "#2f5d38"
                              : "var(--ink-2)",
                      }}
                    >
                      {STATUS_LABEL[o.status]}
                    </span>
                  </td>
                  <td className="admin-num">{formatRupees(o.totals.totalPaise)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 ? (
            <p style={{ padding: "20px 0", color: "var(--muted)" }}>
              No orders with that state.
            </p>
          ) : null}
        </div>

        <div className="admin-card">
          {order ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
                  Order <span className="admin-mono">{order.code}</span>
                </h2>
                <span className="admin-label">{formatTime(order.createdAt)}</span>
              </div>

              <p className="admin-note" style={{ marginTop: 6 }}>
                {order.customerName} · {order.customerPhone} ·{" "}
                {order.fulfilmentType === "takeaway" ? "Takeaway" : "Eating in"}
                {order.isDemo ? " · sample order" : ""}
              </p>

              <table className="admin-table" style={{ marginTop: 14 }}>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th className="admin-num">Qty</th>
                    <th className="admin-num">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.lines.map((line, i) => (
                    <tr key={`${line.itemId}-${i}`}>
                      <td>
                        {line.name}
                        {line.modifiers.length > 0 ? (
                          <span style={{ display: "block", color: "var(--muted)", fontSize: 12 }}>
                            {line.modifiers.map((m) => m.name).join(", ")}
                          </span>
                        ) : null}
                      </td>
                      <td className="admin-num">{line.quantity}</td>
                      <td className="admin-num">
                        {formatRupees(line.unitPricePaise * line.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {order.notes ? (
                <p className="admin-note" style={{ marginTop: 12 }}>
                  Note for the kitchen: {order.notes}
                </p>
              ) : null}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 14,
                  paddingTop: 12,
                  borderTop: "1px solid var(--line)",
                }}
              >
                <span>Total</span>
                <span className="admin-mono" style={{ fontSize: 16 }}>
                  {formatRupees(order.totals.totalPaise)}
                </span>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                {nextStatuses(order.status).map((next) => (
                  <button
                    key={next}
                    type="button"
                    className={next === "cancelled" || next === "rejected" ? "admin-btn admin-btn--quiet" : "admin-btn"}
                    onClick={() => updateStatus(order.code, next, "Counter")}
                  >
                    {NEXT_LABEL[next] ?? next}
                  </button>
                ))}
                {nextStatuses(order.status).length === 0 ? (
                  <p className="admin-note">
                    This order is closed. Its history is kept with it.
                  </p>
                ) : null}
              </div>

              <h3 style={{ margin: "20px 0 8px", fontSize: 13, fontWeight: 600 }}>History</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {order.events.map((event, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "7px 0",
                      borderTop: "1px solid var(--line)",
                      fontSize: 13,
                    }}
                  >
                    <span>{STATUS_LABEL[event.status]}</span>
                    <span style={{ color: "var(--muted)" }}>
                      {formatTime(event.at)} · {event.by}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p style={{ color: "var(--muted)" }}>No order selected.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
