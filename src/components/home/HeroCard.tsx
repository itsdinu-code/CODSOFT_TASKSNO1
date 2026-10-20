"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ChickadysLogo } from "@/components/brand/ChickadysLogo";
import { useReducedMotion } from "@/lib/hooks";

/**
 * The menu card, and the signature move of the page: as the visitor scrolls
 * away, the card shrinks toward the bottom-left and holds there as a stub
 * while the prints pass on the dark ground.
 *
 * The movement is transform-only and it is skipped entirely when the visitor
 * has asked for reduced motion.
 */
export function HeroCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      const card = cardRef.current;
      if (card) card.style.transform = "";
      return;
    }

    const onScroll = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        const card = cardRef.current;
        if (!card) return;
        const travel = Math.max(320, window.innerHeight * 0.62);
        const progress = Math.min(1, Math.max(0, window.scrollY / travel));
        const scale = 1 - 0.46 * progress;
        const x = -18 * progress;
        const y = 16 * progress;
        card.style.transform = `translate3d(${x}vw, ${y}vh, 0) scale(${scale})`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [reduced]);

  return (
    <div
      ref={cardRef}
      className="relative"
      style={
        reduced
          ? undefined
          : { transformOrigin: "0% 100%", willChange: "transform" }
      }
    >
      {/* The wordmark breaks the top edge of the card */}
      <div className="relative z-10 mx-auto -mb-11 w-[168px] sm:w-[200px]">
        <ChickadysLogo size="100%" variant="wordmark" animate alt="" />
      </div>

      <div className="bg-paper px-6 pb-6 pt-16 sm:px-9 sm:pb-9 sm:pt-20 lg:px-12">
        <h1 className="display t-display text-ink">
          <span className="sr-only">Chickady&rsquo;s — </span>
          <span aria-hidden="true" className="block">
            Fried chicken,
          </span>
          <span aria-hidden="true" className="block">
            burgers &amp; fries
          </span>
        </h1>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <p className="display-wide t-lead leading-tight text-ink">
            Open noon to 11:45 pm.
            <br />
            Takeaway and dine-in.
          </p>
          <p className="text-ink-2">
            Burgers, loaded fries, wings and nachos, packed in the red boxes and
            fried to order. The scoops stay on until late.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t-2 border-ink/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <Link href="/menu" className="btn">
              Order online
            </Link>
            <Link
              href="/menu"
              className="text-ink underline decoration-2 underline-offset-4 hover:text-accent-deep"
            >
              Explore the menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCard;
