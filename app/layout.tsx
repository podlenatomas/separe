import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "separé — kavárna, víno & komunita | Praha 1",
  description:
    "Skrytá oáza ve vnitrobloku UMPRUM. Káva od lokálních pražíren, přírodní víno, deskovky a komunitní akce v srdci Prahy 1.",
  keywords: ["kavárna", "Praha 1", "víno", "deskovky", "UMPRUM", "separé"],
  openGraph: {
    title: "separé — kavárna, víno & komunita",
    description: "Třetí prostor ve vnitrobloku UMPRUM v Praze 1.",
    locale: "cs_CZ",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
