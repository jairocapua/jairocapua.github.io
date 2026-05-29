"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export function Certifications() {
  return (
    <section id="certifications" className="flex flex-col gap-3">
      <BlurFade delay={BLUR_FADE_DELAY * 13}>
        <SectionHeading title="Certifications" />
      </BlurFade>
      <div className="flex flex-col gap-3">
        {DATA.certifications.map((c, i) => (
          <BlurFade key={c.title} delay={BLUR_FADE_DELAY * 14 + i * 0.04}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold leading-snug">{c.title}</h3>
                <p className="text-xs text-muted-foreground">{c.issuer}</p>
              </div>
              <time className="flex-none whitespace-nowrap font-mono text-[11px] text-muted-foreground">
                {c.date}
              </time>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
