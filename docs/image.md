# image.md — the photographs and artwork we hold

This prototype uses only material the restaurant published itself. Nothing is
borrowed from a stock library, and the Zomato shopfront photograph is
deliberately **not** used (it belongs to posters on the listing platform, not
to the restaurant).

For every file below: **source** is where the image came from, and **held**
means we can show it, because the restaurant published it first.

## Brand marks — `public/brand/`

| File | What it is | Source | Used by |
|---|---|---|---|
| `chickadys-badge.png` | The rounded-rect badge, original lettering lifted to alpha (384×273) | The owner's published artwork / board sign | Header, footer badge, the **BrandIntro** ident (entrance + light-sweep mask) |
| `chickadys-wordmark.png` | The wordmark, same treatment (548×278) | Same | `ChickadysLogo` wordmark variant, hero card |

Both are used as masks, never redrawn. The ident's SVG border trace runs
inset ~11px over the badge box, which matches the badge's own printed border.

## Food photographs — `public/food/` (the owner's shared set, 35 files)

The set the owner shared directly (restaurant handout / listing shots,
`712px`-class JPEGs, random-UUID file names as received). Every frame is a
styled food photograph; captions in `DriftBoard` only describe what is
actually visible. Highlights:

| File | Subject |
|---|---|
| `chickday-s-foods.jpg` | Crispy fried chicken on the house orange |
| `024824e0-…jpg` | Bunless crispy chicken stack, sauce dripping |
| `02580bac-…jpg` | Full tray — burger, bites, strips, fries, drink (+ table games) |
| `02ce61f6-…jpg` / `05d1d517-…jpg` | Pink mocktails in the branded cup |
| `1846b559-…jpg` / `27375c70-…jpg` | Berry/blueberry frappés in the branded cup |
| `1c9f95f6-…jpg` | Wings three ways + cream dip |
| `256b8273-…jpg` | Fried-chicken feast tray with two dips |
| `2d5ccc39-…jpg` / `795bafa7-…jpg` | Loaded fries (bites+cheese / cheese-laced) |
| `378cb137-…jpg` | Iced cola, branded cup |
| `3a245085-…jpg` | Pickle chicken burger, fries + strips |
| `3d4140e2-…jpg` / `7cb68525-…jpg` | Boxes of popcorn/boneless bites |
| `57c3549b-…jpg` | Glazed fiery drums box |
| `5d77cee5-…jpg` | Popcorn trio: classic, peri peri, signature dust |
| `5fba6bbf-…jpg` | Red velvet scoops + brownie crumbs |
| `623dfc57-…jpg` | House dip close-up |
| `6d1f7216-…jpg` | Jalapeño + melted-cheese chicken burger |
| `6e25153b-…jpg` | Tenders box, cola and dip |
| `8100c805-…jpg` | Lotus-biscoff scoops |
| `a0281059-…jpg` | Blue lemonade mocktail |
| `ae7eee2d-…jpg` | Veggie patty burger |
| `c59f09ae-…jpg` / `cd2612bb-…jpg` | Tenders two ways / flavour board |
| `d0d759d2-…jpg` | Biscoff frappe with Lotus biscuit |
| `d6284f56-…jpg` | Crispy drums packed to go |
| `d6baeaa1-…jpg` | Virgin mojito |
| `d9e4a3c8-…jpg` | Fiery glazed crispy burger (hero card) |
| `e449695b-…jpg` | Orange iced refreshment |
| `e7127081-…jpg` | Four crispy burgers lined up |
| `ea6ba5a4-…jpg` | Burger + fries + cola meal box |
| `f32de68d-…jpg` | Grilled patty burger on dark board |

Two frames quietly carry third-party marks that appear in the restaurant's
own photography (a Pepsi cup in `6e25153b-…` and `ea6ba5a4-…`, plus the tray
in `02580bac-…`). They are shown as-is because they are the restaurant's own
photos; flag to the owner if that matters for their brand guidelines.

## Menu documents — `public/menu/` (board photographs)

Taken from the printed fried-chicken board at the counter. These now supply
the menu/hero imagery (not the drift wall).

| File | Subject |
|---|---|
| `box-drumsticks.jpg` | Drumsticks in the red box |
| `box-loaded-fries.jpg` | Loaded fries box |
| `box-solid-treat.jpg` | Take-home box with fries and a Pepsi |
| `meal-box-ultimate.jpg` | Ultimate Savings Meal, fourteen pieces |
| `wings-buffalo.jpg` | Buffalo wings, striped box |
| `wings-korean-bbq.jpg` | Korean BBQ wings, striped box |
| `wings-nashville.jpg` | Nashville wings, striped box |
| `board-menu.jpg` | The full printed board (reference shot, not styled as food) |

## Campaign artwork — `public/campaigns/` and `public/gallery/`

| File | Subject | Held / needed |
|---|---|---|
| `campaign-red-dragon.jpg` | The Red Dragon launch poster (black/red) | Held — owner post |
| `campaign-open-late.jpg` | "WE'RE OPEN, till night 12" card | Held — owner post |
| `campaign-saucy-wings.jpg` | Saucy wings campaign card | Held — owner post |
| `board-fried-chicken.jpg` | The counter board, photographed | Held |
| `fried-row.jpg` | A row of the red fried-chicken boxes | Held |
| `gallery/ice-cream-vanilla.jpg` | Vanilla scoop from the "scoops are back" card | Held — owner post |
| `gallery/ice-cream-chocolate.jpg` | Chocolate scoop, same card | Held — owner post |
| `gallery/maps-profile-updates.jpg` | The Google Maps profile screenshot | Held — used only to *document* the listing, never styled as food |

## The DriftWall selection ("food only")

The drifting wall (`src/components/reactbits/DriftWall.jsx`, used by
`DriftBoard` on the home page) is deliberately fed **food shots only** —
and since the owner shared their full photo set, it now runs on that set
exclusively (`public/food/`, all 35 frames, one tile per photo).

Deliberately excluded from the wall, and why:

- `maps-profile-updates.jpg` — a UI screenshot, not food.
- `board-menu.jpg` — it is a photograph *of the printed menu*, not a plate.
- The campaign posters/cards (`campaign-*`) — artwork, not food.
- The previous wall tiles (`menu/box-*`, `menu/wings-*`, `campaigns/fried-row`,
  `gallery/ice-cream-*`) were **retired from the wall** once the owner's own
  set arrived — their photos still serve the menu/hero/gallery sections.
- Any shopfront, exterior, counter, seating or kitchen shot —

## Still owed from the owner

The full shot list in `src/lib/gallery.ts` marks what is not held yet:
shopfront/signboard, entrance/counter, dining area, kitchen/prep, and any
photo containing people (needs their permission). Nothing in the site fakes
these; the "Needed" tiles state it plainly on the label.
