"use client";

import { useMemo, useState } from "react";
import { categories, menuItems, priceDiscrepancies } from "@/lib/menu/queries";
import { formatRupees } from "@/lib/format";
import type { MenuItem } from "@/types";

interface PriceChange {
  at: string;
  item: string;
  from: number | null;
  to: number | null;
  by: string;
  note: string;
}

/**
 * The menu manager.
 *
 * Availability can be toggled here, and a price can be edited — but the edit
 * is recorded in an audit list and it does not change the canonical menu,
 * because the canonical menu is the restaurant's printed board and only the
 * owner can change that.
 */
export function AdminMenu() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [unavailable, setUnavailable] = useState<Record<string, boolean>>({});
  const [history, setHistory] = useState<PriceChange[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const rows = useMemo(
    () =>
      menuItems.filter(
        (item) =>
          (category === "all" || item.categoryId === category) &&
          item.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query, category],
  );

  function isUnavailable(item: MenuItem) {
    return unavailable[item.id] ?? !item.isAvailable;
  }

  function savePrice(item: MenuItem) {
    const to = Math.round(parseFloat(draft) * 100);
    if (Number.isNaN(to) || to < 0) return;
    setHistory((current) => [
      {
        at: new Date().toISOString(),
        item: item.name,
        from: item.pricePaise,
        to,
        by: "Demo owner",
        note: "Recorded in the prototype only. The printed board is unchanged.",
      },
      ...current,
    ]);
    setEditing(null);
  }

  return (
    <>
      <h1 className="admin-title">Menu</h1>
      <p className="admin-note">
        {menuItems.length} lines, read from the restaurant&rsquo;s printed menu
        and fried-chicken boards on 19 October 2026. Prices are integer paise
        on the server; rupees here. Every price change is written to the audit
        list.
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
        <input
          className="admin-field"
          style={{ maxWidth: 280 }}
          type="search"
          placeholder="Search dishes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search dishes"
        />
        <select
          className="admin-field"
          style={{ maxWidth: 220 }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">Every category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-card" style={{ marginTop: 16, padding: 0, overflow: "hidden" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ padding: "14px 0 8px" }}>Dish</th>
              <th style={{ padding: "14px 0 8px" }}>Category</th>
              <th className="admin-num" style={{ padding: "14px 0 8px" }}>
                Price
              </th>
              <th style={{ padding: "14px 0 8px" }}>Source</th>
              <th style={{ padding: "14px 0 8px" }}>Available</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.name}
                  {item.verification === "pending" ? (
                    <span
                      className="admin-pill"
                      style={{ background: "#fdf1e8", color: "#6b2f08", marginLeft: 8 }}
                    >
                      To confirm
                    </span>
                  ) : null}
                </td>
                <td style={{ color: "var(--muted)" }}>
                  {categories.find((c) => c.id === item.categoryId)?.name}
                </td>
                <td className="admin-num">
                  {editing === item.id ? (
                    <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                      <input
                        className="admin-field admin-mono"
                        style={{ width: 92, height: 32 }}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        aria-label={`New price for ${item.name} in rupees`}
                        autoFocus
                      />
                      <button
                        type="button"
                        className="admin-btn"
                        style={{ height: 32 }}
                        onClick={() => savePrice(item)}
                      >
                        Save
                      </button>
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="admin-mono admin-btn admin-btn--quiet"
                      style={{ height: 30, padding: "0 10px" }}
                      onClick={() => {
                        setEditing(item.id);
                        setDraft(
                          item.pricePaise === null ? "" : String(item.pricePaise / 100),
                        );
                      }}
                    >
                      {formatRupees(item.pricePaise)}
                    </button>
                  )}
                </td>
                <td style={{ color: "var(--muted)", fontSize: 12 }}>
                  {item.source === "printed-menu-board"
                    ? "Printed board"
                    : item.source === "printed-combo-board"
                      ? "Combo board"
                      : "Public listing"}
                  <br />
                  {item.lastVerifiedAt}
                </td>
                <td>
                  <button
                    type="button"
                    className="admin-switch"
                    role="switch"
                    aria-checked={!isUnavailable(item)}
                    aria-label={`${item.name} available`}
                    onClick={() =>
                      setUnavailable((current) => ({
                        ...current,
                        [item.id]: !isUnavailable(item),
                      }))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <p style={{ padding: "20px 0", color: "var(--muted)" }}>No dish matches that.</p>
        ) : null}
      </div>

      <div className="admin-split" style={{ marginTop: 16 }}>
        <div className="admin-card">
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Price history</h2>
          <p className="admin-note" style={{ marginTop: 4 }}>
            {history.length === 0
              ? "No price has been changed in this session."
              : "Changes made in this session."}
          </p>
          <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none" }}>
            {history.map((change, i) => (
              <li
                key={i}
                style={{
                  padding: "9px 0",
                  borderTop: "1px solid var(--line)",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span>{change.item}</span>
                <span className="admin-mono">
                  {formatRupees(change.from)} → {formatRupees(change.to)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="admin-card">
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
            Where the board and the listing disagree
          </h2>
          <p className="admin-note" style={{ marginTop: 4 }}>
            The printed board is what the shop sells, so that is what the
            storefront shows. These differences need an owner&rsquo;s decision.
          </p>
          <table className="admin-table" style={{ marginTop: 12 }}>
            <thead>
              <tr>
                <th>Item</th>
                <th className="admin-num">Board</th>
                <th className="admin-num">Listing</th>
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
      </div>
    </>
  );
}

export default AdminMenu;
