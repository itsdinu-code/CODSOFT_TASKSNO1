"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSyncExternalStore } from "react";
import {
  finishIntro,
  introStore,
  maybeAutoplayIntro,
  type IntroPhase,
} from "@/lib/store/intro";
import { useReducedMotion } from "@/lib/hooks";
import Image from "next/image";
import "./BrandIntro.css";

/**
 * BrandIntro — the Chickady's ident, a six-second cinematic reveal of the
 * restaurant's own badge artwork (`/brand/chickadys-badge.png`).
 *
 * Scenes (each delay lives in CSS custom properties at the top of
 * BrandIntro.css, so timing stays easy to tune):
 *   1. 0.0–1.0  atmosphere — the orange-red room, grain, drifting crumbs
 *   2. 1.0–2.0  the crumbs sweep toward the centre, a warm bloom rises
 *   3. 2.0–3.0  the badge border traces itself on (SVG round-rect)
 *   4. 3.0–4.0  the real badge artwork enters with a cream light sweep
 *   5. 4.0–5.0  impact — the crumbs burst outward, one small overshoot
 *   6. 5.0–6.2  the hold; then the ident fades and the page takes over
 *
 * Accessibility: the overlay is a labelled dialog with a working Skip
 * button and Escape-to-skip; `prefers-reduced-motion` gets a calm version
 * (no particles, no trace, no camera move); scroll is locked underneath.
 * Sound is not wired — the prototype has no audio layer, so there is
 * nothing muted-but-present to fake.
 */

/* Deterministic pseudo-random so the crumbs are stable across renders
   (they are client-only, but purity stays clean for the compiler lint). */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Crumb {
  /** start position, as a fraction of the overlay, pushed just off-screen */
  x: number;
  y: number;
  /** travel toward the centre, in % of the overlay */
  tx: number;
  ty: number;
  size: number;
  delay: number;
  blur: number;
  /** burst direction and distance after the impact */
  bx: number;
  by: number;
}

function buildCrumbs(): Crumb[] {
  const random = seeded(19461);
  const list: Crumb[] = [];
  for (let i = 0; i < 30; i++) {
    const angle = random() * Math.PI * 2;
    // start on an ellipse around the frame, mostly at the edges
    const ring = 55 + random() * 30;
    const x = 50 + Math.cos(angle) * ring;
    const y = 50 + Math.sin(angle) * ring * 0.78;
    list.push({
      x,
      y,
      tx: -(x - 50) * (0.8 + random() * 0.25),
      ty: -(y - 50) * (0.84 + random() * 0.2),
      size: 2.2 + random() * 5,
      delay: random() * 0.55,
      blur: random() > 0.75 ? 2.4 : 0,
      bx: Math.cos(angle) * (24 + random() * 34),
      by: Math.sin(angle) * (24 + random() * 30),
    });
  }
  return list;
}

function CrumbField({ variant }: { variant: "gather" | "burst" }) {
  const crumbs = useMemo(() => buildCrumbs(), []);
  return (
    <span className={`brand-intro__crumbs brand-intro__crumbs--${variant}`} aria-hidden="true">
      {crumbs.map((c, i) => (
        <span
          key={i}
          className="brand-intro__crumb"
          style={
            {
              left: `${c.x}%`,
              top: `${c.y}%`,
              "--cd-c-bx": `${c.bx}%`,
              "--cd-c-by": `${c.by}%`,
              "--cd-c-tx": `${c.tx}%`,
              "--cd-c-ty": `${c.ty}%`,
              "--cd-c-delay": `${c.delay}s`,
              "--cd-c-size": `${c.size}px`,
              "--cd-c-blur": `${c.blur}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}

export function BrandIntro() {
  const phase: IntroPhase = useSyncExternalStore(
    introStore.subscribe,
    introStore.getSnapshot,
    introStore.getServerSnapshot,
  );

  const timerRef = useRef<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Never autoplay for a visitor who asked for reduced motion — the calm
    // version stays available through the replay control in the footer.
    if (reduced) return;
    maybeAutoplayIntro();
  }, [reduced]);

  useEffect(() => {
    if (phase !== "playing") return;

    document.body.classList.add("brand-intro-lock");
    const holdMs = 6900;
    timerRef.current = window.setTimeout(finishIntro, holdMs);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finishIntro();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.classList.remove("brand-intro-lock");
      window.removeEventListener("keydown", onKey);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [phase]);

  if (phase !== "playing") return null;

  return (
    <div className="brand-intro" role="dialog" aria-label="Chickady’s — brand ident">
      <div className="brand-intro__room" aria-hidden="true">
        <span className="brand-intro__grain" />
        <span className="brand-intro__vignette" />
        <CrumbField variant="gather" />
        <span className="brand-intro__bloom" />
        <span className="brand-intro__stage">
          <span className="brand-intro__logo">
            <svg
              className="brand-intro__trace"
              viewBox="0 0 384 273"
              preserveAspectRatio="xMidYMid meet"
            >
              <rect
                x="11"
                y="11"
                width="362"
                height="251"
                rx="42"
                pathLength={1000}
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <Image
              src="/brand/chickadys-badge.png"
              alt=""
              width={384}
              height={273}
              className="brand-intro__badge"
            />
            <span className="brand-intro__sweep" />
          </span>
        </span>
        <CrumbField variant="burst" />
      </div>
      <button type="button" className="brand-intro__skip" onClick={finishIntro}>
        Skip the ident
      </button>
    </div>
  );
}

export default BrandIntro;
