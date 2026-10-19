/**
 * The shop photography.
 *
 * Two lists. `heldTiles` are photographs the restaurant has published itself
 * and that we hold. `shotList` is the set of photographs a restaurant
 * gallery is expected to have, with the ones still owed marked plainly, so
 * the owner can hand them over and nobody mistakes a placeholder for a photo
 * of the shop.
 */

export interface GalleryTile {
  src?: string;
  alt?: string;
  values: [string, string, string, string];
  left: string;
  right: string;
  caption: string;
  needed?: boolean;
}

export const heldTiles: GalleryTile[] = [
  {
    src: "/campaigns/campaign-red-dragon.jpg",
    alt: "Chickady's Red Dragon launch poster in black and red, with the yellow Chickady's badge and the words 'Available on zomato' and 'dining'.",
    values: ["Poster", "Black", "Red", "Own"],
    left: "15 May 2026",
    right: "Own post",
    caption: "The Red Dragon launch, from the owner's own announcement.",
  },
  {
    src: "/campaigns/board-fried-chicken.jpg",
    alt: "Chickady's printed fried-chicken board in cream and orange, with photographs of red boxes of fried chicken, wings and meal boxes.",
    values: ["Board", "Cream", "Orange", "Photo"],
    left: "19 Oct 2026",
    right: "Counter",
    caption: "The fried-chicken board that hangs at the counter.",
  },
  {
    src: "/menu/wings-buffalo.jpg",
    alt: "A striped paper box of Buffalo hot wings from the Chickady's saucy wings panel.",
    values: ["Packaging", "Stripes", "Wings", "Box"],
    left: "19 Oct 2026",
    right: "Counter",
    caption: "Saucy wings in the striped boxes the shop serves in.",
  },
  {
    src: "/gallery/ice-cream-vanilla.jpg",
    alt: "A soft-serve cone with a cartoon face, from Chickady's orange 'We're open' campaign card.",
    values: ["Scoops", "Soft serve", "Campaign", "Print"],
    left: "19 Oct 2026",
    right: "Own post",
    caption: "From the owner's 'the scoops are back' campaign card.",
  },
  {
    src: "/menu/meal-box-ultimate.jpg",
    alt: "The Ultimate Savings Meal box from Chickady's fried-chicken board: a red box of fried chicken with a Pepsi and dips.",
    values: ["Box", "Red", "Meal", "Photo"],
    left: "19 Oct 2026",
    right: "Counter",
    caption: "The Ultimate Savings Meal, fourteen pieces, photographed on the board.",
  },
  {
    src: "/campaigns/campaign-open-late.jpg",
    alt: "Chickady's orange campaign card reading 'WE'RE OPEN' and 'Open till NIGHT 12', with a cartoon soft-serve cone either side.",
    values: ["Card", "Orange", "Late", "Print"],
    left: "19 Oct 2026",
    right: "Own post",
    caption: "The owner's card for the late opening.",
  },
];

/** The photographs a shop gallery should have, and whether we hold them. */
export const shotList: { shot: string; detail: string; held: boolean }[] = [
  {
    shot: "Exterior and signboard",
    detail: "The shopfront with the Chickady's sign and the road on a busy evening.",
    held: false,
  },
  {
    shot: "Entrance and counter",
    detail: "Where the order is taken, with the menu board and the till in shot.",
    held: false,
  },
  {
    shot: "Dining area and seating",
    detail: "The tables and the seating, and how many covers the shop has.",
    held: false,
  },
  {
    shot: "Kitchen and preparation",
    detail: "The fryer and the pass, if the owner is happy to share it.",
    held: false,
  },
  {
    shot: "Food presentation",
    detail: "A burger and a box as they leave the pass. We hold the board photographs only.",
    held: true,
  },
  {
    shot: "Branded packaging",
    detail: "The red boxes, the striped wing boxes and the paper bags.",
    held: true,
  },
  {
    shot: "Campaign artwork",
    detail: "The Red Dragon poster and the late-opening card, from the owner's own posts.",
    held: true,
  },
  {
    shot: "Customer experience",
    detail: "Only with permission from the people in the picture.",
    held: false,
  },
];
