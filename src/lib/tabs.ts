// Single source of truth for profile tabs and their URLs.
// Framework-agnostic (no "use client", no React) so it can be imported by both
// server route files (generateStaticParams, generateMetadata, sitemap) and
// client components (profile-tabs, sidebar).

export type TabKey =
  | "all"
  | "about"
  | "experience"
  | "projects"
  | "hackathons"
  | "skills";

export type TabSlug =
  | "post"
  | "about"
  | "experience"
  | "projects"
  | "hackathons"
  | "skills";

export interface TabDef {
  key: TabKey;
  slug: TabSlug;
  /** Visible tab label. */
  label: string;
  /** Per-route <title> (the root layout appends " | Jairo Capua"). */
  title: string;
  /** Per-route meta description. */
  description: string;
}

export const TABS: TabDef[] = [
  {
    key: "all",
    slug: "post",
    label: "Posts",
    title: "Posts",
    description: "Latest posts, experience, projects, and hackathons from Jairo Capua.",
  },
  {
    key: "about",
    slug: "about",
    label: "About",
    title: "About",
    description: "About Jairo Capua — AI Engineer building smart systems, web apps, and AI-powered workflows.",
  },
  {
    key: "experience",
    slug: "experience",
    label: "Experience",
    title: "Experience",
    description: "Work experience and education of Jairo Capua.",
  },
  {
    key: "projects",
    slug: "projects",
    label: "Projects",
    title: "Projects",
    description: "Projects built by Jairo Capua across web, automation, and AI.",
  },
  {
    key: "hackathons",
    slug: "hackathons",
    label: "Hackathons",
    title: "Hackathons",
    description: "Hackathons and awards earned by Jairo Capua.",
  },
  {
    key: "skills",
    slug: "skills",
    label: "Skills",
    title: "Skills",
    description: "The full tech stack and skills of Jairo Capua.",
  },
];

const BY_SLUG = new Map<string, TabDef>(TABS.map((t) => [t.slug, t]));
const BY_KEY = new Map<TabKey, TabDef>(TABS.map((t) => [t.key, t]));

export function keyFromSlug(slug: string): TabKey | null {
  return BY_SLUG.get(slug)?.key ?? null;
}

export function slugFromKey(key: TabKey): TabSlug {
  return BY_KEY.get(key)!.slug;
}

/**
 * Href for a tab. Posts links to the canonical home "/"; every other tab links
 * to "/<slug>/" (trailing slash to match next.config `trailingSlash: true`).
 */
export function hrefForKey(key: TabKey): string {
  if (key === "all") return "/";
  return `/${slugFromKey(key)}/`;
}

/**
 * Resolve the active tab from a pathname. Handles the trailing-slash form that
 * `usePathname()` returns under `trailingSlash: true` (e.g. "/about/") as well
 * as the bare form. Root "/" and "/post" both map to Posts; unknown -> Posts.
 */
export function tabFromPathname(pathname: string): TabKey {
  const trimmed =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  if (trimmed === "" || trimmed === "/") return "all";
  const firstSegment = trimmed.replace(/^\//, "").split("/")[0];
  // Keep "Projects" highlighted on category sub-pages (/projects/<slug>/).
  if (firstSegment === "projects") return "projects";
  return keyFromSlug(firstSegment) ?? "all";
}
