/**
 * Business facts for Chickady's.
 *
 * Every field here carries the source it came from. Nothing in this file is
 * owner-confirmed unless the comment says so — see `docs/owner-verification.md`
 * and the admin "Pending" screen for the list of open questions.
 */

export const restaurant = {
  name: "Chickady's",
  legalName: "Chickady's", // pending: registration name not supplied
  tagline: "Fried chicken, burgers and loaded fries",

  /** Source: Zomato listing snapshot, 2026-10-19. Unit number 19B vs 19B1 to confirm. */
  streetAddress: "Ground Floor, Vairam Complex, No. 650/19B1",
  area: "150 Feet By-pass Road, Alappakkam",
  locality: "Alappakkam, Tambaram Municipality",
  district: "Kancheepuram district",
  city: "Chennai",
  state: "Tamil Nadu",
  postalCode: "600063",
  country: "IN",

  /** Source: Zomato listing snapshot, 2026-10-19. Verify before publishing. */
  phone: "+91 99405 26698",
  phoneDisplay: "99405 26698",

  /** Owner-supplied Google Maps link. */
  mapsUrl: "https://maps.app.goo.gl/tuLZvW7yhxq4CFYf7",

  /** Source: Zomato listing snapshot, 2026-10-19 (noon–11:45 PM). */
  hours: [
    { days: "Monday to Sunday", opens: "12:00", closes: "23:45" },
  ],
  hoursNote:
    "Hours come from a third-party listing captured on 19 October 2026. The owner's own post reads “Open till NIGHT 12”. Confirm the daily hours and any holiday closures before launch.",

  /** FSSAI licence number and display details were not supplied. */
  fssai: null as string | null,
  fssaiNote:
    "FSSAI licence number was not supplied. A restaurant licence must be displayed at the outlet and on invoices as required.",

  email: null as string | null,
  emailNote:
    "No public email address was found on any listing. A support address should be set before launch.",

  social: [
    { label: "Zomato", url: "https://www.zomato.com/chennai/chickadys-perungalathur" },
    {
      label: "Swiggy",
      url: "https://www.swiggy.com/city/chennai/chickadys-tambaram-alapakkam-rest1342227",
    },
    { label: "Google Maps", url: "https://maps.app.goo.gl/tuLZvW7yhxq4CFYf7" },
  ],

  /** Owner-published posts seen on the Google Maps profile, 2026-10-19. */
  ownerPosts: [
    {
      title: "The scoops are back",
      body: "“THE SCOOPS ARE BACK — BIGGER, BETTER & MORE EXCITING TH…” (post text truncated on the public preview).",
      date: "19 October 2026",
    },
    {
      title: "Open till night 12",
      body: "An orange campaign card announcing that the kitchen stays open until midnight, with soft-serve cones either side of the message.",
      date: "19 October 2026",
    },
    {
      title: "Red Dragon",
      body: "A black-and-red launch poster for the Red Dragon burger, marked “New Launch on May 15, 2026” and “Available on zomato” and “dining”.",
      date: "15 May 2026",
    },
  ],

  /** Service model — not owner-confirmed. */
  fulfilment: {
    takeaway: true as boolean, // shown on the printed boards and in takeaway packaging
    delivery: false as boolean, // the owner's poster says "Available on zomato" — platform delivery
    dineIn: true as boolean, // the poster says "dining"
    note:
      "The Red Dragon poster lists “Available on zomato” and “dining”, and the boards show takeaway boxes. Own delivery, dine-in seating and QR table ordering are not confirmed and are not offered in this prototype.",
  },
} as const;

export const fullAddress = [
  restaurant.legalName,
  restaurant.streetAddress,
  restaurant.area,
  `${restaurant.locality}, ${restaurant.district}`,
  `${restaurant.city}, ${restaurant.state} ${restaurant.postalCode}`,
].join(", ");
