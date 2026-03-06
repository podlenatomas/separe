import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/LenisProvider";
import NavProvider from "@/providers/NavProvider";

const inter = Inter({
  variable: "--font-inter",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <a href="#main" className="skip-link">
          Přeskočit na obsah
        </a>
        <LenisProvider>
          <NavProvider>{children}</NavProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
