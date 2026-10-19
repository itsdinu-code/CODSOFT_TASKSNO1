import type { Metadata } from "next";
import { PageHeader, Prose, ProseSection } from "@/components/site/Prose";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What this Chickady's prototype collects, what it does not collect, and what has to change before launch.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy policy"
        lede="A prototype collects as little as it can, and says plainly what it cannot yet promise."
      />

      <Prose>
        <ProseSection title="What this prototype actually does">
          <p>
            This site is a working prototype built for the restaurant to review.
            When you build a cart, the contents of that cart are written to
            your own browser&rsquo;s local storage, and they stay there. When
            you place a simulated order, the order is written to your browser&rsquo;s
            local storage as well. It is not sent to a server, it is not
            visible to the restaurant, and it does not appear on another device
            or in another browser.
          </p>
          <p>
            The checkout asks for a name and a phone number so the form can be
            tested honestly. They are kept in the same place, in your browser,
            and are cleared when you clear the cart. No card details are asked
            for anywhere on this site, and no payment is taken.
          </p>
        </ProseSection>

        <ProseSection title="What is not collected">
          <p>
            There is no account, no password, no advertising tracker, no
            analytics beacon, no third-party script and no cookie set by this
            site. Google Maps and the delivery platforms are reached by ordinary
            links, and anything those sites do when you follow them is their
            policy, not this one.
          </p>
        </ProseSection>

        <ProseSection title="What has to change before this goes live">
          <p>
            A live ordering site is a different thing and needs a different
            policy, written and reviewed before launch. At minimum it must
            cover:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              What personal data is stored in the order system, on whose
              server, and for how long it is kept before it is deleted.
            </li>
            <li>
              Whether a phone number is retained, and whether it is used to send
              order updates by SMS or WhatsApp, with the consent that requires.
            </li>
            <li>
              Whether payment details are handled by a payment provider or by
              the restaurant, and the fact that card numbers must never be
              stored on the restaurant&rsquo;s own systems.
            </li>
            <li>
              How a customer asks for a copy of their data or asks for it to be
              erased, and who answers.
            </li>
            <li>
              The name and contact details of the person who handles data
              requests, which the restaurant must appoint.
            </li>
            <li>
              Whether a CCTV camera is used at the shop, and how long its
              footage is kept.
            </li>
          </ul>
          <p>
            The Digital Personal Data Protection Act, 2023 applies to the
            restaurant as a data fiduciary in India. This policy draft is not
            legal advice and has not been reviewed by a lawyer; it must be
            reviewed before the site is published.
          </p>
        </ProseSection>

        <ProseSection title="Contact">
          <p>
            No support address has been published for the shop yet. Until one
            exists, write to the restaurant on{" "}
            <a
              href={`tel:${"+919940526698"}`}
              className="underline underline-offset-4 hover:text-accent-deep"
            >
              +91 99405 26698
            </a>{" "}
            and ask for the person who handles data requests.
          </p>
        </ProseSection>
      </Prose>
    </>
  );
}
