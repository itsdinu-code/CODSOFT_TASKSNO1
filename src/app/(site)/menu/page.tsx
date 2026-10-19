import type { Metadata } from "next";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { categories } from "@/lib/menu/queries";
import type { CategoryId } from "@/types";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The full Chickady's menu: burgers, loaded fries, nachos, wings and tenders, quick bites, fried chicken, meal boxes, dips and beverages. Prices as printed on the board.",
  alternates: { canonical: "/menu" },
};

const VALID = new Set(categories.map((c) => c.id as string));

// The category filter arrives in the query string, so this page is rendered
// per request rather than prerendered.
export const instant = false;

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const requested = params.category;
  const initialCategory =
    requested && VALID.has(requested) ? (requested as CategoryId) : undefined;

  return (
    <>
      <section className="field-accent">
        <div className="wrap grid12 items-end gap-y-8 py-12 sm:py-16">
          <div className="col-span-12 lg:col-span-7">
            <h1 className="display t-display text-ink">
              The menu
            </h1>
            <p className="mt-4 max-w-[52ch] text-ink">
              Every line on the board at the counter, in one place. Search it,
              filter it, and build a box.
            </p>
          </div>
          <figure className="col-span-12 m-0 lg:col-span-4 lg:col-start-9">
                        <img
              src="/menu/board-menu.jpg"
              alt="Chickady's printed menu board in orange and cream, with the burgers, loaded fries, nachos, wings, quick bites and fried chicken sections and their prices."
              width={720}
              height={540}
              className="w-full object-cover"
            />
          </figure>
        </div>
      </section>

      <section className="field-paper section">
        <div className="wrap">
          <MenuBrowser initialCategory={initialCategory} />
          <p className="mt-14 border-t-2 border-ink/15 pt-6 t-body text-muted">
            Prices were read from Chickady&rsquo;s printed menu and fried-chicken
            boards on 19 October 2026. Lines marked “not yet confirmed” come from
            a public delivery listing and have not been approved by the shop.
          </p>
        </div>
      </section>
    </>
  );
}
