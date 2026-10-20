import Link from "next/link";
import { restaurant } from "@/lib/restaurant";

/**
 * Intro â€” "title, note, facts row".
 *
 * A heading on the left margin, a short note in the far-right column on the
 * same baseline, then a row of facts spread the width of the page, the way
 * the times are printed on a programme.
 */
export function Intro() {
  const facts = [
    {
      value: "Noon",
      note: "The kitchen opens at midday, every day of the week.",
    },
    {
      value: "11:45 pm",
      note: "The hour the listing shows for closing. The owner's own post says midnight.",
    },
    {
      value: "â‚¹172",
      note: "Where the printed menu starts, for the classic veg burger.",
    },
    {
      value: "14 pieces",
      note: "The biggest box on the board, the Ultimate Savings Meal.",
    },
  ];

  return (
    <section className="field-paper section">
      <div className="wrap grid12 gap-y-10">
        <h2 className="display reveal col-span-12 t-display text-ink lg:col-span-6">
          Fried to order
        </h2>
        <p className="reveal col-span-12 text-ink-2 lg:col-span-4 lg:col-start-8">
          Chickady&rsquo;s fries chicken, builds burgers and pours loaded fries on
          150 Feet By-pass Road in Alappakkam. Everything comes out in the red
          boxes, and the scoops stay on until late.
        </p>
      </div>

      <div className="wrap mt-16 grid12 gap-y-10">
        <div className="col-span-12 lg:col-span-7">
          <dl className="grid grid-cols-2 gap-y-9 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.value} className="pr-6">
                <dt className="display-wide t-head leading-none text-ink">
                  {fact.value}
                </dt>
                <dd className="mt-2 max-w-[24ch] t-body text-muted">{fact.note}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className="col-span-12 m-0 lg:col-span-5">
          <img
            src="/food/256b8273-d200-4416-b305-180ad3a31508.jpg"
            alt="The Chickady's fried-chicken feast: crispy pieces, glazed wings and strips with two dips, from the restaurant's own food photographs."
            width={720}
            height={540}
            loading="lazy"
            className="reveal w-full object-cover"
          />
          <figcaption className="mt-3 t-body text-muted">
            From Chickady&rsquo;s own food photographs. The prices on this site
            are read from the printed board, photographed on 19 October 2026.{" "}
            <Link href="/menu" className="underline underline-offset-4 hover:text-accent-deep">
              See every line
            </Link>
            .
          </figcaption>
        </figure>
      </div>

      <div className="wrap mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t-2 border-ink/15 pt-6 t-body text-muted">
        <span>{restaurant.hours[0].days}</span>
        <span className="tabular">
          {restaurant.hours[0].opens} â€“ {restaurant.hours[0].closes}
        </span>
        <span>{restaurant.area}</span>
        <a
          href={restaurant.mapsUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-4 hover:text-accent-deep"
        >
          Directions
        </a>
      </div>
    </section>
  );
}

export default Intro;

