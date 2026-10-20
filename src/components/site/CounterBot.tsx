"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { restaurant } from "@/lib/restaurant";

/**
 * The counter bot.
 *
 * A small helper that answers from the facts this site already carries —
 * hours, address, phone, offers, the order flow. It is a matcher, not a
 * cloud AI: nothing typed here leaves the browser. When it cannot answer,
 * it hands the question to the shop's email with the draft started.
 */

interface Message {
  from: "bot" | "you";
  text: string;
  hrefLabel?: string;
  href?: string;
  external?: boolean;
}

interface Knowledge {
  keys: string[];
  answer: string;
  hrefLabel?: string;
  href?: string;
  external?: boolean;
}

const knowledge: Knowledge[] = [
  {
    keys: ["hour", "open", "close", "timing", "time"],
    answer: `The boards say ${restaurant.hours[0].opens} to ${restaurant.hours[0].closes}, ${restaurant.hours[0].days.toLowerCase()}. That came from a listing; the owner's own post says “open till night 12”. Double-check by phone if you are coming late.`,
  },
  {
    keys: ["where", "address", "location", "reach", "landmark", "road", "map"],
    answer:
      "Ground Floor, Vairam Complex, No. 650/19B1, 150 Feet By-pass Road, Alappakkam, Chennai 600063.",
    hrefLabel: "Open in Maps",
    href: restaurant.mapsUrl,
    external: true,
  },
  {
    keys: ["phone", "call", "number", "contact"],
    answer: `The shop's number is ${restaurant.phoneDisplay}. Call for the phone-only combos.`,
    hrefLabel: "Call now",
    href: `tel:${restaurant.phone.replace(/\s/g, "")}`,
  },
  {
    keys: ["complain", "complaint", "feedback", "problem", "wrong", "refund", "sorry"],
    answer:
      "Then let the shop hear it properly. This opens a draft already addressed to the counter:",
    hrefLabel: "chickadys.help@gmail.com",
    href: "mailto:chickadys.help@gmail.com?subject=Feedback%20about%20Chickady%27s&body=Hi%20Chickady%27s%2C%0A%0A",
    external: true,
  },
  {
    keys: ["combo", "offer", "deal", "discount", "20 ", "wings", "strips", "weekend"],
    answer:
      "Two live offers from the owner's own posts: 20 flavoured wings at ₹599 (five flavours, order by phone) and 12 strips with 2 free dips at ₹379 on weekends.",
    hrefLabel: "See the campaign cards",
    href: "/#campaigns",
  },
  {
    keys: ["wings flavour", "flavour", "tokyo", "buffalo", "jerk"],
    answer:
      "The 20-wing combo runs in Tokyo Sweet Chilli, Hot Buffalo, California Lemon Pepper, Jamaica Jerk and Texas Smoked BBQ — the five named on the owner's poster. The board's own five flavoured wings are separate.",
  },
  {
    keys: ["bunless", "new", "launch", "red dragon"],
    answer:
      "Newest is the Bunless Burger — fried fillets, no bun — printed on the board at ₹289 and orderable here. The Red Dragon burger launched 15 May 2026; its price is not confirmed, so it is not orderable here yet.",
  },
  {
    keys: ["reserve", "table", "booking", "book", "seat"],
    answer:
      "Yes — request a table and the note sits in this browser as a request. You would confirm it at the counter or by phone.",
    hrefLabel: "Reserve a table",
    href: "/reserve",
  },
  {
    keys: ["order", "cart", "checkout", "track", "status", "code"],
    answer:
      "Build the box in the menu, check out, and the kitchen board shows the ticket right away. The order's code page tracks it as the kitchen moves it along.",
    hrefLabel: "The menu",
    href: "/menu",
  },
  {
    keys: ["delivery", "zomato", "swiggy", "deliver"],
    answer:
      "Zomato and Swiggy list the shop, and the Red Dragon poster says “available on zomato”. This site does takeaway pickup.",
    hrefLabel: "Zomato listing",
    href: restaurant.social[1].url,
    external: true,
  },
  {
    keys: ["instagram", "follow", "social"],
    answer: "The shop's page is @chickadys on Instagram — the posters come from there.",
    hrefLabel: "Open Instagram",
    href: "https://www.instagram.com/chickadys",
    external: true,
  },
  {
    keys: ["price", "cost", "how much", "rate"],
    answer:
      "Every price on the menu pages is the printed board's price. Phone-only combos (wings ₹599, weekend strips ₹379) are quoted on the owner's posters.",
    hrefLabel: "The menu",
    href: "/menu",
  },
];

