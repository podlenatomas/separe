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
            <motion.div
                className="absolute inset-0 z-0"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            >
                <Image
                    src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2000"
                    alt="Atmosféra baru separé — teplé světlo, víno, večerní nálada"
                    fill
                    priority
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

            <div className="relative z-[2] w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
                <motion.p
                    className="text-[10px] font-light uppercase tracking-[0.18em] text-[#F5F5F0]/70 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Mikulandská 133/3 · Praha 1
                </motion.p>

                <motion.h1
                    className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-black tracking-tighter leading-[0.98] text-[#F5F5F0] max-w-2xl mb-6 text-balance"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                >
                    Řemeslné pivo,{" "}<br className="hidden md:block" /><span className="font-[family-name:var(--font-serif)] italic font-medium text-[#F5F5F0]/90">šumivá vína</span>{" "}<br className="hidden md:block" />a&nbsp;klid uprostřed města
                </motion.h1>

                <motion.p
                    className="text-base md:text-lg font-light text-[#F5F5F0]/85 max-w-lg mb-8 leading-relaxed text-pretty"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    Separé je malý rodinný bar na Mikulandské. Místo s&nbsp;nezaměnitelným
                    geniem loci, kam se chodí za poctivým pitím, hospodskými kvízy
                    a&nbsp;atmosférou, ve&nbsp;které se snadno zapomene na to, že jste jen pár
                    kroků od rušné Národní třídy.
                </motion.p>

                <motion.button
                    onClick={kontakt.trigger}
                    className="inline-flex items-center justify-center h-[52px] px-10 bg-[#F5F5F0] text-[#1A1A1A] text-[10px] font-light uppercase tracking-[0.14em] rounded-sm hover:bg-[#E8E8E2] active:scale-[0.98] transition-all duration-200 cursor-pointer border-none"
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
