"use client";

import { usePathname, useRouter } from "next/navigation";
import { introStore, replayIntro, getIntroPhase } from "@/lib/store/intro";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "@/lib/hooks";

/**
 * The footer replay control for the brand ident. From another route it
 * first walks the visitor home, where the overlay lives.
 */
export function IntroReplay({ className }: { className?: string }) {
  const phase = useSyncExternalStore(
    introStore.subscribe,
    getIntroPhase,
    () => "idle" as const,
  );
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();

  function handleReplay() {
    replayIntro();
    if (pathname !== "/") router.push("/");
  }

  return (
    <button
      type="button"
      onClick={handleReplay}
      disabled={phase === "playing"}
      className={className}
      data-playing={phase === "playing" ? "" : undefined}
    >
      {reduced ? "See the ident once more" : "Replay the brand ident"}
    </button>
  );
}

export default IntroReplay;
