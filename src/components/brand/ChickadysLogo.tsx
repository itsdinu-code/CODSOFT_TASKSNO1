import "./ChickadysLogo.css";

export type LogoVariant = "wordmark" | "badge";
export type LogoTone = "cream" | "ink" | "yellow";
export type LogoSize = number | string;

interface ChickadysLogoProps {
  /** Width in pixels (or any CSS length). Height follows the mark's ratio. */
  size?: LogoSize;
  variant?: LogoVariant;
  /** The ink the mark is printed in. The mark is a mask, so it takes any colour. */
  tone?: LogoTone;
  /** Play the entrance. Off for the header and the footer. */
  animate?: boolean;
  /** Draw the brand-coloured panel behind the mark. */
  panel?: boolean;
  /** Accessible name. The mark is decorative by default. */
  alt?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Chickady's own wordmark, taken from the brand's published artwork and
 * lifted to a transparent background — the lettering is the original, not a
 * redraw and not a substitute typeface.
 *
 * The entrance: the brand panel arrives, the mark wipes itself open, a
 * highlight travels across it and the whole thing settles with one small
 * spring. With `prefers-reduced-motion` the same mark simply appears.
 */
export function ChickadysLogo({
  size = 220,
  variant = "wordmark",
  tone = "cream",
  animate = false,
  panel = true,
  alt = "",
  className = "",
}: ChickadysLogoProps) {
  const width = typeof size === "number" ? `${size}px` : size;

  return (
    <span
      className={`cd-logo ${className}`}
      style={{ inlineSize: width }}
      data-variant={variant}
      data-tone={tone}
      data-animate={animate ? "on" : "off"}
      data-panel={panel ? "on" : "off"}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <span className="cd-logo__panel" />
      <span className="cd-logo__mark" />
      <span className="cd-logo__streak" />
    </span>
  );
}

export default ChickadysLogo;
