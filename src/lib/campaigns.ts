import type { Campaign } from "@/types";

/**
 * The campaign system.
 *
 * Every campaign carries the dates it runs, the artwork the owner published,
 * the products it points at and whether it is still live. A campaign that has
 * expired is not marked active, and a campaign whose price or stock is not
 * confirmed says so on the card rather than pretending.
 */

const campaigns: Campaign[] = [
  {
    id: "red-dragon",
    name: "Red Dragon Burger",
    slug: "red-dragon",
    kind: "launch",
    artwork: "/campaigns/campaign-red-dragon.jpg",
    artworkAlt:
      "Chickady's Red Dragon launch poster: the yellow Chickady's badge, the words Red Dragon in red brush lettering on black, 'Available on zomato' and 'dining'.",
    headline: "Red Dragon",
    body:
      "Launched 15 May 2026, from the owner's own announcement. The poster lists it as available on Zomato and for dining. The price, the ingredients and whether it is on sale today have not been confirmed, so it cannot be ordered from this site yet.",
    ctaLabel: "See the campaign",
    ctaHref: "/campaigns/red-dragon",
    startsAt: "2026-05-15",
    endsAt: null,
    isActive: true,
    needsVerification: true,
    theme: "black-red",
    linkedItemIds: [],
  },
  {
    id: "open-late",
    name: "Open till night 12",
    slug: "open-till-midnight",
    kind: "banner",
    artwork: "/campaigns/campaign-open-late.jpg",
    artworkAlt:
      "Chickady's orange campaign card reading 'WE'RE OPEN' and 'Open till NIGHT 12', with a cartoon soft-serve cone either side.",
    headline: "Open till night 12",
    body:
      "The owner's own card announcing late opening. Public listings still show a 11:45 pm close, so treat the two as different and confirm before travelling.",
    ctaLabel: "See the hours",
    ctaHref: "/contact",
    startsAt: null,
    endsAt: null,
    isActive: true,
    needsVerification: true,
    theme: "orange",
    linkedItemIds: [],
  },
  {
    id: "saucy-wings",
    name: "Saucy hot wings",
    slug: "saucy-wings",
    kind: "banner",
    artwork: "/campaigns/campaign-saucy-wings.jpg",
    artworkAlt:
      "The saucy wings panel of Chickady's fried-chicken board: an orange panel reading SAUCY Hot Wings, 6 pcs @ just 249, above boxes of Buffalo, Korean BBQ and Nashville Hot wings.",
    headline: "Saucy wings, 6 for ₹249",
    body:
      "Buffalo, Korean BBQ or Nashville Hot, in the striped boxes. Printed on the fried-chicken board and available to add to a box.",
    ctaLabel: "Add the box",
    ctaHref: "/menu/saucy-wings-6-pieces",
    startsAt: null,
    endsAt: null,
    isActive: true,
    needsVerification: false,
    theme: "orange",
    linkedItemIds: ["box-saucy-six-wings"],
  },
  {
    id: "scoops-back",
    name: "The scoops are back",
    slug: "scoops-are-back",
    kind: "seasonal",
    artwork: "/gallery/ice-cream-chocolate.jpg",
    artworkAlt:
      "A chocolate soft-serve cone with a cartoon face, from Chickady's 'the scoops are back' campaign card.",
    headline: "The scoops are back",
    body:
      "From the owner's own post: “THE SCOOPS ARE BACK — BIGGER, BETTER & MORE EXCITING TH…”, the public preview cuts the rest off. The frappe prices on the delivery platforms are not confirmed by the shop yet.",
    ctaLabel: "See the scoops",
    ctaHref: "/menu?category=desserts",
    startsAt: null,
    endsAt: null,
    isActive: true,
    needsVerification: true,
    theme: "cream",
    linkedItemIds: ["dessert-lotus-biscoff-frappe", "dessert-caramel-popcorn-frappe"],
  },
];

/**
 * Campaigns that are live right now.
 *
 * `now` is passed in rather than read from the clock, so a campaign that
 * has expired can never stay on the site just because the page was built
 * when it was still running.
 */
export function getCampaigns(now: number = Date.now()): Campaign[] {
  return campaigns.filter((campaign) => {
    if (!campaign.isActive) return false;
    if (campaign.startsAt && new Date(campaign.startsAt).getTime() > now) return false;
    if (campaign.endsAt && new Date(campaign.endsAt).getTime() < now) return false;
    return true;
  });
}

export function getCampaign(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug);
}

export const allCampaigns = campaigns;
