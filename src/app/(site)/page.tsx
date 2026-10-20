import { Suspense } from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TypeBand } from "@/components/home/TypeBand";
import { Intro } from "@/components/home/Intro";
import { MenuSheet } from "@/components/home/MenuSheet";
import { Campaigns } from "@/components/home/Campaigns";
import { ComboSlips } from "@/components/home/ComboSlips";
import { Combos } from "@/components/home/Combos";
import { DriftBoard } from "@/components/home/DriftBoard";
import { Gallery } from "@/components/home/Gallery";
import { Reviews } from "@/components/home/Reviews";
import { Directions } from "@/components/home/Directions";
import { Faq } from "@/components/home/Faq";
import { OrderCard } from "@/components/home/OrderCard";
import { BrandIntro } from "@/components/brand/BrandIntro";

export const metadata: Metadata = {
  title: "Chickady's — fried chicken, burgers and loaded fries, Alappakkam Chennai",
  description:
    "Burgers, loaded fries, wings, nachos and the red meal boxes. The printed menu of Chickady's on 150 Feet By-pass Road, Alappakkam, Chennai.",
  alternates: { canonical: "/" },
};

function CampaignsFallback() {
  return (
    <section className="field-paper2 section" aria-hidden="true">
      <div className="wrap">
        <div className="h-9 w-80 animate-pulse bg-paper" />
        <div className="mt-10 flex gap-4 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[420px] w-[84vw] max-w-[420px] shrink-0 animate-pulse bg-paper" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {  return (
    <>
      <Hero />
      <TypeBand />
      <Intro />
      <MenuSheet />
      <Suspense fallback={<CampaignsFallback />}>
        <Campaigns />
      </Suspense>
      <ComboSlips />
      <Combos />
      <DriftBoard />
      <Gallery />
      <Reviews />
      <Directions />
      <Faq />
      <OrderCard />
      <BrandIntro />
    </>
  );
}
