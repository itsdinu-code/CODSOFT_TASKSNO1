import type { Metadata } from "next";
import { PageHeader, Prose, ProseSection } from "@/components/site/Prose";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "How the Chickady's site is built for keyboard, screen reader and reduced-motion use, and what is still outstanding.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        title="Accessibility"
        lede="What was built in, what was tested, and what has not been checked yet."
      />

      <Prose>
        <ProseSection title="What is built in">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Every page has one first-level heading that says what the page
              is, and every section has a heading of its own.
            </li>
            <li>
              The site is laid out in a single column first and widened
              afterwards, so it works on a narrow phone without horizontal
              scrolling.
            </li>
            <li>
              All controls are reachable and operable from the keyboard, with a
              visible focus outline in the brand colour, and the mobile menu
              closes on Escape.
            </li>
            <li>
              Form fields have real labels, errors are announced, and required
              fields are marked as required in text as well as by the browser.
            </li>
            <li>
              Images carry descriptive alternative text, and decorative images
              are hidden from screen readers.
            </li>
            <li>
              Body text and the ink colours meet the 4.5:1 contrast ratio
              against the surfaces they sit on.
            </li>
            <li>
              Colour is never the only way information is carried: order states
              and status labels always have words as well.
            </li>
            <li>
              The animated logo, the scrolling card and every other movement
              stop when the operating system asks for reduced motion, and the
              content is still there.
            </li>
            <li>
              Touch targets are at least 44 pixels tall on a phone.
            </li>
          </ul>
        </ProseSection>

        <ProseSection title="What has been checked">
          <p>
            The layouts were measured in a real browser at 1440, 768 and 390
            pixels, and the automated checks for headline length, type size,
            colour contrast, margins and image presence were run against the
            built pages. The result of that pass is recorded in the project
            documentation.
          </p>
        </ProseSection>

        <ProseSection title="What has not been checked">
          <p>
            No testing with a real screen reader has been carried out, and no
            audit against WCAG 2.2 AA has been done by a specialist. Keyboard
            order and focus behaviour on the kitchen display have not been
            tested on the actual tablet the shop would use. These are the next
            things to do, and they are listed in the project documentation.
          </p>
        </ProseSection>

        <ProseSection title="If something gets in the way">
          <p>
            Tell the shop. The number on the{" "}
            <a href="/contact" className="underline underline-offset-4 hover:text-accent-deep">
              contact page
            </a>{" "}
            is the way to reach them, and they can pass it on. A named contact
            for accessibility issues has not been appointed yet, which is
            itself something the restaurant needs to fix before launch.
          </p>
        </ProseSection>
      </Prose>
    </>
  );
}
