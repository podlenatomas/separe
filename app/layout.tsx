import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/LenisProvider";
import NavProvider from "@/providers/NavProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "separé — řemeslné pivo, šumivá vína & deskovky | Praha 1",
  description:
    "Malý rodinný bar na Mikulandské 133/3 v Praze 1. Řemeslná piva z malých pivovarů, šumivá vína, pet-naty, přívlastková vína, deskovky a legendární středeční kvízy.",
  keywords: [
    "rodinný bar Praha 1",
    "řemeslné pivo",
    "šumivá vína",
    "pet-nat",
    "deskovky",
    "hospodský kvíz",
    "separé",
    "Mikulandská",
  ],
  openGraph: {
    title: "separé — řemeslné pivo, šumivá vína & deskovky",
    description:
      "Malý rodinný bar na Mikulandské v Praze 1. Poctivé pití, hospodské kvízy a atmosféra, ve které se snadno zapomene na ruch Národní třídy.",
    locale: "cs_CZ",
    type: "website",
    url: "https://separe.cz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <a href="#main" className="skip-link">
          Přeskočit na obsah
        </a>
        <LenisProvider>
          <NavProvider>{children}</NavProvider>
        </LenisProvider>
        {/* Global paper noise overlay — tactile 2026 texture */}
        <div
          className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.03] mix-blend-difference"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
          }}
          aria-hidden="true"
        />
      </body>
    </html>
  );
}
