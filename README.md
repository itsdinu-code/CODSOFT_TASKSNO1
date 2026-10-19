# Chickady's × DineDesk

A complete digital experience for **Chickady's**, a fried chicken, burger and
loaded-fries kitchen on 150 Feet By-pass Road, Alappakkam, Chennai — built as a
**prototype** that can be connected to a real database, a real payment
provider and a real kitchen.

It contains a customer website, a searchable menu, a simulated ordering flow,
order tracking, an admin dashboard and a kitchen display system.

> **This is a prototype, not a live restaurant.** No order placed here reaches
> the restaurant, no payment is taken, and no card details are collected
> anywhere on the site. Every screen that shows operational data says so on
> its face.

---

## 1. Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run typecheck            # tsc --noEmit
npm run lint                 # eslint
```

Node 20 or newer. No environment variables are needed to run the prototype —
see [`.env.example`](.env.example) for what a production deployment requires.

### Where to look

| Route | What it is |
|---|---|
| `/` | The home page: hero, printed menu sheet, campaigns, meal boxes, shop gallery, reviews, directions, FAQ, order card |
| `/menu` | Searchable, filterable menu — 58 lines across 11 categories |
| `/menu/[slug]` | A dish: price, portion, modifiers, quantity, add to cart |
| `/cart` | The cart, with quantities and a bill that explains itself |
| `/checkout` | Simulated checkout — fulfilment, name, number, review, place |
| `/order/[code]` | Order tracking, clearly marked as simulated |
| `/combos`, `/about`, `/gallery`, `/contact`, `/faq` | The rest of the customer site |
| `/legal/privacy`, `/legal/terms`, `/legal/policies`, `/accessibility` | Policies and the accessibility statement |
| `/admin` | The admin dashboard: overview, orders, menu, campaigns, settings, audit log |
| `/kitchen` | The kitchen display system |
| `POST /api/orders` | Order creation with server-side price validation |

---

## 2. The brand, and where it came from

The restaurant's own published material was used as the source of the design
system, and nothing was invented to fill a gap.

**The wordmark** (`public/brand/chickadys-wordmark.png`) was extracted from the
orange campaign card the owner published on the Google Maps business profile,
and keyed to a transparent background. The lettering is the original: it has
not been redrawn, and it is not set in a substitute typeface. The yellow badge
mark (`public/brand/chickadys-badge.png`) was taken the same way from the
Red Dragon launch poster. Both are used as CSS masks, so they can be printed
in any ink the layout needs.

**The photographs** are the restaurant's own: the printed menu board, the
printed fried-chicken board, the Saucy wings panel, the Red Dragon poster, the
"We're open" card and the ice creams, all photographed from the owner's
published posts on 19 October 2026. A listing photograph of the shopfront
exists on the Zomato page and has deliberately **not** been used, because
permission to reproduce it has not been given.

**The palette** is sampled from those boards: cream `#FFF1D4`, charcoal
`#171310`, brand orange `#F4510B`, fire red `#E51B23`, deep black `#090909`.
The type is Barlow Condensed for the printed-board voice and Barlow for
reading. The full token set is in [`src/app/globals.css`](src/app/globals.css).

**The design direction** was dealt with the Taste skill and is written up in
[`docs/design-notes.md`](docs/design-notes.md), including the two slots that
were redrawn and why.

---

## 3. The menu, and its sources

Two sources are kept apart and never merged.

**The printed boards** (58 lines) are canonical. They were photographed on
19 October 2026 and read line by line — burgers, loaded fries, nachos, the
Chickady's exclusives, flavoured wings and tenders, quick bites, fried
chicken, the dips and add-ons, and the seven meal boxes from the second
board. Every price in [`src/lib/menu/data.ts`](src/lib/menu/data.ts) carries
its `source` and the date it was read.

**The public listings** (Zomato and Swiggy) supply only the items the boards
do not price: the beverages, the mocktails and frappes, the Cheese Dip and
the buckets. Every one of those is flagged `verification: "pending"`, and its
card says the price has not been confirmed by the shop.

