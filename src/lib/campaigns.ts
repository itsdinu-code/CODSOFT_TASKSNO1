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
    id: "bunless-launch",
    name: "Bunless Burger launch",
    slug: "bunless-burger-launch",
    kind: "launch",
    artwork: "/campaigns/campaign-bunless-launch.jpg",
    artworkAlt:
      "Chickady's launch poster for the Bunless Burger: two crispy chicken fillets with lettuce, onion and the house sauce, reading “Introducing — No Bun. No Rules. All Chicken.”",
    headline: "Bunless Burger — no bun, no rules",
    body:
      "The owner's launch poster from Instagram. The Burger is printed on the exclusives board at ₹289, so it can be ordered below.",
    ctaLabel: "Order the Bunless Burger",
    ctaHref: "/menu/bunless-burger",
    startsAt: null,
    endsAt: null,
    isActive: true,
    needsVerification: false,
    theme: "black-red",
    linkedItemIds: ["exclusives-bunless-burger"],
  },
  {
    id: "wings-20-combo",
    name: "20 pcs flavoured wings combo",
    slug: "wings-20-combo",
    kind: "banner",
    artwork: "/campaigns/campaign-wings-20-combo.jpg",
    artworkAlt:
      "Chickady's combo poster: twenty flavoured wings for ₹599, boxed in five flavours — Tokyo Sweet Chilli, Hot Buffalo, California Lemon Pepper, Jamaica Jerk and Texas Smoked BBQ.",
    headline: "20 flavoured wings — ₹599",
    body:
      "“Biggest combo ever”, says the owner's own post: twenty wings, five flavours — Tokyo Sweet Chilli, Hot Buffalo, California Lemon Pepper, Jamaica Jerk and Texas Smoked BBQ. Order by phone, since the combo is not a board line.",
    ctaLabel: "Phone the combo through",
    ctaHref: "/contact",
    startsAt: null,
    endsAt: null,
    isActive: true,
    needsVerification: false,
    theme: "orange",
    linkedItemIds: [],
  },
  {
    id: "strips-12-weekend",
    name: "12 pcs strips weekend offer",
    slug: "strips-12-weekend",
    kind: "banner",
    artwork: "/campaigns/campaign-strips-12-weekend.jpg",
    artworkAlt:
      "Chickady's weekend-offer poster: twelve strips for ₹379 with two free dips, “Upto 40% off”, in an orange Chickady's bucket. Halal certified.",
    headline: "Weekend: 12 strips, 2 dips — ₹379",
    body:
      "The weekend offer from the owner's own page: twelve strips at ₹379, two dips on the house, “up to 40% off”, with the halal mark printed. Or try the tenders from the board below.",
    ctaLabel: "See the tenders",
    ctaHref: "/menu/fried-chicken-2pc-tenders",
    startsAt: null,
    endsAt: null,
    isActive: true,
    needsVerification: false,
    theme: "orange",
    linkedItemIds: [],
  },
  {
    id: "red-dragon",
    name: "Red Dragon Burger",
    slug: "red-dragon",
    kind: "launch",
    poster: {
      eyebrow: "Launch",
      title: "Red Dragon",
      note: "Available on Zomato and for dining",
    },
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
    poster: {
      eyebrow: "We're open",
      title: "Open till night 12",
      note: "Kitchens close at 11:45 per the public listing",
    },
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
    artwork: "/food/8100c805-4d74-408e-9424-e2ac096c9115.jpg",
    artworkAlt:
      "A cup of Lotus-biscoff ice-cream scoops with biscuit crumble, from Chickady's own food photographs.",
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
