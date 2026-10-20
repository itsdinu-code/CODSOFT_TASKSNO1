import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/menu/ProductDetail";
import { getItemBySlug, itemsByCategory, menuItems } from "@/lib/menu/queries";
import { formatRupees } from "@/lib/format";

// This route reads its item from the URL slug, so a navigation may show the
// shared shell before the item data lands. The instant-shell advisory that
// implies otherwise is dev-only noise for a prototype of this size.
export const instant = false;

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) return { title: "Not found" };
  return {
    title: item.name,
    description:
      item.description ??
      `${item.name} on the Chickady's menu${item.pricePaise ? ` — ${formatRupees(item.pricePaise)}` : ""}.`,
    alternates: { canonical: `/menu/${item.slug}` },
    openGraph: {
      title: `${item.name} · Chickady's`,
      description: item.description ?? `On the Chickady's menu in Alappakkam, Chennai.`,
      images: item.imageUrl ? [item.imageUrl] : ["/menu/board-menu.jpg"],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) notFound();

  const siblings = itemsByCategory(item.categoryId)
    .filter((i) => i.id !== item.id)
    .slice(0, 4);

  return (
    <>
      <section className="field-paper section">
        <div className="wrap">
          <ProductDetail item={item} />
        </div>
      </section>

      {siblings.length > 0 ? (
        <section className="field-paper2 section">
          <div className="wrap">
            <h2 className="display t-head text-ink">
              More from this section
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {siblings.map((sibling) => (
                <li key={sibling.id} className="bg-paper p-4">
                  <Link
                    href={`/menu/${sibling.slug}`}
                    className="display-wide t-body text-ink hover:text-accent-deep"
                  >
                    {sibling.name}
                  </Link>
                  <p className="tabular mt-1 t-body text-muted">
                    {formatRupees(sibling.pricePaise)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
