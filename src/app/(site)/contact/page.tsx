import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Prose, ProseSection } from "@/components/site/Prose";
import { restaurant, fullAddress } from "@/lib/restaurant";
import { listingFacts } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Find us",
  description:
    "Chickady's, Vairam Complex, 150 Feet By-pass Road, Alappakkam, Tambaram, Chennai 600063. Opening hours, phone and directions.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Find us"
        lede="Halfway down 150 Feet By-pass Road in Vairam Complex, Alappakkam, a few minutes from Tambaram."
      >
        <div className="bg-paper p-5">
          <p className="t-body leading-snug text-ink">{fullAddress}</p>
          <p className="mt-4 t-body text-ink">
            <a
              href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
              className="underline underline-offset-4 hover:text-accent-deep"
            >
              {restaurant.phone}
            </a>
          </p>
          <a
            href={restaurant.mapsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-sm btn-ink mt-4 w-full"
          >
            Open in Google Maps
          </a>
        </div>
      </PageHeader>

      <Prose>
        <ProseSection title="Opening hours">
          <p className="tabular text-ink">
            {restaurant.hours[0].days}
            <br />
            {restaurant.hours[0].opens} to {restaurant.hours[0].closes}
          </p>
          <p>
            These hours come from the Zomato listing, read on 19 October 2026.
            The owner&rsquo;s own campaign card says “Open till NIGHT 12”, and
            the two do not quite agree. Holiday closures are not published
            anywhere we could reach. Please phone before a long trip.
          </p>
        </ProseSection>

        <ProseSection title="Where it is">
          <p>
            The address as the listing gives it is{" "}
            <span className="text-ink">{listingFacts.streetAddress}</span>. The
            listing pin sits at {listingFacts.latitude}, {listingFacts.longitude}{" "}
            — Alappakkam, inside the Tambaram Municipality of the Kancheepuram
            district, postal code 600063.
          </p>
          <p>
            Public listings write the locality three different ways — Alapakkam,
            Perungalathur and Tambaram — and differ on whether the unit number
            is 19B or 19B1. The map pin is the safest way to find the door, and
            the shop will know its own address.
          </p>
        </ProseSection>

        <ProseSection title="Getting an order">
          <p>
            Takeaway is collected from the counter. Since the Red Dragon launch
            in May 2026 the shop has also listed dining in. Delivery runs
            through Zomato and Swiggy rather than through this website, so the
            radius, the fees and the minimum order are the platform&rsquo;s and
            have not been confirmed by the restaurant.
          </p>
          <p>
            <Link href="/menu" className="underline underline-offset-4 hover:text-accent-deep">
              Build a box on the menu
            </Link>{" "}
            and collect it. This prototype&rsquo;s checkout is a simulation and
            does not reach the kitchen.
          </p>
        </ProseSection>

        <ProseSection title="What this site cannot do yet">
          <p>
            There is no table booking, no reservation request and no order
            status pushed to a phone, because none of those are confirmed as
            services the shop offers. If you need to arrange something
            unusual, phone the shop.
          </p>
          <p>
            <Link href="/faq" className="underline underline-offset-4 hover:text-accent-deep">
              More questions, answered
            </Link>
            .
          </p>
        </ProseSection>
      </Prose>
    </>
  );
}
