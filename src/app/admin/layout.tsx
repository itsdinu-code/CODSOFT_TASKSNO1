import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { OrderProvider } from "@/lib/store/orders";
import "./admin.css";

export const metadata = {
  title: "Admin · Chickady's DineDesk",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <OrderProvider>
      <AdminShell>{children}</AdminShell>
    </OrderProvider>
  );
}
