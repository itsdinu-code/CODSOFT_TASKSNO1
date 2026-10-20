import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found · Chickady's",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="field-paper section">
      <div className="wrap grid12 gap-y-8">
        <p className="col-span-12 t-small uppercase tracking-[0.3em] text-accent-deep">
          404
        </p>
        <h1 className="display col-span-12 t-display text-ink lg:col-span-7">
          That page is off the menu.
        </h1>
        <p className="col-span-12 max-w-[48ch] t-body text-ink-2 lg:col-span-5">
          The page you were looking for does not exist here. The printed menu,
          the address and the hours all live on the pages below.
        </p>
        <div className="col-span-12 flex flex-wrap gap-4">
          <Link href="/" className="btn">
            Back to the shop
          </Link>
          <Link
            href="/menu"
            className="btn btn-quiet"
          >
            The menu
          </Link>
        </div>
      </div>
    </section>
  );
}
