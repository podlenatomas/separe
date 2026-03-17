"use client";

import { motion } from "framer-motion";
import { Beer, Wine, GlassWater, Dice5 } from "lucide-react";
import { useNav } from "@/providers/NavProvider";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

/* ─── Static icon map ─── */
const VALUE_ICONS: Record<string, ReactNode> = {
  beer: <Beer size={26} strokeWidth={1.3} />,
  wine: <Wine size={26} strokeWidth={1.3} />,
  quality: <GlassWater size={26} strokeWidth={1.3} />,
  games: <Dice5 size={26} strokeWidth={1.3} />,
};

const VALUE_KEYS = ["beer", "wine", "quality", "games"] as const;

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

/* ─── Menu category/item types ─── */
interface MenuItem {
  name: string;
  desc: string;
  price: string;
}
interface MenuCategory {
  name: string;
  items: MenuItem[];
}

/* ─── Component ─── */

export default function BentoGrid() {
  const { oNas, nabidka } = useNav();
  const tAbout = useTranslations("About");
  const tMenu = useTranslations("Menu");

  const categories = tMenu.raw("categories") as MenuCategory[];

  return (
    <>
      {/* ═══ O NÁS ═══ */}
      <section
        // eslint-disable-next-line react-hooks/refs
        ref={oNas.registerNode}
        className="border-b border-border"
        aria-labelledby="h-about"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
          <motion.p
            className="text-[10px] font-light uppercase tracking-[0.18em] text-muted mb-2"
            {...fade}
          >
            {tAbout("eyebrow")}
          </motion.p>
          <motion.h2
            className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-5 text-balance"
            id="h-about"
            {...fade}
          >
            {tAbout("title")}
          </motion.h2>
          <motion.p
            className="text-muted font-light leading-[1.8] max-w-2xl mb-12 text-pretty"
            {...fade}
          >
            {tAbout("description")}
          </motion.p>

          {/* 4-col Bento — horizontal snap on mobile, grid on desktop */}
          <div className="relative bg-neutral-200 rounded-sm overflow-hidden flex overflow-x-auto snap-x snap-mandatory hide-scrollbar [mask-image:linear-gradient(to_right,black_85%,transparent_100%)] md:[mask-image:none] md:grid md:grid-cols-4 gap-px">
            {VALUE_KEYS.map((key, i) => (
              <motion.div
                key={key}
                className="relative p-8 md:p-10 bg-background snap-center w-[85vw] sm:w-[70vw] md:w-auto min-w-[85vw] sm:min-w-[70vw] md:min-w-0"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                {i < VALUE_KEYS.length - 1 && (
                  <span className="hidden md:block absolute -bottom-2 -right-2 text-neutral-400/60 font-light text-xs pointer-events-none select-none z-10">
                    +
                  </span>
                )}
                <div className="text-foreground/70 mb-4">
                  {VALUE_ICONS[key]}
                </div>
                <h3 className="text-sm font-black tracking-tight mb-2 text-balance">
                  {tAbout(`values.${key}.title`)}
                </h3>
                <p className="text-xs font-light text-muted leading-relaxed text-pretty">
                  {tAbout(`values.${key}.text`)}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="md:hidden text-center text-[10px] uppercase tracking-widest text-neutral-400 my-4 flex items-center justify-center gap-2">
            <span className="animate-pulse">←</span> {tAbout("swipeHint")}{" "}
            <span className="animate-pulse">→</span>
          </div>
        </div>
      </section>

      {/* ═══ NABÍDKA ═══ */}
      <section
        // eslint-disable-next-line react-hooks/refs
        ref={nabidka.registerNode}
        className="border-b border-border"
        aria-labelledby="h-menu"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 text-left">
          <motion.p
            className="text-[10px] font-light uppercase tracking-[0.18em] text-muted mb-2"
            {...fade}
          >
            {tMenu("eyebrow")}
          </motion.p>
          <motion.h2
            className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-3 text-balance"
            id="h-menu"
            {...fade}
          >
            {tMenu("title")}
          </motion.h2>
          <motion.p
            className="text-left text-neutral-600 max-w-2xl mb-12 text-pretty"
            {...fade}
          >
            {tMenu("description")}
          </motion.p>

          {/* Menu — Universal Accordion list */}
          <div className="relative border-b border-border">
            <div className="absolute inset-x-0 top-0 h-px bg-border" />
            {categories.map((cat, ci) => (
              <motion.details
                key={cat.name}
                className="menu-accordion group relative py-6 md:py-8 border-b border-border [&_summary::-webkit-details-marker]:hidden"
                open={ci === 0}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: ci * 0.08 }}
              >
                <summary className="flex justify-between items-center cursor-pointer list-none text-2xl md:text-5xl font-black tracking-tighter hover:text-neutral-500 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-8 rounded-sm">
                  {cat.name}
                  <span className="text-4xl md:text-6xl font-normal leading-none pointer-events-none w-10 text-right">
                    <span className="hidden group-open:inline-block">-</span>
                    <span className="inline-block group-open:hidden">+</span>
                  </span>
                </summary>
                <div className="mt-8 md:mt-12 transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className={`flex justify-between items-baseline gap-4 py-3 border-b border-neutral-200/50 hover:opacity-50 transition-opacity duration-300 cursor-default`}
                      >
                        <div>
                          <div className="text-base font-medium">
                            {item.name}
                          </div>
                          {item.desc && (
                            <div className="text-[13px] font-light text-muted mt-1">
                              {item.desc}
                            </div>
                          )}
                        </div>
                        <span className="font-semibold whitespace-nowrap tabular-nums text-sm md:text-base">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.details>
            ))}
          </div>

          <motion.p
            className="text-[11px] font-light text-muted mt-6 italic"
            {...fade}
          >
            {tMenu("disclaimer")}
          </motion.p>
        </div>
      </section>
    </>
  );
}
