"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useNav } from "@/providers/NavProvider";
import { useTranslations } from "next-intl";

export default function Hero() {
  const { hero, kontakt } = useNav();
  const t = useTranslations("Hero");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      // eslint-disable-next-line react-hooks/refs
      ref={hero.registerNode}
      className="relative min-h-[88svh] md:min-h-svh flex items-center md:items-end pt-[72px] overflow-hidden"
      aria-label="Úvod"
    >
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ scale: shouldReduceMotion ? 1 : [1, 1.08, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/exterior.jpg"
          alt="Atmosféra baru separé. Zvenku svítí neon"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(26,26,26,0.78) 0%, rgba(26,26,26,0.32) 40%, rgba(26,26,26,0.08) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-[2] w-full max-w-7xl mx-auto px-6 md:px-12 pb-8 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 md:mb-6 rounded-full border border-neutral-300/50 bg-[#F5F5F0]/10 backdrop-blur-md text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>{" "}
            {t("addressBadge")}
          </div>
        </motion.div>

        <motion.h1
          className="text-[2rem] md:text-[3.5rem] lg:text-[4.5rem] font-black tracking-tighter leading-[1] md:leading-[0.98] text-[#F5F5F0] max-w-2xl mb-4 md:mb-6 text-balance"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {t("titleCraft")} <br className="hidden md:block" />
          <span className="font-[family-name:var(--font-serif)] italic font-medium text-[#F5F5F0]/90">
            {t("titleWine")}
          </span>{" "}
          <br className="hidden md:block" />
          {t("titlePeaceA")} <br className="hidden md:block" />
          {t("titlePeaceB")}
        </motion.h1>

        <motion.p
          className="text-sm md:text-lg font-light text-[#F5F5F0]/85 max-w-lg mb-6 md:mb-8 leading-relaxed text-pretty"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className="flex justify-start w-full"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          <button
            onClick={() => {
              const el = document.getElementById("rezervace");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              } else {
                kontakt.trigger();
              }
            }}
            className="inline-flex items-center justify-center h-12 md:h-[52px] px-8 md:px-10 bg-[#F5F5F0] text-[#1A1A1A] text-[10px] font-light uppercase tracking-[0.14em] rounded-sm hover:bg-[#E8E8E2] active:scale-[0.98] transition-all duration-200 cursor-pointer border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F5F5F0]/80"
          >
            {t("cta")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
