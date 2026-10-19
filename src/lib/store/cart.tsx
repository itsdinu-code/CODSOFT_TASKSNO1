"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CartLine, MenuItem } from "@/types";
import { computeTotals, unitPriceFor } from "@/lib/pricing";
import { createLocalStore } from "./localStore";
import { useHydrated } from "@/lib/hooks";

const CART_KEY = "chickadys.cart.v1";

const store = createLocalStore<CartLine[]>(CART_KEY, []);

interface CartContextValue {
  lines: CartLine[];
  count: number;
  totals: ReturnType<typeof computeTotals>;
  hydrated: boolean;
  add: (
    item: MenuItem,
    modifiers: CartLine["modifiers"],
    quantity?: number,
    note?: string,
  ) => void;
  setQuantity: (index: number, quantity: number) => void;
  remove: (index: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  const hydrated = useHydrated();

  const add = useCallback(
    (item: MenuItem, modifiers: CartLine["modifiers"], quantity = 1, note?: string) => {
      const unitPricePaise = unitPriceFor(item, modifiers);
      const current = store.getSnapshot();
      const signature = modifiers
        .map((m) => `${m.groupId}:${m.optionId}`)
        .sort()
        .join("|");
      const index = current.findIndex(
        (l) =>
          l.itemId === item.id &&
          l.modifiers.map((m) => `${m.groupId}:${m.optionId}`).sort().join("|") === signature &&
          (l.note ?? "") === (note ?? ""),
      );

      if (index === -1) {
        store.set([
          ...current,
          {
            itemId: item.id,
            slug: item.slug,
            name: item.name,
            unitPricePaise,
            quantity,
            modifiers,
            note,
            imageUrl: item.imageUrl,
            source: item.source,
          },
        ]);
        return;
      }
      const next = [...current];
      next[index] = { ...next[index], quantity: next[index].quantity + quantity };
      store.set(next);
    },
    [],
  );

  const setQuantity = useCallback((index: number, quantity: number) => {
    const current = store.getSnapshot();
    if (quantity <= 0) {
      store.set(current.filter((_, i) => i !== index));
      return;
    }
    const next = [...current];
    next[index] = { ...next[index], quantity: Math.min(20, quantity) };
    store.set(next);
  }, []);

  const remove = useCallback((index: number) => {
    store.set(store.getSnapshot().filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => store.set([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      totals: computeTotals(lines),
      hydrated,
      add,
      setQuantity,
      remove,
      clear,
    }),
    [lines, hydrated, add, setQuantity, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
