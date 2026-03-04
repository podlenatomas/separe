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
  title: "separé — kavárna, víno & komunita | Praha 1",
  description:
    "Prémiová městská oáza na Mikulandské 133 v Praze 1. Výběrová káva, přírodní víno, pinsa romana, deskovky a komunitní akce.",
  keywords: [
    "kavárna Praha 1",
    "přírodní víno",
    "pinsa romana",
    "deskovky",
    "separé",
    "Mikulandská",
  ],
  openGraph: {
    title: "separé — kavárna, víno & komunita",
    description:
      "Prémiová městská oáza na Mikulandské v Praze 1. Káva, víno, pinsa a deskovky.",
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
