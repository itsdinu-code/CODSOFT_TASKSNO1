import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CounterBot } from "@/components/site/CounterBot";
import { CartProvider } from "@/lib/store/cart";
import { OrderProvider } from "@/lib/store/orders";
import { ReservationsProvider } from "@/lib/store/reservations";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <OrderProvider>
        <ReservationsProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <CounterBot />
        </ReservationsProvider>
      </OrderProvider>
    </CartProvider>
  );
}
