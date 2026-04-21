"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

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

interface Aggregate {
  rating: number | null;
  ratingsTotal: number | null;
}

const FALLBACK_KEYS = ["r1", "r2", "r3"] as const;
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?kgmid=/g/1tt1rdsl#lrd";

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
  const t = useTranslations("Reviews");

  // Build fallback reviews from translations
  const fallbackReviews: Review[] = FALLBACK_KEYS.map((key) => ({
    name: t(`fallback.${key}.name`),
    text: t(`fallback.${key}.text`),
    date: t(`fallback.${key}.date`),
  }));

  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [aggregate, setAggregate] = useState<Aggregate>({
    rating: null,
    ratingsTotal: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          if (data.reviews && data.reviews.length > 0) {
            setReviews(data.reviews);
          }
          if (typeof data.rating === "number") {
            setAggregate({
              rating: data.rating,
              ratingsTotal: data.ratingsTotal ?? null,
            });
          }
        }
      } catch {
        console.error("Failed to fetch Google Reviews, using fallback.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="border-b border-border" aria-labelledby="h-reviews">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <motion.p
          className="text-[10px] font-light uppercase tracking-[0.18em] text-muted mb-2"
          {...fade}
        >
          {t("eyebrow")}
        </motion.p>
        <motion.h2
          className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-5 text-balance"
          id="h-reviews"
          {...fade}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="text-muted font-light leading-[1.8] max-w-2xl mb-8 text-pretty"
          {...fade}
        >
          {t("description")}
        </motion.p>

        {aggregate.rating !== null && (
          <motion.div
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-10"
            {...fade}
          >
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-black tracking-tighter">
                {aggregate.rating.toFixed(1)}
              </span>
              <span className="text-xs font-light uppercase tracking-[0.14em] text-muted">
                / 5 {t("ratingLabel")}
              </span>
            </div>
            {aggregate.ratingsTotal !== null && (
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-light uppercase tracking-[0.14em] text-muted hover:text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
              >
                {aggregate.ratingsTotal} {t("reviewsCountSuffix")} —{" "}
                {t("readAll")}
              </a>
            )}
          </motion.div>
        )}

        {/* Review cards — 3-col gap-px grid */}
        <div className="bg-neutral-200 rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-px">
          {loading
            ? /* Skeletons */
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-8 md:p-10 bg-background flex flex-col animate-pulse"
                >
                  <Stars />
                  <div className="h-4 bg-neutral-100 rounded w-full mb-3 mt-1"></div>
                  <div className="h-4 bg-neutral-100 rounded w-full mb-3"></div>
                  <div className="h-4 bg-neutral-100 rounded w-3/4 mb-6 flex-1"></div>
                  <div className="flex items-baseline justify-between mt-auto">
                    <div className="h-3 bg-neutral-100 rounded w-20"></div>
                    <div className="h-3 bg-neutral-100 rounded w-16"></div>
                  </div>
                </div>
              ))
            : reviews.map((r, i) => (
                <motion.blockquote
                  key={r.name + i}
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
                    <span className="text-[10px] font-light text-muted whitespace-nowrap">
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
          {t("ctaPrompt")}
        </motion.p>
        <div className="mt-6 flex justify-center md:justify-start w-full">
          <motion.a
            href="https://g.page/r/CZ08UsxtABUNEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-12 px-8 text-foreground text-[10px] font-light uppercase tracking-[0.14em] rounded-sm border border-foreground hover:bg-foreground hover:text-background active:scale-[0.98] transition-all duration-200 cursor-pointer mx-auto md:mx-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            {...fade}
          >
            {t("cta")}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
