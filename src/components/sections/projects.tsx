"use client";

import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/sections/project-card";
import { SectionHeading } from "@/components/section-heading";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export function Projects() {
  return (
    <section id="projects" className="flex flex-col gap-3">
      <BlurFade delay={BLUR_FADE_DELAY * 11}>
        <SectionHeading title="Featured Projects" />
      </BlurFade>
      <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
        {DATA.projects.map((p, i) => (
          <BlurFade key={p.title} delay={BLUR_FADE_DELAY * 12 + i * 0.04}>
            <ProjectCard
              href={p.href}
              title={p.title}
              description={p.description}
              dates={p.dates}
              tags={p.technologies}
              links={p.links}
            />
          </BlurFade>
        ))}
      </div>
      <BlurFade delay={BLUR_FADE_DELAY * 13}>
        <Link
          href={DATA.contact.social.GitHub.url}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          View more on GitHub ↗
        </Link>
      </BlurFade>
    </section>
  );
}
