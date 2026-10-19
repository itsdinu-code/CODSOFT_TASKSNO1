# Design notes

How this site was designed, what was dealt and what was redrawn, and what is
still standing in for a real photograph.

---

## 1. The direction

Dealt with the Taste skill's `draw.mjs`, sector `restaurant`:

```bash
node <skill>/scripts/draw.mjs --sector restaurant \
  --brief "Chickady's, a fried chicken, burger and loaded-fries takeaway on a cream printed menu board with an orange brand, Alappakkam Chennai" \
  --sections intro,list,showcase,gallery,pricing,proof,contact,faq,cta,footer \
  --have product-photo,photography --keep palette --tone playful \
  --direction page-is-the-object --seed 59429310
```

**Direction:** *The page is the object.* The sheet's instruction is to find
the printed or physical artefact that already exists in the subject's world
and build the page as that thing — for a restaurant, its menu.

Chickady's has exactly that artefact: a cream and orange printed menu board
with a red-and-white checkerboard border, category blocks in condensed
capitals, prices right-aligned in a column, a black "Must try" tag, a green
square for vegetarian, and a second board of meal boxes photographed in the
red boxes the food actually comes in. It is a two-colour print job, and the
site is built as one.

**Type:** Barlow Condensed 700 for the printed-board voice, Barlow 400/500
for reading. One family for the display, one for the text, no third.

**Colour:** kept from the brand. Cream `#FFF1D4` as the paper, charcoal
`#171310` as the ink, brand orange `#F4510B` as the accent, fire red
`#E51B23` reserved for the Red Dragon campaign.

**Motion:** a pinned story — the menu card holds its place and shrinks toward
the bottom-left as the visitor scrolls away.

**The idea sentence:**

> On this page, **Chickady's own printed menu board** becomes **the page
> itself** — every section is set the way the board is set, in aligned
> columns with right-aligned prices, on a cream ground with a flat orange
> field between the chapters.

**The competitor test:** a Swiggy or Zomato restaurant page is a grid of
product cards on white with a delivery radius ring and an app badge. None of
those things could be a printed menu board. This could only be Chickady's.

**The live thing:** the menu sheet itself. It opens in place, category by
category, with the prices in the column the board prints them in — and
because the sheet is the artefact, it is also the navigation.

---

## 2. The two redraws

The skill asks for a redraw to be recorded whenever a dealt slot is changed,
and never for comfort.

1. **The hero.** The sheet dealt "tabbed folder stack": a dark ground with
   the headline centred at 96–160px and a stack of five coloured file folders
   below it. The slot was redrawn to **a card over a dim room**: the menu
   card laid on a dark ground with the brand's own photograph of the red
   boxes tipped onto its edge. *Reason:* the folder stack needs five
   coloured section bands to work, and the brand has one ink and one accent.
   A two-colour print job cannot carry five folders. The card keeps the
   artefact — it is a sheet of the printed menu — and the tipped-in
   photograph keeps the print.

2. **The type.** The first deal produced a serif display face. It was redrawn
   to **Barlow Condensed / Barlow**. *Reason:* the board's own headings are a
   blunt condensed sans, and the redrawn face matches the artefact rather
   than contrasting with it.

Two further slots were kept but adapted rather than redrawn: the proof
section was re-read as the review card with a platform list rather than a
list of invented names, and the contact section became a tear-off directions
slip rather than a form, because there is no query for a restaurant site to
answer that a mailto would not answer better.

---

## 3. The system

**Tokens** — [`src/app/globals.css`](../src/app/globals.css). One pair of
page margins (`clamp(1rem, 2.2vw, 2rem)`), one radius (square for every
surface, fully round for buttons and tags), one transition (140ms), and five
type sizes and no others: `t-display`, `t-head`, `t-lead`, `t-body`,
`t-small`.

**Fields, not lines.** Sections change the whole ground colour — cream, then
orange, then charcoal, then cream — and nothing fades into anything. There
are no hairline rules except inside tables and forms.

**The artefacts.** The scalloped sheet edge is a CSS mask. The perforation
on the directions coupon is a column of round dots in the ground colour. The
notches are circles of the ground colour bitten out of the coupon's edges. The
menu sheet is a single tall panel with scalloped top and bottom edges, set
the way the board is set.

**The buttons** are fully round, in the brand orange with charcoal ink — the
board's own orange and black. The one exception is the primary action in the
admin, which is near-black, because an operations screen is read all day.

---

## 4. Motion

