"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initialises Lenis for ultra-smooth, momentum-based scrolling.
 * Replaces native scroll with a 60fps RAF loop.
 * Wrap in a client component mounted at the layout level.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return <>{children}</>;
}
