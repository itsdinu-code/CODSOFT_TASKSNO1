"use client";

import { useMemo } from "react";
import { useOrders } from "@/lib/store/orders";
import { formatDateTime } from "@/lib/format";
import { STATUS_LABEL } from "@/lib/orders/state";
import { priceDiscrepancies, pendingVerificationItems } from "@/lib/menu/queries";

/**
 * The audit log.
 *
 * In the prototype this is assembled from the sample order history and the
 * menu records that still need an owner's decision. In production it is a
 * table written on the server for every privileged change: who did it, when,
 * and what changed.
 */
export function AdminAudit() {
  const { orders } = useOrders();

  const entries = useMemo(() => {
    const rows: { at: string; actor: string; action: string; detail: string }[] = [];
    for (const order of orders) {
      for (const event of order.events) {
        rows.push({
          at: event.at,
          actor: event.by,
          action: `Order ${order.code} → ${STATUS_LABEL[event.status]}`,
          detail: event.note ?? "",
        });
      }
    }
    return rows.sort((a, b) => b.at.localeCompare(a.at)).slice(0, 40);
  }, [orders]);

  if (orders.length === 0) {
    return <p style={{ color: "var(--muted)" }}>Nothing has happened yet.</p>;
  }

  return (
    <>
      <h1 className="admin-title">Audit log</h1>
      <p className="admin-note">
        Every order movement in this session, and the menu decisions still
        waiting on the owner. A production log records the actor, the action
        and a safe description of the change, and is kept for as long as the
        business is required to keep records.
      </p>

      <div className="admin-card" style={{ marginTop: 20, padding: 0, overflow: "hidden" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ padding: "14px 0 8px" }}>When</th>
              <th style={{ padding: "14px 0 8px" }}>Who</th>
              <th style={{ padding: "14px 0 8px" }}>Action</th>
              <th style={{ padding: "14px 0 8px" }}>Detail</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={i}>
                <td className="admin-mono" style={{ whiteSpace: "nowrap" }}>
                  {formatDateTime(entry.at)}
                </td>
                <td>{entry.actor}</td>
                <td>{entry.action}</td>
                <td style={{ color: "var(--muted)" }}>{entry.detail || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {entries.length === 0 ? (
          <p style={{ padding: "20px 0", color: "var(--muted)" }}>Nothing has happened yet.</p>
        ) : null}
      </div>

      <div className="admin-card" style={{ marginTop: 16 }}>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
          Menu decisions still open
        </h2>
        <p className="admin-note" style={{ marginTop: 4 }}>
          {pendingVerificationItems().length} lines carry a price from a public
          listing rather than the printed board, and {priceDiscrepancies.length}{" "}
          lines differ between the two sources.
        </p>
        <table className="admin-table" style={{ marginTop: 12 }}>
          <thead>
            <tr>
              <th>Item</th>
              <th className="admin-num">Printed board</th>
              <th className="admin-num">Public listing</th>
            </tr>
          </thead>
          <tbody>
            {priceDiscrepancies.map((row) => (
              <tr key={row.item}>
                <td>{row.item}</td>
                <td className="admin-num">{row.board}</td>
                <td className="admin-num" style={{ color: "var(--muted)" }}>
                  {row.listing}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminAudit;
