import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    cs: "separé | řemeslné pivo, šumivá vína & deskovky | Praha 1",
    en: "separé | craft beer, sparkling wine & board games | Prague 1",
  };

  const descriptions: Record<string, string> = {
    cs: "Malý rodinný bar na Mikulandské 133/3 v Praze 1. Řemeslná piva z malých pivovarů, šumivá vína, pet-naty, přívlastková vína, deskovky a legendární středeční kvízy.",
    en: "A small family bar at Mikulandská 133/3 in Prague 1. Craft beers from small breweries, sparkling wines, pet-nats, quality wines, board games and legendary Wednesday pub quizzes.",
  };

  return {
    title: titles[locale] || titles.cs,
    description: descriptions[locale] || descriptions.cs,
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
      title:
        locale === "en"
          ? "separé | craft beer, sparkling wine & board games"
          : "separé | řemeslné pivo, šumivá vína & deskovky",
      description:
        locale === "en"
          ? "A small family bar on Mikulandská in Prague 1. Honest drinks, pub quizzes and an atmosphere that makes you forget the hustle of Národní třída."
          : "Malý rodinný bar na Mikulandské v Praze 1. Poctivé pití, hospodské kvízy a atmosféra, ve které se snadno zapomene na ruch Národní třídy.",
      locale: locale === "en" ? "en_US" : "cs_CZ",
      type: "website",
      url: "https://separe.cz",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <a href="#main" className="skip-link">
          {locale === "en" ? "Skip to content" : "Přeskočit na obsah"}
        </a>
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <NavProvider>{children}</NavProvider>
          </LenisProvider>
        </NextIntlClientProvider>
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
