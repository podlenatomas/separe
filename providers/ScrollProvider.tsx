"use client";

import { createContext, useContext, useRef, type RefObject, type ReactNode } from "react";

export type SectionId = "hero" | "o-nas" | "nabidka" | "akce" | "kontakt";

type SectionRefs = Record<SectionId, RefObject<HTMLElement | null>>;

interface ScrollContextValue {
    refs: SectionRefs;
    scrollTo: (id: SectionId) => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useScrollContext() {
    const ctx = useContext(ScrollContext);
    if (!ctx) throw new Error("useScrollContext must be used within ScrollProvider");
    return ctx;
}

const HEADER_HEIGHT = 72;

export default function ScrollProvider({ children }: { children: ReactNode }) {
    const refs: SectionRefs = {
        hero: useRef<HTMLElement>(null),
        "o-nas": useRef<HTMLElement>(null),
        nabidka: useRef<HTMLElement>(null),
        akce: useRef<HTMLElement>(null),
        kontakt: useRef<HTMLElement>(null),
    };

    const scrollTo = (id: SectionId) => {
        const el = refs[id]?.current;
        if (!el) return;

        const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
        window.scrollTo({ top, behavior: "smooth" });
    };

    return (
        <ScrollContext.Provider value={{ refs, scrollTo }}>
            {children}
        </ScrollContext.Provider>
    );
}
