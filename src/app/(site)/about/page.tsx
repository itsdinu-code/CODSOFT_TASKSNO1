import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Prose, ProseSection } from "@/components/site/Prose";
import { restaurant } from "@/lib/restaurant";
import { listingFacts } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Chickady's is, where it is, what the board says and what still needs the owner's confirmation.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Chickady’s"
        lede="A fried chicken and burger kitchen on 150 Feet By-pass Road in Alappakkam, serving takeaway from the counter and, since the Red Dragon launch, dining in as well."
      />

      <Prose>
        <ProseSection title="What the shop is">
          <p>
            Chickady&rsquo;s sells fried chicken, burgers, loaded fries, wings,
            nachos and quick bites. The order of the menu is the order of the
            counter: the printed board starts with burgers, runs through loaded
            fries, nachos, the house exclusives, flavoured wings and tenders,
            quick bites and plain fried chicken, and then the dips.
          </p>
          <p>
            A second board, the one with the photographs of the red boxes, sells
            the meal boxes. Those are the sharing boxes — the Solid Treat Box,
            the All Drumsticks Box, the Loaded Fries Box, the Big 8 Box, the
            Ultimate Savings Meal, the Friendship Meal Box and the Triple
            Treat Meal Box — plus the Saucy hot wings, six pieces for ₹249.
          </p>
        </ProseSection>

        <ProseSection title="What we know, and how we know it">
          <p>
            This site is a prototype built from material the restaurant has
            published itself. The menu came from photographing the two printed
            boards on 19 October 2026. The campaign pictures came from the
            owner&rsquo;s own posts on the Google Maps business profile. The
            address, phone number, opening hours and one public rating came
            from the Zomato listing, read on the same day.
          </p>
          <p>
            Everything that is a public listing rather than the restaurant
            saying it directly is labelled as such on the page it appears on.
            Where we do not know something, the page says that too, rather
            than filling the gap with a plausible answer.
          </p>
        </ProseSection>

        <ProseSection title="Still open questions">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Whether the address is 19B or 19B1, and the exact postal form of
              the locality — the listings disagree on how they write it.
            </li>
            <li>
              The daily hours. Listings show noon to 11:45 pm; the
              owner&rsquo;s own card says open till midnight.
            </li>
            <li>
              The price, ingredients and current availability of the Red
              Dragon burger. It is not orderable here until the shop confirms
              it.
            </li>
            <li>
              The ingredients, allergens and cross-contact notes for every
              dish. Nothing on this site claims to be allergen information.
            </li>
            <li>
              The tax and packaging rules, and whether the shop collects a
              delivery fee of its own.
            </li>
            <li>
              The FSSAI licence number, which has to be displayed at the
              outlet and on invoices.
            </li>
          </ul>
          <p>
            The full list, with the decisions each answer needs, is in the
            owner verification checklist in the project documentation.
          </p>
        </ProseSection>

        <ProseSection title="Reading the listings">
          <p>
            The Zomato listing for the shop carries a rating of{" "}
            {listingFacts.rating} out of 5 from {listingFacts.ratingCount}{" "}
            ratings, read on 19 October 2026. It describes the price as around ₹
            {listingFacts.priceForTwo} for two, and says that digital payments
            are accepted. The listing also has a photograph of the shopfront
            which we have not used, because permission to reproduce it has not
            been given.
          </p>
          <p>
            <a
              href="https://www.zomato.com/chennai/chickadys-perungalathur"
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-4 hover:text-accent-deep"
            >
              Read the Zomato listing
            </a>{" "}
            or{" "}
            <a
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-4 hover:text-accent-deep"
            >
              the Google Maps profile
            </a>
            .
          </p>
        </ProseSection>

        <ProseSection title="Saying hello">
          <p>
            The quickest way to reach the shop is to phone it on{" "}
            <a
              href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
              className="underline underline-offset-4 hover:text-accent-deep"
            >
              {restaurant.phone}
            </a>
            . The number comes from a public listing, so please confirm it in
            person if it matters.
          </p>
          <p>
            <Link href="/menu" className="underline underline-offset-4 hover:text-accent-deep">
              See the menu
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-accent-deep">
              find the shop
            </Link>
            .
          </p>
        </ProseSection>
      </Prose>
    </>
  );
}
