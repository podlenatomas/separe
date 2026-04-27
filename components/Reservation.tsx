import { getLocale, getTranslations } from "next-intl/server";

const BOOKING_URL = "https://separe.choiceqr.com/booking";

export default async function Reservation() {
  const t = await getTranslations("Reservation");
  const locale = await getLocale();
  const embedSrc = `https://embed.choiceqr.com/booking/separe?lang=${locale === "en" ? "en" : "cz"}`;

  return (
    <section
      id="rezervace"
      className="border-b border-border scroll-mt-24"
      aria-labelledby="h-rezervace"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-14">
          {/* Text column */}
          <div className="text-center md:text-right max-w-md md:max-w-sm mx-auto md:mx-0 md:flex-1">
            <p className="text-[10px] font-light uppercase tracking-[0.18em] text-muted mb-3">
              {t("eyebrow")}
            </p>
            <h2
              id="h-rezervace"
              className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-5 text-balance"
            >
              {t("title")}
            </h2>
            <p className="text-muted font-light leading-[1.8] text-pretty mb-6">
              {t("description")}
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] font-light uppercase tracking-[0.18em] text-muted hover:text-foreground border-b border-border hover:border-foreground pb-1 transition-colors"
            >
              {t("fallbackLink")}
              <svg
                width="11"
                height="11"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  d="M6 3h7v7M13 3L4 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Iframe — minimal frame, blend into cream page background */}
          <div className="mx-auto md:mx-0 shrink-0 rounded-sm border border-border/60 p-[2px] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]">
            <iframe
              src={embedSrc}
              title={t("iframeTitle")}
              loading="lazy"
              className="block w-[360px] max-w-[calc(100vw-3rem)] h-[605px] rounded-[2px] border-0"
              style={{
                mixBlendMode: "darken",
                filter: "contrast(1.05)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
