"use client";

import { useTranslations } from "next-intl";
import { Calendar, Phone, MapPin } from "lucide-react";
import { useCookieConsent } from "@/providers/CookieConsentProvider";

const DIRECTIONS_URL =
  "https://www.google.com/maps/place/Mikulandsk%C3%A1+133%2F3,+110+00+Praha+1";

export default function StickyMobileNav() {
  const t = useTranslations("StickyNav");
  const { bannerVisible } = useCookieConsent();

  const handleBook = () => {
    const el = document.getElementById("rezervace");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label={t("ariaLabel")}
      className={`md:hidden fixed inset-x-0 z-[90] transition-transform duration-300 ${
        bannerVisible ? "translate-y-full" : "translate-y-0"
      }`}
      style={{
        bottom: "env(safe-area-inset-bottom, 0)",
      }}
    >
      <div className="grid grid-cols-3 bg-foreground text-background border-t border-background/10">
        <button
          type="button"
          onClick={handleBook}
          className="flex flex-col items-center justify-center gap-1 h-16 min-h-[44px] px-2 active:bg-background/10 transition-colors focus-visible:outline-none focus-visible:bg-background/10 border-none cursor-pointer bg-transparent text-background"
        >
          <Calendar size={18} strokeWidth={1.5} aria-hidden="true" />
          <span className="text-[10px] font-light uppercase tracking-[0.12em]">
            {t("book")}
          </span>
        </button>
        <a
          href="tel:+420722339488"
          className="flex flex-col items-center justify-center gap-1 h-16 min-h-[44px] px-2 active:bg-background/10 transition-colors focus-visible:outline-none focus-visible:bg-background/10 border-l border-r border-background/10"
        >
          <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
          <span className="text-[10px] font-light uppercase tracking-[0.12em]">
            {t("call")}
          </span>
        </a>
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 h-16 min-h-[44px] px-2 active:bg-background/10 transition-colors focus-visible:outline-none focus-visible:bg-background/10"
        >
          <MapPin size={18} strokeWidth={1.5} aria-hidden="true" />
          <span className="text-[10px] font-light uppercase tracking-[0.12em]">
            {t("directions")}
          </span>
        </a>
      </div>
    </nav>
  );
}
