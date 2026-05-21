"use client";

import Link from "next/link";
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
        <BlurFade delay={BLUR_FADE_DELAY * 12 + DATA.projects.length * 0.05}>
          <div className="flex justify-center">
            <Link
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View more on GitHub
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
