-- ==========================================================================
-- Chickady's x DineDesk — relational model
--
-- PostgreSQL 15+ (Supabase or any managed Postgres).
-- Money is stored in integer paise. 1 rupee = 100 paise. No floats.
--
-- Apply with:  psql "$DATABASE_URL" -f docs/001_schema.sql
-- Roll back with: psql "$DATABASE_URL" -f docs/001_schema.down.sql
-- ==========================================================================

create extension if not exists "pgcrypto";
create extension if not exists "citext";

-- --------------------------------------------------------------------------
-- Enums
-- --------------------------------------------------------------------------

create type order_status as enum (
  'pending', 'accepted', 'preparing', 'ready', 'completed', 'rejected', 'cancelled'
);

create type payment_status as enum (
  'not-required', 'pending', 'paid', 'failed', 'refunded'
);

create type fulfilment_type as enum ('takeaway', 'delivery', 'dine-in');

create type verification_state as enum ('confirmed', 'pending');

create type price_source as enum (
  'printed-menu-board', 'printed-combo-board', 'owner-post',
  'zomato-listing', 'swiggy-listing', 'google-maps', 'demo'
);

create type dietary_marker as enum ('veg', 'non-veg', 'unknown');

create type staff_role as enum ('owner', 'manager', 'counter', 'kitchen');

create type modifier_price_mode as enum ('additive', 'absolute');

-- --------------------------------------------------------------------------
-- Staff
-- --------------------------------------------------------------------------

