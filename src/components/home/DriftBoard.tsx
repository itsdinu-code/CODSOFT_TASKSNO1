"use client";

import { useEffect, useState } from "react";
import DriftWall from "@/components/reactbits/DriftWall";

/**
 * "The board in slow drift."
 *
 * A dark field with the restaurant's own published food photographs drifting
 * past like the counter's print rail. Food shots only — artwork, screenshots
 * and shopfront are deliberately left out; the full provenance of every
 * tile lives in docs/image.md.
 */

// Every tile below is one photograph shared by the restaurant itself
// (the owner's own food shots, straight from their listing and handout set).
// Nothing stock, nothing scraped, nothing invented — captions only describe
// what is actually visible in each frame.
const FOOD_TILES = [
  { image: "/food/chickday-s-foods.jpg", title: "Crispy fried chicken, the house plate" },
  { image: "/food/024824e0-731e-4685-9ab6-36ca265da9ae.jpg", title: "Bunless crispy chicken stack, sauce dripping" },
  { image: "/food/02580bac-95b4-4133-aabf-190ae53a55d1.jpg", title: "The full tray — burger, bites, strips and fries" },
  { image: "/food/02ce61f6-4f4f-4df1-8a2b-e0a1be67e82c.jpg", title: "Grapefruit mocktail over crushed ice" },
  { image: "/food/05d1d517-d5dd-4a11-833d-7a0b65e8c360.jpg", title: "Strawberry mocktail with fresh mint" },
  { image: "/food/1846b559-1e41-4df4-b916-54f7d8475844.jpg", title: "Berry frappe crowned with cream" },
  { image: "/food/1c9f95f6-6f11-44ba-875b-eb957aca3924.jpg", title: "Wings three ways with a cream dip" },
  { image: "/food/256b8273-d200-4416-b305-180ad3a31508.jpg", title: "The fried-chicken feast tray with two dips" },
  { image: "/food/27375c70-55dd-4b26-a53f-9cf00e952d08.jpg", title: "Blueberry frappe in the house cup" },
  { image: "/food/2d5ccc39-4e1d-4214-95ba-9bfc1ea3bee0.jpg", title: "Loaded fries under bites and cheese sauce" },
  { image: "/food/2e589b85-7306-426b-a886-9e4ba9be1518.jpg", title: "Twin chicken burgers with a box of bites" },
  { image: "/food/378cb137-258d-4a14-a2e2-317dbb7ca74c.jpg", title: "Iced cola, sweat on the cup" },
  { image: "/food/3a245085-2832-4106-93d3-cb6ba8372f6a.jpg", title: "Pickled chicken burger with fries and strips" },
  { image: "/food/3d4140e2-4fc2-4ae1-9e02-2b5d8feaf332.jpg", title: "An open box of popcorn bites" },
  { image: "/food/57c3549b-7e2e-4fd0-9da8-2086fc557ff4.jpg", title: "Glazed fiery drums, four to a box" },
  { image: "/food/5d77cee5-767b-44bf-87dc-da8801d9ea79.jpg", title: "Popcorn trio — classic, peri peri, signature dust" },
  { image: "/food/5fba6bbf-4360-422f-a622-7bcd93462e42.jpg", title: "Red velvet scoops with brownie crumbs" },
  { image: "/food/623dfc57-4914-4535-9a0c-532d25fb0e4a.jpg", title: "The house dip, up close" },
  { image: "/food/6d1f7216-b961-41bf-910f-c0ab9cb9dbc1.jpg", title: "Jalapeño and melted-cheese chicken burger" },
  { image: "/food/6e25153b-6030-47f3-84c8-f55b80d3151e.jpg", title: "Tenders with a cola and the house dip" },
  { image: "/food/795bafa7-724a-4063-9e85-22f50eab50eb.jpg", title: "Cheese-laced loaded fries, straight from the box" },
  { image: "/food/7cb68525-67e3-47ab-ba71-6bbd9831ec43.jpg", title: "Boneless chunk bites by the box" },
  { image: "/food/8100c805-4d74-408e-9424-e2ac096c9115.jpg", title: "Lotus-biscoff scoops with biscuit crumble" },
  { image: "/food/a0281059-673e-44e5-90c1-fcc3f6329102.jpg", title: "Blue lemonade with lemon and mint" },
  { image: "/food/ae7eee2d-e62e-429d-affc-d3603e720b52.jpg", title: "The veggie patty burger with tomato and onion" },
  { image: "/food/c59f09ae-3c8d-4cdf-956e-22e1946227d5.jpg", title: "Tenders, two ways — classic and red" },
  { image: "/food/cd2612bb-c3e9-4119-a939-1b771b95d373.jpg", title: "The tenders flavour board" },
  { image: "/food/d0d759d2-34ac-43e1-921b-ea5a3d0afe9c.jpg", title: "Biscoff frappe with a Lotus biscuit" },
  { image: "/food/d6284f56-e4b8-4bb7-9c95-6fa30255ec19.jpg", title: "Crispy drums, packed to go" },
  { image: "/food/d6baeaa1-90d1-43ad-905c-eb720184e832.jpg", title: "Virgin mojito with lime and mint" },
  { image: "/food/d9e4a3c8-ff0f-449f-afe7-7a45cddb6206.jpg", title: "Fiery glazed crispy burger" },
  { image: "/food/e449695b-b2e2-4066-961c-94ebea8b543f.jpg", title: "The orange iced refreshment from the counter" },
  { image: "/food/e7127081-13fe-4c42-8e7b-15520f2cb197.jpg", title: "Four crispy burgers lined up" },
  { image: "/food/ea6ba5a4-17e8-4fc2-a0d4-1bd331689bfc.jpg", title: "Burger, fries and a cola, boxed" },
  { image: "/food/f32de68d-c07b-462b-af1d-cea346d67063.jpg", title: "Grilled patty burger on the dark board" },
];

const CALM_TILE = {
  image: "/food/chickday-s-foods.jpg",
  title: "Crispy fried chicken, the house plate",
};

export function DriftBoard() {
  // Columns are a client-side choice: six across on a desktop, three on a
  // phone. The first render always uses the desktop value so the server
  // output and hydration match; the media query then adjusts in an effect.
  const [columns, setColumns] = useState(6);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 719px)");
    const apply = () => setColumns(mq.matches ? 3 : 6);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <section className="field-ink drift-board" aria-labelledby="drift-board-title">
      <div className="wrap grid12 items-end gap-y-4 pt-16 sm:pt-20">
        <h2 id="drift-board-title" className="reveal display t-head col-span-12 text-cream lg:col-span-5">
          Straight off the board
        </h2>
        <p className="reveal col-span-12 text-on-ink-muted lg:col-span-5 lg:col-start-8">
          Thirty-five photographs the restaurant shared itself — burgers, wings,
          fries, mocktails and scoops — drifting like the prints do behind the
          counter. No stock shots, no borrowed artwork: every tile is a held
          photo. Hover a tile to lift it out of the print.
        </p>
      </div>

      <div className="drift-board__wall">
        <DriftWall
          items={FOOD_TILES.length ? FOOD_TILES : [CALM_TILE]}
          columns={columns}
          tileWidth={216}
          tileHeight={148}
          gap={16}
          radius={6}
          tilt={9}
          turn={-9}
          perspective={1200}
          depth={90}
          speed={34}
          direction="up"
          variance={0.5}
          parallax={0.5}
          lift={52}
          fade={0.68}
          dim={0.5}
          grayscale
          pauseOnHover={false}
          overlayColor="#171310"
        />
      </div>
    </section>
  );
}

export default DriftBoard;
