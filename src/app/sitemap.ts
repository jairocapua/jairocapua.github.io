import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export const dynamic = "force-static";

// The whole portfolio is one page; the old per-tab URLs only redirect there
// (see src/components/legacy-redirect.tsx), so they're left out.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${DATA.url}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
