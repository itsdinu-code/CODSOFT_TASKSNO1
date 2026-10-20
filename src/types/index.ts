/**
 * Shared types for Chickady's x DineDesk.
 *
 * Money is stored as integer paise (1 rupee = 100 paise) so that no
 * floating-point arithmetic ever touches a price. Rupees are a display
 * concern only and are produced by `formatRupees` in `lib/format.ts`.
 */

export type Currency = "INR";

/** Where a menu record came from, and how much we trust it. */
export type PriceSource =
  | "printed-menu-board" // owner's own printed board, photographed 2026-10-19
  | "printed-combo-board" // owner's fried-chicken combo board, photographed 2026-10-19
  | "owner-post" // owner's own Google Maps post / campaign artwork
  | "zomato-listing" // third-party listing snapshot, 2026-10-19
  | "swiggy-listing" // third-party listing snapshot, 2026-10-19
  | "google-maps" // third-party listing snapshot, 2026-10-19
  | "demo"; // seeded for the prototype

export type Verification = "confirmed" | "pending";

export type Dietary = "veg" | "non-veg" | "unknown";

export type CategoryId =
  | "burgers"
  | "loaded-fries"
  | "nachos"
  | "exclusives"
  | "wings-tenders"
  | "quick-bites"
  | "fried-chicken"
  | "combos"
  | "dips-addons"
  | "beverages"
  | "desserts";

export interface MenuCategory {
  id: CategoryId;
  name: string;
  /** One line, written on the sheet next to the category name. */
  note: string;
  sortOrder: number;
  /** Printed on the owner's board as a titled block. */
  boardHeading: string;
}

export interface ModifierOption {
  id: string;
  name: string;
  pricePaise: number;
  /** maxSelections on the parent group. */
  isDefault?: boolean;
}

/**
 * `additive` groups add their price to the line (dips, extra cheese).
 * `absolute` groups price the whole line, so a size option replaces the
 * base price instead of adding to it.
 */
export type PriceMode = "additive" | "absolute";

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  minSelections: number;
  maxSelections: number;
  priceMode: PriceMode;
  options: ModifierOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  categoryId: CategoryId;
  description?: string;
  imageUrl?: string;
  /** null = price not established (campaign or awaiting owner confirmation). */
  pricePaise: number | null;
  currency: Currency;
  isAvailable: boolean;
  isFeatured: boolean;
  source: PriceSource;
  /** ISO date the source was captured. */
  lastVerifiedAt: string;
  verification: Verification;
  /** Where the number can be checked. */
  sourceUrl?: string;
  modifiers?: ModifierGroup[];
  sortOrder: number;
  dietary: Dietary;
  /** Portion label as printed, e.g. "4 pcs" or "Regular / Large". */
  portion?: string;
  /** Sold out / temporarily unavailable wording shown to customers. */
  unavailableNote?: string;
  /** Marketing note printed on the board, e.g. "Must try". */
  boardNote?: string;
  /** Spiciness markers exactly as printed on the board (flame glyphs). */
  heat?: 0 | 1 | 2 | 3;
}

export type FulfilmentType = "takeaway" | "delivery" | "dine-in";

export type OrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "ready"
  | "completed"
  | "rejected"
  | "cancelled";

export type PaymentStatus =
  | "not-required"
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export interface CartLine {
  itemId: string;
  slug: string;
  name: string;
  /** Paise, captured from the canonical menu at the moment of add. */
  unitPricePaise: number;
  quantity: number;
  modifiers: { groupId: string; groupName: string; optionId: string; name: string; pricePaise: number }[];
  note?: string;
  imageUrl?: string;
  source: PriceSource;
}

export interface OrderTotals {
  subtotalPaise: number;
  discountsPaise: number;
  packagingPaise: number;
  taxesPaise: number;
  deliveryPaise: number;
  totalPaise: number;
}

export interface Order {
  id: string;
  code: string;
  createdAt: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfilmentType: FulfilmentType;
  customerName: string;
  customerPhone: string;
  notes?: string;
  lines: CartLine[];
  totals: OrderTotals;
  /** Every transition is recorded so the KDS and admin share one history. */
  events: { at: string; status: OrderStatus; by: string; note?: string }[];
  /** True when the order came from the prototype rather than a real kitchen. */
  isDemo: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  slug: string;
  kind: "hero" | "banner" | "launch" | "seasonal";
  artwork?: string;
  artworkAlt?: string;
  /** Typed panel shown instead of artwork when the campaign's poster artwork is not used on the public site. */
  poster?: { eyebrow: string; title: string; note: string; };
  headline: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** null = the owner has not confirmed the end date. */
  startsAt: string | null;
  endsAt: string | null;
  isActive: boolean;
  /** True when price, stock or dates still need the owner's sign-off. */
  needsVerification: boolean;
  theme: "orange" | "black-red" | "cream";
  linkedItemIds: string[];
}

export interface ReviewSource {
  platform: string;
  url: string;
  /** Rating as shown on the platform when it was last checked. */
  rating: number | null;
  ratingScale: number;
  reviewCount: number | null;
  /** ISO date the figure was retrieved. */
  retrievedAt: string;
  /** True when the figure has not been re-checked since. */
  stale: boolean;
  note: string;
}
