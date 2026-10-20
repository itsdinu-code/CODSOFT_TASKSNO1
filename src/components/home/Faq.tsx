"use client";

import { useState } from "react";

/**
 * A quiet question sheet: one row per question, hairline rules between
 * them, one answer open at a time. No stacked cards, no overlap.
 */
const QUESTIONS = [
  {
    topic: "Delivery",
    question: "Do you deliver, and how far?",
    answer:
      "Not from this site. Delivery runs through Zomato and Swiggy, which set their own radius, fees and minimum order — we have not published those figures and will not guess at them. Takeaway is collected from the counter at Alappakkam.",
  },
  {
    topic: "Dining in",
    question: "Can I eat inside?",
    answer:
      "Yes. The Red Dragon launch poster lists 'dining', so there is seating. Table service, table booking and QR ordering have not been set up, and this site does not take reservations.",
  },
  {
    topic: "Hours",
    question: "What time are you open?",
    answer:
      "Public listings show noon to 11:45 pm every day. The owner's own campaign card says 'Open till NIGHT 12'. Confirm the day's hours before you travel — we publish the listing hours because they are the only ones we can verify.",
  },
  {
    topic: "Spice",
    question: "Which dishes are the hot ones?",
    answer:
      "The printed board marks three items with three flames: Nashville Hot Chicken, and Hot Nashville wings and tenders. We do not publish a full ingredient or allergen sheet yet because the restaurant has not supplied one — ask at the counter.",
  },
  {
    topic: "Vegetarian",
    question: "What can I eat that is vegetarian?",
    answer:
      "The board carries a green square beside the classic veg and tandoori paneer burgers, cheesy jalapeno fries, avocado cheese nachos, jalapeno cheese popz and mozzarella cheese stix, and the fries, peri-peri fries and popcorn. Dips are marked on the board without a square, so treat them as unknown until the owner confirms.",
  },
  {
    topic: "Payment",
    question: "Can I pay on my phone?",
    answer:
      "The listing says digital payments are accepted at the shop. This prototype takes no payment at all: the checkout is a simulation, no card details are collected and no order reaches the kitchen.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="field-paper2 section">
      <div className="wrap">
        <div className="grid12 items-end gap-y-4">
          <h2 className="display reveal t-head col-span-12 text-ink lg:col-span-6">
            Before you order
          </h2>
          <p className="reveal col-span-12 text-ink-2 lg:col-span-5 lg:col-start-8">
            The answers we can verify, plainly.
          </p>
        </div>

        <ul className="mx-auto mt-12 max-w-[1040px] list-none border-t-2 border-ink/15">
          {QUESTIONS.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={item.topic} className="border-b-2 border-ink/15">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="min-w-0">
                    <span className="block t-small uppercase tracking-[0.25em] text-muted">
                      {item.topic}
                    </span>
                    <span className="mt-2 block display-wide t-head text-ink transition-colors group-hover:text-accent-deep">
                      {item.question}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`mt-1 relative inline-flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      isOpen ? "rotate-45 border-ink bg-ink text-cream" : "border-ink/20 text-ink"
                    }`}
                  >
                    <span className="absolute block h-[2px] w-4 bg-current" />
                    <span className="absolute block h-[2px] w-4 rotate-90 bg-current" />
                  </span>
                </button>
                <div className={isOpen ? "block" : "hidden"}>
                  <p className="-mt-2 max-w-[62ch] pb-8 t-body text-ink-2">
                    {item.answer}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Faq;
