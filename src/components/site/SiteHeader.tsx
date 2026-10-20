"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChickadysLogo } from "@/components/brand/ChickadysLogo";
import { useCart } from "@/lib/store/cart";

const LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/combos", label: "Meal boxes" },
  { href: "/reserve", label: "Reserve a table" },
  { href: "/about", label: "Our story" },
  { href: "/gallery", label: "The shop" },
  { href: "/contact", label: "Find us" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count, hydrated } = useCart();
  const [open, setOpen] = useState(false);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const previous = useRef(count);

  // The cart count pops when it changes. The class is applied to the node
  // directly so the header does not re-render on every cart update.
  useEffect(() => {
    if (!hydrated || count === previous.current) return;
    previous.current = count;
    if (count <= 0) return;
    const node = badgeRef.current;
    if (!node) return;
    node.classList.remove("pop");
    void node.offsetWidth;
    node.classList.add("pop");
    const timer = window.setTimeout(() => node.classList.remove("pop"), 420);
    return () => window.clearTimeout(timer);
  }, [count, hydrated]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-paper">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center" aria-label="Chickady's, home">
          <span className="block w-[112px] sm:w-[132px]">
            <ChickadysLogo size="100%" variant="wordmark" tone="ink" panel={false} />
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`t-body underline-offset-4 transition-colors hover:text-accent-deep ${
                      active ? "font-semibold text-accent-deep" : "text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            className="btn btn-sm btn-ink"
            aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
          >
            <span>Cart</span>
            <span
              ref={badgeRef}
              className="tabular inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-1.5 t-small font-semibold text-ink"
              aria-hidden="true"
            >
              {hydrated ? count : 0}
            </span>
          </Link>
          <button
            type="button"
            className="btn btn-sm btn-quiet lg:hidden"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            Menu
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-50 flex flex-col bg-paper lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="wrap flex h-16 items-center justify-between">
            <span className="block w-[112px]">
              <ChickadysLogo size="100%" variant="wordmark" tone="ink" panel={false} />
            </span>
            <button
              type="button"
              className="btn btn-sm btn-quiet"
              onClick={() => setOpen(false)}
              autoFocus
            >
              Close
            </button>
          </div>
          <nav aria-label="Main" className="wrap flex-1 overflow-y-auto">
            <ul className="mt-4 space-y-1">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="display block py-3 t-head text-ink transition-colors hover:text-accent-deep"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t-2 border-ink pt-6">
              <Link href="/menu" className="btn w-full">
                Order online
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export default SiteHeader;
