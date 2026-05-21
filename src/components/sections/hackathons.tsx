"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { HackathonCard } from "@/components/sections/hackathon-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export function Hackathons() {
  return (
    <section id="hackathons">
      <div className="space-y-12 w-full py-12">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">
                Hackathons
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                I build under pressure
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hackathons whereI&apos;ve shipped real products under pressure — from AI voice interviewers to fintech tools — and learned more in 48 hours than weeks in a classroom.
              </p>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
            {DATA.hackathons.map((h, i) => (
              <BlurFade key={h.title + i} delay={BLUR_FADE_DELAY * 15 + i * 0.05}>
                <HackathonCard
                  title={h.title}
                  description={h.description}
                  location={h.location}
                  dates={h.dates}
                  image={h.image}
                  links={h.links}
                />
              </BlurFade>
            ))}
          </ul>
        </BlurFade>
      </div>
    </section>
  );
}