**Seven prices differ between the board and the listing** — the board's Classic
Fries are ₹99/129 against the listing's ₹129/169, and so on. The board wins
on the storefront, and the differences are listed in the admin's price audit
and in the owner checklist for a decision.

The Red Dragon burger is **not orderable**. Its poster exists, so it has a
campaign, but its price, ingredients and current availability are not
recorded anywhere that can be read, and the site says so wherever it appears.

---

## 4. What the prototype does not do

These are deliberate, and each one is labelled on the screen it affects.

- **No payments.** The checkout is a simulation. No card field exists, and the
  privacy page says so.
- **No orders reach the kitchen.** Orders are written to the browser's local
  storage. They are not visible to the restaurant, they do not appear on
  another device, and they are not a record of anything.
- **No authentication.** `/admin` and `/kitchen` are open routes showing
  sample data. The role and permission table that should be enforced is
  written out in [`src/lib/auth/roles.ts`](src/lib/auth/roles.ts).
- **No taxes, packaging or delivery fees are charged**, because the restaurant
  has not published its rates. The bill says so rather than inventing a
  number.
- **No reviews are reproduced.** The site shows the Zomato rating of 4.3 from
  81 ratings, read from the listing on 19 October 2026, attributes it to
  Zomato, dates it, and links out. No review text, reviewer name or star
  rating is copied.
- **No shop photographs.** The gallery lists the six shots that are missing
  and the three the restaurant has published.

---

## 5. Architecture

```
src/
  app/
    (site)/            the customer site — home, menu, cart, checkout, order,
                       about, gallery, contact, faq, combos, legal, accessibility
    admin/             the admin dashboard (own shell, own stylesheet)
    kitchen/           the kitchen display system (own shell, own stylesheet)
    api/orders/        order creation with server-side price validation
    layout.tsx         fonts, metadata, restaurant structured data
    globals.css        the design tokens and the component layer
  components/
    brand/             ChickadysLogo, the animated mark, the loading screen
    home/              hero, menu sheet, campaigns, combo slips, gallery,
                       reviews, directions, FAQ, order card
    menu/              the menu browser, product tiles, the product sheet
    cart/              the cart and the checkout form
    orders/            the order tracker
    site/              header, footer, prose pages
    admin/             overview, orders, menu manager, campaigns, settings, audit
    kitchen/           the kitchen board
  lib/
    menu/              the menu data and the queries over it
    orders/            the state machine and the sample orders
    store/             the cart and the order store (client, local storage)
    auth/              roles and permissions
    pricing.ts         price calculation and server-side cart validation
    campaigns.ts       the campaign system
    gallery.ts         the shop photography and the shot list
    reviews.ts         the review sources and their retrieval dates
    restaurant.ts      the business facts, each with its source
  types/               the shared types
public/
  brand/               the extracted wordmark and badge
  campaigns/           the owner's published campaign artwork
  menu/                the printed boards and the food photographs
  gallery/             the shop and product photographs
docs/
  001_schema.sql       the relational model
  001_schema.down.sql  the roll-back
  owner-verification.md  the checklist the owner has to work through
  design-notes.md      the design direction, the redraws and the critique
  test-results.md      what was tested and what was not
```

### The database

[`docs/001_schema.sql`](docs/001_schema.sql) is the full relational model:
staff profiles and roles, categories, items, modifier groups and modifiers, a
price history, orders, order items, order item modifiers, order status
events, payments, refunds, tables, reservations, coupons, campaigns,
restaurant settings, opening hours, audit logs and notification logs.

Money is integer paise everywhere, in the database and in the code. Prices
are never floats and are never accepted from the browser.

### Server-side validation

`POST /api/orders` recalculates every price from the canonical menu. The
total the browser sends is never read, and a tampered unit price is ignored.
Unknown items, sold-out items, items without a required choice, a delivery
type the restaurant has not confirmed and an invalid phone number are all
rejected with a reason. This was tested — see
[`docs/test-results.md`](docs/test-results.md).

