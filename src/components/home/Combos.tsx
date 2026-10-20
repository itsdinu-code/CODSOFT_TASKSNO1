import Link from "next/link";
import { itemsByCategory } from "@/lib/menu/queries";
import { formatRupees } from "@/lib/format";
import Image from "next/image";

/**
 * "Prices like a menu."
 *
 * The name on the left, the price on the right, the space between them doing
 * the work. No leaders, no lines, no dots â€” the way a good menu sets it.
 */
export function Combos() {
  const boxes = itemsByCategory("combos");

  return (
    <section className="field-paper section">
      <div className="wrap grid12 gap-y-10">
        <div className="col-span-12 lg:col-span-3">
          <h2 className="reveal display t-head text-ink">
            Meal boxes
          </h2>
          <figure className="mt-6 m-0 hidden lg:block">
            <Image
              src="/menu/meal-box-ultimate.jpg"
              alt="The Ultimate Savings Meal box from Chickady's fried-chicken board: red box of fried chicken with a Pepsi and dips."
              width={465}
              height={465}
              loading="lazy"
              sizes="(min-width: 1024px) 31vw, 0px"
              className="aspect-4/5 w-full object-cover"
            />
          </figure>
        </div>

        <div className="col-span-12 lg:col-span-8 lg:col-start-5">
          <div className="grid gap-x-16 sm:grid-cols-2">
            {boxes.map((box) => (
              <article key={box.id} className="mb-9">
                <Link
                  href={`/menu/${box.slug}`}
                  className="group flex items-baseline justify-between gap-4 t-body text-ink hover:text-accent-deep"
                >
                  <span className="font-medium">{box.name}</span>
                  <span className="tabular shrink-0">{formatRupees(box.pricePaise)}</span>
                </Link>
                {box.description ? (
                  <p className="mt-1 max-w-[36ch] t-body leading-snug text-muted">
                    {box.description}
                  </p>
                ) : null}
                {box.verification === "pending" ? (
                  <p className="mt-1 t-body text-accent-deep">
                    Price from a listing — not yet confirmed.
                  </p>
                ) : null}
              </article>
            ))}
          </div>

          <p className="mt-2 max-w-[52ch] t-body text-muted">
            Boxes are printed on the fried-chicken board. Contents and prices
            as read on 19 October 2026.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Combos;
