// Single source of truth for the /projects category hub.
// Mirrors the tabs.ts idiom: one config array drives the landing cards,
// generateStaticParams, per-category page headers, and per-category metadata.
//
// `icon` holds a Lucide component reference (a plain value — safe in both
// server route files and client components). `accent` carries Tailwind class
// strings (tile) and a CSS color (used for the card's gradient cover strip).

import {
  AppWindow,
  Bot,
  FlaskConical,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type ProjectCategorySlug =
  | "ai-web-apps"
  | "ai-agents"
  | "ai-automation"
  | "ai-projects";

/** Categories that pull from DATA.projects (everything except automation). */
export type CodeProjectCategory = Exclude<ProjectCategorySlug, "ai-automation">;

export interface ProjectCategoryDef {
  slug: ProjectCategorySlug;
  /** Card + page heading. */
  label: string;
  /** One-line description shown on the card and the category page header. */
  blurb: string;
  /** Per-route <title> (root layout appends " | Jairo Capua"). */
  title: string;
  /** Per-route meta description. */
  description: string;
  icon: LucideIcon;
  accent: {
    /** Classes for the icon tile (bg + text), light + dark. */
    tile: string;
    /** CSS color for the card's gradient cover strip. */
    color: string;
  };
}

export const PROJECT_CATEGORIES: ProjectCategoryDef[] = [
  {
    slug: "ai-web-apps",
    label: "AI Web Apps",
    blurb: "Full-stack AI products — real apps people use, end to end.",
    title: "AI Web Apps",
    description:
      "AI-powered web applications built by Jairo Capua — full-stack products from idea to ship.",
    icon: AppWindow,
    accent: {
      tile: "bg-fb-blue-light text-fb-blue",
      color: "#1877f2",
    },
  },
  {
    slug: "ai-agents",
    label: "AI Agents",
    blurb: "Voice and autonomous agents that reason, act, and respond live.",
    title: "AI Agents",
    description:
      "Voice and autonomous AI agents built by Jairo Capua — real-time, reasoning systems.",
    icon: Bot,
    accent: {
      tile:
        "bg-violet-500/10 text-violet-600 dark:bg-violet-400/15 dark:text-violet-300",
      color: "#8b5cf6",
    },
  },
  {
    slug: "ai-automation",
    label: "AI Automation",
    blurb: "Business workflows wired to run themselves — SCAR case studies.",
    title: "AI Automation",
    description:
      "Automation case studies by Jairo Capua across GoHighLevel, n8n, Zapier, Make, and AI — in SCAR format.",
    icon: Workflow,
    accent: {
      tile:
        "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300",
      color: "#10b981",
    },
  },
  {
    slug: "ai-projects",
    label: "AI Projects",
    blurb: "Experiments, prototypes, and smaller builds worth showing.",
    title: "AI Projects",
    description:
      "Experiments, prototypes, and smaller builds by Jairo Capua.",
    icon: FlaskConical,
    accent: {
      tile:
        "bg-amber-500/10 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300",
      color: "#f59e0b",
    },
  },
];

const BY_SLUG = new Map<string, ProjectCategoryDef>(
  PROJECT_CATEGORIES.map((c) => [c.slug, c])
);

export function categoryBySlug(slug: string): ProjectCategoryDef | null {
  return BY_SLUG.get(slug) ?? null;
}

export function isProjectCategorySlug(slug: string): slug is ProjectCategorySlug {
  return BY_SLUG.has(slug);
}
