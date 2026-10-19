"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useOrders } from "@/lib/store/orders";
import { formatRupees, formatTime } from "@/lib/format";
import { STATUS_SHORT } from "@/lib/orders/state";
import { menuItems, pendingVerificationItems } from "@/lib/menu/queries";
import { allCampaigns } from "@/lib/campaigns";

/**
 * The overview.
 *
 * The question this screen answers: what is happening at the counter right
 * now, and what still needs the owner. Every figure is computed from the
 * sample orders in this browser, and the screen says so.
 */
export function AdminOverview() {
  const { orders } = useOrders();

  const stats = useMemo(() => {
    const open = orders.filter((o) =>
      ["pending", "accepted", "preparing", "ready"].includes(o.status),
    );
    const closed = orders.filter((o) =>
      ["completed", "cancelled", "rejected"].includes(o.status),
    );
    const takings = closed.reduce((sum, o) => sum + o.totals.totalPaise, 0);
    const average = closed.length
      ? Math.round(takings / closed.length)
      : 0;
    return {
      open: open.length,
      takings,
      average,
      closed: closed.length,
      items: orders.reduce((n, o) => n + o.lines.length, 0),
    };
  }, [orders]);

  /** Takings by the hour of the order, oldest first. */
  const byHour = useMemo(() => {
    const buckets = new Map<string, number>();
    for (const order of orders) {
      const hour = new Date(order.createdAt).getHours();
      const key = `${String(hour).padStart(2, "0")}:00`;
      buckets.set(key, (buckets.get(key) ?? 0) + order.totals.totalPaise);
    }
    return [...buckets.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [orders]);

  const max = Math.max(1, ...byHour.map(([, v]) => v));

  const queue = orders
    .filter((o) => ["pending", "accepted", "preparing", "ready"].includes(o.status))
    .slice(0, 6);

  const pending = pendingVerificationItems();
  const liveCampaigns = allCampaigns.filter((c) => c.isActive);

  if (orders.length === 0) {
    return <p style={{ color: "var(--muted)" }}>The sample queue is empty.</p>;
  }

  return (
    <>
      <div className="admin-banner" style={{ marginBottom: 20 }}>
        <span aria-hidden="true">●</span>
        <span>
          These figures come from eight sample orders held in this browser.
          Nothing here is a real sale, and no number on this screen should be
          used to make a business decision until the restaurant is connected
          to a database.
        </span>
      </div>

      <h1 className="admin-title">Today at the counter</h1>
      <p className="admin-note">
        The queue, the takings and the things waiting on the owner.
      </p>

      <div
        className="admin-grid"
        style={{
          gridTemplateColumns: "repeat(4, minmax(0,1fr))",
          marginTop: 20,
        }}
      >
        <div className="admin-card">
          <p className="admin-label">Open orders</p>
          <p className="admin-figure">{stats.open}</p>
        </div>
        <div className="admin-card">
          <p className="admin-label">Takings, sample orders</p>
          <p className="admin-figure">{formatRupees(stats.takings)}</p>
        </div>
        <div className="admin-card">
          <p className="admin-label">Average order</p>
          <p className="admin-figure">{formatRupees(stats.average)}</p>
        </div>
        <div className="admin-card">
          <p className="admin-label">Lines sold</p>
          <p className="admin-figure">{stats.items}</p>
        </div>
      </div>

      <div className="admin-split" style={{ marginTop: 16 }}>
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Takings by hour</h2>
            <span className="admin-label">Sample data</span>
          </div>
          <svg
            viewBox="0 0 320 140"
            role="img"
            aria-label="A bar chart of sample takings by the hour the order was placed"
            style={{ width: "100%", height: 160, marginTop: 12 }}
          >
            {byHour.map(([hour, value], i) => {
              const width = 320 / Math.max(1, byHour.length);
              const h = (value / max) * 100;
              return (
                <g key={hour}>
                  <rect
                    x={i * width + 6}
                    y={120 - h}
                    width={width - 12}
                    height={h}
                    fill="var(--accent)"
                    rx="2"
                  />
                  <text
                    x={i * width + width / 2}
                    y="136"
                    textAnchor="middle"
                    fontSize="10"
                    fill="var(--muted)"
                    fontFamily="var(--font-plex-mono)"
                  >
                    {hour}
                  </text>
                </g>
              );
            })}
            <line x1="0" y1="120" x2="320" y2="120" stroke="var(--line)" />
          </svg>
        </div>

        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>The queue</h2>
            <Link href="/admin/orders" className="admin-btn admin-btn--quiet">
              All orders
            </Link>
          </div>
          <table className="admin-table" style={{ marginTop: 12 }}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Placed</th>
                <th>Status</th>
                <th className="admin-num">Total</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((order) => (
                <tr key={order.id}>
                  <td className="admin-mono">{order.code}</td>
                  <td>{formatTime(order.createdAt)}</td>
                  <td>
                    <span className="admin-pill" style={{ background: "#f1efe9", color: "var(--ink-2)" }}>
                      {STATUS_SHORT[order.status]}
                    </span>
                  </td>
                  <td className="admin-num">{formatRupees(order.totals.totalPaise)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-split" style={{ marginTop: 16 }}>
        <div className="admin-card">
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
            Waiting on the owner
          </h2>
          <p className="admin-note" style={{ marginTop: 4 }}>
            {pending.length} menu lines carry a price that has not been
            confirmed by the restaurant.
          </p>
          <ul style={{ margin: "14px 0 0", padding: 0, listStyle: "none" }}>
            {pending.slice(0, 6).map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "9px 0",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <span>{item.name}</span>
                <span className="admin-mono" style={{ color: "var(--muted)" }}>
                  {formatRupees(item.pricePaise)}
                </span>
              </li>
            ))}
          </ul>
          <Link href="/admin/menu" className="admin-btn admin-btn--quiet" style={{ marginTop: 14 }}>
            Open the menu manager
          </Link>
        </div>

        <div className="admin-card">
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Campaigns</h2>
          <p className="admin-note" style={{ marginTop: 4 }}>
            {liveCampaigns.length} of {allCampaigns.length} campaigns are marked
            live. Every one carries the artwork the restaurant published.
          </p>
          <ul style={{ margin: "14px 0 0", padding: 0, listStyle: "none" }}>
            {liveCampaigns.map((campaign) => (
              <li
                key={campaign.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "9px 0",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <span>{campaign.name}</span>
                <span
                  className="admin-pill"
                  style={{
                    background: campaign.needsVerification ? "#fdf1e8" : "#eef3ee",
                    color: campaign.needsVerification ? "#6b2f08" : "#2f5d38",
                  }}
                >
                  {campaign.needsVerification ? "To confirm" : "Confirmed"}
                </span>
              </li>
            ))}
          </ul>
          <Link href="/admin/campaigns" className="admin-btn admin-btn--quiet" style={{ marginTop: 14 }}>
            Manage campaigns
          </Link>
        </div>
      </div>

      <p className="admin-note" style={{ marginTop: 20 }}>
        The menu holds {menuItems.length} lines across {new Set(menuItems.map((i) => i.categoryId)).size}{" "}
        categories. Prices are integer paise on the server, read from the
        restaurant&rsquo;s printed boards.
      </p>
    </>
  );
}

export default AdminOverview;
