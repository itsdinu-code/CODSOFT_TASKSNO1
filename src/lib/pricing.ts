import type { CartLine, MenuItem, OrderTotals } from "@/types";
import { getItemById } from "@/lib/menu/queries";

/**
 * Price rules for the prototype.
 *
 * Every total in this file is calculated from the canonical menu, never from
 * a number the browser sent. The server route in `app/api/orders/route.ts`
 * calls the same functions, so a tampered client total is ignored.
 *
 * Taxes, packaging and delivery fees are deliberately zero: the restaurant
 * has not published its rates, and nothing is charged that cannot be
 * explained on a bill.
 */

export interface SelectedOption {
  groupId: string;
  groupName: string;
  optionId: string;
  name: string;
  pricePaise: number;
}

/**
 * The price of one unit of a line, from the menu record and the chosen
 * modifiers. `absolute` groups price the whole line, `additive` groups add.
 */
export function unitPriceFor(
  item: MenuItem,
  selected: { groupId: string; optionId: string; pricePaise: number }[] = [],
): number {
  let price = item.pricePaise ?? 0;

  for (const group of item.modifiers ?? []) {
    const chosen = selected.filter((s) => s.groupId === group.id);
    if (chosen.length === 0) continue;
    if (group.priceMode === "absolute") {
      price = chosen.reduce((sum, s) => sum + s.pricePaise, 0);
    } else {
      price += chosen.reduce((sum, s) => sum + s.pricePaise, 0);
    }
  }

  return price;
}

/** Rebuild a trusted line from the menu, using the ids the client sent. */
export function priceLineFromMenu(
  itemId: string,
  quantity: number,
  modifierIds: { groupId: string; optionId: string }[],
): { item: MenuItem; options: SelectedOption[]; unitPricePaise: number } | null {
  const item = getItemById(itemId);
  if (!item) return null;

  const options: SelectedOption[] = [];
  for (const group of item.modifiers ?? []) {
    for (const picked of modifierIds.filter((m) => m.groupId === group.id)) {
      const option = group.options.find((o) => o.id === picked.optionId);
      if (!option) continue;
      options.push({
        groupId: group.id,
        groupName: group.name,
        optionId: option.id,
        name: option.name,
        pricePaise: option.pricePaise,
      });
    }
  }

  return { item, options, unitPricePaise: unitPriceFor(item, options) };
}

export function computeTotals(lines: CartLine[]): OrderTotals {
  const subtotalPaise = lines.reduce(
    (sum, line) => sum + line.unitPricePaise * line.quantity,
    0,
  );

  // Nothing is discounted, taxed, packaged or delivered until the restaurant
  // confirms those rules. The bill says so on its face.
  const discountsPaise = 0;
  const packagingPaise = 0;
  const taxesPaise = 0;
  const deliveryPaise = 0;

  return {
    subtotalPaise,
    discountsPaise,
    packagingPaise,
    taxesPaise,
    deliveryPaise,
    totalPaise: subtotalPaise - discountsPaise + packagingPaise + taxesPaise + deliveryPaise,
  };
}

export interface CartValidationIssue {
  itemId: string;
  name: string;
  reason: "unavailable" | "missing-modifier" | "unknown-item" | "no-price";
}

/** Server-side checks run before an order is written. */
export function validateCart(
  lines: { itemId: string; quantity: number; modifierIds: { groupId: string; optionId: string }[] }[],
): { issues: CartValidationIssue[]; priced: CartLine[] } {
  const issues: CartValidationIssue[] = [];
  const priced: CartLine[] = [];

  for (const line of lines) {
    const result = priceLineFromMenu(line.itemId, line.quantity, line.modifierIds);
    if (!result) {
      issues.push({
        itemId: line.itemId,
        name: line.itemId,
        reason: "unknown-item",
      });
      continue;
    }

    const { item, options, unitPricePaise } = result;

    if (!item.isAvailable) {
      issues.push({
        itemId: item.id,
        name: item.name,
        reason: "unavailable",
      });
      continue;
    }

    if (item.pricePaise === null) {
      issues.push({ itemId: item.id, name: item.name, reason: "no-price" });
      continue;
    }

    for (const group of item.modifiers ?? []) {
      if (!group.required) continue;
      const chosen = options.filter((o) => o.groupId === group.id);
      if (chosen.length < group.minSelections) {
        issues.push({
          itemId: item.id,
          name: item.name,
          reason: "missing-modifier",
        });
      }
    }

    priced.push({
      itemId: item.id,
      slug: item.slug,
      name: item.name,
      unitPricePaise,
      quantity: Math.max(1, Math.min(20, line.quantity)),
      modifiers: options,
      imageUrl: item.imageUrl,
      source: item.source,
    });
  }

  return { issues, priced };
}
