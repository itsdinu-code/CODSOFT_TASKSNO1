import type { Metadata } from "next";
import { PageHeader } from "@/components/site/Prose";
import { Faq } from "@/components/home/Faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about delivery, dining in, opening hours, spice, vegetarian food and payment at Chickady's, Alappakkam.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Before you order"
        lede="Where the answer is confirmed, it is given. Where it is not, that is said too."
      />
      <Faq />
    </>
  );
}
