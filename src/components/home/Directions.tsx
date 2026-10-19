import { restaurant, fullAddress } from "@/lib/restaurant";

/**
 * "Clip-out coupon form."
 *
 * A directions slip, printed on the brand orange, with a perforation you
 * could actually tear along. The coupon is the artefact, so the facts sit in
 * the slip the way a coupon sets them, and the action bar is the stub.
 */
export function Directions() {
  return (
    <section className="field-paper section">
      <div className="wrap">
        <div
          className="relative mx-auto max-w-[1080px] bg-accent p-6 sm:p-10"
          style={{ borderRadius: "14px" }}
        >
          {/* the notches the perforation passes through */}
          <span
            aria-hidden="true"
            className="notch"
            style={{ left: "44%", top: "-28px", ["--notch-colour" as string]: "#FFF1D4" }}
          />
          <span
            aria-hidden="true"
            className="notch"
            style={{ left: "44%", bottom: "-28px", ["--notch-colour" as string]: "#FFF1D4" }}
          />

          <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-0">
            {/* the stub you keep */}
            <div className="md:pr-10">
              <h2 className="reveal display t-head text-ink">
                Come by
                <br />
                the counter
              </h2>
              <p className="mt-6 max-w-[36ch] text-ink">
                We are halfway down 150 Feet By-pass Road in Vairam Complex. The
                board is on the wall, the boxes are on the counter, and the
                kitchen runs until late.
              </p>
              <p className="mt-6 t-body text-ink">
                {restaurant.hours[0].days}
                <br />
                <span className="tabular">
                  {restaurant.hours[0].opens} to {restaurant.hours[0].closes}
                </span>
              </p>
            </div>

            {/* the perforation */}
            <div
              aria-hidden="true"
              className="perforation mx-auto h-full w-2 shrink-0"
              style={{ ["--perf-colour" as string]: "#FFF1D4" }}
            />

            {/* the details */}
            <div className="md:pl-10">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[10px] bg-paper px-4 py-3 text-ink">
                  <p className="t-body font-semibold">Address</p>
                  <p className="mt-1 t-body leading-snug">{fullAddress}</p>
                </div>
                <div className="rounded-[10px] bg-paper px-4 py-3 text-ink">
                  <p className="t-body font-semibold">Phone</p>
                  <a
                    href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
                    className="mt-1 block t-body underline underline-offset-4 hover:text-accent-deep"
                  >
                    {restaurant.phone}
                  </a>
                  <p className="mt-1 t-body">From a public listing â€” please confirm.</p>
                </div>
                <div className="rounded-[10px] bg-paper px-4 py-3 text-ink sm:col-span-2">
                  <p className="t-body font-semibold">Getting here</p>
                  <p className="mt-1 t-body leading-snug">
                    Alappakkam, Tambaram Municipality â€” the listing pin sits at
                    12.8966, 80.1107. We serve takeaway at the counter and dining
                    inside. Own delivery is not offered here; order through the
                    platforms for delivery.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={restaurant.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-ink flex-1"
                >
                  Open in Google Maps
                </a>
                <a
                  href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
                  className="btn btn-quiet flex-1"
                >
                  Call the shop
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Directions;

