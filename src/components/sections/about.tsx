"use client";

import Markdown from "react-markdown";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export function About() {
  return (
    <section id="about" className="flex flex-col gap-4">
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <SectionHeading eyebrow="Who I am" title="About" />
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <Markdown className="prose prose-sm max-w-full text-pretty font-sans text-sm leading-relaxed text-muted-foreground prose-strong:text-foreground prose-strong:font-semibold">
          {DATA.summary}
        </Markdown>
      </BlurFade>
    </section>
  );
}
