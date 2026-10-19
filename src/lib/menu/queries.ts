import { categories, categoryById, menuItems, priceDiscrepancies, unpricedListings } from "./data";
import type { CategoryId, MenuItem } from "@/types";

export { categories, categoryById, menuItems, priceDiscrepancies, unpricedListings };

export function itemsByCategory(categoryId: CategoryId): MenuItem[] {
  return menuItems
    .filter((i) => i.categoryId === categoryId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getItemBySlug(slug: string): MenuItem | undefined {
  return menuItems.find((i) => i.slug === slug);
}

export function getItemById(id: string): MenuItem | undefined {
  return menuItems.find((i) => i.id === id);
}

export function featuredItems(): MenuItem[] {
  return menuItems.filter((i) => i.isFeatured && i.isAvailable);
}

export function itemsInCategoryCount(categoryId: CategoryId): number {
  return menuItems.filter((i) => i.categoryId === categoryId).length;
}

export interface MenuQuery {
  search?: string;
  category?: CategoryId | "all";
  /** When true, only items that can be ordered right now. */
  availableOnly?: boolean;
}

export function queryMenu({ search, category, availableOnly }: MenuQuery): MenuItem[] {
  const term = search?.trim().toLowerCase();
  return menuItems
    .filter((i) => (category && category !== "all" ? i.categoryId === category : true))
    .filter((i) => (availableOnly ? i.isAvailable : true))
    .filter((i) =>
      term
        ? i.name.toLowerCase().includes(term) ||
          (i.description ?? "").toLowerCase().includes(term) ||
          (categoryById.get(i.categoryId)?.name ?? "").toLowerCase().includes(term)
        : true,
    )
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * The lowest price an item can be bought for, used for "from ₹x" labels.
 * Returns null when no price is established.
 */
export function fromPrice(item: MenuItem): number | null {
  if (item.pricePaise === null) return null;
  const group = item.modifiers?.find((m) => m.priceMode === "absolute");
  if (!group) return item.pricePaise;
  const options = group.options.map((o) => o.pricePaise);
  return Math.min(item.pricePaise, ...options);
}

export function maxPrice(item: MenuItem): number | null {
  if (item.pricePaise === null) return null;
  const group = item.modifiers?.find((m) => m.priceMode === "absolute");
  if (!group) return item.pricePaise;
  const options = group.options.map((o) => o.pricePaise);
  return Math.max(item.pricePaise, ...options);
}

/** Items whose price still needs the owner's sign-off. */
export function pendingVerificationItems(): MenuItem[] {
  return menuItems.filter((i) => i.verification === "pending");
}
