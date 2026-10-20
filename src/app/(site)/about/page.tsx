import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Prose, ProseSection } from "@/components/site/Prose";
import { restaurant } from "@/lib/restaurant";
import { listingFacts } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "About",
  description:
    "Chickady's — fried chicken, burgers and loaded fries on 150 Feet By-pass Road, Alappakkam, Chennai. The menu, the story and how to find the shop.",
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

        <ProseSection title="Where the words come from">
          <p>
            The menu on this site was read off the two printed boards in the
            shop on 19 October 2026. The campaign posters and most of the food
            photographs come from the shop&rsquo;s own posts. The address,
            phone, hours and public ratings come from the Zomato listing, read
            on the same day. Where a fact is a listing rather than the shop
            saying it directly, the page it sits on says so.
          </p>
        </ProseSection>

        <ProseSection title="Reading the listings">
          <p>
            The Zomato listing for the shop carries a rating of{" "}
            {listingFacts.rating} out of 5 from {listingFacts.ratingCount}{" "}
            ratings. It describes the price as around ₹
            {listingFacts.priceForTwo} for two, and says that digital payments
            are accepted.
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
            Phone the shop on{" "}
            <a
              href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
              className="underline underline-offset-4 hover:text-accent-deep"
            >
              {restaurant.phone}
            </a>
            , write to{" "}
            <a
              href={`mailto:${restaurant.email}`}
              className="underline underline-offset-4 hover:text-accent-deep"
            >
              {restaurant.email}
            </a>
            , or catch the posts on{" "}
            <a
              href="https://www.instagram.com/chickadys"
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-4 hover:text-accent-deep"
            >
              Instagram
            </a>
            .
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
