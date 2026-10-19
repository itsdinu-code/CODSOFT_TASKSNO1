/**
 * Staff roles and what each of them may do.
 *
 * The prototype ships these as a reference for the production permissions
 * table. Nothing in the prototype actually authenticates anybody: the admin
 * and the kitchen board are open routes, and every screen in them is
 * labelled as a sample-data view. Before launch, both routes must sit behind
 * real authentication and every action must be checked on the server.
 */

export type Role = "owner" | "manager" | "counter" | "kitchen";

export interface Permission {
  id: string;
  label: string;
  roles: Role[];
}

export const ROLES: { id: Role; label: string; blurb: string }[] = [
  {
    id: "owner",
    label: "Owner",
    blurb: "Everything: menu, prices, staff, reports, settings.",
  },
  {
    id: "manager",
    label: "Manager",
    blurb: "Orders, menu availability, campaigns and the shift reports.",
  },
  {
    id: "counter",
    label: "Counter",
    blurb: "Take orders, accept them, hand them over and issue refunds.",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    blurb: "See the tickets and move them along. No prices, no reports.",
  },
];

export const PERMISSIONS: Permission[] = [
  { id: "order:view", label: "See the order queue", roles: ["owner", "manager", "counter", "kitchen"] },
  { id: "order:accept", label: "Accept or reject an order", roles: ["owner", "manager", "counter"] },
  { id: "order:prepare", label: "Move a ticket through preparation", roles: ["owner", "manager", "kitchen"] },
  { id: "order:refund", label: "Refund and cancel", roles: ["owner", "manager"] },
  { id: "menu:view", label: "See the menu and prices", roles: ["owner", "manager", "counter"] },
  { id: "menu:edit", label: "Create and edit menu items", roles: ["owner", "manager"] },
  { id: "menu:price", label: "Change a price", roles: ["owner"] },
  { id: "menu:availability", label: "Toggle availability", roles: ["owner", "manager", "counter"] },
  { id: "campaign:manage", label: "Run campaigns", roles: ["owner", "manager"] },
  { id: "report:view", label: "See sales reports", roles: ["owner", "manager"] },
  { id: "staff:manage", label: "Manage staff accounts", roles: ["owner"] },
  { id: "settings:manage", label: "Change restaurant settings", roles: ["owner"] },
];

export function can(role: Role, permissionId: string): boolean {
  const permission = PERMISSIONS.find((p) => p.id === permissionId);
  return permission ? permission.roles.includes(role) : false;
}

/** The role the prototype pretends you are signed in as. */
export const DEMO_ROLE: Role = "owner";

export const DEMO_USER = {
  name: "Demo owner",
  role: DEMO_ROLE,
  note: "The prototype is not authenticated. Every screen below is a sample-data view.",
};
