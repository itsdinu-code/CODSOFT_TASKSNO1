import type { ReactNode } from "react";
import { connection } from "next/server";
import { OrderProvider } from "@/lib/store/orders";
import { requireStaffRole } from "@/lib/auth/server";
import "./kitchen.css";

export const metadata = {
  title: "Kitchen board · Chickady's",
  robots: { index: false, follow: false },
};
export const instant = false;
export default async function KitchenLayout({ children }: { children: ReactNode }) {
  await connection();
  await requireStaffRole(["owner", "manager", "kitchen"]);
  return <OrderProvider>{children}</OrderProvider>;
}
