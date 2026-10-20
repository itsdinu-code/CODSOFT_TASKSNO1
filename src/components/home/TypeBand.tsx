"use client";

import TextLoop from "@/components/reactbits/TextLoop";

/**
 * The marching ribbon — the board's own vocabulary ("fried chicken,
 * crafted burgers…") run through a slanted loop, printed in the site's
 * accent on cream. Purely decorative motion; the phrase is also available
 * to screen readers through TextLoop's role="img" label.
 */
const PHRASE =
  "Fried chicken ✦ Crafted burgers ✦ Loaded fries ✦ Saucy wings ✦ Nachos ✦ Scoops";

export function TypeBand() {
  return (
    <div className="type-band" aria-hidden="true">
      <TextLoop
        text={PHRASE}
        shape="line"
        tilt={-2}
        speed={64}
        fontSize={38}
        fontWeight={800}
        letterSpacing={3}
        ribbon
        ribbonColor="#f4510b"
        ribbonWidth={72}
        color="#fff6e6"
        edgeFade={0.28}
        pauseOnHover
        className="type-band__loop"
      />
    </div>
  );
}

export default TypeBand;
