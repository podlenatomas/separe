"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useNav } from "@/providers/NavProvider";

export default function Hero() {
    const { hero, kontakt } = useNav();

    return (
        <section
            ref={hero.ref}
            className="relative min-h-svh flex items-end pt-[72px] overflow-hidden"
            aria-label="Úvod"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=1600&q=80"
                    alt="Interiér kavárny separé na Mikulandské — teplé světlo, cihlová zeď, dřevěný bar"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
            </div>

            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background:
                        "linear-gradient(to top, rgba(26,26,26,0.78) 0%, rgba(26,26,26,0.32) 40%, rgba(26,26,26,0.08) 100%)",
                }}
                aria-hidden="true"
            />

            <div className="relative z-[2] w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
                <motion.p
                    className="text-[10px] font-light uppercase tracking-[0.18em] text-[#F5F5F0]/70 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Mikulandská 133 · Praha 1
                </motion.p>

                <motion.h1
                    className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-black tracking-tighter leading-[0.98] text-[#F5F5F0] max-w-2xl mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                >
                    Nabízíme víno, pivo, kávu, deskovky, radost.
                </motion.h1>

                <motion.p
                    className="text-base md:text-lg font-light text-[#F5F5F0]/85 max-w-md mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    Prémiová městská oáza v srdci Prahy. Třetí prostor pro ty, kdo hledají
                    komunitu, klid a dobrou chuť — stranou od ruchu města.
                </motion.p>

                <motion.button
                    onClick={kontakt.trigger}
                    className="inline-flex items-center justify-center h-[52px] px-10 bg-[#F5F5F0] text-[#1A1A1A] text-[10px] font-light uppercase tracking-[0.14em] rounded-sm hover:bg-[#E8E8E2] transition-colors duration-150 cursor-pointer border-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.65 }}
                >
                    Rezervovat stůl
                </motion.button>
            </div>
        </section>
    );
}
