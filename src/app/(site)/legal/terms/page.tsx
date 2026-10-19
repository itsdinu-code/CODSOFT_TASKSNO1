import type { Metadata } from "next";
import { PageHeader, Prose, ProseSection } from "@/components/site/Prose";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms the Chickady's prototype is operated under, and what has to be settled before the site takes real orders.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of service"
        lede="What this prototype is, what it is not, and the terms a live site would need."
      />

      <Prose>
        <ProseSection title="This is a prototype">
          <p>
            This website is a working prototype prepared for Chickady&rsquo;s.
            It is published to show the restaurant what its website and
            operations could look like. It is not a live ordering service.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>No order placed here reaches the restaurant or the kitchen.</li>
            <li>No payment is taken and no card details are ever collected.</li>
            <li>
              Orders, carts and the order tracking on this site are stored in
              your own browser and are not visible to the restaurant.
            </li>
            <li>
              Prices, opening hours, the address and the phone number are taken
              from printed boards and public listings, and several of them are
              still awaiting the owner&rsquo;s confirmation.
            </li>
            <li>
              Items marked as needing confirmation, and the Red Dragon burger in
              particular, cannot be ordered from this site.
            </li>
          </ul>
        </ProseSection>

        <ProseSection title="Prices and availability">
          <p>
            Every price on this site was read from Chickady&rsquo;s own printed
            menu and fried-chicken boards on 19 October 2026, or from a public
            delivery listing captured on the same day. The two sources do not
            always agree; where they do not, the printed board is the one
            shown, and the difference is recorded in the project documentation
            for the owner.
          </p>
          <p>
            Prices change. Availability changes. Nothing on this site is a
            contractual offer of any kind.
          </p>
        </ProseSection>

        <ProseSection title="What a live site needs to settle">
          <p>
            Before this site takes real orders, the restaurant&rsquo;s own terms
            need to be written and agreed, covering at least:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>How an order is formed, when it is binding, and when it is accepted.</li>
            <li>Which prices include tax, and whether tax is shown separately.</li>
            <li>
              Whether a packaging charge applies to takeaway, and whether a
              service charge applies to dine-in.
            </li>
            <li>
              Which order types are offered, and what the delivery radius and
              fees are if delivery is offered directly.
            </li>
            <li>How long an order is held at the counter before it is discarded.</li>
            <li>
              The right of the restaurant to refuse an order, and to correct a
              price that was published in error.
            </li>
            <li>
              How complaints are made, to whom, and within what period they
              will be answered.
            </li>
            <li>
              The registered name of the business, its FSSAI licence and the
              invoice it issues.
            </li>
          </ul>
          <p>
            These terms are a drafting scaffold, not legal advice, and have not
            been reviewed by a lawyer.
          </p>
        </ProseSection>

        <ProseSection title="Intellectual property">
          <p>
            The Chickady&rsquo;s name, wordmark, badge, menu boards and campaign
            artwork belong to the restaurant. The photographs on this site were
            taken from the restaurant&rsquo;s own published posts and boards.
            Third-party listing photographs, such as the shopfront image on the
            Zomato listing, have not been used, because permission to
            reproduce them has not been given.
          </p>
        </ProseSection>
      </Prose>
    </>
  );
}
