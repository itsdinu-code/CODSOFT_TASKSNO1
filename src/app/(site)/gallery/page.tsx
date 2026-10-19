import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Prose, ProseSection } from "@/components/site/Prose";
import { heldTiles, shotList } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "The shop",
  description:
    "Photographs of Chickady's in Alappakkam, Chennai, and the list of shop photographs the restaurant still needs to supply.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="The shop"
        lede="What we can show, and what we cannot. Everything below that carries a photograph is artwork the restaurant published itself."
      />

      <section className="field-paper2 section">
        <div className="wrap">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {heldTiles.map((tile, index) => (
              <figure key={tile.caption} className="m-0">
                <div className="aspect-4/3 overflow-hidden bg-paper">
                                    <img
                    src={tile.src}
                    alt={tile.alt ?? ""}
                    loading="lazy"
                    width={600}
                    height={450}
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption
                  className={`mt-0 flex h-[88px] flex-col justify-between p-3 ${
                    index % 2 === 1 ? "bg-ink text-cream" : "bg-paper text-ink"
                  }`}
                >
                  <span className="flex justify-between gap-2 t-small">
                    {tile.values.map((v) => (
                      <span key={v}>{v}</span>
                    ))}
                  </span>
                  <span className="t-small leading-snug">{tile.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Prose>
        <ProseSection title="The shots we still need">
          <p>
            A restaurant gallery is expected to have a front door, a counter, a
            room and a kitchen. We have none of those, because the shop has not
            sent them. Rather than fill the page with photographs of other
            people&rsquo;s kitchens, here is exactly what is missing.
          </p>
          <ul className="mt-6 divide-y-2 divide-ink/10">
            {shotList.map((shot) => (
              <li key={shot.shot} className="flex flex-wrap items-baseline justify-between gap-3 py-4">
                <span className="display-wide t-body text-ink">{shot.shot}</span>
                <span className="min-w-0 flex-1 t-body text-muted">{shot.detail}</span>
                <span
                  className={`shrink-0 px-2.5 py-1 t-small font-medium ${
                    shot.held ? "bg-accent text-ink" : "bg-paper-2 text-muted"
                  }`}
                >
                  {shot.held ? "Held" : "Needed"}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 t-body text-muted">
            Photographs of customers need their permission, and photographs of
            the kitchen need the owner&rsquo;s. Send them to the shop and they
            will go straight into this page.
          </p>
          <p>
            <Link href="/contact" className="underline underline-offset-4 hover:text-accent-deep">
              Get in touch
            </Link>
            .
          </p>
        </ProseSection>
      </Prose>
    </>
  );
}
