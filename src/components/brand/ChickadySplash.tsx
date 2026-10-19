"use client";

import { useEffect, useState } from "react";
import { ChickadysLogo } from "@/components/brand/ChickadysLogo";

const KEY = "chickadys.splash.v1";
const HOLD_MS = 850;

/**
 * The loading screen.
 *
 * A brand-orange curtain with the wordmark opening on it, lifted once the
 * page behind it has painted. It never blocks a click, it plays once per
 * browser session, and it is skipped entirely when the visitor has asked for
 * reduced motion.
 */
export function ChickadySplash() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let played = false;
    try {
      played = window.sessionStorage.getItem(KEY) === "1";
    } catch {
      played = false;
    }
    if (played) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Every state change happens in a timer callback, never in the body of
    // the effect, so the curtain does not cause a cascading render.
    const show = window.setTimeout(() => setVisible(true), 0);
    const lift = window.setTimeout(() => setLeaving(true), reduced ? 200 : HOLD_MS);
    const done = window.setTimeout(
      () => {
        setVisible(false);
        try {
          window.sessionStorage.setItem(KEY, "1");
        } catch {
          /* ignore */
        }
      },
      reduced ? 500 : HOLD_MS + 400,
    );

    return () => {
      window.clearTimeout(show);
      window.clearTimeout(lift);
      window.clearTimeout(done);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-ink transition-opacity duration-300"
      style={{ opacity: leaving ? 0 : 1 }}
    >
      <span className="w-[210px] sm:w-[260px]">
        <ChickadysLogo size="100%" variant="wordmark" animate />
      </span>
    </div>
  );
}

export default ChickadySplash;
