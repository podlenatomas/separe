"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useNav } from "@/providers/NavProvider";
import { useTranslations } from "next-intl";

const fade = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55, ease: "easeOut" as const },
};

export default function Story() {
    const { pribeh } = useNav();
    const t = useTranslations("Story");

    return (
        <section ref={pribeh.ref} className="relative border-b border-border overflow-hidden" aria-labelledby="h-story">
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
                {/* Anti-grid watermark — typographic bleed */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5] flex items-center justify-center">
                    <span className="text-[15rem] md:text-[25rem] font-black tracking-tighter text-neutral-900 select-none opacity-[0.04]">
                        1891
                    </span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                    <BookOpen size={14} strokeWidth={1.5} className="text-muted" />
                    <motion.p
                        className="text-[10px] font-light uppercase tracking-[0.18em] text-muted"
                        {...fade}
                    >
                        {t("eyebrow")}
                    </motion.p>
                </div>
                <motion.h2
                    className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-12 text-balance"
                    id="h-story"
                    {...fade}
                >
                    {t("title")}
                </motion.h2>

                <div className="relative bg-neutral-200 rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-px">
                    <motion.div className="p-8 md:p-10 lg:p-12 bg-background" {...fade}>
                        <p className="text-muted font-light leading-[1.85] mb-6 text-pretty">
                            {t("p1")}
                        </p>
                        <p className="text-muted font-light leading-[1.85] text-pretty">
                            {t("p2")}
                        </p>
                    </motion.div>

                    <motion.div className="p-8 md:p-10 lg:p-12 bg-background" {...fade}>
                        <p className="text-muted font-light leading-[1.85] mb-6 text-pretty">
                            {t("p3a")}
                            <span className="font-medium text-foreground italic">
                                {t("p3quote")}
                            </span>
                        </p>
                        <p className="text-muted font-light leading-[1.85] text-pretty">
                            {t("p4a")}
                            <span className="font-medium text-foreground">
                                {t("p4highlight")}
                            </span>
                        </p>
                    </motion.div>
                </div>

                <motion.p
                    className="text-sm font-light text-muted mt-8 max-w-xl leading-relaxed italic"
                    {...fade}
                >
                    {t("epilogue")}
                </motion.p>
            </div>
        </section>
    );
}
