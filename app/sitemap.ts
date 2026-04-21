import { MetadataRoute } from "next";

const BASE = "https://www.separe-mikulandska.cz";

const languages = {
  cs: `${BASE}/`,
  en: `${BASE}/en`,
  "x-default": `${BASE}/`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${BASE}/`,
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