### Order state machine

```
pending → accepted → preparing → ready → completed
                    ↘ rejected / cancelled
```

Transitions are declared in [`src/lib/orders/state.ts`](src/lib/orders/state.ts)
and are checked on both sides. Fulfilment state and payment state are
separate axes: an order can be ready for pickup while its payment is still
pending, and the prototype never guesses a payment outcome.

---

## 6. Accessibility, SEO and performance

- Semantic HTML, one `h1` per page, a heading on every section.
- Full keyboard operation with a visible focus ring in the brand colour.
- Form labels, announced errors, and required fields marked in text.
- Body text at 17px and above; the smallest text on the site is 13px.
- Colour is never the only signal: order states and statuses always carry
  words.
- `prefers-reduced-motion` is honoured: the logo still appears, the scroll
  reveals do not run, the card does not shrink.
- The animated logo uses CSS only — transform and opacity, no layout work.
- Restaurant structured data is emitted from the verified business fields
  only, and the `comment` field says the hours are a listing snapshot.
- Metadata, Open Graph and Twitter cards on every page; the admin, kitchen,
  cart, checkout and order pages are `noindex`.
- Images are sized, lazy-loaded below the fold, and the hero image is
  preloaded. The largest hero asset is 123 KB.

---

## 7. Production requirements

Before this becomes a live ordering site, in this order:

1. **Owner verification.** Work through
   [`docs/owner-verification.md`](docs/owner-verification.md). The menu, the
   hours, the address, the Red Dragon burger and the shop photographs all
   block something.
2. **Database and authentication.** Apply the schema, wire the admin and
   kitchen routes to real sessions, and enforce the role table on the server
   for every privileged action.
3. **Order pipeline.** Orders must be written server-side, delivered to the
   kitchen display over a channel the shop can rely on, and guarded against
   duplicate submission with the `idempotency_key` column.
4. **Payments.** Onboard a provider chosen by the restaurant. Keep the secret
   key on the server, verify the webhook signature server-side, store the
   provider reference and never a card number.
5. **Security.** Row-level security on every table, rate limiting on the
   public order endpoint, sanitised user text, restricted upload types and
   sizes, and secrets out of the client bundle.
6. **Backups, monitoring, recovery.** Automated backups with a rehearsed
   restore, error tracking, uptime checks, and a named person on call.
7. **Legal.** The privacy policy, terms and cancellation policy on this site
   are drafting scaffolds. They need a data-handling contact, a retention
   period, and a lawyer's eye.
8. **Staff training.** A walk-through of the counter screen, the kitchen
   board and the customer site, and a rollback plan for a bad launch day.

---

## 8. Known limitations

- The menu is a photograph of a board, not a live feed. Changing a price in
  the admin records an audit entry; it does not change the canonical menu,
  because only the owner can change the board.
- The campaign manager works in the browser. In production a campaign belongs
  in the `campaigns` table with real dates.
- The kitchen board has no sound. A production board needs a new-ticket
  chime the staff can silence, and a network-reconnecting state that restores
  the queue rather than just reporting it.
- The order reference is random rather than sequential, so two people ordering
  in the same second cannot collide, but the sequence is not meaningful.
- The order tracker shows simulated progress. Real progress needs the order
  status events to come from the backend.
- The site has not been tested with a real screen reader or audited against
  WCAG 2.2 AA by a specialist.
- No video is used, because no honest footage of the restaurant exists. The
  one moving picture is a slow drift on a photograph.

---

## 9. Licence and credits

Brand assets — the wordmark, the badge, the menu boards and the campaign
artwork — belong to Chickady's and are used here with the restaurant's
knowledge, for the purpose of building their site. Third-party listing
photographs have not been reproduced.

The Zomato listing, the Swiggy listing and the Google Maps business profile
are linked to rather than copied from.
