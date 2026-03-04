"use client";

import { Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-10 md:py-12" role="contentinfo">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-[10px] font-light uppercase tracking-[0.12em] text-muted">
                        © 2026 separé · Mikulandská 133, Praha 1
                    </span>
                    <div className="flex items-center gap-6">
                        <a
                            href="https://instagram.com/separe.cz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-light uppercase tracking-[0.12em] text-muted hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                            aria-label="Instagram separé"
                        >
                            <Instagram size={12} strokeWidth={1.5} />
                            Instagram
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
