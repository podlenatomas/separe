"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNav } from "@/providers/NavProvider";

const NAV_ITEMS = [
    { key: "oNas" as const, label: "O nás" },
    { key: "nabidka" as const, label: "Nabídka" },
    { key: "akce" as const, label: "Akce" },
    { key: "kontakt" as const, label: "Kontakt" },
];

const overlayVariants = {
    closed: { opacity: 0, transition: { duration: 0.25, ease: "easeInOut" as const } },
    open: { opacity: 1, transition: { duration: 0.25, ease: "easeInOut" as const } },
};

const itemVariants = {
    closed: { opacity: 0, y: 24 },
    open: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.08 + i * 0.055, duration: 0.3, ease: "easeOut" as const },
    }),
};

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const nav = useNav();

    const go = useCallback(
        (key: keyof typeof nav) => {
            setOpen(false);
            setTimeout(() => nav[key].trigger(), open ? 300 : 0);
        },
        [nav, open]
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-7xl mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between">
                <button
                    onClick={() => go("hero")}
                    className="text-[1.35rem] font-black tracking-tight text-foreground cursor-pointer bg-transparent border-none"
                    aria-label="separé — na začátek"
                >
                    separé
                </button>

                <nav className="hidden md:flex items-center gap-10" aria-label="Hlavní navigace">
                    {NAV_ITEMS.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => go(key)}
                            className="text-[10px] font-light uppercase tracking-[0.14em] text-foreground/80 hover:text-foreground transition-colors duration-150 cursor-pointer bg-transparent border-none relative group"
                        >
                            {label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-200 group-hover:w-full" />
                        </button>
                    ))}
                </nav>

                <motion.button
                    className="md:hidden w-11 h-11 flex items-center justify-center relative z-[110] cursor-pointer bg-transparent border-none"
                    onClick={() => setOpen(!open)}
                    aria-label={open ? "Zavřít menu" : "Otevřít menu"}
                    aria-expanded={open}
                    aria-controls="mobile-nav"
                    whileTap={{ scale: 0.92 }}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {open ? (
                            <motion.div
                                key="x"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={20} strokeWidth={1.5} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="m"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu size={20} strokeWidth={1.5} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        id="mobile-nav"
                        className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center gap-7"
                        variants={overlayVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        aria-label="Mobilní navigace"
                    >
                        {NAV_ITEMS.map(({ key, label }, i) => (
                            <motion.button
                                key={key}
                                className="text-xl font-black uppercase tracking-[0.04em] text-foreground hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none"
                                onClick={() => go(key)}
                                variants={itemVariants}
                                initial="closed"
                                animate="open"
                                custom={i}
                            >
                                {label}
                            </motion.button>
                        ))}
                        <motion.button
                            className="mt-3 px-8 py-3 bg-foreground text-background text-[10px] font-light uppercase tracking-[0.14em] rounded-sm hover:bg-foreground/85 transition-colors cursor-pointer border-none"
                            onClick={() => go("kontakt")}
                            variants={itemVariants}
                            initial="closed"
                            animate="open"
                            custom={NAV_ITEMS.length}
                        >
                            Rezervovat stůl
                        </motion.button>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
