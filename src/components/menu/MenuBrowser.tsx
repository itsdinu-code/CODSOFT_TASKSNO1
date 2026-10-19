"use client";

import { useMemo, useState } from "react";
import { categories, queryMenu } from "@/lib/menu/queries";
import { ProductTile } from "./ProductTile";
import type { CategoryId } from "@/types";

/**
 * The menu browser: search by name, filter by category, and show what the
 * board actually says, including the lines that are sold out.
 */
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

          <nav aria-label="Menu categories">
            <ul className="no-scrollbar flex gap-2 overflow-x-auto">
              <li>
                <button
                  type="button"
                  onClick={() => setCategory("all")}
                  aria-pressed={category === "all"}
                  className={`h-9 shrink-0 rounded-full px-4 t-body font-medium transition-colors ${
                    category === "all"
                      ? "bg-ink text-cream"
                      : "bg-paper-2 text-ink hover:bg-accent hover:text-ink"
                  }`}
                >
                  Everything
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setCategory(c.id)}
                    aria-pressed={category === c.id}
                    className={`h-9 shrink-0 rounded-full px-4 t-body font-medium transition-colors ${
                      category === c.id
                        ? "bg-ink text-cream"
                        : "bg-paper-2 text-ink hover:bg-accent hover:text-ink"
                    }`}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
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
