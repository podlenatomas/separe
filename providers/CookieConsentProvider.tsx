"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Consent = "accepted" | "rejected" | "unknown" | "pending";

interface Ctx {
  consent: Consent;
  accept: () => void;
  reject: () => void;
  reopen: () => void;
  bannerVisible: boolean;
}

const STORAGE_KEY = "separe-cookie-consent";

// In-memory subscribers, notified after local mutations (storage event only
// fires cross-tab, not in the same tab that called setItem).
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", cb);
  }
  return () => {
    listeners.delete(cb);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", cb);
    }
  };
}

function getSnapshot(): Consent {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "accepted" || v === "rejected") return v;
  } catch {
    // localStorage blocked (private browsing) — treat as unknown
  }
  return "unknown";
}

// Sentinel state during SSR — keeps banner hidden in server-rendered HTML,
// avoids a flash for users who already consented on a previous visit.
function getServerSnapshot(): Consent {
  return "pending";
}

function writeConsent(v: "accepted" | "rejected" | null) {
  try {
    if (v === null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, v);
  } catch {
    // ignore
  }
  listeners.forEach((l) => l());
}

const CookieCtx = createContext<Ctx | null>(null);

export function useCookieConsent() {
  const ctx = useContext(CookieCtx);
  if (!ctx)
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider",
    );
  return ctx;
}

export default function CookieConsentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const accept = useCallback(() => writeConsent("accepted"), []);
  const reject = useCallback(() => writeConsent("rejected"), []);
  const reopen = useCallback(() => writeConsent(null), []);

  const bannerVisible = consent === "unknown";

  return (
    <CookieCtx.Provider
      value={{ consent, accept, reject, reopen, bannerVisible }}
    >
      {children}
    </CookieCtx.Provider>
  );
}
