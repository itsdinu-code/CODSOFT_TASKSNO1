/**
 * The Instagram sync.
 *
 * What it can do honestly:
 *  - fetch the public profile of @chickadys the way a logged-out visitor
 *    receives it, and when Instagram serves the profile metadata, commit
 *    the numbers into src/lib/instagram-snapshot.json;
 *  - otherwise, print exactly why nothing could be pulled and what the
 *    owner's paths are (Meta Basic Display API token — see
 *    docs/instagram-sync.md).
 *
 * Post captions are NOT served to logged-out visitors, so this script
 * cannot read announcements blindly. A caption can be written into the
 * snapshot by hand or through the rendering pull the developer's agent
 * environment has; the snapshot carries its own provenance note.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SNAPSHOT_PATH = path.join(ROOT, "src", "lib", "instagram-snapshot.json");

const PROFILE_URL = "https://www.instagram.com/chickadys/";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const unescapeEntities = (text) =>
  text
    .replace(/&#x2019;/g, "\u2019")
    .replace(/&#064;/g, "@")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');

const pull = async () => {
  const res = await fetch(PROFILE_URL, {
    headers: { "User-Agent": UA, "Accept-Language": "en-IN,en;q=0.9" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Instagram answered ${res.status}`);
  const html = await res.text();
  const description = (html.match(/og:description[^>]*?content="([^"]+)"/) || [])[1];
  if (!description) throw new Error("Instagram served the shell without profile metadata");
  const text = unescapeEntities(description);
  const num = (label) => {
    const value = Number((text.match(new RegExp(`([\\d,]+)\\s*${label}`, "i")) || [])[1]?.replace(/,/g, ""));
    return Number.isFinite(value) ? value : null;
  };
  const followers = num("Followers");
  const posts = num("Posts");
  if (followers === null && posts === null) throw new Error("No profile counts found in the metadata");
  return { followers, posts };
};

const previous = JSON.parse(readFileSync(SNAPSHOT_PATH, "utf8"));

try {
  const counts = await pull();
  const next = {
    ...previous,
    ...counts,
    pulledAt: new Date().toISOString(),
    // A hand/agent-entered caption is kept until the next caption pull.
    provenance: `Counts pulled direct from instagram.com/chickadys (logged-out metadata) on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}. Refresh with: npm run sync:instagram.`,
  };
  writeFileSync(SNAPSHOT_PATH, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  console.log("Snapshot updated:", JSON.stringify(counts));
} catch (error) {
  console.log(`Direct pull failed: ${error.message}`);
  console.log("The snapshot on file stays as the published data — nothing fake was written.");
  console.log("Options to refresh captions and counts reliably:");
  console.log("  1. Run this script when Instagram serves metadata (it varies by network and time).");
  console.log("  2. Give the shop a Meta Basic Display API token (docs/instagram-sync.md holds the steps).");
  console.log("  3. Ask the development agent to refresh the snapshot from its rendered fetch.");
}
