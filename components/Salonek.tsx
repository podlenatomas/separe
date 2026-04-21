"use client";

import { motion } from "framer-motion";
import { Lock, Projector, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

export default function Salonek() {
  const t = useTranslations("Salonek");

  return (
    <section className="border-b border-border" aria-labelledby="h-salonek">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <motion.p
          className="text-[10px] font-light uppercase tracking-[0.18em] text-muted mb-2"
          {...fade}
        >
          {t("eyebrow")}
        </motion.p>
        <motion.h2
          className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-5 text-balance"
          id="h-salonek"
          aria-label={`${t("titleYour")} Separé. ${t("titleOur")}`}
          {...fade}
        >
          <span aria-hidden="true">
            {t("titleYour")}{" "}
            <span className="font-[family-name:var(--font-serif)] italic font-medium">
              separé
            </span>{" "}
            {t("titleOur")}
          </span>
        </motion.h2>
        <motion.p
          className="text-muted font-light leading-[1.8] max-w-2xl mb-10 text-pretty"
          {...fade}
        >
          {t("description")}
        </motion.p>

        {/* Tags */}
        <motion.div className="flex flex-wrap gap-4 mb-10" {...fade}>
          {[
            {
              icon: <Projector size={14} strokeWidth={1.5} />,
              labelKey: "tagProjector" as const,
            },
            {
              icon: <Lock size={14} strokeWidth={1.5} />,
              labelKey: "tagPrivacy" as const,
            },
            {
              icon: <Sparkles size={14} strokeWidth={1.5} />,
              labelKey: "tagCustom" as const,
            },
          ].map((tag) => (
            <span
              key={tag.labelKey}
              className="inline-flex items-center gap-1.5 text-[10px] font-light uppercase tracking-[0.14em] text-muted border border-neutral-300 rounded-sm px-3 py-1.5"
            >
              {tag.icon}
              {t(tag.labelKey)}
            </span>
          ))}
        </motion.div>

        <div className="mt-8 flex justify-center md:justify-start w-full">
          <motion.button
            onClick={() =>
              window.open(
                "mailto:ahoj@separe.cz?subject=Salonek, soukromá akce",
              )
            }
            className="inline-flex items-center justify-center h-12 px-8 bg-foreground text-background text-[10px] font-light uppercase tracking-[0.14em] rounded-sm hover:bg-foreground/85 active:scale-[0.98] transition-all duration-200 cursor-pointer border-none mx-auto md:mx-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground"
            {...fade}
          >
            {t("cta")}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
