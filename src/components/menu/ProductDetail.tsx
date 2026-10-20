"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/store/cart";
import { formatRupees } from "@/lib/format";
import { unitPriceFor } from "@/lib/pricing";
import { categoryById } from "@/lib/menu/queries";
import { CraveButton } from "./CraveButton";
import type { MenuItem } from "@/types";

/**
 * The product sheet: the dish, the price, the choices the board allows, and
 * a quantity. Nothing is added that the shop has not printed.
 */
export function ProductDetail({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selected, setSelected] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {};
    for (const group of item.modifiers ?? []) {
      const preset = group.options.find((o) => o.isDefault) ?? group.options[0];
      initial[group.id] = group.required && preset ? [preset.id] : [];
    }
    return initial;
  });

  const chosen = useMemo(
    () =>
      (item.modifiers ?? []).flatMap((group) =>
        (selected[group.id] ?? []).map((optionId) => {
          const option = group.options.find((o) => o.id === optionId)!;
          return {
            groupId: group.id,
            groupName: group.name,
            optionId: option.id,
            name: option.name,
            pricePaise: option.pricePaise,
          };
        }),
      ),
    [item, selected],
  );

  const unitPrice = unitPriceFor(item, chosen);
  const total = unitPrice * quantity;
  const category = categoryById.get(item.categoryId);

  function toggle(groupId: string, optionId: string, max: number, required: boolean) {
    setSelected((current) => {
      const list = current[groupId] ?? [];
      if (list.includes(optionId)) {
        if (required && list.length === 1) return current;
        return { ...current, [groupId]: list.filter((id) => id !== optionId) };
      }
      if (max === 1) return { ...current, [groupId]: [optionId] };
      return { ...current, [groupId]: [...list, optionId].slice(0, max) };
    });
  }

  function handleAdd() {
    add(item, chosen, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      {/* the print */}
      <div>
        {item.imageUrl ? (
                    <img
            src={item.imageUrl}
            alt={`${item.name} from Chickady's printed menu board.`}
            width={720}
            height={540}
            className="w-full object-cover"
          />
        ) : (
          <div className="flex aspect-4/3 w-full flex-col bg-paper-2">
            <div className="h-2 w-24 bg-accent" aria-hidden="true" />
            <div className="flex flex-1 flex-col justify-between p-6">
              <span className="display t-head text-ink">{item.name}</span>
              <span className="t-body text-muted">
                No photograph of this dish has been supplied yet. The owner
                still owes one.
              </span>
            </div>
          </div>
        )}
        <p className="mt-3 t-body text-muted">
          {category?.boardHeading} · {item.source === "printed-menu-board" || item.source === "printed-combo-board"
            ? "read from the printed board"
            : "from a public delivery listing"}
        </p>
      </div>

      {/* the sheet */}
      <div>
        <nav aria-label="Breadcrumb" className="t-body text-muted">
          <Link href="/menu" className="underline underline-offset-4 hover:text-accent-deep">
            Menu
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{category?.name}</span>
        </nav>

        <h1 className="display mt-4 t-display text-ink">
          {item.name}
        </h1>

        <p className="tabular mt-3 t-lead font-semibold text-ink">
          {formatRupees(unitPrice)}
          {quantity > 1 ? ` · ${formatRupees(total)} for ${quantity}` : ""}
        </p>

        {item.description ? (
          <p className="mt-4 max-w-[54ch] text-ink-2">{item.description}</p>
        ) : null}

        <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 t-body">
          {item.portion ? (
            <div>
              <dt className="inline text-muted">Portion: </dt>
              <dd className="inline text-ink">{item.portion}</dd>
            </div>
          ) : null}
          <div>
            <dt className="inline text-muted">Veg: </dt>
            <dd className="inline text-ink">
              {item.dietary === "veg"
                ? "Marked vegetarian"
                : item.dietary === "non-veg"
                  ? "Non-vegetarian"
                  : "Not marked on the board"}
            </dd>
          </div>
          {item.heat ? (
            <div>
              <dt className="inline text-muted">Heat: </dt>
              <dd className="inline text-ink">
                {item.heat} of 3, as printed on the board
              </dd>
            </div>
          ) : null}
        </dl>

        {item.verification === "pending" ? (
          <p className="mt-5 bg-paper-2 p-4 t-body text-ink">
            This price comes from a public delivery listing captured on 19
            October 2026. The restaurant has not confirmed it yet.
          </p>
        ) : null}

        {!item.isAvailable ? (
          <p className="mt-5 bg-ink p-4 t-body text-cream">
            This item is not available to order right now.
            {item.unavailableNote ? ` ${item.unavailableNote}` : ""}
          </p>
        ) : null}

        {/* modifiers */}
        {(item.modifiers ?? []).map((group) => (
          <fieldset key={group.id} className="mt-7">
            <legend className="display-wide t-body text-ink">
              {group.name}
              {group.required ? <span className="text-muted"> · required</span> : null}
            </legend>
            <div className="mt-3 grid gap-2">
              {group.options.map((option) => {
                const checked = (selected[group.id] ?? []).includes(option.id);
                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center justify-between gap-4 px-4 py-3 ${
                      checked ? "bg-accent text-ink" : "bg-paper-2 text-ink hover:bg-paper-3"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type={group.maxSelections === 1 ? "radio" : "checkbox"}
                        name={group.id}
                        checked={checked}
                        onChange={() =>
                          toggle(group.id, option.id, group.maxSelections, group.required)
                        }
                        className="h-4 w-4 accent-[#171310]"
                      />
                      <span>{option.name}</span>
                    </span>
                    <span className="tabular t-body">
                      {group.priceMode === "absolute"
                        ? formatRupees(option.pricePaise)
                        : `+${formatRupees(option.pricePaise)}`}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}

        {/* quantity and add */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="t-body text-muted">Quantity</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="h-10 w-10 rounded-full bg-paper-2 text-lg leading-none text-ink hover:bg-paper-3"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="One fewer"
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="tabular w-8 text-center text-lg" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                className="h-10 w-10 rounded-full bg-paper-2 text-lg leading-none text-ink hover:bg-paper-3"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                aria-label="One more"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            className="btn"
            onClick={handleAdd}
            disabled={!item.isAvailable}
            aria-disabled={!item.isAvailable}
          >
            {!item.isAvailable ? "Sold out" : added ? "Added to cart" : `Add — ${formatRupees(total)}`}
          </button>

          <Link
            href="/cart"
            className="text-ink underline decoration-2 underline-offset-4 hover:text-accent-deep"
          >
            Go to the cart
          </Link>
        </div>

        <div className="mt-5">
          <CraveButton itemId={item.id} itemName={item.name} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
