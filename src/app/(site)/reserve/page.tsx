import type { Metadata } from "next";
import { ReserveForm } from "@/components/reserve/ReserveForm";

export const metadata: Metadata = {
  title: "Reserve a table",
  description:
    "Request a table at Chickady's in Alappakkam, Chennai. Requests in this demo build stay on your device; the shop confirms every table by phone.",
  alternates: { canonical: "/reserve" },
};

export default function ReservePage() {
  return (
    <section className="field-ink section">
      <div className="wrap grid12 gap-y-8">
        <h1 className="display col-span-12 t-display text-cream lg:col-span-7">
          Set the date,
          <br />
          and we hold the chairs.
        </h1>
        <p className="col-span-12 max-w-[44ch] t-body text-cream/80 lg:col-span-4 lg:col-start-9">
          The listing shows noon to 11:45 pm daily, and the poster says
          &ldquo;dining&rdquo; — so there is a table. Until a booking channel
          is set up with the shop, reservations here are a demo: your request
          stays on your device, and a real table is confirmed by phone.
        </p>
      </div>
      <div className="wrap mt-14">
        <ReserveForm />
      </div>
    </section>
  );
}
