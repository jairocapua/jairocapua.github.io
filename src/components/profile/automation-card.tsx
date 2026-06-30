import Image from "next/image";
import { Globe, Star } from "lucide-react";
import { DATA } from "@/data/resume";
import { ScarDetails } from "@/components/profile/scar-details";
import type { AutomationProject } from "@/data/automation-projects";

export function AutomationCard({ project }: { project: AutomationProject }) {
  return (
    <article className="fb-card overflow-hidden">
      {/* author header — matches PostCard */}
      <header className="flex items-center gap-2.5 px-4 pt-3">
        <Image
          src={DATA.avatarUrl}
          alt={DATA.name}
          width={40}
          height={40}
          className="size-10 flex-none rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="text-[15px] font-semibold leading-tight">{DATA.name}</p>
          <p className="flex items-center gap-1 text-xs text-fb-text-secondary">
            <Globe className="size-3" />
          </p>
        </div>
        <span className="ml-auto rounded-full bg-fb-hover px-2.5 py-1 text-xs font-medium text-fb-text-secondary">
          Automation
        </span>
      </header>

      {/* body */}
      <div className="px-4 pb-3 pt-2.5">
        <p className="text-[15px] leading-relaxed">
          🤖 Automation · {project.subcategory}
        </p>

        <div className="mt-1 flex items-start gap-2">
          <h3 className="text-lg font-bold leading-snug">{project.title}</h3>
          {project.featured && (
            <span className="mt-0.5 inline-flex flex-none items-center gap-1 rounded-md bg-fb-blue-light px-1.5 py-0.5 text-xs font-semibold text-fb-blue">
              <Star className="size-3 fill-current" /> Featured
            </span>
          )}
        </div>

        <p className="mt-2.5 text-[15px] leading-relaxed">{project.situation}</p>

        {project.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-fb-hover px-2 py-0.5 text-xs text-fb-text-secondary"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <ScarDetails
          task={project.task}
          action={project.action}
          result={project.result}
          tags={project.tags}
        />
      </div>
    </article>
  );
}
