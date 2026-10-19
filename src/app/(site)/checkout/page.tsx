import type { Metadata } from "next";
import { CheckoutForm } from "@/components/cart/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finish your Chickady's order. Simulated checkout — no payment is taken.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <section className="field-paper section">
      <div className="wrap">
        <h1 className="display t-display text-ink">
          Checkout
        </h1>
        <p className="mt-4 max-w-[56ch] text-ink-2">
          Choose how you want it, leave a name and a number, and check the
          bill. This is a simulated checkout: no card details are collected,
          no money moves and the order does not reach the kitchen.
        </p>
        <div className="mt-10">
          <CheckoutForm />
        </div>
      </div>
    </section>
  );
}
