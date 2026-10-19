import Link from "next/link";
import { ChickadysLogo } from "@/components/brand/ChickadysLogo";
import { restaurant, fullAddress } from "@/lib/restaurant";

/** Kept as a constant so the footer can be prerendered without reading a clock. */
const COPYRIGHT_YEAR = 2026;

export function SiteFooter() {
  return (
    <footer className="field-accent pt-0">
      <div className="scallop-top bg-paper pt-14 pb-10">
        <div className="wrap grid12 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <p className="display t-display text-ink">
              Come hungry
            </p>
            <p className="mt-4 max-w-[38ch] text-ink-2">
              Fried chicken, burgers and loaded fries, packed in the red boxes you
              have seen on 150 Feet By-pass Road. Open from noon, and the scoops
              stay on until late.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {restaurant.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-ink underline decoration-2 underline-offset-4 hover:text-accent-deep"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div className="relative">
              <span className="absolute -top-2 right-0 block w-20 bg-ink p-1.5">
                <ChickadysLogo
                  size="100%"
                  variant="badge"
                  tone="yellow"
                  panel={false}
                  alt="Chickady's badge"
                />
              </span>
              <address className="not-italic">
                <p className="sr-only">Address and contact</p>
                <p className="mt-14 t-body leading-snug text-ink">
                  {restaurant.streetAddress}
                  <br />
                  {restaurant.area}
                  <br />
                  {restaurant.locality}
                  <br />
                  {restaurant.city}, {restaurant.state} {restaurant.postalCode}
                </p>
                <p className="mt-4 t-body leading-snug">
                  <a href={`tel:${restaurant.phone.replace(/\s/g, "")}`} className="text-ink hover:text-accent-deep">
                    {restaurant.phone}
                  </a>
                  <br />
                  <a href={restaurant.mapsUrl} target="_blank" rel="noreferrer noopener" className="text-ink hover:text-accent-deep">
                    Directions on Google Maps
                  </a>
                </p>
                <p className="mt-4 t-body leading-snug text-ink">
                  {restaurant.hours[0].days}
                  <br />
                  {restaurant.hours[0].opens} to {restaurant.hours[0].closes}
                </p>
              </address>
            </div>
          </div>
        </div>

        <div className="wrap mt-12 border-t-2 border-ink/15 pt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 t-body">
            <li>
              <Link href="/faq" className="text-ink-2 hover:text-accent-deep">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/legal/privacy" className="text-ink-2 hover:text-accent-deep">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className="text-ink-2 hover:text-accent-deep">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/legal/policies" className="text-ink-2 hover:text-accent-deep">
                Cancellation and refund policy
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="text-ink-2 hover:text-accent-deep">
                Accessibility
              </Link>
            </li>
          </ul>
          <p className="mt-5 t-body text-muted">
            {fullAddress}. Prototype build — address, hours and phone are taken from
            public listings and are awaiting the owner&rsquo;s confirmation.
          </p>
          <p className="mt-2 t-body text-muted">
            © {COPYRIGHT_YEAR} Chickady&apos;s. Built as a prototype for
            the restaurant. No orders are sent and no payment is taken.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
