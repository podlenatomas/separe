"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { useTranslations } from "next-intl";

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

interface MoodPhoto {
  src: string;
  altKey: string;
  span: string;
}

const photos: MoodPhoto[] = [
  {
    src: "/images/cocktail.jpg",
    altKey: "p1",
    span: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/interior.jpg",
    altKey: "p2",
    span: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/wine_bottles.jpg",
    altKey: "p3",
    span: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/exterior.jpg",
    altKey: "p4",
    span: "col-span-2 row-span-1 md:col-span-1 md:row-span-2",
  },
  {
    src: "/images/candle.jpg",
    altKey: "p5",
    span: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/lightbulb.jpg",
    altKey: "p6",
    span: "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
  },
];

export default function Moodboard() {
  const t = useTranslations("Moodboard");

  return (
    <section className="border-b border-border" aria-labelledby="h-moodboard">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <motion.p
          className="text-[10px] font-light uppercase tracking-[0.18em] text-muted mb-2"
          {...fade}
        >
          {t("eyebrow")}
        </motion.p>
        <motion.h2
          className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-5 text-balance"
          id="h-moodboard"
          {...fade}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="text-muted font-light leading-[1.8] max-w-2xl mb-12 text-pretty"
          {...fade}
        >
          {t("description")}
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
                alt={t(`photos.${photo.altKey}`)}
                fill
                quality={80}
                loading="lazy"
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:justify-start w-full">
          <motion.a
            href="https://instagram.com/separe_mikulandska"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 justify-center h-12 px-8 text-foreground text-[10px] font-light uppercase tracking-[0.14em] rounded-sm border border-foreground hover:bg-foreground hover:text-background active:scale-[0.98] transition-all duration-200 cursor-pointer mx-auto md:mx-0"
            {...fade}
          >
            <Instagram size={14} strokeWidth={1.5} />
            @separe_mikulandska
          </motion.a>
        </div>
      </div>
    </section>
  );
}
