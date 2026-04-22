import { getLocale } from "next-intl/server";

const BASE_URL = "https://www.separe-mikulandska.cz";

const address = {
  "@type": "PostalAddress",
  streetAddress: "Mikulandská 133/3",
  addressLocality: "Nové Město, Praha 1",
  postalCode: "110 00",
  addressCountry: "CZ",
  addressRegion: "Praha",
};

const geo = {
  "@type": "GeoCoordinates",
  latitude: 50.0809593,
  longitude: 14.4181983,
};

const location = {
  "@type": "Place",
  name: "Separé",
  address,
  geo,
  url: BASE_URL,
};

const organizer = {
  "@type": "Organization",
  name: "Separé",
  url: BASE_URL,
};

export default async function EventSchema() {
  const locale = await getLocale();

  const quizEvent = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${BASE_URL}#event-hospodsky-kviz`,
    name: locale === "en" ? "Pub Quiz at Separé" : "Hospodský kvíz v Separé",
    description:
      locale === "en"
        ? "Weekly pub quiz in Czech at Separé Mikulandská. Teams of 2–6 players, mixed general-knowledge questions (music, pop culture, history). Free to enter, reservations strongly recommended."
        : "Pravidelný hospodský kvíz v Separé Mikulandská. Týmy 2–6 hráčů, smíšené otázky (všeobecný přehled, hudba, popkultura, historie). Vstup zdarma, rezervace stolu doporučena.",
    image: `${BASE_URL}/images/exterior.jpg`,
    startDate: "2024-01-03T19:00:00+01:00",
    endDate: "2024-01-03T21:30:00+01:00",
    eventSchedule: {
      "@type": "Schedule",
      startDate: "2024-01-03",
      startTime: "19:00",
      endTime: "21:30",
      byDay: "https://schema.org/Wednesday",
      repeatFrequency: "P1W",
      scheduleTimezone: "Europe/Prague",
    },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    inLanguage: "cs",
    location,
    organizer,
    performer: organizer,
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CZK",
      availability: "https://schema.org/InStock",
      url: "https://www.hospodskykviz.cz/hospody/separe-nove-mesto",
      validFrom: "2024-01-01",
    },
    maximumAttendeeCapacity: 60,
    typicalAgeRange: "18-",
    audience: {
      "@type": "Audience",
      audienceType:
        locale === "en"
          ? "Adults, small teams (2–6)"
          : "Dospělí, týmy 2–6 hráčů",
    },
  };

  const gameNightEvent = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${BASE_URL}#event-deskovky`,
    name: locale === "en" ? "Board Game Night at Separé" : "Deskovky v Separé",
    description:
      locale === "en"
        ? "30+ board games free to borrow at the bar, available every opening day. From quick card games (20 min) to strategy sessions (2+ hours)."
        : "Přes 30 deskových her zdarma k zapůjčení u baru, každý otevírací den. Od rychlých karetních her (20 min) po strategie (2+ hod).",
    image: `${BASE_URL}/images/exterior.jpg`,
    startDate: "2024-01-02T17:00:00+01:00",
    endDate: "2024-01-02T24:00:00+01:00",
    eventSchedule: {
      "@type": "Schedule",
      startDate: "2024-01-02",
      startTime: "17:00",
      endTime: "24:00",
      byDay: [
        "https://schema.org/Monday",
        "https://schema.org/Tuesday",
        "https://schema.org/Wednesday",
        "https://schema.org/Thursday",
        "https://schema.org/Friday",
        "https://schema.org/Saturday",
      ],
      repeatFrequency: "P1W",
      scheduleTimezone: "Europe/Prague",
    },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    inLanguage: locale,
    location,
    organizer,
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CZK",
      availability: "https://schema.org/InStock",
      url: BASE_URL,
      validFrom: "2024-01-01",
    },
  };

  const events = [quizEvent, gameNightEvent];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(events) }}
    />
  );
}
