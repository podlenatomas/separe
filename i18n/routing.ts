import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["cs", "en"],
    defaultLocale: "cs",
    localePrefix: "as-needed", // hide /cs prefix, only show /en
});
