"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNav } from "@/providers/NavProvider";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FocusLock from "react-focus-lock";

type NavItem = {
  key: "oNas" | "nabidka" | "akce" | "kontakt" | "rezervace";
  labelKey: "about" | "menu" | "events" | "contact" | "reservation";
  anchor: string;
};

const NAV_ITEMS: NavItem[] = [
  { key: "oNas", labelKey: "about", anchor: "o-nas" },
  { key: "nabidka", labelKey: "menu", anchor: "nabidka" },
  { key: "akce", labelKey: "events", anchor: "akce" },
  { key: "kontakt", labelKey: "contact", anchor: "kontakt" },
  { key: "rezervace", labelKey: "reservation", anchor: "rezervace" },
];

const overlayVariants = {
  closed: {
    y: "-100%",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
  open: {
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: 40 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const nav = useNav();
  const t = useTranslations("Navbar");

  // AUTO-CLOSE ON RESIZE (React Viewport Management)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // 'md' breakpoint
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [open]);

  const goHome = useCallback(() => {
    setOpen(false);
    setTimeout(
      () => {
        nav.hero?.trigger?.();
      },
      open ? 400 : 0,
    );
  }, [nav, open]);

  // Progressive-enhancement handler: let browser follow the href (adds hash
  // to URL, real deep-link, crawler/LLM-citable), but intercept to close the
  // mobile overlay cleanly and use Lenis-smooth scroll when present.
  const handleAnchorClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      anchor: string,
      navKey: NavItem["key"],
    ) => {
      // Respect modifier keys / middle-click / external behaviors
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
        return;
      e.preventDefault();
      setOpen(false);
      const delay = open ? 400 : 0;
      setTimeout(() => {
        // Use registered NavProvider trigger when available (Lenis-enhanced smooth scroll),
        // fall back to native scrollIntoView, then update hash without jumping.
        const navTrigger = nav[navKey as keyof typeof nav]?.trigger;
        if (navTrigger) {
          navTrigger();
        } else {
          document
            .getElementById(anchor)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        if (typeof window !== "undefined" && window.history?.replaceState) {
          window.history.replaceState(null, "", `#${anchor}`);
        }
      }, delay);
    },
    [nav, open],
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F5F5F0]/60 backdrop-blur-lg border-b border-neutral-200/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => {
            if (
              e.metaKey ||
              e.ctrlKey ||
              e.shiftKey ||
              e.altKey ||
              e.button !== 0
            )
              return;
            e.preventDefault();
            goHome();
            if (typeof window !== "undefined" && window.history?.replaceState) {
              window.history.replaceState(null, "", window.location.pathname);
            }
          }}
          className="text-[1.35rem] font-black tracking-tight text-foreground cursor-pointer bg-transparent border-none relative z-[110] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
          aria-label="separé. na začátek"
        >
          separé
        </a>

        <nav
          className="hidden md:flex items-center gap-10"
          aria-label="Hlavní navigace"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={`#${item.anchor}`}
              onClick={(e) => handleAnchorClick(e, item.anchor, item.key)}
              className="text-[10px] font-light uppercase tracking-[0.14em] text-foreground/80 hover:text-foreground transition-colors duration-150 cursor-pointer bg-transparent border-none relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm px-1 py-0.5"
            >
              {t(item.labelKey)}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Global actions: Language Switcher (always visible) + Hamburger (mobile only) */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          <motion.button
            className="md:hidden w-11 h-11 flex items-center justify-center relative z-[110] cursor-pointer bg-transparent border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-md"
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
                  <X size={24} strokeWidth={1.5} className="text-neutral-900" />
                </motion.div>
              ) : (
                <motion.div
                  key="m"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu
                    size={24}
                    strokeWidth={1.5}
                    className="text-neutral-900"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <FocusLock>
            <motion.nav
              id="mobile-nav"
              className="fixed inset-0 w-full h-screen bg-[#F5F5F0] z-[100] flex flex-col justify-center px-8"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              aria-label="Mobilní navigace"
            >
              <div className="flex flex-col items-start w-full max-w-sm mx-auto">
                {NAV_ITEMS.map((item, i) => (
                  <div key={item.key} className="overflow-hidden w-full">
                    <motion.a
                      href={`#${item.anchor}`}
                      onClick={(e) =>
                        handleAnchorClick(e, item.anchor, item.key)
                      }
                      className="block text-5xl font-black tracking-tighter text-neutral-900 uppercase text-left my-4 w-full cursor-pointer bg-transparent border-none hover:text-neutral-600 transition-colors no-underline"
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      custom={i}
                    >
                      {t(item.labelKey)}
                    </motion.a>
                  </div>
                ))}
              </div>

              {/* Secondary info at absolute bottom */}
              <motion.div
                className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t border-neutral-300 pt-6"
                variants={itemVariants}
                initial="closed"
                animate="open"
                custom={NAV_ITEMS.length}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-neutral-500 font-medium">
                    {t("followUs")}
                  </span>
                  <a
                    href="#"
                    className="text-sm font-medium text-neutral-900 underline underline-offset-4"
                  >
                    Instagram
                  </a>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-neutral-500 font-medium">
                    {t("address")}
                  </span>
                  <span className="text-sm font-medium text-neutral-900">
                    Mikulandská 133
                  </span>
                </div>
              </motion.div>
            </motion.nav>
          </FocusLock>
        )}
      </AnimatePresence>
    </header>
  );
}
