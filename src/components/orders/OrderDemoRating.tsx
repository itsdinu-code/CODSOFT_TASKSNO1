"use client";

import { useMemo } from "react";
import { useSyncExternalStore } from "react";
import { createLocalStore } from "@/lib/store/localStore";
import PeekRating from "@/components/reactbits/PeekRating";

/**
 * The demo order rating, shown once an order has completed.
 *
 * PeekRating drives the interaction. Values are kept per order in this
 * browser only — this website does not collect, publish or export
 * ratings of any kind, and the caption says so.
 */

const LABELS = ["Poor", "Fair", "Good", "Great", "Superb"];

export function OrderDemoRating({ code }: { code: string }) {
  // One store per order code, so each simulated ticket keeps its own note.
  const store = useMemo(
    () => createLocalStore<number>(`cd:order-rating:${code}`, 0),
    [code],
  );
  const value = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);

  return (
    <div className="mt-5 border-t-2 border-ink/20 pt-4">
      <p className="display-wide t-body text-ink">How was this simulation?</p>
      <div className="mt-2">
        <PeekRating
          value={value || undefined}
          count={5}
          shape="star"
          labels={LABELS}
          activeColor="#fff6e6"
          idleColor="#35150e"
          tipColor="#171310"
          tipTextColor="#fff6e6"
          size={30}
          lift={8}
          magnify={1.22}
          popScale={1.35}
          showTip
          ariaLabel="Rate this simulated order"
          onChange={(next) => store.set(next)}
        />
      </div>
      {value > 0 ? (
        <p className="mt-1 t-small text-ink" aria-live="polite">
          Kept: {value} of 5, {LABELS[value - 1]}. Saved in this browser only —
          this site never publishes ratings.
        </p>
      ) : (
        <p className="mt-1 t-small text-ink">
          A prototype-only rating — saved in this browser, never published.
        </p>
      )}
    </div>
  );
}

export default OrderDemoRating;
