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
const MENU_KEYS = ["beer", "wine", "food"] as const;
const ITEM_KEYS: Record<string, readonly string[]> = {
    beer: ["lager", "specials", "bottles"],
    wine: ["glass", "petnat", "sparkling"],
    food: ["margherita", "prosciutto", "cheese"],
};

const fade = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55, ease: "easeOut" as const },
};

/* ─── Component ─── */

export default function BentoGrid() {
    const { oNas, nabidka } = useNav();
    const tAbout = useTranslations("About");
    const tMenu = useTranslations("Menu");

    return (
        <>
            {/* ═══ O NÁS ═══ */}
            <section ref={oNas.ref} className="border-b border-border" aria-labelledby="h-about">
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
                    <motion.p className="text-muted font-light leading-[1.8] max-w-2xl mb-12 text-pretty" {...fade}>
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
                                    <span className="hidden md:block absolute -bottom-2 -right-2 text-neutral-400/60 font-light text-xs pointer-events-none select-none z-10">+</span>
                                )}
                                <div className="text-foreground/70 mb-4">{VALUE_ICONS[key]}</div>
                                <h3 className="text-sm font-black tracking-tight mb-2 text-balance">{tAbout(`values.${key}.title`)}</h3>
                                <p className="text-xs font-light text-muted leading-relaxed text-pretty">{tAbout(`values.${key}.text`)}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="md:hidden text-center text-[10px] uppercase tracking-widest text-neutral-400 my-4 flex items-center justify-center gap-2"><span className="animate-pulse">←</span> {tAbout("swipeHint")} <span className="animate-pulse">→</span></div>
                </div>
            </section>

            {/* ═══ NABÍDKA ═══ */}
            <section ref={nabidka.ref} className="border-b border-border" aria-labelledby="h-menu">
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
                    <motion.p className="text-left text-neutral-600 max-w-2xl mb-12 text-pretty" {...fade}>
                        {tMenu("description")}
                    </motion.p>

                    {/* 3-col menu — gap-px technique */}
                    <div className="relative bg-neutral-200 rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-px">
                        {MENU_KEYS.map((catKey, ci) => (
                            <motion.details
                                key={catKey}
                                className="group relative p-8 md:p-10 bg-background md:open:block [&_summary::-webkit-details-marker]:hidden"
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.45, delay: ci * 0.1 }}
                            >
                                {ci < MENU_KEYS.length - 1 && (
                                    <span className="hidden md:block absolute -bottom-2 -right-2 text-neutral-400/60 font-light text-xs pointer-events-none select-none z-10">+</span>
                                )}
                                <summary className="md:pointer-events-none flex justify-between items-center cursor-pointer list-none text-[14px] md:text-[10px] font-black md:font-light uppercase tracking-[0.14em] py-4 md:py-0 md:mb-6 md:pb-3 border-b border-neutral-300">
                                    {tMenu(`categories.${catKey}.title`)}
                                    <span className="md:hidden text-2xl font-normal group-open:rotate-45 transition-transform duration-200 leading-none inline-block">+</span>
                                </summary>
                                <div className="mt-4 md:mt-0 transition-all duration-300">
                                    {ITEM_KEYS[catKey].map((itemKey, idx) => (
                                        <div
                                            key={itemKey}
                                            className={`flex justify-between items-baseline gap-4 py-3 -mx-3 px-3 rounded-sm transition-all duration-500 ease-out md:group-hover:opacity-30 md:hover:!opacity-100 cursor-default ${idx > 0 ? "border-t border-neutral-200" : ""
                                                }`}
                                        >
                                            <div>
                                                <div className="text-sm font-medium">{tMenu(`categories.${catKey}.items.${itemKey}.name`)}</div>
                                                <div className="text-[11px] font-light text-muted mt-0.5">{tMenu(`categories.${catKey}.items.${itemKey}.desc`)}</div>
                                            </div>
                                            <span className="font-semibold whitespace-nowrap tabular-nums text-sm">
                                                {tMenu(`categories.${catKey}.items.${itemKey}.price`)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.details>
                        ))}
                    </div>

                    <motion.p
                        className="text-[11px] font-light text-muted mt-6 italic"
                        {...fade}
                    >
                        {tMenu("footnote")}
                    </motion.p>
                </div>
            </section>
        </>
    );
}
