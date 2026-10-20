/**
 * DishArt — generated dish illustrations.
 *
 * For dishes the owner has not supplied a photograph for, the menu shows a
 * drawn plate instead: the same line-art language as the printed board, in
 * brand ink and accent on paper. It is never a photograph of a different
 * dish, and the detail page captions it as an illustration.
 */

import type { ReactElement } from "react";
import type { MenuItem } from "@/types";

const INK = "#171310";
const ACCENT = "#f4510b";
const ACCENT_DEEP = "#c43c08";
const CREAM = "#fff6e6";

function Burger() {
  return (
    <g>
      <path d="M8 46a32 32 0 0 1 64 0" fill={ACCENT} stroke={INK} strokeWidth="3" />
      <circle cx="28" cy="26" r="1.6" fill={INK} />
      <circle cx="40" cy="20" r="1.6" fill={INK} />
      <circle cx="52" cy="23" r="1.6" fill={INK} />
      <path d="M6 50h68c-4 6-14 8-34 8S10 56 6 50Z" fill={CREAM} stroke={INK} strokeWidth="3" />
      <rect x="8" y="58" width="64" height="10" rx="5" fill={ACCENT_DEEP} stroke={INK} strokeWidth="3" />
      <path d="M12 72h56a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8Z" fill={ACCENT} stroke={INK} strokeWidth="3" />
    </g>
  );
}

