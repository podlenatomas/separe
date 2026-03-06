"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useNav } from "@/providers/NavProvider";

const fade = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55, ease: "easeOut" as const },
};

export default function Story() {
    const { pribeh } = useNav();

    return (
        <section ref={pribeh.ref} className="relative border-b border-border overflow-hidden" aria-labelledby="h-story">
            {/* Anti-grid watermark — crosses the 1px divider */}
            <div
                className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
                aria-hidden="true"
            >
                <span className="text-[16rem] md:text-[22rem] lg:text-[28rem] font-black tracking-tighter text-neutral-900/[0.035] leading-none">
                    1891
                </span>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="flex items-center gap-3 mb-2">
                    <BookOpen size={14} strokeWidth={1.5} className="text-muted" />
                    <motion.p
                        className="text-[10px] font-light uppercase tracking-[0.18em] text-muted"
                        {...fade}
                    >
                        Příběh místa
                    </motion.p>
                </div>
                <motion.h2
                    className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-12"
                    id="h-story"
                    {...fade}
                >
                    Plán z&nbsp;roku 1891. A&nbsp;jeden úřední šiml.
                </motion.h2>

                <div className="relative bg-neutral-200 rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-px">
                    <motion.div className="p-8 md:p-10 lg:p-12 bg-background" {...fade}>
                        <p className="text-muted font-light leading-[1.85] mb-6">
                            Náhody neexistují. Když jsme na Mikulandské otevírali Separé, netušili jsme,
                            že tenhle dům měl k&nbsp;dobrému pití nakročeno už na konci 19.&nbsp;století.
                            Až pohled do starých archivů nám ukázal, jak blízko to tehdy bylo.
                        </p>
                        <p className="text-muted font-light leading-[1.85]">
                            V&nbsp;říjnu 1891 si majitel domu, pan J.&nbsp;F.&nbsp;Tomaschek, zažádal na
                            pražském magistrátu o&nbsp;povolení. Měl jasnou vizi — chtěl tu nalévat
                            a&nbsp;prodávat víno. Jenže narazil na tvrdou zeď rakousko-uherské byrokracie.
                        </p>
                    </motion.div>

                    <motion.div className="p-8 md:p-10 lg:p-12 bg-background" {...fade}>
                        <p className="text-muted font-light leading-[1.85] mb-6">
                            Úřad si vymínil poplatky a&nbsp;úmorné podmínky, které tehdy nejspíš nešlo
                            splnit. Na zažloutlém dokumentu z&nbsp;roku 1895 totiž stojí stručná, rukou
                            psaná tečka za celým projektem:{" "}
                            <span className="font-medium text-foreground italic">
                                „Vinárna nebyla zřízena."
                            </span>
                        </p>
                        <p className="text-muted font-light leading-[1.85]">
                            Trvalo dlouhá desetiletí, než se v&nbsp;tomhle domě konečně začalo oficiálně
                            připíjet. A&nbsp;i&nbsp;když dnes už si na klasickou vinárnu nehrajeme — místo
                            toho čepujeme řemeslná piva, otevíráme divoké pet-naty a&nbsp;stoly plníme
                            deskovkami — jsme si jistí jednou věcí.{" "}
                            <span className="font-medium text-foreground">
                                Pan Tomaschek by z&nbsp;téhle zašívárny měl radost.
                            </span>
                        </p>
                    </motion.div>
                </div>

                <motion.p
                    className="text-sm font-light text-muted mt-8 max-w-xl leading-relaxed italic"
                    {...fade}
                >
                    Sen z&nbsp;roku 1891 jsme zkrátka dotáhli do konce. Jen s&nbsp;trochu lepším pitím
                    a&nbsp;bez razítka s&nbsp;orlicí.
                </motion.p>
            </div>
        </section>
    );
}
