"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useScrollTo } from "@/hooks/useScrollTo";

interface SectionScroll {
    ref: React.RefObject<HTMLElement | null>;
    trigger: () => void;
}

interface NavContextValue {
    hero: SectionScroll;
    oNas: SectionScroll;
    pribeh: SectionScroll;
    nabidka: SectionScroll;
    akce: SectionScroll;
    kontakt: SectionScroll;
}

const NavContext = createContext<NavContextValue | null>(null);

export function useNav() {
    const ctx = useContext(NavContext);
    if (!ctx) throw new Error("useNav must be used within NavProvider");
    return ctx;
}

export default function NavProvider({ children }: { children: ReactNode }) {
    const hero = useScrollTo();
    const oNas = useScrollTo();
    const pribeh = useScrollTo();
    const nabidka = useScrollTo();
    const akce = useScrollTo();
    const kontakt = useScrollTo();

    return (
        <NavContext.Provider value={{ hero, oNas, pribeh, nabidka, akce, kontakt }}>
            {children}
        </NavContext.Provider>
    );
}
