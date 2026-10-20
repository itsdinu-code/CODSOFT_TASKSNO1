import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { restaurant } from "@/lib/restaurant";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chickadys.example"),
  title: {
    default: "Chickady's — fried chicken, burgers and loaded fries, Alappakkam Chennai",
    template: "%s · Chickady's",
  },
  description:
    "Chickady's is a fried chicken, burger and loaded-fries kitchen on 150 Feet By-pass Road, Alappakkam, Chennai. Browse the printed menu, build a box and order for takeaway.",
  keywords: [
    "Chickady's",
    "Chickadys",
    "fried chicken Alappakkam",
    "burger Alappakkam",
    "loaded fries Tambaram",
    "Chicken Truffle Nachos",
    "Red Dragon Burger",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Chickady's",
    title: "Chickady's — fried chicken, burgers and loaded fries",
    description:
      "The printed menu of Chickady's, Alappakkam: burgers, loaded fries, wings, nachos and sharing boxes.",
    images: ["/campaigns/board-fried-chicken.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chickady's — fried chicken, burgers and loaded fries",
    description: "Burgers, loaded fries, wings and sharing boxes. Alappakkam, Chennai.",
    images: ["/campaigns/board-fried-chicken.jpg"],
  },
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4510b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    image: "/menu/board-menu.jpg",
    telephone: restaurant.phone,
    servesCuisine: ["Fried Chicken", "Burgers", "Loaded Fries", "Wings"],
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.streetAddress,
      addressLocality: restaurant.locality,
      addressRegion: "Tamil Nadu",
      postalCode: restaurant.postalCode,
      addressCountry: "IN",
    },
    hasMap: restaurant.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "12:00",
        closes: "23:45",
      },
    ],
    // Hours above are a third-party listing snapshot and are not owner-confirmed.
    comment: "Prototype listing. Hours and address pending owner confirmation.",
  };

  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${barlowCondensed.variable} ${barlow.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
