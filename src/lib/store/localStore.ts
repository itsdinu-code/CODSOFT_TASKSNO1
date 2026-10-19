"use client";

/**
 * A tiny external store backed by `localStorage`.
 *
 * React 19 reads it with `useSyncExternalStore`, so the server render and
 * the first client render agree (the server snapshot is empty), and there
 * is no effect that fires a cascading render to "hydrate" the state.
 *
 * This is prototype storage. A production build keeps the cart in a cookie
 * or a server-side session and the orders in Postgres.
 */

export interface LocalStore<T> {
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  subscribe: (onChange: () => void) => () => void;
  set: (value: T) => void;
  reset: () => void;
  ready: () => boolean;
}

export function createLocalStore<T>(
  key: string,
  serverValue: T,
  clientFallback?: () => T,
): LocalStore<T> {
  const listeners = new Set<() => void>();
  let cache: T | null = null;
  let hasCache = false;
  let fallback: T | null = null;

  function read(): T {
    if (hasCache) return cache as T;
    if (typeof window === "undefined") {
      cache = serverValue;
      hasCache = true;
      return cache as T;
    }
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        cache = JSON.parse(raw) as T;
      } else if (clientFallback) {
        if (fallback === null) fallback = clientFallback();
        cache = fallback;
      } else {
        cache = serverValue;
      }
    } catch {
      cache = serverValue;
    }
    hasCache = true;
    return cache as T;
  }

  function notify() {
    for (const listener of listeners) listener();
  }

  return {
    getSnapshot: read,
    getServerSnapshot: () => serverValue,
    subscribe: (onChange) => {
      listeners.add(onChange);
      const onStorage = (event: StorageEvent) => {
        if (event.key === null || event.key === key) {
          hasCache = false;
          onChange();
        }
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(onChange);
        window.removeEventListener("storage", onStorage);
      };
    },
    set: (value: T) => {
      cache = value;
      hasCache = true;
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* storage full or blocked — the session still works in memory */
      }
      notify();
    },
    reset: () => {
      cache = serverValue;
      hasCache = true;
      try {
        window.localStorage.removeItem(key);
      } catch {
        /* ignore */
      }
      notify();
    },
    ready: () => hasCache,
  };
}
