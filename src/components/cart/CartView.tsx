"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart";
import { formatRupees } from "@/lib/format";

export function CartView() {
  const { lines, totals, hydrated, setQuantity, remove, clear } = useCart();

  if (!hydrated) {
    return (
      <div className="space-y-4" aria-hidden="true">
        {[0, 1].map((i) => (
          <div key={i} className="h-24 animate-pulse bg-paper-2" />
        ))}
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="bg-paper-2 p-8 text-center sm:p-12">
        <h2 className="display-wide t-head text-ink">
          The cart is empty
        </h2>
        <p className="mx-auto mt-3 max-w-[42ch] text-ink-2">
          Nothing in it yet. The board on the wall is the same as the menu on
          this page.
        </p>
        <Link href="/menu" className="btn mt-6">
          Open the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-16">
      <div>
        <ul className="space-y-4">
          {lines.map((line, index) => (
            <li key={`${line.itemId}-${index}`} className="bg-paper p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="display-wide t-body text-ink">
                    <Link href={`/menu/${line.slug}`} className="hover:text-accent-deep">
                      {line.name}
                    </Link>
                  </h2>
                  {line.modifiers.length > 0 ? (
                    <p className="mt-1 t-body text-muted">
                      {line.modifiers.map((m) => m.name).join(", ")}
                    </p>
                  ) : null}
                  <p className="tabular mt-1 t-body text-ink">
                    {formatRupees(line.unitPricePaise)} each
                  </p>
                </div>
                <p className="tabular t-body font-semibold text-ink">
                  {formatRupees(line.unitPricePaise * line.quantity)}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="h-9 w-9 rounded-full bg-paper-2 leading-none text-ink hover:bg-paper-3"
                    onClick={() => setQuantity(index, line.quantity - 1)}
                    aria-label={`One fewer ${line.name}`}
                  >
                    −
                  </button>
                  <span className="tabular w-8 text-center" aria-live="polite">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    className="h-9 w-9 rounded-full bg-paper-2 leading-none text-ink hover:bg-paper-3"
                    onClick={() => setQuantity(index, line.quantity + 1)}
                    aria-label={`One more ${line.name}`}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="t-body text-muted underline underline-offset-4 hover:text-accent-deep"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="mt-6 t-body text-muted underline underline-offset-4 hover:text-accent-deep"
          onClick={clear}
        >
          Empty the cart
        </button>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="bg-accent p-6 text-ink">
          <h2 className="display t-lead text-ink">The bill</h2>
          <dl className="mt-5 space-y-2 t-body">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="tabular">{formatRupees(totals.subtotalPaise)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Discounts</dt>
              <dd className="tabular">{formatRupees(totals.discountsPaise)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Taxes and fees</dt>
              <dd className="tabular">{formatRupees(totals.taxesPaise)}</dd>
            </div>
            <div className="mt-3 flex justify-between border-t-2 border-ink/20 pt-3 t-body font-semibold">
              <dt>Total</dt>
              <dd className="tabular">{formatRupees(totals.totalPaise)}</dd>
            </div>
          </dl>
          <p className="mt-4 t-body text-ink">
            Taxes, packaging and delivery are not added here. The restaurant has
            not published its rates, so nothing is charged that cannot be
            explained on the counter bill.
          </p>
          <Link href="/checkout" className="btn btn-ink mt-5 w-full">
            Continue to checkout
          </Link>
          <p className="mt-3 t-body text-ink">
            Simulated checkout. No payment is taken.
          </p>
        </div>
      </aside>
    </div>
  );
}

export default CartView;
