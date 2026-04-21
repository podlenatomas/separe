"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

/**
 * Minimalist 2026 language toggle: CS / EN
 * Switches locale without losing scroll position.
 */
export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const otherLocale = locale === "cs" ? "en" : "cs";

  function switchLocale() {
    startTransition(() => {
      router.replace(pathname, { locale: otherLocale });
    });
  }

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-2 text-[10px] font-light uppercase tracking-[0.14em] text-foreground/60 hover:text-foreground transition-colors duration-150 cursor-pointer bg-transparent border-none relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 rounded-sm"
      aria-label={`Switch to ${otherLocale === "en" ? "English" : "Česky"}`}
    >
      <span className={locale === "cs" ? "text-foreground font-medium" : ""}>
        CS
      </span>
      <span className="mx-1 text-foreground/30">/</span>
      <span className={locale === "en" ? "text-foreground font-medium" : ""}>
        EN
      </span>
    </button>
  );
}
