"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.6, ease: "easeOut" },
};

export default function Contact() {
    return (
        <section className="border-b border-border" id="kontakt" aria-labelledby="contact-heading">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <motion.p
                    className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted mb-2"
                    {...fadeUp}
                >
                    Kontakt
                </motion.p>
                <motion.h2
                    className="text-3xl md:text-[2.75rem] font-bold leading-tight mb-12"
                    id="contact-heading"
                    {...fadeUp}
                >
                    Najdete nás ve vnitrobloku
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 border border-border rounded-sm overflow-hidden">
                    {/* Left — contact info */}
                    <motion.div
                        className="p-8 md:p-10 lg:p-12 bg-background border-b md:border-b-0 md:border-r border-border"
                        {...fadeUp}
                    >
                        {/* Address */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-3">
                                <MapPin size={14} strokeWidth={2} className="text-muted" />
                                <h3 className="text-xs font-bold uppercase tracking-[0.06em]">Adresa</h3>
                            </div>
                            <address className="not-italic text-muted leading-[1.75]">
                                separé<br />
                                náměstí Jana Palacha 80<br />
                                110 00 Praha 1 – Staré Město<br />
                                (vchod z vnitrobloku UMPRUM)
                            </address>
                        </div>

                        {/* Contact */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-3">
                                <Mail size={14} strokeWidth={2} className="text-muted" />
                                <h3 className="text-xs font-bold uppercase tracking-[0.06em]">Spojení</h3>
                            </div>
                            <p className="text-muted leading-[1.75]">
                                <a
                                    href="mailto:ahoj@separe.cz"
                                    className="underline underline-offset-[3px] hover:opacity-60 transition-opacity"
                                >
                                    ahoj@separe.cz
                                </a>
                                <br />
                                <a
                                    href="tel:+420777123456"
                                    className="underline underline-offset-[3px] hover:opacity-60 transition-opacity"
                                >
                                    +420 777 123 456
                                </a>
                            </p>
                        </div>

                        {/* Hours */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-3">
                                <Clock size={14} strokeWidth={2} className="text-muted" />
                                <h3 className="text-xs font-bold uppercase tracking-[0.06em]">Otevírací doba</h3>
                            </div>
                            <table className="w-full">
                                <tbody>
                                    {[
                                        ["Pondělí – Pátek", "8:00 – 22:00"],
                                        ["Sobota", "9:00 – 23:00"],
                                        ["Neděle", "9:00 – 20:00"],
                                    ].map(([day, hours]) => (
                                        <tr key={day}>
                                            <td className="py-1 text-sm font-medium pr-8">{day}</td>
                                            <td className="py-1 text-sm text-muted">{hours}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <a
                            href="#kontakt"
                            className="inline-flex items-center justify-center h-12 px-8 bg-foreground text-background text-sm font-semibold uppercase tracking-[0.08em] rounded-sm hover:bg-foreground/85 transition-colors"
                        >
                            Rezervovat stůl
                        </a>
                    </motion.div>

                    {/* Right — map */}
                    <motion.div
                        className="p-8 md:p-10 lg:p-12 bg-background"
                        {...fadeUp}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <MapPin size={14} strokeWidth={2} className="text-muted" />
                            <h3 className="text-xs font-bold uppercase tracking-[0.06em]">Kde nás najdete</h3>
                        </div>
                        <p className="text-muted leading-[1.75] mb-6">
                            Vstup z vnitrobloku budovy UMPRUM na náměstí Jana Palacha. Projděte průjezdem a
                            zahněte doleva — separé je za malým dvorkem s lavičkami.
                        </p>
                        <div className="w-full h-60 md:h-72 border border-border rounded-sm overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.8!2d14.4148!3d50.0898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94e9b946f8af%3A0x400af0f6614e810!2zTsOhbS4gSmFuYSBQYWxhY2hhLCBTdGFyw6kgTcSbc3RvLCAxMTAgMDAgUHJhaGEgMQ!5e0!3m2!1scs!2scz!4v1700000000000!5m2!1scs!2scz"
                                title="Mapa — separé, náměstí Jana Palacha, Praha 1"
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
