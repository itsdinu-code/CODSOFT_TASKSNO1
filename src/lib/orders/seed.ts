import type { CartLine, Order } from "@/types";
import { computeTotals } from "@/lib/pricing";
import { getItemById } from "@/lib/menu/queries";

/**
 * Sample orders for the admin dashboard and the kitchen display.
 *
 * These are made up. They exist so the operational screens can be reviewed
 * with a full queue in it; none of them came from a real customer and none
 * of them reach the restaurant. Every order carries `isDemo: true` and the
 * interfaces label them as sample data.
 */

/**
 * The reference moment the sample orders are pinned to, so the seed is
 * reproducible and the build never has to read a clock. On the client the
 * orders are re-based on the current time so the kitchen board looks live.
 */
export const SEED_BASE = "2026-10-19T14:30:00.000Z";

function line(
  itemId: string,
  quantity: number,
  modifierIds: { groupId: string; optionId: string }[] = [],
): CartLine {
  const item = getItemById(itemId);
  if (!item) throw new Error(`Unknown seed item: ${itemId}`);

  const modifiers = (item.modifiers ?? []).flatMap((group) =>
    modifierIds
      .filter((m) => m.groupId === group.id)
      .map((m) => {
        const option = group.options.find((o) => o.id === m.optionId);
        if (!option) throw new Error(`Unknown modifier: ${m.optionId}`);
        return {
          groupId: group.id,
          groupName: group.name,
          optionId: option.id,
          name: option.name,
          pricePaise: option.pricePaise,
        };
      }),
  );

  const absolute = modifiers.filter(
    (m) => item.modifiers?.find((g) => g.id === m.groupId)?.priceMode === "absolute",
  );
  const additive = modifiers.filter(
    (m) => item.modifiers?.find((g) => g.id === m.groupId)?.priceMode === "additive",
  );

  const unitPricePaise = absolute.length
    ? absolute.reduce((s, m) => s + m.pricePaise, 0)
    : (item.pricePaise ?? 0) + additive.reduce((s, m) => s + m.pricePaise, 0);

  return {
    itemId: item.id,
    slug: item.slug,
    name: item.name,
    unitPricePaise,
    quantity,
    modifiers,
    imageUrl: item.imageUrl,
    source: item.source,
  };
}

interface SeedSpec {
  code: string;
  minutesAgo: number;
  status: Order["status"];
  paymentStatus: Order["paymentStatus"];
  fulfilmentType: Order["fulfilmentType"];
  customerName: string;
  customerPhone: string;
  lines: CartLine[];
  notes?: string;
}

const SEED_SPECS: SeedSpec[] = [
  {
    code: "CD-4821",
    minutesAgo: 3,
    status: "pending",
    paymentStatus: "pending",
    fulfilmentType: "takeaway",
    customerName: "Priya Ramesh",
    customerPhone: "+91 98xxx xxxxx",
    lines: [line("box-friendship-meal", 1), line("dip-spicy-garlic", 2)],
  },
  {
    code: "CD-4819",
    minutesAgo: 11,
    status: "accepted",
    paymentStatus: "not-required",
    fulfilmentType: "takeaway",
    customerName: "Karthik S",
    customerPhone: "+91 97xxx xxxxx",
    lines: [
      line("burger-nashville-hot-chicken", 2, [
        { groupId: "dips", optionId: "dip-creamy-mayo" },
      ]),
      line("bite-classic-fries", 1, [{ groupId: "size", optionId: "size-large" }]),
    ],
  },
  {
    code: "CD-4817",
    minutesAgo: 19,
    status: "preparing",
    paymentStatus: "not-required",
    fulfilmentType: "dine-in",
    customerName: "Anitha M",
    customerPhone: "+91 99xxx xxxxx",
    notes: "Extra napkins, please.",
    lines: [line("box-ultimate-savings-meal", 1), line("bev-pepsi", 2)],
  },
  {
    code: "CD-4814",
    minutesAgo: 27,
    status: "preparing",
    paymentStatus: "not-required",
    fulfilmentType: "takeaway",
    customerName: "Vignesh P",
    customerPhone: "+91 96xxx xxxxx",
    lines: [
      line("wings-hot-nashville", 1, [
        { groupId: "portion", optionId: "portion-4-wings" },
      ]),
      line("fries-grilled-ghost-pepper", 1),
      line("bev-7up", 1),
    ],
  },
  {
    code: "CD-4809",
    minutesAgo: 38,
    status: "ready",
    paymentStatus: "not-required",
    fulfilmentType: "takeaway",
    customerName: "Sneha Iyer",
    customerPhone: "+91 90xxx xxxxx",
    lines: [line("box-triple-treat", 1)],
  },
  {
    code: "CD-4802",
    minutesAgo: 96,
    status: "completed",
    paymentStatus: "not-required",
    fulfilmentType: "takeaway",
    customerName: "Rahul D",
    customerPhone: "+91 88xxx xxxxx",
    lines: [
      line("box-solid-treat", 1),
      line("dessert-lotus-biscoff-frappe", 1),
    ],
  },
  {
    code: "CD-4798",
    minutesAgo: 150,
    status: "cancelled",
    paymentStatus: "not-required",
    fulfilmentType: "takeaway",
    customerName: "Meena J",
    customerPhone: "+91 94xxx xxxxx",
    lines: [line("burger-tandoori-paneer", 1)],
  },
  {
    code: "CD-4794",
    minutesAgo: 205,
    status: "completed",
    paymentStatus: "not-required",
    fulfilmentType: "dine-in",
    customerName: "Arun K",
    customerPhone: "+91 93xxx xxxxx",
    lines: [
      line("exclusives-chizza", 1),
      line("bite-signature-dust-popcorn", 1),
      line("bev-blue-curacao", 1),
    ],
  },
];

function build(spec: SeedSpec, baseMs: number): Order {
  const created = new Date(baseMs - spec.minutesAgo * 60_000).toISOString();
  const events: Order["events"] = [{ at: created, status: "pending", by: "Customer" }];

  const path: Order["status"][] = ["pending", "accepted", "preparing", "ready", "completed"];
  const upto = path.indexOf(spec.status);
  if (upto > 0) {
    for (let i = 1; i <= upto; i += 1) {
      events.push({
        at: new Date(new Date(created).getTime() + i * 4 * 60_000).toISOString(),
        status: path[i],
        by: "Kitchen",
      });
    }
  }
  if (spec.status === "rejected" || spec.status === "cancelled") {
    events.push({
      at: new Date(new Date(created).getTime() + 3 * 60_000).toISOString(),
      status: spec.status,
      by: "Counter",
      note: spec.status === "rejected" ? "Item out of stock" : "Customer changed their mind",
    });
  }

  return {
    id: `seed-${spec.code}`,
    code: spec.code,
    createdAt: created,
    status: spec.status,
    paymentStatus: spec.paymentStatus,
    fulfilmentType: spec.fulfilmentType,
    customerName: spec.customerName,
    customerPhone: spec.customerPhone,
    notes: spec.notes,
    lines: spec.lines,
    totals: computeTotals(spec.lines),
    events,
    isDemo: true,
  };
}

/**
 * Build the sample orders. `baseIso` is the moment the freshest order was
 * taken; every other order is placed a fixed number of minutes before it.
 */
export function buildSeedOrders(baseIso: string = SEED_BASE): Order[] {
  const baseMs = new Date(baseIso).getTime();
  return SEED_SPECS.map((spec) => build(spec, baseMs));
}
