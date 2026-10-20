import { listingFacts, reviewSources } from "@/lib/reviews";
import { formatDate } from "@/lib/format";

/**
 * "The printed guest list."
 *
 * One tilted print: the rating the Zomato listing carries, with the date it
 * was read, and the buttons that take the visitor to the platforms
 * themselves. We do not copy review words or reviewer names onto the site.
 */
export function Reviews() {
  const zomato = reviewSources.find((s) => s.platform === "Zomato")!;

  return (
    <section className="field-ink relative overflow-hidden pb-0">
      <div className="relative flex justify-center overflow-hidden pb-0 pt-16 sm:pt-24">
        <div className="w-[92%] max-w-[620px] rotate-[1.4deg] bg-paper p-6 sm:w-[78%] sm:p-10">
          <h2 className="display reveal text-center t-lead text-ink">
            What people say
          </h2>

          <div className="mt-7 text-center">
            <p className="display-wide t-display leading-none text-accent-deep">
              {listingFacts.rating}
              <span className="text-[0.5em] text-ink">/5</span>
            </p>
            <p className="mt-2 t-body text-ink-2">
              {listingFacts.ratingCount} ratings on the Zomato listing, read on{" "}
              {formatDate(zomato.retrievedAt)}.
            </p>
          </div>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 t-body text-ink-2">
            {reviewSources.map((source, index) => (
              <li key={source.platform} className="flex items-center gap-3">
                {index > 0 ? <span aria-hidden="true">&middot;</span> : null}
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline underline-offset-4 hover:text-accent-deep"
                >
                  {source.platform}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://maps.app.goo.gl/tuLZvW7yhxq4CFYf7"
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-sm"
            >
              Read reviews on Google
            </a>
            <a
              href="https://www.zomato.com/chennai/chickadys-perungalathur"
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-sm btn-quiet"
            >
              Read reviews on Zomato
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