create table staff_profiles (
  id            uuid primary key default gen_random_uuid(),
  auth_user_id  uuid unique not null,          -- Supabase Auth user id
  full_name     text not null,
  phone         text,
  role          staff_role not null default 'counter',
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- Menu
-- --------------------------------------------------------------------------

create table menu_categories (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  note          text,
  board_heading text,                          -- the title printed on the board
  sort_order    integer not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table menu_items (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  category_id     uuid not null references menu_categories(id) on delete restrict,
  name            text not null,
  description     text,
  -- The customer-facing price, in paise. Null means no price is established.
  price_paise     integer check (price_paise is null or price_paise >= 0),
  currency        char(3) not null default 'INR',
  portion         text,                         -- "4 pcs", "Regular / Large"
  dietary         dietary_marker not null default 'unknown',
  heat_level      smallint check (heat_level between 0 and 3),
  board_note      text,                         -- "Must try"
  image_path      text,                         -- object storage key, not a URL
  is_available    boolean not null default true,
  is_featured     boolean not null default false,
  is_published    boolean not null default false,
  source          price_source not null,
  source_url      text,
  last_verified_at date,
  last_reviewed_by uuid references staff_profiles(id) on delete set null,
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index menu_items_category_idx on menu_items (category_id, sort_order);
create index menu_items_published_idx on menu_items (is_published, is_available);

create table menu_modifier_groups (
  id             uuid primary key default gen_random_uuid(),
  item_id        uuid not null references menu_items(id) on delete cascade,
  name           text not null,
  is_required    boolean not null default false,
  min_selections integer not null default 0,
  max_selections integer not null default 1,
  price_mode     modifier_price_mode not null default 'additive',
  sort_order     integer not null default 0
);

create table menu_modifiers (
  id         uuid primary key default gen_random_uuid(),
  group_id   uuid not null references menu_modifier_groups(id) on delete cascade,
  name       text not null,
  price_paise integer not null default 0,
  is_default boolean not null default false,
  is_active  boolean not null default true,
  sort_order integer not null default 0
);

-- A record of every price that was ever published, so a receipt can be
-- explained years later.
create table menu_price_history (
  id           uuid primary key default gen_random_uuid(),
  item_id      uuid not null references menu_items(id) on delete cascade,
  price_paise  integer,
  changed_by   uuid references staff_profiles(id) on delete set null,
  reason       text,
  changed_at   timestamptz not null default now()
);

create index menu_price_history_item_idx on menu_price_history (item_id, changed_at desc);

-- --------------------------------------------------------------------------
-- Orders
-- --------------------------------------------------------------------------

create table orders (
  id                uuid primary key default gen_random_uuid(),
  -- The short reference a customer reads out at the counter.
  code              text unique not null,
  fulfilment_type   fulfilment_type not null,
  status            order_status not null default 'pending',
  -- Fulfilment and payment are separate axes.
  payment_status    payment_status not null default 'not-required',
  customer_name     text not null,
  customer_phone    text not null,
  notes             text,
  table_id          uuid,
  -- Totals, all in paise, all calculated on the server.
  subtotal_paise    integer not null default 0,
  discount_paise    integer not null default 0,
  packaging_paise   integer not null default 0,
  tax_paise         integer not null default 0,
  delivery_paise    integer not null default 0,
  total_paise       integer not null default 0,
  tax_rate_bps      integer,                    -- basis points, e.g. 500 = 5%
  idempotency_key   text unique,                -- stops a double submit
  placed_at         timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index orders_status_idx on orders (status, placed_at);
create index orders_placed_at_idx on orders (placed_at desc);

create table order_items (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references orders(id) on delete cascade,
  menu_item_id  uuid references menu_items(id) on delete set null,
  -- The name and price as they were at the time of the order.
  name_snapshot text not null,
  unit_price_paise integer not null,
  quantity      integer not null check (quantity > 0),
  note          text,
  sort_order    integer not null default 0
);

create table order_item_modifiers (
  id             uuid primary key default gen_random_uuid(),
  order_item_id  uuid not null references order_items(id) on delete cascade,
  group_name     text not null,
  modifier_name  text not null,
  price_paise    integer not null default 0
);

create table order_status_events (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders(id) on delete cascade,
  from_status order_status,
  to_status   order_status not null,
  actor_id    uuid references staff_profiles(id) on delete set null,
  actor_label text,                            -- "Counter", "System", "Customer"
  note        text,
  created_at  timestamptz not null default now()
);

create index order_status_events_order_idx on order_status_events (order_id, created_at);

create table payments (
  id                 uuid primary key default gen_random_uuid(),
  order_id           uuid not null references orders(id) on delete cascade,
  provider           text not null,            -- 'razorpay', 'cash', ...
  provider_reference text,                     -- never a card number
  amount_paise       integer not null,
  status             payment_status not null default 'pending',
  method             text,                     -- 'upi', 'card', 'cash'
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  -- Raw card details are never stored, anywhere.
  constraint no_raw_card_data check (provider_reference !~ '^[0-9]{12,19}$')
);

create table refunds (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references orders(id) on delete cascade,
  payment_id    uuid references payments(id) on delete set null,
  amount_paise  integer not null,
  reason        text not null,
  authorised_by uuid references staff_profiles(id) on delete set null,
  created_at    timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- Tables, reservations, coupons
-- --------------------------------------------------------------------------

create table restaurant_tables (
  id         uuid primary key default gen_random_uuid(),
  label      text unique not null,
  capacity   integer not null default 4,
  is_active  boolean not null default true,
  qr_token   text unique,                      -- a non-secret identifier only
  created_at timestamptz not null default now()
);

create table reservations (
  id            uuid primary key default gen_random_uuid(),
  guest_name    text not null,
  guest_phone   text not null,
  party_size    integer not null,
  requested_at  timestamptz not null,
  table_id      uuid references restaurant_tables(id) on delete set null,
  status        text not null default 'requested',  -- requested/confirmed/seated/cancelled/no-show
  notes         text,
  created_at    timestamptz not null default now()
);

create table coupons (
  id             uuid primary key default gen_random_uuid(),
  code           text unique not null,
  description    text,
  discount_paise integer,
  discount_bps   integer,
  max_discount_paise integer,
  starts_at      timestamptz,
  ends_at        timestamptz,
  usage_limit    integer,
  used_count     integer not null default 0,
  is_active      boolean not null default true,
  created_at     timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- Campaigns and settings
-- --------------------------------------------------------------------------

create table campaigns (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  name           text not null,
  kind           text not null default 'banner',
  headline       text not null,
  body           text,
  artwork_path   text,
  cta_label      text,
  cta_href       text,
  theme          text not null default 'orange',
  starts_at      date,
  ends_at        date,
  is_active      boolean not null default false,
  needs_verification boolean not null default true,
  linked_item_ids uuid[] not null default '{}',
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table restaurant_settings (
  id            uuid primary key default gen_random_uuid(),
  key           text unique not null,
  value         jsonb not null,
  updated_at    timestamptz not null default now(),
  updated_by    uuid references staff_profiles(id) on delete set null
);

create table opening_hours (
  id        uuid primary key default gen_random_uuid(),
  day_of_week smallint not null check (day_of_week between 0 and 6),
  opens_at  time,
  closes_at time,
  is_closed boolean not null default false,
  note      text
);

-- --------------------------------------------------------------------------
-- Audit and notifications
-- --------------------------------------------------------------------------

create table audit_logs (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references staff_profiles(id) on delete set null,
  actor_label text,
  action      text not null,                   -- 'menu.price.update'
  entity      text not null,                   -- 'menu_item'
  entity_id   text,
  -- A safe description of the change. Never a secret, never a customer's
  -- personal data beyond what the business already holds.
  detail      jsonb not null default '{}',
  created_at  timestamptz not null default now()
);

create index audit_logs_created_idx on audit_logs (created_at desc);
create index audit_logs_entity_idx on audit_logs (entity, entity_id);

create table notification_logs (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid references orders(id) on delete cascade,
  channel    text not null,                    -- 'sms', 'whatsapp', 'email'
  template   text not null,
  outcome    text not null,                    -- sent/failed/skipped
  detail     text,
  created_at timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- Row level security
--
-- Turn this on for every table, then write policies for the roles the
-- business actually has. The examples below are the shape, not the policy:
-- the service role bypasses RLS, and the public website never talks to the
-- database directly.
-- --------------------------------------------------------------------------

alter table staff_profiles       enable row level security;
alter table menu_categories      enable row level security;
alter table menu_items           enable row level security;
alter table menu_modifier_groups enable row level security;
alter table menu_modifiers       enable row level security;
alter table menu_price_history   enable row level security;
alter table orders               enable row level security;
alter table order_items          enable row level security;
alter table order_item_modifiers enable row level security;
alter table order_status_events  enable row level security;
alter table payments             enable row level security;
alter table refunds              enable row level security;
alter table campaigns            enable row level security;
alter table restaurant_settings  enable row level security;
alter table opening_hours       enable row level security;
alter table audit_logs           enable row level security;
alter table notification_logs    enable row level security;
alter table staff_profiles       force row level security;

-- Staff can read the published menu through the application server only.
-- The public site reads the menu through a server route, never directly.

-- --------------------------------------------------------------------------
-- A price is never trusted from the client
-- --------------------------------------------------------------------------

create or replace function order_total_paise(p_order_id uuid)
returns integer
language sql
stable
as $$
  select coalesce(sum(oi.unit_price_paise * oi.quantity), 0)::integer
  from order_items oi
  where oi.order_id = p_order_id;
$$;

create or replace function order_item_modifier_total_paise(p_order_item_id uuid)
returns integer
language sql
stable
as $$
  select coalesce(sum(price_paise), 0)::integer
  from order_item_modifiers
  where order_item_id = p_order_item_id;
$$;

comment on table menu_items is
  'The canonical menu. price_paise is the price the shop charges. Update it only from an owner-approved source, and record the change in menu_price_history.';

comment on column orders.idempotency_key is
  'Sent by the client once per checkout attempt. A unique constraint turns a double tap into one order.';
