import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Your cart",
  description: "Review what you have picked before you order from Chickady's.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <section className="field-paper2 section">
      <div className="wrap">
        <h1 className="display t-display text-ink">
          Your cart
        </h1>
        <p className="mt-4 max-w-[52ch] text-ink-2">
          The order you have put together. This demo does not send the
          kitchen anything.
        </p>
        <div className="mt-10">
          <CartView />
        </div>
      </div>
    </section>
  );
}
