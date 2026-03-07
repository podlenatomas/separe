"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const fade = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55, ease: "easeOut" as const },
};

interface Review {
    name: string;
    text: string;
    date: string;
}

const reviews: Review[] = [
    {
        name: "Martin K.",
        text: "Úžasné místo s\u00A0neopakovatelnou atmosférou. Řemeslná piva jsou skvělá, personál přátelský a\u00A0ta zahrada ve dvoře — parádní únik z\u00A0centra. Chodíme sem pravidelně na kvízy.",
        date: "před 2\u00A0týdny",
    },
    {
        name: "Tereza M.",
        text: "Konečně bar, kde se dá normálně posedět bez hluku a\u00A0fronty. Vynikající výběr vín, pet-naty fantastické. Salonek jsme využili na narozeniny a\u00A0bylo to přesně, jak jsme chtěli.",
        date: "před měsícem",
    },
    {
        name: "Jakub P.",
        text: "Nejlepší zašívárna v\u00A0Praze. Přijdeš na jedno pivo, odejdeš po třech hodinách s\u00A0novou oblíbenou deskovkou. Obsluha je milá a\u00A0ví, co doporučit. Vrátím se.",
        date: "před 3\u00A0týdny",
    },
];

function Stars() {
    return (
        <div className="flex gap-0.5 mb-3">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={12}
                    strokeWidth={0}
                    fill="currentColor"
                    className="text-amber-500"
                />
            ))}
        </div>
    );
}

export default function Reviews() {
    return (
        <section className="border-b border-border" aria-labelledby="h-reviews">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
                <motion.p
                    className="text-[10px] font-light uppercase tracking-[0.18em] text-muted mb-2"
                    {...fade}
                >
                    Recenze
                </motion.p>
                <motion.h2
                    className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-5 text-balance"
                    id="h-reviews"
                    {...fade}
                >
                    Co se šušká v&nbsp;Mikulandské.
                </motion.h2>
                <motion.p
                    className="text-muted font-light leading-[1.8] max-w-2xl mb-12 text-pretty"
                    {...fade}
                >
                    Separé stojí na&nbsp;jednoduchých věcech — dobré pití, příjemná
                    atmosféra a&nbsp;lidi, kteří se rádi vrací. Tohle o&nbsp;nás píšete
                    vy. Dělá nám to radost.
                </motion.p>

                {/* Review cards — 3-col gap-px grid */}
                <div className="bg-neutral-200 rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-px">
                    {reviews.map((r, i) => (
                        <motion.blockquote
                            key={r.name}
                            className="p-8 md:p-10 bg-background flex flex-col"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.45, delay: i * 0.1 }}
                        >
                            <Stars />
                            <p className="text-sm font-light text-muted leading-[1.8] mb-6 flex-1 text-pretty">
                                &ldquo;{r.text}&rdquo;
                            </p>
                            <footer className="flex items-baseline justify-between">
                                <cite className="not-italic text-xs font-medium">
                                    {r.name}
                                </cite>
                                <span className="text-[10px] font-light text-muted">
                                    {r.date}
                                </span>
                            </footer>
                        </motion.blockquote>
                    ))}
                </div>

                <motion.p
                    className="text-muted font-light leading-[1.8] max-w-xl mt-8 text-pretty"
                    {...fade}
                >
                    Zastavil ses u&nbsp;nás a&nbsp;bavilo tě to? Budeme rádi za&nbsp;recenzi
                    — pomáhá nám to růst.
                </motion.p>
                <motion.a
                    href="https://g.page/r/separe-praha/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-12 px-8 mt-6 text-foreground text-[10px] font-light uppercase tracking-[0.14em] rounded-sm border border-foreground hover:bg-foreground hover:text-background active:scale-[0.98] transition-all duration-200 cursor-pointer"
                    {...fade}
                >
                    Nechat recenzi na Googlu
                </motion.a>
            </div>
        </section>
    );
}
