import type { ReviewSource } from "@/types";

/**
 * Where Chickady's public reputation comes from.
 *
 * These figures were read from the public listing pages themselves on
 * 19 October 2026 — not from a description of them. No review text, reviewer
 * name or star rating is reproduced here, because reproducing them needs
 * the platform's permission and, in this case, adds nothing: the honest
 * thing is to show where the reviews live and send people there.
 *
 * Figures go stale. Every entry carries the date it was retrieved, and the
 * interface says so on the card.
 */

export const RETRIEVED_AT = "2026-10-19";

export const reviewSources: ReviewSource[] = [
  {
    platform: "Zomato",
    url: "https://www.zomato.com/chennai/chickadys-perungalathur",
    rating: 4.3,
    ratingScale: 5,
    reviewCount: 81,
    retrievedAt: RETRIEVED_AT,
    stale: false,
    note: "Read from the listing's own structured data on 19 October 2026.",
  },
  {
    platform: "Google Maps",
    url: "https://maps.app.goo.gl/tuLZvW7yhxq4CFYf7",
    rating: null,
    ratingScale: 5,
    reviewCount: null,
    retrievedAt: RETRIEVED_AT,
    stale: true,
    note: "The owner supplied the link and the business posts. The rating and review count could not be read from the page, so no figure is shown.",
  },
  {
    platform: "Swiggy",
    url: "https://www.swiggy.com/city/chennai/chickadys-tambaram-alapakkam-rest1342227",
    rating: null,
    ratingScale: 5,
    reviewCount: null,
    retrievedAt: RETRIEVED_AT,
    stale: true,
    note: "The listing page refused automated requests on 19 October 2026, so no figure was captured. The link is here so the rating can be read first hand.",
  },
];

/** Business facts confirmed by the Zomato listing on 19 October 2026. */
export const listingFacts = {
  rating: 4.3,
  ratingCount: 81,
  priceForTwo: 500,
  paymentAccepted: "Digital payments accepted",
  servesCuisine: "Fast Food, Burger, Desserts, Ice Cream, Cafe, Shake, Wraps, Roast Chicken",
  latitude: 12.8965661142,
  longitude: 80.1107186642,
  streetAddress:
    "650/19B1, 150 Feet By-pass Road, Vairam Complex, Alapakkam, Tambaram Municipality, Kancheepuram, Perungalathur, Chennai",
  telephone: "+919940526698",
  openingHours: "12noon - 11:45pm",
} as const;
