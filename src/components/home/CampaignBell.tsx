"use client";

import { useSyncExternalStore } from "react";
import { createLocalStore } from "@/lib/store/localStore";
import BellToggle from "@/components/reactbits/BellToggle";

/**
 * The "tell me when it's back" bell on a campaign card whose price or stock
 * the owner has not confirmed yet.
 *
 * Honest by construction: the preference is stored in this browser only (it
 * is a prototype demo, no notifications are sent anywhere), and the caption
 * below the bell says exactly that.
 */

const store = createLocalStore<string[]>("cd:notify-campaigns", []);

export function CampaignBell({ campaignId, headline }: { campaignId: string; headline: string }) {
  const list = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const on = list.includes(campaignId);

  function handleChange(pressed: boolean) {
    store.set(pressed ? [...list, campaignId] : list.filter((id) => id !== campaignId));
  }

  return (
    <div className="mt-4">
      <BellToggle
        offLabel="Notify me when it’s back"
        onLabel="Reminder kept on this device"
        color="#171310"
        background="#f7e3bd"
        onColor="#fff6e6"
        onBackground="#171310"
        size="sm"
        radius={20}
        ringAmplitude={13}
        ringPivot={16}
        count={0}
        badge={false}
        waves
        pressed={on}
        onChange={handleChange}
        label={on ? `Reminder for ${headline}, kept on this device` : `Notify me when ${headline} is back`}
      />
      <p className="mt-2 t-small text-muted">Demo — stays on this device.</p>
    </div>
  );
}

export default CampaignBell;
