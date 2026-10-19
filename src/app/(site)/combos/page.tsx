import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Prose, ProseSection } from "@/components/site/Prose";
import { Combos } from "@/components/home/Combos";
import { itemsByCategory } from "@/lib/menu/queries";
import { formatRupees } from "@/lib/format";

export const metadata: Metadata = {
  title: "Meal boxes",
  description:
    "The Chickady's sharing boxes: Solid Treat, All Drumsticks, Loaded Fries, Big 8, Ultimate Savings Meal, Friendship Meal Box and Triple Treat Meal Box.",
  alternates: { canonical: "/combos" },
};

export default function CombosPage() {
  const boxes = itemsByCategory("combos");

  return (
    <>
      <PageHeader
        title="Meal boxes"
        lede="The fried-chicken board behind the counter, with everything that is in each box and what it costs."
      >
                <img
          src="/campaigns/board-fried-chicken.jpg"
          alt="Chickady's printed fried-chicken board in cream and orange, with photographs of red boxes of fried chicken, wings and meal boxes."
          width={482}
          height={425}
          className="w-full object-cover"
        />
      </PageHeader>

      <Combos />

      <Prose>
        <ProseSection title="Every box, with its contents">
          <ul className="divide-y-2 divide-ink/10">
            {boxes.map((box) => (
              <li key={box.id} className="flex flex-wrap items-baseline justify-between gap-3 py-4">
                <Link
                  href={`/menu/${box.slug}`}
                  className="display-wide t-body text-ink hover:text-accent-deep"
                >
                  {box.name}
                </Link>
                <span className="min-w-0 flex-1 t-body text-muted">
                  {box.description ?? ""}
                </span>
                <span className="tabular shrink-0 font-semibold text-ink">
                  {formatRupees(box.pricePaise)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 t-body text-muted">
            Contents and prices are as printed on the fried-chicken board on 19
            October 2026. The owner should confirm the current sheet before this
            page is published.
          </p>
        </ProseSection>
      </Prose>
    </>
  );
}
