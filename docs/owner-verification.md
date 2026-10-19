# Owner verification checklist

Everything on this list has to be answered by the restaurant before this
prototype becomes a live ordering site. Each item says where the current
value came from, what the open question is, and what breaks if it is wrong.

Status legend: **Open** — not yet confirmed. **Source** — the value is
recorded and traceable. **Blocked** — something else has to happen first.

---

## 1. Identity

| # | Item | Where the value came from | Question for the owner | Status |
|---|------|--------------------------|------------------------|--------|
| 1.1 | Trading name and punctuation | Zomato listing, and the logo asset: "Chickady's" | Is the apostrophe and the capital C correct in every use? | Open |
| 1.2 | Registered legal name | — | What is the name on the FSSAI licence and the GST registration? The site publishes "Chickady's" as a trading name. | Open |
| 1.3 | Address and unit number | Zomato listing: "650/19B1, 150 Feet By-pass Road, Vairam Complex, Alapakkam, Tambaram Municipality, Kancheepuram, Perungalathur, Chennai 600063" | Is the unit 19B or 19B1? Which locality spelling is correct on a signboard? | Open |
| 1.4 | Map pin | Owner-supplied link: <https://maps.app.goo.gl/tuLZvW7yhxq4CFYf7> (pin at 12.8966, 80.1107) | Does the pin land on the shop door? | Source |
| 1.5 | Phone | Zomato listing: +91 99405 26698 | Is this the number that customers should call, and whose number is it? | Open |
| 1.6 | Support email | None found | A named address for data requests and complaints. | Open |
| 1.7 | FSSAI licence | Not supplied | The licence number must be displayed at the outlet and on invoices. | Open |
| 1.8 | Official logo files | Extracted from the owner's own published posts: `public/brand/chickadys-wordmark.png` and `chickadys-badge.png` | Are these the current marks? Please supply the vector originals (SVG or PDF) and the exact hex values for the orange and the black. | Open |
| 1.9 | Brand colours and type | Sampled from the printed boards and the published posters. The wordmark's cream is #FFFAF3, the yellow #FFCF2E, the poster orange #F4510B | Are the official values the same? The site uses #F4510B for the accent and #FFF1D4 for the cream ground. | Open |
| 1.10 | Social accounts | Only the Zomato, Swiggy and Google Maps listings were found | Instagram, Facebook, WhatsApp Business. | Open |

## 2. Menu

| # | Item | Where the value came from | Question for the owner | Status |
|---|------|--------------------------|------------------------|--------|
| 2.1 | The complete current menu | The printed menu board, photographed 19 Oct 2026 (58 lines) | Is this the current sheet? Any lines added, removed or renamed since? | Open |
| 2.2 | Prices | The printed board | Confirm each price. Six lines are marked "to confirm" in the admin because their price came from a public listing rather than the board. | Open |
| 2.3 | Price conflicts | Board vs Zomato listing, seven differences: Classic Fries ₹99/129 vs ₹129/169, Peri-Peri Fries ₹99/139 vs ₹129/189, Classic Chicken burger ₹189 vs ₹279, Signature burger ₹295 vs ₹399, Island loaded fries ₹245 vs ₹309, dips ₹25 vs ₹29–30, 2 drumsticks ₹219 vs ₹279 | Which is the price the shop actually charges? The board is what the site currently shows. | Open |
| 2.4 | Dips price | The board prints "DIPS @ JUST 25" as a header rather than a price per line | Is every dip ₹25? | Open |
| 2.5 | Signature Dust Popcorn, large | The board prints "159" with a large size indicated but the second price is cut off in the photograph | What is the large price? | Open |
| 2.6 | Wings and tenders sizing | The board prints one price pair for the whole range: wings 2pc ₹119 / 4pc ₹229, tenders 2pc ₹149 / 4pc ₹269, with five flavours listed | Is the price the same for every flavour, and does a tender come in the same five flavours? | Open |
| 2.7 | Items the platforms list but the board does not price | World Tour Wings Bucket, Chickady's Bucket, Flavored Chicken Wings (4pc) | Are these still sold, and what do they cost? | Open |
| 2.8 | Ingredients and allergens | — | A written ingredient and cross-contact sheet per item. Nothing on the site claims allergen information. | Open |
| 2.9 | Veg / non-veg markers | The board's green squares: Classic Veg, Tandoori Paneer, Cheesy Jalapeno Fries, Avocado Cheese Nachos, Jalapeno Cheese Popz, Mozzarella Cheese Stix, Classic Fries, Peri-Peri Fries, Classic Popcorn. The dips carry no square. | Are the unmarked dips vegetarian? | Open |
| 2.10 | Portion sizes and weights | The board prints piece counts only | Are there weights or volumes for the fries, popcorn and drinks? | Open |
| 2.11 | Packaging charge | — | Is there a takeaway packaging charge? | Open |
| 2.12 | Tax | — | Which tax, at what rate, and is it shown separately on the bill? | Open |
| 2.13 | Modifiers | The board's add-ons (Extra Cheese ₹25, Extra Patty ₹89) and dips | Which add-ons apply to which dishes? | Open |

