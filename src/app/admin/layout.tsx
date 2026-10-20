import type { ReactNode } from "react";
import { connection } from "next/server";
import { AdminShell } from "@/components/admin/AdminShell";
import { OrderProvider } from "@/lib/store/orders";
import { requireStaffRole } from "@/lib/auth/server";
import "./admin.css";

export const metadata = {
  title: "Admin · Chickady's DineDesk",
  robots: { index: false, follow: false },
};
export const instant = false;
export default async function AdminLayout({ children }: { children: ReactNode }) {
  await connection();
  await requireStaffRole(["owner", "manager", "counter"]);
  return (
    <OrderProvider>
      <AdminShell>{children}</AdminShell>
    </OrderProvider>
  );
}
