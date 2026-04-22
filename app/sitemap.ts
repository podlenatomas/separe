import { MetadataRoute } from "next";

// Base URL without trailing slash to match Next.js canonical/hreflang output.
// Next's metadata resolver strips the trailing slash from root URLs in
// <link rel="canonical">, so we normalize the sitemap to the same form to
// avoid a mixed signal ("cz" in canonical vs "cz/" in sitemap).
const BASE = "https://www.separe-mikulandska.cz";

const languages = {
  cs: BASE,
  en: `${BASE}/en`,
  "x-default": BASE,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE,
      lastModified,
      alternates: { languages },
    },
    {
      url: `${BASE}/en`,
      lastModified,
      alternates: { languages },
    },
  ];
}
