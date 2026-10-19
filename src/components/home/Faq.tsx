"use client";

import { useState } from "react";

/**
 * "Tabbed index cards."
 *
 * Questions filed like cards in a drawer: each card overlaps the one above
 * and carries a tab on its top edge. One card is open at a time.
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

const CARD_TONES = ["bg-paper", "bg-accent", "bg-ink"];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="field-paper2 section">
      <div className="wrap">
        <div className="grid12 items-end gap-y-4">
          <h2 className="display reveal t-head col-span-12 text-ink lg:col-span-6">
            Before you order
          </h2>
          <p className="reveal col-span-12 text-ink-2 lg:col-span-5 lg:col-start-8">
            Where the answer is not confirmed yet, it says so. Nothing here is
            invented to fill a gap.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[1040px]">
          {QUESTIONS.map((item, index) => {
            const isOpen = open === index;
            const tone = CARD_TONES[index % CARD_TONES.length];
            const dark = tone === "bg-ink";
            const text = dark ? "text-cream" : "text-ink";
            return (
              <div
                key={item.topic}
                className="relative"
                style={{ marginTop: index === 0 ? 0 : -84, zIndex: index + 1 }}
              >
                <span
                  aria-hidden="true"
                  className={`absolute -top-[34px] flex h-[34px] w-[190px] items-center px-4 t-body font-semibold ${tone} ${text}`}
                  style={{
                    left: `${Math.min(index, 4) * 34}px`,
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  }}
                >
                  {item.topic}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className={`block w-full cursor-pointer px-5 py-6 text-left sm:px-8 ${tone} ${text}`}
                >
                  <span className="block t-body font-medium">
                    {item.question}
                  </span>
                </button>
                {isOpen ? (
                  <div
                    id={`faq-panel-${index}`}
                    className={`px-5 pb-7 pt-1 sm:px-8 ${tone} ${text}`}
                  >
                    <p className="max-w-[56ch] t-body leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Faq;
