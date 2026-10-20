"use client";

/**
 * The brand ident state — a tiny module-level store so the overlay on the
 * home page and the replay control in the footer can agree without a
 * context provider.
 *
 * `sessionStorage` remembers that the ident already played this visit, so
 * it autoplays exactly once and never blocks a visitor twice.
 */

const KEY = "cd:intro";

export type IntroPhase = "idle" | "playing";

const listeners = new Set<() => void>();
let phase: IntroPhase = "idle";
let autoplayAttempted = false;

function readPlayed(): boolean {
  try {
    return window.sessionStorage.getItem(KEY) === "played";
  } catch {
    return false;
  }
}

function writePlayed(value: boolean) {
  try {
    if (value) window.sessionStorage.setItem(KEY, "played");
    else window.sessionStorage.removeItem(KEY);
  } catch {
    /* storage blocked — the ident still runs in memory */
  }
}

function setPhase(next: IntroPhase) {
  if (phase === next) return;
  phase = next;
  for (const listener of listeners) listener();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

/** Called once when the home page mounts. Plays only on a first visit. */
export function maybeAutoplayIntro() {
  if (autoplayAttempted) return;
  autoplayAttempted = true;
  if (readPlayed()) return;
  setPhase("playing");
}

/** Replay from the footer (or anywhere). Never re-arms the autoplay. */
export function replayIntro() {
  writePlayed(true);
  setPhase("playing");
}

/** Done — release the screen back to the page. */
export function finishIntro() {
  writePlayed(true);
  setPhase("idle");
}

export function getIntroPhase(): IntroPhase {
  return phase;
}

export const introStore = {
  subscribe,
  getSnapshot: getIntroPhase,
  getServerSnapshot: (): IntroPhase => "idle",
};
