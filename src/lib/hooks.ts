"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Small hooks for values that live outside React.
 *
 * They use `useSyncExternalStore` rather than an effect plus `setState`, so
 * the value is correct on the first render and no effect has to fire a
 * cascading render.
 */

/** True when the visitor has asked the system for reduced motion. */
export function useReducedMotion(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** True while the browser believes it is online. */
export function useOnline(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("online", onChange);
    window.addEventListener("offline", onChange);
    return () => {
      window.removeEventListener("online", onChange);
      window.removeEventListener("offline", onChange);
    };
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  );
}

/** True once the component has hydrated in the browser. */
export function useHydrated(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("focus", onChange);
    return () => window.removeEventListener("focus", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/**
 * A clock that ticks on an interval. `getServerSnapshot` returns 0 so the
 * server and the first client render agree; the board then fills in.
 */
export function useClock(intervalMs = 15000): number {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const timer = window.setInterval(onChange, intervalMs);
      return () => window.clearInterval(timer);
    },
    [intervalMs],
  );

  return useSyncExternalStore(
    subscribe,
    () => Date.now(),
    () => 0,
  );
}