| Move | Where | What it does |
|---|---|---|
| The logo reveal | The hero card, and the route loading screen | The brand panel arrives, the mark wipes itself open, a solid white highlight travels across it and the whole thing settles with one small spring. CSS only: transform and opacity. |
| The pinned card | The hero | As the visitor scrolls away, the card shrinks toward the bottom-left and holds there while the next chapter comes up. A scroll listener and a transform; skipped entirely under `prefers-reduced-motion`. |
| Scroll reveals | Every section heading, standfirst and photograph | A 16–22px rise with a fade, triggered once as the section enters, using the CSS `animation-timeline: view()` where it is supported and not at all where it is not. Content is never hidden without it. |
| The one moving picture | The photograph tipped onto the hero card | A 26-second drift, 6% scale. The only infinite movement on the site. |
| Feedback | Add to cart, the cart count, the tabs, the FAQ cards, the order tracker | Press states, a pop on the cart count, an expanding index card. |
| Nothing | Everywhere else | No parallax, no cursor followers, no infinite loops that mean nothing. |

---

## 5. What the site does not have, and why

- **No stock photography.** The Taste skill's usual advice is to search the
  open collections for real pictures of the subject's world. For a
  restaurant, the wrong photographs are the risk: a stock photo of someone
  else's burger passed off as Chickady's is a lie a customer will catch. The
  only pictures used are the restaurant's own published artwork, and the
  missing shots are written out as a list the owner can hand over.
- **No video.** There is no honest footage of the restaurant. The one moving
  picture is a photograph drifting slowly.
- **No review text.** The reviews section shows the platform, the rating,
  the review count and the date, and sends people to the platform. It does
  not reproduce what other people wrote.
- **No testimonials, no customer names, no star rows.** Same reason.

---

## 6. What stands in for photography

| Place | What is there | What it should be |
|---|---|---|
| Hero, tipped print | Chickady's own red box, photographed from the fried-chicken board | A photograph of a real box, in the shop |
| Intro | The printed menu board | The same board, in the shop, in daylight |
| Menu sheet | The board itself | Unchanged — this is the artefact |
| Combo slips | The board's own ticket photos | The same |
| Gallery, four tiles | The owner's Red Dragon poster, the fried-chicken board, the wing packaging, the soft-serve cones | Shop photographs |
| Gallery, four tiles | Marked "Photograph needed" | Exterior and signboard, counter and till, dining area and seating, kitchen and pass |
| Menu product images | The board's food photographs, where they exist | A photograph of each dish as it is served |
| Menu product images | "No photograph of this dish has been supplied yet" | The same, for the other 40-odd dishes |

---

## 7. The critic's rounds

The inspector (`inspect.mjs`) was run against the built site at 1440, 768 and
390 pixels, and its findings were worked through until nothing failed.

**Round 1 — four failures.** The hero headline was screen-reader-only, so the
page had no visible `h1`; the "Explore the menu" link was invisible because a
custom class was beating the Tailwind utility; the animated logo was sitting
on top of the hero headline; and a gallery label was touching the screen edge
at 390px.

*Fixes.* The spread headline became the real `h1`; the custom classes moved
into `@layer components` so utilities can override them; the logo moved out
of the headline's way; the label values wrap to two on a phone.

**Round 2 — four more failures.** The body copy was set at 14px, the first
screen had no dominant element, the headline ran to three lines at 390px,
and the running headline was drawn in a different font from the dealt one.

*Fixes.* Every size collapsed onto five tokens; the hero headline was set at
display size in two lines; the type was changed to the dealt Barlow pair and
the whole page re-tuned around it.

**Round 3 — no failures.** Seven warnings remained, each of which is either
fixed or has a reason: the perforation and the ticket rules are artefact
devices, the gallery is a repeated module because a gallery is one, the
campaign carousel is a carousel, the cream ground is the brand's own paper,
and there is no video because there is no honest footage.

The screenshots from each round are in `.taste-skill/inspect/`.

---

## 8. The one thing the inspector still points at

> `[palette-cream]` — "Yellow-cream background (page background #fff1d4)."

This is the house rule against a yellow-cream ground with a terracotta accent,
and it is worth being honest about: the rule exists because a cream page with
an orange accent is the default look of a generated page. Here it is not a
default — it is the colour of the restaurant's own menu board, printed in two
inks, photographed on 19 October 2026, and the accent is a specific orange
sampled from that board. The brand owns the colour, so the brand keeps it, and
the accent is spent on one field and one action rather than sprayed around.
