import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostCard } from "@/components/profile/post-card";
import { AutomationCard } from "@/components/profile/automation-card";
import { categoryBySlug, type ProjectCategorySlug } from "@/lib/project-categories";
import { DATA } from "@/data/resume";
import { automationProjects } from "@/data/automation-projects";
import { projectToPost } from "@/lib/posts";

export function CategoryFeed({ slug }: { slug: ProjectCategorySlug }) {
  const cat = categoryBySlug(slug);
  if (!cat) return null;

  const Icon = cat.icon;
  const count =
    slug === "ai-automation"
      ? automationProjects.length
      : DATA.projects.filter((p) => p.category === slug).length;

  return (
    <div className="space-y-4">
      {/* header */}
      <section className="fb-card p-4 sm:p-5">
        <Link
          href="/projects/"
          className="inline-flex items-center gap-1 text-sm font-semibold text-fb-text-secondary transition-colors hover:text-fb-blue"
        >
          <ArrowLeft className="size-4" /> All projects
        </Link>

        <div className="mt-3 flex items-center gap-3">
          <span
            className={`grid size-12 flex-none place-items-center rounded-xl ${cat.accent.tile} ring-1 ring-black/5 dark:ring-white/10`}
          >
            <Icon className="size-6" />
          </span>
          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-tight">{cat.label}</h2>
            <p className="text-sm text-fb-text-secondary">
              {count} {count === 1 ? "project" : "projects"}
            </p>
          </div>
        </div>

        <p className="mt-3 text-[15px] leading-relaxed text-fb-text-secondary">
          {cat.blurb}
        </p>
      </section>

      {/* feed */}
      {slug === "ai-automation" ? (
        automationProjects.map((project) => (
          <AutomationCard key={project.title} project={project} />
        ))
      ) : (
        <>
          {DATA.projects
            .map((p, i) => ({ p, i }))
            .filter(({ p }) => p.category === slug)
            .map(({ p, i }) => (
              <PostCard key={`proj-${i}`} post={projectToPost(p, i)} />
            ))}
        </>
      )}

      {count === 0 && (
        <section className="fb-card p-6 text-center">
          <p className="text-[15px] text-fb-text-secondary">
            Nothing here yet — new builds landing soon.
          </p>
        </section>
      )}
    </div>
  );
}
