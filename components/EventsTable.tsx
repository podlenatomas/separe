"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useScrollContext } from "@/providers/ScrollProvider";

interface EventItem {
    day: string;
    month: string;
    title: string;
    meta: string;
    desc: string;
}

const eventsLeft: EventItem[] = [
    {
        day: "12",
        month: "bře 2026",
        title: "Herní večer: Strategické deskovky",
        meta: "Čtvrtek · 18:00 – 22:00 · Vstup zdarma",
        desc: "Připravte se na Wingspan, Terraforming Mars a další eurogames. Hry máme, stačí přijít.",
    },
    {
        day: "21",
        month: "bře 2026",
        title: "Degustace: Přírodní vína z Moravy",
        meta: "Sobota · 17:00 – 20:00 · 350 Kč",
        desc: "Šest vzorků od tří moravských vinařů. Komentovaná degustace s občerstvením.",
    },
    {
        day: "28",
        month: "bře 2026",
        title: "Komunitní swap knih",
        meta: "Sobota · 14:00 – 18:00 · Vstup zdarma",
        desc: "Přineste knihy, které jste přečetli, a odneste si něco nového. Káva ke swapu za zvýhodněnou cenu.",
    },
];

const eventsRight: EventItem[] = [
    {
        day: "05",
        month: "dub 2026",
        title: "Workshop: Latte art pro začátečníky",
        meta: "Neděle · 10:00 – 12:00 · 450 Kč",
        desc: "Naučte se základy latte artu pod vedením našeho baristy. Max 8 účastníků.",
    },
    {
        day: "12",
        month: "dub 2026",
        title: "Kvízový večer",
        meta: "Sobota · 19:00 – 21:30 · Vstup zdarma",
        desc: "Všeobecný vědomostní kvíz v týmech po 2–5 hráčích. Pro vítěze lahev vína z naší nabídky.",
    },
    {
        day: "19",
        month: "dub 2026",
        title: "Živá hudba: Akustický večer",
        meta: "Sobota · 20:00 – 22:00 · Vstup zdarma",
        desc: "Intimní akustický koncert v podání lokálních muzikantů. Kapacita omezena na 40 míst.",
    },
];

function EventCard({ event, index }: { event: EventItem; index: number }) {
    return (
        <motion.article
            className={`flex gap-5 items-start ${index > 0 ? "mt-6 pt-6 border-t border-border" : ""
                }`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
        >
            <div className="min-w-[56px] text-center flex-shrink-0">
                <div className="text-3xl font-bold leading-none">{event.day}</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-muted mt-1">
                    {event.month}
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-bold mb-1">{event.title}</h3>
                <p className="text-xs text-muted">{event.meta}</p>
                <p className="text-sm text-muted mt-2 leading-relaxed">{event.desc}</p>
            </div>
        </motion.article>
    );
}

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.6, ease: "easeOut" },
};

export default function EventsTable() {
    const { refs } = useScrollContext();

    return (
        <section
            ref={refs.akce}
            className="border-b border-border"
            aria-labelledby="events-heading"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="flex items-center gap-3 mb-2">
                    <Calendar size={16} strokeWidth={2} className="text-muted" />
                    <motion.p
                        className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"
                        {...fadeUp}
                    >
                        Akce
                    </motion.p>
                </div>
                <motion.h2
                    className="text-3xl md:text-[2.75rem] font-bold leading-tight mb-12"
                    id="events-heading"
                    {...fadeUp}
                >
                    Co se u nás chystá
                </motion.h2>

                {/* Events — 1px-gap architectural grid */}
                <div className="bg-border rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-px">
                    <div className="p-8 md:p-10 lg:p-12 bg-background">
                        {eventsLeft.map((event, i) => (
                            <EventCard key={event.title} event={event} index={i} />
                        ))}
                    </div>
                    <div className="p-8 md:p-10 lg:p-12 bg-background">
                        {eventsRight.map((event, i) => (
                            <EventCard key={event.title} event={event} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
