import Link from "next/link";
import { heldTiles } from "@/lib/gallery";
import { restaurant } from "@/lib/restaurant";

/**
 * "Photo tiles with label strips."
 *
 * Every tile is a photograph with a filled label strip attached beneath it,
 * the two forming one object. Tiles we hold are the restaurant's own
 * published artwork; tiles we do not hold are marked plainly, so the owner
 * can see at a glance which photographs are still owed.
 */
export function Gallery() {
  const tiles = [
    ...heldTiles.slice(0, 1),
    {
      values: ["Exterior", "Signboard", "Daylight", "Wide"] as [string, string, string, string],
      left: "Needed",
      right: "Alappakkam",
      caption: "The shopfront and the signboard above it, with the road on a busy evening.",
      needed: true,
    },
    ...heldTiles.slice(1, 3),
    {
      values: ["Counter", "Till", "Menu", "Eye level"] as [string, string, string, string],
      left: "Needed",
      right: "Alappakkam",
      caption: "Where the order is taken, with the board and the till in shot.",
      needed: true,
    },
    heldTiles[3],
    {
      values: ["Seating", "Tables", "Evening", "Wide"] as [string, string, string, string],
      left: "Needed",
      right: "Alappakkam",
      caption: "The dining area, with the seats and the counter both in shot.",
      needed: true,
    },
    {
      values: ["Kitchen", "Pass", "Prep", "Behind the pass"] as [string, string, string, string],
      left: "Needed",
      right: "Alappakkam",
      caption: "Where the chicken is fried and the boxes are filled, if the owner is happy to share it.",
      needed: true,
    },
  ];

  return (
    <section className="field-paper2 section">
      <div className="wrap">
        <div className="grid12 items-end gap-y-4">
          <h2 className="display reveal t-head col-span-12 text-ink lg:col-span-5">
            The shop
          </h2>
          <p className="reveal col-span-12 text-ink-2 lg:col-span-5 lg:col-start-8">
            We hold the photographs the restaurant has published itself. The
            rest are marked, with the shot we need written on the label, so the
            owner can hand them over.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {tiles.map((tile, index) => {
            const dark = index % 3 === 1;
            return (
              <figure key={tile.caption} className="m-0">
                <div className="relative aspect-4/5 overflow-hidden bg-paper-2">
                  {tile.src ? (
                                        <img
                      src={tile.src}
                      alt={tile.alt ?? ""}
                      loading="lazy"
                      width={600}
                      height={750}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col justify-between bg-accent p-4">
                      <span className="reveal display t-lead text-ink">
                        {tile.values[0]}
                      </span>
                      <span className="t-body text-ink">Photograph needed</span>
                    </div>
                  )}
                </div>
                <figcaption
                  className={`flex h-[104px] flex-col justify-between p-3 ${
                    dark ? "bg-ink text-cream" : "bg-paper text-ink"
                  }`}
                >
                  <span className="flex flex-wrap justify-between gap-x-2 gap-y-0.5 t-small">
                    {tile.values.map((v, i) => (
                      <span key={v} className={i > 1 ? "hidden sm:inline" : ""}>
                        {v}
                      </span>
                    ))}
                  </span>
                  <span className="flex justify-between gap-2 t-small opacity-80">
                    <span>{tile.left}</span>
                    <span>{tile.right}</span>
                  </span>
                  <span className="t-small leading-snug">{tile.caption}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t-2 border-ink/15 pt-6 t-body text-muted">
          <span>{restaurant.name}</span>
          <span>{restaurant.area}</span>
          <Link href="/gallery" className="underline underline-offset-4 hover:text-accent-deep">
            See the full shot list
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Gallery;

