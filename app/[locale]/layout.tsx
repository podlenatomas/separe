import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import LenisProvider from "@/providers/LenisProvider";
import NavProvider from "@/providers/NavProvider";
import CookieConsentProvider from "@/providers/CookieConsentProvider";
import CookieConsent from "@/components/CookieConsent";
import StickyMobileNav from "@/components/StickyMobileNav";

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

const titles: Record<string, string> = {
  cs: "separé | řemeslné pivo, naturální vína, pet-nat & deskovky | Praha 1",
  en: "separé | craft beer, natural wine, pet-nat & board games | Prague 1",
};

const descriptions: Record<string, string> = {
  cs: "Rodinný craft bar v srdci Prahy 1. Specializace na autentická česká a moravská vína, pet-nat, naturální vína a řemeslná piva. Deskovky a radost na Mikulandské.",
  en: "A family craft bar in the heart of Prague 1. Specializing in authentic Czech and Moravian wines, pet-nat, natural wines, and craft beer. Board games and joy on Mikulandská.",
};

const SITE_ORIGIN = "https://www.separe-mikulandska.cz";
// Next.js metadata resolver strips the trailing slash from root URLs, so
// we use the origin-only form everywhere to keep canonical, hreflang,
// sitemap and JSON-LD `url` values byte-identical.
const CANONICAL_CS = SITE_ORIGIN;
const CANONICAL_EN = `${SITE_ORIGIN}/en`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const canonicalUrl = locale === "en" ? CANONICAL_EN : CANONICAL_CS;
  const ogImageAlt =
    locale === "en"
      ? "Interior and bar of Separé on Mikulandská"
      : "Interiér a bar Separé na Mikulandské";

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: {
      template: "%s | Separé",
      default: titles[locale] || titles.cs,
    },
    description: descriptions[locale] || descriptions.cs,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        cs: CANONICAL_CS,
        en: CANONICAL_EN,
        "x-default": CANONICAL_CS,
      },
    },
    openGraph: {
      title: titles[locale] || titles.cs,
      description: descriptions[locale] || descriptions.cs,
      locale: locale === "en" ? "en_US" : "cs_CZ",
      alternateLocale: locale === "en" ? ["cs_CZ"] : ["en_US"],
      type: "website",
      siteName: "Separé",
      images: [
        {
          url: "/images/exterior.jpg",
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
      url: canonicalUrl,
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

  type RawMenuItem = { name: string; desc: string; price: string };
  type RawMenuSubcat = { name: string; items: RawMenuItem[] };
  type RawMenuCat = { name: string; subcategories: RawMenuSubcat[] };

  const menuCategories =
    (messages as { Menu?: { categories?: RawMenuCat[] } })?.Menu?.categories ??
    [];

  const extractPrice = (priceStr: string): string | null => {
    if (!priceStr || priceStr.trim().startsWith("+")) return null;
    const match = priceStr.match(/(\d+)/);
    return match ? match[1] : null;
  };

  const menuSchema = {
    "@type": "Menu",
    name:
      locale === "en"
        ? "Separé, food & drinks menu"
        : "Separé, jídelní a nápojový lístek",
    inLanguage: locale,
    hasMenuSection: menuCategories.map((cat) => ({
      "@type": "MenuSection",
      name: cat.name,
      hasMenuSection: cat.subcategories.map((sub) => ({
        "@type": "MenuSection",
        name: sub.name,
        hasMenuItem: sub.items.map((item) => {
          const base: Record<string, unknown> = {
            "@type": "MenuItem",
            name: item.name,
          };
          if (item.desc) base.description = item.desc;
          const price = extractPrice(item.price);
          if (price) {
            base.offers = {
              "@type": "Offer",
              price,
              priceCurrency: "CZK",
            };
          }
          return base;
        }),
      })),
    })),
  };

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased pb-16 md:pb-0`}
      >
        <a href="#main" className="skip-link">
          {locale === "en" ? "Skip to content" : "Přeskočit na obsah"}
        </a>
        <NextIntlClientProvider messages={messages}>
          <CookieConsentProvider>
            <LenisProvider>
              <NavProvider>{children}</NavProvider>
            </LenisProvider>
            <CookieConsent />
            <StickyMobileNav />
          </CookieConsentProvider>
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BarOrPub",
              "@id": "https://www.wikidata.org/wiki/Q139498776",
              name: "Separé",
              alternateName: "Separé Mikulandská",
              description: descriptions[locale] || descriptions.cs,
              image: "https://www.separe-mikulandska.cz/images/exterior.jpg",
              url: "https://www.separe-mikulandska.cz",
              telephone: "+420722339488",
              email: "ahoj@separe.cz",
              priceRange: "$$",
              currenciesAccepted: "CZK",
              paymentAccepted: "Cash, Credit Card, Debit Card, Contactless",
              smokingAllowed: false,
              publicAccess: true,
              acceptsReservations: true,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Mikulandská 133/3",
                addressLocality: "Nové Město, Praha 1",
                postalCode: "110 00",
                addressCountry: "CZ",
                addressRegion: "Praha",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 50.0809593,
                longitude: 14.4181983,
              },
              hasMap:
                "https://www.google.com/maps/place/Mikulandsk%C3%A1+133%2F3,+110+00+Praha+1",
              areaServed: {
                "@type": "City",
                name: "Praha",
                sameAs: "https://www.wikidata.org/wiki/Q1085",
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
                "Pet-nat",
                "Czech",
                "Bar Snacks",
                "Pinsa Romana",
              ],
              knowsAbout: [
                "Natural wine",
                "Pét-nat",
                "Czech craft beer",
                "Moravian wine",
                "Board games",
                "Pub quiz",
                "Pinsa romana",
              ],
              keywords:
                "natural wine bar Prague, pet-nat Praha, řemeslné pivo Praha 1, deskové hry Praha, board game bar Prague, Mikulandská, hospodský kvíz, rodinný bar, Národní třída",
              amenityFeature: [
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Board games (30+ free to borrow)",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Private dining room with projector",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Pub quiz every Wednesday at 19:00",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Natural wine specialty",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Contactless payment",
                  value: true,
                },
              ],
              hasMenu: menuSchema,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": locale === "en" ? CANONICAL_EN : CANONICAL_CS,
              },
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: [
                  "#h-about",
                  "#h-contact",
                  "#h-rezervace",
                  "#h-events",
                  "#kontakt address",
                  "#faq summary",
                ],
              },
              potentialAction: {
                "@type": "ReserveAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://separe.choiceqr.com/booking",
                  inLanguage: ["cs", "en"],
                  actionPlatform: [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform",
                  ],
                },
                result: {
                  "@type": "Reservation",
                  name:
                    locale === "en"
                      ? "Table reservation at Separé"
                      : "Rezervace stolu v Separé",
                },
              },
              sameAs: [
                "https://www.instagram.com/separe_mikulandska/",
                "https://www.facebook.com/p/separ%C3%A9-61561465300633/",
                "https://www.wikidata.org/wiki/Q139498776",
                "https://www.openstreetmap.org/node/7809598187",
                "https://mapy.com/cs/?source=firm&id=13666169",
                "https://www.google.com/search?kgmid=/g/1tt1rdsl",
                "https://www.tripadvisor.com/Restaurant_Review-g274707-d28026745-Reviews-Separe-Prague_Bohemia.html",
                "https://www.firmy.cz/detail/13666169-separe-praha-nove-mesto.html",
              ],
            }),
          }}
        />
        {/* Global paper noise overlay, tactile 2026 texture */}
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
