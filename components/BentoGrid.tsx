"use client";

import { motion } from "framer-motion";
import { Beer, Wine, GlassWater, Dice5 } from "lucide-react";
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
        icon: <Beer size={26} strokeWidth={1.3} />,
        title: "Řemeslná piva",
        text: "Pečlivý výběr toho nejlepšího z malých a létajících pivovarů. Nabídku na čepu pravidelně obměňujeme, aby bylo pořád co objevovat.",
    },
    {
        icon: <Wine size={26} strokeWidth={1.3} />,
        title: "Šumivá vína & Pet-naty",
        text: "Neomezujeme se jen na italské Prosecco. Nabízíme zajímavé bubliny a naturální vína, která si nejvíc užijete, když si s přáteli otevřete rovnou celou lahev.",
    },
    {
        icon: <GlassWater size={26} strokeWidth={1.3} />,
        title: "Přívlastková vína",
        text: "Lokální kvalita od prověřených vinařů, která dělá čest tuzemskému řemeslu. Špičková česká přívlastková vína pečlivě střežená v naší vinotéce.",
    },
    {
        icon: <Dice5 size={26} strokeWidth={1.3} />,
        title: "Deskovky & Kvízy",
        text: "Přes 80 her k zapůjčení zdarma. Pravidelné herní večery a legendární středeční hospodské kvízy. U nás se nezastavuje jen na \u201Ejedno\u201C — u nás se zůstává.",
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
        title: "Pivo",
        items: [
            { name: "Řemeslný ležák", desc: "Rotující výběr z malých pivovarů", price: "dle nabídky" },
            { name: "Speciály na čepu", desc: "IPA, APA, sour — vždy něco nového", price: "dle nabídky" },
            { name: "Lahvové speciály", desc: "Limitované edice a zahraniční hosté", price: "dle nabídky" },
        ],
    },
    {
        title: "Víno",
        items: [
            { name: "Přívlastková (rozlev)", desc: "Česká přívlastková vína", price: "od 85 Kč" },
            { name: "Láhev Pet-natu", desc: "Ideální pro partu — naturální bubliny", price: "od 450 Kč" },
            { name: "Šumivé víno", desc: "Výběr z Evropy, vždy chlazené", price: "od 120 Kč" },
        ],
    },
    {
        title: "Jídlo",
        items: [
            { name: "Pinsa Margherita", desc: "San Marzano, fior di latte, bazalka", price: "165 Kč" },
            { name: "Pinsa Prosciutto e rucola", desc: "Parmská šunka, rukola, parmezán", price: "195 Kč" },
            { name: "Sýrový talíř k vínu", desc: "Výběr českých sýrů, med, ořechy", price: "185 Kč" },
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
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
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
                        Rodinný podnik s&nbsp;domáckou atmosférou
                    </motion.h2>
                    <motion.p className="text-muted font-light leading-[1.8] max-w-2xl mb-12" {...fade}>
                        Separé vzniklo z&nbsp;jednoduché myšlenky: chtěli jsme v&nbsp;centru Prahy vytvořit
                        místo, kam bychom sami rádi chodili. Žádný neosobní bar s&nbsp;naškrobenou obsluhou,
                        ale poctivý rodinný podnik, který funguje jako obývák pro lidi z&nbsp;okolí.
                        Milujeme poctivé řemeslo a&nbsp;zajímavé chutě. Nečekejte u&nbsp;nás proto žádnou nudnou
                        klasiku.
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
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 text-left">
                    <motion.p
                        className="text-[10px] font-light uppercase tracking-[0.18em] text-muted mb-2"
                        {...fade}
                    >
                        Nabídka
                    </motion.p>
                    <motion.h2
                        className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-3"
                        id="h-menu"
                        {...fade}
                    >
                        Co má smysl pít a&nbsp;jíst
                    </motion.h2>
                    <motion.p className="text-left text-neutral-600 max-w-2xl mb-12" {...fade}>
                        Menu neděláme složité, děláme ho poctivé. Soustředíme se na to, co nás baví
                        a&nbsp;co dokonale funguje u&nbsp;stolu s&nbsp;přáteli.
                    </motion.p>

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
                                        className={`flex justify-between items-baseline gap-4 py-3 -mx-3 px-3 rounded-sm transition-colors duration-300 hover:bg-neutral-200/30 ${idx > 0 ? "border-t border-neutral-200" : ""
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

                    <motion.p
                        className="text-[11px] font-light text-muted mt-6 italic"
                        {...fade}
                    >
                        Ceny a položky se mohou měnit dle aktuální nabídky.
                    </motion.p>
                </div>
            </section>
        </>
    );
}
