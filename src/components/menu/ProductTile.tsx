"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/store/cart";
import { formatRupees } from "@/lib/format";
import { fromPrice } from "@/lib/menu/queries";
import { DishArt } from "./DishArt";
import type { MenuItem } from "@/types";

/**
 * A product tile, set the way the printed board sets a line: the name, the
 * price on the same baseline, and a rule of colour above it. Some tiles
 * carry the photograph we hold; the ones without are honest about it rather
 * than borrowing a picture of something else.
 */
export function ProductTile({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const from = fromPrice(item);

  function handleAdd() {
    const modifiers = (item.modifiers ?? [])
      .filter((group) => group.required)
      .flatMap((group) => {
        const option = group.options.find((o) => o.isDefault) ?? group.options[0];
        return option
          ? [
              {
                groupId: group.id,
                groupName: group.name,
                optionId: option.id,
                name: option.name,
                pricePaise: option.pricePaise,
              },
            ]
          : [];
      });
    add(item, modifiers, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  const soldOut = !item.isAvailable;

  return (
    <article className="flex h-full flex-col bg-paper">
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={
            item.imageUrl.startsWith("/food/")
              ? `${item.name}, from the restaurant's own food photographs.`
              : `${item.name} from Chickady's printed menu board.`
          }
          loading="lazy"
          className="aspect-4/3 w-full object-cover"
        />
      ) : item.art ? (
        <DishArt kind={item.art} className="shrink-0" />
      ) : (
        <div className="aspect-4/3 w-full bg-paper-2" />
      )}
      <div className="h-1.5 w-14 bg-accent" aria-hidden="true" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="display-wide t-lead leading-tight text-ink">
            <Link href={`/menu/${item.slug}`} className="hover:text-accent-deep">
              {item.name}
            </Link>
          </h3>
          <p className="tabular shrink-0 t-body font-semibold text-ink">
            {formatRupees(item.pricePaise)}
          </p>
        </div>

        <p className="mt-1.5 t-body text-muted">
          {item.portion ? `${item.portion} · ` : ""}
          {item.modifiers?.find((g) => g.priceMode === "absolute")
            ? `from ${formatRupees(from)}`
            : ""}
          {item.boardNote ? ` · ${item.boardNote}` : ""}
        </p>

        {item.description ? (
          <p className="mt-3 t-body leading-snug text-ink-2">{item.description}</p>
        ) : null}

        {item.verification === "pending" ? (
          <p className="mt-3 t-small leading-snug text-accent-deep">
            Price from a listing, not yet confirmed by the shop.
          </p>
        ) : null}

        <div className="mt-auto flex items-center gap-3 pt-5">
          <button
            type="button"
            className="btn btn-sm"
            onClick={handleAdd}
            disabled={soldOut}
            aria-disabled={soldOut}
          >
            {soldOut ? "Sold out" : added ? "Added" : "Add"}
          </button>
          <Link
            href={`/menu/${item.slug}`}
            className="t-body text-ink underline decoration-2 underline-offset-4 hover:text-accent-deep"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductTile;
