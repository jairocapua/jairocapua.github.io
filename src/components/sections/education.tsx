"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/sections/resume-card";
import { SectionHeading } from "@/components/section-heading";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export function Education() {
  return (
    <section id="education" className="flex flex-col gap-3">
      <BlurFade delay={BLUR_FADE_DELAY * 7}>
        <SectionHeading title="Education" />
      </BlurFade>
      <div className="flex flex-col gap-5">
        {DATA.education.map((e, i) => (
          <BlurFade key={e.school + i} delay={BLUR_FADE_DELAY * 8 + i * 0.05}>
            <ResumeCard
              href={e.href}
              logoUrl={e.logoUrl}
              altText={e.school}
              title={e.school}
              subtitle={e.degree}
              badges={e.badges}
              period={[e.start, e.end].map((s) => s.trim()).filter(Boolean).join(" - ")}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
