import Link from "next/link";
import { itemsByCategory } from "@/lib/menu/queries";
import { formatRupees } from "@/lib/format";
import { restaurant } from "@/lib/restaurant";
import type { CategoryId } from "@/types";

/**
 * "The printed menu sheet."
 *
 * One tall sheet of paper on a contrasting ground, its top and bottom edges
 * cut into shallow scallops, set the way a menu is set: the section name
 * centred, the dish on the left, the price on the right, and nothing else.
 */
const SHEET_GROUPS: { id: CategoryId; heading: string }[] = [
  { id: "burgers", heading: "BURGER" },
  { id: "loaded-fries", heading: "LOADED FRIES" },
  { id: "wings-tenders", heading: "FLAVORED WINGS/TENDERS" },
  { id: "fried-chicken", heading: "FRIED CHICKEN" },
];

export function MenuSheet() {
  return (
    <section className="field-accent section">
      <div className="wrap">
        <div className="scallop-both mx-auto w-full max-w-[680px] bg-paper px-6 py-10 sm:px-12 sm:py-14">
          <h2 className="display reveal text-center t-display text-ink">The menu</h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-center t-body text-muted">
            Set the way the board at the counter is set. Prices read from the
            printed menu on 19 October 2026.
          </p>

          {SHEET_GROUPS.map((group) => {
            const items = itemsByCategory(group.id);
            if (items.length === 0) return null;
            return (
              <div key={group.id} className="mt-11 first:mt-12">
                <h3 className="display-wide text-center t-lead text-accent-deep">
                  {group.heading}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {items.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/menu/${item.slug}`}
                        className="group flex items-baseline gap-4 t-body text-ink hover:text-accent-deep"
                      >
                        <span className="min-w-0 flex-1">
                          {item.name}
                          {item.boardNote ? (
                            <span className="ml-2 align-middle t-small font-semibold uppercase tracking-[0.04em] text-accent-deep">
                              {item.boardNote}
                            </span>
                          ) : null}
                          {item.dietary === "veg" ? (
                            <span
                              className="ml-2 inline-flex h-3.5 w-3.5 items-center justify-center border-2 border-[#1f7a3d] align-middle"
                              aria-label="Vegetarian"
                              role="img"
                            />
                          ) : null}
                        </span>
                        <span className="tabular shrink-0 text-ink group-hover:text-accent-deep">
                          {formatRupees(item.pricePaise)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="mt-12 text-center">
            <p className="t-body text-muted">
              {restaurant.hours[0].days}
              <br />
              <span className="tabular text-ink">
                {restaurant.hours[0].opens} to {restaurant.hours[0].closes}
              </span>
            </p>
            <Link href="/menu" className="btn btn-sm mt-6">
              See every item
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuSheet;

