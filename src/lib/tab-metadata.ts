import type { Metadata } from "next";
import { DATA } from "@/data/resume";
import { TABS, type TabSlug } from "@/lib/tabs";

/**
 * Per-tab page metadata. Server-only (pulls DATA + Next's Metadata type) so it
 * stays out of the client bundle that imports the rest of `@/lib/tabs`.
 *
 * Posts ("post") is an alias of the home page, so its canonical points at "/".
 */
export function tabMetadata(slug: TabSlug): Metadata {
  const def = TABS.find((t) => t.slug === slug)!;
  const path = slug === "post" ? "/" : `/${slug}/`;
  const fullTitle = `${def.title} | ${DATA.name}`;

  return {
    title: def.title,
    description: def.description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description: def.description,
      url: `${DATA.url}${path}`,
    },
    twitter: {
      title: fullTitle,
      description: def.description,
    },
  };
}
