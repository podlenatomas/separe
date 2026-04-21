import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

type Item = { q: string; a: string };

const LINK_PATTERN =
  /(https?:\/\/[^\s<),]+|www\.[^\s<),]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|(?:[\w-]+\.(?:cz|com|net|org|eu|io|dev|shop)(?:\/[^\s<),]*)?))/g;

function linkify(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    const rawToken = match[0];
    const start = match.index;

    // Strip trailing sentence punctuation from matched URL/email
    const trailMatch = rawToken.match(/[.,;:!?]+$/);
    const trail = trailMatch ? trailMatch[0] : "";
    const token = trail ? rawToken.slice(0, -trail.length) : rawToken;

    if (start > lastIndex) parts.push(text.slice(lastIndex, start));

    if (token.includes("@") && !token.startsWith("http")) {
      parts.push(
        <a
          key={key++}
          href={`mailto:${token}`}
          className="underline underline-offset-4 decoration-border hover:decoration-foreground hover:text-foreground transition-colors"
        >
          {token}
        </a>,
      );
    } else {
      const href = token.startsWith("http")
        ? token
        : `https://${token.replace(/^www\./, "")}`;
      parts.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 decoration-border hover:decoration-foreground hover:text-foreground transition-colors"
        >
          {token}
        </a>,
      );
    }
    if (trail) parts.push(trail);
    lastIndex = start + rawToken.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default async function FAQ() {
  const t = await getTranslations("FAQ");
  const locale = await getLocale();
  const items = t.raw("items") as Item[];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section
      id="faq"
      className="border-b border-border"
      aria-labelledby="h-faq"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <p className="text-[10px] font-light uppercase tracking-[0.18em] text-muted mb-2">
          {t("eyebrow")}
        </p>
        <h2
          id="h-faq"
          className="text-3xl md:text-[2.75rem] font-black tracking-tighter leading-tight mb-12 text-balance"
        >
          {t("title")}
        </h2>

        <div className="divide-y divide-border border-y border-border">
          {items.map(({ q, a }, i) => (
            <details
              key={i}
              className="group py-6 md:py-7 [&[open]>summary>svg]:rotate-45"
            >
              <summary className="flex cursor-pointer items-start justify-between gap-6 list-none text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 rounded-sm min-h-[44px] py-1">
                <h3 className="text-base md:text-lg font-medium tracking-tight text-pretty">
                  {q}
                </h3>
                <svg
                  className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform duration-300"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M8 2v12M2 8h12" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="text-sm md:text-base font-light text-muted leading-[1.8] mt-4 max-w-3xl text-pretty">
                {linkify(a)}
              </p>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
