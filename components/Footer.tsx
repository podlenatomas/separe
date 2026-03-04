"use client";

import { Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-10 md:py-12" role="contentinfo">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-muted">
                        © 2026 separé. Všechna práva vyhrazena.
                    </span>
                    <div className="flex items-center gap-6">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:opacity-60 transition-opacity inline-flex items-center gap-1.5"
                            aria-label="Instagram separé"
                        >
                            <Instagram size={14} strokeWidth={2} />
                            Instagram
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:opacity-60 transition-opacity"
                            aria-label="Facebook separé"
                        >
                            Facebook
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
