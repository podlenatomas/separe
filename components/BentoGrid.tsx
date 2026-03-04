"use client";

import { motion } from "framer-motion";
import { Coffee, Wine, Pizza, Dice5 } from "lucide-react";
import { useNav } from "@/providers/NavProvider";
import type { ReactNode } from "react";

/* ─── Data ─── */

interface ValueCard {
    icon: ReactNode;
    title: string;
    text: string;
}

const values: ValueCard[] = [
    {
        icon: <Coffee size={26} strokeWidth={1.3} />,
        title: "Výběrová káva",
        text: "Spolupracujeme s českými mikropražírnami. Espresso i filtr — vždy čerstvě namletý, vždy single origin.",
    },
    {
        icon: <Wine size={26} strokeWidth={1.3} />,
        title: "Přírodní víno",
        text: "Malí vinaři z Moravy i zahraničí. Rotující nabídka, vždy něco nového k ochutnání.",
    },
    {
        icon: <Pizza size={26} strokeWidth={1.3} />,
        title: "Pinsa Romana",
        text: "Lehké těsto z trojité fermentace. Sezónní ingredience, italská technika, pražský twist.",
    },
    {
        icon: <Dice5 size={26} strokeWidth={1.3} />,
        title: "Hra & Sdílení",
        text: "Přes 80 deskovek k zapůjčení zdarma. Pravidelné herní večery a komunitní akce.",
    },
];

interface MenuItem {
    name: string;
    desc: string;
    price: string;
}

interface MenuCat {
    title: string;
    items: MenuItem[];
}

const menu: MenuCat[] = [
    {
        title: "Káva",
        items: [
            { name: "Espresso", desc: "Single shot, Ethiopie Sidamo", price: "55 Kč" },
            { name: "Cappuccino", desc: "Dvojitý espresso, pěněné mléko", price: "75 Kč" },
            { name: "Flat White", desc: "Dvojitý ristretto, hedvábná pěna", price: "85 Kč" },
            { name: "Filtrovaná káva", desc: "V60 pour-over, denní výběr", price: "70 Kč" },
            { name: "Matcha Latte", desc: "Ceremonial grade, ovesné mléko", price: "90 Kč" },
        ],
    },
    {
        title: "Víno",
        items: [
            { name: "Müller Thurgau", desc: "Vinařství Špalek, Morava", price: "65 Kč" },
            { name: "Veltlínské zelené", desc: "Nestarec, pet-nat", price: "85 Kč" },
            { name: "Frankovka rosé", desc: "Vinařství Krásná hora", price: "75 Kč" },
            { name: "Svatovavřinecké", desc: "Milan Nestarec, natural", price: "80 Kč" },
            { name: "Oranžové víno", desc: "Vinařství Dobšice, macerované", price: "95 Kč" },
        ],
    },
    {
        title: "Pinsa & Kuchyně",
        items: [
            { name: "Margherita", desc: "San Marzano, fior di latte, bazalka", price: "165 Kč" },
            { name: "Prosciutto e rucola", desc: "Parmská šunka, rukola, parmezán", price: "195 Kč" },
            { name: "Verdura", desc: "Grilovaná zelenina, ricotta, pesto", price: "175 Kč" },
            { name: "Hummus s pita", desc: "Cizrna, tahini, grilovaná pita", price: "105 Kč" },
            { name: "Sýrový talíř", desc: "Výběr 3 českých sýrů, med, ořechy", price: "185 Kč" },
        ],
    },
];

const fade = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55, ease: "easeOut" as const },
};

/* ─── Component ─── */

export default function BentoGrid() {
    const { oNas, nabidka } = useNav();

    return (
        <>
            {/* ═══ O NÁS ═══ */}
            <section ref={oNas.ref} className="border-b border-border" aria-labelledby="h-about">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                    <motion.p
                        className="text-[10px] font-light uppercase tracking-[0.18em] text-muted mb-2"
                        {...fade}
                    >
                        O nás
                    </motion.p>
                    <motion.h2
                        className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-5"
                        id="h-about"
                        {...fade}
                    >
                        Místo, kde se potkává káva, víno a hry.
                    </motion.h2>
                    <motion.p className="text-muted font-light leading-[1.8] max-w-2xl mb-12" {...fade}>
                        Separé vzniklo jako odpověď na otázku, kde se v centru Prahy dá opravdu zpomalit.
                        Na Mikulandské 133 jsme vybudovali prostor, který funguje jako obývák pro celou
                        čtvrť — ráno voní čerstvě praženou kávou, večer se tu otevírá přírodní víno a na
                        stolech se rozehrávají deskovky. V létě se naše dvůr proměňuje v zelenou oázu
                        s posezením pod stromy.
                    </motion.p>

                    {/* 4-col Bento — gap-px technique */}
                    <div className="bg-neutral-200 rounded-sm overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                className="p-8 md:p-10 bg-background"
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.45, delay: i * 0.08 }}
                            >
                                <div className="text-foreground/70 mb-4">{v.icon}</div>
                                <h3 className="text-sm font-black tracking-tight mb-2">{v.title}</h3>
                                <p className="text-xs font-light text-muted leading-relaxed">{v.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ NABÍDKA ═══ */}
            <section ref={nabidka.ref} className="border-b border-border" aria-labelledby="h-menu">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                    <motion.p
                        className="text-[10px] font-light uppercase tracking-[0.18em] text-muted mb-2"
                        {...fade}
                    >
                        Nabídka
                    </motion.p>
                    <motion.h2
                        className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-12"
                        id="h-menu"
                        {...fade}
                    >
                        Co u nás najdete
                    </motion.h2>

                    {/* 3-col menu — gap-px technique */}
                    <div className="bg-neutral-200 rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-px">
                        {menu.map((cat, ci) => (
                            <motion.div
                                key={cat.title}
                                className="p-8 md:p-10 bg-background"
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.45, delay: ci * 0.1 }}
                            >
                                <h3 className="text-[10px] font-light uppercase tracking-[0.14em] mb-6 pb-3 border-b border-neutral-300">
                                    {cat.title}
                                </h3>
                                {cat.items.map((item, idx) => (
                                    <div
                                        key={item.name}
                                        className={`flex justify-between items-baseline gap-4 py-3 ${idx > 0 ? "border-t border-neutral-200" : ""
                                            }`}
                                    >
                                        <div>
                                            <div className="text-sm font-medium">{item.name}</div>
                                            <div className="text-[11px] font-light text-muted mt-0.5">{item.desc}</div>
                                        </div>
                                        <span className="font-semibold whitespace-nowrap tabular-nums text-sm">
                                            {item.price}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
