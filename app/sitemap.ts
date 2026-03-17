import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://separe.cz";

  // locales defined in your routing
  const locales = ["cs", "en"];

  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    // We only have the root localized pages representing the whole single-page app
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });
  });

  // Adding the default root that auto-redirects
  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  });

  return entries;
}
