"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export function Testimonials() {
  return (
    <section id="testimonials" className="flex flex-col gap-3">
      <BlurFade delay={BLUR_FADE_DELAY * 15}>
        <SectionHeading title="Recommendations" />
      </BlurFade>
      <div className="flex flex-col gap-4">
        {DATA.testimonials.map((t, i) => (
          <BlurFade key={t.name + i} delay={BLUR_FADE_DELAY * 16 + i * 0.04}>
            <figure className="flex flex-col gap-1.5">
              <blockquote className="text-xs leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="text-xs">
                <span className="font-semibold text-foreground">{t.name}</span>
                <span className="text-muted-foreground"> · {t.title}</span>
              </figcaption>
            </figure>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
