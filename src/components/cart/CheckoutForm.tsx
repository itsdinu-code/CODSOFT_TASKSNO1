"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/store/cart";
import { useOrders } from "@/lib/store/orders";
import { formatRupees } from "@/lib/format";
import ClickSpark from "@/components/reactbits/ClickSpark";
import type { FulfilmentType, Order } from "@/types";

const FULFILMENT: { id: FulfilmentType; label: string; note: string }[] = [
  {
    id: "takeaway",
    label: "Takeaway",
    note: "Collect it from the counter on 150 Feet By-pass Road.",
  },
  {
    id: "dine-in",
    label: "Eat in",
    note: "There is seating at the shop. Tables are not booked through this prototype.",
  },
];

export function CheckoutForm() {
  const { lines, totals, hydrated, clear } = useCart();
  const { placeOrder } = useOrders();
  const router = useRouter();

  const [fulfilmentType, setFulfilmentType] = useState<FulfilmentType>("takeaway");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: lines.map((line) => ({
            itemId: line.itemId,
            quantity: line.quantity,
            modifierIds: line.modifiers.map((m) => ({
              groupId: m.groupId,
              optionId: m.optionId,
            })),
          })),
          customerName: name,
          customerPhone: phone,
          fulfilmentType,
          notes,
          idempotencyKey,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data?.error
            ? `${data.error}${data.issues?.length ? " Check the cart and try again." : ""}`
            : "The order could not be placed.",
        );
        setBusy(false);
        return;
      }

      const order = data.order as Order;
      placeOrder({
        lines: order.lines,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        fulfilmentType: order.fulfilmentType,
        notes: order.notes,
      });
      clear();
      router.push(`/order/${order.code}`);
    } catch {
      setError("The order could not be placed because the request failed.");
      setBusy(false);
    }
  }

  if (!hydrated) {
    return <div className="h-64 animate-pulse bg-paper" aria-hidden="true" />;
  }

  if (lines.length === 0) {
    return (
      <div className="bg-paper-2 p-8 text-center">
        <h2 className="display-wide t-lead text-ink">There is nothing to check out</h2>
        <Link href="/menu" className="btn mt-5">
          Open the menu
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-16">
      <div>
        <fieldset>
          <legend className="display-wide t-body text-ink">How you want it</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {FULFILMENT.map((option) => (
              <label
                key={option.id}
                className={`flex cursor-pointer flex-col gap-1 p-4 ${
                  fulfilmentType === option.id
                    ? "bg-accent text-ink"
                    : "bg-paper-2 text-ink hover:bg-paper-3"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="fulfilment"
                    checked={fulfilmentType === option.id}
                    onChange={() => setFulfilmentType(option.id)}
                    className="h-4 w-4 accent-[#171310]"
                  />
                  <span className="display-wide t-body">{option.label}</span>
                </span>
                <span className="t-body">{option.note}</span>
              </label>
            ))}
          </div>
          <p className="mt-3 t-body text-muted">
            Own delivery is not offered here. The listing says delivery runs
            through Zomato and Swiggy; the radius and fees are the
            platform&rsquo;s, not ours, and have not been confirmed.
          </p>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="display-wide t-body text-ink">
            Who we ask for
          </legend>
          <p className="mt-2 t-body text-muted">
            Only what the counter needs to hand the order over. Nothing is
            stored on a server and no card details are ever collected.
          </p>
          <div className="mt-4 grid gap-4">
            <div>
              <label htmlFor="name" className="block t-body font-medium text-ink">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                autoComplete="name"
                className="mt-2 h-12 w-full rounded-[10px] border-0 bg-paper-2 px-4 text-ink"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block t-body font-medium text-ink">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+91 99405 26698"
                autoComplete="tel"
                className="mt-2 h-12 w-full rounded-[10px] border-0 bg-paper-2 px-4 text-ink"
              />
            </div>
            <div>
              <label htmlFor="notes" className="block t-body font-medium text-ink">
                Anything the kitchen should know <span className="text-muted">(optional)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-2 w-full rounded-[10px] border-0 bg-paper-2 px-4 py-3 text-ink"
              />
            </div>
          </div>
        </fieldset>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="bg-paper p-6">
          <h2 className="display t-lead text-ink">Your order</h2>
          <ul className="mt-4 space-y-3">
            {lines.map((line, index) => (
              <li key={`${line.itemId}-${index}`} className="flex justify-between gap-4 t-body">
                <span className="min-w-0">
                  {line.quantity} × {line.name}
                  {line.modifiers.length > 0 ? (
                    <span className="block t-body text-muted">
                      {line.modifiers.map((m) => m.name).join(", ")}
                    </span>
                  ) : null}
                </span>
                <span className="tabular shrink-0">
                  {formatRupees(line.unitPricePaise * line.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t-2 border-ink/15 pt-4">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="tabular">{formatRupees(totals.subtotalPaise)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Taxes and fees</dt>
              <dd className="tabular">{formatRupees(totals.taxesPaise)}</dd>
            </div>
            <div className="flex justify-between t-body font-semibold">
              <dt>Total</dt>
              <dd className="tabular">{formatRupees(totals.totalPaise)}</dd>
            </div>
          </dl>

          {error ? (
            <p role="alert" className="mt-4 bg-ink p-3 t-body text-cream">
              {error}
            </p>
          ) : null}

          <ClickSpark
            sparkColor={["#f4510b", "#ffc45c", "#e51b23"]}
            shape="streak"
            sparkCount={12}
            sparkSize={12}
            sparkRadius={42}
            duration={560}
            glow={0.25}
            ring
            style={{ width: "100%" }}
          >
            <button type="submit" className="btn mt-5 w-full" disabled={busy}>
              {busy ? "Placing…" : "Place the simulated order"}
            </button>
          </ClickSpark>
          <p className="mt-3 t-body text-muted">
            This is a prototype. The order is stored in this browser only, it
            is not sent to the restaurant, and no payment is taken. Do not
            enter card details anywhere on this site.
          </p>
        </div>
      </aside>
    </form>
  );
}

export default CheckoutForm;
