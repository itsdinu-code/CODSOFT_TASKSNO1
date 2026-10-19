"use client";

import { useState } from "react";
import { allCampaigns } from "@/lib/campaigns";
import { formatDate } from "@/lib/format";

/**
 * Campaign management.
 *
 * A campaign carries its own artwork, its dates and the products it points
 * at. A campaign whose dates have passed is never left marked as live, and a
 * campaign whose price or stock the owner has not confirmed says so on the
 * card.
 */
export function AdminCampaigns() {
  const [live, setLive] = useState<Record<string, boolean>>(
    Object.fromEntries(allCampaigns.map((c) => [c.id, c.isActive])),
  );
  const [confirm, setConfirm] = useState<Record<string, boolean>>(
    Object.fromEntries(allCampaigns.map((c) => [c.id, !c.needsVerification])),
  );

  return (
    <>
      <h1 className="admin-title">Campaigns</h1>
      <p className="admin-note">
        Every campaign uses artwork the restaurant published itself. Turning a
        campaign on makes it appear in the carousel on the home page; turning
        it off takes it down. A campaign that needs a price, a stock count or a
        date confirming is marked so, and its card says so on the site.
      </p>

      <div className="admin-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0,1fr))", marginTop: 20 }}>
        {allCampaigns.map((campaign) => (
          <article key={campaign.id} className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
            <div
              style={{
                height: 150,
                background: campaign.theme === "black-red" ? "#090909" : "#f4510b",
                display: "grid",
                placeItems: "center",
              }}
            >
              <img
                src={campaign.artwork}
                alt={campaign.artworkAlt}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: 18 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{campaign.name}</h2>
              <p className="admin-note" style={{ marginTop: 4 }}>
                {campaign.body}
              </p>

              <dl style={{ margin: "14px 0 0", display: "grid", gap: 6, fontSize: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <dt style={{ color: "var(--muted)" }}>Starts</dt>
                  <dd style={{ margin: 0 }}>
                    {campaign.startsAt ? formatDate(campaign.startsAt) : "Not set"}
                  </dd>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <dt style={{ color: "var(--muted)" }}>Ends</dt>
                  <dd style={{ margin: 0 }}>
                    {campaign.endsAt ? formatDate(campaign.endsAt) : "No end date"}
                  </dd>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <dt style={{ color: "var(--muted)" }}>Linked products</dt>
                  <dd style={{ margin: 0 }}>
                    {campaign.linkedItemIds.length === 0
                      ? "None"
                      : campaign.linkedItemIds.join(", ")}
                  </dd>
                </div>
              </dl>

              <div
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                  marginTop: 16,
                  paddingTop: 14,
                  borderTop: "1px solid var(--line)",
                }}
              >
                <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
                  <button
                    type="button"
                    className="admin-switch"
                    role="switch"
                    aria-checked={live[campaign.id]}
                    aria-label={`${campaign.name} live`}
                    onClick={() =>
                      setLive((current) => ({
                        ...current,
                        [campaign.id]: !current[campaign.id],
                      }))
                    }
                  />
                  Live
                </label>
                <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
                  <button
                    type="button"
                    className="admin-switch"
                    role="switch"
                    aria-checked={confirm[campaign.id]}
                    aria-label={`${campaign.name} confirmed by the owner`}
                    onClick={() =>
                      setConfirm((current) => ({
                        ...current,
                        [campaign.id]: !current[campaign.id],
                      }))
                    }
                  />
                  Owner confirmed
                </label>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default AdminCampaigns;
