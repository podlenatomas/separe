"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Clock } from "lucide-react";
import { useNav } from "@/providers/NavProvider";

const fade = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55, ease: "easeOut" as const },
};

export default function Contact() {
    const { kontakt } = useNav();

    return (
        <section ref={kontakt.ref} className="border-b border-border" aria-labelledby="h-contact">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <motion.p
                    className="text-[10px] font-light uppercase tracking-[0.18em] text-muted mb-2"
                    {...fade}
                >
                    Kontakt
                </motion.p>
                <motion.h2
                    className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-12"
                    id="h-contact"
                    {...fade}
                >
                    Stavte se na Mikulandské
                </motion.h2>

                <div className="bg-neutral-200 rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-px">
                    {/* Left — info */}
                    <motion.div className="p-8 md:p-10 lg:p-12 bg-background" {...fade}>
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-3">
                                <MapPin size={13} strokeWidth={1.5} className="text-muted" />
                                <h3 className="text-[10px] font-light uppercase tracking-[0.14em]">Adresa</h3>
                            </div>
                            <address className="not-italic text-sm font-light text-muted leading-[1.8]">
                                separé<br />
                                Mikulandská 133<br />
                                110 00 Praha 1 – Nové Město
                            </address>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-3">
                                <Mail size={13} strokeWidth={1.5} className="text-muted" />
                                <h3 className="text-[10px] font-light uppercase tracking-[0.14em]">Spojení</h3>
                            </div>
                            <p className="text-sm font-light text-muted leading-[1.8]">
                                <a
                                    href="mailto:ahoj@separe.cz"
                                    className="underline underline-offset-[3px] decoration-neutral-300 hover:decoration-foreground transition-colors"
                                >
                                    ahoj@separe.cz
                                </a>
                                <br />
                                <a
                                    href="tel:+420777123456"
                                    className="underline underline-offset-[3px] decoration-neutral-300 hover:decoration-foreground transition-colors"
                                >
                                    +420 777 123 456
                                </a>
                            </p>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-3">
                                <Clock size={13} strokeWidth={1.5} className="text-muted" />
                                <h3 className="text-[10px] font-light uppercase tracking-[0.14em]">
                                    Otevírací doba
                                </h3>
                            </div>
                            <table className="w-full">
                                <tbody>
                                    {[
                                        ["Pondělí – Pátek", "8:00 – 22:00"],
                                        ["Sobota", "9:00 – 23:00"],
                                        ["Neděle", "9:00 – 20:00"],
                                    ].map(([day, hrs]) => (
                                        <tr key={day}>
                                            <td className="py-1 text-sm font-medium pr-8">{day}</td>
                                            <td className="py-1 text-sm font-light text-muted">{hrs}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <button
                            onClick={() => window.open("mailto:ahoj@separe.cz?subject=Rezervace stolu")}
                            className="inline-flex items-center justify-center h-12 px-8 bg-foreground text-background text-[10px] font-light uppercase tracking-[0.14em] rounded-sm hover:bg-foreground/85 transition-colors cursor-pointer border-none"
                        >
                            Rezervovat stůl
                        </button>
                    </motion.div>

                    {/* Right — map */}
                    <motion.div className="p-8 md:p-10 lg:p-12 bg-background" {...fade}>
                        <div className="flex items-center gap-2 mb-3">
                            <MapPin size={13} strokeWidth={1.5} className="text-muted" />
                            <h3 className="text-[10px] font-light uppercase tracking-[0.14em]">
                                Kde nás najdete
                            </h3>
                        </div>
                        <p className="text-sm font-light text-muted leading-[1.8] mb-6">
                            Vstup přímo z ulice Mikulandská. Projděte průchodem do dvora — v létě tu funguje
                            naše zahradní posezení pod platany.
                        </p>
                        <div className="w-full h-60 md:h-72 rounded-sm overflow-hidden">
                            <iframe
                                src={process.env.NEXT_PUBLIC_MAP_EMBED_URL}
                                title="Mapa — separé, Mikulandská 133, Praha 1"
                                className="w-full h-full"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
