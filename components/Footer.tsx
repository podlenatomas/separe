"use client";

import { Instagram } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="py-10 md:py-12" role="contentinfo">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-y-10 gap-x-4 text-center md:text-left">
                    <span className="text-[10px] font-light uppercase tracking-[0.12em] text-muted">
                        {t("copyright")}
                    </span>
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                        <a
                            href="https://instagram.com/separe.cz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs md:text-[10px] font-light uppercase tracking-[0.12em] text-muted hover:text-foreground transition-colors inline-flex items-center gap-2 md:gap-1.5 p-4 md:p-0 rounded-full"
                            aria-label="Instagram separé"
                        >
                            <Instagram size={14} className="md:w-3 md:h-3" strokeWidth={1.5} />
                            Instagram
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
