"use client";

import { useSyncExternalStore } from "react";
import { createLocalStore } from "@/lib/store/localStore";
import PulseHeart from "@/components/reactbits/PulseHeart";

/**
 * "Craving it" — the product sheet's personal mark.
 *
 * PulseHeart, theme-matched to the site: a paper-2 pill, the muted ink
 * heart at rest and the board's red once pressed. The list lives in this
 * browser only; nothing is collected, and it does not touch the cart or
 * anywhere else.
 */

const store = createLocalStore<string[]>("cd:cravings", []);

export function CraveButton({ itemId, itemName }: { itemId: string; itemName: string }) {
  const list = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const liked = list.includes(itemId);

  function handleChange(pressed: boolean) {
    store.set(pressed ? [...list, itemId] : list.filter((id) => id !== itemId));
  }

  return (
    <div className="flex items-center gap-3">
      <PulseHeart
        liked={liked}
        onChange={handleChange}
        showCount={false}
        icon="heart"
        idleOutline
        size={36}
        corner={30}
        likedColor="#e51b23"
        idleColor="#5c4a3e"
        pillColor="#f7e3bd"
        textColor="#171310"
        label={`Mark ${itemName} as a craving`}
      />
      <span className="hidden t-small text-muted sm:inline">Marked for this browser only</span>
    </div>
  );
}

export default CraveButton;
