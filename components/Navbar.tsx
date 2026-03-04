"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollContext, type SectionId } from "@/providers/ScrollProvider";

interface NavLink {
    id: SectionId;
    label: string;
}

const navLinks: NavLink[] = [
    { id: "o-nas", label: "O nás" },
    { id: "nabidka", label: "Nabídka" },
    { id: "akce", label: "Akce" },
    { id: "kontakt", label: "Kontakt" },
];

const overlayVariants = {
    closed: {
        opacity: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
        opacity: 1,
        transition: { duration: 0.3, ease: "easeInOut" },
    },
};

const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.1 + i * 0.06,
            duration: 0.35,
            ease: "easeOut",
        },
    }),
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { scrollTo } = useScrollContext();

    const handleNav = useCallback(
        (id: SectionId) => {
            setIsOpen(false);
            // Small delay to allow mobile menu close animation
            setTimeout(() => scrollTo(id), isOpen ? 350 : 0);
        },
        [scrollTo, isOpen]
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-7xl mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between">
                {/* Logo */}
                <button
                    onClick={() => scrollTo("hero")}
                    className="text-2xl font-bold tracking-tight text-foreground cursor-pointer"
                    aria-label="separé — na začátek stránky"
                >
                    separé
                </button>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10" aria-label="Hlavní navigace">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleNav(link.id)}
                            className="text-xs font-semibold uppercase tracking-[0.08em] text-foreground hover:opacity-60 transition-opacity duration-150 relative group cursor-pointer bg-transparent border-none"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-200 group-hover:w-full" />
                        </button>
                    ))}
                </nav>

                {/* Hamburger */}
                <motion.button
                    className="md:hidden w-11 h-11 flex items-center justify-center relative z-[110] cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Zavřít menu" : "Otevřít menu"}
                    aria-expanded={isOpen}
                    aria-controls="mobile-nav"
                    whileTap={{ scale: 0.92 }}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={22} strokeWidth={2} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu size={22} strokeWidth={2} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Mobile overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        id="mobile-nav"
                        className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center gap-8"
                        variants={overlayVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        aria-label="Mobilní navigace"
                    >
                        {navLinks.map((link, i) => (
                            <motion.button
                                key={link.id}
                                className="text-2xl font-bold uppercase tracking-[0.06em] text-foreground hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none"
                                onClick={() => handleNav(link.id)}
                                variants={linkVariants}
                                initial="closed"
                                animate="open"
                                custom={i}
                            >
                                {link.label}
                            </motion.button>
                        ))}
                        <motion.button
                            className="mt-4 px-8 py-3 bg-foreground text-background text-sm font-semibold uppercase tracking-[0.08em] rounded-sm hover:bg-foreground/85 transition-colors cursor-pointer border-none"
                            onClick={() => handleNav("kontakt")}
                            variants={linkVariants}
                            initial="closed"
                            animate="open"
                            custom={navLinks.length}
                        >
                            Rezervovat stůl
                        </motion.button>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
