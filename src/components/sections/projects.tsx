"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/sections/project-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export function Projects() {
  return (
    <section id="projects">
      <div className="w-full space-y-12 py-12">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">
                My Projects
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Check out my latest work
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A small collection of recent things I&apos;ve built. Replace these with your real projects in
                {" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">src/data/resume.tsx</code>.
              </p>
            </div>
          </div>
        </BlurFade>
        <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2">
          {DATA.projects.map((p, i) => (
            <BlurFade key={p.title} delay={BLUR_FADE_DELAY * 12 + i * 0.05}>
              <ProjectCard
                href={p.href}
                title={p.title}
                description={p.description}
                dates={p.dates}
                tags={p.technologies}
                image={p.image}
                video={p.video}
                links={p.links}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
