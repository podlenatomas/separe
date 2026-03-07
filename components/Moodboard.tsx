"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram } from "lucide-react";

const fade = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55, ease: "easeOut" as const },
};

interface MoodPhoto {
    src: string;
    alt: string;
    /** Tailwind classes for aspect ratio & grid span  */
    span: string;
}

const photos: MoodPhoto[] = [
    {
        src: "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?q=80&w=800",
        alt: "Nalévání vína v teplém světle",
        span: "col-span-2 row-span-2 aspect-[4/5]",
    },
    {
        src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800",
        alt: "Útulný interiér baru s teplým osvětlením",
        span: "col-span-1 row-span-1 aspect-square",
    },
    {
        src: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800",
        alt: "Barový pult s řemeslnými pivy",
        span: "col-span-1 row-span-1 aspect-square",
    },
    {
        src: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?q=80&w=800",
        alt: "Deskovky rozložené na stole",
        span: "col-span-1 row-span-2 aspect-[3/5]",
    },
    {
        src: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=800",
        alt: "Přátelé u stolu s vínem",
        span: "col-span-1 row-span-1 aspect-[5/3]",
    },
    {
        src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800",
        alt: "Sklenice vína v měkkém světle",
        span: "col-span-1 row-span-1 aspect-[5/3]",
    },
];

export default function Moodboard() {
    return (
        <section className="border-b border-border" aria-labelledby="h-moodboard">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
                <motion.p
                    className="text-[10px] font-light uppercase tracking-[0.18em] text-muted mb-2"
                    {...fade}
                >
                    Galerie
                </motion.p>
                <motion.h2
                    className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-5 text-balance"
                    id="h-moodboard"
                    {...fade}
                >
                    Zastav se.
                </motion.h2>
                <motion.p
                    className="text-muted font-light leading-[1.8] max-w-2xl mb-12 text-pretty"
                    {...fade}
                >
                    Malý výřez z&nbsp;atmosféry Mikulandské. Zbytek je lepší zažít
                    osobně — u&nbsp;sklenky vína nebo nad&nbsp;deskovkou.
                </motion.p>

                {/* Custom asymmetric masonry grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[180px] gap-1.5 rounded-sm overflow-hidden">
                    {photos.map((photo, i) => (
                        <motion.div
                            key={photo.src}
                            className={`relative overflow-hidden rounded-sm ${photo.span}`}
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            {/* Subtle hover overlay */}
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>

                <motion.a
                    href="https://instagram.com/separe_mikulandska"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 justify-center h-12 px-8 mt-10 text-foreground text-[10px] font-light uppercase tracking-[0.14em] rounded-sm border border-foreground hover:bg-foreground hover:text-background active:scale-[0.98] transition-all duration-200 cursor-pointer"
                    {...fade}
                >
                    <Instagram size={14} strokeWidth={1.5} />
                    @separe_mikulandska
                </motion.a>
            </div>
        </section>
    );
}
