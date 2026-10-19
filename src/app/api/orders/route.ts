import { NextResponse } from "next/server";
import { validateCart, computeTotals } from "@/lib/pricing";
import { orderCode } from "@/lib/format";
import type { FulfilmentType, Order } from "@/types";

/**
 * Order creation.
 *
 * This route recalculates every price from the canonical menu. The total the
 * browser sends is never read, and the browser's own copy of an item's price
 * is never trusted. A request that names an item the shop does not sell, an
 * item that is sold out, or a line missing a required choice is rejected
 * with a reason.
 *
 * In this prototype the route validates and returns a priced order but does
 * not write to a database and does not dispatch anything to the kitchen.
 */

const ALLOWED_FULFILMENT: FulfilmentType[] = ["takeaway", "dine-in"];

interface IncomingLine {
  itemId: string;
  quantity: number;
  modifierIds?: { groupId: string; optionId: string }[];
}

interface IncomingBody {
  lines?: IncomingLine[];
  customerName?: string;
  customerPhone?: string;
  fulfilmentType?: string;
  notes?: string;
  /** Present only so the prototype can detect a duplicate submit. */
  idempotencyKey?: string;
}

export async function POST(request: Request) {
  let body: IncomingBody;
  try {
    body = (await request.json()) as IncomingBody;
  } catch {
    return NextResponse.json({ error: "The request body was not valid JSON." }, { status: 400 });
  }

  if (!Array.isArray(body.lines) || body.lines.length === 0) {
    return NextResponse.json({ error: "The order is empty." }, { status: 400 });
  }

  if (body.lines.length > 40) {
    return NextResponse.json({ error: "Too many lines on one order." }, { status: 400 });
  }

  const fulfilmentType = body.fulfilmentType as FulfilmentType;
  if (!ALLOWED_FULFILMENT.includes(fulfilmentType)) {
    return NextResponse.json(
      {
        error:
          "That fulfilment method is not available. The restaurant has not confirmed own delivery, so it cannot be chosen here.",
      },
      { status: 400 },
    );
  }

  const customerName = (body.customerName ?? "").trim();
  const customerPhone = (body.customerPhone ?? "").trim();
  if (customerName.length < 2) {
    return NextResponse.json({ error: "A name is needed for the order." }, { status: 400 });
  }
  if (!/^[+\d][\d\s-]{6,19}$/.test(customerPhone)) {
    return NextResponse.json(
      { error: "A contact number is needed so the shop can call you back." },
      { status: 400 },
    );
  }

  const { issues, priced } = validateCart(
    body.lines.map((line) => ({
      itemId: String(line.itemId),
      quantity: Number(line.quantity),
      modifierIds: Array.isArray(line.modifierIds) ? line.modifierIds : [],
    })),
  );

  if (issues.length > 0) {
    return NextResponse.json(
      {
        error: "Some lines cannot be ordered as they stand.",
        issues,
      },
      { status: 409 },
    );
  }

  const totals = computeTotals(priced);
  const created = new Date().toISOString();
  const code = orderCode(4822 + Math.floor(Math.random() * 90));

  const order: Order = {
    id: `demo-${code}-${Date.now()}`,
    code,
    createdAt: created,
    status: "pending",
    paymentStatus: "not-required",
    fulfilmentType,
    customerName,
    customerPhone,
    notes: (body.notes ?? "").trim() || undefined,
    lines: priced,
    totals,
    events: [{ at: created, status: "pending", by: "Customer" }],
    isDemo: true,
  };

  return NextResponse.json({ order, demo: true });
}
