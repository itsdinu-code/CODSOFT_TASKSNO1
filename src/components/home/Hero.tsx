import { HeroCard } from "./HeroCard";
import { restaurant } from "@/lib/restaurant";

/**
 * Hero — "card over a dim room".
 *
 * The ground is flat and dark, the way a room looks with the lights down.
 * The card is the artefact: a sheet of the printed menu laid over it, with
 * a second print tipped onto the edge.
 */
export function Hero() {
  return (
    <section className="field-ink relative overflow-hidden">
      <div className="wrap grid12 items-start gap-y-12 py-10 sm:py-14 lg:py-16">
        <div className="col-span-12 pb-6 lg:col-span-8 lg:pb-[26vh]">
          <div className="lg:sticky lg:top-[80px]">
            <HeroCard />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:pl-4">
          <figure className="relative m-0">
            <div className="rotate-[-1.5deg] bg-paper p-2">
                            <img
                src="/menu/box-solid-treat.jpg"
                alt="Chickady's red takeaway box of fried chicken with fries and a Pepsi, photographed from the printed fried-chicken board."
                width={405}
                height={420}
                className="drift h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>
            <figcaption className="mt-3 max-w-[34ch] t-small text-on-ink-muted">
              Taken from Chickady&rsquo;s own printed fried-chicken board. Phone{" "}
              <a
                href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
                className="underline underline-offset-4 hover:text-cream"
              >
                {restaurant.phone}
              </a>
              .
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default Hero;
