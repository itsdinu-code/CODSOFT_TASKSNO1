import { listingFacts, reviewSources } from "@/lib/reviews";
import { formatDate } from "@/lib/format";

/**
 * "The printed guest list."
 *
 * A programme prints the names of the people who came. We do the same thing
 * with the platforms Chickady's is reviewed on, and we send people to those
 * platforms to read the reviews themselves. No review text, no reviewer name
 * and no star rating is copied onto this site.
 */
export function Reviews() {
  const zomato = reviewSources.find((s) => s.platform === "Zomato")!;

  return (
    <section className="field-ink relative overflow-hidden pb-0">
      <div className="wrap pt-16 sm:pt-24">
        <p className="max-w-[40ch] text-on-ink-muted">
          Chickady&rsquo;s is reviewed by customers on the platforms below. We
          do not copy their words onto this site â€” read them where they were
          written.
        </p>
      </div>

      <div className="relative mt-10 flex justify-center overflow-hidden pb-0">
        <div className="w-[92%] max-w-[620px] rotate-[1.4deg] bg-paper p-6 sm:w-[78%] sm:p-10">
          <h2 className="display reveal text-center t-lead text-ink">
            What people say
          </h2>


          
          <img
            src="/gallery/maps-profile-updates.jpg"
            alt="Chickady's Google Maps business profile, showing the Menu, Reviews, Photos, Updates and About tabs and an owner post."
            width={1440}
            height={650}
            loading="lazy"
            className="mt-6 w-full object-cover"
          />

          <div className="mt-7 text-center">
            <p className="display-wide t-display leading-none text-accent-deep">
              {listingFacts.rating}
              <span className="text-[0.5em] text-ink">/5</span>
            </p>
            <p className="mt-2 t-body text-ink-2">
              {zomato.reviewCount} ratings on the Zomato listing, read on{" "}
              {formatDate(zomato.retrievedAt)}.
            </p>
            <p className="mx-auto mt-4 max-w-[44ch] t-body text-muted">
              A listing rating is not the same as a rating on this website, and
              this website has no rating of its own. Figures change with every
              review, so the date above is the date they were true.
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

