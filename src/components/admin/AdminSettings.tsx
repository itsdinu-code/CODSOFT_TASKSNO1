"use client";

import { useState } from "react";
import { restaurant } from "@/lib/restaurant";
import { ROLES, PERMISSIONS } from "@/lib/auth/roles";

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/**
 * Restaurant settings.
 *
 * Everything on this screen that is not confirmed by the owner is marked as
 * it is here, because these are the values the site publishes.
 */
export function AdminSettings() {
  const [hours, setHours] = useState<{ open: string; close: string }[]>(() =>
    WEEK.map(() => ({ open: restaurant.hours[0].opens, close: restaurant.hours[0].closes })),
  );
  const [closed, setClosed] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);

  return (
    <>
      <h1 className="admin-title">Settings</h1>
      <p className="admin-note">
        The values the site publishes. The address, phone and hours are read
        from public listings and are marked until the owner confirms them.
      </p>

      <div style={{ marginTop: 22 }}>
        <div className="admin-card">
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Opening hours</h2>
          <p className="admin-note" style={{ marginTop: 4 }}>
            {restaurant.hoursNote}
          </p>
          <table className="admin-table" style={{ marginTop: 14 }}>
            <thead>
              <tr>
                <th>Day</th>
                <th>Opens</th>
                <th>Closes</th>
                <th>Closed</th>
              </tr>
            </thead>
            <tbody>
              {hours.map((row, i) => (
                <tr key={WEEK[i]}>
                  <td style={{ width: 120 }}>{WEEK[i]}</td>
                  <td>
                    <input
                      className="admin-field admin-mono"
                      style={{ width: 110, height: 34 }}
                      value={row.open}
                      onChange={(e) =>
                        setHours((current) =>
                          current.map((r, j) =>
                            j === i ? { ...r, open: e.target.value } : r,
                          ),
                        )
                      }
                      aria-label={`${WEEK[i]} opening time`}
                    />
                  </td>
                  <td>
                    <input
                      className="admin-field admin-mono"
                      style={{ width: 110, height: 34 }}
                      value={row.close}
                      onChange={(e) =>
                        setHours((current) =>
                          current.map((r, j) =>
                            j === i ? { ...r, close: e.target.value } : r,
                          ),
                        )
                      }
                      aria-label={`${WEEK[i]} closing time`}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="admin-switch"
                      role="switch"
                      aria-checked={!closed[WEEK[i]]}
                      aria-label={`${WEEK[i]} open`}
                      onClick={() =>
                        setClosed((current) => ({
                          ...current,
                          [WEEK[i]]: !current[WEEK[i]],
                        }))
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="admin-btn"
            style={{ marginTop: 16 }}
            onClick={() => {
              setSaved(true);
              window.setTimeout(() => setSaved(false), 2000);
            }}
          >
            {saved ? "Saved in this browser" : "Save hours"}
          </button>
        </div>

        <div className="admin-split" style={{ marginTop: 16 }}>
          <div className="admin-card">
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Business details</h2>
            <dl style={{ margin: "14px 0 0", display: "grid", gap: 12 }}>
              <div>
                <dt className="admin-label">Address</dt>
                <dd style={{ margin: "3px 0 0" }}>
                  {restaurant.streetAddress}, {restaurant.area}, {restaurant.locality},{" "}
                  {restaurant.city} {restaurant.postalCode}
                  <span
                    className="admin-pill"
                    style={{ background: "#fdf1e8", color: "#6b2f08", marginLeft: 8 }}
                  >
                    To confirm
                  </span>
                </dd>
              </div>
              <div>
                <dt className="admin-label">Phone</dt>
                <dd style={{ margin: "3px 0 0" }}>{restaurant.phone}</dd>
              </div>
              <div>
                <dt className="admin-label">FSSAI licence</dt>
                <dd style={{ margin: "3px 0 0", color: "var(--muted)" }}>
                  {restaurant.fssai ?? "Not supplied — it must be displayed at the outlet and on invoices."}
                </dd>
              </div>
              <div>
                <dt className="admin-label">Support email</dt>
                <dd style={{ margin: "3px 0 0", color: "var(--muted)" }}>
                  {restaurant.email ?? "None published yet."}
                </dd>
              </div>
              <div>
                <dt className="admin-label">Order types</dt>
                <dd style={{ margin: "3px 0 0" }}>{restaurant.fulfilment.note}</dd>
              </div>
            </dl>
          </div>

          <div className="admin-card">
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Staff and permissions</h2>
            <p className="admin-note" style={{ marginTop: 4 }}>
              The permission table the production system should enforce. The
              prototype does not authenticate anybody.
            </p>
            <table className="admin-table" style={{ marginTop: 12 }}>
              <thead>
                <tr>
                  <th>Permission</th>
                  {ROLES.map((role) => (
                    <th key={role.id} className="admin-num" title={role.blurb}>
                      {role.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERMISSIONS.map((permission) => (
                  <tr key={permission.id}>
                    <td>{permission.label}</td>
                    {ROLES.map((role) => (
                      <td key={role.id} className="admin-num">
                        {permission.roles.includes(role.id) ? "✓" : "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSettings;
