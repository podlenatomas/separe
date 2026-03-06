"use client";

import { motion } from "framer-motion";
import { Calendar, Dice5, Wine } from "lucide-react";
import { useNav } from "@/providers/NavProvider";
import type { ReactNode } from "react";

interface EventBlock {
    icon: ReactNode;
    title: string;
    schedule: string;
    desc: string;
}

const eventBlocks: EventBlock[] = [
    {
        icon: <Calendar size={22} strokeWidth={1.3} />,
        title: "Hospodské kvízy",
        schedule: "Každou středu od 19:00",
        desc: "Postavte tým, objednejte si na stůl pár lahví vína a ukažte, co víte. Naše kvízy jsou legendární a místa rychle mizí.",
    },
    {
        icon: <Dice5 size={22} strokeWidth={1.3} />,
        title: "Deskovky k dispozici kdykoliv",
        schedule: "Každý den v otevírací době",
        desc: "Přes 80 her od rychlých party kousků po náročnější strategie. Půjčení ke stolu je zdarma.",
    },
    {
        icon: <Wine size={22} strokeWidth={1.3} />,
        title: "Degustace a vernisáže",
        schedule: "Nepravidelně — sledujte náš program",
        desc: "Pravidelně u nás ožívá kultura. Přijďte ochutnávat i objevovat.",
    },
];

const fade = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55, ease: "easeOut" as const },
};

export default function EventsTable() {
    const { akce } = useNav();

    return (
        <section ref={akce.ref} className="bg-[#1A1A1A] text-[#F5F5F0] border-b border-white/10" aria-labelledby="h-events">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <motion.p
                    className="text-[10px] font-light uppercase tracking-[0.18em] text-[#F5F5F0]/50 mb-2"
                    {...fade}
                >
                    Akce
                </motion.p>
                <motion.h2
                    className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-3"
                    id="h-events"
                    {...fade}
                >
                    Středeční kvízy a&nbsp;večery plné her
                </motion.h2>
                <motion.p className="text-[#F5F5F0]/60 font-light leading-[1.8] max-w-xl mb-12" {...fade}>
                    Separé žije. Jsme ideální základna pro soutěživé povahy, milovníky dobrého pití
                    i&nbsp;stratégy.
                </motion.p>

                {/* 3-col event blocks — gap-px */}
                <div className="bg-white/10 rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-px">
                    {eventBlocks.map((block, i) => (
                        <motion.div
                            key={block.title}
                            className="p-8 md:p-10 bg-[#1A1A1A]"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.45, delay: i * 0.1 }}
                        >
                            <div className="text-[#F5F5F0]/50 mb-4">{block.icon}</div>
                            <h3 className="text-sm font-black tracking-tight text-[#F5F5F0] mb-1">{block.title}</h3>
                            <p className="text-[10px] font-light uppercase tracking-[0.1em] text-[#F5F5F0]/40 mb-4">
                                {block.schedule}
                            </p>
                            <p className="text-xs font-light text-[#F5F5F0]/60 leading-relaxed">{block.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
