"use client";

import { useMemo, useState } from "react";
import { categories, queryMenu } from "@/lib/menu/queries";
import { ProductTile } from "./ProductTile";
import GooeyNav from "@/components/reactbits/GooeyNav";
import type { CategoryId } from "@/types";

/**
 * The menu browser: search by name, filter by category, and show what the
 * board actually says, including the lines that are sold out.
 *
 * The category filter is the gooey navigation — the active pill melts from
 * one section to the next. The set of rails is the printed board's own
 * sections, nothing is added.
 */

const GOOEY_ITEMS = [
  { label: "Everything" },
  ...categories.map((c) => ({ label: c.name })),
];

function indexOfCategory(category: CategoryId | "all"): number {
  if (category === "all") return 0;
  const index = categories.findIndex((c) => c.id === category);
  return index < 0 ? 0 : index + 1;
}

function categoryOfIndex(index: number): CategoryId | "all" {
  return index === 0 ? "all" : (categories[index - 1]?.id ?? "all");
}

export function MenuBrowser({ initialCategory }: { initialCategory?: CategoryId }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">(initialCategory ?? "all");

  const results = useMemo(
    () => queryMenu({ search, category }),
    [search, category],
  );

  const grouped = useMemo(() => {
    const map = new Map<CategoryId, typeof results>();
    for (const item of results) {
      const list = map.get(item.categoryId) ?? [];
      list.push(item);
      map.set(item.categoryId, list);
    }
    return categories
      .filter((c) => map.has(c.id))
      .map((c) => ({ category: c, items: map.get(c.id)! }));
  }, [results]);

  const soldOut = results.filter((r) => !r.isAvailable).length;

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-[var(--margin)] border-b-2 border-ink/10 bg-paper px-[var(--margin)] py-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative lg:max-w-[380px] lg:flex-1">
            <label htmlFor="menu-search" className="visually-hidden">
              Search the menu by dish name
            </label>
            <input
              id="menu-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search burgers, wings, boxes"
              className="h-11 w-full rounded-[10px] border-0 bg-paper-2 px-4 text-ink placeholder:text-muted"
            />
          </div>

          <GooeyNav
            items={GOOEY_ITEMS}
            activeIndex={indexOfCategory(category)}
            onChange={(index) => setCategory(categoryOfIndex(index))}
            theme="light"
            color="#171310"
            activeTextColor="#fff6e6"
            colors={["#f4510b", "#ffc45c"]}
            size="md"
            frame
            particleCount={14}
            spread={52}
            animationTime={560}
            timeVariance={260}
            gooeyness={0.5}
            wobble={0.55}
            hoverEffect
            ariaLabel="Menu categories"
          />
        </div>
      </div>

      <p className="mt-6 t-body text-muted" aria-live="polite">
        {results.length} {results.length === 1 ? "line" : "lines"}
        {search ? ` matching “${search}”` : ""}
        {soldOut > 0 ? ` · ${soldOut} sold out` : ""}
      </p>

      {grouped.length === 0 ? (
        <div className="mt-8 bg-paper-2 p-8 text-center">
          <p className="display-wide t-lead text-ink">
            Nothing on the board matches that
          </p>
          <p className="mt-2 text-ink-2">
            Try a shorter word, or clear the search to see the whole menu.
          </p>
          <button
            type="button"
            className="btn btn-sm mt-5"
            onClick={() => {
              setSearch("");
              setCategory("all");
            }}
          >
            Show everything
          </button>
        </div>
      ) : (
        grouped.map(({ category: group, items }) => (
          <section key={group.id} className="mt-12">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="display t-head text-ink">
                {group.name}
              </h2>
              <p className="max-w-[46ch] t-body text-muted">{group.note}</p>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <ProductTile key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

export default MenuBrowser;
