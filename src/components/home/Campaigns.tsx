import Link from "next/link";
import { connection } from "next/server";
import { getCampaigns } from "@/lib/campaigns";
import { getInstagramProfile } from "@/lib/instagram";
import { CampaignBell } from "./CampaignBell";

/**
 * The campaign carousel.
 *
 * The owner's own artwork, each campaign on its own card, swiped sideways on
 * a phone and scrolled on a desktop. A campaign whose price or stock is not
 * confirmed carries that note on the card, not in a footnote.
 */
export async function Campaigns() {
  await connection();
  const campaigns = getCampaigns();
  const live = await getInstagramProfile();
  const pulledAt = live
    ? new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }).format(
        new Date(live.fetchedAt),
      )
    : null;

  return (
    <section className="field-paper2 section">
      <div className="wrap">
        <div className="grid12 items-end gap-y-4">
          <h2 className="display reveal t-head col-span-12 text-ink lg:col-span-6">
            What the kitchen is pushing
          </h2>
          <p className="reveal col-span-12 text-ink-2 lg:col-span-5 lg:col-start-8">
            Every card here comes from the restaurant&rsquo;s own announcements
            and its own photographs. Nothing is running that the shop has not
            announced.
          </p>
        </div>
      </div>

      {live ? (
        <div className="wrap mt-3">
          <p className="t-small text-muted">
            <span className="inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-[#dd2a7b]" />{" "}
            {live.source === "live" ? "Pulled live" : "Last pull"}{" "}
            {live.source === "live"
              ? `at ${pulledAt} `
              : `${new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(live.fetchedAt))} `}{" "}
            from{" "}
            <a
              href="https://www.instagram.com/chickadys"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-2 underline-offset-4 hover:text-accent-deep"
            >
              @chickadys
            </a>
            {live.posts !== null ? ` · ${live.posts} posts up now` : ""}
            {live.followers !== null ? ` · ${live.followers} followers` : ""}
            {live.latestCaption ? ` · latest note: “${live.latestCaption}”` : ""}.
          </p>
        </div>
      ) : null}

      <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--margin)] pb-2">
        {campaigns.map((campaign) => (
          <article
            key={campaign.id}
            className="w-[84vw] max-w-[400px] shrink-0 snap-start bg-paper sm:w-[380px]"
          >
            <div
              className={`flex h-[240px] items-center justify-center overflow-hidden ${
                campaign.theme === "black-red" ? "bg-black" : campaign.theme === "cream" ? "bg-paper" : "bg-accent"
              }`}
            >
              {campaign.artwork ? (
                <img
                  src={campaign.artwork}
                  alt={campaign.artworkAlt ?? campaign.headline}
                  width={campaign.theme === "black-red" ? 684 : 400}
                  height={campaign.theme === "black-red" ? 212 : 400}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : campaign.poster ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-8 text-center text-cream">
                  <span className="t-small uppercase tracking-[0.35em] opacity-75">
                    {campaign.poster.eyebrow}
                  </span>
                  <span
                    className={`display-wide t-display ${campaign.theme === "black-red" ? "text-red" : "text-cream"}`}
                  >
                    {campaign.poster.title}
                  </span>
                  <span className="t-small opacity-75">{campaign.poster.note}</span>
                </div>
              ) : null}
            </div>
            <div className="p-5">
              <h3 className="display-wide t-lead text-ink">
                {campaign.headline}
              </h3>
              <p className="mt-2 t-body leading-snug text-muted">
                {campaign.body}
              </p>
              {campaign.needsVerification ? (
                <p className="mt-3 t-body font-medium text-accent-deep">
                  Price and availability to be confirmed.
                </p>
              ) : null}
              {campaign.needsVerification ? (
                <CampaignBell campaignId={campaign.id} headline={campaign.headline} />
              ) : null}
              {campaign.ctaHref ? (
                <Link
                  href={campaign.ctaHref}
                  className="mt-4 inline-block text-ink underline decoration-2 underline-offset-4 hover:text-accent-deep"
                >
                  {campaign.ctaLabel}
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      <div className="wrap mt-6">
        <p className="t-small text-muted">
          The bell keeps its note in this browser — nothing is sent.
        </p>
      </div>
    </section>
  );
}

export default Campaigns;
