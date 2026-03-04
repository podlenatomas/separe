"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollContext } from "@/providers/ScrollProvider";

export default function Hero() {
    const { refs, scrollTo } = useScrollContext();

    return (
        <section
            ref={refs.hero}
            className="relative min-h-svh flex items-end pt-[72px] overflow-hidden"
            aria-label="Úvod"
        >
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=1600&q=80"
                    alt="Útulný interiér kavárny s teplým osvětlením a cihlovou zdí"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
            </div>

            {/* Gradient overlay */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background:
                        "linear-gradient(to top, rgba(26,26,26,0.75) 0%, rgba(26,26,26,0.30) 40%, rgba(26,26,26,0.10) 100%)",
                }}
                aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-[2] w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
                <motion.p
                    className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F5F5F0]/85 mb-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Praha 1 · Vnitroblok UMPRUM
                </motion.p>

                <motion.h1
                    className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.25rem] font-bold leading-[1.05] text-[#F5F5F0] max-w-2xl mb-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                >
                    Nabízíme víno, pivo, kávu, deskovky, radost.
                </motion.h1>

                <motion.p
                    className="text-base md:text-lg text-[#F5F5F0]/90 max-w-md mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    Skrytá oáza ve vnitrobloku UMPRUM. Třetí prostor pro ty, kdo hledají
                    komunitu, klid a dobrou chuť — stranou od ruchu města.
                </motion.p>

                <motion.button
                    onClick={() => scrollTo("kontakt")}
                    className="inline-flex items-center justify-center h-[52px] px-10 bg-[#F5F5F0] text-[#1A1A1A] text-sm font-semibold uppercase tracking-[0.08em] rounded-sm hover:bg-[#E8E8E2] transition-colors duration-150 cursor-pointer border-none"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.65 }}
                >
                    Rezervovat stůl
                </motion.button>
            </div>
        </section>
    );
}
