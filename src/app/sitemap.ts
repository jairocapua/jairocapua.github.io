import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { TABS } from "@/lib/tabs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Posts ("all") canonicalizes to "/", so it's covered by the home entry below
  // — list only the remaining tabs to avoid duplicate URLs.
  const tabEntries: MetadataRoute.Sitemap = TABS.filter(
    (t) => t.key !== "all"
  ).map((t) => ({
    url: `${DATA.url}/${t.slug}/`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: `${DATA.url}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...tabEntries,
  ];
}
