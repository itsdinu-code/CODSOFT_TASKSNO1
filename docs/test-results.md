# Test results

What was checked, what the result was, and what was not checked at all.

---

## 1. Build and type safety

| Check | Command | Result |
|---|---|---|
| Types | `npm run typecheck` (`tsc --noEmit`) | Clean, no errors |
| Lint | `npm run lint` (`eslint`) | Clean, no errors |
| Production build | `npm run build` | 66 routes generated, no errors |
| Node | v24.21.0, Next.js 16.4.2, React 19.3.0, Tailwind v4 | — |

The build is configured with `experimental.cpus: 2` because the machine it was
built on has 8 GB of RAM and the default worker count exhausted the heap
during static generation. On a larger machine that setting can be removed.

## 2. Routes

Every route was requested against a production build and returned **200**.

```
/                         200      /admin                 200
/menu                     200      /admin/orders          200
/menu/nashville-hot-chicken-burger 200  /admin/menu    200
/cart                     200      /admin/campaigns       200
/checkout                 200      /admin/settings        200
/order/CD-4821            200      /admin/audit           200
/about                    200      /kitchen               200
/gallery                  200
/contact                  200
/faq                      200
/combos                   200
/legal/privacy            200
/legal/terms              200
/legal/policies           200
/accessibility            200
```

The 58 menu lines are prerendered as static pages; `/menu` and `/order/[code]`
are server-rendered because they read the query string and the path.

## 3. Server-side order validation

`POST /api/orders` was called six ways. It recalculates every price from the
canonical menu and never reads a total from the request.

| Request | Result |
|---|---|
| 2 × Nashville Hot Chicken with a dip, plus the Friendship Meal Box | **200** — ₹249 + ₹25 dip = ₹274 each, + ₹549 → subtotal **₹1,097** |
| An item id that does not exist | **409** — `unknown-item` |
| `fulfilmentType: "delivery"` | **400** — the restaurant has not confirmed own delivery |
| A phone number of `abc` | **400** — a contact number is needed |
| The Saucy Wings box with no flavour chosen | **409** — `missing-modifier` |
| A line claiming `unitPricePaise: 1` for a ₹189 burger | **200** — the price was recalculated to **₹189**; the tampered value was ignored |

## 4. Customer journey

Checked in a real browser against the production build.

- Adding a dish from its page writes the correct line to the cart, with the
  modifier that was selected, and the cart count in the header updates.
- The cart survives a reload, and the quantity and remove controls work.
- The checkout shows the fulfilment choice, the name and number fields and
  the bill; the total is computed from the menu, not from the browser.
- Placing an order creates a reference and lands on the tracking page, which
  shows the five stages, the history and the note that tracking is simulated.
- The order appears in the admin queue and on the kitchen board, because both
  read the same store.

## 4b. Admin and kitchen

Checked in a real browser against the production build.

- `/admin` opens with the sample-data banner, the four figures computed from
  the eight sample orders, a bar chart of takings by the hour, the queue, the
  menu lines waiting on the owner and the live campaigns.
- `/admin/orders` lists the queue, filters by state, and moving a ticket
  through accept → preparing → ready → completed writes a history entry that
  is visible on the ticket.
- `/admin/menu` lists all 58 lines with their source and the date they were
  read, toggles availability, records a price change in the price history,
  and lists the seven places where the board and the listing disagree.
- `/admin/settings` edits opening hours per day and shows the staff and
  permission matrix, with the business fields still marked "to confirm".
- `/admin/audit` lists every order movement in the session and the menu
  decisions still open.
- `/kitchen` shows three columns — new, preparing, ready — with the order
  reference, the minutes since it was received, the items with their
  quantities and chosen modifiers, the note for the kitchen, and one tap per
  move. A ticket that has been waiting more than fifteen minutes shows its
  age in red. The sample orders re-base on the current time, so the board
  shows a live queue rather than a fixed afternoon.

## 5. Design gate

The Taste skill's inspector was run against the built site at **1440, 768 and
390** pixels, three times, and the failures were worked through until there
were none.

Final run: **0 failures, 7 warnings.**

| Measurement | 1440px | 768px | 390px |
|---|---|---|---|
| Hero headline | 96px (6.7vw), 2 lines | 56px, 2 lines | 40px, 2 lines |
| Running body text | 17px | 17px | 17px |
| Distinct sizes on the page | 9 | 9 | 9 |
| Longest heading | 2 lines | 2 lines | 2 lines |
| Horizontal overflow | none | none | none |
| Page | 12.6 screens, 1,549 words, 13 real images | | |

| Warning | Why it stands |
|---|---|
| `palette-cream` | The cream ground is the restaurant's own printed board, photographed on 19 October 2026. The brand owns the colour. |
| `dashed` | Four dotted rules: the perforation on the directions coupon and the ticket rules on the meal-box slips. Both are devices of the artefact. |
| `card-rows` | Two rows of identical tiles: the shop gallery, which the direction's blueprint draws as a grid of photo tiles with label strips. A gallery is a repeated module. |
| `side-scroll` | One row scrolls sideways: the campaign carousel. |
| `no-footage` | There is no honest video of the restaurant. The one moving picture is a slow drift on a photograph. |
| `ragged-edges` | Twelve left edges across the page. Three recur — the page margin, the second column and the note column — and the rest are the hero card's inner edge and the prose pages. |
| `empty-middle` | One section, at 768px: the campaign carousel, whose cards sit in a horizontal strip by design. |

Screenshots from the final run are in `.taste-skill/inspect/`.

## 6. Accessibility

Checked in the code and in the browser.

- One `h1` per page, a heading on every section, and the longest heading is
  two lines at every width.
- The hero headline is 96px on desktop, 56px at 768 and 40px at 390, and is
  two lines at all three.
- The smallest text on the site is 13px; running text is 17px.
- No horizontal overflow at any of the three widths.
- The `prefers-reduced-motion` branch is written for the logo, the scroll
  reveals and the pinned card.
- Focus outlines are visible and use the brand colour.
- The kitchen board's controls are 56px tall; the site's buttons are 48px.

**Not checked:** no testing with a real screen reader, no WCAG 2.2 AA audit by
a specialist, and no testing on the tablet the kitchen would actually use.

## 7. Performance

- 13 images on the home page, all of them the restaurant's own, all under
  125 KB.
- The largest asset on the site is the fried-chicken board at 123 KB.
- The animated logo is CSS only: transform and opacity, no layout work.
- The scroll reveals use `animation-timeline: view()` where it is supported
  and do nothing where it is not, so no content waits on JavaScript.
- The largest hero asset is preloaded; everything else is lazy-loaded.

**Not checked:** no Lighthouse run, no profiling on a mid-range Android
phone, and no Core Web Vitals measured on a real connection.

## 8. What was not tested at all

- Payment. There is no payment integration to test.
- The database. The schema in `docs/001_schema.sql` has not been applied to a
  live Postgres instance, because there is no database in this prototype.
- Authentication. `/admin` and `/kitchen` are open routes by design and
  their permissions are documented rather than enforced.
- Notifications. Nothing is sent.
- Reservation and table ordering. Neither is built, because the restaurant
  has not confirmed that it offers them.
