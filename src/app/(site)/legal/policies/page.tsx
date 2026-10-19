import type { Metadata } from "next";
import { PageHeader, Prose, ProseSection } from "@/components/site/Prose";

export const metadata: Metadata = {
  title: "Cancellation and refund policy",
  description:
    "How cancellation, amendment and refunds work at Chickady's, and what still has to be agreed before the site takes live orders.",
  alternates: { canonical: "/legal/policies" },
};

export default function PoliciesPage() {
  return (
    <>
      <PageHeader
        title="Cancellation and refund policy"
        lede="What is normally done, and what the restaurant still has to agree before it can be published as a promise."
      />

      <Prose>
        <ProseSection title="The position today">
          <p>
            No order can be cancelled and no refund can be given, because no
            order placed on this site reaches the restaurant and no payment is
            taken. The rules below are the ones a live site would have to
            follow, and the ones the restaurant needs to confirm.
          </p>
          <p>
            Orders placed through Zomato and Swiggy are governed by those
            platforms&rsquo; own cancellation and refund rules, not by this
            website.
          </p>
        </ProseSection>

        <ProseSection title="A draft policy for the restaurant to confirm">
          <dl className="space-y-6">
            <div>
              <dt className="display-wide t-body text-ink">
                Cancelling before the kitchen accepts
              </dt>
              <dd className="mt-1 text-ink-2">
                A customer who asks to cancel before the restaurant accepts the
                order can have it cancelled with no charge. Once the kitchen
                has accepted and started cooking, the food has been bought and
                the order can no longer be cancelled.
              </dd>
            </div>
            <div>
              <dt className="display-wide t-body text-ink">
                Items that are not available
              </dt>
              <dd className="mt-1 text-ink-2">
                If an item on the board turns out to be sold out when the
                order is placed, the restaurant should tell the customer, and
                the customer should choose a replacement or a refund of that
                line. This is the case the admin&rsquo;s order queue has to
                handle, and the reason it can reject an order.
              </dd>
            </div>
            <div>
              <dt className="display-wide t-body text-ink">
                Orders not collected
              </dt>
              <dd className="mt-1 text-ink-2">
                A takeaway order that has been prepared and not collected
                within an agreed window is normally written off, not refunded.
                The window has to be set and published — thirty minutes is the
                usual figure, but the restaurant has to decide it.
              </dd>
            </div>
            <div>
              <dt className="display-wide t-body text-ink">
                Something is wrong with the food
              </dt>
              <dd className="mt-1 text-ink-2">
                If an order is wrong or the food is not to standard, the
                restaurant should put it right at the counter — usually by
                replacing the item — and should say what the escalation route
                is if that is not enough. The customer should be asked to
                raise it before leaving.
              </dd>
            </div>
            <div>
              <dt className="display-wide t-body text-ink">
                Refunds
              </dt>
              <dd className="mt-1 text-ink-2">
                A refund goes back the way the payment came, and to the same
                person. The time a refund takes depends on the payment
                provider. No refund should be paid out in cash without a
                record, and every refund should be logged in the admin with a
                reason.
              </dd>
            </div>
          </dl>
        </ProseSection>

        <ProseSection title="What is still missing">
          <ul className="list-disc space-y-2 pl-5">
            <li>The collection window for an uncollected takeaway order.</li>
            <li>Whether the restaurant ever refunds an order delivered by a platform.</li>
            <li>The accepted payment methods and how each is refunded.</li>
            <li>Who may authorise a refund at the counter, and the ceiling on their authority.</li>
            <li>How long an order record is kept, and how a refund is evidenced in the records.</li>
          </ul>
          <p>
            Until these are answered, the kitchen and counter staff should work
            from what the owner tells them in person rather than from a page on
            this site.
          </p>
        </ProseSection>
      </Prose>
    </>
  );
}
