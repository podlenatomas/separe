"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useNav } from "@/providers/NavProvider";

interface EventRow {
    day: string;
    month: string;
    title: string;
    meta: string;
    desc: string;
}

const events: EventRow[] = [
    {
        day: "12",
        month: "bře",
        title: "Pub Quiz: Všeobecný vědomostní kvíz",
        meta: "Středa · 19:00 – 21:30 · Vstup zdarma",
        desc: "Týmy po 2–5 hráčích. Pro vítěze lahev vína z naší nabídky.",
    },
    {
        day: "21",
        month: "bře",
        title: "Vernisáž: Tiché krajiny — Tereza Nová",
        meta: "Pátek · 18:00 – 21:00 · Vstup zdarma",
        desc: "Výstava velkoformátových fotografií z českého pohraničí. Úvodní slovo kurátorka Jana Plíšková.",
    },
    {
        day: "28",
        month: "bře",
        title: "Degustace: Přírodní vína z Moravy",
        meta: "Pátek · 17:00 – 20:00 · 350 Kč",
        desc: "Šest vzorků od tří moravských vinařů. Komentovaná degustace s občerstvením.",
    },
    {
        day: "05",
        month: "dub",
        title: "Herní večer: Strategické deskovky",
        meta: "Sobota · 18:00 – 22:00 · Vstup zdarma",
        desc: "Wingspan, Terraforming Mars a další taktické hry. Všechny hry zapůjčíme.",
    },
    {
        day: "12",
        month: "dub",
        title: "Workshop: Latte art pro začátečníky",
        meta: "Neděle · 10:00 – 12:00 · 450 Kč",
        desc: "Základy latte artu pod vedením našeho baristy. Max 8 účastníků.",
    },
    {
        day: "19",
        month: "dub",
        title: "Pub Quiz: Film & Seriály",
        meta: "Středa · 19:00 – 21:30 · Vstup zdarma",
        desc: "Tematický kvíz pro filmové fanoušky. Bonusové kolo: live soundtrack.",
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
        <section ref={akce.ref} className="border-b border-border" aria-labelledby="h-events">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="flex items-center gap-3 mb-2">
                    <Calendar size={14} strokeWidth={1.5} className="text-muted" />
                    <motion.p
                        className="text-[10px] font-light uppercase tracking-[0.18em] text-muted"
                        {...fade}
                    >
                        Akce
                    </motion.p>
                </div>
                <motion.h2
                    className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-12"
                    id="h-events"
                    {...fade}
                >
                    Co se u nás chystá
                </motion.h2>

                {/* Tabular grid — gap-px */}
                <div className="bg-neutral-200 rounded-sm overflow-hidden grid grid-cols-1 gap-px">
                    {events.map((e, i) => (
                        <motion.article
                            key={e.title}
                            className="bg-background px-6 py-5 md:px-10 md:py-6 grid grid-cols-[56px_1fr] md:grid-cols-[72px_200px_1fr] gap-x-5 gap-y-1 items-baseline"
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            {/* Date */}
                            <div className="text-center md:text-left">
                                <span className="text-2xl font-black leading-none">{e.day}</span>
                                <span className="text-[10px] font-light uppercase tracking-[0.1em] text-muted ml-1">
                                    {e.month}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-sm font-semibold col-span-1 md:col-span-1">{e.title}</h3>

                            {/* Desc — hidden on mobile, shown on md+ */}
                            <p className="hidden md:block text-xs font-light text-muted leading-relaxed">
                                {e.desc}
                            </p>

                            {/* Meta — span full row under */}
                            <p className="text-[10px] font-light text-muted tracking-wide col-span-2 md:col-span-3">
                                {e.meta}
                            </p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
