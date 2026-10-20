/**
 * The Instagram pull.
 *
 * This fetches what the restaurant's public profile serves to a logged-out
 * visitor and nothing more. In practice Instagram often answers the request
 * with a JavaScript shell that carries no counts at all (verified from this
 * machine, 20 October 2026); the caller then gets the committed snapshot
 * file — the last pull that DID see the metadata — labelled "snapshot"
 * rather than "live". Post captions are not served to logged-out visitors
 * either, so announcements reach the site as campaign cards added from the
 * owner's own posters; docs/instagram-sync.md holds the full path,
 * including the owner-token upgrade that would make caption pulls
 * automatic too.
 */

const PROFILE_URL = "https://www.instagram.com/chickadys/";

import snapshot from "./instagram-snapshot.json";

const CACHE_MS = 10 * 60 * 1000;
const FETCH_TIMEOUT_MS = 8000;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

export interface InstagramProfileInfo {
  handle: string;
  followers: number | null;
  posts: number | null;
  fetchedAt: string;
  /** "live" = Instagram answered this request; "snapshot" = the last successful pull saved in the repo. */
  source: "live" | "snapshot";
  /** Caption text of the newest post, when the pull could see one. */
  latestCaption?: string | null;
}

type CacheEntry = { at: number; value: InstagramProfileInfo | null };

/** Module-level cache so a burst of page views does not hammer Instagram. */
let cache: CacheEntry | null = null;

/** The last pull that succeeded, committed as a file (see scripts/instagram-sync.mjs). */
function snapshotValue(): InstagramProfileInfo {
  return {
    handle: snapshot.handle,
    followers: snapshot.followers ?? null,
    posts: snapshot.posts ?? null,
    fetchedAt: snapshot.pulledAt,
    source: "snapshot",
    latestCaption: snapshot.latestCaption ?? null,
  };
}

function unescapeEntities(text: string): string {
  return text
    .replace(/&#x2019;/g, "\u2019")
    .replace(/&#064;/g, "@")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');
}

export async function getInstagramProfile(): Promise<InstagramProfileInfo | null> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.value;

  let value: InstagramProfileInfo | null = null;

  try {
    const res = await fetch(PROFILE_URL, {
      headers: { "User-Agent": UA, "Accept-Language": "en-IN,en;q=0.9" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Instagram answered ${res.status}`);

    const html = await res.text();
    const description = (html.match(/property="og:description" content="([^"]+)"/) || [])[1];
    if (!description) throw new Error("Profile metadata not served");

    const text = unescapeEntities(description);
    const followers = Number((text.match(/([\d,]+)\s*Followers/i) || [])[1]?.replace(/,/g, ""));
    const posts = Number((text.match(/([\d,]+)\s*Posts/i) || [])[1]?.replace(/,/g, ""));

    if (!Number.isFinite(followers) && !Number.isFinite(posts)) {
      throw new Error("No profile counts found");
    }

    value = {
      handle: "chickadys",
      followers: Number.isFinite(followers) ? followers : null,
      posts: Number.isFinite(posts) ? posts : null,
      fetchedAt: new Date().toISOString(),
      source: "live",
      latestCaption: null,
    };
  } catch {
    value = null;
  }

  // The site's server frequently receives only Instagram's JavaScript shell
  // for a logged-out profile view, in which case the committed snapshot (the
  // last pull that could see the metadata) is shown and labelled as such.
  if (!value) value = snapshotValue();

  cache = { at: Date.now(), value };
  return value;
}
