"use client";

import { motion } from "framer-motion";
import { Calendar, Dice5, Wine } from "lucide-react";
import { useNav } from "@/providers/NavProvider";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

const EVENT_ICONS: Record<string, ReactNode> = {
    quiz: <Calendar size={22} strokeWidth={1.3} />,
    games: <Dice5 size={22} strokeWidth={1.3} />,
    tasting: <Wine size={22} strokeWidth={1.3} />,
};

const EVENT_KEYS = ["quiz", "games", "tasting"] as const;

const fade = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55, ease: "easeOut" as const },
};

export default function EventsTable() {
    const { akce } = useNav();
    const t = useTranslations("Events");

    return (
        <section
            // eslint-disable-next-line react-hooks/refs
            ref={akce.registerNode}
            className="bg-[#1A1A1A] text-[#F5F5F0] border-b border-white/10"
            aria-labelledby="h-events"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
                <motion.p
                    className="text-[10px] font-light uppercase tracking-[0.18em] text-[#F5F5F0]/50 mb-2"
                    {...fade}
                >
                    {t("eyebrow")}
                </motion.p>
                <motion.h2
                    className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-3 text-balance"
                    id="h-events"
                    {...fade}
                >
                    {t("title")}
                </motion.h2>
                <motion.p className="text-[#F5F5F0]/60 font-light leading-[1.8] max-w-xl mb-12 text-pretty" {...fade}>
                    {t("description")}
                </motion.p>

                {/* 3-col event blocks — horizontal snap on mobile, grid on desktop */}
                <div className="bg-white/10 rounded-sm overflow-hidden flex overflow-x-auto snap-x snap-mandatory hide-scrollbar [mask-image:linear-gradient(to_right,black_85%,transparent_100%)] md:[mask-image:none] md:grid md:grid-cols-3 gap-px">
                    {EVENT_KEYS.map((key, i) => (
                        <motion.div
                            key={key}
                            className="p-8 md:p-10 bg-[#1A1A1A] snap-center w-[85vw] sm:w-[70vw] md:w-auto min-w-[85vw] sm:min-w-[70vw] md:min-w-0"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.45, delay: i * 0.1 }}
                        >
                            <div className="text-[#F5F5F0]/50 mb-4">{EVENT_ICONS[key]}</div>
                            <h3 className="text-xs md:text-sm font-black tracking-tight text-[#F5F5F0] mb-1 text-balance">{t(`blocks.${key}.title`)}</h3>
                            <p className="text-[9px] md:text-[10px] font-light uppercase tracking-[0.1em] text-[#F5F5F0]/40 mb-4">
                                {t(`blocks.${key}.schedule`)}
                            </p>
                            <p className="text-[11px] md:text-xs font-light text-[#F5F5F0]/60 leading-relaxed text-pretty">{t(`blocks.${key}.desc`)}</p>
                        </motion.div>
                    ))}
                </div>
                <div className="md:hidden text-center text-[10px] uppercase tracking-widest text-[#F5F5F0]/30 my-4 flex items-center justify-center gap-2"><span className="animate-pulse">←</span> {t("swipeHint")} <span className="animate-pulse">→</span></div>
            </div>
        </section>
    );
}
