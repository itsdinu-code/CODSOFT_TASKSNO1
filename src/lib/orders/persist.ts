import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { CartLine, FulfilmentType, Order } from "@/types";

interface PersistInput {
  code: string;
  fulfilmentType: FulfilmentType;
  customerName: string;
  customerPhone: string;
  notes?: string;
  idempotencyKey: string;
  lines: CartLine[];
}

export async function persistOrder(input: PersistInput): Promise<Order> {
  const supabase = createSupabaseAdminClient();
  const { data: duplicate, error: duplicateError } = await supabase
    .from("orders")
    .select("code")
    .eq("idempotency_key", input.idempotencyKey)
    .maybeSingle();
  if (duplicateError) throw new Error(`Unable to check duplicate orders: ${duplicateError.message}`);
  if (duplicate) throw new DuplicateOrderError(duplicate.code);

  const { data: saved, error } = await supabase
    .from("orders")
    .insert({
      code: input.code,
      fulfilment_type: input.fulfilmentType,
      customer_name: input.customerName,
      customer_phone: input.customerPhone,
      notes: input.notes || null,
      subtotal_paise: input.lines.reduce((sum, line) => sum + line.unitPricePaise * line.quantity, 0),
      total_paise: input.lines.reduce((sum, line) => sum + line.unitPricePaise * line.quantity, 0),
      idempotency_key: input.idempotencyKey,
    })
    .select("id, code, placed_at")
    .single();
  if (error || !saved) throw new Error(`Unable to save order: ${error?.message ?? "empty response"}`);

  const orderItems = input.lines.map((line, index) => ({
    order_id: saved.id,
    name_snapshot: line.name,
    unit_price_paise: line.unitPricePaise,
    quantity: line.quantity,
    sort_order: index,
  }));
  const { error: itemError } = await supabase.from("order_items").insert(orderItems);
  if (itemError) throw new Error(`Unable to save order items: ${itemError.message}`);

  const { error: eventError } = await supabase.from("order_status_events").insert({
    order_id: saved.id,
    to_status: "pending",
    actor_label: "Customer",
  });
  if (eventError) throw new Error(`Unable to save order event: ${eventError.message}`);

  return {
    id: saved.id,
    code: saved.code,
    createdAt: saved.placed_at,
    status: "pending",
    paymentStatus: "not-required",
    fulfilmentType: input.fulfilmentType,
    customerName: input.customerName,
    customerPhone: input.customerPhone,
    notes: input.notes,
    lines: input.lines,
    totals: {
      subtotalPaise: input.lines.reduce((sum, line) => sum + line.unitPricePaise * line.quantity, 0),
      discountsPaise: 0,
      packagingPaise: 0,
      taxesPaise: 0,
      deliveryPaise: 0,
      totalPaise: input.lines.reduce((sum, line) => sum + line.unitPricePaise * line.quantity, 0),
    },
    events: [{ at: saved.placed_at, status: "pending", by: "Customer" }],
    isDemo: false,
  };
}

export class DuplicateOrderError extends Error {
  constructor(public readonly code: string) {
    super("This order was already submitted.");
  }
}
