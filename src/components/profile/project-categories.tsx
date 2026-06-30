"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  PROJECT_CATEGORIES,
  type ProjectCategorySlug,
} from "@/lib/project-categories";
import { DATA } from "@/data/resume";
import { automationProjects } from "@/data/automation-projects";

function countForCategory(slug: ProjectCategorySlug): number {
  if (slug === "ai-automation") return automationProjects.length;
  return DATA.projects.filter((p) => p.category === slug).length;
}

export function ProjectCategories() {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-4">
      {/* intro */}
      <section className="fb-card p-4 sm:p-5">
        <h2 className="text-xl font-bold tracking-tight">Projects</h2>
        <p className="mt-1 text-[15px] leading-relaxed text-fb-text-secondary">
          I split my work by the kind of system it is. Pick a track to dig in.
        </p>
      </section>

      {/* category cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PROJECT_CATEGORIES.filter((cat) => countForCategory(cat.slug) > 0).map((cat, i) => {
          const Icon = cat.icon;
          const count = countForCategory(cat.slug);

          return (
            <motion.div
              key={cat.slug}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: reduce ? 0 : i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/projects/${cat.slug}/`}
                className="fb-card group block overflow-hidden transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
              >
                {/* cover strip with translucent watermark icon */}
                <div
                  className="relative h-24 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${cat.accent.color}1f, ${cat.accent.color}08)`,
                  }}
                >
                  <Icon
                    aria-hidden
                    className="absolute -right-4 -top-4 size-32 opacity-[0.08] transition-transform duration-500 group-hover:scale-110"
                    style={{ color: cat.accent.color }}
                  />
                  <span
                    className={`absolute left-4 top-4 grid size-12 place-items-center rounded-xl ${cat.accent.tile} ring-1 ring-black/5 dark:ring-white/10`}
                  >
                    <Icon className="size-6" />
                  </span>
                </div>

                {/* body */}
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold leading-snug">{cat.label}</h3>
                    <span className="ml-auto rounded-full bg-fb-hover px-2.5 py-0.5 text-xs font-semibold text-fb-text-secondary">
                      {count} {count === 1 ? "project" : "projects"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-fb-text-secondary">
                    {cat.blurb}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-fb-blue transition-all group-hover:gap-2">
                    View projects
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
