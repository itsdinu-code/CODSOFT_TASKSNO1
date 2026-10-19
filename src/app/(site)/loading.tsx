import { ChickadysLogo } from "@/components/brand/ChickadysLogo";

/**
 * The loading screen.
 *
 * The brand's own mark opening on a dark ground while a route is fetched.
 * It is a route-level loading UI, so it appears during navigation and never
 * stands between the visitor and the page they asked for.
 */
export default function Loading() {
  return (
    <div className="field-ink flex min-h-[60vh] items-center justify-center">
      <span className="w-[180px] sm:w-[220px]">
        <ChickadysLogo size="100%" variant="wordmark" animate />
      </span>
    </div>
  );
}
