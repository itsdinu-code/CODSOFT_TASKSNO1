-- Roll back the Chickady's x DineDesk schema.
-- Order matters: children first.
--
-- psql "$DATABASE_URL" -f docs/001_schema.down.sql

drop table if exists notification_logs;
drop table if exists audit_logs;
drop table if exists opening_hours;
drop table if exists restaurant_settings;
drop table if exists campaigns;
drop table if exists coupons;
drop table if exists reservations;
drop table if exists restaurant_tables;
drop table if exists refunds;
drop table if exists payments;
drop table if exists order_status_events;
drop table if exists order_item_modifiers;
drop table if exists order_items;
drop table if exists orders;
drop table if exists menu_price_history;
drop table if exists menu_modifiers;
drop table if exists menu_modifier_groups;
drop table if exists menu_items;
drop table if exists menu_categories;
drop table if exists staff_profiles;

drop function if exists order_item_modifier_total_paise(uuid);
drop function if exists order_total_paise(uuid);

drop type if exists modifier_price_mode;
drop type if exists dietary_marker;
drop type if exists price_source;
drop type if exists verification_state;
drop type if exists fulfilment_type;
drop type if exists payment_status;
drop type if exists order_status;
drop type if exists staff_role;
