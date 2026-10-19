import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CartProvider } from "@/lib/store/cart";
import { OrderProvider } from "@/lib/store/orders";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <OrderProvider>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </OrderProvider>
    </CartProvider>
  );
}
