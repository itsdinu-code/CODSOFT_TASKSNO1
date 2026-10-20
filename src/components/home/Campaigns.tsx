import Link from "next/link";
import { connection } from "next/server";
import { getCampaigns } from "@/lib/campaigns";
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

  return (
    <section className="field-paper2 section">
      <div className="wrap">
        <div className="grid12 items-end gap-y-4">
          <h2 className="display reveal t-head col-span-12 text-ink lg:col-span-6">
            What the kitchen is pushing
          </h2>
          <p className="reveal col-span-12 text-ink-2 lg:col-span-5 lg:col-start-8">
            Every card here is artwork the restaurant published itself. Nothing
            is running that the shop has not announced.
          </p>
        </div>
      </div>

      <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--margin)] pb-2">
        {campaigns.map((campaign) => (
          <article
            key={campaign.id}
            className="w-[84vw] max-w-[400px] shrink-0 snap-start bg-paper sm:w-[380px]"
          >
            <div
              className={`flex h-[240px] items-center justify-center overflow-hidden ${
                campaign.theme === "black-red" ? "bg-black" : "bg-accent"
              }`}
            >
                            <img
                src={campaign.artwork}
                alt={campaign.artworkAlt}
                width={campaign.theme === "black-red" ? 684 : 400}
                height={campaign.theme === "black-red" ? 212 : 400}
                loading="lazy"
                className="h-full w-full object-contain"
              />
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
    </section>
  );
}

export default Campaigns;
