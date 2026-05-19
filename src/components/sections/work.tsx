"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/sections/resume-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export function Work() {
  return (
    <section id="work">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <h2 className="text-xl font-bold">Work Experience</h2>
        </BlurFade>
        {DATA.work.map((w, i) => (
          <BlurFade key={w.company + i} delay={BLUR_FADE_DELAY * 6 + i * 0.05}>
            <ResumeCard
              logoUrl={w.logoUrl}
              altText={w.company}
              title={w.company}
              subtitle={w.title}
              href={w.href}
              badges={w.badges}
              period={`${w.start} - ${w.end}`}
              description={w.description}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
