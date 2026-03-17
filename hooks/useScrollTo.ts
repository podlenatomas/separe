"use client";

import { useCallback, useState } from "react";

const HEADER_H = 72;

/**
 * Lightweight scroll hook. Returns a ref to attach to a section
 * and a scroll function. Uses scrollIntoView under the hood
 * with manual offset for the sticky header.
 */
export function useScrollTo() {
    const [node, setNode] = useState<HTMLElement | null>(null);

    const trigger = useCallback(() => {
        if (!node) return;
        const y = node.getBoundingClientRect().top + window.scrollY - HEADER_H;
        window.scrollTo({ top: y, behavior: "smooth" });
    }, [node]);

    return { registerNode: setNode, trigger } as const;
}
