"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Clock } from "lucide-react";
import { useNav } from "@/providers/NavProvider";
import { useTranslations } from "next-intl";

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

export default function Contact() {
  const { kontakt } = useNav();
  const t = useTranslations("Contact");

  return (
    <section
      // eslint-disable-next-line react-hooks/refs
      ref={kontakt.registerNode}
      className="border-b border-border"
      aria-labelledby="h-contact"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <motion.p
          className="text-[10px] font-light uppercase tracking-[0.18em] text-muted mb-2"
          {...fade}
        >
          {t("eyebrow")}
        </motion.p>
        <motion.h2
          className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-3 text-balance"
          id="h-contact"
          {...fade}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="text-muted font-light leading-[1.8] max-w-xl mb-12 text-pretty"
          {...fade}
        >
          {t("description")}
        </motion.p>

        <div className="bg-neutral-200 rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-px">
          {/* Left — info */}
          <motion.div className="p-8 md:p-10 lg:p-12 bg-background" {...fade}>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={13} strokeWidth={1.5} className="text-muted" />
                <h3 className="text-[10px] font-light uppercase tracking-[0.14em]">
                  {t("addressLabel")}
                </h3>
              </div>
              <address className="not-italic text-sm font-light text-muted leading-[1.8]">
                {t("addressLine1")}
                <br />
                {t("addressLine2")}
                <br />
                {t("addressLine3")}
              </address>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Mail size={13} strokeWidth={1.5} className="text-muted" />
                <h3 className="text-[10px] font-light uppercase tracking-[0.14em]">
                  {t("contactLabel")}
                </h3>
              </div>
              <p className="text-sm font-light text-muted leading-[1.8]">
                <a
                  href="mailto:ahoj@separe.cz"
                  className="underline underline-offset-[3px] decoration-neutral-300 hover:decoration-foreground transition-colors"
                >
                  ahoj@separe.cz
                </a>
                <br />
                <a
                  href="tel:+420722339488"
                  className="underline underline-offset-[3px] decoration-neutral-300 hover:decoration-foreground transition-colors"
                >
                  +420 722 339 488
                </a>
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={13} strokeWidth={1.5} className="text-muted" />
                <h3 className="text-[10px] font-light uppercase tracking-[0.14em]">
                  {t("hoursLabel")}
                </h3>
              </div>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-1 text-sm font-medium pr-8">
                      {t("hoursMoSa")}
                    </td>
                    <td className="py-1 text-sm font-light text-muted">
                      {t("hoursMoSaTime")}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 text-sm font-medium pr-8">
                      {t("hoursSu")}
                    </td>
                    <td className="py-1 text-sm font-light text-muted">
                      {t("hoursSuTime")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() =>
                window.open("mailto:ahoj@separe.cz?subject=Rezervace stolu")
              }
              className="inline-flex items-center justify-center h-12 px-8 bg-foreground text-background text-[10px] font-light uppercase tracking-[0.14em] rounded-sm hover:bg-foreground/85 active:scale-[0.98] transition-all duration-200 cursor-pointer border-none"
            >
              {t("ctaReserve")}
            </button>
          </motion.div>

          {/* Right — map */}
          <motion.div className="p-8 md:p-10 lg:p-12 bg-background" {...fade}>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={13} strokeWidth={1.5} className="text-muted" />
              <h3 className="text-[10px] font-light uppercase tracking-[0.14em]">
                {t("mapLabel")}
              </h3>
            </div>
            <p className="text-sm font-light text-muted leading-[1.8] mb-6 text-pretty">
              {t("mapDescription")}
            </p>
            <div className="w-full h-60 md:h-72 rounded-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBlCTROrJjIQ7Zjd9En89rNlyU2Al5HHrw&q=separ%C3%A9%20Mikulandsk%C3%A1%20133%2F3%2C%20110%2000%20Nov%C3%A9%20M%C4%9Bsto"
                title="Mapa. Separé, Mikulandská 133/3, Praha 1"
                className="w-full h-full grayscale contrast-75 opacity-80 mix-blend-multiply hover:grayscale-0 hover:contrast-100 hover:opacity-100 transition-all duration-500"
                style={{
                  filter: "grayscale(100%) contrast(0.75)",
                  opacity: 0.8,
                  mixBlendMode: "multiply",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
