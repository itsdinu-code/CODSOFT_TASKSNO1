import Link from "next/link";

/**
 * "The reply card."
 *
 * The last printed object on the page: a card lying on a dark field, cropped
 * by the edge of the section the way a print on a table is cut off by the
 * frame.
 */
export function OrderCard() {
  return (
    <section className="field-ink relative overflow-hidden">
      <div className="wrap grid12 items-end gap-y-12 pb-0 pt-20 sm:pt-28">
        <div className="col-span-12 pb-16 lg:col-span-4 lg:pb-24">
          <p className="t-lead leading-snug text-cream">
            The board on the wall is the menu. So is this one, and you can build
            a box from it in about a minute.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="rotate-[2deg] bg-paper p-7 sm:p-9">
            <h2 className="reveal display t-head text-ink">
              Build your box
            </h2>
            <p className="mt-3 t-body leading-snug text-ink-2">
              Choose a burger, a box of chicken or a loaded fry, add a dip, and
              collect it from the counter.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/menu" className="btn btn-ink flex-1">
                Order online
              </Link>
              <Link href="/reserve" className="btn btn-quiet flex-1">
                Reserve a table
              </Link>
            </div>
            <p className="mt-4 t-small text-muted">Demo — no payment is taken.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderCard;

