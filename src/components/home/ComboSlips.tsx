import Link from "next/link";
import { itemsByCategory } from "@/lib/menu/queries";
import { formatRupees } from "@/lib/format";
import Image from "next/image";

/**
 * "Output slips along the edge."
 *
 * The fried-chicken board at the counter already prints a ticket for every
 * meal box. Here those tickets are the slips standing along the bottom of
 * the photograph, cut off by the edge of the section.
 */

interface Slip {
  code: string;
  title: string;
  lines: string[];
  price: number;
  itemSlug: string;
  tilt: number;
}

const SLIPS: Slip[] = [
  {
    code: "10",
    title: "SOLID TREAT BOX",
    lines: ["2PCS. HOT & CRISPY", "4PCS. TENDERS"],
    price: 38200,
    itemSlug: "solid-treat-box",
    tilt: -1.4,
  },
  {
    code: "11",
    title: "ALL DRUMSTICKS",
    lines: ["5PCS. DRUMSTICKS"],
    price: 48500,
    itemSlug: "all-drumsticks-box",
    tilt: 0,
  },
  {
    code: "12",
    title: "LOADED FRIES BOX",
    lines: ["1 LOADED FRIES", "2PCS. HOT & CRISPY"],
    price: 39900,
    itemSlug: "loaded-fries-box",
    tilt: 1.2,
  },
  {
    code: "13",
    title: "BIG 8 BOX",
    lines: ["8PCS. HOT & CRISPY"],
    price: 58900,
    itemSlug: "big-8-box",
    tilt: 0,
  },
  {
    code: "14",
    title: "ULTIMATE SAVINGS MEAL",
    lines: [
      "14PCS.",
      "4PCS. HOT & CRISPY",
      "6PCS. CLASSIC WINGS",
      "4PCS. CLASSIC TENDERS",
      "3 DIPS & 1 PEPSI",
    ],
    price: 69900,
    itemSlug: "ultimate-savings-meal",
    tilt: -1.1,
  },
  {
    code: "16",
    title: "TRIPLE TREAT MEAL BOX",
    lines: [
      "18PCS.",
      "3PCS. HOT & CRISPY",
      "9PCS. CLASSIC WINGS",
      "6PCS. CLASSIC TENDERS",
      "3 DIPS & 2 PEPSI",
    ],
    price: 78900,
    itemSlug: "triple-treat-meal-box",
    tilt: 1.6,
  },
];

export function ComboSlips() {
  const boxes = itemsByCategory("combos");

  return (
    <section className="relative isolate overflow-hidden bg-black">
      <Image
        src="/campaigns/fried-row.jpg"
        alt=""
        aria-hidden="true"
        width={1446}
        height={564}
        loading="lazy"
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/55"
        style={{ clipPath: "polygon(0 0, 62% 0, 44% 100%, 0 100%)" }}
      />

      <div className="wrap relative pt-16 pb-0 sm:pt-20">
        <div className="max-w-[46ch] text-cream">
          <h2 className="display reveal t-display">
            Every box has a ticket
          </h2>
          <p className="mt-5 t-lead leading-snug text-cream/90">
            The fried-chicken board behind the counter prints what is in each
            box and what it costs. Six of those tickets are standing along the
            bottom of this page, cut off by the edge.
          </p>
          <p className="mt-4 t-lead leading-snug text-cream/90">
            Prices as printed on 19 October 2026. Every box is available for
            takeaway.
          </p>
        </div>
      </div>

      <div className="relative mt-14 grid grid-cols-3 items-end gap-3 px-3 sm:gap-4 sm:px-6 lg:grid-cols-6">
        {SLIPS.map((slip) => {
          const box = boxes.find((b) => b.slug === slip.itemSlug);
          return (
            <article
              key={slip.code}
              className="flex flex-col justify-end bg-paper p-3 sm:p-4"
              style={{
                height: `${26 + ((Number(slip.code) * 7) % 19)}svh`,
                transform: slip.tilt ? `rotate(${slip.tilt}deg)` : undefined,
                transformOrigin: "50% 100%",
              }}
            >
              <p className="display-wide t-small text-accent-deep sm:t-body">
                {slip.title}
              </p>
              <div className="my-2 h-2 border-b-2 border-dotted border-ink/30" />
              <ul className="space-y-1 t-small leading-tight text-ink-2 sm:t-small">
                {slip.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="tabular mt-auto pt-3 t-body font-semibold text-ink sm:t-body">
                {formatRupees(slip.price)}
              </p>
              <Link
                href={`/menu/${slip.itemSlug}`}
                className="mt-2 t-small text-accent-deep underline underline-offset-4 hover:text-ink"
              >
                {box ? "Add to a box" : "View"}
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ComboSlips;
