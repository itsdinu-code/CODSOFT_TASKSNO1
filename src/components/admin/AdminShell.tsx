"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useOrders } from "@/lib/store/orders";
import { DEMO_USER } from "@/lib/auth/roles";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/menu", label: "Menu" },
  { href: "/admin/campaigns", label: "Campaigns" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/audit", label: "Audit log" },
  { href: "/kitchen", label: "Kitchen board" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { orders } = useOrders();
  const [open, setOpen] = useState(false);

  const queue = orders.filter(
    (o) => o.status === "pending" || o.status === "accepted" || o.status === "preparing",
  ).length;

  return (
    <div className="admin-root">
      <div className="admin-shell">
        <aside className="admin-side">
          <div className="admin-side__mark">
            <span aria-hidden="true">CD</span>
            <span>
              <strong style={{ display: "block", fontSize: 14 }}>Chickady&rsquo;s</strong>
              <span style={{ color: "var(--muted)", fontSize: 12 }}>DineDesk</span>
            </span>
          </div>

          <nav className="admin-nav" aria-label="Admin">
            {LINKS.map((link) => {
              const active =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                >
                  <span>{link.label}</span>
                  {link.href === "/admin/orders" && queue > 0 ? (
                    <span className="admin-nav__count">{queue}</span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div style={{ marginTop: "auto", color: "var(--muted)", fontSize: 12 }}>
            <p style={{ margin: 0 }}>Signed in as {DEMO_USER.name}</p>
            <p style={{ margin: "4px 0 0" }}>Role: {DEMO_USER.role}</p>
            <p style={{ margin: "8px 0 0" }}>{DEMO_USER.note}</p>
          </div>
        </aside>

        <div className="admin-canvas">
          <div className="admin-top">
            <button
              type="button"
              className="admin-btn admin-btn--quiet"
              onClick={() => setOpen((v) => !v)}
              style={{ display: "none" }}
              aria-hidden="true"
            >
              Menu
            </button>
            <input
              className="admin-top__search"
              type="search"
              placeholder="Search orders, menu items, customers"
              aria-label="Search"
            />
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>
                Sample data · not a live system
              </span>
              <Link href="/" className="admin-btn admin-btn--quiet">
                View the site
              </Link>
            </div>
          </div>
          <div className="admin-sheet">{children}</div>
        </div>
      </div>

      {open ? (
        <div style={{ position: "fixed", inset: 0, background: "var(--chrome)", zIndex: 50, padding: 20 }}>
          <button
            type="button"
            className="admin-btn admin-btn--quiet"
            onClick={() => setOpen(false)}
            style={{ marginBottom: 16 }}
          >
            Close
          </button>
          <nav className="admin-nav" aria-label="Admin">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}

export default AdminShell;
