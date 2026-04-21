"use client";

import { useTranslations } from "next-intl";
import { useCookieConsent } from "@/providers/CookieConsentProvider";

export default function CookieConsent() {
  const t = useTranslations("CookieConsent");
  const { accept, reject, bannerVisible } = useCookieConsent();

  if (!bannerVisible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-body"
      className="fixed inset-x-0 bottom-0 z-[120] p-4 sm:p-6 pb-[calc(env(safe-area-inset-bottom)+1rem)]"
    >
      <div className="max-w-xl mx-auto bg-background border border-border rounded-sm shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] p-5 sm:p-6">
        <h2
          id="cookie-title"
          className="text-sm font-medium tracking-tight mb-2"
        >
          {t("title")}
        </h2>
        <p
          id="cookie-body"
          className="text-sm font-light text-muted leading-[1.7] mb-4 text-pretty"
        >
          {t("body")}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={accept}
            className="flex-1 h-11 px-4 bg-foreground text-background text-[11px] font-light uppercase tracking-[0.14em] rounded-sm hover:bg-foreground/85 active:scale-[0.98] transition-all duration-200 cursor-pointer border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          >
            {t("accept")}
          </button>
          <button
            type="button"
            onClick={reject}
            className="flex-1 h-11 px-4 bg-transparent text-foreground text-[11px] font-light uppercase tracking-[0.14em] rounded-sm border border-foreground hover:bg-foreground/5 active:scale-[0.98] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          >
            {t("reject")}
          </button>
        </div>
      </div>
    </div>
  );
}
