import type { Metadata } from "next";
import { OrderTracker } from "@/components/orders/OrderTracker";

export const metadata: Metadata = {
  title: "Order status",
  description:
    "Track a Chickady's order. Tracking runs on sample data in this demo.",
  robots: { index: false, follow: false },
};

// The order reference is only known at request time.
export const instant = false;

export default async function OrderPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <section className="field-paper section">
      <div className="wrap">
        <h1 className="display t-display text-ink">
          Order {code}
        </h1>
        <p className="mt-4 max-w-[56ch] text-ink-2">
          Where the order has got to. Nothing was sent to the shop in this
          demo, so the steps below run on sample data.
        </p>
        <div className="mt-10">
          <OrderTracker code={code} />
        </div>
      </div>
    </section>
  );
}
