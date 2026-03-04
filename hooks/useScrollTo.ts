"use client";

import { useCallback, useRef } from "react";

const HEADER_H = 72;

/**
 * Lightweight scroll hook. Returns a ref to attach to a section
 * and a scroll function. Uses scrollIntoView under the hood
 * with manual offset for the sticky header.
 */
export function useScrollTo() {
    const ref = useRef<HTMLElement>(null);

    const trigger = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - HEADER_H;
        window.scrollTo({ top: y, behavior: "smooth" });
    }, []);

    return { ref, trigger } as const;
}