const chips: { label: string }[] = [
  { label: "Opening hours" },
  { label: "Live offers" },
  { label: "Where are you?" },
  { label: "Reserve a table" },
  { label: "How ordering works" },
  { label: "Something went wrong" },
];

function answerFor(question: string): Message {
  const q = question.toLowerCase();
  let best: Knowledge | null = null;
  let bestHits = 0;
  for (const entry of knowledge) {
    const hits = entry.keys.reduce((total, key) => (q.includes(key) ? total + 1 : total), 0);
    if (hits > bestHits) {
      best = entry;
      bestHits = hits;
    }
  }
  if (best) {
    return {
      from: "bot",
      text: best.answer,
      href: best.href,
      hrefLabel: best.hrefLabel,
      external: best.external,
    };
  }
  return {
    from: "bot",
    text: `That one is above my counter — I only know what this site carries. Ask the people who actually run it at ${restaurant.email}:`,
    href: `mailto:${restaurant.email}?subject=Question%20about%20Chickady%27s&body=${encodeURIComponent(
      `Hi Chickady's,\n\n${question}\n\n(sent from the website)`,
    )}`,
    hrefLabel: "Write the question out",
    external: true,
  };
}

export function CounterBot() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Counter's warm. Ask me about hours, offers, tables or how the ordering works here.",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  // Keep the latest message in view without scrolling the page behind it.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages]);

  const send = (text: string) => {
    const question = text.trim();
    if (!question) return;
    setMessages((current) => [...current, { from: "you", text: question }, answerFor(question)]);
  };

  return (
    <>
      {open ? (
        <div
          className="fixed bottom-24 right-4 z-40 flex w-[min(92vw,360px)] flex-col border-2 border-ink bg-paper shadow-[8px_8px_0_0_rgba(23,19,16,0.85)] sm:right-6"
          role="dialog"
          aria-label="Counter bot"
        >
          <div className="flex items-center justify-between border-b-2 border-ink bg-accent px-4 py-3">
            <p className="t-body font-semibold text-cream">Ask the counter</p>
            <button
              type="button"
              className="t-small text-cream underline underline-offset-4"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>

          <div ref={listRef} className="flex max-h-[46vh] flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) =>
              message.from === "you" ? (
                <p
                  key={index}
                  className="ml-auto max-w-[85%] border-2 border-ink bg-ink px-3 py-2 t-body text-cream"
                >
                  {message.text}
                </p>
              ) : (
                <div key={index} className="max-w-[90%]">
                  <p className="border-2 border-ink bg-cream px-3 py-2 t-body text-ink">
                    {message.text}
                  </p>
                  {message.href ? (
                    message.external ? (
                      <a
                        href={message.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-block pl-1 text-ink underline decoration-2 underline-offset-4 hover:text-accent-deep"
                      >
                        {message.hrefLabel}
                      </a>
                    ) : (
                      <Link
                        href={message.href}
                        onClick={() => setOpen(false)}
                        className="mt-1 inline-block pl-1 text-ink underline decoration-2 underline-offset-4 hover:text-accent-deep"
                      >
                        {message.hrefLabel}
                      </Link>
                    )
                  ) : null}
                </div>
              ),
            )}
          </div>

          <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-ink/10 px-4 py-2">
            {chips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                className="shrink-0 border border-ink/30 bg-paper px-2.5 py-1 t-small text-ink transition-colors hover:border-ink hover:bg-cream"
                onClick={() => send(chip.label)}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <form
            className="flex border-t-2 border-ink"
            onSubmit={(event) => {
              event.preventDefault();
              send(draft);
              setDraft("");
            }}
          >
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
                placeholder="Type your question&#8230;"
              aria-label="Question for the counter bot"
              className="flex-1 bg-paper px-3 py-3 t-body text-ink outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              className="bg-ink px-4 t-body font-semibold text-cream transition-colors hover:bg-accent-deep"
            >
              Ask
            </button>
          </form>

          <p className="border-t border-ink/10 px-4 pb-2 pt-1.5 t-small text-muted">
            Reads this site&#8217;s own facts. Nothing typed leaves the browser.
          </p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close the counter bot" : "Ask the counter bot"}
        className="fixed bottom-6 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-accent text-cream shadow-[4px_4px_0_0_rgba(23,19,16,0.85)] transition-transform hover:scale-105 sm:right-6"
      >
        {open ? (
          <span className="display t-lead" aria-hidden="true">
            ×
          </span>
        ) : (
          <span className="t-small font-semibold" aria-hidden="true">
            Ask
          </span>
        )}
      </button>
    </>
  );
}