function Patty() {
  return (
    <g>
      <ellipse cx="40" cy="62" rx="30" ry="9" fill={INK} opacity="0.12" />
      <rect x="12" y="40" width="56" height="16" rx="8" fill={ACCENT_DEEP} stroke={INK} strokeWidth="3" />
      <path d="M18 44v8M28 44v8M38 44v8M48 44v8M58 44v8" stroke={INK} strokeWidth="2" opacity="0.5" />
      <path d="M8 36c10-8 20-10 32-6s22 2 32-6" fill="none" stroke="#4a7c2e" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Fries({ loaded = false }: { loaded?: boolean }) {
  return (
    <g>
      <path d="M24 28 30 10M36 26 36 8M48 26 48 8M60 26 54 10" stroke="#e0a020" strokeWidth="6" strokeLinecap="round" />
      <path d="M24 28 30 10M60 26 54 10" stroke="#c98a12" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 46h48l-6 34H22Z" fill={ACCENT} stroke={INK} strokeWidth="3" />
      <path d="M22 54l2 22M40 54v22M58 54l-2 22" stroke={CREAM} strokeWidth="2.5" opacity="0.85" />
      {loaded ? (
        <g fill={ACCENT_DEEP}>
          <circle cx="28" cy="44" r="2.4" />
          <circle cx="42" cy="46" r="2.4" />
          <circle cx="54" cy="42" r="2.4" />
        </g>
      ) : null}
    </g>
  );
}

function Nachos() {
  return (
    <g>
      <path d="M10 66h60l-8 12H18Z" fill={INK} opacity="0.15" />
      <path d="M22 58 34 34l6 24Z" fill="#f3c14b" stroke={INK} strokeWidth="2.5" />
      <path d="M34 60 50 30l6 30Z" fill="#e0a020" stroke={INK} strokeWidth="2.5" />
      <path d="M46 58 62 40l8 18Z" fill="#f3c14b" stroke={INK} strokeWidth="2.5" />
      <g fill={ACCENT}>
        <circle cx="36" cy="52" r="2.6" />
        <circle cx="52" cy="50" r="2.6" />
        <circle cx="60" cy="54" r="2.6" />
      </g>
    </g>
  );
}

function Wings() {
  return (
    <g>
      <path d="M22 40c0-10 10-16 18-10l6 10H22Z" fill={ACCENT_DEEP} stroke={INK} strokeWidth="3" />
      <path d="M46 40c0-10 10-16 18-10l6 10H46Z" fill={ACCENT} stroke={INK} strokeWidth="3" />
      <path d="M18 54c0-8 12-10 20-6l6 6H18Z" fill={ACCENT} stroke={INK} strokeWidth="3" />
      <path d="M50 54c4-8 14-8 20-2l4 2H50Z" fill={ACCENT_DEEP} stroke={INK} strokeWidth="3" />
      <path d="M16 66h48" stroke={INK} strokeWidth="2" opacity="0.35" />
    </g>
  );
}

function Drum() {
  return (
    <g>
      <ellipse cx="38" cy="56" rx="7" ry="10" transform="rotate(-40 38 56)" fill={CREAM} stroke={INK} strokeWidth="3" />
      <path d="M44 46c14-12 28-4 26 10-2 12-16 18-26 10s-8-14 0-20Z" fill={ACCENT_DEEP} stroke={INK} strokeWidth="3" />
      <path d="M20 62l-4 4M18 58l-6 2" stroke={CREAM} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
    </g>
  );
}

function Tenders() {
  return (
    <g>
      <path d="M12 40h56l-5 30H17Z" fill={ACCENT} stroke={INK} strokeWidth="3" />
      <rect x="20" y="24" width="9" height="24" rx="4" transform="rotate(-8 20 24)" fill="#e0a020" stroke={INK} strokeWidth="2.5" />
      <rect x="36" y="24" width="9" height="24" fill="#e0a020" stroke={INK} strokeWidth="2.5" />
      <rect x="52" y="24" width="9" height="24" rx="4" transform="rotate(8 52 24)" fill="#e0a020" stroke={INK} strokeWidth="2.5" />
    </g>
  );
}

function Popcorn() {
  return (
    <g>
      <path d="M18 46h44l-5 30H23Z" fill={CREAM} stroke={INK} strokeWidth="3" />
      <path d="M22 54h36" stroke={ACCENT} strokeWidth="5" />
      <g fill="#f3c14b" stroke={INK} strokeWidth="2.5">
        <circle cx="28" cy="40" r="6" />
        <circle cx="40" cy="36" r="6" />
        <circle cx="52" cy="40" r="6" />
        <circle cx="34" cy="26" r="6" />
        <circle cx="48" cy="27" r="6" />
      </g>
    </g>
  );
}

function Box() {
  return (
    <g>
      <path d="M34 18 22 34M46 16v20M58 18l12 16" stroke="#e0a020" strokeWidth="6" strokeLinecap="round" />
      <path d="M12 40h56l-6 32H18Z" fill={ACCENT} stroke={INK} strokeWidth="3" />
      <path d="M12 40h56l-3-8H15Z" fill={ACCENT_DEEP} stroke={INK} strokeWidth="3" />
      <path d="M30 54h20" stroke={CREAM} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Bites() {
  return (
    <g>
      <g fill={ACCENT} stroke={INK} strokeWidth="2.5">
        <circle cx="26" cy="54" r="9" />
        <circle cx="46" cy="46" r="9" />
        <circle cx="56" cy="62" r="9" />
        <circle cx="34" cy="66" r="9" />
      </g>
      <path d="M20 34c4-8 12-10 18-4M48 28c4-6 12-6 16 0" fill="none" stroke="#4a7c2e" strokeWidth="3.5" strokeLinecap="round" />
    </g>
  );
}

function Dip() {
  return (
    <g>
      <path d="M14 40h52a26 26 0 0 1-52 0Z" fill={CREAM} stroke={INK} strokeWidth="3" />
      <ellipse cx="40" cy="40" rx="26" ry="5" fill={ACCENT_DEEP} stroke={INK} strokeWidth="2.5" />
      <circle cx="32" cy="39" r="2" fill={CREAM} opacity="0.9" />
      <circle cx="46" cy="36" r="1.6" fill={ACCENT} />
    </g>
  );
}

function Drink() {
  return (
    <g>
      <path d="M46 10l6-6" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M20 20h40l-4 54H24Z" fill={ACCENT} stroke={INK} strokeWidth="3" />
      <path d="M22 30h36l-1 8H23Z" fill={CREAM} stroke={INK} strokeWidth="2.5" />
      <path d="M34 14l4 22" stroke={CREAM} strokeWidth="4" strokeLinecap="round" opacity="0.9" />
    </g>
  );
}

function Bottle() {
  return (
    <g>
      <rect x="33" y="8" width="14" height="8" rx="2" fill={ACCENT_DEEP} stroke={INK} strokeWidth="2.5" />
      <path d="M34 16h12v8c8 4 12 10 12 18v26a6 6 0 0 1-6 6H28a6 6 0 0 1-6-6V42c0-8 4-14 12-18Z" fill={CREAM} stroke={INK} strokeWidth="3" />
      <rect x="24" y="44" width="32" height="14" rx="3" fill={ACCENT} stroke={INK} strokeWidth="2.5" />
    </g>
  );
}

function Frappe() {
  return (
    <g>
      <path d="M46 12c2-4 8-5 10-1M44 16c0-4 6-7 10-4" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 12h4c4 0 4 6 8 6s2 6 6 6" fill="none" stroke={CREAM} strokeWidth="6" strokeLinecap="round" />
      <path d="M24 26h32l-4 50H28Z" fill={ACCENT} stroke={INK} strokeWidth="3" />
      <path d="M26 32h28l-1 10H27Z" fill={CREAM} stroke={INK} strokeWidth="2.5" />
      <rect x="54" y="30" width="7" height="18" rx="3.5" transform="rotate(18 54 30)" fill="#d8a44b" stroke={INK} strokeWidth="2" />
      <path d="M40 20l6 14" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    </g>
  );
}

function Chizza() {
  return (
    <g>
      <circle cx="40" cy="48" r="30" fill={ACCENT_DEEP} stroke={INK} strokeWidth="3" />
      <circle cx="40" cy="48" r="22" fill={ACCENT} stroke={INK} strokeWidth="2.5" />
      <g fill={CREAM} stroke={INK} strokeWidth="1.5">
        <circle cx="32" cy="42" r="3.4" />
        <circle cx="50" cy="38" r="3.4" />
        <circle cx="46" cy="56" r="3.4" />
        <circle cx="30" cy="58" r="3.4" />
      </g>
      <path d="M26 48h28" stroke={CREAM} strokeWidth="2.5" opacity="0.8" />
    </g>
  );
}

const KINDS: Record<string, () => ReactElement> = {
  burger: Burger,
  patty: Patty,
  fries: () => <Fries />,
  "loaded-fries": () => <Fries loaded />,
  nachos: Nachos,
  wings: Wings,
  drum: Drum,
  tenders: Tenders,
  popcorn: Popcorn,
  box: Box,
  bites: Bites,
  dip: Dip,
  drink: Drink,
  bottle: Bottle,
  frappe: Frappe,
  chizza: Chizza,
};

/**
 * The framed print: an illustration tile set the way the board sets a dish.
 * Optional view box lets callers size it; colour comes from brand tokens so
 * the art sits right on paper or ink fields.
 */
export function DishArt({
  kind,
  className,
}: {
  kind: NonNullable<MenuItem["art"]>;
  className?: string;
}) {
  const Draw = KINDS[kind] ?? null;
  return (
    <svg
      viewBox="-14 -8 128 104"
      role="presentation"
      aria-hidden="true"
      className={`block h-auto w-full ${className ?? ""}`}
      style={{ fill: "none" }}
    >
      <rect x="-14" y="-8" width="128" height="104" fill="#f7e3bd" rx="2" />
      <path d="M-13 -7h126v102H-13Z" fill="none" stroke={INK} strokeWidth="2" opacity="0.25" />
      <g transform="scale(0.94) translate(4 6)">{Draw ? <Draw /> : null}</g>
    </svg>
  );
}

export default DishArt;