## 4. Operations

| # | Item | Where the value came from | Question for the owner | Status |
|---|------|--------------------------|------------------------|--------|
| 4.1 | Opening hours | Zomato listing: noon–11:45 pm. The owner's own card: "Open till NIGHT 12" | Which is right, day by day? | Open |
| 4.2 | Holiday closures | — | Which days does the shop close? | Open |
| 4.3 | Order types | The Red Dragon poster lists "Available on zomato" and "dining" | Is own delivery offered, and over what radius and fees? | Open |
| 4.4 | Dine-in | The poster says "dining" | Is there table service? How many covers? | Open |
| 4.5 | QR table ordering | — | Wanted or not? | Open |
| 4.6 | Reservations | — | Are bookings taken, and by what rule? | Open |
| 4.7 | Order acceptance | — | How long does the kitchen have to accept an order before it is auto-cancelled? | Open |
| 4.8 | Collection window | — | How long is an uncollected takeaway order held? | Open |
| 4.9 | Refunds | — | Who may authorise a refund, and up to what amount? | Open |
| 4.10 | Payment methods | Zomato listing: "Digital payments accepted" | Which methods exactly — cash, UPI, card, and a gateway? | Open |
| 4.11 | Staff and roles | — | Who works the counter, who cooks, who may change a price? | Open |
| 4.12 | Kitchen equipment | — | Tablet or monitor for the kitchen board; printer for tickets? | Open |
| 4.13 | Support and escalation | — | A number and a person for order problems. | Open |

## 5. Content and rights

| # | Item | Where the value came from | Question for the owner | Status |
|---|------|--------------------------|------------------------|--------|
| 5.1 | Menu board photographs | The owner's own printed boards, photographed 19 Oct 2026 | May we publish these? They carry the shop's prices. | Open |
| 5.2 | Campaign artwork | The owner's own Google Maps posts (Red Dragon, "We're open", "the scoops are back") | May we publish these, and for how long? | Open |
| 5.3 | Shop photographs | Not held | Exterior, signboard, counter, seating, kitchen, food, packaging, customers. A shot list is on `/gallery`. | Open |
| 5.4 | Customer photographs | Not held | May only be published with the people in them agreeing. | Open |
| 5.5 | Zomato shopfront image | A shopfront photo exists on the Zomato listing and has deliberately not been used | May we use it, or will the owner supply their own? | Open |
| 5.6 | Reviews | The Zomato rating is read from the listing and attributed to Zomato | Is the restaurant happy for the site to point at the platforms? | Open |
| 5.7 | Stated offers | The "scoops are back" post and "open till night 12" | Are any of these still running, and for how long? | Open |

## 6. Legal

| # | Item | Question for the owner | Status |
|---|------|------------------------|--------|
| 6.1 | Privacy policy | A named data-handling contact, a retention period, and whether SMS or WhatsApp updates are sent with consent. The draft on `/legal/privacy` is a scaffold, not legal advice. | Open |
| 6.2 | Terms of service | The rules a live site needs are listed on `/legal/terms`. They have not been reviewed by a lawyer. | Open |
| 6.3 | Cancellation and refund policy | The draft on `/legal/policies` is a set of proposals, not promises. | Open |
| 6.4 | Invoice and tax rules | What appears on a printed bill. | Open |
| 6.5 | Accessibility contact | A named person to answer accessibility reports. | Open |
| 6.6 | CCTV | Whether cameras are used, and how long footage is kept. | Open |
| 6.7 | Consumer protection | Any disclosure the restaurant is required to make about its own ratings. | Open |

## 7. Go live

| # | Item | Question | Status |
|---|------|----------|--------|
| 7.1 | Domain and hosting | Who owns the domain, and where is it hosted? | Open |
| 7.2 | Payment provider | Which provider, and has the merchant account been onboarded and tested? | Open |
| 7.3 | Database | Managed Postgres created, backups configured, a restore rehearsed. | Open |
| 7.4 | Authentication | Admin and kitchen routes behind a real session, with the role table enforced on the server. | Open |
| 7.5 | Email and SMS | A transactional provider with templates the restaurant has approved. | Open |
| 7.6 | Monitoring | Error tracking and uptime checks in place, with a named person on call. | Open |
| 7.7 | Staff training | A walk-through of the counter screen, the kitchen board and the customer site. | Open |
| 7.8 | Launch plan | A soft launch with a fallback to the platforms if the site has a bad day. | Open |

---

## The two questions that block everything else

1. **The Red Dragon burger.** The owner's poster of 15 May 2026 announces it, but
   the price, the ingredients and whether it is still on sale are not recorded
   anywhere we can read. Until they are, it appears on the site as a campaign
   with "price and availability to be confirmed" and cannot be ordered.
2. **The complete current menu.** Fifty-eight lines were read from the
   photographed board. If that board is out of date, every price on the site
   is out of date with it.
