"use client";

import { motion } from "framer-motion";
import { Coffee, Wine, Dice5 } from "lucide-react";
import type { ReactNode } from "react";

interface ValueItem {
    icon: ReactNode;
    title: string;
    text: string;
}

const values: ValueItem[] = [
    {
        icon: <Coffee size={28} strokeWidth={1.5} />,
        title: "Výběrová káva",
        text: "Spolupracujeme s českými mikropražírnami. Espresso i filtr, vždy čerstvě namletý.",
    },
    {
        icon: <Wine size={28} strokeWidth={1.5} />,
        title: "Přírodní víno",
        text: "Malí vinaři z Moravy i zahraničí. Rotující nabídka, vždy něco nového k ochutnání.",
    },
    {
        icon: <Dice5 size={28} strokeWidth={1.5} />,
        title: "Deskovky & komunita",
        text: "Přes 80 her k zapůjčení zdarma. Pravidelné herní večery a komunitní akce.",
    },
];

interface MenuItem {
    name: string;
    desc: string;
    price: string;
}

interface MenuCategory {
    title: string;
    items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
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
        title: "Malá kuchyně",
        items: [
            { name: "Focaccia s olivami", desc: "Domácí pečivo, extra virgin", price: "95 Kč" },
            { name: "Hummus s pita", desc: "Cizrna, tahini, grilovaná pita", price: "105 Kč" },
            { name: "Sýrový talíř", desc: "Výběr 3 českých sýrů, med, ořechy", price: "185 Kč" },
            { name: "Bruschetta", desc: "Rajčata, bazalka, česnek, balzamiko", price: "85 Kč" },
            { name: "Domácí koláč", desc: "Denní nabídka, sezónní ovoce", price: "65 Kč" },
        ],
    },
];

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.6, ease: "easeOut" },
};

export default function BentoGrid() {
    return (
        <>
            {/* ===== O NÁS ===== */}
            <section className="border-b border-border" id="o-nas" aria-labelledby="about-heading">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                    <motion.p
                        className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted mb-2"
                        {...fadeUp}
                    >
                        O nás
                    </motion.p>
                    <motion.h2
                        className="text-3xl md:text-[2.75rem] font-bold leading-tight mb-6"
                        id="about-heading"
                        {...fadeUp}
                    >
                        Místo, kde se potkává káva, víno a hry.
                    </motion.h2>
                    <motion.p
                        className="text-muted leading-[1.75] max-w-2xl mb-12"
                        {...fadeUp}
                    >
                        Separé vzniklo v roce 2023 jako odpověď na otázku, kde se v centru Prahy dá opravdu
                        zpomalit. Schovali jsme se do vnitrobloku budovy UMPRUM a vybudovali prostor, který
                        funguje jako obývák pro celou čtvrť — ráno voní čerstvě praženou kávou, večer se tu
                        otevírá přírodní víno a na stolech se rozehrávají deskovky.
                    </motion.p>

                    {/* Values Bento */}
                    <div className="grid grid-cols-1 md:grid-cols-3 border border-border rounded-sm overflow-hidden">
                        {values.map((item, i) => (
                            <motion.div
                                key={item.title}
                                className={`p-8 md:p-10 lg:p-12 bg-background ${i < values.length - 1 ? "border-b md:border-b-0 md:border-r border-border" : ""
                                    }`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                            >
                                <div className="text-foreground mb-4">{item.icon}</div>
                                <h3 className="text-base md:text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== NABÍDKA ===== */}
            <section className="border-b border-border" id="nabidka" aria-labelledby="menu-heading">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                    <motion.p
                        className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted mb-2"
                        {...fadeUp}
                    >
                        Nabídka
                    </motion.p>
                    <motion.h2
                        className="text-3xl md:text-[2.75rem] font-bold leading-tight mb-12"
                        id="menu-heading"
                        {...fadeUp}
                    >
                        Co u nás najdete
                    </motion.h2>

                    {/* Menu Bento */}
                    <div className="grid grid-cols-1 md:grid-cols-3 border border-border rounded-sm overflow-hidden">
                        {menuCategories.map((cat, catIdx) => (
                            <motion.div
                                key={cat.title}
                                className={`p-8 md:p-10 bg-background ${catIdx < menuCategories.length - 1
                                        ? "border-b md:border-b-0 md:border-r border-border"
                                        : ""
                                    }`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: catIdx * 0.1, ease: "easeOut" }}
                            >
                                <h3 className="text-xs font-bold uppercase tracking-[0.08em] mb-6 pb-3 border-b border-border-dark">
                                    {cat.title}
                                </h3>
                                <div className="space-y-0">
                                    {cat.items.map((item, idx) => (
                                        <div
                                            key={item.name}
                                            className={`flex justify-between items-baseline gap-4 py-3 ${idx > 0 ? "border-t border-border" : ""
                                                }`}
                                        >
                                            <div>
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-xs text-muted mt-0.5">{item.desc}</div>
                                            </div>
                                            <span className="font-semibold whitespace-nowrap tabular-nums text-sm">
                                                {item.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
