import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import Script from "next/script";
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
    cs: "separé | řemeslné pivo, naturální vína, pet-nat & deskovky | Praha 1",
    en: "separé | craft beer, natural wine, pet-nat & board games | Prague 1",
  };

  const descriptions: Record<string, string> = {
    cs: "Rodinný craft bar v srdci Prahy 1. Specializace na autentická česká a moravská vína, pet-nat, naturální vína a řemeslná piva. Deskovky a radost na Mikulandské.",
    en: "A family craft bar in the heart of Prague 1. Specializing in authentic Czech and Moravian wines, pet-nat, natural wines, and craft beer. Board games and joy on Mikulandská.",
  };

  return {
    metadataBase: new URL("https://separe.cz"),
    title: {
      template: "%s | Separé",
      default: titles[locale] || titles.cs,
    },
    description: descriptions[locale] || descriptions.cs,
    keywords: [
      "rodinný bar Praha 1",
      "řemeslné pivo",
      "naturální vína",
      "autentická česká a moravská vína",
      "pet-nat",
      "deskovky",
      "hospodský kvíz",
      "separé",
      "Mikulandská 133/3",
    ],
    openGraph: {
      title: titles[locale] || titles.cs,
      description: descriptions[locale] || descriptions.cs,
      locale: locale === "en" ? "en_US" : "cs_CZ",
      type: "website",
      siteName: "Separé",
      images: [
        {
          url: "/images/exterior.jpg",
          width: 1200,
          height: 630,
          alt: "Interiér a bar Separé na Mikulandské",
        },
      ],
      url: "https://separe.cz",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.cs,
      description: descriptions[locale] || descriptions.cs,
      images: ["/images/exterior.jpg"],
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
        <Script
          id="local-business-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BarOrPub",
              name: "Separé",
              image: "https://separe.cz/images/exterior.jpg",
              url: "https://separe.cz",
              telephone: "+420722339488",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Mikulandská 133/3",
                addressLocality: "Nové Město, Praha 1",
                postalCode: "110 00",
                addressCountry: "CZ",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 50.0809593,
                longitude: 14.4181983,
              },
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
                  ],
                  opens: "17:00",
                  closes: "24:00",
                },
              ],
              servesCuisine: [
                "Craft Beer",
                "Natural Wine",
                "Bar Snacks",
                "Pet-nat",
              ],
              priceRange: "$$",
            }),
          }}
        />
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
