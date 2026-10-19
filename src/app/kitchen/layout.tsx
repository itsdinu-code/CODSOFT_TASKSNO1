import type { ReactNode } from "react";
import { OrderProvider } from "@/lib/store/orders";
import "./kitchen.css";

export const metadata = {
  title: "Kitchen board · Chickady's",
  robots: { index: false, follow: false },
};

export default function KitchenLayout({ children }: { children: ReactNode }) {
  return <OrderProvider>{children}</OrderProvider>;
}
