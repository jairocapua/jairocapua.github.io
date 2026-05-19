"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/sections/resume-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export function Education() {
  return (
    <section id="education">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className="text-xl font-bold">Education</h2>
        </BlurFade>
        {DATA.education.map((e, i) => (
          <BlurFade key={e.school + i} delay={BLUR_FADE_DELAY * 8 + i * 0.05}>
            <ResumeCard
              href={e.href}
              logoUrl={e.logoUrl}
              altText={e.school}
              title={e.school}
              subtitle={e.degree}
              badges={e.badges}
              period={`${e.start} - ${e.end}`}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
