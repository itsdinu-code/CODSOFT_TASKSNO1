# The Instagram pipeline

The restaurant's page is `@chickadys` (owner-supplied, 2026-10-20):
<https://www.instagram.com/chickadys>

## What is automatic today

Two pieces, both truthful about their reach:

- **Live attempt** — on every render of the campaigns section,
  `src/lib/instagram.ts` fetches the public profile server-side (cached ten
  minutes) and reads the counts Instagram serves to logged-out visitors.
  Verified from this machine on 20 October 2026: Instagram usually answers
  with a JavaScript shell that carries **no** counts, no captions and no
  images — the counts ride in page metadata that the login-free page often
  omits. When it does serve them, the line reads "Pulled live at 17:52…".
- **Committed snapshot** — when the live attempt sees the shell, the
  section falls back to `src/lib/instagram-snapshot.json`, the last pull
  that could see the numbers, labelled "Last pull …". `npm run
  sync:instagram` (`scripts/instagram-sync.mjs`) attempts the direct pull
  and only ever rewrites the snapshot when Instagram actually served
  metadata — it never invents figures.

## How new posters reach the cards

A new post reaches "What the kitchen is pushing" the honest way:

1. The owner posts the artwork on Instagram.
2. Someone with the shop's own files saves the poster into
   `public/campaigns/` with a stable name (`campaign-<what>.jpg`).
3. A campaign entry is added to `src/lib/campaigns.ts` quoting the
   poster's own words. The Bunless Burger launch, the 20-wings ₹599 combo
   and the 12-strips ₹379 weekend offer landed this way on 20 October
   2026.

A card only carries prices the owner published themselves. Anything
unpriced stays behind the "needs verification" path.

## Upgrading to true caption automation

- **Meta Basic Display API** — the owner creates a developer app, grants
  their own account and supplies a long-lived token in `.env.local`
  (`INSTAGRAM_ACCESS_TOKEN`). `src/lib/instagram.ts` then swaps the page
  scrape for `https://graph.instagram.com/me/media?fields=caption,timestamp,permalink`
  and recent captions list themselves. Needs only the owner's consent —
  no scraping.
- **Hugging Face / LLM summarising** — once the token flow lands, an
  inference call can turn each new caption into a drafted campaign card
  (title, body, linked item) for a human to approve. Nothing should
  publish without that approval, because posters carry prices.

